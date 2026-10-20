import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  Check,
  Eye,
  HeartHandshake,
  HelpCircle,
  Lightbulb,
  MessageSquareText,
  Quote,
  ShieldAlert,
  Shuffle,
  Users,
  Wrench,
} from 'lucide-react'
import { getToolById } from '../../utils/recommender'
import {
  AGREEMENT_SECUNDARIA,
  BOOK_QUOTES,
  CHALLENGES,
  CHAPTER_INDEX,
  COACH_PROMPTS,
  DEEPFAKE_PROTOCOL,
  DISCLOSURE_USES,
  DISTRUST,
  FEED_QUESTIONS,
  GUESS_GAME,
  HABITS,
  MYTHS,
  PROMPT_PIECES,
  REFLECTIONS,
  ROUTES,
  SEMAPHORE,
  STEPS,
  TALK_CARDS,
  TEEN_HELP_LINES,
  TEEN_PARENT_CONTEXT,
  TEEN_PARENT_DO,
  TEEN_PARENT_PROMPTS,
  TEEN_PARENT_SIGNS,
  TOOL_GROUPS,
} from '../../data/students'
import { Agreement, ChapterNav, CopyChip, HelpLines, PromptGrid, Section, SectionHead, Semaphore, TryLinks } from './shared'

const PRICING = { gratis: 'Gratis', freemium: 'Gratis con límites', pago: 'De pago' }

