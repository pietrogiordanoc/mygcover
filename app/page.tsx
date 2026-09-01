"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  CircleDollarSign,
  CreditCard,
  HeartHandshake,
  MessageCircleMore,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Video,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const trustPillars = [
  "Atención en español",
  "Enfoque en el mercado estadounidense",
  "Evaluación inicial sin costo",
  "Orientación según tu situación",
];

const states = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawái","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Misisipi","Missouri","Montana","Nebraska","Nevada","Nuevo Hampshire","Nueva Jersey","Nuevo México","Nueva York","Carolina del Norte","Dakota del Norte","Ohio","Oklahoma","Oregón","Pensilvania","Rhode Island","Carolina del Sur","Dakota del Sur","Tennessee","Texas","Utah","Vermont","Virginia","Washington","Virginia Occidental","Wisconsin","Wyoming","Washington D.C.",
];

const latamCountries = [
  "México",
  "Puerto Rico",
  "República Dominicana",
  "Colombia",
  "Venezuela",
  "Argentina",
  "Chile",
  "Perú",
  "Ecuador",
  "Panamá",
  "Costa Rica",
  "Otro país de América",
];

const valueCards = [
  {
    title: "Claridad",
    text: "Explicamos las opciones con palabras sencillas y sin complicaciones innecesarias.",
    icon: BookOpenText,
  },
  {
    title: "Protección",
    text: "Exploramos alternativas pensadas para proteger a tu familia y lo que estás construyendo.",
    icon: ShieldCheck,
  },
  {
    title: "Acompañamiento",
    text: "Te orientamos desde la primera conversación hasta el proceso de solicitud.",
    icon: HeartHandshake,
  },
];

const solutionCards = [
  {
    title: "Seguro de vida",
    text: "Puede proporcionar protección económica para las personas que dependen de ti si llegaras a faltar.",
    icon: ShieldCheck,
  },
  {
    title: "Beneficios en vida",
    text: "Algunas pólizas permiten acceder anticipadamente a una parte del beneficio en determinadas situaciones cubiertas.",
    icon: TrendingUp,
  },
  {
    title: "Acumulación de valor",
    text: "Algunos productos pueden desarrollar valor en efectivo según sus costos, condiciones y desempeño.",
    icon: CircleDollarSign,
  },
  {
    title: "Gastos finales",
    text: "Existen opciones diseñadas para ayudar con gastos funerarios y otras obligaciones finales.",
    icon: Sparkles,
  },
];

const toolCards = [
  {
    title: "Evaluación de protección",
    text: "Responde unas preguntas y descubre qué tipos de protección podrías explorar.",
    detail: "2 minutos · Resultado orientativo",
    href: "/evaluacion",
    cta: "Comenzar evaluación",
    featured: true,
  },
  {
    title: "Simulador de aportes",
    text: "Explora escenarios educativos según tu edad, presupuesto mensual y objetivo.",
    detail: "Montos expresados en dólares estadounidenses",
    href: "/simulador",
    cta: "Explorar mis aportes",
    featured: false,
  },
  {
    title: "Guías en español",
    text: "Aprende sobre seguros de vida, IUL, ITIN, beneficios en vida y gastos finales.",
    detail: "Información educativa",
    href: "/guias",
    cta: "Ver guías gratuitas",
    featured: false,
  },
];

