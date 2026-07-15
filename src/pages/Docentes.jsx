import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Accessibility,
  ArrowRight,
  BarChart3,
  BookOpen,
  Bot,
  Brain,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  Copy,
  ExternalLink,
  FileText,
  FlaskConical,
  Globe2,
  GraduationCap,
  Layers3,
  Lightbulb,
  MessageSquareText,
  Palette,
  Presentation,
  School,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Target,
  University,
  Users,
  WandSparkles,
  Workflow,
  XCircle,
} from 'lucide-react'
import { getToolById } from '../utils/recommender'
import { ToolFavicon } from '../components/ToolCard'

const SUITE_ORBIT = [
  { label: 'Conversar', icon: Bot, to: '/herramienta/chatgpt', position: 'top-0 left-1/2 -translate-x-1/2' },
  { label: 'Investigar', icon: Search, to: '/explorar?categoria=investigacion', position: 'top-[22%] right-0' },
  { label: 'Presentar', icon: Presentation, to: '/explorar?categoria=presentaciones', position: 'bottom-[12%] right-[4%]' },
  { label: 'Automatizar', icon: Workflow, to: '/explorar?categoria=automatizacion', position: 'bottom-0 left-1/2 -translate-x-1/2' },
  { label: 'Analizar datos', icon: BarChart3, to: '/explorar?categoria=datos', position: 'bottom-[12%] left-[4%]' },
  { label: 'Crear visuales', icon: Palette, to: '/explorar?categoria=diseno', position: 'top-[22%] left-0' },
]

const PRINCIPLES = [
  {
    number: '01',
    title: 'La pedagogía manda',
    body: 'Empieza por el objetivo de aprendizaje y la evidencia que esperas observar. La herramienta se elige al final.',
    icon: Target,
  },
  {
    number: '02',
    title: 'La IA propone; tú respondes',
    body: 'El criterio profesional, la relación con el grupo y la decisión sobre qué enseñar siguen siendo humanos.',
    icon: Brain,
  },
  {
    number: '03',
    title: 'Haz visible el proceso',
    body: 'Pide borradores, fuentes, decisiones y reflexión. Evalúa cómo se llegó al resultado, no solo el producto final.',
    icon: Layers3,
  },
  {
    number: '04',
    title: 'Protege antes de probar',
    body: 'No subas datos personales, calificaciones ni trabajos identificables sin autorización y protocolo institucional.',
    icon: ShieldCheck,
  },
]

const DECISION_ZONES = [
  {
    label: 'Conserva en tus manos',
    title: 'Decisiones de alto impacto',
    examples: 'Calificar, acompañar, priorizar, intervenir y decidir qué cuenta como aprendizaje.',
    color: 'border-secondary/25 bg-secondary/[0.04]',
    accent: 'text-secondary',
  },
  {
    label: 'Co-crea con IA',
    title: 'Trabajo pedagógico asistido',
    examples: 'Diseñar variantes, anticipar errores, preparar preguntas y bosquejar retroalimentación.',
    color: 'border-primary/25 bg-primary/[0.04]',
    accent: 'text-primary',
  },
  {
    label: 'Explora y contrasta',
    title: 'Búsqueda de alternativas',
    examples: 'Probar ejemplos, comparar enfoques, mapear fuentes y simular escenarios.',
    color: 'border-accent/25 bg-accent/[0.04]',
    accent: 'text-accent',
  },
  {
    label: 'Automatiza con revisión',
    title: 'Tareas repetitivas',
    examples: 'Dar formato, resumir notas propias, transcribir, clasificar y convertir materiales.',
    color: 'border-warm/25 bg-warm/[0.04]',
    accent: 'text-warm',
  },
]

const GLOBAL_EXAMPLES = [
  {
    step: '01',
    flag: '🇸🇬',
    place: 'Singapur',
    idea: 'Asistentes distintos para tareas distintas',
    practice: 'Su plataforma educativa integra asistentes para autoría, retroalimentación, aprendizaje guiado y rutas adaptativas, con salvaguardas por edad.',
    replicate: 'Crea una carpeta por función: planear, preguntar, retroalimentar y adaptar. Usa un prompt estable y una herramienta adecuada para cada función.',
    tools: ['chatgpt', 'notebooklm', 'quizlet'],
    source: 'https://www.moe.gov.sg/education-in-sg/educational-technology-journey/edtech-masterplan/artificial-intelligence-in-education',
  },
  {
    step: '02',
    flag: '🇪🇪',
    place: 'Estonia',
    idea: 'Primero se prepara al profesorado',
    practice: 'AI Leap comenzó combinando acceso a herramientas con formación docente, antes de escalar el uso autónomo del estudiantado.',
    replicate: 'Haz un piloto entre pares: una tarea, dos herramientas, una rúbrica común y una conversación semanal sobre lo que funcionó y lo que falló.',
    tools: ['claude', 'gemini', 'chatgpt'],
    source: 'https://www.hm.ee/en/news/estonia-announces-groundbreaking-national-initiative-ai-leap-programme-bring-ai-tools-all',
  },
  {
    step: '03',
    flag: '🇦🇺',
    place: 'Australia',
    idea: 'Reglas compartidas antes de escalar',
    practice: 'El marco nacional para escuelas articula enseñanza, bienestar, transparencia, equidad, responsabilidad y protección de datos.',
    replicate: 'Publica una hoja de una página: qué está permitido, qué exige declaración, qué requiere autorización y qué no debe subirse.',
    tools: ['notebooklm', 'canva', 'copilot'],
    source: 'https://www.education.gov.au/schooling/resources/australian-framework-generative-artificial-intelligence-ai-schools',
  },
  {
    step: '04',
    flag: '🌍',
    place: 'Marco global',
    idea: 'Aprender en progresión, no de golpe',
    practice: 'La referencia de UNESCO organiza el desarrollo docente en una progresión: adquirir fundamentos, profundizar la práctica y crear nuevas soluciones.',
    replicate: 'Construye un portafolio con tres evidencias: un uso seguro, una mejora pedagógica verificable y un diseño propio que puedas enseñar a otra persona.',
    tools: ['perplexity', 'elicit', 'gamma'],
    source: 'https://www.unesco.org/en/articles/ai-competency-framework-teachers',
  },
]

