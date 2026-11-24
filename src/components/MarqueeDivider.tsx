const PHRASES = [
  'saas products',
  'ai workflows',
  'digital marketing',
  'iub bahawalpur',
  'pgc bwp alumnus',
  'volleyball',
];

export function MarqueeDivider() {
  const repeated = [...PHRASES, ...PHRASES, ...PHRASES];

  return (
    <div
      aria-hidden="true"
      className="border-y border-zinc-200 bg-white overflow-hidden py-3.5 select-none"
    >
      <div className="animate-marquee flex items-center gap-6 text-xs sm:text-sm font-medium text-zinc-500 tracking-wide">
        {repeated.map((phrase, idx) => (
          <span key={`${phrase}-${idx}`} className="flex items-center gap-6 shrink-0">
            <span className="whitespace-nowrap">{phrase}</span>
            <span className="text-zinc-300">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
