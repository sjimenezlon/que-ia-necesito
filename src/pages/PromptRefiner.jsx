import { useState, useRef } from 'react'
import {
  Palette, Megaphone, Newspaper, Code, Users, Lightbulb, PenTool,
  GraduationCap, TrendingUp, Heart, Database, Sparkles, Landmark,
  Package, Brain, Workflow, FileStack, ShieldQuestion, CalendarCheck
} from 'lucide-react'
import DomainSelector from '../components/prompt-refiner/DomainSelector'
import ContextRoleStep from '../components/prompt-refiner/ContextRoleStep'
import TaskStep from '../components/prompt-refiner/TaskStep'
import ToneStyleStep from '../components/prompt-refiner/ToneStyleStep'
import FormatStep from '../components/prompt-refiner/FormatStep'
import ConstraintsStep from '../components/prompt-refiner/ConstraintsStep'
import GeneratedPrompt from '../components/prompt-refiner/GeneratedPrompt'

const UPDATED_AT = '1 de septiembre de 2026'

const DOMAINS = [
  { id: 'artes', label: 'Artes', icon: Palette, desc: 'Creación artística, visual, musical, literaria y escénica.', color: 'bg-red-50 text-red-600 border-red-200' },
  { id: 'marketing', label: 'Marketing', icon: Megaphone, desc: 'Estrategia, contenido, campañas, branding y analítica.', color: 'bg-amber-50 text-amber-600 border-amber-200' },
  { id: 'periodismo', label: 'Periodismo y Comunicación', icon: Newspaper, desc: 'Redacción, investigación, narrativa y medios.', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
  { id: 'software', label: 'Desarrollo de Software', icon: Code, desc: 'Código, arquitectura, APIs, automatización y debugging.', color: 'bg-blue-50 text-blue-600 border-blue-200' },
  { id: 'agentes', label: 'Agentes y Automatización', icon: Workflow, desc: 'Agentes con herramientas, flujos n8n/Make, RAG y control humano.', color: 'bg-violet-50 text-violet-600 border-violet-200' },
  { id: 'talento', label: 'Gestión de Talento Humano', icon: Users, desc: 'Reclutamiento, evaluación, cultura y desarrollo organizacional.', color: 'bg-purple-50 text-purple-600 border-purple-200' },
  { id: 'creatividad', label: 'Creatividad', icon: Lightbulb, desc: 'Ideación, brainstorming, innovación y pensamiento lateral.', color: 'bg-orange-50 text-orange-600 border-orange-200' },
  { id: 'diseno', label: 'Diseño', icon: PenTool, desc: 'UX/UI, gráfico, industrial, de servicios y experiencia.', color: 'bg-pink-50 text-pink-600 border-pink-200' },
  { id: 'educacion', label: 'Educación y Academia', icon: GraduationCap, desc: 'Planes de clase, rúbricas, investigación y divulgación.', color: 'bg-teal-50 text-teal-600 border-teal-200' },
  { id: 'ventas', label: 'Ventas y Negocios', icon: TrendingUp, desc: 'Pitch, estrategia comercial, pricing y análisis de mercado.', color: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
  { id: 'salud', label: 'Salud y Bienestar', icon: Heart, desc: 'Divulgación médica, nutrición, bienestar y comunicación en salud.', color: 'bg-rose-50 text-rose-600 border-rose-200' },
  { id: 'datos', label: 'Ciencia de Datos', icon: Database, desc: 'ML aplicado, visualización, dashboards y análisis estadístico.', color: 'bg-cyan-50 text-cyan-600 border-cyan-200' },
  { id: 'publico', label: 'Sector Público Colombia', icon: Landmark, desc: 'PQRSD, contratación SECOP, política pública, control interno y comunicación ciudadana.', color: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
]

const DOMAIN_DATA = {
  artes: {
    roleHint: 'Ej: "Eres un curador de arte contemporáneo con experiencia en bienales internacionales y arte digital"',
    taskHint: 'Ej: "Crea un concepto curatorial para una exposición", "Escribe una sinopsis de obra"',
    sourcesHint: 'Ej: fichas técnicas de las obras, texto de sala anterior, presupuesto y planta del espacio.',
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
    sourcesHint: 'Ej: manual de marca, últimos 10 posts que funcionaron, tablero de métricas, precios de la competencia.',
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
    sourcesHint: 'Ej: transcripción de las entrevistas, documentos filtrados, notas de campo, cronología de hechos.',
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
    sourcesHint: 'Ej: el código actual, el esquema de la base de datos, los logs del error, la versión de cada dependencia.',
    roleTemplates: [
      { title: 'Full-stack developer', desc: 'Desarrollador completo con dominio de frontend y backend.' },
      { title: 'Arquitecto de software', desc: 'Diseñador de sistemas escalables y mantenibles.' },
      { title: 'DevOps engineer', desc: 'Especialista en CI/CD, infraestructura y automatización.' },
      { title: 'Data engineer', desc: 'Experto en pipelines de datos, ETL y bases de datos.' },
    ]
  },
  agentes: {
    roleHint: 'Ej: "Eres un ingeniero de automatización que diseña agentes con herramientas (APIs, MCP) y sabe cuándo NO automatizar"',
    taskHint: 'Ej: "Diseña el flujo de un agente que clasifique PQRSD", "Escribe las instrucciones de sistema de un asistente interno"',
    productHint: 'Ej: "Instrucciones de sistema de 1 página", "Diagrama del flujo con los puntos de aprobación humana", "Checklist de pruebas antes de producción"',
    sourcesHint: 'Ej: las herramientas disponibles y qué hace cada una, ejemplos reales de entrada, las reglas del negocio, los límites de costo.',
    constraintsHint: 'Define qué NO puede hacer el agente sin aprobación humana (enviar correos, borrar datos, pagar, publicar). Exige registro de cada acción y un criterio de éxito verificable.',
    roleTemplates: [
      { title: 'Diseñador de agentes', desc: 'Define objetivo, herramientas, límites y criterio de éxito.' },
      { title: 'Ingeniero de automatización', desc: 'Flujos en n8n, Make o Zapier sobre sistemas existentes.' },
      { title: 'Arquitecto de contexto (RAG)', desc: 'Qué documentos entran, cómo se citan y qué se descarta.' },
      { title: 'Auditor de agentes', desc: 'Revisa fallos, alucinaciones, costos y control humano.' },
    ]
  },
  talento: {
    roleHint: 'Ej: "Eres un director de talento humano con experiencia en transformación cultural y gestión del cambio"',
    taskHint: 'Ej: "Diseña un plan de onboarding", "Crea una rúbrica de evaluación de desempeño"',
    sourcesHint: 'Ej: el organigrama, la encuesta de clima, la descripción del cargo, la política interna vigente. Anonimiza los datos personales.',
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
    sourcesHint: 'Ej: lo que ya intentaron y falló, las restricciones reales (tiempo, plata, equipo), el brief del cliente.',
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
    sourcesHint: 'Ej: capturas de la interfaz actual, el sistema de diseño, resultados de las pruebas con usuarios, la analítica de abandono.',
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
    sourcesHint: 'Ej: el programa del curso, la lectura base, los resultados de aprendizaje esperados, el tiempo real de clase.',
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
    sourcesHint: 'Ej: la lista de precios, las objeciones más frecuentes, el histórico de cierres, la propuesta de la competencia.',
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
    sourcesHint: 'Ej: la guía clínica oficial, el artículo revisado por pares, la circular del Ministerio. Nunca pegues historias clínicas identificables.',
    constraintsHint: 'No dar diagnóstico ni dosis. Citar guía o fuente oficial de respaldo. Incluir cuándo consultar a un profesional. Si la evidencia es débil, decirlo.',
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
    sourcesHint: 'Ej: el diccionario de datos, una muestra del archivo, cómo se recolectó, qué significa cada columna y sus unidades.',
    roleTemplates: [
      { title: 'Data analyst', desc: 'Analista de datos con enfoque en insights de negocio.' },
      { title: 'ML engineer', desc: 'Ingeniero de machine learning y modelos predictivos.' },
      { title: 'Visualizador de datos', desc: 'Especialista en dashboards y narrativa visual de datos.' },
      { title: 'BI consultant', desc: 'Consultor de inteligencia de negocio y estrategia de datos.' },
    ]
  },
  publico: {
    roleHint: 'Ej: "Eres un asesor con 15 años en planeación territorial colombiana, experto en CONPES, Plan de Desarrollo y normativa DNP. Conoces SINERGIA, Terridata y SISBEN"',
    taskHint: 'Ej: "Redacta respuesta a PQRSD sobre subsidio", "Analiza pliego SECOP II frente a Ley 80", "Construye ficha AIR para proyecto de decreto"',
    productHint: 'Ej: "Memorando radicable de 1 página", "Tabla comparativa lado-a-lado de 3 ofertas", "Boletín ciudadano de 400 palabras en lenguaje claro", "Matriz AIR con costos/beneficios por opción"',
    audienceHint: 'Ej: "Comité Primario del alcalde", "Consejo de Gobierno", "Ciudadanía del municipio con básica primaria", "Veedores ciudadanos y Contraloría"',
    sourcesHint: 'Ej: el texto de la norma aplicable, el pliego, el radicado que se responde, la cifra de Terridata. Anonimiza los datos personales antes de pegar (Ley 1581).',
    constraintsHint: 'Cita normas aplicables (Ley 1581, Ley 1755, CPACA, T-323/2024). Tono institucional colombiano. No inventar números de radicado, sentencia ni artículos de ley — si no hay soporte, dilo.',
    roleTemplates: [
      { title: 'Asesor de despacho', desc: 'Experto en agenda pública y toma de decisiones institucionales.' },
      { title: 'Abogado de contratación', desc: 'Especialista en Ley 80, 1150, Decreto 1082 y documentos tipo CCE.' },
      { title: 'Servidor de ventanilla PQRSD', desc: 'Enfocado en atención ciudadana con tono institucional y Ley 1755.' },
      { title: 'Analista de planeación / PDT', desc: 'Diagnóstico territorial con DANE, SISBEN, ECV y Terridata.' },
      { title: 'Auditor / Control interno', desc: 'Revisión 100% de transacciones y trazabilidad bajo MECI.' },
      { title: 'Comunicador institucional', desc: 'Piezas para GOV.CO y redes en lenguaje claro y plurilingüe.' },
      { title: 'Asesor de política pública', desc: 'AIR, líneas jurisprudenciales y benchmark OCDE.' },
      { title: 'Líder de GovTech', desc: 'RAG, chatbots ciudadanos, integración con Orfeo/SAIA/GOV.CO.' },
    ]
  }
}

const STEPS = [
  { num: 1, letter: 'C', label: 'Contexto', short: 'Dominio' },
  { num: 2, letter: 'O', label: 'Orientación', short: 'Rol y audiencia' },
  { num: 3, letter: 'R', label: 'Requerimiento', short: 'Producto, tarea y fuentes' },
  { num: 4, letter: 'T', label: 'Tono y estilo', short: 'Voz del resultado' },
  { num: 5, letter: 'E', label: 'Estructura', short: 'Formato de salida' },
  { num: 6, letter: 'F', label: 'Filtros', short: 'Restricciones y esfuerzo' },
]

const CLARITIES = [
  {
    icon: Brain,
    kicker: 'Claridad 1 · Ya razonan solos',
    body: (
      <>
        Claude Opus 5, GPT-5.6, Gemini y Kimi K3 piensan paso a paso por cuenta propia y traen su propio control de
        esfuerzo. <span className="font-semibold">Escribir «piensa paso a paso» hoy estorba más de lo que ayuda</span>:
        en vez de dictarle el razonamiento, dale un encargo claro y súbele el esfuerzo si la tarea lo pide.
      </>
    ),
  },
  {
    icon: Package,
    kicker: 'Claridad 2 · Define el producto',
    body: (
      <>
        Lo que sí paga: decir <span className="font-semibold">qué entregable</span> esperas. ¿Memorando de 1 página?
        ¿Tabla comparativa? ¿Boletín ciudadano de 400 palabras? Cuando el producto queda claro, el resultado es
        usable a la primera.
      </>
    ),
  },
  {
    icon: FileStack,
    kicker: 'Claridad 3 · La materia prima manda',
    body: (
      <>
        Con ventanas de un millón de tokens, pegar el expediente completo rinde más que pulir adjetivos.
        <span className="font-semibold"> Adjunta las fuentes, el borrador anterior, la norma, los datos</span> — y di
        cuál manda si se contradicen.
      </>
    ),
  },
  {
    icon: ShieldQuestion,
    kicker: 'Claridad 4 · Permiso para dudar',
    body: (
      <>
        Un modelo sin permiso de decir «no sé» rellena el hueco con algo verosímil.
        <span className="font-semibold"> Autorízalo explícitamente a marcar lo que no puede verificar</span> y a
        separar dato de inferencia. Es la línea que más alucinaciones evita.
      </>
    ),
  },
]

const MODEL_SNAPSHOT = [
  { name: 'Claude Fable 5.1', house: 'Anthropic · 1 sep 2026', note: 'El más capaz de la casa: 1M de contexto, 128K de salida y, en esfuerzo bajo o medio, el mismo resultado por menos dinero.' },
  { name: 'ChatGPT · GPT-5.6', house: 'OpenAI · agosto 2026', note: 'Luna quedó como modelo por defecto —gratis y con botón «Think»—; Sol añade un control de cuánto razona.' },
  { name: 'Gemini 3.7 Flash', house: 'Google · 13 ago 2026', note: 'El caballo de batalla, a mitad de precio del anterior; el tope sigue siendo 3.1 Pro, porque 3.5 Pro va retrasado.' },
  { name: 'Grok 4.6', house: 'xAI · 12 ago 2026', note: '500K de contexto y el precio más bajo de la frontera; su ventaja sigue siendo el pulso en tiempo real de X.' },
  { name: 'Kimi K3', house: 'Moonshot · pesos abiertos 27 jul 2026', note: 'Un millón de tokens y el modelo de pesos abiertos más grande publicado hasta hoy.' },
  { name: 'DeepSeek V4-Flash-Vision', house: 'DeepSeek · 21 ago 2026', note: 'Ya lee imágenes y gráficas sin subir la tarifa: USD 0,14 / 0,28 por millón de tokens, el piso del mercado.' },
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
      <p className="mt-4 pt-3 border-t border-border text-[11px] text-text-lighter leading-relaxed">
        Actualizado al {UPDATED_AT}.
      </p>
    </aside>
  )
}

function ModelSnapshot() {
  return (
    <section className="max-w-3xl mx-auto mb-10 rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <CalendarCheck className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-text">Panorama de modelos · {UPDATED_AT}</h2>
          <p className="text-xs text-text-light">
            Con qué estás hablando hoy. Sirve para decidir a cuál le mandas el prompt que vas a construir.
          </p>
        </div>
      </div>

      <ul className="space-y-2.5 list-none p-0 m-0">
        {MODEL_SNAPSHOT.map((m) => (
          <li key={m.name} className="grid sm:grid-cols-[minmax(0,10rem)_1fr] gap-1 sm:gap-4 py-2 border-t border-border first:border-t-0">
            <div>
              <p className="text-sm font-semibold text-text leading-tight">{m.name}</p>
              <p className="text-[11px] text-text-lighter">{m.house}</p>
            </div>
            <p className="text-xs text-text-light leading-relaxed">{m.note}</p>
          </li>
        ))}
      </ul>

      <p className="text-[11px] text-text-lighter mt-4 pt-3 border-t border-border leading-relaxed">
        Versiones y precios cambian cada pocas semanas: verifica antes de citarlos en un documento.
      </p>
    </section>
  )
}

export default function PromptRefiner() {
  const [step, setStep] = useState(0)
  const [domain, setDomain] = useState(null)
  const [role, setRole] = useState('')
  const [audience, setAudience] = useState('')
  const [context, setContext] = useState('')
  const [product, setProduct] = useState('')
  const [task, setTask] = useState('')
  const [subtasks, setSubtasks] = useState('')
  const [sources, setSources] = useState('')
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
  const [effort, setEffort] = useState('auto')
  const [allowUncertainty, setAllowUncertainty] = useState(true)
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

    if (product) prompt += `## PRODUCTO ESPERADO\n${product}\n\n`

    prompt += `## TAREA\n${task || '[Describe tu tarea aquí]'}\n`
    if (subtasks) prompt += `\nPasos esperados:\n${subtasks}\n`
    prompt += '\n'

    if (sources) {
      prompt += `## MATERIA PRIMA Y FUENTES\n${sources}\n`
      prompt += `Trabaja sobre este material antes que sobre tu conocimiento general. Si algo del material se contradice, dilo en vez de escoger en silencio.\n\n`
    }

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

    if (avoid || quality.length || allowUncertainty) {
      prompt += `## RESTRICCIONES Y CALIDAD\n`
      if (avoid) prompt += `Evitar: ${avoid}.\n`
      if (quality.length) prompt += `Priorizar: ${quality.join(', ')}.\n`
      if (allowUncertainty) {
        prompt += `Si no tienes evidencia suficiente para afirmar algo, dilo explícitamente en vez de suponer. Marca por separado lo que es dato verificable y lo que es inferencia tuya, y enumera al final los supuestos que tuviste que hacer.\n`
      }
      prompt += '\n'
    }

    if (example) prompt += `## EJEMPLO O REFERENCIA\n${example}\n\n`

    if (effort !== 'auto') {
      const efforts = {
        bajo: 'Responde directo, sin deliberación extensa: esta tarea es sencilla y prefiero velocidad.',
        medio: 'Tómate un momento para verificar la coherencia interna antes de responder, sin extenderte de más.',
        alto: 'Dedica un esfuerzo de razonamiento alto: revisa el problema desde más de un ángulo, contrasta las opciones y solo entonces entrega el resultado.',
      }
      prompt += `## ESFUERZO\n${efforts[effort]}\n\n`
    }

    if (aiTool !== 'universal') {
      const tips = {
        claude: 'Decide por tu cuenta cuánto necesitas pensar antes de responder y no narres el proceso salvo que te lo pida. Si el material adjunto es extenso, revísalo completo antes de concluir y cita de dónde sale cada afirmación.',
        chatgpt: 'Si la tarea lo exige, razona en profundidad antes de responder. Haz explícitos los supuestos que tengas que asumir y no rellenes los vacíos con datos verosímiles.',
        gemini: 'Aprovecha lo multimodal y la búsqueda: analiza los archivos o imágenes adjuntas y cita lo que encuentres en la web con enlace y fecha.',
        perplexity: 'Incluye fuentes con enlace y fecha de publicación. Distingue el hecho verificado de la inferencia y prioriza la información más reciente.',
        grok: 'Acota la ventana temporal de la búsqueda (por ejemplo, últimas 48 horas) y contrasta al menos dos fuentes independientes antes de afirmar una tendencia.',
        abiertos: 'Sé estricto con el formato: entrega el resultado dentro de un bloque delimitado y sin texto adicional alrededor. No asumas contexto que no esté en este mensaje.',
        agentes: 'Antes de ejecutar, enuncia el plan y el criterio de aceptación. No modifiques nada fuera de lo indicado, ejecuta las pruebas correspondientes y reporta lo que quedó pendiente o fallando.',
        appbuilders: 'Genera código funcional, limpio y comentado, con diseño responsive y accesible. Implementa una funcionalidad por iteración y contempla los estados de carga, error y vacío.',
        imagen: 'Interpreta esto como un prompt visual: sujeto, acción, entorno, encuadre, lente y ángulo, luz, paleta y estilo. Respeta el texto entre comillas tal cual debe aparecer y la relación de aspecto indicada.',
        video: 'Interpreta esto como una toma de video: describe el movimiento de cámara, la duración, la continuidad con la toma anterior y si el audio es diegético. Una idea por plano.',
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
    setProduct('')
    setTask('')
    setSubtasks('')
    setSources('')
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
    setEffort('auto')
    setAllowUncertainty(true)
    setAiTool('universal')
    setGenerated(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          Metodología CORTE-F
          <span className="text-primary/60">·</span>
          <span className="text-xs">Actualizado al {UPDATED_AT}</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-bold text-text mb-3">
          Refinador de prompts
        </h1>
        <p className="text-text-light max-w-2xl mx-auto">
          En 2026 un buen prompt no es una fórmula mágica: es un encargo claro, con materia prima suficiente y un
          producto bien definido. Constrúyelo en 6 pasos y llévatelo a la IA que prefieras.
        </p>
      </div>

      {/* Cuatro claridades: qué sí paga hoy al escribir un prompt */}
      <div className="max-w-3xl mx-auto mb-10 grid sm:grid-cols-2 gap-3">
        {CLARITIES.map((c) => {
          const Icon = c.icon
          return (
            <div key={c.kicker} className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">{c.kicker}</span>
              </div>
              <p className="text-sm text-text leading-relaxed">{c.body}</p>
            </div>
          )
        })}
      </div>

      {step === 0 && <ModelSnapshot />}

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
              sources={sources} setSources={setSources}
              example={example} setExample={setExample}
              product={product} setProduct={setProduct}
              domainData={domainData}
              isPublico={domain === 'publico'}
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
                effort={effort} setEffort={setEffort}
                allowUncertainty={allowUncertainty} setAllowUncertainty={setAllowUncertainty}
                aiTool={aiTool} setAiTool={setAiTool}
                isPublico={domain === 'publico'}
                constraintsHint={domainData?.constraintsHint}
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
