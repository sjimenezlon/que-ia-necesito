import { useState, useId, useRef } from 'react'
import { Search, X, ArrowRight } from 'lucide-react'
import searchSuggestions from '../data/searchSuggestions'

export default function SearchBar({
  id,
  value,
  onChange,
  large = false,
  hasResults = false,
  onSubmit,
}) {
  const generatedId = useId()
  const listId = `${generatedId}-suggestions`
  const [focused, setFocused] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef(null)
  const normalize = (text) =>
    text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  const suggestions = searchSuggestions
    .filter((s) => !value || normalize(s.text).includes(normalize(value)))
    .slice(0, 5)
  const open = focused && !dismissed && !hasResults && suggestions.length > 0
  const choose = (text) => {
    onChange(text)
    setDismissed(true)
    setActiveIndex(-1)
  }
  const submit = () => {
    setDismissed(true)
    onSubmit?.()
  }

  return (
    <div
      className={`relative w-full ${large ? '' : 'max-w-xl'}`}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setFocused(false)
          setActiveIndex(-1)
        }
      }}
    >
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
        className="relative"
      >
        <Search
          size={large ? 21 : 18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light pointer-events-none"
        />
        <input
          ref={inputRef}
          id={id || generatedId}
          type="search"
          role="combobox"
          aria-label="Buscar herramientas de inteligencia artificial"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          aria-autocomplete="list"
          aria-activedescendant={open && activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
          autoComplete="off"
          value={value}
          onFocus={() => {
            setFocused(true)
            setDismissed(false)
          }}
          onChange={(e) => {
            onChange(e.target.value)
            setDismissed(false)
            setActiveIndex(-1)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setDismissed(true)
              setActiveIndex(-1)
            }
            if (open && ['ArrowDown', 'ArrowUp'].includes(e.key)) {
              e.preventDefault()
              setActiveIndex((i) =>
                e.key === 'ArrowDown'
                  ? (i + 1) % suggestions.length
                  : i <= 0
                    ? suggestions.length - 1
                    : i - 1
              )
            }
            if (open && e.key === 'Enter' && activeIndex >= 0) {
              e.preventDefault()
              choose(suggestions[activeIndex].text)
            }
          }}
          placeholder="Ej.: crear una presentación sin pagar"
          className={`search-input ${large ? 'large' : ''} ${onSubmit ? 'with-submit' : ''}`}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {value && (
            <button
              type="button"
              className="icon-button"
              aria-label="Limpiar búsqueda"
              onClick={() => {
                onChange('')
                setDismissed(true)
                inputRef.current?.focus()
              }}
            >
              <X size={17} />
            </button>
          )}
          {onSubmit && (
            <button
              type="submit"
              className="search-submit"
              disabled={!value.trim()}
              aria-label="Ver resultados de búsqueda"
            >
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </form>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-xl shadow-lg z-40 overflow-hidden">
          <p className="px-4 pt-3 pb-2 text-xs text-text-light">
            Ideas para empezar · usa ↑ ↓ y Enter
          </p>
          <ul id={listId} role="listbox" aria-label="Sugerencias de búsqueda" className="pb-2">
            {suggestions.map((s, i) => (
              <li
                key={s.text}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === activeIndex}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(s.text)}
                className={`flex gap-3 items-center px-4 py-3 cursor-pointer text-sm hover:bg-primary/5 ${i === activeIndex ? 'bg-primary/8 text-primary' : ''}`}
              >
                <Search size={14} />
                {s.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
