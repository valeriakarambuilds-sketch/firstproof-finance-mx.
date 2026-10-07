"use client";

import { useState, type FormEvent } from "react";
import ReviewPanel from "./ReviewPanel";

const fields = [
  ["evLow", "Valor empresa: mínimo"],
  ["evHigh", "Valor empresa: máximo"],
  ["equityLow", "Valor del capital: mínimo"],
  ["equityHigh", "Valor del capital: máximo"],
  ["stressEvLow", "Con EBITDA menor: empresa mínimo"],
  ["stressEvHigh", "Con EBITDA menor: empresa máximo"],
  ["stressEquityLow", "Con EBITDA menor: capital mínimo"],
  ["stressEquityHigh", "Con EBITDA menor: capital máximo"],
] as const;

export default function SubmissionForm() {
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [revision, setRevision] = useState(0);
  const [answer, setAnswer] = useState<{ values: Record<string, number>; explanation: string } | null>(null);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSaved(false);
    setAnswer(null);

    const data = new FormData(event.currentTarget);
    const values: Record<string, number> = {};

    for (const [key, label] of fields) {
      const raw = String(data.get(key) ?? "").trim();
      const value = Number(raw);
      if (!raw || !Number.isFinite(value) || Math.abs(value) > 1000000) {
        setError(`Revisa "${label}": introduce un número válido.`);
        return;
      }
      values[key] = value;
    }

    for (const [low, high] of [
      ["evLow", "evHigh"],
      ["equityLow", "equityHigh"],
      ["stressEvLow", "stressEvHigh"],
      ["stressEquityLow", "stressEquityHigh"],
    ]) {
      if (values[low] > values[high]) {
        setError("El mínimo de cada rango debe ser menor o igual al máximo.");
        return;
      }
    }

    const explanation = String(data.get("explanation") ?? "").trim();
    if (explanation.length < 30 || explanation.length > 1500) {
      setError("Tu explicación debe tener entre 30 y 1500 caracteres.");
      return;
    }

    setRevision(previous => previous + 1);
    setAnswer({ values, explanation });
    setSaved(true);
  }

  return (
    <section className="card" aria-labelledby="submission-title">
      <p className="eyebrow">TU RESPUESTA</p>
      <h2 id="submission-title">Entrega tu análisis</h2>
      <p>
        Usa millones de MXN: escribe 40 para representar $40 millones.
        Para decimales, usa punto, por ejemplo 27.4.
      </p>
      <p className="notice">
        Demo educativa. No escribas nombres, correos ni información real.
        No se envía a una empresa y no se conserva al recargar.
      </p>

      <form onSubmit={submit} onChange={() => {
        setSaved(false);
    setAnswer(null);
        setError("");
      }}>
        <div className="answer-grid">
          {fields.map(([key, label]) => (
            <label key={key} htmlFor={key}>
              {label}
              <input
                id={key}
                name={key}
                type="number"
                step="any"
                min="-1000000"
                max="1000000"
                required
              />
            </label>
          ))}
        </div>

        <label className="explanation-label" htmlFor="explanation">
          Explica tu método, interpreta el resultado y señala información faltante.
          <textarea
            id="explanation"
            name="explanation"
            rows={6}
            minLength={30}
            maxLength={1500}
            required
            placeholder="Explica tus supuestos y cómo podrían cambiar la valuación..."
          />
        </label>

        <button className="button" type="submit">
          Validar respuesta
        </button>

        {error && <p className="form-error" role="alert">{error}</p>}
        {saved && (
          <p className="notice" role="status">
            Formato validado. Esto todavía no evalúa la exactitud financiera
            ni genera una revisión con IA.
          </p>
        )}
      </form>
      {answer && <ReviewPanel key={revision} answer={answer} />}
    </section>
  );
}
