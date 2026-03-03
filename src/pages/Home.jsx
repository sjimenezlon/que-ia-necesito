import { Link } from 'react-router-dom'
import { useSearch } from '../hooks/useSearch'
import { useStaggerReveal } from '../hooks/useScrollReveal'
import { getPopularTools } from '../utils/recommender'
import Hero from '../components/Hero'
import ToolCard from '../components/ToolCard'
import { Compass } from 'lucide-react'

const popularTools = getPopularTools(6)

export default function Home({ onCompare, compareIds }) {
  const { query, setQuery, results } = useSearch()
  const gridRef = useStaggerReveal()

  return (
    <div>
      <Hero query={query} onQueryChange={setQuery} results={results} />

      {query && results.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-16 -mt-4">
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
              />
            ))}
          </div>
        </section>
      )}

      {query && results.length === 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-16 animate-fade-in">
          <div className="text-center py-10 mb-8">
            <div className="w-16 h-16 bg-black/4 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔍</span>
            </div>
            <p className="text-text font-display font-semibold text-lg mb-1">
              No encontramos resultados para &quot;{query}&quot;
            </p>
            <p className="text-text-lighter text-sm mb-4">
              Intenta con otras palabras o explora las categorías
            </p>
            <Link
              to="/recomendador"
              className="inline-flex items-center gap-2 text-primary text-sm font-semibold no-underline hover:underline"
            >
              <Compass className="w-4 h-4" />
              Prueba el recomendador guiado →
            </Link>
          </div>

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
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