const PROFILES = [
  {
    id: 'escolar',
    label: 'Básica y media',
    icon: School,
    title: 'Docencia escolar',
    description: 'Para profesoras y profesores que necesitan adaptar una misma clase a ritmos distintos, crear material y acompañar a menores con criterio.',
    needs: ['Planeación por estándares y DBA', 'Material multinivel', 'Preguntas de comprensión', 'Comunicación con familias'],
    firstMove: 'Toma una clase que ya funciona y pídele a la IA tres variaciones: apoyo, nivel esperado y profundización. Revisa lenguaje, ejemplos locales y carga cognitiva antes de llevarlas al aula.',
    tools: ['chatgpt', 'canva', 'notebooklm', 'quizlet'],
  },
  {
    id: 'superior',
    label: 'Educación superior',
    icon: University,
    title: 'Profesorado universitario',
    description: 'Para seminarios, cursos de pregrado y posgrado que quieren integrar investigación, tutoría y evaluación auténtica sin diluir el rigor.',
    needs: ['Lecturas con fuentes', 'Diseño de rúbricas', 'Casos y simulaciones', 'Retroalimentación formativa'],
    firstMove: 'Rediseña una tarea fácilmente automatizable: añade contexto local, defensa oral breve, evidencia de decisiones y una nota de transparencia sobre el uso de IA.',
    tools: ['notebooklm', 'claude', 'elicit', 'consensus'],
  },
  {
    id: 'tecnica',
    label: 'Técnica y tecnológica',
    icon: BriefcaseBusiness,
    title: 'Formación para el trabajo',
    description: 'Para aprender haciendo: demostraciones, simulaciones de oficio, guías operativas y práctica deliberada conectada con situaciones reales.',
    needs: ['Guías paso a paso', 'Escenarios de seguridad', 'Simulación de clientes', 'Listas de verificación'],
    firstMove: 'Convierte un procedimiento real en una simulación conversacional. Define el rol de la IA, los errores que debe introducir y la lista de cotejo con la que observarás el desempeño.',
    tools: ['chatgpt', 'gemini', 'synthesia', 'canva'],
  },
  {
    id: 'liderazgo',
    label: 'Liderazgo académico',
    icon: Users,
    title: 'Coordinación y dirección',
    description: 'Para quienes acompañan equipos docentes, diseñan orientaciones institucionales y necesitan gobernar la adopción, no solo comprar licencias.',
    needs: ['Política de uso', 'Formación entre pares', 'Mapa de riesgos', 'Seguimiento pedagógico'],
    firstMove: 'Acuerda tres zonas institucionales: usos permitidos, usos que requieren autorización y usos prohibidos. Pilota durante cuatro semanas con un equipo pequeño y documenta evidencia.',
    tools: ['notebooklm', 'copilot', 'gemini', 'chatgpt'],
  },
]

const CYCLE = [
  {
    id: 'planear',
    label: 'Planear',
    kicker: 'Antes de clase',
    icon: Compass,
    color: 'text-primary',
    bg: 'bg-primary/8',
    title: 'Diseña desde la evidencia de aprendizaje',
    description: 'Usa la IA como colega de diseño: para tensionar una secuencia, anticipar errores y alinear objetivo, actividad y evaluación.',
    do: [
      'Transformar un objetivo amplio en resultados observables',
      'Anticipar ideas previas y errores frecuentes',
      'Crear una secuencia con tiempos y momentos de verificación',
      'Adaptar ejemplos al contexto colombiano o territorial',
    ],
    prompt: `Actúa como colega de diseño pedagógico. Voy a enseñar [TEMA] a estudiantes de [NIVEL/EDAD] en [CONTEXTO]. El resultado de aprendizaje es: [RESULTADO OBSERVABLE].\n\nDiseña una clase de [DURACIÓN] que incluya:\n1. una activación de saberes previos de máximo 5 minutos;\n2. una explicación breve con un ejemplo cercano al contexto;\n3. una actividad en la que el estudiante tome decisiones;\n4. dos preguntas de verificación durante la clase;\n5. una evidencia de salida que yo pueda revisar en 3 minutos.\n\nAntes de proponer, señala cualquier desalineación entre el objetivo y la evidencia. No inventes estándares: si no los proporciono, pregunta por ellos.`,
    tools: ['chatgpt', 'claude', 'gemini'],
  },
  {
    id: 'crear',
    label: 'Crear',
    kicker: 'Materiales',
    icon: Presentation,
    color: 'text-warm',
    bg: 'bg-warm/10',
    title: 'Produce materiales que sí enseñan',
    description: 'Genera borradores de guías, casos, visuales y preguntas. Luego edita para precisión, accesibilidad, tono y carga cognitiva.',
    do: [
      'Convertir una lectura en guía de estudio',
      'Crear ejemplos y contraejemplos graduados',
      'Preparar diapositivas con una idea por pantalla',
      'Generar glosarios y apoyos visuales',
    ],
    prompt: `Convierte el contenido que pegaré al final en una guía de aprendizaje para [NIVEL]. Conserva las ideas esenciales y organiza el material así: pregunta guía, cinco conceptos clave, ejemplo trabajado, contraejemplo, práctica guiada, práctica autónoma y ticket de salida.\n\nUsa lenguaje claro sin simplificar el contenido disciplinar. Marca con [VERIFICAR] cualquier afirmación que requiera fuente. Incluye texto alternativo sugerido para cada recurso visual.\n\nCONTENIDO FUENTE:\n[PEGA AQUÍ EL MATERIAL]`,
    tools: ['canva', 'gamma', 'notebooklm'],
  },
  {
    id: 'diferenciar',
    label: 'Diferenciar',
    kicker: 'Inclusión',
    icon: Accessibility,
    color: 'text-accent',
    bg: 'bg-accent/10',
    title: 'Abre más caminos hacia el mismo objetivo',
    description: 'Ajusta apoyos, no expectativas. La IA puede proponer andamiajes, formatos alternativos y práctica adicional sin etiquetar al estudiante.',
    do: [
      'Crear tres niveles de andamiaje para una tarea',
      'Proponer alternativas de representación y expresión',
      'Reescribir instrucciones en lenguaje claro',
      'Preparar retos de profundización sin más trabajo repetitivo',
    ],
    prompt: `El objetivo común es [OBJETIVO] y la tarea es [TAREA]. Propón tres rutas para llegar a la misma evidencia de aprendizaje:\n- Ruta A: apoyo intensivo, con modelado y pasos visibles;\n- Ruta B: apoyo gradual, con pistas que se retiran;\n- Ruta C: profundización, con mayor complejidad conceptual.\n\nNo reduzcas el objetivo ni diagnostiques al estudiante. Para cada ruta indica: apoyo ofrecido, decisión que conserva el estudiante, evidencia esperada y señal para retirar el apoyo.`,
    tools: ['chatgpt', 'gemini', 'canva'],
  },
  {
    id: 'evaluar',
    label: 'Evaluar',
    kicker: 'Evidencia',
    icon: ClipboardCheck,
    color: 'text-secondary',
    bg: 'bg-secondary/8',
    title: 'Evalúa lo que una respuesta automática no demuestra',
    description: 'Mueve el centro desde el producto final hacia decisiones, transferencia, contraste de fuentes y explicación del propio proceso.',
    do: [
      'Construir rúbricas con criterios observables',
      'Diseñar defensas orales y variaciones en vivo',
      'Pedir bitácora de decisiones y declaración de uso de IA',
      'Crear casos locales que exijan transferir, no repetir',
    ],
    prompt: `Rediseña esta evaluación para que produzca evidencia auténtica de aprendizaje aunque el estudiante pueda usar IA: [EVALUACIÓN ACTUAL].\n\nMantén el objetivo [OBJETIVO] y agrega: una decisión contextual, un artefacto intermedio, contraste de dos fuentes, una variación individual en clase, defensa oral de 3 minutos y declaración de uso de IA. Crea una rúbrica de 4 criterios × 4 niveles con descriptores observables. No uses como criterio "parece escrito por IA".`,
    tools: ['claude', 'chatgpt', 'notebooklm'],
  },
  {
    id: 'retroalimentar',
    label: 'Retroalimentar',
    kicker: 'Después de clase',
    icon: MessageSquareText,
    color: 'text-primary',
    bg: 'bg-primary/8',
    title: 'Acelera el borrador, conserva la conversación',
    description: 'La IA puede agrupar patrones y sugerir comentarios. La retroalimentación final debe reconocer el trabajo real, priorizar y abrir un siguiente paso.',
    do: [
      'Agrupar errores comunes sin identificar personas',
      'Convertir notas dispersas en feedback accionable',
      'Preparar ejemplos anónimos para retroalimentación colectiva',
      'Diseñar preguntas de revisión en lugar de corregir todo',
    ],
    prompt: `A partir de esta producción anonimizada, redacta un borrador de retroalimentación formativa. Usa la estructura: 1) logro específico con evidencia; 2) una prioridad de mejora; 3) pregunta que ayude a revisar; 4) siguiente acción concreta de máximo 15 minutos.\n\nRúbrica: [CRITERIOS].\nProducción anonimizada: [TEXTO].\n\nNo asignes nota, no infieras intención ni identidad y no reescribas el trabajo por el estudiante.`,
    tools: ['claude', 'chatgpt', 'grammarly'],
  },
  {
    id: 'investigar',
    label: 'Investigar',
    kicker: 'Desarrollo profesional',
    icon: FlaskConical,
    color: 'text-accent',
    bg: 'bg-accent/10',
    title: 'Convierte la búsqueda en una práctica trazable',
    description: 'Usa herramientas con fuentes para mapear literatura, comparar enfoques y preparar preguntas. Verifica siempre en el documento original.',
    do: [
      'Mapear conceptos y autores antes de una revisión',
      'Comparar resultados de varios artículos',
      'Crear una matriz de evidencia con citas verificables',
      'Preparar un club de lectura o seminario',
    ],
    prompt: `Ayúdame a construir una ruta de investigación sobre [PREGUNTA]. Separa la respuesta en: conceptos de búsqueda, sinónimos en español e inglés, bases sugeridas, criterios de inclusión/exclusión y una matriz para registrar autor, año, método, muestra, hallazgo, limitación y enlace.\n\nNo inventes referencias. Si propones una fuente, entrega DOI o URL verificable y marca claramente cuándo estás haciendo una inferencia.`,
    tools: ['perplexity', 'elicit', 'consensus', 'notebooklm'],
  },
]

