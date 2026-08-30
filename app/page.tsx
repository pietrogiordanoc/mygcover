import Link from "next/link";
import { ArrowRight, BadgeCheck, BookOpenText, CheckCircle2, CircleDollarSign, HeartHandshake, MessageCircleMore, ShieldCheck, Sparkles, TrendingUp, Video } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const trustPillars = [
  "Atención en español",
  "Orientación personalizada",
  "Opciones según cada situación",
  "Acompañamiento durante el proceso",
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
    text: "Algunos productos pueden desarrollar valor en efectivo de acuerdo con sus costos, condiciones y desempeño.",
    icon: CircleDollarSign,
  },
  {
    title: "Gastos finales",
    text: "Existen opciones diseñadas para ayudar a cubrir gastos funerarios y otras obligaciones finales.",
    icon: Sparkles,
  },
];

const faqList = [
  { q: "¿Qué es un seguro de vida?", a: "Es un producto diseñado para brindar apoyo financiero a personas o familias ante una pérdida importante, según los términos de la póliza y la elegibilidad." },
  { q: "¿Qué es un seguro de vida indexado o IUL?", a: "Un IUL combina protección con un componente de acumulación de valor que puede estar vinculado al desempeño de un índice. Sus costos y condiciones varían según el producto y la aseguradora." },
  { q: "¿MyGcover es una compañía aseguradora?", a: "No. MyGcover es una marca de orientación y asesoría; cuando corresponde, puede conectar a personas con profesionales de seguros para recibir orientación adicional." },
  { q: "¿La evaluación inicial tiene costo?", a: "La evaluación inicial es una orientación sin costo y sin compromiso, orientada a conocer necesidades básicas y posibles opciones." },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="pt-8 pb-16 md:pt-12 md:pb-20">
          <div className="container-shell">
            <div className="grid-hero items-center">
              <div>
                <p className="protect-badge text-[#1d5cdd] mb-4">Protección para cada etapa de tu vida</p>
                <h1 className="text-balance text-4xl font-extrabold tracking-tight text-[#0b1f3a] sm:text-5xl lg:text-6xl">
                  Descubre una protección que tenga sentido para ti.
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                  Responde unas preguntas sencillas y conoce qué tipos de protección podrías explorar según tus necesidades, objetivos y presupuesto.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link href="/evaluacion" className="primary-button">
                    Comenzar evaluación gratuita <ArrowRight size={18} />
                  </Link>
                  <Link href="/simulador" className="secondary-button">
                    Explorar cuánto podría aportar
                  </Link>
                </div>
                <p className="mt-5 text-sm text-slate-600">
                  Orientación en español · Evaluación inicial sin costo · Sin compromiso
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  Los resultados son orientativos y no garantizan elegibilidad ni aprobación.
                </p>
              </div>

              <div className="hero-visual card-surface p-6 md:p-8">
                <div className="relative h-full min-h-[500px] rounded-[1.5rem] border border-white/60 bg-white/35 p-6 backdrop-blur-sm">
                  <div className="absolute inset-x-10 top-10 h-40 rounded-[2rem] bg-gradient-to-br from-[#dfeeff] via-white to-[#edf9f3] shadow-[0_24px_60px_rgba(29,92,221,0.12)]" />
                  <div className="absolute left-8 top-12 h-36 w-36 rounded-full bg-[#dfeeff] ring-8 ring-white/80" />
                  <div className="absolute right-8 bottom-12 h-44 w-44 rounded-full bg-[#ddf6ea] ring-8 ring-white/80" />
                  <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-[#aac2ff] bg-white/80 shadow-[0_18px_40px_rgba(11,31,58,0.08)]" />
                  <div className="absolute bottom-10 left-8 right-8 rounded-[1.5rem] bg-[#0b1f3a] p-5 text-white shadow-[0_12px_30px_rgba(11,31,58,0.2)]">
                    <p className="text-xs uppercase tracking-[0.2em] text-blue-200">MyGcover</p>
                    <p className="mt-4 text-xl font-semibold">Protección para cada etapa de tu vida.</p>
                    <div className="mt-4 flex items-center gap-3 text-sm text-blue-100">
                      <BadgeCheck size={16} className="text-[#7ce2b1]" />
                      Claridad, protección y acompañamiento
                    </div>
                  </div>
                </div>
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

        <section className="py-20">
          <div className="container-shell">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="protect-badge text-[#1d5cdd]">Nuestra propuesta</p>
              <h2 className="mt-4 text-3xl font-extrabold text-[#0b1f3a] md:text-5xl">
                Un seguro debe entenderse antes de contratarse.
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                En MyGcover queremos que conozcas tus opciones, comprendas sus beneficios y puedas tomar una decisión informada.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {valueCards.map(({ title, text, icon: Icon }) => (
                <article key={title} className="card-surface rounded-[1.5rem] p-7">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf3ff] text-[#1d5cdd]">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0b1f3a]">{title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#eef5ff] py-20">
          <div className="container-shell">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="protect-badge text-[#1d5cdd]">Soluciones</p>
              <h2 className="mt-4 text-3xl font-extrabold text-[#0b1f3a] md:text-5xl">
                Protección pensada para la vida real
              </h2>
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
              Los beneficios, condiciones, costos y disponibilidad varían según el producto, la aseguradora, el país y el estado.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container-shell">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(11,31,58,0.08)] md:p-12">
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <p className="protect-badge text-[#1d5cdd]">Evaluación inicial</p>
                  <h2 className="mt-4 text-3xl font-extrabold text-[#0b1f3a] md:text-5xl">
                    Responde preguntas clave y descarga claridad.
                  </h2>
                  <p className="mt-4 max-w-xl text-lg text-slate-600">
                    Una guía rápida para entender qué tipo de protección podría tener sentido según tu etapa, situación y metas.
                  </p>
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Link href="/evaluacion" className="primary-button">
                      Comenzar evaluación gratuita <ArrowRight size={18} />
                    </Link>
                    <Link href="/simulador" className="secondary-button">
                      Explorar mis opciones
                    </Link>
                  </div>
                </div>
                <div className="rounded-[1.5rem] bg-[#f4f9ff] p-6">
                  <div className="space-y-4">
                    {[
                      "¿Qué protección necesitas?",
                      "¿Cuánto te acomoda aportar?",
                      "¿Qué tan sensible es tu situación?",
                      "¿Qué prioridad tiene tu familia?",
                    ].map((step) => (
                      <div key={step} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dfeeff] text-[#1d5cdd] font-bold">✓</div>
                        <span className="font-medium text-slate-700">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#0b1f3a] py-20 text-white">
          <div className="container-shell">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="protect-badge text-blue-200">Aprende con MyGcover</p>
                <h2 className="mt-3 text-3xl font-extrabold md:text-5xl">Contenido útil para entender mejor tus opciones.</h2>
              </div>
              <div className="flex gap-4">
                <Link href="https://www.youtube.com/@MyGcoverinsurance" className="secondary-button border-white/20 bg-white/5 text-white hover:bg-white/10">Visitar YouTube</Link>
                <Link href="https://instagram.com" className="secondary-button border-white/20 bg-white/5 text-white hover:bg-white/10">Seguir en Instagram</Link>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 p-3">
                <div className="aspect-video rounded-[1.25rem] bg-gradient-to-br from-[#dfeeff] via-[#a6d3ff] to-[#dff8eb] p-6 text-[#0b1f3a]">
                  <div className="flex h-full items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/80 text-[#1d5cdd] shadow-xl">
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

        <section className="py-20">
          <div className="container-shell">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="protect-badge text-[#1d5cdd]">Proceso</p>
              <h2 className="mt-4 text-3xl font-extrabold text-[#0b1f3a] md:text-5xl">
                Comenzar es más sencillo de lo que parece
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
              {[
                ["Cuéntanos sobre ti", "Completa la evaluación inicial y dinos qué quieres proteger."],
                ["Revisamos tu situación", "Consideramos tu edad, ubicación, objetivo y presupuesto."],
                ["Exploramos opciones", "Un representante puede ayudarte a conocer alternativas disponibles."],
                ["Tú decides", "Si encuentras una opción adecuada, te acompañamos durante la solicitud."],
              ].map(([title, text], index) => (
                <div key={title} className="card-surface rounded-[1.5rem] p-6">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#dfeeff] font-bold text-[#1d5cdd]">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-[#0b1f3a]">{title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link href="/evaluacion" className="primary-button">
                Comenzar mi evaluación
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[#f5f9ff] py-20">
          <div className="container-shell">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(11,31,58,0.08)]">
                <div className="relative mx-auto h-[430px] max-w-[320px] rounded-[2rem] bg-gradient-to-br from-[#dfeeff] via-[#edf7ff] to-[#eafaf2] p-6">
                  <div className="absolute inset-x-8 bottom-8 h-28 rounded-[1.25rem] bg-[#0b1f3a] shadow-xl" />
                  <div className="absolute left-1/2 top-8 h-40 w-40 -translate-x-1/2 rounded-full bg-white shadow-[0_18px_35px_rgba(11,31,58,0.10)]" />
                  <div className="absolute left-1/2 top-14 h-32 w-24 -translate-x-1/2 rounded-[5rem] bg-[#cfe1ff]" />
                </div>
              </div>

              <div>
                <p className="protect-badge text-[#1d5cdd]">Sobre MyGcover</p>
                <h2 className="mt-4 text-3xl font-extrabold text-[#0b1f3a] md:text-5xl">
                  Una orientación más humana
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">
                  MyGcover nace para hacer que los seguros de vida sean más fáciles de entender. Creemos en escuchar primero, explicar con claridad y presentar opciones de manera responsable.
                </p>
                <div className="mt-8 rounded-[1.5rem] border border-slate-200 bg-white p-6">
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Perfil editable</p>
                  <p className="mt-2 text-xl font-bold text-[#0b1f3a]">Nombre completo</p>
                  <p className="mt-1 text-slate-600">Embajador de seguros / orientador</p>
                  <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
                    <span className="rounded-full bg-[#edf5ff] px-3 py-1">Licencia: por definir</span>
                    <span className="rounded-full bg-[#edf5ff] px-3 py-1">Estados: por definir</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-shell">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="protect-badge text-[#1d5cdd]">Preguntas frecuentes</p>
              <h2 className="mt-4 text-3xl font-extrabold text-[#0b1f3a] md:text-5xl">Respuestas claras para decisiones informadas.</h2>
            </div>
            <div className="mx-auto max-w-4xl space-y-4">
              {faqList.map(({ q, a }) => (
                <details key={q} className="group rounded-[1.25rem] border border-slate-200 bg-white p-5 shadow-sm open:bg-[#f7fbff]">
                  <summary className="cursor-pointer list-none font-semibold text-[#0b1f3a]">{q}</summary>
                  <p className="mt-3 text-slate-600">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="container-shell">
            <div className="rounded-[2rem] bg-[#0b1f3a] p-8 text-white md:p-12">
              <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
                <div>
                  <p className="protect-badge text-blue-200">Contacto</p>
                  <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">Hablemos de lo que quieres proteger</h2>
                  <p className="mt-4 max-w-xl text-lg text-blue-100">
                    Si tienes dudas, quieres conversar con un agente o simplemente necesitas orientación, estamos aquí para ayudarte.
                  </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row md:flex-col xl:flex-row">
                  <Link href="/contacto" className="primary-button bg-white text-[#0b1f3a] shadow-none">Solicitar orientación</Link>
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
