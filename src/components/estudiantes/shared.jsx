import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Copy, ExternalLink, Phone, Printer, RotateCcw, ShieldCheck } from 'lucide-react'
import { getToolById } from '../../utils/recommender'
import { LIGHTS } from './lights'
import { AGE_TABLE, AGES_VERIFIED } from '../../data/students-ages'

// minor: la página la leen menores de edad. Claude exige 18 años, así que no se ofrece.
export function TryLinks({ text, minor = false }) {
  const targets = [
    !minor && { label: 'Probar en Claude', url: `https://claude.ai/new?q=${encodeURIComponent(text)}` },
    { label: 'Probar en ChatGPT', url: `https://chatgpt.com/?q=${encodeURIComponent(text)}` },
  ].filter(Boolean)
  return (
    <div className="flex flex-wrap gap-2">
      {targets.map((target) => (
        <a
          key={target.label}
          href={target.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-text/[0.035] text-[11px] font-semibold text-text-light no-underline hover:border-primary/30 hover:text-primary transition-colors"
        >
          {target.label}
          <ExternalLink className="w-3 h-3" />
        </a>
      ))}
    </div>
  )
}

export function CopyChip({ text, label = 'Copiar' }) {
  const [done, setDone] = useState(false)
  function copy() {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {})
    }
    setDone(true)
    window.setTimeout(() => setDone(false), 1600)
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-text text-bg text-xs font-semibold hover:bg-text/90 transition-colors"
    >
      {done ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {done ? 'Copiado' : label}
    </button>
  )
}

export function PromptActions({ text, minor = false }) {
  return (
    <div className="flex flex-wrap items-center gap-2 mt-4">
      <CopyChip text={text} />
      <TryLinks text={text} minor={minor} />
    </div>
  )
}

export function SectionHead({ id, kicker, title, children, color = 'text-primary' }) {
  return (
    <div className="mb-7 max-w-3xl">
      <span className={`text-[11px] font-bold uppercase tracking-[0.14em] ${color}`}>{kicker}</span>
      <h2 id={`${id}-title`} className="font-display text-3xl md:text-4xl font-bold text-text tracking-tight mt-2">
        {title}
      </h2>
      {children && <p className="text-text-light text-lg leading-relaxed mt-3">{children}</p>}
    </div>
  )
}

export function Section({ id, tint = false, children }) {
  const inner = <div className="max-w-6xl mx-auto px-4 py-16">{children}</div>
  return (
    <section
      id={id}
      className={`scroll-mt-32 ${tint ? 'bg-surface/60 border-y border-border' : ''}`}
      aria-labelledby={`${id}-title`}
    >
      {inner}
    </section>
  )
}