const ASSESSMENT_MOVES = [
  {
    from: 'Ensayo genérico para entregar',
    to: 'Análisis de un caso local + fuentes + defensa oral',
    evidence: 'Transferencia, selección de evidencia y argumentación',
  },
  {
    from: 'Problemas idénticos para todo el grupo',
    to: 'Datos o restricciones variables + explicación de decisiones',
    evidence: 'Procedimiento, adaptación y razonamiento',
  },
  {
    from: 'Presentación final sin proceso',
    to: 'Borrador, retroalimentación, versión final y bitácora',
    evidence: 'Iteración, criterio y aprendizaje a partir del feedback',
  },
  {
    from: 'Prohibición silenciosa de IA',
    to: 'Regla explícita: qué se permite, cómo se cita y qué se defiende',
    evidence: 'Autoría transparente y uso responsable',
  },
]

const DATA_LIGHTS = [
  {
    level: 'Nunca en una IA pública',
    icon: XCircle,
    color: 'text-rose-700',
    border: 'border-rose-200',
    bg: 'bg-rose-50',
    items: ['Nombres, documentos o contactos de estudiantes', 'Calificaciones o historias académicas identificables', 'Información de salud, discapacidad o convivencia', 'Fotografías, voces o trabajos de menores sin autorización'],
  },
  {
    level: 'Solo con protocolo institucional',
    icon: ShieldAlert,
    color: 'text-amber-700',
    border: 'border-amber-200',
    bg: 'bg-amber-50',
    items: ['Cuentas creadas por estudiantes', 'Grabación y transcripción de clase', 'Integraciones con LMS o correo institucional', 'Analítica individual para decisiones de evaluación'],
  },
  {
    level: 'Buen punto de partida',
    icon: CheckCircle2,
    color: 'text-emerald-700',
    border: 'border-emerald-200',
    bg: 'bg-emerald-50',
    items: ['Material propio sin datos personales', 'Casos ficticios o datos anonimizados', 'Normas, lecturas y recursos de acceso autorizado', 'Ideas, estructuras y borradores que revisarás tú'],
  },
]

