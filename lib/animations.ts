import React from 'react'

/**
 * Animation utilities for consistent motion design across the application
 */

export const animationConfig = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
  },
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  delay: {
    none: '0ms',
    short: '100ms',
    medium: '200ms',
    long: '300ms',
  },
} as const

/**
 * Creates a staggered animation delay for multiple elements
 * @param baseDelay - Base delay in milliseconds
 * @param increment - Delay increment between elements
 * @param index - Element index (0-based)
 * @returns CSS animation delay string
 */
export function createStaggerDelay(
  baseDelay: number = 0,
  increment: number = 100,
  index: number = 0
): string {
  return `${baseDelay + (increment * index)}ms`
}

/**
 * Combines animation properties into a CSS animation string
 * @param name - Animation name (e.g., 'fadeInUp')
 * @param duration - Animation duration
 * @param easing - Animation easing function
 * @param delay - Animation delay
 * @param fillMode - Animation fill mode
 * @returns Complete CSS animation property value
 */
export function createAnimation(
  name: string,
  duration: keyof typeof animationConfig.duration = 'normal',
  easing: keyof typeof animationConfig.easing = 'easeOut',
  delay: keyof typeof animationConfig.delay = 'none',
  fillMode: 'forwards' | 'backwards' | 'both' | 'none' = 'forwards'
): string {
  return `${name} ${animationConfig.duration[duration]} ${animationConfig.easing[easing]} ${animationConfig.delay[delay]} ${fillMode}`
}

/**
 * Animation variants for common UI patterns
 */
export const animationVariants = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  fadeInUp: {
    from: {
      opacity: 0,
      transform: 'translateY(30px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  fadeInDown: {
    from: {
      opacity: 0,
      transform: 'translateY(-30px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  slideInLeft: {
    from: {
      opacity: 0,
      transform: 'translateX(-30px)',
    },
    to: {
      opacity: 1,
      transform: 'translateX(0)',
    },
  },
  slideInRight: {
    from: {
      opacity: 0,
      transform: 'translateX(30px)',
    },
    to: {
      opacity: 1,
      transform: 'translateX(0)',
    },
  },
  scaleIn: {
    from: {
      opacity: 0,
      transform: 'scale(0.9)',
    },
    to: {
      opacity: 1,
      transform: 'scale(1)',
    },
  },
} as const

/**
 * Hook for managing animation state
 * Provides a simple way to trigger animations programmatically
 */
export function useAnimationState(initialState: boolean = false) {
  const [isAnimated, setIsAnimated] = React.useState(initialState)

  const trigger = React.useCallback(() => {
    setIsAnimated(true)
  }, [])

  const reset = React.useCallback(() => {
    setIsAnimated(false)
  }, [])

  return { isAnimated, trigger, reset }
}