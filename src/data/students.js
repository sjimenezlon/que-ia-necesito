export const STUDENTS_UPDATED = '20 de octubre de 2026'

export const CHAPTER_INDEX = [
  { id: 'ruta', label: 'Tu ruta' },
  { id: 'funciona', label: 'Cómo funciona' },
  { id: 'semaforo', label: 'Semáforo' },
  { id: 'pedir', label: 'Pedir bien' },
  { id: 'entrenador', label: 'Modo entrenador' },
  { id: 'herramientas', label: 'Herramientas' },
  { id: 'honestidad', label: 'Declarar el uso' },
  { id: 'feed', label: 'Tu feed' },
  { id: 'reto', label: 'El reto' },
]

export const ROUTES = [
  {
    id: 'examen',
    label: 'Preparar un examen',
    goal: 'Que la IA te pregunte y te corrija, no que te dé las respuestas.',
    steps: [
      'Pídele un diagnóstico corto para saber qué no dominas.',
      'Practica una pregunta a la vez y responde antes de ver la solución.',
      'Pídele que te explique solo los errores, con otro ejemplo.',
      'Cierra con tres preguntas sin ayuda para medirte.',
    ],
    prompt:
      'Sé mi entrenador para el examen de [materia] sobre [tema]. Hazme una pregunta a la vez, espera mi respuesta y después explícame por qué está bien o mal. No me des la respuesta antes de que yo lo intente.',
    tools: ['khanmigo', 'quizlet', 'notebooklm', 'gemini'],
  },
  {
    id: 'escribir',
    label: 'Escribir un trabajo',
    goal: 'Que la idea y las palabras sean tuyas; la IA revisa y pregunta.',
    steps: [
      'Escribe tú la idea central en dos frases.',
      'Pídele contraargumentos y preguntas difíciles.',
      'Escribe el borrador sin IA.',
      'Pídele que señale lo confuso sin reescribir tu texto.',
    ],
    prompt:
      'Esta es la idea central de mi ensayo: [tu idea]. No escribas el ensayo. Hazme 3 preguntas difíciles que un profesor me haría y dame los 2 mejores argumentos en contra para que yo los responda.',
    tools: ['claude', 'chatgpt', 'grammarly', 'deepl'],
  },
  {
    id: 'entender',
    label: 'Entender un tema difícil',
    goal: 'Ver el mismo tema desde otro ángulo hasta que haga clic.',
    steps: [
      'Dile qué parte exacta no entiendes.',
      'Pide una analogía con algo de tu vida.',
      'Explícale tú el tema con tus palabras.',
      'Pídele que encuentre los huecos en tu explicación.',
    ],
    prompt:
      'No entiendo [tema], sobre todo [la parte que te enreda]. Explícamelo con un ejemplo de fútbol, música o cocina. Después pídeme que te lo explique con mis palabras y dime qué me faltó.',
    tools: ['khanmigo', 'wolfram', 'perplexity', 'notebooklm'],
  },
  {
    id: 'crear',
    label: 'Crear algo propio',
    goal: 'La IA pone el borrador; tú pones la historia y el criterio.',
    steps: [
      'Antes de pedir nada, anota qué quieres decir y para quién.',
      'Pídele que te haga preguntas antes de proponer.',
      'Cambia todo lo que suene genérico.',
      'Muestra el resultado a una persona real y escucha.',
    ],
    prompt:
      'Quiero crear [una canción, un afiche, un video] sobre [tema]. Antes de proponer nada, hazme 5 preguntas sobre lo que quiero decir, para quién es y qué me gustaría que sintieran.',
    tools: ['canva', 'suno', 'gamma', 'chatgpt'],
  },
  {
    id: 'programar',
    label: 'Aprender a programar',
    goal: 'Entender cada línea antes de pasar a la siguiente.',
    steps: [
      'Escoge un proyecto pequeño: un juego de adivinar números.',
      'Pide el código por partes, no todo de una.',
      'Explica tú qué hace cada parte antes de seguir.',
      'Rompe algo a propósito y arréglalo.',
    ],
    prompt:
      'Quiero hacer un juego de adivinar números en el navegador. Guíame paso a paso, dame una parte a la vez y no avances hasta que yo te explique qué hace.',
    tools: ['replit-ai', 'claude', 'chatgpt', 'github-copilot'],
  },
  {
    id: 'carrera',
    label: 'Decidir qué estudiar',
    goal: 'Que te ayude a pensar, no que decida por ti.',
    steps: [
      'Pídele que te entreviste una pregunta a la vez.',
      'Responde con honestidad y con ejemplos de tu vida.',
      'Pídele patrones, no una respuesta final.',
      'Contrasta con orientación escolar y con personas que ejerzan.',
    ],
    prompt:
      'Entrevístame como orientador vocacional. Una pregunta a la vez. Al final no me digas qué estudiar: muéstrame qué patrones ves en mis respuestas y qué preguntas debería hacerle a alguien que trabaje en eso.',
    tools: ['claude', 'chatgpt', 'perplexity', 'gemini'],
  },
]

