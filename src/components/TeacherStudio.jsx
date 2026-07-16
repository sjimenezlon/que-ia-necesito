import { useState } from 'react'
import {
  Accessibility,
  ArrowRight,
  Brain,
  Check,
  CheckCircle2,
  Compass,
  Copy,
  ExternalLink,
  GraduationCap,
  Layers3,
  Lightbulb,
  MessageSquareText,
  ShieldCheck,
  Target,
  WandSparkles,
  Workflow,
} from 'lucide-react'

const LEVELS = [
  { id: 'basica', label: 'Básica y media', audience: 'un grupo de educación básica o media' },
  { id: 'tecnica', label: 'Técnica y tecnológica', audience: 'un grupo de formación técnica o tecnológica' },
  { id: 'superior', label: 'Superior y posgrado', audience: 'un curso de educación superior o posgrado' },
  { id: 'adultos', label: 'Adultos e institucional', audience: 'personas adultas o un equipo institucional' },
]

const REFINEMENT_FOCUS = [
  {
    id: 'objetivo',
    label: 'Objetivo claro',
    clause: 'Convierte la intención en un objetivo observable y alinea cada actividad con ese objetivo.',
  },
  {
    id: 'actividad',
    label: 'Aprendizaje activo',
    clause: 'Incluye decisiones, preguntas o producción del estudiante; no entregues una respuesta terminada para copiar.',
  },
  {
    id: 'inclusion',
    label: 'Opciones de acceso',
    clause: 'Ofrece alternativas equivalentes de representación, participación y expresión sin reducir el objetivo común.',
  },
  {
    id: 'evidencia',
    label: 'Evidencia',
    clause: 'Define qué evidencia observable permitirá distinguir un producto asistido de una comprensión transferible.',
  },
  {
    id: 'verificacion',
    label: 'Verificación',
    clause: 'Señala supuestos, riesgos y afirmaciones que el docente debe verificar; no inventes fuentes ni datos.',
  },
]

