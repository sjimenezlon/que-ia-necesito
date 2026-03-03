import tools from '../data/tools.json'
import { getUseCaseById } from '../data/useCaseOptions'

/**
 * Smart recommendation engine with multi-factor scoring.
 * Now supports useCase and context in addition to category/difficulty/pricing.
 * Returns { tools, relaxed, relaxedMessage, reasons }
 */
export function getRecommendations({ category, difficulty, pricing, useCase, context }) {
  // Step 1: Try strict match
  let candidates = applyFilters(tools, { category, difficulty, pricing })

  if (candidates.length >= 3) {
    return {
      tools: scoreAndRank(candidates, { category, useCase, context }),
      relaxed: false,
      relaxedMessage: null,
    }
  }

  // Step 2: Relax pricing — "gratis" should include "freemium"
  if (pricing === 'gratis') {
    candidates = applyFilters(tools, { category, difficulty, pricing: 'gratis_or_freemium' })
    if (candidates.length >= 3) {
      return {
        tools: scoreAndRank(candidates, { category, useCase, context }),
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
        tools: scoreAndRank(candidates, { category, useCase, context }),
        relaxed: true,
        relaxedMessage: 'Ampliamos el nivel de dificultad para incluir más opciones útiles.',
      }
    }
  }

  // Step 4: Relax pricing completely
  if (pricing && pricing !== 'any') {
    const relaxedDifficulty = difficulty ? Math.min(difficulty + 1, 3) : null
    candidates = applyFilters(tools, { category, difficulty: relaxedDifficulty, pricing: 'any' })
    if (candidates.length >= 2) {
      return {
        tools: scoreAndRank(candidates, { category, useCase, context }),
        relaxed: true,
        relaxedMessage: 'Mostramos herramientas de todos los precios en esta categoría.',
      }
    }
  }

  // Step 5: Just category
  candidates = applyFilters(tools, { category, difficulty: null, pricing: 'any' })
  if (candidates.length > 0) {
    return {
      tools: scoreAndRank(candidates, { category, useCase, context }),
      relaxed: true,
      relaxedMessage: 'Mostramos las mejores herramientas de esta categoría sin filtros adicionales.',
    }
  }

  // Step 6: Absolute fallback
  return {
    tools: scoreAndRank(tools, { category, useCase, context }).slice(0, 5),
    relaxed: true,
    relaxedMessage: 'No hay herramientas específicas para esa combinación. Te mostramos las más populares en general.',
  }
}

/**
 * Multi-factor scoring system.
 * Scores each tool on a 0-100 scale and returns top 5 sorted by score.
 */
function scoreAndRank(candidates, { category, useCase, context }) {
  const scored = candidates.map((tool) => {
    let score = 0

    // Factor 1: Use case match (0-40 points)
    if (useCase && tool.useCaseIds) {
      if (tool.useCaseIds.includes(useCase)) {
        score += 40
      } else {
        // Fuzzy match with matchTerms
        const useCaseInfo = getUseCaseById(useCase)
        if (useCaseInfo) {
          const toolText = [
            ...(tool.keywords || []),
            ...(tool.useCases || []),
            tool.shortDescription || '',
          ].join(' ').toLowerCase()
          const matchCount = useCaseInfo.matchTerms.filter((term) =>
            toolText.includes(term.toLowerCase())
          ).length
          score += Math.min(matchCount * 10, 30)
        }
      }
    }

    // Factor 2: Rating (0-25 points)
    score += (tool.rating / 5) * 25

    // Factor 3: Category specificity (0-15 points)
    if (category && tool.categories) {
      if (tool.categories[0] === category) {
        score += 15 // Primary category
      } else if (tool.categories.includes(category)) {
        score += 8 // Secondary category
      }
    }

    // Factor 4: Documentation richness (0-10 points)
    const useCaseCount = (tool.useCases || []).length
    const keywordCount = (tool.keywords || []).length
    score += Math.min((useCaseCount + keywordCount) / 3, 10)

    // Factor 5: Context match (0-10 points)
    if (context && tool.keywords) {
      const contextTerms = {
        youtube: ['video', 'crear', 'clip', 'editar'],
        redes: ['social', 'reel', 'tiktok', 'post', 'corto'],
        profesional: ['empresa', 'corporativo', 'profesional', 'equipo'],
        educativo: ['educacion', 'curso', 'aprender', 'tutorial'],
        personal: ['personal', 'facil', 'simple', 'gratis'],
        equipo: ['equipo', 'colaborar', 'empresa', 'compartir'],
        academico: ['academico', 'universidad', 'investigar', 'paper'],
        freelance: ['freelance', 'cliente', 'proyecto', 'profesional'],
        vscode: ['VS Code', 'editor', 'IDE', 'extension'],
        navegador: ['navegador', 'online', 'web', 'nube'],
        terminal: ['terminal', 'CLI', 'linea de comandos'],
        nocode: ['sin codigo', 'no-code', 'visual', 'arrastrar'],
        raster: ['imagen', 'PNG', 'JPG', 'foto', 'generar'],
        vector: ['vector', 'SVG', 'icono', 'logo'],
        edicion: ['editar', 'retocar', 'fondo', 'mejorar'],
        plantillas: ['plantilla', 'template', 'listo', 'rapido'],
        excel: ['excel', 'hoja de calculo', 'CSV', 'spreadsheet'],
        database: ['SQL', 'base de datos', 'query'],
        texto: ['texto', 'NLP', 'sentimiento', 'encuesta'],
        metricas: ['metrica', 'KPI', 'dashboard', 'negocio'],
      }
      const terms = contextTerms[context] || []
      const toolKeywords = tool.keywords.join(' ').toLowerCase()
      const contextMatch = terms.filter((t) => toolKeywords.includes(t.toLowerCase())).length
      score += Math.min(contextMatch * 3, 10)
    }

    return { tool, score }
  })

  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, 5).map((s) => s.tool)
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
  return [...tools].sort((a, b) => b.rating - a.rating).slice(0, limit)
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
