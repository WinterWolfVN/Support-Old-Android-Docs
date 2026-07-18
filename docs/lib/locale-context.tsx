'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type Locale = 'vi' | 'en' | 'zh' | 'id' | 'de'

export const LOCALES: { code: Locale; nativeName: string; flag: string }[] = [
  { code: 'vi', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'en', nativeName: 'English', flag: '🇬🇧' },
  { code: 'zh', nativeName: '中文', flag: '🇨🇳' },
  { code: 'id', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'de', nativeName: 'Deutsch', flag: '🇩🇪' },
]

/* ─── All UI strings ──────────────────────────────────────────────────── */
export const translations = {
  vi: {
    appTitle: 'Tài liệu Android cũ',
    appSubtitle: 'Hỗ trợ Android 5.0 – 7.1',
    tabHome: 'Trang Chủ',
    tabLibrary: 'Thư viện',
    tabLanguage: 'Ngôn ngữ',
    heroBadge: 'Tài liệu hỗ trợ',
    heroTitle: 'Chào mừng bạn đến với Tài liệu hỗ trợ Android cũ',
    heroBody: 'Tài liệu này sẽ giúp đỡ bạn nên dùng thư viện nào và dạng code nào hỗ trợ Android cũ — từ Android 5.0 (API 21) đến Android 7.1 (API 25).',
    heroWhoTitle: 'Dành cho ai?',
    heroWho: ['Lập trình viên Android cần hỗ trợ thiết bị cũ', 'Dự án có minSdk = 21 hoặc thấp hơn', 'Muốn dùng Java 8+ API trên Android 5 – 7'],
    overviewHeading: 'Khám phá',
    libraryDesc: 'Desugar, AndroidX Core, Multidex, Material Components',
    languageDesc: 'Tự động theo ngôn ngữ trình duyệt',
    apiHeading: 'Phạm vi hỗ trợ',
    libraryHeading: 'Thư viện',
    librarySubheading: 'Các thư viện hỗ trợ Android 5 – 7. Nhấn vào từng thư viện để xem chi tiết.',
    versionsLabel: '3 phiên bản',
    desugarEnableTitle: 'Bật Desugaring trong build.gradle (app)',
    langHeading: 'Ngôn ngữ',
    langSubheading: 'Giao diện tự động theo ngôn ngữ trình duyệt. Bạn cũng có thể đổi thủ công bên dưới.',
    langCurrentLabel: 'Ngôn ngữ hiện tại',
    langAutoNote: 'Tự động phát hiện',
    langOtherLabel: 'Ngôn ngữ khác',
    footerText: 'Tài liệu hỗ trợ Android cũ — Mã nguồn mở trên GitHub · Material Design 3',
    themeLight: 'Chuyển sang sáng',
    themeDark: 'Chuyển sang tối',
  },
  en: {
    appTitle: 'Legacy Android Docs',
    appSubtitle: 'Android 5.0 – 7.1 Support',
    tabHome: 'Home',
    tabLibrary: 'Library',
    tabLanguage: 'Language',
    heroBadge: 'Documentation',
    heroTitle: 'Welcome to Legacy Android Documentation',
    heroBody: 'This guide helps you choose the right libraries and code patterns to support older Android versions — from Android 5.0 (API 21) to Android 7.1 (API 25).',
    heroWhoTitle: 'Who is this for?',
    heroWho: ['Android developers supporting older devices', 'Projects with minSdk = 21 or lower', 'Anyone who needs Java 8+ APIs on Android 5 – 7'],
    overviewHeading: 'Explore',
    libraryDesc: 'Desugar, AndroidX Core, Multidex, Material Components',
    languageDesc: 'Auto-detected from your browser',
    apiHeading: 'Supported range',
    libraryHeading: 'Library',
    librarySubheading: 'Libraries for Android 5 – 7 support. Tap each library to see details.',
    versionsLabel: '3 versions',
    desugarEnableTitle: 'Enable Desugaring in build.gradle (app)',
    langHeading: 'Language',
    langSubheading: 'The UI is auto-detected from your browser language. You can also switch manually below.',
    langCurrentLabel: 'Current language',
    langAutoNote: 'Auto-detected',
    langOtherLabel: 'Other languages',
    footerText: 'Legacy Android Docs — Open source on GitHub · Material Design 3',
    themeLight: 'Switch to light',
    themeDark: 'Switch to dark',
  },
  zh: {
    appTitle: 'Android 旧版文档',
    appSubtitle: '支持 Android 5.0 – 7.1',
    tabHome: '主页',
    tabLibrary: '库',
    tabLanguage: '语言',
    heroBadge: '文档支持',
    heroTitle: '欢迎来到 Android 旧版支持文档',
    heroBody: '本文档将帮助您选择适合的库和代码方式，以支持旧版 Android — 从 Android 5.0（API 21）到 Android 7.1（API 25）。',
    heroWhoTitle: '适合谁？',
    heroWho: ['需要支持旧设备的 Android 开发者', 'minSdk = 21 或更低的项目', '希望在 Android 5–7 上使用 Java 8+ API 的开发者'],
    overviewHeading: '探索',
    libraryDesc: 'Desugar、AndroidX Core、Multidex、Material Components',
    languageDesc: '自动检测浏览器语言',
    apiHeading: '支持范围',
    libraryHeading: '库',
    librarySubheading: '支持 Android 5–7 的库。点击每个库查看详情。',
    versionsLabel: '3 个版本',
    desugarEnableTitle: '在 build.gradle (app) 中启用 Desugaring',
    langHeading: '语言',
    langSubheading: '界面语言根据浏览器自动检测，也可在下方手动切换。',
    langCurrentLabel: '当前语言',
    langAutoNote: '自动检测',
    langOtherLabel: '其他语言',
    footerText: 'Android 旧版文档 — 在 GitHub 上开源 · Material Design 3',
    themeLight: '切换到浅色',
    themeDark: '切换到深色',
  },
  id: {
    appTitle: 'Docs Android Lama',
    appSubtitle: 'Dukungan Android 5.0 – 7.1',
    tabHome: 'Beranda',
    tabLibrary: 'Perpustakaan',
    tabLanguage: 'Bahasa',
    heroBadge: 'Dokumentasi',
    heroTitle: 'Selamat datang di Dokumentasi Android Lama',
    heroBody: 'Panduan ini membantu Anda memilih library dan pola kode yang tepat untuk mendukung Android lama — dari Android 5.0 (API 21) hingga Android 7.1 (API 25).',
    heroWhoTitle: 'Untuk siapa?',
    heroWho: ['Developer Android yang mendukung perangkat lama', 'Proyek dengan minSdk = 21 atau lebih rendah', 'Yang ingin menggunakan Java 8+ API di Android 5–7'],
    overviewHeading: 'Jelajahi',
    libraryDesc: 'Desugar, AndroidX Core, Multidex, Material Components',
    languageDesc: 'Terdeteksi otomatis dari browser',
    apiHeading: 'Rentang dukungan',
    libraryHeading: 'Perpustakaan',
    librarySubheading: 'Library untuk dukungan Android 5–7. Ketuk setiap library untuk melihat detail.',
    versionsLabel: '3 versi',
    desugarEnableTitle: 'Aktifkan Desugaring di build.gradle (app)',
    langHeading: 'Bahasa',
    langSubheading: 'Bahasa antarmuka terdeteksi otomatis dari browser. Anda juga bisa menggantinya di bawah.',
    langCurrentLabel: 'Bahasa saat ini',
    langAutoNote: 'Terdeteksi otomatis',
    langOtherLabel: 'Bahasa lain',
    footerText: 'Docs Android Lama — Open source di GitHub · Material Design 3',
    themeLight: 'Beralih ke terang',
    themeDark: 'Beralih ke gelap',
  },
  de: {
    appTitle: 'Legacy Android Docs',
    appSubtitle: 'Android 5.0 – 7.1 Unterstützung',
    tabHome: 'Startseite',
    tabLibrary: 'Bibliothek',
    tabLanguage: 'Sprache',
    heroBadge: 'Dokumentation',
    heroTitle: 'Willkommen bei der Legacy Android Dokumentation',
    heroBody: 'Dieser Leitfaden hilft Ihnen, die richtigen Bibliotheken und Code-Muster für ältere Android-Versionen zu wählen — von Android 5.0 (API 21) bis Android 7.1 (API 25).',
    heroWhoTitle: 'Für wen ist das?',
    heroWho: ['Android-Entwickler, die ältere Geräte unterstützen', 'Projekte mit minSdk = 21 oder niedriger', 'Alle, die Java 8+ APIs auf Android 5–7 nutzen möchten'],
    overviewHeading: 'Entdecken',
    libraryDesc: 'Desugar, AndroidX Core, Multidex, Material Components',
    languageDesc: 'Automatisch aus Browser erkannt',
    apiHeading: 'Unterstützter Bereich',
    libraryHeading: 'Bibliothek',
    librarySubheading: 'Bibliotheken für Android 5–7 Unterstützung. Tippen Sie auf eine Bibliothek für Details.',
    versionsLabel: '3 Versionen',
    desugarEnableTitle: 'Desugaring in build.gradle (app) aktivieren',
    langHeading: 'Sprache',
    langSubheading: 'Die Sprache wird automatisch aus dem Browser erkannt. Sie können sie auch manuell wechseln.',
    langCurrentLabel: 'Aktuelle Sprache',
    langAutoNote: 'Automatisch erkannt',
    langOtherLabel: 'Andere Sprachen',
    footerText: 'Legacy Android Docs — Open source auf GitHub · Material Design 3',
    themeLight: 'Zu Hell wechseln',
    themeDark: 'Zu Dunkel wechseln',
  },
}

export type T = typeof translations.vi

/* ─── Detect best locale ─────────────────────────────────────────────── */
function detectLocale(): Locale {
  const saved = typeof localStorage !== 'undefined'
    ? (localStorage.getItem('wiki-locale') as Locale | null)
    : null
  if (saved && saved in translations) return saved

  const langs = typeof navigator !== 'undefined'
    ? [...(navigator.languages ?? []), navigator.language]
    : []

  for (const lang of langs) {
    const code = lang.toLowerCase()
    if (code.startsWith('vi')) return 'vi'
    if (code.startsWith('zh')) return 'zh'
    if (code.startsWith('id')) return 'id'
    if (code.startsWith('de')) return 'de'
    if (code.startsWith('en')) return 'en'
  }
  return 'vi'
}

/* ─── Context ─────────────────────────────────────────────────────────── */
interface LocaleContextValue {
  locale: Locale
  t: T
  setLocale: (l: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'vi',
  t: translations.vi,
  setLocale: () => {},
})

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('vi')

  useEffect(() => {
    setLocaleState(detectLocale())
  }, [])

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    localStorage.setItem('wiki-locale', l)
  }

  return (
    <LocaleContext.Provider value={{ locale, t: translations[locale], setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  return useContext(LocaleContext)
}
