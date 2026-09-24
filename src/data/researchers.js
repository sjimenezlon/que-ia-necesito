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
    note: 'Gestor de referencias libre. Zotero 10 (17-ago-2026) busca sin importar tildes y avisa si citas un artículo retractado. Sin IA propia: la IA llega por complementos de terceros.',
  },
  openalex: {
    name: 'OpenAlex',
    url: 'https://openalex.org/',
    free: 'si',
    note: 'Índice abierto (CC0) de la producción científica mundial. Desde febrero de 2026 la API pide llave y regala USD 1 de consultas al día.',
  },
  litmaps: {
    name: 'Litmaps',
    url: 'https://www.litmaps.com/',
    free: 'limitado',
    note: 'Mapas de citación y alertas. Gratis: un mapa de hasta 100 artículos. Pro: USD 10/mes, con descuento para países de ingreso medio.',
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
    note: 'Asistente abierto del Allen Institute sobre Semantic Scholar: busca artículos, resume literatura con citas en las que se puede hacer clic y analiza datos (beta).',
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
    note: 'Corrección de lenguaje académico en Word, Google Docs y Overleaf. Plan gratis limitado; Prime desde USD 12/mes pagando el año.',
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
    note: 'Cuadernos de Python en la nube con asistente y un agente de ciencia de datos que arma el cuaderno a partir de una descripción. Gratis, para mayores de 18 años.',
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
    note: 'Codificación cualitativa con IA: declaras tu intención y la IA propone códigos que tú apruebas. Tiene un «modo privacidad» que no envía nada afuera. Licencias por semestre para estudiantes.',
  },
  nvivo: {
    name: 'NVivo',
    url: 'https://lumivero.com/products/nvivo/',
    free: 'no',
    note: 'Resúmenes y autocodificación con IA como complemento de pago, con retención cero de datos. Anuncia NVivo AI Cloud para el 6 de octubre de 2026.',
  },
  maxqda: {
    name: 'MAXQDA',
    url: 'https://www.maxqda.com/',
    free: 'no',
    note: 'AI Assist resume, sugiere códigos y conversa sobre tus datos, con servidores en la Unión Europea y sin entrenar con ellos. Es un complemento sobre una licencia de pago.',
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
    items: ['Generar hipótesis, análisis o conclusiones y presentarlos como propios', 'Fabricar datos, citas o resultados', 'Poner a la IA como autora', 'Delegar la revisión por pares a un modelo', 'Crear imágenes fotorrealistas de investigación'],
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
      body: 'Salud, vida sexual, origen étnico, convicciones políticas o religiosas y datos biométricos son datos sensibles. La ley permite tratarlos con fines científicos, pero exige suprimir la identidad de los titulares. Y su artículo 26 prohíbe transferir datos personales a países sin protección adecuada, salvo autorización expresa: subir una entrevista a un chat con servidores en el exterior cae ahí.',
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
    evidence: 'En los planes Gratis, Go, Plus y Pro de ChatGPT el contenido se usa para entrenar, salvo que lo desactives. Elsevier lo resume así: muchas herramientas gratuitas no son privadas por defecto. En el otro extremo, Overleaf, NVivo y MAXQDA declaran que no entrenan con tus datos.',
    defense: 'Desactiva el entrenamiento en la configuración, prefiere licencias institucionales o modelos locales y nunca subas datos identificables de participantes.',
    sources: [
      { title: 'ChatGPT: planes', url: 'https://chatgpt.com/pricing' },
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
  { title: 'NIH: prohibición de IA en la revisión por pares (NOT-OD-23-149)', url: 'https://grants.nih.gov/grants/guide/notice-files/NOT-OD-23-149.html' },
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