export const STEPS = [
  { n: '01', title: 'Escribes', body: 'Tu mensaje viaja a un centro de datos lleno de computadores muy potentes.' },
  { n: '02', title: 'Se parte en tokens', body: 'El texto se corta en pedacitos: palabras o trozos de palabra. Por eso le cuesta contar letras.' },
  { n: '03', title: 'Se vuelve números', body: 'Cada pedacito se convierte en una lista larguísima de números. La máquina no lee letras.' },
  { n: '04', title: 'Calcula y apuesta', body: 'Una red neuronal gigante calcula qué palabra es más probable que siga.' },
  { n: '05', title: 'Repite', body: 'Agrega esa palabra y vuelve a empezar. Por eso la respuesta aparece escribiéndose.' },
]

export const GUESS_GAME = [
  { text: 'En el descanso todos salen corriendo a la', options: [['tienda', 41], ['cancha', 29], ['cafetería', 18], ['biblioteca', 2]] },
  { text: 'Si no recojo el cuarto, mi mamá me quita el', options: [['celular', 52], ['wifi', 21], ['permiso', 15], ['apellido', 1]] },
  { text: 'El que madruga, Dios lo', options: [['ayuda', 93], ['despierta', 3], ['regaña', 2], ['bendice', 2]] },
]

export const DISTRUST = [
  { title: 'Nombres, fechas y cifras', body: 'Habla igual de segura cuando acierta y cuando inventa.' },
  { title: 'Citas y bibliografía', body: 'Abre cada fuente. A veces el libro o el artículo no existen.' },
  { title: 'Tu colegio, tu barrio, tu ciudad', body: 'Casi no leyó sobre eso: ahí rellena con lo que suena probable.' },
  { title: 'Noticias recientes', body: 'Puede no conocerlas. Contrasta con medios reales.' },
]

export const MYTHS = [
  { myth: 'La IA piensa y siente como una persona.', truth: 'Calcula patrones de texto. No tiene ganas, ni miedo, ni intenciones.' },
  { myth: 'Si lo dice con seguridad, es verdad.', truth: 'La seguridad es estilo, no evidencia. Verifica lo importante.' },
  { myth: 'La IA es neutral, son solo matemáticas.', truth: 'Aprendió de textos hechos por humanos y hereda sus prejuicios.' },
  { myth: 'La IA me va a dejar sin futuro.', truth: 'Cambia tareas, no borra personas. A quien la usa con criterio lo buscan más.' },
]

export const SEMAPHORE = [
  { text: 'Pedirle que te explique la fotosíntesis con un ejemplo de cocina', answer: 'g', why: 'Te ayuda a entender. Tú sigues haciendo el esfuerzo.' },
  { text: 'Copiar el ensayo que te escribió y entregarlo con tu nombre', answer: 'r', why: 'No es tuyo, no aprendiste nada y casi siempre se nota.' },
  { text: 'Pedirle el resumen del libro del plan lector en vez de leerlo', answer: 'y', why: 'Puede dejar por fuera lo importante, o inventar escenas que no existen.' },
  { text: 'Hacer un montaje con la cara de una compañera «en chiste»', answer: 'r', why: 'Es violencia, le puede dañar la vida a alguien y puede ser delito.' },
  { text: 'Practicar inglés conversando con ella antes del oral', answer: 'g', why: 'Paciencia infinita y cero pena. Ideal para practicar.' },
  { text: 'Preguntarle qué remedio tomar para un dolor fuerte', answer: 'y', why: 'Orientación general sí; la decisión es con un médico.' },
  { text: 'Pedirle preguntas tipo Saber 11 y que te corrija', answer: 'g', why: 'Modo entrenador: ella pregunta, tú respondes.' },
  { text: 'Subir la foto del salón para que la «mejore» y publicarla', answer: 'r', why: 'Sin permiso de quienes salen, no. Sus caras no son tuyas.' },
  { text: 'Contarle lo que te pasa cuando estás muy mal, en vez de a alguien', answer: 'y', why: 'Puede sonar comprensiva, pero no reemplaza a una persona de confianza ni a orientación escolar.' },
]

export const PROMPT_PIECES = [
  { id: 'rol', label: 'Rol', hint: 'quién es', text: 'Actúa como un profe de matemáticas paciente y buena onda.' },
  { id: 'contexto', label: 'Contexto', hint: 'quién eres tú', text: 'Estoy en grado 11, me preparo para el Saber 11 y me enredo con las funciones lineales.' },
  { id: 'tarea', label: 'Tarea', hint: 'qué quieres', text: 'Explícame las funciones con un ejemplo de la vida real, como los datos del celular o el precio de un taxi.' },
  { id: 'formato', label: 'Formato', hint: 'cómo lo quieres', text: 'Hazlo en pasos cortos, sin fórmulas raras, y al final hazme 3 preguntas.' },
  { id: 'limite', label: 'Límite', hint: 'qué no hacer', text: 'No me des las respuestas hasta que yo lo intente; si me equivoco, dame una pista.' },
]

