"use client"

import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider defaultTheme="dark" enableSystem={false} enableColorScheme={false}>
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  )
}