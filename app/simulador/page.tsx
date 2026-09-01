import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
"use client";

import Link from "next/link";
import { ArrowRight, CircleDollarSign, ShieldCheck } from "lucide-react";

const ageOptions = ["18–29", "30–39", "40–49", "50–59", "60–69", "70 o más"];
const contributionOptions = ["$100", "$200", "$300", "$500", "$800", "$1,000+"];
const termOptions = ["10 años", "15 años", "20 años", "25 años", "30 años"];

export default function SimulatorPage() {
  return (
    <>
      <SiteHeader />
      <main className="container-shell py-16">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(11,31,58,0.08)] md:p-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="protect-badge text-[#1d5cdd]">Simulador educativo</p>
            <h1 className="mt-3 text-3xl font-extrabold text-[#0b1f3a] md:text-5xl">Explora el potencial de tus aportes</h1>
          </div>
          <div className="hidden rounded-2xl bg-[#eaf3ff] px-4 py-2 text-sm font-medium text-[#1d5cdd] md:block">
            Escenario hipotético
          </div>
        </div>

        <p className="max-w-3xl text-lg leading-8 text-slate-600">
          Observa escenarios educativos basados en un aporte mensual. Para obtener información real sobre costos, cobertura y posible valor acumulado será necesaria una ilustración personalizada.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Edad o rango de edad
            <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              {ageOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm font-medium text-slate-700">
            Aporte mensual
            <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              {contributionOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm font-medium text-slate-700">
            Tiempo estimado
            <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              {termOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm font-medium text-slate-700">
            Objetivo
            <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <option>Protección</option>
              <option>Acumulación de valor</option>
              <option>Retiro</option>
              <option>Combinación</option>
            </select>
          </label>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.5rem] border border-slate-200 bg-[#f7fbff] p-6">
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>Total aportado</span>
              <span>$1,200</span>
            </div>
            <div className="mt-5 h-20 rounded-[1.25rem] bg-gradient-to-r from-[#dfeeff] via-[#effaf4] to-[#ddf6ea] p-4">
              <div className="flex h-full items-end gap-2">
                {[35, 55, 80, 58, 92, 68].map((height, index) => (
                  <div key={index} className="flex-1 rounded-t-xl bg-white/80" style={{ height: `${height}%` }} />
                ))}
              </div>
            </div>
            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between"><span>Aporte mensual</span><strong className="text-[#0b1f3a]">$200</strong></div>
              <div className="flex items-center justify-between"><span>Total nominal aportado</span><strong className="text-[#0b1f3a]">$24,000</strong></div>
              <div className="flex items-center justify-between"><span>Horizonte de tiempo</span><strong className="text-[#0b1f3a]">20 años</strong></div>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-[#0b1f3a] p-6 text-white">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <CircleDollarSign size={22} />
            </div>
            <p className="text-lg font-semibold">Escenario conceptual</p>
            <p className="mt-3 text-sm leading-7 text-blue-100">
              En un seguro de vida pueden existir costos del seguro, gastos administrativos, cargos, condiciones de la póliza y límites. El valor final depende del producto y de la compañía.
            </p>
            <div className="mt-6 rounded-2xl bg-white/5 p-4 text-sm text-blue-100">
              Para conocer una proyección real necesitamos preparar una ilustración basada en tu edad, salud, estado, objetivo y producto disponible.
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link href="/evaluacion" className="primary-button">
            Solicitar mi ilustración personalizada <ArrowRight size={18} />
          </Link>
          <Link href="/contacto" className="secondary-button">
            Hablar con un agente
          </Link>
        </div>
      </div>
    </main>
  );
}
