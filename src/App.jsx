import projectsData from './lib/projects.json'
import { useState, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Menu, X, Mail, MapPin, Phone,
  Linkedin, Facebook, Youtube, Github, Play,
  BrainCircuit, Code, Cloud, Cpu, Wifi, Layers,
  ChevronDown, Star, ExternalLink, CheckCircle,
  Zap, Database, Terminal, Smartphone, Globe,
  Clock, Award, Users, ShieldCheck, Check
} from 'lucide-react'
import appibriumBanner from './assets/social_cover.png'
import './App.css'

// ── Animation Variants ───────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.8, 0.25, 1], delay }
  })
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut', delay }
  })
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}

// ── Reusable animated section wrapper ────────────────────────────
function AnimSection({ children, className = '', delay = 0, once = true }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SectionTag({ children }) {
  return (
    <span className="section-tag">{children}</span>
  )
}

// ── Data ──────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: BrainCircuit,
    title: 'AI Engineering',
    desc: 'Designing intelligent systems and features that automate workflows, surface insights, and deliver exceptional user experiences through machine learning and applied AI.'
  },
  {
    icon: Code,
    title: 'Software Engineering',
    desc: 'Building scalable, reliable, and maintainable software — from backend APIs and microservices to full-stack platforms and cross-platform mobile applications.'
  },
  {
    icon: Cloud,
    title: 'Cloud Infrastructure',
    desc: 'Designing secure and scalable cloud infrastructure for modern digital products, featuring CI/CD pipelines, containerisation, and zero-downtime deployments.'
  },
  {
    icon: Cpu,
    title: 'Embedded Systems',
    desc: 'Designing and developing customized hardware systems and firmware tailored for industrial, consumer, and research applications.'
  },
  {
    icon: Wifi,
    title: 'Internet of Things (IoT)',
    desc: 'Creating smart, connected hardware solutions integrating sensors, devices, and real-time data streams — bridging the physical and digital worlds.'
  },
  {
    icon: Layers,
    title: 'Product Engineering',
    desc: 'Fusing research, design, and engineering to conceive, build, and launch end-to-end scalable digital products from the first idea to production.'
  },
  {
    icon: Zap,
    title: 'Research & Innovation',
    desc: 'Exploring next-generation technologies, conducting feasibility studies, and pioneering engineering methods to solve complex, novel challenges.'
  }
]

const PROCESS = [
  {
    num: '01',
    title: 'Discovery & Planning',
    desc: 'We analyze your requirements, conduct feasibility studies, and design the technical blueprint of the application.'
  },
  {
    num: '02',
    title: 'Design & Prototyping',
    desc: 'Our design team creates interactive mockups and custom design systems to validate layouts and user journeys.'
  },
  {
    num: '03',
    title: 'Development & Testing',
    desc: 'Using agile methodologies, we write scalable code backed by automated testing, continuous integration, and peer reviews.'
  },
  {
    num: '04',
    title: 'Deployment & Support',
    desc: 'We handle secure production releases, coordinate onboarding, and provide continuous support and updates.'
  }
]

const PRODUCTS = [
  {
    name: 'GoruSheba',
    category: 'AgriTech · AI & IoT',
    desc: "Bangladesh's first intelligent cattle management system powered by AI & IoT. Features cattle health tracking, photo-based weight estimation, and agricultural vet matching.",
    tags: ['Flutter', 'AI/ML', 'IoT', 'Python'],
    image: '/portfolio_images/gorusheba_banner.png',
    link: 'https://goru.help/'
  },
  {
    name: 'DokanMate',
    category: 'Business Solution',
    desc: 'In a world of overloaded POS apps, we chose simplicity. DokanMate brings essential inventory tracking, sales logging, and invoice generation tools to shop owners.',
    tags: ['Flutter', 'Node.js', 'MongoDB', 'AWS'],
    image: '/portfolio_images/dokanmate.png',
    link: 'https://www.facebook.com/dokanmate'
  },
  {
    name: 'Porichoy',
    category: 'Personal Branding',
    desc: 'Easy CV and web profile maker for every person. Minimise the time it takes to establish a professional digital presence with our automated resume platform.',
    tags: ['React', 'Node.js', 'MongoDB'],
    image: '/portfolio_images/porichoy_white.png',
    link: 'http://porichoy.me/'
  },
  {
    name: 'Datayon',
    category: 'Tech Media',
    desc: 'A Bengali tech magazine bringing tech news, stories, and practical insights for technology enthusiasts across Bangladesh.',
    tags: ['Bengali', 'Editorial', 'Insights'],
    image: '/portfolio_images/datayon.png',
    link: 'https://datayon.bd'
  }
]

