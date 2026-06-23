"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof React.JSX.IntrinsicElements
  delay?: number
  children?: React.ReactNode
}

export function Reveal({
  as = "div",
  delay = 0,
  className,
  children,
  style,
  ...props
}: RevealProps) {
  const ref = React.useRef<HTMLElement | null>(null)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    if (reduce) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return React.createElement(
    as,
    {
      ...props,
      ref,
      style: {
        ...style,
        transitionDelay: `${delay}ms`,
      },
      className: cn("reveal", visible && "is-visible", className),
    },
    children,
  )
}
