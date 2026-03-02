import { Link } from 'react-router-dom'
import { Star, Plus, Check, ExternalLink } from 'lucide-react'
import { getCategoryInfo } from '../utils/recommender'

const pricingStyles = {
  gratis: 'bg-green-100 text-green-700',
  freemium: 'bg-yellow-100 text-yellow-700',
  pago: 'bg-red-100 text-red-700',
}

const pricingLabels = {
  gratis: 'Gratis',
  freemium: 'Freemium',
  pago: 'De pago',
}

const difficultyLabels = {
  1: 'Fácil',
  2: 'Medio',
  3: 'Avanzado',
}

export default function ToolCard({ tool, onCompare, isInCompare = false }) {
  const primaryCategory = getCategoryInfo(tool.categories[0])

  return (
    <div className="bg-white rounded-xl border border-border p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col h-full">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-primary font-bold text-lg">
              {tool.name.charAt(0)}
            </span>
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-text text-base truncate">
              {tool.name}
            </h3>
            {primaryCategory && (
              <span
                className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium mt-0.5 ${primaryCategory.color}`}
              >
                {primaryCategory.label}
              </span>
            )}
          </div>
        </div>
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap ${
            pricingStyles[tool.pricing]
          }`}
        >
          {pricingLabels[tool.pricing]}
        </span>
      </div>

      <p className="text-text-light text-sm leading-relaxed mb-3 flex-1">
        {tool.shortDescription}
      </p>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < tool.rating
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-gray-200 fill-gray-200'
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-text-lighter">
          {'★'.repeat(tool.difficulty)} {difficultyLabels[tool.difficulty]}
        </span>
      </div>

      <div className="flex items-center gap-2 mt-auto pt-2 border-t border-border">
        <Link
          to={`/herramienta/${tool.id}`}
          className="flex-1 bg-primary text-white text-sm font-medium py-2 px-4 rounded-lg text-center no-underline hover:bg-primary-dark transition-colors"
        >
          Ver detalle
        </Link>
        {onCompare && (
          <button
            onClick={() => onCompare(tool.id)}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isInCompare
                ? 'bg-accent text-white border-accent'
                : 'bg-white text-text-light border-border hover:border-primary hover:text-primary'
            }`}
            title={isInCompare ? 'En el comparador' : 'Agregar al comparador'}
          >
            {isInCompare ? (
              <Check className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </button>
        )}
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg border border-border bg-white text-text-light hover:border-primary hover:text-primary transition-colors"
          title="Ir al sitio"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}
