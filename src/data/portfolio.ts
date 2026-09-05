export type IconName =
  | 'profile'
  | 'experience'
  | 'projects'
  | 'toolbox'
  | 'resume'
  | 'spark'
  | 'ai'
  | 'hobbies'
  | 'contact'
  | 'github'
  | 'linkedin'
  | 'home'
  | 'arrow'
  | 'external'
  | 'download'
  | 'mail'
  | 'clock'
  | 'code'
  | 'chip'
  | 'map';

export interface Channel {
  title: string;
  label: string;
  description: string;
  to: string;
  icon: IconName;
  tone: string;
  featured?: boolean;
  external?: boolean;
}

export const profile = {
  name: 'Aaron Kleiman',
  role: 'Computer Engineering - Queens University',
  location: 'Toronto, Ontario',
  education: 'BASc, Computer Engineering - Sep 2023-Apr 2028',
  positioning:
    'I build dependable systems, AI tooling, and polished products - from GPU validation pipelines to embedded robots and full-stack experiences.',
  email: 'aaron.kleiman@queensu.ca',
  github: 'https://github.com/aaronk2005',
  linkedin: 'https://www.linkedin.com/in/aaron-kleiman-477b19286/',
};

export const channels: Channel[] = [
  {
    title: 'Start Here',
    label: '01 / Profile',
    description: 'A quick introduction and the systems I like to build.',
    to: '/about',
    icon: 'profile',
    tone: 'sky',
    featured: true,
  },
  {
    title: 'Experience',
    label: '02 / Timeline',
    description: 'GPU validation, automation, product engineering, and team leadership.',
    to: '/experience',
    icon: 'experience',
    tone: 'cobalt',
  },
  {
    title: 'Projects',
    label: '03 / Selected work',
    description: 'Award-winning software, autonomous systems, and useful web products.',
    to: '/projects',
    icon: 'projects',
    tone: 'aqua',
    featured: true,
  },
  {
    title: 'Skills & Toolbox',
    label: '04 / Capabilities',
    description: 'The tools behind the work, connected to real projects.',
    to: '/skills',
    icon: 'toolbox',
    tone: 'violet',
  },
  {
    title: 'Resume',
    label: '05 / One-page view',
    description: 'A recruiter-friendly summary with a PDF download slot.',
    to: '/resume',
    icon: 'resume',
    tone: 'silver',
  },
  {
    title: 'Now Building',
    label: '06 / In progress',
    description: 'AgentBench and current explorations in reliable AI tooling.',
    to: '/now',
    icon: 'spark',
    tone: 'mint',
  },
  {
    title: 'Aaron AI',
    label: '07 / Portfolio guide',
    description: "Ask a focused, local guide about Aaron's work, skills, and background.",
    to: '/aaron-ai',
    icon: 'ai',
    tone: 'aqua',
  },
  {
    title: 'Hobbies',
    label: '08 / Beyond code',
    description: 'Sports, cooking, travel, music, gaming, and life outside engineering.',
    to: '/hobbies',
    icon: 'hobbies',
    tone: 'mint',
  },
  {
    title: 'Contact',
    label: '09 / Say hello',
    description: 'Direct links for opportunities, collaborations, and questions.',
    to: '/contact',
    icon: 'contact',
    tone: 'cobalt',
  },
  {
    title: 'GitHub',
    label: 'External',
    description: 'Code, experiments, and work in progress.',
    to: profile.github,
    icon: 'github',
    tone: 'graphite',
    external: true,
  },
  {
    title: 'LinkedIn',
    label: 'External',
    description: 'Experience, updates, and professional contact.',
    to: profile.linkedin,
    icon: 'linkedin',
    tone: 'blue',
    external: true,
  },
];

