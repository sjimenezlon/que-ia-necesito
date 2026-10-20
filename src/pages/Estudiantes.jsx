import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Backpack,
  BookOpen,
  Check,
  Copy,
  Cpu,
  ExternalLink,
  Eye,
  HelpCircle,
  Lightbulb,
  ListChecks,
  MessageSquareText,
  Quote,
  RotateCcw,
  ShieldAlert,
  Smartphone,
  Sparkles,
  Target,
  Wrench,
} from 'lucide-react'
import { getToolById } from '../utils/recommender'
import {
  BOOK_QUOTES,
  CHALLENGES,
  CHAPTER_INDEX,
  COACH_PROMPTS,
  DISCLOSURE_USES,
  DISTRUST,
  FEED_QUESTIONS,
  GUESS_GAME,
  HABITS,
  MYTHS,
  PROMPT_PIECES,
  ROUTES,
  SEMAPHORE,
  STEPS,
  STUDENTS_UPDATED,
  TOOL_GROUPS,
} from '../data/students'

const LIGHTS = {
  g: { label: 'Siga', dot: 'bg-accent', text: 'text-accent', ring: 'border-accent/40 bg-accent/5' },
  y: { label: 'Con cuidado', dot: 'bg-warm', text: 'text-warm', ring: 'border-warm/40 bg-warm/5' },
  r: { label: 'Pare', dot: 'bg-secondary', text: 'text-secondary', ring: 'border-secondary/40 bg-secondary/5' },
}

const PRICING = { gratis: 'Gratis', freemium: 'Gratis con límites', pago: 'De pago' }

function useCopy() {
  const [copiedId, setCopiedId] = useState(null)
  function copy(text, id) {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {})
    }
    setCopiedId(id)
    window.setTimeout(() => setCopiedId(null), 1600)
  }
  return [copiedId, copy]
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

