import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import faviconUrl from './assets/icon_mint.png'
import App from './App.jsx'
import { RouteFallback } from './components/RouteFallback.jsx'

const Works = lazy(() => import('./components/Works.jsx'))

{
  const ensureLink = (rel) => {
    let link = document.querySelector(`link[rel="${rel}"]`)
    if (!link) {
      link = document.createElement('link')
      link.rel = rel
      document.head.appendChild(link)
    }
    link.type = 'image/png'
    link.href = faviconUrl
  }
  ensureLink('icon')
  ensureLink('apple-touch-icon')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/works" element={<Works />} />
        </Routes>
      </Suspense>
    </Router>
  </StrictMode>,
)
