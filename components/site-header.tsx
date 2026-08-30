import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Cómo te ayudamos", href: "/#como-te-ayudamos" },
  { label: "Evaluación", href: "/evaluacion" },
  { label: "Simulador", href: "/simulador" },
  { label: "Recursos", href: "/recursos" },
  { label: "Sobre MyGcover", href: "/sobre-mygcover" },
  { label: "Contacto", href: "/contacto" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="container-shell flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" aria-label="MyGcover inicio">
          <div className="flex h-11 w-28 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-slate-200">
            <Image src="/brand/logo.png" alt="MyGcover" width={160} height={44} priority className="h-auto w-full object-contain" />
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegación principal">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="text-sm font-medium text-slate-600 transition hover:text-[#1d5cdd]">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <button type="button" className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
            ES | EN
          </button>
          <Link href="/evaluacion" className="primary-button px-5 py-3 text-sm">
            Comenzar evaluación
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 lg:hidden"
          aria-label="Abrir menú"
        >
          <Menu size={18} />
        </button>
      </div>
    </header>
  );
}
