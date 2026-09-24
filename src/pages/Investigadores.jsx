import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  Compass,
  Copy,
  ExternalLink,
  FileText,
  FlaskConical,
  Landmark,
  Lightbulb,
  Lock,
  MessageSquareText,
  Microscope,
  NotebookPen,
  Rocket,
  Scale,
  PenLine,
  Quote,
  Search,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from 'lucide-react'
import { getToolById } from '../utils/recommender'
import ResearchWorkspace from '../components/ResearchWorkspace'
import {
  BOOK_QUOTES,
  CHECKLIST,
  COLOMBIA,
  DILEMMAS,
  EXAMPLES,
  GROUP_QUESTIONS,
  POSSIBILITIES,
  DECISION_ZONES,
  DISCLOSURE_TOOLS,
  DISCLOSURE_USES,
  EXTERNAL_TOOLS,
  MOMENTS,
  PRINCIPLES,
  PROMPTS,
  PUBLISHERS,
  RESEARCH_UPDATED,
  RISKS,
  RISK_LIGHTS,
  SOURCES,
} from '../data/researchers'

const MOMENT_ICONS = {
  pregunta: Target,
  literatura: Search,
  lectura: BookOpen,
  datos: BarChart3,
  cualitativo: MessageSquareText,
  escritura: PenLine,
  publicar: Send,
}

const CYCLE_ORBIT = [
  { id: 'pregunta', label: 'Preguntar', position: 'top-0 left-1/2 -translate-x-1/2' },
  { id: 'literatura', label: 'Buscar', position: 'top-[20%] right-0' },
  { id: 'lectura', label: 'Leer', position: 'bottom-[20%] right-0' },
  { id: 'datos', label: 'Analizar', position: 'bottom-0 left-1/2 -translate-x-1/2' },
  { id: 'escritura', label: 'Escribir', position: 'bottom-[20%] left-0' },
  { id: 'publicar', label: 'Publicar', position: 'top-[20%] left-0' },
]

const CHAPTER_INDEX = [
  { id: 'posible', label: 'Lo que ya puedes hacer' },
  { id: 'principios', label: 'Principios' },
  { id: 'delegar', label: 'Qué delegar' },
  { id: 'ciclo', label: 'Tu investigación' },
  { id: 'ejemplos', label: 'Ejemplos' },
  { id: 'kit', label: 'Kit gratuito' },
  { id: 'editoriales', label: 'Qué piden las revistas' },
  { id: 'declaracion', label: 'Tu declaración' },
  { id: 'revision', label: 'Cuando revisas' },
  { id: 'colombia', label: 'Colombia' },
  { id: 'riesgos', label: 'Riesgos' },
  { id: 'dilemas', label: '¿Qué harías?' },
  { id: 'prompts', label: 'Prompts' },
  { id: 'espacio', label: 'Tu espacio' },
  { id: 'antes-de-enviar', label: 'Antes de enviar' },
  { id: 'reflexiones', label: 'Reflexiones' },
]

