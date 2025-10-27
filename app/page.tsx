"use client"

import dynamic from "next/dynamic"

// Lazy load heavy components for better initial bundle size
const ParticlesBackground = dynamic(() => import("@/components/particles-background").then(mod => ({ default: mod.ParticlesBackground })), {
  ssr: false,
  loading: () => null
})

const Experience = dynamic(() => import("@/components/experience").then(mod => ({ default: mod.Experience })))
const Skills = dynamic(() => import("@/components/skills").then(mod => ({ default: mod.Skills })))
const Contact = dynamic(() => import("@/components/contact").then(mod => ({ default: mod.Contact })))

// Keep above-the-fold components in main bundle
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Navigation } from "@/components/navigation"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen relative">
      <ParticlesBackground />
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </div>
      <WhatsAppButton />
    </main>
  )
}
