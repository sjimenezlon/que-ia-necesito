// Capítulo «Decisiones económicas». Las cifras del ADI vienen de balamlabs.org (ADI v2026.1).
// Los ids de `tools` deben existir en tools.json.

export const moments = [
  {
    id: 'medir',
    title: 'Medir',
    question: '¿Qué está pasando?',
    ai: 'Junta fuentes dispersas, limpia tablas, cruza series y resume lo que dicen los datos.',
    person:
      'Elige qué vale la pena medir, comprueba la fuente y la fecha de corte, y reconoce lo que el dato no alcanza a ver.',
  },
  {
    id: 'modelar',
    title: 'Modelar',
    question: '¿Qué pasaría si…?',
    ai: 'Estima relaciones, proyecta escenarios, calcula sensibilidades y escribe el código del modelo.',
    person:
      'Decide qué supuestos son razonables, distingue una correlación de una causa y pide el intervalo, no solo el número.',
  },
  {
    id: 'decidir',
    title: 'Decidir',
    question: '¿Qué hacemos y quién responde?',
    ai: 'Ordena alternativas, hace de abogado del diablo y deja por escrito lo que se discutió.',
    person:
      'Pone los fines, pesa lo que no tiene precio, asume el costo de equivocarse y firma la decisión.',
  },
]

