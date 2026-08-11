import { useState } from 'react'
import { Copy, Check, RotateCcw, ExternalLink } from 'lucide-react'

const COMPATIBLE = ['Claude', 'ChatGPT', 'Gemini', 'Perplexity', 'Grok', 'Kimi', 'DeepSeek', 'Copilot', 'Lovable', 'v0', 'Bolt', 'Midjourney']

function TryLinks({ text }) {
  const targets = [
    { label: 'Probar en Claude', url: `https://claude.ai/new?q=${encodeURIComponent(text)}` },
    { label: 'Probar en ChatGPT', url: `https://chatgpt.com/?q=${encodeURIComponent(text)}` },
  ]
  return (
    <div className="flex flex-wrap gap-2">
      {targets.map((target) => (
        <a
          key={target.label}
          href={target.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-text/[0.035] text-xs font-semibold text-text-light no-underline hover:border-primary/30 hover:text-primary transition-colors"
        >
          {target.label}
          <ExternalLink className="w-3 h-3" />
        </a>
      ))}
    </div>
  )
}

export default function GeneratedPrompt({ generated, onReset, outputRef }) {
  const [copied, setCopied] = useState(false)

  const copyPrompt = async () => {
    if (!generated) return
    await navigator.clipboard.writeText(generated)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!generated) return null

  return (
    <div ref={outputRef} className="mt-10">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-text">Tu prompt refinado</h2>
        <p className="text-sm text-text-light">Cópialo y pégalo en tu herramienta de IA preferida — y adjunta ahí el material que enumeraste como materia prima.</p>
      </div>

      <div className="relative bg-text/3 rounded-2xl border border-border p-5">
        <button
          onClick={copyPrompt}
          className={`absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border cursor-pointer transition-colors ${
            copied
              ? 'bg-accent text-white border-accent'
              : 'bg-surface text-text-light border-border hover:border-primary hover:text-primary'
          }`}
        >
          {copied ? <><Check className="w-3 h-3" /> Copiado</> : <><Copy className="w-3 h-3" /> Copiar</>}
        </button>
        <pre className="text-sm text-text whitespace-pre-wrap font-mono leading-relaxed pr-20">
          {generated}
        </pre>
      </div>

      {generated.length < 3500 && (
        <div className="mt-4">
          <TryLinks text={generated} />
        </div>
      )}

      <div className="mt-5 rounded-xl border border-border bg-text/[0.03] p-4 text-xs text-text-light leading-relaxed">
        <span className="font-semibold text-text">Un prompt no se termina, se itera.</span> Manda esta primera versión,
        mira qué falló y corrige solo eso: casi siempre falta contexto o sobra instrucción. Si el resultado quedó a
        medias, súbele el esfuerzo antes de reescribirlo entero.
      </div>

      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border items-center">
        <span className="text-xs text-text-lighter">Compatible con:</span>
        {COMPATIBLE.map((t) => (
          <span key={t} className="text-xs px-2 py-0.5 bg-text/5 text-text-lighter rounded font-medium">{t}</span>
        ))}
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 bg-surface text-text border border-border px-4 py-2 rounded-xl text-sm font-medium cursor-pointer hover:bg-text/3 transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> Nuevo prompt
        </button>
      </div>
    </div>
  )
}
