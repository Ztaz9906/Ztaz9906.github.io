"use client"

import { useRef } from "react"
import { useTranslations } from "next-intl"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function DDDLayersDiagram() {
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
          stagger: 0.3,
          scrollTrigger: {
            trigger: container.current,
            start: "top 85%",
          },
        }
      )
    },
    { scope: container }
  )

  const Box = ({
    y,
    title,
    subtitle,
    color,
  }: {
    y: number
    title: string
    subtitle: string
    color: string
  }) => (
    <g transform={`translate(80, ${y})`}>
      <rect
        width="240"
        height="56"
        rx="8"
        fill="var(--color-card)"
        stroke={`var(--color-${color})`}
        strokeWidth="2"
      />
      <text
        x="120"
        y="24"
        textAnchor="middle"
        fill="var(--color-foreground)"
        fontWeight="bold"
        fontSize="12"
      >
        {title}
      </text>
      <text
        x="120"
        y="42"
        textAnchor="middle"
        fill="var(--color-muted-foreground)"
        fontSize="10"
      >
        {subtitle}
      </text>
    </g>
  )

  return (
    <div
      ref={container}
      className="flex w-full items-center justify-center rounded-xl border border-border bg-card/20 p-8"
    >
      <svg
        viewBox="0 0 400 420"
        className="w-full max-w-md overflow-visible font-mono"
        aria-label={t("dddAriaLabel")}
      >
        <defs>
          {["cyan", "blue", "purple", "muted-foreground"].map((color) => (
            <marker
              key={color}
              id={`ddd-arrow-${color}`}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={`var(--color-${color})`} />
            </marker>
          ))}
        </defs>

        <path
          className="anim-line"
          d="M 200 76 L 200 105"
          fill="none"
          stroke="var(--color-cyan)"
          strokeWidth="2"
          strokeDasharray="100"
          pathLength="100"
          markerEnd="url(#ddd-arrow-cyan)"
        />
        <path
          className="anim-line"
          d="M 200 166 L 200 195"
          fill="none"
          stroke="var(--color-blue)"
          strokeWidth="2"
          strokeDasharray="100"
          pathLength="100"
          markerEnd="url(#ddd-arrow-blue)"
        />
        <path
          className="anim-line"
          d="M 320 313 C 360 313, 360 228, 320 228"
          fill="none"
          stroke="var(--color-purple)"
          strokeWidth="2"
          strokeDasharray="100"
          pathLength="100"
          markerEnd="url(#ddd-arrow-purple)"
        />

        <Box
          y={20}
          title={t("dddPresentationTitle")}
          subtitle={t("dddPresentationSubtitle")}
          color="cyan"
        />
        <Box
          y={110}
          title={t("dddApplicationTitle")}
          subtitle={t("dddApplicationSubtitle")}
          color="blue"
        />
        <Box
          y={200}
          title={t("dddDomainTitle")}
          subtitle={t("dddDomainSubtitle")}
          color="purple"
        />
        <Box
          y={290}
          title={t("dddInfrastructureTitle")}
          subtitle={t("dddInfrastructureSubtitle")}
          color="border"
        />

        <text
          x="368"
          y="272"
          textAnchor="start"
          fill="var(--color-muted-foreground)"
          fontSize="9"
          fontStyle="italic"
        >
          {t("dddImplements")}
        </text>
        <text
          x="368"
          y="283"
          textAnchor="start"
          fill="var(--color-muted-foreground)"
          fontSize="9"
          fontStyle="italic"
        >
          {t("dddDomainPorts")}
        </text>
      </svg>
    </div>
  )
}
