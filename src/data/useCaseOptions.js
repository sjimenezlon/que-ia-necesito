/**
 * Specific use cases per category for the recommendation wizard.
 * Each use case has an ID, label, and matchTerms for scoring against tool data.
 */

export const USE_CASES = {
  escritura: [
    { id: 'escritura-articulos', label: 'Artículos y blogs', emoji: '📝', matchTerms: ['articulo', 'blog', 'contenido', 'SEO', 'publicar'] },
    { id: 'escritura-correos', label: 'Correos y documentos', emoji: '📧', matchTerms: ['correo', 'email', 'documento', 'informe', 'carta'] },
    { id: 'escritura-marketing', label: 'Textos de marketing', emoji: '📣', matchTerms: ['marketing', 'copy', 'publicidad', 'ventas', 'landing', 'anuncios'] },
    { id: 'escritura-creativa', label: 'Escritura creativa', emoji: '✍️', matchTerms: ['creativo', 'historia', 'narrativa', 'ficcion', 'guion'] },
    { id: 'escritura-academica', label: 'Textos académicos', emoji: '🎓', matchTerms: ['academico', 'tesis', 'ensayo', 'investigacion', 'universidad'] },
  ],
  diseno: [
    { id: 'diseno-imagenes', label: 'Generar imágenes', emoji: '🎨', matchTerms: ['generar', 'imagen', 'crear', 'arte', 'ilustracion'] },
    { id: 'diseno-logo', label: 'Logos y branding', emoji: '💎', matchTerms: ['logo', 'marca', 'branding', 'identidad', 'vector', 'icono'] },
    { id: 'diseno-editar', label: 'Editar fotos', emoji: '🖼️', matchTerms: ['editar', 'foto', 'retocar', 'fondo', 'mejorar', 'recortar'] },
    { id: 'diseno-social', label: 'Diseño para redes', emoji: '📱', matchTerms: ['redes', 'social', 'post', 'banner', 'plantilla', 'instagram'] },
    { id: 'diseno-producto', label: 'Fotos de producto', emoji: '🛍️', matchTerms: ['producto', 'e-commerce', 'tienda', 'catalogo', 'fondo'] },
  ],
  presentaciones: [
    { id: 'presentaciones-pitch', label: 'Pitch y ventas', emoji: '💼', matchTerms: ['pitch', 'ventas', 'negocio', 'deck', 'inversionista'] },
    { id: 'presentaciones-clase', label: 'Clases y educación', emoji: '📚', matchTerms: ['clase', 'educacion', 'curso', 'taller', 'profesor'] },
    { id: 'presentaciones-reporte', label: 'Reportes e informes', emoji: '📊', matchTerms: ['reporte', 'informe', 'datos', 'resultados', 'metricas'] },
    { id: 'presentaciones-narrativa', label: 'Storytelling visual', emoji: '🎬', matchTerms: ['narrativa', 'historia', 'storytelling', 'visual', 'creativo'] },
  ],
  video: [
    { id: 'video-clips', label: 'Clips cortos y reels', emoji: '📱', matchTerms: ['corto', 'reel', 'tiktok', 'clip', 'redes'] },
    { id: 'video-avatar', label: 'Avatar o presentador', emoji: '🧑‍💻', matchTerms: ['avatar', 'presentador', 'portavoz', 'corporativo', 'sin camara'] },
    { id: 'video-animacion', label: 'Animación', emoji: '🎥', matchTerms: ['animar', 'animacion', 'movimiento', 'efecto', '3D'] },
    { id: 'video-editar', label: 'Editar video', emoji: '✂️', matchTerms: ['editar', 'cortar', 'subtitulos', 'efectos', 'produccion'] },
    { id: 'video-generar', label: 'Generar desde texto', emoji: '✨', matchTerms: ['generar', 'texto', 'crear', 'cinematografico', 'prompt'] },
  ],
  audio: [
    { id: 'audio-musica', label: 'Crear música', emoji: '🎵', matchTerms: ['musica', 'cancion', 'melodia', 'beat', 'instrumental', 'componer'] },
    { id: 'audio-voz', label: 'Texto a voz', emoji: '🗣️', matchTerms: ['voz', 'hablar', 'texto', 'clonar', 'sintetizar'] },
    { id: 'audio-podcast', label: 'Podcast y audio', emoji: '🎙️', matchTerms: ['podcast', 'grabar', 'editar audio', 'episodio'] },
    { id: 'audio-narrar', label: 'Narración y locución', emoji: '📖', matchTerms: ['narrar', 'locucion', 'audiolibro', 'curso', 'profesional'] },
  ],
  programacion: [
    { id: 'programacion-escribir', label: 'Escribir código', emoji: '💻', matchTerms: ['escribir', 'codigo', 'funcion', 'modulo', 'desarrollar'] },
    { id: 'programacion-depurar', label: 'Depurar errores', emoji: '🐛', matchTerms: ['depurar', 'debug', 'error', 'fix', 'corregir'] },
    { id: 'programacion-web', label: 'Crear página web', emoji: '🌐', matchTerms: ['web', 'pagina', 'frontend', 'react', 'app', 'sitio'] },
    { id: 'programacion-ide', label: 'Asistente en IDE', emoji: '⚡', matchTerms: ['IDE', 'VS Code', 'editor', 'autocompletar', 'sugerir'] },
    { id: 'programacion-aprender', label: 'Aprender a programar', emoji: '📘', matchTerms: ['aprender', 'tutorial', 'principiante', 'curso', 'estudiar'] },
  ],
  datos: [
    { id: 'datos-analizar', label: 'Analizar datos', emoji: '🔍', matchTerms: ['analizar', 'insight', 'patron', 'tendencia', 'estadistica'] },
    { id: 'datos-visualizar', label: 'Visualizar y dashboards', emoji: '📊', matchTerms: ['dashboard', 'grafica', 'visualizar', 'KPI', 'metrica'] },
    { id: 'datos-predecir', label: 'Predicciones y ML', emoji: '🔮', matchTerms: ['prediccion', 'machine learning', 'modelo', 'clasificar', 'predecir'] },
    { id: 'datos-excel', label: 'Trabajar con Excel', emoji: '📗', matchTerms: ['excel', 'hoja de calculo', 'CSV', 'spreadsheet', 'tabla'] },
  ],
  investigacion: [
    { id: 'investigacion-academica', label: 'Papers académicos', emoji: '📄', matchTerms: ['paper', 'academico', 'cientifico', 'estudio', 'literatura'] },
    { id: 'investigacion-general', label: 'Investigación general', emoji: '🔎', matchTerms: ['buscar', 'investigar', 'informacion', 'consultar'] },
    { id: 'investigacion-fuentes', label: 'Verificar fuentes', emoji: '✅', matchTerms: ['fuente', 'verificar', 'citar', 'evidencia', 'consenso'] },
    { id: 'investigacion-resumir', label: 'Resumir documentos', emoji: '📋', matchTerms: ['resumir', 'sintetizar', 'extraer', 'documento'] },
  ],
  transcripcion: [
    { id: 'transcripcion-reunion', label: 'Transcribir reuniones', emoji: '🤝', matchTerms: ['reunion', 'llamada', 'zoom', 'meet', 'notas'] },
    { id: 'transcripcion-audio', label: 'Audio a texto', emoji: '🎧', matchTerms: ['audio', 'grabar', 'voz', 'dictado', 'transcribir'] },
    { id: 'transcripcion-subtitulos', label: 'Generar subtítulos', emoji: '💬', matchTerms: ['subtitulos', 'caption', 'video', 'accesibilidad'] },
  ],
  educacion: [
    { id: 'educacion-aprender', label: 'Aprender un tema', emoji: '📖', matchTerms: ['aprender', 'entender', 'explicar', 'estudiar', 'tema'] },
    { id: 'educacion-tutor', label: 'Tutor personalizado', emoji: '👨‍🏫', matchTerms: ['tutor', 'profesor', 'ejercicios', 'practica', 'ayuda'] },
    { id: 'educacion-idiomas', label: 'Aprender idiomas', emoji: '🌍', matchTerms: ['idiomas', 'ingles', 'conversar', 'vocabulario', 'hablar'] },
    { id: 'educacion-estudiar', label: 'Estudiar y repasar', emoji: '🧠', matchTerms: ['estudiar', 'flashcard', 'quiz', 'memorizar', 'examen', 'repasar'] },
  ],
  productividad: [
    { id: 'productividad-email', label: 'Gestionar email', emoji: '📬', matchTerms: ['email', 'correo', 'inbox', 'responder', 'organizar'] },
    { id: 'productividad-organizar', label: 'Organizar trabajo', emoji: '📋', matchTerms: ['notas', 'organizar', 'documentos', 'proyecto', 'tareas'] },
    { id: 'productividad-automatizar', label: 'Automatizar tareas', emoji: '⚙️', matchTerms: ['automatizar', 'flujo', 'workflow', 'repetitivo'] },
    { id: 'productividad-calendario', label: 'Gestionar calendario', emoji: '📅', matchTerms: ['calendario', 'agenda', 'reuniones', 'tiempo', 'planificar'] },
  ],
  chatbots: [
    { id: 'chatbots-asistente', label: 'Asistente personal', emoji: '🤖', matchTerms: ['asistente', 'ayuda', 'preguntar', 'resolver', 'consultar'] },
    { id: 'chatbots-consultas', label: 'Resolver consultas', emoji: '💡', matchTerms: ['consulta', 'duda', 'pregunta', 'respuesta', 'informacion'] },
    { id: 'chatbots-multimodelo', label: 'Probar varios modelos', emoji: '🔄', matchTerms: ['modelos', 'comparar', 'probar', 'multiples', 'diferentes'] },
  ],
  negocios: [
    { id: 'negocios-crm', label: 'CRM y ventas', emoji: '📈', matchTerms: ['CRM', 'ventas', 'clientes', 'leads', 'pipeline'] },
    { id: 'negocios-seo', label: 'SEO y posicionamiento', emoji: '🔍', matchTerms: ['SEO', 'google', 'posicionar', 'ranking', 'palabras clave'] },
    { id: 'negocios-publicidad', label: 'Publicidad digital', emoji: '📢', matchTerms: ['publicidad', 'anuncios', 'ads', 'facebook', 'banner'] },
    { id: 'negocios-marketing', label: 'Marketing de contenidos', emoji: '📣', matchTerms: ['marketing', 'contenido', 'estrategia', 'marca', 'branding'] },
  ],
  automatizacion: [
    { id: 'automatizacion-workflow', label: 'Flujos de trabajo', emoji: '🔗', matchTerms: ['workflow', 'flujo', 'conectar', 'integrar', 'proceso'] },
    { id: 'automatizacion-web', label: 'Automatización web', emoji: '🌐', matchTerms: ['navegador', 'scraping', 'extraer', 'web', 'extension'] },
    { id: 'automatizacion-datos', label: 'Pipelines de datos', emoji: '📊', matchTerms: ['datos', 'pipeline', 'ETL', 'procesar', 'API'] },
    { id: 'automatizacion-agentes', label: 'Agentes de IA', emoji: '🤖', matchTerms: ['agente', 'autonomo', 'IA', 'personalizar', 'inteligente'] },
  ],
  traduccion: [
    { id: 'traduccion-documento', label: 'Traducir documentos', emoji: '📄', matchTerms: ['documento', 'traducir', 'archivo', 'texto', 'profesional'] },
    { id: 'traduccion-tiempo-real', label: 'Traducción en tiempo real', emoji: '⚡', matchTerms: ['tiempo real', 'rapido', 'camara', 'instantaneo'] },
    { id: 'traduccion-mejorar', label: 'Mejorar textos', emoji: '✨', matchTerms: ['mejorar', 'reescribir', 'parafrasear', 'tono', 'claridad'] },
    { id: 'traduccion-aprender', label: 'Aprender idiomas', emoji: '🌍', matchTerms: ['aprender', 'idiomas', 'practicar', 'conversar', 'vocabulario'] },
  ],
  finanzas: [
    { id: 'finanzas-analisis', label: 'Análisis financiero', emoji: '📊', matchTerms: ['analisis', 'finanzas', 'ratios', 'estados', 'ebitda', 'fcf'] },
    { id: 'finanzas-investigacion', label: 'Research de empresas', emoji: '🔎', matchTerms: ['investigar', 'empresa', 'mercado', 'earnings', 'filings'] },
    { id: 'finanzas-inversion', label: 'Decisiones de inversión', emoji: '📈', matchTerms: ['inversion', 'portafolio', 'acciones', 'bolsa', 'trading'] },
    { id: 'finanzas-portafolio', label: 'Gestión de portafolio', emoji: '💼', matchTerms: ['portafolio', 'watchlist', 'dashboard', 'seguimiento', 'tenencia'] },
    { id: 'finanzas-contabilidad', label: 'Contabilidad y cierre', emoji: '📒', matchTerms: ['contabilidad', 'cierre', 'conciliacion', 'erp', 'niif', 'factura'] },
    { id: 'finanzas-gastos', label: 'Gestión de gastos', emoji: '💳', matchTerms: ['gastos', 'tarjeta', 'reembolso', 'aprobacion', 'saas', 'ahorro'] },
    { id: 'finanzas-auditoria', label: 'Auditoría y fraude', emoji: '🕵️', matchTerms: ['auditoria', 'fraude', 'anomalia', 'riesgo', 'cumplimiento', 'sox'] },
    { id: 'finanzas-personal', label: 'Finanzas personales', emoji: '🏠', matchTerms: ['personal', 'presupuesto', 'flujo caja', 'impuestos', 'pyme'] },
  ],
}

