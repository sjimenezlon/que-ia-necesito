import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Compass,
  Sparkles,
  Check,
  Presentation,
  Mail,
  GraduationCap,
} from 'lucide-react'
import SearchBar from './SearchBar'
import tools from '../data/tools.json'
import { practicalExamples } from '../data/practicalExamples'

const featured = [practicalExamples[0], practicalExamples[1], practicalExamples[3]]
const icons = [Presentation, Mail, GraduationCap]

export default function Hero({ query, onQueryChange, results, onSubmit }) {
  const [selected, setSelected] = useState(0)
  const example = featured[selected]
  const hasQuery = !!query.trim()
  return (
    <section className={`discovery-hero ${hasQuery ? 'is-searching' : ''}`}>
      <div
        className={`max-w-6xl mx-auto px-4 grid gap-10 items-center ${hasQuery ? '' : 'lg:grid-cols-[1.1fr_0.9fr]'}`}
      >
        <div>
          {!hasQuery && (
            <div className="eyebrow flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              {tools.length} herramientas · Tú eliges por dónde empezar
            </div>
          )}
          <h1
            className={`font-bold leading-[1.06] tracking-tight ${hasQuery ? 'text-3xl md:text-4xl mb-6' : 'text-4xl sm:text-5xl lg:text-6xl mt-5 mb-5'}`}
          >
            ¿Qué quieres
            <br className={hasQuery ? 'hidden' : ''} /> hacer{' '}
            <span className="text-primary">con IA?</span>
          </h1>
          {!hasQuery && (
            <p className="text-lg text-text-light max-w-lg mb-7 leading-relaxed">
              Empieza por tu tarea. Encuentra herramientas, compara opciones y prueba con un ejemplo
              que puedas hacer tuyo.
            </p>
          )}
          <label htmlFor="home-search" className="block text-sm font-semibold mb-2">
            Describe lo que necesitas
          </label>
          <SearchBar
            id="home-search"
            value={query}
            onChange={onQueryChange}
            large
            hasResults={results.length > 0}
            onSubmit={onSubmit}
          />
          {!hasQuery && (
            <>
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="text-xs text-text-light">Prueba:</span>
                {['Crear una presentación', 'Analizar datos de Excel', 'Resumir un documento'].map(
                  (text) => (
                    <button
                      key={text}
                      className="search-example"
                      onClick={() => onQueryChange(text)}
                    >
                      {text}
                      <ArrowRight size={12} />
                    </button>
                  )
                )}
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-7">
                <Link className="action-text" to="/recomendador">
                  <Compass size={17} />
                  Ayúdame a elegir <ArrowRight size={15} />
                </Link>
                <span className="text-xs text-text-light">Sin registro para explorar</span>
              </div>
            </>
          )}
        </div>
        {!hasQuery && (
          <div className="hero-example">
            <div className="flex items-center justify-between mb-5">
              <span className="eyebrow">Pruébalo con una tarea real</span>
              <Sparkles size={18} className="text-primary" />
            </div>
            <div className="flex gap-2 mb-6" aria-label="Elegir un ejemplo rápido">
              {featured.map((item, i) => {
                const Icon = icons[i]
                return (
                  <button
                    key={item.id}
                    className={`filter-pill flex-1 justify-center !px-2 ${selected === i ? 'selected' : ''}`}
                    aria-pressed={selected === i}
                    onClick={() => setSelected(i)}
                  >
                    <Icon size={15} />
                    {['Presentar', 'Escribir', 'Enseñar'][i]}
                  </button>
                )
              })}
            </div>
            <div key={example.id} className="animate-fade-in">
              <div className="hero-example-before">
                <span className="text-xs text-text-light">De una idea general…</span>
                <p className="mt-2">«{example.before}»</p>
              </div>
              <div className="hero-example-after">
                <span className="text-xs font-semibold text-primary">
                  …a una instrucción con dirección
                </span>
                <p className="font-semibold mt-3 leading-relaxed">
                  {example.task} sobre {example.topic}.
                </p>
                <div className="flex flex-wrap gap-3 mt-4 text-xs text-text-light">
                  {['Contexto', 'Entregable', 'Criterios'].map((item) => (
                    <span key={item} className="flex gap-1 items-center">
                      <Check size={13} className="text-accent" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                className="action-primary w-full mt-5 justify-center"
                to={`/ejemplos?caso=${example.id}`}
              >
                Personalizar este ejemplo <ArrowRight size={16} />
              </Link>
            </div>
            <p className="text-xs text-text-light text-center mt-3">
              Edita · Copia · Prueba en tu herramienta
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
