import { useState, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  Clock3,
  Download,
  ExternalLink,
  Store,
  Target,
  BookOpen,
  TrendingUp,
} from 'lucide-react'
import CopyButton from '../components/CopyButton'
import tools from '../data/tools.json'
import { EDITION, updates } from '../data/editorial'
import { sectors, sizes, sizeAdvice, exercises, buildBusinessPrompt } from '../data/pymes'
import { readProgress, saveProgress, downloadText, calculatePilot } from '../utils/learning'
import './learning.css'

const STORAGE_KEY = 'qia-pymes-v1'
const defaultPilot = {
  before: '20',
  after: '10',
  weekly: '15',
  hourly: '20000',
  cost: '80000',
  owner: '',
  task: '',
}
const initial = { profile: { sector: sectors[0], size: sizes[0] }, drafts: {}, pilot: defaultPilot }
const steps = ['Entiende', 'Prueba', 'Comprueba', 'Aplica']

function validState(value) {
  return (
    sectors.includes(value.profile?.sector) &&
    sizes.includes(value.profile?.size) &&
    value.drafts &&
    typeof value.drafts === 'object' &&
    !Array.isArray(value.drafts) &&
    Object.values(value.drafts).every(
      (d) =>
        d &&
        typeof d.data === 'string' &&
        typeof d.goal === 'string' &&
        Number.isInteger(d.step) &&
        d.step >= 0 &&
        d.step < 4 &&
        Array.isArray(d.checks) &&
        d.checks.length === 3 &&
        d.checks.every((c) => typeof c === 'boolean') &&
        (d.answer === null || [0, 1, 2].includes(d.answer)) &&
        typeof d.complete === 'boolean'
    ) &&
    value.pilot &&
    Object.keys(defaultPilot).every((k) => typeof value.pilot[k] === 'string')
  )
}

