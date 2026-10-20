export const UNI_INDEX = [
  { id: 'u-carrera', label: 'Tu carrera' },
  { id: 'u-estudio', label: 'Sistema de estudio' },
  { id: 'u-cerebro', label: 'Tu cerebro' },
  { id: 'u-integridad', label: 'Integridad' },
  { id: 'u-citar', label: 'Citar la IA' },
  { id: 'u-investigar', label: 'Investigar' },
  { id: 'u-datos', label: 'Datos ajenos' },
  { id: 'u-empleo', label: 'Primer empleo' },
  { id: 'u-proyecto', label: 'Proyecto del semestre' },
]

export const CAREERS = [
  {
    id: 'salud',
    label: 'Salud',
    changes: 'Resúmenes de historia clínica, apoyo a la lectura de imágenes, borradores de material educativo para pacientes.',
    human: 'El juicio clínico, el examen físico, comunicar malas noticias y responder por la decisión.',
    practice: 'Pídele a la IA un caso clínico ficticio y que te evalúe el razonamiento diagnóstico, no solo la respuesta.',
    prompt: 'Actúa como docente de semiología. Preséntame un caso clínico ficticio por partes (motivo de consulta, antecedentes, examen). Después de cada parte pregúntame qué diagnósticos diferenciales considero y por qué. No me des el diagnóstico hasta el final.',
    tools: ['notebooklm', 'consensus', 'elicit', 'claude'],
  },
  {
    id: 'ingenieria',
    label: 'Ingenierías y computación',
    changes: 'Código generado, revisión automática, documentación, simulaciones y análisis de datos más rápidos.',
    human: 'Definir bien el problema, diseñar la arquitectura, decidir con seguridad y responder por lo que falla.',
    practice: 'Escribe tú la primera versión. Después pídele una revisión de código como si fuera un ingeniero senior y defiende tus decisiones.',
    prompt: 'Revisa este código como un ingeniero senior en una revisión de pares. No lo reescribas. Señala errores, riesgos de seguridad y problemas de legibilidad, y hazme preguntas sobre las decisiones que no entiendas: [pega tu código]',
    tools: ['cursor', 'github-copilot', 'claude-code', 'replit-ai'],
  },
  {
    id: 'derecho',
    label: 'Derecho',
    changes: 'Búsqueda y resumen de jurisprudencia, borradores de documentos, revisión de contratos.',
    human: 'La argumentación, la estrategia, la ética profesional y verificar cada cita: la IA inventa sentencias.',
    practice: 'Usa la IA como contraparte: que argumente la posición contraria y tú la refutes con normas que verificas en fuentes oficiales.',
    prompt: 'Actúa como abogado de la contraparte en este caso ficticio: [describe el caso]. Presenta tus 3 mejores argumentos. No cites sentencias ni artículos específicos; yo los buscaré y verificaré en fuentes oficiales para responderte.',
    tools: ['claude', 'notebooklm', 'perplexity', 'chatpdf'],
  },
  {
    id: 'economia',
    label: 'Economía y administración',
    changes: 'Análisis de datos, modelos financieros, informes y presentaciones en una fracción del tiempo.',
    human: 'Leer el contexto, negociar, liderar personas y decidir con información incompleta.',
    practice: 'Analiza tú un conjunto de datos y pídele a la IA que busque supuestos débiles en tus conclusiones.',
    prompt: 'Estas son las conclusiones de mi análisis sobre [tema] y los datos que usé: [pega]. Actúa como un comité evaluador exigente: ¿qué supuestos son débiles, qué datos faltan y qué explicación alternativa no consideré?',
    tools: ['julius', 'chatgpt', 'gamma', 'claude'],
  },
  {
    id: 'comunicacion',
    label: 'Comunicación, diseño y artes',
    changes: 'Imágenes, video, voz y texto generados en segundos. Lo genérico se volvió gratis.',
    human: 'La voz propia, el concepto, el gusto, la ética con las imágenes de personas reales y el oficio.',
    practice: 'Haz diez bocetos a mano antes de abrir una herramienta. Usa la IA para explorar variaciones de tu idea, no para tenerla.',
    prompt: 'Este es el concepto de mi proyecto: [describe]. No generes nada todavía. Hazme 5 preguntas que me obliguen a precisar qué quiero decir, para quién y qué lo hace distinto de lo que ya existe.',
    tools: ['canva', 'adobe-firefly', 'runway', 'elevenlabs'],
  },
  {
    id: 'educacion',
    label: 'Educación',
    changes: 'Planeación, materiales adaptados, retroalimentación y evaluación con apoyo de IA.',
    human: 'El vínculo con los estudiantes, leer el aula, cuidar y decidir qué vale la pena enseñar.',
    practice: 'Diseña una clase sin IA. Después pídele que la adapte a tres estudiantes distintos y evalúa si las adaptaciones son buenas.',
    prompt: 'Diseñé esta actividad para grado 7: [pega]. Adáptala para un estudiante que va adelantado, uno con dificultades de lectura y uno que no tiene internet en casa. Explica qué cambiaste y por qué.',
    tools: ['khanmigo', 'notebooklm', 'canva', 'claude'],
  },
  {
    id: 'sociales',
    label: 'Ciencias sociales y humanas',
    changes: 'Transcripción y codificación de entrevistas, revisión de literatura, análisis de textos a gran escala.',
    human: 'El trabajo de campo, la ética con las comunidades, la interpretación y la pregunta de investigación.',
    practice: 'Codifica tú una entrevista y compárala con la codificación de la IA: ¿qué vio ella que tú no, y qué se le escapó?',
    prompt: 'Esta es mi pregunta de investigación: [pega]. Hazme de jurado: ¿es demasiado amplia? ¿Qué supuestos tiene? ¿Qué tres preguntas me haría un evaluador antes de aprobarla?',
    tools: ['elicit', 'notebooklm', 'otter', 'claude'],
  },
  {
    id: 'ciencias',
    label: 'Ciencias básicas',
    changes: 'Cálculo simbólico, análisis de datos experimentales, búsqueda de literatura y código científico.',
    human: 'Diseñar el experimento, dudar de un resultado demasiado bonito y entender por qué funciona.',
    practice: 'Resuelve el problema a mano y usa la IA solo para verificar el último paso. Si no coinciden, encuentra quién se equivocó.',
    prompt: 'Resolví este problema así: [pega tu desarrollo]. No me des la solución completa. Dime en qué paso está el primer error, si lo hay, y dame una pista para corregirlo.',
    tools: ['wolfram', 'julius', 'semantic-scholar', 'chatgpt'],
  },
]

