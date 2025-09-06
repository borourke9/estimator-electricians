import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Electrician Instant Estimator',
  description: 'Get instant estimates for electrical work - generator installs, panel upgrades, EV chargers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
