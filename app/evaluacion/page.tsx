import { Suspense } from "react";
import EvaluationForm from "@/components/evaluation-form";

export default function EvaluationPage() {
  return (
    <Suspense fallback={<div className="container-shell flex min-h-screen items-center justify-center">Cargando...</div>}>
      <EvaluationForm />
    </Suspense>
  );
}
