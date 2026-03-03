import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'
import tools from '../data/tools.json'
import { processQuery } from '../utils/queryProcessor'

const fuse = new Fuse(tools, {
  keys: [
    { name: 'keywords', weight: 0.35 },
    { name: 'shortDescription', weight: 0.2 },
    { name: 'useCases', weight: 0.2 },
    { name: 'name', weight: 0.1 },
    { name: 'tags', weight: 0.1 },
    { name: 'fullDescription', weight: 0.05 },
  ],
  threshold: 0.45,
  ignoreLocation: true,
  includeScore: true,
  minMatchCharLength: 2,
})

export function useSearch() {
  const [query, setQuery] = useState('')
  const [overrides, setOverrides] = useState(null)

  const { results, meta } = useMemo(() => {
    const trimmed = query.trim()
    if (!trimmed) return { results: [], meta: null }

    // Pre-process the query
    const processed = processQuery(trimmed)
    const currentOverrides = overrides || {}

    // Apply overrides (when user removes a chip)
    const activeCategories = currentOverrides.skipCategories
      ? processed.detectedCategories.filter((c) => !currentOverrides.skipCategories.includes(c))
      : processed.detectedCategories
    const activePricing = currentOverrides.skipPricing ? null : processed.pricingHint
    const activeDifficulty = currentOverrides.skipDifficulty ? null : processed.difficultyHint

    // Primary search with cleaned query
    const primaryResults = fuse.search(processed.cleanedQuery)

    // Additional searches with expanded terms
    const expandedResults = []
    for (const term of processed.expandedTerms.slice(0, 3)) {
      const termResults = fuse.search(term)
      for (const r of termResults) {
        if (!primaryResults.some((p) => p.item.id === r.item.id) &&
            !expandedResults.some((e) => e.item.id === r.item.id)) {
          expandedResults.push({ ...r, score: (r.score || 0) + 0.15 })
        }
      }
    }

    // Merge and score
    let allResults = [...primaryResults, ...expandedResults]

    // Boost tools that match detected categories
    if (activeCategories.length > 0) {
      allResults = allResults.map((r) => {
        const matchesCategory = r.item.categories.some((c) => activeCategories.includes(c))
        return matchesCategory
          ? { ...r, score: (r.score || 0) * 0.7 }
          : r
      })
    }

    // Sort by score (lower is better in Fuse.js)
    allResults.sort((a, b) => (a.score || 0) - (b.score || 0))

    // Post-filter by pricing if detected
    if (activePricing) {
      const filtered = allResults.filter((r) => {
        if (activePricing === 'gratis') return r.item.pricing === 'gratis' || r.item.pricing === 'freemium'
        if (activePricing === 'pago') return r.item.pricing === 'pago'
        if (activePricing === 'freemium') return r.item.pricing === 'freemium'
        return true
      })
      if (filtered.length > 0) allResults = filtered
    }

    // Post-filter by difficulty if detected
    if (activeDifficulty) {
      const filtered = allResults.filter((r) => r.item.difficulty <= activeDifficulty)
      if (filtered.length > 0) allResults = filtered
    }

    return {
      results: allResults.map((r) => r.item),
      meta: {
        detectedCategories: activeCategories,
        pricingHint: activePricing,
        difficultyHint: activeDifficulty,
        hasStrongIntent: processed.hasStrongIntent,
        expandedTerms: processed.expandedTerms,
        cleanedQuery: processed.cleanedQuery,
      },
    }
  }, [query, overrides])

  const removeFilter = (type, value) => {
    setOverrides((prev) => {
      const next = { ...(prev || {}) }
      if (type === 'category') {
        next.skipCategories = [...(next.skipCategories || []), value]
      } else if (type === 'pricing') {
        next.skipPricing = true
      } else if (type === 'difficulty') {
        next.skipDifficulty = true
      }
      return next
    })
  }

  const handleSetQuery = (newQuery) => {
    setQuery(newQuery)
    setOverrides(null) // Reset overrides when query changes
  }

  return { query, setQuery: handleSetQuery, results, meta, removeFilter }
}
