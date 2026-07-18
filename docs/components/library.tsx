'use client'

import { ChevronDown, ChevronUp, Package, Layers, Palette, Cpu } from 'lucide-react'
import { useState } from 'react'
import { useLocale } from '@/lib/locale-context'

/* ─── Types ─────────────────────────────────────────────────────────── */
interface Version {
  name: string
  artifact: string
  badge: string
  badgeColor: 'primary' | 'secondary' | 'tertiary'
  gradle: string
  minApi: string
  description: string
  note?: string
}

interface Library {
  id: string
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>
  title: string
  subtitle: string
  description: string
  versions?: Version[]
  sections?: { heading: string; body: string; isCode?: boolean }[]
}

/* ─── Badge color helper ─────────────────────────────────────────────── */
function badgeStyle(color: Version['badgeColor']) {
  const map = {
    primary: { bg: 'var(--md-primary-container)', text: 'var(--md-on-primary-container)' },
    secondary: { bg: 'var(--md-secondary-container)', text: 'var(--md-on-secondary-container)' },
    tertiary: { bg: 'var(--md-tertiary-container)', text: 'var(--md-on-tertiary-container)' },
  }
  return map[color]
}

/* ─── Code block ─────────────────────────────────────────────────────── */
function CodeBlock({ code }: { code: string }) {
  return (
    <pre
      className="rounded-xl p-3 text-xs font-mono leading-relaxed overflow-x-auto mt-2"
      style={{
        backgroundColor: 'var(--md-surface-container-highest)',
        color: 'var(--md-on-surface)',
      }}
    >
      <code>{code}</code>
    </pre>
  )
}

/* ─── Version card ───────────────────────────────────────────────────── */
function VersionCard({ version }: { version: Version }) {
  const { bg, text } = badgeStyle(version.badgeColor)
  return (
    <div
      className="rounded-2xl p-4 flex flex-col gap-2 border"
      style={{
        backgroundColor: 'var(--md-surface-container)',
        borderColor: 'var(--md-outline-variant)',
      }}
    >
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className="text-xs font-bold px-2.5 py-1 rounded-full font-mono"
          style={{ backgroundColor: bg, color: text }}
        >
          {version.badge}
        </span>
        <span className="text-sm font-semibold" style={{ color: 'var(--md-on-surface)' }}>
          {version.name}
        </span>
        <span
          className="ml-auto text-xs font-mono px-2 py-0.5 rounded-lg shrink-0"
          style={{
            backgroundColor: 'var(--md-surface-container-high)',
            color: 'var(--md-on-surface-variant)',
          }}
        >
          {version.minApi}
        </span>
      </div>

      <p
        className="text-xs font-mono px-2 py-1 rounded-lg"
        style={{
          backgroundColor: 'var(--md-surface-container-highest)',
          color: 'var(--md-on-surface-variant)',
        }}
      >
        com.android.tools:{version.artifact}
      </p>

      <p
        className="text-sm leading-relaxed text-pretty"
        style={{ color: 'var(--md-on-surface-variant)' }}
      >
        {version.description}
      </p>

      {version.note && (
        <p
          className="text-xs font-medium px-3 py-1.5 rounded-lg"
          style={{
            backgroundColor: 'var(--md-tertiary-container)',
            color: 'var(--md-on-tertiary-container)',
          }}
        >
          {version.note}
        </p>
      )}

      <CodeBlock code={version.gradle} />
    </div>
  )
}

