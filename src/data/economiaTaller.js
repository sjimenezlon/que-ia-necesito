// Taller «indicadores y mapas» del capítulo Decisiones económicas.
// Lógica pura: tipos de indicador, semáforo, ficha en Markdown, clasificación de mapas y lecturas.

export const fmt = (n, d = 1) =>
  n.toLocaleString('es-CO', {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  })

// Acepta «12,5», «12.5», «1.234,5» y «1 234».
export function parseNumber(text) {
  const s = String(text ?? '')
    .trim()
    .replace(/\s/g, '')
  if (!s) return null
  const clean = s.includes(',') ? s.replace(/\./g, '').replace(',', '.') : s
  const n = Number(clean)
  return Number.isFinite(n) ? n : null
}

export const indicatorTypes = [
  {
    id: 'porcentaje',
    label: 'Porcentaje',
    formula: '(A ÷ B) × 100',
    unit: '%',
    a: 'A · los casos que cumplen',
    b: 'B · el total de casos',
    calc: (a, b) => (b ? (a / b) * 100 : null),
  },
  {
    id: 'tasa',
    label: 'Tasa por 100.000',
    formula: '(A ÷ B) × 100.000',
    unit: 'por 100.000',
    a: 'A · los eventos',
    b: 'B · la población expuesta',
    calc: (a, b) => (b ? (a / b) * 100000 : null),
  },
  {
    id: 'razon',
    label: 'Por unidad',
    formula: 'A ÷ B',
    unit: 'por unidad',
    a: 'A · el total',
    b: 'B · las unidades (personas, empresas, hectáreas)',
    calc: (a, b) => (b ? a / b : null),
  },
  {
    id: 'variacion',
    label: 'Variación',
    formula: '(A ÷ B − 1) × 100',
    unit: '%',
    a: 'A · el valor de este periodo',
    b: 'B · el valor del periodo anterior',
    calc: (a, b) => (b ? (a / b - 1) * 100 : null),
  },
  {
    id: 'brecha',
    label: 'Brecha',
    formula: 'A − B',
    unit: 'puntos',
    a: 'A · el valor del grupo',
    b: 'B · el valor de referencia',
    calc: (a, b) => a - b,
  },
]

export const frequencies = ['Mensual', 'Trimestral', 'Semestral', 'Anual']

export const emptyIndicator = {
  decision: '',
  nombre: '',
  tipo: 'porcentaje',
  a: '',
  b: '',
  fuente: '',
  frecuencia: 'Mensual',
  sentido: 'sube',
  meta: '',
  alerta: '',
  responsable: '',
  accion: '',
  va: '',
  vb: '',
}

// Ejemplos de definición. Meta, alerta y responsable quedan vacíos a propósito: los pone quien decide.
export const indicatorPresets = [
  {
    id: 'cartera',
    label: 'Cartera vencida',
    values: {
      decision: 'Si se endurece la política de crédito a clientes',
      nombre: 'Cartera vencida',
      tipo: 'porcentaje',
      a: 'Saldo de cartera con más de 30 días de mora',
      b: 'Saldo total de cartera',
      fuente: 'Sistema contable de la empresa',
      frecuencia: 'Mensual',
      sentido: 'baja',
    },
  },
  {
    id: 'rotacion',
    label: 'Rotación de personal',
    values: {
      decision: 'Si se revisa la escala salarial de un área',
      nombre: 'Rotación voluntaria',
      tipo: 'porcentaje',
      a: 'Retiros voluntarios del periodo',
      b: 'Promedio de empleados del periodo',
      fuente: 'Nómina',
      frecuencia: 'Trimestral',
      sentido: 'baja',
    },
  },
  {
    id: 'cobertura',
    label: 'Cobertura en educación media',
    values: {
      decision: 'Dónde abrir cupos de educación media el próximo año',
      nombre: 'Cobertura neta en educación media',
      tipo: 'porcentaje',
      a: 'Matriculados en media que tienen 15 o 16 años',
      b: 'Población de 15 y 16 años',
      fuente: 'Matrícula del Ministerio de Educación (SIMAT) y proyecciones de población del DANE',
      frecuencia: 'Anual',
      sentido: 'sube',
    },
  },
  {
    id: 'desempleo',
    label: 'Desempleo juvenil',
    values: {
      decision: 'Dónde enfocar el programa de primer empleo',
      nombre: 'Tasa de desempleo juvenil',
      tipo: 'porcentaje',
      a: 'Desocupados de 15 a 28 años',
      b: 'Fuerza de trabajo de 15 a 28 años',
      fuente: 'DANE, Gran Encuesta Integrada de Hogares',
      frecuencia: 'Trimestral',
      sentido: 'baja',
    },
  },
]

