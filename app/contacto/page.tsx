"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { insertLead } from "@/lib/supabase";

const usStates = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawái","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Misisipi","Missouri","Montana","Nebraska","Nevada","Nuevo Hampshire","Nueva Jersey","Nuevo México","Nueva York","Carolina del Norte","Dakota del Norte","Ohio","Oklahoma","Oregón","Pensilvania","Rhode Island","Carolina del Sur","Dakota del Sur","Tennessee","Texas","Utah","Vermont","Virginia","Washington","Virginia Occidental","Wisconsin","Wyoming","Washington D.C.",
];

const objectiveOptions = [
  "Proteger a mi familia",
  "Conocer un IUL",
  "Beneficios en vida",
  "Gastos finales",
  "Preparación para el futuro",
  "No estoy seguro",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    country: "Estados Unidos",
    state: "",
    objective: objectiveOptions[0],
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

    if (!form.name || !form.phone || !form.email || !form.consent) {
      setError("Completa los campos requeridos y acepta el consentimiento para continuar.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const params = new URLSearchParams(window.location.search);
    const utm = {
      source: params.get("utm_source") ?? "",
      medium: params.get("utm_medium") ?? "",
      campaign: params.get("utm_campaign") ?? "",
      term: params.get("utm_term") ?? "",
      content: params.get("utm_content") ?? "",
    };

    const payload = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      country: form.country,
      state: form.country === "Estados Unidos" ? form.state : "",
      objective: form.objective,
      contact_method: form.contactMethod,
      message: form.message,
      lead_type: "contact",
      utm,
      origin_url: typeof window !== "undefined" ? window.location.href : "",
      created_at: new Date().toISOString(),
    };

    const result = await insertLead(payload);

    if (!result.ok) {
      setError(result.message ?? "No pudimos guardar tu solicitud en este momento. Inténtalo de nuevo.");
      setIsSubmitting(false);
      return;
    }

    setSuccess("Tu solicitud fue recibida correctamente. Un representante se pondrá en contacto contigo.");
    setForm({
      name: "",
      phone: "",
      email: "",
      country: "Estados Unidos",
      state: "",
      objective: objectiveOptions[0],
      contactMethod: "WhatsApp",
      message: "",
      consent: false,
    });
    setIsSubmitting(false);
  };

  return (
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
                Nombre
                <input
                  required
                  value={form.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                  placeholder="Tu nombre"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Teléfono
                <input
                  required
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
                  <option value="Estados Unidos">Estados Unidos</option>
                  <option value="México">México</option>
                  <option value="Otro país de América">Otro país de América</option>
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
            ) : null}

            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Objetivo principal
                <select
                  value={form.objective}
                  onChange={(event) => handleChange("objective", event.target.value)}
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
                  <option value="Llamada">Llamada</option>
                  <option value="Correo electrónico">Correo electrónico</option>
                </select>
              </label>
            </div>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              Mensaje opcional
              <textarea
                value={form.message}
                onChange={(event) => handleChange("message", event.target.value)}
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
  );
}
