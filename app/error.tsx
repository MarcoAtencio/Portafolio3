'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-2">
          <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground">Algo salió mal</h1>
          <p className="text-muted-foreground">
            Ha ocurrido un error inesperado. Estamos trabajando para solucionarlo.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={reset} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Intentar de nuevo
            </Button>
            <Button variant="outline" asChild>
              <Link href="/" className="gap-2">
                <Home className="h-4 w-4" />
                Ir al inicio
              </Link>
            </Button>
          </div>

          {process.env.NODE_ENV === 'development' && (
            <details className="text-left bg-muted/50 p-4 rounded-lg">
              <summary className="cursor-pointer font-medium text-sm">
                Detalles del error (desarrollo)
              </summary>
              <pre className="mt-2 text-xs text-muted-foreground whitespace-pre-wrap break-all">
                {error.message}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </details>
          )}
        </div>

        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Si el problema persiste,{' '}
            <Link href="/#contact" className="text-primary hover:underline">
              contáctanos
            </Link>{' '}
            para reportar el problema.
          </p>
        </div>
      </div>
    </div>
  )
}
