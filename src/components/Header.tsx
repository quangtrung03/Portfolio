'use client'

import React, { useState, useEffect } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [scrollProgress, setScrollProgress] = useState(0)

  const menuItems = [
    { name: 'About', href: '#about', section: 'about' },
    { name: 'Projects', href: '#projects', section: 'projects' },
    { name: 'Contact', href: '#contact', section: 'contact' }
  ]

  // Handle scroll progress and active section
  useEffect(() => {
    const handleScroll = () => {
      // Scroll progress
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / scrollHeight) * 100
      setScrollProgress(Math.min(progress, 100))

      // Active section detection
      const sections = ['about', 'projects', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
  <React.Fragment>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-black/20">
        <div 
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header className="absolute top-0 left-0 right-0 z-20 p-6" style={{ marginTop: '4px' }}>
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo/Name - Creative Design */}
        <div className="group cursor-pointer">
          <div className="flex items-center space-x-3">
            {/* Creative Logo Icon */}
            <div className="relative">
              {/* Outer ring */}
              <div className="w-12 h-12 rounded-full border-2 border-cyan-400/30 group-hover:border-cyan-400/60 transition-all duration-500 group-hover:rotate-180">
                {/* Inner design */}
                <div className="absolute inset-1 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-cyan-400/40 transition-all duration-300">
                  {/* Code symbol */}
                  <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 9l3 3-3 3m5 0h3" />
                  </svg>
                </div>
              </div>
              
              {/* Floating dots */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-300"></div>
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500 delay-200"></div>
            </div>
            
            {/* Brand Text */}
            <div>
              <h1 className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-white bg-clip-text text-transparent font-bold text-xl md:text-2xl tracking-tight group-hover:tracking-wide transition-all duration-300">
                Portfolio
              </h1>
              <p className="text-xs md:text-sm text-gray-400 font-light tracking-wider group-hover:text-cyan-300 transition-colors duration-300">
                <span className="opacity-75">⚡</span> Hà Quang Trung
              </p>
            </div>
          </div>
          
          {/* Animated underline */}
          <div className="w-0 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-transparent mt-2 transition-all duration-500 group-hover:w-full"></div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`text-white hover:text-cyan-400 transition-colors duration-300 relative group ${
                activeSection === item.section ? 'text-cyan-400' : ''
              }`}
            >
              {item.name}
              <span 
                className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 transition-all duration-300 ${
                  activeSection === item.section ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-16 left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-cyan-400/20 transition-all duration-500 ${
        isMenuOpen ? 'transform translate-y-0 opacity-100' : 'transform -translate-y-full opacity-0 pointer-events-none'
      }`}>
        <div className="p-6 space-y-4">
          {menuItems.map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              className={`block text-white hover:text-cyan-400 py-3 text-lg font-medium transition-all duration-300 border-b border-gray-800 last:border-b-0 ${
                activeSection === item.section ? 'text-cyan-400 border-cyan-400/30' : ''
              }`}
              style={{ 
                transitionDelay: isMenuOpen ? `${index * 100}ms` : '0ms',
                transform: isMenuOpen ? 'translateX(0)' : 'translateX(-20px)'
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
  </header>
  </React.Fragment>
  )
}

export default Header
