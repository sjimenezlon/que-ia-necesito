import { X, SlidersHorizontal } from 'lucide-react'
import { CATEGORIES } from '../utils/recommender'

const pricingOptions = [
  { value: 'gratis', label: 'Gratis' },
  { value: 'freemium', label: 'Freemium' },
  { value: 'pago', label: 'De pago' },
]

const difficultyOptions = [
  { value: 1, label: 'Fácil' },
  { value: 2, label: 'Medio' },
  { value: 3, label: 'Avanzado' },
]

export default function FilterSidebar({
  selectedCategories,
  selectedPricing,
  selectedDifficulty,
  minRating,
  toggleCategory,
  togglePricing,
  toggleDifficulty,
  setMinRating,
  clearFilters,
  hasActiveFilters,
  isOpen,
  onClose,
}) {
  const content = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-text flex items-center gap-2 tracking-tight">
          <SlidersHorizontal className="w-4 h-4" />
          Filtros
        </h3>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              aria-label="Limpiar todos los filtros"
              className="text-xs text-primary font-semibold bg-transparent border-none cursor-pointer hover:underline"
            >
              Limpiar
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Cerrar filtros"
            className="md:hidden p-1 rounded-md hover:bg-text/5 bg-transparent border-none cursor-pointer"
          >
            <X className="w-5 h-5 text-text-light" />
          </button>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-text mb-2">Categoría</h4>
        <div className="space-y-1 max-h-60 overflow-y-auto">
          {CATEGORIES.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-text/3 cursor-pointer text-sm transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.id)}
                onChange={() => toggleCategory(cat.id)}
                className="rounded border-border text-primary focus:ring-primary accent-[#4338CA]"
              />
              <span className="text-text-light">{cat.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-text mb-2">Precio</h4>
        <div className="space-y-1">
          {pricingOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-text/3 cursor-pointer text-sm transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedPricing.includes(opt.value)}
                onChange={() => togglePricing(opt.value)}
                className="rounded border-border text-primary focus:ring-primary accent-[#4338CA]"
              />
              <span className="text-text-light">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-text mb-2">Dificultad</h4>
        <div className="space-y-1">
          {difficultyOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-text/3 cursor-pointer text-sm transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedDifficulty.includes(opt.value)}
                onChange={() => toggleDifficulty(opt.value)}
                className="rounded border-border text-primary focus:ring-primary accent-[#4338CA]"
              />
              <span className="text-text-light">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-text mb-2">
          Rating mínimo: {minRating > 0 ? `${minRating}+` : 'Todos'}
        </h4>
        <input
          type="range"
          min="0"
          max="5"
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          aria-label="Calificación mínima"
          className="w-full accent-[#4338CA]"
        />
        <div className="flex justify-between text-xs text-text-lighter">
          <span>Todos</span>
          <span>5 estrellas</span>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="absolute right-0 top-0 h-full w-80 bg-surface p-5 shadow-xl overflow-y-auto animate-slide-down border-l border-border">
            {content}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:block w-64 shrink-0">
        <div className="sticky top-20 bg-surface rounded-2xl border border-border p-5 shadow-xs">
          {content}
        </div>
      </div>
    </>
  )
}
