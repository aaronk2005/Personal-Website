import { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AppFrame, BootSequence, HomeScreen } from './components/AppShell';
import { ConsoleSystem } from './components/ConsoleSystem';
import { MiiPlazaPage } from './components/MiiPlaza';
import { hasCompletedStartup, rememberStartup } from './startup';
import { PhotoChannel } from './components/PhotoChannel';
import {
  AboutPage,
  AaronAIPage,
  ContactPage,
  ExperiencePage,
  HobbiesPage,
  NotFoundPage,
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
  '/aaron-ai': 'Aaron AI - Aaron Kleiman',
  '/hobbies': 'Hobbies - Aaron Kleiman',
  '/contact': 'Contact - Aaron Kleiman',
  '/mii': 'Mii Channel - Aaron Kleiman',
  '/photos': 'Photo Channel - Aaron Kleiman',
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
  const [showBoot, setShowBoot] = useState(() => {
    try { return !hasCompletedStartup(window.sessionStorage); } catch { return true; }
  });

  const completeBoot = useCallback(() => {
    try { rememberStartup(window.sessionStorage); } catch { /* Storage can be blocked by browser policy. */ }
    setShowBoot(false);
  }, []);

  return (
    <ConsoleSystem inactive={showBoot}>
      <RouteEffects />
      {showBoot ? <BootSequence onComplete={completeBoot} /> : <AppFrame>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/now" element={<Navigate to="/mii" replace />} />
          <Route path="/aaron-ai" element={<AaronAIPage />} />
          <Route path="/hobbies" element={<HobbiesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/mii" element={<MiiPlazaPage />} />
          <Route path="/arcade" element={<Navigate to="/" replace />} />
          <Route path="/play/*" element={<Navigate to="/" replace />} />
          <Route path="/photos" element={<PhotoChannel />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppFrame>}
    </ConsoleSystem>
  );
}
