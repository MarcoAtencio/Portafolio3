"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase } from "lucide-react"
import { useLanguage } from "./language-provider"
import { useEffect, useRef, useState } from "react"

export function Experience() {
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

  const experiences =
    language === "es"
      ? [
          {
            company: "BBVA",
            role: "Desarrollador Full Stack - Spring Boot",
            period: "Marzo 2023 - Actual",
            description: [
              "Diseñé y desarrollé servicios core para el área de préstamos bajo metodología ágil",
              "Participé en la migración de bases de datos de Db2 a Oracle con estrategias de normalización",
              "Aseguré la calidad del código mediante pruebas exhaustivas con JUnit",
            ],
            technologies: ["Java", "Spring Boot", "JUnit", "Oracle", "Db2", "Bitbucket"],
          },
          {
            company: "Gestión y Sistemas",
            role: "Desarrollador Full Stack - Angular, Spring Boot",
            period: "Abril 2022 - Febrero 2023",
            description: [
              "Implementé automatización de flujos de trabajo con Camunda para el proyecto VUCE 2.0",
              "Creé interfaces y trabajé con el equipo de Back-end en integración y pruebas",
              "Desarrollé sistemas automatizados de validación de documentos",
            ],
            technologies: [
              "Angular",
              "Spring Boot",
              "JavaScript",
              "Azure",
              "PostgreSQL",
              "MongoDB",
              "Camunda",
              "Figma",
            ],
          },
          {
            company: "Cognitive Soft",
            role: "Desarrollador Mobile - React Native",
            period: "Julio 2021 - Marzo 2022",
            description: [
              "Optimicé el proceso de adquisición de usuarios mediante automatización con Bizagi",
              "Implementé autenticación clásica y biométrica en aplicación financiera",
            ],
            technologies: ["React Native", "Expo", "JavaScript", "Spring Boot", "SQL Server", "Bizagi"],
          },
          {
            company: "Genes Perú",
            role: "Desarrollador FrontEnd - React js",
            period: "Marzo 2021 - Junio 2021",
            description: [
              "Implementé API REST en CMS Strapi siguiendo buenas prácticas de Back-end",
              "Creé interfaces atractivas e intuitivas utilizando React",
            ],
            technologies: ["React", "Strapi", "MySQL", "Firebase", "Figma"],
          },
        ]
      : [
          {
            company: "BBVA",
            role: "Full Stack Developer - Spring Boot",
            period: "March 2023 - Present",
            description: [
              "Designed and developed core services for the lending area under agile methodology",
              "Participated in database migration from Db2 to Oracle with normalization strategies",
              "Ensured code quality through comprehensive testing with JUnit",
            ],
            technologies: ["Java", "Spring Boot", "JUnit", "Oracle", "Db2", "Bitbucket"],
          },
          {
            company: "Gestión y Sistemas",
            role: "Full Stack Developer - Angular, Spring Boot",
            period: "April 2022 - February 2023",
            description: [
              "Implemented workflow automation with Camunda for the VUCE 2.0 project",
              "Created interfaces and worked with the Back-end team on integration and testing",
              "Developed automated document validation systems",
            ],
            technologies: [
              "Angular",
              "Spring Boot",
              "JavaScript",
              "Azure",
              "PostgreSQL",
              "MongoDB",
              "Camunda",
              "Figma",
            ],
          },
          {
            company: "Cognitive Soft",
            role: "Mobile Developer - React Native",
            period: "July 2021 - March 2022",
            description: [
              "Optimized user acquisition process through automation with Bizagi",
              "Implemented classic and biometric authentication in financial application",
            ],
            technologies: ["React Native", "Expo", "JavaScript", "Spring Boot", "SQL Server", "Bizagi"],
          },
          {
            company: "Genes Perú",
            role: "FrontEnd Developer - React js",
            period: "March 2021 - June 2021",
            description: [
              "Implemented REST API in Strapi CMS following Back-end best practices",
              "Created attractive and intuitive interfaces using React",
            ],
            technologies: ["React", "Strapi", "MySQL", "Firebase", "Figma"],
          },
        ]

  return (
    <section
      id="experience"
      ref={sectionRef}
      className={`py-24 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-center gap-3 mb-12">
          <Briefcase className="h-8 w-8 text-primary" />
          <h2 className="text-4xl sm:text-5xl font-bold">{t.experience.title}</h2>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              className="p-6 sm:p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
              style={{
                animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.1}s both` : "none",
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{exp.company}</h3>
                  <p className="text-lg text-primary mt-1">{exp.role}</p>
                </div>
                <span className="text-sm text-muted-foreground whitespace-nowrap">{exp.period}</span>
              </div>

              <ul className="space-y-2 mb-6">
                {exp.description.map((item, i) => (
                  <li key={i} className="text-muted-foreground flex gap-2">
                    <span className="text-primary mt-1.5">•</span>
                    <span className="text-pretty">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs hover:bg-primary/20 transition-colors">
                    {tech}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