export const STUDY_SYSTEM = [
  {
    title: 'Práctica de recuperación',
    why: 'Recordar sin mirar fija más que releer.',
    text: 'Con base en estos apuntes [pega], hazme 10 preguntas de respuesta abierta, una a la vez. Espera mi respuesta, califícala de 1 a 5 y explícame qué me faltó.',
  },
  {
    title: 'Repaso espaciado',
    why: 'Repasar en días distintos vence la curva del olvido.',
    text: 'Tengo parcial de [materia] el [fecha]. Arma un calendario de repaso espaciado con sesiones de 25 minutos, empezando por los temas que te diga que me cuestan: [temas].',
  },
  {
    title: 'Técnica Feynman',
    why: 'Si no lo puedes explicar simple, todavía no lo entiendes.',
    text: 'Te voy a explicar [concepto] como si fueras un estudiante de primer semestre. Interrúmpeme con las preguntas que haría alguien confundido y al final dime qué partes expliqué mal o me salté.',
  },
  {
    title: 'Ejemplos resueltos a medias',
    why: 'Completar pasos enseña más que ver soluciones completas.',
    text: 'Dame un problema de [tema] resuelto hasta la mitad. Yo termino los pasos que faltan y tú me corriges paso por paso.',
  },
  {
    title: 'Simulacro de parcial',
    why: 'Practicar en condiciones reales reduce la ansiedad.',
    text: 'Hazme un simulacro de parcial de [materia] con 5 preguntas del nivel de [universidad o curso]. Tengo 40 minutos. No me ayudes durante el examen; al final corrige y dime qué estudiar.',
  },
  {
    title: 'Mapa de lo que no sé',
    why: 'Estudiar lo que ya sabes se siente bien pero rinde poco.',
    text: 'Este es el programa del curso: [pega]. Hazme un diagnóstico de 15 preguntas rápidas y con mis respuestas ordena los temas de más a menos urgente.',
  },
]

