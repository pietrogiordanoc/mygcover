import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="container-shell py-16">
      <article className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(11,31,58,0.08)]">
        <p className="protect-badge text-[#1d5cdd]">Política de Privacidad</p>
        <h1 className="mt-4 text-4xl font-extrabold text-[#0b1f3a]">Política de Privacidad</h1>
        <div className="mt-8 space-y-5 text-slate-600">
          <p>MyGcover recopila información personal únicamente para orientar, evaluar y contactar a personas interesadas en protección y seguros de vida.</p>
          <p>Los datos pueden incluir nombre, correo electrónico, teléfono, país, estado, objetivos y consentimiento para contacto. La información se usa con fines de orientación, preparación de evaluaciones y comunicación relacionada con la solicitud de información.</p>
          <p>La información no se comparte con terceros sin consentimiento, salvo requisitos legales o de seguridad. Los visitantes pueden solicitar la eliminación o actualización de sus datos según los procedimientos aplicables.</p>
          <p>Los textos legales y los requisitos de privacidad deben revisarse con asesoría legal antes de la publicación en producción.</p>
        </div>
      </article>
    </main>
  );
}
