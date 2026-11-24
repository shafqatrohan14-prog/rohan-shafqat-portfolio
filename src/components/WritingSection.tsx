import {useEffect, useState} from 'react';
import {ArrowUpRight, X} from 'lucide-react';
import {WritingNote} from '../types/portfolio';

interface WritingSectionProps {
  notes: WritingNote[];
}

export function WritingSection({notes}: WritingSectionProps) {
  const [activeNote, setActiveNote] = useState<WritingNote | null>(null);

  useEffect(() => {
    if (!activeNote) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveNote(null);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeNote]);

  return (
    <section id="writing" className="py-16 sm:py-24 border-t border-zinc-200 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="max-w-xl">
            <p className="text-xs font-medium text-zinc-500 mb-2">
              Writing & Field Notes
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-zinc-950 [text-wrap:balance]">
              Essays on interface craft and software ergonomics.
            </h2>
          </div>
        </div>

        <div className="divide-y divide-zinc-200 border-y border-zinc-200">
          {notes.map((note) => (
            <button
              key={note.id}
              type="button"
              onClick={() => setActiveNote(note)}
              className="group w-full py-7 text-left grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-sm"
            >
              <div className="md:col-span-3 flex items-center gap-2 text-xs text-zinc-500">
                <span>{note.category}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{note.date}</span>
              </div>

              <div className="md:col-span-7">
                <h3 className="font-display text-lg sm:text-xl font-semibold text-zinc-950 group-hover:text-[#2563EB] transition-colors">
                  {note.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 leading-relaxed max-w-2xl">
                  {note.excerpt}
                </p>
              </div>

              <div className="md:col-span-2 flex items-center md:justify-end gap-2 text-xs font-medium text-zinc-600 group-hover:text-[#2563EB] transition-colors">
                <span className="whitespace-nowrap">{note.readTime}</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {activeNote && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="note-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/75 backdrop-blur-xs overflow-y-auto"
          onClick={() => setActiveNote(null)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-2xl border border-zinc-200 overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200">
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <span>{activeNote.category}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{activeNote.date}</span>
                <span aria-hidden="true">·</span>
                <span>{activeNote.readTime}</span>
              </div>

              <button
                type="button"
                onClick={() => setActiveNote(null)}
                aria-label="Close essay"
                className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-950 text-white hover:bg-[#2563EB] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <article className="p-6 sm:p-10 space-y-5">
              <h2
                id="note-modal-title"
                className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 [text-wrap:balance]"
              >
                {activeNote.title}
              </h2>
              <div className="space-y-4 text-[15px] sm:text-base leading-[1.75] text-zinc-700">
                {activeNote.body.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </article>
          </div>
        </div>
      )}
    </section>
  );
}
