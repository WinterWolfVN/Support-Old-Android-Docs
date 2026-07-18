'use client'

import { BookOpen, Library, Languages, ArrowRight } from 'lucide-react'
import { useLocale } from '@/lib/locale-context'

type Tab = 'home' | 'library' | 'language'

interface HomeProps {
  onNavigate: (tab: Tab) => void
}

const apiVersions = [
  { label: 'Android 5.0', api: 'API 21' },
  { label: 'Android 5.1', api: 'API 22' },
  { label: 'Android 6.0', api: 'API 23' },
  { label: 'Android 7.0', api: 'API 24' },
  { label: 'Android 7.1', api: 'API 25' },
]

export default function Home({ onNavigate }: HomeProps) {
  const { t } = useLocale()

  const quickLinks = [
    {
      tab: 'library' as Tab,
      icon: Library,
      title: t.tabLibrary,
      description: t.libraryDesc,
      bg: 'var(--md-primary-container)',
      onBg: 'var(--md-on-primary-container)',
    },
    {
      tab: 'language' as Tab,
      icon: Languages,
      title: t.tabLanguage,
      description: t.languageDesc,
      bg: 'var(--md-tertiary-container)',
      onBg: 'var(--md-on-tertiary-container)',
    },
  ]

  return (
    <main className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-6">
      {/* Hero banner */}
      <section
        className="rounded-3xl p-6 flex flex-col gap-4"
        style={{ backgroundColor: 'var(--md-primary-container)' }}
        aria-labelledby="hero-heading"
      >
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-12 h-12 rounded-2xl shrink-0"
            style={{ backgroundColor: 'oklch(from var(--md-primary) l c h / 0.15)' }}
            aria-hidden="true"
          >
            <BookOpen size={26} style={{ color: 'var(--md-on-primary-container)' }} />
          </div>
          <div>
            <p
              className="text-xs font-medium uppercase tracking-wider"
              style={{ color: 'var(--md-on-primary-container)', opacity: 0.7 }}
            >
              {t.heroBadge}
            </p>
            <h2
              id="hero-heading"
              className="text-lg font-bold leading-tight text-balance"
              style={{ color: 'var(--md-on-primary-container)' }}
            >
              {t.heroTitle}
            </h2>
          </div>
        </div>

        <p
          className="text-sm leading-relaxed text-pretty"
          style={{ color: 'var(--md-on-primary-container)' }}
        >
          {t.heroBody}
        </p>

        <div
          className="rounded-2xl p-4 flex flex-col gap-2"
          style={{ backgroundColor: 'oklch(from var(--md-on-primary-container) l c h / 0.08)' }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: 'var(--md-on-primary-container)', opacity: 0.7 }}
          >
            {t.heroWhoTitle}
          </p>
          <ul className="flex flex-col gap-1">
            {(t.heroWho as string[]).map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm"
                style={{ color: 'var(--md-on-primary-container)' }}
              >
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: 'var(--md-on-primary-container)' }}
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quick links */}
      <section aria-labelledby="overview-heading">
        <h2
          id="overview-heading"
          className="text-xs font-semibold uppercase tracking-wider mb-3 px-1"
          style={{ color: 'var(--md-on-surface-variant)' }}
        >
          {t.overviewHeading}
        </h2>
        <div className="flex flex-col gap-3">
          {quickLinks.map(({ tab, icon: Icon, title, description, bg, onBg }) => (
            <button
              key={tab}
              onClick={() => onNavigate(tab)}
              className="flex items-center gap-4 rounded-2xl p-4 text-left transition-colors duration-200"
              style={{ backgroundColor: 'var(--md-surface-container)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--md-surface-container-high)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--md-surface-container)'
              }}
              aria-label={`${title}`}
            >
              <div
                className="flex items-center justify-center w-11 h-11 rounded-2xl shrink-0"
                style={{ backgroundColor: bg }}
                aria-hidden="true"
              >
                <Icon size={22} style={{ color: onBg }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold" style={{ color: 'var(--md-on-surface)' }}>
                  {title}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--md-on-surface-variant)' }}>
                  {description}
                </p>
              </div>
              <ArrowRight
                size={16}
                style={{ color: 'var(--md-on-surface-variant)' }}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </section>

      {/* API chips */}
      <section aria-labelledby="api-info-heading">
        <h2
          id="api-info-heading"
          className="text-xs font-semibold uppercase tracking-wider mb-3 px-1"
          style={{ color: 'var(--md-on-surface-variant)' }}
        >
          {t.apiHeading}
        </h2>
        <div className="flex flex-wrap gap-2">
          {apiVersions.map(({ label, api }) => (
            <div
              key={api}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
              style={{ backgroundColor: 'var(--md-secondary-container)' }}
            >
              <span
                className="text-xs font-medium"
                style={{ color: 'var(--md-on-secondary-container)' }}
              >
                {label}
              </span>
              <span
                className="text-xs px-1.5 py-0.5 rounded-full font-mono"
                style={{
                  backgroundColor: 'oklch(from var(--md-on-secondary-container) l c h / 0.12)',
                  color: 'var(--md-on-secondary-container)',
                }}
              >
                {api}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
