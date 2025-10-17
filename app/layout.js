import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'weby ai — Build with AI chat',
  description:
    'Create websites, apps, and Telegram bots by just chatting. Minimal, fast, professional. Inter font, black background, white text.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white`}>{children}</body>
    </html>
  )
}