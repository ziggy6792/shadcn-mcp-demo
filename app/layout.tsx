import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { CommandPalette } from '@/components/command-palette'
import './globals.css'

export const metadata: Metadata = {
  title: 'IssueMind - AI-Powered GitHub Issue Solver',
  description: 'Triage, prioritize, and solve GitHub issues faster with AI',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <CommandPalette />
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