const LEARNING_BARRIERS = [
  {
    id: 'instrucciones',
    label: 'Comprender consignas',
    observable: 'Omite pasos, inicia con dudas o necesita que la consigna se repita varias veces.',
    engagement: ['Anticipar el propósito con un ejemplo cercano', 'Permitir elegir el orden de dos tareas equivalentes'],
    representation: ['Consigna en frases breves y numeradas', 'Modelo resuelto que haga visibles los pasos'],
    expression: ['Responder oralmente, con esquema o con texto', 'Usar una lista de verificación durante la tarea'],
    supports: ['Consigna accesible para todo el grupo', 'Verificación breve de comprensión antes de iniciar', 'Acompañamiento individual y retiro gradual de la lista'],
    lookFor: 'Inicia con mayor autonomía, completa pasos esenciales y puede explicar qué debe hacer primero y después.',
    aiUse: 'Convertir una consigna propia en versiones equivalentes, manteniendo la misma exigencia y vocabulario disciplinar.',
  },
  {
    id: 'lectura',
    label: 'Acceder a textos densos',
    observable: 'Pierde la idea central, dedica todo el esfuerzo a decodificar o abandona textos extensos.',
    engagement: ['Conectar el texto con una pregunta auténtica', 'Dar una meta de lectura breve y visible'],
    representation: ['Glosario previo y fragmentos con subtítulos', 'Versión en audio o lectura acompañada del mismo contenido'],
    expression: ['Mapa de ideas, explicación oral o respuesta escrita', 'Citar una evidencia concreta en el formato elegido'],
    supports: ['Activar saberes previos', 'Leer por fragmentos con pausas de recuperación', 'Reducir apoyos y pedir transferencia a un texto nuevo'],
    lookFor: 'Identifica la idea central, localiza evidencia y conecta dos fragmentos sin depender del resumen de la IA.',
    aiUse: 'Proponer apoyos de vocabulario, preguntas por fragmento y formatos accesibles a partir de un texto autorizado.',
  },
  {
    id: 'atencion',
    label: 'Sostener y organizar la tarea',
    observable: 'Pierde el punto de avance, cambia de tarea sin cerrar o no distribuye el tiempo disponible.',
    engagement: ['Explicar para qué sirve cada tramo', 'Usar retos cortos con una meta visible'],
    representation: ['Ruta de trabajo con pocos pasos', 'Señales visuales para inicio, pausa y cierre'],
    expression: ['Registrar avance con una marca o frase', 'Entregar productos parciales antes del producto final'],
    supports: ['Dividir la tarea para todo el grupo', 'Acordar una pausa de monitoreo', 'Retirar recordatorios cuando aparezca autorregulación'],
    lookFor: 'Reconoce el paso actual, termina tramos breves y puede anticipar qué necesita para continuar.',
    aiUse: 'Transformar una actividad larga en hitos breves y generar preguntas de automonitoreo, sin vigilar ni perfilar al estudiante.',
  },
  {
    id: 'ritmo',
    label: 'Consolidar a otro ritmo',
    observable: 'Necesita más ensayos, recupera con dificultad lo trabajado o se bloquea cuando aumenta la complejidad.',
    engagement: ['Mostrar el progreso entre intentos', 'Usar contextos relacionados con sus intereses'],
    representation: ['Ejemplos y contraejemplos graduados', 'Recordatorios breves de conceptos previos esenciales'],
    expression: ['Ensayo adicional sin penalizar el primer intento', 'Explicar qué cambió entre dos soluciones'],
    supports: ['Recuperación breve antes de contenido nuevo', 'Pistas graduadas solo cuando sean necesarias', 'Nuevo caso con menos apoyo para comprobar transferencia'],
    lookFor: 'Mejora entre intentos, usa menos pistas y aplica el concepto cuando cambia una condición.',
    aiUse: 'Crear variaciones equivalentes y una escalera de pistas que nunca revele la respuesta completa al inicio.',
  },
  {
    id: 'expresion',
    label: 'Expresar lo que sabe',
    observable: 'Comprende durante la conversación, pero el formato único de respuesta oculta parte de lo aprendido.',
    engagement: ['Permitir elegir un formato con criterios comunes', 'Usar audiencias y propósitos auténticos'],
    representation: ['Mostrar ejemplos de productos en varios formatos', 'Hacer explícitos los criterios que no cambian'],
    expression: ['Audio, texto, diagrama, demostración o combinación', 'Defensa breve para explicar decisiones y autoría'],
    supports: ['Plantilla opcional para organizar ideas', 'Ensayo con retroalimentación sobre un criterio', 'Producto final y reflexión sobre el formato elegido'],
    lookFor: 'Comunica la idea central, usa evidencia y explica decisiones aunque cambie el medio de expresión.',
    aiUse: 'Ayudar a transformar un borrador entre formatos accesibles, sin crear el producto final ni sustituir la voz del estudiante.',
  },
]