export function ChapterNav({ items }) {
  const [active, setActive] = useState(items[0].id)
  useEffect(() => {
    const sections = items.map((item) => document.getElementById(item.id)).filter(Boolean)
    if (sections.length === 0) return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length > 0) setActive(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [items])
  return (
    <nav className="sticky top-16 z-20 bg-bg/90 backdrop-blur border-y border-border" aria-label="Secciones del capítulo">
      <div className="max-w-6xl mx-auto px-4 flex gap-2 overflow-x-auto py-2.5">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold no-underline border transition-colors ${
              active === item.id
                ? 'bg-text text-bg border-text'
                : 'bg-surface text-text-light border-border hover:border-primary/30 hover:text-primary'
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

export function ToolChips({ ids }) {
  return (
    <div className="flex flex-wrap gap-2">
      {ids.map((id) => {
        const found = getToolById(id)
        if (!found) return null
        return (
          <Link
            key={id}
            to={`/herramienta/${id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface text-xs font-semibold text-text no-underline hover:border-primary/30 hover:text-primary"
          >
            {found.name} <ArrowRight className="w-3 h-3" />
          </Link>
        )
      })}
    </div>
  )
}

export function PromptGrid({ items, color = 'text-warm', minor = false }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <article key={item.title} className="bg-surface border border-border rounded-2xl p-5 shadow-sm flex flex-col">
          <h3 className={`font-display font-bold mb-1 ${color}`}>{item.title}</h3>
          {(item.why || item.body) && <p className="text-xs text-text-light mb-3">{item.why || item.body}</p>}
          <p className="font-mono text-[13px] text-text-light leading-relaxed flex-1">{item.text}</p>
          <PromptActions text={item.text} minor={minor} />
        </article>
      ))}
    </div>
  )
}

export function Semaphore({ items }) {
  const [votes, setVotes] = useState({})
  const hits = items.filter((item, i) => votes[i] === item.answer).length
  return (
    <>
      <div className="flex justify-end -mt-4 mb-4">
        <div className="bg-surface border border-border rounded-2xl px-5 py-3 shadow-sm">
          <span className="text-xs text-text-lighter">Aciertos</span>
          <p className="font-display font-extrabold text-3xl text-text">
            {hits}
            <span className="text-text-lighter text-xl">/{items.length}</span>
          </p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item, i) => {
          const vote = votes[i]
          const right = LIGHTS[item.answer]
          return (
            <div key={item.text} className={`rounded-2xl p-5 border transition-all ${vote ? right.ring : 'bg-surface border-border shadow-sm'}`}>
              <p className="text-sm font-semibold text-text leading-relaxed min-h-[44px]">{item.text}</p>
              {vote ? (
                <div className="mt-3">
                  <span className={`text-[11px] font-bold uppercase tracking-[0.12em] ${right.text}`}>
                    {vote === item.answer ? '✓ Acertaste' : `Tú: ${LIGHTS[vote].label}`} · {right.label}
                  </span>
                  <p className="text-sm text-text-light mt-1.5 leading-relaxed">{item.why}</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 mt-4">
                  {Object.entries(LIGHTS).map(([key, light]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setVotes((current) => ({ ...current, [i]: key }))}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border text-xs font-semibold text-text-light hover:border-text/30"
                      aria-label={`${light.label}: ${item.text}`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${light.dot}`} />
                      {light.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
      {Object.keys(votes).length > 0 && (
        <button type="button" onClick={() => setVotes({})} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-text-light hover:text-primary">
          <RotateCcw className="w-4 h-4" /> Volver a jugar
        </button>
      )}
    </>
  )
}

export function Agreement({ items, title, intro }) {
  const [picked, setPicked] = useState(items.slice(0, 5).map((item) => item.id))
  const [family, setFamily] = useState('')
  const [extra, setExtra] = useState('')
  const chosen = items.filter((item) => picked.includes(item.id)).map((item) => item.text)
  if (extra.trim()) chosen.push(extra.trim())
  const text = `${title}${family ? ` · Familia ${family}` : ''}\n\n${chosen.map((line, i) => `${i + 1}. ${line}`).join('\n')}\n\nLo revisamos juntos cada tres meses.\nFirmas: ______________________`

  function toggle(id) {
    setPicked((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }

  function print() {
    const win = window.open('', '_blank', 'width=720,height=900')
    if (!win) return
    const doc = win.document
    doc.title = title
    const style = doc.createElement('style')
    style.textContent = 'body{font:16px/1.6 system-ui,sans-serif;padding:48px;color:#1a1a2e}h1{font-size:26px;margin:0 0 4px}p{color:#52525b}ol li{margin:10px 0}.firmas{margin-top:56px;display:flex;gap:40px}.firmas span{flex:1;border-top:1px solid #1a1a2e;padding-top:6px;font-size:13px;color:#52525b}small{display:block;margin-top:40px;color:#a1a1aa}'
    doc.head.appendChild(style)
    const h1 = doc.createElement('h1')
    h1.textContent = title
    const sub = doc.createElement('p')
    sub.textContent = family ? `Familia ${family}` : 'Nuestra familia'
    const ol = doc.createElement('ol')
    chosen.forEach((line) => {
      const li = doc.createElement('li')
      li.textContent = line
      ol.appendChild(li)
    })
    const note = doc.createElement('p')
    note.textContent = 'Lo revisamos juntos cada tres meses.'
    const firmas = doc.createElement('div')
    firmas.className = 'firmas'
    ;['Firma', 'Firma', 'Firma'].forEach((label) => {
      const span = doc.createElement('span')
      span.textContent = label
      firmas.appendChild(span)
    })
    const foot = doc.createElement('small')
    foot.textContent = 'queianecesitas.dev/para-estudiantes'
    doc.body.append(h1, sub, ol, note, firmas, foot)
    win.focus()
    win.print()
  }

  return (
    <div className="grid lg:grid-cols-2 gap-5">
      <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
        {intro && <p className="text-sm text-text-light mb-4">{intro}</p>}
        <label className="block mb-4">
          <span className="field-label">Apellido de la familia (opcional)</span>
          <input className="field-input" value={family} onChange={(e) => setFamily(e.target.value)} placeholder="Ej.: Restrepo Gómez" />
        </label>
        <div className="space-y-2">
          {items.map((item) => {
            const on = picked.includes(item.id)
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggle(item.id)}
                aria-pressed={on}
                className={`w-full text-left flex items-start gap-3 rounded-xl p-3 border text-sm transition-all ${
                  on ? 'bg-accent/[0.06] border-accent/30 text-text' : 'bg-surface border-border text-text-light hover:border-accent/25'
                }`}
              >
                <span className={`w-5 h-5 mt-0.5 rounded-md flex items-center justify-center shrink-0 ${on ? 'bg-accent text-white' : 'border border-border'}`}>
                  {on && <Check className="w-3.5 h-3.5" />}
                </span>
                {item.text}
              </button>
            )
          })}
        </div>
        <label className="block mt-4">
          <span className="field-label">Una regla propia</span>
          <input className="field-input" value={extra} onChange={(e) => setExtra(e.target.value)} placeholder="Ej.: Los domingos salimos a caminar sin celular" />
        </label>
      </div>
      <div className="bg-accent/[0.05] border border-accent/20 rounded-2xl p-6 flex flex-col">
        <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-accent mb-3">Nuestro acuerdo</span>
        <pre className="whitespace-pre-wrap font-sans text-sm text-text leading-relaxed flex-1">{text}</pre>
        <div className="flex flex-wrap gap-2 mt-4">
          <CopyChip text={text} label="Copiar acuerdo" />
          <button
            type="button"
            onClick={print}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface text-xs font-semibold text-text hover:border-accent/40"
          >
            <Printer className="w-3.5 h-3.5" /> Imprimir para firmar
          </button>
        </div>
      </div>
    </div>
  )
}

export function HelpLines({ items }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {items.map((item) => (
        <a
          key={item.name}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-3 bg-surface border border-border rounded-2xl p-4 no-underline hover:border-secondary/35 hover:shadow-md transition-all"
        >
          <span className="w-9 h-9 rounded-xl bg-secondary/8 text-secondary flex items-center justify-center shrink-0">
            <Phone className="w-4 h-4" />
          </span>
          <span>
            <span className="flex items-center gap-1 font-semibold text-text text-sm">
              {item.name} <ExternalLink className="w-3 h-3 text-text-lighter" />
            </span>
            <span className="block text-xs text-text-light leading-relaxed mt-0.5">{item.body}</span>
          </span>
        </a>
      ))}
    </div>
  )
}

const AGE_STYLES = {
  ok: 'bg-accent/10 text-accent',
  warn: 'bg-warm/10 text-warm',
  adult: 'bg-secondary/10 text-secondary',
}

export function AgeTable({ title = '¿Desde qué edad se puede usar cada herramienta?' }) {
  return (
    <div className="bg-surface border border-border rounded-2xl shadow-sm overflow-hidden">
      <div className="p-5 md:p-6 border-b border-border flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
        <div>
          <h3 className="font-display font-bold text-lg text-text">{title}</h3>
          <p className="text-sm text-text-light mt-1">
            Según los términos que publica cada empresa, revisados el {AGES_VERIFIED}. Cambian con frecuencia: abre la
            fuente antes de crear una cuenta. Si tu país exige una edad mayor, manda la de tu país.
          </p>
        </div>
      </div>
      <ul className="divide-y divide-border">
        {AGE_TABLE.map((row) => (
          <li key={row.tool} className="grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[200px_110px_minmax(0,1fr)_auto] gap-x-4 gap-y-1 items-center px-5 md:px-6 py-3">
            <span className="font-semibold text-sm text-text">{row.tool}</span>
            <span className={`justify-self-end sm:justify-self-start text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${AGE_STYLES[row.level]}`}>{row.age}</span>
            <span className="col-span-2 sm:col-span-1 text-sm text-text-light">{row.note}</span>
            <a
              href={row.source}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-text-lighter no-underline hover:text-primary"
            >
              Fuente <ExternalLink className="w-3 h-3" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
