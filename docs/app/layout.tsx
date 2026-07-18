import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tài liệu hỗ trợ Android cũ',
  description:
    'Wiki hỗ trợ các nhà phát triển Android tìm hiểu thư viện và cách code phù hợp với các phiên bản Android cũ.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#d3e4fd' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1c2e' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className="bg-md-background">
      <body className="antialiased min-h-screen font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
  }

