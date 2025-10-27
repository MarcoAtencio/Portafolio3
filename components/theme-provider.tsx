"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { Theme } from "@/lib/types"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined)

/**
 * Theme provider with SSR-safe cookie-based persistence
 * Prevents hydration mismatches by ensuring consistent initial state
 */
export function ThemeProvider({ children, defaultTheme = "dark" }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Get theme from cookie (SSR-safe)
    const getCookieValue = (name: string): string | null => {
      const value = `; ${document.cookie}`
      const parts = value.split(`; ${name}=`)
      if (parts.length === 2) return parts.pop()?.split(';').shift() || null
      return null
    }

    const savedTheme = getCookieValue("theme") as Theme | null
    if (savedTheme && (savedTheme === "dark" || savedTheme === "light" || savedTheme === "system")) {
      setThemeState(savedTheme)
    }
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) return

    const root = window.document.documentElement

    // Handle system theme
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    const appliedTheme = theme === "system" ? systemTheme : theme

    root.classList.remove("light", "dark")
    root.classList.add(appliedTheme)

    // Set cookie with proper attributes for SSR compatibility
    document.cookie = `theme=${theme}; path=/; max-age=31536000; samesite=lax`
  }, [theme, isHydrated])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"))
  }

  const value = {
    theme,
    setTheme,
    toggleTheme,
  }

  // Prevent rendering until hydrated to avoid hydration mismatch
  if (!isHydrated) {
    return (
      <ThemeProviderContext.Provider value={{ theme: defaultTheme, setTheme, toggleTheme }}>
        {children}
      </ThemeProviderContext.Provider>
    )
  }

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
