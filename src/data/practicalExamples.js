export const exampleGroups = ['Todos', 'Trabajo', 'Estudio', 'Docencia', 'Emprendimiento']

// Editorial starting points: prompts are assembled locally, never sent to an AI.
export const practicalExamples = [
  {
    id: 'presentacion',
    group: 'Trabajo',
    icon: 'Presentation',
    title: 'De una idea a una presentación',
    description: 'Dale un hilo claro a tus diapositivas antes de diseñarlas.',
    topic: 'una propuesta para reducir el desperdicio de alimentos en la oficina',
    audience: 'el equipo directivo',
    input: 'Tu idea, notas y datos que puedas respaldar.',
    before: 'Hazme una presentación.',
    task: 'Diseña el guion de una presentación de 6 diapositivas',
    format:
      'Una tabla con: número, título, mensaje principal, evidencia necesaria y sugerencia visual. Cierra con una acción concreta para la audiencia.',
    check: [
      'Cada diapositiva comunica una sola idea.',
      'Las cifras tienen una fuente verificable.',
      'El cierre dice qué decisión se espera.',
    ],
    tools: [
      { id: 'gamma', reason: 'Para convertir el guion en una presentación.' },
      { id: 'canva', reason: 'Para ajustar la composición y la identidad visual.' },
    ],
  },
  {
    id: 'correo',
    group: 'Trabajo',
    icon: 'Mail',
    title: 'Un correo difícil, bien escrito',
    description: 'Comunica un cambio de fecha con claridad y tacto.',
    topic: 'reprogramar una entrega del viernes al martes porque falta validar los datos',
    audience: 'un cliente con quien ya tenemos una relación de trabajo',
    input: 'El cambio, su motivo y la alternativa que puedes ofrecer.',
    before: 'Escribe un correo formal.',
    task: 'Redacta un correo de máximo 150 palabras',
    format:
      'Asunto, saludo, explicación breve, propuesta concreta y cierre. Incluye una versión alternativa más directa. Usa marcadores si falta un nombre o una fecha.',
    check: [
      'La nueva fecha es correcta.',
      'El tono cuida la relación.',
      'No promete algo que no puedas cumplir.',
    ],
    tools: [
      { id: 'claude', reason: 'Para trabajar el tono y revisar el borrador.' },
      { id: 'chatgpt', reason: 'Para explorar versiones y ajustar la extensión.' },
    ],
  },
  {
    id: 'estudiar',
    group: 'Estudio',
    icon: 'BookOpen',
    title: 'Entender un tema, no solo resumirlo',
    description: 'Transforma tus apuntes en preguntas para practicar.',
    topic: 'la diferencia entre correlación y causalidad',
    audience: 'una estudiante universitaria que está empezando',
    input: 'Apuntes o lecturas del curso que tengas permiso de usar.',
    before: 'Explícame este tema.',
    task: 'Crea una guía de estudio a partir del material que compartiré',
    format:
      'Una explicación breve, una analogía cotidiana y 5 preguntas de práctica. Separa las respuestas al final para que pueda intentarlo primero. Cita el fragmento del material que respalda cada respuesta.',
    check: [
      'La explicación coincide con el material del curso.',
      'Puedes responder sin mirar la solución.',
      'Las citas corresponden a los documentos.',
    ],
    tools: [
      { id: 'notebooklm', reason: 'Para trabajar con tus fuentes y consultarlas.' },
      { id: 'gemini', reason: 'Para ensayar explicaciones y preguntas de práctica.' },
    ],
  },
  {
    id: 'clase',
    group: 'Docencia',
    icon: 'GraduationCap',
    title: 'Una clase que invite a participar',
    description: 'Diseña una actividad con propósito y evidencia de aprendizaje.',
    topic: 'cómo reconocer información poco confiable en redes sociales',
    audience: '30 estudiantes de secundaria',
    input: 'Objetivo de aprendizaje, tiempo y recursos disponibles.',
    before: 'Haz un plan de clase.',
    task: 'Diseña una clase participativa de 50 minutos que se pueda realizar sin conexión a internet',
    format:
      'Una tabla con tiempos, actividad, instrucciones, recursos y evidencia de aprendizaje. Incluye una adaptación para distintos ritmos y una pregunta de salida.',
    check: [
      'Las actividades caben en 50 minutos.',
      'La evidencia permite evaluar el objetivo.',
      'Las instrucciones funcionan para este grupo.',
    ],
    tools: [
      { id: 'chatgpt', reason: 'Para proponer y adaptar la secuencia didáctica.' },
      { id: 'claude', reason: 'Para revisar las instrucciones y los criterios.' },
    ],
  },
  {
    id: 'datos',
    group: 'Trabajo',
    icon: 'BarChart3',
    title: 'De una tabla a preguntas útiles',
    description: 'Prepara un análisis de datos sin dar por ciertas sus conclusiones.',
    topic: 'las ventas mensuales por producto de una tienda durante el último año',
    audience: 'la persona que administra el negocio',
    input: 'Una tabla anonimizada con columnas y unidades claras.',
    before: 'Analiza este Excel.',
    task: 'Analiza la tabla que adjuntaré e identifica patrones que ayuden a decidir qué revisar',
    format:
      'Primero describe columnas, unidades, datos faltantes y duplicados. Después entrega 3 hallazgos con sus cálculos, un gráfico sugerido por hallazgo y 3 preguntas pendientes. Distingue observaciones de hipótesis.',
    check: [
      'Los totales coinciden con la tabla original.',
      'Se indican datos faltantes y supuestos.',
      'Una correlación no se presenta como causa.',
    ],
    tools: [
      { id: 'chatgpt', reason: 'Para explorar una tabla y explicar el análisis.' },
      { id: 'gemini', reason: 'Para trabajar con datos y formular preguntas.' },
    ],
  },
  {
    id: 'contenido',
    group: 'Emprendimiento',
    icon: 'Megaphone',
    title: 'Una semana de contenido con sentido',
    description: 'Pasa de publicar por publicar a comunicar algo concreto.',
    topic: 'una cafetería de barrio que ofrece café de productores locales',
    audience: 'personas que viven o trabajan cerca de la cafetería',
    input: 'Tu oferta real, voz de marca y fotos propias.',
    before: 'Dame ideas para Instagram.',
    task: 'Propón un calendario de 5 publicaciones para una semana',
    format:
      'Una tabla con día, objetivo, idea, texto de hasta 80 palabras, imagen sugerida y llamada a la acción. Alterna contenido educativo, comunidad y producto. No inventes descuentos ni testimonios.',
    check: [
      'Las ofertas y atributos son reales.',
      'El texto suena como tu marca.',
      'Tienes permiso para usar las imágenes.',
    ],
    tools: [
      { id: 'chatgpt', reason: 'Para idear y editar los textos del calendario.' },
      { id: 'canva', reason: 'Para diseñar las piezas a partir de tus textos.' },
    ],
  },
  {
    id: 'investigar',
    group: 'Estudio',
    icon: 'Search',
    title: 'Investigar con fuentes a la vista',
    description: 'Construye un mapa de lectura que puedas verificar.',
    topic: 'el uso de inteligencia artificial en bibliotecas públicas',
    audience: 'un grupo universitario que prepara una revisión introductoria',
    input: 'Pregunta de investigación, alcance y documentos disponibles.',
    before: 'Investiga sobre inteligencia artificial.',
    task: 'Prepara un mapa inicial de investigación',
    format:
      'Delimita 3 preguntas y sugiere términos de búsqueda. Si puedes consultar la web, añade una tabla de fuentes primarias con título, fecha, enlace, hallazgo y limitación. Si no puedes verificar una fuente, indícalo y no inventes referencias.',
    check: [
      'Los enlaces llevan al documento citado.',
      'La fecha corresponde al alcance del trabajo.',
      'Se distinguen evidencia, opinión y preguntas abiertas.',
    ],
    tools: [
      { id: 'perplexity', reason: 'Para explorar información con enlaces a fuentes.' },
      { id: 'notebooklm', reason: 'Para organizar y consultar los documentos elegidos.' },
    ],
  },
  {
    id: 'reunion',
    group: 'Trabajo',
    icon: 'ListChecks',
    title: 'De notas dispersas a próximos pasos',
    description: 'Convierte las notas de una reunión en acuerdos revisables.',
    topic: 'una reunión de seguimiento de un proyecto de equipo',
    audience: 'las personas que participaron en la reunión',
    input: 'Notas o una transcripción obtenida con permiso.',
    before: 'Resume esta reunión.',
    task: 'Organiza las notas de reunión que pegaré a continuación',
    format:
      'Un resumen de 5 líneas, una tabla de acuerdos con responsable y fecha, y una lista de asuntos pendientes. Usa «por confirmar» cuando no conste un responsable o una fecha. Separa propuestas de decisiones confirmadas.',
    check: [
      'Cada acuerdo aparece en las notas.',
      'Los responsables y fechas están confirmados.',
      'El resumen omite datos personales innecesarios.',
    ],
    tools: [
      { id: 'claude', reason: 'Para estructurar y revisar las notas.' },
      { id: 'chatgpt', reason: 'Para convertir los acuerdos en una lista de acciones.' },
    ],
  },
]

export function buildExamplePrompt(
  example,
  { topic = example.topic, audience = example.audience, tone = 'Claro y cercano' } = {}
) {
  return `${example.task}.\n\nCONTEXTO\nTema o situación: ${topic.trim() || '[Describe tu tema o situación]'}.\nAudiencia: ${audience.trim() || '[Define para quién es]'}.\n\nENTREGABLE\n${example.format}\n\nESTILO\n${tone}. Escribe en español.\n\nCRITERIOS\nUsa únicamente la información disponible. No inventes datos, citas ni hechos. Señala lo que falta y pregunta si es indispensable para continuar.\n\nMATERIAL DE APOYO\n[Pega aquí el material que tienes permiso de compartir; elimina los datos personales innecesarios.]`
}
