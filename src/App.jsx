import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Layout from './components/Layout'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Compare from './pages/Compare'
import About from './pages/About'
import ToolDetailPage from './pages/ToolDetailPage'
import RecommendPage from './pages/RecommendPage'
const PromptRefiner = lazy(() => import('./pages/PromptRefiner'))
import NotFound from './pages/NotFound'
import { useFavorites } from './hooks/useFavorites'
import { useCompare } from './hooks/useCompare'
import CompareDock from './components/CompareDock'
import Examples from './pages/Examples'

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
  const {
    ids: compareIds,
    toggle: handleCompare,
    remove: handleRemoveCompare,
    message,
  } = useCompare()
  const { favorites, toggle: toggleFavorite, isFavorite } = useFavorites()

  return (
    <BrowserRouter>
      <Layout hasCompare={compareIds.length > 0}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onCompare={handleCompare}
                compareIds={compareIds}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            }
          />
          <Route
            path="/explorar"
            element={
              <Explore
                onCompare={handleCompare}
                compareIds={compareIds}
                onToggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            }
          />
          <Route
            path="/comparar"
            element={<Compare compareIds={compareIds} onRemove={handleRemoveCompare} />}
          />
          <Route path="/acerca" element={<About />} />
          <Route path="/ejemplos" element={<Examples />} />
          <Route
            path="/herramienta/:id"
            element={<ToolDetailPage onToggleFavorite={toggleFavorite} isFavorite={isFavorite} />}
          />
          <Route path="/recomendador" element={<RecommendPage />} />
          <Route
            path="/prompt-lab"
            element={
              <Suspense fallback={<ChapterFallback />}>
                <PromptRefiner />
              </Suspense>
            }
          />
          <Route
            path="/sector-publico"
            element={
              <Suspense fallback={<ChapterFallback />}>
                <SectorPublico />
              </Suspense>
            }
          />
          <Route
            path="/docentes"
            element={
              <Suspense fallback={<ChapterFallback />}>
                <Docentes />
              </Suspense>
            }
          />
          <Route
            path="/asia"
            element={
              <Suspense fallback={<ChapterFallback />}>
                <HerramientasAsiaticas />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <CompareDock ids={compareIds} onRemove={handleRemoveCompare} message={message} />
      <Analytics />
    </BrowserRouter>
  )
}
