import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'
import tools from '../data/tools.json'

const fuse = new Fuse(tools, {
  keys: [
    { name: 'keywords', weight: 0.4 },
    { name: 'shortDescription', weight: 0.2 },
    { name: 'useCases', weight: 0.2 },
    { name: 'name', weight: 0.1 },
    { name: 'tags', weight: 0.1 },
  ],
  threshold: 0.4,
  includeScore: true,
})

export function useSearch() {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    if (!query.trim()) return []
    return fuse.search(query).map((result) => result.item)
  }, [query])

  return { query, setQuery, results }
}
