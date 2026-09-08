import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { leadSchema } from "@/lib/lead-schema";
import { insertLeadServer } from "@/lib/supabase-server";
import { isRateLimited } from "@/lib/rate-limit";

const NOTIFY_FROM = process.env.RESEND_FROM_EMAIL || "MyGCover <info@mygcover.com>";
const NOTIFY_TO = process.env.NOTIFY_TO_EMAIL || "info@mygcover.com";
const unavailable = "—";

const assessmentLabels: Record<string, string> = {
  interest: "Tipo de protección buscada",
  country: "País de residencia",
  state: "Estado o provincia",
  age: "Rango de edad",
  goal: "Prioridad de protección",
  benefit: "Beneficio de interés",
  dependents: "Personas dependientes económicamente",
  budget: "Aporte mensual cómodo",
  health: "Estado general de salud",
  status: "Situación migratoria o documental",
};

function escapeHtml(value: unknown): string {
  return String(value ?? unavailable)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function displayValue(value: unknown): string {
  if (value === undefined || value === null || value === "") {
    return unavailable;
  }

  return escapeHtml(value);
}

function formatDateTime(value?: string): string {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) {
    return unavailable;
  }

  return new Intl.DateTimeFormat("es-ES", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "Europe/Madrid",
  }).format(date) + " (Europe/Madrid)";
}

function advertisingSource(utmSource?: string): string {
  if (!utmSource) {
    return unavailable;
  }

  const source = utmSource.trim().toLowerCase();
  if (source === "meta" || source === "facebook" || source === "instagram") {
    return "Meta Ads";
  }
  if (source === "google") {
    return "Google Ads";
  }

  return utmSource;
}

function normalize(value?: string): string {
  return value?.trim().toLocaleLowerCase("es") ?? "";
}

function normalizedInterest(value?: string): string {
  const normalized = normalize(value);
  if (normalized.startsWith("iul")) return "iul";
  if (normalized.includes("vida")) return "seguro de vida";
  if (normalized.includes("salud")) return "salud";
  if (normalized.includes("viaje")) return "viaje";
  return normalized;
}

function formatWarnings(lead: {
  country: string;
  state?: string;
  insurance_interest: string;
  assessment_answers: Record<string, string | string[]>;
}): string {
  const warnings: string[] = [];
  const answers = lead.assessment_answers;
  const assessmentCountry = typeof answers.country === "string" ? answers.country : "";
  const assessmentState = typeof answers.state === "string" ? answers.state : "";
  const assessmentInterest = typeof answers.interest === "string" ? answers.interest : "";

  if (assessmentCountry && normalize(assessmentCountry) !== normalize(lead.country)) {
    warnings.push(`El país del contacto (${lead.country}) no coincide con la evaluación (${assessmentCountry}).`);
  }
  if (assessmentState && lead.state && normalize(assessmentState) !== normalize(lead.state)) {
    warnings.push(`El estado o provincia del contacto (${lead.state}) no coincide con la evaluación (${assessmentState}).`);
  }
  if (assessmentInterest && normalizedInterest(assessmentInterest) !== normalizedInterest(lead.insurance_interest)) {
    warnings.push(`El interés del contacto (${lead.insurance_interest}) no coincide con la evaluación (${assessmentInterest}).`);
  }

  if (!warnings.length) {
    return "";
  }

  return `<div style="margin-top:24px;border:1px solid #f59e0b;background:#fffbeb;padding:12px 16px;color:#92400e"><b>Advertencia de consistencia</b><ul style="margin:8px 0 0;padding-left:20px">${warnings.map((warning) => `<li>${escapeHtml(warning)}</li>`).join("")}</ul></div>`;
}

function formatAssessmentAnswers(answers: Record<string, string | string[]>): string {
  const entries = Object.entries(answers);
  if (!entries.length) {
    return `<p style="margin:0;color:#64748b">${unavailable}</p>`;
  }

  return `<table cellpadding="6" style="border-collapse:collapse;width:100%;font-size:14px">${entries
    .map(([question, answer]) => `<tr><td style="border-bottom:1px solid #e2e8f0"><b>${displayValue(assessmentLabels[question] ?? question)}</b></td><td style="border-bottom:1px solid #e2e8f0">${displayValue(Array.isArray(answer) ? answer.join(", ") : answer)}</td></tr>`)
    .join("")}</table>`;
}

