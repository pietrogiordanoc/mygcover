import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function SeguroDeVidaPage() {
  return (
    <>
      <SiteHeader />
      <main className="container-shell py-16">
      <article className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(11,31,58,0.08)]">
        <p className="protect-badge text-[#1d5cdd]">Seguro de vida</p>
        <h1 className="mt-4 text-4xl font-extrabold text-[#0b1f3a] md:text-6xl">Seguro de vida: una herramienta para proteger a quienes te dependen.</h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          Un seguro de vida puede ayudar a ofrecer apoyo financiero a personas clave de tu familia o red de dependientes en caso de una pérdida importante. Los beneficios, costos y condiciones dependen del producto, la aseguradora y tu situación.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-[1.5rem] bg-[#f5f9ff] p-6">
            <h2 className="text-2xl font-bold text-[#0b1f3a]">¿Para qué sirve?</h2>
            <p className="mt-3 text-slate-600">Puede ayudar a cubrir gastos del hogar, deudas, educación o necesidades básicas de quienes dependen de tus ingresos.</p>
          </div>
          <div className="rounded-[1.5rem] bg-[#eefaf4] p-6">
            <h2 className="text-2xl font-bold text-[#0b1f3a]">Importante</h2>
            <p className="mt-3 text-slate-600">La disponibilidad del producto y los costos varían según tu edad, salud, país, estado, documentación y la aseguradora.</p>
          </div>
        </div>

        <div className="mt-10 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-2xl font-bold text-[#0b1f3a]">Preguntas frecuentes</h2>
          <ul className="mt-4 space-y-3 text-slate-600">
            <li>• ¿Cuánto podría costar? Depende del producto, la edad y el perfil de riesgo.</li>
            <li>• ¿Necesito un examen médico? Puede depender del producto y de la aseguradora.</li>
            <li>• ¿Todos los seguros tienen el mismo beneficio? No. Los términos y condiciones varían.</li>
          </ul>
        </div>

        <Link href="/evaluacion" className="primary-button mt-10">Comenzar evaluación gratuita</Link>
      </article>
    </main>
      <SiteFooter />
    </>
  );
}
