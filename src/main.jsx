import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import faviconUrl from './assets/mini_fav.png'
import App from './App.jsx'
import Works from './components/Works.jsx'
import MediaKit from './components/MediaKit.jsx'

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
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/works" element={<Works />} />
        <Route path="/media-kit" element={<MediaKit />} />
      </Routes>
    </Router>
  </StrictMode>,
)
