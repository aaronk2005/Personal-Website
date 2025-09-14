export function Projects() {
  const projects = [
    {
      title: 'Fantasy Basketball Platform',
      description: 'Currently building a comprehensive fantasy basketball platform with real-time statistics, player analysis, and league management features.',
      tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Sports APIs', 'Real-time Updates'],
      features: ['Live player stats', 'Draft system', 'League management', 'Player analysis'],
      color: 'from-purple-500/20 to-pink-500/20',
      status: 'Currently Building',
      github: 'https://github.com/aaronk2005/fantasy-basketball'
    },
    {
      title: 'Queen\'s Space Engineering Dashboard',
      description: 'Rover dashboard with configurable widgets, real-time maps, and mission planning tools using ROS 2 integration.',
      tech: ['React', 'ROS 2', 'WebSockets', 'GitLab CI/CD', 'Real-time Data'],
      features: ['Configurable widgets', 'Real-time telemetry', 'Mission planning', 'TF frames visualization'],
      color: 'from-cyan-500/20 to-blue-500/20',
      status: 'Currently Building',
      github: 'https://github.com/aaronk2005/qset-rover-dashboard'
    },
    {
      title: 'Spin2Dine Restaurant Discovery',
      description: 'Full-stack restaurant discovery app with spinning wheels and AI-powered recommendations using Google Places API.',
      tech: ['React', 'TypeScript', 'Node.js', 'Express', 'Google Places API', 'OpenAI GPT-4o'],
      features: ['Interactive spinning interface', 'AI recommendations', 'Google Places integration', 'Production deployment'],
      color: 'from-green-500/20 to-blue-500/20',
      link: 'https://spin2dine.org',
      github: 'https://github.com/aaronk2005/spin2dine'
    },
    {
      title: 'Study Safe Device',
      description: 'Arduino-based anti-theft device with accelerometer to trigger alarms on unauthorized movement, featuring real-time monitoring.',
      tech: ['Arduino', 'Node.js', 'Express.js', 'WebSockets', 'Twilio API'],
      features: ['Motion detection', 'Real-time alerts', 'SMS notifications', 'Web dashboard'],
      color: 'from-blue-500/20 to-purple-500/20',
      github: 'https://github.com/aaronk2005/study-safe'
    },
    {
      title: '911 Emergency Data Analysis',
      description: 'Data analysis project using 911 call datasets to identify patterns and optimize emergency response systems with statistical insights.',
      tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Data Analysis', 'Statistical Modeling'],
      features: ['Emergency call pattern analysis', 'Response time optimization', 'Geographic clustering', 'Statistical visualizations'],
      color: 'from-red-500/20 to-orange-500/20',
      github: 'https://github.com/aaronk2005/911-data-analysis'
    },
    {
      title: 'Minesweeper Game',
      description: 'Classic Minesweeper game implemented in Java with a clean GUI interface and customizable difficulty levels.',
      tech: ['Java', 'Swing', 'AWT', 'Object-Oriented Programming'],
      features: ['Multiple difficulty levels', 'Timer functionality', 'Flag system', 'Clean GUI design'],
      color: 'from-gray-500/20 to-slate-500/20',
      github: 'https://github.com/aaronk2005/minesweeper'
    }
  ];

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 glow-text">
            Featured Projects
          </h2>
          <p className="text-xl text-white/70">
            Some of my recent work and experiments
          </p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.title}
              className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:scale-105 transition-all duration-300 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`bg-gradient-to-br ${project.color} rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 relative`}>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 pr-8 sm:pr-2">
                  {project.title}
                </h3>
                {(project as any).status && (
                  <div className="absolute top-2 right-2">
                    <span className="bg-yellow-500/20 text-yellow-300 text-xs px-2 py-1 rounded-full border border-yellow-500/30">
                      {(project as any).status}
                    </span>
                  </div>
                )}
              </div>

              <p className="text-white/80 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                {project.description}
              </p>

              <div className="mb-4 sm:mb-6">
                <h4 className="text-white font-medium mb-2 sm:mb-3 text-sm sm:text-base">Key Features:</h4>
                <div className="space-y-1">
                  {project.features.map((feature) => (
                    <div key={feature} className="flex items-start">
                      <span className="text-blue-400 mr-2 mt-0.5">✓</span>
                      <span className="text-white/80 text-xs sm:text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4 sm:mb-6">
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="glass rounded-md px-2 sm:px-3 py-1 text-xs text-white/90 border-white/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                {(project as any).link ? (
                  <a 
                    href={(project as any).link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="glass-button rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm text-white/90 flex-1 hover:scale-105 transition-transform text-center"
                    aria-label={`Visit live site for ${project.title}`}
                  >
                    Visit Site
                  </a>
                ) : (project as any).status ? (
                  <button 
                    className="glass-button rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm text-white/90 flex-1 opacity-50 cursor-not-allowed"
                    disabled
                    aria-label={`${project.title} is currently in development`}
                  >
                    In Development
                  </button>
                ) : (
                  <button 
                    className="glass-button rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm text-white/90 flex-1 hover:scale-105 transition-transform"
                    aria-label={`View demo for ${project.title}`}
                  >
                    View Demo
                  </button>
                )}
                {(project as any).github ? (
                  <a 
                    href={(project as any).github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="glass rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm text-white/90 border-white/30 hover:border-white/50 transition-colors hover:scale-105 text-center"
                    aria-label={`View source code for ${project.title} on GitHub`}
                  >
                    Code
                  </a>
                ) : (
                  <button 
                    className="glass rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm text-white/90 border-white/30 hover:border-white/50 transition-colors"
                    disabled
                    aria-label={`Source code for ${project.title} is not publicly available`}
                  >
                    Code
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="glass-button rounded-xl px-8 py-4 text-white font-medium text-lg hover:scale-105 transition-transform">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}