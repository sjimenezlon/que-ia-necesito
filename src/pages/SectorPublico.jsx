import { useEffect, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import {
  Landmark,
  Users,
  FileSearch,
  ShieldCheck,
  MessageSquare,
  BarChart3,
  Scale,
  Layers,
  ArrowRight,
  ArrowUpRight,
  Check,
  BookOpen,
  Sparkles,
  ClipboardCheck,
  RotateCcw,
  CalendarDays,
  Lightbulb,
} from 'lucide-react'
import CopyButton from '../components/CopyButton'
import ShareLink from '../components/ShareLink'
import { ToolFavicon } from '../components/ToolCard'
import { getToolById } from '../utils/recommender'
import { SITE_URL } from '../utils/site'
import {
  REVIEW_DATE,
  PUBLIC_SOURCES,
  PUBLIC_TASKS,
  DATA_OPTIONS,
  PILOT_CHECKS,
  FIRST_WEEK,
  DOCUMENTED_CASES,
  NOTEBOOK_STEPS,
  buildPublicPrompt,
} from '../data/publicSector'
import './sector-publico.css'

const ICONS = {
  users: Users,
  file: FileSearch,
  shield: ShieldCheck,
  message: MessageSquare,
  chart: BarChart3,
  landmark: Landmark,
  scale: Scale,
  layers: Layers,
}
const AUDIENCES = [
  'Equipo de la dependencia',
  'Ciudadanía',
  'Comité directivo',
  'Equipo jurídico o de control',
]

function SourceLink({ id }) {
  const source = PUBLIC_SOURCES.find((item) => item.id === id)
  if (!source) return null
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="public-source-link"
    >
      {source.title}
      <ArrowUpRight size={14} aria-hidden="true" />
    </a>
  )
}

function SectionHeading({ number, title, children }) {
  return (
    <div className="public-section-heading">
      <span className="public-section-number" aria-hidden="true">
        {number}
      </span>
      <div>
        <h2>{title}</h2>
        {children && <p>{children}</p>}
      </div>
    </div>
  )
}

function PilotReview({ task, dataType, checked, setChecked }) {
  const complete = PILOT_CHECKS.filter((item) => checked[item.id]).length
  const pending = PILOT_CHECKS.filter((item) => !checked[item.id])
  const record = `FICHA DE PREPARACIÓN · PILOTO DE IA\nTarea: ${task.title}\nInformación prevista: ${DATA_OPTIONS.find((item) => item.id === dataType).label}\nRevisión de esta guía: ${REVIEW_DATE}\n\n${PILOT_CHECKS.map((item) => `${checked[item.id] ? '[x]' : '[ ]'} ${item.label}`).join('\n')}\n\nMétrica propuesta: ${task.measure}\nResponsable: [completar]\nFecha y alcance del piloto: [completar]\nFuentes y permisos: [completar]\nHerramienta, versión y condiciones: [completar]\nEvidencias de revisión: [completar]\nCriterios para detener o continuar: [completar]\n\nEsta ficha organiza la preparación; no certifica cumplimiento ni autoriza el despliegue.`
  return (
    <section id="madurez" className="public-section">
      <SectionHeading number="03" title="¿Qué le falta a tu piloto?">
        Marca lo que ya está resuelto para esta tarea. Cada ruta y tipo de datos
        conserva su propia revisión durante esta visita.
      </SectionHeading>
      <div className="public-review-grid">
        <div className="public-checks">
          {PILOT_CHECKS.map((item) => (
            <label
              key={item.id}
              className={`public-check ${checked[item.id] ? 'is-checked' : ''}`}
            >
              <input
                type="checkbox"
                checked={Boolean(checked[item.id])}
                onChange={(event) =>
                  setChecked({ ...checked, [item.id]: event.target.checked })
                }
              />
              <span>
                <strong>{item.label}</strong>
                <small>{item.detail}</small>
              </span>
            </label>
          ))}
        </div>
        <aside className="public-review-summary">
          <ClipboardCheck size={28} aria-hidden="true" />
          <h3>Tu ficha de preparación</h3>
          <p className="text-sm text-text-light">
            {task.title} ·{' '}
            {DATA_OPTIONS.find((item) => item.id === dataType).label}
          </p>
          <p className="public-progress-text" role="status">
            {complete} de {PILOT_CHECKS.length} condiciones revisadas
          </p>
          <progress
            max={PILOT_CHECKS.length}
            value={complete}
            aria-label="Condiciones revisadas"
          />
          <p className="text-sm text-text-light mt-4">
            {pending.length
              ? `Siguiente paso: ${pending[0].label}`
              : 'Ya tienes una agenda de preparación completa. El equipo responsable debe revisar la evidencia y acordar si inicia el piloto.'}
          </p>
          <p className="text-xs text-text-light mt-4 mb-5">
            Autoevaluación orientativa. Marcar casillas no certifica
            cumplimiento ni autoriza el uso de datos.
          </p>
          <CopyButton
            key={record}
            text={record}
            label="Copiar ficha del piloto"
          />
          <button
            type="button"
            className="action-text mt-2"
            onClick={() => setChecked({})}
          >
            <RotateCcw size={14} aria-hidden="true" />
            Reiniciar revisión
          </button>
        </aside>
      </div>
    </section>
  )
}

