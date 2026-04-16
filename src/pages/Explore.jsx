import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
import { useFilters } from '../hooks/useFilters'
import { useSearch } from '../hooks/useSearch'
import { useStaggerReveal } from '../hooks/useScrollReveal'
import SearchBar from '../components/SearchBar'
import FilterSidebar from '../components/FilterSidebar'
import ToolCard from '../components/ToolCard'

export default function Explore({ onCompare, compareIds, onToggleFavorite, isFavorite }) {
  const [searchParams] = useSearchParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { query, setQuery, results } = useSearch()
  const gridRef = useStaggerReveal([results])

  const filters = useFilters(query ? results : null)

  useEffect(() => {
    const cat = searchParams.get('categoria')
    if (cat && !filters.selectedCategories.includes(cat)) {
      filters.toggleCategory(cat)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const displayTools = filters.filtered

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-text mb-2 tracking-tight">
          Explorar herramientas
        </h1>
        <p className="text-text-light mb-5">
          Descubre entre más de 100 herramientas de IA la ideal para ti.
        </p>
        <div className="flex items-center gap-3">
          <SearchBar value={query} onChange={setQuery} />
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden flex items-center gap-2 px-4 py-3 bg-surface border border-border rounded-xl text-sm text-text-light cursor-pointer hover:bg-text/3 transition-colors font-medium"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtros
            {filters.hasActiveFilters && (
              <span className="w-2 h-2 bg-primary rounded-full" />
            )}
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        <FilterSidebar
          {...filters}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-text-lighter font-medium">
              {displayTools.length} herramienta{displayTools.length !== 1 ? 's' : ''}
            </p>
          </div>

          {displayTools.length > 0 ? (
            <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayTools.map((tool) => (
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
          ) : (
            <div className="text-center py-16">
              <div className="w-14 h-14 bg-text/4 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤷</span>
              </div>
              <p className="text-text-light font-medium mb-1">
                No hay herramientas con estos filtros
              </p>
              <p className="text-text-lighter text-sm">
                Intenta quitar algún filtro para ver más opciones
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
