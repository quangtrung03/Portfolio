'use client'

import { useEffect, useState } from 'react'

const About = () => {
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

  return (
    <section id="about" className="min-h-screen py-20 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Về Tôi & <span className={`bg-clip-text text-transparent ${
              isDarkMode 
                ? 'bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400' 
                : 'bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900'
            }`}>Mục Tiêu</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Mình là sinh viên năm cuối ngành Công nghệ Thông tin, đam mê xây dựng các giải pháp phần mềm thực tiễn. 
            Mục tiêu của mình là tham gia kỳ thực tập để áp dụng kỹ năng về lập trình web và mobile, làm việc trong 
            môi trường chuyên nghiệp và học hỏi từ những lập trình viên giàu kinh nghiệm.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <div className={`backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 transform hover:-translate-y-2 ${
            isDarkMode 
              ? 'bg-black/20 border-cyan-400/20 hover:border-cyan-400/50' 
              : 'bg-white/20 border-gray-700/20 hover:border-gray-700/50'
          }`}>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500' 
                : 'bg-gradient-to-r from-gray-700 to-gray-800'
            }`}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>Phát triển Web & Mobile</h3>
            <p className={`transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Kinh nghiệm xây dựng website và ứng dụng di động với các công nghệ hiện đại như React và Flutter.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className={`backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 transform hover:-translate-y-2 ${
            isDarkMode 
              ? 'bg-black/20 border-cyan-400/20 hover:border-cyan-400/50' 
              : 'bg-white/20 border-gray-700/20 hover:border-gray-700/50'
          }`}>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500' 
                : 'bg-gradient-to-r from-gray-700 to-gray-800'
            }`}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>Giải quyết vấn đề</h3>
            <p className={`transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Khả năng phân tích yêu cầu, thiết kế và triển khai giải pháp hiệu quả.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className={`backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 transform hover:-translate-y-2 ${
            isDarkMode 
              ? 'bg-black/20 border-cyan-400/20 hover:border-cyan-400/50' 
              : 'bg-white/20 border-gray-700/20 hover:border-gray-700/50'
          }`}>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500' 
                : 'bg-gradient-to-r from-gray-700 to-gray-800'
            }`}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>Học hỏi liên tục</h3>
            <p className={`transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Luôn tìm tòi công nghệ mới và rèn luyện kỹ năng thông qua các dự án thực tế.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center group">
            <div className={`text-3xl md:text-4xl font-bold bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-cyan-400 to-white' 
                : 'bg-gradient-to-r from-gray-700 to-gray-900'
            }`}>
              10+
            </div>
            <p className={`mt-2 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Dự án học tập & cá nhân đã hoàn thành</p>
          </div>
          <div className="text-center group">
            <div className={`text-3xl md:text-4xl font-bold bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-cyan-400 to-white' 
                : 'bg-gradient-to-r from-gray-700 to-gray-900'
            }`}>
              5+
            </div>
            <p className={`mt-2 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Ngôn ngữ lập trình đã sử dụng</p>
          </div>
          <div className="text-center group">
            <div className={`text-3xl md:text-4xl font-bold bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-cyan-400 to-white' 
                : 'bg-gradient-to-r from-gray-700 to-gray-900'
            }`}>
              15+
            </div>
            <p className={`mt-2 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Công nghệ & framework đã sử dụng</p>
          </div>
          <div className="text-center group">
            <div className={`text-3xl md:text-4xl font-bold bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-cyan-400 to-white' 
                : 'bg-gradient-to-r from-gray-700 to-gray-900'
            }`}>
              500+
            </div>
            <p className={`mt-2 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Giờ coding thực tế</p>
          </div>
        </div>

        {/* Additional Skills Section */}
        <div className="mt-16">
          <h3 className={`text-2xl md:text-3xl font-bold text-center mb-8 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Kỹ năng & <span className={`bg-clip-text text-transparent ${
              isDarkMode 
                ? 'bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400' 
                : 'bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900'
            }`}>Công nghệ</span>
          </h3>
          
          {/* Current Skills */}
          <div className="mb-12">
            <h4 className={`text-lg font-semibold text-center mb-6 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Thành thạo hiện tại</h4>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { name: 'React', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg', category: 'Frontend' },
                { name: 'JavaScript', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg', category: 'Language' },
                { name: 'Flutter', icon: 'https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg', category: 'Mobile' },
                { name: 'Node.js', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg', category: 'Backend' },
                { name: 'MongoDB', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg', category: 'Database' },
                { name: 'HTML5', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg', category: 'Frontend' },
                { name: 'CSS3', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg', category: 'Frontend' },
                { name: 'Java', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg', category: 'Language' },
                { name: 'C#', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg', category: 'Language' },
                { name: 'Firebase', icon: 'https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg', category: 'Backend' },
                { name: 'Unity', icon: 'https://www.vectorlogo.zone/logos/unity3d/unity3d-icon.svg', category: 'Game Dev' },
                { name: 'Figma', icon: 'https://www.vectorlogo.zone/logos/figma/figma-icon.svg', category: 'Design' }
              ].map((skill, index) => (
                <div 
                  key={index}
                  className={`group relative flex flex-col items-center p-4 border rounded-xl transition-all duration-300 cursor-pointer ${
                    isDarkMode 
                      ? 'bg-black/30 border-cyan-400/30 hover:border-cyan-400/60 hover:bg-cyan-400/10' 
                      : 'bg-white/30 border-gray-700/30 hover:border-gray-700/60 hover:bg-gray-700/10'
                  }`}
                  title={`${skill.name} - ${skill.category}`}
                  aria-label={`${skill.name} technology in ${skill.category} category`}
                >
                  <img 
                    src={skill.icon} 
                    alt={skill.name} 
                    className="w-10 h-10 mb-2 group-hover:scale-110 transition-transform duration-300"
                  />
                  <span className={`text-sm font-medium transition-colors duration-300 ${
                    isDarkMode ? 'text-cyan-300' : 'text-gray-700'
                  }`}>{skill.name}</span>
                  
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-20">
                    {skill.category}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Currently Learning */}
          <div>
            <h4 className={`text-lg font-semibold text-center mb-6 flex items-center justify-center space-x-2 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <svg className={`w-5 h-5 transition-colors duration-300 ${
                isDarkMode ? 'text-yellow-400' : 'text-orange-600'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>Hiện đang học</span>
            </h4>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: 'Docker', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg', progress: 'Cơ bản' },
                { name: 'Next.js', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg', progress: 'Nâng cao' },
                { name: 'TypeScript', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg', progress: 'Trung bình' },
                { name: 'AWS', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', progress: 'Mới bắt đầu' }
              ].map((skill, index) => (
                <div 
                  key={index}
                  className={`group relative flex flex-col items-center p-3 border rounded-xl transition-all duration-300 cursor-pointer ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-400/30 hover:border-yellow-400/60 hover:bg-yellow-400/10' 
                      : 'bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-600/30 hover:border-orange-600/60 hover:bg-orange-600/10'
                  }`}
                  title={`${skill.name} - ${skill.progress}`}
                  aria-label={`Currently learning ${skill.name}, progress: ${skill.progress}`}
                >
                  <div className="relative">
                    <img 
                      src={skill.icon} 
                      alt={skill.name} 
                      className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse ${
                      isDarkMode ? 'bg-yellow-400' : 'bg-orange-600'
                    }`}></div>
                  </div>
                  <span className={`text-sm font-medium transition-colors duration-300 ${
                    isDarkMode ? 'text-yellow-300' : 'text-orange-700'
                  }`}>{skill.name}</span>
                  
                  {/* Progress Tooltip */}
                  <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-20 ${
                    isDarkMode 
                      ? 'bg-yellow-900/90 text-yellow-100' 
                      : 'bg-orange-800/90 text-orange-100'
                  }`}>
                    {skill.progress}
                    <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
                      isDarkMode ? 'border-t-yellow-900/90' : 'border-t-orange-800/90'
                    }`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Learning Journey Timeline */}
        <div className="mt-20">
          <h3 className={`text-2xl md:text-3xl font-bold text-center mb-12 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Hành trình <span className={`bg-clip-text text-transparent ${
              isDarkMode 
                ? 'bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400' 
                : 'bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900'
            }`}>Học tập</span>
          </h3>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${
              isDarkMode 
                ? 'bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600' 
                : 'bg-gradient-to-b from-gray-600 via-gray-700 to-gray-800'
            }`}></div>
            
            {/* Timeline Items */}
            <div className="space-y-12">
              {[
                {
                  year: '2022',
                  title: 'Bắt đầu học lập trình',
                  description: 'Khám phá thế giới lập trình với C# và giải thuật cơ bản',
                  tech: ['C#', 'Python'],
                  position: 'left'
                },
                {
                  year: '2022', 
                  title: 'Web Development',
                  description: 'Học HTML, CSS, JavaScript,Database và xây dựng những website đầu tiên',
                  tech: ['HTML', 'CSS', 'JavaScript'],
                  position: 'right'
                },
                {
                  year: '2023',
                  title: 'Mobile Development',
                  description: 'Học Android studio  và bắt đầu xây dựng dự án mobile đầu tiên có sử dụng firebase ',
                  tech: ['Java', 'XML', 'Firebase'],
                  position: 'left'
                },
                {
                  year: '2024',
                  title: 'Full-stack ',
                  description: 'Phát triển kỹ năng backend,thành thạo xây dựng database, design pattern và hoàn thành các dự án full-stack',
                  tech: ['MongoDB', 'NodeJS', 'React'],
                  position: 'right'
                },
                {
                  year: '2025',
                  title: 'DevOps & Cloud',
                  description: 'Đang học Docker, AWS và các công nghệ cloud để chuẩn bị cho career',
                  tech: ['Docker', 'AWS', 'CI/CD'],
                  position: 'left',
                  current: true
                }
              ].map((item, index) => (
                <div key={index} className={`flex items-center ${item.position === 'right' ? 'flex-row-reverse' : ''}`}>
                  {/* Content */}
                  <div className={`w-1/2 ${item.position === 'right' ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className={`bg-black/30 backdrop-blur-sm border border-cyan-400/20 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300 ${item.current ? 'ring-2 ring-yellow-400/50' : ''}`}>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`text-2xl font-bold ${item.current ? 'text-yellow-400' : 'text-cyan-400'}`}>
                          {item.year}
                        </span>
                        {item.current && (
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                            <span className="text-yellow-400 text-sm font-medium">Hiện tại</span>
                          </div>
                        )}
                      </div>
                      
                      <h4 className="text-xl font-semibold text-white mb-3">{item.title}</h4>
                      <p className="text-gray-300 mb-4 leading-relaxed">{item.description}</p>
                      
                      <div className={`flex flex-wrap gap-2 ${item.position === 'right' ? 'justify-end' : ''}`}>
                        {item.tech.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              item.current 
                                ? 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/30' 
                                : 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/30'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Timeline Node */}
                  <div className="relative">
                    <div className={`w-6 h-6 rounded-full border-4 ${
                      item.current 
                        ? 'bg-yellow-400 border-yellow-300 animate-pulse' 
                        : 'bg-cyan-400 border-cyan-300'
                    } z-10 relative`}>
                    </div>
                    {item.current && (
                      <div className="absolute inset-0 w-6 h-6 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
                    )}
                  </div>
                  
                  {/* Empty space for other side */}
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
