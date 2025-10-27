import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { ErrorBoundary } from "@/components/error-boundary"
import { Loading } from "@/components/loading"
import { initPerformanceMonitoring } from "@/lib/performance"
import { Suspense } from "react"
import Script from "next/script"
import "./globals.css"

export const metadata: Metadata = {
  title: "Marco Atencio | Desarrollador Full-Stack",
  description:
    "Portfolio de Marco Atencio - Desarrollador Full-Stack Senior con más de 5 años de experiencia en Java, Spring Boot, React y Angular.",
  keywords: ["desarrollador", "full-stack", "Java", "Spring Boot", "React", "Angular", "TypeScript", "Node.js", "desarrollo web", "aplicaciones móviles"],
  authors: [{ name: "Marco Atencio" }],
  creator: "Marco Atencio",
  publisher: "Marco Atencio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://marcoatencio.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Marco Atencio | Desarrollador Full-Stack",
    description: "Portfolio de Marco Atencio - Desarrollador Full-Stack Senior con más de 5 años de experiencia en Java, Spring Boot, React y Angular.",
    url: "https://marcoatencio.dev",
    siteName: "Marco Atencio Portfolio",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Marco Atencio - Desarrollador Full-Stack",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marco Atencio | Desarrollador Full-Stack",
    description: "Portfolio de Marco Atencio - Desarrollador Full-Stack Senior con más de 5 años de experiencia en Java, Spring Boot, React y Angular.",
    images: ["/og-image.svg"],
    creator: "@marcoatencio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code",
  },
  generator: "v0.app",
  other: {
    // Preconnect hints removed - now using local images
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Marco Atencio",
    "jobTitle": "Desarrollador Full-Stack Senior",
    "description": "Desarrollador Full-Stack Senior con más de 5 años de experiencia en Java, Spring Boot, React y Angular.",
    "url": "https://marcoatencio.dev",
    "sameAs": [
      "https://github.com/MarcoAtencio",
      "https://linkedin.com/in/marcoatencio"
    ],
    "knowsAbout": [
      "Java",
      "Spring Boot",
      "React",
      "Angular",
      "TypeScript",
      "Node.js",
      "Microservicios",
      "Desarrollo Web",
      "Aplicaciones Móviles"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Perú"
    }
  }

  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <Script
          id="performance-monitoring"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (${initPerformanceMonitoring.toString()})();
            `,
          }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {/* Skip to main content link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Saltar al contenido principal
        </a>
        <ErrorBoundary>
          <ThemeProvider defaultTheme="dark">
            <LanguageProvider>
              <Suspense fallback={<Loading />}>
                {children}
                <Toaster />
                <Analytics />
              </Suspense>
            </LanguageProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
