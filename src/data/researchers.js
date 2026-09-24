/* ══════════════════════════════════════════════════════════════════
   Capítulo «IA para jóvenes investigadores» — datos verificados al
   24 de septiembre de 2026. Precios y cupos cambian rápido: cada
   entrada lleva su fuente y conviene confirmarla antes de pagar.
   ══════════════════════════════════════════════════════════════════ */

export const RESEARCH_UPDATED = { iso: '2026-09-24', label: '24 de septiembre de 2026' }

/* Herramientas que no están en el catálogo general: se enlazan afuera.
   free: 'si' (plan gratuito real) · 'limitado' (gratis con cupo corto) · 'no' */
export const EXTERNAL_TOOLS = {
  zotero: {
    name: 'Zotero',
    url: 'https://www.zotero.org/',
    free: 'si',
    note: 'Gestor de referencias libre. Zotero 10 (17-ago-2026) busca sin importar tildes, y Zotero te avisa si un artículo de tu biblioteca fue retractado. Sin IA propia: la IA llega por complementos de terceros.',
  },
  openalex: {
    name: 'OpenAlex',
    url: 'https://openalex.org/',
    free: 'si',
    note: 'Índice abierto (CC0) de la producción científica mundial. La API funciona sin llave para consultas básicas; con una llave gratuita tienes USD 1 de consultas al día.',
  },
  litmaps: {
    name: 'Litmaps',
    url: 'https://www.litmaps.com/',
    free: 'limitado',
    note: 'Mapas de citación y alertas. Plan gratis con un mapa pequeño (hasta 100 artículos). Pro: USD 10/mes, con descuentos según el país.',
  },
  undermind: {
    name: 'Undermind',
    url: 'https://www.undermind.ai/',
    free: 'limitado',
    note: 'Agente que lee cientos de artículos y sigue rastros de citas. Plan gratis con límites estándar; Pro desde USD 16/mes.',
  },
  scite: {
    name: 'Scite',
    url: 'https://scite.ai/',
    free: 'no',
    note: 'Dice si una cita apoya, contradice o solo menciona un hallazgo. Gratis solo como conector dentro de otro chatbot; la plataforma cuesta desde USD 20/mes. Pregunta en tu biblioteca.',
  },
  alphaxiv: {
    name: 'alphaXiv',
    url: 'https://www.alphaxiv.org/',
    free: 'si',
    note: 'Capa sobre arXiv con chat y resúmenes por artículo. Truco: cambia «arxiv» por «alphaxiv» en la dirección. Ojo: son preprints sin revisión por pares.',
  },
  asta: {
    name: 'Asta (Ai2)',
    url: 'https://asta.allen.ai/',
    free: 'si',
    note: 'Asistente abierto del Allen Institute sobre Semantic Scholar: busca artículos, resume literatura con citas en las que se puede hacer clic y analiza datos (beta para socios seleccionados).',
  },
  overleaf: {
    name: 'Overleaf',
    url: 'https://www.overleaf.com/',
    free: 'limitado',
    note: 'LaTeX colaborativo con corrección de errores, sugerencias de lenguaje de Writefull y generador de tablas y ecuaciones, gratis con cupo diario. Se puede apagar la IA.',
  },
  paperpal: {
    name: 'Paperpal',
    url: 'https://paperpal.com/',
    free: 'limitado',
    note: 'Corrección de lenguaje académico en Word, Google Docs y Overleaf. Plan gratis limitado y planes de pago (consulta el precio para tu país).',
  },
  trinka: {
    name: 'Trinka',
    url: 'https://www.trinka.ai/',
    free: 'limitado',
    note: 'Corrector académico con guías APA, IEEE y ACS y versión en español. Plan básico gratis sin tarjeta, con 5 solicitudes de IA al mes.',
  },
  colab: {
    name: 'Google Colab + Gemini',
    url: 'https://colab.research.google.com/',
    free: 'si',
    note: 'Cuadernos de Python en la nube con asistente y un agente de ciencia de datos que arma el cuaderno a partir de una descripción. Gratis; el agente de IA es para mayores de 18 años y no está en todos los países.',
  },
  jupyterai: {
    name: 'Jupyter AI',
    url: 'https://github.com/jupyterlab/jupyter-ai',
    free: 'si',
    note: 'Extensión oficial de JupyterLab. La versión 3 conecta agentes externos (Claude, Codex, Gemini) o un modelo local. El software es gratis; el modelo se paga aparte.',
  },
  posit: {
    name: 'Posit Assistant',
    url: 'https://posit.co/products/ai',
    free: 'no',
    note: 'Asistente para R y Python en RStudio y Positron que ve tus data frames y tu entorno. Desde USD 20/mes o con tu propia llave; RStudio y Positron siguen gratis.',
  },
  atlasti: {
    name: 'ATLAS.ti',
    url: 'https://atlasti.com/',
    free: 'no',
    note: 'Codificación cualitativa con IA: declaras tu intención y la IA propone códigos que tú apruebas. La IA solo se activa si la pides y ATLAS.ti declara que no entrena con tus datos. Licencias por semestre para estudiantes.',
  },
  nvivo: {
    name: 'NVivo',
    url: 'https://lumivero.com/products/nvivo/',
    free: 'no',
    note: 'Resúmenes y sugerencia de subcódigos con IA como complemento de pago, con retención cero de datos. Anuncia NVivo AI Cloud para el 6 de octubre de 2026.',
  },
  maxqda: {
    name: 'MAXQDA',
    url: 'https://www.maxqda.com/',
    free: 'no',
    note: 'AI Assist resume, sugiere códigos y conversa sobre tus datos, con servidores en la Unión Europea y sin entrenar con ellos. AI Assist tiene una versión gratis con pocas consultas, siempre sobre una licencia de pago.',
  },
}

export const PRINCIPLES = [
  {
    kicker: 'La pregunta',
    title: 'La pregunta es tuya',
    body: 'La IA puede afinar una pregunta, buscar contraejemplos y señalar vacíos. Formularla, defenderla y decidir qué cuenta como respuesta sigue siendo el trabajo que te forma como investigador.',
  },
  {
    kicker: 'Las fuentes',
    title: 'Cada cita se abre',
    body: 'Ninguna referencia entra al manuscrito sin que la hayas encontrado en su fuente, con su DOI y leyendo al menos el pasaje que citas. Los modelos inventan referencias verosímiles.',
  },
  {
    kicker: 'La transparencia',
    title: 'Declara lo que hiciste',
    body: 'Qué herramienta, qué versión, para qué y cómo lo revisaste. Las editoriales ya no preguntan si usaste IA, sino dónde y con qué control. Declarar no es confesar: es método.',
  },
  {
    kicker: 'Los datos',
    title: 'Lo ajeno no se sube',
    body: 'Entrevistas, datos personales, manuscritos que revisas y resultados inéditos no van a un chat gratuito. Antes, revisa el consentimiento informado, lo aprobado por el comité de ética y la configuración de privacidad.',
  },
]

