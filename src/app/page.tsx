'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Loading from '@/components/Loading'

// Dynamically import the 3D background to avoid SSR issues
const BackgroundScene = dynamic(() => import('@/components/BackgroundScene'), {
  ssr: false,
})

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  if (isLoading) {
    return <Loading onComplete={handleLoadingComplete} />
  }

  return (
    <main className="relative overflow-hidden">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <BackgroundScene />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Header />
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}
