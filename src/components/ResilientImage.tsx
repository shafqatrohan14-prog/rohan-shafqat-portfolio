import {useState} from 'react';
import {ImageOff} from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-zinc-100 via-zinc-200/70 to-zinc-100 text-zinc-500 p-6 text-center ${className}`}
      >
        <div className="w-10 h-10 rounded-xl border border-zinc-300 bg-white/80 flex items-center justify-center mb-3">
          <ImageOff className="w-4 h-4 text-zinc-500" aria-hidden="true" />
        </div>
        {fallbackTitle && (
          <span className="font-display text-sm font-medium text-zinc-700 max-w-[220px] truncate">
            {fallbackTitle}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