export const decisions = [
  {
    id: 'precio',
    label: 'Precio',
    question: '¿Cuánto cobrar, a quién y cuándo cambiarlo?',
    ai: [
      'Estimar cómo responde la cantidad vendida a un cambio de precio con el historial de ventas.',
      'Comparar la lista propia con precios públicos de la competencia.',
      'Simular el margen bajo tres escenarios de costo e inflación.',
    ],
    tools: ['julius', 'claude', 'chatgpt', 'copilot'],
    data: [
      'DANE · IPC por división de gasto y por ciudad',
      'DANE · Índice de Precios del Productor (IPP)',
      'DANE · SIPSA, precios mayoristas de alimentos',
      'Banco de la República · TRM y expectativas de inflación',
    ],
    prompt: `Actúa como analista de precios. Te entrego una tabla con fecha, producto, precio y unidades vendidas de [PERIODO].

1. Describe la calidad de los datos: vacíos, valores atípicos y cambios de precio que coinciden con promociones o temporadas.
2. Estima la sensibilidad de la cantidad al precio para cada producto. Explica el método en lenguaje llano y entrega un intervalo, no un solo número.
3. Di qué otras explicaciones podrían producir el mismo patrón (temporada, competencia, quiebres de inventario).
4. Simula el margen con tres precios: actual, [+X %] y [−X %]. Muestra los supuestos de costo.
5. Termina con lo que NO se puede concluir con estos datos.

No inventes cifras. Si falta un dato, pídelo.

DATOS:
[PEGA AQUÍ LA TABLA]`,
    keep: 'A quién se le sube el precio, qué relación con el cliente se arriesga y qué precio se considera justo. La elasticidad es una estimación; la política de precios es una decisión.',
  },
  {
    id: 'demanda',
    label: 'Demanda y pronóstico',
    question: '¿Cuánto vamos a vender y qué tan seguros estamos?',
    ai: [
      'Separar tendencia, temporada y ruido en una serie de ventas.',
      'Proyectar con varios métodos y comparar su error en meses ya conocidos.',
      'Señalar las semanas en que el pronóstico falló y proponer por qué.',
    ],
    tools: ['julius', 'chatgpt', 'gemini', 'wolfram'],
    data: [
      'DANE · Encuesta Mensual de Comercio (EMC)',
      'DANE · EMMET, producción y ventas de la industria',
      'DANE · GEIH, ocupación e ingresos por ciudad',
      'Banco de la República · tasas de interés y cartera',
    ],
    prompt: `Te entrego ventas mensuales de [PRODUCTO O LÍNEA] entre [INICIO] y [FIN].

1. Grafica y describe tendencia, estacionalidad y meses atípicos.
2. Reserva los últimos seis meses. Pronostícalos con al menos dos métodos y reporta el error de cada uno.
3. Con el mejor método, proyecta los próximos [N] meses con intervalo del 80 %.
4. Enumera los supuestos: qué tendría que mantenerse igual para que el pronóstico sirva.
5. Dime qué evento externo lo invalidaría (cambio de tasa, entrada de un competidor, paro, clima).

No redondees el intervalo para que parezca más preciso.

DATOS:
[PEGA AQUÍ LA SERIE]`,
    keep: 'Cuánto inventario, cuánta gente y cuánta caja se comprometen con ese número. El pronóstico dice qué es probable; no dice cuánto riesgo aguanta la organización.',
  },
  {
    id: 'inversion',
    label: 'Inversión y proyectos',
    question: '¿Vale la pena poner aquí el capital?',
    ai: [
      'Armar el flujo de caja y calcular VPN, TIR y periodo de recuperación.',
      'Correr la sensibilidad a tasa de descuento, demanda y costo.',
      'Revisar el modelo en busca de errores de fórmula y supuestos sin sustento.',
    ],
    tools: ['claude', 'copilot', 'finchat', 'notebooklm'],
    data: [
      'Banco de la República · tasa de política, IBR y curva de TES',
      'Supersociedades · estados financieros NIIF de las empresas más grandes',
      'DANE · cuentas nacionales por actividad',
      'SECOP II · contratos públicos comparables en datos.gov.co',
    ],
    prompt: `Vas a revisar la evaluación financiera de un proyecto. Te doy inversión inicial, ingresos y costos proyectados por año y tasa de descuento.

1. Reconstruye el flujo de caja y calcula VPN, TIR y periodo de recuperación. Muestra las fórmulas.
2. Identifica los tres supuestos de los que más depende el resultado.
3. Haz una tabla de sensibilidad: ¿con qué valor de cada supuesto el VPN se vuelve cero?
4. Describe un escenario en el que el proyecto fracasa aunque los números de hoy sean correctos.
5. Lista lo que este análisis no incluye (opciones de espera, efectos sobre otras líneas, costos no monetarios).

No opines sobre si conviene invertir: entrega el análisis y las dudas.

DATOS:
[PEGA AQUÍ EL FLUJO Y LOS SUPUESTOS]`,
    keep: 'La tasa de descuento que refleja el riesgo que se quiere asumir, lo que se deja de hacer con ese capital y la decisión misma. Un VPN positivo es un argumento, no una orden.',
  },
  {
    id: 'talento',
    label: 'Talento y productividad',
    question: '¿Qué tareas se delegan, cuáles se rediseñan y qué gente necesitamos?',
    ai: [
      'Descomponer un cargo en tareas y clasificarlas por nivel de delegación posible.',
      'Comparar salarios y ocupación con el mercado laboral de la ciudad.',
      'Calcular productividad por persona y por hora antes y después de un cambio.',
    ],
    tools: ['chatgpt', 'claude', 'julius', 'perplexity'],
    data: [
      'DANE · GEIH, ocupados, ingresos e informalidad por ciudad y rama',
      'DANE · Productividad Total de los Factores y productividad laboral',
      'Servicio Público de Empleo · vacantes y habilidades demandadas',
      'Balam Labs · Agent Delegability Index por ocupación',
    ],
    prompt: `Te describo un cargo de mi organización: [CARGO], en el área de [ÁREA].

1. Descomponlo en 10 a 15 tareas concretas, con el tiempo aproximado que ocupa cada una.
2. Clasifica cada tarea en una escalera: L0 la IA no tiene papel; L1 asiste paso a paso; L2 ejecuta partes completas con revisión humana; L3 puede hacerla entera.
3. Para cada tarea en L2 o L3 nombra la barrera principal: acceso a sistemas, confianza, responsabilidad o presencia física.
4. Propón cómo rediseñar el cargo: qué gana tiempo, qué gana importancia y qué habilidad nueva exige.
5. Señala las tareas en las que equivocarse afecta a una persona y que por eso requieren firma humana.

Marca como supuesto todo lo que no puedas saber de mi organización.`,
    keep: 'Quién responde por el resultado, cómo se reparte la ganancia de tiempo y qué se hace con las personas cuyo trabajo cambia. La delegabilidad es una medida; el diseño del trabajo es una decisión.',
  },
  {
    id: 'riesgo',
    label: 'Riesgo y crédito',
    question: '¿A quién le prestamos, le vendemos a plazo o le compramos?',
    ai: [
      'Leer estados financieros y calcular liquidez, endeudamiento y cobertura.',
      'Detectar movimientos atípicos en cartera, pagos o asientos contables.',
      'Resumir contratos y condiciones para comparar contrapartes.',
    ],
    tools: ['mindbridge', 'copilot-finance', 'humata', 'claude'],
    data: [
      'Supersociedades · estados financieros NIIF por empresa',
      'RUES / Confecámaras · registro mercantil, matrícula y renovación',
      'Superfinanciera · cartera, tasas y calidad por tipo de crédito',
      'SECOP II · contratos, cumplimiento y sanciones de proveedores',
    ],
    prompt: `Te entrego los estados financieros de los últimos tres años de una empresa a la que evaluamos como [CLIENTE A CRÉDITO / PROVEEDOR].

1. Calcula razón corriente, prueba ácida, endeudamiento, cobertura de intereses, rotación de cartera y margen operacional. Muestra la fórmula de cada uno.
2. Describe la tendencia y lo que cambió entre años.
3. Señala tres alertas y tres fortalezas, cada una atada a una cifra.
4. Di qué información adicional pedirías antes de decidir.
5. No entregues un veredicto de aprobar o rechazar.

Si un rubro no está en los estados, dilo; no lo estimes.

DATOS:
[PEGA AQUÍ LOS ESTADOS FINANCIEROS]`,
    keep: 'Aprobar o negar. Detrás de un puntaje hay una empresa o una persona con una historia que el modelo no vio, y alguien tiene que poder explicarle la respuesta.',
  },
  {
    id: 'mercado',
    label: 'Mercado y competencia',
    question: '¿Dónde está la oportunidad y contra quién competimos?',
    ai: [
      'Dimensionar un mercado cruzando registros de empresas, ventas y comercio exterior.',
      'Mapear competidores, sus cifras públicas y sus contratos.',
      'Sintetizar informes sectoriales largos y contrastar sus conclusiones.',
    ],
    tools: ['perplexity', 'notebooklm', 'alphasense', 'gemini'],
    data: [
      'Supersociedades · ingresos, activos y utilidad de las empresas más grandes',
      'RUES / Confecámaras · empresas activas por actividad y municipio',
      'DIAN y DANE · exportaciones e importaciones por subpartida',
      'SECOP II · quién le vende qué al Estado y por cuánto',
    ],
    prompt: `Quiero dimensionar el mercado de [PRODUCTO O SERVICIO] en [CIUDAD O REGIÓN].

1. Propón dos formas de estimar el tamaño: de arriba hacia abajo (desde cifras sectoriales) y de abajo hacia arriba (desde número de clientes y gasto promedio).
2. Para cada cifra que uses dime la fuente pública, la fecha de corte y el enlace. Si no la puedes verificar, márcala como [SUPUESTO].
3. Compara los dos resultados y explica la diferencia.
4. Lista los competidores que aparecen en fuentes públicas y qué se sabe de cada uno.
5. Di qué preguntas solo se responden hablando con clientes.

No completes vacíos con cifras plausibles.`,
    keep: 'En qué mercado se quiere estar y por qué. La oportunidad no está en la tabla: la ve quien conoce al cliente y decide apostar.',
  },
  {
    id: 'macro',
    label: 'Entorno macro',
    question: '¿Qué viene en tasas, dólar, inflación y crecimiento, y cómo nos afecta?',
    ai: [
      'Reunir las series recientes y resumir qué cambió frente al periodo anterior.',
      'Traducir un informe de política monetaria a consecuencias para el negocio.',
      'Construir escenarios y calcular su efecto sobre costos, deuda y ventas.',
    ],
    tools: ['perplexity', 'chatgpt', 'koyfin', 'julius'],
    data: [
      'Banco de la República · tasa de política, TRM, IBR e Informe de Política Monetaria',
      'DANE · PIB trimestral, IPC y mercado laboral',
      'DANE · cuentas departamentales por actividad',
      'DIAN y DANE · balanza comercial por producto y destino',
    ],
    prompt: `Soy [CARGO] en una empresa de [SECTOR] que [IMPORTA / EXPORTA / SE FINANCIA CON DEUDA A TASA VARIABLE].

1. Con fuentes oficiales y fecha de corte, resume el estado de: tasa de política, inflación, TRM, crecimiento y desempleo.
2. Explica por cuál canal afecta cada variable a una empresa como la mía.
3. Construye tres escenarios para los próximos doce meses (base, favorable, adverso) con los valores que supones para cada variable.
4. Para cada escenario estima el efecto sobre costos, servicio de la deuda y ventas. Deja visibles los supuestos.
5. Dime qué indicador debo mirar cada mes para saber en cuál escenario estamos.

Cita la fuente de cada cifra. No pronostiques con más precisión de la que los datos permiten.`,
    keep: 'Cuánta exposición se cubre y cuánta se asume. Nadie sabe el dólar del próximo año: eso no es riesgo calculable, es incertidumbre, y frente a ella se decide con criterio.',
  },
]

