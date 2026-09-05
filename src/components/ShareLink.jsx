import { useState } from 'react'
import { Check, Link2 } from 'lucide-react'
import { SITE_URL } from '../utils/site'

export default function ShareLink({ url = `${SITE_URL}/`, label = 'Copiar enlace' }) {
  const [status, setStatus] = useState('')
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setStatus('Enlace copiado. Listo para compartir.')
    } catch {
      setStatus('Copia el enlace que aparece debajo.')
    }
  }
  return (
    <div>
      <button className="action-text" onClick={copy}>
        {status.startsWith('Enlace copiado') ? <Check size={16} /> : <Link2 size={16} />}
        {label}
      </button>
      <p className="text-xs text-text-light" role="status">
        {status}
      </p>
      {status.startsWith('Copia') && (
        <input
          aria-label="Enlace para compartir"
          readOnly
          value={url}
          className="field-input"
          onFocus={(event) => event.target.select()}
        />
      )}
    </div>
  )
}
