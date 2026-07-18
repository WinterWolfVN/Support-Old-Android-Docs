'use client'

import { Check, Globe } from 'lucide-react'
import { useLocale, LOCALES } from '@/lib/locale-context'

export default function Language() {
  const { locale, t, setLocale } = useLocale()

  return (
    <main className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-6">
      {/* Heading */}
      <div className="flex flex-col gap-1 px-1">
        <h2 className="text-xl font-bold" style={{ color: 'var(--md-on-surface)' }}>
          {t.langHeading}
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--md-on-surface-variant)' }}>
          {t.langSubheading}
        </p>
      </div>

      {/* Current language hero */}
      <section
        aria-labelledby="current-lang-heading"
        className="rounded-3xl p-5 flex items-center gap-4"
        style={{ backgroundColor: 'var(--md-primary-container)' }}
      >
        <div
          className="flex items-center justify-center w-12 h-12 rounded-2xl text-2xl shrink-0"
          style={{ backgroundColor: 'oklch(from var(--md-primary) l c h / 0.15)' }}
          aria-hidden="true"
        >
          {LOCALES.find((l) => l.code === locale)?.flag}
        </div>
        <div className="flex-1 min-w-0">
          <p
            className="text-xs font-medium uppercase tracking-wider"
            style={{ color: 'var(--md-on-primary-container)', opacity: 0.7 }}
          >
            {t.langCurrentLabel}
          </p>
          <h3
            id="current-lang-heading"
            className="text-base font-bold"
            style={{ color: 'var(--md-on-primary-container)' }}
          >
            {LOCALES.find((l) => l.code === locale)?.nativeName}
          </h3>
        </div>
        <span
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full shrink-0"
          style={{
            backgroundColor: 'oklch(from var(--md-on-primary-container) l c h / 0.12)',
            color: 'var(--md-on-primary-container)',
          }}
        >
          <Globe size={12} aria-hidden="true" />
          {t.langAutoNote}
        </span>
      </section>

      {/* All languages list */}
      <section aria-labelledby="other-lang-heading">
        <p
          id="other-lang-heading"
          className="text-xs font-semibold uppercase tracking-wider mb-3 px-1"
          style={{ color: 'var(--md-on-surface-variant)' }}
        >
          {t.langOtherLabel}
        </p>
        <div className="flex flex-col gap-2">
          {LOCALES.map((lang) => {
            const isActive = lang.code === locale
            return (
              <button
                key={lang.code}
                onClick={() => setLocale(lang.code)}
                disabled={isActive}
                aria-pressed={isActive}
                className="flex items-center gap-4 rounded-2xl p-4 text-left transition-colors duration-200 w-full"
                style={{
                  backgroundColor: isActive
                    ? 'var(--md-secondary-container)'
                    : 'var(--md-surface-container)',
                  cursor: isActive ? 'default' : 'pointer',
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    e.currentTarget.style.backgroundColor = 'var(--md-surface-container-high)'
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    e.currentTarget.style.backgroundColor = 'var(--md-surface-container)'
                }}
              >
                {/* Flag */}
                <div
                  className="flex items-center justify-center w-11 h-11 rounded-2xl text-2xl shrink-0"
                  style={{
                    backgroundColor: isActive
                      ? 'oklch(from var(--md-on-secondary-container) l c h / 0.1)'
                      : 'var(--md-surface-container-high)',
                  }}
                  aria-hidden="true"
                >
                  {lang.flag}
                </div>

                {/* Name + code */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-semibold"
                    style={{
                      color: isActive
                        ? 'var(--md-on-secondary-container)'
                        : 'var(--md-on-surface)',
                    }}
                  >
                    {lang.nativeName}
                  </p>
                  <p
                    className="text-xs font-mono mt-0.5"
                    style={{ color: 'var(--md-on-surface-variant)' }}
                  >
                    {lang.code.toUpperCase()}
                  </p>
                </div>

                {/* Active checkmark */}
                {isActive && (
                  <div
                    className="flex items-center justify-center w-8 h-8 rounded-full shrink-0"
                    style={{
                      backgroundColor: 'var(--md-secondary)',
                    }}
                    aria-label="Đang chọn"
                  >
                    <Check size={16} style={{ color: 'var(--md-on-secondary)' }} aria-hidden="true" />
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </section>
    </main>
  )
}