function Workshop({ exercise, profile, draft, onChange }) {
  const panelRef = useRef(null)
  const data = draft || {
    data: exercise.data,
    goal: exercise.outcome,
    checks: [false, false, false],
    answer: null,
    complete: false,
    step: 0,
  }
  const [showReference, setShowReference] = useState(false)
  const update = (patch) => onChange({ ...data, ...patch })
  const step = data.step
  const prompt = buildBusinessPrompt(exercise, profile, data.data, data.goal)
  const ready = data.checks.every(Boolean) && data.answer === exercise.answer
  const move = (next) => {
    update({ step: next })
    panelRef.current?.focus()
  }
  const edited = data.data !== exercise.data

  return (
    <section className="lab-workshop" aria-label={`Taller: ${exercise.title}`}>
      <div className="lab-workshop-header">
        <div>
          <span className="lab-kicker">Tu mesa de trabajo · {exercise.minutes} minutos</span>
          <h3>{exercise.title}</h3>
        </div>
        {data.complete && (
          <span className="lab-complete">
            <CheckCircle2 size={17} /> Completado
          </span>
        )}
      </div>
      <nav className="lab-steps" aria-label="Pasos del taller">
        {steps.map((label, i) => (
          <button
            key={label}
            aria-current={step === i ? 'step' : undefined}
            onClick={() => move(i)}
          >
            <span>{i + 1}</span>
            {label}
          </button>
        ))}
      </nav>
      <div className="lab-workshop-body" ref={panelRef} tabIndex={-1}>
        {step === 0 && (
          <div className="lab-two-col">
            <div>
              <span className="lab-kicker">01 / Entiende el reto</span>
              <h4>{exercise.learn}</h4>
              <p>{exercise.outcome}</p>
              <div className="lab-note">
                <strong>Antes de pedir ayuda</strong>
                <p>
                  Piensa qué entregarías sin IA y qué dato necesitarías confirmar. Puedes completar
                  toda la práctica con este caso ficticio.
                </p>
              </div>
              <p className="lab-small">
                El perfil adapta las instrucciones; los hechos del caso se mantienen para que puedas
                contrastar tu respuesta.
              </p>
            </div>
            <div>
              <label className="lab-label" htmlFor="business-data">
                Datos de práctica · puedes editarlos
              </label>
              <textarea
                id="business-data"
                rows={9}
                value={data.data}
                maxLength={8000}
                onChange={(e) =>
                  update({
                    data: e.target.value,
                    checks: [false, false, false],
                    answer: null,
                    complete: false,
                  })
                }
              />
              <button
                className="lab-text-button"
                onClick={() =>
                  update({
                    data: exercise.data,
                    checks: [false, false, false],
                    answer: null,
                    complete: false,
                  })
                }
              >
                Restaurar datos de ejemplo
              </button>
              <p className="lab-small">
                Usa información ficticia o anonimizada. El borrador se guarda en este navegador;
                evita datos confidenciales en equipos compartidos.
              </p>
            </div>
          </div>
        )}
        {step === 1 && (
          <>
            <span className="lab-kicker">02 / Da una instrucción concreta</span>
            <h4>Un objetivo, unos datos y un entregable.</h4>
            <label className="lab-label" htmlFor="business-goal">
              ¿Qué resultado necesitas?
            </label>
            <input
              id="business-goal"
              value={data.goal}
              maxLength={500}
              onChange={(e) =>
                update({ goal: e.target.value, checks: [false, false, false], complete: false })
              }
            />
            <div className="lab-prompt">
              <pre>{prompt}</pre>
            </div>
            {data.data.trim() ? (
              <CopyButton key={prompt} text={prompt} />
            ) : (
              <p role="status">Añade datos en el paso 1 antes de copiar la instrucción.</p>
            )}
            <p className="lab-small">
              Esta guía construye la instrucción. Para obtener una respuesta, pégala en una
              herramienta; puede pedirte una cuenta. También puedes aprender con la referencia del
              paso 3.
            </p>
            <div className="lab-tool-links">
              {exercise.tools.map((id) => {
                const tool = tools.find((t) => t.id === id)
                return (
                  <a key={id} href={tool.url} target="_blank" rel="noopener noreferrer">
                    Abrir {tool.name.split(' (')[0]} <ExternalLink size={14} />
                  </a>
                )
              })}
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <span className="lab-kicker">03 / Revisa antes de usar</span>
            <h4>¿El resultado resiste una comprobación?</h4>
            <p>
              Intenta resolver el caso antes de abrir la referencia. Después, compara las cifras,
              los compromisos y los datos que faltan.
            </p>
            {edited && (
              <div className="lab-note">
                Editaste los datos: la referencia y la lista de revisión corresponden al caso
                original. Úsalas para practicar el método y recalcula tu caso; no validan
                automáticamente tu resultado.
              </div>
            )}
            <button
              className="lab-secondary"
              aria-expanded={showReference}
              onClick={() => setShowReference(!showReference)}
            >
              {showReference ? 'Ocultar' : 'Ver'} respuesta de referencia
            </button>
            {showReference && (
              <div className="lab-reference">
                <span className="lab-kicker">Ejemplo escrito para aprender · caso original</span>
                <p>{exercise.expected}</p>
              </div>
            )}
            <fieldset className="lab-checklist">
              <legend>Comprueba el caso original</legend>
              {exercise.checks.map((check, i) => (
                <label key={check}>
                  <input
                    type="checkbox"
                    checked={data.checks[i]}
                    onChange={(e) =>
                      update({
                        checks: data.checks.map((value, j) => (j === i ? e.target.checked : value)),
                        complete: false,
                      })
                    }
                  />
                  <span>{check}</span>
                </label>
              ))}
            </fieldset>
            <fieldset className="lab-quiz">
              <legend>{exercise.question}</legend>
              {exercise.options.map((option, i) => (
                <label key={option}>
                  <input
                    type="radio"
                    name={`quiz-${exercise.id}`}
                    checked={data.answer === i}
                    onChange={() => update({ answer: i, complete: false })}
                  />
                  {option}
                </label>
              ))}
              {data.answer !== null && (
                <p
                  role="status"
                  className={data.answer === exercise.answer ? 'lab-feedback good' : 'lab-feedback'}
                >
                  <strong>
                    {data.answer === exercise.answer ? 'Bien razonado. ' : 'Revisa esta decisión. '}
                  </strong>
                  {exercise.feedback}
                </p>
              )}
            </fieldset>
          </>
        )}
        {step === 3 && (
          <>
            <span className="lab-kicker">04 / Llévalo a tu empresa</span>
            <h4>Haz una prueba pequeña y mide lo que cambia.</h4>
            <p>{exercise.transfer}</p>
            <div className="lab-note">
              <strong>Qué medir</strong>
              <p>{exercise.metric}</p>
            </div>
            <p>{sizeAdvice[sizes.indexOf(profile.size)]}</p>
            <button
              className="lab-primary"
              disabled={!ready || data.complete}
              onClick={() => update({ complete: true })}
            >
              <CheckCircle2 size={17} />
              {data.complete ? 'Taller completado' : 'Marcar taller como completado'}
            </button>
            <p className="lab-small" role="status">
              {data.complete
                ? 'Guardaste una práctica revisada. El siguiente paso es medir un piloto real.'
                : ready
                  ? 'Comprobaciones listas. Puedes guardar tu avance.'
                  : 'Completa las tres comprobaciones y responde correctamente en el paso 3 para cerrar el taller.'}
            </p>
            {!ready && (
              <button className="lab-text-button" onClick={() => move(2)}>
                Volver a comprobar
              </button>
            )}
            <div className="lab-tool-links">
              <button
                onClick={() =>
                  downloadText(
                    `taller-${exercise.id}.txt`,
                    `${exercise.title}\nEdición: ${EDITION.label}\n\n${prompt}\n\nREFERENCIA DEL CASO ORIGINAL\n${exercise.expected}\n\nAPLICACIÓN\n${exercise.transfer}\n\nMÉTRICA\n${exercise.metric}`
                  )
                }
              >
                <Download size={16} /> Descargar mi ejercicio
              </button>
              <a href="#piloto">
                Preparar mi piloto <ArrowRight size={16} />
              </a>
            </div>
          </>
        )}
      </div>
      <div className="lab-step-footer">
        <button className="lab-text-button" disabled={step === 0} onClick={() => move(step - 1)}>
          <ArrowLeft size={16} />
          Anterior
        </button>
        <span>{step + 1} de 4</span>
        <button className="lab-secondary" disabled={step === 3} onClick={() => move(step + 1)}>
          Siguiente <ArrowRight size={16} />
        </button>
      </div>
    </section>
  )
}

