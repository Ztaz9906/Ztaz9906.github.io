"use client";

import { useTranslations } from "next-intl"
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

const SKILL_CATEGORY_KEYS: Record<string, string> = {
  Languages: "categoryLanguages",
  Frontend: "categoryFrontend",
  Backend: "categoryBackend",
  Architecture: "categoryArchitecture",
  Databases: "categoryDatabases",
  Services: "categoryServices",
  "Services & Payments": "categoryServicesAndPayments",
  Tools: "categoryTools",
}

export function Skills() {
  const t = useTranslations("skills")
  const sectionRef = useRef<HTMLElement>(null)
  const [isSceneActive, setIsSceneActive] = useState(false)

  const planets: PlanetData[] = [
    {
      category: t("categoryLanguages"),
      color: "#60a5fa",
      orbitRadius: 5,
      orbitSpeed: 0.18,
      size: 0.45,
      skills: [
        { name: "JavaScript", level: t("levelAdvanced"), years: 4 },
        { name: "TypeScript", level: t("levelAdvanced"), years: 4 },
        { name: "Python", level: t("levelIntermediate"), years: 3 },
      ],
    },
    {
      category: t("categoryFrontend"),
      color: "#818cf8",
      orbitRadius: 8,
      orbitSpeed: 0.12,
      size: 0.65,
      skills: [
        { name: "React", level: t("levelAdvanced"), years: 4 },
        { name: "Next.js", level: t("levelAdvanced"), years: 3 },
        { name: "Astro", level: t("levelIntermediate"), years: 1 },
        { name: "Redux Toolkit", level: t("levelAdvanced"), years: 3 },
        { name: "Tailwind CSS", level: t("levelAdvanced"), years: 4 },
        { name: "shadcn/ui", level: t("levelAdvanced"), years: 2 },
        { name: "Radix UI", level: t("levelIntermediate"), years: 2 },
      ],
    },
    {
      category: t("categoryBackend"),
      color: "#34d399",
      orbitRadius: 11,
      orbitSpeed: 0.09,
      size: 0.6,
      skills: [
        { name: "Node.js", level: t("levelIntermediate"), years: 3 },
        { name: "Django", level: t("levelAdvanced"), years: 3 },
        { name: "Supabase", level: t("levelIntermediate"), years: 2 },
        { name: "Firebase", level: t("levelIntermediate"), years: 3 },
        { name: "GraphQL", level: t("levelIntermediate"), years: 2 },
        { name: "REST APIs", level: t("levelAdvanced"), years: 4 },
      ],
    },
    {
      category: t("categoryArchitecture"),
      color: "#a78bfa",
      orbitRadius: 14,
      orbitSpeed: 0.07,
      size: 0.55,
      skills: [
        { name: "SOLID", level: t("levelAdvanced"), years: 3 },
        { name: "DDD", level: t("levelAdvanced"), years: 3 },
        { name: "Clean Architecture", level: t("levelAdvanced"), years: 3 },
        { name: "Event-Driven (SSE)", level: t("levelAdvanced"), years: 2 },
        { name: "CQRS", level: t("levelIntermediate"), years: 2 },
      ],
    },
    {
      category: t("categoryDatabases"),
      color: "#93c5fd",
      orbitRadius: 17,
      orbitSpeed: 0.055,
      size: 0.5,
      skills: [
        { name: "PostgreSQL", level: t("levelAdvanced"), years: 3 },
        { name: "Prisma", level: t("levelAdvanced"), years: 2 },
        { name: "TypeORM", level: t("levelIntermediate"), years: 2 },
        { name: "Drizzle ORM", level: t("levelIntermediate"), years: 1 },
      ],
    },
    {
      category: t("categoryServices"),
      color: "#67e8f9",
      orbitRadius: 20,
      orbitSpeed: 0.045,
      size: 0.55,
      skills: [
        { name: "Stripe", level: t("levelAdvanced"), years: 2 },
        { name: "Supabase Auth", level: t("levelIntermediate"), years: 2 },
        { name: "Google OAuth", level: t("levelAdvanced"), years: 3 },
        { name: "Ably Realtime", level: t("levelIntermediate"), years: 1 },
        { name: "Mapbox", level: t("levelIntermediate"), years: 1 },
      ],
    },
    {
      category: t("categoryTools"),
      color: "#7dd3fc",
      orbitRadius: 23,
      orbitSpeed: 0.035,
      size: 0.45,
      skills: [
        { name: "Git", level: t("levelAdvanced"), years: 4 },
        { name: "GitHub", level: t("levelAdvanced"), years: 4 },
        { name: "CI/CD", level: t("levelIntermediate"), years: 2 },
        { name: "Jest", level: t("levelIntermediate"), years: 2 },
        { name: "Docker", level: t("levelIntermediate"), years: 2 },
      ],
    },
  ]

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
              {t(SKILL_CATEGORY_KEYS[group.category])}
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
        title={t("title")}
        description={t("description")}
      />

      <div className="mt-12">
        <div className="mb-5 rounded-2xl border border-border/70 bg-card/70 px-4 py-3 text-sm text-muted-foreground backdrop-blur">
          {t.rich("helperInstructions", {
            key: (chunks) => (
              <span className="font-mono text-foreground">{chunks}</span>
            ),
          })}
        </div>
        {isSceneActive ? (
          <Suspense fallback={gridFallback}>
            <SkillsGalaxy planets={planets} fallback={gridFallback} />
          </Suspense>
        ) : (
          gridFallback
        )}
      </div>
    </section>
  )
}