export const experiences = [
  {
    company: 'AMD',
    title: 'Systems Software Engineer Intern - Datacenter GPU Validation',
    dates: 'May 2026-Present',
    kind: 'Systems & validation',
    summary:
      'Building automation and diagnostic tooling across firmware, drivers, ROCm workloads, and datacenter GPU validation.',
    impact: [
      'Automating AI/ML and HPC benchmark validation with Python and YAML-driven workflows.',
      'Supporting regression triage across firmware, driver, and ROCm validation contexts.',
      'Developing AI-assisted failure classification and RAG over 1,500+ historical failure reports.',
    ],
    tech: ['Python', 'ROCm', 'Linux', 'Jenkins', 'GitHub Actions', 'RAG'],
  },
  {
    company: 'Tallysight',
    title: 'Software Engineer Intern',
    dates: 'May-Aug 2025',
    kind: 'Product engineering',
    summary:
      'Shipped product-facing automation that turned repetitive editorial and data operations into dependable workflows.',
    impact: [
      'Built a Python ETL pipeline for 100+ analyst articles, replacing an eight-hour manual task.',
      'Created LLM-powered n8n and Slack workflows that reduced data-entry work from hours to minutes.',
      'Developed Retool AI agents and MongoDB tooling for player and team asset updates.',
    ],
    tech: ['Python', 'ETL', 'LLM workflows', 'Retool', 'MongoDB', 'n8n'],
  },
  {
    company: "Queen's Space Engineering Team",
    title: 'Software UI Lead',
    dates: 'Jul 2025-May 2026',
    kind: 'Robotics & leadership',
    summary:
      "Led the UI direction for a mission-critical rover dashboard while strengthening the team's engineering workflow.",
    impact: [
      'Designed configurable telemetry widgets, real-time maps, and mission-planning flows.',
      'Integrated ROS 2 topics, diagnostics, TF frames, and playback into operator views.',
      'Introduced review standards and PR checklists for a more reliable team workflow.',
    ],
    tech: ['React', 'ROS 2', 'WebSockets', 'GitLab CI/CD', 'Maps'],
  },
  {
    company: "Queen's University",
    title: 'Undergraduate Teaching Assistant - APSC 141',
    dates: 'Sep-Dec 2025',
    kind: 'Teaching',
    summary:
      'Helped first-year engineering students build confidence with C, debugging, control flow, and algorithmic thinking.',
    impact: [
      'Supported weekly labs for a large first-year programming course.',
      'Provided one-on-one debugging and code-clarity guidance.',
    ],
    tech: ['C', 'Debugging', 'Mentorship'],
  },
  {
    company: 'Swarmed',
    title: 'Software Developer',
    dates: 'Oct 2024-May 2025',
    kind: 'Full-stack product',
    summary:
      'Improved a beekeeper-to-public service through product UI work, feedback tooling, and API-connected workflows.',
    impact: [
      'Redesigned core UI/UX flows for a platform supporting honey-bee rescues.',
      'Built survey and REST-integrated workflows that streamlined user and backend operations.',
    ],
    tech: ['JavaScript', 'REST APIs', 'Bubble.io', 'Product design'],
  },
  {
    company: 'CAD Railway Industries',
    title: 'Engineering Summer Intern',
    dates: 'May-Aug 2024',
    kind: 'Technical operations',
    summary:
      'Organized large technical datasets and authored maintainable locomotive service documentation.',
    impact: [
      'Classified 20,000+ GO Train drawings and schematics by subsystem.',
      'Authored 100+ locomotive maintenance manuals with validated HTML and PDF output.',
    ],
    tech: ['Technical writing', 'Data organization', 'Validation'],
  },
];

