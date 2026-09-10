import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Conoce cómo MyGcover recopila, utiliza y protege la información proporcionada mediante sus formularios y servicios digitales.",
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="container-shell py-16">
      <article className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(11,31,58,0.08)]">
        <p className="protect-badge text-[#1d5cdd]">Política de Privacidad</p>
        <h1 className="mt-4 text-4xl font-extrabold text-[#0b1f3a]">Política de Privacidad</h1>
        <p className="mt-3 text-sm text-slate-500">Fecha de última actualización: 10 de septiembre de 2026.</p>

        <section className="mt-8 space-y-3 text-slate-600">
          <h2 className="text-2xl font-bold text-[#0b1f3a]">Quiénes somos</h2>
          <p>MyGcover ofrece información y orientación relacionada con opciones de seguros.</p>
          <p>MyGcover no es una compañía aseguradora.</p>
        </section>

        <section className="mt-8 space-y-3 text-slate-600">
          <h2 className="text-2xl font-bold text-[#0b1f3a]">Información que recopilamos</h2>
          <p>Cuando completas un formulario o una evaluación en nuestro sitio, podemos recopilar:</p>
          <ul className="space-y-2">
            <li>• Nombre.</li>
            <li>• Correo electrónico.</li>
            <li>• Número de teléfono.</li>
            <li>• País y estado o provincia, cuando se solicitan.</li>
            <li>• Preferencias de contacto.</li>
            <li>• Respuestas voluntarias enviadas mediante formularios o evaluaciones.</li>
            <li>• Consentimiento para ser contactado.</li>
            <li>• Datos de atribución y navegación, como UTM, página de origen, referrer, tipo de dispositivo, idioma del navegador y eventos técnicos.</li>
          </ul>
        </section>

        <section className="mt-8 space-y-3 text-slate-600">
          <h2 className="text-2xl font-bold text-[#0b1f3a]">Cómo recopilamos la información</h2>
          <ul className="space-y-2">
            <li>• Formularios de mygcover.com.</li>
            <li>• Evaluaciones y solicitudes de llamada.</li>
            <li>• Formularios instantáneos de Facebook e Instagram.</li>
            <li>• Comunicaciones por email, teléfono o WhatsApp.</li>
            <li>• Cookies, tecnologías similares y Meta Pixel, cuando correspondan.</li>
          </ul>
        </section>

        <section className="mt-8 space-y-3 text-slate-600">
          <h2 className="text-2xl font-bold text-[#0b1f3a]">Para qué utilizamos la información</h2>
          <ul className="space-y-2">
            <li>• Responder solicitudes.</li>
            <li>• Contactar a personas que solicitan información.</li>
            <li>• Brindar orientación inicial.</li>
            <li>• Preparar evaluaciones relacionadas con opciones de seguros.</li>
            <li>• Administrar y dar seguimiento a leads.</li>
            <li>• Medir campañas publicitarias y mejorar el sitio.</li>
            <li>• Prevenir fraude, abuso y problemas de seguridad.</li>
            <li>• Cumplir obligaciones legales aplicables.</li>
          </ul>
        </section>

        <section className="mt-8 space-y-3 text-slate-600">
          <h2 className="text-2xl font-bold text-[#0b1f3a]">Consentimiento y comunicaciones</h2>
          <p>Al enviar un formulario, autorizas a MyGcover a contactarte por los medios que proporciones, como teléfono, email o WhatsApp.</p>
          <p>Puedes solicitar dejar de recibir comunicaciones en cualquier momento.</p>
          <p>Este consentimiento se refiere únicamente a ser contactado y no es un requisito para adquirir un producto de seguro.</p>
        </section>

        <section className="mt-8 space-y-3 text-slate-600">
          <h2 className="text-2xl font-bold text-[#0b1f3a]">Proveedores y tratamiento de datos</h2>
          <p>Podemos utilizar proveedores tecnológicos para alojamiento, base de datos, envío de correos, analítica, publicidad y comunicaciones.</p>
          <p>Entre los proveedores que utilizamos se encuentran Supabase (base de datos), Netlify (alojamiento), Resend (envío de correos) y Meta (publicidad y Meta Pixel).</p>
          <p>Estos proveedores procesan datos únicamente para prestarnos sus servicios.</p>
          <p>MyGcover no vende información personal. Esto no significa que la información nunca se comparta, ya que estos proveedores actúan como encargados del tratamiento de datos en nuestro nombre.</p>
        </section>

        <section className="mt-8 space-y-3 text-slate-600">
          <h2 className="text-2xl font-bold text-[#0b1f3a]">Publicidad y Meta</h2>
          <p>Los formularios instantáneos de Facebook o Instagram también están sujetos a las políticas de Meta.</p>
          <p>Meta Pixel puede registrar eventos como visitas de página o envíos exitosos de formularios, sin que enviemos deliberadamente tu nombre, email o teléfono dentro de esos eventos.</p>
          <p>Los parámetros UTM pueden utilizarse para identificar el origen general de una campaña publicitaria.</p>
        </section>

        <section className="mt-8 space-y-3 text-slate-600">
          <h2 className="text-2xl font-bold text-[#0b1f3a]">Conservación de datos</h2>
          <p>Conservamos los datos durante el tiempo razonablemente necesario para atender tu solicitud, mantener registros legítimos de nuestra actividad y cumplir con las obligaciones aplicables.</p>
        </section>

        <section className="mt-8 space-y-3 text-slate-600">
          <h2 className="text-2xl font-bold text-[#0b1f3a]">Seguridad</h2>
          <p>Aplicamos medidas razonables para proteger la información, como restricciones de acceso a la base de datos y buenas prácticas de desarrollo. Ningún sistema puede garantizar una seguridad absoluta.</p>
        </section>

        <section className="mt-8 space-y-3 text-slate-600">
          <h2 className="text-2xl font-bold text-[#0b1f3a]">Derechos y solicitudes</h2>
          <p>
            Puedes solicitar acceso, corrección o eliminación de tus datos, cuando corresponda, escribiendo a{" "}
            <a href="mailto:info@mygcover.com" className="font-semibold text-[#1d5cdd] underline">
              info@mygcover.com
            </a>
            .
          </p>
        </section>

        <section className="mt-8 space-y-3 text-slate-600">
          <h2 className="text-2xl font-bold text-[#0b1f3a]">Menores</h2>
          <p>Nuestros servicios no están dirigidos intencionalmente a menores de 18 años.</p>
        </section>

        <section className="mt-8 space-y-3 text-slate-600">
          <h2 className="text-2xl font-bold text-[#0b1f3a]">Enlaces y servicios externos</h2>
          <p>Nuestro sitio puede incluir enlaces a redes sociales u otros servicios externos, como Instagram, YouTube o WhatsApp. Estos servicios cuentan con sus propias políticas de privacidad, que no controlamos.</p>
        </section>

        <section className="mt-8 space-y-3 text-slate-600">
          <h2 className="text-2xl font-bold text-[#0b1f3a]">Cambios en esta política</h2>
          <p>Podemos actualizar esta política ocasionalmente. La fecha de la actualización más reciente se indica al inicio de este documento.</p>
        </section>

        <section className="mt-8 space-y-3 text-slate-600">
          <h2 className="text-2xl font-bold text-[#0b1f3a]">Contacto</h2>
          <p>MyGcover</p>
          <p>
            Email:{" "}
            <a href="mailto:info@mygcover.com" className="font-semibold text-[#1d5cdd] underline">
              info@mygcover.com
            </a>
          </p>
          <p>
            Sitio web:{" "}
            <a href="https://mygcover.com" className="font-semibold text-[#1d5cdd] underline">
              https://mygcover.com
            </a>
          </p>
        </section>
      </article>
    </main>
      <SiteFooter />
    </>
  );
}
