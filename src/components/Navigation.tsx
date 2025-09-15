import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${isScrolled ? 'top-1 sm:top-2' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className={`glass-nav rounded-2xl px-4 sm:px-8 lg:px-12 py-4 sm:py-6 transition-all duration-300 ${isScrolled ? 'backdrop-blur-md' : ''}`}>
        <div className="flex items-center justify-center">
          {/* Navigation Items */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 lg:gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative px-2 sm:px-4 lg:px-6 py-2 text-xs sm:text-base lg:text-lg font-medium transition-all duration-300 rounded-lg ${
                activeSection === item.id
                  ? 'text-cyan-400 glow-text'
                  : 'text-white/70 hover:text-white hover:glow-text'
              }`}
              aria-label={`Navigate to ${item.name} section`}
              aria-current={activeSection === item.id ? 'page' : undefined}
            >
              {item.name}
              {activeSection === item.id && (
                <div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
          </div>
        </div>
      </div>
    </nav>
  );
}