export const ladder = [
  ['L0', 'Sin papel', 'El agente no puede hacer ni acelerar una parte sustancial de la tarea.'],
  [
    'L1',
    'Asistencia',
    'La persona hace la tarea y la IA ayuda paso a paso: borradores, búsquedas, sugerencias.',
  ],
  [
    'L2',
    'Delegación parcial',
    'El agente ejecuta partes completas a partir de un objetivo; la persona revisa y responde.',
  ],
  [
    'L3',
    'Delegación completa',
    'El agente termina la tarea entera con la calidad de un trabajador competente.',
  ],
]

// [ocupación, % de tareas en L2 o más, % de tareas en L3]
export const occupations = [
  ['Economistas', 94.5, 0.0],
  ['Analistas financieros', 93.9, 8.4],
  ['Contadores', 97.0, 9.3],
  ['Gerentes financieros', 86.8, 2.9],
  ['Oficiales de crédito', 98.2, 3.8],
  ['Auxiliares contables', 90.1, 28.1],
]

export const errors = [
  [
    'Tomar una correlación por una causa',
    'Dos series que se mueven juntas no prueban que una mueva a la otra. Pregunta qué otra cosa explicaría el patrón.',
  ],
  [
    'Aceptar un pronóstico sin intervalo',
    'Un número solo oculta cuánto puede fallar. Pide siempre el rango y el error en datos ya conocidos.',
  ],
  [
    'Usar un dato sin fuente ni fecha de corte',
    'Una cifra sin origen no se puede comprobar ni actualizar. Anota de dónde salió y hasta cuándo llega.',
  ],
  [
    'Creerle una cifra inventada al modelo',
    'Un asistente puede escribir un dato plausible que no existe. Toda cifra que entre a una decisión se verifica en la fuente.',
  ],
  [
    'Optimizar el indicador y no el objetivo',
    'Cuando una medida se vuelve meta deja de ser buena medida: es la ley de Goodhart. Revisa si mejorar el número mejora lo que importa.',
  ],
]