const FREE_LABEL = {
  si: { text: 'Gratis', className: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20' },
  limitado: { text: 'Gratis con cupo', className: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20' },
  no: { text: 'De pago', className: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20' },
}

const LIGHT_STYLES = {
  emerald: { dot: 'bg-emerald-500', border: 'border-emerald-500/25', bg: 'bg-emerald-500/[0.05]', text: 'text-emerald-700 dark:text-emerald-300' },
  amber: { dot: 'bg-amber-500', border: 'border-amber-500/25', bg: 'bg-amber-500/[0.05]', text: 'text-amber-700 dark:text-amber-300' },
  rose: { dot: 'bg-rose-500', border: 'border-rose-500/25', bg: 'bg-rose-500/[0.05]', text: 'text-rose-700 dark:text-rose-300' },
}

/* Estado real del plan gratuito de las fichas del catálogo, verificado al 24-sep-2026 */
const CATALOG_FREE = {
  elicit: { free: 'si', note: 'Búsqueda y resúmenes ilimitados sobre 138 millones de artículos; el agente y los informes tienen cupo.' },
  'semantic-scholar': { free: 'si', note: 'Todo gratis, con API abierta.' },
  notebooklm: { free: 'si', note: '100 cuadernos, 50 fuentes por cuaderno, 50 chats y 3 resúmenes de audio al día.' },
  consensus: { free: 'limitado', note: 'Búsqueda básica de artículos sin análisis de IA; 10 mensajes Pro y hasta 3 revisiones profundas al mes.' },
  scispace: { free: 'limitado', note: '100 créditos al mes para el agente; el chat con PDF no los consume.' },
  'research-rabbit': { free: 'limitado', note: 'Hasta 50 artículos semilla y un proyecto.' },
  'connected-papers': { free: 'limitado', note: '5 grafos al mes con todas las funciones.' },
  julius: { free: 'limitado', note: 'Créditos diarios con modelos ligeros.' },
  humata: { free: 'limitado', note: '60 páginas al mes: menos que un artículo largo con anexos.' },
}

function ToolPills({ ids }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {ids.map((id) => {
        const tool = getToolById(id)
        if (!tool) return null
        return (
          <Link
            key={id}
            to={`/herramienta/${id}`}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-text/[0.035] text-[11px] font-semibold text-text-light no-underline hover:border-primary/30 hover:text-primary transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {tool.name}
          </Link>
        )
      })}
    </div>
  )
}

function ExternalPills({ ids }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {ids.map((id) => {
        const tool = EXTERNAL_TOOLS[id]
        if (!tool) return null
        return (
          <a
            key={id}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            title={tool.note}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-dashed border-border text-[11px] font-semibold text-text-light no-underline hover:border-accent/40 hover:text-accent transition-colors"
          >
            {tool.name}
            <ExternalLink className="w-3 h-3" />
          </a>
        )
      })}
    </div>
  )
}

function TryLinks({ text }) {
  const targets = [
    { label: 'Probar en Claude', url: `https://claude.ai/new?q=${encodeURIComponent(text)}` },
    { label: 'Probar en ChatGPT', url: `https://chatgpt.com/?q=${encodeURIComponent(text)}` },
  ]
  return (
    <div className="flex flex-wrap gap-2">
      {targets.map((target) => (
        <a
          key={target.label}
          href={target.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-text/[0.035] text-[11px] font-semibold text-text-light no-underline hover:border-primary/30 hover:text-primary transition-colors"
        >
          {target.label}
          <ExternalLink className="w-3 h-3" />
        </a>
      ))}
    </div>
  )
}

function SectionHeader({ icon, kicker, title, lead, tone = 'primary', dark = false }) {
  const Icon = icon
  const tones = {
    primary: 'bg-primary/8 text-primary border-primary/10',
    accent: 'bg-accent/10 text-accent border-accent/15',
    warm: 'bg-warm/10 text-warm border-warm/15',
    secondary: 'bg-secondary/8 text-secondary border-secondary/10',
  }
  return (
    <div className="text-center mb-9">
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 border ${dark ? 'bg-white/10 text-white/80 border-white/15' : tones[tone]}`}>
        <Icon className="w-3 h-3" />
        {kicker}
      </div>
      <h2 className={`text-2xl md:text-3xl font-bold tracking-tight mb-2 ${dark ? 'text-white' : 'text-text'}`}>{title}</h2>
      {lead && <p className={`text-sm max-w-2xl mx-auto leading-relaxed ${dark ? 'text-white/65' : 'text-text-light'}`}>{lead}</p>}
    </div>
  )
}

function CycleOrbit({ onPick }) {
  return (
    <div className="relative w-full max-w-[420px] aspect-square mx-auto">
      <p className="sr-only">Seis momentos de una investigación en los que la IA puede ayudar: preguntar, buscar, leer, analizar, escribir y publicar.</p>
      <div className="absolute inset-[17%] rounded-full border border-primary/15 bg-surface/55 backdrop-blur-sm shadow-xl pointer-events-none" />
      <div className="absolute inset-[30%] rounded-full border border-dashed border-accent/25 animate-[spin_32s_linear_infinite] motion-reduce:animate-none pointer-events-none" />
      <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-text text-bg flex flex-col items-center justify-center text-center shadow-xl z-10">
        <Microscope className="w-8 h-8 mb-2 text-amber-300" />
        <span className="font-display font-bold text-sm leading-tight">Tu pregunta<br />de investigación</span>
      </div>
      {CYCLE_ORBIT.map((item) => {
        const Icon = MOMENT_ICONS[item.id]
        return (
          <a
            key={item.id}
            href="#ciclo"
            onClick={() => onPick(item.id)}
            className={`absolute ${item.position} z-20 group flex flex-col items-center gap-1.5 no-underline`}
            aria-label={`${item.label}: ver herramientas y cuidados`}
          >
            <span className="w-14 h-14 rounded-2xl bg-surface border border-border shadow-md flex items-center justify-center group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-lg transition-all">
              <Icon className="w-6 h-6 text-primary" />
            </span>
            <span className="text-[11px] font-semibold text-text bg-bg/80 px-2 py-0.5 rounded-full">{item.label}</span>
          </a>
        )
      })}
      <div className="absolute inset-[10%] rounded-full border border-border/70 pointer-events-none" />
    </div>
  )
}

export default function Investigadores() {
  const [activeMoment, setActiveMoment] = useState(MOMENTS[0].id)
  const [kitFilter, setKitFilter] = useState('todos')
  const [promptGroup, setPromptGroup] = useState(PROMPTS[0].group)
  const [copiedId, setCopiedId] = useState(null)
  const [discTool, setDiscTool] = useState(DISCLOSURE_TOOLS[0])
  const [discVersion, setDiscVersion] = useState('')
  const [discUses, setDiscUses] = useState(['lenguaje'])
  const [discLang, setDiscLang] = useState('es')
  const [checked, setChecked] = useState([])
  const [exampleId, setExampleId] = useState(EXAMPLES[0].id)
  const [dilemmaIndex, setDilemmaIndex] = useState(0)
  const [dilemmaChoice, setDilemmaChoice] = useState(null)
  const [activeSection, setActiveSection] = useState(CHAPTER_INDEX[0].id)
  const [readProgress, setReadProgress] = useState(0)
  const navRef = useRef(null)

  useEffect(() => {
    const sections = CHAPTER_INDEX.map((item) => document.getElementById(item.id)).filter(Boolean)
    if (sections.length === 0) return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length === 0) return
        const topMost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b))
        setActiveSection(topMost.target.id)
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    function handleScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setReadProgress(scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 0)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const activePill = navRef.current?.querySelector(`[href="#${activeSection}"]`)
    activePill?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [activeSection])

  function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function copyText(text, id) {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {})
    }
    setCopiedId(id)
    window.setTimeout(() => setCopiedId(null), 1600)
  }

  function toggleUse(id) {
    setDiscUses((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }

  function toggleCheck(index) {
    setChecked((current) => (current.includes(index) ? current.filter((item) => item !== index) : [...current, index]))
  }

  const activeIndex = CHAPTER_INDEX.findIndex((item) => item.id === activeSection)
  const prevSection = activeIndex > 0 ? CHAPTER_INDEX[activeIndex - 1] : null
  const nextSection = activeIndex >= 0 && activeIndex < CHAPTER_INDEX.length - 1 ? CHAPTER_INDEX[activeIndex + 1] : null

  const moment = MOMENTS.find((item) => item.id === activeMoment) || MOMENTS[0]
  const MomentIcon = MOMENT_ICONS[moment.id]

  const kitRows = [
    ...Object.entries(CATALOG_FREE).map(([id, info]) => {
      const tool = getToolById(id)
      return tool ? { key: id, name: tool.name, to: `/herramienta/${id}`, ...info } : null
    }),
    ...Object.entries(EXTERNAL_TOOLS).map(([id, tool]) => ({ key: id, name: tool.name, href: tool.url, free: tool.free, note: tool.note })),
  ].filter(Boolean)
  const visibleKit = kitFilter === 'todos' ? kitRows : kitRows.filter((row) => row.free === kitFilter)

  const promptGroups = [...new Set(PROMPTS.map((prompt) => prompt.group))]
  const visiblePrompts = PROMPTS.filter((prompt) => prompt.group === promptGroup)

  const selectedUses = DISCLOSURE_USES.filter((use) => discUses.includes(use.id))
  const toolLabel = discVersion.trim() ? `${discTool}, ${discVersion.trim()}` : discTool
  const joinList = (items, word) => (items.length <= 1 ? items.join('') : `${items.slice(0, -1).join('; ')} ${word} ${items[items.length - 1]}`)
  const disclosure = selectedUses.length === 0
    ? (discLang === 'es' ? 'Marca al menos un uso para generar la declaración.' : 'Select at least one use to generate the statement.')
    : discLang === 'es'
      ? `Durante la preparación de este trabajo, los autores usaron ${toolLabel} para ${joinList(selectedUses.map((use) => use.es), 'y')}. Después de usar esta herramienta, los autores revisaron y editaron el contenido según fue necesario y asumen plena responsabilidad por el contenido de la publicación.`
      : `During the preparation of this work, the author(s) used ${toolLabel} in order to ${joinList(selectedUses.map((use) => use.en), 'and')}. After using this tool, the author(s) reviewed and edited the content as needed and take(s) full responsibility for the content of the publication.`

  const example = EXAMPLES.find((item) => item.id === exampleId) || EXAMPLES[0]
  const dilemma = DILEMMAS[dilemmaIndex]
  const dilemmaResult = dilemmaChoice === null ? null : dilemma.options[dilemmaChoice]

  function nextDilemma() {
    setDilemmaIndex((current) => (current + 1) % DILEMMAS.length)
    setDilemmaChoice(null)
  }

  const checkProgress = Math.round((checked.length / CHECKLIST.length) * 100)

  return (
    <div className="bg-bg">
      <section className="relative px-4 hero-gradient noise-overlay overflow-x-clip py-16 md:py-24">
        <div className="absolute inset-0 dot-pattern pointer-events-none" />
        <div className="absolute -top-16 -left-24 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-24 -right-24 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-7 border border-primary/15 shadow-sm">
              <FlaskConical className="w-4 h-4" />
              Capítulo especial · <time dateTime={RESEARCH_UPDATED.iso}>{RESEARCH_UPDATED.label}</time>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-text leading-[1.05] tracking-tight mb-6">
              IA para <span className="text-gradient-primary">jóvenes</span>
              <br className="hidden sm:block" />
              <span className="text-text-light font-bold"> investigadores</span>
            </h1>
            <p className="text-text-light text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-7">
              Para semilleros, tesistas de maestría y doctorado y jóvenes investigadores en Colombia: qué herramienta sirve en cada momento de una investigación, qué exigen hoy las revistas y cómo usar la IA sin poner en riesgo tu firma.
            </p>

            <a
              href="https://sjimenezlon.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-surface/75 backdrop-blur-sm border border-border rounded-2xl p-3 pr-4 no-underline hover:border-primary/30 hover:shadow-md transition-all mb-8"
            >
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent text-white font-display font-extrabold text-sm flex items-center justify-center shadow-sm">SJ</span>
              <span className="text-left">
                <span className="block text-[10px] uppercase tracking-[0.12em] font-bold text-text-lighter">Creada y curada por</span>
                <span className="flex items-center gap-1 text-sm font-semibold text-text group-hover:text-primary transition-colors">
                  Santiago Jiménez Londoño <ExternalLink className="w-3 h-3" />
                </span>
              </span>
            </a>

            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              <a href="#ciclo" className="inline-flex items-center gap-2 bg-text text-bg px-5 py-2.5 rounded-xl font-semibold no-underline hover:bg-text/90 hover:shadow-lg transition-all text-sm">
                <Compass className="w-4 h-4" />
                Herramientas por momento
              </a>
              <a href="#editoriales" className="inline-flex items-center gap-2 bg-surface border border-border text-text px-5 py-2.5 rounded-xl font-semibold no-underline hover:border-accent/40 hover:shadow-md transition-all text-sm">
                <FileText className="w-4 h-4 text-accent" />
                Qué piden las revistas
              </a>
              <a href="#kit" className="inline-flex items-center gap-2 bg-surface border border-border text-text px-5 py-2.5 rounded-xl font-semibold no-underline hover:border-warm/40 hover:shadow-md transition-all text-sm">
                <Sparkles className="w-4 h-4 text-warm" />
                Kit gratuito
              </a>
              <a href="#declaracion" className="inline-flex items-center gap-2 bg-surface border border-border text-text px-5 py-2.5 rounded-xl font-semibold no-underline hover:border-secondary/40 hover:shadow-md transition-all text-sm">
                <PenLine className="w-4 h-4 text-secondary" />
                Redacta tu declaración
              </a>
            </div>
          </div>

          <div className="relative min-h-[360px] sm:min-h-[420px] flex items-center">
            <div className="absolute inset-[12%] bg-gradient-to-br from-primary/10 via-accent/5 to-warm/10 rounded-full blur-2xl" />
            <CycleOrbit onPick={setActiveMoment} />
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-5xl mx-auto px-4 -mt-5 md:-mt-8 pb-8">
        <div className="bg-surface border border-border rounded-3xl p-6 md:p-8 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent text-white font-display font-extrabold flex items-center justify-center shrink-0">SJ</div>
            <div>
              <p className="font-display font-semibold text-text text-lg md:text-xl leading-snug tracking-tight">
                «{BOOK_QUOTES[0].quote}»
              </p>
              <p className="text-xs text-text-lighter mt-3">
                Santiago Jiménez Londoño · <span className="italic">Algoritmos Deshumanizantes</span> (2025), {BOOK_QUOTES[0].where} · creador de ¿Qué IA necesito?
              </p>
              <p className="text-xs text-text-light mt-2">
                Este capítulo no te pide que corras detrás de cada modelo nuevo. Te pide algo más difícil y más útil: saber en qué momento de tu investigación una herramienta suma, y en cuál te quita justo lo que la investigación debía enseñarte.
              </p>
            </div>
          </div>
        </div>
      </section>

      <nav className="sticky top-16 z-40 bg-bg/85 backdrop-blur-md border-y border-border/70" aria-label="Índice del capítulo">
        <div className="h-0.5 bg-border/60">
          <div className="h-full bg-primary transition-[width] duration-150" style={{ width: `${readProgress}%` }} />
        </div>
        <div ref={navRef} className="max-w-6xl mx-auto px-4 flex items-center gap-1.5 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-lighter shrink-0 mr-1.5">Índice</span>
          {CHAPTER_INDEX.map((item) => {
            const isCurrent = item.id === activeSection
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isCurrent ? 'true' : undefined}
                className={`shrink-0 whitespace-nowrap px-3 py-1.5 rounded-full border text-xs font-semibold no-underline transition-colors ${
                  isCurrent ? 'bg-text text-bg border-text' : 'border-border bg-surface text-text-light hover:border-primary/40 hover:text-primary'
                }`}
              >
                {item.label}
              </a>
            )
          })}
        </div>
      </nav>

      {/* Lo que ya puedes hacer */}
      <section id="posible" className="max-w-6xl mx-auto px-4 pt-14 pb-4 scroll-mt-28">
        <SectionHeader icon={Rocket} kicker="Buenas noticias primero" title="Lo que hoy sí puedes hacer" lead="Nunca un semillero había tenido tanto a su alcance. La IA bien usada no te quita la investigación: te devuelve tiempo para la parte que más importa. Cada posibilidad trae su contrapeso, porque el entusiasmo y el cuidado van juntos." tone="warm" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {POSSIBILITIES.map((item) => (
            <article key={item.title} className="group relative overflow-hidden bg-surface rounded-2xl border border-border p-5 hover:shadow-md hover:-translate-y-0.5 hover:border-warm/35 transition-all flex flex-col">
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-warm/8 rounded-full blur-2xl pointer-events-none" />
              <h3 className="relative font-display font-bold text-text text-lg tracking-tight mb-2">{item.title}</h3>
              <p className="relative text-sm text-text-light leading-relaxed mb-4 flex-1">{item.body}</p>
              <div className="relative flex items-start gap-2 rounded-xl bg-accent/[0.06] border border-accent/20 p-3 mb-4">
                <Scale className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <p className="text-xs text-text leading-relaxed">{item.care}</p>
              </div>
              <ToolPills ids={item.tools} />
            </article>
          ))}
        </div>
      </section>

      {/* Principios */}
      <section id="principios" className="max-w-6xl mx-auto px-4 py-14 scroll-mt-28">
        <SectionHeader icon={Lightbulb} kicker="Antes de abrir una herramienta" title="Cuatro reglas que cuidan tu firma" lead="Tu nombre va en el artículo, en la tesis y en el CvLAC. Ninguna herramienta firma contigo, así que la responsabilidad no se reparte." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRINCIPLES.map((principle, index) => {
            const icons = [Target, CheckCircle2, FileText, Lock]
            const Icon = icons[index]
            return (
              <article key={principle.title} className="bg-surface rounded-2xl border border-border p-5 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/30 transition-all">
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center ring-4 ring-primary/5 mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-lighter mb-1">◆ {principle.kicker}</div>
                <h3 className="font-display font-bold text-text text-base tracking-tight mb-2">{principle.title}</h3>
                <p className="text-xs text-text-light leading-relaxed">{principle.body}</p>
              </article>
            )
          })}
        </div>
      </section>

      {/* Qué delegar */}
      <section id="delegar" className="max-w-6xl mx-auto px-4 py-8 scroll-mt-28">
        <div className="grid lg:grid-cols-[0.72fr_1.28fr] gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-secondary/8 text-secondary px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-secondary/10">
              <Brain className="w-3 h-3" />
              Gráfico de decisión
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text tracking-tight mb-3">Qué delegar y qué conservar</h2>
            <p className="text-sm text-text-light leading-relaxed mb-5">
              Entre más cerca esté una tarea de la pregunta, la interpretación y la conclusión, más debe ser tuya. La IA gana terreno en lo repetitivo, lo verificable y lo reversible.
            </p>
            <div className="flex items-start gap-3 bg-surface border border-border rounded-2xl p-4">
              <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <Target className="w-4.5 h-4.5 text-accent" />
              </div>
              <p className="text-xs text-text-light leading-relaxed">
                <span className="font-semibold text-text">Regla práctica:</span> si no podrías defender una parte ante tu jurado sin abrir el chat, esa parte todavía no es tuya.
              </p>
            </div>
          </div>
          <div className="relative pl-8 pb-8" role="img" aria-label="Matriz que cruza cercanía al núcleo de la investigación y repetición de la tarea. La pregunta, la interpretación y las conclusiones se conservan; el formato de referencias y la limpieza de datos se automatizan con revisión.">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 [writing-mode:vertical-rl] rotate-180 text-[10px] font-bold uppercase tracking-[0.12em] text-text-lighter whitespace-nowrap">
              Cercanía al núcleo →
            </div>
            <div className="grid sm:grid-cols-2 gap-3 border-l-2 border-b-2 border-text/15 p-3 rounded-bl-xl">
              {DECISION_ZONES.map((zone) => (
                <div key={zone.label} className={`min-h-36 rounded-2xl border ${zone.color} p-4 flex flex-col justify-between`}>
                  <div>
                    <div className={`text-[10px] font-bold uppercase tracking-[0.12em] ${zone.accent} mb-1`}>{zone.label}</div>
                    <h3 className="font-display font-bold text-text text-base tracking-tight">{zone.title}</h3>
                  </div>
                  <p className="text-xs text-text-light leading-relaxed mt-4">{zone.examples}</p>
                </div>
              ))}
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.12em] text-text-lighter whitespace-nowrap">
              Repetición de la tarea →
            </div>
          </div>
        </div>
      </section>

      {/* Ciclo */}
      <section id="ciclo" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-28">
        <SectionHeader icon={Compass} kicker="Herramientas por momento" title="¿En qué parte de tu investigación estás?" lead="Elige el momento. Verás qué puede hacer la IA, qué te toca a ti, las herramientas del catálogo (fondo sólido) y otras especializadas que viven fuera de él (borde punteado)." tone="accent" />
        <div className="grid lg:grid-cols-[260px_1fr] gap-5 items-start">
          <div className="bg-surface border border-border rounded-2xl p-2 grid grid-cols-2 lg:grid-cols-1 gap-1" role="tablist" aria-label="Momento de la investigación">
            {MOMENTS.map((item) => {
              const Icon = MOMENT_ICONS[item.id]
              const isActive = item.id === activeMoment
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveMoment(item.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-none text-left cursor-pointer transition-all ${isActive ? 'bg-text text-bg shadow-md' : 'bg-transparent text-text-light hover:bg-text/4 hover:text-text'}`}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-bg' : 'text-accent'}`} />
                  <span className="font-semibold text-sm">{item.label}</span>
                </button>
              )
            })}
          </div>

          <article className="bg-surface border border-border rounded-3xl p-6 md:p-8 shadow-sm" role="tabpanel">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-2xl bg-accent/10 flex items-center justify-center">
                <MomentIcon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-display font-bold text-text text-2xl tracking-tight">{moment.label}</h3>
            </div>
            <p className="text-sm text-text-light leading-relaxed mb-6">{moment.lead}</p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-2xl border border-primary/20 bg-primary/[0.04] p-4">
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-primary mb-2">La IA puede</div>
                <ul className="space-y-1.5">
                  {moment.ai.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-text-light leading-relaxed"><Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-secondary/20 bg-secondary/[0.04] p-4">
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-secondary mb-2">Te toca a ti</div>
                <ul className="space-y-1.5">
                  {moment.human.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-text-light leading-relaxed"><Users className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-lighter">Herramientas</div>
              <ToolPills ids={moment.tools} />
              {moment.external.length > 0 && <ExternalPills ids={moment.external} />}
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-warm/25 bg-warm/[0.05] p-4 mb-6">
              <AlertTriangle className="w-4 h-4 text-warm shrink-0 mt-0.5" />
              <p className="text-xs text-text-light leading-relaxed"><span className="font-semibold text-text">La trampa: </span>{moment.trap}</p>
            </div>

            <div className="rounded-2xl bg-text/[0.035] border border-border p-4">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-lighter">Prompt para empezar</div>
                <button
                  type="button"
                  onClick={() => copyText(moment.prompt, `moment-${moment.id}`)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-surface text-[11px] font-semibold text-text-light cursor-pointer hover:border-primary/30 hover:text-primary transition-colors"
                >
                  {copiedId === `moment-${moment.id}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedId === `moment-${moment.id}` ? 'Copiado' : 'Copiar'}
                </button>
              </div>
              <p className="text-xs text-text leading-relaxed mb-3 whitespace-pre-line">{moment.prompt}</p>
              <TryLinks text={moment.prompt} />
            </div>
          </article>
        </div>
      </section>

      {/* Ejemplos */}
      <section id="ejemplos" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-28">
        <SectionHeader icon={FlaskConical} kicker="Ejemplos ilustrativos" title="Seis investigaciones, de la pregunta a la declaración" lead="Casos pensados para contextos colombianos, en distintas disciplinas y niveles. Muestran qué hace la IA, qué hace la persona, dónde aparece el dilema ético y cómo quedaría la declaración. Tómalos como plantilla para el tuyo." tone="primary" />
        <div className="flex flex-wrap justify-center gap-2 mb-6" role="tablist" aria-label="Disciplina del ejemplo">
          {EXAMPLES.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={exampleId === item.id}
              onClick={() => setExampleId(item.id)}
              className={`px-3.5 py-1.5 rounded-full border text-xs font-semibold cursor-pointer transition-colors ${exampleId === item.id ? 'bg-text text-bg border-text' : 'bg-surface border-border text-text-light hover:border-primary/40 hover:text-primary'}`}
            >
              {item.area}
            </button>
          ))}
        </div>
        <article className="bg-surface border border-border rounded-3xl p-6 md:p-8 shadow-sm" role="tabpanel">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-primary bg-primary/8 px-2 py-0.5 rounded-full">{example.area}</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-lighter">{example.level}</span>
          </div>
          <h3 className="font-display font-bold text-text text-2xl tracking-tight mb-2">{example.title}</h3>
          <p className="text-sm text-text-light italic mb-6">Pregunta: {example.question}</p>
          <ol className="relative border-l-2 border-border ml-3 space-y-4 mb-6">
            {example.steps.map((step, index) => (
              <li key={index} className="pl-6 relative">
                <span className={`absolute -left-[13px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step.who === 'IA' ? 'bg-primary text-white' : 'bg-secondary text-white'}`}>{step.who === 'IA' ? 'IA' : 'Tú'}</span>
                <p className="text-sm text-text leading-relaxed mb-1.5">{step.text}</p>
                {step.tools && <ToolPills ids={step.tools} />}
                {step.external && <ExternalPills ids={step.external} />}
              </li>
            ))}
          </ol>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 rounded-2xl border border-warm/25 bg-warm/[0.05] p-4">
              <Scale className="w-4 h-4 text-warm shrink-0 mt-0.5" />
              <p className="text-xs text-text-light leading-relaxed"><span className="font-semibold text-text">El dilema ético: </span>{example.ethics}</p>
            </div>
            <div className="rounded-2xl border border-border bg-text/[0.035] p-4">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-lighter">Así quedaría su declaración</span>
                <button type="button" onClick={() => copyText(example.disclosure, `ex-${example.id}`)} className="inline-flex items-center gap-1 text-[11px] font-semibold text-text-light cursor-pointer hover:text-primary">
                  {copiedId === `ex-${example.id}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedId === `ex-${example.id}` ? 'Copiada' : 'Copiar'}
                </button>
              </div>
              <p className="text-xs text-text leading-relaxed">{example.disclosure}</p>
            </div>
          </div>
        </article>
      </section>

      {/* Kit gratuito */}
      <section id="kit" className="relative overflow-hidden bg-text/[0.025] border-y border-border py-16 scroll-mt-28">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader icon={Sparkles} kicker="Con presupuesto de semillero" title="Qué es gratis de verdad" lead={`Revisamos el plan gratuito de cada herramienta el ${RESEARCH_UPDATED.label}. «Gratis» significa que puedes trabajar sin pagar; «con cupo», que sirve para probar pero se agota con uso intensivo.`} tone="warm" />
          <div className="flex flex-wrap justify-center gap-2 mb-6" role="group" aria-label="Filtrar por costo">
            {[
              { id: 'todos', label: 'Todas' },
              { id: 'si', label: 'Gratis' },
              { id: 'limitado', label: 'Gratis con cupo' },
              { id: 'no', label: 'De pago' },
            ].map((filter) => (
              <button
                key={filter.id}
                type="button"
                aria-pressed={kitFilter === filter.id}
                onClick={() => setKitFilter(filter.id)}
                className={`px-3.5 py-1.5 rounded-full border text-xs font-semibold cursor-pointer transition-colors ${kitFilter === filter.id ? 'bg-text text-bg border-text' : 'bg-surface border-border text-text-light hover:border-primary/40 hover:text-primary'}`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {visibleKit.map((row) => {
              const badge = FREE_LABEL[row.free]
              const inner = (
                <>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="font-display font-bold text-text text-sm tracking-tight">{row.name}</span>
                    <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.className}`}>{badge.text}</span>
                  </div>
                  <p className="text-xs text-text-light leading-relaxed">{row.note}</p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary mt-3">
                    {row.to ? 'Ver ficha' : 'Ir al sitio'}
                    {row.to ? <ArrowRight className="w-3 h-3" /> : <ExternalLink className="w-3 h-3" />}
                  </span>
                </>
              )
              const cls = `block bg-surface border rounded-2xl p-4 no-underline hover:shadow-md hover:-translate-y-0.5 transition-all ${row.to ? 'border-border hover:border-primary/35' : 'border-dashed border-border hover:border-accent/40'}`
              return row.to ? (
                <Link key={row.key} to={row.to} className={cls}>{inner}</Link>
              ) : (
                <a key={row.key} href={row.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
              )
            })}
          </div>
          <p className="text-xs text-text-lighter text-center mt-6 max-w-2xl mx-auto">
            Antes de pagar, pregunta en la biblioteca de tu universidad: muchas ya tienen licencias institucionales de Scite, ATLAS.ti, NVivo, Overleaf o de los planes educativos de ChatGPT, Claude y Gemini.
          </p>
        </div>
      </section>

      {/* Editoriales */}
      <section id="editoriales" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-28">
        <SectionHeader icon={FileText} kicker="Políticas vigentes" title="Qué piden hoy las revistas" lead="Todas coinciden en cuatro cosas: la IA no puede ser autora, tú respondes por todo, incluidas las referencias, el uso se declara y quien revisa no sube el manuscrito ajeno a un chat. Cambia dónde y cómo." />

        <div className="mb-10">
          <div className="text-center text-xs font-semibold text-text-lighter mb-4">
            El semáforo de Springer Nature: el uso se juzga por su riesgo, no por la herramienta
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {RISK_LIGHTS.map((light) => {
              const style = LIGHT_STYLES[light.tone]
              return (
                <article key={light.level} className={`rounded-2xl border ${style.border} ${style.bg} p-5`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-3 h-3 rounded-full ${style.dot}`} />
                    <span className={`text-[11px] font-bold uppercase tracking-[0.12em] ${style.text}`}>{light.level}</span>
                  </div>
                  <h3 className="font-display font-bold text-text text-lg tracking-tight">{light.title}</h3>
                  <p className="text-xs font-semibold text-text-light mb-3">{light.rule}</p>
                  <ul className="space-y-1.5">
                    {light.items.map((item) => (
                      <li key={item} className="text-xs text-text-light leading-relaxed flex items-start gap-2"><span className={`w-1.5 h-1.5 rounded-full ${style.dot} mt-1.5 shrink-0`} />{item}</li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
          <table className="w-full text-left text-xs min-w-[720px]">
            <caption className="sr-only">Dónde declarar el uso de IA según la editorial</caption>
            <thead>
              <tr className="border-b border-border bg-text/[0.03]">
                <th scope="col" className="p-3 font-bold text-text">Editorial</th>
                <th scope="col" className="p-3 font-bold text-text">Dónde se declara</th>
                <th scope="col" className="p-3 font-bold text-text">Corrección de lenguaje</th>
                <th scope="col" className="p-3 font-bold text-text">Si te toca revisar</th>
              </tr>
            </thead>
            <tbody>
              {PUBLISHERS.map((publisher) => (
                <tr key={publisher.name} className="border-b border-border last:border-b-0 align-top">
                  <th scope="row" className="p-3 font-semibold text-text whitespace-nowrap">
                    <a href={publisher.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-text no-underline hover:text-primary">
                      {publisher.name}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </th>
                  <td className="p-3 text-text-light leading-relaxed">{publisher.where}</td>
                  <td className="p-3 text-text-light leading-relaxed">{publisher.grammar}</td>
                  <td className="p-3 text-text-light leading-relaxed">{publisher.review}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-text-lighter mt-3">La regla que manda es la de tu revista: busca «AI» o «inteligencia artificial» en sus instrucciones para autores antes de enviar.</p>
      </section>

      {/* Declaración */}
      <section id="declaracion" className="relative overflow-hidden py-16 scroll-mt-28" style={{ background: 'linear-gradient(135deg, #111827 0%, #1e1b4b 52%, #102a2a 100%)' }}>
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader icon={PenLine} kicker="Herramienta" title="Redacta tu declaración de uso de IA" lead="Sigue la fórmula que Elsevier pide publicar al final del artículo y que sirve de base para casi cualquier revista. Ajústala a lo que pida la tuya." dark />
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 items-start">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 space-y-5">
              <div>
                <label htmlFor="disc-tool" className="block text-[11px] font-bold uppercase tracking-[0.12em] text-white/60 mb-2">Herramienta</label>
                <select
                  id="disc-tool"
                  value={discTool}
                  onChange={(event) => setDiscTool(event.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-white/10 text-white text-sm p-2.5"
                >
                  {DISCLOSURE_TOOLS.map((tool) => <option key={tool} value={tool} className="text-black">{tool}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="disc-version" className="block text-[11px] font-bold uppercase tracking-[0.12em] text-white/60 mb-2">Modelo o versión (Taylor &amp; Francis la exige)</label>
                <input
                  id="disc-version"
                  value={discVersion}
                  onChange={(event) => setDiscVersion(event.target.value)}
                  placeholder="por ejemplo, Claude Opus 5.5, septiembre de 2026"
                  className="w-full rounded-xl border border-white/15 bg-white/10 text-white text-sm p-2.5 placeholder:text-white/35"
                />
              </div>
              <fieldset>
                <legend className="block text-[11px] font-bold uppercase tracking-[0.12em] text-white/60 mb-2">Para qué la usaste</legend>
                <div className="space-y-2">
                  {DISCLOSURE_USES.map((use) => (
                    <label key={use.id} className="flex items-start gap-2.5 text-sm text-white/80 cursor-pointer">
                      <input type="checkbox" checked={discUses.includes(use.id)} onChange={() => toggleUse(use.id)} className="mt-1 accent-emerald-400" />
                      <span>{use.es}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="flex gap-2" role="group" aria-label="Idioma de la declaración">
                {[{ id: 'es', label: 'Español' }, { id: 'en', label: 'English' }].map((lang) => (
                  <button
                    key={lang.id}
                    type="button"
                    aria-pressed={discLang === lang.id}
                    onClick={() => setDiscLang(lang.id)}
                    className={`px-3.5 py-1.5 rounded-full border text-xs font-semibold cursor-pointer transition-colors ${discLang === lang.id ? 'bg-white text-gray-900 border-white' : 'bg-transparent border-white/20 text-white/70 hover:text-white'}`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white text-gray-900 p-6 md:p-8 shadow-2xl">
              <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-500 mb-3">
                {discLang === 'es' ? 'Declaración de uso de IA generativa en la preparación del manuscrito' : 'Declaration of generative AI and AI-assisted technologies in the manuscript preparation process'}
              </div>
              <p className="text-base leading-relaxed font-display">{disclosure}</p>
              <div className="flex flex-wrap items-center gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => copyText(disclosure, 'disclosure')}
                  className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer hover:bg-gray-700 transition-colors"
                >
                  {copiedId === 'disclosure' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copiedId === 'disclosure' ? 'Copiada' : 'Copiar declaración'}
                </button>
                <span className="text-[11px] text-gray-500">Si la IA fue parte de tu método, descríbela además en Métodos.</span>
              </div>
              <div className="mt-6 pt-5 border-t border-gray-200">
                <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-500 mb-2">Y si debes citarla en APA 7 (guía de septiembre de 2025)</div>
                <p className="text-xs text-gray-700 leading-relaxed mb-1.5"><span className="font-semibold">Chat compartido:</span> Anthropic. (2026, 24 de septiembre). <span className="italic">Título del chat</span> [Chat de IA generativa]. Claude Opus 5.5. https://claude.ai/share/…</p>
                <p className="text-xs text-gray-700 leading-relaxed mb-1.5"><span className="font-semibold">Herramienta:</span> OpenAI. (2026). <span className="italic">ChatGPT</span> [Modelo de lenguaje grande]. https://chatgpt.com/</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">Los prompts no van en la referencia: guárdalos y, si ayudan al lector, ponlos en Métodos o en un anexo. Citar un chat no reemplaza citar la literatura: las recomendaciones ICMJE no aceptan material generado por IA como fuente primaria.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Revisión por pares */}
      <section id="revision" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-28">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-secondary/8 text-secondary px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-secondary/10">
              <ShieldAlert className="w-3 h-3" />
              Tu primera revisión por pares
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text tracking-tight mb-3">Cuando el manuscrito es de otro</h2>
            <p className="text-sm text-text-light leading-relaxed">
              Tarde o temprano una revista te invitará a revisar. Es la regla más clara de todas: el manuscrito ajeno es confidencial y no se pega en un chat. Elsevier, Wiley, Taylor &amp; Francis, Springer Nature e IEEE lo dicen con palabras distintas, y los NIH de Estados Unidos prohíben desde 2023 usar IA generativa para evaluar propuestas de financiación. Si algún día evalúas proyectos de convocatorias, aplica el mismo cuidado.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { ok: false, text: 'Subir el manuscrito, o partes, figuras o tablas, a cualquier herramienta de IA' },
              { ok: false, text: 'Pedirle a un modelo que escriba el informe de revisión' },
              { ok: true, text: 'Pulir la redacción de tu propio informe, si la revista lo permite, y declararlo' },
              { ok: true, text: 'Buscar literatura de contexto con tus propias palabras, sin pegar texto del manuscrito' },
            ].map((item) => (
              <div key={item.text} className={`flex items-start gap-3 rounded-2xl border p-4 ${item.ok ? 'border-emerald-500/25 bg-emerald-500/[0.05]' : 'border-rose-500/25 bg-rose-500/[0.05]'}`}>
                {item.ok ? <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-300 shrink-0 mt-0.5" /> : <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-300 shrink-0 mt-0.5" />}
                <p className="text-xs text-text-light leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Colombia */}
      <section id="colombia" className="relative overflow-hidden bg-text/[0.025] border-y border-border py-16 scroll-mt-28">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader icon={Landmark} kicker="El contexto colombiano" title="Lo que aplica si investigas en Colombia" lead={COLOMBIA.lead} tone="accent" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {COLOMBIA.items.map((item) => (
              <article key={item.title} className="bg-surface border border-border rounded-2xl p-5 flex flex-col">
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-accent mb-1">◆ {item.kicker}</div>
                <h3 className="font-display font-bold text-text text-base tracking-tight mb-2">{item.title}</h3>
                <p className="text-xs text-text-light leading-relaxed flex-1">{item.body}</p>
                {item.action && (
                  <p className="text-xs text-text leading-relaxed mt-3 pt-3 border-t border-border"><span className="font-semibold">Qué hacer: </span>{item.action}</p>
                )}
                {item.url && (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary no-underline hover:underline mt-3">
                    Fuente <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Riesgos */}
      <section id="riesgos" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-28">
        <SectionHeader icon={AlertTriangle} kicker="Con evidencia, no con miedo" title="Lo que ya salió mal" lead="Cada uno de estos riesgos tiene casos documentados. Conocerlos es la mejor forma de no protagonizar el siguiente." tone="secondary" />
        <div className="grid md:grid-cols-2 gap-4">
          {RISKS.map((risk) => (
            <article key={risk.title} className="bg-surface border border-border rounded-2xl p-5">
              <h3 className="font-display font-bold text-text text-base tracking-tight mb-2">{risk.title}</h3>
              <p className="text-xs text-text-light leading-relaxed mb-3">{risk.evidence}</p>
              <div className="flex items-start gap-2 rounded-xl bg-accent/[0.06] border border-accent/20 p-3">
                <ShieldCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <p className="text-xs text-text leading-relaxed">{risk.defense}</p>
              </div>
              {risk.sources?.length > 0 && (
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3">
                  {risk.sources.map((source) => (
                    <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary no-underline hover:underline">
                      {source.title} <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Dilemas */}
      <section id="dilemas" className="relative overflow-hidden py-16 scroll-mt-28" style={{ background: 'linear-gradient(135deg, #111827 0%, #1e1b4b 55%, #18252c 100%)' }}>
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeader icon={Scale} kicker="Ética en la práctica" title="¿Qué harías?" lead="La ética de la investigación no se aprende con una lista de prohibiciones, sino decidiendo en situaciones concretas. Cinco dilemas que ya viven los semilleros. No hay trampa: hay razones." dark />
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/50 mb-3">Dilema {dilemmaIndex + 1} de {DILEMMAS.length}</div>
            <p className="font-display text-lg md:text-xl text-white leading-snug mb-6">{dilemma.situation}</p>
            <div className="space-y-2.5">
              {dilemma.options.map((option, index) => {
                const chosen = dilemmaChoice === index
                return (
                  <button
                    key={option.text}
                    type="button"
                    onClick={() => setDilemmaChoice(index)}
                    className={`w-full text-left rounded-2xl border p-4 text-sm cursor-pointer transition-colors ${chosen ? 'border-emerald-300/60 bg-emerald-300/10 text-white' : 'border-white/15 bg-transparent text-white/80 hover:border-white/35 hover:text-white'}`}
                  >
                    {option.text}
                  </button>
                )
              })}
            </div>
            {dilemmaResult && (
              <div className="mt-5 rounded-2xl bg-white text-gray-900 p-5" aria-live="polite">
                <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-500 mb-1">{dilemmaResult.verdict}</div>
                <p className="text-sm leading-relaxed">{dilemmaResult.feedback}</p>
              </div>
            )}
            <div className="flex justify-end mt-5">
              <button type="button" onClick={nextDilemma} className="inline-flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer hover:bg-white/90">
                Siguiente dilema <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-center font-display font-bold text-white text-xl tracking-tight mb-2">Para conversar en tu semillero</h3>
            <p className="text-center text-sm text-white/60 mb-6 max-w-2xl mx-auto">Seis preguntas sin respuesta única. Llévenlas a la próxima reunión y dejen por escrito lo que acuerden: ese es el comienzo de su protocolo.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {GROUP_QUESTIONS.map((question) => (
                <div key={question} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <MessageSquareText className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <p className="text-sm text-white/85 leading-relaxed">{question}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prompts */}
      <section id="prompts" className="max-w-6xl mx-auto px-4 py-12 scroll-mt-28">
        <SectionHeader icon={MessageSquareText} kicker="Listos para copiar" title="Prompts que te hacen pensar, no que piensan por ti" lead="Todos piden a la IA que pregunte, que señale lo que falta o que marque lo que debes verificar. Cambia lo que está entre corchetes." tone="warm" />
        <div className="flex flex-wrap justify-center gap-2 mb-6" role="tablist" aria-label="Tipo de prompt">
          {promptGroups.map((group) => (
            <button
              key={group}
              type="button"
              role="tab"
              aria-selected={promptGroup === group}
              onClick={() => setPromptGroup(group)}
              className={`px-3.5 py-1.5 rounded-full border text-xs font-semibold cursor-pointer transition-colors ${promptGroup === group ? 'bg-text text-bg border-text' : 'bg-surface border-border text-text-light hover:border-primary/40 hover:text-primary'}`}
            >
              {group}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {visiblePrompts.map((prompt) => (
            <article key={prompt.title} className="bg-surface border border-border rounded-2xl p-5 flex flex-col">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="font-display font-bold text-text text-base tracking-tight">{prompt.title}</h3>
                <button
                  type="button"
                  onClick={() => copyText(prompt.text, prompt.title)}
                  className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-surface text-[11px] font-semibold text-text-light cursor-pointer hover:border-primary/30 hover:text-primary transition-colors"
                >
                  {copiedId === prompt.title ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedId === prompt.title ? 'Copiado' : 'Copiar'}
                </button>
              </div>
              <p className="text-xs text-text-light leading-relaxed mb-4 flex-1">{prompt.text}</p>
              <TryLinks text={prompt.text} />
            </article>
          ))}
        </div>
      </section>

      {/* Tu espacio */}
      <section id="espacio" className="relative overflow-hidden bg-text/[0.025] border-y border-border py-16 scroll-mt-28">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader icon={NotebookPen} kicker="Para usar mientras investigas" title="Tu espacio de trabajo" lead="Una bitácora para registrar cada uso de IA, un lugar para tus reflexiones y un compromiso para ti o para tu semillero. Tres hábitos pequeños que hacen fácil la declaración y honesta la conversación con tu jurado." tone="accent" />
          <ResearchWorkspace />
        </div>
      </section>

      {/* Antes de enviar */}
      <section id="antes-de-enviar" className="max-w-4xl mx-auto px-4 py-16 scroll-mt-28">
        <SectionHeader icon={ClipboardCheck} kicker="Lista de verificación" title="Antes de enviar" lead="Diez preguntas para hacerte con el manuscrito terminado. Si alguna te incomoda, ahí está el trabajo pendiente." />
        <div className="bg-surface border border-border rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-5">
            <div className="flex-1 h-2 rounded-full bg-border overflow-hidden" role="progressbar" aria-valuenow={checkProgress} aria-valuemin={0} aria-valuemax={100} aria-label="Avance de la lista">
              <div className="h-full bg-accent transition-[width] duration-300" style={{ width: `${checkProgress}%` }} />
            </div>
            <span className="text-xs font-bold text-text-light shrink-0">{checked.length}/{CHECKLIST.length}</span>
          </div>
          <ul className="space-y-2">
            {CHECKLIST.map((item, index) => (
              <li key={item}>
                <label className="flex items-start gap-3 p-3 rounded-xl hover:bg-text/[0.03] cursor-pointer transition-colors">
                  <input type="checkbox" checked={checked.includes(index)} onChange={() => toggleCheck(index)} className="mt-0.5 w-4 h-4 accent-teal-600" />
                  <span className={`text-sm leading-relaxed ${checked.includes(index) ? 'text-text-lighter line-through' : 'text-text'}`}>{item}</span>
                </label>
              </li>
            ))}
          </ul>
          {checked.length === CHECKLIST.length && (
            <p className="text-sm font-semibold text-accent text-center mt-5">Listo. Ahora sí: a enviar.</p>
          )}
        </div>
      </section>

      {/* Reflexiones */}
      <section id="reflexiones" className="relative overflow-hidden py-16 scroll-mt-28" style={{ background: 'linear-gradient(135deg, #111827 0%, #1e1b4b 55%, #18252c 100%)' }}>
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader icon={BookOpen} kicker="Del libro al laboratorio" title="Tres ideas para investigar con IA sin perder el criterio" lead="Del capítulo V de Algoritmos Deshumanizantes, «Datos sintéticos, sistemas predictivos y la falacia de la certeza algorítmica», y de su introducción." dark />
          <div className="grid md:grid-cols-3 gap-4">
            {BOOK_QUOTES.map((item) => (
              <article key={item.where} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 flex flex-col">
                <Quote className="w-5 h-5 text-amber-300 mb-3" />
                <p className="text-sm text-white/90 leading-relaxed font-display flex-1">«{item.quote}»</p>
                <p className="text-[11px] text-white/45 mt-3">{item.where}</p>
                <p className="text-xs text-white/70 leading-relaxed mt-3 pt-3 border-t border-white/10">{item.lesson}</p>
              </article>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="https://www.amazon.com/Algoritmos-deshumanizantes-p%C3%A9rdida-individuo-Spanish-ebook/dp/B0FF2KQBYW"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-xl font-semibold no-underline hover:bg-white/90 transition-all text-sm"
            >
              <BookOpen className="w-4 h-4" />
              Leer Algoritmos Deshumanizantes
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Fuentes */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-lg font-bold text-text tracking-tight mb-4">Fuentes consultadas</h2>
        <ul className="grid md:grid-cols-2 gap-x-6 gap-y-1.5">
          {SOURCES.map((source) => (
            <li key={source.url} className="text-xs">
              <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1 text-text-light no-underline hover:text-primary">
                <ExternalLink className="w-3 h-3 shrink-0 mt-0.5" />
                {source.title}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-text-lighter mt-5">
          Verificado el <time dateTime={RESEARCH_UPDATED.iso}>{RESEARCH_UPDATED.label}</time>. Precios, cupos y políticas cambian: confirma en la fuente antes de pagar o de enviar.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="relative overflow-hidden bg-surface rounded-3xl border border-border p-8 md:p-12 text-center shadow-sm">
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-accent/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="w-14 h-14 bg-primary/8 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Microscope className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-text tracking-tight mb-3">La herramienta cambia cada mes. El método, no.</h2>
            <p className="text-text-light leading-relaxed max-w-2xl mx-auto mb-8">Explora las herramientas de investigación del catálogo, compáralas o pide una recomendación para tu caso concreto.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/explorar?categoria=investigacion" className="inline-flex items-center gap-2 bg-text text-bg px-6 py-3 rounded-xl font-semibold no-underline hover:bg-text/90 hover:shadow-lg transition-all">
                <Search className="w-4 h-4" />
                Ver herramientas de investigación
              </Link>
              <Link to="/recomendador" className="inline-flex items-center gap-2 bg-surface border border-border text-text px-6 py-3 rounded-xl font-semibold no-underline hover:border-primary/40 hover:shadow-md transition-all">
                <Sparkles className="w-4 h-4 text-warm" />
                Pedir una recomendación
              </Link>
              <a
                href="mailto:sjimenezlon@gmail.com?subject=IA%20en%20mi%20investigaci%C3%B3n&body=Hola%20Santiago%2C%0A%0AInvestigo%20sobre%3A%20%0AUs%C3%A9%20esta%20herramienta%3A%20%0AAs%C3%AD%20me%20fue%3A%20"
                className="inline-flex items-center gap-2 bg-surface border border-border text-text px-6 py-3 rounded-xl font-semibold no-underline hover:border-accent/40 hover:shadow-md transition-all"
              >
                <MessageSquareText className="w-4 h-4 text-accent" />
                Cuéntame tu caso
              </a>
            </div>
          </div>
        </div>
      </section>

      {readProgress > 3 && (
        <div className="fixed bottom-5 right-4 sm:right-6 z-40 flex flex-col items-stretch gap-0.5 bg-surface border border-border rounded-2xl shadow-lg p-1.5">
          <button
            type="button"
            onClick={() => prevSection && scrollToSection(prevSection.id)}
            disabled={!prevSection}
            aria-label={prevSection ? `Sección anterior: ${prevSection.label}` : 'Ya estás en la primera sección'}
            className="p-2 rounded-xl text-text-light hover:bg-text/5 hover:text-primary disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => nextSection && scrollToSection(nextSection.id)}
            disabled={!nextSection}
            aria-label={nextSection ? `Siguiente sección: ${nextSection.label}` : 'Ya estás en la última sección'}
            className="p-2 rounded-xl text-text-light hover:bg-text/5 hover:text-primary disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
