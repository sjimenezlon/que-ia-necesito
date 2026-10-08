import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function CopyButton({
  text,
  label = 'Copiar prompt',
  successMessage = 'Copiado. Ya puedes pegarlo en tu IA.',
}) {
  const [status, setStatus] = useState('')
  const copy = async () => {
    let timeout
    setStatus('Copiando…')
    try {
      await Promise.race([
        navigator.clipboard.writeText(text),
        new Promise((_, reject) => {
          timeout = setTimeout(() => reject(new Error('Clipboard unavailable')), 2000)
        }),
      ])
      setStatus(successMessage)
    } catch {
      setStatus('No se pudo copiar. Selecciona el texto y cópialo manualmente.')
    } finally {
      clearTimeout(timeout)
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
