"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"
import { projectsData } from "@/lib/projects-data"
import { createStaggerDelay } from "@/lib/animations"
import { AnimatedSection } from "./animated-section"

/**
 * Projects section component
 * Displays featured projects with animations and responsive design
 * Uses the reusable AnimatedSection component for consistent behavior
 */
export function Projects() {
  const { t } = useLanguage()

  const projects = [
    {
      ...projectsData[0],
      title: t.projects.project1.title,
      description: t.projects.project1.description,
      impact: t.projects.project1.impact,
    },
    {
      ...projectsData[1],
      title: t.projects.project2.title,
      description: t.projects.project2.description,
      impact: t.projects.project2.impact,
    },
    {
      ...projectsData[2],
      title: t.projects.project3.title,
      description: t.projects.project3.description,
      impact: t.projects.project3.impact,
    },
  ]

  return (
    <AnimatedSection
      id="projects"
      className="py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">{t.projects.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.projects.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-1 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
              style={{
                animation: `fadeInUp 0.6s ease-out ${createStaggerDelay(0, 150, index)} both`,
              }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Project Image */}
                <div className="relative h-64 md:h-full min-h-[300px] bg-secondary/50 overflow-hidden group">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                    quality={80}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Project Details */}
                <div className="p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

                    {/* Technologies */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2 text-foreground">{t.projects.techStack}</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6 p-4 bg-gradient-to-r from-accent/20 to-primary/10 border-l-4 border-accent rounded-lg">
                      <h4 className="text-sm font-bold mb-2 text-accent uppercase tracking-wide">
                        {t.projects.impact}
                      </h4>
                      <p className="text-sm text-foreground font-medium leading-relaxed">{project.impact}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Button asChild variant="default" className="gap-2 hover:scale-105 transition-transform">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        {t.projects.viewGithub}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">{t.projects.moreProjects}</p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="gap-2 bg-transparent hover:bg-primary/10 hover:scale-105 transition-all"
          >
            <a href="https://github.com/MarcoAtencio" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
              {t.projects.visitGithub}
            </a>
          </Button>
        </div>
      </div>
    </AnimatedSection>
  )
}
