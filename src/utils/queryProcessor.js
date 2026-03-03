/**
 * Smart query pre-processor for Spanish search queries.
 * Analyzes intent, pricing, difficulty, and expands synonyms
 * before passing to Fuse.js for fuzzy matching.
 */

const INTENT_MAP = {
  // Video
  'hacer video': 'video',
  'crear video': 'video',
  'editar video': 'video',
  'generar video': 'video',
  'grabar video': 'video',
  'animar': 'video',
  'animacion': 'video',
  'reels': 'video',
  'tiktok': 'video',
  'clips': 'video',
  'avatar': 'video',
  'presentador virtual': 'video',

  // Diseno
  'quitar fondo': 'diseno',
  'eliminar fondo': 'diseno',
  'generar imagen': 'diseno',
  'crear imagen': 'diseno',
  'hacer logo': 'diseno',
  'crear logo': 'diseno',
  'diseno grafico': 'diseno',
  'editar foto': 'diseno',
  'retocar foto': 'diseno',
  'generar arte': 'diseno',
  'ilustracion': 'diseno',

  // Escritura
  'escribir articulo': 'escritura',
  'redactar correo': 'escritura',
  'redactar email': 'escritura',
  'escribir blog': 'escritura',
  'mejorar texto': 'escritura',
  'corregir texto': 'escritura',
  'parafrasear': 'escritura',
  'reescribir': 'escritura',
  'redactar': 'escritura',
  'copywriting': 'escritura',
  'copy': 'escritura',

  // Presentaciones
  'hacer presentacion': 'presentaciones',
  'crear presentacion': 'presentaciones',
  'hacer slides': 'presentaciones',
  'diapositivas': 'presentaciones',
  'powerpoint': 'presentaciones',
  'pitch deck': 'presentaciones',
  'pitch': 'presentaciones',

  // Audio
  'crear musica': 'audio',
  'generar musica': 'audio',
  'hacer cancion': 'audio',
  'texto a voz': 'audio',
  'locucion': 'audio',
  'narrar': 'audio',
  'podcast': 'audio',

  // Programacion
  'programar': 'programacion',
  'escribir codigo': 'programacion',
  'crear pagina web': 'programacion',
  'hacer pagina web': 'programacion',
  'crear app': 'programacion',
  'hacer app': 'programacion',
  'depurar': 'programacion',
  'debuggear': 'programacion',
  'autocompletar codigo': 'programacion',

  // Datos
  'analizar datos': 'datos',
  'analizar excel': 'datos',
  'graficar datos': 'datos',
  'dashboard': 'datos',
  'machine learning': 'datos',
  'prediccion': 'datos',
  'hoja de calculo': 'datos',

  // Investigacion
  'investigar': 'investigacion',
  'buscar papers': 'investigacion',
  'buscar articulos': 'investigacion',
  'paper academico': 'investigacion',
  'verificar fuentes': 'investigacion',
  'resumir documento': 'investigacion',

  // Transcripcion
  'transcribir': 'transcripcion',
  'transcribir reunion': 'transcripcion',
  'transcribir audio': 'transcripcion',
  'voz a texto': 'transcripcion',
  'audio a texto': 'transcripcion',
  'subtitulos': 'transcripcion',
  'dictado': 'transcripcion',

  // Educacion
  'aprender': 'educacion',
  'estudiar': 'educacion',
  'tutor': 'educacion',
  'flashcards': 'educacion',
  'aprender idiomas': 'educacion',
  'practicar ingles': 'educacion',
  'clases': 'educacion',

  // Productividad
  'organizar trabajo': 'productividad',
  'gestionar email': 'productividad',
  'calendario': 'productividad',
  'productividad': 'productividad',
  'notas': 'productividad',

  // Chatbots
  'chatbot': 'chatbots',
  'asistente': 'chatbots',
  'preguntar': 'chatbots',
  'conversar con ia': 'chatbots',

  // Negocios
  'ventas': 'negocios',
  'crm': 'negocios',
  'seo': 'negocios',
  'marketing': 'negocios',
  'publicidad': 'negocios',
  'anuncios': 'negocios',
  'leads': 'negocios',

  // Automatizacion
  'automatizar': 'automatizacion',
  'workflow': 'automatizacion',
  'flujo de trabajo': 'automatizacion',
  'conectar apps': 'automatizacion',
  'scraping': 'automatizacion',

  // Traduccion
  'traducir': 'traduccion',
  'traducir documento': 'traduccion',
  'traduccion': 'traduccion',
  'idiomas': 'traduccion',
}

const PRICING_SIGNALS = {
  'gratis': 'gratis',
  'gratuito': 'gratis',
  'gratuita': 'gratis',
  'free': 'gratis',
  'sin pagar': 'gratis',
  'sin costo': 'gratis',
  'no pagar': 'gratis',
  'barato': 'gratis',
  'barata': 'gratis',
  'economico': 'gratis',
  'economica': 'gratis',
  'premium': 'pago',
  'de pago': 'pago',
  'pago': 'pago',
  'profesional': 'pago',
  'pro': 'pago',
  'freemium': 'freemium',
}

