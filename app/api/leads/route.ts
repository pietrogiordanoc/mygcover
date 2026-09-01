import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/lib/lead-schema";
import { insertLeadServer } from "@/lib/supabase-server";
import { isRateLimited } from "@/lib/rate-limit";

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

  return NextResponse.json({ ok: true });
}
