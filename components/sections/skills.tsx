"use client";

import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { SKILLS } from "@/lib/data"
import dynamic from "next/dynamic"
import { Suspense, useEffect, useRef, useState } from "react"
import { type PlanetData } from "@/components/three/types"

const SkillsGalaxy = dynamic(() => import("@/components/three/SkillsGalaxy"), {
  ssr: false,
})

const SKILL_ICONS: Record<string, string> = {
  JavaScript: "/iconos/javascript.svg",
  React: "/iconos/react.svg",
  "Next.js": "/iconos/nextdotjs.svg",
  TypeScript: "/iconos/typescript.svg",
  Python: "/iconos/python.svg",
  "Node.js": "/iconos/node.svg",
  Astro: "/iconos/astro.svg",
  "Redux Toolkit": "/iconos/redux.svg",
  "Tailwind CSS": "/iconos/tailwindcss.svg",
  "shadcn/ui": "/iconos/shadcnui.svg",
  "Radix UI": "/iconos/radixui.svg",
  Django: "/iconos/django.svg",
  Firebase: "/iconos/firebase.svg",
  Docker: "/iconos/docker.svg",
  Stripe: "/iconos/stripe.svg",
  GraphQL: "/iconos/graphql.svg",
  Supabase: "/iconos/supabase.svg",
  PostgreSQL: "/iconos/postgresql.svg",
  Prisma: "/iconos/prisma.svg",
  TypeORM: "/iconos/typeorm.svg",
  "Drizzle ORM": "/iconos/drizzle.svg",
  "Google OAuth": "/iconos/google.svg",
  "Ably Realtime": "/iconos/ably.svg",
  Mapbox: "/iconos/mapbox.svg",
  Git: "/iconos/git.svg",
  GitHub: "/iconos/github.svg",
  Jest: "/iconos/jest.svg",
}

const PLANETS: PlanetData[] = [
  {
    category: "Languages",
    color: "#60a5fa", // blue-400
    orbitRadius: 5,
    orbitSpeed: 0.18,
    size: 0.45,
    skills: [
      { name: "JavaScript", level: "Advanced", years: 4 },
      { name: "TypeScript", level: "Advanced", years: 4 },
      { name: "Python", level: "Intermediate", years: 3 },
    ],
  },
  {
    category: "Frontend",
    color: "#818cf8", // indigo-400
    orbitRadius: 8,
    orbitSpeed: 0.12,
    size: 0.65,
    skills: [
      { name: "React", level: "Advanced", years: 4 },
      { name: "Next.js", level: "Advanced", years: 3 },
      { name: "Astro", level: "Intermediate", years: 1 },
      { name: "Redux Toolkit", level: "Advanced", years: 3 },
      { name: "Tailwind CSS", level: "Advanced", years: 4 },
      { name: "shadcn/ui", level: "Advanced", years: 2 },
      { name: "Radix UI", level: "Intermediate", years: 2 },
    ],
  },
  {
    category: "Backend",
    color: "#34d399", // emerald-400
    orbitRadius: 11,
    orbitSpeed: 0.09,
    size: 0.6,
    skills: [
      { name: "Node.js", level: "Intermediate", years: 3 },
      { name: "Django", level: "Advanced", years: 3 },
      { name: "Supabase", level: "Intermediate", years: 2 },
      { name: "Firebase", level: "Intermediate", years: 3 },
      { name: "GraphQL", level: "Intermediate", years: 2 },
      { name: "REST APIs", level: "Advanced", years: 4 },
    ],
  },
  {
    category: "Architecture",
    color: "#a78bfa", // violet-400
    orbitRadius: 14,
    orbitSpeed: 0.07,
    size: 0.55,
    skills: [
      { name: "SOLID", level: "Advanced", years: 3 },
      { name: "DDD", level: "Advanced", years: 3 },
      { name: "Clean Architecture", level: "Advanced", years: 3 },
      { name: "Event-Driven (SSE)", level: "Advanced", years: 2 },
      { name: "CQRS", level: "Intermediate", years: 2 },
    ],
  },
  {
    category: "Databases",
    color: "#93c5fd", // blue-300
    orbitRadius: 17,
    orbitSpeed: 0.055,
    size: 0.5,
    skills: [
      { name: "PostgreSQL", level: "Advanced", years: 3 },
      { name: "Prisma", level: "Advanced", years: 2 },
      { name: "TypeORM", level: "Intermediate", years: 2 },
      { name: "Drizzle ORM", level: "Intermediate", years: 1 },
    ],
  },
  {
    category: "Services",
    color: "#67e8f9", // cyan-300
    orbitRadius: 20,
    orbitSpeed: 0.045,
    size: 0.55,
    skills: [
      { name: "Stripe", level: "Advanced", years: 2 },
      { name: "Supabase Auth", level: "Intermediate", years: 2 },
      { name: "Google OAuth", level: "Advanced", years: 3 },
      { name: "Ably Realtime", level: "Intermediate", years: 1 },
      { name: "Mapbox", level: "Intermediate", years: 1 },
    ],
  },
  {
    category: "Tools",
    color: "#7dd3fc", // light-blue-300
    orbitRadius: 23,
    orbitSpeed: 0.035,
    size: 0.45,
    skills: [
      { name: "Git", level: "Advanced", years: 4 },
      { name: "GitHub", level: "Advanced", years: 4 },
      { name: "CI/CD", level: "Intermediate", years: 2 },
      { name: "Jest", level: "Intermediate", years: 2 },
      { name: "Docker", level: "Intermediate", years: 2 },
    ],
  },
];

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isSceneActive, setIsSceneActive] = useState(false)

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSceneActive(entry.isIntersecting)
      },
      {
        rootMargin: "300px 0px",
        threshold: 0,
      }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const gridFallback = (
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {SKILLS.map((group, i) => (
        <Reveal key={group.category} delay={(i % 3) * 80}>
          <div className="rounded-xl border border-border bg-card p-5 h-full">
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  tabIndex={0}
                  className="inline-flex cursor-default items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 font-mono text-xs text-foreground/80 transition-all duration-200 hover:border-transparent hover:bg-blue/10 hover:text-foreground hover:shadow-[0_0_18px_-6px_rgba(59,130,246,0.7)] focus-visible:border-blue focus-visible:outline-none"
                >
                  {SKILL_ICONS[skill] && (
                    <img
                      src={SKILL_ICONS[skill]}
                      alt=""
                      aria-hidden="true"
                      className="h-3.5 w-3.5 shrink-0 object-contain"
                    />
                  )}
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );

  return (
    <section ref={sectionRef} id="skills" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeading
        eyebrow="// 04"
        title="Skills & Tooling"
        description="The technologies I reach for to build reliable, scalable systems."
      />

      <div className="mt-12">
        <div className="mb-5 rounded-2xl border border-border/70 bg-card/70 px-4 py-3 text-sm text-muted-foreground backdrop-blur">
          Hover a planet to preview it. Click a planet to lock focus, use your mouse wheel to zoom, hover a label to freeze it, and press <span className="font-mono text-foreground">Esc</span> to exit focus.
        </div>
        {isSceneActive ? (
          <Suspense fallback={gridFallback}>
            <SkillsGalaxy planets={PLANETS} fallback={gridFallback} />
          </Suspense>
        ) : (
          gridFallback
        )}
      </div>
    </section>
  )
}