indicatorPresets.push(
  {
    id: 'intereses',
    label: 'Cobertura de intereses',
    values: {
      decision: 'Si la empresa toma más deuda este año',
      nombre: 'Cobertura de intereses',
      tipo: 'razon',
      a: 'Utilidad operativa del periodo',
      b: 'Intereses pagados en el periodo',
      fuente: 'Estados financieros de la empresa',
      frecuencia: 'Trimestral',
      sentido: 'sube',
    },
  },
  {
    id: 'margen',
    label: 'Margen de contribución',
    values: {
      decision: 'Qué línea de producto crece y cuál se cierra',
      nombre: 'Margen de contribución de la línea',
      tipo: 'porcentaje',
      a: 'Ventas menos costos variables de la línea',
      b: 'Ventas de la línea',
      fuente: 'Ventas y costos del sistema de la empresa',
      frecuencia: 'Mensual',
      sentido: 'sube',
    },
  },
  {
    id: 'sector',
    label: 'Ventas frente al sector',
    values: {
      decision: 'Si la caída de ventas pide un plan propio o es de todo el sector',
      nombre: 'Brecha de crecimiento frente al sector',
      tipo: 'brecha',
      a: 'Variación anual de las ventas de la empresa (%)',
      b: 'Variación anual de las ventas reales del sector (%)',
      fuente: 'Ventas propias y encuestas mensuales del DANE (comercio o manufactura)',
      frecuencia: 'Mensual',
      sentido: 'sube',
    },
  },
  {
    id: 'cambio',
    label: 'Tasa de cambio',
    values: {
      decision: 'Si se cubre el dólar y se ajusta el precio de lo importado',
      nombre: 'Variación de la tasa de cambio en 30 días',
      tipo: 'variacion',
      a: 'TRM de hoy',
      b: 'TRM de hace 30 días',
      fuente: 'Superintendencia Financiera, TRM en datos.gov.co',
      frecuencia: 'Mensual',
      sentido: 'baja',
    },
  },
)

export const states = {
  meta: { label: 'En meta', mark: '●' },
  seguimiento: { label: 'En seguimiento', mark: '▲' },
  alerta: { label: 'En alerta', mark: '■' },
  'sin-dato': { label: 'Sin dato', mark: '○' },
}

export function computeIndicator(v) {
  const type = indicatorTypes.find((t) => t.id === v.tipo) || indicatorTypes[0]
  const a = parseNumber(v.va)
  const b = parseNumber(v.vb)
  const value = a === null || b === null ? null : type.calc(a, b)
  const meta = parseNumber(v.meta)
  const alerta = parseNumber(v.alerta)
  const up = v.sentido === 'sube'
  let state = 'sin-dato'
  if (value !== null && Number.isFinite(value)) {
    if (meta !== null && (up ? value >= meta : value <= meta)) state = 'meta'
    else if (alerta !== null && (up ? value <= alerta : value >= alerta)) state = 'alerta'
    else if (meta !== null || alerta !== null) state = 'seguimiento'
  }
  const coherent = meta !== null && alerta !== null && (up ? meta > alerta : meta < alerta)
  return {
    type,
    value: value !== null && Number.isFinite(value) ? value : null,
    state,
    meta,
    alerta,
    coherent,
  }
}

