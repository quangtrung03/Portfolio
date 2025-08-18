'use client'

import { useEffect, useState } from 'react'

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    // Check theme on mount
    const theme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDarkMode(theme === 'dark' || (!theme && prefersDark))

    // Listen for theme changes
    const handleThemeChange = () => {
      const currentTheme = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDarkMode(currentTheme === 'dark' || (!currentTheme && prefersDark))
    }

    window.addEventListener('storage', handleThemeChange)
    
    // Custom event listener for theme changes
    const handleCustomThemeChange = (e: any) => {
      setIsDarkMode(e.detail.isDarkMode)
    }
    
    window.addEventListener('theme-change', handleCustomThemeChange)

    return () => {
      window.removeEventListener('storage', handleThemeChange)
      window.removeEventListener('theme-change', handleCustomThemeChange)
    }
  }, [])

  useEffect(() => {
    // Hiệu ứng xuất hiện
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true)
    }, 500) // 500ms sau khi component mount

    // Scroll listener for exit animation
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      clearTimeout(visibilityTimer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center relative px-6">
      
      {/* Gradient overlay để text nổi bật hơn */}
      <div className={`absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 pointer-events-none z-10 transition-all duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}></div>
      
      {/* Main content */}
      <div 
        className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto min-h-[70vh] mt-20 transition-all duration-1000 relative z-20 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
          }}
        >
          {/* Cột trái: Avatar + Tên + Thông tin cá nhân + Nút bấm */}
          <div className={`flex flex-col items-center md:items-start justify-center space-y-6 transition-all duration-1000 ease-out ${
            isVisible && scrollY < 200 ? 'transform translate-x-0 opacity-100' : 
            scrollY >= 200 ? 'transform -translate-x-full opacity-0' : 'transform -translate-x-full opacity-0'
          }`}>
            {/* Avatar */}
            <div className={`w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-cyan-400 shadow-2xl relative transition-all duration-700 delay-300 ${
              isVisible && scrollY < 200 ? 'transform scale-100 opacity-100' : 'transform scale-75 opacity-0'
            }`} style={{boxShadow: '0 0 32px 8px rgba(0,255,255,0.15)'}}>
              <img 
                src="/images/deptrai2.jpg" 
                alt="Hà Quang Trung" 
                className="w-full h-full object-cover"
              />
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full pointer-events-none" style={{boxShadow: '0 0 40px 10px rgba(0,255,255,0.25)'}}></div>
            </div>

            {/* Tên và chức danh */}
            <div className={`text-center md:text-left space-y-2 transition-all duration-700 delay-500 ${
              isVisible && scrollY < 200 ? 'transform translate-y-0 opacity-100' : 'transform translate-y-4 opacity-0'
            }`}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight" style={{textShadow: '0 4px 12px rgba(0,255,255,0.15), 0 2px 4px rgba(0,0,0,0.7)'}}>
                Hà Quang Trung
              </h1>
              <p className={`text-xl md:text-2xl lg:text-3xl font-light transition-colors duration-300 ${
                isDarkMode 
                  ? 'text-cyan-300' 
                  : 'text-gray-700'
              }`} style={{
                textShadow: isDarkMode 
                  ? '0 2px 8px rgba(0,255,255,0.2)' 
                  : '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                Backend Developer
              </p>
            </div>

            {/* Thông tin cá nhân */}
            <div className={`space-y-3 text-center md:text-left transition-all duration-700 delay-700 ${
              isVisible && scrollY < 200 ? 'transform translate-y-0 opacity-100' : 'transform translate-y-4 opacity-0'
            }`}>
              <div className={`flex items-center justify-center md:justify-start gap-3 transition-colors duration-300 ${
                isDarkMode ? 'text-cyan-200' : 'text-gray-600'
              }`}>
                <svg className={`w-5 h-5 transition-colors duration-300 ${
                  isDarkMode ? 'text-cyan-400' : 'text-gray-700'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m12 14 6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                <span className="text-base md:text-lg">Đại học Ngoại ngữ - Tin học TP.HCM</span>
              </div>
              
              <div className={`flex items-center justify-center md:justify-start gap-3 transition-colors duration-300 ${
                isDarkMode ? 'text-cyan-200' : 'text-gray-600'
              }`}>
                <svg className={`w-5 h-5 transition-colors duration-300 ${
                  isDarkMode ? 'text-cyan-400' : 'text-gray-700'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-base md:text-lg">TP.HCM</span>
              </div>

              <a href="mailto:haquangtrung1534@gmail.com" className={`flex items-center justify-center md:justify-start gap-3 transition-colors duration-300 ${
                isDarkMode 
                  ? 'text-cyan-200 hover:text-cyan-400' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}>
                <svg className={`w-5 h-5 transition-colors duration-300 ${
                  isDarkMode ? 'text-cyan-400' : 'text-gray-700'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-base md:text-lg">haquangtrung1534@gmail.com</span>
              </a>

              <div className={`flex items-center justify-center md:justify-start gap-3 transition-colors duration-300 ${
                isDarkMode ? 'text-cyan-200' : 'text-gray-600'
              }`}>
                <svg className={`w-5 h-5 transition-colors duration-300 ${
                  isDarkMode ? 'text-cyan-400' : 'text-gray-700'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-base md:text-lg">0762669248</span>
              </div>
            </div>

            {/* Nút bấm */}
            <div className={`flex flex-col sm:flex-row gap-4 pt-4 transition-all duration-700 delay-1100 ${
              isVisible && scrollY < 200 ? 'transform translate-y-0 opacity-100' : 'transform translate-y-4 opacity-0'
            }`}>
              <a href="#projects" className={`px-8 py-3 text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105 text-center ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600' 
                  : 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900'
              }`}>
                Xem dự án
              </a>
              <a 
                href="https://drive.google.com/file/d/18Ec4YF0gMFWYyVSN_NN86IxuIPraFgAe/view?usp=drivesdk" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`px-8 py-3 border rounded-full font-medium transition-all duration-300 text-center ${
                  isDarkMode 
                    ? 'border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black' 
                    : 'border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white'
                }`}
              >
                Tải CV
              </a>
            </div>
          </div>

          {/* Cột phải: Khung "Về tôi" */}
          <div className={`flex flex-col justify-center transition-all duration-1000 ease-out delay-200 ${
            isVisible && scrollY < 200 ? 'transform translate-x-0 opacity-100' : 
            scrollY >= 200 ? 'transform translate-x-full opacity-0' : 'transform translate-x-full opacity-0'
          }`}>
            <div className={`backdrop-blur-md rounded-2xl p-8 border shadow-xl transition-all duration-300 ${
              isDarkMode 
                ? 'bg-black/30 border-cyan-400/20 hover:border-cyan-400/40' 
                : 'bg-white/30 border-gray-700/20 hover:border-gray-700/40'
            }`}>
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 text-center md:text-left transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`} style={{
                textShadow: isDarkMode 
                  ? '0 4px 8px rgba(0,255,255,0.2)' 
                  : '0 4px 8px rgba(0,0,0,0.1)'
              }}>
                <span className={`bg-clip-text text-transparent ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-cyan-400 to-white' 
                    : 'bg-gradient-to-r from-gray-800 to-gray-600'
                }`}>Giới thiệu</span>
              </h2>
              <div className="space-y-4">
                <p className={`text-lg md:text-xl leading-relaxed text-center md:text-left transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`} style={{
                  textShadow: isDarkMode 
                    ? '0 1px 2px rgba(0,0,0,0.8)' 
                    : '0 1px 2px rgba(0,0,0,0.1)'
                }}>
                  Là một sinh viên năm cuối chuyên ngành công nghệ phần mềm. Mình đam mê khám phá các sản phẩm công nghệ mang tính đột phá,
                  từ phát triển website, mobile app cho đến các ứng dụng trí tuệ nhân tạo.
                </p>
                <p className={`text-base md:text-lg leading-relaxed text-center md:text-left font-medium transition-colors duration-300 ${
                  isDarkMode ? 'text-cyan-200' : 'text-gray-600'
                }`} style={{
                  textShadow: isDarkMode 
                    ? '0 1px 2px rgba(0,0,0,0.8)' 
                    : '0 1px 2px rgba(0,0,0,0.1)'
                }}>
                  Đây là không gian để mình chia sẻ câu chuyện, dự án và tầm nhìn tương lai.
                </p>
                
                
              </div>
            </div>
          </div>

        {/* Scroll Indicator */}
        <div 
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-700 delay-1300 ${
            isVisible && scrollY < 200 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className={`flex flex-col items-center transition-colors duration-300 ${
            isDarkMode ? 'text-white/50' : 'text-gray-800/50'
          }`}>
            <div className={`w-px h-8 animate-pulse ${
              isDarkMode 
                ? 'bg-gradient-to-b from-cyan-400 to-transparent' 
                : 'bg-gradient-to-b from-gray-700 to-transparent'
            }`}></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
