import {useMemo, useState} from 'react';
import {ArrowUpRight} from 'lucide-react';
import {ProjectCategory, ProjectItem} from '../types/portfolio';
import {ResilientImage} from './ResilientImage';

interface WorkSectionProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
}

type FilterOption = 'All Work' | ProjectCategory;

const FILTERS: FilterOption[] = [
  'All Work',
  'SaaS',
  'AI Systems',
  'Digital Marketing',
];

export function WorkSection({projects, onSelectProject}: WorkSectionProps) {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All Work');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All Work') {
      return projects;
    }
    return projects.filter((p) => p.category === activeFilter);
  }, [projects, activeFilter]);

  return (
    <section id="work" className="py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <p className="text-xs font-medium text-zinc-500 mb-2">
              Selected Work · SaaS, AI & Marketing
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-zinc-950 [text-wrap:balance]">
              Products, AI automations, and growth campaigns.
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter projects by discipline"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-zinc-100 border border-zinc-200/80 rounded-lg self-start md:self-auto"
          >
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                    isActive
                      ? 'bg-white text-zinc-950 shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="rounded-2xl border border-zinc-200 bg-white p-12 text-center">
            <p className="font-display text-lg font-medium text-zinc-900">
              No projects in this category yet
            </p>
            <p className="text-sm text-zinc-500 mt-1">
              Select another filter or add a project inside Customize Portfolio.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredProjects.map((project, index) => {
              const isFeaturedSpan =
                activeFilter === 'All Work' &&
                (project.featured || index === 0) &&
                index === 0;

              return (
                <article
                  key={project.id}
                  className={`group rounded-2xl border border-zinc-200 bg-white overflow-hidden transition-colors duration-150 hover:border-zinc-400 ${
                    isFeaturedSpan ? 'md:col-span-2' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="w-full text-left flex flex-col h-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-inset"
                  >
                    <div
                      className={`w-full overflow-hidden bg-zinc-100 border-b border-zinc-200 ${
                        isFeaturedSpan ? 'aspect-[16/9]' : 'aspect-[4/3]'
                      }`}
                    >
                      <ResilientImage
                        src={project.imageUrl}
                        alt={project.imageAlt}
                        fallbackTitle={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                      />
                    </div>

                    <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-5">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2.5">
                          <span>{project.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono tabular-nums">{project.year}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.client}</span>
                        </div>

                        <div className="flex items-start justify-between gap-4">
                          <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-zinc-950 group-hover:text-[#2563EB] transition-colors duration-150">
                            {project.title}
                          </h3>
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-zinc-200 text-zinc-600 group-hover:border-[#2563EB] group-hover:text-[#2563EB] transition-colors shrink-0">
                            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                          </span>
                        </div>

                        <p className="mt-2.5 text-sm sm:text-[15px] leading-relaxed text-zinc-600 max-w-2xl">
                          {project.summary}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <span className="font-medium text-zinc-800">
                          {project.outcomeMetric}
                        </span>
                        <span className="font-medium text-[#2563EB] whitespace-nowrap">
                          Read Case Study
                        </span>
                      </div>
                    </div>
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
