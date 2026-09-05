import { useState, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useSearch } from '../hooks/useSearch'
import { getPopularTools, getCategoryInfo, getToolById } from '../utils/recommender'
import Hero from '../components/Hero'
import ToolCard from '../components/ToolCard'
import SearchContextChips from '../components/SearchContextChips'
import { ArrowRight, Compass, GraduationCap, Heart, Landmark, Search } from 'lucide-react'
import tools from '../data/tools.json'
import CategoryGrid from '../components/CategoryGrid'
import { practicalExamples } from '../data/practicalExamples'

const popularTools = getPopularTools(6)

const fallbackSuggestions = [
  'Crear un video con IA',
  'Generar imágenes',
  'Escribir un artículo',
  'Transcribir una reunión',
  'Analizar datos de Excel',
  'Traducir un documento',
]

export default function Home({
  onCompare,
  compareIds,
  favorites = [],
  onToggleFavorite,
  isFavorite,
}) {
  const { query, setQuery, results, meta, removeFilter } = useSearch()
  const [searchParams, setSearchParams] = useSearchParams()
  const freeOnly = searchParams.get('gratis') === '1'
  const easyOnly = searchParams.get('facil') === '1'
  const setQuickFilter = (key, active) =>
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (active) next.set(key, '1')
        else next.delete(key)
        return next
      },
      { replace: true }
    )
  const clearQuickFilters = (resetQuery = false) =>
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.delete('gratis')
        next.delete('facil')
        if (resetQuery) next.delete('q')
        return next
      },
      { replace: true }
    )
  const [showAll, setShowAll] = useState(false)
  const resultsRef = useRef(null)
  const filteredResults = results.filter(
    (tool) => (!freeOnly || tool.pricing !== 'pago') && (!easyOnly || tool.difficulty === 1)
  )
  const visibleResults = showAll ? filteredResults : filteredResults.slice(0, 6)
  const changeQuery = (value) => {
    setQuery(value)
    setShowAll(false)
  }

  // Get category fallback tools when no results but category detected
  const categoryFallbackTools = (() => {
    if (!meta || !meta.detectedCategories.length || results.length > 0) return null
    const cat = meta.detectedCategories[0]
    const catTools = tools
      .filter((t) => t.categories.includes(cat))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4)
    return catTools.length > 0 ? { category: cat, tools: catTools } : null
  })()

  const favoriteTools = favorites.map(getToolById).filter(Boolean)

  return (
    <div>
      <Hero
        query={query}
        onQueryChange={changeQuery}
        results={results}
        onSubmit={() => {
          resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          resultsRef.current?.focus({ preventScroll: true })
        }}
      />

      {!query && (
        <section className="max-w-6xl mx-auto px-4 pt-12 pb-5">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
            <div>
              <span className="eyebrow">De la curiosidad a la práctica</span>
              <h2 className="text-2xl md:text-3xl font-bold mt-2">¿Con qué empezamos?</h2>
            </div>
            <Link to="/ejemplos" className="action-text">
              Ver los 8 ejemplos <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              practicalExamples[0],
              practicalExamples[2],
              practicalExamples[3],
              practicalExamples[5],
            ].map((example, i) => (
              <Link key={example.id} to={`/ejemplos?caso=${example.id}`} className="starter-card">
                <span className="flex items-center justify-between text-xs text-text-light">
                  <span>{example.group}</span>
                  <span className="font-mono">0{i + 1}</span>
                </span>
                <h3 className="font-semibold text-lg mt-5 mb-2">{example.title}</h3>
                <p className="text-sm text-text-light leading-relaxed">{example.description}</p>
                <span className="flex items-center gap-2 text-primary text-sm font-semibold mt-5">
                  Hacerlo mío <ArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {!query && (
        <section className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex items-end justify-between gap-4 mb-5">
            <div>
              <div className="text-xs font-bold text-text-lighter uppercase tracking-[0.14em] mb-1.5">
                Capítulos especiales
              </div>
              <h2 className="text-2xl font-bold text-text tracking-tight">
                IA aplicada a tu contexto
              </h2>
            </div>
            <span className="hidden sm:block text-xs text-text-lighter">
              Guías prácticas · Colombia · Agosto 2026
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              to="/docentes"
              className="group relative overflow-hidden bg-surface border border-border rounded-2xl p-6 no-underline hover:shadow-lg hover:-translate-y-0.5 hover:border-accent/35 transition-all"
            >
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-accent/8 rounded-full blur-2xl" />
              <div className="relative flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-6 h-6 text-accent" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-bold text-accent uppercase tracking-[0.13em] mb-1">
                    Nuevo capítulo
                  </div>
                  <h3 className="font-display font-bold text-text text-xl tracking-tight mb-2">
                    IA para profesoras y profesores
                  </h3>
                  <p className="text-sm text-text-light leading-relaxed">
                    Planeación, evaluación auténtica, prompts y protección de datos para enseñar con
                    criterio.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-accent font-semibold text-sm mt-4">
                    Explorar la guía{' '}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
            <Link
              to="/sector-publico"
              className="group relative overflow-hidden bg-surface border border-border rounded-2xl p-6 no-underline hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/35 transition-all"
            >
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-primary/8 rounded-full blur-2xl" />
              <div className="relative flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center shrink-0">
                  <Landmark className="w-6 h-6 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-bold text-primary uppercase tracking-[0.13em] mb-1">
                    Capítulo especial
                  </div>
                  <h3 className="font-display font-bold text-text text-xl tracking-tight mb-2">
                    IA para el sector público
                  </h3>
                  <p className="text-sm text-text-light leading-relaxed">
                    Casos colombianos, rutas por rol, contratación, PQRSD, datos, gobernanza y uso
                    responsable.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm mt-4">
                    Explorar la guía{' '}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Context chips — only render wrapper when chips will actually show */}
      {query &&
        meta &&
        meta.hasStrongIntent &&
        (meta.detectedCategories.length > 0 || meta.pricingHint || meta.difficultyHint) && (
          <div className="max-w-6xl mx-auto px-4 mt-4 mb-2">
            <SearchContextChips meta={meta} onRemove={removeFilter} />
          </div>
        )}

      {query && (
        <div
          ref={resultsRef}
          tabIndex={-1}
          className="max-w-6xl mx-auto px-4 pt-6 scroll-mt-24"
          aria-label="Resultados de búsqueda"
        >
          <div className="flex flex-wrap justify-between gap-4 items-center mb-4">
            <h2 role="status" aria-live="polite" className="text-lg font-semibold">
              {filteredResults.length} opciones para tu búsqueda
            </h2>
            <button
              className="action-text"
              onClick={() => {
                clearQuickFilters(true)
                setShowAll(false)
              }}
            >
              Volver a empezar
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              className={`filter-pill ${freeOnly ? 'selected' : ''}`}
              aria-pressed={freeOnly}
              onClick={() => {
                setQuickFilter('gratis', !freeOnly)
                setShowAll(false)
              }}
            >
              Con opción gratuita
            </button>
            <button
              className={`filter-pill ${easyOnly ? 'selected' : ''}`}
              aria-pressed={easyOnly}
              onClick={() => {
                setQuickFilter('facil', !easyOnly)
                setShowAll(false)
              }}
            >
              Fáciles de usar
            </button>
          </div>
          <p className="text-sm text-text-light mb-4">
            Abre una ficha para conocer sus límites, o añade hasta 3 herramientas para comparar.
          </p>
          {results.length > 0 && filteredResults.length === 0 && (
            <div className="p-6 border border-border rounded-xl mb-6">
              <p className="mb-3">No hay coincidencias con estos filtros.</p>
              <button
                className="action-text"
                onClick={() => {
                  clearQuickFilters()
                }}
              >
                Quitar filtros
              </button>
            </div>
          )}
        </div>
      )}

      {query && filteredResults.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-16 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleResults.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onCompare={onCompare}
                isInCompare={compareIds.includes(tool.id)}
                onToggleFavorite={onToggleFavorite}
                isFavorite={isFavorite}
              />
            ))}
          </div>
          {!showAll && filteredResults.length > 6 && (
            <div className="text-center mt-7">
              <button className="filter-pill" onClick={() => setShowAll(true)}>
                Ver {filteredResults.length - 6} opciones más <ArrowRight size={16} />
              </button>
            </div>
          )}
        </section>
      )}

      {!query && (
        <section className="max-w-6xl mx-auto px-4 py-10">
          <div className="mb-6">
            <span className="eyebrow">El catálogo completo</span>
            <h2 className="text-2xl font-bold mt-2">Explora por categoría</h2>
          </div>
          <CategoryGrid />
        </section>
      )}

      {/* Favorites section — shown when no query and user has favorites */}
      {!query && favoriteTools.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-10 pt-6">
          <h2 className="text-lg font-semibold text-text mb-5 tracking-tight flex items-center gap-2">
            <Heart className="w-5 h-5 text-secondary fill-secondary" />
            Tus favoritos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onCompare={onCompare}
                isInCompare={compareIds.includes(tool.id)}
                onToggleFavorite={onToggleFavorite}
                isFavorite={isFavorite}
              />
            ))}
          </div>
        </section>
      )}

      {query && results.length === 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-16 animate-fade-in">
          <div className="text-center py-10 mb-8">
            <div className="w-16 h-16 bg-text/4 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔍</span>
            </div>
            <p className="text-text font-display font-semibold text-lg mb-1">
              No encontramos resultados para &quot;{query}&quot;
            </p>
            <p className="text-text-lighter text-sm mb-4">
              {categoryFallbackTools
                ? `Pero encontramos herramientas en ${getCategoryInfo(categoryFallbackTools.category)?.label || categoryFallbackTools.category}`
                : 'Intenta con otras palabras o prueba una de estas búsquedas'}
            </p>

            {/* Clickable suggestions when no category detected */}
            {!categoryFallbackTools && (
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {fallbackSuggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-surface border border-border rounded-full text-sm text-text-light hover:border-primary/40 hover:text-primary cursor-pointer transition-colors"
                  >
                    <Search className="w-3 h-3" />
                    {s}
                  </button>
                ))}
              </div>
            )}

            <Link
              to="/recomendador"
              className="inline-flex items-center gap-2 text-primary text-sm font-semibold no-underline hover:underline"
            >
              <Compass className="w-4 h-4" />
              Prueba el recomendador guiado →
            </Link>
          </div>

          {/* Category fallback tools */}
          {categoryFallbackTools && (
            <div className="mb-10">
              <h3 className="text-xs font-bold text-text-lighter uppercase tracking-[0.12em] mb-5 text-center">
                Mejores en {getCategoryInfo(categoryFallbackTools.category)?.label}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {categoryFallbackTools.tools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    onCompare={onCompare}
                    isInCompare={compareIds.includes(tool.id)}
                    onToggleFavorite={onToggleFavorite}
                    isFavorite={isFavorite}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Popular tools fallback */}
          {!categoryFallbackTools && (
            <div>
              <h3 className="text-xs font-bold text-text-lighter uppercase tracking-[0.12em] mb-5 text-center">
                Herramientas populares
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {popularTools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    onCompare={onCompare}
                    isInCompare={compareIds.includes(tool.id)}
                    onToggleFavorite={onToggleFavorite}
                    isFavorite={isFavorite}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  )
}