const PROMPTS = [
  {
    id: 'preguntas',
    group: 'clase',
    label: 'Preguntas que revelan comprensión',
    description: 'Para comprobar razonamiento, no memoria superficial.',
    body: `Sobre [TEMA] y para [NIVEL], crea seis preguntas en progresión: recordar, explicar con palabras propias, aplicar en un caso nuevo, comparar dos enfoques, detectar un error y justificar una decisión. Para cada pregunta incluye respuesta esperada, error frecuente y una repregunta que ayude sin revelar la solución.`,
  },
  {
    id: 'caso',
    group: 'clase',
    label: 'Caso situado en Colombia',
    description: 'Para llevar un concepto a una decisión contextual.',
    body: `Diseña un caso breve sobre [CONCEPTO] situado en [MUNICIPIO/SECTOR COLOMBIANO]. Debe contener datos suficientes, dos tensiones reales, tres posibles decisiones y ninguna respuesta obvia. Añade preguntas para análisis individual, discusión en grupo y cierre. Separa los hechos verificables de los elementos ficticios del caso.`,
  },
  {
    id: 'socratico',
    group: 'clase',
    label: 'Tutor socrático',
    description: 'Para practicar sin entregar la respuesta.',
    body: `Actúa como tutor socrático de [ASIGNATURA]. El estudiante intentará resolver [TIPO DE PROBLEMA]. No des la respuesta final. Haz una pregunta a la vez, identifica el último paso correcto, ofrece una pista graduada si se bloquea y pide que explique su decisión antes de continuar. Al final, solicita una síntesis del procedimiento y un ejemplo nuevo.`,
  },
  {
    id: 'rubrica',
    group: 'evaluacion',
    label: 'Rúbrica observable',
    description: 'Para evitar criterios vagos como “excelente” o “creativo”.',
    body: `Crea una rúbrica analítica para [TAREA] alineada con [RESULTADO DE APRENDIZAJE]. Usa cuatro criterios y cuatro niveles. Cada descriptor debe mencionar una evidencia observable y distinguirse claramente del nivel anterior. Incluye un criterio sobre razonamiento o decisiones, no sobre estilo superficial. Revisa al final si la rúbrica podría aplicarse de forma consistente por dos docentes.`,
  },
  {
    id: 'feedback',
    group: 'evaluacion',
    label: 'Banco de retroalimentación',
    description: 'Para preparar comentarios que abren un siguiente paso.',
    body: `A partir de esta rúbrica [RÚBRICA], crea un banco de comentarios formativos organizado por criterio. Cada comentario debe: describir una evidencia, explicar por qué importa y proponer una acción concreta. Evita elogios genéricos, juicios sobre la persona y respuestas que hagan la tarea por el estudiante.`,
  },
  {
    id: 'transparencia',
    group: 'evaluacion',
    label: 'Declaración de uso de IA',
    description: 'Para convertir el uso oculto en una decisión discutible.',
    body: `Diseña una declaración de uso de IA de máximo 150 palabras para acompañar una entrega académica. Debe pedir: herramienta utilizada, propósito, prompts o acciones principales, fragmentos modificados, fuentes verificadas, decisiones que conservó el autor y limitaciones encontradas. Incluye una opción clara para declarar que no se utilizó IA.`,
  },
  {
    id: 'lectura',
    group: 'investigacion',
    label: 'Lectura crítica con fuentes',
    description: 'Para conversar con documentos sin perder trazabilidad.',
    body: `Usa únicamente los documentos que te proporcionaré. Construye una tabla con tesis, evidencia, método, limitaciones y cita textual corta con número de página. Después formula tres desacuerdos posibles entre las fuentes y dos preguntas que el corpus no permite responder. Si algo no aparece, responde “no está en las fuentes”.`,
  },
  {
    id: 'secuencia',
    group: 'investigacion',
    label: 'Seminario de investigación',
    description: 'Para pasar del resumen a la discusión académica.',
    body: `Diseña un seminario de 90 minutos sobre [TEMA] a partir de [LECTURAS]. Incluye una pregunta polémica pero académicamente defendible, mapa de posiciones, actividad de contraste de métodos, pausa de escritura individual y síntesis final. Señala qué afirmaciones deben verificarse directamente en cada lectura.`,
  },
]

const WEEK_PLAN = [
  { day: 'Día 1', title: 'Elige una fricción', body: 'Identifica una tarea repetitiva que te quite tiempo y no requiera datos personales.' },
  { day: 'Día 2', title: 'Compara dos borradores', body: 'Prueba la misma instrucción en dos herramientas. Evalúa precisión, sesgos y facilidad de edición.' },
  { day: 'Día 3', title: 'Llévalo a una clase', body: 'Usa solo una pieza pequeña: una pregunta, un ejemplo o una guía. No rediseñes todo el curso.' },
  { day: 'Día 4', title: 'Recoge evidencia', body: 'Observa si mejoró la comprensión, la participación o tu tiempo. Pregunta al grupo qué cambió.' },
  { day: 'Día 5', title: 'Decide con criterio', body: 'Conserva, modifica o descarta. Documenta el prompt, el resultado y la regla que aprendiste.' },
]

const SOURCES = [
  {
    label: 'Marco de competencias en IA para docentes',
    org: 'UNESCO · actualizado en 2026',
    url: 'https://www.unesco.org/en/articles/ai-competency-framework-teachers',
  },
  {
    label: 'Orientación sobre IA generativa en educación e investigación',
    org: 'UNESCO',
    url: 'https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research',
  },
  {
    label: 'ImpActo Maker: formación de estudiantes y docentes',
    org: 'Ministerio de Educación Nacional · julio 2026',
    url: 'https://www.mineducacion.gov.co/portal/salaprensa/Comunicados/429459:Mas-de-22-mil-estudiantes-y-docentes-se-formaron-en-IA-gracias-a-la-estrategia-ImpActo-Maker-del-Ministerio-de-Educacion',
  },
  {
    label: 'Ley 1581 de 2012: protección de datos personales',
    org: 'Gestor Normativo de Función Pública',
    url: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981',
  },
  {
    label: 'IA en educación y Student Learning Space',
    org: 'Ministerio de Educación de Singapur · 2025',
    url: 'https://www.moe.gov.sg/education-in-sg/educational-technology-journey/edtech-masterplan/artificial-intelligence-in-education',
  },
  {
    label: 'AI Leap: formación y herramientas para escuelas',
    org: 'Ministerio de Educación e Investigación de Estonia · 2025',
    url: 'https://www.hm.ee/en/news/estonia-announces-groundbreaking-national-initiative-ai-leap-programme-bring-ai-tools-all',
  },
  {
    label: 'Marco australiano de IA generativa en escuelas',
    org: 'Departamento de Educación de Australia · revisión 2025',
    url: 'https://www.education.gov.au/schooling/resources/australian-framework-generative-artificial-intelligence-ai-schools',
  },
]

