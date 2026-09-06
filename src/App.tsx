import { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AppFrame, BootSequence, HomeScreen } from './components/AppShell';
import { ConsoleSystem } from './components/ConsoleSystem';
import { MiiPlazaPage } from './components/MiiPlaza';
import { ArcadePage } from './components/Arcade';
import { PhotoChannel } from './components/PhotoChannel';
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
  '/mii': 'Mii Channel - Aaron Kleiman',
  '/photos': 'Photo Channel - Aaron Kleiman',
  '/play/bowling': 'Pocket Bowling - Aaron Kleiman',
  '/play/targets': 'Target Rally - Aaron Kleiman',
  '/play/memory': 'Mii Match - Aaron Kleiman',
  '/play/tennis': 'Table Tennis - Aaron Kleiman',
  '/play/four': 'Four in a Row - Aaron Kleiman',
  '/play/breaker': 'Brick Breaker - Aaron Kleiman',
  '/play/snake': 'Snake - Aaron Kleiman',
  '/play/mines': 'Minesweeper - Aaron Kleiman',
  '/play/reversi': 'Reversi - Aaron Kleiman',
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
          <Route path="/arcade" element={<Navigate to="/?page=play" replace />} />
          <Route path="/play/:gameId" element={<ArcadePage />} />
          <Route path="/photos" element={<PhotoChannel />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppFrame>
      {showBoot && <BootSequence onComplete={completeBoot} />}
    </ConsoleSystem>
  );
}
