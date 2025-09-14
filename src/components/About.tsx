export function About() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 glow-text">
            About Me
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
          <div className="glass-card rounded-xl sm:rounded-2xl p-6 sm:p-8">
            <div className="space-y-4 sm:space-y-6">
              <p className="text-white/80 text-base sm:text-lg leading-relaxed">
               Hi, I’m Aaron. I’m a third-year Computer Engineering student at Queen’s University. 
               This summer I worked as a Software Engineering Intern at Tallysight, where I built Python 
               ETL pipelines, AI-powered automation tools, and Retool agents. Previously I was a Software 
               Developer at Swarmed, contributing to UI/UX redesigns and Bubble.io workflows, and an 
               Engineering Intern at CAD Railway Industries, where I created maintenance manuals and organized 
               technical schematics.
              </p>
              
              <p className="text-white/80 text-base sm:text-lg leading-relaxed">
               Right now I’m an Undergraduate Teaching Assistant for Intro to Programming I, helping 
               first-year students learn C programming fundamentals. I also lead the UI dashboard 
               redesign for Queen’s Space Engineering Team, integrating ROS 2 telemetry and real-time 
               rover mission planning tools.</p>

               <p className="text-white/80 text-base sm:text-lg leading-relaxed">
               I’m interested in embedded systems, hardware development, full-stack engineering, and 
               integrating artificial intelligence into real-world applications. I love learning new 
               technologies, solving problems, and building tools that make a difference.</p>
            </div>
          </div>

          <div className="glass-card rounded-xl sm:rounded-2xl p-6 sm:p-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-white mb-4">Quick Facts</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Location</span>
                  <span className="text-white/90">Toronto, ON / Kingston, ON</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Education</span>
                  <span className="text-white/90">Queen's University</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Major</span>
                  <span className="text-white/90">Computer Engineering</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Current Year</span>
                  <span className="text-white/90">Third Year</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}