"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations, type Language } from "@/lib/translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: typeof translations.es
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

/**
 * Language provider with SSR-safe cookie-based persistence
 * Uses suppressHydrationWarning to handle language switching gracefully
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start with Spanish (server default)
  const [language, setLanguageState] = useState<Language>("es")

  useEffect(() => {
    // Get language from cookie after hydration
    const getCookieValue = (name: string): string | null => {
      const value = `; ${document.cookie}`
      const parts = value.split(`; ${name}=`)
      if (parts.length === 2) return parts.pop()?.split(';').shift() || null
      return null
    }

    const savedLanguage = getCookieValue("language") as Language
    if (savedLanguage && (savedLanguage === "es" || savedLanguage === "en") && savedLanguage !== "es") {
      // Only update if different from default to avoid unnecessary re-renders
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    // Set cookie with proper attributes for SSR compatibility
    document.cookie = `language=${lang}; path=/; max-age=31536000; samesite=lax`
  }

  const value = {
    language,
    setLanguage,
    t: translations[language],
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