// Tablero de seguimiento: una fila por indicador guardado.
export function boardRow(v, r) {
  return {
    id: `${Date.now()}`,
    nombre: v.nombre.trim() || 'Indicador sin nombre',
    valor: r.value === null ? '—' : `${fmt(r.value)} ${r.type.unit}`,
    estado: r.state,
    meta: v.meta.trim() || '—',
    alerta: v.alerta.trim() || '—',
    frecuencia: v.frecuencia,
    responsable: v.responsable.trim() || '—',
    accion: v.accion.trim() || '—',
    def: v,
  }
}

export function buildBoardSheet(rows) {
  const line = (r) =>
    `| ${r.nombre} | ${r.valor} | ${states[r.estado].label} | ${r.meta} | ${r.alerta} | ${r.frecuencia} | ${r.responsable} | ${r.accion} |`
  return `# Tablero de seguimiento

| Indicador | Último valor | Estado | Meta | Alerta | Frecuencia | Responsable | Acción si cruza la alerta |
|---|---|---|---|---|---|---|---|
${rows.map(line).join('\n')}

---
${rows.filter((r) => r.estado === 'alerta').length} en alerta · ${rows.filter((r) => r.estado === 'seguimiento').length} en seguimiento · ${rows.filter((r) => r.estado === 'meta').length} en meta
Plantilla de ¿Qué IA necesito? · queianecesitas.dev/economia
`
}

export function indicatorChecks(v, r) {
  const has = (k) => v[k].trim().length > 2
  return [
    [
      'Nombra la decisión que informa',
      has('decision'),
      'Un indicador sin decisión es un dato suelto.',
    ],
    [
      'Tiene con qué compararse',
      has('a') && has('b'),
      'Un conteo sin denominador no permite comparar entre periodos ni entre lugares.',
    ],
    [
      'Dice de dónde sale y cada cuánto',
      has('fuente'),
      'Sin fuente nadie puede repetir el cálculo.',
    ],
    [
      'Tiene meta y alerta coherentes',
      r.coherent,
      v.sentido === 'sube'
        ? 'Si más es mejor, la meta va por encima de la alerta.'
        : 'Si menos es mejor, la meta va por debajo de la alerta.',
    ],
    [
      'Alguien responde y sabe qué hacer',
      has('responsable') && has('accion'),
      'Una alerta que no dispara una acción con nombre propio no cambia nada.',
    ],
  ]
}

const blank = (s) => (s || '').trim() || '[por completar]'

export function buildIndicatorSheet(v, r) {
  const sentido = v.sentido === 'sube' ? 'Más es mejor' : 'Menos es mejor'
  const last =
    r.value === null
      ? ''
      : `
## Último cálculo
- A = ${v.va.trim()} · B = ${v.vb.trim()}
- Resultado: ${fmt(r.value)} ${r.type.unit}
- Estado: ${states[r.state].label}
`
  return `# Ficha de indicador: ${blank(v.nombre)}

## Decisión que informa
${blank(v.decision)}

## Definición
- Tipo: ${r.type.label} · ${r.type.formula}
- A: ${blank(v.a)}
- B: ${blank(v.b)}
- Unidad: ${r.type.unit}

## Fuente y frecuencia
- Fuente: ${blank(v.fuente)}
- Frecuencia: ${v.frecuencia}

## Cómo se lee
- Sentido: ${sentido}
- Meta: ${blank(v.meta)}
- Alerta: ${blank(v.alerta)}

## Quién responde
- Responsable: ${blank(v.responsable)}
- Qué hace si cruza la alerta: ${blank(v.accion)}
${last}
---
La IA puede calcularlo cada periodo. La meta, la alerta y la acción las pone quien decide.
Plantilla de ¿Qué IA necesito? · queianecesitas.dev/economia
`
}

