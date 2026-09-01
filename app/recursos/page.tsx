import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const articles = [
  "¿Qué es un seguro de vida y para qué sirve?",
  "¿Qué es un IUL explicado de manera sencilla?",
  "¿Qué son los beneficios en vida?",
  "¿Puedo solicitar un seguro de vida con ITIN?",
  "¿Cuánto seguro de vida podría necesitar una familia?",
  "Seguro de vida temporal y permanente: diferencias básicas",
  "Errores comunes al elegir un seguro de vida",
  "¿Qué información se necesita para solicitar una póliza?",
];

export default function ResourcesPage() {
  return (
    <>
      <SiteHeader />
      <main className="container-shell py-16">
      <div className="mx-auto max-w-5xl">
        <p className="protect-badge text-[#1d5cdd]">Recursos</p>
        <h1 className="mt-4 text-4xl font-extrabold text-[#0b1f3a] md:text-6xl">Contenido útil para tomar decisiones con más claridad.</h1>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <article key={article} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(11,31,58,0.08)]">
              <p className="text-sm text-slate-500">Actualizado recientemente</p>
              <h2 className="mt-3 text-2xl font-bold text-[#0b1f3a]">{article}</h2>
              <p className="mt-3 text-slate-600">Introducción educativa para entender mejor la opción de seguros de vida y protección familiar.</p>
              <Link href="/evaluacion" className="primary-button mt-6">Comenzar evaluación</Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
