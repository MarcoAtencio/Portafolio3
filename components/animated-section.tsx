import React from 'react'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'
import { cn } from '@/lib/utils'

interface AnimatedSectionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Animation type to apply when section becomes visible
   * @default 'fadeInUp'
   */
  animationType?: 'fadeIn' | 'fadeInUp' | 'slideInLeft' | 'slideInRight'
  /**
   * Intersection observer threshold
   * @default 0.1
   */
  threshold?: number
  /**
   * Animation duration in CSS format
   * @default '0.6s'
   */
  duration?: string
  /**
   * Animation delay in CSS format
   * @default '0s'
   */
  delay?: string
  /**
   * Whether to animate only once or every time it enters viewport
   * @default true
   */
  once?: boolean
  /**
   * HTML element type for the section
   * @default 'section'
   */
  as?: keyof React.JSX.IntrinsicElements
}

/**
 * AnimatedSection component
 *
 * A reusable wrapper component that applies smooth animations when sections
 * enter the viewport. Uses Intersection Observer API for performance.
 *
 * @example
 * ```tsx
 * <AnimatedSection animationType="fadeInUp" threshold={0.2}>
 *   <h2>My Section</h2>
 *   <p>Content here...</p>
 * </AnimatedSection>
 * ```
 */
export const AnimatedSection = React.forwardRef<HTMLElement, AnimatedSectionProps>(
  ({
    children,
    className,
    threshold = 0.1,
    duration = '0.6s',
    delay = '0s',
    as: Component = 'section',
    style,
    ...props
  }, ref) => {
    const { ref: observerRef, isIntersecting } = useIntersectionObserver({
      threshold
    })

    // Combine refs
    const combinedRef = React.useCallback((node: HTMLElement | null) => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(node)
        } else {
          ref.current = node
        }
      }
      observerRef.current = node
    }, [ref, observerRef])

    // Animation classes based on type
    const getAnimationClasses = () => {
      const baseClasses = 'transition-all ease-out'
      const durationClass = `duration-[${duration}]`

      if (!isIntersecting) {
        return cn(baseClasses, durationClass, 'opacity-0 translate-y-10')
      }

      return cn(baseClasses, durationClass, 'opacity-100 translate-y-0')
    }

    const animationStyle: React.CSSProperties = {
      ...style,
      transitionDuration: duration,
      transitionDelay: delay,
    }

    const ComponentElement = Component as React.ElementType

    return (
      <ComponentElement
        ref={combinedRef}
        suppressHydrationWarning
        className={cn(getAnimationClasses(), className)}
        style={animationStyle}
        {...props}
      >
        {children}
      </ComponentElement>
    )
  }
)

AnimatedSection.displayName = 'AnimatedSection'