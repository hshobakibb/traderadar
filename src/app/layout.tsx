import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TradeRadar â See the Whole Picture Before You Trade',
  description: 'Bloomberg terminal in plain English. Every instrument gets a 10-factor score explaining why it is moving.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-tx antialiased">{children}</body>
    </html>
  )
}
