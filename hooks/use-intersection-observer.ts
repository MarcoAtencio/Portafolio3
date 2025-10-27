import { useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number
  root?: Element | null
  rootMargin?: string
}

interface UseIntersectionObserverReturn {
  ref: React.RefObject<HTMLElement | null>
  isIntersecting: boolean
}

/**
 * Custom hook for observing element intersection with the viewport
 * Provides a reusable way to detect when elements enter/leave the viewport
 *
 * @param options - IntersectionObserver options
 * @returns Object containing ref to attach to element and intersection state
 */
export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn {
  const { threshold = 0.1, root = null, rootMargin = '0px' } = options
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      {
        threshold,
        root,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, root, rootMargin])

  return { ref, isIntersecting }
}