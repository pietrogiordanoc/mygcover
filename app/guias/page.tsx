import Link from "next/link";

const guides = [
  { title: "Guía sencilla para entender un IUL", description: "Conceptos básicos clave para conocer cómo puede funcionar este tipo de producto.", readTime: "6 min" },
  { title: "7 preguntas antes de contratar un seguro de vida", description: "Aspectos importantes para revisar antes de tomar una decisión informada.", readTime: "8 min" },
  { title: "Seguro de vida para hispanos en Estados Unidos y América", description: "Una guía útil para entender opciones disponibles y diferencias importantes.", readTime: "7 min" },
  { title: "¿Es posible solicitar un seguro utilizando ITIN?", description: "Consideraciones importantes según el perfil y la situación migratoria.", readTime: "5 min" },
];

export default function GuidesPage() {
  return (
    <main className="container-shell py-16">
      <div className="mx-auto max-w-5xl">
        <p className="protect-badge text-[#1d5cdd]">Guías y recursos</p>
        <h1 className="mt-4 text-4xl font-extrabold text-[#0b1f3a] md:text-6xl">Guías para entender mejor tus opciones.</h1>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {guides.map((guide) => (
            <article key={guide.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(11,31,58,0.08)]">
              <div className="mb-5 h-36 rounded-[1.25rem] bg-gradient-to-br from-[#dfeeff] via-white to-[#ebfaf3]" />
              <p className="text-sm text-slate-500">{guide.readTime} de lectura</p>
              <h2 className="mt-3 text-2xl font-bold text-[#0b1f3a]">{guide.title}</h2>
              <p className="mt-3 text-slate-600">{guide.description}</p>
              <Link href="/gracias" className="primary-button mt-6">Recibir guía gratis</Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
