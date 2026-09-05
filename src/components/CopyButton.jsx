import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function CopyButton({ text, label = 'Copiar prompt' }) {
  const [status, setStatus] = useState('')
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setStatus('Copiado. Ya puedes pegarlo en tu IA.')
    } catch {
      setStatus('No se pudo copiar. Selecciona el texto y cópialo manualmente.')
    }
  }
  return (
    <div>
      <button className="action-primary" onClick={copy}>
        {status.startsWith('Copiado') ? <Check size={16} /> : <Copy size={16} />}
        {label}
      </button>
      <p role="status" className="text-xs text-text-light mt-2">
        {status}
      </p>
    </div>
  )
}
