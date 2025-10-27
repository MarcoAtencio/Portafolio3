"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number

      constructor(canvas: HTMLCanvasElement) {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.opacity = Math.random() * 0.3 + 0.1 // Reduced for more particles
      }

      update(canvas: HTMLCanvasElement) {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw(theme: string) {
        if (!ctx) return

        // Theme-aware colors
        const isLight = theme === 'light'
        const particleColor = isLight
          ? `rgba(17, 24, 39, ${this.opacity})`  // Almost black for light mode
          : `rgba(6, 182, 212, ${this.opacity})` // Cyan for dark mode

        ctx.fillStyle = particleColor
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles - dramatically increase count for amazing effect
    const particlesArray: Particle[] = []
    const isMobile = window.innerWidth < 768
    const numberOfParticles = isMobile ? 120 : 250 // Increased from 80/150 to 120/250

    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle(canvas))
    }

    // Animation loop
    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesArray.forEach((particle) => {
        particle.update(canvas)
        particle.draw(resolvedTheme || 'dark')
      })

      // Draw connections with theme-aware colors
      particlesArray.forEach((a, index) => {
        particlesArray.slice(index + 1).forEach((b) => {
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            const isLight = resolvedTheme === 'light'
            const connectionColor = isLight
              ? `rgba(17, 24, 39, ${0.25 * (1 - distance / 120)})`  // Increased opacity for better visibility
              : `rgba(6, 182, 212, ${0.15 * (1 - distance / 120)})` // Cyan for dark mode

            ctx.strokeStyle = connectionColor
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [resolvedTheme]) // Add resolvedTheme to dependencies

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-70" />
}
