import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { LeadInput } from "./lead-schema";

// Cliente con clave secreta: solo puede importarse desde código de servidor (Route Handlers, etc.).
function getSupabaseServerClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseSecretKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseSecretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export async function insertLeadServer(lead: Omit<LeadInput, "honeypot" | "turnstileToken">) {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return { ok: false as const };
  }

  const { error } = await supabase.from("leads").insert({
    full_name: lead.full_name,
    email: lead.email,
    phone: lead.phone,
    country: lead.country,
    state: lead.state,
    insurance_interest: lead.insurance_interest,
    preferred_contact_method: lead.preferred_contact_method,
    message: lead.message,
    source: lead.source,
    consent_to_contact: lead.consent_to_contact,
    utm_source: lead.utm_source || null,
    utm_medium: lead.utm_medium || null,
    utm_campaign: lead.utm_campaign || null,
    utm_content: lead.utm_content || null,
    utm_term: lead.utm_term || null,
    page_origin: lead.page_origin || null,
    referrer: lead.referrer || null,
    device_type: lead.device_type || null,
    browser_language: lead.browser_language || null,
    assessment_answers: Object.keys(lead.assessment_answers).length ? lead.assessment_answers : null,
    status: "new",
  });

  if (error) {
    return { ok: false as const };
  }

  return { ok: true as const };
}
