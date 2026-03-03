import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, Plus, Check, ExternalLink } from 'lucide-react'
import { getCategoryInfo } from '../utils/recommender'

const pricingStyles = {
  gratis: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  freemium: 'bg-amber-50 text-amber-700 border-amber-200',
  pago: 'bg-rose-50 text-rose-700 border-rose-200',
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

function getFaviconUrl(url) {
  try {
    const domain = new URL(url).hostname
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
  } catch {
    return null
  }
}

function ToolFavicon({ tool, size = 'md' }) {
  const [imgError, setImgError] = useState(false)
  const faviconUrl = getFaviconUrl(tool.url)
  const sizeClass = size === 'lg'
    ? 'w-14 h-14 rounded-2xl text-xl'
    : 'w-10 h-10 rounded-xl text-base'
  const imgSize = size === 'lg' ? 'w-7 h-7' : 'w-5 h-5'

  if (faviconUrl && !imgError) {
    return (
      <div className={`${sizeClass} bg-surface border border-border flex items-center justify-center shrink-0 transition-transform duration-300`}>
        <img
          src={faviconUrl}
          alt={tool.name}
          className={`${imgSize} object-contain`}
          onError={() => setImgError(true)}
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <div className={`${sizeClass} bg-primary/8 flex items-center justify-center shrink-0`}>
      <span className="text-primary font-bold">
        {tool.name.charAt(0)}
      </span>
    </div>
  )
}

export { ToolFavicon, getFaviconUrl }

export default function ToolCard({ tool, onCompare, isInCompare = false }) {
  const primaryCategory = getCategoryInfo(tool.categories[0])

  return (
    <div className="scroll-reveal group bg-surface rounded-2xl border border-border p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative overflow-hidden">
      {/* Left accent on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl bg-gradient-to-b from-primary via-secondary to-warm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="transition-transform duration-300 group-hover:scale-105">
            <ToolFavicon tool={tool} />
          </div>
          <div className="min-w-0">
            <h3 className="font-display font-semibold text-text text-base truncate tracking-tight">
              {tool.name}
            </h3>
            {primaryCategory && (
              <span
                className={`inline-block text-[11px] px-2 py-0.5 rounded-full font-medium mt-0.5 ${primaryCategory.color}`}
              >
                {primaryCategory.label}
              </span>
            )}
          </div>
        </div>
        <span
          className={`text-[11px] px-2.5 py-1 rounded-full font-semibold whitespace-nowrap border ${
            pricingStyles[tool.pricing]
          }`}
        >
          {pricingLabels[tool.pricing]}
        </span>
      </div>

      <p className="text-text-light text-sm leading-relaxed mb-4 flex-1">
        {tool.shortDescription}
      </p>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < tool.rating
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-zinc-200 fill-zinc-200'
              }`}
            />
          ))}
        </div>
        <span className="text-[11px] text-text-lighter font-medium">
          {difficultyLabels[tool.difficulty]}
        </span>
      </div>

      <div className="flex items-center gap-2 mt-auto pt-3 border-t border-border">
        <Link
          to={`/herramienta/${tool.id}`}
          className="flex-1 bg-text text-white text-sm font-semibold py-2.5 px-4 rounded-xl text-center no-underline hover:bg-text/90 hover:shadow-md active:scale-[0.98] transition-all duration-200"
        >
          Ver detalle
        </Link>
        {onCompare && (
          <button
            onClick={() => onCompare(tool.id)}
            className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 ${
              isInCompare
                ? 'bg-accent text-white border-accent'
                : 'bg-surface text-text-light border-border hover:border-primary hover:text-primary'
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
          className="p-2.5 rounded-xl border border-border bg-surface text-text-light hover:border-primary hover:text-primary transition-all duration-200 hover:scale-105 active:scale-95"
          title="Ir al sitio"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}
