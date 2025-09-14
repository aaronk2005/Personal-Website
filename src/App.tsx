import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Interests } from './components/Interests';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { AaronGPT } from './components/AaronGPT';

import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    // Add scroll-triggered animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Skip Navigation Link */}
      <a 
        href="#hero" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 glass-button rounded-lg px-4 py-2 text-white font-medium"
        tabIndex={0}
      >
        Skip to main content
      </a>
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main role="main">
        {/* Home - Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Skills Section */}
        <Skills />

        {/* Experience Section */}
        <Experience />

        {/* Projects Section */}
        <Projects />

        {/* Interests Section */}
        <Interests />

        {/* Contact Section */}
        <Contact />
      </main>
      
      {/* AaronGPT Chat System */}
      <AaronGPT />
    </div>
  );
}