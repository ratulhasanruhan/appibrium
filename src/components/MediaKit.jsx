import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import {
  ArrowLeft,
  Download,
  Image as ImageIcon,
  Palette,
  Mail,
  CheckCircle,
  CircleSlash,
  Sun,
  Moon
} from 'lucide-react'
import logoText from '../assets/txt_b.png'
import logoWhite from '../assets/twx_wh.png'
import miniFav from '../assets/mini_fav.png'
import '../App.css'

const brandColors = [
  { name: 'Appibrium Teal', hex: '#1DD1A1' },
  { name: 'Light Teal', hex: '#4FD1C7' },
  { name: 'Dark Gray', hex: '#2D3748' },
  { name: 'Muted Gray', hex: '#718096' }
]

const dos = [
  'Use approved logo files from this page; do not recreate or redraw the mark.',
  'Keep clear space around the logo or icon equal to at least one cap height of the wordmark.',
  'Place the logo on solid backgrounds with sufficient contrast.',
  'Attribute “Appibrium” when describing the company in articles or listings.'
]

const donts = [
  'Stretch, skew, rotate, or add effects (shadows, outlines) to the logo.',
  'Change logo colors outside the provided assets or brand palette.',
  'Place the logo on busy imagery where it is hard to read.',
  'Imply endorsement or partnership without written permission.'
]

function MediaKit() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDarkMode(true)
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const goToHome = () => {
    window.location.href = '/'
  }

  const goToContact = () => {
    navigate('/#contact')
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${isDarkMode ? 'dark' : ''}`}>
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4 min-w-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={goToHome}
                className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 shrink-0"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Home</span>
              </Button>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 shrink-0" />
              <img
                src={isDarkMode ? logoWhite : logoText}
                alt="Appibrium"
                className="h-8"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={toggleDarkMode} variant="ghost" size="sm" aria-label="Toggle theme">
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Badge variant="outline" className="text-primary border-primary hidden sm:inline-flex">
                Press & media
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Media Kit
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4 max-w-3xl mx-auto">
            Logos, colors, and guidelines for journalists, partners, and event organizers covering Appibrium.
          </p>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-sm">
            Questions? Email{' '}
            <a href="mailto:hello@appibrium.tech" className="text-primary hover:underline">
              hello@appibrium.tech
            </a>
            {' '}with “Media” in the subject line.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
            <ImageIcon className="w-7 h-7 text-primary" />
            Logos & imagery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="overflow-hidden">
              <div className="bg-white p-10 flex items-center justify-center min-h-[180px] border-b border-gray-100">
                <img src={logoText} alt="Appibrium logo for light backgrounds" className="max-h-16 w-auto" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">Logo — light background</CardTitle>
                <CardDescription>
                  Use on white or very light surfaces. PNG with transparency.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <a href={logoText} download="appibrium-logo-light.png">
                    <Download className="w-4 h-4 mr-2" />
                    Download PNG
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="bg-gray-900 p-10 flex items-center justify-center min-h-[180px] border-b border-gray-800">
                <img src={logoWhite} alt="Appibrium logo for dark backgrounds" className="max-h-16 w-auto" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">Logo — dark background</CardTitle>
                <CardDescription>
                  Use on dark UI, slides, or colored panels. PNG with transparency.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <a href={logoWhite} download="appibrium-logo-dark.png">
                    <Download className="w-4 h-4 mr-2" />
                    Download PNG
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="bg-white dark:bg-gray-950 p-10 flex items-center justify-center min-h-[180px] border-b border-gray-100 dark:border-gray-800">
                <img
                  src={miniFav}
                  alt="Appibrium app icon"
                  className="w-24 h-24 object-contain"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">App icon / favicon</CardTitle>
                <CardDescription>
                  Square mark for favicons, app listings, and small UI slots. Same asset used for the site tab icon.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <a href={miniFav} download="appibrium-mini-fav.png">
                    <Download className="w-4 h-4 mr-2" />
                    Download PNG
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
            <Palette className="w-7 h-7 text-primary" />
            Brand colors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {brandColors.map((c) => (
              <div
                key={c.hex}
                className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-card"
              >
                <div
                  className="h-24 w-full"
                  style={{ backgroundColor: c.hex }}
                />
                <div className="p-4">
                  <p className="font-medium text-gray-900 dark:text-white">{c.name}</p>
                  <p className="text-sm text-muted-foreground font-mono">{c.hex}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
            Primary UI tokens also use CSS variables such as <code className="text-xs bg-muted px-1 rounded">--primary</code> in our web apps; the hex values above are the canonical marketing palette.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Usage guidelines
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-green-700 dark:text-green-400">Do</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {dos.map((line) => (
                  <div key={line} className="flex gap-3 text-gray-600 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span>{line}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-red-700 dark:text-red-400">Don&apos;t</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {donts.map((line) => (
                  <div key={line} className="flex gap-3 text-gray-600 dark:text-gray-300">
                    <CircleSlash className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <span>{line}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100 dark:bg-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <Mail className="w-10 h-10 text-primary mx-auto mb-2" />
              <CardTitle>Press contact</CardTitle>
              <CardDescription>
                Interview requests, high-resolution assets, or clarifications on this kit.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild>
                <a href="mailto:hello@appibrium.tech?subject=Media%20inquiry">
                  hello@appibrium.tech
                </a>
              </Button>
              <Button variant="outline" onClick={goToContact}>
                Contact form
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src={logoWhite} alt="Appibrium" className="h-12 mx-auto mb-4" />
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Appibrium. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default MediaKit
