import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, RotateCcw, Star, ExternalLink,
  Info, Sparkles, CheckCircle2,
} from 'lucide-react'
import { CATEGORIES, getRecommendations, getCategoryInfo } from '../utils/recommender'
import { USE_CASES, CONTEXT_QUESTIONS } from '../data/useCaseOptions'
import { getMatchReason } from '../utils/matchReasons'
import { ToolFavicon } from './ToolCard'

const difficultyOptions = [
  { value: 1, label: 'Principiante', desc: 'Quiero algo simple y fácil de usar', emoji: '🌱' },
  { value: 2, label: 'Intermedio', desc: 'Puedo aprender algo nuevo sin problema', emoji: '🚀' },
  { value: 3, label: 'Avanzado', desc: 'Me gustan las herramientas potentes', emoji: '⚡' },
]

const pricingOptions = [
  { value: 'gratis', label: 'Solo gratis', desc: 'Incluye herramientas con plan gratuito', emoji: '🆓' },
  { value: 'freemium', label: 'Freemium', desc: 'Gratis con opción de pago para más funciones', emoji: '✨' },
  { value: 'any', label: 'No importa el precio', desc: 'Muéstrame las mejores sin importar el costo', emoji: '💎' },
  { value: 'pago', label: 'Solo de pago', desc: 'Quiero herramientas premium', emoji: '💳' },
]

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

