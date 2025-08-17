import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hà Quang Trung - Portfolio',
  description: 'Frontend Developer Portfolio - Hà Quang Trung',
  icons: {
    icon: '/images/logomili.png',
    shortcut: '/images/logomili.png',
    apple: '/images/logomili.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
