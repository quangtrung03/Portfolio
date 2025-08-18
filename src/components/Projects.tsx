'use client'

import { useEffect, useState } from 'react'

const Projects = () => {
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

  const projects = [
    {
      title: "Website Bán Hàng Online",
      description: "Ứng dụng web thương mại điện tử với đầy đủ tính năng giỏ hàng, thanh toán, quản lý sản phẩm và admin dashboard.",
      tech: ["React", "Node.js", "MongoDB", "Express"],
      status: "Hoàn thành",
      gradient: "from-cyan-500 to-blue-500",
      github: "https://github.com/quangtrung03/Flutter-Fontend",
      demo: "https://flutter-fontend.vercel.app/"
    },
    {
      title: "Ứng dụng Quản lý Sinh viên",
      description: "Hệ thống quản lý thông tin sinh viên, điểm số, lịch học và thời khóa biểu với giao diện thân thiện.",
      tech: ["Java", "MySQL", "JavaFX", "JDBC"],
      status: "Đang phát triển",
      gradient: "from-purple-500 to-pink-500",
      github: "https://github.com/quangtrung03/student-management",
      demo: null
    },
    {
      title: "Game Puzzle 2D",
      description: "Trò chơi giải đố 2D với nhiều cấp độ khác nhau, hệ thống điểm số và lưu trữ tiến trình người chơi.",
      tech: ["Unity", "C#", "SQLite", "UI Design"],
      status: "Đang phát triển",
      gradient: "from-green-500 to-teal-500",
      github: "https://github.com/quangtrung03/puzzle-game-2d",
      demo: "https://puzzle-game-demo.itch.io"
    },
    {
      title: "Chatbot AI Tư vấn",
      description: "Chatbot thông minh sử dụng API OpenAI để tư vấn về các môn học và định hướng nghề nghiệp cho sinh viên.",
      tech: ["Python", "OpenAI API", "Flask", "HTML/CSS"],
      status: "Thử nghiệm",
      gradient: "from-orange-500 to-red-500",
      github: "https://github.com/quangtrung03/ai-chatbot",
      demo: "https://ai-chatbot-demo.herokuapp.com"
    }
  ]

  return (
    <section id="projects" className="min-h-screen py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Dự Án <span className={`bg-clip-text text-transparent ${
              isDarkMode 
                ? 'bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400' 
                : 'bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900'
            }`}>Của Tôi</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Những dự án thực tế tôi đã và đang phát triển trong quá trình học tập và rèn luyện kỹ năng lập trình.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group backdrop-blur-sm border rounded-2xl p-8 transition-all duration-500 hover:transform hover:scale-105 ${
                isDarkMode 
                  ? 'bg-black/30 border-white/10 hover:border-cyan-400/50' 
                  : 'bg-white/30 border-gray-700/10 hover:border-gray-700/50'
              }`}
            >
              {/* Status Badge */}
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${project.gradient} text-white`}>
                  {project.status}
                </span>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className={`w-6 h-6 transition-colors duration-300 ${
                    isDarkMode ? 'text-cyan-400' : 'text-gray-700'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>

              {/* Project Content */}
              <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                isDarkMode 
                  ? 'text-white group-hover:text-cyan-400' 
                  : 'text-gray-800 group-hover:text-gray-900'
              }`}>
                {project.title}
              </h3>
              
              <p className={`mb-6 leading-relaxed transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className={`px-3 py-1 rounded-full text-sm border transition-colors duration-300 ${
                      isDarkMode 
                        ? 'bg-white/10 text-cyan-400 border-cyan-400/20' 
                        : 'bg-gray-100/50 text-gray-700 border-gray-700/20'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <a 
                  href={project.demo || project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`flex-1 py-2 px-4 text-white rounded-lg font-medium transition-all duration-300 text-center ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600' 
                      : 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900'
                  }`}
                >
                  Xem Chi Tiết
                </a>
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`py-2 px-4 border rounded-lg transition-all duration-300 ${
                    isDarkMode 
                      ? 'border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black' 
                      : 'border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  GitHub
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className={`mb-6 transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Bạn có ý tưởng dự án thú vị? Hãy cùng tôi thực hiện nhé!
          </p>
          <a 
            href="#contact"
            className={`px-8 py-3 text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105 inline-block ${
              isDarkMode 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600' 
                : 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900'
            }`}
          >
            Liên Hệ Hợp Tác
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects
