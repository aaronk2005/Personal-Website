export function Skills() {
  const skillCategories = [
    {
      title: "Languages",
      color: "from-blue-400 to-cyan-400",
      skills: [
        { name: "Python", icon: "🐍" },
        { name: "C/C++", icon: "⚙️" },
        { name: "Java", icon: "☕" },
        { name: "JavaScript", icon: "🟨" },
        { name: "TypeScript", icon: "🔵" },
        { name: "VHDL", icon: "🔌" },
        { name: "Assembly", icon: "🔧" },
        { name: "Bash", icon: "💻" }
      ]
    },
    {
      title: "Frameworks & Libraries",
      color: "from-purple-400 to-pink-400",
      skills: [
        { name: "React.js", icon: "⚛️" },
        { name: "Node.js", icon: "🟢" },
        { name: "Express", icon: "🚀" },
        { name: "HTML/CSS", icon: "🌐" },
        { name: "Pandas", icon: "🐼" },
        { name: "NumPy", icon: "🔢" },
        { name: "WebSockets", icon: "🔌" },
        { name: "REST APIs", icon: "🌍" }
      ]
    },
    {
      title: "Databases",
      color: "from-orange-400 to-red-400",
      skills: [
        { name: "MySQL", icon: "🗄️" },
        { name: "MongoDB", icon: "🌱" }
      ]
    },
    {
      title: "Hardware & Embedded",
      color: "from-red-400 to-orange-400",
      skills: [
        { name: "Arduino", icon: "🔧" },
        { name: "ROS 2", icon: "🤖" },
        { name: "JTAG", icon: "🔌" },
        { name: "FPGA", icon: "⚡" },
        { name: "LTspice", icon: "📊" },
        { name: "Altium", icon: "🔌" },
        { name: "Oscilloscope", icon: "📈" }
      ]
    },
    {
      title: "Platforms & Tools",
      color: "from-indigo-400 to-purple-400",
      skills: [
        { name: "Linux", icon: "🐧" },
        { name: "Git/GitLab", icon: "📝" },
        { name: "Docker", icon: "🐳" },
        { name: "VS Code", icon: "💻" },
        { name: "n8n", icon: "🔗" },
        { name: "Bubble.io", icon: "💧" }
      ]
    },
    {
      title: "AI Tools",
      color: "from-green-400 to-emerald-400",
      skills: [
        { name: "Claude Code", icon: "🤖" },
        { name: "Cursor", icon: "📝" },
        { name: "OpenAI API", icon: "🧠" }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 glow-text">
            Skills & Expertise
          </h2>
          <p className="text-xl text-white/70">
            Technologies and tools I work with
          </p>
        </div>

        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <div key={category.title} className="space-y-6">
              <h3 className="text-2xl font-bold text-center">
                <span className={`bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                  {category.title}
                </span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill.name}
                    className="glass-card rounded-xl p-4 hover:scale-105 transition-all duration-300 group cursor-pointer"
                    style={{
                      animationDelay: `${categoryIndex * 200 + skillIndex * 100}ms`,
                      boxShadow: `0 0 20px rgba(0, 255, 255, 0.1)`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 30px rgba(0, 255, 255, 0.3)`;
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 20px rgba(0, 255, 255, 0.1)`;
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <div className="flex flex-col items-center space-y-2 text-center">
                      <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                        {skill.icon}
                      </div>
                      <span className="text-white font-medium text-sm">
                        {skill.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="glass-card rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">Always Learning</h3>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed">
              Always learning about embedded systems/development, full stack and semiconductors and integrating AI with everything.
            </p>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
              {['Embedded Systems', 'Full Stack Development', 'Semiconductors', 'AI Integration'].map((tech) => (
                <span
                  key={tech}
                  className="glass-button rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-white/90 pulse-glow"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}