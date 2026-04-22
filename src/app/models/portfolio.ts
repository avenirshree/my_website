export interface PortfolioData {
  profile: Profile;
  skills: string[];
  projects: Project[];
  apps: ShowcaseApp[];
  timeline: TimelineItem[];
}

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  stats: {
    projects: number;
    yearsExperience: number;
    appsLaunched: number;
  };
}

export type ProjectCategory = 'Web' | 'App' | 'AI';

export interface Project {
  name: string;
  description: string;
  techStack: string[];
  category: ProjectCategory;
  liveDemo: string;
  github: string;
}

export interface ShowcaseApp {
  name: string;
  description: string;
  platform: string;
  primaryLink: string;
  secondaryLink: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}