function ToolOrbit() {
  return (
    <div
      className="relative w-full max-w-[430px] aspect-square mx-auto"
    >
      <p className="sr-only">Mapa de seis rutas para usar las herramientas de la página: conversar, investigar, presentar, automatizar, analizar datos y crear visuales.</p>
      <div className="absolute inset-[17%] rounded-full border border-primary/15 bg-surface/55 backdrop-blur-sm shadow-xl pointer-events-none" />
      <div className="absolute inset-[30%] rounded-full border border-dashed border-accent/25 animate-[spin_28s_linear_infinite] motion-reduce:animate-none pointer-events-none" />
      <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-text text-white flex flex-col items-center justify-center text-center shadow-xl z-10">
        <GraduationCap className="w-8 h-8 mb-2 text-amber-300" />
        <span className="font-display font-bold text-sm leading-tight">Tu reto<br />docente</span>
      </div>
      {SUITE_ORBIT.map((item) => {
        const Icon = item.icon
        return (
          <Link
            key={item.label}
            to={item.to}
            className={`absolute ${item.position} z-20 group flex flex-col items-center gap-1.5 no-underline`}
            aria-label={`${item.label}: explorar herramientas`}
          >
            <span className="w-14 h-14 rounded-2xl bg-surface border border-border shadow-md flex items-center justify-center group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-lg transition-all">
              <Icon className="w-6 h-6 text-primary" />
            </span>
            <span className="text-[11px] font-semibold text-text bg-bg/80 px-2 py-0.5 rounded-full">{item.label}</span>
          </Link>
        )
      })}
      <div className="absolute inset-[10%] rounded-full border border-border/70 pointer-events-none" />
      <div className="absolute inset-[21%] rounded-full border border-dashed border-primary/15 pointer-events-none" />
    </div>
  )
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
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.06] border border-white/10 text-[11px] font-semibold text-white/70 no-underline hover:border-white/25 hover:text-white transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
            {tool.name}
          </Link>
        )
      })}
    </div>
  )
}

function ToolMini({ id }) {
  const tool = getToolById(id)
  if (!tool) return null

  return (
    <Link
      to={`/herramienta/${tool.id}`}
      className="group flex items-center gap-3 bg-surface border border-border rounded-xl p-3 no-underline hover:shadow-md hover:-translate-y-0.5 hover:border-primary/40 transition-all duration-200"
    >
      <ToolFavicon tool={tool} />
      <div className="min-w-0 flex-1">
        <div className="font-semibold text-text text-sm truncate tracking-tight">{tool.name}</div>
        <div className="text-[11px] text-text-lighter truncate">{tool.bestFor}</div>
      </div>
      <ArrowRight className="w-4 h-4 text-text-lighter group-hover:text-primary transition-colors shrink-0" />
    </Link>
  )
}

