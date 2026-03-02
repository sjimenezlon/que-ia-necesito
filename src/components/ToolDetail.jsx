import { Link } from 'react-router-dom'
import {
  Star, ExternalLink, ArrowLeft, Lightbulb,
  CheckCircle, Zap, ChevronRight,
} from 'lucide-react'
import { getToolById, getCategoryInfo } from '../utils/recommender'

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

export default function ToolDetail({ tool }) {
  if (!tool) return null

  const alternatives = (tool.alternatives || [])
    .map(getToolById)
    .filter(Boolean)

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <Link
        to={-1}
        onClick={(e) => {
          e.preventDefault()
          window.history.back()
        }}
        className="inline-flex items-center gap-1 text-text-light text-sm mb-6 no-underline hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver
      </Link>

      <div className="bg-white rounded-2xl border border-border p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-primary font-bold text-2xl">
              {tool.name.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-text mb-1">{tool.name}</h1>
            <div className="flex flex-wrap items-center gap-2">
              {tool.categories.map((catId) => {
                const cat = getCategoryInfo(catId)
                return cat ? (
                  <span
                    key={catId}
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${cat.color}`}
                  >
                    {cat.label}
                  </span>
                ) : null
              })}
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                  pricingStyles[tool.pricing]
                }`}
              >
                {pricingLabels[tool.pricing]}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < tool.rating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-gray-200 fill-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-text-lighter">
                {tool.pricingDetail}
              </span>
            </div>
          </div>
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-medium no-underline hover:bg-primary-dark transition-colors text-sm shrink-0"
          >
            Visitar sitio
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <p className="text-text-light leading-relaxed mb-8">
          {tool.fullDescription}
        </p>

        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-text mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-accent" />
              ¿Para qué sirve?
            </h2>
            <ul className="space-y-2">
              {tool.useCases.map((uc, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-text-light text-sm"
                >
                  <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  {uc}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-text mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-secondary" />
              ¿Cómo empezar?
            </h2>
            <ol className="space-y-2">
              {tool.howToStart.map((step, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-text-light text-sm"
                >
                  <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <h2 className="font-semibold text-amber-800 mb-1 flex items-center gap-2 text-sm">
              <Lightbulb className="w-5 h-5" />
              Consejo clave
            </h2>
            <p className="text-amber-700 text-sm">{tool.proTip}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-xl p-4">
              <h3 className="font-semibold text-green-800 text-sm mb-2">
                Ventajas
              </h3>
              <ul className="space-y-1">
                {tool.pros.map((pro, i) => (
                  <li
                    key={i}
                    className="text-green-700 text-sm flex items-start gap-1"
                  >
                    <span>+</span> {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 rounded-xl p-4">
              <h3 className="font-semibold text-red-800 text-sm mb-2">
                Limitaciones
              </h3>
              <ul className="space-y-1">
                {tool.cons.map((con, i) => (
                  <li
                    key={i}
                    className="text-red-700 text-sm flex items-start gap-1"
                  >
                    <span>-</span> {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {tool.tags && tool.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tool.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-text-lighter text-xs px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {alternatives.length > 0 && (
            <div>
              <h2 className="font-semibold text-text mb-3">Alternativas</h2>
              <div className="flex flex-wrap gap-2">
                {alternatives.map((alt) => (
                  <Link
                    key={alt.id}
                    to={`/herramienta/${alt.id}`}
                    className="inline-flex items-center gap-2 bg-gray-50 border border-border rounded-lg px-3 py-2 no-underline hover:bg-primary/5 hover:border-primary/30 transition-colors"
                  >
                    <span className="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center text-primary text-xs font-bold">
                      {alt.name.charAt(0)}
                    </span>
                    <span className="text-sm text-text font-medium">
                      {alt.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
