"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, PhoneCall, X } from "lucide-react";
import { useState, type FormEvent } from "react";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Cómo te ayudamos", href: "/#como-te-ayudamos" },
  { label: "Evaluación", href: "/evaluacion" },
  { label: "Simulador", href: "/simulador" },
  { label: "Recursos", href: "/recursos" },
  { label: "Contacto", href: "/contacto" },
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [form, setForm] = useState({ fullName: "", phone: "", email: "", consent: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleCallFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.fullName || !form.phone || !form.email || !form.consent) {
      setError("Completa tu nombre, teléfono, email y acepta el consentimiento para continuar.");
      setSuccess(null);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.fullName,
          phone: form.phone,
          email: form.email,
          country: "Otro país de Latinoamérica",
          state: "",
          insurance_interest: "No estoy seguro",
          preferred_contact_method: "Telefono",
          message: "Solicita devolución de llamada desde el header.",
          source: "header_call_me",
          consent_to_contact: form.consent,
          honeypot: "",
          turnstileToken: "",
        }),
      });

      if (!response.ok) {
        throw new Error("request_failed");
      }

      setSuccess("Gracias. Te contactaremos a la brevedad.");
      setForm({ fullName: "", phone: "", email: "", consent: false });
    } catch {
      setError("No pudimos registrar tu solicitud en este momento. Inténtalo de nuevo.");
      setSuccess(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50">
        <div className="border-b border-slate-700/50 bg-[#0b1f3a] text-white">
          <div className="container-shell flex flex-wrap items-center justify-center gap-x-6 gap-y-1 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white/80">
            <span>Atención en español</span>
            <span className="hidden sm:inline">•</span>
            <span>Evaluación sin costo</span>
            <span className="hidden sm:inline">•</span>
            <span>Estados Unidos y América</span>
          </div>
        </div>

        <div className="border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
          <div className="container-shell flex h-20 items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3" aria-label="MyGcover inicio" onClick={() => setIsMenuOpen(false)}>
              <div className="flex h-11 w-28 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-slate-200">
                <Image src="/brand/logo.png" alt="MyGcover" width={160} height={44} priority className="h-auto w-full object-contain" />
              </div>
            </Link>

            <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegación principal">
              {navItems.map((item) => (
                <Link key={item.label} href={item.href} className="text-sm font-medium text-slate-600 transition hover:text-[#1d5cdd]">
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-4 lg:flex">
              <button
                type="button"
                onClick={() => setIsCallModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-[#1d5cdd]/20 bg-[#edf5ff] px-4 py-2.5 text-sm font-semibold text-[#1d5cdd] transition hover:bg-[#e3eeff]"
              >
                <PhoneCall size={16} />
                Te llamamos
              </button>
              <Link href="/evaluacion" className="primary-button px-5 py-3 text-sm">
                Comenzar evaluación
              </Link>
            </div>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 lg:hidden"
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="border-t border-slate-200 bg-white lg:hidden">
              <nav className="container-shell flex flex-col py-3" aria-label="Navegación móvil">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="px-2 py-3 text-base font-medium text-slate-700 transition hover:text-[#1d5cdd]"
                  >
                    {item.label}
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsCallModalOpen(true);
                  }}
                  className="mt-3 inline-flex items-center justify-center gap-2 rounded-full border border-[#1d5cdd]/20 bg-[#edf5ff] px-4 py-3 text-base font-semibold text-[#1d5cdd]"
                >
                  <PhoneCall size={16} />
                  Te llamamos
                </button>
                <Link
                  href="/evaluacion"
                  onClick={() => setIsMenuOpen(false)}
                  className="primary-button mt-3 w-full justify-center"
                >
                  Comenzar evaluación
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {isCallModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(11,31,58,0.18)]">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1d5cdd]">Te llamamos</p>
                <h2 className="mt-2 text-2xl font-bold text-[#0b1f3a]">Déjanos tu número</h2>
              </div>
              <button
                type="button"
                aria-label="Cerrar formulario"
                onClick={() => {
                  setIsCallModalOpen(false);
                  setError(null);
                  setSuccess(null);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-50"
              >
                <X size={18} />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleCallFormSubmit} noValidate>
              <label className="block space-y-2 text-sm font-medium text-slate-700">
                Nombre completo
                <input
                  value={form.fullName}
                  onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                  placeholder="Tu nombre"
                />
              </label>

              <label className="block space-y-2 text-sm font-medium text-slate-700">
                Teléfono
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                  placeholder="(555) 123-4567"
                />
              </label>

              <label className="block space-y-2 text-sm font-medium text-slate-700">
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                  placeholder="correo@ejemplo.com"
                />
              </label>

              <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(event) => setForm((prev) => ({ ...prev, consent: event.target.checked }))}
                  className="mt-1 h-4 w-4"
                />
                <span>Autorizo que me contacten por teléfono en relación con mi solicitud de información.</span>
              </label>

              {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
              {success ? <p className="text-sm font-medium text-emerald-600">{success}</p> : null}

              <button type="submit" className="primary-button w-full justify-center" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Solicitar llamada"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
