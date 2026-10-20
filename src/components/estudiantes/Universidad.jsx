import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Brain, Briefcase, Check, FileText, FlaskConical, Lock, Rocket, Scale, ShieldCheck } from 'lucide-react'
import {
  BRAIN,
  CAREERS,
  DATA_RULES,
  INTEGRITY_CHECKS,
  JOB,
  RESEARCH_STEPS,
  SEMESTER_PROJECTS,
  SKILLS,
  STUDY_SYSTEM,
  UNI_INDEX,
  UNI_SEMAPHORE,
  UNI_USES,
} from '../../data/students-universidad'
import { AgeTable, ChapterNav, ClaudePick, CopyChip, PromptActions, PromptGrid, Section, SectionHead, Semaphore, ToolChips } from './shared'

const TOOL_OWNERS = {
  ChatGPT: { company: 'OpenAI', url: 'https://chatgpt.com/' },
  Claude: { company: 'Anthropic', url: 'https://claude.ai/' },
  Gemini: { company: 'Google', url: 'https://gemini.google.com/' },
  Copilot: { company: 'Microsoft', url: 'https://copilot.microsoft.com/' },
  Perplexity: { company: 'Perplexity AI', url: 'https://www.perplexity.ai/' },
}

const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

function CitationBuilder() {
  const [tool, setTool] = useState('Claude')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [uses, setUses] = useState(['explicar', 'estilo'])
  const [course, setCourse] = useState('')
  const [chatTitle, setChatTitle] = useState('')
  const [chatUrl, setChatUrl] = useState('')
  const owner = TOOL_OWNERS[tool]
  const [y, m, d] = date.split('-').map(Number)
  const dateText = y ? `${d} de ${MONTHS[m - 1]} de ${y}` : '[fecha]'
  // Plantillas de la guía de APA de septiembre de 2025: la herramienta en general, o una conversación compartida.
  const reference = chatTitle.trim()
    ? `${owner.company}. (${y || 'año'}, ${d} de ${MONTHS[m - 1]}). ${chatTitle.trim()} [Chat de IA generativa]. ${tool}. ${chatUrl.trim() || '[enlace para compartir la conversación]'}`
    : `${owner.company}. (${y || 'año'}). ${tool} [Modelo de lenguaje de gran tamaño]. ${owner.url}`
  const statement = `Declaración de uso de IA${course ? ` · ${course}` : ''}: En este trabajo usé ${tool} (${owner.company}) el ${dateText} para ${
    UNI_USES.filter((item) => uses.includes(item.id))
      .map((item) => item.label.toLowerCase())
      .join(', ') || '[usos]'
  }. Todo el contenido fue revisado, verificado y reescrito por mí; asumo la responsabilidad por las ideas, los datos y las fuentes citadas. Conservo el historial de la conversación por si se requiere.`

  function toggle(id) {
    setUses((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }

  return (
    <div className="grid lg:grid-cols-2 gap-5">
      <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm space-y-4">
        <div>
          <span className="field-label">Herramienta</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {Object.keys(TOOL_OWNERS).map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setTool(name)}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold border ${tool === name ? 'bg-primary text-white border-primary' : 'bg-surface text-text border-border hover:border-primary/30'}`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="field-label">Fecha de uso</span>
            <input type="date" className="field-input" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
          <label className="block">
            <span className="field-label">Curso o entrega</span>
            <input className="field-input" value={course} onChange={(e) => setCourse(e.target.value)} placeholder="Ej.: Microeconomía · Taller 3" />
          </label>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="field-label">Título de la conversación (opcional)</span>
            <input className="field-input" value={chatTitle} onChange={(e) => setChatTitle(e.target.value)} placeholder="Ej.: Explicación de elasticidad" />
          </label>
          <label className="block">
            <span className="field-label">Enlace para compartir (opcional)</span>
            <input className="field-input" value={chatUrl} onChange={(e) => setChatUrl(e.target.value)} placeholder="https://..." />
          </label>
        </div>
        <fieldset>
          <legend className="field-label">¿Para qué la usaste?</legend>
          <div className="flex flex-wrap gap-2 mt-1">
            {UNI_USES.map((item) => {
              const on = uses.includes(item.id)
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${on ? 'bg-accent/10 text-accent border-accent/35' : 'bg-surface text-text-light border-border hover:border-accent/30'}`}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </fieldset>
      </div>
      <div className="space-y-4">
        <div className="bg-primary/[0.04] border border-primary/15 rounded-2xl p-5">
          <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-primary">
            Referencia APA 7 · {chatTitle.trim() ? 'conversación compartida' : 'herramienta'}
          </span>
          <p className="text-sm text-text leading-relaxed mt-2 font-mono">{reference}</p>
          <div className="mt-3">
            <CopyChip text={reference} label="Copiar referencia" />
          </div>
        </div>
        <div className="bg-accent/[0.05] border border-accent/20 rounded-2xl p-5">
          <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-accent">Declaración de uso</span>
          <p className="text-sm text-text leading-relaxed mt-2">{statement}</p>
          <div className="mt-3">
            <CopyChip text={statement} label="Copiar declaración" />
          </div>
        </div>
        <p className="text-xs text-text-light">
          Basado en la{' '}
          <a href="https://apastyle.apa.org/blog/cite-generative-ai-references" target="_blank" rel="noopener noreferrer" className="text-primary">
            guía de APA para citar IA generativa
          </a>{' '}
          (septiembre de 2025). El nombre de la herramienta y el título del chat van en cursiva. Si compartes la conversación, cita el chat; si no, la herramienta. Si tu curso usa otra norma o tu universidad tiene un formato propio, ese manda.
        </p>
      </div>
    </div>
  )
}

export default function Universidad() {
  const [careerId, setCareerId] = useState(CAREERS[0].id)
  const career = CAREERS.find((item) => item.id === careerId) || CAREERS[0]

  return (
    <>
      <ChapterNav items={UNI_INDEX} />

      <div className="max-w-6xl mx-auto px-4 pt-10">
        <div className="flex items-start gap-3 bg-warm/[0.06] border border-warm/25 rounded-2xl p-4 text-sm">
          <ShieldCheck className="w-5 h-5 text-warm shrink-0 mt-0.5" />
          <p className="text-text">
            <b>¿Entraste a la universidad con 16 o 17 años?</b>{' '}
            <span className="text-text-light">
              Claude, nuestra recomendación, pide 18: mientras tanto úsalo con un adulto o empieza con ChatGPT, Gemini o Perplexity, que permiten desde 13 con permiso de tu familia.
            </span>
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-6">
        <ClaudePick audience="universidad" />
      </div>

      <Section id="u-carrera">
        <SectionHead id="u-carrera" kicker="Tu carrera" title="¿Qué cambia en tu profesión y qué sigue siendo tuyo?">
          Escoge tu área. Ninguna se salva de la IA y en ninguna la IA reemplaza el criterio de quien responde por el resultado.
        </SectionHead>
        <div className="flex flex-wrap gap-2 mb-6">
          {CAREERS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCareerId(item.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                careerId === item.id ? 'bg-primary text-white border-primary shadow-md' : 'bg-surface text-text border-border hover:border-primary/30'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-5">
          <div className="space-y-3">
            <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-warm">Lo que la IA ya hace</span>
              <p className="text-text mt-2 leading-relaxed">{career.changes}</p>
            </div>
            <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-accent">Lo que sigue siendo tuyo</span>
              <p className="text-text mt-2 leading-relaxed">{career.human}</p>
            </div>
            <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-primary">Practica así</span>
              <p className="text-text mt-2 leading-relaxed">{career.practice}</p>
              <div className="mt-4">
                <ToolChips ids={career.tools} />
              </div>
            </div>
          </div>
          <div className="bg-primary/[0.04] border border-primary/15 rounded-2xl p-6 flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-primary mb-3">Prompt para tu área</span>
            <p className="font-mono text-sm text-text leading-relaxed bg-surface border border-border rounded-xl p-4 flex-1">{career.prompt}</p>
            <PromptActions text={career.prompt} />
          </div>
        </div>
      </Section>

      <Section id="u-estudio" tint>
        <SectionHead id="u-estudio" kicker="Sistema de estudio" title="Seis técnicas con evidencia, con la IA de entrenadora" color="text-warm">
          No le pidas resúmenes: pídele que te haga trabajar. Estas técnicas funcionan con o sin IA; la IA las vuelve más fáciles de sostener.
        </SectionHead>
        <PromptGrid items={STUDY_SYSTEM} />
      </Section>

      <Section id="u-cerebro">
        <SectionHead id="u-cerebro" kicker="Tu cerebro" title="Si la IA piensa por ti, tú dejas de practicar" color="text-secondary" />
        <div className="grid md:grid-cols-3 gap-4">
          {BRAIN.map((item, i) => (
            <div key={item.title} className={`rounded-2xl p-6 border ${i === 1 ? 'bg-text text-bg border-text' : 'bg-surface border-border shadow-sm'}`}>
              <Brain className={`w-5 h-5 ${i === 1 ? 'text-bg' : 'text-secondary'}`} />
              <h3 className="font-display font-bold text-xl mt-3">{item.title}</h3>
              <p className={`leading-relaxed mt-2 text-sm ${i === 1 ? 'text-bg/80' : 'text-text-light'}`}>{item.body}</p>
              {item.source && (
                <a href={item.source} target="_blank" rel="noopener noreferrer" className="inline-block text-xs font-semibold text-secondary mt-3">
                  Leer el estudio
                </a>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section id="u-integridad" tint>
        <SectionHead id="u-integridad" kicker="Integridad académica" title="Antes de usarla, revisa tres cosas" color="text-accent" />
        <div className="grid md:grid-cols-3 gap-3 mb-12">
          {INTEGRITY_CHECKS.map((item, i) => (
            <div key={item.title} className="bg-surface border border-border rounded-2xl p-5 shadow-sm">
              <span className="w-8 h-8 rounded-xl bg-accent/10 text-accent font-display font-extrabold flex items-center justify-center">{i + 1}</span>
              <h3 className="font-display font-bold text-text mt-3">{item.title}</h3>
              <p className="text-sm text-text-light leading-relaxed mt-1">{item.body}</p>
            </div>
          ))}
        </div>
        <h3 className="font-display font-bold text-2xl text-text mb-2 flex items-center gap-2">
          <Scale className="w-5 h-5 text-accent" /> Semáforo universitario
        </h3>
        <p className="text-text-light mb-4">Ocho situaciones del semestre. ¿Qué harías?</p>
        <Semaphore items={UNI_SEMAPHORE} />
      </Section>

      <Section id="u-citar">
        <SectionHead id="u-citar" kicker="Citar la IA" title="Referencia y declaración en un minuto">
          Si la usaste, dilo con precisión: qué herramienta, cuándo y para qué. Ocultarlo es lo que convierte un buen uso en una falta.
        </SectionHead>
        <CitationBuilder />
      </Section>

      <Section id="u-investigar" tint>
        <SectionHead id="u-investigar" kicker="Investigar" title="Cinco momentos, cinco tipos de herramienta">
          Los asistentes generales inventan referencias. Para buscar literatura usa herramientas que muestran artículos reales, y abre cada uno.
        </SectionHead>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {RESEARCH_STEPS.map((step, i) => (
            <div key={step.title} className="bg-surface border border-border rounded-2xl p-5 shadow-sm flex flex-col">
              <span className="font-mono text-xs text-primary font-semibold">0{i + 1}</span>
              <h3 className="font-display font-bold text-lg text-text mt-1">{step.title}</h3>
              <p className="text-sm text-text-light leading-relaxed mt-1 mb-4 flex-1">{step.body}</p>
              <ToolChips ids={step.tools} />
            </div>
          ))}
        </div>
        <Link
          to="/investigadores"
          className="mt-6 group flex items-center justify-between gap-4 bg-warm/[0.06] border border-warm/25 rounded-2xl p-5 no-underline hover:shadow-md transition-all"
        >
          <span className="flex items-center gap-3">
            <FlaskConical className="w-6 h-6 text-warm" />
            <span>
              <span className="block font-display font-bold text-text">¿Trabajo de grado o semillero?</span>
              <span className="block text-sm text-text-light">El capítulo para jóvenes investigadores tiene políticas editoriales, kit gratuito y generador de declaración.</span>
            </span>
          </span>
          <ArrowRight className="w-5 h-5 text-warm group-hover:translate-x-1 transition-transform shrink-0" />
        </Link>
      </Section>

      <div className="max-w-6xl mx-auto px-4 pb-4">
        <AgeTable />
      </div>

      <Section id="u-datos">
        <SectionHead id="u-datos" kicker="Datos ajenos" title="Lo que no es tuyo no se sube" color="text-secondary">
          En la universidad y en las prácticas vas a manejar información de otras personas. Una herramienta abierta no es un lugar seguro para ella.
        </SectionHead>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {DATA_RULES.map((item) => (
            <div key={item.title} className="bg-surface border border-border rounded-2xl p-5 shadow-sm">
              <Lock className="w-5 h-5 text-secondary" />
              <h3 className="font-display font-bold text-text mt-3">{item.title}</h3>
              <p className="text-sm text-text-light leading-relaxed mt-1">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="u-empleo" tint>
        <SectionHead id="u-empleo" kicker="Primer empleo" title="De la universidad a tu primer trabajo">
          Las empresas no buscan a quien sepa usar una herramienta. Buscan a quien sepa qué pedirle, cómo revisarla y cuándo no usarla.
        </SectionHead>
        <div className="flex flex-wrap gap-2 mb-8">
          {SKILLS.map((skill) => (
            <span key={skill} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-surface border border-border text-sm font-semibold text-text">
              <Check className="w-4 h-4 text-accent" /> {skill}
            </span>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {JOB.map((item) => (
            <article key={item.title} className="bg-surface border border-border rounded-2xl p-5 shadow-sm flex flex-col">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-primary" />
                <h3 className="font-display font-bold text-text">{item.title}</h3>
              </div>
              <p className="text-sm text-text-light mt-1 mb-3">{item.body}</p>
              <p className="font-mono text-[13px] text-text-light leading-relaxed flex-1">{item.text}</p>
              <PromptActions text={item.text} />
            </article>
          ))}
        </div>
      </Section>

      <Section id="u-proyecto">
        <SectionHead id="u-proyecto" kicker="Proyecto del semestre" title="Construye algo que puedas mostrar">
          Escoge uno, termínalo y súbelo a tu portafolio. Lo que hiciste dice más que lo que estudiaste.
        </SectionHead>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SEMESTER_PROJECTS.map((item, i) => (
            <div key={item.title} className="bg-surface border border-border rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between">
                {i % 2 === 0 ? <Rocket className="w-5 h-5 text-warm" /> : <FileText className="w-5 h-5 text-primary" />}
                <span className="font-display font-extrabold text-2xl text-text/10">0{i + 1}</span>
              </div>
              <h3 className="font-display font-bold text-text mt-3">{item.title}</h3>
              <p className="text-sm text-text-light leading-relaxed mt-1">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
