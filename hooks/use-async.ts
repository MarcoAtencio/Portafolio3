import { useCallback, useEffect, useRef, useState } from 'react'

interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

interface UseAsyncOptions {
  immediate?: boolean
  onSuccess?: (data: any) => void
  onError?: (error: Error) => void
}

/**
 * Custom hook for managing async operations with loading states and error handling
 * Provides a clean API for handling promises in React components
 *
 * @param asyncFunction - The async function to execute
 * @param options - Configuration options
 * @returns Object with state and control functions
 */
export function useAsync<T = any>(
  asyncFunction: () => Promise<T>,
  options: UseAsyncOptions = {}
) {
  const { immediate = false, onSuccess, onError } = options

  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const mountedRef = useRef(true)

  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  const execute = useCallback(async () => {
    setState(prevState => ({ ...prevState, loading: true, error: null }))

    try {
      const data = await asyncFunction()

      if (mountedRef.current) {
        setState({ data, loading: false, error: null })
        onSuccess?.(data)
      }

      return data
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error(String(error))

      if (mountedRef.current) {
        setState(prevState => ({ ...prevState, loading: false, error: errorObj }))
        onError?.(errorObj)
      }

      throw errorObj
    }
  }, [asyncFunction, onSuccess, onError])

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null })
  }, [])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return {
    ...state,
    execute,
    reset,
  }
}

/**
 * Hook for managing multiple async operations
 * Useful when you need to handle several async calls in one component
 */
export function useAsyncOperations() {
  const [operations, setOperations] = useState<Record<string, AsyncState<any>>>({})

  const createOperation = useCallback((key: string) => {
    return {
      execute: async (asyncFunction: () => Promise<any>) => {
        setOperations(prev => ({
          ...prev,
          [key]: { data: null, loading: true, error: null }
        }))

        try {
          const data = await asyncFunction()
          setOperations(prev => ({
            ...prev,
            [key]: { data, loading: false, error: null }
          }))
          return data
        } catch (error) {
          const errorObj = error instanceof Error ? error : new Error(String(error))
          setOperations(prev => ({
            ...prev,
            [key]: { data: null, loading: false, error: errorObj }
          }))
          throw errorObj
        }
      },
      reset: () => {
        setOperations(prev => ({
          ...prev,
          [key]: { data: null, loading: false, error: null }
        }))
      }
    }
  }, [])

  return {
    operations,
    createOperation,
  }
}