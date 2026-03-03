import { useState } from 'react'
import { Copy, Check, RotateCcw } from 'lucide-react'

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
        <p className="text-sm text-text-light">Copia y pega directamente en tu herramienta de IA preferida.</p>
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

      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
        <span className="text-xs text-text-lighter">Compatible con:</span>
        {['Claude', 'ChatGPT', 'Gemini', 'Perplexity', 'Lovable', 'v0', 'Bolt', 'Midjourney'].map((t) => (
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
