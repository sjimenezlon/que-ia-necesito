import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, Check, SlidersHorizontal, RotateCcw, Search } from 'lucide-react'
import { practicalExamples, exampleGroups, buildExamplePrompt } from '../data/practicalExamples'
import { getToolById } from '../utils/recommender'
import CopyButton from '../components/CopyButton'

function ExampleEditor({ example }) {
  const [draft] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem(`example-draft-${example.id}`) || '{}') || {}
    } catch {
      return {}
    }
  })
  const [topic, setTopic] = useState(
    typeof draft.topic === 'string' ? draft.topic.slice(0, 2000) : example.topic
  )
  const [audience, setAudience] = useState(
    typeof draft.audience === 'string' ? draft.audience.slice(0, 300) : example.audience
  )
  const tones = [
    'Claro y cercano',
    'Profesional y directo',
    'Didáctico y sencillo',
    'Creativo y expresivo',
  ]
  const [tone, setTone] = useState(tones.includes(draft.tone) ? draft.tone : tones[0])
  useEffect(() => {
    try {
      sessionStorage.setItem(
        `example-draft-${example.id}`,
        JSON.stringify({ topic, audience, tone })
      )
    } catch {
      /* Editing works even when storage is unavailable. */
    }
  }, [example.id, topic, audience, tone])
  const prompt = buildExamplePrompt(example, { topic, audience, tone })
  return (
    <article className="example-editor" aria-label={`Personalizar: ${example.title}`}>
      <div className="flex justify-between items-start gap-4">
        <div>
          <span className="eyebrow">Tu punto de partida</span>
          <h2 className="text-2xl md:text-3xl font-bold mt-2">{example.title}</h2>
        </div>
        <span className="step-badge">01 → 03</span>
      </div>
      <p className="text-text-light mt-3 mb-6">{example.description}</p>
      <div className="example-material">
        <strong>Ten a mano</strong>
        <p>{example.input}</p>
      </div>
      <div className="flex items-center gap-2 mt-7 mb-4 font-semibold">
        <SlidersHorizontal size={17} className="text-primary" />
        1. Adáptalo a tu situación
      </div>
      <div className="space-y-4">
        <label className="field-label">
          Tema o situación
          <textarea
            className="field-input"
            rows={3}
            maxLength={2000}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </label>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="field-label">
            ¿Para quién es?
            <input
              className="field-input"
              maxLength={300}
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            />
          </label>
          <label className="field-label">
            Tono
            <select className="field-input" value={tone} onChange={(e) => setTone(e.target.value)}>
              {tones.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 mt-7 mb-3">
        <h3 className="font-semibold">2. Copia tu instrucción</h3>
        <span className="text-xs text-text-light">Se actualiza al editar</span>
      </div>
      <details className="mb-3 text-sm text-text-light">
        <summary className="cursor-pointer py-2">
          ¿Qué cambia frente a una petición genérica?
        </summary>
        <p className="py-2">
          «{example.before}» deja muchas decisiones al azar. Esta versión define el contexto, la
          audiencia, el entregable y cómo revisar su calidad.
        </p>
      </details>
      <pre tabIndex={0} aria-label="Vista previa del prompt" className="prompt-preview">
        {prompt}
      </pre>
      <div className="flex flex-wrap justify-between gap-3 mt-4">
        <CopyButton key={prompt} text={prompt} />
        <button
          className="action-text self-start"
          onClick={() => {
            setTopic(example.topic)
            setAudience(example.audience)
            setTone('Claro y cercano')
          }}
        >
          <RotateCcw size={15} />
          Restaurar ejemplo
        </button>
      </div>
      <p className="text-xs text-text-light mt-1">
        Esta es una plantilla editable. El ejemplo se prepara en tu navegador; no genera una
        respuesta de IA.
      </p>
      <h3 className="font-semibold mt-7 mb-3">3. Elige dónde probarlo</h3>
      <div className="grid sm:grid-cols-2 gap-3">
        {example.tools.map((item) => {
          const tool = getToolById(item.id)
          return (
            <Link key={item.id} to={`/herramienta/${item.id}`} className="example-tool">
              <span className="flex items-center justify-between font-semibold">
                {tool.name}
                <ArrowRight size={16} />
              </span>
              <span className="text-sm text-text-light mt-1 block">{item.reason}</span>
            </Link>
          )
        })}
      </div>
      <div className="mt-6 border-t border-border pt-5">
        <h3 className="font-semibold text-sm mb-3">Antes de usar el resultado, revisa</h3>
        <ul className="space-y-2">
          {example.check.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-text-light">
              <Check size={16} className="text-accent shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <Link to="/prompt-lab" className="action-text mt-5">
        Crear una instrucción más detallada en Prompt Lab <ArrowRight size={15} />
      </Link>
    </article>
  )
}

export default function Examples() {
  const [params, setParams] = useSearchParams()
  const [group, setGroup] = useState('Todos')
  const [search, setSearch] = useState('')
  const active = practicalExamples.find((e) => e.id === params.get('caso')) || practicalExamples[0]
  const normalize = (value) =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  const visible = practicalExamples.filter(
    (e) =>
      (group === 'Todos' || e.group === group) &&
      normalize(`${e.title} ${e.description} ${e.topic}`).includes(normalize(search))
  )
  const select = (example) => {
    setParams({ caso: example.id }, { replace: true })
    if (window.matchMedia('(max-width: 767px)').matches)
      document
        .getElementById('example-workspace')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
      <div className="max-w-2xl mb-8">
        <span className="eyebrow">Aprende haciendo</span>
        <h1 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
          Una tarea real.
          <br />
          <span className="text-primary">Un buen primer intento.</span>
        </h1>
        <p className="text-lg text-text-light">
          Elige un ejemplo, hazlo tuyo y llévate una instrucción lista para probar.
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mb-7" aria-label="Filtrar ejemplos por contexto">
        {exampleGroups.map((g) => (
          <button
            key={g}
            className={`filter-pill ${g === group ? 'selected' : ''}`}
            aria-pressed={g === group}
            onClick={() => setGroup(g)}
          >
            {g}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-[290px_minmax(0,1fr)] gap-6 items-start">
        <aside className="min-w-0" aria-label="Biblioteca de ejemplos">
          <label className="relative block mb-3">
            <span className="sr-only">Buscar ejemplos</span>
            <Search size={16} className="absolute top-3.5 left-3 text-text-light" />
            <input
              className="field-input !pl-9"
              placeholder="Buscar una tarea…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <p role="status" className="text-xs text-text-light mb-3">
            {visible.length} ejemplo{visible.length === 1 ? '' : 's'} disponible
            {visible.length === 1 ? '' : 's'}
          </p>
          <div className="example-list space-y-2">
            {visible.map((e) => (
              <button
                key={e.id}
                onClick={() => select(e)}
                aria-pressed={e.id === active.id}
                className={`example-choice ${e.id === active.id ? 'selected' : ''}`}
              >
                <span className="text-xs text-text-light">{e.group}</span>
                <span className="block font-semibold my-1">{e.title}</span>
                <span className="text-sm text-text-light">{e.description}</span>
              </button>
            ))}
          </div>
          {visible.length === 0 && (
            <div className="border border-border rounded-xl p-5">
              <p className="text-sm mb-3">No hay ejemplos con esa combinación.</p>
              <button
                className="action-text"
                onClick={() => {
                  setSearch('')
                  setGroup('Todos')
                }}
              >
                Ver todos los ejemplos
              </button>
            </div>
          )}
        </aside>
        <div id="example-workspace" className="scroll-mt-24 min-w-0">
          <ExampleEditor key={active.id} example={active} />
        </div>
      </div>
    </div>
  )
}