export const BRAIN = [
  {
    title: 'Descarga cognitiva',
    body: 'Cuando la IA piensa por ti, tu cerebro deja de practicar. Un estudio preliminar del MIT Media Lab (2025) encontró que quienes escribían ensayos con un asistente desde el inicio recordaban menos lo que habían escrito y lo sentían menos suyo.',
  },
  {
    title: 'La regla: primero tú',
    body: 'Escribe tu idea, intenta el problema, haz el esquema. Después usa la IA para revisar, contradecir y mejorar. El orden cambia lo que aprendes.',
  },
  {
    title: 'Fluidez no es comprensión',
    body: 'Leer una explicación clara de la IA se siente como entender. La prueba es poder explicarlo tú sin mirar.',
  },
]

export const UNI_SEMAPHORE = [
  { text: 'Pedirle que te explique un tema de la clase con otros ejemplos', answer: 'g', why: 'Te ayuda a entender y tú sigues haciendo el trabajo.' },
  { text: 'Entregar un ensayo generado y reescrito «para que no se note»', answer: 'r', why: 'Es plagio, aunque cambies las palabras. Y no aprendiste nada.' },
  { text: 'Usarla para corregir la ortografía de tu trabajo de grado', answer: 'y', why: 'Suele estar permitido, pero revisa la política y decláralo.' },
  { text: 'Pedirle bibliografía y citarla sin abrir los artículos', answer: 'r', why: 'Inventa referencias con frecuencia. Citar lo que no leíste es falta grave.' },
  { text: 'Subir las entrevistas de tu investigación con nombres reales', answer: 'r', why: 'Son datos personales de terceros. Anonimiza y revisa el consentimiento informado.' },
  { text: 'Generar código para un taller cuando el profe lo permitió', answer: 'g', why: 'Si está permitido, úsalo y asegúrate de entender cada línea.' },
  { text: 'Usarla en un examen a libro abierto sin saber si se puede', answer: 'y', why: 'Pregunta antes. «No sabía» no sirve como defensa.' },
  { text: 'Pedirle que te haga preguntas para preparar la sustentación', answer: 'g', why: 'Excelente uso: te entrena para defender tu trabajo.' },
]

export const INTEGRITY_CHECKS = [
  { title: 'El programa del curso', body: 'Muchos profesores ya incluyen una política de uso de IA. Si no está, pregunta en la primera semana.' },
  { title: 'La política de tu universidad', body: 'Busca el reglamento estudiantil o la guía institucional de IA. Ahí está qué se considera fraude.' },
  { title: 'Las reglas de cada entrega', body: 'Lo que vale en un taller puede no valer en un parcial o en el trabajo de grado.' },
]

export const UNI_USES = [
  { id: 'ideas', label: 'Generar ideas iniciales' },
  { id: 'explicar', label: 'Entender conceptos' },
  { id: 'estructura', label: 'Revisar la estructura del texto' },
  { id: 'estilo', label: 'Corregir estilo y ortografía' },
  { id: 'codigo', label: 'Depurar código' },
  { id: 'datos', label: 'Explorar datos' },
  { id: 'traducir', label: 'Traducir fuentes' },
]