export const COACH_PROMPTS = [
  { title: 'Simulacro', text: 'Hazme 5 preguntas tipo Saber 11 de lectura crítica, una por una. Espera mi respuesta y después explícame por qué está bien o mal.' },
  { title: 'Explícamelo distinto', text: 'Explícame la mitosis como si fuera un partido de fútbol. Después pregúntame algo para ver si entendí.' },
  { title: 'Abogado del diablo', text: 'Esta es mi opinión sobre [tema]: [tu opinión]. Dame los 3 mejores argumentos en contra para que yo mejore la mía.' },
  { title: 'Revisor, no escritor', text: 'No reescribas mi texto. Señálame dónde no se entiende, dónde me falta un argumento y por qué.' },
  { title: 'Plan de estudio', text: 'Tengo 4 semanas y una hora al día para repasar química. Antes de hacer el plan, pregúntame qué temas se me dificultan.' },
  { title: 'Enséñale tú', text: 'Voy a explicarte [tema] como si tú fueras el estudiante. Hazme preguntas de alguien que no entiende y dime al final qué expliqué mal.' },
]

export const TOOL_GROUPS = [
  { id: 'estudiar', label: 'Estudiar y practicar', ids: ['khanmigo', 'quizlet', 'notebooklm', 'wolfram'] },
  { id: 'conversar', label: 'Asistentes para conversar', ids: ['chatgpt', 'gemini', 'claude', 'perplexity'] },
  { id: 'crear', label: 'Crear y presentar', ids: ['canva', 'gamma', 'suno'] },
  { id: 'idiomas', label: 'Idiomas y escritura', ids: ['duolingo-max', 'deepl', 'grammarly'] },
  { id: 'programar', label: 'Programar', ids: ['replit-ai', 'github-copilot'] },
]

export const DISCLOSURE_USES = [
  { id: 'ideas', label: 'Lluvia de ideas para empezar' },
  { id: 'explicar', label: 'Que me explicara un tema que no entendía' },
  { id: 'preguntas', label: 'Que me hiciera preguntas para practicar' },
  { id: 'revisar', label: 'Revisar la claridad de mi texto (sin reescribirlo)' },
  { id: 'traducir', label: 'Traducir o revisar ortografía' },
  { id: 'fuentes', label: 'Buscar fuentes, que después verifiqué una por una' },
  { id: 'codigo', label: 'Entender o corregir código' },
]

export const FEED_QUESTIONS = [
  '¿Quién gana si sigo aquí 20 minutos más?',
  '¿Esto lo busqué yo, o me lo pusieron?',
  '¿Cómo me siento después de verlo?',
]

export const HABITS = [
  { title: 'Entrena tu feed', body: 'Busca, guarda y sigue a propósito lo que quieres aprender. El algoritmo también obedece.' },
  { title: 'Calla lo que no es gente', body: 'Apaga las notificaciones que no vienen de una persona.' },
  { title: 'Mira el número', body: 'Revisa tu tiempo de pantalla una vez por semana. Sin culpa, solo para saber.' },
  { title: 'Amigos sin algoritmo', body: 'Escríbele a alguien que no te sale en el feed. Llámalo. Véanse.' },
]

// Citas textuales de Algoritmos deshumanizantes (2025), verificadas contra el texto del libro (pp. 68-74).
export const BOOK_QUOTES = [
  '«A diferencia del amor, la amistad no precisa frecuencia» (Borges), y los algoritmos de las redes sociales nos exigen todo lo contrario.',
  'La amistad deja de ser confrontación y termina siendo una postura de aquel que me da «like».',
  'Mientras más nos exponemos en las redes sociales, más nos ocultamos detrás de identidades cuidadosamente construidas.',
]

export const CHALLENGES = [
  { title: 'Un rap de tu barrio', body: 'Escríbelo con la IA y después cambia todo lo que suene genérico.', prompt: 'Ayúdame a escribir un rap sobre mi barrio. Antes de escribir nada, hazme 5 preguntas sobre cómo es, cómo suena y qué me duele de él.' },
  { title: 'Un juego sencillo', body: 'Que te dé el código por partes y te explique cada una.', prompt: 'Quiero hacer un juego de adivinar números en el navegador. Guíame paso a paso y no avances hasta que yo entienda cada parte.' },
  { title: 'Tu plan Saber 11', body: 'En modo entrenador: que te pregunte, te corrija y te mida.', prompt: 'Sé mi entrenador para el Saber 11. Hazme un diagnóstico de 10 preguntas y con mis resultados arma un plan de 4 semanas.' },
  { title: 'Una mano a tu familia', body: 'El logo, el afiche o los precios del negocio de alguien cercano.', prompt: 'Mi tía vende empanadas en el barrio. Hazme preguntas sobre el negocio y propón 3 ideas de afiche que suenen a ella, no a una cadena.' },
  { title: 'Que te entreviste', body: 'Diez preguntas sobre qué quieres estudiar. Las respuestas son tuyas.', prompt: 'Entrevístame como orientador vocacional. Una pregunta a la vez, y al final no me digas qué estudiar: muéstrame qué patrones ves en mis respuestas.' },
]