const TESTIMONIALS = [
  {
    name: 'Partho Ranjan Mandol',
    role: 'CEO, EkartFood',
    content: 'Appibrium delivered an exceptional mobile app that exceeded our expectations. Their technical expertise and attention to detail are outstanding.',
    rating: 5
  },
  {
    name: 'Arif Hayder',
    role: 'UNO, Chatkhil Upazila',
    content: 'They built proper solutions for our local Upazila healthcare system. Their team was professional, responsive, and delivered on time.',
    rating: 5
  },
  {
    name: 'Md Ruhul Amin',
    role: 'Chairman, Amin Poultry',
    content: 'Appibrium transformed our operations with a customized software portal. Their support and responsiveness have been invaluable.',
    rating: 5
  }
]

const TECH_MARQUEE_1 = ['React', 'Node.js', 'Python', 'Flutter', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'TypeScript', 'Go', 'TensorFlow', 'Next.js']
const TECH_MARQUEE_2 = ['Swift', 'Kotlin', 'React Native', 'Firebase', 'MongoDB', 'Google Cloud', 'Azure', 'Rust', 'Redis', 'PyTorch', 'C / C++', 'Raspberry Pi']

// ── Main App Component ────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [formState, setFormState] = useState('idle') // idle | sending | success | error
  const [timeString, setTimeString] = useState('')
  const [selectedService, setSelectedService] = useState(0)
  const [portfolioFilter, setPortfolioFilter] = useState('All')
  const location = useLocation()

  // Live Dhaka Time Clock
  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }
      setTimeString(new Intl.DateTimeFormat('en-US', options).format(new Date()))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Header scroll tracking
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section tracking
  useEffect(() => {
    const ids = ['home', 'about', 'services', 'process', 'technologies', 'products', 'portfolio', 'testimonials', 'contact']
    const handler = () => {
      const pos = window.scrollY + 140
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Scroll to hash on route change
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace('#', ''))
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
    }
  }, [location])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  // Contact form submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormState('sending')
    try {
      const res = await fetch('https://formspree.io/f/mnnvewee', {
        method: 'POST',
        body: new FormData(e.target),
        headers: { Accept: 'application/json' }
      })
      if (res.ok) {
        setFormState('success')
        e.target.reset()
        setTimeout(() => setFormState('idle'), 8000)
      } else {
        throw new Error()
      }
    } catch {
      setFormState('error')
      setTimeout(() => setFormState('idle'), 6000)
    }
  }

  const NAV_LINKS = [
    { label: 'About', id: 'about', type: 'local' },
    { label: 'Services', id: 'services', type: 'local' },
    { label: 'Originals', id: 'products', type: 'local' },
    { label: 'Works', id: 'portfolio', type: 'local' },
    { label: 'Careers', url: 'https://careers.appibrium.com', type: 'external' },
    { label: 'Labs', url: 'https://labs.appibrium.com', type: 'external' }
  ]

  // Filter projects based on category
  const filteredProjects = portfolioFilter === 'All'
    ? projectsData.slice(0, 6)
    : projectsData.filter(p => p.category === portfolioFilter).slice(0, 6)

  const uniqueCategories = ['All', 'EdTech', 'Healthcare', 'E-commerce', 'AI/ML Solution']

  return (
    <div className="app-root">
      {/* Editorial Decorative Grid Lines */}
      <div className="layout-grid-lines" aria-hidden="true">
        <div className="line-vert" />
        <div className="line-vert" />
        <div className="line-vert" />
      </div>

      {/* Ambient background decoration */}
      <div className="ambient-bg" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
      </div>

      {/* ── HEADER ──────────────────────────────────────────────── */}
      <header id="main-header" className={`main-header${scrolled ? ' scrolled' : ''}`} role="banner">
        <div className="nav-inner">
          <a href="/" className="nav-logo" aria-label="Appibrium – Home">
            <img src="/logos/lockup/lockup_w4_light.svg" alt="Appibrium logo" width={175} height={38} />
          </a>

          <nav id="main-nav" role="navigation" aria-label="Main navigation" className={menuOpen ? 'open' : ''}>
            <ul role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  {link.type === 'local' ? (
                    <button
                      onClick={() => scrollTo(link.id)}
                      className={activeSection === link.id ? 'active' : ''}
                      aria-current={activeSection === link.id ? 'location' : undefined}
                    >
                      {link.label}
                    </button>
                  ) : link.type === 'route' ? (
                    <Link
                      to={link.url}
                      className="nav-works-link"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nav-works-link"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <button 
              className="btn btn-primary btn-sm nav-cta" 
              onClick={() => scrollTo('contact')}
            >
              Start a Project
            </button>
          </nav>

          <button
            id="menu-toggle-btn"
            className={`hamburger${menuOpen ? ' active' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            aria-controls="main-nav"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Mobile nav backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav-backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── HERO SECTION ────────────────────────────────────────── */}
      <section id="home" className="hero-section" aria-labelledby="hero-headline">
        <div className="grid-blueprint" aria-hidden="true" />

        <div className="hero-container">
          <motion.div
            className="hero-content"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeIn} custom={0.05} className="hero-badge" role="text">
              <span className="badge-pulse" aria-hidden="true" />
              Appibrium Technology Co. &nbsp;·&nbsp; Dhaka, BD
            </motion.div>

            <motion.h1 id="hero-headline" variants={fadeUp} custom={0.1}>
              We Engineer<br />
              <span className="text-mint">The Future.</span>
            </motion.h1>

            <motion.p className="hero-sub" variants={fadeUp} custom={0.18}>
              Appibrium designs, builds, and scales intelligent technologies across AI, software engineering, cloud infrastructure, embedded systems, and IoT — partnering with organisations worldwide to create future-ready solutions.
            </motion.p>

            <motion.div className="hero-ctas" variants={fadeUp} custom={0.26}>
              <a href="/works" className="btn btn-primary" id="hero-portfolio-btn">
                View Our Work
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <button className="btn btn-outline" onClick={() => scrollTo('contact')} id="hero-contact-btn">
                Start a Project
              </button>
            </motion.div>
          </motion.div>

          {/* Interactive Hero Visual Panel */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1], delay: 0.15 }}
            aria-hidden="true"
          >
            <div className="hero-card">
              <div className="card-blueprint-overlay" />
              <img src="/logos/icon/icon_mint.svg" alt="" width={80} height={80} className="hero-card-icon" />
              <p className="hero-card-tagline">Engineering the Future</p>
              
              {/* Live Dhaka Clock in Hero Panel */}
              <div className="hero-clock-box">
                <Clock size={12} />
                <span>Dhaka: {timeString || '...' }</span>
              </div>

              <div className="hero-pill">
                <span className="hero-pill-dot" />
                Active &amp; Building
              </div>
            </div>
            <div className="hero-float hero-float--1">
              <BrainCircuit size={14} />
              <span>AI Engineering</span>
            </div>
            <div className="hero-float hero-float--2">
              <Cloud size={14} />
              <span>Cloud &amp; IoT</span>
            </div>
            <div className="hero-float hero-float--3">
              <Code size={14} />
              <span>Software</span>
            </div>
          </motion.div>
        </div>

        <a href="#about" className="scroll-cue" aria-label="Scroll to About">
          <ChevronDown size={24} aria-hidden="true" />
        </a>
      </section>

      {/* ── STATS BAR ───────────────────────────────────────────── */}
      <div className="stats-bar" role="region" aria-label="Company statistics">
        <div className="stats-inner">
          {[
            { num: '2021', label: 'Est. Year' },
            { num: '7', label: 'Engineering Services' },
            { num: '50+', label: 'Projects Delivered' },
            { num: '4+', label: 'Original Products' }
          ].map((s, i) => (
            <div key={i} className="stat-item">
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT ───────────────────────────────────────────────── */}
      <section id="about" className="section" aria-labelledby="about-heading">
        <div className="section-container">
          <div className="about-grid">
            <AnimSection delay={0}>
              <div className="about-visual-card">
                <img src="/logos/lockup/lockup_light.svg" alt="Appibrium" width={130} height={36} />
                <div className="about-divider" aria-hidden="true" />
                <img
                  src={appibriumBanner}
                  alt="Appibrium team and workspace"
                  className="about-banner"
                  loading="lazy"
                />
                <p className="about-card-sub">Appibrium Technology Co.</p>
              </div>
            </AnimSection>

            <div className="about-content">
              <AnimSection delay={0.08}>
                <SectionTag>01 / WHO WE ARE</SectionTag>
                <h2 id="about-heading" className="section-title">About Appibrium</h2>
              </AnimSection>
              <AnimSection delay={0.14}>
                <p className="section-desc">Appibrium is an engineering-driven technology company building the next generation of intelligent systems. Our expertise spans AI engineering, software development, cloud infrastructure, embedded systems, IoT, and digital product engineering.</p>
                <p className="section-desc mt-4">We combine deep research, thoughtful design, and engineering precision to create scalable technologies that empower people, businesses, and communities — from Dhaka and beyond.</p>
              </AnimSection>

              <AnimSection delay={0.2}>
                <div className="mission-grid">
                  <div className="mission-card">
                    <h3>Our Mission</h3>
                    <p>To engineer meaningful technology that empowers people, businesses, and communities through intelligent, scalable, and reliable solutions.</p>
                  </div>
                  <div className="mission-card">
                    <h3>Our Vision</h3>
                    <p>To become a globally trusted engineering company shaping the future through innovation, research, and technology excellence.</p>
                  </div>
                </div>
              </AnimSection>

              <AnimSection delay={0.26}>
                <div className="about-stats">
                  {[
                    { num: '50+', label: 'Delivered' },
                    { num: '30+', label: 'Clients' },
                    { num: '5+', label: 'Years' },
                    { num: '24/7', label: 'Support' }
                  ].map((s, i) => (
                    <div key={i} className="about-stat">
                      <div className="about-stat-num">{s.num}</div>
                      <div className="about-stat-label">{s.label}</div>
                    </div>
                  ))}
                </div>
              </AnimSection>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES (WITH INTERACTIVE PREVIEW PANEL) ────────────── */}
      <section id="services" className="section section--alt" aria-labelledby="services-heading">
        <div className="section-container">
          <AnimSection delay={0}>
            <div className="section-header">
              <SectionTag>02 / WHAT WE DO</SectionTag>
              <h2 id="services-heading" className="section-title">Our Engineering Services</h2>
              <p className="section-desc">Comprehensive engineering capabilities built for the demands of modern technology — from intelligent AI systems to connected hardware solutions.</p>
            </div>
          </AnimSection>

          {/* Interactive tabs details console */}
          <div className="services-tabs-container">
            <div className="services-tabs-list">
              {SERVICES.map((svc, i) => (
                <button
                  key={i}
                  className={`svc-tab-btn ${selectedService === i ? 'active' : ''}`}
                  onClick={() => setSelectedService(i)}
                >
                  <svc.icon size={18} />
                  <span>{svc.title}</span>
                </button>
              ))}
            </div>
            
            <div className="services-tab-content">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedService}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.3 }}
                  className="svc-tab-pane"
                >
                  <div className="pane-icon-wrap">
                    {(() => {
                      const Icon = SERVICES[selectedService].icon
                      return <Icon size={36} />
                    })()}
                  </div>
                  <h3>{SERVICES[selectedService].title}</h3>
                  <p>{SERVICES[selectedService].desc}</p>
                  
                  <div className="pane-check-list">
                    <div className="pane-check-item">
                      <Check size={14} />
                      <span>Custom production scaling</span>
                    </div>
                    <div className="pane-check-item">
                      <Check size={14} />
                      <span>Security audit compliant</span>
                    </div>
                    <div className="pane-check-item">
                      <Check size={14} />
                      <span>Dedicated engineering sprints</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ─────────────────────────────────────────────── */}
      <section id="process" className="section" aria-labelledby="process-heading">
        <div className="section-container">
          <AnimSection delay={0}>
            <div className="section-header">
              <SectionTag>03 / METHODOLOGY</SectionTag>
              <h2 id="process-heading" className="section-title">How We Build</h2>
              <p className="section-desc">Our proven engineering methodology ensures clarity, continuous feedback, and reliable delivery — from first idea to scaled production system.</p>
            </div>
          </AnimSection>

          <div className="process-grid">
            {PROCESS.map((step, i) => (
              <AnimSection key={i} delay={i * 0.08} className="process-step">
                <div className="process-num" aria-label={`Step ${i + 1}`}>{step.num}</div>
                <div className="process-body">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH MARQUEE ────────────────────────────────────────── */}
      <section id="technologies" className="section section--alt" aria-labelledby="tech-heading">
        <div className="section-container">
          <AnimSection delay={0}>
            <div className="section-header">
              <SectionTag>04 / TECH STACK</SectionTag>
              <h2 id="tech-heading" className="section-title">Technologies We Master</h2>
              <p className="section-desc">Cutting-edge tools and frameworks powering our engineering across every domain — from web and mobile to cloud and embedded hardware.</p>
            </div>
          </AnimSection>
        </div>

        <AnimSection delay={0.05}>
          <div className="marquee-wrapper" aria-label="Technologies used by Appibrium">
            <div className="marquee-row">
              <div className="marquee-track">
                {[...TECH_MARQUEE_1, ...TECH_MARQUEE_1].map((t, i) => (
                  <div key={i} className="marquee-item" aria-hidden={i >= TECH_MARQUEE_1.length}><span>{t}</span></div>
                ))}
              </div>
            </div>
            <div className="marquee-row">
              <div className="marquee-track marquee-track--reverse">
                {[...TECH_MARQUEE_2, ...TECH_MARQUEE_2].map((t, i) => (
                  <div key={i} className="marquee-item" aria-hidden={i >= TECH_MARQUEE_2.length}><span>{t}</span></div>
                ))}
              </div>
            </div>
          </div>
        </AnimSection>

        <div className="section-container">
          <AnimSection delay={0.1}>
            <div className="tech-categories">
              {[
                { label: 'Frontend', tags: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Angular'] },
                { label: 'Backend', tags: ['Node.js', 'Python', 'Go', 'Rust', 'Java'] },
                { label: 'Mobile', tags: ['Flutter', 'React Native', 'Swift', 'Kotlin'] },
                { label: 'Cloud & DevOps', tags: ['AWS', 'GCP', 'Azure', 'Docker', 'K8s'] },
                { label: 'Embedded & IoT', tags: ['C / C++', 'Raspberry Pi', 'Arduino', 'RTOS'] }
              ].map((cat, i) => (
                <div key={i} className="tech-cat">
                  <h4>{cat.label}</h4>
                  <div className="tech-tags">
                    {cat.tags.map((t, j) => <span key={j} className="tech-tag">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ── ORIGINALS / PRODUCTS ────────────────────────────────── */}
      <section id="products" className="section" aria-labelledby="products-heading">
        <div className="section-container">
          <AnimSection delay={0}>
            <div className="section-header">
              <SectionTag>05 / APPIBRIUM ORIGINALS</SectionTag>
              <h2 id="products-heading" className="section-title">Products We Built</h2>
              <p className="section-desc">We don't just build for others — we build for the world. Here are the tools and solutions born inside Appibrium.</p>
            </div>
          </AnimSection>

          <motion.div
            className="products-grid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {PRODUCTS.map((p, i) => (
              <motion.article key={i} variants={fadeUp} custom={i * 0.08} className="product-card">
                <div className="product-img">
                  <img src={p.image} alt={`${p.name} — ${p.desc.slice(0, 60)}`} loading="lazy" decoding="async" />
                  <div className="product-overlay">
                    <div className="product-tags">
                      {p.tags.map((t, j) => <span key={j} className="ptag">{t}</span>)}
                    </div>
                  </div>
                </div>
                <div className="product-info">
                  <span className="product-cat">{p.category}</span>
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="product-link" aria-label={`Visit ${p.name}`}>
                    Learn More <ExternalLink size={14} aria-hidden="true" />
                  </a>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CLIENT PORTFOLIO (WITH CATEGORY FILTER TABS) ─────────── */}
      <section id="portfolio" className="section section--alt" aria-labelledby="portfolio-heading">
        <div className="section-container">
          <AnimSection delay={0}>
            <div className="section-header">
              <SectionTag>06 / CLIENT WORKS</SectionTag>
              <h2 id="portfolio-heading" className="section-title">Featured Projects</h2>
              <p className="section-desc">Showcasing our expertise through successful client solutions and innovative projects delivered across industries.</p>
            </div>
          </AnimSection>

          {/* Interactive filter controls */}
          <AnimSection delay={0.05} className="portfolio-filters-wrap">
            {uniqueCategories.map((cat) => (
              <button
                key={cat}
                className={`filter-tab-btn ${portfolioFilter === cat ? 'active' : ''}`}
                onClick={() => setPortfolioFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </AnimSection>

          {/* Portfolio grid with active animation layout */}
          <motion.div
            className="portfolio-grid"
            role="list"
            layout
            itemScope
            itemType="https://schema.org/ItemList"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.article
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                  className="portfolio-card"
                  role="listitem"
                  itemScope
                  itemType="https://schema.org/SoftwareApplication"
                  itemProp="itemListElement"
                >
                  <div className="portfolio-img">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        itemProp="image"
                      />
                    ) : (
                      <div className="portfolio-placeholder" aria-hidden="true">
                        <Code size={32} />
                      </div>
                    )}
                    <span className="portfolio-cat" itemProp="applicationCategory">{project.category}</span>
                  </div>
                  <div className="portfolio-info">
                    <h3 itemProp="name">{project.title}</h3>
                    <p itemProp="description">{project.description}</p>
                    <meta itemProp="url" content={project.link} />
                    <div className="portfolio-tags">
                      {project.technologies.slice(0, 3).map((t, j) => <span key={j} className="ptag">{t}</span>)}
                      {project.technologies.length > 3 && <span className="ptag">+{project.technologies.length - 3}</span>}
                    </div>
                    {project.link && project.link !== '#' && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="portfolio-link">
                        View Project <ArrowRight size={14} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          <AnimSection delay={0.1}>
            <div className="view-all-wrap">
              <a href="/works" className="btn btn-outline view-all-btn">
                View All Works
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────── */}
      <section id="testimonials" className="section" aria-labelledby="testimonials-heading">
        <div className="section-container">
          <AnimSection delay={0}>
            <div className="section-header">
              <SectionTag>07 / CLIENT VOICES</SectionTag>
              <h2 id="testimonials-heading" className="section-title">What Our Clients Say</h2>
              <p className="section-desc">Trusted by businesses and organisations for exceptional software solutions and reliable engineering partnerships.</p>
            </div>
          </AnimSection>

          <motion.div
            className="testimonials-grid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i} variants={fadeUp} custom={i * 0.08} className="testimonial-card">
                <div className="testimonial-stars" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={15} fill="currentColor" aria-hidden="true" />
                  ))}
                </div>
                <blockquote>
                  <p>"{t.content}"</p>
                </blockquote>
                <footer>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </footer>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────── */}
      <section id="contact" className="section section--alt" aria-labelledby="contact-heading">
        <div className="section-container">
          <AnimSection delay={0}>
            <div className="section-header">
              <SectionTag>08 / GET IN TOUCH</SectionTag>
              <h2 id="contact-heading" className="section-title">Start a Project with Us</h2>
              <p className="section-desc">Have an idea? Let's engineer it together. Our team is ready to transform your vision into a future-ready, scalable solution.</p>
            </div>
          </AnimSection>

          <div className="contact-grid">
            {/* Info Column */}
            <AnimSection delay={0.05} className="contact-info">
              <h3>Get in Touch</h3>
              <p>Whether you have a detailed specification or just an early idea, we're here to listen, advise, and build something great together.</p>

              <div className="contact-methods" role="list">
                <div className="contact-method" role="listitem">
                  <div className="contact-method-icon" aria-hidden="true"><Mail size={18} /></div>
                  <div>
                    <h4>Email Us</h4>
                    <a href="mailto:hello@appibrium.com" className="contact-link" id="contact-email-link">hello@appibrium.com</a>
                  </div>
                </div>
                <div className="contact-method" role="listitem">
                  <div className="contact-method-icon" aria-hidden="true"><Phone size={18} /></div>
                  <div>
                    <h4>Phone</h4>
                    <a href="tel:+8801789536985" className="contact-link">+880 1789 536 985</a>
                  </div>
                </div>
                <div className="contact-method" role="listitem">
                  <div className="contact-method-icon" aria-hidden="true"><MapPin size={18} /></div>
                  <div>
                    <h4>Our Office</h4>
                    <a 
                      href="https://maps.app.goo.gl/iB4C2nVc3x5mFe1i6" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="contact-link"
                    >
                      23/A Shukrabad, Dhaka,<br />Bangladesh 1207
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact-socials" aria-label="Appibrium social channels">
                {[
                  { href: 'https://www.facebook.com/appibrium', icon: Facebook, label: 'Facebook', id: 'contact-social-fb' },
                  { href: 'https://www.linkedin.com/company/appibrium/', icon: Linkedin, label: 'LinkedIn', id: 'contact-social-li' },
                  { href: 'https://www.youtube.com/@appibrium', icon: Youtube, label: 'YouTube', id: 'contact-social-yt' },
                  { href: 'https://github.com/appibrium', icon: Github, label: 'GitHub', id: 'contact-social-gh' },
                  { href: 'https://play.google.com/store/apps/dev?id=6109039901707570348', icon: Play, label: 'Google Play', id: 'contact-social-play' }
                ].map(({ href, icon: Icon, label, id }) => (
                  <a key={id} id={id} href={href} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label={`Appibrium on ${label}`}>
                    <Icon size={18} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </AnimSection>

            {/* Form Column */}
            <AnimSection delay={0.1}>
              <form id="project-contact-form" className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-name">Full Name <span className="req" aria-hidden="true">*</span></label>
                    <input id="contact-name" name="name" type="text" className="form-input" placeholder="Jane Doe" required autoComplete="name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email">Email Address <span className="req" aria-hidden="true">*</span></label>
                    <input id="contact-email" name="email" type="email" className="form-input" placeholder="jane@company.com" required autoComplete="email" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-service">Service Area <span className="req" aria-hidden="true">*</span></label>
                  <select id="contact-service" name="service" className="form-input form-select" required>
                    <option value="" disabled defaultValue="">Select a service...</option>
                    <option>AI Engineering</option>
                    <option>Software Engineering</option>
                    <option>Cloud Infrastructure</option>
                    <option>Embedded Systems</option>
                    <option>Internet of Things (IoT)</option>
                    <option>Product Engineering</option>
                    <option>Research &amp; Innovation</option>
                    <option>Other / Custom Request</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Project Details <span className="req" aria-hidden="true">*</span></label>
                  <textarea id="contact-message" name="message" className="form-input form-textarea" placeholder="Describe your project, goals, timeline, and requirements..." required rows={5} />
                </div>

                {/* Honeypot */}
                <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                <input type="hidden" name="_subject" value="New Project Inquiry — appibrium.com" />

                <button
                  type="submit"
                  id="form-submit-btn"
                  className="btn btn-primary form-submit"
                  disabled={formState === 'sending'}
                >
                  {formState === 'sending' ? 'Sending…' : 'Send Inquiry'}
                  {formState !== 'sending' && <ArrowRight size={16} aria-hidden="true" />}
                </button>

                <AnimatePresence>
                  {formState === 'success' && (
                    <motion.div
                      className="form-feedback form-feedback--success"
                      role="alert"
                      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    >
                      <CheckCircle size={18} aria-hidden="true" />
                      <span>Message sent! We'll get back to you within 24 hours.</span>
                    </motion.div>
                  )}
                  {formState === 'error' && (
                    <motion.div
                      className="form-feedback form-feedback--error"
                      role="alert"
                      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    >
                      <X size={18} aria-hidden="true" />
                      <span>Something went wrong. Please email us at <a href="mailto:hello@appibrium.com">hello@appibrium.com</a></span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer id="main-footer" role="contentinfo">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-brand">
              <a href="/" aria-label="Appibrium – Back to top">
                <img src="/logos/lockup/lockup_light.svg" alt="Appibrium" width={210} height={54} loading="lazy" style={{ height: '54px', width: 'auto' }} />
              </a>
              <p className="footer-desc">Appibrium Technology Co. — engineering intelligent technologies across AI, software, cloud, embedded systems, and IoT. Building the future, one system at a time.</p>
              <div className="footer-socials" aria-label="Appibrium social channels">
                {[
                  { href: 'https://www.facebook.com/appibrium', icon: Facebook, label: 'Facebook', id: 'footer-social-fb' },
                  { href: 'https://www.linkedin.com/company/appibrium/', icon: Linkedin, label: 'LinkedIn', id: 'footer-social-li' },
                  { href: 'https://www.youtube.com/@appibrium', icon: Youtube, label: 'YouTube', id: 'footer-social-yt' },
                  { href: 'https://github.com/appibrium', icon: Github, label: 'GitHub', id: 'footer-social-gh' }
                ].map(({ href, icon: Icon, label, id }) => (
                  <a key={id} id={id} href={href} target="_blank" rel="noopener noreferrer" className="footer-social" aria-label={`Appibrium on ${label}`}>
                    <Icon size={16} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <div className="footer-links-group">
              <h4>Services</h4>
              <ul role="list">
                <li><button onClick={() => scrollTo('services')}>AI Engineering</button></li>
                <li><button onClick={() => scrollTo('services')}>Software Engineering</button></li>
                <li><button onClick={() => scrollTo('services')}>Cloud Infrastructure</button></li>
                <li><button onClick={() => scrollTo('services')}>Embedded Systems &amp; IoT</button></li>
                <li><button onClick={() => scrollTo('services')}>Product Engineering</button></li>
                <li><button onClick={() => scrollTo('services')}>Research &amp; Innovation</button></li>
              </ul>
            </div>

            <div className="footer-links-group">
              <h4>Company</h4>
              <ul role="list">
                <li><button onClick={() => scrollTo('about')}>About Appibrium</button></li>
                <li><button onClick={() => scrollTo('process')}>How We Build</button></li>
                <li><button onClick={() => scrollTo('products')}>Originals Portfolio</button></li>
                <li><a href="/works">All Client Works</a></li>
                <li><a href="https://appibrium.github.io" target="_blank" rel="noopener noreferrer">Media Kit</a></li>
                <li><a href="/legal.html" target="_blank" rel="noopener noreferrer">Legal &amp; Privacy</a></li>
                <li><a href="https://careers.appibrium.com" target="_blank" rel="noopener noreferrer">Careers</a></li>
              </ul>
            </div>

            <div className="footer-links-group">
              <h4>Contact</h4>
              <ul role="list" className="footer-contact-list">
                <li><a href="mailto:hello@appibrium.com" id="footer-email">hello@appibrium.com</a></li>
                <li><a href="tel:+8801789536985">+880 1789 536 985</a></li>
                <li><a href="https://maps.app.goo.gl/iB4C2nVc3x5mFe1i6" target="_blank" rel="noopener noreferrer">23/A Shukrabad, Dhaka,<br />Bangladesh 1207</a></li>
                <li><a href="https://appibrium.com" id="footer-website">appibrium.com</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Appibrium Technology Co. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="https://appibrium.github.io" target="_blank" rel="noopener noreferrer">Media Kit</a>
              <span aria-hidden="true">&middot;</span>
              <a href="/legal.html" target="_blank" rel="noopener noreferrer">Legal &amp; Privacy</a>
              <span aria-hidden="true">&middot;</span>
              <a href="mailto:hello@appibrium.com">hello@appibrium.com</a>
            </div>
          </div>
        </div>
      </footer>

      <Analytics />
      <SpeedInsights />
    </div>
  )
}