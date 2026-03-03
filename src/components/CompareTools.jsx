import { useState } from 'react'
import { Link } from 'react-router-dom'
import { X, Star, ExternalLink } from 'lucide-react'
import { getToolById, getCategoryInfo } from '../utils/recommender'

const pricingLabels = {
  gratis: 'Gratis',
  freemium: 'Freemium',
  pago: 'De pago',
}

const pricingStyles = {
  gratis: 'bg-emerald-50 text-emerald-700',
  freemium: 'bg-amber-50 text-amber-700',
  pago: 'bg-rose-50 text-rose-700',
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

function CompareToolFavicon({ tool }) {
  const [imgError, setImgError] = useState(false)
  const faviconUrl = getFaviconUrl(tool.url)

  if (faviconUrl && !imgError) {
    return (
      <div className="w-9 h-9 bg-surface border border-border rounded-xl flex items-center justify-center">
        <img
          src={faviconUrl}
          alt={tool.name}
          className="w-5 h-5 object-contain"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <div className="w-9 h-9 bg-primary/8 rounded-xl flex items-center justify-center">
      <span className="text-primary font-bold text-sm">
        {tool.name.charAt(0)}
      </span>
    </div>
  )
}

export default function CompareTools({ toolIds, onRemove }) {
  const tools = toolIds.map(getToolById).filter(Boolean)

  if (tools.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 bg-text/4 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">⚖️</span>
        </div>
        <p className="text-text font-display font-semibold text-lg mb-2">
          No hay herramientas para comparar
        </p>
        <p className="text-text-lighter text-sm mb-6 max-w-sm mx-auto">
          Agrega herramientas desde la página de explorar usando el botón +
        </p>
        <Link
          to="/explorar"
          className="inline-flex items-center gap-2 bg-text text-white px-6 py-3 rounded-xl font-semibold no-underline hover:bg-text/90 hover:shadow-md active:scale-[0.98] transition-all duration-200 text-sm"
        >
          Explorar herramientas
        </Link>
      </div>
    )
  }

  const rows = [
    {
      label: 'Precio',
      render: (t) => (
        <div>
          <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${pricingStyles[t.pricing]}`}>
            {pricingLabels[t.pricing]}
          </span>
          <p className="text-xs text-text-lighter mt-1">{t.pricingDetail}</p>
        </div>
      ),
    },
    {
      label: 'Nivel',
      render: (t) => (
        <span className="text-sm font-medium">
          {difficultyLabels[t.difficulty]}
        </span>
      ),
    },
    {
      label: 'Rating',
      render: (t) => (
        <div className="flex items-center gap-0.5" aria-label={`Calificación: ${t.rating} de 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < t.rating
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-zinc-200 fill-zinc-200'
              }`}
            />
          ))}
        </div>
      ),
    },
    {
      label: 'Categorías',
      render: (t) => (
        <div className="flex flex-wrap gap-1">
          {t.categories.map((catId) => {
            const cat = getCategoryInfo(catId)
            return cat ? (
              <span key={catId} className={`text-[11px] px-1.5 py-0.5 rounded font-medium ${cat.color}`}>
                {cat.label}
              </span>
            ) : null
          })}
        </div>
      ),
    },
    {
      label: 'Casos de uso',
      render: (t) => (
        <ul className="space-y-1">
          {t.useCases.slice(0, 3).map((uc, i) => (
            <li key={i} className="text-xs text-text-light">
              - {uc}
            </li>
          ))}
        </ul>
      ),
    },
    {
      label: 'Ventajas',
      render: (t) => (
        <ul className="space-y-1">
          {t.pros.map((p, i) => (
            <li key={i} className="text-xs text-emerald-700">
              + {p}
            </li>
          ))}
        </ul>
      ),
    },
    {
      label: 'Limitaciones',
      render: (t) => (
        <ul className="space-y-1">
          {t.cons.map((c, i) => (
            <li key={i} className="text-xs text-rose-700">
              - {c}
            </li>
          ))}
        </ul>
      ),
    },
  ]

  return (
    <div className="overflow-x-auto animate-fade-in">
      <table className="w-full border-collapse min-w-[600px]">
        <caption className="sr-only">Comparación de herramientas</caption>
        <thead>
          <tr>
            <th className="text-left p-3 text-sm font-medium text-text-lighter w-32" />
            {tools.map((tool) => (
              <th key={tool.id} className="p-3 text-left">
                <div className="bg-surface rounded-2xl border border-border p-4 shadow-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <CompareToolFavicon tool={tool} />
                      <span className="font-display font-semibold text-text text-sm tracking-tight">
                        {tool.name}
                      </span>
                    </div>
                    <button
                      onClick={() => onRemove(tool.id)}
                      className="p-1 rounded-lg hover:bg-text/5 bg-transparent border-none cursor-pointer transition-colors"
                      aria-label={`Quitar ${tool.name} del comparador`}
                    >
                      <X className="w-4 h-4 text-text-lighter" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <Link
                      to={`/herramienta/${tool.id}`}
                      className="text-xs text-primary font-semibold no-underline hover:underline"
                    >
                      Ver detalle
                    </Link>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-text-lighter no-underline hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-3 h-3 inline" /> Sitio
                    </a>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-t border-border">
              <td className="p-3 text-sm font-semibold text-text-light align-top">
                {row.label}
              </td>
              {tools.map((tool) => (
                <td key={tool.id} className="p-3 align-top">
                  {row.render(tool)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
