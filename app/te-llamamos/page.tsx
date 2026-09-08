import type { Metadata } from "next";
import { TeLlamamosForm } from "@/components/te-llamamos-form";

export const metadata: Metadata = {
  title: "Te llamamos",
  description: "Déjanos tus datos y un representante de MyGcover podrá comunicarse contigo.",
  robots: { index: false, follow: false },
};

export default function TeLlamamosPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8fbff] px-4 py-10">
      <TeLlamamosForm />
    </main>
  );
}
