/**
 * Performance monitoring utilities
 * Provides tools for measuring and tracking application performance
 */

/**
 * Creates a performance mark
 * @param name - Name of the performance mark
 */
export function mark(name: string): void {
  if (typeof window !== 'undefined' && 'performance' in window) {
    performance.mark(name)
  }
}

/**
 * Measures the time between two performance marks
 * @param name - Name of the measure
 * @param startMark - Starting mark name
 * @param endMark - Ending mark name
 */
export function measure(name: string, startMark: string, endMark: string): void {
  if (typeof window !== 'undefined' && 'performance' in window) {
    try {
      performance.measure(name, startMark, endMark)
    } catch (error) {
      console.warn('Performance measure failed:', error)
    }
  }
}

/**
 * Measures function execution time
 * @param fn - Function to measure
 * @param name - Name for the measurement
 * @returns Result of the function
 */
export async function measureAsync<T>(
  fn: () => Promise<T>,
  name: string
): Promise<T> {
  const startMark = `${name}-start`
  const endMark = `${name}-end`

  mark(startMark)
  try {
    const result = await fn()
    mark(endMark)
    measure(name, startMark, endMark)
    return result
  } catch (error) {
    mark(endMark)
    measure(name, startMark, endMark)
    throw error
  }
}

/**
 * Gets performance entries
 * @param name - Name of the entry to get
 * @param type - Type of entry ('mark' | 'measure')
 * @returns Performance entry or null
 */
export function getPerformanceEntry(
  name: string,
  type: 'mark' | 'measure' = 'measure'
): PerformanceEntry | null {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const entries = performance.getEntriesByName(name, type)
    return entries[entries.length - 1] || null
  }
  return null
}

/**
 * Logs performance metrics to console
 */
export function logPerformanceMetrics(): void {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Core Web Vitals
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    const paint = performance.getEntriesByType('paint')

    console.group('🚀 Performance Metrics')

    // Navigation timing
    if (navigation) {
      console.log('⏱️  Navigation Timing:')
      console.log(`  DNS Lookup: ${(navigation.domainLookupEnd - navigation.domainLookupStart).toFixed(2)}ms`)
      console.log(`  TCP Connect: ${(navigation.connectEnd - navigation.connectStart).toFixed(2)}ms`)
      console.log(`  Server Response: ${(navigation.responseStart - navigation.requestStart).toFixed(2)}ms`)
      console.log(`  Page Load: ${(navigation.loadEventEnd - navigation.startTime).toFixed(2)}ms`)
    }

    // Paint timing
    paint.forEach(entry => {
      console.log(`🎨 ${entry.name}: ${entry.startTime.toFixed(2)}ms`)
    })

    // Custom measures
    const measures = performance.getEntriesByType('measure')
    if (measures.length > 0) {
      console.log('📏 Custom Measures:')
      measures.forEach(measure => {
        console.log(`  ${measure.name}: ${measure.duration.toFixed(2)}ms`)
      })
    }

    console.groupEnd()
  }
}

/**
 * Reports Web Vitals metrics using native Performance API
 * @param onReport - Callback function for each metric
 */
export function reportWebVitals(onReport?: (metric: { name: string; value: number; id: string }) => void): void {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    try {
      // Observe LCP
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        onReport?.({
          name: 'LCP',
          value: lastEntry.startTime,
          id: 'v3-' + Date.now() + '-' + Math.floor(Math.random() * 1000)
        })
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // Observe CLS
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0
        for (const entry of list.getEntries()) {
          const layoutShiftEntry = entry as PerformanceEntry & {
            hadRecentInput?: boolean
            value?: number
          }
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value || 0
          }
        }
        onReport?.({
          name: 'CLS',
          value: clsValue,
          id: 'v3-' + Date.now() + '-' + Math.floor(Math.random() * 1000)
        })
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })

    } catch {
      // Performance observers not fully supported
    }
  }
}

/**
 * Performance observer for long tasks
 */
export function observeLongTasks(): void {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) { // Tasks longer than 50ms
            console.warn(`🚨 Long task detected: ${entry.duration.toFixed(2)}ms`)
          }
        }
      })

      observer.observe({ entryTypes: ['longtask'] })
    } catch {
      // Long tasks observation not supported
    }
  }
}

/**
 * Initializes performance monitoring
 */
export function initPerformanceMonitoring(): void {
  if (typeof window !== 'undefined') {
    // Mark when React hydration completes
    mark('hydration-start')

    // Observe navigation timing
    if ('PerformanceObserver' in window) {
      const navObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            mark('navigation-complete')
            measure('total-navigation', 'navigation-start', 'navigation-complete')
          }
        }
      })

      navObserver.observe({ entryTypes: ['navigation'] })
    }

    // Observe long tasks
    observeLongTasks()

    // Log metrics in development
    if (process.env.NODE_ENV === 'development') {
      // Delay logging to allow all marks to be recorded
      setTimeout(logPerformanceMetrics, 3000)
    }
  }
}