export const RESEARCH_STEPS = [
  { title: 'Pregunta', body: 'Afina tu pregunta con la IA como jurado, no como autora.', tools: ['claude', 'chatgpt'] },
  { title: 'Buscar', body: 'Usa buscadores académicos que muestran artículos reales.', tools: ['consensus', 'elicit', 'semantic-scholar'] },
  { title: 'Leer', body: 'Conversa con tus PDF y pide que te muestre dónde dice cada cosa.', tools: ['notebooklm', 'scispace'] },
  { title: 'Mapear', body: 'Mira cómo se conectan los autores y las ideas.', tools: ['connected-papers', 'research-rabbit'] },
  { title: 'Escribir', body: 'Tú escribes; la IA revisa coherencia y señala huecos.', tools: ['claude', 'grammarly'] },
]

export const DATA_RULES = [
  { title: 'Pacientes y usuarios', body: 'Nada de historias clínicas, nombres ni documentos de pacientes en herramientas abiertas, ni siquiera en prácticas.' },
  { title: 'Entrevistas y encuestas', body: 'Anonimiza antes de subir y revisa qué autorizaron los participantes en el consentimiento informado.' },
  { title: 'La empresa de tu práctica', body: 'Contratos, cifras y bases de clientes son confidenciales. Pregunta qué herramientas aprueba la empresa.' },
  { title: 'Tus compañeros', body: 'No subas trabajos ni fotos de otras personas sin su permiso.' },
]

export const JOB = [
  {
    title: 'Hoja de vida honesta',
    body: 'Que la IA te ayude a contar mejor lo que hiciste, no a inventar lo que no hiciste.',
    text: 'Esta es mi hoja de vida: [pega]. Me postulo a [cargo] en [tipo de empresa]. Señala qué experiencias son más relevantes y cómo describirlas con verbos de acción y resultados. No inventes logros ni cifras.',
  },
  {
    title: 'Entrevista simulada',
    body: 'Practica las preguntas difíciles antes de que sean de verdad.',
    text: 'Hazme una entrevista simulada para el cargo de [cargo]. Una pregunta a la vez, incluidas dos preguntas difíciles. Al final dame retroalimentación concreta de cada respuesta.',
  },
  {
    title: 'Portafolio con proyectos',
    body: 'Un proyecto pequeño terminado vale más que diez cursos sin evidencia.',
    text: 'Estudio [carrera] y quiero un proyecto de portafolio que pueda terminar en 6 semanas y mostrar en una entrevista. Propón 3 opciones que resuelvan un problema real de Colombia y dime qué aprendería en cada una.',
  },
  {
    title: 'Investiga la empresa',
    body: 'Llegar sabiendo qué hace y qué le preocupa a la empresa te diferencia.',
    text: 'Voy a una entrevista en [empresa]. ¿Qué debo averiguar sobre ella antes de ir y qué preguntas inteligentes le puedo hacer al entrevistador? Indícame qué fuentes oficiales revisar para verificarlo.',
  },
]

export const SKILLS = [
  'Formular bien un problema',
  'Verificar y dudar con método',
  'Escribir y hablar con claridad',
  'Trabajar con personas distintas',
  'Ética y criterio con los datos',
  'Aprender rápido algo nuevo',
]

export const SEMESTER_PROJECTS = [
  { title: 'Un tutor para tu materia más difícil', body: 'Arma con NotebookLM un cuaderno con tus apuntes y úsalo cada semana para practicar. Mide tu nota antes y después.' },
  { title: 'Un tablero de datos de tu ciudad', body: 'Toma datos abiertos de datos.gov.co y cuenta una historia con ellos. La IA te ayuda con el código; las preguntas son tuyas.' },
  { title: 'Una herramienta para alguien real', body: 'Un formulario, una página o un bot sencillo para una tienda, una fundación o tu propio programa.' },
  { title: 'Una guía para quien viene detrás', body: 'Escribe la guía que te hubiera servido en primer semestre y publícala para los nuevos.' },
]
