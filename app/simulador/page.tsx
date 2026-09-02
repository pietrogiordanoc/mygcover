"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import Link from "next/link";
import { ArrowRight, CircleDollarSign } from "lucide-react";
import { useMemo, useState } from "react";

const ageOptions = ["18–29", "30–39", "40–49", "50–59", "60–69", "70 o más"];
const contributionOptions = ["$100", "$200", "$300", "$500", "$800", "$1,000+"];
const termOptions = ["10 años", "15 años", "20 años", "25 años", "30 años"];
const objectiveOptions = ["Protección", "Acumulación de valor", "Retiro", "Combinación"];

const ageValues = [24, 34, 44, 54, 64, 74];
const contributionValues = [100, 200, 300, 500, 800, 1000];
const termValues = [10, 15, 20, 25, 30];

export default function SimulatorPage() {
  const [ageIndex, setAgeIndex] = useState(2);
  const [contributionIndex, setContributionIndex] = useState(1);
  const [termIndex, setTermIndex] = useState(2);
  const [objective, setObjective] = useState(objectiveOptions[0]);

  const scenario = useMemo(() => {
    const age = ageValues[ageIndex];
    const contribution = contributionValues[contributionIndex];
    const years = termValues[termIndex];

    const totalNominal = contribution * 12 * years;
    const objectiveFactors: Record<string, number> = {
      Protección: 1.7,
      "Acumulación de valor": 2.1,
      Retiro: 1.9,
      Combinación: 2.3,
    };
    const objectiveFactor = objectiveFactors[objective] ?? 1.8;

    const ageAdjustment = 1 + Math.max(0, (70 - age) / 100);
    const projectedCoverage = Math.round(totalNominal * objectiveFactor * ageAdjustment);
    const coverageLabel = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(projectedCoverage);

    const chartBars = [34, 48, 62, 75, 86, 96].map((value, idx) => {
      const lift = idx === 0 ? 15 : idx === 1 ? 25 : idx === 2 ? 38 : idx === 3 ? 52 : idx === 4 ? 72 : 88;
      return Math.min(100, Math.round((value * (0.65 + years / 60) + lift) / 1.8));
    });

    return {
      monthly: contribution,
      totalNominal,
      years,
      coverageLabel,
      chartBars,
    };
  }, [ageIndex, contributionIndex, objective, termIndex]);

  return (
    <>
      <SiteHeader />
      <main className="container-shell py-16">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(11,31,58,0.08)] md:p-10">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="protect-badge text-[#1d5cdd]">Simulacro educativo</p>
              <h1 className="mt-3 text-3xl font-extrabold text-[#0b1f3a] md:text-5xl">Explora un escenario ilustrativo de protección y ahorro</h1>
            </div>
            <div className="hidden rounded-2xl bg-[#eaf3ff] px-4 py-2 text-sm font-medium text-[#1d5cdd] md:block">
              Solo para referencia
            </div>
          </div>

          <p className="max-w-3xl text-lg leading-8 text-slate-600">
            Este simulador es una herramienta ilustrativa para entender cómo podría evolucionar un escenario hipotético de aportes. No constituye oferta, cotización, ni aprobación de cobertura. Las condiciones reales pueden variar según el producto, la edad, el perfil del solicitante, su estado de salud, la vigencia, el país y las condiciones vigentes de cada aseguradora.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Edad o rango de edad
              <select
                value={ageIndex}
                onChange={(event) => setAgeIndex(Number(event.target.value))}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              >
                {ageOptions.map((option, index) => (
                  <option key={option} value={index}>{option}</option>
                ))}
              </select>
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              Aporte mensual
              <select
                value={contributionIndex}
                onChange={(event) => setContributionIndex(Number(event.target.value))}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              >
                {contributionOptions.map((option, index) => (
                  <option key={option} value={index}>{option}</option>
                ))}
              </select>
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              Tiempo estimado
              <select
                value={termIndex}
                onChange={(event) => setTermIndex(Number(event.target.value))}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              >
                {termOptions.map((option, index) => (
                  <option key={option} value={index}>{option}</option>
                ))}
              </select>
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              Objetivo
              <select
                value={objective}
                onChange={(event) => setObjective(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              >
                {objectiveOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.5rem] border border-slate-200 bg-[#f7fbff] p-6">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>Total aportado</span>
                <span>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(scenario.totalNominal)}</span>
              </div>
              <div className="mt-5 h-20 rounded-[1.25rem] bg-gradient-to-r from-[#dfeeff] via-[#effaf4] to-[#ddf6ea] p-4">
                <div className="flex h-full items-end gap-2">
                  {scenario.chartBars.map((height, index) => (
                    <div key={index} className="flex-1 rounded-t-xl bg-white/80" style={{ height: `${height}%` }} />
                  ))}
                </div>
              </div>
              <div className="mt-6 space-y-3 text-sm text-slate-600">
                <div className="flex items-center justify-between"><span>Aporte mensual</span><strong className="text-[#0b1f3a]">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(scenario.monthly)}</strong></div>
                <div className="flex items-center justify-between"><span>Total nominal aportado</span><strong className="text-[#0b1f3a]">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(scenario.totalNominal)}</strong></div>
                <div className="flex items-center justify-between"><span>Horizonte de tiempo</span><strong className="text-[#0b1f3a]">{scenario.years} años</strong></div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-[#0b1f3a] p-6 text-white">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <CircleDollarSign size={22} />
              </div>
              <p className="text-lg font-semibold">Resultado ilustrativo</p>
              <div className="mt-4 text-3xl font-extrabold tracking-tight">{scenario.coverageLabel}</div>
              <p className="mt-3 text-sm leading-7 text-blue-100">
                Este monto es solo un simulacro para visualizar un posible escenario, no representa una oferta de la aseguradora ni una garantía de cobertura final. El valor real puede cambiar según la póliza, la edad, la suma asegurada, la salud y otros factores de evaluación.
              </p>
              <div className="mt-6 rounded-2xl bg-white/5 p-4 text-sm text-blue-100">
                Para una proyección real y personalizada, es necesario revisar la información del cliente, el producto underwriting, y las condiciones vigentes de cada empresa.
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-900">
            <strong>Importante:</strong> este simulador no sustituye una cotización ni un estudio actuarial. Las condiciones varían según el producto, la compañía, la edad, la salud, el país, la duración del plan y la información final del solicitante.
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
      <SiteFooter />
    </>
  );
}
