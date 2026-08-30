import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function ThanksPage() {
  return (
    <main className="container-shell py-20">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-[0_18px_40px_rgba(11,31,58,0.08)] md:p-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#eafaf2] text-[#158d5a]">
          <CheckCircle2 size={28} />
        </div>
        <p className="protect-badge text-[#1d5cdd]">Gracias</p>
        <h1 className="mt-4 text-4xl font-extrabold text-[#0b1f3a]">Gracias, recibimos tu información.</h1>
        <p className="mt-4 text-lg text-slate-600">
          Un representante de MyGcover podrá comunicarse contigo utilizando el método seleccionado.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/recursos" className="primary-button">Ver recursos <ArrowRight size={16} /></Link>
          <Link href="https://youtube.com" className="secondary-button">Visitar YouTube</Link>
          <Link href="https://instagram.com" className="secondary-button">Seguir Instagram</Link>
          <Link href="/simulador" className="secondary-button">Realizar el simulador</Link>
        </div>
      </div>
    </main>
  );
}
