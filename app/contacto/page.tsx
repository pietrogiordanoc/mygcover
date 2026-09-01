"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const usStates = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawái","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Misisipi","Missouri","Montana","Nebraska","Nevada","Nuevo Hampshire","Nueva Jersey","Nuevo México","Nueva York","Carolina del Norte","Dakota del Norte","Ohio","Oklahoma","Oregón","Pensilvania","Rhode Island","Carolina del Sur","Dakota del Sur","Tennessee","Texas","Utah","Vermont","Virginia","Washington","Virginia Occidental","Wisconsin","Wyoming","Washington D.C.",
];

const objectiveOptions = [
  "Seguro de vida",
  "IUL",
  "Salud",
  "Viaje",
  "No estoy seguro",
];

const countryOptions = [
  "Estados Unidos",
  "México",
  "Colombia",
  "República Dominicana",
  "Venezuela",
  "Otro país de Latinoamérica",
];

export default function ContactPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    country: "Estados Unidos",
    state: "",
    insuranceInterest: objectiveOptions[0],
    contactMethod: "WhatsApp",
    message: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  const handleChange = (field: keyof typeof form, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (honeypot) {
      return;
    }

    if (!form.fullName || !form.phone || !form.email || !form.consent) {
      setError("Completa los campos requeridos y acepta el consentimiento para continuar.");
      return;
    }

    if (form.country === "Estados Unidos" && !form.state) {
      setError("Selecciona tu estado para continuar.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const payload = {
      full_name: form.fullName,
      phone: form.phone,
      email: form.email,
      country: form.country,
      state: form.country === "Estados Unidos" ? form.state : "",
      insurance_interest: form.insuranceInterest,
      preferred_contact_method: form.contactMethod,
      message: form.message,
      source: "contact_form",
      consent_to_contact: form.consent,
      honeypot,
    };

    let ok = false;
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      ok = response.ok;
    } catch {
      ok = false;
    }

    if (!ok) {
      setError("No pudimos guardar tu solicitud en este momento. Inténtalo de nuevo.");
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    router.push("/gracias");
  };

  return (
    <>
      <SiteHeader />
      <main className="container-shell py-16">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(11,31,58,0.08)] md:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="protect-badge text-[#1d5cdd]">CONTACTO</p>
            <h1 className="mt-4 text-3xl font-extrabold text-[#0b1f3a] md:text-5xl">Hablemos de lo que quieres proteger.</h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Déjanos tus datos y recibe una orientación inicial en español.
            </p>
            <a href="https://wa.me/17863936274" className="mt-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-[#eafaf2] px-5 py-3 text-sm font-semibold text-[#0b1f3a]">
              Hablar por WhatsApp <ArrowRight size={16} />
            </a>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <input
              type="text"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Nombre completo
                <input
                  required
                  minLength={2}
                  maxLength={120}
                  value={form.fullName}
                  onChange={(event) => handleChange("fullName", event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                  placeholder="Tu nombre completo"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Teléfono
                <input
                  required
                  minLength={7}
                  maxLength={32}
                  value={form.phone}
                  onChange={(event) => handleChange("phone", event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                  placeholder="(555) 123-4567"
                />
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Email
                <input
                  type="email"
                  required
                  maxLength={160}
                  value={form.email}
                  onChange={(event) => handleChange("email", event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                  placeholder="correo@ejemplo.com"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                País
                <select
                  value={form.country}
                  onChange={(event) => handleChange("country", event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  {countryOptions.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </label>
            </div>

            {form.country === "Estados Unidos" ? (
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Estado
                <select
                  value={form.state}
                  onChange={(event) => handleChange("state", event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <option value="">Selecciona tu estado</option>
                  {usStates.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </label>
            ) : (
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Estado o provincia
                <input
                  value={form.state}
                  onChange={(event) => handleChange("state", event.target.value)}
                  maxLength={80}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                  placeholder="Ejemplo: Antioquia"
                />
              </label>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Interés
                <select
                  value={form.insuranceInterest}
                  onChange={(event) => handleChange("insuranceInterest", event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  {objectiveOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                ¿Cómo prefieres que te contactemos?
                <select
                  value={form.contactMethod}
                  onChange={(event) => handleChange("contactMethod", event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Telefono">Telefono</option>
                  <option value="Email">Email</option>
                </select>
              </label>
            </div>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              Mensaje opcional
              <textarea
                value={form.message}
                onChange={(event) => handleChange("message", event.target.value)}
                maxLength={1000}
                className="min-h-28 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                placeholder="Cuéntanos brevemente sobre tu situación."
              />
            </label>

            <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(event) => handleChange("consent", event.target.checked)}
                className="mt-1 h-4 w-4"
              />
              <span>
                Autorizo a MyGcover y a sus representantes a contactarme en relación con mi solicitud de información. Entiendo que esto no constituye una solicitud formal de seguro ni garantiza elegibilidad o aprobación.
              </span>
            </label>

            {error && <p className="text-sm font-medium text-red-600">{error}</p>}
            {success && <p className="text-sm font-medium text-emerald-600">{success}</p>}

            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="submit" className="primary-button w-full justify-center" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Recibir orientación"}
              </button>
              <a href="https://wa.me/17863936274" className="secondary-button justify-center">Hablar por WhatsApp</a>
            </div>
          </form>
        </div>
      </div>
      </main>
      <SiteFooter />
    </>
  );
}