export const DECISION_ZONES = [
  {
    label: 'Conserva en tus manos',
    title: 'El núcleo de la investigación',
    examples: 'La pregunta, las hipótesis, la interpretación de resultados, las conclusiones y el juicio cuando revisas el trabajo de otros.',
    color: 'border-secondary/25 bg-secondary/[0.04]',
    accent: 'text-secondary',
  },
  {
    label: 'Co-crea con IA',
    title: 'Diseño y escritura asistidos',
    examples: 'Poner a prueba la pregunta, comparar diseños metodológicos, ordenar la estructura del artículo y pulir el lenguaje, sabiendo que todo pasa por tu revisión.',
    color: 'border-primary/25 bg-primary/[0.04]',
    accent: 'text-primary',
  },
  {
    label: 'Explora y contrasta',
    title: 'Mapear lo que ya existe',
    examples: 'Encontrar literatura cercana, seguir redes de citación, buscar estudios que contradigan tu idea y detectar vacíos.',
    color: 'border-accent/25 bg-accent/[0.04]',
    accent: 'text-accent',
  },
  {
    label: 'Automatiza con revisión',
    title: 'El trabajo repetitivo',
    examples: 'Dar formato a referencias, limpiar y documentar datos, transcribir entrevistas ya anonimizadas y traducir borradores propios.',
    color: 'border-warm/25 bg-warm/[0.04]',
    accent: 'text-warm',
  },
]

/* Momentos de una investigación. tools = fichas del catálogo; external = EXTERNAL_TOOLS */
export const MOMENTS = [
  {
    id: 'pregunta',
    label: 'Afinar la pregunta',
    lead: 'Antes de buscar, pon tu pregunta a prueba. Un buen interlocutor te ayuda a acotarla, a ver qué supone y a imaginar qué evidencia la respondería.',
    ai: ['Hacerte preguntas socráticas sobre alcance, población y variables', 'Proponer versiones más acotadas y más amplias de tu pregunta', 'Anticipar objeciones de un jurado o de un revisor'],
    human: ['Decidir qué pregunta vale tu tiempo y por qué importa aquí', 'Elegir el marco teórico desde el que la miras'],
    tools: ['claude', 'chatgpt', 'gemini'],
    external: [],
    trap: 'Aceptar la primera pregunta «mejorada» que devuelve el modelo: suele ser más genérica y menos tuya.',
    prompt: 'Actúa como mi tutor de investigación, no como coautor. Mi pregunta provisional es: [pregunta]. Mi disciplina es [disciplina] y mi contexto es [lugar, población]. Hazme una pregunta a la vez sobre alcance, supuestos, variables y viabilidad. No me des la pregunta reescrita hasta que yo te lo pida. Al final, señala dos formas en que un jurado podría objetar esta pregunta.',
  },
  {
    id: 'literatura',
    label: 'Buscar y mapear literatura',
    lead: 'Aquí la IA ahorra más tiempo… y también esconde más trampas. Úsala para encontrar, nunca para certificar que algo existe.',
    ai: ['Búsqueda semántica en millones de artículos', 'Mapas de citación a partir de un artículo semilla', 'Tablas de extracción: muestra, método y hallazgo por artículo'],
    human: ['Definir la estrategia de búsqueda y los criterios de inclusión', 'Abrir cada artículo y verificar que dice lo que el resumen afirma'],
    tools: ['elicit', 'consensus', 'semantic-scholar', 'research-rabbit', 'connected-papers', 'scispace', 'perplexity'],
    external: ['openalex', 'litmaps', 'undermind', 'asta', 'alphaxiv', 'scite'],
    trap: 'Los modos de «investigación profunda» de los chats generales consultan la web abierta, no Scopus ni Web of Science, y mezclan literatura gris con revisada por pares. Sirven para un primer panorama, no como revisión sistemática.',
    prompt: 'Voy a hacer una revisión de literatura sobre [tema]. Ayúdame a diseñar la estrategia, no a hacerla: propón 3 ecuaciones de búsqueda con operadores booleanos para Scopus y para Google Scholar, sinónimos en español e inglés, criterios de inclusión y exclusión, y las bases de datos más pertinentes para [disciplina]. No me cites artículos: yo los buscaré.',
  },
  {
    id: 'lectura',
    label: 'Leer y organizar',
    lead: 'Un cuaderno de fuentes responde solo con los documentos que tú cargas y señala el pasaje exacto. Eso reduce, aunque no elimina, las respuestas inventadas.',
    ai: ['Responder preguntas cruzando 20 o 50 PDF que tú elegiste', 'Señalar el pasaje de donde sale cada afirmación', 'Comparar marcos teóricos o métodos entre artículos'],
    human: ['Leer los artículos centrales completos', 'Llevar tus notas y tus referencias en un gestor propio'],
    tools: ['notebooklm', 'chatpdf', 'humata', 'pdf-ai'],
    external: ['zotero'],
    trap: 'Subir PDF de acceso restringido o datos inéditos de tu grupo a un servicio que puede usarlos para entrenar. Revisa la configuración antes de cargar.',
    prompt: 'Con base únicamente en las fuentes cargadas, construye una tabla con: autor y año, pregunta de investigación, método, muestra, hallazgo principal y limitación declarada. Si un dato no aparece en la fuente, escribe «no reportado». Cita el pasaje de donde sale cada celda.',
  },
  {
    id: 'datos',
    label: 'Analizar datos',
    lead: 'La IA escribe código de análisis muy rápido. El riesgo es que el análisis quede como una caja negra que nadie, ni tú, puede reproducir.',
    ai: ['Escribir y explicar código en R o Python', 'Sugerir pruebas estadísticas y revisar sus supuestos', 'Hacer gráficos y documentar la limpieza de datos'],
    human: ['Decidir el análisis antes de ver los resultados', 'Correr el código tú mismo, guardarlo y entender cada paso'],
    tools: ['julius', 'chatgpt', 'claude', 'wolfram'],
    external: ['colab', 'jupyterai', 'posit'],
    trap: 'Pedir «encuentra algo significativo» en tus datos: es la receta para el p-hacking. Pide el análisis que definiste, no el que da resultados.',
    prompt: 'Tengo una base con estas variables: [lista y tipo de cada una]. Mi pregunta es [pregunta] y planeo [análisis]. Antes de escribir código, dime qué supuestos debo verificar y cómo. Luego escribe el código en [R o Python], comentado línea por línea, que yo correré en mi equipo. No inventes resultados ni valores.',
  },
  {
    id: 'cualitativo',
    label: 'Trabajo cualitativo',
    lead: 'Los programas de análisis cualitativo ya traen IA que sugiere códigos. La interpretación sigue siendo tuya, y los datos de tus participantes merecen el mayor cuidado.',
    ai: ['Proponer códigos iniciales que tú revisas y apruebas', 'Resumir segmentos largos para navegar el material', 'Transcribir entrevistas ya anonimizadas'],
    human: ['Construir el libro de códigos y decidir qué significa cada categoría', 'Anonimizar antes de subir y respetar lo que firmó cada participante'],
    tools: ['otter'],
    external: ['atlasti', 'nvivo', 'maxqda'],
    trap: 'Activar la IA en la nube sin revisar el consentimiento informado: si tus participantes no aceptaron que un tercero procesara su voz o su texto, no puedes hacerlo.',
    prompt: 'Te comparto un fragmento de entrevista ya anonimizado. Propón hasta 5 códigos iniciales con una definición de una línea y la cita exacta que los sostiene. Marca con «duda» los que dependan de una interpretación que yo debo validar. No hagas inferencias sobre la identidad de la persona.',
  },
  {
    id: 'escritura',
    label: 'Escribir',
    lead: 'Pulir el lenguaje casi nunca exige declaración. Generar contenido sí. La línea está en quién pensó el argumento.',
    ai: ['Corregir gramática, estilo y coherencia de tus borradores', 'Traducir tu texto al inglés académico para que lo revises', 'Proponer una estructura IMRyD y revisar que el resumen refleje el artículo'],
    human: ['Escribir el argumento, la discusión y las conclusiones', 'Revisar cada cambio sugerido y guardar la versión anterior'],
    tools: ['claude', 'chatgpt', 'deepl', 'grammarly', 'quillbot'],
    external: ['overleaf', 'paperpal', 'trinka'],
    trap: 'Pegar el manuscrito entero y aceptar la versión «mejorada»: suele aplanar tu voz, introducir afirmaciones que no hiciste y, a veces, referencias que no existen.',
    prompt: 'Revisa este párrafo de mi artículo solo en claridad, gramática y coherencia. No agregues ideas, datos ni referencias. Devuélveme el texto corregido y, debajo, una lista de cada cambio con la razón, para que yo decida cuáles acepto. Párrafo: [texto]',
  },
  {
    id: 'publicar',
    label: 'Enviar y publicar',
    lead: 'Antes de enviar, lee la política de IA de tu revista: cambia de una editorial a otra y define dónde va tu declaración.',
    ai: ['Comparar tu manuscrito con las instrucciones para autores', 'Revisar que cada referencia tenga DOI y formato correcto', 'Redactar la carta de presentación a partir de tus ideas'],
    human: ['Escribir la declaración de uso de IA', 'Firmar como responsable de todo el contenido'],
    tools: ['claude', 'chatgpt', 'perplexity'],
    external: ['zotero', 'scite'],
    trap: 'Dejar frases del asistente en el texto final. En 2023 se publicó en Physica Scripta un artículo con «Regenerate response», el botón de ChatGPT, en su tercera página, y la base Academ-AI ya reúne cientos de casos parecidos.',
    prompt: 'Te pego las instrucciones para autores de la revista [nombre] y mi manuscrito. Haz una lista de verificación de lo que falta o no cumple: extensión, estructura, formato de referencias, declaraciones obligatorias (incluida la de uso de IA) y datos disponibles. No reescribas el manuscrito.',
  },
]

