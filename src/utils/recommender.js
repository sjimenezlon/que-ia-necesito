import tools from '../data/tools.json'

/**
 * Smart recommendation engine with progressive filter relaxation.
 * Ensures users ALWAYS get results by loosening criteria when needed.
 * Returns { tools, relaxed, relaxedMessage }
 */
export function getRecommendations({ category, difficulty, pricing }) {
  // Step 1: Try strict match
  let candidates = applyFilters(tools, { category, difficulty, pricing })

  if (candidates.length >= 3) {
    return { tools: topN(candidates, 5), relaxed: false, relaxedMessage: null }
  }

  // Step 2: Relax pricing — "gratis" should include "freemium" (they have free tiers)
  if (pricing === 'gratis') {
    candidates = applyFilters(tools, { category, difficulty, pricing: 'gratis_or_freemium' })
    if (candidates.length >= 3) {
      return {
        tools: topN(candidates, 5),
        relaxed: true,
        relaxedMessage: 'Incluimos herramientas freemium (tienen plan gratuito) para darte más opciones.',
      }
    }
  }

  // Step 3: Relax difficulty — allow one level higher
  if (difficulty) {
    const relaxedDifficulty = Math.min(difficulty + 1, 3)
    const pricingToUse = pricing === 'gratis' ? 'gratis_or_freemium' : pricing
    candidates = applyFilters(tools, { category, difficulty: relaxedDifficulty, pricing: pricingToUse })
    if (candidates.length >= 2) {
      return {
        tools: topN(candidates, 5),
        relaxed: true,
        relaxedMessage: 'Ampliamos el nivel de dificultad para incluir más opciones útiles.',
      }
    }
  }

  // Step 4: Relax pricing completely — keep only category + difficulty
  if (pricing && pricing !== 'any') {
    const relaxedDifficulty = difficulty ? Math.min(difficulty + 1, 3) : null
    candidates = applyFilters(tools, { category, difficulty: relaxedDifficulty, pricing: 'any' })
    if (candidates.length >= 2) {
      return {
        tools: topN(candidates, 5),
        relaxed: true,
        relaxedMessage: 'Mostramos herramientas de todos los precios en esta categoría.',
      }
    }
  }

  // Step 5: Last resort — just category, no other filters
  candidates = applyFilters(tools, { category, difficulty: null, pricing: 'any' })
  if (candidates.length > 0) {
    return {
      tools: topN(candidates, 5),
      relaxed: true,
      relaxedMessage: 'Mostramos las mejores herramientas de esta categoría sin filtros adicionales.',
    }
  }

  // Step 6: Absolute fallback — top tools overall
  return {
    tools: topN(tools, 5),
    relaxed: true,
    relaxedMessage: 'No hay herramientas específicas para esa combinación. Te mostramos las más populares en general.',
  }
}

function applyFilters(allTools, { category, difficulty, pricing }) {
  let result = allTools

  if (category) {
    result = result.filter((t) => t.categories.includes(category))
  }

  if (difficulty) {
    result = result.filter((t) => t.difficulty <= difficulty)
  }

  if (pricing && pricing !== 'any') {
    if (pricing === 'gratis_or_freemium') {
      result = result.filter((t) => t.pricing === 'gratis' || t.pricing === 'freemium')
    } else {
      result = result.filter((t) => t.pricing === pricing)
    }
  }

  return result
}

function topN(candidates, n) {
  return [...candidates].sort((a, b) => b.rating - a.rating).slice(0, n)
}

export function getToolById(id) {
  return tools.find((t) => t.id === id)
}

export function getToolsByIds(ids) {
  return ids.map((id) => tools.find((t) => t.id === id)).filter(Boolean)
}

export function getRelatedTools(tool, limit = 4) {
  const altTools = getToolsByIds(tool.alternatives || [])
  if (altTools.length >= limit) return altTools.slice(0, limit)

  const sameCategory = tools.filter(
    (t) =>
      t.id !== tool.id &&
      !altTools.some((a) => a.id === t.id) &&
      t.categories.some((c) => tool.categories.includes(c))
  )
  sameCategory.sort((a, b) => b.rating - a.rating)

  return [...altTools, ...sameCategory].slice(0, limit)
}

/**
 * Get popular tools for a fallback/suggestion UI
 */
export function getPopularTools(limit = 6) {
  return topN(tools, limit)
}

export const CATEGORIES = [
  { id: 'escritura', label: 'Escritura y redacción', icon: 'PenLine', color: 'bg-blue-100 text-blue-700' },
  { id: 'diseno', label: 'Diseño e imágenes', icon: 'Palette', color: 'bg-pink-100 text-pink-700' },
  { id: 'presentaciones', label: 'Presentaciones', icon: 'Presentation', color: 'bg-orange-100 text-orange-700' },
  { id: 'video', label: 'Video y animación', icon: 'Video', color: 'bg-red-100 text-red-700' },
  { id: 'audio', label: 'Audio y música', icon: 'Music', color: 'bg-purple-100 text-purple-700' },
  { id: 'programacion', label: 'Programación y código', icon: 'Code', color: 'bg-emerald-100 text-emerald-700' },
  { id: 'datos', label: 'Datos y análisis', icon: 'BarChart3', color: 'bg-cyan-100 text-cyan-700' },
  { id: 'investigacion', label: 'Investigación', icon: 'Search', color: 'bg-indigo-100 text-indigo-700' },
  { id: 'transcripcion', label: 'Transcripción y voz', icon: 'Mic', color: 'bg-amber-100 text-amber-700' },
  { id: 'educacion', label: 'Educación y aprendizaje', icon: 'GraduationCap', color: 'bg-teal-100 text-teal-700' },
  { id: 'productividad', label: 'Productividad y email', icon: 'Mail', color: 'bg-slate-100 text-slate-700' },
  { id: 'chatbots', label: 'Chatbots y asistentes', icon: 'Bot', color: 'bg-violet-100 text-violet-700' },
  { id: 'negocios', label: 'Negocios y marketing', icon: 'Briefcase', color: 'bg-rose-100 text-rose-700' },
  { id: 'automatizacion', label: 'Automatización', icon: 'Zap', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'traduccion', label: 'Traducción e idiomas', icon: 'Globe', color: 'bg-lime-100 text-lime-700' },
]

export function getCategoryInfo(categoryId) {
  return CATEGORIES.find((c) => c.id === categoryId)
}
