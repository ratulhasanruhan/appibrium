import projectsData from './lib/projects.json'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import {
  Menu,
  X,
  ArrowRight,
  Code,
  Smartphone,
  Globe,
  Monitor,
  Cpu,
  Layers,
  CheckCircle,
  Star,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Sun,
  Moon,
  ChevronDown,
  BrainCircuit,
  Facebook
} from 'lucide-react'
import logoIcon from './assets/mini_fav.png'
import logoText from './assets/txt_b.png'
import logoWhite from './assets/twx_wh.png'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'portfolio', 'about', 'process', 'technologies', 'testimonials', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const services = [
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile App Development",
      description: "Native iOS & Android applications and cross-platform solutions using React Native and Flutter.",
      technologies: ["Swift", "Kotlin", "Xamarin", "Flutter"]
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Web Development",
      description: "Modern web applications with responsive design, from simple websites to complex enterprise platforms.",
      technologies: ["React", "Vue.js", "Node.js", "Python"]
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Desktop Software",
      description: "Cross-platform desktop applications and legacy system modernization solutions.",
      technologies: ["Qt", ".NET", "Java"]
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Embedded Systems",
      description: "IoT solutions, real-time systems, and software for specialized hardware applications.",
      technologies: ["C/C++", "Python", "Arduino", "Raspberry Pi"]
    },
    {
      icon: <BrainCircuit className="w-8 h-8" />,
      title: "AI/ML Services",
      description: "Leverage artificial intelligence and machine learning for data analysis, predictive modeling, and automation.",
      technologies: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV"]
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Software Consulting",
      description: "Technical architecture, code reviews, and strategic technology planning.",
      technologies: ["Architecture", "DevOps", "Cloud", "Security"]
    }
  ]

  const technologies = [
    { name: "React", category: "Frontend" },
    { name: "Vue.js", category: "Frontend" },
    { name: "Angular", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "Python", category: "Backend" },
    { name: "Java", category: "Backend" },
    { name: "Swift", category: "Mobile" },
    { name: "Kotlin", category: "Mobile" },
    { name: "React Native", category: "Mobile" },
    { name: "Flutter", category: "Mobile" },
    { name: "PostgreSQL", category: "Database" },
    { name: "MongoDB", category: "Database" },
    { name: "AWS", category: "Cloud" },
    { name: "Docker", category: "DevOps" },
    { name: "Kubernetes", category: "DevOps" },
    { name: "TensorFlow", category: "AI/ML" },
    { name: "PyTorch", category: "AI/ML" },
    { name: "Scikit-learn", category: "AI/ML" }
  ]

  const processSteps = [
    {
      step: "01",
      title: "Discovery & Planning",
      description: "We analyze your requirements, conduct market research, and create comprehensive project plans with detailed timelines and milestones."
    },
    {
      step: "02", 
      title: "Design & Prototyping",
      description: "Our UX/UI designers create intuitive interfaces and interactive prototypes to validate concepts before development begins."
    },
    {
      step: "03",
      title: "Development & Testing",
      description: "Using agile methodologies, we develop your solution with continuous testing, code reviews, and quality assurance throughout."
    },
    {
      step: "04",
      title: "Deployment & Support",
      description: "We handle deployment, provide comprehensive training, and offer ongoing support to ensure long-term success."
    }
  ]

  const testimonials = [
    {
      name: "Partho Ranjan Mandol",
      role: "CEO, EkartFood",
      content: "Appibrium delivered an exceptional mobile app that exceeded our expectations. Their technical expertise and attention to detail are outstanding.",
      rating: 5
    },
    {
      name: "Arif Hayder",
      role: "UNO, Chatkhil Upazila",
      content: "They built a proper solutions for our local Upazila healthcare system. Their team was professional, responsive, and delivered on time.",
      rating: 5
    },
    {
      name: "Md Ruhul Amin",
      role: "Chairman, Amin Poultry",
      content: "Appibrium transformed our business with a custom software solution that streamlined our operations. Their support has been invaluable.",
      rating: 5
    }
  ]

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img src={logoText} alt="Appibrium" className="h-12 dark:hidden" />
              <img src={logoWhite} alt="Appibrium" className="h-12 hidden dark:block" />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['services', 'portfolio', 'about', 'process', 'technologies', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors ${
                    activeSection === item 
                      ? 'text-primary font-medium' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-primary'
                  }`}
                >
                  {item}
                </button>
              ))}
              <Button onClick={toggleDarkMode} variant="ghost" size="sm">
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Button onClick={() => scrollToSection('contact')}>
                Get Quote
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <Button onClick={toggleDarkMode} variant="ghost" size="sm">
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-700">
            <div className="px-4 py-2 space-y-2">
              {['services', 'portfolio', 'about', 'process', 'technologies', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-3 py-2 capitalize text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Innovative Software Solutions
              <span className="block text-primary">for Every Platform</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Transform your business with cutting-edge mobile applications, web platforms, embedded systems, 
              and complete software solutions designed to drive growth and efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => scrollToSection('portfolio')} className="text-lg px-8 py-3">
                View Our Portfolio
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('contact')} className="text-lg px-8 py-3">
                Start Your Project
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Expertise
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive software development services tailored to your business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    {service.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Showcasing our expertise through successful client solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-4 flex items-center justify-center">
                    <Code className="w-16 h-16 text-primary/60" />
                  </div>
                  <Badge variant="outline" className="w-fit mb-2">{project.category}</Badge>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    {project.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                About Appibrium
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Appibrium is a leading software development company dedicated to creating innovative digital solutions 
                that transform businesses across industries. Founded with a vision to bridge the gap between complex 
                technology and practical business needs, we have established ourselves as trusted partners for companies 
                seeking reliable, scalable, and cutting-edge software solutions.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Our multidisciplinary team of experienced developers, designers, and engineers brings together decades 
                of combined expertise in mobile application development, web technologies, embedded systems, and 
                full-stack software architecture.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-gray-600 dark:text-gray-300">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">5+</div>
                  <div className="text-gray-600 dark:text-gray-300">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">30+</div>
                  <div className="text-gray-600 dark:text-gray-300">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-gray-600 dark:text-gray-300">Support</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-4 flex items-center justify-center">
                <Code className="w-24 h-24 text-primary/60" />
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
                Innovation Through Code
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How We Work
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our proven development methodology ensures successful project delivery
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Technologies We Master
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Cutting-edge tools and frameworks for modern software development
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {technologies.map((tech, index) => (
              <div key={index} className="text-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">{tech.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{tech.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Trusted by businesses worldwide for exceptional software solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Let's discuss how we can help transform your ideas into powerful software solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Get in Touch
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                We're here to help you bring your software vision to life. Whether you have a detailed 
                project specification or just an initial idea, our team is ready to provide expert guidance.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-gray-600 dark:text-gray-300">hello@appibrium.xyz</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-gray-600 dark:text-gray-300">+880 1789536985</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-gray-600 dark:text-gray-300">57/5 Panthapath, Dhaka-1205, BD</span>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <Button variant="outline" size="sm" onClick={() => window.open('https://github.com/appibrium', '_blank')}>
                  <Github className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => window.open('https://www.linkedin.com/company/appibrium', '_blank')}>
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => window.open('https://www.facebook.com/appibrium', '_blank')}>
                  <Facebook className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" action="https://formspree.io/f/mnnvewee" method="POST">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        First Name
                      </label>
                      <Input name="firstName" placeholder="John" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Last Name
                      </label>
                      <Input name="lastName" placeholder="Doe" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <Input name="email" type="email" placeholder="john@example.com" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Project Type
                    </label>
                    <select name="projectType" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white" required>
                      <option value="">Select a project type</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Desktop Software">Desktop Software</option>
                      <option value="Embedded Systems">Embedded Systems</option>
                      <option value="Full-Stack Solution">Full-Stack Solution</option>
                      <option value="AI/ML Services">AI/ML Services</option>
                      <option value="Consulting">Consulting</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Message
                    </label>
                    <Textarea 
                      name="message"
                      placeholder="Tell us about your project requirements..."
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src={logoWhite} alt="Appibrium" className="h-14" />
              </div>
              <p className="text-gray-400 mb-4">
                Innovative software solutions for every platform. Transform your business with cutting-edge technology.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" onClick={() => window.open('https://github.com/appibrium', '_blank')}>
                  <Github className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" onClick={() => window.open('https://www.linkedin.com/company/appibrium', '_blank')}>
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" onClick={() => window.open('https://www.facebook.com/appibrium', '_blank')}>
                  <Facebook className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Mobile Development</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Web Development</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Desktop Software</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Embedded Systems</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI/ML Services</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Portfolio</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>hello@appibrium.xyz</li>
                <li>+880 1789536985</li>
                <li>57/5 Panthapath, Dhaka-1205, BD</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Appibrium. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App