/* Marco de Springer Nature por niveles de riesgo (leído el 24-sep-2026) */
export const RISK_LIGHTS = [
  {
    level: 'Verde',
    title: 'Asistir',
    tone: 'emerald',
    rule: 'Permitido. Declararlo aumenta la confianza.',
    items: ['Pulir el lenguaje y traducir', 'Sugerir una estructura', 'Comparar opciones metodológicas', 'Poner a prueba la pregunta de investigación', 'Limpiar y deduplicar datos'],
  },
  {
    level: 'Ámbar',
    title: 'Evaluar e interpretar',
    tone: 'amber',
    rule: 'Permitido con supervisión humana, verificación y declaración.',
    items: ['Sugerir enfoques de análisis o pruebas estadísticas', 'Redactar resúmenes explicativos', 'Comparar resultados con la literatura', 'Edición extensa o apoyo de escritura'],
  },
  {
    level: 'Rojo',
    title: 'Sustituir',
    tone: 'rose',
    rule: 'No permitido.',
    items: ['Generar hipótesis, análisis o conclusiones y presentarlos como propios', 'Fabricar datos, citas o resultados', 'Poner a la IA como autora', 'Delegar la revisión por pares a un modelo', 'Crear imágenes fotorrealistas falsas (deepfakes)'],
  },
]

export const PUBLISHERS = [
  { name: 'Elsevier', where: 'Sección aparte al final del manuscrito, que se publica. Si la IA fue parte del método, en Métodos; si hizo una figura, en el pie.', grammar: 'No se declara la corrección básica; sí los cambios de fondo en las frases.', review: 'No subir el manuscrito a ninguna herramienta de IA; solo apoyo para redactar el informe con herramientas privadas.', url: 'https://www.elsevier.com/about/policies-and-standards/generative-ai-policies-for-journals' },
  { name: 'Springer Nature', where: 'Declaración según el nivel de riesgo: verde, ámbar o rojo.', grammar: 'Uso verde: declararlo es recomendable.', review: 'No subir contenido a herramientas públicas; delegar la revisión es rojo.', url: 'https://www.nature.com/nature-portfolio/editorial-policies/ai' },
  { name: 'Wiley', where: 'Al enviar y dentro del manuscrito: propósito, si influyó en argumentos o conclusiones y cómo lo verificaste.', grammar: 'Exenta si es solo ortografía, gramática o edición general.', review: 'Prohibido subir manuscritos o partes, incluidas figuras y tablas.', url: 'https://authors.wiley.com/ethics-guidelines/index.html' },
  { name: 'Taylor & Francis', where: 'Declaración específica en el artículo: herramienta con versión, uso y razón.', grammar: 'Permitida; algunas revistas solo aceptan este uso.', review: 'Prohibido subir manuscritos o propuestas y generar informes con IA.', url: 'https://taylorandfrancis.com/our-policies/ai-policy/' },
  { name: 'IEEE', where: 'En Agradecimientos: sistema, secciones donde se usó y nivel de uso.', grammar: 'Recomendada, no obligatoria.', review: 'No procesar manuscritos en plataformas públicas.', url: 'https://journals.ieeeauthorcenter.ieee.org/become-an-ieee-journal-author/publishing-ethics/guidelines-and-policies/submission-and-peer-review-policies/' },
  { name: 'ICMJE (biomédicas)', where: 'En la carta de presentación y en la sección pertinente del manuscrito.', grammar: 'Según la revista.', review: 'La confidencialidad puede prohibir subir el manuscrito; si usas IA, declárala.', url: 'https://www.icmje.org/recommendations/browse/artificial-intelligence/ai-use-by-authors.html' },
  { name: 'COPE', where: 'En Materiales y Métodos o una sección similar: qué herramienta y cómo.', grammar: 'No lo especifica.', review: 'La IA no puede ser autora; el autor responde por todo.', url: 'https://publicationethics.org/guidance/cope-position/authorship-and-ai-tools' },
  { name: 'arXiv', where: 'Según los estándares de metodología de tu disciplina.', grammar: 'No lo especifica.', review: 'En Computer Science, las revisiones y artículos de posición deben estar aceptados antes de subirse (desde octubre de 2025).', url: 'https://info.arxiv.org/help/moderation/index.html' },
]

export const DISCLOSURE_TOOLS = ['Claude (Anthropic)', 'ChatGPT (OpenAI)', 'Gemini (Google)', 'Gemini Notebook (Google)', 'Elicit', 'Consensus', 'Perplexity', 'DeepL', 'Julius']