const REINFORCEMENTS = [
  {
    id: 'recuperar',
    label: 'Recupera y corrige',
    purpose: 'Traer una idea a la memoria, comprobarla y corregirla.',
    steps: [
      { title: 'Recupera sin ayuda', body: (goal) => `Responde de memoria una pregunta esencial sobre “${goal}”. Puede ser una frase, dibujo o esquema.` },
      { title: 'Compara', body: () => 'Contrasta tu respuesta con un ejemplo verificado. Marca una coincidencia, una diferencia y una duda.' },
      { title: 'Corrige con explicación', body: () => 'Reescribe o completa la respuesta. Explica qué cambió y qué evidencia te convenció.' },
      { title: 'Transfiere', body: (goal) => `Aplica “${goal}” en una situación distinta. No uses el mismo ejemplo del inicio.` },
    ],
    aiRole: 'hacer preguntas y ofrecer el ejemplo de contraste solo después del primer intento',
  },
  {
    id: 'contrastar',
    label: 'Ejemplo o no ejemplo',
    purpose: 'Reconocer rasgos esenciales y evitar reglas memorizadas sin comprensión.',
    steps: [
      { title: 'Observa dos casos', body: (goal) => `Presenta un ejemplo y un no ejemplo de “${goal}” sin decir cuál es cuál.` },
      { title: 'Decide', body: () => 'Elige cuál cumple el criterio y justifica con una característica observable.' },
      { title: 'Recibe una pista', body: () => 'Si hace falta, revela una sola pista sobre la diferencia esencial; no des la solución.' },
      { title: 'Crea un caso', body: () => 'Construye un nuevo ejemplo o no ejemplo y desafía a otra persona a clasificarlo.' },
    ],
    aiRole: 'simular casos, ocultar la respuesta y graduar una sola pista a la vez',
  },
  {
    id: 'explicar',
    label: 'Explícalo y cámbialo',
    purpose: 'Hacer visible la comprensión y comprobar si se sostiene al cambiar una condición.',
    steps: [
      { title: 'Explica', body: (goal) => `Explica “${goal}” con tus propias palabras para alguien que aún no lo conoce.` },
      { title: 'Pregunta', body: () => 'Recibe una pregunta socrática sobre una parte ambigua o un supuesto de tu explicación.' },
      { title: 'Cambia una condición', body: () => 'Modifica una variable del caso y predice qué se mantiene y qué cambia.' },
      { title: 'Reformula', body: () => 'Mejora tu explicación inicial e identifica la idea que ahora comprendes mejor.' },
    ],
    aiRole: 'hacer una pregunta socrática por turno y cambiar solo una condición del caso',
  },
  {
    id: 'pistas',
    label: 'Escalera de pistas',
    purpose: 'Sostener el esfuerzo sin retirar el trabajo cognitivo.',
    steps: [
      { title: 'Primer intento', body: (goal) => `Intenta resolver un reto breve sobre “${goal}” y señala exactamente dónde aparece la dificultad.` },
      { title: 'Pista de orientación', body: () => 'Recibe una pregunta que señale dónde mirar, sin indicar el procedimiento.' },
      { title: 'Pista de proceso', body: () => 'Solo si aún hace falta, recibe el primer paso o una estrategia posible, nunca la respuesta completa.' },
      { title: 'Nuevo intento sin pista', body: () => 'Resuelve una variación equivalente y explica qué apoyo ya no necesitaste.' },
    ],
    aiRole: 'esperar el intento, entregar pistas graduadas y comprobar autonomía con un caso nuevo',
  },
]

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

