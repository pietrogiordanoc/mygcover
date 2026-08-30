"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

const states = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawái","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Misisipi","Missouri","Montana","Nebraska","Nevada","Nuevo Hampshire","Nueva Jersey","Nuevo México","Nueva York","Carolina del Norte","Dakota del Norte","Ohio","Oklahoma","Oregón","Pensilvania","Rhode Island","Carolina del Sur","Dakota del Sur","Tennessee","Texas","Utah","Vermont","Virginia","Washington","Virginia Occidental","Wisconsin","Wyoming","Washington D.C."];

const steps = [
  {
    id: "country",
    question: "¿En qué país vives actualmente?",
    type: "single",
    options: ["Estados Unidos", "México", "Puerto Rico", "República Dominicana", "Colombia", "Venezuela", "Otro país de América"],
  },
  {
    id: "age",
    question: "¿Cuál es tu rango de edad?",
    type: "single",
    options: ["18–29", "30–39", "40–49", "50–59", "60–69", "70 o más"],
  },
  {
    id: "goal",
    question: "¿Qué te gustaría proteger principalmente?",
    type: "multi",
    options: ["Mi familia", "Mis ingresos", "Mis hijos", "Mi vivienda o deudas", "Mis gastos finales", "Mi futuro financiero", "Todavía no estoy seguro"],
  },
  {
    id: "benefit",
    question: "¿Qué beneficio te interesa conocer?",
    type: "single",
    options: ["Protección por fallecimiento", "Beneficios en vida", "Acumulación de valor", "Preparación para el retiro", "Gastos finales", "Una combinación de beneficios", "No sé cuál necesito"],
  },
  {
    id: "dependents",
    question: "¿Tienes personas que dependen económicamente de ti?",
    type: "single",
    options: ["Sí", "No", "Parcialmente"],
  },
  {
    id: "budget",
    question: "¿Cuál sería un aporte mensual cómodo para ti?",
    type: "single",
    options: ["Menos de $100", "Entre $100 y $199", "Entre $200 y $299", "Entre $300 y $499", "$500 o más", "Todavía no lo sé"],
  },
  {
    id: "health",
    question: "¿Cómo describirías tu estado general de salud?",
    type: "single",
    options: ["Excelente", "Bueno", "Tengo alguna condición controlada", "Tengo varias condiciones médicas", "Prefiero conversarlo con un agente"],
  },
  {
    id: "status",
    question: "¿Cuál describe mejor tu situación actual?",
    type: "single",
    options: ["Ciudadano estadounidense", "Residente permanente", "Tengo Seguro Social", "Tengo ITIN", "Estoy en proceso migratorio", "Otra situación", "Prefiero conversarlo en privado"],
    explain: "Esta información nos ayuda a identificar opciones que podrían estar disponibles. No determina por sí sola tu elegibilidad.",
  },
];

const initialForm = {
  country: "",
  state: "",
  age: "",
  goal: [] as string[],
  benefit: "",
  dependents: "",
  budget: "",
  health: "",
  status: "",
};