export const DISCLOSURE_USES = [
  { id: 'lenguaje', es: 'mejorar la claridad y la gramática de textos escritos por los autores', en: 'improve the clarity and grammar of text written by the authors' },
  { id: 'traduccion', es: 'traducir al inglés borradores escritos por los autores', en: 'translate drafts written by the authors into English' },
  { id: 'literatura', es: 'identificar literatura potencialmente relevante, que luego fue localizada y leída en su fuente', en: 'identify potentially relevant literature, which was then retrieved and read in its original source' },
  { id: 'codigo', es: 'generar y depurar código de análisis, que fue ejecutado y verificado por los autores', en: 'generate and debug analysis code, which was run and verified by the authors' },
  { id: 'estructura', es: 'proponer una estructura para el manuscrito', en: 'suggest a structure for the manuscript' },
]

export const PROMPTS = [
  {
    group: 'Leer',
    title: 'Abogado del diablo para tu hipótesis',
    text: 'Esta es mi hipótesis: [hipótesis]. Actúa como un revisor escéptico de [disciplina]. Dame los tres argumentos más fuertes en su contra y el tipo de evidencia que los sostendría. No inventes estudios: describe qué tipo de estudio habría que buscar.',
  },
  {
    group: 'Leer',
    title: 'Explícame este método',
    text: 'Estoy leyendo un artículo que usa [método]. Explícamelo como a alguien que conoce estadística básica pero no este método: para qué sirve, qué supuestos tiene, cómo se leen sus resultados y dos errores frecuentes al interpretarlo. Después hazme tres preguntas para comprobar que entendí.',
  },
  {
    group: 'Verificar',
    title: 'Auditoría de referencias',
    text: 'Te paso mi lista de referencias. Para cada una, dime si el formato está completo según APA 7 y qué datos faltan (DOI, páginas, volumen). No confirmes si el artículo existe: márcame cuáles debo buscar yo en la fuente porque tienen algo raro.',
  },
  {
    group: 'Verificar',
    title: '¿Mi conclusión se sostiene?',
    text: 'Estos son mis resultados: [resultados]. Esta es mi conclusión: [conclusión]. Dime si la conclusión dice más de lo que los resultados permiten, qué alternativas explicarían lo mismo y qué limitaciones debo declarar.',
  },
  {
    group: 'Escribir',
    title: 'Resumen que no promete de más',
    text: 'Este es mi artículo: [texto]. Redacta un borrador de resumen de máximo 250 palabras con objetivo, método, resultados y conclusión, usando solo información que esté en el texto. Marca entre corchetes cualquier frase que yo deba verificar.',
  },
  {
    group: 'Escribir',
    title: 'Del español al inglés académico, conservando tu voz',
    text: 'Traduce este párrafo al inglés académico para [revista o disciplina]. Conserva mi argumento y mi terminología técnica; no agregues ideas. Después, lista los términos donde dudaste y las alternativas posibles. Párrafo: [texto]',
  },
  {
    group: 'Presentar',
    title: 'Ensayo de sustentación',
    text: 'Voy a sustentar mi proyecto sobre [tema] ante un jurado de [disciplina]. Hazme una pregunta difícil a la vez, como lo haría un jurado exigente. Después de cada respuesta mía, dime qué estuvo bien, qué faltó y la siguiente pregunta. Termina después de seis preguntas con un balance.',
  },
  {
    group: 'Presentar',
    title: 'Tu investigación para no especialistas',
    text: 'Explica mi investigación sobre [tema] en tres versiones: para un estudiante de colegio, para un periodista y para un tomador de decisiones públicas. Usa solo lo que te cuento aquí: [resumen]. Señala qué afirmación podría malinterpretarse en cada versión.',
  },
]

export const CHECKLIST = [
  'Cada referencia la abrí en su fuente y tiene DOI o enlace estable',
  'Ningún dato, cifra o cita salió de un chat sin verificarla',
  'Revisé la política de IA de la revista y sé dónde va mi declaración',
  'Escribí la declaración: herramienta, versión, para qué y cómo lo revisé',
  'El análisis se puede reproducir: guardé código, versión de datos y pasos',
  'No subí datos personales, entrevistas identificables ni resultados inéditos a servicios que entrenan con ellos',
  'Lo que firmaron los participantes y aprobó el comité de ética cubre el uso que hice de la IA',
  'Busqué en el texto frases del asistente: «as an AI language model», «Regenerate response», «as of my last knowledge update», «[Insert…]»',
  'Las imágenes y figuras de resultados no fueron generadas ni alteradas con IA',
  'Puedo explicar y defender cada párrafo sin abrir el chat',
]

export const BOOK_QUOTES = [
  {
    quote: 'Necesitamos desarrollar lo que podríamos llamar una «epistemología de la incertidumbre»: un marco conceptual que nos permita navegar la tensión entre nuestro deseo de certeza y la irreductible indeterminación de sistemas complejos.',
    where: 'Cap. V · p. 146',
    lesson: 'Un modelo de lenguaje responde con el mismo aplomo cuando acierta que cuando inventa. Investigar es aprender a sostener la duda el tiempo suficiente para que la evidencia hable.',
  },
  {
    quote: 'Los datos sintéticos generados por estos modelos inevitablemente omitirán patrones y correlaciones presentes en los datos reales, especialmente aquellos que son raros, no lineales o emergentes de interacciones complejas.',
    where: 'Cap. V · p. 141',
    lesson: 'Si la IA completa tus datos faltantes o simula participantes, lo raro, que a menudo es lo interesante, es lo primero que desaparece.',
  },
  {
    quote: 'Existe un punto de «saturación informacional» donde más datos no solo no contribuyen a un mejor entendimiento, sino que pueden oscurecer las verdades fundamentales bajo un alud de correlaciones espurias.',
    where: 'Introducción · p. 22, a propósito del filósofo de la información Luciano Floridi',
    lesson: 'Leer cien resúmenes generados no equivale a entender cinco artículos. El estado del arte se construye con criterio, no con volumen.',
  },
]

