import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Enrique Ferreiro — Software Engineer",
  description:
    "Software Engineer specialized in scalable applications and modern architectures. DDD, CQRS, Event-Driven. Next.js, TypeScript, Python.",
  keywords: [
    "Enrique Ferreiro",
    "Software Engineer",
    "Next.js",
    "TypeScript",
    "Python",
    "DDD",
    "CQRS",
    "Event-Driven",
  ],
  authors: [{ name: "Enrique Ferreiro" }],
  openGraph: {
    title: "Enrique Ferreiro — Software Engineer",
    description:
      "Scalable applications & modern architectures. DDD · CQRS · Event-Driven.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
