import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, RotateCcw, Star, ExternalLink } from 'lucide-react'
import { CATEGORIES, getRecommendations, getCategoryInfo } from '../utils/recommender'

const steps = [
  {
    title: '¿En qué área necesitas ayuda?',
    subtitle: 'Selecciona la categoría que más se acerque a lo que buscas.',
  },
  {
    title: '¿Qué tan técnico eres?',
    subtitle: 'Esto nos ayuda a recomendarte herramientas adecuadas a tu nivel.',
  },
  {
    title: '¿Cuánto quieres invertir?',
    subtitle: 'Hay opciones para todos los presupuestos.',
  },
]

const difficultyOptions = [
  { value: 1, label: 'Principiante', desc: 'Quiero algo simple y fácil de usar' },
  { value: 2, label: 'Intermedio', desc: 'Puedo aprender algo nuevo sin problema' },
  { value: 3, label: 'Avanzado', desc: 'Me gustan las herramientas potentes' },
]

const pricingOptions = [
  { value: 'gratis', label: 'Solo gratis', desc: 'No quiero pagar nada' },
  { value: 'freemium', label: 'Freemium', desc: 'Gratis con opción de pago' },
  { value: 'pago', label: 'De pago', desc: 'Dispuesto a invertir por calidad' },
  { value: 'any', label: 'No importa', desc: 'Muéstrame todo' },
]

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

export default function RecommendationFlow() {
  const [step, setStep] = useState(0)
  const [category, setCategory] = useState(null)
  const [difficulty, setDifficulty] = useState(null)
  const [pricing, setPricing] = useState(null)
  const [results, setResults] = useState(null)

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1)
    } else {
      const recs = getRecommendations({ category, difficulty, pricing })
      setResults(recs)
    }
  }

  const handleBack = () => {
    if (step > 0) setStep(step - 1)
  }

  const handleReset = () => {
    setStep(0)
    setCategory(null)
    setDifficulty(null)
    setPricing(null)
    setResults(null)
  }

  const canProceed =
    (step === 0 && category) ||
    (step === 1 && difficulty) ||
    (step === 2 && pricing)

  if (results) {
    return (
      <div className="max-w-3xl mx-auto animate-fade-in">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-text mb-2">
            Tus recomendaciones
          </h2>
          <p className="text-text-light">
            Basado en tus respuestas, estas son las mejores opciones para ti.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {results.map((tool, i) => (
            <div
              key={tool.id}
              className="bg-white rounded-xl border border-border p-5 animate-slide-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold text-lg">
                    {i + 1}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-text">{tool.name}</h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        pricingStyles[tool.pricing]
                      }`}
                    >
                      {pricingLabels[tool.pricing]}
                    </span>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star
                          key={j}
                          className={`w-3 h-3 ${
                            j < tool.rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-gray-200 fill-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-text-light text-sm mt-1">
                    {tool.shortDescription}
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <Link
                      to={`/herramienta/${tool.id}`}
                      className="text-primary text-sm font-medium no-underline hover:underline"
                    >
                      Ver detalle
                    </Link>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-text-lighter text-sm no-underline hover:text-primary"
                    >
                      Visitar <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {results.length === 0 && (
          <div className="text-center py-12 text-text-lighter">
            No encontramos herramientas con esos criterios exactos. Intenta con opciones diferentes.
          </div>
        )}

        <div className="text-center">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 bg-white border border-border text-text px-5 py-2.5 rounded-xl font-medium cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Empezar de nuevo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-8">
        {[0, 1, 2].map((s) => (
          <div
            key={s}
            className={`flex-1 h-2 rounded-full transition-colors ${
              s <= step ? 'bg-primary' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      <div className="text-center mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-text mb-2">
          {steps[step].title}
        </h2>
        <p className="text-text-light text-sm">{steps[step].subtitle}</p>
      </div>

      <div className="animate-fade-in">
        {step === 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`p-4 rounded-xl border-2 text-left cursor-pointer transition-all ${
                  category === cat.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-white hover:border-primary/30'
                }`}
              >
                <span className="text-sm font-medium text-text block">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-3">
            {difficultyOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setDifficulty(opt.value)}
                className={`w-full p-4 rounded-xl border-2 text-left cursor-pointer transition-all ${
                  difficulty === opt.value
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-white hover:border-primary/30'
                }`}
              >
                <span className="font-medium text-text block">
                  {opt.label}
                </span>
                <span className="text-sm text-text-light">{opt.desc}</span>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            {pricingOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setPricing(opt.value)}
                className={`w-full p-4 rounded-xl border-2 text-left cursor-pointer transition-all ${
                  pricing === opt.value
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-white hover:border-primary/30'
                }`}
              >
                <span className="font-medium text-text block">
                  {opt.label}
                </span>
                <span className="text-sm text-text-light">{opt.desc}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-8">
        <button
          onClick={handleBack}
          disabled={step === 0}
          className={`inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium border-none cursor-pointer transition-colors ${
            step === 0
              ? 'text-text-lighter bg-transparent cursor-not-allowed'
              : 'text-text-light bg-white hover:bg-gray-100'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Atrás
        </button>
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className={`inline-flex items-center gap-1 px-6 py-2.5 rounded-lg text-sm font-medium border-none cursor-pointer transition-colors ${
            canProceed
              ? 'bg-primary text-white hover:bg-primary-dark'
              : 'bg-gray-200 text-text-lighter cursor-not-allowed'
          }`}
        >
          {step === 2 ? 'Ver resultados' : 'Siguiente'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
