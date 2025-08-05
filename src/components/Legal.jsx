import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { ArrowLeft, FileText, Shield, Users, Scale, Calendar, Sun, Moon } from 'lucide-react'
import logoText from '../assets/txt_b.png'
import logoWhite from '../assets/twx_wh.png'
import './Legal.css'

function Legal() {
  const [activeTab, setActiveTab] = useState('privacy')
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const goBack = () => {
    window.history.back()
  }

  const legalSections = [
    {
      id: 'privacy',
      title: 'Privacy Policy',
      icon: <Shield className="w-6 h-6" />,
      lastUpdated: 'January 15, 2025',
      content: {
        overview: 'This Privacy Policy describes how Appibrium ("we," "us," or "our") collects, uses, and shares your personal information when you visit our website or use our services.',
        sections: [
          {
            title: 'Information We Collect',
            content: 'We collect information you provide directly to us, such as when you contact us through our website, subscribe to our newsletter, or request a quote. This may include your name, email address, phone number, and project details.'
          },
          {
            title: 'How We Use Your Information',
            content: 'We use the information we collect to provide our services, communicate with you, improve our website and services, and comply with legal obligations.'
          },
          {
            title: 'Information Sharing',
            content: 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.'
          },
          {
            title: 'Data Security',
            content: 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'
          },
          {
            title: 'Your Rights',
            content: 'You have the right to access, correct, or delete your personal information. You may also opt out of certain communications from us.'
          }
        ]
      }
    },
    {
      id: 'terms',
      title: 'Terms of Service',
      icon: <FileText className="w-6 h-6" />,
      lastUpdated: 'January 15, 2025',
      content: {
        overview: 'These Terms of Service govern your use of our website and services. By accessing or using our services, you agree to be bound by these terms.',
        sections: [
          {
            title: 'Acceptance of Terms',
            content: 'By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.'
          },
          {
            title: 'Use License',
            content: 'Permission is granted to temporarily download one copy of the materials on Appibrium\'s website for personal, non-commercial transitory viewing only.'
          },
          {
            title: 'Disclaimer',
            content: 'The materials on Appibrium\'s website are provided on an \'as is\' basis. Appibrium makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.'
          },
          {
            title: 'Limitations',
            content: 'In no event shall Appibrium or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Appibrium\'s website.'
          },
          {
            title: 'Revisions and Errata',
            content: 'The materials appearing on Appibrium\'s website could include technical, typographical, or photographic errors. Appibrium does not warrant that any of the materials on its website are accurate, complete or current.'
          }
        ]
      }
    },
    {
      id: 'cookies',
      title: 'Cookie Policy',
      icon: <Shield className="w-6 h-6" />,
      lastUpdated: 'January 15, 2025',
      content: {
        overview: 'This Cookie Policy explains how Appibrium uses cookies and similar technologies to recognize you when you visit our website.',
        sections: [
          {
            title: 'What Are Cookies',
            content: 'Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.'
          },
          {
            title: 'How We Use Cookies',
            content: 'We use cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies.'
          },
          {
            title: 'Types of Cookies We Use',
            content: 'Essential cookies: These cookies are essential to provide you with services available through our website and to enable you to use some of its features. Analytics cookies: These cookies allow us to analyze how our website is being accessed and used.'
          },
          {
            title: 'Managing Cookies',
            content: 'You can typically remove or reject cookies via your browser settings. In order to do this, follow the instructions provided by your browser (usually located within the "settings," "help," "tools," or "edit" facility).'
          }
        ]
      }
    },
    {
      id: 'disclaimer',
      title: 'Disclaimer',
      icon: <Scale className="w-6 h-6" />,
      lastUpdated: 'January 15, 2025',
      content: {
        overview: 'The information provided on this website is for general informational purposes only. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind.',
        sections: [
          {
            title: 'No Warranty',
            content: 'The information on this website is provided "as is" without any representations or warranties, express or implied. Appibrium makes no representations or warranties in relation to this website or the information and materials provided on this website.'
          },
          {
            title: 'Limitation of Liability',
            content: 'Appibrium will not be liable to you in relation to the contents of, or use of, or otherwise in connection with, this website for any indirect, special or consequential loss.'
          },
          {
            title: 'External Links',
            content: 'Our website may contain links to external websites that are not provided or maintained by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.'
          },
          {
            title: 'Professional Advice',
            content: 'The information on this website should not be construed as professional advice. We recommend consulting with qualified professionals for specific advice related to your situation.'
          }
        ]
      }
    }
  ]

  const activeSection = legalSections.find(section => section.id === activeTab)

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button onClick={goBack} variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <img src={logoText} alt="Appibrium" className="h-12 dark:hidden" />
                <img src={logoWhite} alt="Appibrium" className="h-12 hidden dark:block" />
              </div>
            </div>
            
            <Button onClick={toggleDarkMode} variant="ghost" size="sm">
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Legal Information
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Important legal information about our services, privacy practices, and terms of use
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {legalSections.map((section) => (
              <Button
                key={section.id}
                variant={activeTab === section.id ? "default" : "outline"}
                onClick={() => setActiveTab(section.id)}
                className="flex items-center space-x-2"
              >
                {section.icon}
                <span>{section.title}</span>
              </Button>
            ))}
          </div>

          {/* Content */}
          {activeSection && (
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {activeSection.icon}
                      <div>
                        <CardTitle className="text-2xl">{activeSection.title}</CardTitle>
                        <CardDescription>
                          Last updated: {activeSection.lastUpdated}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      <Calendar className="w-3 h-3 mr-1" />
                      {activeSection.lastUpdated}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                      {activeSection.content.overview}
                    </p>
                    
                    {activeSection.content.sections.map((section, index) => (
                      <div key={index} className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                          {section.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {section.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Legal 