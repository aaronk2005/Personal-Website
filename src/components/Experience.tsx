export function Experience() {
  const professionalExperiences = [
    {
      title: 'Undergraduate Teaching Assistant (APSC 141)',
      company: 'Queen\'s University',
      period: 'Sept 2025 - Present',
      location: 'Kingston, ON',
      emoji: '🍎',
      achievements: [
        'Support weekly labs of 200+ first-year students in a course introducing C programming fundamentals',
        'Provide one-on-one guidance in debugging, control flow, and algorithm design to improve programming skills',
        'Assist with grading assignments and delivering feedback to improve code clarity and student performance'
      ]
    },
    {
      title: 'Software Engineering Intern',
      company: 'Tallysight',
      period: 'May 2025 - Aug 2025',
      location: 'San Diego, CA',
      emoji: '🏈',
      achievements: [
        'Worked on an Agile 5-person team, contributing to sprints, code reviews, and deployments',
        'Built a Python ETL pipeline that automated scraping of 100+ analyst articles, replacing an 8-hour task',
        'Cut data entry processes from hours to minutes with n8n workflows powered by LLMs and Slack automation',
        'Developed AI agents in Retool to update player icons and team logos, replacing search and MongoDB uploads'
      ]
    },
    {
      title: 'Software Developer',
      company: 'Swarmed (beeswarmed.org)',
      period: 'Oct 2024 - May 2025',
      location: 'Mountain View, CA',
      emoji: '🐝',
      achievements: [
        'Redesigned UI/UX for a beekeeper–public platform, contributing to the rescue of 36M+ honey bees',
        'Built a dashboard survey element with JavaScript and Tally forms, streamlining user feedback collection',
        'Developed Bubble.io workflows with API integrations, streamlining user interaction and backend operations'
      ]
    },
    {
      title: 'Engineering Summer Intern',
      company: 'CAD Railway Industries Ltd.',
      period: 'May 2024 - Aug 2024',
      location: 'Toronto, ON',
      emoji: '🚂',
      achievements: [
        'Classified 20,000+ GO Train drawings and schematics by subsystem, enabling faster and more accurate retrieval',
        'Authored 100+ locomotive maintenance manuals in MadCap Flare, ensuring valid HTML and PDF formatting',
        'Supported procedure validation for technical leads and staff, maintaining accuracy and consistency in processes'
      ]
    }
  ];

  const extracurricularExperiences = [
    {
      title: 'Software UI Lead',
      company: 'Queen\'s Space Engineering Team',
      period: 'Jul 2025 - Present',
      location: 'Kingston, ON',
      emoji: '🧑‍🚀',
      achievements: [
        'Lead the design of a rover dashboard with configurable widgets, real-time maps, and mission planning tools',
        'Integrated ROS 2 telemetry and diagnostics using topics, TF frames, and playback to improve operator awareness',
        'Manage a sub-team with reviews and standards (GitLab, PR checklists) to foster collaboration and quality code'
      ]
    },
    {
      title: 'Business Lead',
      company: 'aQuatonomous',
      period: 'Jul 2024 - May 2025',
      location: 'Kingston, ON',
      emoji: '⛵',
      achievements: [
        'Secured $20,000+ from industry sponsors and faculty to fund the development of an autonomous surface vessel and team initiatives',
        'Led a 3-member business team, facilitate weekly meetings to drive collaboration, monitor progress, and achieve team objectives',
        'Designed a new WordPress website and integrated a newsletter system called the aQua-letter'
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 glow-text">
            Experience
          </h2>
          <p className="text-xl text-white/70">
            My professional and extracurricular journey
          </p>
        </div>

        {/* Professional Experience Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-semibold text-white mb-8 glow-text">
            Professional Experience
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-500"></div>

            <div className="space-y-12">
              {professionalExperiences.map((exp, index) => (
                <div key={index} className="relative flex items-start">
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-4 h-4 bg-blue-400 rounded-full border-4 border-blue-400/30 pulse-glow"></div>
                  
                  {/* Content */}
                  <div className="ml-20 glass-card rounded-2xl p-8 w-full hover:scale-105 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{exp.emoji}</span>
                        <h3 className="text-2xl font-semibold text-white">{exp.title}</h3>
                      </div>
                      <span className="text-blue-400 font-medium">{exp.period}</span>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-lg text-white/80">{exp.company}</h4>
                      {(exp as any).location && <p className="text-sm text-white/60">{(exp as any).location}</p>}
                    </div>

                    <div className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-start">
                          <span className="text-blue-400 mr-3 mt-1">•</span>
                          <span className="text-white/80">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Extracurricular Experience Section */}
        <div>
          <h3 className="text-3xl font-semibold text-white mb-8 glow-text">
            Extracurricular Experience
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 to-blue-400"></div>

            <div className="space-y-12">
              {extracurricularExperiences.map((exp, index) => (
                <div key={index} className="relative flex items-start">
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-4 h-4 bg-green-500 rounded-full border-4 border-green-500/30 pulse-glow"></div>

                  {/* Content */}
                  <div className="ml-20 glass-card rounded-2xl p-8 w-full hover:scale-105 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{(exp as any).emoji}</span>
                        <h3 className="text-2xl font-semibold text-white">{exp.title}</h3>
                      </div>
                      <span className="text-blue-400 font-medium">{exp.period}</span>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg text-white/80">{exp.company}</h4>
                      {(exp as any).location && <p className="text-sm text-white/60">{(exp as any).location}</p>}
                    </div>

                    <div className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-start">
                          <span className="text-green-400 mr-3 mt-1">•</span>
                          <span className="text-white/80">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}