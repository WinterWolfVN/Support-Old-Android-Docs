'use client'

import { useState, useEffect } from 'react'
import { LocaleProvider, useLocale } from '@/lib/locale-context'
import TopAppBar from '@/components/top-app-bar'
import Home from '@/components/home'
import Library from '@/components/library'
import Language from '@/components/language'

type Tab = 'home' | 'library' | 'language'

function WikiContent() {
  const { t } = useLocale()
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDark(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }
  }, [isDark])

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: 'var(--md-background)' }}
    >
      <TopAppBar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isDark={isDark}
        onToggleTheme={() => setIsDark((v) => !v)}
      />

      <div className="flex-1">
        {activeTab === 'home' && <Home onNavigate={handleTabChange} />}
        {activeTab === 'library' && <Library />}
        {activeTab === 'language' && <Language />}
      </div>

      <footer
        className="text-center py-4 px-4 text-xs mt-6"
        style={{
          borderTop: '1px solid var(--md-outline-variant)',
          color: 'var(--md-on-surface-variant)',
          backgroundColor: 'var(--md-surface-container-low)',
        }}
      >
        {t.footerText}
      </footer>
    </div>
  )
}

export default function WikiPage() {
  return (
    <LocaleProvider>
      <WikiContent />
    </LocaleProvider>
  )
}
