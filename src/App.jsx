import { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Compare from './pages/Compare'
import About from './pages/About'
import ToolDetailPage from './pages/ToolDetailPage'
import RecommendPage from './pages/RecommendPage'
import PromptRefiner from './pages/PromptRefiner'
import NotFound from './pages/NotFound'
import { useFavorites } from './hooks/useFavorites'

const SectorPublico = lazy(() => import('./pages/SectorPublico'))
const Docentes = lazy(() => import('./pages/Docentes'))
const HerramientasAsiaticas = lazy(() => import('./pages/HerramientasAsiaticas'))

function ChapterFallback() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20" aria-label="Cargando capítulo">
      <div className="skeleton h-6 w-36 mx-auto mb-6" />
      <div className="skeleton h-14 max-w-2xl mx-auto mb-4" />
      <div className="skeleton h-5 max-w-xl mx-auto mb-12" />
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="skeleton h-28" />
        <div className="skeleton h-28" />
        <div className="skeleton h-28" />
      </div>
    </div>
  )
}

export default function App() {
  const [compareIds, setCompareIds] = useState([])
  const { favorites, toggle: toggleFavorite, isFavorite } = useFavorites()

  const handleCompare = (toolId) => {
    setCompareIds((prev) => {
      if (prev.includes(toolId)) {
        return prev.filter((id) => id !== toolId)
      }
      if (prev.length >= 3) return prev
      return [...prev, toolId]
    })
  }

  const handleRemoveCompare = (toolId) => {
    setCompareIds((prev) => prev.filter((id) => id !== toolId))
  }

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<Home onCompare={handleCompare} compareIds={compareIds} favorites={favorites} onToggleFavorite={toggleFavorite} isFavorite={isFavorite} />}
          />
          <Route
            path="/explorar"
            element={
              <Explore onCompare={handleCompare} compareIds={compareIds} onToggleFavorite={toggleFavorite} isFavorite={isFavorite} />
            }
          />
          <Route
            path="/comparar"
            element={
              <Compare compareIds={compareIds} onRemove={handleRemoveCompare} />
            }
          />
          <Route path="/acerca" element={<About />} />
          <Route path="/herramienta/:id" element={<ToolDetailPage onToggleFavorite={toggleFavorite} isFavorite={isFavorite} />} />
          <Route path="/recomendador" element={<RecommendPage />} />
          <Route path="/prompt-lab" element={<PromptRefiner />} />
          <Route path="/sector-publico" element={<Suspense fallback={<ChapterFallback />}><SectorPublico /></Suspense>} />
          <Route path="/docentes" element={<Suspense fallback={<ChapterFallback />}><Docentes /></Suspense>} />
          <Route path="/asia" element={<Suspense fallback={<ChapterFallback />}><HerramientasAsiaticas /></Suspense>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
