export type IconName =
  | 'profile'
  | 'experience'
  | 'projects'
  | 'toolbox'
  | 'resume'
  | 'spark'
  | 'ai'
  | 'hobbies'
  | 'mii'
  | 'arcade'
  | 'photo'
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
  page?: 'play';
}

export const profile = {
  name: 'Aaron Kleiman',
  role: "Computer Engineering - Queen's University",
  location: 'Toronto, Ontario',
  education: 'BASc, Computer Engineering - Sep 2023-Apr 2028',
  positioning:
    "I'm a Computer Engineering student at Queen's University and a Systems Software Engineer Intern at AMD. I work on GPU validation, test automation, AI triage agents, and embedded systems.",
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
    description: 'Experience, education, and projects. View or download my resume.',
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
    title: 'Mii Channel',
    label: '10 / Create a character',
    description: 'Create your player, join the plaza, and take a lap in the parade.',
    to: '/mii',
    icon: 'mii',
    tone: 'mint',
    page: 'play',
  },
  {
    title: 'Photo Channel',
    label: '12 / Photo album',
    description: 'Browse photos, start a slideshow, or turn a picture into a puzzle.',
    to: '/photos', icon: 'photo', tone: 'peach',
  },
  ...[
    ['bowling', 'Pocket Bowling', 'Five frames. Line up your next strike.'],
    ['targets', 'Target Rally', 'A twenty-second point-and-tap challenge.'],
    ['memory', 'Mii Match', 'Find all six pairs of familiar faces.'],
    ['tennis', 'Table Tennis', 'A quick paddle match. First to five wins.'],
    ['four', 'Four in a Row', 'Connect four discs against the computer.'],
    ['breaker', 'Brick Breaker', 'Five stages, armored bricks, combos, and power-ups.'],
    ['snake', 'Snake', 'Three difficulties, accelerating speed, and obstacles.'],
    ['mines', 'Minesweeper', 'Read the numbers, flag the mines, and clear the field.'],
    ['reversi', 'Reversi', 'Flip the board against a strategic computer opponent.'],
  ].map(([id, title, description]): Channel => ({title, description, label: 'Play', to: '/play/' + id, icon: 'arcade', tone: 'aqua', page: 'play'})),
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
      'Validating pre-release firmware, drivers, and ROCm on bare-metal MI300X, MI300A, and MI450 GPU clusters.',
    impact: [
      'Built a production Python triage pipeline that reduced per-job failure analysis from 40 minutes of log review to a 10-minute structured report.',
      'Developing domain-specific agents within a multi-agent framework for GPU regression, failure triage, and debugging.',
      'Integrating BabelStream, HPCG, LAMMPS, and Megatron-LM with Python, YAML, and Jenkins CI/CD.',
      'Engineering an AI agent for reliability, availability, and serviceability (RAS) failure triage and root-cause classification.',
    ],
    tech: ['Python', 'ROCm', 'Linux', 'Jenkins', 'Docker', 'AI agents', 'YAML'],
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
      'Led a software sub-team and the design of a Next.js rover dashboard for real-time telemetry.',
    impact: [
      'Integrated ROS 2 nodes over WebSockets for live rover telemetry.',
      'Standardized GitLab code reviews and merge checklists to improve quality and onboarding.',
    ],
    tech: ['Next.js', 'ROS 2', 'WebSockets', 'GitLab'],
  },
  {
    company: "Queen's University",
    title: 'Undergraduate Teaching Assistant - APSC 141',
    dates: 'Sep-Dec 2025',
    kind: 'Teaching',
    summary:
      'Helped first-year engineering students build confidence with C, debugging, control flow, and algorithmic thinking.',
    impact: [
      'Coordinated weekly C programming labs for 200+ first-year students.',
      'Provided debugging support, feedback, and grading.',
    ],
    tech: ['C', 'Debugging', 'Mentorship'],
  },
  {
    company: 'Swarmed',
    title: 'Software Developer (Volunteer)',
    dates: 'Oct 2024-May 2025',
    kind: 'Full-stack product',
    summary:
      'Improved a beekeeper-to-public service through product UI work, feedback tooling, and API-connected workflows.',
    impact: [
      'Redesigned UI/UX for a beekeeper-public platform contributing to the protection of 250M+ honey bees.',
      'Built dashboard survey tooling with JavaScript and Tally Forms.',
      'Automated user interactions and backend operations with Bubble.io and REST APIs.',
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
      'Won QHacks 2026 with route-aware itineraries generated through LLM and Google Maps APIs.',
      'Built WebSocket TTS/STT streaming and GPS-triggered narration for hands-free guided walks.',
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
    kicker: 'Embedded robotics',
    signal: '20 Hz autonomous control loop',
    summary:
      'A Raspberry Pi taxi robot that planned fares, perceived its environment, and drove autonomously under competition constraints.',
    decisions: [
      'Built an event-driven Python stack with a finite-state machine and a 20 Hz asyncio loop.',
      'Combined PID control with heading-aware A* path planning on a 37-node road graph.',
      'Used a Coral Edge TPU and TensorFlow Lite for efficient on-device inference.',
    ],
    stack: ['Python', 'Raspberry Pi 4', 'Coral Edge TPU', 'asyncio', 'TensorFlow Lite', 'A*', 'PID'],
    icon: 'chip' as IconName,
    accent: 'violet',
  },
  {
    id: 'risc-processor',
    name: '32-Bit RISC Processor',
    kicker: 'Computer architecture',
    signal: 'Single-bus CPU with 16 registers',
    summary: 'A 32-bit RISC CPU in Verilog with an ALU, memory, and finite-state-machine control.',
    decisions: [
      'Designed a single-bus datapath with 16 registers and FSM-based control.',
      'Verified arithmetic, memory, branch, jump, I/O, multiply, and divide instructions with ModelSim testbenches.',
    ],
    stack: ['Verilog', 'ModelSim', 'Finite State Machines', 'Computer Architecture'],
    icon: 'chip' as IconName,
    accent: 'cobalt',
  },
  {
    id: 'spin2dine',
    name: 'Spin2Dine',
    kicker: 'Full-stack product',
    signal: 'AI-assisted restaurant discovery',
    summary:
      'A playful restaurant discovery product with interactive wheels, live place data, and AI recommendations.',
    decisions: [
      'Built a two-stage flow: spin for a cuisine, then spin for a restaurant.',
      'Combined Google Places data with location, budget, and dietary preferences to narrow the options.',
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
      'Used an accelerometer to detect movement and trigger a local buzzer alarm.',
      'Connected the device to a live WebSocket dashboard with remote controls and Twilio SMS alerts.',
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
      'Built with Andrew Heraldo, pairing browser-based assessments with an Arduino taskbox.',
      'Included memory, note-taking, telephone, and map-navigation tests with automated grading.',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Arduino', 'Hardware design'],
    github: 'https://github.com/aaronk2005/911-Perfex-Test',
    icon: 'code' as IconName,
    accent: 'cobalt',
  },
];

export const moreProjects = [
  {
    name: 'Walking vs. Jumping',
    kind: 'Machine learning · ELEC 292',
    summary: 'A team project classifying smartphone accelerometer data with logistic regression. My work focused on data visualization, feature extraction, normalization, and documentation.',
    stack: ['Python', 'NumPy', 'Pandas', 'scikit-learn'],
    github: 'https://github.com/aaronk2005/-walking-jumping-classifier',
    linkLabel: 'Project notes',
  },
  {
    name: 'Social Media Platform',
    kind: 'Data structures · ELEC 278',
    summary: 'A C implementation of users, friendships, messaging, and posts. Hash tables store users, linked lists track friends, and queues hold chat history.',
    stack: ['C', 'Hash tables', 'Linked lists', 'Queues'],
    github: 'https://github.com/aaronk2005/Social-Media-Platform',
    linkLabel: 'View source',
  },
  {
    name: 'Minesweeper',
    kind: 'My first coding project',
    summary: 'A Java desktop game with easy, medium, and hard modes, a timer, and flagging. An early experiment with graphical interfaces and event-driven programming.',
    stack: ['Java', 'Swing', 'AWT'],
    github: 'https://github.com/aaronk2005/Minesweeper',
    linkLabel: 'View source',
  },
];

export const skillGroups = [
  {
    name: 'Systems & validation',
    description: 'Building repeatable workflows around complex hardware and software boundaries.',
    skills: ['Python', 'C/C++', 'Linux', 'CUDA', 'ROCm', 'HPC', 'Jenkins', 'Test automation'],
    proof: ['AMD validation workflows', 'Autonomous Taxi Robot'],
  },
  {
    name: 'AI & agent tooling',
    description: 'Making LLM systems testable, observable, and useful inside real workflows.',
    skills: ['AI agents', 'Multi-agent orchestration', 'NumPy', 'Pandas', 'OpenAI API', 'n8n'],
    proof: ['AMD triage agents', 'Tallysight automation'],
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
    skills: ['ROS 2', 'Raspberry Pi', 'Coral Edge TPU', 'TensorFlow Lite', 'Arduino', 'FPGA', 'Verilog', 'ModelSim'],
    proof: ['Autonomous Taxi Robot', '32-Bit RISC Processor', 'QSET dashboard'],
  },
  {
    name: 'Developer workflow',
    description: 'Treating automation, review, and documentation as part of the product.',
    skills: ['Git', 'Docker', 'GitLab', 'Jenkins', 'YAML', 'AWS', 'GCP', 'Bash/Shell'],
    proof: ['AMD CI workflows', 'QSET review standards'],
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
