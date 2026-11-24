import {useEffect} from 'react';
import {ExternalLink, X} from 'lucide-react';
import {ProjectItem} from '../types/portfolio';
import {ResilientImage} from './ResilientImage';

interface ProjectLightboxProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectLightbox({project, onClose}: ProjectLightboxProps) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-zinc-950/80 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl border border-zinc-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 bg-white shrink-0">
          <div className="flex items-center gap-2 text-xs text-zinc-500 truncate pr-4">
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{project.year}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{project.client}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-950 text-white hover:bg-[#2563EB] transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="overflow-y-auto">
          <div className="w-full aspect-[16/9] bg-zinc-100 border-b border-zinc-200">
            <ResilientImage
              src={project.imageUrl}
              alt={project.imageAlt}
              fallbackTitle={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 sm:p-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200 pb-6">
              <div>
                <h2
                  id="project-modal-title"
                  className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-zinc-950"
                >
                  {project.title}
                </h2>
                <p className="mt-2 text-base text-zinc-600 max-w-2xl leading-relaxed">
                  {project.summary}
                </p>
              </div>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
                >
                  <span>Visit Project</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-6 border-b border-zinc-200">
              <div>
                <div className="text-xs text-zinc-500 mb-1">Role</div>
                <div className="text-sm font-medium text-zinc-950">{project.role}</div>
              </div>
              <div>
                <div className="text-xs text-zinc-500 mb-1">Client</div>
                <div className="text-sm font-medium text-zinc-950">{project.client}</div>
              </div>
              <div>
                <div className="text-xs text-zinc-500 mb-1">Measured Impact</div>
                <div className="text-sm font-medium text-zinc-950">
                  {project.outcomeMetric}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-display text-base font-semibold text-zinc-950 mb-2">
                  The Challenge
                </h3>
                <p className="text-sm leading-relaxed text-zinc-600">
                  {project.problem}
                </p>
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-zinc-950 mb-2">
                  Approach & Craft
                </h3>
                <p className="text-sm leading-relaxed text-zinc-600">
                  {project.approach}
                </p>
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-zinc-950 mb-2">
                  Outcome
                </h3>
                <p className="text-sm leading-relaxed text-zinc-600">
                  {project.outcome}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