export const projects = [
  {
    id: 'odysseywalk',
    name: 'OdysseyWalk',
    kicker: 'QHacks 2026 Winner',
    signal: 'Voice-first city exploration',
    summary:
      'A conversational walking-tour experience that turns a route into a live, location-aware story.',
    decisions: [
      'Used WebSockets to keep the voice experience responsive while a tour unfolds.',
      'Combined Maps and LLM APIs around a route-first interaction instead of a chat-first UI.',
      'Designed for low-friction, eyes-up use while walking.',
    ],
    stack: ['Next.js 14', 'TypeScript', 'Google Maps API', 'LLM APIs', 'WebSockets'],
    github: 'https://github.com/aaronk2005/OdysseyWalk',
    live: 'https://odyssey-walk.vercel.app',
    icon: 'map' as IconName,
    accent: 'aqua',
  },
  {
    id: 'battle-bus',
    name: 'Autonomous Taxi Robot',
    kicker: 'Final competition - $1,032.66 earned',
    signal: '20 Hz autonomous control loop',
    summary:
      'A Raspberry Pi taxi robot that planned fares, perceived its environment, and drove autonomously under competition constraints.',
    decisions: [
      'Separated behaviors with an event bus and finite-state machine.',
      'Combined A* navigation with PID line following in a 20 Hz control loop.',
      'Used a Coral Edge TPU and TensorFlow Lite for efficient on-device inference.',
    ],
    stack: ['Python', 'Raspberry Pi 4', 'Coral Edge TPU', 'asyncio', 'TensorFlow Lite', 'A*', 'PID'],
    icon: 'chip' as IconName,
    accent: 'violet',
  },
  {
    id: 'spin2dine',
    name: 'Spin2Dine',
    kicker: 'Full-stack product',
    signal: 'AI-assisted restaurant discovery',
    summary:
      'A playful restaurant discovery product with interactive wheels, live place data, and AI recommendations.',
    decisions: [
      'Made choice paralysis the core product problem and used motion as functional feedback.',
      'Connected Google Places data to conversational recommendation flows.',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'Google Places API', 'OpenAI API'],
    github: 'https://github.com/aaronk2005/Spin2Dine',
    live: 'https://spin2dine.org',
    icon: 'spark' as IconName,
    accent: 'peach',
  },
  {
    id: 'study-safe',
    name: 'Study Safe Device',
    kicker: 'Embedded + web',
    signal: 'Motion-aware anti-theft system',
    summary:
      'An Arduino-based device that detects unauthorized movement and streams alerts to a web dashboard.',
    decisions: [
      'Connected physical sensing, live web state, and SMS notifications in one system.',
      'Used WebSockets for immediate dashboard feedback.',
    ],
    stack: ['Arduino', 'Node.js', 'Express', 'WebSockets', 'Twilio API'],
    github: 'https://github.com/aaronk2005/Study-Safe-Device',
    icon: 'chip' as IconName,
    accent: 'mint',
  },
  {
    id: 'perfex',
    name: 'Perfex 911 Testing Device',
    kicker: 'Hardware modernization',
    signal: 'Web testing + custom taskbox',
    summary:
      'A modern interpretation of a dispatcher assessment system, combining browser-based tests with custom Arduino hardware.',
    decisions: [
      'Replaced paper workflows with automated grading and a repeatable web interface.',
      'Designed the software and physical taskbox as one end-to-end experience.',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Arduino', 'Hardware design'],
    github: 'https://github.com/aaronk2005/911-Perfex-Test',
    icon: 'code' as IconName,
    accent: 'cobalt',
  },
];

export const skillGroups = [
  {
    name: 'Systems & validation',
    description: 'Building repeatable workflows around complex hardware and software boundaries.',
    skills: ['Python', 'C/C++', 'Linux', 'GPU validation', 'ROCm', 'Jenkins', 'CI/CD'],
    proof: ['AMD validation workflows', 'Autonomous Taxi Robot'],
  },
  {
    name: 'AI & agent tooling',
    description: 'Making LLM systems testable, observable, and useful inside real workflows.',
    skills: ['AI agents', 'RAG', 'Vector databases', 'LLM APIs', 'Evaluation', 'Observability'],
    proof: ['AgentBench', 'Tallysight automation', 'AMD failure classification'],
  },
  {
    name: 'Web & full-stack',
    description: 'Shipping accessible interfaces backed by practical application architecture.',
    skills: ['TypeScript', 'React', 'Next.js', 'Node.js', 'REST APIs', 'WebSockets'],
    proof: ['OdysseyWalk', 'Spin2Dine', 'QSET dashboard'],
  },
  {
    name: 'Embedded & robotics',
    description: 'Connecting sensing, control, perception, and operator interfaces.',
    skills: ['ROS 2', 'Raspberry Pi', 'Coral Edge TPU', 'TensorFlow Lite', 'Arduino', 'PID control'],
    proof: ['Autonomous Taxi Robot', 'Study Safe Device', 'QSET dashboard'],
  },
  {
    name: 'Developer workflow',
    description: 'Treating automation, review, and documentation as part of the product.',
    skills: ['Git', 'Docker', 'GitHub Actions', 'GitLab CI/CD', 'YAML', 'Technical documentation'],
    proof: ['AMD CI workflows', 'QSET review standards', 'CAD Railway manuals'],
  },
];

export const interests = [
  {
    name: 'Sports',
    lead: 'Hockey first, with plenty of basketball and baseball.',
    items: ['Hockey', 'Toronto Raptors', 'Baseball', 'Golf', 'Skiing'],
  },
  {
    name: 'Food & fitness',
    lead: 'The reliable reset after a long build session.',
    items: ['Gym', 'Cooking', 'Baking', 'Trying international food', 'BBQ chicken'],
  },
  {
    name: 'Travel',
    lead: 'Ten countries visited, with a lot more of the map left.',
    items: ['10 countries visited', 'City exploring', 'History', 'Backpacking through Asia'],
  },
  {
    name: 'Music & games',
    lead: 'Usually something competitive, strategic, or nostalgic.',
    items: ['Rap', 'Jazz', 'Lo-fi', 'Poker', 'Mario Kart', 'Wii Sports'],
  },
] as const;
