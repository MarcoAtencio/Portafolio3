"use client"

import { useLanguage } from "./language-provider"
import { AnimatedSection } from "./animated-section"

/**
 * About section component
 * Displays information about Marco Atencio with smooth animations
 * Uses the reusable AnimatedSection component for consistent behavior
 */
export function About() {
  const { t } = useLanguage()

  return (
    <AnimatedSection
      id="about"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30"
    >
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-center">{t.about.title}</h2>

        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p className="text-pretty">{t.about.description}</p>

          <p className="text-pretty">{t.about.paragraph2}</p>

          <p className="text-pretty">{t.about.paragraph3}</p>
        </div>
      </div>
    </AnimatedSection>
  )
}
