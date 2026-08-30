import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mygcover.com"),
  title: {
    default: "MyGcover | Seguros de vida para hispanos en Estados Unidos",
    template: "%s | MyGcover",
  },
  description:
    "Explora opciones de seguro de vida, IUL, beneficios en vida y protección familiar. Evaluación inicial gratuita y orientación en español para hispanos en Estados Unidos.",
  keywords: [
    "seguro de vida para hispanos",
    "seguro de vida en Estados Unidos",
    "IUL en español",
    "seguro de vida con ITIN",
    "beneficios en vida",
    "protección familiar",
    "gastos finales",
  ],
  openGraph: {
    title: "MyGcover | Seguros de vida para hispanos en Estados Unidos",
    description:
      "Protección para cada etapa de tu vida. Educación, orientación y evaluación inicial para familias hispanas en Estados Unidos.",
    url: "https://mygcover.com",
    siteName: "MyGcover",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyGcover | Seguros de vida para hispanos en Estados Unidos",
    description:
      "Orientación clara sobre seguros de vida, IUL, beneficios en vida y protección familiar para hispanos en Estados Unidos.",
  },
  icons: {
    icon: "/brand/avatar.png",
    shortcut: "/brand/avatar.png",
    apple: "/brand/avatar.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#f8fbff] text-slate-800">{children}</body>
    </html>
  );
}
