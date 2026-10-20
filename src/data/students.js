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
  { id: 'familias', label: 'Para familias' },
  { id: 'reflexiones', label: 'Reflexiones' },
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
    tools: ['quizlet', 'notebooklm', 'gemini', 'chatgpt'],
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
    tools: ['chatgpt', 'gemini', 'grammarly', 'deepl'],
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
    tools: ['notebooklm', 'wolfram', 'perplexity', 'gemini'],
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
    tools: ['canva', 'suno', 'chatgpt', 'gemini'],
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
    tools: ['chatgpt', 'gemini', 'github-copilot', 'replit-ai'],
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
    tools: ['chatgpt', 'gemini', 'perplexity'],
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
  { text: 'Contarle lo que te pasa cuando estás muy mal, en vez de a alguien', answer: 'y', why: 'Puede sonar comprensiva, pero no reemplaza a una persona. Habla con alguien de confianza u orientación escolar, o llama gratis a la Línea 192, opción 4, o a la 141 del ICBF.' },
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
  { id: 'estudiar', label: 'Estudiar y practicar', ids: ['notebooklm', 'quizlet', 'wolfram', 'gemini'] },
  { id: 'conversar', label: 'Asistentes para conversar', ids: ['chatgpt', 'gemini', 'perplexity'] },
  { id: 'crear', label: 'Crear y presentar', ids: ['canva', 'suno', 'chatgpt'] },
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

export const TEEN_PARENT_CONTEXT = [
  {
    title: 'La IA ya está en las tareas',
    body: 'Prohibirla no funciona y hacerse el de la vista gorda tampoco. Lo que sirve es preguntar cómo la usan y pedirles que te muestren.',
  },
  {
    title: 'Los «amigos virtuales»',
    body: 'Hay apps de IA diseñadas para conversar como pareja o mejor amigo, siempre disponibles y siempre de acuerdo. Para alguien que se siente solo pueden volverse un refugio que aísla más. Character.AI cerró en noviembre de 2025 los chats abiertos para menores de 18.',
  },
  {
    title: 'Montajes y desnudos falsos',
    body: 'Con una foto pública se puede fabricar una imagen sexual falsa. No es una broma: es violencia, hace un daño real y tiene consecuencias legales.',
  },
  {
    title: 'El feed decide qué ven',
    body: 'Lo que les aparece no es neutral: lo elige un algoritmo que aprende qué los mantiene pegados. Hablar de eso vale más que un bloqueo.',
  },
]

export const TEEN_PARENT_SIGNS = [
  'Pasa mucho tiempo conversando con un chatbot y lo esconde',
  'Dice que «la IA lo entiende mejor que nadie»',
  'Cambios fuertes de sueño, ánimo o apetito',
  'Angustia cuando le llega una notificación o una imagen',
  'Se aleja de amigos con los que antes salía',
]

export const TEEN_PARENT_DO = [
  { title: 'Pregunta con curiosidad, no con sospecha', body: '«¿Qué app de IA usas más? ¿Me muestras algo que hayas hecho?» abre más puertas que «¿estás haciendo trampa?».' },
  { title: 'Acompaña, no vigiles', body: 'Revisar el celular a escondidas rompe la confianza que vas a necesitar el día que haya un problema de verdad.' },
  { title: 'Habla de los montajes antes de que pasen', body: 'Que sepan que, si alguien hace o comparte una imagen falsa de ellos, tú vas a estar de su lado y no los vas a culpar.' },
  { title: 'Pon el ejemplo', body: 'Si tú no sueltas el celular en la mesa, la regla no va a durar.' },
]

export const DEEPFAKE_PROTOCOL = [
  { title: 'No lo compartas', body: 'Ni para avisar ni para preguntar. Cada reenvío multiplica el daño.' },
  { title: 'Guarda evidencia', body: 'Capturas con fecha, enlaces y nombres de cuentas. Sin reenviar la imagen.' },
  { title: 'Reporta en la plataforma', body: 'Todas las redes tienen opción para denunciar imágenes íntimas o falsas.' },
  { title: 'Avisa al colegio', body: 'El colegio debe activar la Ruta de Atención Integral para la Convivencia Escolar (Ley 1620 de 2013, que incluye el ciberacoso).' },
  { title: 'Reporta y denuncia', body: 'Reporta en Te Protejo y denuncia en ADenunciar (Policía y Fiscalía). Si hay peligro inmediato, llama al 123.' },
  { title: 'Acompaña', body: 'Lo primero es que tu hijo o hija sepa que no es su culpa. Busca apoyo psicológico si lo necesita.' },
]

export const TEEN_HELP_LINES = [
  { name: 'Te Protejo', body: 'Reporte confidencial de situaciones de violencia sexual en entornos digitales contra menores de 18 años.', url: 'https://www.teprotejo.org/' },
  { name: 'ADenunciar · Policía y Fiscalía', body: 'Denuncia virtual, también de material de explotación sexual infantil y delitos informáticos.', url: 'https://adenunciar.policia.gov.co/Adenunciar/Login.aspx' },
  { name: 'Línea 141 del ICBF', body: 'Gratuita, nacional y las 24 horas. Para reportar maltrato, violencia sexual o acoso escolar. Pueden llamar niños y adultos.', url: 'https://www.icbf.gov.co/noticias/linea-141' },
  { name: 'Línea 192, opción 4', body: 'Línea nacional de salud mental del Ministerio de Salud. Gratuita, las 24 horas, desde cualquier operador.', url: 'https://www.minsalud.gov.co/' },
  { name: 'Línea 123', body: 'Emergencias. Si alguien corre peligro inmediato, llama primero aquí.', url: 'https://www.policia.gov.co/' },
]

