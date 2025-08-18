'use client'

import { useState, useEffect } from 'react'

const Contact = () => {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Tạo mailto link với thông tin form
    const subject = encodeURIComponent(formData.subject || 'Liên hệ từ Portfolio')
    const body = encodeURIComponent(
      `Xin chào Quang Trung,\n\n` +
      `Tên: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Tin nhắn:\n${formData.message}\n\n` +
      `Trân trọng,\n${formData.name}`
    )
    
    // Mở email client
    window.location.href = `mailto:haquangtrung1534@gmail.com?subject=${subject}&body=${body}`
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  }

  return (
    <section id="contact" className="min-h-screen py-20 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Liên Hệ <span className={`bg-clip-text text-transparent ${
              isDarkMode 
                ? 'bg-gradient-to-r from-cyan-400 to-white' 
                : 'bg-gradient-to-r from-gray-700 to-gray-900'
            }`}>Với Tôi</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Bạn muốn hợp tác trong các dự án học tập, thực tập, hoặc có câu hỏi về lập trình? Hãy kết nối với tôi nhé!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className={`text-2xl font-bold mb-6 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>Kết Nối Cùng Tôi</h3>
              <p className={`text-lg leading-relaxed transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Dù bạn đang tìm kiếm cộng sự cho dự án học tập, cần tư vấn về lập trình, 
                hay muốn chia sẻ ý tưởng công nghệ, tôi luôn sẵn lòng lắng nghe và hỗ trợ.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500' 
                    : 'bg-gradient-to-r from-gray-700 to-gray-800'
                }`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className={`font-semibold transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>Email</h4>
                  <p className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-cyan-400' : 'text-gray-700'
                  }`}>haquangtrung1534@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500' 
                    : 'bg-gradient-to-r from-gray-700 to-gray-800'
                }`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className={`font-semibold transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>Vị trí</h4>
                  <p className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-cyan-400' : 'text-gray-700'
                  }`}>TPHCM, Việt Nam</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500' 
                    : 'bg-gradient-to-r from-gray-700 to-gray-800'
                }`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className={`font-semibold transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>Thời gian phản hồi</h4>
                  <p className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-cyan-400' : 'text-gray-700'
                  }`}>Trong vòng 24 giờ</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className={`font-semibold mb-4 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>Theo dõi tôi tại</h4>
              <div className="flex space-x-4">
                <a href="https://github.com/quangtrung03" target="_blank" rel="noopener noreferrer" 
                   className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                     isDarkMode 
                       ? 'bg-white/10 hover:bg-cyan-500' 
                       : 'bg-gray-100/50 hover:bg-gray-700'
                   }`}>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/quang-trung-h%C3%A0-05327037b/" target="_blank" rel="noopener noreferrer" 
                   className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                     isDarkMode 
                       ? 'bg-white/10 hover:bg-cyan-500' 
                       : 'bg-gray-100/50 hover:bg-gray-700'
                   }`}>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://www.facebook.com/haquangtrung1534" target="_blank" rel="noopener noreferrer" 
                   className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                     isDarkMode 
                       ? 'bg-white/10 hover:bg-cyan-500' 
                       : 'bg-gray-100/50 hover:bg-gray-700'
                   }`}>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a 
                href="mailto:haquangtrung1534@gmail.com" 
                className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-cyan-500 hover:bg-cyan-600 text-white' 
                    : 'bg-gray-700 hover:bg-gray-800 text-white'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Gửi Email</span>
              </a>
              
              <a 
                href="https://drive.google.com/file/d/18Ec4YF0gMFWYyVSN_NN86IxuIPraFgAe/view?usp=drivesdk" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center justify-center space-x-2 border px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'border-cyan-400 text-cyan-400 hover:bg-cyan-400/10' 
                    : 'border-gray-700 text-gray-700 hover:bg-gray-700/10'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Tải CV</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`backdrop-blur-sm border rounded-2xl p-8 ${
            isDarkMode 
              ? 'bg-black/20 border-cyan-400/20' 
              : 'bg-white/20 border-gray-700/20'
          }`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className={`block font-medium mb-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg transition-colors duration-300 focus:outline-none ${
                      isDarkMode 
                        ? 'bg-black/50 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400' 
                        : 'bg-white/50 border-gray-700/20 text-gray-800 placeholder-gray-500 focus:border-gray-700'
                    }`}
                    placeholder="Nhập họ và tên của bạn"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className={`block font-medium mb-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg transition-colors duration-300 focus:outline-none ${
                      isDarkMode 
                        ? 'bg-black/50 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400' 
                        : 'bg-white/50 border-gray-700/20 text-gray-800 placeholder-gray-500 focus:border-gray-700'
                    }`}
                    placeholder="email.cua.ban@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className={`block font-medium mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  Chủ đề
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg transition-colors duration-300 focus:outline-none ${
                    isDarkMode 
                      ? 'bg-black/50 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400' 
                      : 'bg-white/50 border-gray-700/20 text-gray-800 placeholder-gray-500 focus:border-gray-700'
                  }`}
                  placeholder="Bạn muốn trao đổi về điều gì?"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className={`block font-medium mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  Tin nhắn
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg transition-colors duration-300 focus:outline-none resize-none ${
                    isDarkMode 
                      ? 'bg-black/50 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400' 
                      : 'bg-white/50 border-gray-700/20 text-gray-800 placeholder-gray-500 focus:border-gray-700'
                  }`}
                  placeholder="Hãy chia sẻ chi tiết về ý tưởng hoặc câu hỏi của bạn..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className={`w-full py-3 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600' 
                    : 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900'
                }`}
              >
                Gửi Tin Nhắn
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
