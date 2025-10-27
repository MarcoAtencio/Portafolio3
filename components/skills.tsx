"use client"

import { Card } from "@/components/ui/card"
import { Code2, Database, Wrench, Globe, ExternalLink } from "lucide-react"
import { useLanguage } from "./language-provider"
import { useEffect, useRef, useState } from "react"

export function Skills() {
  const { language, t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const skillCategories = [
    {
      title: language === "es" ? "Lenguajes de Programación" : "Programming Languages",
      icon: Code2,
      skills: [
        { name: "Java", level: language === "es" ? "Avanzado" : "Advanced", link: null },
        { name: "JavaScript", level: language === "es" ? "Avanzado" : "Advanced", link: null },
        { name: "TypeScript", level: language === "es" ? "Avanzado" : "Advanced", link: null },
        { name: "SQL", level: language === "es" ? "Avanzado" : "Advanced", link: null },
        { name: "Python", level: language === "es" ? "Intermedio" : "Intermediate", link: null },
        { name: "PHP", level: language === "es" ? "Intermedio" : "Intermediate", link: null },
      ],
    },
    {
      title: "Frameworks",
      icon: Wrench,
      skills: [
        {
          name: "Spring Boot",
          level: language === "es" ? "Avanzado" : "Advanced",
          link: "https://github.com/MarcoAtencio?tab=repositories&q=spring",
        },
        {
          name: "React",
          level: language === "es" ? "Avanzado" : "Advanced",
          link: "https://github.com/MarcoAtencio?tab=repositories&q=react",
        },
        {
          name: "Angular",
          level: language === "es" ? "Avanzado" : "Advanced",
          link: "https://github.com/MarcoAtencio?tab=repositories&q=angular",
        },
        {
          name: "React Native",
          level: language === "es" ? "Avanzado" : "Advanced",
          link: "https://github.com/MarcoAtencio",
        },
        { name: "Laravel", level: language === "es" ? "Intermedio" : "Intermediate", link: null },
        { name: "Hibernate", level: language === "es" ? "Avanzado" : "Advanced", link: null },
      ],
    },
    {
      title: language === "es" ? "Bases de Datos" : "Databases",
      icon: Database,
      skills: [
        { name: "PostgreSQL", level: language === "es" ? "Avanzado" : "Advanced", link: null },
        { name: "MySQL", level: language === "es" ? "Avanzado" : "Advanced", link: null },
        { name: "Oracle", level: language === "es" ? "Avanzado" : "Advanced", link: null },
        { name: "SQL Server", level: language === "es" ? "Avanzado" : "Advanced", link: null },
        { name: "MongoDB", level: language === "es" ? "Intermedio" : "Intermediate", link: null },
        { name: "Redis", level: language === "es" ? "Intermedio" : "Intermediate", link: null },
      ],
    },
    {
      title: language === "es" ? "Herramientas & Otros" : "Tools & Others",
      icon: Globe,
      skills: [
        { name: "Git", level: language === "es" ? "Avanzado" : "Advanced", link: "https://github.com/MarcoAtencio" },
        {
          name: "Camunda",
          level: language === "es" ? "Avanzado" : "Advanced",
          link: "https://github.com/MarcoAtencio?tab=repositories&q=camunda",
        },
        { name: "Jira", level: language === "es" ? "Avanzado" : "Advanced", link: null },
        { name: "Figma", level: language === "es" ? "Intermedio" : "Intermediate", link: null },
        { name: "Azure", level: language === "es" ? "Intermedio" : "Intermediate", link: null },
        {
          name: "Bizagi",
          level: language === "es" ? "Intermedio" : "Intermediate",
          link: "https://github.com/MarcoAtencio?tab=repositories&q=bizagi",
        },
      ],
    },
  ]

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center">{t.skills.title}</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <Card
                key={index}
                className="p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
                style={{
                  animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.1}s both` : "none",
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {category.skills.map((skill, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        {skill.link ? (
                          <a
                            href={skill.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                          >
                            {skill.name}
                            <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        ) : (
                          <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        )}
                      </div>
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ${
                            isVisible
                              ? skill.level === "Avanzado" || skill.level === "Advanced"
                                ? "w-full"
                                : "w-3/4"
                              : "w-0"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Card className="inline-block p-6">
            <p className="text-lg">
              <span className="text-muted-foreground">{language === "es" ? "Idiomas:" : "Languages:"}</span>{" "}
              <span className="text-foreground font-semibold">{language === "es" ? "Español" : "Spanish"}</span> (
              {language === "es" ? "Nativo" : "Native"}) •{" "}
              <span className="text-foreground font-semibold">{language === "es" ? "Inglés" : "English"}</span> (
              {language === "es" ? "Intermedio" : "Intermediate"})
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