export const cases = [
  [
    'Agent Delegability Index',
    'Qué parte del trabajo se le puede entregar a un agente, por ocupación y por país. 146 países.',
    'https://balamlabs.org',
    'balamlabs.org',
  ],
  [
    'Cerebro Antioquia',
    'Economía, trabajo y productividad por subregión, con datos abiertos federados.',
    'https://cerebro-antioquia.vercel.app',
    'cerebro-antioquia.vercel.app',
  ],
  [
    'PIB potencial de Colombia',
    'Crecimiento potencial estimado por función de producción, con un deslizador para mover la productividad.',
    'https://sjimenezlon.co/economia#22',
    'sjimenezlon.co/economia · lámina 22',
  ],
  [
    'Charla «Predecir no es decidir»',
    'Las láminas de la masterclass sobre IA y decisiones económicas en las organizaciones.',
    'https://sjimenezlon.co/economia',
    'sjimenezlon.co/economia',
  ],
]

export const actaFields = [
  ['decision', 'Decisión', 'Qué se decide, en una frase.'],
  ['descartada', 'Alternativa descartada', 'Qué otra opción se consideró y por qué no.'],
  ['datos', 'Datos y fecha de corte', 'Fuentes usadas y hasta cuándo llegan.'],
  ['ia', 'Qué hizo la IA', 'Herramienta, tarea y qué se verificó a mano.'],
  ['supuestos', 'Supuestos', 'Lo que tendría que seguir siendo cierto.'],
  ['firma', 'Quién firma', 'Nombre o rol de quien responde.'],
  ['revision', 'Cuándo se revisa', 'Fecha o señal que obliga a volver sobre la decisión.'],
]

export function buildActa(values) {
  const v = (k) => (values[k] || '').trim() || '[por completar]'
  return `# Acta de decisión

## Decisión
${v('decision')}

## Alternativa descartada
${v('descartada')}

## Datos y fecha de corte
${v('datos')}

## Qué hizo la IA
${v('ia')}

## Supuestos
${v('supuestos')}

## Quién firma
${v('firma')}

## Cuándo se revisa
${v('revision')}

---
La IA ayudó a medir y a modelar. La decisión es de quien firma.
Plantilla de ¿Qué IA necesito? · queianecesitas.dev/economia
`
}
