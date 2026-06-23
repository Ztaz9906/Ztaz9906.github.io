"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { SectionHeading } from "@/components/section-heading"
import { DDDLayersDiagram } from "./DDDLayersDiagram"
import { CQRSDiagram } from "./CQRSDiagram"
import { EventDrivenDiagram } from "./EventDrivenDiagram"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/reveal"

export function ArchitectureSection() {
  const t = useTranslations("common")
  const diagrams = [
    { id: "ddd", label: t("architectureTabDdd") },
    { id: "cqrs", label: t("architectureTabCqrs") },
    { id: "event", label: t("architectureTabEventDriven") },
  ] as const
  const [active, setActive] = useState<(typeof diagrams)[number]["id"]>("ddd")

  return (
    <section id="architecture" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeading
        eyebrow="// 04"
        title={t("architectureTitle")}
        description={t("architectureDescription")}
      />

      <Reveal delay={100} className="mt-12">
        <div className="mb-8 flex flex-wrap gap-2">
          {diagrams.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={cn(
                "rounded-full border px-5 py-2 font-mono text-sm transition-colors",
                active === tab.id
                  ? "border-blue/50 bg-blue/10 text-blue"
                  : "border-border bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-xl bg-card/10 shadow-2xl shadow-black/40">
          <div className={cn("transition-opacity duration-500", active === "ddd" ? "opacity-100" : "hidden opacity-0")}>
            {active === "ddd" && <DDDLayersDiagram />}
          </div>
          <div className={cn("transition-opacity duration-500", active === "cqrs" ? "opacity-100" : "hidden opacity-0")}>
            {active === "cqrs" && <CQRSDiagram />}
          </div>
          <div className={cn("transition-opacity duration-500", active === "event" ? "opacity-100" : "hidden opacity-0")}>
            {active === "event" && <EventDrivenDiagram />}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
