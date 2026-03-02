import { useSearch } from '../hooks/useSearch'
import Hero from '../components/Hero'
import ToolCard from '../components/ToolCard'

export default function Home({ onCompare, compareIds }) {
  const { query, setQuery, results } = useSearch()

  return (
    <div>
      <Hero query={query} onQueryChange={setQuery} results={results} />

      {query && results.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-12 animate-slide-up">
          <h2 className="text-lg font-semibold text-text mb-4">
            {results.length} resultado{results.length !== 1 ? 's' : ''} para &quot;{query}&quot;
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
        <div className="text-center py-12 px-4">
          <p className="text-text-lighter text-lg mb-1">
            No encontramos resultados para &quot;{query}&quot;
          </p>
          <p className="text-text-lighter text-sm">
            Intenta con otras palabras o explora las categorías
          </p>
        </div>
      )}
    </div>
  )
}