export default function Docentes() {
  const [activeProfile, setActiveProfile] = useState(PROFILES[0].id)
  const [activeStage, setActiveStage] = useState(CYCLE[0].id)
  const [promptGroup, setPromptGroup] = useState('clase')
  const [copiedId, setCopiedId] = useState(null)

  const profile = PROFILES.find((item) => item.id === activeProfile) || PROFILES[0]
  const stage = CYCLE.find((item) => item.id === activeStage) || CYCLE[0]
  const ProfileIcon = profile.icon
  const StageIcon = stage.icon
  const visiblePrompts = PROMPTS.filter((prompt) => prompt.group === promptGroup)

  function copyPrompt(text, id) {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {})
    }
    setCopiedId(id)
    window.setTimeout(() => setCopiedId(null), 1600)
  }

  return (
    <div className="bg-bg">
      <section className="relative px-4 hero-gradient noise-overlay overflow-x-clip py-16 md:py-24">
        <div className="absolute inset-0 dot-pattern pointer-events-none" />
        <div className="absolute -top-16 -left-24 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-24 -right-24 w-80 h-80 bg-warm/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-7 border border-accent/15 shadow-sm">
              <GraduationCap className="w-4 h-4" />
              Una herramienta docente de Santiago Jiménez
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-text leading-[1.05] tracking-tight mb-6">
              IA para <span className="text-gradient-primary">profesoras</span>
              <br className="hidden sm:block" />
              <span className="text-text-light font-bold"> y profesores</span>
            </h1>
            <p className="text-text-light text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-7">
              Aprende a elegir, combinar y supervisar las herramientas de IA de esta página para resolver retos reales de enseñanza sin perder el criterio pedagógico.
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
              <a href="#ruta" className="inline-flex items-center gap-2 bg-text text-white px-5 py-2.5 rounded-xl font-semibold no-underline hover:bg-text/90 hover:shadow-lg transition-all text-sm">
                <Compass className="w-4 h-4" />
                Encuentra tu ruta
              </a>
              <a href="#mundo" className="inline-flex items-center gap-2 bg-surface border border-border text-text px-5 py-2.5 rounded-xl font-semibold no-underline hover:border-accent/40 hover:shadow-md transition-all text-sm">
                <Globe2 className="w-4 h-4 text-accent" />
                Ejemplos globales
              </a>
              <a href="#prompts" className="inline-flex items-center gap-2 bg-surface border border-border text-text px-5 py-2.5 rounded-xl font-semibold no-underline hover:border-warm/40 hover:shadow-md transition-all text-sm">
                <Copy className="w-4 h-4 text-warm" />
                Prompts listos
              </a>
            </div>
          </div>

          <div className="relative min-h-[360px] sm:min-h-[430px] flex items-center">
            <div className="absolute inset-[12%] bg-gradient-to-br from-primary/10 via-accent/5 to-warm/10 rounded-full blur-2xl" />
            <ToolOrbit />
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-5xl mx-auto px-4 -mt-5 md:-mt-8 pb-8">
        <div className="bg-surface border border-border rounded-3xl p-6 md:p-8 shadow-lg">
          <div className="grid lg:grid-cols-[1fr_1.15fr] gap-7 items-center">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent text-white font-display font-extrabold flex items-center justify-center shrink-0">SJ</div>
              <div>
                <p className="font-display font-semibold text-text text-lg md:text-xl leading-snug tracking-tight">
                  “Construí esta herramienta para que ningún profesor tenga que perseguir cada novedad de IA. Lo importante es aprender a elegir, revisar y enseñar mejor.”
                </p>
                <p className="text-xs text-text-lighter mt-3">Santiago Jiménez Londoño · creador de ¿Qué IA necesito?</p>
              </div>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-2 items-center" role="img" aria-label="Ruta de uso: empezar por el reto docente, elegir una herramienta, aplicar criterio profesional y llevar el resultado al aula">
              {[
                { n: '1', label: 'Reto docente', color: 'bg-primary/10 text-primary' },
                { n: '2', label: 'Herramienta', color: 'bg-warm/10 text-warm' },
                { n: '3', label: 'Tu criterio', color: 'bg-secondary/8 text-secondary' },
                { n: '4', label: 'Mejor aula', color: 'bg-accent/10 text-accent' },
              ].map((item, index) => (
                <div key={item.n} className="contents">
                  <div className="flex flex-col items-center text-center gap-1.5">
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-display font-extrabold text-sm ${item.color}`}>{item.n}</span>
                    <span className="text-[10px] font-semibold text-text-light leading-tight">{item.label}</span>
                  </div>
                  {index < 3 && <ArrowRight className="hidden sm:block w-4 h-4 text-text-lighter" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-primary/10">
            <Lightbulb className="w-3 h-3" />
            Antes de abrir una herramienta
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-text tracking-tight mb-2">Cuatro decisiones que cuidan tu oficio</h2>
          <p className="text-text-light text-sm max-w-2xl mx-auto">La competencia digital docente no empieza en el prompt. Empieza al decidir cuándo la IA aporta y cuándo estorba.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRINCIPLES.map((principle) => {
            const Icon = principle.icon
            return (
              <article key={principle.number} className="group relative bg-surface rounded-2xl border border-border p-5 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/30 transition-all overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center ring-4 ring-primary/5">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-display font-extrabold text-text-lighter/40 text-3xl tracking-tighter">{principle.number}</span>
                </div>
                <h3 className="font-display font-bold text-text text-base tracking-tight mb-2">{principle.title}</h3>
                <p className="text-xs text-text-light leading-relaxed">{principle.body}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[0.72fr_1.28fr] gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-secondary/8 text-secondary px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-secondary/10">
              <Brain className="w-3 h-3" />
              Gráfico de decisión
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text tracking-tight mb-3">Qué delegar y qué conservar</h2>
            <p className="text-sm text-text-light leading-relaxed mb-5">
              Cuanto mayor sea el impacto de una decisión sobre el aprendizaje o el bienestar, mayor debe ser tu control. La IA gana terreno cuando la tarea es repetitiva y reversible.
            </p>
            <div className="flex items-start gap-3 bg-surface border border-border rounded-2xl p-4">
              <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <Target className="w-4.5 h-4.5 text-accent" />
              </div>
              <p className="text-xs text-text-light leading-relaxed">
                <span className="font-semibold text-text">Regla práctica:</span> si un error puede cambiar una nota, una oportunidad o la relación con un estudiante, la decisión final no se delega.
              </p>
            </div>
          </div>

          <div
            className="relative pl-8 pb-8"
            role="img"
            aria-label="Matriz que cruza impacto pedagógico y repetición. Las decisiones de alto impacto se conservan en manos del docente; las tareas repetitivas se pueden automatizar con revisión."
          >
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[10px] font-bold uppercase tracking-[0.12em] text-text-lighter whitespace-nowrap">
              Impacto pedagógico →
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

      <section id="ruta" className="max-w-6xl mx-auto px-4 py-10 scroll-mt-20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-accent/15">
            <Users className="w-3 h-3" />
            Empieza por tu contexto
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-text tracking-tight mb-2">¿Dónde enseñas?</h2>
          <p className="text-text-light text-sm max-w-2xl mx-auto">La misma herramienta cambia de valor según la edad, la disciplina, la autonomía del grupo y la responsabilidad institucional.</p>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-5 items-start">
          <div className="bg-surface border border-border rounded-2xl p-2" role="tablist" aria-label="Tipo de docencia">
            {PROFILES.map((item) => {
              const Icon = item.icon
              const isActive = item.id === activeProfile
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveProfile(item.id)}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-none text-left cursor-pointer transition-all ${isActive ? 'bg-text text-white shadow-md' : 'bg-transparent text-text-light hover:bg-text/4 hover:text-text'}`}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-accent'}`} />
                  <span className="font-semibold text-sm">{item.label}</span>
                  <ArrowRight className={`w-4 h-4 ml-auto ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                </button>
              )
            })}
          </div>

          <div className="bg-surface border border-border rounded-3xl p-6 md:p-8 shadow-sm min-h-[420px]" role="tabpanel">
            <div className="flex flex-col md:flex-row md:items-start gap-5 mb-7">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                <ProfileIcon className="w-7 h-7 text-accent" />
              </div>
              <div>
                <div className="text-xs font-bold text-accent uppercase tracking-[0.12em] mb-1">{profile.label}</div>
                <h3 className="text-2xl font-bold text-text tracking-tight mb-2">{profile.title}</h3>
                <p className="text-sm text-text-light leading-relaxed max-w-2xl">{profile.description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-display font-bold text-text text-sm mb-3">Necesidades frecuentes</h4>
                <ul className="space-y-2 list-none p-0 m-0">
                  {profile.needs.map((need) => (
                    <li key={need} className="flex items-start gap-2 text-sm text-text-light">
                      <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      {need}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-accent/5 border border-accent/15 rounded-2xl p-5">
                <div className="text-xs font-bold text-accent uppercase tracking-[0.12em] mb-2">Tu primer movimiento</div>
                <p className="text-sm text-text-light leading-relaxed">{profile.firstMove}</p>
              </div>
            </div>

            <div className="mt-7 pt-6 border-t border-border">
              <h4 className="font-display font-bold text-text text-sm mb-3">Herramientas para explorar</h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {profile.tools.map((tool) => <ToolMini key={tool} id={tool} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="mundo" className="relative overflow-hidden py-16 scroll-mt-20" style={{ background: 'linear-gradient(135deg, #111827 0%, #1e1b4b 52%, #102a2a 100%)' }}>
        <div className="absolute inset-0 opacity-[0.08] dot-pattern pointer-events-none" />
        <div className="absolute -top-28 -left-24 w-80 h-80 bg-primary/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-24 w-80 h-80 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 border border-white/15">
              <Globe2 className="w-3 h-3" />
              Ideas del mundo, prácticas para tu aula
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Cuatro modelos que puedes replicar</h2>
            <p className="text-white/65 max-w-3xl mx-auto leading-relaxed">
              No necesitas una plataforma nacional para empezar. Cada experiencia global se traduce aquí en una práctica pequeña que puedes ejecutar con la suite de esta página.
            </p>
          </div>

          <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="hidden lg:block absolute top-7 left-[12%] right-[12%] h-px bg-gradient-to-r from-primary/20 via-white/25 to-accent/20" />
            {GLOBAL_EXAMPLES.map((example) => (
              <article key={example.place} className="relative bg-white/[0.055] backdrop-blur-sm border border-white/10 rounded-2xl p-5 flex flex-col hover:bg-white/[0.075] hover:border-white/20 transition-all">
                <div className="relative z-10 flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-2xl shadow-lg">{example.flag}</div>
                  <span className="font-display font-extrabold text-white/15 text-4xl tracking-tighter">{example.step}</span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-300 mb-1">{example.place}</div>
                <h3 className="font-display font-bold text-white text-lg tracking-tight leading-tight mb-3">{example.idea}</h3>
                <p className="text-xs text-white/55 leading-relaxed mb-4">{example.practice}</p>
                <div className="bg-black/15 border border-white/8 rounded-xl p-3 mb-4 flex-1">
                  <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-amber-300 mb-1.5">Repícalo así</div>
                  <p className="text-xs text-white/70 leading-relaxed">{example.replicate}</p>
                </div>
                <div className="mb-4">
                  <ToolPills ids={example.tools} />
                </div>
                <a href={example.source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-white/40 hover:text-white/75 no-underline transition-colors">
                  Fuente oficial <ExternalLink className="w-3 h-3" />
                </a>
              </article>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 max-w-3xl mx-auto" role="img" aria-label="Ruta de adopción en tres pasos: prueba docente, práctica compartida y autonomía del estudiante">
            {[
              { n: '1', label: 'Prueba docente', color: 'bg-primary' },
              { n: '2', label: 'Práctica compartida', color: 'bg-warm' },
              { n: '3', label: 'Autonomía con evidencia', color: 'bg-accent' },
            ].map((item, index) => (
              <div key={item.n} className="contents">
                <div className="flex flex-col items-center text-center gap-2">
                  <span className={`w-9 h-9 ${item.color} text-white rounded-full flex items-center justify-center font-display font-bold text-sm shadow-lg`}>{item.n}</span>
                  <span className="text-[11px] font-semibold text-white/70">{item.label}</span>
                </div>
                {index < 2 && <ArrowRight className="w-5 h-5 text-white/25" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="ciclo" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-warm/10 text-warm px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-warm/15">
            <WandSparkles className="w-3 h-3" />
            Del objetivo a la reflexión
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text tracking-tight mb-2">IA a lo largo del ciclo docente</h2>
          <p className="text-text-light text-sm max-w-2xl mx-auto">Seis momentos, seis usos distintos. En cada uno encontrarás tareas apropiadas, un prompt base y herramientas del catálogo.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-6" role="tablist" aria-label="Momentos del ciclo docente">
          {CYCLE.map((item) => {
            const Icon = item.icon
            const isActive = item.id === activeStage
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveStage(item.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold cursor-pointer transition-all ${isActive ? 'bg-text text-white border-text shadow-md' : 'bg-surface text-text-light border-border hover:border-primary/30 hover:text-text'}`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            )
          })}
        </div>

        <div className="bg-surface border border-border rounded-3xl overflow-hidden shadow-sm" role="tabpanel">
          <div className="grid lg:grid-cols-2">
            <div className="p-6 md:p-9 border-b lg:border-b-0 lg:border-r border-border">
              <div className={`w-12 h-12 ${stage.bg} rounded-2xl flex items-center justify-center mb-5`}>
                <StageIcon className={`w-6 h-6 ${stage.color}`} />
              </div>
              <div className={`text-xs font-bold uppercase tracking-[0.14em] ${stage.color} mb-2`}>{stage.kicker}</div>
              <h3 className="text-2xl md:text-3xl font-bold text-text tracking-tight mb-3">{stage.title}</h3>
              <p className="text-sm text-text-light leading-relaxed mb-6">{stage.description}</p>
              <ul className="space-y-3 list-none p-0 m-0">
                {stage.do.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-text-light">
                    <CheckCircle2 className={`w-4 h-4 ${stage.color} mt-0.5 shrink-0`} />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="grid sm:grid-cols-2 gap-3 mt-7 pt-6 border-t border-border">
                {stage.tools.map((tool) => <ToolMini key={tool} id={tool} />)}
              </div>
            </div>

            <div className="p-6 md:p-9 bg-text/[0.02] flex flex-col">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <div className="text-xs font-bold text-text-lighter uppercase tracking-[0.12em]">Prompt base</div>
                  <div className="text-sm font-semibold text-text mt-1">Adáptalo a tu asignatura</div>
                </div>
                <button
                  type="button"
                  onClick={() => copyPrompt(stage.prompt, `stage-${stage.id}`)}
                  className="inline-flex items-center gap-2 bg-surface text-text border border-border px-3 py-2 rounded-lg font-semibold text-xs cursor-pointer hover:border-primary/40 hover:text-primary transition-colors"
                  aria-label={`Copiar prompt para ${stage.label}`}
                >
                  {copiedId === `stage-${stage.id}` ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedId === `stage-${stage.id}` ? 'Copiado' : 'Copiar'}
                </button>
              </div>
              <pre className="whitespace-pre-wrap font-sans text-sm text-text-light leading-relaxed bg-surface border border-border rounded-2xl p-5 flex-1 overflow-auto">{stage.prompt}</pre>
              <p className="text-[11px] text-text-lighter mt-3 flex items-start gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                Revisa precisión disciplinar, adecuación a la edad, accesibilidad y política institucional antes de usar el resultado.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="evaluacion" className="relative overflow-hidden py-16" style={{ background: 'linear-gradient(135deg, #111827 0%, #1e1b4b 52%, #18252c 100%)' }}>
        <div className="absolute inset-0 opacity-[0.08] dot-pattern pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 border border-white/15">
              <ClipboardCheck className="w-3 h-3" />
              Evaluación en tiempos de IA
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">No persigas al robot. <span className="text-amber-300">Cambia la evidencia.</span></h2>
            <p className="text-white/65 max-w-3xl mx-auto leading-relaxed">Los detectores no reemplazan el juicio docente. Una evaluación robusta hace visible el proceso, sitúa el problema y pide explicar decisiones.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {ASSESSMENT_MOVES.map((move) => (
              <article key={move.from} className="bg-white/[0.05] backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:border-white/25 transition-colors">
                <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-3 items-center">
                  <div>
                    <div className="text-[10px] font-bold text-rose-300 uppercase tracking-[0.12em] mb-1">Antes</div>
                    <p className="text-sm text-white/60">{move.from}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/30 hidden sm:block" />
                  <div>
                    <div className="text-[10px] font-bold text-emerald-300 uppercase tracking-[0.12em] mb-1">Ahora</div>
                    <p className="text-sm text-white font-semibold">{move.to}</p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 text-xs text-white/45 flex items-start gap-2">
                  <Brain className="w-3.5 h-3.5 text-amber-300 mt-0.5 shrink-0" />
                  Evidencia: {move.evidence}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="datos" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-20">
        <div className="text-center mb-9">
          <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-700 px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-rose-200">
            <ShieldAlert className="w-3 h-3" />
            Privacidad y cuidado
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text tracking-tight mb-2">Semáforo de datos para el aula</h2>
          <p className="text-text-light text-sm max-w-3xl mx-auto">La Ley 1581 de 2012 protege los datos personales y exige cuidado reforzado con niñas, niños y adolescentes. Anonimizar no es cambiar el nombre: es impedir que la persona pueda ser identificada.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {DATA_LIGHTS.map((light) => {
            const Icon = light.icon
            return (
              <article key={light.level} className={`bg-surface rounded-2xl border ${light.border} p-5 shadow-sm`}>
                <div className={`w-11 h-11 rounded-xl ${light.bg} flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${light.color}`} />
                </div>
                <h3 className={`font-display font-bold text-lg tracking-tight mb-4 ${light.color}`}>{light.level}</h3>
                <ul className="space-y-3 list-none p-0 m-0">
                  {light.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-text-light leading-relaxed">
                      <span className={`w-1.5 h-1.5 rounded-full ${light.bg} border ${light.border} mt-1.5 shrink-0`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
        <div className="mt-5 bg-surface border border-border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <ShieldCheck className="w-8 h-8 text-accent shrink-0" />
          <p className="text-sm text-text-light leading-relaxed flex-1">Antes de adoptar una herramienta con estudiantes, verifica edad mínima, términos de tratamiento de datos, ubicación del almacenamiento, opción de borrado y contrato institucional. Si tienes dudas, consulta al responsable de protección de datos de tu institución.</p>
          <a href="https://sedeelectronica.sic.gov.co/formacion/curso/educacion-para-la-proteccion-de-datos-personales-de-los-ninos-ninas-y-adolescentes-en-la-red" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-accent font-semibold text-sm no-underline hover:underline shrink-0">
            Recurso de la SIC <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      <section id="prompts" className="max-w-6xl mx-auto px-4 py-12 scroll-mt-20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-primary/10">
            <Sparkles className="w-3 h-3" />
            Laboratorio práctico
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text tracking-tight mb-2">Prompts para adaptar, no para obedecer</h2>
          <p className="text-text-light text-sm max-w-2xl mx-auto">Cada plantilla fuerza contexto, evidencia y límites. Reemplaza los campos entre corchetes y conserva solo lo que puedas revisar.</p>
        </div>

        <div className="flex justify-center gap-2 mb-7" role="tablist" aria-label="Categorías de prompts">
          {[
            { id: 'clase', label: 'Clase', icon: BookOpen },
            { id: 'evaluacion', label: 'Evaluación', icon: ClipboardCheck },
            { id: 'investigacion', label: 'Investigación', icon: Search },
          ].map((group) => {
            const Icon = group.icon
            const isActive = promptGroup === group.id
            return (
              <button
                key={group.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setPromptGroup(group.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold cursor-pointer transition-all ${isActive ? 'bg-primary text-white border-primary shadow-md' : 'bg-surface text-text-light border-border hover:border-primary/30'}`}
              >
                <Icon className="w-4 h-4" />
                {group.label}
              </button>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-4" role="tabpanel">
          {visiblePrompts.map((prompt) => (
            <article key={prompt.id} className="bg-surface border border-border rounded-2xl p-5 hover:shadow-md hover:border-primary/25 transition-all flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-display font-bold text-text text-lg tracking-tight">{prompt.label}</h3>
                  <p className="text-xs text-text-lighter mt-1">{prompt.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => copyPrompt(prompt.body, prompt.id)}
                  aria-label={`Copiar ${prompt.label}`}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-text/4 text-text-light border border-border text-xs font-semibold cursor-pointer hover:text-primary hover:border-primary/30 transition-colors shrink-0"
                >
                  {copiedId === prompt.id ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedId === prompt.id ? 'Copiado' : 'Copiar'}
                </button>
              </div>
              <p className="text-sm text-text-light leading-relaxed bg-text/[0.025] border border-border/70 rounded-xl p-4 flex-1">{prompt.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">
          <div>
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-accent/15">
              <Compass className="w-3 h-3" />
              Piloto mínimo
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text tracking-tight mb-3">Tu primera semana con IA</h2>
            <p className="text-text-light text-sm max-w-2xl mb-7">No necesitas transformar todo el curso. Una prueba pequeña, observable y reversible enseña más que una adopción masiva sin propósito.</p>
            <div className="space-y-3">
              {WEEK_PLAN.map((step, index) => (
                <article key={step.day} className="grid grid-cols-[64px_1fr] gap-4 bg-surface border border-border rounded-2xl p-4 hover:border-accent/30 hover:shadow-sm transition-all">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex flex-col items-center justify-center">
                    <span className="font-display font-extrabold text-accent text-lg leading-none">0{index + 1}</span>
                    <span className="text-[9px] text-accent font-bold uppercase mt-1">{step.day}</span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-text tracking-tight mb-1">{step.title}</h3>
                    <p className="text-xs text-text-light leading-relaxed">{step.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="bg-surface border border-border rounded-3xl p-6 shadow-sm lg:sticky lg:top-24">
            <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display font-bold text-text text-xl tracking-tight mb-2">Fuentes para profundizar</h3>
            <p className="text-xs text-text-light leading-relaxed mb-5">Este capítulo combina orientación internacional, evidencia reciente de Colombia y el marco nacional de protección de datos.</p>
            <div className="space-y-2.5">
              {SOURCES.map((source) => (
                <a key={source.label} href={source.url} target="_blank" rel="noopener noreferrer" className="group block bg-text/[0.025] border border-border rounded-xl p-3 no-underline hover:border-primary/30 hover:bg-primary/[0.025] transition-all">
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-semibold text-text leading-snug flex-1">{source.label}</span>
                    <ExternalLink className="w-3 h-3 text-text-lighter group-hover:text-primary shrink-0 mt-0.5" />
                  </div>
                  <div className="text-[10px] text-text-lighter mt-1">{source.org}</div>
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-14">
        <div className="relative overflow-hidden bg-surface rounded-3xl border border-border p-8 md:p-12 text-center shadow-sm">
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-accent/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <GraduationCap className="w-7 h-7 text-accent" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-text tracking-tight mb-3">La mejor IA del aula sigue siendo una buena pregunta</h2>
            <p className="text-text-light leading-relaxed max-w-2xl mx-auto mb-8">Explora las herramientas del catálogo con un problema pedagógico concreto, compara alternativas y conserva la que te ayude a observar mejor el aprendizaje.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/explorar?categoria=educacion" className="inline-flex items-center gap-2 bg-text text-white px-6 py-3 rounded-xl font-semibold no-underline hover:bg-text/90 hover:shadow-lg transition-all">
                <Search className="w-4 h-4" />
                Ver herramientas educativas
              </Link>
              <Link to="/prompt-lab" className="inline-flex items-center gap-2 bg-surface border border-border text-text px-6 py-3 rounded-xl font-semibold no-underline hover:border-primary/40 hover:shadow-md transition-all">
                <Sparkles className="w-4 h-4 text-warm" />
                Abrir Prompt Lab
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
