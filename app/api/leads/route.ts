import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { leadSchema } from "@/lib/lead-schema";
import { insertLeadServer } from "@/lib/supabase-server";
import { isRateLimited } from "@/lib/rate-limit";

// Cambiar FROM y TO a info@mygcover.com cuando el dominio esté verificado en Resend.
const NOTIFY_FROM = "MyGCover <onboarding@resend.dev>";
const NOTIFY_TO = "mygcover@gmail.com";

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
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: NOTIFY_FROM,
    to: NOTIFY_TO,
    subject: `Nuevo lead: ${lead.full_name} — ${lead.insurance_interest}`,
    html: `
      <h2>Nuevo lead recibido</h2>
      <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
        <tr><td><b>Nombre</b></td><td>${lead.full_name}</td></tr>
        <tr><td><b>Email</b></td><td>${lead.email}</td></tr>
        <tr><td><b>Teléfono</b></td><td>${lead.phone}</td></tr>
        <tr><td><b>País</b></td><td>${lead.country}${lead.state ? ` — ${lead.state}` : ""}</td></tr>
        <tr><td><b>Interés</b></td><td>${lead.insurance_interest}</td></tr>
        <tr><td><b>Contacto preferido</b></td><td>${lead.preferred_contact_method}</td></tr>
        <tr><td><b>Fuente</b></td><td>${lead.source}</td></tr>
        ${lead.message ? `<tr><td><b>Mensaje</b></td><td>${lead.message}</td></tr>` : ""}
      </table>
    `,
  });
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

  const lead = parsed.data;

  // Honeypot: si un bot llenó el campo oculto, respondemos éxito sin guardar nada.
  if (lead.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const turnstileOk = await verifyTurnstile(lead.turnstileToken, ip);
  if (!turnstileOk) {
    return NextResponse.json({ ok: false, message: GENERIC_ERROR }, { status: 400 });
  }

  const result = await insertLeadServer(lead);

  if (!result.ok) {
    return NextResponse.json({ ok: false, message: GENERIC_ERROR }, { status: 502 });
  }

  // No esperamos la notificación para no bloquear la respuesta al usuario.
  void sendLeadNotification(lead);

  return NextResponse.json({ ok: true });
}
