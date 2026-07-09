import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ExternalLink,
  Search,
  Code,
  Globe,
  Smartphone,
  Brain,
  GraduationCap,
  Heart,
  Building2,
  Users,
  Monitor,
  ArrowRight
} from 'lucide-react'
import projectsData from '../lib/projects.json'

const categoryIcons = {
  "AI/IoT Solution": <Brain className="w-5 h-5" />,
  "Educational Technology": <GraduationCap className="w-5 h-5" />,
  "AI/ML Solution": <Brain className="w-5 h-5" />,
  "Healthcare Technology": <Heart className="w-5 h-5" />,
  "Educational Management": <Building2 className="w-5 h-5" />,
  "Digital Learning Platform": <Monitor className="w-5 h-5" />,
  "Business Solution": <Building2 className="w-5 h-5" />,
  "Personal Branding": <Users className="w-5 h-5" />,
  "Social Platform": <Globe className="w-5 h-5" />
}

export default function Works() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredProjects, setFilteredProjects] = useState(projectsData)
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Our Works & Portfolio | Appibrium'
    window.scrollTo({ top: 0 })
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
    navigate('/')
  }

  const goToContact = () => {
    navigate('/#contact')
  }

  return (
    <div className="app-root works-page-root">
      {/* Editorial Decorative Grid Lines */}
      <div className="layout-grid-lines" aria-hidden="true">
        <div className="line-vert" />
        <div className="line-vert" />
        <div className="line-vert" />
      </div>

      {/* Header */}
      <header className="main-header scrolled" role="banner">
        <div className="nav-inner">
          <div className="flex items-center space-x-4" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              onClick={goToHome}
              className="btn btn-outline"
              style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>
            <div style={{ width: '1px', height: '24px', background: 'var(--light-border)' }} />
            <a href="/" aria-label="Appibrium - Home">
              <img 
                src="/logos/lockup/lockup_w4_light.svg" 
                alt="Appibrium" 
                height={32}
                style={{ height: '32px', width: 'auto' }}
              />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="section" style={{ padding: '5rem 0 3rem' }}>
        <div className="section-container">
          <div className="section-header" style={{ marginBottom: '2.5rem' }}>
            <span className="section-tag">PORTFOLIO</span>
            <h1 className="section-title">Our Works</h1>
            <p className="section-desc">
              Explore our portfolio of innovative engineering solutions. 
              From AI-powered platforms to connected IoT devices, discover how we build scalable systems.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-6" style={{ background: 'var(--snow)', borderTop: '1px solid var(--light-border)', borderBottom: '1px solid var(--light-border)', position: 'relative', zIndex: '2' }}>
        <div className="section-container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Search */}
            <div style={{ position: 'relative', flex: '1', maxWidth: '400px', minWidth: '260px' }}>
              <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--grey-text)', opacity: '0.7' }} />
              <input
                type="text"
                placeholder="Search projects by name or technology..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.75rem' }}
              />
            </div>

            {/* Category Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Filter:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-input form-select"
                style={{ width: '220px', padding: '0.6rem 2.5rem 0.6rem 1rem' }}
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
      <section className="section" style={{ padding: '4rem 0' }}>
        <div className="section-container">
          {filteredProjects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 0' }}>
              <Code size={48} style={{ margin: '0 auto 1.5rem', color: 'var(--grey-text)', opacity: '0.4' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.5rem' }}>No projects found</h3>
              <p className="section-desc" style={{ margin: '0 auto' }}>Try adjusting your search query or filter choice.</p>
            </div>
          ) : (
            <div className="portfolio-grid">
              {filteredProjects.map((project, index) => (
                <article key={index} className="portfolio-card">
                  <div className="portfolio-img">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="portfolio-placeholder">
                        {categoryIcons[project.category] || <Code size={32} />}
                      </div>
                    )}
                    <span className="portfolio-cat">{project.category}</span>
                  </div>

                  <div className="portfolio-info">
                    <h3>{project.title}</h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--grey-text)', lineHeight: '1.6', minHeight: '4.8rem' }}>
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="portfolio-tags" style={{ margin: '0.5rem 0 1rem' }}>
                      {project.technologies.slice(0, 4).map((tech, techIndex) => (
                        <span key={techIndex} className="ptag">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="ptag">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Action Button */}
                    {project.link && project.link !== "#" && (
                      <button 
                        onClick={() => window.open(project.link, '_blank')}
                        className="btn btn-outline"
                        style={{ width: '100%', justifyContent: 'center' }}
                      >
                        View Project
                        <ExternalLink size={14} />
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section--alt" style={{ textAlign: 'center' }}>
        <div className="section-container" style={{ maxWidth: '640px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem' }}>
            Ready to start a project?
          </h2>
          <p className="section-desc" style={{ margin: '0 auto 2rem' }}>
            Let's discuss how we can engineer your ideas into powerful, future-ready software and hardware systems.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={goToContact}>
              Contact Us
              <ArrowRight size={16} />
            </button>
            <button className="btn btn-outline" onClick={goToHome}>
              Back to Home
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="main-footer" role="contentinfo">
        <div className="section-container" style={{ textAlign: 'center', paddingBottom: '3rem' }}>
          <img 
            src="/logos/wordmark/wordmark_notag_dark.svg" 
            alt="Appibrium" 
            height={36} 
            style={{ height: '36px', width: 'auto', margin: '0 auto 1.5rem' }} 
            loading="lazy" 
          />
          <p style={{ fontSize: '0.85rem', color: 'var(--grey-text)' }}>
            &copy; {new Date().getFullYear()} Appibrium Technology Co. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
