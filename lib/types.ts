/**
 * Core application types and interfaces
 * Centralized type definitions for better maintainability
 */

// Language and internationalization types
export type Language = 'es' | 'en'

export interface TranslationKey {
  nav: {
    home: string
    about: string
    experience: string
    projects: string
    skills: string
    contact: string
  }
  hero: {
    location: string
    title: string
    role: string
    description: string
    contactMe: string
  }
  about: {
    title: string
    description: string
    paragraph2: string
    paragraph3: string
  }
  projects: {
    title: string
    subtitle: string
    techStack: string
    impact: string
    viewGithub: string
    viewDemo?: string
    moreProjects: string
    visitGithub: string
    project1: {
      title: string
      description: string
      impact: string
    }
    project2: {
      title: string
      description: string
      impact: string
    }
    project3: {
      title: string
      description: string
      impact: string
    }
  }
  skills: {
    title: string
    subtitle: string
    languages: string
    frameworks: string
    databases: string
    automation: string
    tools: string
  }
  contact: {
    title: string
    subtitle: string
    name: string
    email: string
    message: string
    send: string
    sending: string
    location: string
    phone: string
    successTitle: string
    successDescription: string
  }
  whatsapp: {
    ariaLabel: string
  }
}

// Project data types
export interface ProjectData {
  image: string
  technologies: string[]
  github: string
  demo: string | null
}

export interface Project extends ProjectData {
  title: string
  description: string
  impact: string
}

// Component prop types
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface AnimatedComponentProps extends BaseComponentProps {
  animationDelay?: number
  animationDuration?: number
  animationType?: 'fadeIn' | 'fadeInUp' | 'slideInLeft' | 'slideInRight' | 'scaleIn'
}

// Theme types
export type Theme = 'dark' | 'light' | 'system'

// Form types
export interface ContactFormData {
  name: string
  email: string
  message: string
}

export interface ContactFormErrors {
  name?: string
  email?: string
  message?: string
}

// API response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Error types
export interface AppError {
  code: string
  message: string
  details?: Record<string, unknown>
}

// Animation types
export interface AnimationConfig {
  name: string
  duration: string
  easing: string
  delay: string
  fillMode: 'forwards' | 'backwards' | 'both' | 'none'
}

export interface IntersectionObserverOptions {
  threshold?: number
  root?: Element | null
  rootMargin?: string
}

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> & {
  [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Keys>>
}[Keys]

// Event handler types
export type EventHandler<T = Element, E = Event> = (event: E & { currentTarget: T }) => void

// Component ref types
export type ComponentRef<T extends React.ElementType> = React.ComponentRef<T>

// Generic async function type
export type AsyncFunction<TArgs extends unknown[] = [], TReturn = void> = (
  ...args: TArgs
) => Promise<TReturn>