import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function IulPage() {
  return (
    <>
      <SiteHeader />
      <main className="container-shell py-16">
      <article className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(11,31,58,0.08)]">
        <p className="protect-badge text-[#1d5cdd]">IUL</p>
        <h1 className="mt-4 text-4xl font-extrabold text-[#0b1f3a] md:text-6xl">¿Qué es un IUL? Seguro de vida indexado explicado en español.</h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          Un seguro de vida indexado, o IUL por sus siglas, es un producto que puede combinar protección con un componente de acumulación de valor que puede estar vinculado al desempeño de un índice. Dependiendo del producto, puede incluir costos, topes, pisos y condiciones específicas.
        </p>

        <div className="mt-8 rounded-[1.5rem] bg-[#f5f9ff] p-6 text-slate-600">
          Los seguros de vida indexados pueden incluir costos, cargos, límites de participación, topes, pisos y otras condiciones. El desempeño pasado de un índice no garantiza resultados futuros. Los resultados reales dependen de la póliza y de sus condiciones.
        </div>

        <Link href="/evaluacion" className="primary-button mt-10">Solicitar orientación personalizada</Link>
      </article>
    </main>
  );
}
