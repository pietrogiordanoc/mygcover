import { z } from "zod";

// Fuente de verdad única para la validación de leads; se usa exclusivamente en el servidor.
export const leadSchema = z.object({
  full_name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(7).max(32),
  country: z.string().trim().min(2).max(80),
  state: z.string().trim().max(80).optional().default(""),
  insurance_interest: z.enum(["Seguro de vida", "IUL", "Salud", "Viaje", "No estoy seguro"]),
  preferred_contact_method: z.enum(["Telefono", "WhatsApp", "Email"]),
  message: z.string().trim().max(1000).optional().default(""),
  source: z.enum(["contact_form", "evaluation_form", "header_call_me", "callback_form"]),
  consent_to_contact: z.literal(true),
  honeypot: z.string().max(0).optional().default(""),
  turnstileToken: z.string().optional().default(""),
  utm_source: z.string().trim().max(255).optional().default(""),
  utm_medium: z.string().trim().max(255).optional().default(""),
  utm_campaign: z.string().trim().max(255).optional().default(""),
  utm_content: z.string().trim().max(255).optional().default(""),
  utm_term: z.string().trim().max(255).optional().default(""),
  page_origin: z.string().trim().max(255).optional().default(""),
  referrer: z.string().trim().max(2000).optional().default(""),
  device_type: z.enum(["desktop", "tablet", "mobile", "unknown"]).optional().default("unknown"),
  browser_language: z.string().trim().max(35).optional().default(""),
  assessment_answers: z.record(z.string(), z.union([z.string(), z.array(z.string())])).optional().default({}),
});

export type LeadInput = z.infer<typeof leadSchema>;
