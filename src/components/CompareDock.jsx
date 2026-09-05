import { Link, useLocation } from 'react-router-dom'
import { X, ArrowRight, Columns3 } from 'lucide-react'
import { getToolById } from '../utils/recommender'

export default function CompareDock({ ids, onRemove, message }) {
  const location = useLocation()
  return (
    <>
      <div className="sr-only" role="status" aria-live="polite">
        {message}
      </div>
      {ids.length > 0 && location.pathname !== '/comparar' && (
        <aside className="compare-dock" aria-label="Herramientas seleccionadas para comparar">
          <div className="flex items-center gap-2 text-sm font-semibold shrink-0">
            <Columns3 size={18} className="text-primary" />
            <span>
              {ids.length}/3 <span className="hidden sm:inline">seleccionadas</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 flex-1">
            {ids.map((id) => (
              <span key={id} className="compare-chip">
                {getToolById(id)?.name}
                <button
                  className="icon-button !w-8 !h-8"
                  onClick={() => onRemove(id)}
                  aria-label={`Quitar ${getToolById(id)?.name} del comparador`}
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
          <Link to="/comparar" className="action-primary !py-2.5">
            Comparar <ArrowRight size={16} />
          </Link>
          {message.includes('tiene 3') && (
            <p className="w-full text-sm text-text-light">{message}</p>
          )}
        </aside>
      )}
    </>
  )
}
