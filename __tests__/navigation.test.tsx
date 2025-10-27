import { render, screen } from '@testing-library/react'
import { Navigation } from '@/components/navigation'

// Mock all external dependencies
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'dark',
    setTheme: jest.fn(),
  }),
}))

jest.mock('@/components/language-provider', () => ({
  useLanguage: () => ({
    language: 'es',
    setLanguage: jest.fn(),
    t: {
      nav: {
        home: 'Inicio',
        about: 'Sobre mí',
        experience: 'Experiencia',
        projects: 'Proyectos',
        skills: 'Habilidades',
        contact: 'Contacto',
      },
    },
  }),
}))

jest.mock('@/components/theme-provider', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useTheme: () => ({
    theme: 'dark',
    toggleTheme: jest.fn(),
  }),
}))

// Mock ResizeObserver for responsive behavior
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

describe('Navigation', () => {
  it('renders the brand logo', () => {
    render(<Navigation />)
    expect(screen.getByText('MA')).toBeInTheDocument()
  })

  it('renders navigation element', () => {
    render(<Navigation />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
