export function Projects() {
  const projects = [
    {
      title: 'StatTracker Sports Platform',
      description: 'Currently developing a sports statistics tracking platform for baseball. I love analyzing baseball stats and wanted to create a better way to do it.',
      tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Sports APIs', 'Real-time Updates'],
      features: ['Real-time game statistics', 'Player performance tracking', 'Historical data analysis', 'Custom stat dashboards'],
      color: 'from-purple-500/20 to-pink-500/20',
      status: 'Currently Building',
      github: 'https://github.com/aaronk2005/fantasy-basketball'
    },
    {
      title: 'Queen\'s Space Engineering Dashboard',
      description: 'Rover dashboard with configurable widgets, real-time maps, and mission planning tools using ROS 2 integration.',
      tech: ['React', 'ROS 2', 'WebSockets', 'GitLab CI/CD', 'Real-time Data'],
      features: ['Configurable widgets', 'Real-time telemetry', 'Mission planning', 'TF frames visualization'],
      color: 'from-blue-400/20 to-purple-500/20',
      status: 'Currently Building',
      github: 'https://github.com/aaronk2005/qset-rover-dashboard'
    },
    {
      title: 'Spin2Dine Restaurant Discovery',
      description: 'Full-stack restaurant discovery app with spinning wheels and AI-powered recommendations using Google Places API.',
      tech: ['React', 'TypeScript', 'Node.js', 'Express', 'Google Places API', 'OpenAI GPT-4o'],
      features: ['Interactive spinning interface', 'AI recommendations', 'Google Places integration', 'Production deployment'],
      color: 'from-green-500/20 to-blue-400/20',
      link: 'https://spin2dine.org',
      github: 'https://github.com/aaronk2005/Spin2Dine'
    },
    {
      title: 'Study Safe Device',
      description: 'Arduino-based anti-theft device with accelerometer to trigger alarms on unauthorized movement, featuring real-time monitoring.',
      tech: ['Arduino', 'Node.js', 'Express.js', 'WebSockets', 'Twilio API'],
      features: ['Motion detection', 'Real-time alerts', 'SMS notifications', 'Web dashboard'],
      color: 'from-blue-400/20 to-purple-500/20',
      github: 'https://github.com/aaronk2005/Study-Safe-Device'
    },
    {
      title: 'Perfex 911 Operator Testing Device',
      description: 'Modernized the 1970s Toronto Police Perfex system for 911 dispatcher assessment with web-based testing and custom Arduino hardware.',
      tech: ['HTML', 'CSS', 'JavaScript', 'Arduino', 'Hardware Design', 'User Interface'],
      features: ['Web-based test interface', 'Custom Arduino Taskbox hardware', 'Automated grading system', 'High-pressure stress simulation', 'Eliminated paper usage'],
      color: 'from-red-500/20 to-orange-500/20',
      github: 'https://github.com/aaronk2005/911-Perfex-Test'
    },
    {
      title: 'Walking vs Jumping ML Classifier',
      description: 'Machine learning project using accelerometer data to classify human motion as walking or jumping with 89-97% accuracy using logistic regression.',
      tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Tkinter', 'HDF5'],
      features: ['Desktop GUI application', 'Real-time classification', 'Data preprocessing pipeline', 'Statistical feature extraction', 'Comprehensive visualizations'],
      color: 'from-indigo-500/20 to-purple-500/20',
      github: 'https://github.com/aaronk2005/-walking-jumping-classifier'
    },
    {
      title: 'AC-DC Power Supply Design',
      description: 'Designed and tested three AC-DC power supply topologies (Zener-MOSFET, LM317, buck converter) converting 120V AC to regulated 5-14V DC outputs.',
      tech: ['LTSpice', 'Circuit Design', 'Power Electronics', 'Component Analysis', 'Testing & Validation'],
      features: ['Multiple topology comparison', 'Line/load regulation analysis', 'Efficiency optimization', 'Thermal performance testing', 'Safety validation'],
      color: 'from-amber-500/20 to-orange-500/20'
    },
    {
      title: 'Personal Portfolio Website',
      description: 'Modern, responsive portfolio website built with React and TypeScript, featuring glass morphism design, smooth animations, and interactive components.',
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'EmailJS', 'Responsive Design'],
      features: ['Glass morphism UI', 'Smooth animations', 'Mobile responsive', 'Contact form integration', 'Modern design system'],
      color: 'from-violet-500/20 to-purple-500/20',
      github: 'https://github.com/aaronk2005/Personal-Website'
    },
    {
      title: 'First Coding Project Ever',
      description: 'Classic Minesweeper game implemented in Java with a clean GUI interface and customizable difficulty levels.',
      tech: ['Java', 'Swing', 'AWT', 'Object-Oriented Programming'],
      features: ['Multiple difficulty levels', 'Timer functionality', 'Flag system', 'Clean GUI design'],
      color: 'from-orange-500/20 to-red-500/20',
      github: 'https://github.com/aaronk2005/Minesweeper'
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
                    <span className="bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded-full border border-green-500/30">
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

              <div className="flex">
                {(project as any).status ? (
                  <button
                    className="glass-button rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm text-white/90 w-full opacity-50 cursor-not-allowed"
                    disabled
                    aria-label={`${project.title} is currently in development`}
                  >
                    In Development
                  </button>
                ) : ((project as any).link || (project as any).github) ? (
                  <a
                    href={(project as any).link || (project as any).github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm text-white/90 w-full hover:scale-105 transition-transform text-center"
                    aria-label={`View ${project.title}`}
                  >
                    View
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}