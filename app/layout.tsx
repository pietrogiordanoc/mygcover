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
    default: "MyGcover | Seguros de vida para hispanos",
    template: "%s | MyGcover",
  },
  description:
    "Conoce opciones de seguro de vida, beneficios en vida, protección familiar y productos con posible acumulación de valor. Orientación en español.",
  keywords: [
    "seguro de vida",
    "seguros de vida",
    "seguro de vida para hispanos",
    "seguro de vida en Estados Unidos",
    "IUL",
    "beneficios en vida",
    "protección familiar",
  ],
  openGraph: {
    title: "MyGcover | Seguros de vida para hispanos",
    description:
      "Protección para cada etapa de tu vida. Educación, orientación y evaluación inicial para familias hispanas en Estados Unidos.",
    url: "https://mygcover.com",
    siteName: "MyGcover",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyGcover | Seguros de vida para hispanos",
    description:
      "Orientación clara sobre seguros de vida, beneficios en vida y protección familiar.",
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
