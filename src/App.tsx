import {useEffect, useState} from 'react';
import {AboutAndExperience} from './components/AboutAndExperience';
import {ContactSection} from './components/ContactSection';
import {CustomizeDrawer, DrawerTab} from './components/CustomizeDrawer';
import {Header} from './components/Header';
import {HeroSection} from './components/HeroSection';
import {MarqueeDivider} from './components/MarqueeDivider';
import {ProjectLightbox} from './components/ProjectLightbox';
import {WorkSection} from './components/WorkSection';
import {WritingSection} from './components/WritingSection';
import {DEFAULT_PORTFOLIO} from './data/defaultPortfolio';
import {PortfolioData, ProjectItem} from './types/portfolio';

const STORAGE_KEY = 'rohan_portfolio_data_v2';

function loadInitialPortfolio(): {data: PortfolioData; customized: boolean} {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {data: DEFAULT_PORTFOLIO, customized: false};
    }
    const parsed = JSON.parse(raw) as Partial<PortfolioData>;
    return {
      data: {
        ...DEFAULT_PORTFOLIO,
        ...parsed,
        profile: {
          ...DEFAULT_PORTFOLIO.profile,
          ...(parsed.profile ?? {}),
        },
        socials: {
          ...DEFAULT_PORTFOLIO.socials,
          ...(parsed.socials ?? {}),
        },
      },
      customized: true,
    };
  } catch {
    return {data: DEFAULT_PORTFOLIO, customized: false};
  }
}

export default function App() {
  const [initial] = useState(loadInitialPortfolio);
  const [portfolio, setPortfolio] = useState<PortfolioData>(initial.data);
  const [isCustomized, setIsCustomized] = useState<boolean>(initial.customized);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null,
  );
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [customizerTab, setCustomizerTab] = useState<DrawerTab>('profile');

  useEffect(() => {
    document.title = `${portfolio.profile.name} — Personal Portfolio`;
  }, [portfolio.profile.name]);

  const handleUpdatePortfolio = (next: PortfolioData) => {
    setPortfolio(next);
    setIsCustomized(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage quota issues for large custom uploads
    }
  };

  const handleResetPortfolio = () => {
    setPortfolio(DEFAULT_PORTFOLIO);
    setIsCustomized(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  const openCustomizer = (tab: DrawerTab = 'profile') => {
    setCustomizerTab(tab);
    setIsCustomizerOpen(true);
  };

  const scrollToSection = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#09090B]">
      <Header
        name={portfolio.profile.name}
        onContactClick={() => scrollToSection('#contact')}
      />

      <main className="flex-1">
        <HeroSection
          profile={portfolio.profile}
          metrics={portfolio.metrics}
          onExploreWork={() => scrollToSection('#work')}
          onOpenCustomizer={() => openCustomizer('profile')}
        />

        <MarqueeDivider />

        <WorkSection
          projects={portfolio.projects}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        <AboutAndExperience
          profile={portfolio.profile}
          capabilities={portfolio.capabilities}
          experience={portfolio.experience}
          spotlights={portfolio.spotlights}
          onOpenPhotoCustomizer={() => openCustomizer('photos')}
        />

        <WritingSection notes={portfolio.writing} />

        <ContactSection
          profile={portfolio.profile}
          socials={portfolio.socials}
          isCustomized={isCustomized}
          onOpenCustomizer={() => openCustomizer('profile')}
          onResetPortfolio={handleResetPortfolio}
        />
      </main>

      <ProjectLightbox
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <CustomizeDrawer
        isOpen={isCustomizerOpen}
        initialTab={customizerTab}
        data={portfolio}
        onChange={handleUpdatePortfolio}
        onReset={handleResetPortfolio}
        onClose={() => setIsCustomizerOpen(false)}
      />
    </div>
  );
}
