import {PortfolioData} from '../types/portfolio';

export const DEFAULT_PORTFOLIO: PortfolioData = {
  profile: {
    name: 'Rohan Shafqat',
    role: 'SaaS Builder, AI & Digital Marketing',
    location: 'Bahawalpur, Pakistan',
    availability: '1st Semester at IUB · Open to SaaS & AI projects',
    email: 'shafqatrohan14@gmail.com',
    headline:
      'Building SaaS tools, AI workflows, and growth campaigns from Bahawalpur.',
    bio: 'I am a first-semester university student at The Islamia University of Bahawalpur (IUB) and an alumnus of PGC Bahawalpur. I focus on building practical SaaS products, AI automation systems, and performance digital marketing—and when off the screen, I am on the volleyball court.',
    aboutLead:
      'From PGC Bahawalpur to my first semester at IUB, I build digital products that solve real growth problems.',
    aboutBody:
      'Living in Bahawalpur (BWP), I combine technical curiosity with marketing execution. I design and launch lean SaaS interfaces, wire AI models into everyday business workflows, and run data-backed acquisition campaigns. Outside work and university, volleyball keeps me sharp—teaching fast communication, court awareness, and team discipline.',
    portraitUrl: '/src/assets/images/hero_rohan_male_1795546679184.jpg',
    portraitCaption: 'Rohan Shafqat · Bahawalpur, Pakistan',
  },
  metrics: [
    {
      id: 'm1',
      value: 'IUB · Sem 1',
      label: 'Current University',
      context: 'The Islamia University of Bahawalpur',
    },
    {
      id: 'm2',
      value: 'PGC BWP',
      label: 'College Alumnus',
      context: 'Punjab Group of Colleges, Bahawalpur',
    },
    {
      id: 'm3',
      value: 'SaaS & AI',
      label: 'Core Focus Areas',
      context: 'Products, automation & digital marketing',
    },
    {
      id: 'm4',
      value: 'Volleyball',
      label: 'Favorite Sport',
      context: 'Regular match play & team coordination',
    },
  ],
  projects: [
    {
      id: 'p-saas-analytics',
      title: 'PulseMetric SaaS',
      category: 'SaaS',
      year: '2026',
      client: 'Independent SaaS Product',
      role: 'Founder & Product Builder',
      summary:
        'A clean subscription analytics and churn-tracking dashboard built for early-stage software founders to monitor MRR and cohort retention.',
      imageUrl: '/src/assets/images/project_saas_analytics_1795546662829.jpg',
      imageAlt:
        'Sleek aluminum laptop on a concrete desk displaying a cobalt and monochrome SaaS revenue dashboard',
      featured: true,
      outcomeMetric: 'Unified MRR, churn rate, and active subscriber tracking in one view',
      problem:
        'Early-stage SaaS builders often piece together messy spreadsheets across payment gateways and analytics tools just to know whether retention is improving.',
      approach:
        'Designed a distraction-free financial workspace with clear KPI cards, cohort trend lines, and instant filtering by billing cycle.',
      outcome:
        'Streamlined weekly SaaS health reviews into a single two-minute check-in with clear action signals.',
      liveUrl: '',
    },
    {
      id: 'p-ai-workflow',
      title: 'FlowMind AI Studio',
      category: 'AI Systems',
      year: '2026',
      client: 'Automation Concept',
      role: 'AI Workflow Architect',
      summary:
        'Modular AI pipeline connecting lead capture, smart classification, and automated outreach drafting for small digital teams.',
      imageUrl: '/src/assets/images/project_ai_workflow_1795546663492.jpg',
      imageAlt:
        'Desktop monitor on a stone desk displaying an AI data workflow automation interface',
      featured: false,
      outcomeMetric: 'Automated repetitive lead triage and multi-step content routing',
      problem:
        'Small agencies and solo founders lose hours every week manually sorting incoming inquiries, tagging leads, and drafting first responses.',
      approach:
        'Structured a clear node-based pipeline separating data ingestion, AI classification, human validation, and CRM output.',
      outcome:
        'Reduced manual triage overhead while keeping final approval fast and transparent.',
      liveUrl: '',
    },
    {
      id: 'p-digital-marketing',
      title: 'Aura Growth Campaigns',
      category: 'Digital Marketing',
      year: '2025',
      client: 'Digital Brand & Funnel Study',
      role: 'Growth & Campaign Strategist',
      summary:
        'Full-funnel performance marketing system combining creative testing, conversion tracking, and landing page optimization.',
      imageUrl: '/src/assets/images/project_digital_marketing_1795546663816.jpg',
      imageAlt:
        'Digital marketing strategy desk with laptop conversion funnel charts and printed brand cards',
      featured: false,
      outcomeMetric: 'Structured A/B creative testing across funnel stages and ROAS tracking',
      problem:
        'Paid social and search campaigns frequently burn budget when ad creatives, audience hooks, and landing page messaging are misaligned.',
      approach:
        'Built a repeatable campaign playbook pairing hook-level A/B testing with weekly funnel conversion diagnostics.',
      outcome:
        'Delivered clearer attribution from ad click to qualified signup and higher landing page clarity.',
      liveUrl: '',
    },
    {
      id: 'p-courtsync-volleyball',
      title: 'CourtSync Volleyball',
      category: 'SaaS',
      year: '2026',
      client: 'Bahawalpur Campus & Club Concept',
      role: 'Product Designer',
      summary:
        'Lightweight match scheduler, team rotation board, and rally score tracker built around local volleyball sessions.',
      imageUrl: '/src/assets/images/about_volleyball_court_1795546663784.jpg',
      imageAlt:
        'Volleyball resting on an outdoor court line with crisp net shadows in afternoon light',
      featured: false,
      outcomeMetric: 'Fast 6-player rotation setup and match scorecard tracking',
      problem:
        'Organizing evening campus and neighborhood volleyball matches over group chats often leads to uneven teams and forgotten scores.',
      approach:
        'Designed a mobile-friendly court organizer for quick team balancing, court booking slots, and set-by-set scoring.',
      outcome:
        'Brings the simplicity of a clipboard onto every player’s phone before stepping onto the court.',
      liveUrl: '',
    },
  ],
  capabilities: [
    {
      id: 'c1',
      index: '01.',
      title: 'SaaS Product Development',
      description:
        'Designing and building web applications with clean onboarding, crisp dashboards, and subscription-ready user flows.',
    },
    {
      id: 'c2',
      index: '02.',
      title: 'AI Systems & Automation',
      description:
        'Integrating language models, structured prompts, and smart workflows that turn repetitive tasks into reliable pipelines.',
    },
    {
      id: 'c3',
      index: '03.',
      title: 'Digital Marketing & Growth',
      description:
        'Full-funnel acquisition strategy, social positioning, conversion copywriting, and performance analytics.',
    },
    {
      id: 'c4',
      index: '04.',
      title: 'Team Rhythm & Sportsmanship',
      description:
        'Bringing the focus, quick decision-making, and teamwork learned on the volleyball court into every digital collaboration.',
    },
  ],
  experience: [
    {
      id: 'e1',
      period: '2026 — Present',
      role: 'First-Semester Student',
      organization: 'The Islamia University of Bahawalpur (IUB)',
      location: 'Bahawalpur, Pakistan',
      highlight:
        'Starting my university journey at IUB while actively building SaaS concepts, AI workflows, and digital marketing projects.',
    },
    {
      id: 'e2',
      period: '2024 — 2026',
      role: 'College Graduate',
      organization: 'Punjab Group of Colleges (PGC BWP)',
      location: 'Bahawalpur, Pakistan',
      highlight:
        'Completed intermediate college studies at PGC Bahawalpur while developing skills in software products, AI tools, and marketing.',
    },
    {
      id: 'e3',
      period: 'Ongoing',
      role: 'Independent SaaS, AI & Marketing Builder',
      organization: 'Personal Projects & Client Work',
      location: 'Bahawalpur, Pakistan',
      highlight:
        'Experimenting with micro-SaaS interfaces, AI content and lead pipelines, and measurable digital growth campaigns.',
    },
    {
      id: 'e4',
      period: 'Off-Court',
      role: 'Volleyball Player',
      organization: 'Local & Campus Courts',
      location: 'Bahawalpur, Pakistan',
      highlight:
        'Favorite sport—staying active with regular matches that sharpen reflexes, communication, and competitive focus.',
    },
  ],
  spotlights: [
    {
      id: 's1',
      title: 'On the Volleyball Court',
      kicker: 'Favorite Sport · Bahawalpur',
      caption:
        'Volleyball is my favorite way to unwind and stay sharp—built on fast communication, trust in your teammates, and split-second timing.',
      imageUrl: '/src/assets/images/about_volleyball_court_1795546663784.jpg',
      imageAlt:
        'Volleyball on an outdoor court beside white boundary lines and net shadows',
    },
    {
      id: 's2',
      title: 'Studio & Campus Life in BWP',
      kicker: 'IUB 1st Semester · PGC BWP Alumnus',
      caption:
        'From PGC Bahawalpur to my first semester at IUB—balancing university classes with shipping SaaS, AI tools, and digital marketing campaigns.',
      imageUrl: '/src/assets/images/hero_rohan_male_1795546679184.jpg',
      imageAlt: 'Rohan Shafqat working at a sunlit study desk with a laptop',
    },
  ],
  writing: [
    {
      id: 'w1',
      title: 'Why Every SaaS Builder Should Understand Digital Marketing',
      category: 'SaaS & Growth',
      date: 'Nov 2026',
      readTime: '4 min read',
      excerpt:
        'Great code alone rarely finds its audience—pairing clean product design with clear positioning and distribution from day one.',
      body: [
        'Many builders treat marketing as an afterthought that begins only after the final feature ships. In reality, distribution shapes what you should build in the first place.',
        'When you understand your audience’s exact pain points, search intent, and scroll habits, every headline, onboarding step, and pricing tier inside your SaaS becomes sharper.',
        'Combining product building with digital marketing lets a solo student or small team test ideas rapidly, listen to real market feedback, and iterate with confidence.',
      ],
    },
    {
      id: 'w2',
      title: 'Practical AI Workflows Over Hype',
      category: 'AI Systems',
      date: 'Oct 2026',
      readTime: '3 min read',
      excerpt:
        'How focused AI automations save hours for lean teams without overcomplicating the user interface.',
      body: [
        'The best AI tools do not ask users to learn complicated prompt engineering every morning. They sit quietly inside an existing workflow—summarizing leads, drafting campaign angles, or structuring messy notes.',
        'Starting small with reliable inputs, clear validation steps, and fast human review creates AI systems that people actually trust in daily work.',
      ],
    },
    {
      id: 'w3',
      title: 'Lessons From the Volleyball Court Applied to Building Products',
      category: 'Personal Notes',
      date: 'Sep 2026',
      readTime: '3 min read',
      excerpt:
        'Why court communication, quick resets after a dropped point, and positioning translate directly to shipping software.',
      body: [
        'In volleyball, a rally moves fast—you cannot dwell on the previous point when the next serve is seconds away. You communicate clearly, cover your zone, and set up your teammate for the best shot.',
        'Building SaaS products and running marketing experiments in Bahawalpur feels remarkably similar: stay adaptable, learn quickly from every miss, and keep your team aligned.',
      ],
    },
  ],
  socials: {
    instagram: 'https://instagram.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://x.com',
    website: '',
  },
};
