'use client'

import { useEffect } from 'react'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize theme immediately
    const initializeTheme = () => {
      try {
        const savedTheme = localStorage.getItem('theme')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark
        
        document.documentElement.classList.toggle('light-mode', !shouldBeDark)
        
        // Force a repaint
        document.documentElement.style.display = 'none'
        document.documentElement.offsetHeight // Trigger reflow
        document.documentElement.style.display = ''
      } catch (e) {
        console.error('Theme initialization error:', e)
      }
    }

    initializeTheme()
  }, [])

  return <>{children}</>
}
