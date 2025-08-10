'use client'

import { useState } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ]

  return (
    <header className="absolute top-0 left-0 right-0 z-20 p-6">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo/Name */}
        <div className="text-white font-bold text-xl">
          <h1 className="bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">
            Portfolio
          </h1>
          <p className="text-sm text-gray-300 font-normal">Developer</p>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-white hover:text-cyan-400 transition-colors duration-300 relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
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
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-black/50 backdrop-blur-sm rounded-lg p-4">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block text-white hover:text-cyan-400 py-2 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}

export default Header
