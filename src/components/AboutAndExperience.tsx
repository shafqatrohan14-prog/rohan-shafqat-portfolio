import {SlidersHorizontal} from 'lucide-react';
import {
  CapabilityItem,
  ExperienceItem,
  PortfolioData,
  SpotlightPhoto,
} from '../types/portfolio';
import {ResilientImage} from './ResilientImage';

interface AboutAndExperienceProps {
  profile: PortfolioData['profile'];
  capabilities: CapabilityItem[];
  experience: ExperienceItem[];
  spotlights: SpotlightPhoto[];
  onOpenPhotoCustomizer: () => void;
}

export function AboutAndExperience({
  profile,
  capabilities,
  experience,
  spotlights,
  onOpenPhotoCustomizer,
}: AboutAndExperienceProps) {
  return (
    <>
      <section id="about" className="py-16 sm:py-24 border-t border-zinc-200 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5 space-y-5">
              <p className="text-xs font-medium text-zinc-500">
                About & Practice
              </p>
              <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-zinc-950 [text-wrap:balance]">
                {profile.aboutLead}
              </h2>
              <p className="text-[15px] sm:text-base leading-[1.7] text-zinc-600">
                {profile.aboutBody}
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="divide-y divide-zinc-200 border-y border-zinc-200">
                {capabilities.map((item) => (
                  <div
                    key={item.id}
                    className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline"
                  >
                    <div className="sm:col-span-5 flex items-baseline gap-3">
                      <span className="font-mono text-xs text-zinc-400 tabular-nums shrink-0">
                        {item.index}
                      </span>
                      <h3 className="font-display text-lg font-semibold text-zinc-950">
                        {item.title}
                      </h3>
                    </div>
                    <p className="sm:col-span-7 text-sm leading-relaxed text-zinc-600">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="py-16 sm:py-24 border-t border-zinc-200">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="max-w-xl mb-10">
            <p className="text-xs font-medium text-zinc-500 mb-2">
              Education & Journey · IUB & PGC BWP
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-zinc-950 [text-wrap:balance]">
              Academic roots in Bahawalpur and hands-on product building.
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-zinc-200 divide-y divide-zinc-200">
            {experience.map((item) => (
              <div
                key={item.id}
                className="p-6 sm:px-8 sm:py-7 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start"
              >
                <div className="md:col-span-3">
                  <div className="font-mono text-xs sm:text-sm font-medium text-zinc-900 tabular-nums">
                    {item.period}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">
                    {item.organization} · {item.location}
                  </div>
                </div>

                <div className="md:col-span-4">
                  <h3 className="font-display text-lg font-semibold text-zinc-950">
                    {item.role}
                  </h3>
                </div>

                <p className="md:col-span-5 text-sm leading-relaxed text-zinc-600">
                  {item.highlight}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <p className="text-xs font-medium text-zinc-500 mb-1">
                  Beyond the Screen · Volleyball & Campus Life
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-zinc-950">
                  Court rhythm, Bahawalpur, and personal highlights.
                </h3>
              </div>

              <button
                type="button"
                onClick={onOpenPhotoCustomizer}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-zinc-800 bg-white border border-zinc-200 hover:border-zinc-400 rounded-lg transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-600" aria-hidden="true" />
                <span>Update Photos</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {spotlights.map((item) => (
                <figure
                  key={item.id}
                  className="rounded-2xl border border-zinc-200 bg-white overflow-hidden flex flex-col"
                >
                  <div className="aspect-[4/3] w-full bg-zinc-100 border-b border-zinc-200 overflow-hidden">
                    <ResilientImage
                      src={item.imageUrl}
                      alt={item.imageAlt}
                      fallbackTitle={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <figcaption className="p-6 sm:p-7 space-y-2">
                    <div className="text-xs text-zinc-500">{item.kicker}</div>
                    <h4 className="font-display text-lg sm:text-xl font-semibold text-zinc-950">
                      {item.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-zinc-600">
                      {item.caption}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