function TimeCalculator() {
  const [values, setValues] = useState({
    before: '40',
    drafting: '15',
    review: '10',
    quantity: '20',
  })
  const fields = [
    { id: 'before', label: 'Antes: minutos por tarea', max: 1440 },
    { id: 'drafting', label: 'Con IA: preparar y generar', max: 1440 },
    { id: 'review', label: 'Revisar y corregir: minutos', max: 1440 },
    { id: 'quantity', label: 'Tareas por semana', max: 10000 },
  ]
  const valid = fields.every(
    ({ id, max }) =>
      values[id].trim() !== '' &&
      Number.isFinite(Number(values[id])) &&
      Number(values[id]) >= 0 &&
      Number(values[id]) <= max &&
      (id !== 'quantity' || Number.isInteger(Number(values[id]))),
  )
  const saved = valid
    ? (Number(values.before) -
        Number(values.drafting) -
        Number(values.review)) *
      Number(values.quantity)
    : 0
  const format = (number) =>
    new Intl.NumberFormat('es-CO', { maximumFractionDigits: 1 }).format(number)
  return (
    <div id="quick-wins" className="public-calculator">
      <div>
        <span className="eyebrow">Mide tu propio resultado</span>
        <h3>¿Cuánto tiempo recuperas realmente?</h3>
        <p>
          Incluye preparar las fuentes, revisar y corregir. Los valores
          iniciales son un ejemplo; reemplázalos con tus mediciones.
        </p>
      </div>
      <div className="public-calculator-fields">
        {fields.map((field) => (
          <label key={field.id} className="field-label">
            {field.label}
            <input
              className="field-input"
              type="number"
              min="0"
              max={field.max}
              step={field.id === 'quantity' ? '1' : '0.1'}
              inputMode="decimal"
              value={values[field.id]}
              onChange={(event) =>
                setValues({ ...values, [field.id]: event.target.value })
              }
            />
          </label>
        ))}
      </div>
      <div className="public-calculator-result" role="status">
        {!valid ? (
          <p>
            Completa los cuatro valores: tiempos de 0 a 1.440 minutos y de 0 a
            10.000 tareas enteras por semana.
          </p>
        ) : (
          <>
            <strong>{format(Math.abs(saved) / 60)} h</strong>
            <span>
              {saved > 0
                ? 'de ahorro estimado por semana'
                : saved < 0
                  ? 'adicionales por semana: revisa el proceso'
                  : 'de diferencia: no hay ahorro de tiempo'}
            </span>
            <small>
              ({format(Number(values.before))} −{' '}
              {format(Number(values.drafting))} −{' '}
              {format(Number(values.review))}) ×{' '}
              {format(Number(values.quantity))} = {format(saved)} minutos
            </small>
          </>
        )}
      </div>
      <p className="public-calculator-note">
        El tiempo es una medida. Comprueba también calidad, accesibilidad y
        errores antes de ampliar el uso.
      </p>
    </div>
  )
}