export const TEEN_PARENT_PROMPTS = [
  {
    title: 'Entender qué usan',
    text: 'Mi hijo de 15 años usa [nombre de la app]. Explícame en lenguaje sencillo qué hace, qué datos recoge, qué edad mínima piden sus términos y qué riesgos y usos buenos tiene. Dime qué debo verificar en la página oficial.',
  },
  {
    title: 'Preparar una conversación difícil',
    text: 'Quiero hablar con mi hija de 14 años sobre las imágenes falsas hechas con IA sin asustarla ni sermonearla. Dame 5 preguntas abiertas para empezar y 3 frases que le dejen claro que puede contar conmigo.',
  },
  {
    title: 'Acompañar el estudio',
    text: 'Mi hijo de grado 10 tiene examen de química. No quiero que la IA le haga el trabajo. Dame un plan de una semana donde la IA le haga preguntas y yo pueda revisar su avance sin saber química.',
  },
]

export const AGREEMENT_SECUNDARIA = [
  { id: 'mostrar', text: 'Nos mostramos qué apps de IA usamos y para qué, sin juzgar.' },
  { id: 'tareas', text: 'La IA explica, pregunta y revisa; el trabajo que se entrega lo hacemos nosotros.' },
  { id: 'declarar', text: 'Si usamos IA en una tarea, lo decimos y respetamos lo que el profe permita.' },
  { id: 'fotos', text: 'No subimos fotos de otras personas sin su permiso, ni para «mejorarlas».' },
  { id: 'montajes', text: 'Si aparece un montaje de alguien, no lo reenviamos y lo contamos.' },
  { id: 'apoyo', text: 'Si algo nos pasa en internet, lo contamos sabiendo que no habrá castigo por contarlo.' },
  { id: 'noche', text: 'El celular duerme fuera del cuarto a partir de una hora acordada.' },
  { id: 'mesa', text: 'En la mesa no hay pantallas, tampoco para los adultos.' },
]

// Citas textuales de Algoritmos deshumanizantes (2025). Páginas del PDF de la edición digital.
export const REFLECTIONS = [
  {
    theme: 'Desconectarse',
    quote: 'No perder la humanidad implica también aprender a desconectarnos y entender que la realidad trasciende lo digital haciendo pedagogía ciudadana acerca de los riesgos que implica la hiperconectividad.',
    page: 34,
  },
  {
    theme: 'Estar presentes',
    quote: 'Subimos fotos sonrientes con amigos, pero estamos ausentes en el momento mismo que pretendemos capturar; compartimos pensamientos íntimos con miles de desconocidos, pero nos volvemos incapaces de una conversación honesta con quienes tenemos al lado.',
    page: 75,
  },
  {
    theme: 'La atención',
    quote: '«La atención es la forma más rara y pura de generosidad», escribió Weil desde la experiencia del compromiso total, y es precisamente esta generosidad atencional la que se ve socavada por el constante bombardeo de notificaciones, actualizaciones y estímulos digitales que nos alejan del presente compartido con el otro.',
    page: 75,
  },
  {
    theme: 'La amistad',
    quote: 'Esto requiere no solo cambios en el diseño de plataformas y algoritmos, sino también un trabajo interior para recuperar capacidades como la atención sostenida, la presencia plena y la vulnerabilidad auténtica que constituyen el fundamento de toda amistad verdadera.',
    page: 82,
  },
  {
    theme: 'Pensar por ti',
    quote: 'Para Arendt, la educación no debe limitarse a transmitir información, sino que debe formar personas capaces de pensar por sí mismas y renovar un mundo común.',
    page: 120,
  },
  {
    theme: 'Una oportunidad',
    quote: 'La irrupción de la inteligencia artificial en el ámbito educativo no debe verse como el ocaso de la educación humanista, sino como la oportunidad de su renacimiento.',
    page: 128,
  },
]

export const TALK_CARDS = [
  { for: 'En familia', q: '¿Qué app te roba más tiempo del que quisieras darle?' },
  { for: 'En familia', q: '¿Cuándo fue la última vez que estuvimos juntos sin ningún celular en la mesa?' },
  { for: 'En familia', q: 'Si pudieras cambiar una regla del algoritmo de tu red favorita, ¿cuál sería?' },
  { for: 'En familia', q: '¿Alguna vez una IA te dio una respuesta que te sorprendió? ¿Era verdad?' },
  { for: 'En clase', q: '¿Qué diferencia hay entre un amigo y un seguidor?' },
  { for: 'En clase', q: 'Si la IA escribe mejor que tú, ¿para qué sirve aprender a escribir?' },
  { for: 'En clase', q: '¿Qué sabes hacer tú que ninguna máquina podría copiar?' },
  { for: 'En clase', q: '¿Es trampa usar IA en una tarea? ¿Depende de qué?' },
  { for: 'Contigo', q: '¿Cómo te sientes después de una hora en redes? ¿Y después de una hora con amigos?' },
  { for: 'Contigo', q: '¿Qué cosa rara, tuya, nunca le pedirías a una IA que hiciera por ti?' },
  { for: 'Contigo', q: '¿A quién le escribirías hoy si el feed no existiera?' },
  { for: 'Contigo', q: '¿Qué quieres aprender este año que no tenga nada que ver con una pantalla?' },
]
