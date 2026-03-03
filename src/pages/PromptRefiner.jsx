import { useState, useRef } from 'react'
import {
  Palette, Megaphone, Newspaper, Code, Users, Lightbulb, PenTool,
  GraduationCap, TrendingUp, Heart, Database,
  ChevronRight, ChevronLeft, Copy, Check, RotateCcw, Sparkles
} from 'lucide-react'

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

const TONE_OPTIONS = ['Profesional', 'Conversacional', 'Académico', 'Persuasivo', 'Técnico', 'Inspirador', 'Directo', 'Humorístico', 'Poético', 'Periodístico', 'Minimalista', 'Provocador']
const FORMAT_OPTIONS = ['Texto corrido', 'Lista con viñetas', 'Tabla comparativa', 'Código fuente', 'JSON / Datos estructurados', 'Paso a paso', 'Presentación / Slides', 'Documento formal', 'Guion / Script', 'Email / Mensaje', 'Post para redes', 'Infografía textual']
const QUALITY_OPTIONS = ['Originalidad', 'Precisión factual', 'Coherencia lógica', 'Aplicabilidad práctica', 'Creatividad', 'Profundidad analítica', 'Claridad', 'Concisión']

const STEPS = [
  { num: 1, letter: 'C', label: 'Contexto', short: 'Dominio' },
  { num: 2, letter: 'O', label: 'Orientación', short: 'Rol y audiencia' },
  { num: 3, letter: 'R', label: 'Requerimiento', short: 'La tarea concreta' },
  { num: 4, letter: 'T', label: 'Tono y estilo', short: 'Voz del resultado' },
  { num: 5, letter: 'E', label: 'Estructura', short: 'Formato de salida' },
  { num: 6, letter: 'F', label: 'Filtros', short: 'Restricciones y criterios' },
]

