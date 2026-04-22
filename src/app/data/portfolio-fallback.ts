import { PortfolioData } from '../models/portfolio';

export const PORTFOLIO_FALLBACK_DATA: PortfolioData = {
  profile: {
    name: 'Anil Jadhav',
    role: 'Founder, AniverShree | Full Stack Developer (Angular + Spring Boot)',
    tagline: 'Building Smart Applications & Scalable Systems',
    bio: 'Founder of AniverShree and a passionate developer building scalable web applications and intelligent systems. Experienced in Angular, Spring Boot, and AI-powered applications, I enjoy solving real-world problems and creating user-friendly digital experiences through products delivered by my company.',
    email: 'anil.jadhav@anivershree.com',
    github: 'https://github.com/avenirshree',
    linkedin: 'https://linkedin.com/in/aniljadhav2833',
    stats: {
      projects: 8,
      yearsExperience: 3,
      appsLaunched: 5,
    },
  },
  skills: ['Angular', 'TypeScript', 'Java', 'Spring Boot', 'MySQL', 'REST APIs', 'AI Integration'],
  projects: [
    {
      name: 'AI Family Tree Generator',
      description:
        'An intelligent genealogy platform that converts family records into interactive relationship maps. It helps users manage member profiles, photos, timelines, and AI-assisted ancestry insights in one place.',
      techStack: ['Angular', 'Spring Boot', 'MySQL', 'OpenAI API'],
      category: 'AI',
      liveDemo: 'https://example.com/ai-family-tree',
      github: 'https://github.com/aniljadhav-dev/ai-family-tree-generator',
    },
    {
      name: 'Online Store',
      description:
        'A modern e-commerce web app for browsing, ordering, and managing online products. It includes customer accounts, admin inventory tools, payment integration, and recommendation features.',
      techStack: ['Angular', 'Spring Boot', 'MySQL', 'Stripe'],
      category: 'Web',
      liveDemo: 'https://marketplace-ui-two.vercel.app/',
      github: 'https://github.com/avenirshree/marketplace-ui',
    },
    {
      name: 'Smart Delivery Tracker',
      description:
        'A logistics dashboard that tracks deliveries in real time and presents route progress, ETA updates, and parcel status changes clearly for both admins and end users.',
      techStack: ['Angular', 'Java', 'Spring Boot', 'REST APIs'],
      category: 'App',
      liveDemo: 'https://example.com/smart-delivery-tracker',
      github: 'https://github.com/aniljadhav-dev/smart-delivery-tracker',
    },
    {
      name: 'Personal Finance Dashboard',
      description:
        'A data-rich dashboard for monitoring budgets, expenses, savings goals, and recurring bills. Built to provide insightful charts and a smooth mobile-friendly experience.',
      techStack: ['Angular', 'TypeScript', 'Chart.js', 'Node API'],
      category: 'Web',
      liveDemo: 'https://example.com/personal-finance-dashboard',
      github: 'https://github.com/aniljadhav-dev/personal-finance-dashboard',
    },
    {
      name: 'AI Video Generator Tool',
      description:
        'A content automation tool that transforms prompts into short-form videos with generated scenes, voiceovers, and export-ready clips for creators and marketing teams.',
      techStack: ['Angular', 'Spring Boot', 'FFmpeg', 'AI Services'],
      category: 'AI',
      liveDemo: 'https://example.com/ai-video-generator',
      github: 'https://github.com/aniljadhav-dev/ai-video-generator-tool',
    },
    {
      name: 'Portfolio Builder App',
      description:
        'A builder app that helps developers create polished portfolios with editable sections, theme presets, and live previews without needing to rewrite layout code each time.',
      techStack: ['Angular', 'TypeScript', 'Firebase', 'SCSS'],
      category: 'App',
      liveDemo: 'https://example.com/portfolio-builder',
      github: 'https://github.com/aniljadhav-dev/portfolio-builder-app',
    },
    {
      name: 'Healthcare Appointment Hub',
      description:
        'A secure appointment management portal for clinics and patients with booking, reminder notifications, doctor availability management, and simplified medical workflow support.',
      techStack: ['Angular', 'Spring Boot', 'MySQL', 'JWT'],
      category: 'Web',
      liveDemo: 'https://example.com/healthcare-appointment-hub',
      github: 'https://github.com/aniljadhav-dev/healthcare-appointment-hub',
    },
    {
      name: 'Recruitment Intelligence Suite',
      description:
        'A hiring support platform that helps recruiters manage pipelines, summarize candidate profiles, and automate parts of the screening process using AI-generated insights.',
      techStack: ['Angular', 'Java', 'Spring Boot', 'AI Integration'],
      category: 'AI',
      liveDemo: 'https://example.com/recruitment-intelligence-suite',
      github: 'https://github.com/aniljadhav-dev/recruitment-intelligence-suite',
    },
  ],
  apps: [
    {
      name: 'TaskPilot',
      description:
        'A productivity app for managing daily tasks, routines, and reminders with a clean web dashboard and responsive mobile-first layout.',
      platform: 'Web App',
      primaryLink: 'https://example.com/taskpilot',
      secondaryLink: 'https://play.google.com/store/apps/details?id=taskpilot.app',
    },
    {
      name: 'HealthSync',
      description:
        'A wellness tracking app focused on healthy habits, hydration logging, and daily progress visualization with simple actionable insights.',
      platform: 'Mobile App',
      primaryLink: 'https://play.google.com/store/apps/details?id=healthsync.app',
      secondaryLink: 'https://example.com/healthsync',
    },
    {
      name: 'ShopFlow Admin',
      description:
        'A retail operations panel for catalog control, order management, and sales reporting built for e-commerce teams and store admins.',
      platform: 'Web App',
      primaryLink: 'https://example.com/shopflow-admin',
      secondaryLink: 'https://example.com/shopflow-admin/docs',
    },
  ],
  timeline: [
    {
      year: '2022',
      title: 'Started Web Development',
      description:
        'Built strong frontend foundations with responsive layouts, reusable components, and clean JavaScript and TypeScript practices.',
    },
    {
      year: '2023',
      title: 'Built Full Stack Projects',
      description:
        'Expanded into backend systems, API development, authentication, and database design while shipping end-to-end portfolio projects.',
    },
    {
      year: '2024',
      title: 'Integrated AI into Applications',
      description:
        'Started building AI-enhanced products with automation, recommendation flows, and content generation features for practical use cases.',
    },
  ],
};