/* ─── Library card ───────────────────────────────────────────────────── */
function LibraryCard({ lib, versionsLabel, desugarEnableTitle }: {
  lib: Library
  versionsLabel: string
  desugarEnableTitle: string
}) {
  const [expanded, setExpanded] = useState(false)
  const Icon = lib.icon

  return (
    <article
      className="rounded-3xl overflow-hidden"
      style={{
        backgroundColor: 'var(--md-surface-container-low)',
        border: '1px solid var(--md-outline-variant)',
      }}
    >
      <button
        className="w-full flex items-center gap-4 p-4 text-left transition-colors duration-200"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        style={{
          backgroundColor: expanded
            ? 'var(--md-surface-container)'
            : 'var(--md-surface-container-low)',
        }}
      >
        <div
          className="flex items-center justify-center w-11 h-11 rounded-2xl shrink-0"
          style={{ backgroundColor: 'var(--md-primary-container)' }}
          aria-hidden="true"
        >
          <Icon size={22} style={{ color: 'var(--md-on-primary-container)' }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold leading-snug" style={{ color: 'var(--md-on-surface)' }}>
            {lib.title}
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--md-on-surface-variant)' }}>
            {lib.subtitle}
          </p>
        </div>
        {expanded ? (
          <ChevronUp size={18} style={{ color: 'var(--md-on-surface-variant)' }} aria-hidden="true" />
        ) : (
          <ChevronDown size={18} style={{ color: 'var(--md-on-surface-variant)' }} aria-hidden="true" />
        )}
      </button>

      {expanded && (
        <div className="px-4 pb-4 flex flex-col gap-4">
          <p
            className="text-sm leading-relaxed text-pretty"
            style={{ color: 'var(--md-on-surface-variant)' }}
          >
            {lib.description}
          </p>

          {lib.versions && (
            <div className="flex flex-col gap-3">
              <p
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--md-on-surface-variant)' }}
              >
                {versionsLabel}
              </p>
              {lib.versions.map((v) => (
                <VersionCard key={v.artifact} version={v} />
              ))}
              <div
                className="rounded-2xl p-4 flex flex-col gap-1"
                style={{ backgroundColor: 'var(--md-primary-container)' }}
              >
                <p
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: 'var(--md-on-primary-container)' }}
                >
                  {desugarEnableTitle}
                </p>
                <CodeBlock
                  code={`android {
    compileOptions {
        isCoreLibraryDesugaringEnabled = true
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
}
dependencies {
    // Pick one of the three versions above
    coreLibraryDesugaring 'com.android.tools:desugar_jdk_libs:2.1.4'
}`}
                />
              </div>
            </div>
          )}

          {lib.sections && (
            <div className="flex flex-col gap-3">
              {lib.sections.map((sec) => (
                <div key={sec.heading}>
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-1"
                    style={{ color: 'var(--md-on-surface-variant)' }}
                  >
                    {sec.heading}
                  </p>
                  {sec.isCode ? (
                    <CodeBlock code={sec.body} />
                  ) : (
                    <p
                      className="text-sm leading-relaxed text-pretty"
                      style={{ color: 'var(--md-on-surface)' }}
                    >
                      {sec.body}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  )
}

/* ─── Main export ────────────────────────────────────────────────────── */
export default function Library() {
  const { t, locale } = useLocale()

  const libraries: Library[] = [
    {
      id: 'desugar',
      icon: Package,
      title: 'Core Library Desugaring (Desugar)',
      subtitle: locale === 'vi'
        ? 'Hỗ trợ Java 8+ API trên Android cũ'
        : 'Java 8+ APIs on older Android',
      description: locale === 'vi'
        ? 'Desugaring cho phép dùng các API Java 8, Java 11 (NIO, Stream, Optional...) trên Android 5.0 trở lên mà không cần minSdk cao. Cần bật trong build.gradle và chọn đúng bản phù hợp với nhu cầu.'
        : 'Desugaring lets you use Java 8 and Java 11 APIs (NIO, Stream, Optional…) on Android 5.0+ without raising minSdk. Enable it in build.gradle and pick the right variant for your needs.',
      versions: [
        {
          name: locale === 'vi' ? 'Bản nhỏ' : 'Minimal',
          artifact: 'desugar_jdk_libs_minimal',
          badge: 'minimal',
          badgeColor: 'secondary',
          gradle: "coreLibraryDesugaring 'com.android.tools:desugar_jdk_libs_minimal:2.1.4'",
          minApi: 'API 21+',
          description: locale === 'vi'
            ? 'Phiên bản tối giản nhất. Chỉ backport một số API tối thiểu như java.time giới hạn. Kích thước nhỏ nhất trong ba bản — phù hợp khi bạn chỉ cần hỗ trợ rất ít API mới nhưng muốn giữ APK gọn nhẹ nhất có thể.'
            : 'The smallest variant. Only backports a limited subset of java.time APIs. Best when you need minimal Java 8 support and want to keep your APK as lean as possible.',
          note: locale === 'vi'
            ? 'Không bao gồm Stream, NIO đầy đủ hay Optional.'
            : 'Does not include Stream, full NIO, or Optional.',
        },
        {
          name: locale === 'vi' ? 'Bản thường' : 'Standard',
          artifact: 'desugar_jdk_libs',
          badge: 'standard',
          badgeColor: 'primary',
          gradle: "coreLibraryDesugaring 'com.android.tools:desugar_jdk_libs:2.1.4'",
          minApi: 'API 21+',
          description: locale === 'vi'
            ? 'Bản phổ biến nhất. Hỗ trợ toàn bộ java.time, Stream, Optional, java.util.function và nhiều API Java 8 khác. Đây là lựa chọn mặc định được Google khuyến nghị cho hầu hết các dự án Android.'
            : 'The most popular variant. Supports full java.time, Stream, Optional, java.util.function, and more Java 8 APIs. Google\'s recommended default for most Android projects.',
          note: locale === 'vi'
            ? 'Được Google khuyến nghị cho hầu hết dự án.'
            : 'Recommended by Google for most projects.',
        },
        {
          name: locale === 'vi' ? 'Bản NIO' : 'NIO',
          artifact: 'desugar_jdk_libs_nio',
          badge: 'nio',
          badgeColor: 'tertiary',
          gradle: "coreLibraryDesugaring 'com.android.tools:desugar_jdk_libs_nio:2.1.4'",
          minApi: locale === 'vi' ? 'API 26+ cho Path' : 'API 26+ for Path',
          description: locale === 'vi'
            ? 'Mở rộng từ bản thường, thêm backport java.nio.file.Path, Files, FileSystem từ Java 11. Cần thiết nếu code của bạn dùng NIO Path API — ví dụ các thư viện file hiện đại như Okio hay Apache Commons IO 2.x.'
            : 'Extends the standard variant with backports for java.nio.file.Path, Files, and FileSystem from Java 11. Required if your code uses the NIO Path API — e.g. modern file libraries like Okio or Apache Commons IO 2.x.',
          note: locale === 'vi'
            ? 'Yêu cầu AGP 7.4+ và coreLibraryDesugaringEnabled = true.'
            : 'Requires AGP 7.4+ and coreLibraryDesugaringEnabled = true.',
        },
      ],
    },
    {
      id: 'androidx-core',
      icon: Cpu,
      title: 'AndroidX Core (androidx.core)',
      subtitle: locale === 'vi'
        ? 'Backport API nền tảng cho Android cũ'
        : 'Platform API backports for older Android',
      description: locale === 'vi'
        ? 'AndroidX Core cung cấp các helper và backport cho các API hệ thống Android, cho phép dùng tính năng mới (notification, permission, window insets...) trên các phiên bản Android cũ hơn một cách an toàn.'
        : 'AndroidX Core provides helpers and backports for Android system APIs, allowing you to safely use newer features (notifications, permissions, window insets…) on older Android versions.',
      sections: [
        {
          heading: locale === 'vi' ? 'Thêm dependency' : 'Add dependency',
          body: `dependencies {
    implementation 'androidx.core:core:1.13.1'
    // ${locale === 'vi' ? 'Hoặc dùng KTX cho Kotlin' : 'Or use KTX for Kotlin'}
    implementation 'androidx.core:core-ktx:1.13.1'
}`,
          isCode: true,
        },
        {
          heading: locale === 'vi' ? 'Các tính năng chính' : 'Key features',
          body: `// ${locale === 'vi' ? 'Kiểm tra và yêu cầu permission an toàn' : 'Safe permission request'}
ActivityCompat.requestPermissions(activity, arrayOf(Manifest.permission.CAMERA), 100)

// ${locale === 'vi' ? 'Notification compat (hỗ trợ Android 5+)' : 'Notification compat (Android 5+ support)'}
NotificationCompat.Builder(context, channelId)
    .setSmallIcon(R.drawable.ic_notification)
    .setContentTitle("${locale === 'vi' ? 'Tiêu đề' : 'Title'}")
    .build()

// WindowCompat - Edge-to-edge display
WindowCompat.setDecorFitsSystemWindows(window, false)`,
          isCode: true,
        },
        {
          heading: locale === 'vi' ? 'minSdk & Lưu ý' : 'minSdk & Notes',
          body: locale === 'vi'
            ? 'AndroidX Core hỗ trợ từ API 14 (Android 4.0) trở lên. Luôn dùng *Compat classes (NotificationCompat, ActivityCompat, ContextCompat...) thay vì gọi thẳng API hệ thống để tránh crash trên Android cũ.'
            : 'AndroidX Core supports API 14 (Android 4.0) and above. Always use *Compat classes (NotificationCompat, ActivityCompat, ContextCompat…) instead of calling system APIs directly to avoid crashes on older devices.',
          isCode: false,
        },
      ],
    },
    {
      id: 'multidex',
      icon: Layers,
      title: 'Multidex',
      subtitle: locale === 'vi' ? 'Vượt giới hạn 65,536 method' : 'Exceed the 65,536 method limit',
      description: locale === 'vi'
        ? 'Android 5.0 (API 21) và cao hơn hỗ trợ Multidex gốc. Với Android dưới 5.0, bạn cần thêm thư viện này để dự án có thể chứa hơn 65.536 method reference.'
        : 'Android 5.0 (API 21) and higher support native multidex. For Android below 5.0, you need this library so your project can contain more than 65,536 method references.',
      sections: [
        {
          heading: locale === 'vi' ? 'Thêm vào build.gradle (app)' : 'Add to build.gradle (app)',
          body: `android {
    defaultConfig {
        multiDexEnabled true
    }
}

dependencies {
    implementation 'androidx.multidex:multidex:2.0.1'
}`,
          isCode: true,
        },
        {
          heading: locale === 'vi' ? 'Kế thừa MultiDexApplication' : 'Extend MultiDexApplication',
          body: `// AndroidManifest.xml
android:name="androidx.multidex.MultiDexApplication"

// ${locale === 'vi' ? 'Hoặc trong Application.kt' : 'Or in Application.kt'}
class MyApp : MultiDexApplication()`,
          isCode: true,
        },
        {
          heading: locale === 'vi' ? 'Khi nào cần?' : 'When is it needed?',
          body: locale === 'vi'
            ? 'Khi minSdk < 21 VÀ dự án có > 65.536 method (thường gặp khi dùng nhiều thư viện). Nếu minSdk >= 21, Android tự xử lý Multidex — không cần thư viện này.'
            : 'When minSdk < 21 AND the project has > 65,536 methods (common with many libraries). If minSdk >= 21, Android handles multidex natively — this library is not needed.',
          isCode: false,
        },
      ],
    },
    {
      id: 'material',
      icon: Palette,
      title: 'Material Components for Android',
      subtitle: locale === 'vi' ? 'UI Material Design trên Android cũ' : 'Material Design UI on legacy Android',
      description: locale === 'vi'
        ? 'Thư viện MDC-Android cung cấp các widget Material Design (Button, Card, TextField, BottomSheet...) và hỗ trợ Material You (Dynamic Color) với khả năng tương thích ngược về Android 5.0 (API 21).'
        : 'MDC-Android provides Material Design widgets (Button, Card, TextField, BottomSheet…) and supports Material You (Dynamic Color) with backward compatibility down to Android 5.0 (API 21).',
      sections: [
        {
          heading: locale === 'vi' ? 'Thêm dependency' : 'Add dependency',
          body: `dependencies {
    implementation 'com.google.android.material:material:1.12.0'
}`,
          isCode: true,
        },
        {
          heading: locale === 'vi' ? 'Yêu cầu theme' : 'Required theme',
          body: `<!-- styles.xml -->
<style name="AppTheme" parent="Theme.MaterialComponents.DayNight">
    <!-- ${locale === 'vi' ? 'hoặc' : 'or'} Theme.Material3.DayNight -->
</style>`,
          isCode: true,
        },
        {
          heading: 'Material 3 (Material You)',
          body: `<!-- ${locale === 'vi' ? 'Dùng Material 3 theme từ MDC 1.7+' : 'Use Material 3 theme from MDC 1.7+'} -->
<style name="AppTheme" parent="Theme.Material3.DayNight.NoActionBar">
</style>

// ${locale === 'vi' ? 'Dynamic Color (API 31+, fallback tự động cho API cũ)' : 'Dynamic Color (API 31+, auto fallback for older APIs)'}
DynamicColors.applyToActivitiesIfAvailable(this)`,
          isCode: true,
        },
        {
          heading: locale === 'vi' ? 'minSdk yêu cầu' : 'Minimum SDK',
          body: locale === 'vi'
            ? 'MDC-Android hỗ trợ tối thiểu API 21 (Android 5.0). Dynamic Color chỉ hoạt động trên API 31+ nhưng app không crash trên thiết bị cũ hơn nhờ fallback tự động.'
            : 'MDC-Android requires a minimum of API 21 (Android 5.0). Dynamic Color only activates on API 31+ but the app gracefully falls back on older devices without crashing.',
          isCode: false,
        },
      ],
    },
  ]

  return (
    <main className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-4">
      <div className="flex flex-col gap-1 px-1">
        <h2 className="text-xl font-bold" style={{ color: 'var(--md-on-surface)' }}>
          {t.libraryHeading}
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--md-on-surface-variant)' }}>
          {t.librarySubheading}
        </p>
      </div>

      {libraries.map((lib) => (
        <LibraryCard
          key={lib.id}
          lib={lib}
          versionsLabel={t.versionsLabel}
          desugarEnableTitle={t.desugarEnableTitle}
        />
      ))}
    </main>
  )
}