function TalkDeck() {
  const [filter, setFilter] = useState('Todas')
  const [index, setIndex] = useState(0)
  const cards = filter === 'Todas' ? TALK_CARDS : TALK_CARDS.filter((card) => card.for === filter)
  const card = cards[index % cards.length]
  function draw() {
    if (cards.length < 2) return
    let next = index
    while (next === index) next = Math.floor(Math.random() * cards.length)
    setIndex(next)
  }
  return (
    <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-5 items-stretch">
      <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
        <h3 className="font-display font-bold text-xl text-text">Tarjetas para conversar</h3>
        <p className="text-sm text-text-light mt-2">Saquen una en la comida, al inicio de una clase o antes de dormir. No hay respuestas correctas.</p>
        <div className="flex flex-wrap gap-2 mt-5">
          {['Todas', 'En familia', 'En clase', 'Contigo'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                setFilter(option)
                setIndex(0)
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                filter === option ? 'bg-text text-bg border-text' : 'bg-surface text-text-light border-border hover:border-primary/30'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        <button type="button" onClick={draw} className="action-primary mt-6">
          <Shuffle className="w-4 h-4" /> Sacar otra tarjeta
        </button>
      </div>
      <div className="relative rounded-3xl p-8 md:p-10 bg-gradient-to-br from-primary to-secondary text-white shadow-lg min-h-[240px] flex flex-col justify-between">
        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/80">{card.for}</span>
        <p className="font-display font-bold text-2xl md:text-3xl leading-snug tracking-tight my-6">{card.q}</p>
        <span className="text-xs text-white/70 font-mono">{(index % cards.length) + 1} / {cards.length}</span>
      </div>
    </div>
  )
}

export default function Secundaria() {
  const [routeId, setRouteId] = useState(ROUTES[0].id)
  const [guessIndex, setGuessIndex] = useState(0)
  const [guessShown, setGuessShown] = useState(false)
  const [mythOpen, setMythOpen] = useState({})
  const [pieces, setPieces] = useState(['tarea'])
  const [toolGroup, setToolGroup] = useState(TOOL_GROUPS[0].id)
  const [uses, setUses] = useState(['explicar'])
  const [assignment, setAssignment] = useState('')
  const [tool, setTool] = useState('')
  const [challenge, setChallenge] = useState(null)

  const route = ROUTES.find((item) => item.id === routeId) || ROUTES[0]
  const guess = GUESS_GAME[guessIndex]
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
    <>
      <ChapterNav items={CHAPTER_INDEX} />

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
              <CopyChip text={route.prompt} />
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

      <Section id="semaforo">
        <SectionHead id="semaforo" kicker="Juego" title="¿Siga, con cuidado o pare?" color="text-accent">
          Nueve situaciones reales. Escoge un color en cada una y mira qué tanto coincide tu criterio.
        </SectionHead>
        <Semaphore items={SEMAPHORE} />
      </Section>

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
                  <CopyChip text={builtPrompt} />
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
          {COACH_PROMPTS.map((item) => (
            <article key={item.title} className="bg-surface border border-border rounded-2xl p-5 shadow-sm flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquareText className="w-4 h-4 text-warm" />
                <h3 className="font-display font-bold text-text">{item.title}</h3>
              </div>
              <p className="font-mono text-[13px] text-text-light leading-relaxed flex-1">{item.text}</p>
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <CopyChip text={item.text} />
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
              <CopyChip text={disclosure} />
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
            <CopyChip text={CHALLENGES[challenge].prompt} />
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

      </section>

      <Section id="familias" tint>
        <SectionHead id="familias" kicker="Para mamás, papás y cuidadores" title="Su hijo adolescente y la IA" color="text-secondary">
          No hace falta saber de tecnología para acompañar. Hace falta estar disponible y no llegar con el regaño primero.
        </SectionHead>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {TEEN_PARENT_CONTEXT.map((item) => (
            <div key={item.title} className="bg-surface border border-border rounded-2xl p-5 shadow-sm">
              <h3 className="font-display font-bold text-text">{item.title}</h3>
              <p className="text-sm text-text-light leading-relaxed mt-1.5">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-4 mt-8">
          <div className="grid sm:grid-cols-2 gap-3">
            {TEEN_PARENT_DO.map((item) => (
              <div key={item.title} className="bg-accent/[0.05] border border-accent/20 rounded-2xl p-5">
                <Check className="w-5 h-5 text-accent" />
                <h3 className="font-display font-bold text-text mt-2">{item.title}</h3>
                <p className="text-sm text-text-light leading-relaxed mt-1">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-warm" />
              <h3 className="font-display font-bold text-lg text-text">Señales para abrir una conversación</h3>
            </div>
            <ul className="space-y-2.5">
              {TEEN_PARENT_SIGNS.map((sign) => (
                <li key={sign} className="flex gap-2 text-sm text-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-warm shrink-0 mt-2" />
                  {sign}
                </li>
              ))}
            </ul>
            <p className="text-xs text-text-light mt-4">Ninguna prueba nada por sí sola. Son razones para preguntar, no para acusar.</p>
          </div>
        </div>

        <h3 className="font-display font-bold text-2xl text-text mt-12 mb-2 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-secondary" /> Si aparece un montaje o una imagen íntima falsa
        </h3>
        <p className="text-text-light mb-5">Seis pasos, en este orden. Sirven para estudiantes, familias y colegios.</p>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {DEEPFAKE_PROTOCOL.map((step, i) => (
            <li key={step.title} className="bg-surface border border-border rounded-2xl p-5 shadow-sm">
              <span className="w-8 h-8 rounded-xl bg-secondary/10 text-secondary font-display font-extrabold flex items-center justify-center">{i + 1}</span>
              <h4 className="font-display font-bold text-text mt-3">{step.title}</h4>
              <p className="text-sm text-text-light leading-relaxed mt-1">{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-5">
          <HelpLines items={TEEN_HELP_LINES} />
        </div>

        <h3 className="font-display font-bold text-2xl text-text mt-12 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" /> Prompts para familias
        </h3>
        <PromptGrid items={TEEN_PARENT_PROMPTS} color="text-primary" />

        <h3 className="font-display font-bold text-2xl text-text mt-12 mb-2 flex items-center gap-2">
          <HeartHandshake className="w-5 h-5 text-accent" /> Acuerdo familiar
        </h3>
        <p className="text-text-light mb-5">Que lo escriban entre todos. Un acuerdo que el adolescente ayudó a construir dura más que una regla impuesta.</p>
        <Agreement items={AGREEMENT_SECUNDARIA} title="Acuerdo familiar de IA y pantallas" />
      </Section>

      <Section id="reflexiones">
        <SectionHead id="reflexiones" kicker="Reflexiones" title="Para pensar lo que la pantalla no te pregunta">
          Seis pasajes de <i>Algoritmos deshumanizantes</i> (2025) para leer en voz alta y discutir, en clase o en la mesa.
        </SectionHead>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REFLECTIONS.map((item) => (
            <figure key={item.theme} className="bg-surface border border-border rounded-2xl p-6 shadow-sm flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-[0.13em] text-secondary">{item.theme}</span>
              <Quote className="w-4 h-4 text-secondary/60 mt-3" />
              <blockquote className="font-display font-semibold text-text leading-snug tracking-tight mt-2 flex-1">{item.quote}</blockquote>
              <figcaption className="text-xs text-text-lighter mt-4">
                <span className="italic">Algoritmos deshumanizantes</span>, p. {item.page}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-10">
          <TalkDeck />
        </div>
      </Section>
    </>
  )
}
