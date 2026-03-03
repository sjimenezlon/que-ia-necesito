import { useState, useRef } from 'react'
import {
  Palette, Megaphone, Newspaper, Code, Users, Lightbulb, PenTool,
  GraduationCap, TrendingUp, Heart, Database, Sparkles
} from 'lucide-react'
import DomainSelector from '../components/prompt-refiner/DomainSelector'
import ContextRoleStep from '../components/prompt-refiner/ContextRoleStep'
import TaskStep from '../components/prompt-refiner/TaskStep'
import ToneStyleStep from '../components/prompt-refiner/ToneStyleStep'
import FormatStep from '../components/prompt-refiner/FormatStep'
import ConstraintsStep from '../components/prompt-refiner/ConstraintsStep'
import GeneratedPrompt from '../components/prompt-refiner/GeneratedPrompt'

const DOMAINS = [
  { id: 'artes', label: 'Artes', icon: Palette, desc: 'Creación artística, visual, musical, literaria y escénica.', color: 'bg-red-50 text-red-600 border-red-200' },
  { id: 'marketing', label: 'Marketing', icon: Megaphone, desc: 'Estrategia, contenido, campañas, branding y analítica.', color: 'bg-amber-50 text-amber-600 border-amber-200' },
  { id: 'periodismo', label: 'Periodismo y Comunicación', icon: Newspaper, desc: 'Redacción, investigación, narrativa y medios.', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
  { id: 'software', label: 'Desarrollo de Software', icon: Code, desc: 'Código, arquitectura, APIs, automatización y debugging.', color: 'bg-blue-50 text-blue-600 border-blue-200' },
  { id: 'talento', label: 'Gestión de Talento Humano', icon: Users, desc: 'Reclutamiento, evaluación, cultura y desarrollo organizacional.', color: 'bg-purple-50 text-purple-600 border-purple-200' },
  { id: 'creatividad', label: 'Creatividad', icon: Lightbulb, desc: 'Ideación, brainstorming, innovación y pensamiento lateral.', color: 'bg-orange-50 text-orange-600 border-orange-200' },
  { id: 'diseno', label: 'Diseño', icon: PenTool, desc: 'UX/UI, gráfico, industrial, de servicios y experiencia.', color: 'bg-pink-50 text-pink-600 border-pink-200' },
  { id: 'educacion', label: 'Educación y Academia', icon: GraduationCap, desc: 'Planes de clase, rúbricas, investigación y divulgación.', color: 'bg-teal-50 text-teal-600 border-teal-200' },
  { id: 'ventas', label: 'Ventas y Negocios', icon: TrendingUp, desc: 'Pitch, estrategia comercial, pricing y análisis de mercado.', color: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
  { id: 'salud', label: 'Salud y Bienestar', icon: Heart, desc: 'Divulgación médica, nutrición, bienestar y comunicación en salud.', color: 'bg-rose-50 text-rose-600 border-rose-200' },
  { id: 'datos', label: 'Ciencia de Datos', icon: Database, desc: 'ML aplicado, visualización, dashboards y análisis estadístico.', color: 'bg-cyan-50 text-cyan-600 border-cyan-200' },
]

const DOMAIN_DATA = {
  artes: {
    roleHint: 'Ej: "Eres un curador de arte contemporáneo con experiencia en bienales internacionales y arte digital"',
    taskHint: 'Ej: "Crea un concepto curatorial para una exposición", "Escribe una sinopsis de obra"',
    roleTemplates: [
      { title: 'Director de arte', desc: 'Experto en dirección visual y conceptual para proyectos artísticos.' },
      { title: 'Curador de exposiciones', desc: 'Especialista en selección y narrativa curatorial.' },
      { title: 'Crítico de arte', desc: 'Analista de tendencias, movimientos y obras artísticas.' },
      { title: 'Compositor / Músico', desc: 'Creador musical con dominio teórico y técnico.' },
    ]
  },
  marketing: {
    roleHint: 'Ej: "Eres un estratega de growth marketing con experiencia en SaaS B2B para mercados emergentes"',
    taskHint: 'Ej: "Diseña una estrategia de contenido para lanzamiento", "Escribe copy para landing page"',
    roleTemplates: [
      { title: 'Growth marketer', desc: 'Especialista en adquisición, retención y métricas de crecimiento.' },
      { title: 'Copywriter senior', desc: 'Experto en textos persuasivos para conversión.' },
      { title: 'Brand strategist', desc: 'Diseñador de identidad y posicionamiento de marca.' },
      { title: 'Community manager', desc: 'Gestor de comunidades y contenido en redes sociales.' },
    ]
  },
  periodismo: {
    roleHint: 'Ej: "Eres un periodista investigativo con 10 años de experiencia en temas de tecnología y política pública"',
    taskHint: 'Ej: "Redacta una crónica", "Estructura un reportaje investigativo"',
    roleTemplates: [
      { title: 'Periodista investigativo', desc: 'Reportero de investigación profunda con verificación de datos.' },
      { title: 'Editor de contenidos', desc: 'Experto en línea editorial y calidad narrativa.' },
      { title: 'Comunicador corporativo', desc: 'Estratega de comunicación interna y externa.' },
      { title: 'Cronista narrativo', desc: 'Escritor de no ficción con estilo literario.' },
    ]
  },
  software: {
    roleHint: 'Ej: "Eres un arquitecto de software senior especializado en sistemas distribuidos y microservicios en la nube"',
    taskHint: 'Ej: "Diseña la arquitectura de una API REST", "Escribe tests unitarios para este módulo"',
    roleTemplates: [
      { title: 'Full-stack developer', desc: 'Desarrollador completo con dominio de frontend y backend.' },
      { title: 'Arquitecto de software', desc: 'Diseñador de sistemas escalables y mantenibles.' },
      { title: 'DevOps engineer', desc: 'Especialista en CI/CD, infraestructura y automatización.' },
      { title: 'Data engineer', desc: 'Experto en pipelines de datos, ETL y bases de datos.' },
    ]
  },
  talento: {
    roleHint: 'Ej: "Eres un director de talento humano con experiencia en transformación cultural y gestión del cambio"',
    taskHint: 'Ej: "Diseña un plan de onboarding", "Crea una rúbrica de evaluación de desempeño"',
    roleTemplates: [
      { title: 'HR Business Partner', desc: 'Socio estratégico de negocio para gestión de personas.' },
      { title: 'Talent acquisition lead', desc: 'Especialista en reclutamiento y employer branding.' },
      { title: 'Learning & Development', desc: 'Diseñador de programas de formación y desarrollo.' },
      { title: 'Psicólogo organizacional', desc: 'Experto en bienestar, clima y cultura organizacional.' },
    ]
  },
  creatividad: {
    roleHint: 'Ej: "Eres un facilitador de innovación con experiencia en Design Thinking y metodologías ágiles"',
    taskHint: 'Ej: "Genera 20 ideas para resolver este problema", "Diseña un taller de ideación"',
    roleTemplates: [
      { title: 'Innovation facilitator', desc: 'Conductor de procesos creativos y sesiones de ideación.' },
      { title: 'Creative director', desc: 'Líder de conceptos creativos y visión estratégica.' },
      { title: 'Design thinker', desc: 'Practicante de metodologías centradas en el usuario.' },
      { title: 'Futurista / Trend scout', desc: 'Identificador de tendencias emergentes y escenarios futuros.' },
    ]
  },
  diseno: {
    roleHint: 'Ej: "Eres un diseñador UX/UI senior con experiencia en productos fintech para mercados latinos"',
    taskHint: 'Ej: "Diseña el flujo de onboarding de una app", "Crea un sistema de diseño"',
    roleTemplates: [
      { title: 'UX/UI Designer', desc: 'Diseñador de experiencias e interfaces digitales.' },
      { title: 'Diseñador gráfico', desc: 'Creador visual para marcas, piezas y materiales.' },
      { title: 'Service designer', desc: 'Diseñador de servicios y experiencias multicanal.' },
      { title: 'Motion designer', desc: 'Especialista en animación y narrativa visual en movimiento.' },
    ]
  },
  educacion: {
    roleHint: 'Ej: "Eres un profesor universitario de física con 15 años de experiencia en educación STEM"',
    taskHint: 'Ej: "Crea un plan de clase", "Diseña una rúbrica de evaluación"',
    roleTemplates: [
      { title: 'Profesor / Tutor', desc: 'Docente con experiencia en enseñanza y evaluación.' },
      { title: 'Diseñador curricular', desc: 'Especialista en diseño de programas y planes de estudio.' },
      { title: 'Investigador académico', desc: 'Experto en metodología de investigación y publicación.' },
      { title: 'Divulgador científico', desc: 'Comunicador de ciencia para audiencias no especializadas.' },
    ]
  },
  ventas: {
    roleHint: 'Ej: "Eres un director comercial con experiencia en ventas B2B para empresas de tecnología en LATAM"',
    taskHint: 'Ej: "Crea un pitch de ventas", "Diseña una estrategia de pricing"',
    roleTemplates: [
      { title: 'Estratega comercial', desc: 'Planificador de estrategias de venta y crecimiento.' },
      { title: 'Closer de ventas', desc: 'Especialista en cierre de negocios y negociación.' },
      { title: 'Analista de mercado', desc: 'Investigador de tendencias, competencia y oportunidades.' },
      { title: 'Pitch designer', desc: 'Creador de presentaciones de venta persuasivas.' },
    ]
  },
  salud: {
    roleHint: 'Ej: "Eres un médico divulgador con experiencia en comunicación de salud pública para audiencias no especializadas"',
    taskHint: 'Ej: "Redacta una guía de prevención", "Crea contenido educativo sobre nutrición"',
    roleTemplates: [
      { title: 'Divulgador de salud', desc: 'Comunicador médico para audiencias generales.' },
      { title: 'Nutricionista / Coach', desc: 'Especialista en alimentación y hábitos saludables.' },
      { title: 'Psicólogo / Terapeuta', desc: 'Profesional de salud mental y bienestar emocional.' },
      { title: 'Comunicador médico', desc: 'Redactor de contenido científico-médico accesible.' },
    ]
  },
  datos: {
    roleHint: 'Ej: "Eres un data scientist senior con experiencia en ML aplicado y visualización de datos para stakeholders no técnicos"',
    taskHint: 'Ej: "Analiza este dataset y encuentra patrones", "Crea un dashboard ejecutivo"',
    roleTemplates: [
      { title: 'Data analyst', desc: 'Analista de datos con enfoque en insights de negocio.' },
      { title: 'ML engineer', desc: 'Ingeniero de machine learning y modelos predictivos.' },
      { title: 'Visualizador de datos', desc: 'Especialista en dashboards y narrativa visual de datos.' },
      { title: 'BI consultant', desc: 'Consultor de inteligencia de negocio y estrategia de datos.' },
    ]
  }
}

const STEPS = [
  { num: 1, letter: 'C', label: 'Contexto', short: 'Dominio' },
  { num: 2, letter: 'O', label: 'Orientación', short: 'Rol y audiencia' },
  { num: 3, letter: 'R', label: 'Requerimiento', short: 'La tarea concreta' },
  { num: 4, letter: 'T', label: 'Tono y estilo', short: 'Voz del resultado' },
  { num: 5, letter: 'E', label: 'Estructura', short: 'Formato de salida' },
  { num: 6, letter: 'F', label: 'Filtros', short: 'Restricciones y criterios' },
]

function MethodSidebar({ currentStep }) {
  return (
    <aside className="hidden lg:block bg-surface rounded-2xl border border-border p-5 sticky top-24">
      <h3 className="font-bold text-text text-sm mb-4">Metodología CORTE-F</h3>
      <div className="space-y-2">
        {STEPS.map((s, i) => (
          <div
            key={s.letter}
            className={`flex items-start gap-3 p-2.5 rounded-lg transition-colors ${
              i === currentStep ? 'bg-primary/5' : ''
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                i < currentStep
                  ? 'bg-accent text-white'
                  : i === currentStep
                  ? 'bg-primary text-white'
                  : 'bg-text/5 text-text-lighter'
              }`}
            >
              {i < currentStep ? '✓' : s.num}
            </div>
            <div>
              <p className={`text-xs font-medium ${i <= currentStep ? 'text-text' : 'text-text-lighter'}`}>
                <strong>{s.letter}</strong>
                {s.label.slice(1)}
              </p>
              <p className="text-[11px] text-text-lighter">{s.short}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default function PromptRefiner() {
  const [step, setStep] = useState(0)
  const [domain, setDomain] = useState(null)
  const [role, setRole] = useState('')
  const [audience, setAudience] = useState('')
  const [context, setContext] = useState('')
  const [task, setTask] = useState('')
  const [subtasks, setSubtasks] = useState('')
  const [example, setExample] = useState('')
  const [tones, setTones] = useState([])
  const [lang, setLang] = useState('español')
  const [complexity, setComplexity] = useState('intermedio')
  const [styleRef, setStyleRef] = useState('')
  const [formats, setFormats] = useState([])
  const [length, setLength] = useState('moderada (300-500 palabras)')
  const [sections, setSections] = useState('')
  const [avoid, setAvoid] = useState('')
  const [quality, setQuality] = useState([])
  const [aiTool, setAiTool] = useState('universal')
  const [generated, setGenerated] = useState(null)
  const outputRef = useRef(null)

  const toggleList = (list, setList, item) => {
    setList(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item])
  }

  const domainInfo = domain ? DOMAINS.find(d => d.id === domain) : null
  const domainData = domain ? DOMAIN_DATA[domain] : null

  const next = () => {
    if (step < 5) setStep(step + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const prev = () => {
    if (step > 0) setStep(step - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const generatePrompt = () => {
    let prompt = ''

    if (role) prompt += `## ROL\n${role}\n\n`

    let ctxBlock = `## CONTEXTO\nDominio de trabajo: ${domainInfo?.label || domain}.\n`
    if (audience) ctxBlock += `Audiencia objetivo: ${audience}.\n`
    if (context) ctxBlock += `${context}\n`
    prompt += ctxBlock + '\n'

    prompt += `## TAREA\n${task || '[Describe tu tarea aquí]'}\n`
    if (subtasks) prompt += `\nPasos esperados:\n${subtasks}\n`
    prompt += '\n'

    if (tones.length || styleRef || complexity) {
      prompt += `## TONO Y ESTILO\n`
      if (tones.length) prompt += `Tono: ${tones.join(', ')}.\n`
      prompt += `Nivel de complejidad: ${complexity}.\n`
      prompt += `Idioma: ${lang}.\n`
      if (styleRef) prompt += `Referencia de estilo: ${styleRef}.\n`
      prompt += '\n'
    }

    if (formats.length || length || sections) {
      prompt += `## FORMATO DE SALIDA\n`
      if (formats.length) prompt += `Formato: ${formats.join(', ')}.\n`
      prompt += `Extensión: ${length}.\n`
      if (sections) prompt += `Estructura interna: ${sections}.\n`
      prompt += '\n'
    }

    if (avoid || quality.length) {
      prompt += `## RESTRICCIONES Y CALIDAD\n`
      if (avoid) prompt += `Evitar: ${avoid}.\n`
      if (quality.length) prompt += `Priorizar: ${quality.join(', ')}.\n`
      prompt += '\n'
    }

    if (example) prompt += `## EJEMPLO O REFERENCIA\n${example}\n\n`

    if (aiTool !== 'universal') {
      const tips = {
        claude: 'Utiliza tu capacidad de razonamiento extendido. Si la tarea es compleja, piensa paso a paso antes de responder. Estructura tu respuesta con claridad.',
        chatgpt: 'Usa tu mejor juicio para equilibrar creatividad y precisión. Si necesitas hacer suposiciones, indícalas explícitamente.',
        gemini: 'Aprovecha tu capacidad multimodal y de búsqueda si es relevante. Sé preciso y estructura bien la respuesta.',
        perplexity: 'Incluye fuentes y citas donde sea relevante. Prioriza la información más actual y verificable.',
        lovable: 'Genera código funcional, limpio y bien comentado. Usa las mejores prácticas del framework correspondiente. Asegúrate de que el diseño sea responsive y accesible.',
        midjourney: 'Interpreta esta descripción como un prompt visual. Prioriza la composición, la iluminación y el estilo artístico solicitado.'
      }
      prompt += `## NOTA PARA LA IA\n${tips[aiTool] || ''}\n`
    }

    setGenerated(prompt.trim())
    setTimeout(() => {
      outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const resetAll = () => {
    setStep(0)
    setDomain(null)
    setRole('')
    setAudience('')
    setContext('')
    setTask('')
    setSubtasks('')
    setExample('')
    setTones([])
    setLang('español')
    setComplexity('intermedio')
    setStyleRef('')
    setFormats([])
    setLength('moderada (300-500 palabras)')
    setSections('')
    setAvoid('')
    setQuality([])
    setAiTool('universal')
    setGenerated(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          Metodología CORTE-F
        </div>
        <h1 className="text-2xl md:text-4xl font-bold text-text mb-3">
          Refinador de prompts
        </h1>
        <p className="text-text-light max-w-2xl mx-auto">
          Construye instrucciones precisas y efectivas para cualquier IA en 6 pasos simples.
          Mejor prompt = mejor resultado.
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 mb-8">
        {STEPS.map((s, i) => (
          <div
            key={s.letter}
            className={`h-1.5 rounded-full transition-all duration-300 overflow-hidden ${
              i === step ? 'w-12' : 'w-8'
            }`}
            style={{
              background: i <= step
                ? 'linear-gradient(90deg, #4338CA, #E11D48)'
                : 'var(--color-border)',
            }}
          />
        ))}
        <span className="text-xs text-text-lighter ml-2">
          Paso {step + 1} de 6
        </span>
      </div>

      <div className="flex gap-6">
        {step > 0 && <MethodSidebar currentStep={step} />}

        <div className="flex-1 min-w-0">
          {step === 0 && (
            <DomainSelector
              domains={DOMAINS}
              domain={domain}
              setDomain={setDomain}
              canNext={!!domain}
              onNext={next}
            />
          )}

          {step === 1 && (
            <ContextRoleStep
              role={role} setRole={setRole}
              audience={audience} setAudience={setAudience}
              context={context} setContext={setContext}
              domainData={domainData}
              onNext={next} onPrev={prev}
            />
          )}

          {step === 2 && (
            <TaskStep
              task={task} setTask={setTask}
              subtasks={subtasks} setSubtasks={setSubtasks}
              example={example} setExample={setExample}
              domainData={domainData}
              onNext={next} onPrev={prev}
            />
          )}

          {step === 3 && (
            <ToneStyleStep
              tones={tones} toggleTone={(t) => toggleList(tones, setTones, t)}
              lang={lang} setLang={setLang}
              complexity={complexity} setComplexity={setComplexity}
              styleRef={styleRef} setStyleRef={setStyleRef}
              onNext={next} onPrev={prev}
            />
          )}

          {step === 4 && (
            <FormatStep
              formats={formats} toggleFormat={(f) => toggleList(formats, setFormats, f)}
              length={length} setLength={setLength}
              sections={sections} setSections={setSections}
              onNext={next} onPrev={prev}
            />
          )}

          {step === 5 && (
            <>
              <ConstraintsStep
                avoid={avoid} setAvoid={setAvoid}
                quality={quality} toggleQuality={(q) => toggleList(quality, setQuality, q)}
                aiTool={aiTool} setAiTool={setAiTool}
                onPrev={prev} onGenerate={generatePrompt}
              />
              <GeneratedPrompt
                generated={generated}
                onReset={resetAll}
                outputRef={outputRef}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
