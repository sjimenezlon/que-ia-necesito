import { useState } from 'react'
import { Download, CheckCircle2, Circle } from 'lucide-react'
import CopyButton from '../CopyButton'
import { readProgress, saveProgress, downloadText } from '../../utils/learning'
import {
  fmt,
  indicatorTypes,
  frequencies,
  emptyIndicator,
  indicatorPresets,
  states,
  computeIndicator,
  indicatorChecks,
  buildIndicatorSheet,
  buildIndicatorPrompt,
} from '../../data/economiaTaller'

const STORAGE_KEY = 'qia-economia-indicador-v1'
const valid = (v) => Object.keys(emptyIndicator).every((k) => typeof v[k] === 'string')

function Field({ id, label, hint, value, onChange, rows }) {
  const Tag = rows ? 'textarea' : 'input'
  return (
    <div className="tal-field">
      <label className="lab-label" htmlFor={id}>
        {label}
      </label>
      <Tag
        id={id}
        rows={rows}
        maxLength={240}
        placeholder={hint}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default function IndicatorBuilder() {
  const [v, setV] = useState(() => readProgress(STORAGE_KEY, emptyIndicator, valid))
  const [out, setOut] = useState('ficha')
  const set = (key, value) => {
    const next = { ...v, [key]: value }
    setV(next)
    saveProgress(STORAGE_KEY, next)
  }
  const load = (values) => {
    const next = { ...emptyIndicator, ...values }
    setV(next)
    saveProgress(STORAGE_KEY, next)
  }
  const r = computeIndicator(v)
  const checks = indicatorChecks(v, r)
  const done = checks.filter(([, ok]) => ok).length
  const sheet = buildIndicatorSheet(v, r)
  const prompt = buildIndicatorPrompt(v, r)
  const state = states[r.state]

  return (
    <div className="tal-grid">
      <div className="tal-form">
        <div className="tal-presets">
          <span className="lab-small">Empieza con un ejemplo:</span>
          {indicatorPresets.map((p) => (
            <button key={p.id} type="button" onClick={() => load(p.values)}>
              {p.label}
            </button>
          ))}
          <button type="button" className="tal-clear" onClick={() => load({})}>
            Vaciar
          </button>
        </div>

        <fieldset>
          <legend>
            <b>1</b> La decisión
          </legend>
          <Field
            id="ind-decision"
            label="¿Qué decisión va a informar este indicador?"
            hint="Ej.: si se endurece la política de crédito a clientes"
            value={v.decision}
            onChange={(x) => set('decision', x)}
            rows={2}
          />
          <Field
            id="ind-nombre"
            label="Nombre corto del indicador"
            hint="Ej.: cartera vencida"
            value={v.nombre}
            onChange={(x) => set('nombre', x)}
          />
        </fieldset>

        <fieldset>
          <legend>
            <b>2</b> La cuenta
          </legend>
          <div className="lab-filters tal-types" role="group" aria-label="Tipo de indicador">
            {indicatorTypes.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={v.tipo === t.id}
                onClick={() => set('tipo', t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <p className="tal-formula">
            <span>Fórmula</span> {r.type.formula} <em>· {r.type.unit}</em>
          </p>
          <Field
            id="ind-a"
            label={r.type.a}
            hint="Qué se cuenta arriba"
            value={v.a}
            onChange={(x) => set('a', x)}
          />
          <Field
            id="ind-b"
            label={r.type.b}
            hint="Contra qué se compara"
            value={v.b}
            onChange={(x) => set('b', x)}
          />
        </fieldset>

        <fieldset>
          <legend>
            <b>3</b> La fuente
          </legend>
          <Field
            id="ind-fuente"
            label="¿De dónde salen A y B?"
            hint="Sistema, encuesta o registro, con quien lo produce"
            value={v.fuente}
            onChange={(x) => set('fuente', x)}
          />
          <div className="tal-field">
            <label className="lab-label" htmlFor="ind-frecuencia">
              ¿Cada cuánto se actualiza?
            </label>
            <select
              id="ind-frecuencia"
              value={v.frecuencia}
              onChange={(e) => set('frecuencia', e.target.value)}
            >
              {frequencies.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <b>4</b> La regla
          </legend>
          <div className="lab-filters" role="group" aria-label="Sentido del indicador">
            <button
              type="button"
              aria-pressed={v.sentido === 'sube'}
              onClick={() => set('sentido', 'sube')}
            >
              Más es mejor
            </button>
            <button
              type="button"
              aria-pressed={v.sentido === 'baja'}
              onClick={() => set('sentido', 'baja')}
            >
              Menos es mejor
            </button>
          </div>
          <div className="tal-pair">
            <Field
              id="ind-meta"
              label={`Meta (${r.type.unit})`}
              hint="Donde quieres estar"
              value={v.meta}
              onChange={(x) => set('meta', x)}
            />
            <Field
              id="ind-alerta"
              label={`Alerta (${r.type.unit})`}
              hint="Donde alguien debe actuar"
              value={v.alerta}
              onChange={(x) => set('alerta', x)}
            />
          </div>
          <Field
            id="ind-responsable"
            label="¿Quién responde por el indicador?"
            hint="Un cargo o un nombre, no un comité"
            value={v.responsable}
            onChange={(x) => set('responsable', x)}
          />
          <Field
            id="ind-accion"
            label="¿Qué hace si cruza la alerta?"
            hint="Ej.: revisa los diez clientes con más mora y propone ajuste de cupos"
            value={v.accion}
            onChange={(x) => set('accion', x)}
            rows={2}
          />
        </fieldset>
      </div>

      <div className="tal-out">
        <div className={`tal-light tal-${r.state}`} aria-live="polite">
          <span className="lab-kicker">Pruébalo con dos cifras</span>
          <div className="tal-pair">
            <Field
              id="ind-va"
              label="Valor de A"
              hint="Ej.: 1.240"
              value={v.va}
              onChange={(x) => set('va', x)}
            />
            <Field
              id="ind-vb"
              label="Valor de B"
              hint="Ej.: 15.300"
              value={v.vb}
              onChange={(x) => set('vb', x)}
            />
          </div>
          <p className="tal-value">
            {r.value === null ? '—' : fmt(r.value)} <span>{r.type.unit}</span>
          </p>
          <p className="tal-state">
            <b aria-hidden="true">{state.mark}</b> {state.label}
            {r.state === 'sin-dato' && r.value !== null && ' · falta fijar meta o alerta'}
            {r.value === null && ' · escribe A y B para ver el resultado'}
          </p>
        </div>

        <div className="tal-checks">
          <span className="lab-kicker">
            {done} de {checks.length} · lo que hace que sirva para decidir
          </span>
          <ul>
            {checks.map(([label, ok, why]) => (
              <li key={label} className={ok ? 'ok' : ''}>
                {ok ? (
                  <CheckCircle2 size={17} aria-hidden="true" />
                ) : (
                  <Circle size={17} aria-hidden="true" />
                )}
                <div>
                  <strong>{label}</strong>
                  {!ok && <span>{why}</span>}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="lab-filters eco-tabs tal-switch" role="group" aria-label="Qué te llevas">
          <button type="button" aria-pressed={out === 'ficha'} onClick={() => setOut('ficha')}>
            Ficha del indicador
          </button>
          <button type="button" aria-pressed={out === 'prompt'} onClick={() => setOut('prompt')}>
            Prompt para calcularlo con IA
          </button>
        </div>
        <div className="lab-prompt tal-pre">
          <pre>{out === 'ficha' ? sheet : prompt}</pre>
        </div>
        <div className="lab-actions">
          {out === 'ficha' && (
            <button
              className="lab-primary"
              onClick={() => downloadText('ficha-de-indicador.md', sheet)}
            >
              <Download size={17} /> Descargar .md
            </button>
          )}
          <CopyButton
            key={out === 'ficha' ? sheet : prompt}
            text={out === 'ficha' ? sheet : prompt}
            label={out === 'ficha' ? 'Copiar ficha' : 'Copiar prompt'}
            successMessage="Copiado."
          />
        </div>
      </div>
    </div>
  )
}