export const COLOMBIA = {
  lead: 'No existe, a la fecha, una guía de Minciencias sobre cómo usar IA generativa en proyectos o productos de investigación. Mientras llega, lo que rige es la ley de datos personales, la norma de ética en investigación con humanos y la política de tu revista y tu universidad.',
  items: [
    {
      kicker: 'Datos personales',
      title: 'Ley 1581 de 2012: anonimiza antes de subir',
      body: 'Salud, vida sexual, origen étnico, convicciones políticas o religiosas y datos biométricos son datos sensibles. La ley permite tratarlos con fines científicos, pero exige suprimir la identidad de los titulares. Y su artículo 26 prohíbe transferir datos personales a países sin protección adecuada, salvo excepciones como la autorización expresa del titular: subir una entrevista a un chat con servidores en el exterior puede caer ahí.',
      action: 'Anonimiza primero y, si vas a usar IA con los datos, dilo en el consentimiento informado: qué herramienta, dónde guarda los datos y si entrena con ellos.',
      url: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981',
    },
    {
      kicker: 'Ética',
      title: 'Resolución 8430 de 1993: tu comité de ética también cuenta',
      body: 'Toda institución que investiga con personas debe tener un comité de ética y proteger la privacidad de los participantes. Una entrevista es «sin riesgo» solo si no se identifica a la persona ni se tocan aspectos sensibles de su conducta. La norma es de 1993 y no menciona la IA, así que la conversación con tu comité es necesaria.',
      action: 'Incluye en el protocolo qué herramientas de IA procesarán datos de participantes. Con menores de edad, extrema el cuidado: la Ley 1581 restringe el tratamiento de sus datos.',
      url: 'https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/DIJ/RESOLUCION-8430-DE-1993.PDF',
    },
    {
      kicker: 'Política pública',
      title: 'CONPES 4144: la IA como apuesta de país',
      body: 'La Política Nacional de IA (febrero de 2025) tiene 106 acciones hasta 2030 y seis ejes, uno de ellos investigación, desarrollo e innovación. A cargo de Minciencias están, entre otras, hubs regionales de I+D+i en IA, convocatorias conjuntas con enfoque territorial y una estrategia de apropiación social del conocimiento en IA.',
      action: 'Si tu tema toca la IA, cita el CONPES en la justificación: conecta tu proyecto con una prioridad nacional financiable.',
      url: 'https://colaboracion.dnp.gov.co/CDT/Conpes/Econ%C3%B3micos/4144.pdf',
    },
    {
      kicker: 'Financiación',
      title: 'Convocatorias con jóvenes investigadores',
      body: 'La última convocatoria nacional llamada «Jóvenes Investigadores e Innovadores» fue la 967 de 2025, sobre transición energética, e incluía una línea de ciencia de datos e IA. En 2026, ColombIA Inteligente (976) pedía vincular jóvenes investigadores y semilleros, aunque su página registra una terminación anormal el 6 de agosto. También hay becas de maestría y doctorado (975) y convocatorias regionales.',
      action: 'Revisa el listado oficial cada mes y pregunta en la oficina de investigación de tu universidad: muchas plazas de joven investigador llegan por convenios, regalías o gobernaciones.',
      url: 'https://minciencias.gov.co/convocatorias/todas',
    },
    {
      kicker: 'Revistas colombianas',
      title: 'Publindex 2026 ya publicó su listado',
      body: 'La convocatoria 977 clasificó las revistas nacionales y publicó resultados definitivos el 28 de julio de 2026. No encontramos criterios sobre políticas de IA en esa clasificación, así que cada revista colombiana decide los suyos.',
      action: 'Antes de enviar a una revista colombiana, busca su política de IA en las instrucciones para autores. Si no la tiene, aplica la de COPE y declara igual.',
      url: 'https://minciencias.gov.co/convocatorias/convocatoria-clasificacion-y-reconocimiento-revistas-cientificas-nacionales-publindex',
    },
    {
      kicker: 'CvLAC y GrupLAC',
      title: 'Tu producto es tuyo, con o sin IA',
      body: 'No encontramos en fuentes oficiales ningún campo para declarar uso de IA en CvLAC o GrupLAC, ni reglas del modelo de medición de grupos sobre productos hechos con IA. Lo que sí cuenta es que el producto exista, sea verificable y lleve tu autoría.',
      action: 'Guarda tu declaración de IA junto a cada producto. Si algún día te la piden, ya la tienes, y si la revista la publicó, ya es pública.',
      url: 'https://scienti.minciencias.gov.co/cvlac/EnRecursoHumano/inicio.do',
    },
  ],
}

export const RISKS = [
  {
    title: 'Referencias que no existen',
    evidence: 'Un estudio en Scientific Reports (2023) pidió 84 revisiones cortas: el 55 % de las citas de GPT-3.5 y el 18 % de las de GPT-4 eran inventadas, y muchas de las reales tenían errores. Otro, en JMIR (2024), replicó 11 revisiones sistemáticas y encontró tasas de alucinación de 28,6 % a 91,4 % según el modelo. Los modelos de 2026 con búsqueda fallan menos, pero Elsevier sigue advirtiendo que las referencias generadas «pueden ser incorrectas o inventadas».',
    defense: 'Toda referencia se abre por su DOI antes de entrar al manuscrito. Impórtala a Zotero: te avisa si fue retractada.',
    sources: [
      { title: 'Walters y Wilder, Scientific Reports', url: 'https://doi.org/10.1038/s41598-023-41032-5' },
      { title: 'Chelli et al., JMIR', url: 'https://doi.org/10.2196/53164' },
    ],
  },
  {
    title: 'Detectores de IA que acusan a quien escribe en segunda lengua',
    evidence: 'OpenAI retiró su propio detector en 2023: identificaba solo el 26 % del texto de IA y marcaba como IA el 9 % del texto humano, y funcionaba peor fuera del inglés. Un estudio en Patterns mostró que siete detectores clasificaron como IA más de la mitad de los ensayos TOEFL escritos por personas: castigan el inglés sencillo de quien no lo tiene como lengua materna.',
    defense: 'Un detector no prueba nada, ni en tu contra ni a tu favor. Lo que te protege es declarar el uso y conservar tus borradores y versiones.',
    sources: [
      { title: 'OpenAI: retiro del clasificador', url: 'https://openai.com/index/new-ai-classifier-for-indicating-ai-written-text/' },
      { title: 'Liang et al., Patterns', url: 'https://doi.org/10.1016/j.patter.2023.100779' },
      { title: 'Weber-Wulff et al., IJEI', url: 'https://doi.org/10.1007/s40979-023-00146-z' },
    ],
  },
  {
    title: 'Uso no declarado que termina en el artículo publicado',
    evidence: 'Un análisis de 15 millones de resúmenes de PubMed en Science Advances (2025) estima que al menos el 13,5 % de los de 2024 pasaron por un modelo de lenguaje. La base Academ-AI documentó cientos de casos no declarados, incluso en revistas de alto prestigio, y muy pocos se corrigen después. Retraction Watch lleva su propia lista.',
    defense: 'Declara el uso aunque parezca menor y busca en tu texto las frases delatoras antes de enviar.',
    sources: [
      { title: 'Kobak et al., Science Advances', url: 'https://doi.org/10.1126/sciadv.adt3813' },
      { title: 'Academ-AI', url: 'https://www.academ-ai.info/' },
      { title: 'Retraction Watch: lista de casos', url: 'https://retractionwatch.com/papers-and-peer-reviews-with-evidence-of-chatgpt-writing/' },
    ],
  },
  {
    title: 'Fábricas de artículos y retractaciones récord',
    evidence: 'En 2023 se retractaron más de 10.000 artículos, un récord, mientras las editoriales limpiaban artículos falsos y fraudes en la revisión por pares. Desde octubre de 2025, arXiv exige que las revisiones y artículos de posición de computación ya estén aceptados antes de subirse, por la avalancha de textos generados.',
    defense: 'Desconfía de la revista que promete publicar en días, revisa que esté indexada y no cites un artículo solo porque aparece en un resumen generado.',
    sources: [
      { title: 'Nature: récord de retractaciones', url: 'https://www.nature.com/articles/d41586-023-03974-8' },
      { title: 'arXiv: nueva práctica en cs', url: 'https://blog.arxiv.org/2025/10/31/attention-authors-updated-practice-for-review-articles-and-position-papers-in-arxiv-cs-category/' },
    ],
  },
  {
    title: 'Datos que se van a entrenar un modelo',
    evidence: 'En los planes individuales de ChatGPT el contenido puede usarse para entrenar, salvo que lo desactives; en Business, Enterprise y Edu no. Elsevier lo resume así: muchas herramientas gratuitas no son privadas por defecto. En el otro extremo, Overleaf, NVivo y MAXQDA declaran que no entrenan con tus datos.',
    defense: 'Desactiva el entrenamiento en la configuración, prefiere licencias institucionales o modelos locales y nunca subas datos identificables de participantes.',
    sources: [
      { title: 'OpenAI: cómo se usan tus datos', url: 'https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance' },
      { title: 'Elsevier: política de IA', url: 'https://www.elsevier.com/about/policies-and-standards/generative-ai-policies-for-journals' },
    ],
  },
  {
    title: 'El mismo modelo no responde igual dos veces',
    evidence: 'Un estudio de Stanford y Berkeley mostró que, entre marzo y junio de 2023, GPT-4 pasó de 84 % a 51 % de acierto en una misma tarea. Un análisis que dependa de «lo que dijo el chat» puede no reproducirse un mes después.',
    defense: 'Registra herramienta, versión, fecha y prompt en tu cuaderno de laboratorio. Guarda el código que genera la IA y córrelo tú en tu propio entorno.',
    sources: [
      { title: 'Chen, Zaharia y Zou, arXiv', url: 'https://arxiv.org/abs/2307.09009' },
      { title: 'APA: cómo citar IA generativa', url: 'https://apastyle.apa.org/blog/cite-generative-ai-references' },
    ],
  },
]