export default function RecommendationFlow() {
  const [step, setStep] = useState(0)
  const [category, setCategory] = useState(null)
  const [useCase, setUseCase] = useState(null)
  const [contextAnswer, setContextAnswer] = useState(null)
  const [difficulty, setDifficulty] = useState(null)
  const [pricing, setPricing] = useState(null)
  const [results, setResults] = useState(null)
  const [relaxedMessage, setRelaxedMessage] = useState(null)

  // Determine if this category has a context question
  const hasContextStep = category && CONTEXT_QUESTIONS[category]
  const contextConfig = hasContextStep ? CONTEXT_QUESTIONS[category] : null

  // Dynamic steps based on whether context is available
  const steps = useMemo(() => {
    const base = [
      { title: '¿En qué área necesitas ayuda?', subtitle: 'Selecciona la categoría que más se acerque a lo que buscas.', label: 'Área' },
      { title: '¿Qué quieres hacer exactamente?', subtitle: 'Elige el caso de uso más cercano a tu necesidad.', label: 'Caso de uso' },
    ]
    if (hasContextStep) {
      base.push({ title: contextConfig.question, subtitle: 'Esto nos ayuda a afinar las recomendaciones.', label: 'Contexto' })
    }
    base.push(
      { title: '¿Qué tan técnico eres?', subtitle: 'Esto nos ayuda a recomendarte herramientas adecuadas a tu nivel.', label: 'Nivel' },
      { title: '¿Cuánto quieres invertir?', subtitle: 'Hay opciones para todos los presupuestos.', label: 'Precio' },
    )
    return base
  }, [hasContextStep, contextConfig])

  const totalSteps = steps.length

  // Map step index to content type
  const getStepType = (s) => {
    if (s === 0) return 'category'
    if (s === 1) return 'useCase'
    if (hasContextStep && s === 2) return 'context'
    if (hasContextStep) {
      if (s === 3) return 'difficulty'
      if (s === 4) return 'pricing'
    } else {
      if (s === 2) return 'difficulty'
      if (s === 3) return 'pricing'
    }
    return null
  }

  const currentStepType = getStepType(step)

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1)
    } else {
      const recs = getRecommendations({ category, difficulty, pricing, useCase, context: contextAnswer })
      setResults(recs.tools)
      setRelaxedMessage(recs.relaxed ? recs.relaxedMessage : null)
    }
  }

  const handleBack = () => {
    if (step > 0) setStep(step - 1)
  }

  const handleReset = () => {
    setStep(0)
    setCategory(null)
    setUseCase(null)
    setContextAnswer(null)
    setDifficulty(null)
    setPricing(null)
    setResults(null)
    setRelaxedMessage(null)
  }

  const canProceed = (() => {
    switch (currentStepType) {
      case 'category': return !!category
      case 'useCase': return !!useCase
      case 'context': return !!contextAnswer
      case 'difficulty': return !!difficulty
      case 'pricing': return !!pricing
      default: return false
    }
  })()

  const selectedCategory = category ? getCategoryInfo(category) : null
  const useCaseOptions = category ? USE_CASES[category] || [] : []

  // ─── Results view ───
  if (results) {
    return (
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-accent/15">
            <CheckCircle2 className="w-4 h-4" />
            {results.length} herramienta{results.length !== 1 ? 's' : ''} encontrada{results.length !== 1 ? 's' : ''}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-text mb-2 tracking-tight">
            Tus recomendaciones
          </h2>
          <p className="text-text-light">
            {selectedCategory
              ? `Las mejores opciones en ${selectedCategory.label.toLowerCase()} para ti.`
              : 'Basado en tus respuestas, estas son las mejores opciones para ti.'}
          </p>
        </div>

        {/* Relaxation notice */}
        {relaxedMessage && (
          <div className="flex items-start gap-3 bg-blue-50 border border-blue-200/60 rounded-xl p-4 mb-6 animate-slide-up" style={{ animationDelay: '50ms' }}>
            <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-blue-700 text-sm leading-relaxed">{relaxedMessage}</p>
          </div>
        )}

        {/* Results list */}
        <div className="space-y-4 mb-10">
          {results.map((tool, i) => {
            const reason = getMatchReason(tool, { useCase, category, context: contextAnswer })
            return (
              <div
                key={tool.id}
                className="group bg-surface rounded-2xl border border-border p-5 animate-slide-up hover:shadow-md hover:border-primary/20 transition-all duration-300 relative overflow-hidden"
                style={{ animationDelay: `${(i + 1) * 80}ms` }}
              >
                {/* Rank accent */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-warm opacity-50 rounded-l-2xl" />

                <div className="flex items-start gap-4 pl-2">
                  {/* Rank number */}
                  <div className="w-9 h-9 bg-primary/8 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-sm font-display">
                      {i + 1}
                    </span>
                  </div>

                  {/* Favicon */}
                  <div className="shrink-0 transition-transform duration-300 group-hover:scale-105">
                    <ToolFavicon tool={tool} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-display font-semibold text-text tracking-tight">{tool.name}</h3>
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                          pricingStyles[tool.pricing]
                        }`}
                      >
                        {pricingLabels[tool.pricing]}
                      </span>
                      <div className="flex items-center gap-0.5 ml-auto">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star
                            key={j}
                            className={`w-3 h-3 ${
                              j < tool.rating
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-zinc-200 fill-zinc-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {/* Match reason */}
                    {reason && (
                      <p className="text-accent text-xs font-medium mb-1.5">{reason}</p>
                    )}
                    <p className="text-text-light text-sm leading-relaxed">
                      {tool.shortDescription}
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <Link
                        to={`/herramienta/${tool.id}`}
                        className="text-primary text-sm font-semibold no-underline hover:underline"
                      >
                        Ver detalle →
                      </Link>
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-text-lighter text-sm no-underline hover:text-primary transition-colors"
                      >
                        Visitar <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 bg-surface border border-border text-text px-5 py-2.5 rounded-xl font-semibold cursor-pointer hover:bg-text/3 transition-all duration-200"
          >
            <RotateCcw className="w-4 h-4" />
            Empezar de nuevo
          </button>
          <Link
            to="/explorar"
            className="inline-flex items-center gap-2 text-primary text-sm font-semibold no-underline hover:underline"
          >
            Explorar todas las herramientas →
          </Link>
        </div>
      </div>
    )
  }

  // ─── Steps view ───
  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-10">
        {steps.map((s, i) => (
          <div key={i} className="flex-1 relative">
            <div className="h-1.5 rounded-full bg-text/5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: i < step ? '100%' : i === step ? '50%' : '0%',
                  background: 'linear-gradient(90deg, #4338CA, #E11D48)',
                }}
              />
            </div>
            <span className={`block text-[10px] font-semibold mt-1.5 ${i <= step ? 'text-primary' : 'text-text-lighter'}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Step header */}
      <div className="text-center mb-8">
        <span className="text-xs font-bold text-primary uppercase tracking-[0.12em] mb-2 block">
          Paso {step + 1} de {totalSteps}
        </span>
        <h2 className="text-xl md:text-2xl font-bold text-text mb-2 tracking-tight">
          {steps[step].title}
        </h2>
        <p className="text-text-light text-sm">{steps[step].subtitle}</p>
      </div>

      {/* Step content */}
      <div className="animate-scale-in" key={step}>
        {/* Category step */}
        {currentStepType === 'category' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  if (cat.id !== category) {
                    setCategory(cat.id)
                    // Reset all dependent fields when category changes
                    setUseCase(null)
                    setContextAnswer(null)
                    setDifficulty(null)
                    setPricing(null)
                  } else {
                    setCategory(cat.id)
                  }
                }}
                className={`p-4 rounded-xl border-2 text-left cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                  category === cat.id
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-border bg-surface hover:border-primary/30'
                }`}
              >
                <span className="text-sm font-semibold text-text block leading-tight">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Use case step */}
        {currentStepType === 'useCase' && (
          <div className="space-y-3">
            {useCaseOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setUseCase(opt.id)}
                className={`w-full p-5 rounded-xl border-2 text-left cursor-pointer transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-start gap-4 ${
                  useCase === opt.id
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-border bg-surface hover:border-primary/30'
                }`}
              >
                <span className="text-2xl">{opt.emoji}</span>
                <div>
                  <span className="font-semibold text-text block">{opt.label}</span>
                  <span className="text-sm text-text-light">{opt.matchTerms.slice(0, 3).join(', ')}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Context step (optional) */}
        {currentStepType === 'context' && contextConfig && (
          <div className="space-y-3">
            {contextConfig.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setContextAnswer(opt.value)}
                className={`w-full p-5 rounded-xl border-2 text-left cursor-pointer transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-start gap-4 ${
                  contextAnswer === opt.value
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-border bg-surface hover:border-primary/30'
                }`}
              >
                <span className="text-2xl">{opt.emoji}</span>
                <div>
                  <span className="font-semibold text-text block">{opt.label}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Difficulty step */}
        {currentStepType === 'difficulty' && (
          <div className="space-y-3">
            {difficultyOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setDifficulty(opt.value)}
                className={`w-full p-5 rounded-xl border-2 text-left cursor-pointer transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-start gap-4 ${
                  difficulty === opt.value
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-border bg-surface hover:border-primary/30'
                }`}
              >
                <span className="text-2xl">{opt.emoji}</span>
                <div>
                  <span className="font-semibold text-text block">{opt.label}</span>
                  <span className="text-sm text-text-light">{opt.desc}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Pricing step */}
        {currentStepType === 'pricing' && (
          <div className="space-y-3">
            {pricingOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setPricing(opt.value)}
                className={`w-full p-5 rounded-xl border-2 text-left cursor-pointer transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-start gap-4 ${
                  pricing === opt.value
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-border bg-surface hover:border-primary/30'
                }`}
              >
                <span className="text-2xl">{opt.emoji}</span>
                <div>
                  <span className="font-semibold text-text block">{opt.label}</span>
                  <span className="text-sm text-text-light">{opt.desc}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10">
        <button
          onClick={handleBack}
          disabled={step === 0}
          className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold border-none cursor-pointer transition-all duration-200 ${
            step === 0
              ? 'text-text-lighter bg-transparent cursor-not-allowed'
              : 'text-text-light bg-surface hover:bg-text/5'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Atrás
        </button>
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className={`inline-flex items-center gap-1.5 px-7 py-2.5 rounded-xl text-sm font-semibold border-none cursor-pointer transition-all duration-200 ${
            canProceed
              ? 'bg-text text-white hover:bg-text/90 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
              : 'bg-black/8 text-text-lighter cursor-not-allowed'
          }`}
        >
          {step === totalSteps - 1 ? (
            <>
              <Sparkles className="w-4 h-4" />
              Ver resultados
            </>
          ) : (
            <>
              Siguiente
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  )
}
