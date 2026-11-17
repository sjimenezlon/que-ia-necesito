import { useMemo, useRef, useState } from 'react'
import { Download, ExternalLink } from 'lucide-react'
import CopyButton from '../CopyButton'
import { downloadText } from '../../utils/learning'
import { VIEWBOX, DEPTOS, DATASETS } from '../../data/colombiaDeptos'
import {
  fmt,
  parseNumber,
  mapMethods,
  rampFor,
  FLAG,
  CALM,
  classBreaks,
  classOf,
  parseCustomData,
  mapReading,
  buildMapSheet,
  buildMapPrompt,
} from '../../data/economiaTaller'

const SOURCES = [
  ['ipm', 'Pobreza multidimensional'],
  ['pibpc', 'PIB por habitante'],
  ['td', 'Desempleo'],
  ['propio', 'Mis datos'],
]
const SAMPLE = 'Antioquia; 12,5\nAtlántico; 9,8\nBogotá; 7,1\nValle del Cauca; 10,4'

export default function MapBuilder() {
  const [source, setSource] = useState('ipm')
  const [method, setMethod] = useState('cuantiles')
  const [k, setK] = useState(4)
  const [thresholdText, setThresholdText] = useState('')
  const [custom, setCustom] = useState('')
  const [customTitle, setCustomTitle] = useState('')
  const [customUnit, setCustomUnit] = useState('%')
  const [customWorse, setCustomWorse] = useState(true)
  const [totals, setTotals] = useState(false)
  const [active, setActive] = useState(null)
  const [out, setOut] = useState('ficha')
  const svgRef = useRef(null)

  const own = source === 'propio'
  const parsed = useMemo(() => parseCustomData(custom, DEPTOS), [custom])
  const ds = own
    ? {
        label: customTitle.trim() || 'Mi variable',
        corte: '',
        unidad: customUnit.trim() || 'unidades',
        sentido: customWorse ? 'alto-peor' : 'alto-mejor',
        fuente: '',
        url: '',
        nacional: null,
        valores: parsed.values,
      }
    : DATASETS[source]

  const rows = useMemo(
    () =>
      DEPTOS.filter((d) => ds.valores[d.c] !== undefined)
        .map((d) => ({ c: d.c, n: d.n, v: ds.valores[d.c] }))
        .sort((a, b) => b.v - a.v),
    [ds.valores],
  )
  const missing = DEPTOS.filter((d) => ds.valores[d.c] === undefined)
  const values = rows.map((r) => r.v)
  const median = values.length
    ? [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)]
    : 0
  const threshold = parseNumber(thresholdText) ?? ds.nacional ?? median
  const breaks = classBreaks(values, method, k, threshold)
  const worse = ds.sentido === 'alto-peor'
  const colors = method === 'umbral' ? (worse ? [CALM, FLAG] : [FLAG, CALM]) : rampFor(k)
  const u = ds.unidad === '%' ? ' %' : ` ${ds.unidad}`
  const min = values.length ? Math.min(...values) : 0
  const max = values.length ? Math.max(...values) : 0

  const legend = (values.length ? colors : []).map((color, i) => {
    const from = i === 0 ? min : breaks[i - 1]
    const to = i === colors.length - 1 ? max : breaks[i]
    const count = rows.filter((r) => classOf(r.v, breaks) === i).length
    const text =
      method === 'umbral'
        ? `${i === 0 ? 'Hasta' : 'Más de'} ${fmt(threshold)}${u}`
        : `${i === 0 ? 'De' : 'Más de'} ${fmt(from)} a ${fmt(to)}${u}`
    return { color, text, count }
  })
  const reading = mapReading({
    rows,
    missing,
    unit: ds.unidad,
    nacional: ds.nacional,
    method,
    threshold,
    sentido: ds.sentido,
  })
  const title = `${ds.label}${ds.corte ? `, ${ds.corte}` : ''}`
  const shared = {
    title: ds.label,
    corte: ds.corte,
    unit: ds.unidad,
    fuente: ds.fuente,
    url: ds.url,
    method,
    legend,
    reading,
    nota: ds.nota,
    totals: own && totals,
  }
  const sheet = buildMapSheet(shared)
  const prompt = buildMapPrompt(shared)
  const text = out === 'ficha' ? sheet : prompt

  const fillOf = (code) => {
    const value = ds.valores[code]
    return value === undefined ? 'url(#tal-hatch)' : colors[classOf(value, breaks)]
  }
  const rank = (code) => rows.findIndex((r) => r.c === code) + 1
  const activeDepto = active && DEPTOS.find((d) => d.c === active)
  const activeValue = active ? ds.valores[active] : undefined
  const methodNote = mapMethods.find((m) => m.id === method).note

  const downloadSvg = () => {
    const clone = svgRef.current.cloneNode(true)
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    clone.querySelectorAll('[data-active]').forEach((n) => n.removeAttribute('data-active'))
    downloadText('mapa-colombia.svg', new XMLSerializer().serializeToString(clone))
  }

  return (
    <div className="tal-map">
      <div className="tal-map-controls">
        <fieldset>
          <legend>
            <b>1</b> Los datos
          </legend>
          <div className="lab-filters" role="group" aria-label="Datos del mapa">
            {SOURCES.map(([id, label]) => (
              <button
                key={id}
                type="button"
                aria-pressed={source === id}
                onClick={() => {
                  setSource(id)
                  setThresholdText('')
                  setActive(null)
                }}
              >
                {label}
              </button>
            ))}
          </div>
          {own ? (
            <div className="tal-own">
              <label className="lab-label" htmlFor="map-custom">
                Pega una línea por departamento: nombre o código DANE, punto y coma, valor
              </label>
              <textarea
                id="map-custom"
                rows={5}
                placeholder={SAMPLE}
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
              />
              <p className="lab-small">
                {rows.length} departamentos reconocidos
                {parsed.unmatched.length > 0 &&
                  ` · ${parsed.unmatched.length} línea(s) sin reconocer: ${parsed.unmatched.slice(0, 2).join(' | ')}`}
                . Los datos no salen de tu navegador.
              </p>
              <div className="tal-pair">
                <div className="tal-field">
                  <label className="lab-label" htmlFor="map-title">
                    Nombre de la variable
                  </label>
                  <input
                    id="map-title"
                    maxLength={80}
                    value={customTitle}
                    placeholder="Ej.: cartera vencida"
                    onChange={(e) => setCustomTitle(e.target.value)}
                  />
                </div>
                <div className="tal-field">
                  <label className="lab-label" htmlFor="map-unit">
                    Unidad
                  </label>
                  <input
                    id="map-unit"
                    maxLength={30}
                    value={customUnit}
                    onChange={(e) => setCustomUnit(e.target.value)}
                  />
                </div>
              </div>
              <label className="tal-check">
                <input
                  type="checkbox"
                  checked={customWorse}
                  onChange={(e) => setCustomWorse(e.target.checked)}
                />
                Un valor alto es una mala noticia
              </label>
              <label className="tal-check">
                <input
                  type="checkbox"
                  checked={totals}
                  onChange={(e) => setTotals(e.target.checked)}
                />
                Mis datos son totales (personas, pesos, casos), no tasas
              </label>
              {totals && (
                <p className="lab-note tal-warn">
                  Un mapa de totales casi siempre dibuja dónde vive más gente. Divide por población,
                  por empresas o por hectáreas antes de mostrarlo.
                </p>
              )}
            </div>
          ) : (
            <p className="lab-small">
              {ds.fuente}.{' '}
              <a href={ds.url} target="_blank" rel="noopener noreferrer">
                Abrir el anexo <ExternalLink size={12} />
              </a>
              {ds.nota && ` ${ds.nota}`}
            </p>
          )}
        </fieldset>

        <fieldset>
          <legend>
            <b>2</b> Cómo se pinta
          </legend>
          <div className="lab-filters" role="group" aria-label="Método de clasificación">
            {mapMethods.map((m) => (
              <button
                key={m.id}
                type="button"
                aria-pressed={method === m.id}
                onClick={() => setMethod(m.id)}
              >
                {m.label}
              </button>
            ))}
          </div>
          {method === 'umbral' ? (
            <div className="tal-field">
              <label className="lab-label" htmlFor="map-threshold">
                Tu umbral ({ds.unidad})
                {ds.nacional !== null && ` · dato nacional: ${fmt(ds.nacional)}`}
              </label>
              <input
                id="map-threshold"
                inputMode="decimal"
                placeholder={fmt(threshold)}
                value={thresholdText}
                onChange={(e) => setThresholdText(e.target.value)}
              />
            </div>
          ) : (
            <div className="tal-field">
              <span className="lab-label" id="map-k">
                Número de colores
              </span>
              <div className="lab-filters" role="group" aria-labelledby="map-k">
                {[3, 4, 5].map((n) => (
                  <button key={n} type="button" aria-pressed={k === n} onClick={() => setK(n)}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
          )}
          <p className="lab-note tal-method">{methodNote}</p>
        </fieldset>
      </div>

      <div className="tal-map-view">
        <div className="tal-map-fig">
          <p className="tal-map-title">{title}</p>
          <p className="tal-map-tip" aria-live="polite">
            {activeDepto
              ? activeValue === undefined
                ? `${activeDepto.n} · sin dato`
                : `${activeDepto.n} · ${fmt(activeValue)}${u} · puesto ${rank(active)} de ${rows.length}`
              : 'Pasa el cursor o toca un departamento.'}
          </p>
          <svg
            ref={svgRef}
            viewBox={VIEWBOX}
            role="img"
            aria-label={`Mapa de Colombia por departamento: ${title}. ${reading[0] || ''}`}
          >
            <defs>
              <pattern
                id="tal-hatch"
                width="6"
                height="6"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <rect width="6" height="6" fill="#eceef0" />
                <line x1="0" y1="0" x2="0" y2="6" stroke="#9aa3ab" strokeWidth="2" />
              </pattern>
            </defs>
            <rect
              x="14"
              y="30"
              width="40"
              height="44"
              fill="none"
              stroke="#9aa3ab"
              strokeWidth="1"
            />
            {DEPTOS.map((d) => (
              <path
                key={d.c}
                d={d.d}
                fill={fillOf(d.c)}
                stroke="#ffffff"
                strokeWidth={active === d.c ? 2.4 : 0.8}
                strokeLinejoin="round"
                data-active={active === d.c ? '' : undefined}
                onPointerEnter={() => setActive(d.c)}
                onPointerLeave={() => setActive(null)}
                onClick={() => setActive(d.c)}
              >
                <title>
                  {d.n}
                  {ds.valores[d.c] === undefined ? ': sin dato' : `: ${fmt(ds.valores[d.c])}${u}`}
                </title>
              </path>
            ))}
            {activeDepto && (
              <path
                d={activeDepto.d}
                fill="none"
                stroke="#111827"
                strokeWidth="2.2"
                strokeLinejoin="round"
                pointerEvents="none"
                data-active=""
              />
            )}
          </svg>
          <ul className="tal-legend">
            {legend.map((l, i) => (
              <li key={i}>
                <i style={{ background: l.color }} aria-hidden="true" />
                <span>{l.text}</span>
                <b>{l.count}</b>
              </li>
            ))}
            {missing.length > 0 && (
              <li>
                <i className="tal-hatch" aria-hidden="true" />
                <span>Sin dato</span>
                <b>{missing.length}</b>
              </li>
            )}
          </ul>
        </div>

        <div className="tal-map-side">
          <div className="tal-reading">
            <span className="lab-kicker">Lo que dice el mapa</span>
            {reading.length ? (
              <ul>
                {reading.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            ) : (
              <p className="lab-small">Pega tus datos para ver la lectura.</p>
            )}
          </div>
          <span className="lab-kicker">El mismo dato, en lista</span>
          <ol className="tal-rank" aria-label={`Departamentos ordenados por ${ds.label}`}>
            {rows.map((r, i) => (
              <li key={r.c}>
                <button
                  type="button"
                  className={active === r.c ? 'on' : ''}
                  onPointerEnter={() => setActive(r.c)}
                  onPointerLeave={() => setActive(null)}
                  onFocus={() => setActive(r.c)}
                  onBlur={() => setActive(null)}
                >
                  <span className="tal-rank-n">{i + 1}</span>
                  <span className="tal-rank-name">{r.n}</span>
                  <span className="tal-rank-bar" aria-hidden="true">
                    <i
                      style={{
                        width: `${max ? Math.max(2, (r.v / max) * 100) : 0}%`,
                        background: colors[classOf(r.v, breaks)],
                      }}
                    />
                  </span>
                  <span className="tal-rank-v">{fmt(r.v)}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="tal-map-out">
        <div className="lab-filters eco-tabs tal-switch" role="group" aria-label="Qué te llevas">
          <button type="button" aria-pressed={out === 'ficha'} onClick={() => setOut('ficha')}>
            Ficha del mapa
          </button>
          <button type="button" aria-pressed={out === 'prompt'} onClick={() => setOut('prompt')}>
            Prompt para rehacerlo con IA
          </button>
        </div>
        <div className="lab-prompt tal-pre">
          <pre>{text}</pre>
        </div>
        <div className="lab-actions">
          <button className="lab-primary" onClick={downloadSvg} disabled={!rows.length}>
            <Download size={17} /> Descargar mapa (.svg)
          </button>
          {out === 'ficha' && (
            <button
              className="lab-text-button"
              onClick={() => downloadText('ficha-de-mapa.md', sheet)}
            >
              <Download size={17} /> Descargar ficha (.md)
            </button>
          )}
          <CopyButton
            key={text}
            text={text}
            label={out === 'ficha' ? 'Copiar ficha' : 'Copiar prompt'}
            successMessage="Copiado."
          />
        </div>
      </div>
    </div>
  )
}