export default function EvaluationPage() {
  const searchParams = useSearchParams();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const countryFromUrl = searchParams.get("country") ?? "";
    const stateFromUrl = searchParams.get("state") ?? "";

    if (countryFromUrl) {
      setAnswers((prev) => ({ ...prev, country: countryFromUrl }));
    }

    if (stateFromUrl) {
      setAnswers((prev) => ({ ...prev, state: stateFromUrl }));
    }

    const saved = sessionStorage.getItem("mygcover-location");
    if (!saved) {
      return;
    }

    try {
      const parsed = JSON.parse(saved) as { country?: string; state?: string };
      if (parsed.country) {
        setAnswers((prev) => ({ ...prev, country: parsed.country ?? "" }));
      }
      if (parsed.state) {
        setAnswers((prev) => ({ ...prev, state: parsed.state ?? "" }));
      }
    } catch {
      // ignore malformed storage
    }
  }, [searchParams]);

  const currentStep = steps[stepIndex];
  const progress = ((stepIndex + 1) / steps.length) * 100;

  const requireState = useMemo(() => answers.country === "Estados Unidos", [answers.country]);

  const updateAnswer = (key: keyof typeof answers, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setError(null);
  };

  const canContinue = () => {
    if (currentStep.id === "country") {
      return Boolean(answers.country);
    }
    if (currentStep.id === "state") {
      return Boolean(answers.state);
    }
    if (currentStep.id === "goal") {
      return answers.goal.length > 0;
    }
    return Boolean(answers[currentStep.id as keyof typeof answers]);
  };

  const nextStep = () => {
    if (!canContinue()) {
      setError("Selecciona una opción para continuar.");
      return;
    }

    if (currentStep.id === "country" && answers.country === "Estados Unidos") {
      setStepIndex((prev) => prev + 1);
      return;
    }

    if (stepIndex < steps.length - 1) {
      setStepIndex((prev) => prev + 1);
    } else {
      setSubmitted(true);
    }
  };

  const prevStep = () => {
    setStepIndex((prev) => Math.max(prev - 1, 0));
    setError(null);
  };

  if (submitted) {
    return (
      <main className="container-shell py-20">
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(11,31,58,0.08)]">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#eafaf2] text-[#158d5a]">
            <CheckCircle2 size={28} />
          </div>
          <p className="protect-badge text-[#1d5cdd]">Evaluación inicial</p>
          <h1 className="mt-4 text-3xl font-extrabold text-[#0b1f3a]">Tu evaluación inicial está lista</h1>
          <p className="mt-4 text-lg text-slate-600">
            Déjanos tus datos para guardar tu resultado y mostrarte los próximos pasos.
          </p>
          <form className="mt-8 space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Nombre
                <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Tu nombre" />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Apellido
                <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Tu apellido" />
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Correo electrónico
                <input type="email" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="correo@ejemplo.com" />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Teléfono
                <input type="tel" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="(555) 123-4567" />
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Método de contacto preferido
                <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <option>WhatsApp</option>
                  <option>Llamada</option>
                  <option>Correo electrónico</option>
                </select>
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Mejor horario para contactar
                <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <option>Mañana</option>
                  <option>Tarde</option>
                  <option>Noche</option>
                </select>
              </label>
            </div>

            <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <input type="checkbox" className="mt-1 h-4 w-4" />
              <span>
                Autorizo a MyGcover y a sus representantes a contactarme por teléfono, mensaje de texto, WhatsApp o correo electrónico en relación con mi solicitud de información. Entiendo que esta autorización no constituye una solicitud formal de seguro ni garantiza elegibilidad o aprobación.
              </span>
            </label>

            <div className="flex items-center justify-between gap-4 pt-4">
              <Link href="/privacidad" className="text-sm font-medium text-[#1d5cdd] underline underline-offset-4">Política de Privacidad</Link>
              <button type="button" className="primary-button">
                Guardar mi resultado
              </button>
            </div>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="container-shell py-10 md:py-14">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(11,31,58,0.08)] md:p-8">
        <div className="mb-8 flex items-center justify-between text-sm text-slate-500">
          <span>Evaluación inicial de protección</span>
          <span>{stepIndex + 1}/{steps.length}</span>
        </div>

        <div className="mb-8 h-2.5 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-gradient-to-r from-[#1d5cdd] to-[#3cb97a]" style={{ width: `${progress}%` }} />
        </div>

        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eaf3ff] text-[#1d5cdd]">
            <ShieldCheck size={20} />
          </div>
          <div>
            <p className="protect-badge text-[#1d5cdd]">MyGcover</p>
            <p className="text-sm text-slate-500">Evaluación inicial de protección</p>
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-[#0b1f3a] md:text-4xl">{currentStep.question}</h1>

        {currentStep.id === "country" && answers.country === "Estados Unidos" && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-slate-700">¿En qué estado vives?</label>
            <select
              value={answers.state}
              onChange={(e) => updateAnswer("state", e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <option value="">Selecciona tu estado</option>
              {states.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        )}

        {currentStep.type === "single" && currentStep.id !== "country" && (
          <div className="mt-8 grid gap-4">
            {currentStep.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => updateAnswer(currentStep.id as keyof typeof answers, option)}
                className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left text-base font-medium transition ${answers[currentStep.id as keyof typeof answers] === option ? "border-[#1d5cdd] bg-[#edf5ff] text-[#0b1f3a]" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300"}`}
              >
                <span>{option}</span>
                <span className="h-5 w-5 rounded-full border border-current" />
              </button>
            ))}
          </div>
        )}

        {currentStep.type === "multi" && (
          <div className="mt-8 grid gap-4">
            {currentStep.options.map((option) => {
              const checked = answers.goal.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    const nextValues = checked
                      ? answers.goal.filter((item) => item !== option)
                      : [...answers.goal, option];
                    updateAnswer("goal", nextValues);
                  }}
                  className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left text-base font-medium transition ${checked ? "border-[#1d5cdd] bg-[#edf5ff] text-[#0b1f3a]" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300"}`}
                >
                  <span>{option}</span>
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full border ${checked ? "border-[#1d5cdd] bg-[#1d5cdd] text-white" : "border-slate-400"}`}>
                    {checked ? "✓" : ""}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {currentStep.id === "country" && (
          <div className="mt-8 grid gap-4">
            {currentStep.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => updateAnswer("country", option)}
                className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left text-base font-medium transition ${answers.country === option ? "border-[#1d5cdd] bg-[#edf5ff] text-[#0b1f3a]" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300"}`}
              >
                <span>{option}</span>
                <span className="h-5 w-5 rounded-full border border-current" />
              </button>
            ))}
          </div>
        )}

        {currentStep.explain && <p className="mt-5 text-sm text-slate-600">{currentStep.explain}</p>}

        {error && <p className="mt-5 text-sm font-medium text-red-600">{error}</p>}

        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={prevStep}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={stepIndex === 0}
          >
            <ArrowLeft size={16} /> Regresar
          </button>

          <button type="button" onClick={nextStep} className="primary-button">
            {stepIndex === steps.length - 1 ? "Ver mi resultado" : "Siguiente"}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </main>
  );
}