function CopyChip({ text, id, copiedId, onCopy }) {
  const done = copiedId === id
  return (
    <button
      type="button"
      onClick={() => onCopy(text, id)}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-text text-bg text-xs font-semibold hover:bg-text/90 transition-colors"
    >
      {done ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {done ? 'Copiado' : 'Copiar'}
    </button>
  )
}

function SectionHead({ id, kicker, title, children, color = 'text-primary' }) {
  return (
    <div className="mb-7 max-w-3xl">
      <span className={`text-[11px] font-bold uppercase tracking-[0.14em] ${color}`}>{kicker}</span>
      <h2 id={`${id}-title`} className="font-display text-3xl md:text-4xl font-bold text-text tracking-tight mt-2">
        {title}
      </h2>
      {children && <p className="text-text-light text-lg leading-relaxed mt-3">{children}</p>}
    </div>
  )
}

export default function Estudiantes() {
  const [copiedId, copy] = useCopy()
  const [routeId, setRouteId] = useState(ROUTES[0].id)
  const [guessIndex, setGuessIndex] = useState(0)
  const [guessShown, setGuessShown] = useState(false)
  const [mythOpen, setMythOpen] = useState({})
  const [votes, setVotes] = useState({})
  const [pieces, setPieces] = useState(['tarea'])
  const [toolGroup, setToolGroup] = useState(TOOL_GROUPS[0].id)
  const [uses, setUses] = useState(['explicar'])
  const [assignment, setAssignment] = useState('')
  const [tool, setTool] = useState('')
  const [challenge, setChallenge] = useState(null)
  const [activeSection, setActiveSection] = useState(CHAPTER_INDEX[0].id)

  useEffect(() => {
    document.title = 'Estudiantes · ¿Qué IA necesito?'
    const sections = CHAPTER_INDEX.map((item) => document.getElementById(item.id)).filter(Boolean)
    if (sections.length === 0) return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length > 0) setActiveSection(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const route = ROUTES.find((item) => item.id === routeId) || ROUTES[0]
  const guess = GUESS_GAME[guessIndex]
  const voted = Object.keys(votes).length
  const hits = SEMAPHORE.filter((item, i) => votes[i] === item.answer).length
  const builtPrompt = PROMPT_PIECES.filter((piece) => pieces.includes(piece.id))
    .map((piece) => piece.text)
    .join(' ')
  const group = TOOL_GROUPS.find((item) => item.id === toolGroup) || TOOL_GROUPS[0]
  const disclosure = `Declaración de uso de IA${assignment ? ` en «${assignment}»` : ''}: usé ${tool || '[nombre de la herramienta]'} para ${
    DISCLOSURE_USES.filter((item) => uses.includes(item.id))
      .map((item) => item.label.charAt(0).toLowerCase() + item.label.slice(1))
      .join('; ') || '[para qué la usaste]'
  }. Las ideas, la redacción final y las decisiones son mías. Revisé y verifiqué lo que la herramienta me propuso.`

  function togglePiece(id) {
    setPieces((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }

  function toggleUse(id) {
    setUses((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }

  function nextGuess() {
    setGuessIndex((current) => (current + 1) % GUESS_GAME.length)
    setGuessShown(false)
  }

  return (
    <div className="bg-bg">
      <section className="relative px-4 hero-gradient noise-overlay overflow-x-clip py-16 md:py-24">
        <div className="absolute inset-0 dot-pattern pointer-events-none" />
        <div className="absolute -top-16 -left-24 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-24 -right-24 w-80 h-80 bg-secondary/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-7 border border-primary/15 shadow-sm">
              <Backpack className="w-4 h-4" />
              Capítulo especial · Colegio y primeros semestres
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-text leading-[1.05] tracking-tight mb-6">
              La IA no vino a <span className="text-text-light font-bold">reemplazarte.</span>
              <br className="hidden sm:block" />
              <span className="text-gradient-primary"> Llegó a retarte.</span>
            </h1>
            <p className="text-text-light text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
              Cómo funciona por dentro, cuándo usarla y cuándo no, cómo pedirle para aprender más (no
              menos) y qué hace con tu atención la otra IA: la de tu feed.
            </p>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              <a href="#ruta" className="inline-flex items-center gap-2 bg-text text-bg px-5 py-2.5 rounded-xl font-semibold no-underline hover:bg-text/90 hover:shadow-lg transition-all text-sm">
                <Target className="w-4 h-4" />
                ¿Qué quieres hacer?
              </a>
              <a href="#semaforo" className="inline-flex items-center gap-2 bg-surface border border-border text-text px-5 py-2.5 rounded-xl font-semibold no-underline hover:border-accent/40 hover:shadow-md transition-all text-sm">
                <ListChecks className="w-4 h-4 text-accent" />
                Juega el semáforo
              </a>
              <a href="#entrenador" className="inline-flex items-center gap-2 bg-surface border border-border text-text px-5 py-2.5 rounded-xl font-semibold no-underline hover:border-warm/40 hover:shadow-md transition-all text-sm">
                <Copy className="w-4 h-4 text-warm" />
                Prompts listos
              </a>
              <a href="#feed" className="inline-flex items-center gap-2 bg-surface border border-border text-text px-5 py-2.5 rounded-xl font-semibold no-underline hover:border-secondary/40 hover:shadow-md transition-all text-sm">
                <Smartphone className="w-4 h-4 text-secondary" />
                Tu feed
              </a>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-3xl p-6 md:p-7 shadow-lg">
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-text-lighter mb-4">
              La regla de este capítulo
            </div>
            <div className="grid grid-cols-2 rounded-2xl overflow-hidden border border-border">
              <div className="p-5 bg-text/[0.03]">
                <Cpu className="w-5 h-5 text-text-light mb-3" />
                <p className="font-display font-bold text-text text-xl leading-tight">La IA pone el borrador.</p>
                <p className="text-xs text-text-light mt-2">Sabe lo que es probable.</p>
              </div>
              <div className="p-5 bg-primary text-white">
                <Sparkles className="w-5 h-5 mb-3" />
                <p className="font-display font-bold text-xl leading-tight">Tú pones el criterio.</p>
                <p className="text-xs text-white/80 mt-2">Sabes lo que importa.</p>
              </div>
            </div>
            <p className="text-sm text-text-light leading-relaxed mt-5">
              Si la IA hace el esfuerzo por ti, aprendes menos. Si la pones a preguntarte, corregirte y
              llevarte la contraria, aprendes más rápido que nunca.
            </p>
          </div>
        </div>
      </section>

      <nav className="sticky top-16 z-20 bg-bg/90 backdrop-blur border-y border-border" aria-label="Secciones del capítulo">
        <div className="max-w-6xl mx-auto px-4 flex gap-2 overflow-x-auto py-2.5">
          {CHAPTER_INDEX.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold no-underline border transition-colors ${
                activeSection === item.id
                  ? 'bg-text text-bg border-text'
                  : 'bg-surface text-text-light border-border hover:border-primary/30 hover:text-primary'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <section id="ruta" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-32" aria-labelledby="ruta-title">
        <SectionHead id="ruta" kicker="Tu ruta" title="¿Qué quieres hacer hoy?">
          Escoge una tarea. Te damos los pasos, un prompt para empezar y las herramientas que más sirven.
        </SectionHead>
        <div className="flex flex-wrap gap-2 mb-6">
          {ROUTES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setRouteId(item.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                routeId === item.id
                  ? 'bg-primary text-white border-primary shadow-md'
                  : 'bg-surface text-text border-border hover:border-primary/30'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-5">
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
            <p className="font-display font-bold text-xl text-text tracking-tight">{route.goal}</p>
            <ol className="mt-5 space-y-3">
              {route.steps.map((step, i) => (
                <li key={step} className="flex gap-3 text-sm text-text-light leading-relaxed">
                  <span className="w-6 h-6 shrink-0 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <div className="mt-6 pt-5 border-t border-border">
              <div className="text-[11px] font-bold uppercase tracking-[0.13em] text-text-lighter mb-3">Herramientas para esto</div>
              <div className="flex flex-wrap gap-2">
                {route.tools.map((id) => {
                  const found = getToolById(id)
                  if (!found) return null
                  return (
                    <Link
                      key={id}
                      to={`/herramienta/${id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-semibold text-text no-underline hover:border-primary/30 hover:text-primary"
                    >
                      {found.name} <ArrowRight className="w-3 h-3" />
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="bg-primary/[0.04] border border-primary/15 rounded-2xl p-6">
            <div className="text-[11px] font-bold uppercase tracking-[0.13em] text-primary mb-3">Prompt para empezar</div>
            <p className="font-mono text-sm text-text leading-relaxed bg-surface border border-border rounded-xl p-4">{route.prompt}</p>
            <p className="text-xs text-text-light mt-3">Cambia lo que está entre corchetes por tu caso.</p>
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <CopyChip text={route.prompt} id={`ruta-${route.id}`} copiedId={copiedId} onCopy={copy} />
              <TryLinks text={route.prompt} />
            </div>
          </div>
        </div>
      </section>

      <section id="funciona" className="bg-surface/60 border-y border-border scroll-mt-32" aria-labelledby="funciona-title">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionHead id="funciona" kicker="De la pantalla hacia atrás" title="No busca en Google. Adivina, palabra por palabra.">
            Cuando le escribes a un chat de IA, esto es lo que pasa en un par de segundos.
          </SectionHead>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {STEPS.map((step) => (
              <div key={step.n} className="bg-surface border border-border rounded-2xl p-5 shadow-sm">
                <span className="font-mono text-xs text-primary font-semibold">{step.n}</span>
                <h3 className="font-display font-bold text-text text-lg mt-2 mb-1.5">{step.title}</h3>
                <p className="text-sm text-text-light leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-5 mt-8">
            <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-accent">Juego · sé la IA</span>
                <span className="text-xs text-text-lighter font-mono">{guessIndex + 1} / {GUESS_GAME.length}</span>
              </div>
              <p className="font-display font-bold text-2xl text-text tracking-tight">
                {guess.text} <span className="text-primary">{guessShown ? guess.options[0][0] : '____'}</span>
              </p>
              {guessShown ? (
                <div className="mt-5 space-y-2">
                  {guess.options.map(([word, pct], i) => (
                    <div key={word} className="grid grid-cols-[110px_minmax(0,1fr)_44px] items-center gap-3 text-sm">
                      <span className={i === 0 ? 'font-semibold text-accent' : 'text-text-light'}>{word}</span>
                      <span className="h-2 rounded-full bg-text/[0.06] overflow-hidden">
                        <span className={`block h-full rounded-full ${i === 0 ? 'bg-accent' : 'bg-primary/60'}`} style={{ width: `${pct}%` }} />
                      </span>
                      <span className="text-xs font-mono text-text-lighter text-right">{pct}%</span>
                    </div>
                  ))}
                  <p className="text-xs text-text-lighter pt-1">Probabilidades ilustrativas. Si acertaste, acabas de hacer lo mismo que hace la IA.</p>
                </div>
              ) : (
                <p className="text-sm text-text-light mt-4">Completa la frase en tu cabeza antes de revelar.</p>
              )}
              <div className="flex gap-2 mt-5">
                <button type="button" onClick={() => setGuessShown(true)} className="action-primary">
                  Revelar lo que diría la IA
                </button>
                <button type="button" onClick={nextGuess} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border text-sm font-semibold text-text hover:border-primary/30">
                  Siguiente <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-secondary">El punto débil</span>
              <h3 className="font-display font-bold text-2xl text-text tracking-tight mt-2">
                No busca la verdad. Busca lo que suena probable.
              </h3>
              <p className="text-sm text-text-light mt-2">
                Por eso a veces inventa con total seguridad. A eso se le llama <b className="text-secondary">alucinar</b>. Desconfía más cuando hay…
              </p>
              <ul className="mt-4 space-y-3">
                {DISTRUST.map((item) => (
                  <li key={item.title} className="flex gap-3 text-sm">
                    <ShieldAlert className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <span>
                      <b className="text-text">{item.title}.</b> <span className="text-text-light">{item.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-text mt-4 font-semibold">Truco: pídele las fuentes y ábrelas tú.</p>
            </div>
          </div>

          <h3 className="font-display font-bold text-xl text-text mt-10 mb-4">Mitos que conviene voltear</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {MYTHS.map((item, i) => (
              <button
                key={item.myth}
                type="button"
                onClick={() => setMythOpen((current) => ({ ...current, [i]: !current[i] }))}
                className={`text-left rounded-2xl p-5 border transition-all min-h-[150px] ${
                  mythOpen[i] ? 'bg-accent/5 border-accent/35' : 'bg-surface border-border hover:border-primary/30 hover:shadow-md'
                }`}
              >
                <span className={`text-[10px] font-bold uppercase tracking-[0.13em] ${mythOpen[i] ? 'text-accent' : 'text-secondary'}`}>
                  {mythOpen[i] ? 'Lo que pasa en realidad' : 'Mito · toca para voltear'}
                </span>
                <p className="text-sm text-text font-semibold leading-relaxed mt-2">{mythOpen[i] ? item.truth : item.myth}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="semaforo" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-32" aria-labelledby="semaforo-title">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead id="semaforo" kicker="Juego" title="¿Siga, con cuidado o pare?" color="text-accent">
            Nueve situaciones reales. Escoge un color en cada una y mira qué tanto coincide tu criterio.
          </SectionHead>
          <div className="mb-7 bg-surface border border-border rounded-2xl px-5 py-3 shadow-sm">
            <span className="text-xs text-text-lighter">Aciertos</span>
            <p className="font-display font-extrabold text-3xl text-text">
              {hits}<span className="text-text-lighter text-xl">/{SEMAPHORE.length}</span>
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {SEMAPHORE.map((item, i) => {
            const vote = votes[i]
            const right = LIGHTS[item.answer]
            return (
              <div key={item.text} className={`rounded-2xl p-5 border transition-all ${vote ? right.ring : 'bg-surface border-border shadow-sm'}`}>
                <p className="text-sm font-semibold text-text leading-relaxed min-h-[44px]">{item.text}</p>
                {vote ? (
                  <div className="mt-3">
                    <span className={`text-[11px] font-bold uppercase tracking-[0.12em] ${right.text}`}>
                      {vote === item.answer ? '✓ Acertaste' : `Tú: ${LIGHTS[vote].label}`} · {right.label}
                    </span>
                    <p className="text-sm text-text-light mt-1.5 leading-relaxed">{item.why}</p>
                  </div>
                ) : (
                  <div className="flex gap-2 mt-4">
                    {Object.entries(LIGHTS).map(([key, light]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setVotes((current) => ({ ...current, [i]: key }))}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border text-xs font-semibold text-text-light hover:border-text/30"
                        aria-label={`${light.label}: ${item.text}`}
                      >
                        <span className={`w-2.5 h-2.5 rounded-full ${light.dot}`} />
                        {light.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        {voted > 0 && (
          <button type="button" onClick={() => setVotes({})} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-text-light hover:text-primary">
            <RotateCcw className="w-4 h-4" /> Volver a jugar
          </button>
        )}
      </section>

      <section id="pedir" className="bg-surface/60 border-y border-border scroll-mt-32" aria-labelledby="pedir-title">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionHead id="pedir" kicker="Pedir bien" title="La fórmula de cinco piezas">
            Un prompt corto da una respuesta genérica. Activa las piezas y mira cómo cambia el pedido.
          </SectionHead>
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-5">
            <div className="space-y-2">
              {PROMPT_PIECES.map((piece) => {
                const on = pieces.includes(piece.id)
                return (
                  <button
                    key={piece.id}
                    type="button"
                    onClick={() => togglePiece(piece.id)}
                    className={`w-full text-left flex items-center gap-4 rounded-2xl p-4 border transition-all ${
                      on ? 'bg-primary/[0.06] border-primary/30 shadow-sm' : 'bg-surface border-border hover:border-primary/25'
                    }`}
                    aria-pressed={on}
                  >
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${on ? 'bg-primary text-white' : 'border border-border'}`}>
                      {on && <Check className="w-4 h-4" />}
                    </span>
                    <span>
                      <span className="block font-semibold text-text">{piece.label}</span>
                      <span className="block text-xs text-text-light">{piece.hint}</span>
                    </span>
                  </button>
                )
              })}
            </div>
            <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-text-lighter">Tu prompt</span>
                <span className="text-xs font-semibold text-warm">
                  {'★'.repeat(pieces.length)}
                  <span className="text-text-lighter">{'★'.repeat(PROMPT_PIECES.length - pieces.length)}</span>
                </span>
              </div>
              <p className="font-mono text-sm text-text leading-relaxed flex-1 min-h-[120px]">
                {builtPrompt || 'Activa al menos una pieza.'}
              </p>
              <p className="text-xs text-text-light mt-4">
                {pieces.length < 3
                  ? 'Así la IA tiene que adivinar casi todo sobre ti.'
                  : pieces.length < 5
                    ? 'Vas bien: ya sabe quién eres y qué necesitas.'
                    : 'Completo: rol, contexto, tarea, formato y límite. Ahora sí te responde a ti.'}
              </p>
              {builtPrompt && (
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  <CopyChip text={builtPrompt} id="formula" copiedId={copiedId} onCopy={copy} />
                  <TryLinks text={builtPrompt} />
                </div>
              )}
            </div>
          </div>
          <p className="text-sm text-text-light mt-6">
            ¿Quieres practicar más? El <Link to="/prompt-lab" className="text-primary font-semibold">Prompt Lab</Link> refina
            cualquier instrucción paso a paso, y la ruta <Link to="/aprender" className="text-primary font-semibold">Aprender</Link> tiene
            cuatro lecciones cortas con preguntas.
          </p>
        </div>
      </section>

      <section id="entrenador" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-32" aria-labelledby="entrenador-title">
        <SectionHead id="entrenador" kicker="Modo entrenador" title="Que te pregunte, no que te responda" color="text-warm">
          El truco para aprender con IA es invertir los papeles: tú haces el esfuerzo y ella te entrena.
        </SectionHead>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COACH_PROMPTS.map((item, i) => (
            <article key={item.title} className="bg-surface border border-border rounded-2xl p-5 shadow-sm flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquareText className="w-4 h-4 text-warm" />
                <h3 className="font-display font-bold text-text">{item.title}</h3>
              </div>
              <p className="font-mono text-[13px] text-text-light leading-relaxed flex-1">{item.text}</p>
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <CopyChip text={item.text} id={`coach-${i}`} copiedId={copiedId} onCopy={copy} />
                <TryLinks text={item.text} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="herramientas" className="bg-surface/60 border-y border-border scroll-mt-32" aria-labelledby="herramientas-title">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionHead id="herramientas" kicker="Caja de herramientas" title="Para cada tarea, una herramienta">
            Muchas tienen versión gratuita. Antes de crear una cuenta, revisa en sus términos la edad mínima y si
            necesitas permiso de tus papás o acudientes.
          </SectionHead>
          <div className="flex flex-wrap gap-2 mb-6">
            {TOOL_GROUPS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setToolGroup(item.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                  toolGroup === item.id ? 'bg-text text-bg border-text' : 'bg-surface text-text border-border hover:border-primary/30'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {group.ids.map((id) => {
              const found = getToolById(id)
              if (!found) return null
              return (
                <Link key={id} to={`/herramienta/${id}`} className="starter-card">
                  <span className="flex items-center justify-between text-xs text-text-light">
                    <span>{PRICING[found.pricing] || found.pricing}</span>
                    <Wrench className="w-3.5 h-3.5" />
                  </span>
                  <h3 className="font-semibold text-lg mt-5 mb-2">{found.name}</h3>
                  <p className="text-sm text-text-light leading-relaxed">{found.shortDescription}</p>
                  <span className="flex items-center gap-2 text-primary text-sm font-semibold mt-5">
                    Ver la ficha <ArrowRight size={15} />
                  </span>
                </Link>
              )
            })}
          </div>
          <p className="text-sm text-text-light mt-6">
            ¿No sabes cuál? Describe tu tarea en el <Link to="/" className="text-primary font-semibold">buscador de inicio</Link> o
            explora las {''}
            <Link to="/explorar" className="text-primary font-semibold">131 herramientas</Link>.
          </p>
        </div>
      </section>

      <section id="honestidad" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-32" aria-labelledby="honestidad-title">
        <SectionHead id="honestidad" kicker="Juego limpio" title="Si la usaste, dilo">
          Declarar cómo usaste la IA no te quita mérito: muestra que sabes lo que hiciste. Arma tu declaración y
          pégala al final del trabajo, siempre que tu profe permita el uso de IA en esa tarea.
        </SectionHead>
        <div className="grid lg:grid-cols-2 gap-5">
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm space-y-4">
            <label className="block">
              <span className="field-label">Trabajo o tarea</span>
              <input className="field-input" value={assignment} onChange={(e) => setAssignment(e.target.value)} placeholder="Ej.: Ensayo de sociales sobre el conflicto" />
            </label>
            <label className="block">
              <span className="field-label">Herramienta</span>
              <input className="field-input" value={tool} onChange={(e) => setTool(e.target.value)} placeholder="Ej.: ChatGPT, Gemini, Claude" />
            </label>
            <fieldset>
              <legend className="field-label">¿Para qué la usaste?</legend>
              <div className="flex flex-wrap gap-2 mt-1">
                {DISCLOSURE_USES.map((item) => {
                  const on = uses.includes(item.id)
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleUse(item.id)}
                      aria-pressed={on}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        on ? 'bg-accent/10 text-accent border-accent/35' : 'bg-surface text-text-light border-border hover:border-accent/30'
                      }`}
                    >
                      {item.label}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          </div>
          <div className="bg-accent/[0.05] border border-accent/20 rounded-2xl p-6 flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-accent mb-3">Tu declaración</span>
            <p className="text-sm text-text leading-relaxed flex-1">{disclosure}</p>
            <div className="mt-4">
              <CopyChip text={disclosure} id="declaracion" copiedId={copiedId} onCopy={copy} />
            </div>
          </div>
        </div>
      </section>

      <section id="feed" className="bg-surface/60 border-y border-border scroll-mt-32" aria-labelledby="feed-title">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <SectionHead id="feed" kicker="La otra IA" title="La IA que más usas es la que te usa a ti: tu feed" color="text-secondary">
            Cada vez que te quedas viendo un video, el algoritmo aprende qué te mantiene pegado y te muestra más de
            eso. Sin que des like. Tu burbuja se cierra sola.
          </SectionHead>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-5">
            <div className="space-y-3">
              {BOOK_QUOTES.map((quote) => (
                <figure key={quote} className="bg-surface border border-border rounded-2xl p-5 shadow-sm">
                  <Quote className="w-4 h-4 text-secondary mb-2" />
                  <blockquote className="font-display font-semibold text-lg text-text leading-snug tracking-tight">{quote}</blockquote>
                  <figcaption className="text-xs text-text-lighter mt-3">
                    <span className="italic">Algoritmos deshumanizantes</span> (2025)
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-4 h-4 text-secondary" />
                <h3 className="font-display font-bold text-text text-lg">Tres preguntas antes de seguir scrolleando</h3>
              </div>
              <ol className="space-y-3">
                {FEED_QUESTIONS.map((question, i) => (
                  <li key={question} className="flex gap-3">
                    <span className="font-mono text-xs text-secondary font-semibold mt-1">0{i + 1}</span>
                    <span className="font-semibold text-text">{question}</span>
                  </li>
                ))}
              </ol>
              <div className="grid sm:grid-cols-2 gap-3 mt-6">
                {HABITS.map((habit) => (
                  <div key={habit.title} className="rounded-xl bg-text/[0.03] border border-border p-4">
                    <p className="font-semibold text-accent text-sm">{habit.title}</p>
                    <p className="text-xs text-text-light leading-relaxed mt-1">{habit.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reto" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-32" aria-labelledby="reto-title">
        <SectionHead id="reto" kicker="Tu reto de esta semana" title="De consumir a crear">
          Escoge uno. Toca la tarjeta para ver el primer prompt.
        </SectionHead>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {CHALLENGES.map((item, i) => {
            const open = challenge === i
            return (
              <button
                key={item.title}
                type="button"
                onClick={() => setChallenge(open ? null : i)}
                className={`text-left rounded-2xl p-5 border transition-all min-h-[190px] flex flex-col ${
                  open ? 'bg-primary/[0.05] border-primary/30 shadow-md' : 'bg-surface border-border shadow-sm hover:border-primary/30 hover:-translate-y-0.5'
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.13em] text-primary">
                  {open ? 'Primer prompt' : `Reto 0${i + 1}`}
                </span>
                {open ? (
                  <p className="font-mono text-xs text-text leading-relaxed mt-2">{item.prompt}</p>
                ) : (
                  <>
                    <h3 className="font-display font-bold text-text text-lg mt-2">{item.title}</h3>
                    <p className="text-sm text-text-light leading-relaxed mt-1.5 flex-1">{item.body}</p>
                    <span className="text-xs text-text-lighter mt-3">Ver cómo empezar</span>
                  </>
                )}
              </button>
            )
          })}
        </div>
        {challenge !== null && (
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <CopyChip text={CHALLENGES[challenge].prompt} id={`reto-${challenge}`} copiedId={copiedId} onCopy={copy} />
            <TryLinks text={CHALLENGES[challenge].prompt} />
          </div>
        )}

        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {[
            { icon: Lightbulb, color: 'text-primary bg-primary/8', title: 'Confía en tu criterio', body: 'Lo promedio ya lo tiene la máquina. Lo raro, lo tuyo, es lo que vale.' },
            { icon: HelpCircle, color: 'text-warm bg-warm/10', title: 'Pregunta siempre', body: '¿De dónde salió esto? ¿Quién lo puede verificar? ¿Qué me falta?' },
            { icon: BookOpen, color: 'text-accent bg-accent/10', title: 'Sigue aprendiendo', body: 'Ponle un reto nuevo a la IA cada semana y compártelo con alguien.' },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4 bg-surface border border-border rounded-2xl p-5">
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                <item.icon className="w-5 h-5" />
              </span>
              <span>
                <span className="block font-display font-bold text-text">{item.title}</span>
                <span className="block text-sm text-text-light mt-1">{item.body}</span>
              </span>
            </div>
          ))}
        </div>

        <p className="text-xs text-text-lighter mt-12">
          Revisado el {STUDENTS_UPDATED}. Capítulo creado por{' '}
          <a href="https://sjimenezlon.co/" target="_blank" rel="noopener noreferrer" className="text-text-lighter hover:text-primary">
            Santiago Jiménez Londoño
          </a>
          , profesor de la Universidad EAFIT.
        </p>
      </section>
    </div>
  )
}
