"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 600);
  };

  return (
    <main className="container-shell py-16">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(11,31,58,0.08)] md:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="protect-badge text-[#1d5cdd]">Contacto</p>
            <h1 className="mt-4 text-3xl font-extrabold text-[#0b1f3a] md:text-5xl">Hablemos de lo que quieres proteger</h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Si tienes dudas, quieres conversar con un agente o simplemente necesitas orientación, estamos aquí para ayudarte.
            </p>
            <a href="https://wa.me/17863936274" className="mt-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-[#eafaf2] px-5 py-3 text-sm font-semibold text-[#0b1f3a]">
              Prefiero conversar por WhatsApp <ArrowRight size={16} />
            </a>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Nombre
                <input required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Tu nombre" />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Apellido
                <input required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Tu apellido" />
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Teléfono
                <input required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="(555) 123-4567" />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Email
                <input type="email" required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="correo@ejemplo.com" />
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                País
                <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Estados Unidos" />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Estado
                <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Tu estado" />
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Edad aproximada
                <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="30-39" />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Objetivo
                <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <option>Protección familiar</option>
                  <option>Beneficios en vida</option>
                  <option>Acumulación de valor</option>
                  <option>Gastos finales</option>
                </select>
              </label>
            </div>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              Método de contacto preferido
              <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <option>WhatsApp</option>
                <option>Llamada</option>
                <option>Correo electrónico</option>
              </select>
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              Mensaje opcional
              <textarea className="min-h-28 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Cuéntanos brevemente sobre tu situación." />
            </label>

            <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <input type="checkbox" required className="mt-1 h-4 w-4" />
              <span>Autorizo a MyGcover a contactarme y entiendo que esta solicitud no garantiza elegibilidad ni aprobación.</span>
            </label>

            {error && <p className="text-sm font-medium text-red-600">{error}</p>}
            {success && <p className="text-sm font-medium text-emerald-600">Tu solicitud fue enviada correctamente. Revisaremos tu mensaje y te contactaremos.</p>}

            <button type="submit" className="primary-button w-full justify-center" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Solicitar orientación"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
