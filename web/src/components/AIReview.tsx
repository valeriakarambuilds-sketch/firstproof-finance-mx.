"use client";

import { useEffect, useRef, useState } from "react";

type Answer = {
  values: Record<string, number>;
  explanation: string;
};

type Review = {
  summary: string;
  observations: { text: string; reference: string }[];
  gaps: { text: string; reference: string }[];
  questions: string[];
};

const references: Record<string, string> = {
  caso: "Datos del caso inventado",
  calculos: "Fórmulas de referencia",
  explicacion: "Explicación presentada",
};

export default function AIReview({ answer }: { answer: Answer }) {
  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [generatedAt, setGeneratedAt] = useState("");
  const controller = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => controller.current?.abort();
  }, []);

  async function prepareReview() {
    if (controller.current) return;

    const current = new AbortController();
    controller.current = current;
    setLoading(true);
    setError("");
    setReview(null);

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answer),
        signal: current.signal,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "No se pudo preparar la revisión.");
      }

      if (data.simulated !== false || !data.review) {
        throw new Error("La respuesta recibida no es una revisión válida.");
      }

      setReview(data.review);
      setGeneratedAt(data.generatedAt);
    } catch (failure) {
      if (!current.signal.aborted) {
        setError(
          failure instanceof Error
            ? failure.message
            : "No se pudo conectar. Intenta nuevamente."
        );
      }
    } finally {
      if (controller.current === current) {
        controller.current = null;
        if (!current.signal.aborted) setLoading(false);
      }
    }
  }

  return (
    <section aria-labelledby="ai-review-title">
      <h3 id="ai-review-title">Apoyo de IA para la revisión</h3>
      <p>
        Al pulsar el botón, tu respuesta del caso inventado se envía a Google
        Gemini. No incluyas datos personales ni información de empresas reales.
      </p>
      <p>
        La IA prepara un borrador que puede contener errores.
        El evaluador debe contrastarlo con la evidencia y realizar la entrevista.
      </p>

      <button
        type="button"
        className="button"
        disabled={loading}
        onClick={prepareReview}
      >
        {loading ? "Preparando revisión…" : "Preparar revisión con IA"}
      </button>

      {loading && <p role="status">Gemini está revisando tu explicación.</p>}
      {error && <p className="form-error" role="alert">{error}</p>}

      {review && (
        <div aria-live="polite" style={{ overflowWrap: "anywhere" }}>
          <p className="notice">
            <strong>Borrador generado con IA real — pendiente de revisión humana.</strong>
            {" "}Modelo: gemini-3.1-flash-lite.
            {" "}Fecha: {new Date(generatedAt).toLocaleString("es-MX")}.
          </p>

          <p>{review.summary}</p>

          <h4>Observaciones sobre la evidencia</h4>
          <ul>
            {review.observations.map((item, index) => (
              <li key={index}>
                {item.text}
                {" "}<strong>Referencia:</strong> {references[item.reference]}.
              </li>
            ))}
          </ul>

          <h4>Brechas para revisar</h4>
          {review.gaps.length === 0
            ? <p>La IA no señaló brechas. Esto no confirma que el análisis sea completo.</p>
            : (
              <ul>
                {review.gaps.map((item, index) => (
                  <li key={index}>
                    {item.text}
                    {" "}<strong>Referencia:</strong> {references[item.reference]}.
                  </li>
                ))}
              </ul>
            )}

          <h4>Preguntas sugeridas para la entrevista</h4>
          <ol>
            {review.questions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ol>
          <p>Este borrador no asigna puntuaciones ni decide una contratación.</p>
        </div>
      )}
    </section>
  );
}
