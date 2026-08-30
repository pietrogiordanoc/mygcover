import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-shell flex min-h-[60vh] items-center justify-center py-20">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-[0_18px_40px_rgba(11,31,58,0.08)]">
        <p className="protect-badge text-[#1d5cdd]">404</p>
        <h1 className="mt-4 text-4xl font-extrabold text-[#0b1f3a]">Página no encontrada</h1>
        <p className="mt-4 text-slate-600">La página que buscas no está disponible o aún se está preparando.</p>
        <Link href="/" className="primary-button mt-6">Volver al inicio</Link>
      </div>
    </main>
  );
}
