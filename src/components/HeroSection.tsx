import {ArrowDownRight, SlidersHorizontal} from 'lucide-react';
import {MetricItem, PortfolioData} from '../types/portfolio';
import {ResilientImage} from './ResilientImage';

interface HeroSectionProps {
  profile: PortfolioData['profile'];
  metrics: MetricItem[];
  onExploreWork: () => void;
  onOpenCustomizer: () => void;
}

export function HeroSection({
  profile,
  metrics,
  onExploreWork,
  onOpenCustomizer,
}: HeroSectionProps) {
  return (
    <section id="top" className="pt-10 pb-14 sm:pt-14 sm:pb-16">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between py-1">
            <div>
              <p className="text-xs sm:text-sm font-medium text-zinc-600 mb-5 flex flex-wrap items-center gap-2">
                <span>{profile.role}</span>
                <span aria-hidden="true" className="text-zinc-400">
                  ·
                </span>
                <span>{profile.location}</span>
              </p>

              <h1 className="font-display text-[clamp(2.25rem,4.3vw,3.75rem)] font-semibold leading-[1.06] tracking-tight text-zinc-950 [text-wrap:balance] mb-6">
                {profile.headline}
              </h1>

              <p className="text-base sm:text-[17px] leading-[1.65] text-zinc-600 max-w-[60ch]">
                {profile.bio}
              </p>
            </div>

            <div className="mt-8 pt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onExploreWork}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
              >
                <span>Explore Selected Work</span>
                <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onOpenCustomizer}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-zinc-800 bg-white border border-zinc-200 hover:border-zinc-400 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              >
                <SlidersHorizontal className="w-4 h-4 text-zinc-600" aria-hidden="true" />
                <span>Customize Portfolio</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative h-full min-h-[340px] sm:min-h-[420px] lg:min-h-0 rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-100">
              <ResilientImage
                src={profile.portraitUrl}
                alt={`Portrait of ${profile.name}`}
                fallbackTitle={profile.name}
                className="w-full h-full lg:h-full object-cover object-center"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 pt-14 text-white">
                <p className="text-xs font-medium text-white/95">
                  {profile.availability}
                </p>
                <p className="text-xs text-white/75 mt-1">
                  {profile.portraitCaption}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-200 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {metrics.map((metric) => (
            <div key={metric.id} className="space-y-1">
              <div className="font-display text-2xl sm:text-[28px] font-semibold tracking-tight text-zinc-950 tabular-nums">
                {metric.value}
              </div>
              <div className="text-sm font-medium text-zinc-800">
                {metric.label}
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                {metric.context}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
