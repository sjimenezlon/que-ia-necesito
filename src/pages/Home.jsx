import { Link } from 'react-router-dom'
import { useSearch } from '../hooks/useSearch'
import { useStaggerReveal } from '../hooks/useScrollReveal'
import { getPopularTools, getCategoryInfo, getToolById } from '../utils/recommender'
import Hero from '../components/Hero'
import ToolCard from '../components/ToolCard'
import SearchContextChips from '../components/SearchContextChips'
import { Compass, Search, Heart } from 'lucide-react'
import tools from '../data/tools.json'

const popularTools = getPopularTools(6)

const fallbackSuggestions = [
  'Crear un video con IA',
  'Generar imágenes',
  'Escribir un artículo',
  'Transcribir una reunión',
  'Analizar datos de Excel',
  'Traducir un documento',
]

export default function Home({ onCompare, compareIds, favorites = [], onToggleFavorite, isFavorite }) {
  const { query, setQuery, results, meta, removeFilter } = useSearch()
  const gridRef = useStaggerReveal([results])

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
      <Hero query={query} onQueryChange={setQuery} results={results} />

      {/* Context chips — only render wrapper when chips will actually show */}
      {query && meta && meta.hasStrongIntent &&
        (meta.detectedCategories.length > 0 || meta.pricingHint || meta.difficultyHint) && (
        <div className="max-w-6xl mx-auto px-4 mt-4 mb-2">
          <SearchContextChips meta={meta} onRemove={removeFilter} />
        </div>
      )}

      {query && results.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-16 pt-6">
          <h2 className="text-lg font-semibold text-text mb-5 tracking-tight">
            {results.length} resultado{results.length !== 1 ? 's' : ''} para &quot;{query}&quot;
          </h2>
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((tool) => (
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