export default function Pymes() {
  const [saved, setSaved] = useState(() => readProgress(STORAGE_KEY, initial, validState))
  const [storageOk, setStorageOk] = useState(true)
  const [params, setParams] = useSearchParams()
  const [area, setArea] = useState('Todas')
  const workshopRef = useRef(null)
  const exercise = exercises.find((e) => e.id === params.get('caso')) || exercises[0]
  const completed = exercises.filter((e) => saved.drafts[e.id]?.complete).length
  const set = (next) => {
    setSaved(next)
    setStorageOk(saveProgress(STORAGE_KEY, next))
  }
  const choose = (item) => {
    setParams({ caso: item.id }, { replace: true })
    workshopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    workshopRef.current?.focus({ preventScroll: true })
  }
  const pilot = saved.pilot
  const estimate = calculatePilot(pilot)
  const money = (value) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(value)
  const plan = `MI PILOTO DE IA · PYME\nEdición: ${EDITION.label}\nSector: ${saved.profile.sector}\nEquipo: ${saved.profile.size}\nTarea: ${pilot.task || exercise.title}\nResponsable: ${pilot.owner || 'Por asignar'}\n\nDía 1: medir cinco casos sin IA.\nDías 2–3: preparar datos anonimizados y cinco borradores con IA.\nDías 4–5: revisar calidad y probar excepciones; registrar errores y tiempo total.\nDía 6: comparar tiempos, errores y costo.\nDía 7: decidir si continuar, ajustar o detener.\n\nMétrica: ${exercise.metric}\nTiempo sin IA: ${pilot.before} min/caso\nTiempo con IA, incluida revisión: ${pilot.after} min/caso\nCasos por semana: ${pilot.weekly}\nValor estimado de una hora: COP ${pilot.hourly}\nCosto del piloto para 4 semanas: COP ${pilot.cost}\n${estimate ? `Horas liberadas en 4 semanas: ${estimate.hours.toFixed(1)}\nValor de capacidad menos costo: ${money(estimate.capacity)}` : 'Estimación pendiente: revisar los campos numéricos.'}\n\nEl valor de capacidad no es ahorro de caja garantizado. Continuar solo si se mantiene la calidad, los datos están autorizados y el responsable aprueba el proceso. Nunca activar envíos, compras o cambios sin permiso.`

  return (
    <div className="learning-page">
      <section className="business-hero">
        <div className="lab-container lab-two-col">
          <div>
            <div className="lab-kicker">
              <Store size={16} /> IA para pequeñas y medianas empresas
            </div>
            <h1>
              Menos tareas pendientes.
              <br />
              <em>Más tiempo para tu negocio.</em>
            </h1>
            <p>
              No necesitas un equipo de tecnología para empezar. Elige una tarea cotidiana, practica
              con un caso y aprende a revisar lo que produce la IA.
            </p>
            <div className="lab-actions">
              <a className="lab-primary" href="#talleres">
                Encontrar mi primer ejercicio <ArrowRight size={17} />
              </a>
              <Link className="lab-text-button" to="/aprender">
                Soy nuevo en IA <BookOpen size={17} />
              </Link>
            </div>
            <p className="lab-small">
              Sin registro en esta guía · 15–25 minutos por taller · Edición{' '}
              <time dateTime={EDITION.iso}>{EDITION.label}</time>
            </p>
          </div>
          <div className="business-route">
            <span className="lab-kicker">Del primer intento a una mejora medible</span>
            {[
              ['01', 'Elige una tarea', 'Una cotización, una queja o un reporte.'],
              ['02', 'Practica y comprueba', 'Datos de ejemplo y respuestas para contrastar.'],
              ['03', 'Prueba en tu empresa', 'Un piloto de siete días, con responsable y métrica.'],
            ].map(([n, title, text]) => (
              <div className="business-route-row" key={n}>
                <span>{n}</span>
                <div>
                  <h2>{title}</h2>
                  <p>{text}</p>
                </div>
              </div>
            ))}
            <div className="lab-progress-copy">
              <span>Tu avance</span>
              <strong>{completed} de 6 talleres</strong>
            </div>
            <progress value={completed} max={6} aria-label="Talleres completados" />
            <p className="lab-small" role="status">
              {storageOk
                ? 'Tu progreso y tus borradores se guardan en este navegador.'
                : 'Este navegador no permite guardar. Puedes seguir y descargar tu ejercicio.'}
            </p>
          </div>
        </div>
      </section>

      <section
        id="talleres"
        className="lab-container lab-section"
        aria-labelledby="workshops-title"
      >
        <div className="lab-section-heading">
          <div>
            <span className="lab-kicker">01 / Encuentra una oportunidad</span>
            <h2 id="workshops-title">¿Qué quieres mejorar primero?</h2>
            <p>Empieza con algo frecuente, fácil de revisar y de bajo riesgo.</p>
          </div>
          <span className="lab-counter">6 talleres prácticos</span>
        </div>
        <div className="lab-profile">
          <label>
            Tu sector
            <select
              value={saved.profile.sector}
              onChange={(e) =>
                set({ ...saved, profile: { ...saved.profile, sector: e.target.value } })
              }
            >
              {sectors.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label>
            Tamaño del equipo
            <select
              value={saved.profile.size}
              onChange={(e) =>
                set({ ...saved, profile: { ...saved.profile, size: e.target.value } })
              }
            >
              {sizes.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <p>
            {sizeAdvice[sizes.indexOf(saved.profile.size)]}
            <span className="lab-small">Rangos orientativos para adaptar el ejercicio.</span>
          </p>
        </div>
        <div className="lab-filters" aria-label="Filtrar por área">
          {['Todas', ...new Set(exercises.map((e) => e.area))].map((label) => (
            <button key={label} aria-pressed={area === label} onClick={() => setArea(label)}>
              {label}
            </button>
          ))}
        </div>
        <div className="lab-exercise-grid">
          {exercises
            .filter((e) => area === 'Todas' || e.area === area)
            .map((item) => (
              <button
                className={`lab-exercise-card ${exercise.id === item.id ? 'selected' : ''}`}
                key={item.id}
                onClick={() => choose(item)}
                aria-pressed={exercise.id === item.id}
              >
                <span className="lab-card-meta">
                  {item.area}
                  <span>
                    {saved.drafts[item.id]?.complete ? (
                      <CheckCircle2 size={18} aria-label="Completado" />
                    ) : (
                      <Clock3 size={16} />
                    )}
                    {item.minutes} min
                  </span>
                </span>
                <h3>{item.title}</h3>
                <p>{item.outcome}</p>
                <span className="lab-card-bottom">
                  {item.level}
                  <ArrowRight size={18} />
                </span>
              </button>
            ))}
        </div>
        {params.get('caso') && !exercises.some((e) => e.id === params.get('caso')) && (
          <p role="status">Ese taller no existe. Te mostramos el de ventas para empezar.</p>
        )}
      </section>

      <div
        id="mesa-de-trabajo"
        className="lab-container lab-anchor"
        ref={workshopRef}
        tabIndex={-1}
      >
        <Workshop
          key={exercise.id}
          exercise={exercise}
          profile={saved.profile}
          draft={saved.drafts[exercise.id]}
          onChange={(draft) => set({ ...saved, drafts: { ...saved.drafts, [exercise.id]: draft } })}
        />
      </div>

      <section id="piloto" className="lab-container lab-section" aria-labelledby="pilot-title">
        <span className="lab-kicker">02 / Convierte la práctica en un piloto</span>
        <h2 id="pilot-title">Una tarea. Siete días. Un resultado que puedas medir.</h2>
        <p>
          Compara el tiempo completo, incluida la revisión. Los valores iniciales son un ejemplo
          editable.
        </p>
        <div className="lab-two-col lab-pilot">
          <div>
            <div className="lab-note">
              <Target size={22} />
              <strong>Plan de siete días</strong>
              <ol>
                <li>
                  <b>Día 1:</b> mide cinco casos sin IA.
                </li>
                <li>
                  <b>Días 2–3:</b> ensaya cinco casos con IA y datos anonimizados.
                </li>
                <li>
                  <b>Días 4–5:</b> revisa resultados y prueba excepciones.
                </li>
                <li>
                  <b>Día 6:</b> compara tiempo, calidad y costo.
                </li>
                <li>
                  <b>Día 7:</b> decide si continuar, ajustar o detener.
                </li>
              </ol>
            </div>
            <label className="lab-label" htmlFor="pilot-task">
              Tarea del piloto
            </label>
            <input
              id="pilot-task"
              placeholder={exercise.title}
              value={pilot.task}
              maxLength={150}
              onChange={(e) => set({ ...saved, pilot: { ...pilot, task: e.target.value } })}
            />
            <label className="lab-label" htmlFor="pilot-owner">
              Responsable (rol)
            </label>
            <input
              id="pilot-owner"
              placeholder="Ej. responsable comercial"
              value={pilot.owner}
              maxLength={100}
              onChange={(e) => set({ ...saved, pilot: { ...pilot, owner: e.target.value } })}
            />
          </div>
          <div className="lab-calculator">
            <h3>
              <TrendingUp size={20} /> ¿Cuánto tiempo podrías recuperar?
            </h3>
            <div className="lab-input-grid">
              {[
                ['before', 'Minutos por caso sin IA'],
                ['after', 'Minutos con IA + revisión'],
                ['weekly', 'Casos por semana'],
                ['hourly', 'Valor de una hora (COP)'],
                ['cost', 'Costo total en 4 semanas (COP)'],
              ].map(([key, label]) => (
                <label key={key}>
                  {label}
                  <input
                    type="number"
                    min="0"
                    step="any"
                    inputMode="decimal"
                    value={pilot[key]}
                    onChange={(e) => set({ ...saved, pilot: { ...pilot, [key]: e.target.value } })}
                  />
                </label>
              ))}
            </div>
            <div className="lab-estimate" aria-live="polite">
              {estimate ? (
                <>
                  <strong>
                    {estimate.hours.toLocaleString('es-CO', { maximumFractionDigits: 1 })} horas
                  </strong>
                  <p>
                    {estimate.hours < 0
                      ? 'adicionales requeridas (valor negativo = tiempo perdido)'
                      : 'liberadas en cuatro semanas'}
                  </p>
                  <span>{money(estimate.capacity)} de capacidad valorada, menos costo</span>
                </>
              ) : (
                <p>Completa todos los campos con números iguales o mayores a cero.</p>
              )}
            </div>
            <p className="lab-small">
              Fórmula: (minutos sin IA − minutos con IA y revisión) × casos por semana × 4 ÷ 60. El
              valor del tiempo no equivale a ahorro de efectivo ni a ventas nuevas.
            </p>
          </div>
        </div>
        <button className="lab-primary" onClick={() => downloadText('mi-piloto-ia-pyme.txt', plan)}>
          <Download size={17} /> Descargar mi plan de piloto
        </button>
        <details className="mt-5">
          <summary className="cursor-pointer text-sm font-semibold">Ver y copiar mi plan</summary>
          <div className="lab-prompt">
            <pre>{plan}</pre>
          </div>
          <CopyButton key={plan} text={plan} label="Copiar plan" />
        </details>
      </section>

      <section className="lab-container lab-section lab-toolkit">
        <span className="lab-kicker">03 / Elige lo necesario</span>
        <h2>Un kit pequeño para comenzar.</h2>
        <div className="lab-three-col">
          {[
            [
              'Un asistente',
              'ChatGPT, Claude o Gemini',
              'Para los ejercicios de texto, empieza con una sola herramienta. Compara un mismo caso y revisa sus límites antes de pagar.',
              '/comparar',
              'Comparar herramientas',
            ],
            [
              'Una hoja de cálculo',
              'Tu archivo de trabajo habitual',
              'Conserva allí la fuente de cifras, repite las operaciones y registra tiempo y errores. Una respuesta convincente todavía necesita comprobación.',
              '/pymes?caso=inventario',
              'Practicar con inventario',
            ],
            [
              'Una automatización, después',
              'Make',
              'Primero documenta el proceso. Make ofrece 1.000 créditos mensuales en Free; las funciones de IA pueden consumir más de un crédito y una API propia puede tener cobro adicional.',
              '/herramienta/make',
              'Conocer Make',
            ],
          ].map(([tag, title, description, to, label]) => (
            <article key={tag}>
              <span className="lab-kicker">{tag}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <Link to={to}>
                {label} <ArrowRight size={15} />
              </Link>
            </article>
          ))}
        </div>
        <p className="lab-small">
          Antes de subir datos del negocio, revisa qué cuenta autoriza tu empresa, quién tiene
          acceso y las condiciones del proveedor. Mantén aprobación humana para publicar, enviar,
          pagar o cambiar registros.
        </p>
        <a
          className="lab-source"
          href="https://www.make.com/en/pricing"
          target="_blank"
          rel="noopener noreferrer"
        >
          Fuente: planes de Make, consultados el 8 de octubre <ExternalLink size={13} />
        </a>
      </section>

      <section className="lab-container lab-section">
        <span className="lab-kicker">Actualización / {EDITION.label}</span>
        <h2>Qué cambió y cómo te puede servir.</h2>
        <div className="lab-three-col">
          {updates.map((item) => (
            <article className="lab-update" key={item.title}>
              <span className="lab-small">{item.date}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.source} <ExternalLink size={13} />
              </a>
            </article>
          ))}
        </div>
        <p className="lab-small">
          Revisión de las novedades destacadas y de Make. Las demás fichas y capítulos conservan su
          fecha individual de revisión.
        </p>
      </section>
    </div>
  )
}