function NotebookLab() {
  const [step, setStep] = useState(0)
  const labPrompt =
    'Con las fuentes autorizadas que adjunté, prepara una ficha con: afirmación principal, documento y apartado que la sustenta, información faltante y pregunta de verificación. No inventes cifras ni citas. Si dos fuentes se contradicen, muéstralo. Después de mi revisión, propón un guion breve de audio y su versión en texto. No presentes inferencias como hechos.'
  return (
    <section id="notebook-lab" className="public-notebook">
      <div className="public-notebook-intro">
        <span className="eyebrow">
          <BookOpen size={15} aria-hidden="true" />
          Laboratorio de lectura
        </span>
        <h2>
          De un expediente
          <br />a una conversación útil.
        </h2>
        <p>
          Explora cómo trabajar con NotebookLM y documentos autorizados. Las
          citas ayudan a verificar; la revisión sigue siendo necesaria.
        </p>
        <Link to="/herramienta/notebooklm" className="action-text">
          Ver la herramienta
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
        <a
          className="public-source-link"
          href="https://support.google.com/notebooklm/answer/16269187?hl=es-419"
          target="_blank"
          rel="noopener noreferrer"
        >
          Funciones y límites oficiales
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
      <div className="public-notebook-workspace">
        <p className="public-demo-label">
          Guía interactiva · sin conexión a NotebookLM
        </p>
        <div
          className="public-step-buttons"
          role="group"
          aria-label="Pasos del laboratorio"
        >
          {NOTEBOOK_STEPS.map((item, index) => (
            <button
              type="button"
              key={item.title}
              aria-pressed={index === step}
              aria-controls="notebook-step"
              onClick={() => setStep(index)}
              className={index === step ? 'is-active' : ''}
            >
              <span>{index + 1}</span>
              {item.title}
            </button>
          ))}
        </div>
        <div
          id="notebook-step"
          className="public-notebook-step"
          aria-live="polite"
        >
          <span>
            Paso {step + 1} de {NOTEBOOK_STEPS.length}
          </span>
          <h3>{NOTEBOOK_STEPS[step].title}</h3>
          <p>{NOTEBOOK_STEPS[step].body}</p>
        </div>
        <details className="public-details">
          <summary>Ver y copiar el prompt del laboratorio</summary>
          <p className="text-sm leading-relaxed my-4">{labPrompt}</p>
          <CopyButton text={labPrompt} label="Copiar prompt de lectura" />
        </details>
        <p className="text-xs text-text-light mt-4">
          Privacidad y uso de los datos dependen del producto, la cuenta y sus
          condiciones. Tener correo institucional no basta para autorizar una
          carga.{' '}
          <a
            className="underline"
            href="https://support.google.com/gemininotebook/answer/16164461?hl=es"
            target="_blank"
            rel="noopener noreferrer"
          >
            Revisar documentación de Google
          </a>
          .
        </p>
      </div>
    </section>
  )
}

