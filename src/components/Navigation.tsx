import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const navItems = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'projects' },
    { name: 'Interests', id: 'interests' },
    { name: 'Contact', id: 'contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map(item => item.id);
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      } else if (window.scrollY < 100) {
        setActiveSection('hero');
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint is 640px
    };

    handleResize(); // Set initial value
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav
      className={`fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${isScrolled ? 'top-1 sm:top-2' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className={`glass-nav rounded-2xl px-3 sm:px-6 md:px-10 lg:px-14 py-3 sm:py-5 md:py-7 transition-all duration-300 ${isScrolled ? 'backdrop-blur-md' : ''}`}>
        <div className="flex items-center justify-center">
          {!isMobile ? (
            // Desktop: single line
            <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-5 lg:gap-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-2 sm:px-3 md:px-5 lg:px-7 py-2 sm:py-3 text-sm sm:text-base md:text-lg lg:text-xl font-medium transition-all duration-300 rounded-lg ${
                  activeSection === item.id
                    ? 'text-blue-400 glow-text'
                    : 'text-white/70 hover:text-white hover:glow-text'
                }`}
                aria-label={`Navigate to ${item.name} section`}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.name}
                {activeSection === item.id && (
                  <div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full animate-pulse"
                    aria-hidden="true"
                  />
                )}
              </button>
            ))}
            </div>
          ) : (
            // Mobile: 2-row layout
            <div className="flex flex-col items-center justify-center gap-2">
              {/* First row: Home, About, Skills, Experience */}
              <div className="flex items-center justify-center gap-2">
                {navItems.slice(0, 4).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-2 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                      activeSection === item.id
                        ? 'text-blue-400 glow-text'
                        : 'text-white/70 hover:text-white hover:glow-text'
                    }`}
                    aria-label={`Navigate to ${item.name} section`}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                  >
                    {item.name}
                    {activeSection === item.id && (
                      <div
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full animate-pulse"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                ))}
              </div>
              {/* Second row: Projects, Interests, Contact */}
              <div className="flex items-center justify-center gap-2">
                {navItems.slice(4).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-2 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                      activeSection === item.id
                        ? 'text-blue-400 glow-text'
                        : 'text-white/70 hover:text-white hover:glow-text'
                    }`}
                    aria-label={`Navigate to ${item.name} section`}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                  >
                    {item.name}
                    {activeSection === item.id && (
                      <div
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full animate-pulse"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}