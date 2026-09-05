import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
import { useFilters } from '../hooks/useFilters'
import { useSearch } from '../hooks/useSearch'
import SearchBar from '../components/SearchBar'
import FilterSidebar from '../components/FilterSidebar'
import ToolCard from '../components/ToolCard'

export default function Explore({ onCompare, compareIds, onToggleFavorite, isFavorite }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { query, setQuery, results } = useSearch()

  const filters = useFilters(query ? results : null)

  const favoritesOnly = searchParams.get('favoritos') === '1'
  const sort = searchParams.get('orden') || 'relevancia'
  const displayTools = filters.filtered
    .filter((tool) => !favoritesOnly || isFavorite?.(tool.id))
    .slice()
    .sort((a, b) => {
      if (sort === 'nombre') return a.name.localeCompare(b.name, 'es')
      if (sort === 'facilidad') return a.difficulty - b.difficulty
      return 0
    })
  const setOption = (key, value) =>
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value) next.set(key, value)
        else next.delete(key)
        return next
      },
      { replace: true }
    )

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-text mb-2 tracking-tight">
          Explorar herramientas
        </h1>
        <p className="text-text-light mb-5">
          Descubre entre más de 130 herramientas de IA la ideal para ti.
        </p>
        <div className="flex items-center gap-3">
          <SearchBar value={query} onChange={setQuery} />
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden flex items-center gap-2 px-4 py-3 bg-surface border border-border rounded-xl text-sm text-text-light cursor-pointer hover:bg-text/3 transition-colors font-medium"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtros
            {filters.hasActiveFilters && <span className="w-2 h-2 bg-primary rounded-full" />}
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        <FilterSidebar {...filters} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <p role="status" className="text-sm text-text-lighter font-medium">
              {displayTools.length} herramienta{displayTools.length !== 1 ? 's' : ''}
            </p>
            <div className="flex flex-wrap gap-2 items-center">
              <button
                className={`filter-pill ${favoritesOnly ? 'selected' : ''}`}
                aria-pressed={favoritesOnly}
                onClick={() => setOption('favoritos', favoritesOnly ? '' : '1')}
              >
                Mis favoritos
              </button>
              <label className="flex items-center gap-2 text-xs text-text-light">
                Ordenar
                <select
                  className="field-input !mt-0 !py-2 !text-sm"
                  value={sort}
                  onChange={(e) => setOption('orden', e.target.value)}
                >
                  <option value="relevancia">Orden del catálogo</option>
                  <option value="nombre">Nombre A–Z</option>
                  <option value="facilidad">Más fáciles primero</option>
                </select>
              </label>
            </div>
          </div>

          {displayTools.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                {favoritesOnly
                  ? 'No hay favoritos con estos filtros'
                  : 'No hay herramientas con estos filtros'}
              </p>
              <p className="text-text-lighter text-sm">
                {favoritesOnly
                  ? 'Guarda una herramienta con el corazón para encontrarla aquí.'
                  : 'Intenta quitar algún filtro para ver más opciones'}
              </p>
              <button className="action-text mt-4" onClick={() => setSearchParams({})}>
                Ver todo el catálogo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