export default function SectorPublico() {
  const [params, setParams] = useSearchParams()
  const { hash } = useLocation()
  useEffect(() => {
    if (hash)
      document
        .getElementById(hash.slice(1))
        ?.scrollIntoView({ behavior: 'instant' })
  }, [hash])
  const task =
    PUBLIC_TASKS.find((item) => item.id === params.get('caso')) ||
    PUBLIC_TASKS[0]
  const [drafts, setDrafts] = useState({})
  const [dataType, setDataType] = useState('publico')
  const [reviews, setReviews] = useState({})
  const reviewKey = `${task.id}-${dataType}`
  const draft = drafts[task.id] || {
    context: task.example,
    audience: AUDIENCES[0],
  }
  const updateDraft = (update) =>
    setDrafts((previous) => ({
      ...previous,
      [task.id]: { ...draft, ...update },
    }))
  const prompt = buildPublicPrompt(
    task,
    draft.context,
    draft.audience,
    dataType,
  )
  const shareUrl = `${SITE_URL}/sector-publico?caso=${task.id}#roles`
  const TaskIcon = ICONS[task.icon]
  const dataGuidance = DATA_OPTIONS.find((item) => item.id === dataType)
  function selectTask(id) {
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous)
        next.set('caso', id)
        return next
      },
      { preventScrollReset: true },
    )
  }
  return (
    <div className="public-chapter">
      <header className="public-hero">
        <div className="public-hero-copy">
          <span className="eyebrow">
            <span className="public-flag" aria-hidden="true" />
            Colombia · capítulo especial
          </span>
          <h1>
            IA para servir
            <br />
            <span>mejor a las personas.</span>
          </h1>
          <p>
            Una guía de trabajo para el sector público colombiano. Elige una
            tarea, practica con un ejemplo y prepara un resultado que tu equipo
            pueda revisar.
          </p>
          <div className="public-hero-actions">
            <a className="action-primary" href="#roles">
              Encontrar mi caso de uso
              <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a className="action-text" href="#novedades">
              Qué cambió en 2026
              <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
          <div className="public-byline">
            Por{' '}
            <a
              href="https://sjimenezlon.co/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Santiago Jiménez Londoño
            </a>
            <span>
              Revisión: <time dateTime="2026-09-05">{REVIEW_DATE}</time>
            </span>
          </div>
        </div>
        <aside
          className="public-hero-sheet"
          aria-label="Cómo usar este capítulo"
        >
          <div className="public-sheet-header">
            <Landmark size={23} aria-hidden="true" />
            <span>
              CUADERNO DE TRABAJO
              <br />
              <strong>Sector público / 2026</strong>
            </span>
            <span className="public-sheet-dot" aria-hidden="true" />
          </div>
          <h2>
            Tu próxima tarea,
            <br />
            con un punto de partida.
          </h2>
          <ol>
            <li>
              <span>01</span>
              <div>
                <strong>Elige tu rol</strong>
                <p>8 rutas con ejemplos concretos.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <strong>Adapta el prompt</strong>
                <p>Contexto, destinatario y fuentes.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <strong>Verifica y mide</strong>
                <p>Una ficha para llevar a tu equipo.</p>
              </div>
            </li>
          </ol>
          <div className="public-sheet-footer">
            <ShieldCheck size={17} aria-hidden="true" />
            Cada resultado tiene una persona responsable.
          </div>
        </aside>
      </header>

      <nav className="public-chapter-nav" aria-label="Contenido del capítulo">
        <a href="#roles">Casos y prompts</a>
        <a href="#novedades">Novedades 2026</a>
        <a href="#madurez">Preparar un piloto</a>
        <a href="#notebook-lab">NotebookLM</a>
        <a href="#primera-semana">Primera semana</a>
        <a href="#fuentes">Fuentes</a>
      </nav>

      <div className="public-content">
        <section id="roles" className="public-section">
          <span id="prompts" className="public-anchor" />
          <SectionHeading
            number="01"
            title="Empieza por lo que necesitas hacer"
          >
            Selecciona una ruta. Puedes adaptar cada ejemplo y copiar el prompt
            a la herramienta autorizada por tu entidad.
          </SectionHeading>
          <div className="public-workbench">
            <div
              className="public-task-list"
              role="group"
              aria-label="Rutas por rol"
            >
              {PUBLIC_TASKS.map((item) => {
                const Icon = ICONS[item.icon]
                return (
                  <button
                    type="button"
                    key={item.id}
                    aria-pressed={task.id === item.id}
                    aria-controls="public-task-editor"
                    className={`public-task-choice ${task.id === item.id ? 'is-active' : ''}`}
                    onClick={() => selectTask(item.id)}
                  >
                    <Icon size={20} aria-hidden="true" />
                    <span>
                      <strong>{item.role}</strong>
                      <small>{item.title}</small>
                    </span>
                    {task.id === item.id && (
                      <Check
                        size={17}
                        className="public-choice-check"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                )
              })}
            </div>
            <div id="public-task-editor" className="public-task-editor">
              <div className="public-task-heading">
                <span className="public-task-icon">
                  <TaskIcon size={25} aria-hidden="true" />
                </span>
                <div>
                  <span className="eyebrow">{task.role}</span>
                  <h3>{task.title}</h3>
                </div>
              </div>
              <p className="text-text-light leading-relaxed">{task.summary}</p>
              <div className="public-input-note">
                <strong>Ten a mano</strong>
                <p>{task.input}</p>
              </div>
              <label className="field-label" htmlFor="public-context">
                Adapta el contexto de práctica
              </label>
              <textarea
                id="public-context"
                aria-describedby="public-context-help"
                className="field-input"
                rows={5}
                maxLength={3000}
                value={draft.context}
                onChange={(event) =>
                  updateDraft({ context: event.target.value })
                }
              />
              <div className="public-context-footer">
                <p id="public-context-help">
                  Usa datos públicos o ficticios. El contexto se conserva al
                  cambiar de ruta durante esta visita.
                </p>
                <button
                  type="button"
                  className="action-text"
                  onClick={() => updateDraft({ context: task.example })}
                >
                  <RotateCcw size={13} aria-hidden="true" />
                  Restaurar ejemplo
                </button>
              </div>
              <div className="public-form-row">
                <label className="field-label">
                  ¿Quién leerá el resultado?
                  <select
                    className="field-input"
                    value={draft.audience}
                    onChange={(event) =>
                      updateDraft({ audience: event.target.value })
                    }
                  >
                    {AUDIENCES.map((audience) => (
                      <option key={audience}>{audience}</option>
                    ))}
                  </select>
                </label>
                <label className="field-label">
                  ¿Qué datos usarías?
                  <select
                    className="field-input"
                    value={dataType}
                    onChange={(event) => setDataType(event.target.value)}
                  >
                    {DATA_OPTIONS.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div
                className={`public-data-note ${dataType === 'restringido' ? 'needs-review' : ''}`}
                role="status"
              >
                <ShieldCheck size={18} aria-hidden="true" />
                <p>{dataGuidance.guidance}</p>
              </div>
              <details key={task.id} className="public-details">
                <summary>Ver un resultado de ejemplo</summary>
                <p className="public-demo-label mt-4">
                  Ejemplo ficticio escrito para esta guía. Ilustra el caso
                  original y no cambia al editar el contexto.
                </p>
                <p className="whitespace-pre-line text-sm leading-relaxed mt-3">
                  {task.preview}
                </p>
              </details>
              <div className="public-prompt-header">
                <h4>Tu prompt, listo para adaptar</h4>
                <span>Se actualiza con tus elecciones</span>
              </div>
              <pre
                className="prompt-preview"
                tabIndex={0}
                aria-label="Prompt preparado"
              >
                {prompt}
              </pre>
              <div className="public-prompt-actions">
                <CopyButton key={prompt} text={prompt} />
                <ShareLink
                  key={shareUrl}
                  url={shareUrl}
                  label="Compartir esta ruta"
                />
              </div>
              <p className="text-xs text-text-light leading-relaxed">
                Esta página prepara texto; no consulta una IA ni carga
                documentos. El enlace comparte la ruta, sin incluir lo que
                escribiste.
              </p>
              <div className="public-task-review">
                <h4>
                  <ClipboardCheck size={18} aria-hidden="true" />
                  Antes de usarlo
                </h4>
                <ul>
                  {task.review.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p>
                  <strong>Qué medir:</strong> {task.measure}
                </p>
              </div>
              <div className="public-tool-options">
                <h4>Herramientas para explorar</h4>
                <div>
                  {task.tools.map((id) => {
                    const tool = getToolById(id)
                    return (
                      tool && (
                        <Link key={id} to={`/herramienta/${id}`}>
                          <ToolFavicon tool={tool} />
                          <span>{tool.name}</span>
                          <ArrowRight size={14} aria-hidden="true" />
                        </Link>
                      )
                    )
                  })}
                </div>
                <p>
                  Compara estas opciones con las que tu entidad ya tiene
                  autorizadas. Un plan de pago, por sí solo, no habilita el
                  tratamiento de datos.
                </p>
              </div>
              <div className="public-task-sources">
                {task.sources.map((id) => (
                  <SourceLink key={id} id={id} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="novedades" className="public-section">
          <SectionHeading
            number="02"
            title="Tres novedades para poner al día a tu equipo"
          >
            Fuentes de 2026 que complementan el marco de protección de datos y
            la política nacional de IA.
          </SectionHeading>
          <div className="public-news-grid">
            {['etica', 'mspi', 'cce'].map((id, index) => {
              const source = PUBLIC_SOURCES.find((item) => item.id === id)
              return (
                <article key={id} className="public-news-card">
                  <span className="public-news-date">
                    <CalendarDays size={14} aria-hidden="true" />
                    {source.date}
                  </span>
                  <h3>
                    {
                      [
                        'Una guía ética para entidades',
                        'Seguridad durante todo el ciclo',
                        'IA en contratación pública',
                      ][index]
                    }
                  </h3>
                  <p>{source.description}</p>
                  <SourceLink id={id} />
                </article>
              )
            })}
          </div>
          <div className="public-evidence-intro">
            <h3>Dos experiencias para aprender</h3>
            <p>
              Estas notas documentan anuncios institucionales. La fecha y el
              alcance de la evidencia acompañan cada caso.
            </p>
          </div>
          <div className="public-cases-grid">
            {DOCUMENTED_CASES.map((item) => (
              <article key={item.title} className="public-case">
                <span className="eyebrow">{item.entity}</span>
                <h4>{item.title}</h4>
                <small>{item.status}</small>
                <p>{item.body}</p>
                <p className="public-case-takeaway">{item.takeaway}</p>
                <details className="public-details">
                  <summary>Alcance de la evidencia</summary>
                  <p className="mt-3">{item.scope}</p>
                </details>
                <a
                  className="public-source-link"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Leer el comunicado oficial
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </section>

        <PilotReview
          task={task}
          dataType={dataType}
          checked={reviews[reviewKey] || {}}
          setChecked={(value) =>
            setReviews((previous) => ({ ...previous, [reviewKey]: value }))
          }
        />

        <section id="red-flags" className="public-guardrails">
          <div>
            <span className="eyebrow">
              <ShieldCheck size={16} aria-hidden="true" />
              Criterios para trabajar
            </span>
            <h2>
              La confianza se construye
              <br />
              en cada revisión.
            </h2>
            <p>
              Usa estas preguntas al preparar tu piloto. Jurídica y los
              responsables de datos y seguridad deben precisar las condiciones
              aplicables a la entidad.
            </p>
          </div>
          <div className="public-guardrail-items">
            {[
              [
                '¿Puedes explicar de dónde sale?',
                'Abre cada cita, contrasta las cifras y conserva la versión de la fuente. Un texto convincente todavía puede estar equivocado.',
              ],
              [
                '¿Quién puede corregir o detener?',
                'Define la persona responsable y un canal humano. Las decisiones sobre derechos, beneficios, sanciones o adjudicaciones requieren evaluación especializada y control efectivo.',
              ],
              [
                '¿Es apropiado usar esos datos aquí?',
                'Revisa finalidad, permisos y entorno. Anonimizar exige atender también los identificadores indirectos; una cuenta empresarial no sustituye esa evaluación.',
              ],
              [
                '¿Funciona para las personas que lo necesitan?',
                'Prueba comprensión, accesibilidad y casos de distintas poblaciones. Documenta errores y posibles exclusiones antes de ampliar el piloto.',
              ],
            ].map(([title, body]) => (
              <details key={title} className="public-details">
                <summary>{title}</summary>
                <p>{body}</p>
              </details>
            ))}
          </div>
        </section>

        <NotebookLab />

        <section id="primera-semana" className="public-section">
          <SectionHeading
            number="04"
            title="Un primer piloto en cinco jornadas"
          >
            Una propuesta de trabajo para una tarea acotada con información
            pública o ficticia. Ajusta el ritmo al equipo.
          </SectionHeading>
          <div className="public-week">
            {FIRST_WEEK.map((item) => (
              <article key={item.day}>
                <span>{item.day}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <TimeCalculator />
        </section>

        <section id="reflexiones" className="public-reflection">
          <Lightbulb size={27} aria-hidden="true" />
          <div>
            <h2>Empieza con una mejor pregunta.</h2>
            <p>
              ¿Qué dificultad de una persona o de tu equipo vas a resolver? Un
              resumen más rápido puede ayudar. Un trámite comprensible, una
              respuesta completa o una decisión mejor sustentada permiten
              reconocer el valor público.
            </p>
          </div>
        </section>

        <section id="fuentes" className="public-section">
          <SectionHeading
            number="05"
            title="Fuentes para verificar y profundizar"
          >
            Referencias consultadas el {REVIEW_DATE}. Esta selección orienta la
            lectura; no sustituye la revisión jurídica del caso ni un inventario
            completo de normas.
          </SectionHeading>
          <div className="public-sources-grid">
            {PUBLIC_SOURCES.map((source) => (
              <article
                key={source.id}
                id={`fuente-${source.id}`}
                className="public-source-card"
              >
                <span>{source.kind}</span>
                <h3>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {source.title}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </h3>
                <small>{source.date}</small>
                <p>{source.description}</p>
                {source.related && (
                  <a
                    href={source.related}
                    className="public-source-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Consultar el cómputo de días
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                )}
              </article>
            ))}
          </div>
          <div className="public-editorial-note">
            <Sparkles size={18} aria-hidden="true" />
            <p>
              Actualización editorial: nuevas referencias de 2026, ejemplos
              ficticios editables y métricas para cada piloto. Se retiraron
              cifras sin respaldo en la fuente enlazada y el reproductor
              simulado. El laboratorio ahora explica qué puedes hacer y cómo
              verificarlo.
            </p>
          </div>
        </section>
        <div className="public-bottom-cta">
          <div>
            <h2>Lleva una primera idea a tu equipo.</h2>
            <p>
              Comparte el capítulo o vuelve a tu caso para preparar el prompt.
            </p>
          </div>
          <a href="#roles" className="action-primary">
            Volver a mi caso
            <ArrowRight size={16} aria-hidden="true" />
          </a>
          <ShareLink
            url={`${SITE_URL}/sector-publico`}
            label="Compartir capítulo"
          />
        </div>
      </div>
    </div>
  )
}
