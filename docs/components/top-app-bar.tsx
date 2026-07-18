'use client'

import { Sun, Moon } from 'lucide-react'
import { useLocale } from '@/lib/locale-context'

type Tab = 'home' | 'library' | 'language'

interface TopAppBarProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
  isDark: boolean
  onToggleTheme: () => void
}

export default function TopAppBar({ activeTab, onTabChange, isDark, onToggleTheme }: TopAppBarProps) {
  const { t } = useLocale()

  const tabs: { id: Tab; label: string }[] = [
    { id: 'home', label: t.tabHome },
    { id: 'library', label: t.tabLibrary },
    { id: 'language', label: t.tabLanguage },
  ]

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: 'var(--md-surface-container)',
        boxShadow: '0 2px 4px oklch(0 0 0 / 0.08), 0 1px 2px oklch(0 0 0 / 0.06)',
      }}
    >
      {/* Top row */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ borderBottom: '1px solid var(--md-outline-variant)' }}
      >
        {/* Android logo */}
        <div
          className="flex items-center justify-center w-9 h-9 rounded-full shrink-0"
          style={{ backgroundColor: 'var(--md-primary-container)' }}
          aria-hidden="true"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M17.523 15.341c-.73 0-1.323-.592-1.323-1.323s.593-1.323 1.323-1.323 1.323.592 1.323 1.323-.593 1.323-1.323 1.323zm-11.046 0c-.73 0-1.323-.592-1.323-1.323s.593-1.323 1.323-1.323 1.323.592 1.323 1.323-.593 1.323-1.323 1.323zM17.95 9.5l1.61-2.79a.33.33 0 0 0-.12-.451.33.33 0 0 0-.451.12L17.37 9.2A9.74 9.74 0 0 0 12 8a9.74 9.74 0 0 0-5.37 1.2L5.011 6.38a.33.33 0 0 0-.45-.12.33.33 0 0 0-.12.45L6.05 9.5C3.76 10.86 2.2 13.16 2 15.9h20c-.2-2.74-1.76-5.04-4.05-6.4z"
              fill="var(--md-on-primary-container)"
            />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <h1
            className="text-base font-semibold leading-tight truncate"
            style={{ color: 'var(--md-on-surface)' }}
          >
            {t.appTitle}
          </h1>
          <p
            className="text-xs leading-tight hidden sm:block"
            style={{ color: 'var(--md-on-surface-variant)' }}
          >
            {t.appSubtitle}
          </p>
        </div>

        <button
          onClick={onToggleTheme}
          aria-label={isDark ? t.themeLight : t.themeDark}
          className="flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200"
          style={{ color: 'var(--md-on-surface-variant)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--md-surface-container-highest)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Tab bar */}
      <nav
        className="flex"
        style={{ backgroundColor: 'var(--md-surface-container)' }}
        aria-label={t.appTitle}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              role="tab"
              aria-selected={isActive}
              className="relative flex-1 flex flex-col items-center justify-center py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-none"
              style={{
                color: isActive ? 'var(--md-primary)' : 'var(--md-on-surface-variant)',
              }}
            >
              <span className="relative z-10 px-1">{tab.label}</span>
              {isActive && (
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-16 rounded-t-full"
                  style={{ backgroundColor: 'var(--md-primary)' }}
                  aria-hidden="true"
                />
              )}
            </button>
          )
        })}
      </nav>
    </header>
  )
}
