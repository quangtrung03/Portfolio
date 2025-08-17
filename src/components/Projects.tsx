'use client'

const Projects = () => {
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Dự Án <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Của Tôi</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Những dự án thực tế tôi đã và đang phát triển trong quá trình học tập và rèn luyện kỹ năng lập trình.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-500 hover:transform hover:scale-105"
            >
              {/* Status Badge */}
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${project.gradient} text-white`}>
                  {project.status}
                </span>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>

              {/* Project Content */}
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                {project.title}
              </h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-white/10 text-cyan-400 rounded-full text-sm border border-cyan-400/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                {project.demo ? (
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 text-center"
                  >
                    Xem Chi Tiết
                  </a>
                ) : (
                  <button 
                    className="flex-1 py-2 px-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg font-medium cursor-not-allowed"
                    disabled
                  >
                    Đang phát triển
                  </button>
                )}
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="py-2 px-4 border border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-black transition-all duration-300"
                >
                  GitHub
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-300 mb-6">
            Bạn có ý tưởng dự án thú vị? Hãy cùng tôi thực hiện nhé!
          </p>
          <a 
            href="#contact"
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 inline-block"
          >
            Liên Hệ Hợp Tác
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects
