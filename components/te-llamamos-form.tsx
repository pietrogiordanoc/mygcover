"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PhoneCall } from "lucide-react";
import { getSafeReferrer } from "@/lib/client-metadata";
import { captureUtmParams, emptyUtmParams, type UtmParams } from "@/lib/utm";

const NAME_PATTERN = /^[\p{L}\s'.-]{2,120}$/u;
const PHONE_PATTERN = /^\+?[0-9()\-\s]{7,20}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isReasonableName(value: string): boolean {
  return NAME_PATTERN.test(value.trim());
}

function isReasonablePhone(value: string): boolean {
  const trimmed = value.trim();
  const digitCount = trimmed.replace(/\D/g, "").length;
  return PHONE_PATTERN.test(trimmed) && digitCount >= 7;
}

function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

export function TeLlamamosForm() {
  const router = useRouter();
  const [form, setForm] = useState({ fullName: "", phone: "", residence: "", email: "", consent: false, honeypot: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const leadEventTracked = useRef(false);
  const utmParams = useRef<UtmParams>({ ...emptyUtmParams });
  const initialReferrer = useRef("");

  useEffect(() => {
    utmParams.current = captureUtmParams(window.location.search);
    initialReferrer.current = getSafeReferrer(document.referrer);
  }, []);

  const updateField = (field: keyof typeof form, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (form.honeypot) {
      return;
    }

    if (!isReasonableName(form.fullName)) {
      setError("Escribe tu nombre completo.");
      return;
    }

    if (!isReasonablePhone(form.phone)) {
      setError("Escribe un teléfono válido, con o sin código de país.");
      return;
    }

    if (!form.residence.trim()) {
      setError("Indica tu estado o país de residencia.");
      return;
    }

    if (!isValidEmail(form.email)) {
      setError("Escribe un correo electrónico válido.");
      return;
    }

    if (!form.consent) {
      setError("Acepta el consentimiento para continuar.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    let saved = false;
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.fullName,
          phone: form.phone,
          email: form.email,
          country: form.residence,
          state: "",
          insurance_interest: "No estoy seguro",
          preferred_contact_method: "Telefono",
          message: "",
          source: "callback_form",
          consent_to_contact: form.consent,
          honeypot: form.honeypot,
          ...utmParams.current,
          page_origin: "/te-llamamos",
          referrer: initialReferrer.current,
          device_type: window.innerWidth <= 767 ? "mobile" : window.innerWidth <= 1023 ? "tablet" : "desktop",
          browser_language: navigator.language,
          assessment_answers: {},
        }),
      });
      const result = (await response.json()) as { saved?: boolean };
      saved = response.ok && result.saved === true;
    } catch {
      saved = false;
    }

    if (!saved) {
      setError("No pudimos registrar tu solicitud en este momento. Inténtalo de nuevo.");
      setIsSubmitting(false);
      return;
    }

    if (!leadEventTracked.current) {
      leadEventTracked.current = true;
      window.fbq?.("track", "Lead");
    }
    router.push("/gracias");
  };

  return (
    <div className="w-full max-w-md rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(11,31,58,0.18)] md:p-8">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#edf5ff] text-[#1d5cdd]">
          <PhoneCall size={20} />
        </div>
        <h1 className="text-2xl font-bold text-[#0b1f3a]">Solicita una llamada</h1>
      </div>

      <p className="mb-5 text-base leading-7 text-slate-600">
        Déjanos tus datos y un representante de MyGcover podrá comunicarse contigo para conocer qué estás buscando.
      </p>

      <form className="space-y-3" onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          value={form.honeypot}
          onChange={(event) => updateField("honeypot", event.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <label className="block space-y-1.5 text-sm font-medium text-slate-700">
          Nombre
          <input
            required
            autoComplete="name"
            value={form.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
            placeholder="Tu nombre completo"
          />
        </label>

        <label className="block space-y-1.5 text-sm font-medium text-slate-700">
          Teléfono
          <input
            type="tel"
            required
            autoComplete="tel"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
            placeholder="+1 (555) 123-4567"
          />
        </label>

        <label className="block space-y-1.5 text-sm font-medium text-slate-700">
          ¿Dónde resides?
          <input
            required
            autoComplete="address-level1"
            value={form.residence}
            onChange={(event) => updateField("residence", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
            placeholder="Ej. Florida, México, Colombia"
          />
        </label>

        <label className="block space-y-1.5 text-sm font-medium text-slate-700">
          Email
          <input
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
            placeholder="correo@ejemplo.com"
          />
        </label>

        <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(event) => updateField("consent", event.target.checked)}
            className="mt-1 h-4 w-4"
          />
          <span>Acepto que MyGcover me contacte sobre esta solicitud.</span>
        </label>

        {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

        <button type="submit" className="primary-button w-full justify-center" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Quiero que me llamen"}
        </button>
      </form>
    </div>
  );
}
