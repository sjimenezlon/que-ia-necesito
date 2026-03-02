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
        className={`absolute left-4 top-1/2 -translate-y-1/2 text-text-lighter ${
          large ? 'w-6 h-6' : 'w-5 h-5'
        }`}
      />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholders[placeholderIndex]}
        className={`w-full bg-white border border-border rounded-2xl outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-text-lighter ${
          large
            ? 'pl-14 pr-12 py-4 text-lg'
            : 'pl-12 pr-10 py-3 text-base'
        }`}
      />
      {value && (
        <button
          onClick={() => {
            onChange('')
            inputRef.current?.focus()
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 bg-transparent border-none cursor-pointer"
          aria-label="Limpiar búsqueda"
        >
          <X className="w-4 h-4 text-text-lighter" />
        </button>
      )}
    </div>
  )
}
