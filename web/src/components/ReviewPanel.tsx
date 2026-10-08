"use client";

import { useState } from "react";
import AIReview from "./AIReview";
import caseData from "@/data/case.json";

type Answer = {
  values: Record<string, number>;
  explanation: string;
};

const criteria = [
  "Método de valuación",
  "Exactitud de los cálculos",
  "Supuestos y limitaciones",
  "Análisis de sensibilidad",
  "Explicación oral en entrevista",
];

export default function ReviewPanel({ answer }: { answer: Answer }) {
  const [scores, setScores] = useState<string[]>(["", "", "", "", ""]);
  const [reason, setReason] = useState("");
  const [appealed, setAppealed] = useState(false);
  const [error, setError] = useState("");

  const expected: Record<string, number> = {
    evLow: caseData.ebitda * caseData.multipleLow,
    evHigh: caseData.ebitda * caseData.multipleHigh,
    equityLow: caseData.ebitda * caseData.multipleLow - caseData.debt + caseData.cash,
    equityHigh: caseData.ebitda * caseData.multipleHigh - caseData.debt + caseData.cash,
    stressEvLow: caseData.stressEbitda * caseData.multipleLow,
    stressEvHigh: caseData.stressEbitda * caseData.multipleHigh,
    stressEquityLow: caseData.stressEbitda * caseData.multipleLow - caseData.debt + caseData.cash,
    stressEquityHigh: caseData.stressEbitda * caseData.multipleHigh - caseData.debt + caseData.cash,
  };

  const rows = [
    ["Empresa", "evLow", "evHigh"],
    ["Capital", "equityLow", "equityHigh"],
    ["Empresa con EBITDA menor", "stressEvLow", "stressEvHigh"],
    ["Capital con EBITDA menor", "stressEquityLow", "stressEquityHigh"],
  ];
  const complete = scores.every(score => score !== "");
  const total = scores.reduce((sum, score) => sum + Number(score), 0);
  const eligible = complete && total >= 7 && Number(scores[1]) > 0 && Number(scores[4]) > 0;
  const number = (value: number) => value.toLocaleString("es-MX", { maximumFractionDigits: 2 });

  return (
    <section className="notice" aria-labelledby="review-title">
      <h2 id="review-title">Revisión de demostración</h2>
      <p>
        Comparación automática mediante fórmulas del caso inventado.
        No es una revisión con IA ni una decisión de contratación.
      </p>

      {rows.map(([label, low, high]) => (
        <p key={low}>
          <strong>{label}:</strong> tu rango {number(answer.values[low])}–{number(answer.values[high])}.
          {" "}Referencia {number(expected[low])}–{number(expected[high])} millones de MXN.
          {" "}{Math.abs(answer.values[low] - expected[low]) < 0.01 &&
            Math.abs(answer.values[high] - expected[high]) < 0.01
            ? "Coincide con las fórmulas del ejercicio."
            : "Hay diferencias: revisa los cálculos y explica tus supuestos."}
        </p>
      ))}

      <h3>Razonamiento presentado</h3>
      <p style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
        {answer.explanation}
      </p>

      <AIReview answer={answer} />

      <h3>Evaluación humana de demostración</h3>
      <p>En esta sección cambias de papel: representas al evaluador, no al candidato. Tú eliges las puntuaciones para probar la demo; la IA no las asigna. Deja la explicación oral en Pendiente si no has simulado una entrevista. Estas puntuaciones no representan una evaluación real.</p>
      <p>
        En esta demo tú eliges las puntuaciones. En un proceso real las asignaría
        un evaluador después de revisar la evidencia y hacer la entrevista.
        Escala: 0 = insuficiente, 1 = parcial, 2 = sólido.
      </p>
      <p>
        No puntúes la explicación oral hasta realizar la entrevista.
        Cualquier criterio pendiente impide generar una recomendación.
      </p>

      <div className="answer-grid">
        {criteria.map((criterion, index) => (
          <label key={criterion}>
            {criterion}
            <select
              value={scores[index]}
              disabled={appealed}
              onChange={event => setScores(previous =>
                previous.map((score, position) =>
                  position === index ? event.target.value : score))}
            >
              <option value="">Pendiente</option>
              <option value="0">0 — Insuficiente</option>
              <option value="1">1 — Parcial</option>
              <option value="2">2 — Sólido</option>
            </select>
          </label>
        ))}
      </div>

      <p role="status">
        <strong>
          {appealed
            ? "Reconsideración solicitada: recomendación suspendida."
            : !complete
              ? "Evaluación pendiente. Completa la revisión y la entrevista."
              : eligible
                ? `Puntuación ${total}/10: considerar siguiente etapa con revisión humana.`
                : `Puntuación ${total}/10: revisar brechas con una persona. No implica rechazo automático.`}
        </strong>
      </p>
      <p>
        Regla provisional: al menos 7/10 y ninguna puntuación de cero en
        exactitud o explicación oral. Aún no está validada para contratación.
      </p>

      <h3>Solicitar reconsideración sin costo</h3>
      <label className="explanation-label">
        Explica qué debería revisar el evaluador (10–500 caracteres).
        <textarea
          value={reason}
          maxLength={500}
          disabled={appealed}
          onChange={event => {
            setReason(event.target.value);
            setError("");
          }}
        />
      </label>
      <button
        type="button"
        className="button"
        disabled={appealed}
        onClick={() => {
          if (reason.trim().length < 10 || reason.trim().length > 500) {
            setError("Escribe un motivo de entre 10 y 500 caracteres.");
            return;
          }
          setError("");
          setAppealed(true);
        }}
      >
        {appealed ? "Reconsideración solicitada" : "Solicitar reconsideración en la demo"}
      </button>
      {error && <p className="form-error" role="alert">{error}</p>}
      {appealed && (
        <p>
          Solicitud representada únicamente en esta pantalla.
          No se envió a una persona. En un proceso real requiere revisión humana.
        </p>
      )}
    </section>
  );
}