export function buildIndicatorPrompt(v, r) {
  const up = v.sentido === 'sube'
  return `Voy a adjuntar un archivo con los datos para calcular «${blank(v.nombre)}».

Antes de calcular:
1. Dime cuántas filas tiene el archivo, qué periodo cubre y qué columnas vas a usar como A y como B.
2. Señala vacíos, duplicados y valores atípicos. No completes lo que falte: pregúntame.

Después calcula el indicador:
- A: ${blank(v.a)}
- B: ${blank(v.b)}
- Fórmula: ${r.type.formula} (${r.type.unit})
- Frecuencia: ${v.frecuencia.toLowerCase()}. Muestra una tabla por periodo con A, B y el resultado.
- Marca cada periodo como «en meta», «en seguimiento» o «en alerta». Meta: ${blank(v.meta)}. Alerta: ${blank(v.alerta)}. ${up ? 'Más es mejor.' : 'Menos es mejor.'}

Cierra con tres frases: qué cambió, qué no se puede concluir con estos datos y qué dato haría falta.
No recomiendes la decisión («${blank(v.decision)}»): esa la toma ${blank(v.responsable)}.`
}

/* ---------- mapas ---------- */

export const mapMethods = [
  {
    id: 'cuantiles',
    label: 'Grupos iguales',
    note: 'Reparte los departamentos en grupos del mismo tamaño. Sirve para ordenar, pero siempre pinta un grupo «peor», aunque todos estén bien.',
  },
  {
    id: 'iguales',
    label: 'Tramos iguales',
    note: 'Parte el rango de valores en tramos del mismo ancho. Respeta las distancias, pero un valor extremo puede dejar casi todo el mapa de un solo color.',
  },
  {
    id: 'umbral',
    label: 'Mi umbral',
    note: 'Separa a los que cruzan una cifra que tú fijas. Es el único de los tres que responde una pregunta de decisión: quién queda de este lado de la meta.',
  },
]

export const RAMP = ['#d3eeea', '#9ad7ce', '#56b5aa', '#218c83', '#0a5a55']
export const FLAG = '#d9480f'
export const CALM = '#c9d3d6'

export function rampFor(k) {
  if (k === 3) return [RAMP[0], RAMP[2], RAMP[4]]
  if (k === 4) return [RAMP[0], RAMP[1], RAMP[3], RAMP[4]]
  return RAMP
}

const quantile = (sorted, p) => {
  const i = (sorted.length - 1) * p
  const lo = Math.floor(i)
  const hi = Math.ceil(i)
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (i - lo)
}

// Devuelve los cortes (k − 1 valores). Un valor pertenece a la clase = número de cortes que supera.
export function classBreaks(values, method, k, threshold) {
  const sorted = [...values].sort((a, b) => a - b)
  if (!sorted.length) return []
  if (method === 'umbral') return [threshold ?? quantile(sorted, 0.5)]
  const min = sorted[0]
  const max = sorted[sorted.length - 1]
  return Array.from({ length: k - 1 }, (_, i) =>
    method === 'cuantiles' ? quantile(sorted, (i + 1) / k) : min + ((i + 1) * (max - min)) / k,
  )
}

export const classOf = (value, breaks) => breaks.filter((b) => value > b).length

const strip = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\b(d c|departamento|de|del|y)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const ALIASES = {
  bogota: '11',
  valle: '76',
  'san andres': '88',
  guajira: '44',
  'norte santander': '54',
}

// Lee líneas «Departamento; valor» (también con tabulador) o «código DANE; valor».
export function parseCustomData(text, deptos) {
  const byName = Object.fromEntries(deptos.map((d) => [strip(d.n), d.c]))
  const codes = new Set(deptos.map((d) => d.c))
  const values = {}
  const unmatched = []
  text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .forEach((line) => {
      const parts = line.split(/[;\t]/)
      if (parts.length < 2) return unmatched.push(line)
      const value = parseNumber(parts[parts.length - 1])
      const key = parts.slice(0, -1).join(' ').trim()
      const name = strip(key)
      const code = codes.has(key.padStart(2, '0'))
        ? key.padStart(2, '0')
        : (byName[name] ?? ALIASES[name])
      if (code && value !== null) values[code] = value
      else unmatched.push(line)
    })
  return { values, unmatched }
}