const faqList = [
  { q: "¿Qué es un seguro de vida?", a: "Es un producto diseñado para brindar apoyo financiero a personas o familias ante una pérdida importante, según los términos de la póliza y la elegibilidad." },
  { q: "¿Qué es un seguro de vida indexado o IUL?", a: "Un IUL combina protección con un componente de acumulación de valor que puede estar vinculado al desempeño de un índice. Sus costos y condiciones varían según el producto y la aseguradora." },
  { q: "¿Qué son los beneficios en vida?", a: "Son beneficios que algunas pólizas permiten acceder de manera anticipada en determinadas situaciones cubiertas, según la póliza y las condiciones aplicables." },
  { q: "¿Puedo explorar opciones si tengo ITIN?", a: "En algunos casos, las personas con ITIN pueden explorar opciones según el producto, la aseguradora y la ubicación. La elegibilidad puede variar." },
  { q: "¿Puedo recibir orientación si estoy en proceso migratorio?", a: "Sí. La evaluación inicial es educativa y puede ayudarte a entender mejor tus opciones y el siguiente paso, según tu situación y ubicación." },
  { q: "¿MyGcover es una compañía aseguradora?", a: "No. MyGcover es una marca de orientación y asesoría. Cuando corresponde, puede conectar a personas con agentes de seguros para recibir orientación adicional." },
  { q: "¿La evaluación inicial tiene costo?", a: "La evaluación inicial es una orientación sin costo y sin compromiso, orientada a conocer tus necesidades básicas y posibles opciones." },
  { q: "¿Los resultados del simulador son garantizados?", a: "No. El simulador es educativo y orientativo. No representa una cotización ni una ilustración oficial, ni garantiza aprobación, elegibilidad o cobertura." },
  { q: "¿Puedo recibir orientación fuera de Estados Unidos?", a: "Sí. Si vives en otro país de América, también podemos revisar tu situación y explicar si existen opciones relevantes para tu ubicación." },
];

export default function Home() {
  const router = useRouter();
  const [locationType, setLocationType] = useState<"us" | "latam">("us");
  const [selectedState, setSelectedState] = useState("");
  const [selectedLatamCountry, setSelectedLatamCountry] = useState("México");
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (locationType === "us") {
      if (!selectedState) {
        setError("Selecciona tu estado para continuar.");
        return;
      }

      const payload = { country: "Estados Unidos", state: selectedState };
      sessionStorage.setItem("mygcover-location", JSON.stringify(payload));
      router.push(`/evaluacion?country=${encodeURIComponent(payload.country)}&state=${encodeURIComponent(payload.state)}`);
      return;
    }

    const payload = { country: selectedLatamCountry, state: "" };
    sessionStorage.setItem("mygcover-location", JSON.stringify(payload));
    router.push(`/evaluacion?country=${encodeURIComponent(payload.country)}`);
  };

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative isolate overflow-hidden py-16 md:py-20">
          <Image src="/brand/family1.png" alt="Familia hispana frente a su hogar" fill sizes="100vw" className="-z-20 object-cover object-[65%_center]" priority />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#07182d]/95 via-[#0b1f3a]/82 to-[#0b1f3a]/25" />
          <div className="container-shell">
            <div className="max-w-2xl">
                <p className="protect-badge mb-4 text-[#9cc5ff]">SEGUROS DE VIDA PARA HISPANOS EN ESTADOS UNIDOS</p>
                <h1 className="max-w-[640px] text-balance text-4xl font-extrabold tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
                  Descubre la protección que tiene sentido para ti.
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-white/90">
                  Responde unas preguntas sencillas y conoce qué tipos de protección podrías explorar según tu situación, tus objetivos y tu presupuesto.
                </p>
                <p className="mt-4 text-base font-medium text-[#b8d5ff]">
                  Atención en español para personas y familias en Estados Unidos.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link href="/evaluacion" className="primary-button">
                    Comenzar evaluación gratuita <ArrowRight size={18} />
                  </Link>
                  <Link href="/simulador" className="secondary-button">
                    Explorar mis opciones
                  </Link>
                </div>
                <p className="mt-5 text-sm text-white/90">Solo toma 2 minutos · Sin costo · Sin compromiso</p>
                <p className="mt-2 text-xs text-white/70">
                  Los resultados son educativos y no garantizan elegibilidad, cobertura ni aprobación.
                </p>

                <div className="mt-10 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(11,31,58,0.06)]">
                  <p className="text-xl font-extrabold text-[#0b1f3a]">Comienza por decirnos dónde vives</p>
                  <p className="mt-2 text-base text-slate-600">¿Vives actualmente en Estados Unidos?</p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => {
                        setLocationType("us");
                        setError("");
                      }}
                      className={`rounded-2xl border px-4 py-4 text-left text-base font-medium transition ${locationType === "us" ? "border-[#1d5cdd] bg-[#edf5ff] text-[#0b1f3a]" : "border-slate-200 bg-slate-50 text-slate-700"}`}
                    >
                      Sí, vivo en Estados Unidos
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLocationType("latam");
                        setError("");
                      }}
                      className={`rounded-2xl border px-4 py-4 text-left text-base font-medium transition ${locationType === "latam" ? "border-[#1d5cdd] bg-[#edf5ff] text-[#0b1f3a]" : "border-slate-200 bg-slate-50 text-slate-700"}`}
                    >
                      Vivo en otro país de América
                    </button>
                  </div>

                  {locationType === "us" ? (
                    <div className="mt-5">
                      <label className="block text-sm font-medium text-slate-700">Selecciona tu estado</label>
                      <select
                        value={selectedState}
                        onChange={(event) => {
                          setSelectedState(event.target.value);
                          setError("");
                        }}
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-700"
                      >
                        <option value="">Selecciona tu estado</option>
                        {states.map((state) => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div className="mt-5">
                      <label className="block text-sm font-medium text-slate-700">Selecciona tu país</label>
                      <select
                        value={selectedLatamCountry}
                        onChange={(event) => setSelectedLatamCountry(event.target.value)}
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-700"
                      >
                        {latamCountries.map((country) => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                      </select>
                      <p className="mt-3 text-sm text-slate-600">Revisaremos si existen opciones disponibles para tu ubicación.</p>
                    </div>
                  )}

                  {error ? <p className="mt-4 text-sm font-medium text-red-600">{error}</p> : null}

                  <button type="button" onClick={handleContinue} className="primary-button mt-5 w-full justify-center sm:w-auto">
                    Continuar mi evaluación
                  </button>
                </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200/80 bg-white/70">
          <div className="container-shell py-5">
            <div className="grid gap-3 text-center md:grid-cols-4">
              {trustPillars.map((item) => (
                <div key={item} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="como-te-ayudamos" className="py-20">
          <div className="container-shell">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="protect-badge text-[#1d5cdd]">PROTECCIÓN</p>
              <h2 className="mt-4 text-3xl font-extrabold text-[#0b1f3a] md:text-5xl">
                Protección pensada para la vida en Estados Unidos
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Conoce soluciones que pueden ayudar a proteger a tu familia, tus ingresos y lo que estás construyendo.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {solutionCards.map(({ title, text, icon: Icon }) => (
                <article key={title} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eff9f4] text-[#158d5a]">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0b1f3a]">{title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">{text}</p>
                </article>
              ))}
            </div>

            <p className="mt-8 text-center text-sm text-slate-600">
              La disponibilidad, elegibilidad, costos y beneficios dependen del producto, la aseguradora, el estado y la situación de cada solicitante.
            </p>
          </div>
        </section>

        <section className="bg-[#f5f9ff] py-20">
          <div className="container-shell">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="protect-badge text-[#1d5cdd]">EXPLORA TUS OPCIONES</p>
              <h2 className="mt-4 text-3xl font-extrabold text-[#0b1f3a] md:text-5xl">Haz algo útil hoy por tu protección.</h2>
              <p className="mt-4 text-lg text-slate-600">
                Utiliza nuestras herramientas gratuitas para entender mejor tus necesidades antes de conversar con un representante.
              </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
              {toolCards.map(({ title, text, detail, href, cta, featured }) => (
                <article
                  key={title}
                  className={`rounded-[1.75rem] border p-6 shadow-[0_18px_40px_rgba(11,31,58,0.05)] ${featured ? "border-[#1d5cdd]/20 bg-[#edf5ff]" : "border-slate-200 bg-white"}`}
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#1d5cdd] shadow-sm">
                    {featured ? <ShieldCheck size={22} /> : <CreditCard size={22} />}
                  </div>
                  <h3 className="text-2xl font-bold text-[#0b1f3a]">{title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">{text}</p>
                  <p className="mt-4 text-sm font-medium text-slate-500">{detail}</p>
                  <div className="mt-6">
                    <Link href={href} className={featured ? "primary-button" : "secondary-button"}>
                      {cta} <ArrowRight size={18} />
                    </Link>
                  </div>
                  {!featured && <p className="mt-4 text-xs text-slate-500">No representa una cotización ni una ilustración oficial.</p>}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-shell">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(11,31,58,0.08)] md:p-12">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <p className="protect-badge text-[#1d5cdd]">EVALUACIÓN</p>
                  <h2 className="mt-4 text-3xl font-extrabold text-[#0b1f3a] md:text-5xl">Paso 1 de 7</h2>
                  <p className="mt-5 text-xl font-semibold text-[#0b1f3a]">¿Qué quieres proteger principalmente?</p>
                  <div className="mt-5 space-y-3">
                    {[
                      "Mi familia",
                      "Mis ingresos",
                      "Mis hijos",
                      "Mi vivienda o deudas",
                      "Mi futuro financiero",
                      "Todavía no lo sé",
                    ].map((item) => (
                      <div key={item} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-700">
                        <span>{item}</span>
                        <span className="h-5 w-5 rounded-full border border-slate-400" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-1/7 rounded-full bg-gradient-to-r from-[#1d5cdd] to-[#3cb97a]" />
                  </div>
                  <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                    <Link href="/evaluacion" className="primary-button">
                      Comenzar mi evaluación
                    </Link>
                  </div>
                </div>

                <div className="rounded-[1.75rem] bg-[#f4f9ff] p-6">
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Tu orientación inicial puede ayudarte a identificar:</p>
                  <ul className="mt-5 space-y-4 text-base text-slate-700">
                    <li className="flex items-start gap-3"><span className="mt-0.5 text-[#158d5a]">✓</span> Tu prioridad de protección</li>
                    <li className="flex items-start gap-3"><span className="mt-0.5 text-[#158d5a]">✓</span> Un presupuesto mensual cómodo</li>
                    <li className="flex items-start gap-3"><span className="mt-0.5 text-[#158d5a]">✓</span> Beneficios que podrías explorar</li>
                    <li className="flex items-start gap-3"><span className="mt-0.5 text-[#158d5a]">✓</span> El próximo paso recomendado</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#0b1f3a] py-20 text-white">
          <div className="container-shell">
            <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="protect-badge text-blue-200">VIDEO Y EDUCACIÓN</p>
                <h2 className="mt-3 text-3xl font-extrabold md:text-5xl">Seguros explicados en español</h2>
                <p className="mt-4 max-w-2xl text-lg text-blue-100">
                  Contenido sencillo para comprender seguros de vida, IUL, beneficios en vida y opciones para hispanos en Estados Unidos.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="https://www.youtube.com/@MyGcoverinsurance" className="secondary-button border-white/20 bg-white/5 text-white hover:bg-white/10">Visitar YouTube</Link>
                <Link href="https://instagram.com" className="secondary-button border-white/20 bg-white/5 text-white hover:bg-white/10">Seguir en Instagram</Link>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 p-3">
                <div className="relative aspect-video overflow-hidden rounded-[1.25rem] bg-[#dfeeff] text-[#0b1f3a]">
                  <Image src="/brand/youtube-bg.png" alt="Contenido educativo de MyGcover" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0a1d35]/35 via-[#0a1d35]/10 to-[#122f4f]/20" />
                  <div className="relative flex h-full items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/80 text-[#1d5cdd] shadow-xl backdrop-blur-sm">
                      <Video size={34} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                {[
                  "¿Qué debes saber antes de comparar opciones de protección?",
                  "Beneficios en vida: cuándo pueden tener sentido.",
                  "Seguro de vida para familias en Estados Unidos.",
                ].map((video, index) => (
                  <div key={video} className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                    <div className="mb-3 flex h-20 items-center justify-center rounded-xl bg-gradient-to-r from-[#dfeeff] to-[#dff8eb] text-[#0b1f3a]">
                      <PlayVideoIcon />
                    </div>
                    <p className="text-sm text-blue-100">Video {index + 1}</p>
                    <p className="mt-2 font-medium text-white">{video}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f5f9ff] py-20">
          <div className="container-shell">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-3 shadow-[0_18px_40px_rgba(11,31,58,0.08)]">
                <div className="relative h-[430px] overflow-hidden rounded-[1.5rem] bg-slate-100">
                  <Image src="/brand/office-vert.jpg" alt="Equipo MyGcover" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f3a]/70 via-[#0b1f3a]/15 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur-md">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-blue-100">MyGcover</p>
                      <p className="mt-1 font-semibold">Atención personalizada</p>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-[#7ce2b1]">
                      <BadgeCheck size={20} />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="protect-badge text-[#1d5cdd]">SOBRE MYGCOVER</p>
                <h2 className="mt-4 text-3xl font-extrabold text-[#0b1f3a] md:text-5xl">Una orientación clara, humana y en español.</h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">
                  MyGcover nace para ayudar a la comunidad hispana a comprender mejor los seguros de vida y explorar opciones de protección de manera responsable.
                </p>
                <p className="mt-5 text-lg leading-8 text-slate-600">
                  Escuchamos tu situación, explicamos las alternativas disponibles y te acompañamos durante el proceso cuando decides avanzar.
                </p>
                <div className="mt-8 rounded-[1.5rem] border border-slate-200 bg-white p-6">
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Representante</p>
                  <p className="mt-2 text-xl font-bold text-[#0b1f3a]">Nombre del representante</p>
                  <p className="mt-1 text-slate-600">Agente de seguros licenciado</p>
                  <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
                    <span className="rounded-full bg-[#edf5ff] px-3 py-1">Número de licencia: cuando corresponda</span>
                    <span className="rounded-full bg-[#edf5ff] px-3 py-1">Estados atendidos</span>
                  </div>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link href="/contacto" className="secondary-button">Conocer más</Link>
                    <Link href="/contacto" className="secondary-button">Verificar información profesional</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-shell">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="protect-badge text-[#1d5cdd]">PREGUNTAS FRECUENTES</p>
              <h2 className="mt-4 text-3xl font-extrabold text-[#0b1f3a] md:text-5xl">Respuestas claras para decisiones informadas.</h2>
            </div>
            <div className="mx-auto max-w-4xl space-y-4">
              {faqList.map(({ q, a }) => (
                <details key={q} className="group rounded-[1.25rem] border border-slate-200 bg-white p-5 shadow-sm open:bg-[#f7fbff]">
                  <summary className="cursor-pointer list-none font-semibold text-[#0b1f3a]">{q}</summary>
                  <p className="mt-3 text-base leading-7 text-slate-600">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="container-shell">
            <div className="rounded-[2rem] bg-[#0b1f3a] p-8 text-white md:p-12">
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div>
                  <p className="protect-badge text-blue-200">CONTACTO</p>
                  <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">Hablemos de lo que quieres proteger.</h2>
                  <p className="mt-4 max-w-xl text-lg text-blue-100">
                    Déjanos tus datos y recibe una orientación inicial en español.
                  </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">
                  <Link href="/contacto" className="primary-button bg-white text-[#0b1f3a] shadow-none">Recibir orientación</Link>
                  <a href="https://wa.me/17863936274" className="secondary-button border-white/20 bg-white/5 text-white hover:bg-white/10">Hablar por WhatsApp</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function PlayVideoIcon() {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#0b1f3a] shadow-md">
      <MessageCircleMore size={20} />
    </div>
  );
}