export default function TeacherStudio({ copiedId, onCopy }) {
  const [activeTool, setActiveTool] = useState('refinador')
  const [refinerLevel, setRefinerLevel] = useState(LEVELS[0].id)
  const [rawPrompt, setRawPrompt] = useState('Explícame la fotosíntesis para mi clase.')
  const [refinerFocus, setRefinerFocus] = useState(['objetivo', 'actividad', 'evidencia', 'verificacion'])
  const [barrierId, setBarrierId] = useState(LEARNING_BARRIERS[0].id)
  const [supportGoal, setSupportGoal] = useState('Explicar una idea usando evidencia')
  const [supportStrength, setSupportStrength] = useState('Curiosidad por ejemplos cercanos y disposición para conversar')
  const [reinforcementId, setReinforcementId] = useState(REINFORCEMENTS[0].id)
  const [reinforcementMinutes, setReinforcementMinutes] = useState('10')
  const [reinforcementStep, setReinforcementStep] = useState(0)

  const level = LEVELS.find((item) => item.id === refinerLevel) || LEVELS[0]
  const selectedFocus = REFINEMENT_FOCUS.filter((item) => refinerFocus.includes(item.id))
  const barrier = LEARNING_BARRIERS.find((item) => item.id === barrierId) || LEARNING_BARRIERS[0]
  const reinforcement = REINFORCEMENTS.find((item) => item.id === reinforcementId) || REINFORCEMENTS[0]
  const currentReinforcementStep = reinforcement.steps[reinforcementStep]

  const refinedPrompt = `Actúa como co-diseñador pedagógico para ${level.audience}. No reemplaces el criterio docente.\n\nSOLICITUD ORIGINAL\n${rawPrompt.trim() || '[Escribe aquí tu solicitud]'}\n\nANTES DE RESPONDER\nHazme hasta 3 preguntas breves si falta información sobre el objetivo, el grupo, el tiempo o la evidencia esperada.\n\nCRITERIOS PARA MEJORAR LA PROPUESTA\n${selectedFocus.length ? selectedFocus.map((item, index) => `${index + 1}. ${item.clause}`).join('\n') : '1. Conserva la intención original y pregunta qué resultado de aprendizaje se espera.'}\n\nFORMATO DE RESPUESTA\n- Objetivo observable.\n- Secuencia breve con acciones del docente y del estudiante.\n- Evidencia de aprendizaje y pregunta de transferencia.\n- Ajustes para accesibilidad y alternativa sin IA.\n- Riesgos, supuestos y elementos que debo verificar.\n\nLÍMITES\nNo incluyas datos personales de estudiantes, no diagnostiques, no califiques por mí y no inventes fuentes. Si no sabes algo, dilo con claridad.`

  const adaptivePrompt = `Actúa como co-diseñador de una experiencia educativa adaptable, con enfoque de Diseño Universal para el Aprendizaje. No diagnostiques ni etiquetes.\n\nMeta común de aprendizaje: ${supportGoal || '[meta observable]'}.\nBarrera observada en la actividad: ${barrier.observable}\nFortaleza, interés o apoyo disponible: ${supportStrength || '[fortaleza o interés observado]'}.\n\nDiseña una experiencia que mantenga la misma meta y exigencia, pero ofrezca:\n1. Dos opciones de participación y motivación.\n2. Dos formas equivalentes de presentar la información.\n3. Dos maneras de demostrar lo aprendido con criterios comunes.\n4. Una escalera de tres apoyos: universal, focalizado e individual, indicando cuándo retirar cada apoyo.\n5. Un refuerzo interactivo de máximo 10 minutos.\n6. Evidencia observable para decidir si mantener, ajustar o retirar el apoyo.\n\nUso posible de IA: ${barrier.aiUse}\nNo uses nombres, diagnósticos, historias clínicas, calificaciones ni datos identificables. La propuesta debe ser revisada por el docente y articulada con los apoyos profesionales e institucionales que correspondan.`

  const reinforcementPrompt = `Actúa como tutor de práctica guiada para ${level.audience}. Tema o habilidad: ${supportGoal || '[tema o habilidad]'}. Diseña un refuerzo de ${reinforcementMinutes} minutos con la estrategia “${reinforcement.label}”. Tu función es ${reinforcement.aiRole}.\n\nReglas: pide un intento antes de ayudar; presenta un solo paso por turno; acepta respuestas en texto breve, audio transcrito o esquema; ofrece una pista solo si se solicita; nunca reveles de inmediato la respuesta; termina con un caso nuevo y una pregunta de autoevaluación. No recopiles datos personales ni infieras diagnósticos.`

  function toggleFocus(id) {
    setRefinerFocus((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  function chooseReinforcement(id) {
    setReinforcementId(id)
    setReinforcementStep(0)
  }

  function advanceReinforcement() {
    setReinforcementStep((current) => current === reinforcement.steps.length - 1 ? 0 : current + 1)
  }

  const tabs = [
    { id: 'refinador', label: 'Refinador de prompts', icon: WandSparkles },
    { id: 'acompanamiento', label: 'Acompañamiento adaptable', icon: Accessibility },
    { id: 'refuerzos', label: 'Refuerzos interactivos', icon: Brain },
  ]

  return (
    <section id="acompanamiento" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-28">
      <div className="text-center mb-9">
        <div className="inline-flex items-center gap-2 bg-secondary/8 text-secondary px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-secondary/10">
          <Accessibility className="w-3 h-3" />
          Estudio docente adaptable
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-text tracking-tight mb-2">De un prompt general a un acompañamiento posible</h2>
        <p className="text-text-light text-sm max-w-3xl mx-auto">Tres herramientas propias para mejorar instrucciones, diseñar apoyos desde barreras observables y practicar sin retirar el esfuerzo que produce aprendizaje.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-7" role="tablist" aria-label="Herramientas del estudio docente">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTool === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTool(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold cursor-pointer transition-all ${isActive ? 'bg-text text-white border-text shadow-md' : 'bg-surface text-text-light border-border hover:border-primary/30 hover:text-text'}`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {activeTool === 'refinador' && (
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-5 items-start" role="tabpanel">
          <div className="bg-surface border border-border rounded-3xl p-5 md:p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center">
                <MessageSquareText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-bold text-text text-xl tracking-tight">Tu prompt inicial</h3>
                <p className="text-xs text-text-lighter">Escribe como lo harías normalmente.</p>
              </div>
            </div>

            <label htmlFor="refiner-level" className="block text-xs font-semibold text-text mb-2">Nivel de formación</label>
            <select id="refiner-level" value={refinerLevel} onChange={(event) => setRefinerLevel(event.target.value)} className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 mb-5">
              {LEVELS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>

            <label htmlFor="raw-prompt" className="block text-xs font-semibold text-text mb-2">Solicitud original</label>
            <textarea id="raw-prompt" value={rawPrompt} onChange={(event) => setRawPrompt(event.target.value)} rows={6} className="w-full resize-y bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />

            <div className="mt-5">
              <div className="text-xs font-semibold text-text mb-2">¿Qué quieres reforzar?</div>
              <div className="flex flex-wrap gap-2">
                {REFINEMENT_FOCUS.map((focus) => {
                  const isActive = refinerFocus.includes(focus.id)
                  return (
                    <button key={focus.id} type="button" aria-pressed={isActive} onClick={() => toggleFocus(focus.id)} className={`px-3 py-2 rounded-lg border text-[11px] font-semibold cursor-pointer transition-all ${isActive ? 'bg-primary text-white border-primary' : 'bg-surface text-text-light border-border hover:border-primary/30'}`}>
                      {isActive && <Check className="inline w-3 h-3 mr-1" />}
                      {focus.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-3xl overflow-hidden shadow-sm" aria-live="polite">
            <div className="flex items-center justify-between gap-3 p-5 border-b border-border">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-accent">Prompt refinado</div>
                <p className="text-xs text-text-lighter mt-1">Añade contexto, aprendizaje activo, evidencia y límites sin cambiar tu intención.</p>
              </div>
              <button type="button" onClick={() => onCopy(refinedPrompt, 'teacher-refiner')} className="inline-flex items-center gap-2 bg-text text-white px-3.5 py-2.5 rounded-xl font-semibold text-xs cursor-pointer hover:bg-text/90 transition-colors shrink-0">
                {copiedId === 'teacher-refiner' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedId === 'teacher-refiner' ? 'Copiado' : 'Copiar'}
              </button>
            </div>
            <pre className="whitespace-pre-wrap font-sans text-xs text-text-light leading-relaxed bg-text/[0.02] p-5 md:p-6 max-h-[520px] overflow-auto">{refinedPrompt}</pre>
            <div className="p-5 border-t border-border">
              <TryLinks text={refinedPrompt} />
            </div>
          </div>
        </div>
      )}

      {activeTool === 'acompanamiento' && (
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-5 items-start" role="tabpanel">
          <div className="bg-surface border border-border rounded-3xl p-5 md:p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-secondary/8 flex items-center justify-center">
                <Accessibility className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-display font-bold text-text text-xl tracking-tight">Empieza por observar</h3>
                <p className="text-xs text-text-lighter">Describe una barrera de la experiencia, no una etiqueta personal.</p>
              </div>
            </div>

            <div className="space-y-2 mb-5">
              {LEARNING_BARRIERS.map((item) => {
                const isActive = barrierId === item.id
                return (
                  <button key={item.id} type="button" aria-pressed={isActive} onClick={() => setBarrierId(item.id)} className={`w-full text-left px-4 py-3 rounded-xl border cursor-pointer transition-all ${isActive ? 'bg-secondary/8 border-secondary/30 text-text shadow-sm' : 'bg-surface border-border text-text-light hover:border-secondary/25'}`}>
                    <span className="block text-sm font-semibold">{item.label}</span>
                    {isActive && <span className="block text-[11px] leading-relaxed text-text-lighter mt-1">{item.observable}</span>}
                  </button>
                )
              })}
            </div>

            <label htmlFor="support-goal" className="block text-xs font-semibold text-text mb-2">Meta común de aprendizaje</label>
            <input id="support-goal" type="text" value={supportGoal} onChange={(event) => setSupportGoal(event.target.value)} className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 mb-4" />

            <label htmlFor="support-strength" className="block text-xs font-semibold text-text mb-2">Fortaleza, interés o apoyo disponible</label>
            <textarea id="support-strength" value={supportStrength} onChange={(event) => setSupportStrength(event.target.value)} rows={3} className="w-full resize-y bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10" />
          </div>

          <div className="bg-surface border border-border rounded-3xl overflow-hidden shadow-sm" aria-live="polite">
            <div className="p-5 md:p-7 border-b border-border">
              <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-secondary mb-1">Plan adaptable · misma meta, distintas rutas</div>
              <h3 className="font-display font-bold text-text text-xl md:text-2xl tracking-tight">{supportGoal || 'Define una meta de aprendizaje'}</h3>
              <p className="text-xs text-text-lighter mt-2"><span className="font-semibold text-text">Barrera observada:</span> {barrier.observable}</p>
            </div>

            <div className="grid md:grid-cols-3 border-b border-border">
              {[
                { label: 'Participación', icon: Compass, items: barrier.engagement, color: 'text-warm', bg: 'bg-warm/8' },
                { label: 'Representación', icon: Layers3, items: barrier.representation, color: 'text-primary', bg: 'bg-primary/8' },
                { label: 'Acción y expresión', icon: Workflow, items: barrier.expression, color: 'text-accent', bg: 'bg-accent/8' },
              ].map((route, index) => {
                const Icon = route.icon
                return (
                  <div key={route.label} className={`p-5 ${index < 2 ? 'border-b md:border-b-0 md:border-r border-border' : ''}`}>
                    <div className={`w-9 h-9 ${route.bg} rounded-xl flex items-center justify-center mb-3`}><Icon className={`w-4 h-4 ${route.color}`} /></div>
                    <h4 className="font-display font-bold text-text text-sm mb-3">{route.label}</h4>
                    <ul className="space-y-2 list-none p-0 m-0">
                      {route.items.map((item) => <li key={item} className="flex items-start gap-2 text-[11px] text-text-light leading-relaxed"><CheckCircle2 className={`w-3.5 h-3.5 ${route.color} mt-0.5 shrink-0`} />{item}</li>)}
                    </ul>
                  </div>
                )
              })}
            </div>

            <div className="p-5 md:p-7">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-4 h-4 text-secondary" />
                <h4 className="font-display font-bold text-text">Escalera de apoyo y retiro</h4>
              </div>
              <div className="grid md:grid-cols-3 gap-3 mb-5">
                {barrier.supports.map((support, index) => (
                  <div key={support} className="bg-text/[0.025] border border-border rounded-xl p-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-secondary">{index === 0 ? 'Para todos' : index === 1 ? 'Si persiste' : 'Comprobar autonomía'}</span>
                    <p className="text-[11px] text-text-light leading-relaxed mt-1.5">{support}</p>
                  </div>
                ))}
              </div>
              <div className="bg-accent/5 border border-accent/15 rounded-xl p-4 mb-5">
                <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-accent mb-1">Evidencia para ajustar</div>
                <p className="text-xs text-text-light leading-relaxed">{barrier.lookFor}</p>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-start gap-2 text-[11px] text-text-lighter leading-relaxed max-w-xl">
                  <ShieldCheck className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  Esta herramienta diseña apoyos pedagógicos; no diagnostica. Coordina con orientación, familia y profesionales cuando corresponda, sin compartir datos sensibles con la IA.
                </div>
                <button type="button" onClick={() => onCopy(adaptivePrompt, 'adaptive-plan')} className="inline-flex items-center gap-2 bg-text text-white px-3.5 py-2.5 rounded-xl font-semibold text-xs cursor-pointer hover:bg-text/90 transition-colors shrink-0">
                  {copiedId === 'adaptive-plan' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedId === 'adaptive-plan' ? 'Prompt copiado' : 'Copiar prompt del plan'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTool === 'refuerzos' && (
        <div className="grid lg:grid-cols-[0.72fr_1.28fr] gap-5 items-start" role="tabpanel">
          <div className="bg-surface border border-border rounded-3xl p-5 md:p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-accent/8 flex items-center justify-center"><Brain className="w-5 h-5 text-accent" /></div>
              <div>
                <h3 className="font-display font-bold text-text text-xl tracking-tight">Elige cómo reforzar</h3>
                <p className="text-xs text-text-lighter">Poca ayuda al inicio; más solo cuando haga falta.</p>
              </div>
            </div>

            <div className="space-y-2 mb-5">
              {REINFORCEMENTS.map((item) => {
                const isActive = reinforcementId === item.id
                return (
                  <button key={item.id} type="button" aria-pressed={isActive} onClick={() => chooseReinforcement(item.id)} className={`w-full text-left px-4 py-3 rounded-xl border cursor-pointer transition-all ${isActive ? 'bg-accent/8 border-accent/30 text-text' : 'bg-surface border-border text-text-light hover:border-accent/25'}`}>
                    <span className="block text-sm font-semibold">{item.label}</span>
                    <span className="block text-[11px] text-text-lighter mt-1">{item.purpose}</span>
                  </button>
                )
              })}
            </div>

            <div className="text-xs font-semibold text-text mb-2">Duración orientativa</div>
            <div className="flex gap-2">
              {['5', '10', '15'].map((minutes) => (
                <button key={minutes} type="button" aria-pressed={reinforcementMinutes === minutes} onClick={() => setReinforcementMinutes(minutes)} className={`flex-1 px-3 py-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${reinforcementMinutes === minutes ? 'bg-text text-white border-text' : 'bg-surface text-text-light border-border hover:border-accent/30'}`}>
                  {minutes} min
                </button>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden bg-text rounded-3xl p-6 md:p-9 shadow-lg min-h-[430px] flex flex-col" aria-live="polite">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative flex items-center justify-between gap-4 mb-9">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-300">Refuerzo · {reinforcementMinutes} minutos</div>
                <h3 className="font-display font-bold text-white text-xl md:text-2xl mt-1">{reinforcement.label}</h3>
              </div>
              <div className="flex gap-1.5" aria-label={`Paso ${reinforcementStep + 1} de ${reinforcement.steps.length}`}>
                {reinforcement.steps.map((step, index) => <span key={step.title} className={`h-1.5 rounded-full transition-all ${index === reinforcementStep ? 'w-8 bg-emerald-300' : index < reinforcementStep ? 'w-4 bg-emerald-300/40' : 'w-4 bg-white/15'}`} />)}
              </div>
            </div>

            <div className="relative flex-1 flex flex-col justify-center max-w-2xl">
              <span className="font-display font-extrabold text-white/10 text-6xl md:text-7xl leading-none">0{reinforcementStep + 1}</span>
              <h4 className="font-display font-bold text-white text-2xl md:text-3xl tracking-tight -mt-2 mb-4">{currentReinforcementStep.title}</h4>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">{currentReinforcementStep.body(supportGoal)}</p>
            </div>

            <div className="relative mt-9 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-2 text-[11px] text-white/45"><Lightbulb className="w-4 h-4 text-amber-300" />La pista aparece después del intento, no antes.</div>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => onCopy(reinforcementPrompt, 'reinforcement')} className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/15 px-3.5 py-2.5 rounded-xl font-semibold text-xs cursor-pointer hover:bg-white/15 transition-colors">
                  {copiedId === 'reinforcement' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedId === 'reinforcement' ? 'Copiado' : 'Copiar para la IA'}
                </button>
                <button type="button" onClick={advanceReinforcement} className="inline-flex items-center gap-2 bg-white text-text px-4 py-2.5 rounded-xl font-semibold text-xs cursor-pointer hover:bg-white/90 transition-colors">
                  {reinforcementStep === reinforcement.steps.length - 1 ? 'Reiniciar' : 'Siguiente paso'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-text/[0.025] border border-border rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <GraduationCap className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
          <p className="text-xs text-text-light leading-relaxed"><span className="font-semibold text-text">Principio común:</span> adapta el acceso, los apoyos y las formas de expresión; conserva una meta significativa y observa cuándo el estudiante puede continuar con menos ayuda.</p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <a href="https://udlguidelines.cast.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary no-underline hover:underline">Guías DUA de CAST <ExternalLink className="w-3 h-3" /></a>
          <a href="https://www.unesco.org/en/articles/ai-and-education-protecting-rights-learners" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent no-underline hover:underline">Derechos del estudiante · UNESCO <ExternalLink className="w-3 h-3" /></a>
        </div>
      </div>
    </section>
  )
}
