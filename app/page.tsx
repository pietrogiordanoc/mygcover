"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  CreditCard,
  Globe2,
  HeartHandshake,
  HeartPulse,
  MessageCircleMore,
  Plane,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Video,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const heroSlides = [
  {
    label: "Seguro para familia",
    title: "Protección para tu familia y lo que más quieres cuidar",
    text: "Explora opciones de seguro de vida y cobertura para proteger a tus seres queridos, tus ingresos y tu calidad de vida en Estados Unidos y en toda América.",
    image: "/brand/family1.png",
    href: "/evaluacion",
  },
  {
    label: "IUL",
    title: "Protección con crecimiento potencial para el futuro",
    text: "Un seguro de vida indexado puede combinar cobertura con un componente de acumulación de valor vinculado a un índice, pensado para objetivos a mediano y largo plazo.",
    image: "/iul.png",
    href: "/iul",
  },
  {
    label: "Seguro de viaje",
    title: "Cobertura para salir con más tranquilidad",
    text: "Protege tus viajes nacionales e internacionales con opciones pensadas para viajar con mayor calma y seguridad, según tu destino y tu perfil.",
    image: "/travel.png",
    href: "/contacto",
  },
];

const trustPillars = [
  "Atención en español",
  "Presencia en Estados Unidos y toda América",
  "Evaluación inicial sin costo",
  "Orientación según tu situación",
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
    title: "IUL — Vida y acumulación de valor",
    text: "Nuestro producto destacado: protección de vida combinada con un componente de acumulación de valor vinculado a un índice.",
    icon: TrendingUp,
  },
  {
    title: "Seguro de vida a término",
    text: "Protección por un periodo determinado, pensada para cubrir necesidades específicas a un costo predecible.",
    icon: ShieldCheck,
  },
  {
    title: "Gastos finales (FEX)",
    text: "Opciones diseñadas para ayudar con gastos funerarios y otras obligaciones finales.",
    icon: Sparkles,
  },
  {
    title: "Seguro de salud",
    text: "Opciones de cobertura médica según tu ubicación y elegibilidad.",
    icon: HeartPulse,
  },
  {
    title: "Seguro de viaje",
    text: "Protección para viajes nacionales e internacionales.",
    icon: Plane,
  },
  {
    title: "Seguro de vida internacional",
    text: "Para personas que viven fuera de Estados Unidos, según elegibilidad.",
    icon: Globe2,
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
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const currentSlide = heroSlides[activeSlide];

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative isolate overflow-hidden py-16 md:py-20">
          <div className="absolute inset-0">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.label}
                className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                  index === activeSlide ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.label}
                  fill
                  sizes="100vw"
                  priority={index === 0}
                  className="object-cover object-center"
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#07182d]/95 via-[#0b1f3a]/82 to-[#0b1f3a]/25" />
          <div className="container-shell relative">
            <div className="max-w-2xl">
              <div className="mb-5 flex gap-2">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.label}
                    type="button"
                    aria-label={`Ver slide ${slide.label}`}
                    onClick={() => setActiveSlide(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      index === activeSlide ? "w-10 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>

              <p className="protect-badge mb-4 text-[#9cc5ff]">{currentSlide.label}</p>
              <h1 className="max-w-[640px] text-balance text-4xl font-extrabold tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
                {currentSlide.title}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/90">
                {currentSlide.text}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link href={currentSlide.href} className="primary-button">
                  Descubrir mis opciones <ArrowRight size={18} />
                </Link>
                <Link href="/contacto" className="secondary-button">
                  Hablar con un asesor
                </Link>
              </div>
              <p className="mt-5 text-sm font-medium text-white/90">Vida · IUL · Salud · Gastos finales · Beneficios en vida · Viajes</p>
              <p className="mt-2 text-xs text-white/70">
                La disponibilidad de productos, coberturas y requisitos varía según el país, el estado, la aseguradora y la elegibilidad.
              </p>
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
                Protección pensada para ti y toda tu familia en América
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Conoce soluciones que pueden ayudar a proteger a tu familia, tus ingresos y lo que estás construyendo.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
              Los beneficios en vida se explican dentro del IUL y de otros seguros de vida compatibles, según la póliza. La disponibilidad, elegibilidad, costos y beneficios dependen del producto, la aseguradora, el estado y la situación de cada solicitante.
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
                  Contenido sencillo para comprender seguros de vida, IUL, salud, viaje, beneficios en vida y opciones para hispanos en Estados Unidos y toda América.
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
                  "Seguro de vida para familias en Estados Unidos y América Latina.",
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
                <div className="relative h-[450px] overflow-hidden rounded-[1.5rem] bg-slate-100 sm:h-[500px] lg:h-full lg:min-h-[590px]">
                  <Image src="/brand/representative.png" alt="Representante de MyGcover" fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 45vw, 40vw" className="object-cover object-center" />
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
                  <p className="mt-2 text-xl font-bold text-[#0b1f3a]">Agente de Seguros Internacional</p>
                  <p className="mt-1 text-slate-600">Pietro Giordano</p>
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
