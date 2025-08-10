'use client'

const Projects = () => {
  const projects = [
    {
      title: "Autonomous Research Agent",
      description: "An AI system that independently conducts scientific research, generates hypotheses, and designs experiments.",
      tech: ["PyTorch", "Transformers", "Reinforcement Learning"],
      status: "In Development",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      title: "Neural Architecture Evolution",
      description: "Evolutionary algorithms that automatically discover and optimize neural network architectures for specific tasks.",
      tech: ["TensorFlow", "Genetic Algorithms", "AutoML"],
      status: "Production",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Continual Learning Framework",
      description: "A framework for training AI models that learn continuously without forgetting previous knowledge.",
      tech: ["JAX", "Meta-Learning", "Memory Networks"],
      status: "Research",
      gradient: "from-green-500 to-teal-500"
    },
    {
      title: "Multi-Modal Reasoning",
      description: "Advanced AI that can understand and reason across text, images, audio, and video simultaneously.",
      tech: ["Vision Transformers", "CLIP", "Multi-Modal Fusion"],
      status: "Beta",
      gradient: "from-orange-500 to-red-500"
    }
  ]

  return (
    <section id="projects" className="min-h-screen py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Breakthrough AI systems that push the boundaries of what&apos;s possible in machine intelligence.
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
                <button className="flex-1 py-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-300">
                  Learn More
                </button>
                <button className="py-2 px-4 border border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-black transition-all duration-300">
                  Demo
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-300 mb-6">
            Interested in collaborating on cutting-edge AI research?
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105">
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  )
}

export default Projects
