import {FormEvent, useState} from 'react';
import {Check, Copy, RotateCcw, Send, SlidersHorizontal} from 'lucide-react';
import {PortfolioData} from '../types/portfolio';

interface ContactSectionProps {
  profile: PortfolioData['profile'];
  socials: PortfolioData['socials'];
  isCustomized: boolean;
  onOpenCustomizer: () => void;
  onResetPortfolio: () => void;
}

const SCOPES = [
  'SaaS Product',
  'AI Automation',
  'Digital Marketing',
  'Collaboration',
];

export function ContactSection({
  profile,
  socials,
  isCustomized,
  onOpenCustomizer,
  onResetPortfolio,
}: ContactSectionProps) {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [scope, setScope] = useState(SCOPES[0]);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in your name, email address, and a brief note.');
      return;
    }
    setError('');
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <>
      <section id="contact" className="py-16 sm:py-24 border-t border-zinc-200">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5 space-y-6">
              <div>
                <p className="text-xs font-medium text-zinc-500 mb-2">
                  Get in Touch
                </p>
                <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-zinc-950 [text-wrap:balance]">
                  Let’s build SaaS, AI, or growth campaigns together.
                </h2>
              </div>

              <p className="text-[15px] leading-[1.65] text-zinc-600 max-w-md">
                {profile.availability}. Based in {profile.location}—reach out
                directly by email, connect on Instagram, or send a note here.
              </p>

              <div className="pt-2 space-y-3">
                <div className="text-xs text-zinc-500">Direct Email</div>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${profile.email}`}
                    className="font-display text-lg font-medium text-zinc-950 hover:text-[#2563EB] transition-colors break-all"
                  >
                    {profile.email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 bg-white border border-zinc-200 hover:border-zinc-400 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#2563EB]" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-500" aria-hidden="true" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200 flex flex-wrap items-center gap-6 text-sm font-medium text-zinc-700">
                {socials.instagram && (
                  <a
                    href={socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#2563EB] transition-colors whitespace-nowrap"
                  >
                    Instagram
                  </a>
                )}
                {socials.github && (
                  <a
                    href={socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#2563EB] transition-colors whitespace-nowrap"
                  >
                    GitHub
                  </a>
                )}
                {socials.linkedin && (
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#2563EB] transition-colors whitespace-nowrap"
                  >
                    LinkedIn
                  </a>
                )}
                {socials.twitter && (
                  <a
                    href={socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#2563EB] transition-colors whitespace-nowrap"
                  >
                    X / Twitter
                  </a>
                )}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
                {submitted ? (
                  <div className="py-10 text-center space-y-4">
                    <div className="w-11 h-11 rounded-xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center mx-auto">
                      <Check className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-zinc-950">
                      Message prepared for {profile.name}
                    </h3>
                    <p className="text-sm text-zinc-600 max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out. For direct correspondence, you can
                      also email {profile.email}.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="inline-flex items-center justify-center px-4 py-2 text-xs font-medium text-zinc-800 border border-zinc-200 hover:border-zinc-400 rounded-lg cursor-pointer"
                    >
                      Send Another Note
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-medium text-zinc-700 mb-1.5"
                        >
                          Your Name
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Hamza Ali"
                          className="w-full px-3.5 py-2.5 text-sm text-zinc-950 bg-[#FAFAFA] border border-zinc-200 rounded-lg focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-medium text-zinc-700 mb-1.5"
                        >
                          Email Address
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="hamza@company.com"
                          className="w-full px-3.5 py-2.5 text-sm text-zinc-950 bg-[#FAFAFA] border border-zinc-200 rounded-lg focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15"
                        />
                      </div>
                    </div>

                    <div>
                      <span className="block text-xs font-medium text-zinc-700 mb-2">
                        Project Focus
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {SCOPES.map((item) => {
                          const selected = scope === item;
                          return (
                            <button
                              key={item}
                              type="button"
                              onClick={() => setScope(item)}
                              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                                selected
                                  ? 'bg-zinc-950 text-white border-zinc-950'
                                  : 'bg-[#FAFAFA] text-zinc-700 border-zinc-200 hover:border-zinc-400'
                              }`}
                            >
                              {item}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-medium text-zinc-700 mb-1.5"
                      >
                        Project Details
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Share what you are building in SaaS, AI, or digital marketing..."
                        className="w-full px-3.5 py-2.5 text-sm text-zinc-950 bg-[#FAFAFA] border border-zinc-200 rounded-lg focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 resize-y"
                      />
                    </div>

                    {error && (
                      <p role="alert" className="text-xs font-medium text-rose-600">
                        {error}
                      </p>
                    )}

                    <div className="flex items-center justify-between gap-4 pt-1">
                      <span className="text-xs text-zinc-500">
                        Typical reply within 1–2 business days
                      </span>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
                      >
                        <span>Send Message</span>
                        <Send className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-200 bg-white py-8">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium text-zinc-900">
              © {new Date().getFullYear()} {profile.name}
            </span>
            <span aria-hidden="true">·</span>
            <span>{profile.location}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onOpenCustomizer}
              className="inline-flex items-center gap-1.5 text-zinc-700 hover:text-[#2563EB] transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Customize Portfolio</span>
            </button>

            {isCustomized && (
              <button
                type="button"
                onClick={onResetPortfolio}
                className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Reset Defaults</span>
              </button>
            )}
          </div>
        </div>
      </footer>
    </>
  );
}
