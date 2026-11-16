import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Download, ExternalLink, Scale, CheckCircle2 } from 'lucide-react'
import CopyButton from '../components/CopyButton'
import tools from '../data/tools.json'
import {
  moments,
  decisions,
  ladder,
  occupations,
  errors,
  cases,
  actaFields,
  buildActa,
} from '../data/economia'
import { readProgress, saveProgress, downloadText } from '../utils/learning'
import './learning.css'
import './economia.css'

const STORAGE_KEY = 'qia-economia-v1'
const emptyActa = Object.fromEntries(actaFields.map(([k]) => [k, '']))
const validActa = (value) => actaFields.every(([k]) => typeof value[k] === 'string')
const toolById = Object.fromEntries(tools.map((t) => [t.id, t]))
const pct = (n) =>
  n.toLocaleString('es-CO', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })

function DecisionPanel({ decision }) {
  return (
    <div
      className="eco-panel"
      role="tabpanel"
      id={`eco-panel-${decision.id}`}
      aria-labelledby={`eco-tab-${decision.id}`}
      tabIndex={0}
    >
      <span className="lab-kicker">La pregunta</span>
      <h3 className="eco-question">{decision.question}</h3>
      <div className="eco-grid">
        <div>
          <h4>Qué puede hacer la IA</h4>
          <ul className="eco-list">
            {decision.ai.map((item) => (
              <li key={item}>
                <CheckCircle2 size={16} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <h4>Herramientas del catálogo</h4>
          <div className="eco-tools">
            {decision.tools
              .filter((id) => toolById[id])
              .map((id) => (
                <Link key={id} to={`/herramienta/${id}`}>
                  {toolById[id].name}
                </Link>
              ))}
          </div>
        </div>
        <div>
          <h4>Datos abiertos colombianos que sirven</h4>
          <ul className="eco-data">
            {decision.data.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="lab-note eco-keep">
            <strong>Lo que no se delega</strong>
            <p>{decision.keep}</p>
          </div>
        </div>
      </div>
      <h4>Un prompt para empezar</h4>
      <div className="lab-prompt">
        <pre>{decision.prompt}</pre>
      </div>
      <CopyButton key={decision.id} text={decision.prompt} />
    </div>
  )
}

export default function Economia() {
  const [active, setActive] = useState(decisions[0].id)
  const [acta, setActa] = useState(() => readProgress(STORAGE_KEY, emptyActa, validActa))
  const tabRefs = useRef({})
  const decision = decisions.find((d) => d.id === active)
  const actaText = buildActa(acta)

  const updateActa = (key, value) => {
    const next = { ...acta, [key]: value }
    setActa(next)
    saveProgress(STORAGE_KEY, next)
  }
  const onTabKey = (event, index) => {
    const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
    if (!delta) return
    event.preventDefault()
    const next = decisions[(index + delta + decisions.length) % decisions.length]
    setActive(next.id)
    tabRefs.current[next.id]?.focus()
  }

  return (
    <div className="learning-page eco-page">
      <title>Decisiones económicas con IA | ¿Qué IA necesito?</title>
      <meta
        name="description"
        content="Predecir no es decidir: cómo usar IA para decisiones de precio, inversión, talento, riesgo y mercado, con datos abiertos de Colombia, prompts y un acta de decisión."
      />
      <section className="business-hero">
        <div className="lab-container lab-two-col">
          <div>
            <div className="lab-kicker">
              <Scale size={16} /> Capítulo / Decisiones económicas
            </div>
            <h1>
              Predecir no es
              <br />
              <em>decidir.</em>
            </h1>
            <p>
              La IA abarata la predicción y encarece el juicio. Esta guía es para quien toma
              decisiones de precio, inversión, talento, riesgo y mercado en una organización y
              quiere saber qué pedirle a la máquina y qué no entregarle.
            </p>
            <div className="lab-actions">
              <a className="lab-primary" href="#decisiones">
                Ir a mi decisión <ArrowRight size={17} />
              </a>
              <a className="lab-text-button" href="#acta">
                Llenar un acta de decisión <ArrowRight size={17} />
              </a>
            </div>
            <p className="lab-small">
              Sin registro · prompts listos para copiar · fuentes públicas de Colombia
            </p>
          </div>
          <div className="business-route">
            <span className="lab-kicker">Tres ideas detrás de la guía</span>
            <ul className="eco-ideas">
              <li>
                <strong>Racionalidad limitada.</strong>
                <span>
                  Nadie decide con toda la información ni con todo el tiempo: se decide con lo
                  suficiente. <em>Herbert Simon</em>
                </span>
              </li>
              <li>
                <strong>Riesgo no es incertidumbre.</strong>
                <span>
                  El riesgo se puede calcular; la incertidumbre no tiene probabilidades conocidas.{' '}
                  <em>Frank Knight</em>
                </span>
              </li>
              <li>
                <strong>Predicción barata, juicio caro.</strong>
                <span>
                  Cuando predecir cuesta menos, vale más saber qué hacer con la predicción.{' '}
                  <em>Agrawal, Gans y Goldfarb, «Prediction Machines», 2018</em>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <nav className="lab-container case-page-nav" aria-label="Navegar por Decisiones económicas">
        <a href="#momentos">1. Medir, modelar, decidir</a>
        <a href="#decisiones">2. Siete decisiones</a>
        <a href="#delegar">3. Qué se delega</a>
        <a href="#errores">4. Cinco errores</a>
        <a href="#acta">5. Acta de decisión</a>
        <a href="#casos">6. Casos</a>
      </nav>

      <section id="momentos" className="lab-container lab-section" aria-labelledby="eco-momentos">
        <span className="lab-kicker">01 / Tres momentos</span>
        <h2 id="eco-momentos">La IA ayuda en los tres. Solo en uno no puede reemplazarte.</h2>
        <div className="lab-three-col">
          {moments.map((m, i) => (
            <article className="eco-moment" key={m.id}>
              <span className="lab-kicker">
                {i + 1} · {m.title}
              </span>
              <h3>{m.question}</h3>
              <p>
                <b>La IA:</b> {m.ai}
              </p>
              <p>
                <b>La persona:</b> {m.person}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="decisiones"
        className="lab-container lab-section"
        aria-labelledby="eco-decisiones"
      >
        <span className="lab-kicker">02 / Mapa de decisiones</span>
        <h2 id="eco-decisiones">Siete decisiones económicas y qué pedirle a la IA en cada una.</h2>
        <p>Elige la que tienes sobre la mesa.</p>
        <div className="lab-filters eco-tabs" role="tablist" aria-label="Decisiones económicas">
          {decisions.map((d, i) => (
            <button
              key={d.id}
              ref={(el) => {
                tabRefs.current[d.id] = el
              }}
              role="tab"
              id={`eco-tab-${d.id}`}
              aria-selected={d.id === active}
              aria-controls={`eco-panel-${d.id}`}
              tabIndex={d.id === active ? 0 : -1}
              onClick={() => setActive(d.id)}
              onKeyDown={(e) => onTabKey(e, i)}
            >
              {d.label}
            </button>
          ))}
        </div>
        <DecisionPanel decision={decision} />
        <p className="lab-small">
          Antes de subir datos de la organización revisa qué cuenta está autorizada y qué
          información es confidencial. Trabaja con datos anonimizados o agregados cuando puedas.
        </p>
      </section>

      <section id="delegar" className="lab-container lab-section" aria-labelledby="eco-delegar">
        <span className="lab-kicker">03 / Escalera de delegación</span>
        <h2 id="eco-delegar">Casi todo admite ayuda. Casi nada se entrega entero.</h2>
        <p>
          El Agent Delegability Index (ADI) califica cada tarea de cada ocupación en cuatro niveles
          y los agrega por país.
        </p>
        <ol className="eco-ladder">
          {ladder.map(([level, name, text]) => (
            <li key={level}>
              <b>{level}</b>
              <div>
                <strong>{name}</strong>
                <span>{text}</span>
              </div>
            </li>
          ))}
        </ol>
        <div className="eco-figures">
          <div>
            <strong>35,2 %</strong>
            <span>
              del tiempo de tareas del empleo mundial es al menos parcialmente delegable (L2 o L3).
            </span>
          </div>
          <div>
            <strong>2,5 %</strong>
            <span>se puede entregar por completo (L3).</span>
          </div>
          <div>
            <strong>38,3 %</strong>
            <span>en Colombia, puesto 65 de 146 países; 2,9 % por completo.</span>
          </div>
        </div>
        <div className="case-output">
          <div
            className="case-table-scroll"
            role="region"
            aria-label="Delegabilidad en ocupaciones económicas"
            tabIndex={0}
          >
            <table className="eco-table">
              <caption>
                Ocupaciones económicas y financieras · parte de sus tareas en cada nivel
              </caption>
              <thead>
                <tr>
                  <th scope="col">Ocupación</th>
                  <th scope="col">Delegación parcial o más (L2+)</th>
                  <th scope="col">Delegación completa (L3)</th>
                </tr>
              </thead>
              <tbody>
                {occupations.map(([name, l2, l3]) => (
                  <tr key={name}>
                    <th scope="row">{name}</th>
                    <td>
                      <span className="eco-bar" aria-hidden="true">
                        <i style={{ width: `${l2}%` }} />
                      </span>
                      {pct(l2)} %
                    </td>
                    <td>
                      <span className="eco-bar eco-bar-l3" aria-hidden="true">
                        <i style={{ width: `${l3}%` }} />
                      </span>
                      {pct(l3)} %
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="lab-note">
          <strong>Cómo leerlo</strong>
          <p>
            Casi todo el trabajo del economista admite la ayuda de un agente y ninguna tarea se le
            entrega entera. Es la tesis del capítulo hecha cifra: la máquina avanza el análisis; la
            persona responde por la conclusión.
          </p>
        </div>
        <a
          className="lab-source"
          href="https://balamlabs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Fuente: Agent Delegability Index, ADI v2026.1 · balamlabs.org <ExternalLink size={13} />
        </a>
      </section>

      <section id="errores" className="lab-container lab-section" aria-labelledby="eco-errores">
        <span className="lab-kicker">04 / Cinco errores frecuentes</span>
        <h2 id="eco-errores">Lo que más daña una decisión apoyada en IA.</h2>
        <ol className="eco-errors">
          {errors.map(([title, text], i) => (
            <li key={title}>
              <b>{i + 1}</b>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="acta" className="lab-container lab-section" aria-labelledby="eco-acta">
        <span className="lab-kicker">05 / Acta de decisión</span>
        <h2 id="eco-acta">Deja por escrito qué decidiste, con qué y quién responde.</h2>
        <p>
          Una página basta. Lo que escribas se guarda solo en este navegador y puedes descargarlo
          como Markdown.
        </p>
        <div className="lab-two-col eco-acta">
          <div>
            {actaFields.map(([key, label, hint]) => (
              <div key={key}>
                <label className="lab-label" htmlFor={`acta-${key}`}>
                  {label}
                </label>
                <textarea
                  id={`acta-${key}`}
                  rows={2}
                  maxLength={600}
                  placeholder={hint}
                  value={acta[key]}
                  onChange={(e) => updateActa(key, e.target.value)}
                />
              </div>
            ))}
          </div>
          <div>
            <div className="lab-prompt">
              <pre>{actaText}</pre>
            </div>
            <div className="lab-actions">
              <button
                className="lab-primary"
                onClick={() => downloadText('acta-de-decision.md', actaText)}
              >
                <Download size={17} /> Descargar .md
              </button>
              <button
                className="lab-text-button"
                onClick={() => {
                  setActa(emptyActa)
                  saveProgress(STORAGE_KEY, emptyActa)
                }}
              >
                Vaciar
              </button>
            </div>
            <CopyButton
              key={actaText}
              text={actaText}
              label="Copiar acta"
              successMessage="Copiado. Ya puedes pegar el acta donde la necesites."
            />
          </div>
        </div>
      </section>

      <section id="casos" className="lab-container lab-section" aria-labelledby="eco-casos">
        <span className="lab-kicker">06 / Para ver en funcionamiento</span>
        <h2 id="eco-casos">Cuatro trabajos donde esto ya se hizo con datos públicos.</h2>
        <div className="eco-cases">
          {cases.map(([title, text, url, label]) => (
            <article key={url}>
              <h3>{title}</h3>
              <p>{text}</p>
              <a className="lab-source" href={url} target="_blank" rel="noopener noreferrer">
                {label} <ExternalLink size={13} />
              </a>
            </article>
          ))}
        </div>
        <p className="lab-small eco-next">
          ¿Aún no sabes qué herramienta usar? <Link to="/recomendador">Abre el recomendador</Link> o{' '}
          <Link to="/explorar">explora la categoría de finanzas y datos</Link>.
        </p>
        <p className="eco-firma">Santiago Jiménez Londoño · Profesor Universidad EAFIT</p>
      </section>
    </div>
  )
}