async function sendLeadNotification(lead: {
  full_name: string;
  email: string;
  phone: string;
  country: string;
  state?: string;
  insurance_interest: string;
  preferred_contact_method: string;
  message?: string;
  source: string;
  created_at?: string;
  page_origin?: string;
  referrer?: string;
  device_type?: string;
  browser_language?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  assessment_answers: Record<string, string | string[]>;
  consent_to_contact: boolean;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY missing");
    return;
  }

  const resend = new Resend(apiKey);

  try {
    const result = await resend.emails.send({
      from: NOTIFY_FROM,
      to: NOTIFY_TO,
      subject: `Nuevo lead: ${escapeHtml(lead.full_name)} — ${escapeHtml(lead.insurance_interest)}`,
      html: `
        <div style="font-family:Arial,sans-serif;color:#0f172a;max-width:720px;margin:0 auto">
        <h2 style="color:#0b1f3a">Nuevo lead recibido</h2>
        <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
          <tr><td><b>Nombre</b></td><td>${displayValue(lead.full_name)}</td></tr>
          <tr><td><b>Email</b></td><td>${displayValue(lead.email)}</td></tr>
          <tr><td><b>Teléfono</b></td><td>${displayValue(lead.phone)}</td></tr>
          <tr><td><b>País</b></td><td>${displayValue(lead.country)}</td></tr>
          <tr><td><b>Estado o provincia</b></td><td>${displayValue(lead.state)}</td></tr>
          <tr><td><b>Interés</b></td><td>${displayValue(lead.insurance_interest)}</td></tr>
          <tr><td><b>Contacto preferido</b></td><td>${displayValue(lead.preferred_contact_method)}</td></tr>
          <tr><td><b>Formulario</b></td><td>${lead.source === "evaluation_form" ? "Evaluación" : lead.source === "contact_form" ? "Contacto" : lead.source === "callback_form" ? "Solicitud de llamada" : displayValue(lead.source)}</td></tr>
          <tr><td><b>Consentimiento aceptado</b></td><td>${lead.consent_to_contact ? "Sí" : "No"}</td></tr>
          ${lead.message ? `<tr><td><b>Mensaje</b></td><td>${displayValue(lead.message)}</td></tr>` : ""}
        </table>
        <h3 style="margin:28px 0 8px;color:#0b1f3a">Origen y atribución</h3>
        <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
          <tr><td><b>Fecha y hora</b></td><td>${formatDateTime(lead.created_at)}</td></tr>
          <tr><td><b>Página de origen</b></td><td>${displayValue(lead.page_origin)}</td></tr>
          <tr><td><b>Fuente publicitaria</b></td><td>${displayValue(advertisingSource(lead.utm_source))}</td></tr>
          <tr><td><b>utm_source</b></td><td>${displayValue(lead.utm_source)}</td></tr>
          <tr><td><b>utm_medium</b></td><td>${displayValue(lead.utm_medium)}</td></tr>
          <tr><td><b>utm_campaign</b></td><td>${displayValue(lead.utm_campaign)}</td></tr>
          <tr><td><b>utm_content</b></td><td>${displayValue(lead.utm_content)}</td></tr>
          <tr><td><b>utm_term</b></td><td>${displayValue(lead.utm_term)}</td></tr>
          <tr><td><b>Referrer</b></td><td>${displayValue(lead.referrer)}</td></tr>
          <tr><td><b>Tipo de dispositivo</b></td><td>${displayValue(lead.device_type)}</td></tr>
          <tr><td><b>Idioma del navegador</b></td><td>${displayValue(lead.browser_language)}</td></tr>
        </table>
        <h3 style="margin:28px 0 8px;color:#0b1f3a">Respuestas de la evaluación</h3>
        ${formatAssessmentAnswers(lead.assessment_answers)}
        ${formatWarnings(lead)}
        </div>
      `,
    });

    if (result.error) {
      console.error("Resend email failed:", result.error);
    }
  } catch (error) {
    console.error("Resend notification crashed:", error);
  }
}

const GENERIC_ERROR = "No pudimos guardar tu solicitud en este momento. Inténtalo de nuevo.";

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // Sin clave configurada, Turnstile queda deshabilitado (preparado para activarse a futuro).
  if (!secretKey) {
    return true;
  }

  if (!token) {
    return false;
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: secretKey, response: token, remoteip: ip }),
    });
    const result = (await response.json()) as { success?: boolean };
    return Boolean(result.success);
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, message: GENERIC_ERROR }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: GENERIC_ERROR }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: GENERIC_ERROR }, { status: 400 });
  }

  const parsedLead = parsed.data;
  const lead = {
    ...parsedLead,
    utm_source: parsedLead.utm_source,
    utm_medium: parsedLead.utm_medium,
    utm_campaign: parsedLead.utm_campaign,
    utm_content: parsedLead.utm_content,
    utm_term: parsedLead.utm_term,
  };

  // Honeypot: si un bot llenó el campo oculto, respondemos éxito sin guardar nada.
  if (lead.honeypot) {
    return NextResponse.json({ ok: true, saved: false });
  }

  const turnstileOk = await verifyTurnstile(lead.turnstileToken, ip);
  if (!turnstileOk) {
    return NextResponse.json({ ok: false, message: GENERIC_ERROR }, { status: 400 });
  }

  const result = await insertLeadServer(lead);

  if (!result.ok) {
    return NextResponse.json({ ok: false, message: GENERIC_ERROR }, { status: 502 });
  }

  // Esperamos la notificación: en funciones serverless, una promesa sin await
  // puede quedar interrumpida si el runtime cierra el proceso tras responder.
  await sendLeadNotification(lead);

  return NextResponse.json({ ok: true, saved: true });
}
