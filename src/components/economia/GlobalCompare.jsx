import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import CopyButton from '../CopyButton'
import { WEO, WEO_SOURCE, WEO_URL } from '../../data/fmiWeo'
import { fmt, parseNumber } from '../../data/economiaTaller'

const INDICATORS = [
  ['pib', 'Crecimiento', 'crecimiento del PIB'],
  ['inf', 'Inflación', 'inflación promedio'],
  ['des', 'Desempleo', 'tasa de desempleo'],
]
const YEARS = ['2025', '2026', '2027']

export default function GlobalCompare() {
  const [ind, setInd] = useState('pib')
  const [year, setYear] = useState('2026')
  const [focus, setFocus] = useState('Colombia')
  const [mine, setMine] = useState('')

  const meta = INDICATORS.find((i) => i[0] === ind)
  const rows = [...WEO[ind][year]].sort((a, b) => b[1] - a[1])
  const names = WEO[ind][year].map((r) => r[0])
  const focusName = names.includes(focus) ? focus : 'Colombia'
  const focusValue = rows.find((r) => r[0] === focusName)[1]
  const world = rows.find((r) => r[0] === 'Mundo')
  const own = parseNumber(mine)
  const max = Math.max(8, ...rows.map((r) => r[1]), own ?? 0)
  const kind = year === '2025' ? 'estimación' : 'proyección'
  const gap = own === null ? null : own - focusValue

  const reading = [
    `${focusName}: ${fmt(focusValue)} % de ${meta[2]} en ${year} (${kind} del FMI).`,
    world
      ? `El mundo: ${fmt(world[1])} %. ${focusName} queda ${fmt(Math.abs(focusValue - world[1]))} puntos ${focusValue >= world[1] ? 'por encima' : 'por debajo'}.`
      : 'El FMI no publica un agregado mundial de desempleo.',
    gap === null
      ? ''
      : Math.abs(gap) < 0.05
        ? `Tu supuesto (${fmt(own)} %) coincide con la ${kind} del FMI.`
        : `Tu supuesto (${fmt(own)} %) está ${fmt(Math.abs(gap))} puntos ${gap > 0 ? 'por encima' : 'por debajo'} de la ${kind} del FMI para ${focusName}.`,
  ].filter(Boolean)

  const prompt = `Estoy revisando los supuestos de mi presupuesto. Uso como referencia la ${kind} del FMI (${WEO_SOURCE}) para ${year}:
${rows.map(([n, v]) => `- ${n}: ${fmt(v)} % de ${meta[2]}`).join('\n')}
${own === null ? '' : `\nMi supuesto de ${meta[2]} para ${focusName} es ${fmt(own)} %.\n`}
Ayúdame con tres cosas:
1. Qué líneas de un presupuesto de empresa dependen de este supuesto (ventas, costos, deuda, nómina) y en qué sentido.
2. Un escenario bajo y uno alto razonables alrededor de la cifra, y qué tendría que pasar para llegar a cada uno.
3. Qué indicador mensual debo seguir para saber a tiempo que el supuesto dejó de servir.
No inventes cifras nuevas: si necesitas un dato que no te di, pídemelo. La decisión sobre el presupuesto la tomo yo.`

  return (
    <div className="tal-glob">
      <div className="tal-map-controls">
        <fieldset>
          <legend>
            <b>1</b> Qué comparar
          </legend>
          <div className="lab-filters" role="group" aria-label="Indicador">
            {INDICATORS.map(([id, label]) => (
              <button key={id} type="button" aria-pressed={ind === id} onClick={() => setInd(id)}>
                {label}
              </button>
            ))}
          </div>
          <div className="lab-filters" role="group" aria-label="Año">
            {YEARS.map((y) => (
              <button key={y} type="button" aria-pressed={year === y} onClick={() => setYear(y)}>
                {y}
              </button>
            ))}
          </div>
          <p className="lab-small">
            {WEO_SOURCE}. 2025 es estimación; 2026 y 2027 son proyección.{' '}
            <a href={WEO_URL} target="_blank" rel="noopener noreferrer">
              Abrir la fuente <ExternalLink size={12} />
            </a>
          </p>
        </fieldset>
        <fieldset>
          <legend>
            <b>2</b> Tu supuesto
          </legend>
          <div className="tal-pair">
            <div className="tal-field">
              <label className="lab-label" htmlFor="glob-focus">
                Economía que te interesa
              </label>
              <select id="glob-focus" value={focusName} onChange={(e) => setFocus(e.target.value)}>
                {names.map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </div>
            <div className="tal-field">
              <label className="lab-label" htmlFor="glob-mine">
                Cifra de tu presupuesto (%)
              </label>
              <input
                id="glob-mine"
                inputMode="decimal"
                placeholder={fmt(focusValue)}
                value={mine}
                onChange={(e) => setMine(e.target.value)}
              />
            </div>
          </div>
          <p className="lab-note tal-method">
            Una proyección es una predicción publicada: sirve para discutir el supuesto, no para
            reemplazarlo. El FMI la revisa dos veces al año.
          </p>
        </fieldset>
      </div>

      <div className="tal-map-view">
        <div>
          <p className="tal-map-title">
            {meta[1]}, {year} · %
          </p>
          <ol className="tal-rank tal-rank-open" aria-label={`Economías ordenadas por ${meta[2]}`}>
            {rows.map(([n, v], i) => (
              <li key={n}>
                <button
                  type="button"
                  className={n === focusName ? 'on' : ''}
                  onClick={() => setFocus(n)}
                >
                  <span className="tal-rank-n">{i + 1}</span>
                  <span className="tal-rank-name">{n}</span>
                  <span className="tal-rank-bar" aria-hidden="true">
                    <i
                      style={{
                        width: `${Math.max(2, (v / max) * 100)}%`,
                        background: n === focusName ? '#0a5a55' : '#56b5aa',
                      }}
                    />
                    {own !== null && n === focusName && (
                      <u style={{ left: `${Math.min(100, Math.max(0, (own / max) * 100))}%` }} />
                    )}
                  </span>
                  <span className="tal-rank-v">{fmt(v)}</span>
                </button>
              </li>
            ))}
          </ol>
          {own !== null && (
            <p className="lab-small">La marca vertical es la cifra de tu presupuesto.</p>
          )}
        </div>
        <div className="tal-reading">
          <span className="lab-kicker">Lo que dice la comparación</span>
          <ul aria-live="polite">
            {reading.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <span className="lab-kicker">Prompt para discutir el supuesto con IA</span>
          <div className="lab-prompt tal-pre">
            <pre>{prompt}</pre>
          </div>
          <CopyButton key={prompt} text={prompt} label="Copiar prompt" successMessage="Copiado." />
        </div>
      </div>
    </div>
  )
}
