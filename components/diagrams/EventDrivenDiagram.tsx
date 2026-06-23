"use client"

import { useRef } from "react"
import { useTranslations } from "next-intl"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function EventDrivenDiagram() {
  const t = useTranslations("common")
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        ".anim-line",
        { strokeDashoffset: 100 },
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.inOut",
          stagger: 0.2,
          scrollTrigger: {
            trigger: container.current,
            start: "top 85%",
          },
        }
      )
    },
    { scope: container }
  )

  return (
    <div
      ref={container}
      className="flex w-full items-center justify-center rounded-xl border border-border bg-card/20 p-8"
    >
      <svg
        viewBox="0 0 600 300"
        className="w-full max-w-2xl overflow-visible font-mono text-xs"
      >
        <defs>
          <marker
            id="ed-arrow-cyan"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-cyan)" />
          </marker>
          <marker
            id="ed-arrow-blue"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-blue)" />
          </marker>
        </defs>

        <path
          className="anim-line"
          d="M 160 150 L 234 150"
          fill="none"
          stroke="var(--color-cyan)"
          strokeWidth="2"
          strokeDasharray="100"
          pathLength="100"
          markerEnd="url(#ed-arrow-cyan)"
        />
        <path
          className="anim-line"
          d="M 360 150 C 400 150, 400 60, 454 60"
          fill="none"
          stroke="var(--color-blue)"
          strokeWidth="2"
          strokeDasharray="100"
          pathLength="100"
          markerEnd="url(#ed-arrow-blue)"
        />
        <path
          className="anim-line"
          d="M 360 150 L 454 150"
          fill="none"
          stroke="var(--color-blue)"
          strokeWidth="2"
          strokeDasharray="100"
          pathLength="100"
          markerEnd="url(#ed-arrow-blue)"
        />
        <path
          className="anim-line"
          d="M 360 150 C 400 150, 400 240, 454 240"
          fill="none"
          stroke="var(--color-blue)"
          strokeWidth="2"
          strokeDasharray="100"
          pathLength="100"
          markerEnd="url(#ed-arrow-blue)"
        />

        <g transform="translate(40, 120)">
          <rect
            width="120"
            height="60"
            rx="8"
            fill="var(--color-card)"
            stroke="var(--color-cyan)"
            strokeWidth="2"
          />
          <text
            x="60"
            y="28"
            textAnchor="middle"
            fill="var(--color-foreground)"
            fontWeight="bold"
            fontSize="12"
          >
            {t("eventPublisherTitle")}
          </text>
          <text
            x="60"
            y="44"
            textAnchor="middle"
            fill="var(--color-muted-foreground)"
            fontSize="9"
          >
            {t("eventPublisherSubtitle")}
          </text>
        </g>

        <g transform="translate(240, 120)">
          <rect
            width="120"
            height="60"
            rx="8"
            fill="var(--color-card)"
            stroke="var(--color-border)"
            strokeWidth="2"
          />
          <text
            x="60"
            y="28"
            textAnchor="middle"
            fill="var(--color-foreground)"
            fontWeight="bold"
            fontSize="12"
          >
            {t("eventBusTitle")}
          </text>
          <text
            x="60"
            y="44"
            textAnchor="middle"
            fill="var(--color-muted-foreground)"
            fontSize="10"
          >
            {t("eventBusSubtitle")}
          </text>
        </g>

        {[
          { y: 40, label: t("eventSubscriberA") },
          { y: 130, label: t("eventSubscriberB") },
          { y: 220, label: t("eventSubscriberC") },
        ].map((sub) => (
          <g key={sub.label} transform={`translate(460, ${sub.y})`}>
            <rect
              width="120"
              height="40"
              rx="6"
              fill="var(--color-card)"
              stroke="var(--color-blue)"
              strokeWidth="2"
            />
            <text
              x="60"
              y="24"
              textAnchor="middle"
              fill="var(--color-foreground)"
              fontSize="11"
            >
              {sub.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
