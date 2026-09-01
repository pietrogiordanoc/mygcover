import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="container-shell py-16">
      <div className="mx-auto max-w-4xl">
        <p className="protect-badge text-[#1d5cdd]">Sobre MyGcover</p>
        <h1 className="mt-4 text-4xl font-extrabold text-[#0b1f3a] md:text-6xl">Una orientación más humana</h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          MyGcover nace para hacer que los seguros de vida sean más fáciles de entender. Creemos en escuchar primero, explicar con claridad y presentar opciones de manera responsable.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(11,31,58,0.08)]">
            <div className="h-[430px] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#dfeeff] via-[#eef7ff] to-[#ebfaf3]">
              <Image src="/brand/me.png" alt="Pietro Giordano" width={520} height={430} className="h-full w-full object-cover object-top" />
            </div>
          </div>

          <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(11,31,58,0.08)]">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Perfil editable</p>
              <p className="mt-2 text-2xl font-bold text-[#0b1f3a]">Pietro Giordano</p>
              <p className="mt-1 text-slate-600">Embajador de seguros</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 text-sm text-slate-600">
              <div className="rounded-2xl bg-slate-50 p-4"><strong className="block text-[#0b1f3a]">Rol</strong> Embajador de seguros</div>
              <div className="rounded-2xl bg-slate-50 p-4"><strong className="block text-[#0b1f3a]">Áreas de enfoque</strong> Protección familiar y orientación</div>
              <div className="rounded-2xl bg-slate-50 p-4"><strong className="block text-[#0b1f3a]">Correo</strong> info@mygcover.com</div>
            </div>
            <Link href="/contacto" className="primary-button">Solicitar orientación</Link>
          </div>
        </div>
      </div>
      </main>
      <SiteFooter />
    </>
  );
}
