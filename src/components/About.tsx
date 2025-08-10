'use client'

const About = () => {
  return (
    <section id="about" className="min-h-screen py-20 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About Our <span className="bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">Mission</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We are at the forefront of developing autonomous AI systems that learn, adapt, and evolve to tackle humanity's greatest challenges.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <div className="bg-black/20 backdrop-blur-sm border border-cyan-400/20 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Neural Architecture Search</h3>
            <p className="text-gray-300">
              Automated discovery of optimal neural network architectures that surpass human-designed models.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-black/20 backdrop-blur-sm border border-cyan-400/20 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Adaptive Learning Systems</h3>
            <p className="text-gray-300">
              AI systems that continuously learn and improve from new data without catastrophic forgetting.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-black/20 backdrop-blur-sm border border-cyan-400/20 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Emergent Intelligence</h3>
            <p className="text-gray-300">
              Research into how complex intelligent behaviors emerge from simple rules and interactions.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">
              500+
            </div>
            <p className="text-gray-300 mt-2">Models Trained</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">
              50TB
            </div>
            <p className="text-gray-300 mt-2">Data Processed</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">
              99.7%
            </div>
            <p className="text-gray-300 mt-2">Accuracy Rate</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">
              24/7
            </div>
            <p className="text-gray-300 mt-2">System Uptime</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
