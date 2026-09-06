import { useCallback, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AppFrame, BootSequence, HomeScreen } from './components/AppShell';
import { ConsoleSystem } from './components/ConsoleSystem';
import { MiiPlazaPage } from './components/MiiPlaza';
import { ArcadePage } from './components/Arcade';
import {
  AboutPage,
  AaronAIPage,
  ContactPage,
  ExperiencePage,
  HobbiesPage,
  NotFoundPage,
  NowPage,
  ProjectsPage,
  ResumePage,
  SkillsPage,
} from './components/ChannelPages';

const pageTitles: Record<string, string> = {
  '/': 'Aaron Kleiman - Systems & Product Engineer',
  '/about': 'About - Aaron Kleiman',
  '/experience': 'Experience - Aaron Kleiman',
  '/projects': 'Projects - Aaron Kleiman',
  '/skills': 'Skills & Toolbox - Aaron Kleiman',
  '/resume': 'Resume - Aaron Kleiman',
  '/now': 'Now Building - Aaron Kleiman',
  '/aaron-ai': 'Aaron AI - Aaron Kleiman',
  '/hobbies': 'Hobbies - Aaron Kleiman',
  '/contact': 'Contact - Aaron Kleiman',
  '/mii': 'Mii Plaza - Aaron Kleiman',
  '/arcade': 'Arcade - Aaron Kleiman',
};

function RouteEffects() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = pageTitles[location.pathname] ?? 'Page not found - Aaron Kleiman';
  }, [location.pathname]);

  return null;
}

export default function App() {
  const [showBoot, setShowBoot] = useState(true);

  const completeBoot = useCallback(() => {
    setShowBoot(false);
  }, []);

  return (
    <ConsoleSystem inactive={showBoot}>
      <RouteEffects />
      <AppFrame inactive={showBoot}>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/now" element={<NowPage />} />
          <Route path="/aaron-ai" element={<AaronAIPage />} />
          <Route path="/hobbies" element={<HobbiesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/mii" element={<MiiPlazaPage />} />
          <Route path="/arcade" element={<ArcadePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppFrame>
      {showBoot && <BootSequence onComplete={completeBoot} />}
    </ConsoleSystem>
  );
}
