import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hà Quang Trung - Portfolio',
  description: 'Frontend Developer Portfolio - Hà Quang Trung',
  icons: {
    icon: [
      { url: '/images/logomili.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/logomili.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/logomili.png', sizes: '48x48', type: 'image/png' },
      { url: '/images/logomili.png', sizes: '64x64', type: 'image/png' },
      { url: '/images/logomili.png', sizes: '96x96', type: 'image/png' },
      { url: '/images/logomili.png', sizes: '128x128', type: 'image/png' }
    ],
    shortcut: '/images/logomili.png',
    apple: { url: '/images/logomili.png', sizes: '180x180', type: 'image/png' },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="128x128" href="/images/logomili.png" />
        <link rel="shortcut icon" href="/images/logomili.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var isDark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  document.documentElement.classList.toggle('light-mode', !isDark);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
