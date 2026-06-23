"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { STATS } from "@/lib/data"

const STAT_LABEL_KEYS: Record<string, string> = {
  "years experience": "statsYearsExperience",
  "projects shipped": "statsProjectsShipped",
  technologies: "statsTechnologies",
  "concurrent users supported": "statsConcurrentUsersSupported",
}

function useCountUp(target: number, active: boolean, duration = 1600) {
  const [value, setValue] = React.useState(0)

  React.useEffect(() => {
    if (!active) return

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    if (reduce) {
      setValue(target)
      return
    }

    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, active, duration])

  return value
}

function StatItem({
  value,
  suffix,
  label,
  active,
}: {
  value: number
  suffix: string
  label: string
  active: boolean
}) {
  const count = useCountUp(value, active)
  return (
    <div className="text-center">
      <p className="font-mono text-4xl font-bold tabular-nums sm:text-5xl">
        <span className="text-gradient">
          {count.toLocaleString()}
          {suffix}
        </span>
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

export function Stats() {
  const t = useTranslations("common")
  const ref = React.useRef<HTMLDivElement | null>(null)
  const [active, setActive] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="border-y border-border bg-card/30">
      <div
        ref={ref}
        className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:py-20"
      >
        {STATS.map((stat) => (
          <StatItem
            key={stat.label}
            {...stat}
            label={t(STAT_LABEL_KEYS[stat.label])}
            active={active}
          />
        ))}
      </div>
    </section>
  )
}
