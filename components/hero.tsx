"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, MapPin } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"
import { memo } from "react"

function HeroComponent() {
  const { t } = useLanguage()

  return (
    <section id="hero" suppressHydrationWarning className="min-h-screen flex items-center justify-center pt-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center justify-items-center lg:justify-items-start">
          {/* Left Column - Text Content */}
          <div className="space-y-6 opacity-0 animate-fade-in-up text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{t.hero.location}</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-balance">{t.hero.title}</h1>

            <p className="text-2xl sm:text-3xl text-primary font-medium">{t.hero.role}</p>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl text-pretty">{t.hero.description}</p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="lg" className="gap-2">
                <a href="#contact">
                  <Mail className="h-4 w-4" />
                  {t.hero.contactMe}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2 bg-transparent">
                <a href="https://github.com/MarcoAtencio" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2 bg-transparent">
                <a href="https://linkedin.com/in/marcoatencio" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="flex justify-center opacity-0 animate-fade-in-up stagger-2">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[450px] lg:h-[450px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl animate-float" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                <Image
                  src="/marco-atencio.png"
                  alt="Marco Atencio, desarrollador full-stack senior, sonriendo en una foto profesional"
                  fill
                  sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 450px"
                  className="object-cover"
                  priority
                  fetchPriority="high"
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export const Hero = memo(HeroComponent)
