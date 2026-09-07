import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { leadSchema } from "@/lib/lead-schema";
import { insertLeadServer } from "@/lib/supabase-server";
import { isRateLimited } from "@/lib/rate-limit";

const NOTIFY_FROM = process.env.RESEND_FROM_EMAIL || "MyGCover <info@mygcover.com>";
const NOTIFY_TO = process.env.NOTIFY_TO_EMAIL || "info@mygcover.com";
const unavailable = "No disponible";

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

function formatAssessmentAnswers(answers: Record<string, string | string[]>): string {
  const entries = Object.entries(answers);
  if (!entries.length) {
    return `<p style="margin:0;color:#64748b">${unavailable}</p>`;
  }

  return `<table cellpadding="6" style="border-collapse:collapse;width:100%;font-size:14px">${entries
    .map(([question, answer]) => `<tr><td style="border-bottom:1px solid #e2e8f0"><b>${displayValue(question)}</b></td><td style="border-bottom:1px solid #e2e8f0">${displayValue(Array.isArray(answer) ? answer.join(", ") : answer)}</td></tr>`)
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
          <tr><td><b>País</b></td><td>${displayValue(lead.country)}${lead.state ? ` — ${displayValue(lead.state)}` : ""}</td></tr>
          <tr><td><b>Interés</b></td><td>${displayValue(lead.insurance_interest)}</td></tr>
          <tr><td><b>Contacto preferido</b></td><td>${displayValue(lead.preferred_contact_method)}</td></tr>
          <tr><td><b>Fuente</b></td><td>${displayValue(lead.source)}</td></tr>
          <tr><td><b>Consentimiento aceptado</b></td><td>${lead.consent_to_contact ? "Sí" : "No"}</td></tr>
          ${lead.message ? `<tr><td><b>Mensaje</b></td><td>${displayValue(lead.message)}</td></tr>` : ""}
        </table>
        <h3 style="margin:28px 0 8px;color:#0b1f3a">Origen y atribución</h3>
        <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
          <tr><td><b>Fecha y hora</b></td><td>${displayValue(lead.created_at ?? new Date().toISOString())}</td></tr>
          <tr><td><b>Página de origen</b></td><td>${displayValue(lead.page_origin)}</td></tr>
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
