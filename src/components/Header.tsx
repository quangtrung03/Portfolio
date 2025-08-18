'use client'

import React, { useState, useEffect } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(true)

  const menuItems = [
    { name: 'About', href: '#about', section: 'about' },
    { name: 'Projects', href: '#projects', section: 'projects' },
    { name: 'Contact', href: '#contact', section: 'contact' }
  ]

  // Toggle theme
  const toggleTheme = () => {
    const newIsDarkMode = !isDarkMode
    setIsDarkMode(newIsDarkMode)
    
    // Clear and set class with force
    document.documentElement.classList.remove('light-mode')
    if (!newIsDarkMode) {
      document.documentElement.classList.add('light-mode')
    }
    
    localStorage.setItem('theme', newIsDarkMode ? 'dark' : 'light')
    
    // Force repaint
    document.documentElement.style.display = 'none'
    document.documentElement.offsetHeight // Trigger reflow
    document.documentElement.style.display = ''
    
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('theme-change', { 
      detail: { isDarkMode: newIsDarkMode } 
    }))
    
    // Debug log
    console.log('Theme toggled:', newIsDarkMode ? 'dark' : 'light', 
                'Classes:', document.documentElement.classList.toString())
  }

  // Initialize theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark
    
    setIsDarkMode(shouldBeDark)
    document.documentElement.classList.toggle('light-mode', !shouldBeDark)
  }, [])

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
      <div className={`fixed top-0 left-0 right-0 z-50 h-1 transition-colors duration-300 ${
        isDarkMode ? 'bg-black/20' : 'bg-white/20'
      }`}>
        <div 
          className={`h-full transition-all duration-300 ease-out ${
            isDarkMode 
              ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600'
              : 'bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900'
          }`}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header className="absolute top-0 left-0 right-0 z-20 p-6 backdrop-blur-md" 
        style={{ 
          marginTop: '4px',
          background: isDarkMode 
            ? 'rgba(0, 0, 0, 0.1)' 
            : 'rgba(255, 255, 255, 0.1)'
        }}>
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo/Name - Using Image Logo */}
        <div className="group cursor-pointer">
          <div className="flex items-center space-x-3">
            {/* Image Logo */}
            <div className="relative">
              <img 
                src="/images/logomili.png" 
                alt="Portfolio Logo" 
                className="w-10 h-10 rounded-lg object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            
            {/* Brand Text */}
            <div>
              <h1 className={`bg-clip-text text-transparent font-bold text-xl md:text-2xl tracking-tight group-hover:tracking-wide transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-cyan-400 via-cyan-300 to-white' 
                  : 'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600'
              }`}>
                Portfolio
              </h1>
              <p className={`text-xs md:text-sm font-light tracking-wider transition-colors duration-300 ${
                isDarkMode 
                  ? 'text-gray-400 group-hover:text-cyan-300' 
                  : 'text-gray-600 group-hover:text-gray-800'
              }`}>
                <span className="opacity-75">⚡</span> Hà Quang Trung
              </p>
            </div>
          </div>
          
          {/* Animated underline */}
          <div className={`w-0 h-0.5 mt-2 transition-all duration-500 group-hover:w-full ${
            isDarkMode 
              ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-transparent' 
              : 'bg-gradient-to-r from-gray-700 via-gray-800 to-transparent'
          }`}></div>
          
          {/* Glow effect */}
          <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-cyan-400/5 to-transparent' 
              : 'bg-gradient-to-r from-gray-700/5 to-transparent'
          }`}></div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`transition-colors duration-300 relative group ${
                isDarkMode 
                  ? 'text-white hover:text-cyan-400' 
                  : 'text-gray-800 hover:text-gray-900'
              }`}
            >
              {item.name}
              <span 
                className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 w-0 group-hover:w-full ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600' 
                    : 'bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900'
                }`}
              />
            </a>
          ))}
        </div>

        {/* Theme Toggle & Mobile Menu Buttons */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`transition-colors duration-300 p-2 ${
              isDarkMode 
                ? 'text-white hover:text-cyan-400' 
                : 'text-gray-800 hover:text-gray-900'
            }`}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isDarkMode ? (
                // Sun icon for light mode
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              ) : (
                // Moon icon for dark mode
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              )}
            </svg>
          </button>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}
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
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-16 left-0 right-0 backdrop-blur-sm border-b transition-all duration-500 ${
        isDarkMode 
          ? 'bg-black/95 border-cyan-400/20' 
          : 'bg-white/95 border-gray-700/20'
      } ${
        isMenuOpen ? 'transform translate-y-0 opacity-100' : 'transform -translate-y-full opacity-0 pointer-events-none'
      }`}>
        <div className="p-6 space-y-4">
          {menuItems.map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              className={`block py-3 text-lg font-medium transition-all duration-300 border-b last:border-b-0 ${
                isDarkMode 
                  ? 'text-white hover:text-cyan-400 border-gray-800' 
                  : 'text-gray-800 hover:text-gray-900 border-gray-200'
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