function Chip({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium border cursor-pointer transition-colors ${
        selected
          ? 'bg-primary/10 border-primary text-primary'
          : 'bg-white border-border text-text-light hover:border-primary/50'
      }`}
    >
      {label}
    </button>
  )
}

function MethodSidebar({ currentStep }) {
  return (
    <aside className="hidden lg:block bg-white rounded-2xl border border-border p-5 sticky top-24">
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
                  : 'bg-gray-100 text-text-lighter'
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
  const [copied, setCopied] = useState(false)
  const outputRef = useRef(null)

  const toggleList = (list, setList, item) => {
    setList(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item])
  }

  const domainInfo = domain ? DOMAINS.find(d => d.id === domain) : null
  const domainData = domain ? DOMAIN_DATA[domain] : null

  const canNext = step === 0 ? !!domain : true

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

  const copyPrompt = async () => {
    if (!generated) return
    await navigator.clipboard.writeText(generated)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
    setCopied(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
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

      {/* Step Progress Bar */}
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
                : '#e4e4e7',
            }}
          />
        ))}
        <span className="text-xs text-text-lighter ml-2">
          Paso {step + 1} de 6
        </span>
      </div>

      {/* Main content with sidebar */}
      <div className="flex gap-6">
        {step > 0 && <MethodSidebar currentStep={step} />}

        <div className="flex-1 min-w-0">
          {/* Step 0: Domain Selection */}
          {step === 0 && (
            <div>
              <div className="mb-6">
                <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Paso 1 — Dominio</p>
                <h2 className="text-xl font-bold text-text mb-1">¿En qué área vas a trabajar?</h2>
                <p className="text-sm text-text-light">Selecciona el dominio para personalizar la estructura del prompt.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {DOMAINS.map((d) => {
                  const Icon = d.icon
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setDomain(d.id)}
                      className={`text-left p-4 rounded-xl border-2 transition-all cursor-pointer bg-white ${
                        domain === d.id
                          ? 'border-primary shadow-sm'
                          : 'border-border hover:border-primary/30'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${d.color.split(' ').slice(0, 1).join(' ')}`}>
                        <Icon className={`w-5 h-5 ${d.color.split(' ')[1]}`} />
                      </div>
                      <p className="font-semibold text-text text-sm mb-1">{d.label}</p>
                      <p className="text-xs text-text-lighter leading-relaxed">{d.desc}</p>
                    </button>
                  )
                })}
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={next}
                  disabled={!canNext}
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-medium cursor-pointer hover:bg-primary/90 transition-colors border-none text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continuar <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 1: Context & Role */}
          {step === 1 && (
            <div>
              <div className="mb-6">
                <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Paso 2 — Contexto y Rol</p>
                <h2 className="text-xl font-bold text-text mb-1">Define el escenario</h2>
                <p className="text-sm text-text-light">Establece quién eres, para quién y en qué contexto se ejecutará la tarea.</p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-text mb-1">¿Qué rol debe asumir la IA?</label>
                  <p className="text-xs text-text-lighter italic mb-2">{domainData?.roleHint}</p>
                  <textarea
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    rows={3}
                    placeholder="Describe el rol, la experiencia y la especialidad..."
                    className="w-full px-4 py-3 rounded-xl border border-border text-sm text-text placeholder:text-text-lighter focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-y"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1">¿Quién es la audiencia o destinatario?</label>
                  <textarea
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    rows={2}
                    placeholder="Ej: Emprendedores de 25-35 años en Latinoamérica que están lanzando su primer producto digital..."
                    className="w-full px-4 py-3 rounded-xl border border-border text-sm text-text placeholder:text-text-lighter focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-y"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1">Contexto adicional relevante</label>
                  <textarea
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    rows={2}
                    placeholder="Ej: Estamos en fase de lanzamiento, el presupuesto es limitado, la marca aún no es conocida..."
                    className="w-full px-4 py-3 rounded-xl border border-border text-sm text-text placeholder:text-text-lighter focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-y"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">Plantillas rápidas de rol</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {domainData?.roleTemplates.map((t) => (
                      <button
                        key={t.title}
                        type="button"
                        onClick={() => setRole(`Eres un ${t.title.toLowerCase()}. ${t.desc}`)}
                        className="text-left p-3 rounded-lg border border-border bg-white hover:border-primary/30 hover:bg-primary/5 transition-colors cursor-pointer"
                      >
                        <p className="text-sm font-medium text-text">{t.title}</p>
                        <p className="text-xs text-text-lighter">{t.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button onClick={prev} className="inline-flex items-center gap-1 text-text-light hover:text-text text-sm cursor-pointer bg-transparent border-none font-medium">
                  <ChevronLeft className="w-4 h-4" /> Atrás
                </button>
                <button onClick={next} className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-medium cursor-pointer hover:bg-primary/90 transition-colors border-none text-sm">
                  Continuar <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Task */}
          {step === 2 && (
            <div>
              <div className="mb-6">
                <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Paso 3 — Requerimiento</p>
                <h2 className="text-xl font-bold text-text mb-1">¿Qué necesitas que haga la IA?</h2>
                <p className="text-sm text-text-light">Describe la tarea concreta. Sé específico: los verbos de acción marcan la diferencia.</p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Tarea principal</label>
                  <p className="text-xs text-text-lighter italic mb-2">{domainData?.taskHint}</p>
                  <textarea
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    rows={4}
                    placeholder="Describe exactamente lo que necesitas que la IA produzca..."
                    className="w-full px-4 py-3 rounded-xl border border-border text-sm text-text placeholder:text-text-lighter focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-y"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1">Subtareas o pasos esperados <span className="text-text-lighter font-normal">(opcional)</span></label>
                  <textarea
                    value={subtasks}
                    onChange={(e) => setSubtasks(e.target.value)}
                    rows={3}
                    placeholder={"1. Primero investigar...\n2. Luego comparar...\n3. Finalmente producir..."}
                    className="w-full px-4 py-3 rounded-xl border border-border text-sm text-text placeholder:text-text-lighter focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-y"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1">Ejemplo de resultado deseado <span className="text-text-lighter font-normal">(opcional)</span></label>
                  <textarea
                    value={example}
                    onChange={(e) => setExample(e.target.value)}
                    rows={3}
                    placeholder="Ej: Similar a como lo haría The Economist en sus análisis de tendencias tecnológicas..."
                    className="w-full px-4 py-3 rounded-xl border border-border text-sm text-text placeholder:text-text-lighter focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-y"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button onClick={prev} className="inline-flex items-center gap-1 text-text-light hover:text-text text-sm cursor-pointer bg-transparent border-none font-medium">
                  <ChevronLeft className="w-4 h-4" /> Atrás
                </button>
                <button onClick={next} className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-medium cursor-pointer hover:bg-primary/90 transition-colors border-none text-sm">
                  Continuar <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Tone & Style */}
          {step === 3 && (
            <div>
              <div className="mb-6">
                <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Paso 4 — Tono y Estilo</p>
                <h2 className="text-xl font-bold text-text mb-1">¿Cómo debe sonar el resultado?</h2>
                <p className="text-sm text-text-light">Define la voz, el registro y la personalidad del output.</p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Tono general</label>
                  <div className="flex flex-wrap gap-2">
                    {TONE_OPTIONS.map((t) => (
                      <Chip key={t} label={t} selected={tones.includes(t)} onClick={() => toggleList(tones, setTones, t)} />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1">Idioma de salida</label>
                  <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border text-sm text-text bg-white focus:outline-none focus:border-primary cursor-pointer appearance-none"
                  >
                    <option value="español">Español</option>
                    <option value="inglés">Inglés</option>
                    <option value="portugués">Portugués</option>
                    <option value="francés">Francés</option>
                    <option value="bilingüe español-inglés">Bilingüe (Español-Inglés)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1">Nivel de complejidad</label>
                  <select
                    value={complexity}
                    onChange={(e) => setComplexity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border text-sm text-text bg-white focus:outline-none focus:border-primary cursor-pointer appearance-none"
                  >
                    <option value="básico">Básico — Para audiencias generales</option>
                    <option value="intermedio">Intermedio — Conocimiento previo del tema</option>
                    <option value="avanzado">Avanzado — Público experto o especializado</option>
                    <option value="técnico">Técnico — Lenguaje de especialista</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1">Referencia de estilo <span className="text-text-lighter font-normal">(opcional)</span></label>
                  <input
                    type="text"
                    value={styleRef}
                    onChange={(e) => setStyleRef(e.target.value)}
                    placeholder="Ej: El estilo editorial de The New York Times, la comunicación de Apple..."
                    className="w-full px-4 py-3 rounded-xl border border-border text-sm text-text placeholder:text-text-lighter focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button onClick={prev} className="inline-flex items-center gap-1 text-text-light hover:text-text text-sm cursor-pointer bg-transparent border-none font-medium">
                  <ChevronLeft className="w-4 h-4" /> Atrás
                </button>
                <button onClick={next} className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-medium cursor-pointer hover:bg-primary/90 transition-colors border-none text-sm">
                  Continuar <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Format */}
          {step === 4 && (
            <div>
              <div className="mb-6">
                <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Paso 5 — Estructura</p>
                <h2 className="text-xl font-bold text-text mb-1">¿Qué forma debe tener el resultado?</h2>
                <p className="text-sm text-text-light">Especifica el formato, la extensión y la organización del output.</p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Formato de salida</label>
                  <div className="flex flex-wrap gap-2">
                    {FORMAT_OPTIONS.map((f) => (
                      <Chip key={f} label={f} selected={formats.includes(f)} onClick={() => toggleList(formats, setFormats, f)} />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1">Extensión aproximada</label>
                  <select
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border text-sm text-text bg-white focus:outline-none focus:border-primary cursor-pointer appearance-none"
                  >
                    <option value="breve (máximo 150 palabras)">Breve — Máximo 150 palabras</option>
                    <option value="moderada (300-500 palabras)">Moderada — 300 a 500 palabras</option>
                    <option value="extensa (800-1500 palabras)">Extensa — 800 a 1.500 palabras</option>
                    <option value="muy extensa (más de 1500 palabras)">Muy extensa — Más de 1.500 palabras</option>
                    <option value="la que sea necesaria para cubrir el tema">Flexible — Lo que sea necesario</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1">Secciones o estructura interna <span className="text-text-lighter font-normal">(opcional)</span></label>
                  <textarea
                    value={sections}
                    onChange={(e) => setSections(e.target.value)}
                    rows={3}
                    placeholder="Ej: Introducción, análisis de mercado, recomendaciones, conclusión con call-to-action..."
                    className="w-full px-4 py-3 rounded-xl border border-border text-sm text-text placeholder:text-text-lighter focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-y"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button onClick={prev} className="inline-flex items-center gap-1 text-text-light hover:text-text text-sm cursor-pointer bg-transparent border-none font-medium">
                  <ChevronLeft className="w-4 h-4" /> Atrás
                </button>
                <button onClick={next} className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-medium cursor-pointer hover:bg-primary/90 transition-colors border-none text-sm">
                  Continuar <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Constraints & Generate */}
          {step === 5 && (
            <div>
              <div className="mb-6">
                <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Paso 6 — Filtros y Resultado</p>
                <h2 className="text-xl font-bold text-text mb-1">Restricciones y generación final</h2>
                <p className="text-sm text-text-light">Agrega lo que la IA debe evitar, criterios de calidad y genera tu prompt refinado.</p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-text mb-1">¿Qué debe EVITAR la IA?</label>
                  <textarea
                    value={avoid}
                    onChange={(e) => setAvoid(e.target.value)}
                    rows={3}
                    placeholder="Ej: Evitar jerga técnica innecesaria, no usar clichés de marketing, no inventar datos estadísticos..."
                    className="w-full px-4 py-3 rounded-xl border border-border text-sm text-text placeholder:text-text-lighter focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-y"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">Criterios de calidad</label>
                  <div className="flex flex-wrap gap-2">
                    {QUALITY_OPTIONS.map((q) => (
                      <Chip key={q} label={q} selected={quality.includes(q)} onClick={() => toggleList(quality, setQuality, q)} />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1">¿Para qué herramienta de IA es este prompt?</label>
                  <select
                    value={aiTool}
                    onChange={(e) => setAiTool(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border text-sm text-text bg-white focus:outline-none focus:border-primary cursor-pointer appearance-none"
                  >
                    <option value="universal">Universal — Compatible con cualquier IA</option>
                    <option value="claude">Claude (Anthropic)</option>
                    <option value="chatgpt">ChatGPT (OpenAI)</option>
                    <option value="gemini">Gemini (Google)</option>
                    <option value="perplexity">Perplexity</option>
                    <option value="lovable">Lovable / v0 / Bolt (constructores de apps)</option>
                    <option value="midjourney">Midjourney / DALL-E (imagen)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button onClick={prev} className="inline-flex items-center gap-1 text-text-light hover:text-text text-sm cursor-pointer bg-transparent border-none font-medium">
                  <ChevronLeft className="w-4 h-4" /> Atrás
                </button>
                <button
                  onClick={generatePrompt}
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-medium cursor-pointer hover:bg-primary/90 transition-colors border-none text-sm"
                >
                  <Sparkles className="w-4 h-4" /> Generar prompt refinado
                </button>
              </div>

              {/* Generated Output */}
              {generated && (
                <div ref={outputRef} className="mt-10">
                  <div className="mb-4">
                    <h2 className="text-lg font-bold text-text">Tu prompt refinado</h2>
                    <p className="text-sm text-text-light">Copia y pega directamente en tu herramienta de IA preferida.</p>
                  </div>

                  <div className="relative bg-gray-50 rounded-2xl border border-border p-5">
                    <button
                      onClick={copyPrompt}
                      className={`absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border cursor-pointer transition-colors ${
                        copied
                          ? 'bg-accent text-white border-accent'
                          : 'bg-white text-text-light border-border hover:border-primary hover:text-primary'
                      }`}
                    >
                      {copied ? <><Check className="w-3 h-3" /> Copiado</> : <><Copy className="w-3 h-3" /> Copiar</>}
                    </button>
                    <pre className="text-sm text-text whitespace-pre-wrap font-mono leading-relaxed pr-20">
                      {generated}
                    </pre>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
                    <span className="text-xs text-text-lighter">Compatible con:</span>
                    {['Claude', 'ChatGPT', 'Gemini', 'Perplexity', 'Lovable', 'v0', 'Bolt', 'Midjourney'].map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 bg-gray-100 text-text-lighter rounded font-medium">{t}</span>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={resetAll}
                      className="inline-flex items-center gap-2 bg-white text-text border border-border px-4 py-2 rounded-xl text-sm font-medium cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" /> Nuevo prompt
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
