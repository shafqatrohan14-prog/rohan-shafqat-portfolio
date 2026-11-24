import {useState} from 'react';
import {Menu, X} from 'lucide-react';

interface HeaderProps {
  name: string;
  onContactClick: () => void;
}

const NAV_ITEMS = [
  {label: 'Work', href: '#work'},
  {label: 'About', href: '#about'},
  {label: 'Experience', href: '#experience'},
  {label: 'Writing', href: '#writing'},
  {label: 'Contact', href: '#contact'},
];

export function Header({name, onContactClick}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMobileNav = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    target?.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAFA]/90 backdrop-blur-md border-b border-zinc-200/80">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
        <a
          href="#top"
          className="font-display text-lg font-semibold tracking-tight text-zinc-950 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-sm"
        >
          {name}
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 hover:text-zinc-950 transition-colors duration-150 whitespace-nowrap shrink-0 after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-0 after:bg-[#2563EB] hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-sm"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onContactClick}
            className="hidden md:inline-flex items-center justify-center px-4 py-2 text-xs font-medium text-white bg-zinc-950 hover:bg-[#2563EB] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
          >
            Get in Touch
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-zinc-200 bg-white text-zinc-900 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-[#FAFAFA] px-5 py-4 space-y-2">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => handleMobileNav(item.href)}
                className="w-full text-left px-3 py-2.5 text-sm font-medium text-zinc-800 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onContactClick();
            }}
            className="w-full mt-2 px-4 py-2.5 text-sm font-medium text-white bg-[#2563EB] rounded-lg cursor-pointer"
          >
            Get in Touch
          </button>
        </div>
      )}
    </header>
  );
}