/**
 * Optional context questions per category.
 * Only shown if the selected category has a question defined.
 */
export const CONTEXT_QUESTIONS = {
  escritura: {
    question: '¿Para qué tipo de proyecto?',
    options: [
      { value: 'personal', label: 'Personal', emoji: '🏠' },
      { value: 'equipo', label: 'Equipo o empresa', emoji: '👥' },
      { value: 'academico', label: 'Académico', emoji: '🎓' },
      { value: 'freelance', label: 'Freelance o cliente', emoji: '💼' },
    ],
  },
  video: {
    question: '¿Para qué plataforma?',
    options: [
      { value: 'youtube', label: 'YouTube', emoji: '▶️' },
      { value: 'redes', label: 'Redes sociales', emoji: '📱' },
      { value: 'profesional', label: 'Profesional o corporativo', emoji: '🏢' },
      { value: 'educativo', label: 'Educativo', emoji: '📚' },
    ],
  },
  programacion: {
    question: '¿En qué entorno trabajas?',
    options: [
      { value: 'vscode', label: 'VS Code / Editor', emoji: '💻' },
      { value: 'navegador', label: 'Navegador', emoji: '🌐' },
      { value: 'terminal', label: 'Terminal', emoji: '⌨️' },
      { value: 'nocode', label: 'Sin código (no-code)', emoji: '🔧' },
    ],
  },
  diseno: {
    question: '¿Qué tipo de resultado necesitas?',
    options: [
      { value: 'raster', label: 'Imágenes (PNG/JPG)', emoji: '🖼️' },
      { value: 'vector', label: 'Vectores (SVG)', emoji: '✏️' },
      { value: 'edicion', label: 'Edición de fotos', emoji: '📸' },
      { value: 'plantillas', label: 'Plantillas listas', emoji: '📋' },
    ],
  },
  datos: {
    question: '¿Qué tipo de datos manejas?',
    options: [
      { value: 'excel', label: 'Excel / Hojas de cálculo', emoji: '📗' },
      { value: 'database', label: 'Bases de datos / SQL', emoji: '🗄️' },
      { value: 'texto', label: 'Texto / Encuestas', emoji: '📝' },
      { value: 'metricas', label: 'Métricas de negocio', emoji: '📈' },
    ],
  },
  finanzas: {
    question: '¿En qué contexto financiero trabajas?',
    options: [
      { value: 'institucional', label: 'Banca / buy-side', emoji: '🏦' },
      { value: 'corporativo', label: 'Corporativo / pyme', emoji: '🏢' },
      { value: 'retail', label: 'Inversionista retail', emoji: '💰' },
      { value: 'publico', label: 'Sector público', emoji: '🏛️' },
    ],
  },
}

/**
 * Get all use case IDs as a flat array
 */
export function getAllUseCaseIds() {
  return Object.values(USE_CASES).flatMap((cases) => cases.map((c) => c.id))
}

/**
 * Get use case info by ID
 */
export function getUseCaseById(id) {
  for (const cases of Object.values(USE_CASES)) {
    const found = cases.find((c) => c.id === id)
    if (found) return found
  }
  return null
}