export function mapReading({ rows, missing, unit, nacional, method, threshold, sentido }) {
  if (!rows.length) return []
  const u = unit === '%' ? ' %' : ` ${unit}`
  const top = rows[0]
  const bottom = rows[rows.length - 1]
  const out = [
    `${top.n} tiene el valor más alto (${fmt(top.v)}${u}) y ${bottom.n} el más bajo (${fmt(bottom.v)}${u}). El primero es ${fmt(top.v / (bottom.v || 1))} veces el segundo.`,
  ]
  if (nacional !== null && nacional !== undefined) {
    const over = rows.filter((r) => r.v > nacional).length
    out.push(
      `${over} de ${rows.length} departamentos están por encima del dato nacional (${fmt(nacional)}${u}).`,
    )
  }
  if (method === 'umbral' && threshold !== null) {
    const worse = sentido === 'alto-peor'
    const flagged = rows.filter((r) => (worse ? r.v > threshold : r.v <= threshold))
    const names = flagged
      .slice(0, 4)
      .map((r) => r.n)
      .join(', ')
    out.push(
      flagged.length
        ? `${flagged.length} quedan ${worse ? 'por encima' : 'en o por debajo'} de ${fmt(threshold)}${u}: ${names}${flagged.length > 4 ? ' y otros' : ''}.`
        : `Ninguno queda ${worse ? 'por encima' : 'por debajo'} de ${fmt(threshold)}${u}.`,
    )
  }
  if (missing.length)
    out.push(`${missing.length} sin dato. Aparecen rayados, no en cero: un vacío no es un valor.`)
  return out
}

export function buildMapSheet({
  title,
  corte,
  unit,
  fuente,
  url,
  method,
  legend,
  reading,
  nota,
  totals,
}) {
  const m = mapMethods.find((x) => x.id === method)
  return `# Ficha de mapa: ${title}

## Qué muestra
- Variable: ${title}${corte ? ` (${corte})` : ''}
- Unidad: ${unit}
- Territorio: departamentos de Colombia
- Fuente: ${fuente || '[por completar]'}${url ? `\n- Enlace: ${url}` : ''}

## Cómo se pintó
- Método: ${m.label}. ${m.note}
${legend.map((l) => `- ${l.text} · ${l.count} departamentos`).join('\n')}

## Lectura
${reading.map((r) => `- ${r}`).join('\n')}

## Advertencias
${[
  nota,
  totals
    ? 'Los datos son totales, no tasas: el mapa puede estar mostrando dónde vive más gente. Conviene dividir por población.'
    : '',
  'Un mapa muestra dónde, no por qué. Antes de asignar recursos, cruza con una segunda variable.',
]
  .filter(Boolean)
  .map((r) => `- ${r}`)
  .join('\n')}

---
Plantilla de ¿Qué IA necesito? · queianecesitas.dev/economia
`
}

export function buildMapPrompt({ title, unit, method, legend, fuente }) {
  const m = mapMethods.find((x) => x.id === method)
  return `Voy a adjuntar una tabla con una fila por departamento de Colombia (código DANE, nombre y «${title}», en ${unit}). Fuente: ${fuente || '[por completar]'}.

Antes de dibujar:
1. Dime cuántos departamentos trae la tabla y cuáles faltan. No los pongas en cero: márcalos «sin dato».
2. Confirma si la variable es una tasa o un total. Si es un total, pregúntame por la población antes de seguir.

Después haz un mapa de coropletas:
- Método de clasificación: ${m.label.toLowerCase()}, con estos cortes:
${legend.map((l) => `  · ${l.text}`).join('\n')}
- Una sola gama de color, de claro a oscuro, y la leyenda con el número de departamentos por clase.
- Título que afirme lo que se ve, fuente y fecha de corte al pie.

Entrega también la tabla ordenada de mayor a menor y tres frases de lectura. Di qué no se puede concluir del mapa.`
}
