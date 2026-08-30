import Link from "next/link";

const footerLinks = [
  { label: "Evaluación", href: "/evaluacion" },
  { label: "Recursos", href: "/recursos" },
  { label: "Política de Privacidad", href: "/privacidad" },
  { label: "Términos de Uso", href: "/terminos" },
  { label: "Divulgaciones", href: "/divulgaciones" },
  { label: "Accesibilidad", href: "/accesibilidad" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-[#f7fbff]">
      <div className="container-shell py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#dfeeff] text-lg font-black text-[#0b1f3a]">
                M
              </div>
              <div>
                <p className="text-lg font-extrabold text-[#0b1f3a]">MyGcover</p>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Protección para cada etapa de tu vida</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">
              Orientación clara para entender seguros de vida, protección familiar y alternativas de cobertura en español.
            </p>
            <div className="mt-5 flex gap-4 text-sm text-slate-600">
              <Link href="https://instagram.com" className="hover:text-[#1d5cdd]">Instagram</Link>
              <Link href="https://www.youtube.com/@MyGcoverinsurance" className="hover:text-[#1d5cdd]">YouTube</Link>
              <Link href="https://wa.me/17863936274" className="hover:text-[#1d5cdd]">WhatsApp</Link>
              <Link href="mailto:info@mygcover.com" className="hover:text-[#1d5cdd]">Email</Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-slate-500">Navegación</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-[#1d5cdd]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-slate-500">Divulgación</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              MyGcover no es una compañía aseguradora. Los productos de seguro, cuando estén disponibles, son emitidos y respaldados por las compañías aseguradoras correspondientes. La disponibilidad, elegibilidad, cobertura, costos, beneficios y condiciones pueden variar según el producto, la compañía, el país, el estado y las circunstancias de cada solicitante. La información de este sitio es educativa y no constituye asesoría legal, fiscal o financiera.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">
          © {year} MyGcover. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
