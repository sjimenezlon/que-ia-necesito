import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'

const placeholders = [
  'Hacer una presentación profesional',
  'Transcribir una reunión',
  'Crear un video con IA',
  'Analizar datos de Excel',
  'Escribir un correo formal',
  'Generar imágenes con IA',
  'Traducir un documento',
  'Crear música con IA',
  'Programar una página web',
  'Resumir un artículo largo',
]

export default function SearchBar({ value, onChange, large = false }) {
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % placeholders.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`relative w-full ${large ? 'max-w-2xl' : 'max-w-xl'}`}>
      <Search
        className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
          focused ? 'text-primary' : 'text-text-lighter'
        } ${large ? 'w-5 h-5' : 'w-4.5 h-4.5'}`}
      />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholders[placeholderIndex]}
        className={`w-full bg-surface rounded-2xl outline-none transition-all duration-200 placeholder:text-text-lighter ${
          focused
            ? 'border-primary/60 ring-4 ring-primary/8 shadow-lg'
            : 'border-border hover:border-text-lighter shadow-sm'
        } ${
          large
            ? 'pl-13 pr-12 py-4 text-lg border-2'
            : 'pl-11 pr-10 py-3 text-base border'
        }`}
      />
      {value && (
        <button
          onClick={() => {
            onChange('')
            inputRef.current?.focus()
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-black/5 bg-transparent border-none cursor-pointer transition-colors"
          aria-label="Limpiar búsqueda"
        >
          <X className="w-4 h-4 text-text-lighter" />
        </button>
      )}
    </div>
  )
}
