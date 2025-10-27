import { render, screen } from '@testing-library/react'
import { Navigation } from '@/components/navigation'

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'dark',
    setTheme: jest.fn(),
  }),
}))

describe('Navigation', () => {
  it('renders navigation links', () => {
    render(<Navigation />)

    expect(screen.getByText('MA')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('renders theme toggle button', () => {
    render(<Navigation />)

    const themeButton = screen.getByLabelText('Cambiar tema')
    expect(themeButton).toBeInTheDocument()
  })
})
