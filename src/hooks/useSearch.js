import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'
import tools from '../data/tools.json'

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

  const results = useMemo(() => {
    const trimmed = query.trim()
    if (!trimmed) return []
    return fuse.search(trimmed).map((result) => result.item)
  }, [query])

  return { query, setQuery, results }
}
