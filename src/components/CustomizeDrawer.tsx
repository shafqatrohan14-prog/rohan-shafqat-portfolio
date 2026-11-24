import {ChangeEvent, useEffect, useState} from 'react';
import {Download, Plus, RotateCcw, Trash2, Upload, X} from 'lucide-react';
import {
  ExperienceItem,
  PortfolioData,
  ProjectCategory,
  ProjectItem,
  SpotlightPhoto,
} from '../types/portfolio';

export type DrawerTab = 'profile' | 'photos' | 'projects' | 'experience' | 'links';

interface CustomizeDrawerProps {
  isOpen: boolean;
  initialTab?: DrawerTab;
  data: PortfolioData;
  onChange: (next: PortfolioData) => void;
  onReset: () => void;
  onClose: () => void;
}

const CATEGORIES: ProjectCategory[] = [
  'SaaS',
  'AI Systems',
  'Digital Marketing',
];

export function CustomizeDrawer({
  isOpen,
  initialTab = 'profile',
  data,
  onChange,
  onReset,
  onClose,
}: CustomizeDrawerProps) {
  const [activeTab, setActiveTab] = useState<DrawerTab>(initialTab);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const updateProfile = (
    field: keyof PortfolioData['profile'],
    value: string,
  ) => {
    onChange({
      ...data,
      profile: {
        ...data.profile,
        [field]: value,
      },
    });
  };

  const readFileAsDataUrl = (file: File, cb: (result: string) => void) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        cb(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePortraitUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    readFileAsDataUrl(file, (result) => updateProfile('portraitUrl', result));
  };

  const updateSpotlight = (
    id: string,
    field: keyof SpotlightPhoto,
    value: string,
  ) => {
    onChange({
      ...data,
      spotlights: data.spotlights.map((s) =>
        s.id === id ? {...s, [field]: value} : s,
      ),
    });
  };

  const handleSpotlightUpload = (
    id: string,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    readFileAsDataUrl(file, (result) => updateSpotlight(id, 'imageUrl', result));
  };

  const addSpotlight = () => {
    const nextPhoto: SpotlightPhoto = {
      id: `spotlight-${Date.now()}`,
      title: 'Instagram Highlight',
      kicker: 'Personal Photo · Bahawalpur',
      caption: 'Snapshot from campus, work, or volleyball.',
      imageUrl: '/src/assets/images/about_volleyball_court_1795546663784.jpg',
      imageAlt: 'Personal portfolio photo',
    };
    onChange({
      ...data,
      spotlights: [...data.spotlights, nextPhoto],
    });
  };

  const removeSpotlight = (id: string) => {
    onChange({
      ...data,
      spotlights: data.spotlights.filter((s) => s.id !== id),
    });
  };

  const updateProject = (
    id: string,
    field: keyof ProjectItem,
    value: string | boolean,
  ) => {
    onChange({
      ...data,
      projects: data.projects.map((p) =>
        p.id === id ? {...p, [field]: value} : p,
      ),
    });
  };

  const handleProjectImageUpload = (
    id: string,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    readFileAsDataUrl(file, (result) => updateProject(id, 'imageUrl', result));
  };

  const addProject = () => {
    const newProject: ProjectItem = {
      id: `project-${Date.now()}`,
      title: 'New SaaS / AI Project',
      category: 'SaaS',
      year: String(new Date().getFullYear()),
      client: 'Independent',
      role: 'Builder & Strategist',
      summary: 'Brief overview of the product, AI workflow, or marketing campaign.',
      imageUrl: '/src/assets/images/project_saas_analytics_1795546662829.jpg',
      imageAlt: 'Project preview visual',
      featured: false,
      outcomeMetric: 'Key measurable result',
      problem: 'Describe the core user or business problem.',
      approach: 'Explain the product, AI, or marketing approach taken.',
      outcome: 'Summarize the final outcome.',
      liveUrl: '',
    };
    onChange({
      ...data,
      projects: [newProject, ...data.projects],
    });
  };

  const removeProject = (id: string) => {
    onChange({
      ...data,
      projects: data.projects.filter((p) => p.id !== id),
    });
  };

  const updateExperience = (
    id: string,
    field: keyof ExperienceItem,
    value: string,
  ) => {
    onChange({
      ...data,
      experience: data.experience.map((e) =>
        e.id === id ? {...e, [field]: value} : e,
      ),
    });
  };

  const addExperience = () => {
    const nextItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      period: '2026 — Present',
      role: 'Role Title',
      organization: 'IUB / Studio',
      location: 'Bahawalpur, Pakistan',
      highlight: 'Key focus and accomplishment.',
    };
    onChange({
      ...data,
      experience: [nextItem, ...data.experience],
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.filter((e) => e.id !== id),
    });
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.profile.name.toLowerCase().replace(/\s+/g, '-')}-portfolio.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Customize Portfolio"
      className="fixed inset-0 z-50 flex justify-end bg-zinc-950/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <aside
        className="w-full max-w-xl bg-white h-full border-l border-zinc-200 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between gap-4 shrink-0">
          <div>
            <h2 className="font-display text-lg font-semibold text-zinc-950">
              Customize Portfolio
            </h2>
            <p className="text-xs text-zinc-500">
              Upload your own photos and edit details—saved automatically.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close customizer"
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-100 cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="px-6 py-3 border-b border-zinc-200 bg-[#FAFAFA] flex items-center gap-1 overflow-x-auto shrink-0">
          {(
            ['profile', 'photos', 'projects', 'experience', 'links'] as DrawerTab[]
          ).map((tab) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-white text-zinc-950 border border-zinc-200 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Full Name"
                  value={data.profile.name}
                  onChange={(v) => updateProfile('name', v)}
                />
                <Field
                  label="Location"
                  value={data.profile.location}
                  onChange={(v) => updateProfile('location', v)}
                />
              </div>

              <Field
                label="Role / Focus"
                value={data.profile.role}
                onChange={(v) => updateProfile('role', v)}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Contact Email"
                  value={data.profile.email}
                  onChange={(v) => updateProfile('email', v)}
                />
                <Field
                  label="Availability Line"
                  value={data.profile.availability}
                  onChange={(v) => updateProfile('availability', v)}
                />
              </div>

              <TextAreaField
                label="Hero Headline"
                rows={2}
                value={data.profile.headline}
                onChange={(v) => updateProfile('headline', v)}
              />

              <TextAreaField
                label="Hero Bio"
                rows={3}
                value={data.profile.bio}
                onChange={(v) => updateProfile('bio', v)}
              />

              <TextAreaField
                label="About Lead Statement"
                rows={2}
                value={data.profile.aboutLead}
                onChange={(v) => updateProfile('aboutLead', v)}
              />

              <TextAreaField
                label="About Narrative"
                rows={4}
                value={data.profile.aboutBody}
                onChange={(v) => updateProfile('aboutBody', v)}
              />

              <div className="pt-2 border-t border-zinc-200 space-y-2">
                <label className="block text-xs font-medium text-zinc-700">
                  Hero Portrait Photo
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  <label className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-zinc-800 bg-zinc-100 hover:bg-zinc-200 rounded-lg cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Upload Your Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePortraitUpload}
                      className="sr-only"
                    />
                  </label>
                  <input
                    type="url"
                    value={data.profile.portraitUrl}
                    onChange={(e) => updateProfile('portraitUrl', e.target.value)}
                    placeholder="Or paste an image URL"
                    className="flex-1 min-w-[180px] px-3 py-2 text-xs bg-[#FAFAFA] border border-zinc-200 rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs text-zinc-600">
                  Upload photos from your phone or Instagram archive to publish in
                  the gallery spotlights.
                </p>
                <button
                  type="button"
                  onClick={addSpotlight}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Add Photo</span>
                </button>
              </div>

              <div className="space-y-4">
                {data.spotlights.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-zinc-200 bg-[#FAFAFA] space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-display text-sm font-semibold text-zinc-950 truncate">
                        {item.title}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeSpotlight(item.id)}
                        aria-label={`Remove ${item.title}`}
                        className="p-1.5 text-zinc-500 hover:text-rose-600 rounded-md cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <label className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-zinc-800 bg-white border border-zinc-200 hover:border-zinc-400 rounded-lg cursor-pointer transition-colors">
                        <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Upload Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleSpotlightUpload(item.id, e)}
                          className="sr-only"
                        />
                      </label>
                      <input
                        type="url"
                        value={item.imageUrl}
                        onChange={(e) =>
                          updateSpotlight(item.id, 'imageUrl', e.target.value)
                        }
                        placeholder="Image URL"
                        className="flex-1 min-w-[160px] px-3 py-1.5 text-xs bg-white border border-zinc-200 rounded-lg"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Field
                        label="Title"
                        value={item.title}
                        onChange={(v) => updateSpotlight(item.id, 'title', v)}
                      />
                      <Field
                        label="Kicker"
                        value={item.kicker}
                        onChange={(v) => updateSpotlight(item.id, 'kicker', v)}
                      />
                    </div>

                    <TextAreaField
                      label="Caption"
                      rows={2}
                      value={item.caption}
                      onChange={(v) => updateSpotlight(item.id, 'caption', v)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <p className="text-xs text-zinc-600">
                  {data.projects.length} case studies in your grid
                </p>
                <button
                  type="button"
                  onClick={addProject}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="space-y-5">
                {data.projects.map((project) => (
                  <div
                    key={project.id}
                    className="p-4 rounded-xl border border-zinc-200 bg-[#FAFAFA] space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-display text-sm font-semibold text-zinc-950 truncate">
                        {project.title || 'Untitled Project'}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeProject(project.id)}
                        aria-label={`Delete ${project.title}`}
                        className="p-1.5 text-zinc-500 hover:text-rose-600 rounded-md cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Field
                        label="Title"
                        value={project.title}
                        onChange={(v) => updateProject(project.id, 'title', v)}
                      />
                      <div>
                        <label className="block text-xs font-medium text-zinc-700 mb-1">
                          Category
                        </label>
                        <select
                          value={project.category}
                          onChange={(e) =>
                            updateProject(project.id, 'category', e.target.value)
                          }
                          className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg"
                        >
                          {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Field
                        label="Client / Context"
                        value={project.client}
                        onChange={(v) => updateProject(project.id, 'client', v)}
                      />
                      <Field
                        label="Year"
                        value={project.year}
                        onChange={(v) => updateProject(project.id, 'year', v)}
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <label className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-zinc-800 bg-white border border-zinc-200 hover:border-zinc-400 rounded-lg cursor-pointer transition-colors">
                        <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Upload Cover</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleProjectImageUpload(project.id, e)}
                          className="sr-only"
                        />
                      </label>
                      <input
                        type="url"
                        value={project.imageUrl}
                        onChange={(e) =>
                          updateProject(project.id, 'imageUrl', e.target.value)
                        }
                        placeholder="Cover image URL"
                        className="flex-1 min-w-[160px] px-3 py-1.5 text-xs bg-white border border-zinc-200 rounded-lg"
                      />
                    </div>

                    <TextAreaField
                      label="Summary"
                      rows={2}
                      value={project.summary}
                      onChange={(v) => updateProject(project.id, 'summary', v)}
                    />

                    <Field
                      label="Outcome Metric"
                      value={project.outcomeMetric}
                      onChange={(v) =>
                        updateProject(project.id, 'outcomeMetric', v)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <p className="text-xs text-zinc-600">
                  {data.experience.length} milestones listed
                </p>
                <button
                  type="button"
                  onClick={addExperience}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Add Entry</span>
                </button>
              </div>

              <div className="space-y-4">
                {data.experience.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-zinc-200 bg-[#FAFAFA] space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-display text-sm font-semibold text-zinc-950 truncate">
                        {item.role} · {item.organization}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeExperience(item.id)}
                        aria-label={`Delete ${item.role}`}
                        className="p-1.5 text-zinc-500 hover:text-rose-600 rounded-md cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Field
                        label="Period"
                        value={item.period}
                        onChange={(v) =>
                          updateExperience(item.id, 'period', v)
                        }
                      />
                      <Field
                        label="Role"
                        value={item.role}
                        onChange={(v) => updateExperience(item.id, 'role', v)}
                      />
                      <Field
                        label="Institution / Organization"
                        value={item.organization}
                        onChange={(v) =>
                          updateExperience(item.id, 'organization', v)
                        }
                      />
                      <Field
                        label="Location"
                        value={item.location}
                        onChange={(v) =>
                          updateExperience(item.id, 'location', v)
                        }
                      />
                    </div>

                    <TextAreaField
                      label="Highlight"
                      rows={2}
                      value={item.highlight}
                      onChange={(v) =>
                        updateExperience(item.id, 'highlight', v)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'links' && (
            <div className="space-y-5">
              <Field
                label="Instagram Profile URL"
                value={data.socials.instagram}
                onChange={(v) =>
                  onChange({
                    ...data,
                    socials: {...data.socials, instagram: v},
                  })
                }
              />
              <Field
                label="GitHub URL"
                value={data.socials.github}
                onChange={(v) =>
                  onChange({
                    ...data,
                    socials: {...data.socials, github: v},
                  })
                }
              />
              <Field
                label="LinkedIn URL"
                value={data.socials.linkedin}
                onChange={(v) =>
                  onChange({
                    ...data,
                    socials: {...data.socials, linkedin: v},
                  })
                }
              />
              <Field
                label="X / Twitter URL"
                value={data.socials.twitter}
                onChange={(v) =>
                  onChange({
                    ...data,
                    socials: {...data.socials, twitter: v},
                  })
                }
              />

              <div className="pt-4 border-t border-zinc-200 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleExportJson}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-zinc-800 bg-zinc-100 hover:bg-zinc-200 rounded-lg cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Export Portfolio JSON</span>
                </button>

                <button
                  type="button"
                  onClick={onReset}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Reset to Default</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-zinc-200 bg-white flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-medium text-white bg-zinc-950 hover:bg-[#2563EB] rounded-lg transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-zinc-700 mb-1">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-xs text-zinc-950 bg-white border border-zinc-200 rounded-lg focus:outline-none focus:border-[#2563EB]"
      />
    </div>
  );
}

function TextAreaField({
  label,
  value,
  rows,
  onChange,
}: {
  label: string;
  value: string;
  rows: number;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-zinc-700 mb-1">
        {label}
      </label>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-xs text-zinc-950 bg-white border border-zinc-200 rounded-lg focus:outline-none focus:border-[#2563EB] resize-y"
      />
    </div>
  );
}
