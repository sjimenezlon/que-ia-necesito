import tools from '../data/tools.json'

export function getRecommendations({ category, difficulty, pricing }) {
  let candidates = tools

  if (category) {
    candidates = candidates.filter((t) => t.categories.includes(category))
  }

  if (difficulty) {
    candidates = candidates.filter((t) => t.difficulty <= difficulty)
  }

  if (pricing && pricing !== 'any') {
    candidates = candidates.filter((t) => t.pricing === pricing)
  }

  candidates.sort((a, b) => b.rating - a.rating)

  return candidates.slice(0, 5)
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
