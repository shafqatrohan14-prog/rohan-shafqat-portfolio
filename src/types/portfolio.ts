export type ProjectCategory = 'SaaS' | 'AI Systems' | 'Digital Marketing';

export interface MetricItem {
  id: string;
  value: string;
  label: string;
  context: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: ProjectCategory;
  year: string;
  client: string;
  role: string;
  summary: string;
  imageUrl: string;
  imageAlt: string;
  featured?: boolean;
  outcomeMetric: string;
  problem: string;
  approach: string;
  outcome: string;
  liveUrl?: string;
}

export interface CapabilityItem {
  id: string;
  index: string;
  title: string;
  description: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  organization: string;
  location: string;
  highlight: string;
}

export interface WritingNote {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  body: string[];
}

export interface SpotlightPhoto {
  id: string;
  title: string;
  kicker: string;
  caption: string;
  imageUrl: string;
  imageAlt: string;
}

export interface SocialLinks {
  instagram: string;
  github: string;
  linkedin: string;
  twitter: string;
  website: string;
}

export interface PortfolioData {
  profile: {
    name: string;
    role: string;
    location: string;
    availability: string;
    email: string;
    headline: string;
    bio: string;
    aboutLead: string;
    aboutBody: string;
    portraitUrl: string;
    portraitCaption: string;
  };
  metrics: MetricItem[];
  projects: ProjectItem[];
  capabilities: CapabilityItem[];
  experience: ExperienceItem[];
  spotlights: SpotlightPhoto[];
  writing: WritingNote[];
  socials: SocialLinks;
}
