import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Layout from './components/Layout'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Compare from './pages/Compare'
import About from './pages/About'
import ToolDetailPage from './pages/ToolDetailPage'
import RecommendPage from './pages/RecommendPage'
import PromptRefiner from './pages/PromptRefiner'

export default function App() {
  const [compareIds, setCompareIds] = useState([])

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
            element={<Home onCompare={handleCompare} compareIds={compareIds} />}
          />
          <Route
            path="/explorar"
            element={
              <Explore onCompare={handleCompare} compareIds={compareIds} />
            }
          />
          <Route
            path="/comparar"
            element={
              <Compare compareIds={compareIds} onRemove={handleRemoveCompare} />
            }
          />
          <Route path="/acerca" element={<About />} />
          <Route path="/herramienta/:id" element={<ToolDetailPage />} />
          <Route path="/recomendador" element={<RecommendPage />} />
          <Route path="/prompt-lab" element={<PromptRefiner />} />
        </Routes>
      </Layout>
      <Analytics />
    </BrowserRouter>
  )
}
