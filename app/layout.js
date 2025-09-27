import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Minute Savoir - Learn Any Skill in 1 Hour',
  description: 'Trade skills, learn something new in just 1 hour. Connect with teachers and learners in our skill-sharing community.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}