export const SOURCES = [
  { title: 'COPE: autoría y herramientas de IA', url: 'https://publicationethics.org/guidance/cope-position/authorship-and-ai-tools' },
  { title: 'ICMJE: uso de IA por autores', url: 'https://www.icmje.org/recommendations/browse/artificial-intelligence/ai-use-by-authors.html' },
  { title: 'ICMJE: uso de IA por revisores', url: 'https://www.icmje.org/recommendations/browse/artificial-intelligence/ai-use-by-reviewers.html' },
  { title: 'Springer Nature: marco de riesgo para el uso de IA', url: 'https://www.nature.com/nature-portfolio/editorial-policies/ai' },
  { title: 'Elsevier: políticas de IA generativa (junio de 2026)', url: 'https://www.elsevier.com/about/policies-and-standards/generative-ai-policies-for-journals' },
  { title: 'Wiley: guías de ética para autores', url: 'https://authors.wiley.com/ethics-guidelines/index.html' },
  { title: 'Taylor & Francis: política de IA', url: 'https://taylorandfrancis.com/our-policies/ai-policy/' },
  { title: 'IEEE: contenido generado por IA', url: 'https://journals.ieeeauthorcenter.ieee.org/become-an-ieee-journal-author/publishing-ethics/guidelines-and-policies/submission-and-peer-review-policies/' },
  { title: 'arXiv: moderación y uso de IA', url: 'https://info.arxiv.org/help/moderation/index.html' },
  { title: 'NIH: prohibición de IA en la evaluación de propuestas (NOT-OD-23-149)', url: 'https://grants.nih.gov/grants/guide/notice-files/NOT-OD-23-149.html' },
  { title: 'APA Style: formatos de referencia para IA generativa', url: 'https://apastyle.apa.org/blog/cite-generative-ai-references' },
  { title: 'CONPES 4144: Política Nacional de IA', url: 'https://colaboracion.dnp.gov.co/CDT/Conpes/Econ%C3%B3micos/4144.pdf' },
  { title: 'Ley 1581 de 2012', url: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981' },
  { title: 'Resolución 8430 de 1993 (Minsalud)', url: 'https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/DIJ/RESOLUCION-8430-DE-1993.PDF' },
  { title: 'Minciencias: convocatorias', url: 'https://minciencias.gov.co/convocatorias/todas' },
  { title: 'Minciencias: Publindex 2026', url: 'https://minciencias.gov.co/convocatorias/convocatoria-clasificacion-y-reconocimiento-revistas-cientificas-nacionales-publindex' },
  { title: 'Google: límites de Gemini Notebook', url: 'https://support.google.com/notebooklm/answer/16213268?hl=en' },
  { title: 'Elicit: precios', url: 'https://elicit.com/pricing' },
  { title: 'SciSpace: guía de créditos', url: 'https://scispace.com/resources/credits-pricing-guide/' },
  { title: 'OpenAlex: precios de la API', url: 'https://help.openalex.org/access/pricing/' },
  { title: 'Zotero 10', url: 'https://www.zotero.org/blog/zotero-10/' },
  { title: 'Overleaf: funciones de IA', url: 'https://docs.overleaf.com/integrations-and-add-ons/ai-features' },
  { title: 'Nature: «Regenerate response» en un artículo publicado', url: 'https://www.nature.com/articles/d41586-023-02477-w' },
  { title: 'Kobak et al.: escritura asistida por LLM en PubMed', url: 'https://doi.org/10.1126/sciadv.adt3813' },
]

/* ── Entusiasmo con responsabilidad ─────────────────────────────── */
export const POSSIBILITIES = [
  {
    title: 'Leer el mundo en tu idioma',
    body: 'Un artículo en alemán, un informe en portugués o una tesis en chino ya no son una barrera: puedes entender de qué hablan y decidir si vale la pena leerlos a fondo.',
    care: 'Cita el original, no la traducción automática, y verifica los pasajes clave con alguien que lea la lengua.',
    tools: ['deepl', 'notebooklm'],
  },
  {
    title: 'Un semillero con músculo de laboratorio',
    body: 'Un grupo de cuatro estudiantes en un municipio puede mapear literatura, limpiar datos abiertos y hacer análisis que hace una década exigían un equipo con presupuesto.',
    care: 'La escala no reemplaza el rigor: la pregunta, el diseño y la interpretación siguen siendo del grupo.',
    tools: ['elicit', 'julius'],
  },
  {
    title: 'Aprender a programar programando',
    body: 'Si nunca escribiste código, hoy puedes pedir un análisis en R o Python, correrlo, romperlo y preguntar por qué falló. Es un tutor paciente a cualquier hora.',
    care: 'Pide que te explique cada línea y córrelo tú. Si no entiendes el código, todavía no es tu análisis.',
    tools: ['claude', 'chatgpt'],
  },
  {
    title: 'Ensayar antes del jurado',
    body: 'Puedes simular una sustentación, recibir las preguntas más incómodas y practicar tus respuestas tantas veces como quieras antes del día real.',
    care: 'Úsalo para prepararte, no para memorizar respuestas ajenas: el jurado quiere escuchar cómo piensas tú.',
    tools: ['claude', 'gemini'],
  },
  {
    title: 'Llevar tu investigación a la calle',
    body: 'Convertir un artículo en una infografía, un podcast o una charla para la comunidad que participó en el estudio es hoy mucho más fácil. La apropiación social del conocimiento deja de ser un trámite.',
    care: 'Revisa que la versión divulgativa no prometa más de lo que encontraste y dale el crédito a quienes participaron.',
    tools: ['canva', 'notebooklm', 'gamma'],
  },
  {
    title: 'Atreverte a preguntas más grandes',
    body: 'Cuando lo repetitivo pesa menos, queda tiempo para lo que ninguna máquina hace por ti: ir a campo, escuchar, dudar y formular la pregunta que nadie se había hecho en tu territorio.',
    care: 'El tiempo que te ahorra la IA vale lo que hagas con él. Inviértelo en pensar, no en producir más de lo mismo.',
    tools: ['perplexity', 'research-rabbit'],
  },
]

/* ── Seis investigaciones de principio a fin (ejemplos ilustrativos) ── */
export const EXAMPLES = [
  {
    id: 'salud',
    area: 'Salud pública',
    level: 'Semillero de pregrado',
    title: 'Barreras para el control prenatal en veredas rurales',
    question: '¿Qué impide que las gestantes de veredas alejadas asistan a sus controles prenatales?',
    steps: [
      { who: 'IA', text: 'Mapear literatura latinoamericana sobre barreras de acceso y armar una tabla de hallazgos con Elicit.', tools: ['elicit'] },
      { who: 'Tú', text: 'Leer completos los diez estudios más cercanos a tu contexto y descartar los que no aplican.' },
      { who: 'Tú', text: 'Hacer las entrevistas en campo y anonimizarlas antes de cualquier procesamiento.' },
      { who: 'IA', text: 'Proponer códigos iniciales sobre las transcripciones anonimizadas, en modo privacidad.', external: ['atlasti'] },
      { who: 'Tú', text: 'Construir las categorías finales con el grupo y validarlas con una partera o líder comunitaria.' },
    ],
    ethics: 'Las voces de las participantes son datos sensibles de salud. El consentimiento debe decir si una IA procesará las transcripciones y dónde.',
    disclosure: 'Se usó Elicit para identificar literatura, luego leída en su fuente, y ATLAS.ti en modo privacidad para sugerir códigos iniciales, revisados por el equipo.',
  },
  {
    id: 'ambiental',
    area: 'Ingeniería ambiental',
    level: 'Maestría',
    title: 'Calidad del agua en quebradas urbanas con datos abiertos',
    question: '¿Cómo cambian los indicadores de calidad del agua de una quebrada entre la época seca y la de lluvias?',
    steps: [
      { who: 'Tú', text: 'Definir los indicadores y el análisis antes de abrir los datos, y dejarlo por escrito.' },
      { who: 'IA', text: 'Escribir en Colab el código para descargar, limpiar y graficar las series de datos abiertos.', external: ['colab'] },
      { who: 'Tú', text: 'Correr el código paso a paso, revisar cada supuesto y guardar el cuaderno en el repositorio del grupo.' },
      { who: 'IA', text: 'Explicar las pruebas estadísticas candidatas y sus supuestos.', tools: ['claude'] },
      { who: 'Tú', text: 'Interpretar los resultados con conocimiento del territorio: una obra, una lluvia atípica, un vertimiento.' },
    ],
    ethics: 'Si faltan datos de algunos meses, no los rellenes con valores simulados sin declararlo: lo raro, como un vertimiento, es justo lo que desaparece.',
    disclosure: 'Se usó Gemini en Google Colab para generar código de limpieza y visualización, que los autores ejecutaron y verificaron. El cuaderno está disponible en el repositorio.',
  },
  {
    id: 'educacion',
    area: 'Educación',
    level: 'Semillero de licenciatura',
    title: 'Cómo usan la IA los estudiantes de un colegio público',
    question: '¿Para qué tareas escolares usan la IA los estudiantes de grado once y qué aprenden de ese uso?',
    steps: [
      { who: 'IA', text: 'Ayudar a redactar preguntas de encuesta claras y detectar preguntas que sesgan la respuesta.', tools: ['chatgpt'] },
      { who: 'Tú', text: 'Pilotear la encuesta con cinco estudiantes y ajustar el lenguaje con el docente.' },
      { who: 'Tú', text: 'Gestionar el asentimiento de los estudiantes y el consentimiento de sus acudientes.' },
      { who: 'IA', text: 'Sugerir categorías para las respuestas abiertas, ya sin nombres ni cursos.', tools: ['claude'] },
      { who: 'Tú', text: 'Devolver los resultados al colegio en un taller con los estudiantes.' },
    ],
    ethics: 'Son menores de edad: la Ley 1581 restringe el tratamiento de sus datos. Nada identificable se sube a ninguna herramienta.',
    disclosure: 'Se usó ChatGPT para revisar la claridad del cuestionario y Claude para proponer categorías de respuestas abiertas anonimizadas, validadas por el equipo.',
  },
  {
    id: 'historia',
    area: 'Historia',
    level: 'Pregrado',
    title: 'La prensa regional del siglo XIX ante una epidemia',
    question: '¿Cómo narró la prensa local una epidemia y a quién culpó?',
    steps: [
      { who: 'Tú', text: 'Seleccionar los periódicos en el archivo digital y registrar la procedencia de cada imagen.' },
      { who: 'IA', text: 'Transcribir páginas escaneadas con tipografía antigua y marcar las palabras dudosas.', tools: ['gemini'] },
      { who: 'Tú', text: 'Cotejar la transcripción con el original en los fragmentos que vas a citar.' },
      { who: 'IA', text: 'Cruzar todas las transcripciones para encontrar menciones y términos recurrentes.', tools: ['notebooklm'] },
      { who: 'Tú', text: 'Interpretar el discurso en su contexto histórico: esa lectura es la contribución.' },
    ],
    ethics: 'La IA puede modernizar la ortografía o completar palabras ilegibles con lo más probable. En historia, lo probable no es lo que dice la fuente.',
    disclosure: 'Se usó Gemini para una transcripción preliminar de fuentes hemerográficas; los fragmentos citados se cotejaron con los originales.',
  },
  {
    id: 'economia',
    area: 'Economía',
    level: 'Doctorado',
    title: 'Informalidad laboral juvenil con microdatos',
    question: '¿Qué características se asocian con la informalidad de los jóvenes en las ciudades intermedias?',
    steps: [
      { who: 'Tú', text: 'Registrar el plan de análisis antes de ver los resultados (preregistro interno o público).' },
      { who: 'IA', text: 'Escribir y documentar el código en R para unir módulos y construir variables.', external: ['posit'] },
      { who: 'Tú', text: 'Revisar los factores de expansión y las definiciones oficiales de cada variable.' },
      { who: 'IA', text: 'Revisar tu código en busca de errores y proponer pruebas de robustez.', tools: ['claude'] },
      { who: 'Tú', text: 'Decidir qué resultados reportas, incluidos los que no salieron significativos.' },
    ],
    ethics: 'Pedirle a la IA «encuentra una relación significativa» es p-hacking asistido. El análisis que reportas es el que planeaste.',
    disclosure: 'Se usó Posit Assistant para generar y documentar código en R y Claude para revisarlo; los autores ejecutaron todo el análisis y verificaron cada paso.',
  },
  {
    id: 'biodiversidad',
    area: 'Biología',
    level: 'Joven investigador',
    title: 'Registros de anfibios en un corredor de bosque',
    question: '¿Cómo cambió la presencia de especies de anfibios en un corredor de bosque en la última década?',
    steps: [
      { who: 'IA', text: 'Buscar literatura y registros previos de las especies en la región.', tools: ['consensus', 'semantic-scholar'] },
      { who: 'Tú', text: 'Descargar los registros de bases abiertas de biodiversidad y depurar los dudosos con un taxónomo.' },
      { who: 'IA', text: 'Ayudar a escribir el código de mapas y análisis de ocurrencias.', tools: ['chatgpt'] },
      { who: 'Tú', text: 'Conversar con la comunidad local, que conoce el territorio y sus cambios.' },
      { who: 'Tú', text: 'Decidir qué información de ubicación publicas y cuál no.' },
    ],
    ethics: 'Las coordenadas exactas de una especie amenazada pueden facilitar su tráfico. Y el saber de la comunidad merece crédito, no solo agradecimiento.',
    disclosure: 'Se usó Consensus para búsqueda preliminar de literatura y ChatGPT para asistencia en código de análisis espacial, revisado por los autores.',
  },
]

/* ── Dilemas éticos: ¿qué harías? ───────────────────────────────── */
export const DILEMMAS = [
  {
    situation: 'Tu asesor te pide terminar el estado del arte para el viernes. Un chat te entrega un texto impecable con veinte referencias.',
    options: [
      { text: 'Lo uso: el texto está bien escrito y las referencias se ven reales.', verdict: 'Riesgoso', feedback: 'Un texto bien escrito no garantiza referencias reales: estudios medidos encontraron entre 18 % y más de la mitad de citas inventadas. Y el estado del arte es donde tu asesor ve si entendiste el campo.' },
      { text: 'Lo uso como mapa: busco cada referencia, leo las centrales y escribo mi propia síntesis.', verdict: 'Responsable', feedback: 'Usaste la IA para orientarte y conservaste lo que te forma: leer, seleccionar y conectar. Tarda más, pero es tuyo y lo puedes defender.' },
      { text: 'No uso nada de IA para no arriesgarme.', verdict: 'Válido, pero te pierdes algo', feedback: 'Es una decisión legítima. Pero usar un buscador académico con IA para encontrar literatura, verificándola, es un uso aceptado por todas las editoriales.' },
    ],
  },
  {
    situation: 'A tu base le faltan datos de tres municipios. Un compañero propone pedirle a la IA que los «complete» con valores plausibles.',
    options: [
      { text: 'Aceptamos: son pocos datos y el resultado casi no cambia.', verdict: 'No aceptable', feedback: 'Datos inventados presentados como reales son fabricación, la falta más grave en integridad científica, aunque sean pocos. Springer Nature lo pone en rojo.' },
      { text: 'Los dejamos como faltantes, usamos un método de imputación estándar y lo declaramos.', verdict: 'Responsable', feedback: 'Existen métodos documentados para datos faltantes. Lo clave es que sean reproducibles, que se declaren y que se reporte cómo cambian los resultados.' },
      { text: 'Excluimos esos municipios sin mencionarlo.', verdict: 'Problemático', feedback: 'Excluir puede ser legítimo, pero ocultarlo sesga la lectura. Decláralo y explica por qué.' },
    ],
  },
  {
    situation: 'Una compañera del semillero subió las transcripciones completas de las entrevistas, con nombres, a un chat gratuito para resumirlas.',
    options: [
      { text: 'No pasa nada: el chat solo resumió.', verdict: 'No aceptable', feedback: 'Los planes gratuitos pueden usar el contenido para entrenar, y los servidores suelen estar fuera del país. Eso puede violar la Ley 1581 y lo que firmaron las personas.' },
      { text: 'Hablamos con ella y con el tutor, borramos el historial, revisamos el consentimiento y definimos un protocolo del grupo.', verdict: 'Responsable', feedback: 'El error se corrige mejor en grupo que en silencio. Un protocolo claro (anonimizar primero, qué herramientas sí) evita que se repita.' },
      { text: 'Lo reportamos al comité de ética sin hablar con ella.', verdict: 'Depende', feedback: 'Si hay riesgo real para las personas, el comité debe saberlo. Pero empezar por la conversación y el tutor suele ser más justo y más formativo.' },
    ],
  },
  {
    situation: 'La IA te propone una hipótesis brillante que no se te había ocurrido y que cambia el enfoque de tu tesis.',
    options: [
      { text: 'La presento como mía: al fin y al cabo yo le hice la pregunta.', verdict: 'No aceptable', feedback: 'Presentar hipótesis generadas por IA como propias está en rojo en el marco de Springer Nature. Además, si no sabes de dónde salió, no sabes si ya está publicada.' },
      { text: 'La exploro: busco si alguien ya la estudió, la discuto con mi asesor y, si la uso, declaro cómo surgió.', verdict: 'Responsable', feedback: 'Las buenas ideas pueden venir de cualquier conversación. Lo que la vuelve investigación es que la contrastes, la fundamentes y seas transparente sobre su origen.' },
      { text: 'La descarto porque vino de una máquina.', verdict: 'Te pierdes algo', feedback: 'No hace falta descartarla. Tratarla como la sugerencia de un colega, que se verifica y se cita, es más útil.' },
    ],
  },
  {
    situation: 'Te invitan a tu primera revisión por pares. No tienes tiempo y piensas pedirle a un modelo un primer borrador del informe.',
    options: [
      { text: 'Pego el manuscrito y pido el informe; después lo edito.', verdict: 'No aceptable', feedback: 'El manuscrito es confidencial. Elsevier, Wiley, Taylor & Francis e IEEE prohíben subirlo a herramientas de IA, y Springer Nature pone en rojo delegar la revisión a un modelo.' },
      { text: 'Declino con tiempo o pido una prórroga, y hago la revisión yo.', verdict: 'Responsable', feedback: 'Declinar a tiempo es una forma de respeto con los autores y la revista. Revisar bien es parte de tu formación.' },
      { text: 'Escribo mi informe y uso la IA solo para pulir mi propia redacción, sin pegar nada del manuscrito, y lo declaro.', verdict: 'Aceptable si la revista lo permite', feedback: 'Varias editoriales permiten este uso limitado. Revisa la política de la revista y decláralo al editor.' },
    ],
  },
]

export const GROUP_QUESTIONS = [
  '¿Qué parte de nuestra investigación no queremos delegar nunca, aunque la IA lo haga bien? ¿Por qué?',
  'Si una persona que participó en nuestro estudio leyera cómo usamos la IA con sus datos, ¿estaría tranquila?',
  '¿Quién se beneficia y quién queda por fuera si nuestra investigación depende de herramientas de pago en inglés?',
  '¿Qué sabe nuestra comunidad que ningún modelo entrenado en otro lugar puede saber?',
  '¿Estamos usando la IA para pensar mejor o para producir más rápido lo mismo?',
  '¿Cómo le contaríamos a un jurado, sin vergüenza y sin exagerar, qué hizo la IA y qué hicimos nosotros?',
]

export const REFLECTION_PROMPTS = [
  '¿Qué parte de mi investigación quiero que sea completamente mía y por qué?',
  '¿En qué momento la IA me ayudó a pensar mejor y en cuál me ahorró pensar?',
  '¿Qué haría distinto si tuviera que explicarle a las personas de mi estudio cómo usé la IA?',
]

export const COMMITMENTS = [
  'Verificaré en su fuente cada referencia, dato y cita antes de usarlos.',
  'Declararé con honestidad qué herramientas usé, para qué y cómo las revisé.',
  'No subiré datos personales, entrevistas identificables ni manuscritos ajenos a herramientas que no los protejan.',
  'Mantendré en mis manos la pregunta, la interpretación y las conclusiones.',
  'Compartiré con mi grupo lo que aprenda, incluidos mis errores.',
  'Usaré el tiempo que me ahorre la IA para pensar, ir a campo y escuchar.',
]
