import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import searchSuggestions from '../data/searchSuggestions'

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

export default function SearchBar({ value, onChange, large = false, hasResults = false }) {
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [focused, setFocused] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % placeholders.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Close suggestions on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const filteredSuggestions = searchSuggestions.filter((s) => {
    if (!value) return true
    return s.text.toLowerCase().includes(value.toLowerCase())
  })

  const handleFocus = () => {
    setFocused(true)
    setShowSuggestions(true)
  }

  const handleBlur = () => {
    setFocused(false)
  }

  const handleSuggestionClick = (text) => {
    onChange(text)
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  return (
    <div ref={containerRef} className={`relative w-full ${large ? 'max-w-2xl' : 'max-w-xl'}`}>
      <Search
        className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 z-10 ${
          focused ? 'text-primary' : 'text-text-lighter'
        } ${large ? 'w-5 h-5' : 'w-4.5 h-4.5'}`}
      />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          setShowSuggestions(true)
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
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
            setShowSuggestions(false)
            inputRef.current?.focus()
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-black/5 bg-transparent border-none cursor-pointer transition-colors z-10"
          aria-label="Limpiar búsqueda"
        >
          <X className="w-4 h-4 text-text-lighter" />
        </button>
      )}

      {/* Autocomplete dropdown — hide when search already has results */}
      {showSuggestions && focused && !hasResults && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-xl shadow-lg z-50 overflow-hidden animate-slide-down">
          <div className="py-1.5">
            <p className="px-4 py-1.5 text-[10px] font-semibold text-text-lighter uppercase tracking-wider">
              Búsquedas populares
            </p>
            {filteredSuggestions.map((s) => (
              <button
                key={s.text}
                onMouseDown={(e) => {
                  e.preventDefault()
                  handleSuggestionClick(s.text)
                }}
                className="w-full text-left px-4 py-2.5 text-sm text-text hover:bg-primary/5 cursor-pointer bg-transparent border-none flex items-center gap-3 transition-colors"
              >
                <Search className="w-3.5 h-3.5 text-text-lighter shrink-0" />
                <span>{s.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
