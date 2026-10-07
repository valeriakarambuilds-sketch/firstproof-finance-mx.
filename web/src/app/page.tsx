import Link from "next/link";
import caseData from "@/data/case.json";

export default function Home() {
  return (
    <div className="shell">
      <aside className="sidebar">
        <Link className="brand" href="/">FirstProof<span>FINANCE MX</span></Link>
        <p className="sidebar-caption">Tu primera prueba de capacidad</p>
        <nav aria-label="Secciones">
          <a className="active" href="#caso">01 · Conoce el caso</a>
          <a href="#entrega">02 · Prepara tu análisis</a>
          <a href="#criterios">03 · Conoce los criterios</a>
        </nav>
        <div className="sidebar-note">
          <strong>Tu criterio cuenta.</strong>
          <p>Una oportunidad para mostrar cómo analizas, aunque apenas estés empezando.</p>
        </div>
      </aside>

      <main>
        <header className="topbar">
          <span>PRUEBA PARA ANALISTA JUNIOR</span>
          <span className="badge">Demostración · Datos inventados</span>
        </header>

        <section className="hero">
          <p className="eyebrow">MENOS PROMESAS. MÁS EVIDENCIA.</p>
          <h1>Demuestra cómo<br /><span>piensas.</span></h1>
          <p className="intro">Resuelve un caso de valuación y explica tus decisiones. Una persona revisará tu trabajo y tu razonamiento.</p>
          <a className="button" href="#caso">Conocer el caso →</a>
          <p className="small">Sin costo para el candidato. Esta demo no ofrece una vacante ni garantiza una entrevista.</p>
        </section>

        <section id="caso" className="card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CASO 01 · {caseData.date}</p>
              <h2>{caseData.company}</h2>
            </div>
            <span className="badge">Caso ficticio · v{caseData.version}</span>
          </div>
          <p>Una empresa de servicios evalúa una posible venta. Prepara un rango de valor y explica qué significa para sus accionistas.</p>
          <div className="metrics">
            <div><span>EBITDA anual</span><strong>{caseData.ebitda}</strong><small>millones de MXN</small></div>
            <div><span>Deuda financiera</span><strong>{caseData.debt}</strong><small>millones de MXN</small></div>
            <div><span>Efectivo</span><strong>{caseData.cash}</strong><small>millones de MXN</small></div>
            <div><span>Múltiplo EV/EBITDA</span><strong>{caseData.multipleLow}–{caseData.multipleHigh}×</strong><small>supuesto del ejercicio</small></div>
          </div>
          <div className="notice"><strong>Fuente y límites</strong><p>{caseData.source}</p></div>
          <p className="small">EBITDA: resultado antes de intereses, impuestos, depreciación y amortización. EV: valor de la operación del negocio.</p>
        </section>

        <div className="two-columns">
          <section id="entrega" className="card">
            <p className="eyebrow">TU ENTREGA</p>
            <h2>Calcula. Explica. Cuestiona.</h2>
            <ol>
              <li>Estima el rango de valor de la empresa (EV).</li>
              <li>Calcula el valor para los accionistas, ajustando deuda y efectivo.</li>
              <li>Repite el cálculo si el EBITDA cae 10%, a {caseData.stressEbitda} millones de MXN.</li>
              <li>Justifica tu método, interpreta los resultados y señala la información que falta.</li>
            </ol>
            <p className="small">Los datos disponibles permiten un ejercicio por múltiplos. Un flujo descontado requeriría información y supuestos adicionales.</p>
          </section>

          <section id="criterios" className="card">
            <p className="eyebrow">REVISIÓN HUMANA</p>
            <h2>¿Qué se evaluará?</h2>
            <ul className="criteria">
              <li>Método de valuación</li>
              <li>Precisión de los cálculos</li>
              <li>Claridad de los supuestos</li>
              <li>Análisis de sensibilidad</li>
              <li>Explicación oral en entrevista</li>
            </ul>
            <p className="small">Criterios provisionales. La IA ayudará a preparar observaciones; la evaluación y la decisión corresponden a una persona.</p>
          </section>
        </div>
        <footer>FirstProof Finance MX · Prototipo educativo · Primera pantalla: todavía sin envío de respuestas ni conexión a IA.</footer>
      </main>
    </div>
  );
}
