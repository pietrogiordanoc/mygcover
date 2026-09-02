import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="container-shell py-16">
      <article className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(11,31,58,0.08)]">
        <p className="protect-badge text-[#1d5cdd]">Términos de Uso</p>
        <h1 className="mt-4 text-4xl font-extrabold text-[#0b1f3a]">Términos de Uso</h1>
        <div className="mt-8 space-y-5 text-slate-600">
          <p>El contenido de este sitio tiene fines educativos y de orientación general. No constituye una recomendación personalizada ni una oferta de seguro ni aprobación de producto.</p>
          <p>La información puede variar según país, estado, edad, salud, documentación y demás condiciones. La disponibilidad de productos depende de la aseguradora, el producto y la elegibilidad del solicitante.</p>
          <p>Se recomienda consultar con un profesional de seguros o representante autorizado para obtener información específica sobre productos disponibles antes de tomar decisiones finales.</p>
        </div>
      </article>
    </main>
      <SiteFooter />
    </>
  );
}
