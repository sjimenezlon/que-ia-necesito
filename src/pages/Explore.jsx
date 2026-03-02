import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
import { useFilters } from '../hooks/useFilters'
import { useSearch } from '../hooks/useSearch'
import SearchBar from '../components/SearchBar'
import FilterSidebar from '../components/FilterSidebar'
import ToolCard from '../components/ToolCard'

export default function Explore({ onCompare, compareIds }) {
  const [searchParams] = useSearchParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { query, setQuery, results } = useSearch()

  const filters = useFilters(query ? results : null)

  useEffect(() => {
    const cat = searchParams.get('categoria')
    if (cat && !filters.selectedCategories.includes(cat)) {
      filters.toggleCategory(cat)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const displayTools = query ? filters.filtered : filters.filtered

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text mb-2">
          Explorar herramientas
        </h1>
        <p className="text-text-light mb-4">
          Descubre entre más de 80 herramientas de IA la ideal para ti.
        </p>
        <div className="flex items-center gap-3">
          <SearchBar value={query} onChange={setQuery} />
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden flex items-center gap-2 px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-light cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtros
            {filters.hasActiveFilters && (
              <span className="w-2 h-2 bg-primary rounded-full" />
            )}
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        <FilterSidebar
          {...filters}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-text-lighter">
              {displayTools.length} herramienta{displayTools.length !== 1 ? 's' : ''}
            </p>
          </div>

          {displayTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  onCompare={onCompare}
                  isInCompare={compareIds.includes(tool.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-text-lighter">
                No hay herramientas que coincidan con estos filtros.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
