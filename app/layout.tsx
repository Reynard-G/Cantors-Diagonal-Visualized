import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'

const space_grotesk = Space_Grotesk({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Cantor's Diagonal Argument",
  description: "A visual introduction to Cantor's Diagonal Argument",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${space_grotesk.className} dark text-foreground bg-background`}>{children}</body>
    </html>
  )
}
