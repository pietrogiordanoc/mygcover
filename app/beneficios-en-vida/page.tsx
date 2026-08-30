import Link from "next/link";

export default function BenefitsPage() {
  return (
    <main className="container-shell py-16">
      <article className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(11,31,58,0.08)]">
        <p className="protect-badge text-[#1d5cdd]">Beneficios en vida</p>
        <h1 className="mt-4 text-4xl font-extrabold text-[#0b1f3a] md:text-6xl">Beneficios en vida: cómo pueden funcionar en un seguro de vida.</h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          Algunos seguros pueden permitir acceder anticipadamente a una parte del beneficio en determinadas situaciones cubiertas. Estas opciones dependen del producto, la aseguradora y la póliza elegida.
        </p>

        <div className="mt-8 rounded-[1.5rem] border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-bold text-[#0b1f3a]">¿Qué debes revisar?</h2>
          <ul className="mt-4 space-y-3 text-slate-600">
            <li>• Qué situaciones están cubiertas.</li>
            <li>• Qué parte del beneficio puede accederse.</li>
            <li>• Qué costos o condiciones aplican.</li>
          </ul>
        </div>

        <Link href="/evaluacion" className="primary-button mt-10">Comenzar evaluación</Link>
      </article>
    </main>
  );
}
