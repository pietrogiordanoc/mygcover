import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function SeguroConItinPage() {
  return (
    <>
      <SiteHeader />
      <main className="container-shell py-16">
      <article className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(11,31,58,0.08)]">
        <p className="protect-badge text-[#1d5cdd]">ITIN</p>
        <h1 className="mt-4 text-4xl font-extrabold text-[#0b1f3a] md:text-6xl">Seguro de vida con ITIN: opciones para hispanos en Estados Unidos.</h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          Algunas personas pueden requerir orientación específica si no tienen un número de Seguro Social o si cuentan con ITIN. La disponibilidad depende del producto, la aseguradora, el país y la situación migratoria.
        </p>
        <Link href="/evaluacion" className="primary-button mt-10">Solicitar orientación</Link>
      </article>
    </main>
  );
}
