import { ReactTyped } from "react-typed";

export function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 sm:pt-20">
      <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 max-w-6xl mx-auto text-center floating-animation w-full">
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-6xl md:text-8xl font-bold text-white glow-text">
              Aaron Kleiman
            </h1>
            <div className="text-2xl md:text-3xl text-blue-300 min-h-[1.5em]">
              <ReactTyped
                strings={["Computer Engineer", "Software Developer", "Hardware Engineer", "AI Enthusiast"]}
                typeSpeed={100}
                backSpeed={50}
                loop
                cursorChar="|"
                showCursor={true}
                startDelay={1000}
              />
            </div>
          </div>
          
          <div className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed px-2">
            Computer Engineering student at Queen's University 
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-6 sm:pt-8 px-4 sm:px-0">
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="glass-button rounded-xl px-6 sm:px-8 py-3 text-white font-medium hover:scale-105 transition-transform w-full sm:w-auto"
            >
              View My Work
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="glass rounded-xl px-6 sm:px-8 py-3 text-white font-medium border-white/30 hover:border-white/50 transition-colors hover:scale-105 w-full sm:w-auto"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}