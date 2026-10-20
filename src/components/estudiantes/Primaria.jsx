import { useState } from 'react'
import { AlertTriangle, ArrowRight, Check, HeartHandshake, MessageCircle, RotateCcw, Search, ShieldCheck, Sparkles, X } from 'lucide-react'
import {
  AGREEMENT_PRIMARIA,
  BEFORE_APP,
  BY_AGE,
  DETECTIVE,
  GOLDEN_RULES,
  HAS_AI,
  HELP_LINES,
  KID_EXPLAIN,
  PARENT_KEYS,
  PARENT_PROMPTS,
  PARENT_SCRIPTS,
  PRIMARIA_INDEX,
  SHARE_GAME,
  STORY_OPTIONS,
  UNPLUGGED,
} from '../../data/students-primaria'
import { Agreement, ChapterNav, HelpLines, PromptActions, PromptGrid, Section, SectionHead } from './shared'

const SHARE_LABELS = {
  si: { label: 'Sí', className: 'bg-accent text-white' },
  no: { label: 'No', className: 'bg-secondary text-white' },
  adulto: { label: 'A un adulto', className: 'bg-warm text-white' },
}

function HasAiGame() {
  const [answers, setAnswers] = useState({})
  const hits = HAS_AI.filter((item, i) => answers[i] === item.answer).length
  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {HAS_AI.map((item, i) => {
          const answer = answers[i]
          const answered = answer !== undefined
          const right = answer === item.answer
          return (
            <div
              key={item.item}
              className={`rounded-2xl p-5 border transition-all ${
                answered ? (right ? 'bg-accent/5 border-accent/35' : 'bg-warm/5 border-warm/35') : 'bg-surface border-border shadow-sm'
              }`}
            >
              <span className="text-4xl" aria-hidden="true">{item.icon}</span>
              <p className="font-semibold text-text mt-3 min-h-[48px]">{item.item}</p>
              {answered ? (
                <div className="mt-2">
                  <span className={`text-xs font-bold ${right ? 'text-accent' : 'text-warm'}`}>
                    {right ? '¡Muy bien!' : 'Casi.'} {item.answer ? 'Sí tiene IA.' : 'No tiene IA.'}
                  </span>
                  <p className="text-sm text-text-light mt-1">{item.why}</p>
                </div>
              ) : (
                <div className="flex gap-2 mt-3">
                  <button type="button" onClick={() => setAnswers((c) => ({ ...c, [i]: true }))} className="flex-1 py-2 rounded-xl bg-primary/10 text-primary font-bold text-sm hover:bg-primary/15">
                    Tiene IA
                  </button>
                  <button type="button" onClick={() => setAnswers((c) => ({ ...c, [i]: false }))} className="flex-1 py-2 rounded-xl bg-text/[0.05] text-text font-bold text-sm hover:bg-text/10">
                    No tiene
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div className="flex items-center gap-4 mt-5">
        <span className="font-display font-bold text-text">
          {hits} de {HAS_AI.length} {hits === HAS_AI.length ? '¡Eres experto en IA! 🎉' : ''}
        </span>
        {Object.keys(answers).length > 0 && (
          <button type="button" onClick={() => setAnswers({})} className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-light hover:text-primary">
            <RotateCcw className="w-4 h-4" /> Otra vez
          </button>
        )}
      </div>
    </>
  )
}

function Detective() {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState(null)
  const item = DETECTIVE[index]
  const found = picked === item.wrong
  function next() {
    setIndex((c) => (c + 1) % DETECTIVE.length)
    setPicked(null)
  }
  return (
    <div className="bg-surface border border-border rounded-3xl p-6 md:p-8 shadow-sm max-w-3xl">
      <div className="flex items-center justify-between mb-5">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-text-light">
          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">🧒</span>
          {item.question}
        </span>
        <span className="text-xs font-mono text-text-lighter">{index + 1} / {DETECTIVE.length}</span>
      </div>
      <div className="flex items-start gap-3">
        <span className="w-8 h-8 rounded-full bg-text text-bg flex items-center justify-center shrink-0 text-sm">🤖</span>
        <p className="text-xl md:text-2xl leading-relaxed text-text">
          {item.parts.map((part, i) => {
            const state = picked === null ? 'idle' : i === item.wrong ? 'wrong' : i === picked ? 'miss' : 'idle'
            return (
              <button
                key={part}
                type="button"
                disabled={found}
                onClick={() => setPicked(i)}
                className={`inline rounded-lg px-1 mx-0.5 transition-colors text-left ${
                  state === 'wrong' && found
                    ? 'bg-secondary/15 text-secondary line-through decoration-2'
                    : state === 'miss'
                      ? 'bg-warm/15'
                      : 'hover:bg-primary/10'
                }`}
              >
                {part}
              </button>
            )
          })}
        </p>
      </div>
      <div className="mt-6 min-h-[64px]">
        {picked === null && <p className="text-sm text-text-light">🔍 Toca la parte que está mal.</p>}
        {picked !== null && !found && <p className="text-sm text-warm font-semibold">Esa parte está bien. ¡Sigue buscando!</p>}
        {found && (
          <div className="flex items-start gap-2 text-sm">
            <Check className="w-5 h-5 text-accent shrink-0" />
            <p>
              <b className="text-accent">¡Lo encontraste!</b> <span className="text-text-light">{item.fix}</span>
            </p>
          </div>
        )}
      </div>
      <button type="button" onClick={next} className="action-primary mt-2">
        Siguiente caso <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  )
}

function ShareGame() {
  const [answers, setAnswers] = useState({})
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {SHARE_GAME.map((item, i) => {
        const answer = answers[i]
        const right = answer === item.answer
        return (
          <div key={item.item} className={`rounded-2xl p-5 border ${answer ? (right ? 'bg-accent/5 border-accent/35' : 'bg-warm/5 border-warm/35') : 'bg-surface border-border shadow-sm'}`}>
            <p className="font-semibold text-text min-h-[48px]">{item.item}</p>
            {answer ? (
              <p className="text-sm mt-2">
                <b className={right ? 'text-accent' : 'text-warm'}>{right ? '¡Bien!' : `Mejor: ${SHARE_LABELS[item.answer].label}.`}</b>{' '}
                <span className="text-text-light">{item.why}</span>
              </p>
            ) : (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {Object.entries(SHARE_LABELS).map(([key, opt]) => (
                  <button key={key} type="button" onClick={() => setAnswers((c) => ({ ...c, [i]: key }))} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${opt.className} hover:opacity-90`}>
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function StoryBuilder() {
  const [hero, setHero] = useState(STORY_OPTIONS.hero[0])
  const [place, setPlace] = useState(STORY_OPTIONS.place[0])
  const [problem, setProblem] = useState(STORY_OPTIONS.problem[0])
  const [age, setAge] = useState('7')
  const prompt = `Vamos a crear juntos un cuento corto para un niño de ${age} años. El personaje es ${hero}, vive en ${place} y ${problem}. No escribas todo el cuento de una vez: escribe solo el comienzo (4 o 5 frases) y luego hazle al niño 2 preguntas para que él decida qué pasa después. Usa palabras sencillas, nada de miedo fuerte, y un final que deje una enseñanza sin sermón. No le pidas datos personales.`
  const groups = [
    { label: '¿Quién?', options: STORY_OPTIONS.hero, value: hero, set: setHero },
    { label: '¿Dónde?', options: STORY_OPTIONS.place, value: place, set: setPlace },
    { label: '¿Qué le pasa?', options: STORY_OPTIONS.problem, value: problem, set: setProblem },
  ]
  return (
    <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-5">
      <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm space-y-5">
        {groups.map((group) => (
          <div key={group.label}>
            <span className="field-label">{group.label}</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {group.options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => group.set(opt)}
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                    group.value === opt ? 'bg-primary text-white border-primary' : 'bg-surface text-text border-border hover:border-primary/30'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
        <label className="block">
          <span className="field-label">Edad del niño o la niña</span>
          <select className="field-input" value={age} onChange={(e) => setAge(e.target.value)}>
            {['5', '6', '7', '8', '9', '10', '11'].map((n) => (
              <option key={n} value={n}>{n} años</option>
            ))}
          </select>
        </label>
      </div>
      <div className="bg-primary/[0.04] border border-primary/15 rounded-2xl p-6 flex flex-col">
        <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-primary mb-3">Para que lo use un adulto</span>
        <p className="font-mono text-sm text-text leading-relaxed bg-surface border border-border rounded-xl p-4 flex-1">{prompt}</p>
        <p className="text-xs text-text-light mt-3">
          Léanlo juntos en voz alta. Después de cada parte, que el niño decida. Al final, que haga un dibujo de su escena favorita.
        </p>
        <PromptActions text={prompt} />
      </div>
    </div>
  )
}

export default function Primaria() {
  return (
    <>
      <ChapterNav items={PRIMARIA_INDEX} />

      <Section id="p-que-es">
        <SectionHead id="p-que-es" kicker="Para niñas y niños" title="¿Qué es la inteligencia artificial?">
          Tres ideas para entenderla. Léelas con alguien de tu familia.
        </SectionHead>
        <div className="grid md:grid-cols-3 gap-4">
          {KID_EXPLAIN.map((item, i) => (
            <div key={item.title} className="bg-surface border border-border rounded-3xl p-6 shadow-sm">
              <span className="text-5xl" aria-hidden="true">{['🦜', '⌨️', '🤖'][i]}</span>
              <h3 className="font-display font-bold text-xl text-text mt-4">{item.title}</h3>
              <p className="text-text-light leading-relaxed mt-2">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="p-tiene-ia" tint>
        <SectionHead id="p-tiene-ia" kicker="Juego 1" title="¿Tiene IA o no tiene?" color="text-accent">
          Algunas cosas de tu casa usan IA y otras no. ¡Adivina!
        </SectionHead>
        <HasAiGame />
      </Section>

      <Section id="p-detective">
        <SectionHead id="p-detective" kicker="Juego 2" title="Detective de errores" color="text-secondary">
          La IA a veces dice cosas que no son verdad, y lo dice muy segura. ¿Puedes encontrar el error?
        </SectionHead>
        <Detective />
        <p className="text-sm text-text-light mt-5 flex items-center gap-2">
          <Search className="w-4 h-4 text-primary" /> Por eso, lo importante siempre se revisa en un libro o con un adulto.
        </p>
      </Section>

      <Section id="p-secretos" tint>
        <SectionHead id="p-secretos" kicker="Juego 3" title="¿Se lo cuento a la IA?" color="text-warm">
          Hay cosas que puedes contarle y otras que nunca. Escoge Sí, No o A un adulto.
        </SectionHead>
        <ShareGame />
      </Section>

      <Section id="p-reglas">
        <SectionHead id="p-reglas" kicker="Para pegar en la nevera" title="Cinco reglas de oro" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {GOLDEN_RULES.map((rule, i) => (
            <div key={rule.title} className="bg-surface border border-border rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-3xl" aria-hidden="true">{rule.icon}</span>
                <span className="font-display font-extrabold text-2xl text-primary/25">{i + 1}</span>
              </div>
              <h3 className="font-display font-bold text-text mt-3">{rule.title}</h3>
              <p className="text-sm text-text-light leading-relaxed mt-1">{rule.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="p-cuentos" tint>
        <SectionHead id="p-cuentos" kicker="Crear juntos" title="Taller de cuentos en familia">
          El niño escoge las piezas, el adulto usa la IA y entre los dos deciden cómo sigue la historia.
        </SectionHead>
        <StoryBuilder />
      </Section>

      <Section id="p-sin-pantalla">
        <SectionHead id="p-sin-pantalla" kicker="Aprender sin pantalla" title="Cuatro juegos para entender la IA sin un computador" color="text-accent" />
        <div className="grid md:grid-cols-2 gap-4">
          {UNPLUGGED.map((item) => (
            <div key={item.title} className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display font-bold text-xl text-text">{item.title}</h3>
                <span className="text-[11px] font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full whitespace-nowrap">{item.age}</span>
              </div>
              <p className="text-text-light leading-relaxed mt-2">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="p-familias" tint>
        <SectionHead id="p-familias" kicker="Para mamás, papás y cuidadores" title="Acompañar sin miedo y sin ingenuidad" color="text-secondary">
          La pregunta no es si sus hijos van a encontrarse con la IA, sino con quién al lado.
        </SectionHead>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PARENT_KEYS.map((item) => (
            <div key={item.title} className="bg-surface border border-border rounded-2xl p-5 shadow-sm">
              <ShieldCheck className="w-5 h-5 text-secondary" />
              <h3 className="font-display font-bold text-text mt-3">{item.title}</h3>
              <p className="text-sm text-text-light leading-relaxed mt-1">{item.body}</p>
            </div>
          ))}
        </div>

        <h3 className="font-display font-bold text-2xl text-text mt-12 mb-4">Según la edad</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {BY_AGE.map((group) => (
            <div key={group.range} className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
              <h4 className="font-display font-bold text-xl text-text">{group.range}</h4>
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <ul className="space-y-2">
                  {group.doThis.map((line) => (
                    <li key={line} className="flex gap-2 text-sm text-text-light"><Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />{line}</li>
                  ))}
                </ul>
                <ul className="space-y-2">
                  {group.avoid.map((line) => (
                    <li key={line} className="flex gap-2 text-sm text-text-light"><X className="w-4 h-4 text-secondary shrink-0 mt-0.5" />{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-4 mt-12">
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-warm" />
              <h3 className="font-display font-bold text-lg text-text">Antes de una app o un juguete con IA</h3>
            </div>
            <ol className="space-y-2.5">
              {BEFORE_APP.map((q, i) => (
                <li key={q} className="flex gap-3 text-sm text-text">
                  <span className="font-mono text-xs text-warm font-semibold mt-0.5">0{i + 1}</span>
                  {q}
                </li>
              ))}
            </ol>
          </div>
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="w-5 h-5 text-primary" />
              <h3 className="font-display font-bold text-lg text-text">Preguntas para conversar en casa</h3>
            </div>
            <ul className="space-y-2.5">
              {PARENT_SCRIPTS.map((q) => (
                <li key={q} className="text-sm text-text bg-primary/[0.04] border border-primary/10 rounded-xl px-4 py-2.5">«{q}»</li>
              ))}
            </ul>
          </div>
        </div>

        <h3 className="font-display font-bold text-2xl text-text mt-12 mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-warm" /> La IA también le ayuda a usted
        </h3>
        <PromptGrid items={PARENT_PROMPTS} />

        <h3 className="font-display font-bold text-2xl text-text mt-12 mb-4 flex items-center gap-2">
          <HeartHandshake className="w-5 h-5 text-secondary" /> Si algo pasa
        </h3>
        <HelpLines items={HELP_LINES} />
      </Section>

      <Section id="p-acuerdo">
        <SectionHead id="p-acuerdo" kicker="Para firmar en familia" title="Nuestro acuerdo de IA y pantallas" color="text-accent">
          Escojan las reglas juntos, agreguen una propia e imprímanlo para firmarlo todos, también los adultos.
        </SectionHead>
        <Agreement items={AGREEMENT_PRIMARIA} title="Acuerdo familiar de IA y pantallas" />
      </Section>
    </>
  )
}
