import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import {
  ArrowLeft,
  ExternalLink,
  Filter,
  Search,
  Code,
  Globe,
  Smartphone,
  Brain,
  GraduationCap,
  Heart,
  Building2,
  Users,
  Monitor
} from 'lucide-react'
import { Input } from '@/components/ui/input.jsx'
import projectsData from '../lib/projects.json'
import logoText from '../assets/txt_b.png'
import logoWhite from '../assets/twx_wh.png'

const categoryIcons = {
  "AI/IoT Solution": <Brain className="w-6 h-6" />,
  "Educational Technology": <GraduationCap className="w-6 h-6" />,
  "AI/ML Solution": <Brain className="w-6 h-6" />,
  "Healthcare Technology": <Heart className="w-6 h-6" />,
  "Educational Management": <Building2 className="w-6 h-6" />,
  "Digital Learning Platform": <Monitor className="w-6 h-6" />,
  "Business Solution": <Building2 className="w-6 h-6" />,
  "Personal Branding": <Users className="w-6 h-6" />,
  "Social Platform": <Globe className="w-6 h-6" />
}

function Works() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredProjects, setFilteredProjects] = useState(projectsData)

    const navigate = useNavigate()

  useEffect(() => {
    // Check for dark mode preference
    if (document.documentElement.classList.contains('dark')) {
      setIsDarkMode(true)
    }
  }, [])

  useEffect(() => {
    let filtered = projectsData

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(project => project.category === selectedCategory)
    }

    setFilteredProjects(filtered)
  }, [searchTerm, selectedCategory])

  const categories = ['All', ...new Set(projectsData.map(project => project.category))]

  const goToHome = () => {
    window.location.href = '/'
  }

    const goToContact = () => {
      navigate('/#contact')
    }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${isDarkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={goToHome}
                className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Button>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
              <img 
                src={isDarkMode ? logoWhite : logoText} 
                alt="Appibrium" 
                className="h-8" 
              />
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-primary border-primary">
                {filteredProjects.length} Projects
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Works
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore our portfolio of innovative software solutions across various industries. 
            From AI-powered applications to educational platforms, discover how we transform ideas into reality.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No projects found
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 group overflow-hidden p-0">
                  <div className="relative">
                    {/* Project Image */}
                    <div className="w-full h-56 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          {categoryIcons[project.category] || <Code className="w-16 h-16 text-primary/60" />}
                        </div>
                      )}
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-primary text-white border-0 font-medium">
                        {project.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-base text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.technologies.length - 4} more
                        </Badge>
                      )}
                    </div>

                    {/* Action Button */}
                    {project.link && project.link !== "#" && (
                      <Button 
                        onClick={() => window.open(project.link, '_blank')}
                        className="w-full group"
                        variant="outline"
                      >
                        View Project
                        <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help transform your ideas into powerful software solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={goToHome}>
              Get Started
            </Button>
            <Button size="lg" variant="outline" onClick={goToContact}>
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src={logoWhite} alt="Appibrium" className="h-12 mx-auto mb-4" />
          <p className="text-gray-400">
            &copy; 2025 Appibrium. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Works
