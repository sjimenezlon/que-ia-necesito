import { Link } from 'react-router-dom'
import { X, Star, ExternalLink } from 'lucide-react'
import { getToolById, getCategoryInfo } from '../utils/recommender'

const pricingLabels = {
  gratis: 'Gratis',
  freemium: 'Freemium',
  pago: 'De pago',
}

const pricingStyles = {
  gratis: 'bg-green-100 text-green-700',
  freemium: 'bg-yellow-100 text-yellow-700',
  pago: 'bg-red-100 text-red-700',
}

const difficultyLabels = {
  1: 'Fácil',
  2: 'Medio',
  3: 'Avanzado',
}

export default function CompareTools({ toolIds, onRemove }) {
  const tools = toolIds.map(getToolById).filter(Boolean)

  if (tools.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-text-lighter text-lg mb-2">
          No hay herramientas para comparar
        </p>
        <p className="text-text-lighter text-sm mb-6">
          Agrega herramientas desde la página de explorar usando el botón +
        </p>
        <Link
          to="/explorar"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium no-underline hover:bg-primary-dark transition-colors text-sm"
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
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${pricingStyles[t.pricing]}`}>
            {pricingLabels[t.pricing]}
          </span>
          <p className="text-xs text-text-lighter mt-1">{t.pricingDetail}</p>
        </div>
      ),
    },
    {
      label: 'Nivel',
      render: (t) => (
        <span className="text-sm">
          {'★'.repeat(t.difficulty)} {difficultyLabels[t.difficulty]}
        </span>
      ),
    },
    {
      label: 'Rating',
      render: (t) => (
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < t.rating
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-gray-200 fill-gray-200'
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
              <span key={catId} className={`text-xs px-1.5 py-0.5 rounded font-medium ${cat.color}`}>
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
            <li key={i} className="text-xs text-green-700">
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
            <li key={i} className="text-xs text-red-700">
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
        <thead>
          <tr>
            <th className="text-left p-3 text-sm font-medium text-text-lighter w-32" />
            {tools.map((tool) => (
              <th key={tool.id} className="p-3 text-left">
                <div className="bg-white rounded-xl border border-border p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <span className="text-primary font-bold text-sm">
                          {tool.name.charAt(0)}
                        </span>
                      </div>
                      <span className="font-semibold text-text text-sm">
                        {tool.name}
                      </span>
                    </div>
                    <button
                      onClick={() => onRemove(tool.id)}
                      className="p-1 rounded-md hover:bg-gray-100 bg-transparent border-none cursor-pointer"
                      title="Quitar del comparador"
                    >
                      <X className="w-4 h-4 text-text-lighter" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Link
                      to={`/herramienta/${tool.id}`}
                      className="text-xs text-primary no-underline hover:underline"
                    >
                      Ver detalle
                    </Link>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-text-lighter no-underline hover:text-primary"
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
              <td className="p-3 text-sm font-medium text-text-light align-top">
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
