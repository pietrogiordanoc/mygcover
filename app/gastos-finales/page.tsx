import Link from "next/link";

export default function FinalExpensesPage() {
  return (
    <main className="container-shell py-16">
      <article className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(11,31,58,0.08)]">
        <p className="protect-badge text-[#1d5cdd]">Gastos finales</p>
        <h1 className="mt-4 text-4xl font-extrabold text-[#0b1f3a] md:text-6xl">Seguro para gastos finales: una forma de preparar lo inevitable con calma.</h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          Existen opciones diseñadas para ayudar a cubrir gastos funerarios y otras obligaciones finales. Pueden servir para aliviar la carga financiera de la familia en un momento ya difícil.
        </p>
        <Link href="/evaluacion" className="primary-button mt-10">Evaluar mi caso</Link>
      </article>
    </main>
  );
}
