import { getUseCaseById } from '../data/useCaseOptions'
import { getCategoryInfo } from './recommender'

const pricingLabels = {
  gratis: 'Gratis',
  freemium: 'Freemium',
  pago: 'De pago',
}

const difficultyLabels = {
  1: 'Muy fácil de usar',
  2: 'Dificultad media',
  3: 'Para usuarios avanzados',
}

/**
 * Generates a short reason string explaining why a tool is recommended.
 * Example: "Ideal para crear clips cortos — Gratis — Muy fácil de usar"
 */
export function getMatchReason(tool, { useCase, category, context } = {}) {
  const parts = []

  // Use case match
  if (useCase && tool.useCaseIds) {
    const useCaseInfo = getUseCaseById(useCase)
    if (useCaseInfo && tool.useCaseIds.includes(useCase)) {
      parts.push(`Ideal para ${useCaseInfo.label.toLowerCase()}`)
    } else if (tool.bestFor) {
      parts.push(tool.bestFor)
    }
  } else if (tool.bestFor) {
    parts.push(tool.bestFor)
  }

  // Pricing
  if (tool.pricing) {
    parts.push(pricingLabels[tool.pricing] || tool.pricing)
  }

  // Difficulty
  if (tool.difficulty) {
    parts.push(difficultyLabels[tool.difficulty] || `Nivel ${tool.difficulty}`)
  }

  return parts.join(' — ')
}

/**
 * Generate match reasons for a list of tools
 */
export function getMatchReasons(tools, filters = {}) {
  return tools.map((tool) => ({
    tool,
    reason: getMatchReason(tool, filters),
  }))
}
