import { useEffect, useState } from 'react'
import { Check, ClipboardList, Copy, Download, HeartHandshake, NotebookPen, Plus, Trash2 } from 'lucide-react'
import { COMMITMENTS, REFLECTION_PROMPTS } from '../data/researchers'

const KEYS = {
  log: 'qia-investigadores-bitacora',
  reflection: 'qia-investigadores-reflexion',
  pledge: 'qia-investigadores-compromiso',
}

function readStored(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeStored(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* navegador sin almacenamiento: el espacio sigue funcionando en la sesión */
  }
}

function useStored(key, fallback) {
  const [value, setValue] = useState(() => readStored(key, fallback))
  useEffect(() => writeStored(key, value), [key, value])
  return [value, setValue]
}

function downloadText(filename, text) {
  const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

const today = () => new Date().toISOString().slice(0, 10)
const EMPTY_ENTRY = { tool: '', version: '', task: '', check: '', inText: 'no' }

const inputClass = 'w-full rounded-xl border border-border bg-bg text-text text-sm p-2.5 placeholder:text-text-lighter focus:outline-none focus:border-primary/50'
const labelClass = 'block text-[11px] font-bold uppercase tracking-[0.12em] text-text-lighter mb-1.5'

function Logbook() {
  const [entries, setEntries] = useStored(KEYS.log, [])
  const [draft, setDraft] = useState(EMPTY_ENTRY)
  const [copied, setCopied] = useState(false)

  function addEntry(event) {
    event.preventDefault()
    if (!draft.tool.trim() || !draft.task.trim()) return
    setEntries((current) => [{ ...draft, date: today(), id: Date.now() }, ...current])
    setDraft(EMPTY_ENTRY)
  }

  const markdown = [
    '# Bitácora de uso de IA',
    '',
    '| Fecha | Herramienta y versión | Para qué | Cómo lo verifiqué | ¿Entró al texto? |',
    '|---|---|---|---|---|',
    ...entries.map((entry) => `| ${entry.date} | ${entry.tool}${entry.version ? ` (${entry.version})` : ''} | ${entry.task} | ${entry.check || '—'} | ${entry.inText === 'si' ? 'Sí' : 'No'} |`),
  ].join('\n')

  function copyMarkdown() {
    navigator.clipboard?.writeText(markdown).catch(() => {})
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 items-start">
      <form onSubmit={addEntry} className="bg-surface border border-border rounded-2xl p-5 space-y-3">
        <p className="text-xs text-text-light leading-relaxed">
          Anota cada uso relevante mientras trabajas. Cuando llegue el momento de escribir tu declaración, o un jurado pregunte, la tendrás lista.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="log-tool" className={labelClass}>Herramienta</label>
            <input id="log-tool" className={inputClass} value={draft.tool} onChange={(e) => setDraft({ ...draft, tool: e.target.value })} placeholder="Elicit, Claude, Colab…" />
          </div>
          <div>
            <label htmlFor="log-version" className={labelClass}>Modelo o versión</label>
            <input id="log-version" className={inputClass} value={draft.version} onChange={(e) => setDraft({ ...draft, version: e.target.value })} placeholder="Opus 5.5, GPT-6 Sol…" />
          </div>
        </div>
        <div>
          <label htmlFor="log-task" className={labelClass}>Para qué la usé</label>
          <input id="log-task" className={inputClass} value={draft.task} onChange={(e) => setDraft({ ...draft, task: e.target.value })} placeholder="Buscar literatura sobre…" />
        </div>
        <div>
          <label htmlFor="log-check" className={labelClass}>Cómo lo verifiqué</label>
          <input id="log-check" className={inputClass} value={draft.check} onChange={(e) => setDraft({ ...draft, check: e.target.value })} placeholder="Abrí cada DOI, corrí el código…" />
        </div>
        <fieldset className="flex items-center gap-4 text-sm text-text-light">
          <legend className={`${labelClass} mb-1.5`}>¿Algo de esto entró al texto final?</legend>
          {[{ id: 'no', label: 'No' }, { id: 'si', label: 'Sí' }].map((option) => (
            <label key={option.id} className="inline-flex items-center gap-1.5 cursor-pointer">
              <input type="radio" name="log-intext" checked={draft.inText === option.id} onChange={() => setDraft({ ...draft, inText: option.id })} className="accent-teal-600" />
              {option.label}
            </label>
          ))}
        </fieldset>
        <button type="submit" className="inline-flex items-center gap-2 bg-text text-bg px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer hover:bg-text/90 transition-colors disabled:opacity-40" disabled={!draft.tool.trim() || !draft.task.trim()}>
          <Plus className="w-4 h-4" />
          Agregar a la bitácora
        </button>
      </form>

      <div className="bg-surface border border-border rounded-2xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className="text-sm font-bold text-text">{entries.length} {entries.length === 1 ? 'registro' : 'registros'}</span>
          <div className="flex gap-2">
            <button type="button" onClick={copyMarkdown} disabled={entries.length === 0} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border text-[11px] font-semibold text-text-light cursor-pointer hover:border-primary/30 hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed">
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copiada' : 'Copiar tabla'}
            </button>
            <button type="button" onClick={() => downloadText('bitacora-uso-ia.md', markdown)} disabled={entries.length === 0} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border text-[11px] font-semibold text-text-light cursor-pointer hover:border-primary/30 hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed">
              <Download className="w-3 h-3" />
              Descargar
            </button>
          </div>
        </div>
        {entries.length === 0 ? (
          <p className="text-xs text-text-lighter leading-relaxed py-8 text-center">
            Todavía no hay registros. Un ejemplo: «Elicit · buscar estudios sobre acceso a salud rural · abrí los 12 DOI y leí 5 completos · no entró al texto».
          </p>
        ) : (
          <ul className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
            {entries.map((entry) => (
              <li key={entry.id} className="rounded-xl border border-border p-3 flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] text-text-lighter">{entry.date} · {entry.inText === 'si' ? 'entró al texto' : 'no entró al texto'}</div>
                  <div className="text-sm font-semibold text-text">{entry.tool}{entry.version ? ` · ${entry.version}` : ''}</div>
                  <div className="text-xs text-text-light">{entry.task}</div>
                  {entry.check && <div className="text-xs text-accent mt-0.5">Verificación: {entry.check}</div>}
                </div>
                <button type="button" onClick={() => setEntries((current) => current.filter((item) => item.id !== entry.id))} aria-label="Borrar registro" className="p-1.5 rounded-lg text-text-lighter hover:text-secondary cursor-pointer">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function Reflection() {
  const [answers, setAnswers] = useStored(KEYS.reflection, REFLECTION_PROMPTS.map(() => ''))
  const text = ['# Mis reflexiones sobre IA en mi investigación', '', ...REFLECTION_PROMPTS.flatMap((prompt, index) => [`## ${prompt}`, '', answers[index] || '', ''])].join('\n')

  return (
    <div className="bg-surface border border-border rounded-2xl p-5 md:p-6">
      <p className="text-xs text-text-light leading-relaxed mb-5">
        Tres preguntas para escribir sin prisa. Vuelve a ellas cuando termines un capítulo o antes de sustentar: las respuestas cambian, y ese cambio también es aprendizaje.
      </p>
      <div className="space-y-5">
        {REFLECTION_PROMPTS.map((prompt, index) => (
          <div key={prompt}>
            <label htmlFor={`reflection-${index}`} className="block text-sm font-semibold text-text mb-2">{prompt}</label>
            <textarea
              id={`reflection-${index}`}
              rows={3}
              className={`${inputClass} resize-y leading-relaxed`}
              value={answers[index] || ''}
              onChange={(e) => setAnswers((current) => current.map((answer, i) => (i === index ? e.target.value : answer)))}
              placeholder="Escribe aquí…"
            />
          </div>
        ))}
      </div>
      <button type="button" onClick={() => downloadText('mis-reflexiones-ia.md', text)} className="inline-flex items-center gap-2 mt-5 bg-text text-bg px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer hover:bg-text/90 transition-colors">
        <Download className="w-4 h-4" />
        Descargar mis reflexiones
      </button>
    </div>
  )
}

function Pledge() {
  const [pledge, setPledge] = useStored(KEYS.pledge, { name: '', group: '', accepted: [] })
  const complete = pledge.name.trim() && pledge.accepted.length === COMMITMENTS.length
  const text = [
    '# Mi compromiso de uso responsable de la IA en investigación',
    '',
    ...COMMITMENTS.map((item) => `- ${item}`),
    '',
    `${pledge.name.trim()}${pledge.group.trim() ? ` · ${pledge.group.trim()}` : ''} · ${new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })}`,
  ].join('\n')

  function toggle(index) {
    setPledge((current) => ({
      ...current,
      accepted: current.accepted.includes(index) ? current.accepted.filter((item) => item !== index) : [...current.accepted, index],
    }))
  }

  return (
    <div className="grid lg:grid-cols-[1fr_1fr] gap-6 items-start">
      <div className="bg-surface border border-border rounded-2xl p-5 space-y-3">
        <p className="text-xs text-text-light leading-relaxed">
          Seis compromisos. Márcalos solo si de verdad los asumes; puedes proponérselos a tu semillero como acuerdo del grupo.
        </p>
        <ul className="space-y-1.5">
          {COMMITMENTS.map((item, index) => (
            <li key={item}>
              <label className="flex items-start gap-3 p-2 rounded-xl hover:bg-text/[0.03] cursor-pointer">
                <input type="checkbox" checked={pledge.accepted.includes(index)} onChange={() => toggle(index)} className="mt-0.5 w-4 h-4 accent-teal-600" />
                <span className="text-sm text-text leading-relaxed">{item}</span>
              </label>
            </li>
          ))}
        </ul>
        <div className="grid sm:grid-cols-2 gap-3 pt-2">
          <div>
            <label htmlFor="pledge-name" className={labelClass}>Tu nombre</label>
            <input id="pledge-name" className={inputClass} value={pledge.name} onChange={(e) => setPledge({ ...pledge, name: e.target.value })} />
          </div>
          <div>
            <label htmlFor="pledge-group" className={labelClass}>Semillero o grupo</label>
            <input id="pledge-group" className={inputClass} value={pledge.group} onChange={(e) => setPledge({ ...pledge, group: e.target.value })} />
          </div>
        </div>
      </div>

      <div className={`rounded-2xl border-2 p-6 md:p-8 transition-colors ${complete ? 'border-accent bg-accent/[0.05]' : 'border-dashed border-border bg-surface'}`}>
        <HeartHandshake className={`w-8 h-8 mb-4 ${complete ? 'text-accent' : 'text-text-lighter'}`} />
        <h3 className="font-display font-bold text-text text-xl tracking-tight mb-3">Mi compromiso de uso responsable de la IA en investigación</h3>
        <ul className="space-y-1.5 mb-5">
          {COMMITMENTS.map((item, index) => (
            <li key={item} className={`text-xs leading-relaxed flex items-start gap-2 ${pledge.accepted.includes(index) ? 'text-text' : 'text-text-lighter'}`}>
              <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${pledge.accepted.includes(index) ? 'text-accent' : 'opacity-30'}`} />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm font-semibold text-text border-t border-border pt-4">
          {pledge.name.trim() || 'Tu nombre'}{pledge.group.trim() ? ` · ${pledge.group.trim()}` : ''}
        </p>
        <button type="button" disabled={!complete} onClick={() => downloadText('mi-compromiso-ia.md', text)} className="inline-flex items-center gap-2 mt-5 bg-text text-bg px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer hover:bg-text/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
          <Download className="w-4 h-4" />
          {complete ? 'Descargar mi compromiso' : 'Marca los seis y escribe tu nombre'}
        </button>
      </div>
    </div>
  )
}

const TABS = [
  { id: 'bitacora', label: 'Bitácora de uso de IA', icon: ClipboardList, Component: Logbook },
  { id: 'reflexion', label: 'Mis reflexiones', icon: NotebookPen, Component: Reflection },
  { id: 'compromiso', label: 'Mi compromiso', icon: HeartHandshake, Component: Pledge },
]

export default function ResearchWorkspace() {
  const [tab, setTab] = useState(TABS[0].id)
  const active = TABS.find((item) => item.id === tab) || TABS[0]
  const ActiveComponent = active.Component

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mb-6" role="tablist" aria-label="Espacios de trabajo">
        {TABS.map((item) => {
          const Icon = item.icon
          const isActive = item.id === tab
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setTab(item.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold cursor-pointer transition-colors ${isActive ? 'bg-text text-bg border-text' : 'bg-surface border-border text-text-light hover:border-primary/40 hover:text-primary'}`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </button>
          )
        })}
      </div>
      <div role="tabpanel">
        <ActiveComponent />
      </div>
      <p className="text-[11px] text-text-lighter text-center mt-4">
        Lo que escribes aquí se guarda solo en este navegador: no llega a ningún servidor. Descárgalo si quieres conservarlo.
      </p>
    </div>
  )
}