const DIFFICULTY_SIGNALS = {
  'facil': 1,
  'simple': 1,
  'sencillo': 1,
  'sencilla': 1,
  'principiante': 1,
  'basico': 1,
  'basica': 1,
  'sin experiencia': 1,
  'no se nada': 1,
  'intermedio': 2,
  'media': 2,
  'avanzado': 3,
  'avanzada': 3,
  'experto': 3,
  'profesional': 3,
  'tecnico': 3,
  'tecnica': 3,
  'potente': 3,
  'complejo': 3,
  'compleja': 3,
}

const SYNONYMS = {
  'foto': ['imagen', 'fotografia', 'diseno', 'editar foto'],
  'imagen': ['foto', 'fotografia', 'diseno', 'generar imagen'],
  'video': ['clip', 'animacion', 'editar video', 'reels'],
  'musica': ['cancion', 'audio', 'melodia', 'beat', 'instrumental'],
  'cancion': ['musica', 'letra', 'audio', 'componer'],
  'escribir': ['redactar', 'crear texto', 'copywriting'],
  'redactar': ['escribir', 'crear texto', 'correo'],
  'correo': ['email', 'mensaje', 'carta'],
  'email': ['correo', 'mensaje'],
  'presentacion': ['slides', 'diapositivas', 'pitch', 'powerpoint'],
  'slides': ['diapositivas', 'presentacion'],
  'codigo': ['programar', 'desarrollo', 'programacion'],
  'programar': ['codigo', 'desarrollo', 'software'],
  'web': ['pagina', 'sitio', 'frontend'],
  'datos': ['excel', 'analisis', 'hoja de calculo', 'CSV'],
  'excel': ['hoja de calculo', 'datos', 'CSV', 'spreadsheet'],
  'traducir': ['idiomas', 'traduccion', 'lenguaje'],
  'reunion': ['llamada', 'zoom', 'meet', 'videollamada'],
  'transcribir': ['voz a texto', 'audio a texto', 'dictado'],
  'logo': ['marca', 'branding', 'identidad'],
  'fondo': ['background', 'eliminar fondo', 'recortar'],
  'voz': ['locucion', 'narrar', 'texto a voz', 'audio'],
  'aprender': ['estudiar', 'curso', 'tutor', 'educacion'],
  'buscar': ['investigar', 'encontrar', 'consultar'],
  'automatizar': ['workflow', 'flujo', 'conectar', 'proceso'],
  'resumir': ['sintetizar', 'resumen', 'extracto'],
  'chat': ['conversar', 'preguntar', 'asistente', 'chatbot'],
}

// Stopwords to clean from queries
const STOPWORDS = new Set([
  'quiero', 'necesito', 'busco', 'como', 'puedo', 'para', 'que', 'con',
  'una', 'uno', 'un', 'unas', 'unos', 'los', 'las', 'del', 'de', 'la',
  'el', 'en', 'es', 'y', 'o', 'mi', 'me', 'se', 'le', 'lo', 'hay',
  'tiene', 'tiene', 'ser', 'muy', 'mas', 'pero', 'sin', 'por', 'al',
  'algo', 'como', 'hacer', 'herramienta', 'herramientas', 'ia',
  'inteligencia', 'artificial', 'app', 'aplicacion', 'mejor',
])

function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

export function processQuery(rawQuery) {
  const normalized = normalize(rawQuery)

  // Detect categories from intent map (check longer phrases first)
  const detectedCategories = []
  const sortedIntents = Object.keys(INTENT_MAP).sort((a, b) => b.length - a.length)
  for (const phrase of sortedIntents) {
    if (normalized.includes(normalize(phrase))) {
      const cat = INTENT_MAP[phrase]
      if (!detectedCategories.includes(cat)) {
        detectedCategories.push(cat)
      }
    }
  }

  // Detect pricing signals
  let pricingHint = null
  for (const [signal, value] of Object.entries(PRICING_SIGNALS)) {
    if (normalized.includes(normalize(signal))) {
      pricingHint = value
      break
    }
  }

  // Detect difficulty signals
  let difficultyHint = null
  for (const [signal, value] of Object.entries(DIFFICULTY_SIGNALS)) {
    if (normalized.includes(normalize(signal))) {
      difficultyHint = value
      break
    }
  }

  // Clean query: remove stopwords for Fuse.js
  const words = normalized.split(/\s+/)
  const meaningfulWords = words.filter((w) => !STOPWORDS.has(w) && w.length > 1)
  const cleanedQuery = meaningfulWords.join(' ') || normalized

  // Expand terms with synonyms
  const expandedTerms = []
  for (const word of meaningfulWords) {
    const key = Object.keys(SYNONYMS).find((k) => normalize(k) === word)
    if (key) {
      for (const syn of SYNONYMS[key]) {
        if (!expandedTerms.includes(syn) && !meaningfulWords.includes(normalize(syn))) {
          expandedTerms.push(syn)
        }
      }
    }
  }

  const hasStrongIntent = detectedCategories.length > 0 || pricingHint !== null || difficultyHint !== null

  return {
    cleanedQuery,
    expandedTerms,
    detectedCategories,
    pricingHint,
    difficultyHint,
    hasStrongIntent,
  }
}
