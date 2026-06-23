"use client"

import { useRef } from "react"
import { useTranslations } from "next-intl"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function CQRSDiagram() {
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

  return (
    <div
      ref={container}
      className="flex w-full items-center justify-center rounded-xl border border-border bg-card/20 p-8"
    >
      <svg
        viewBox="0 0 640 320"
        className="w-full max-w-2xl overflow-visible font-mono text-xs"
        aria-label={t("cqrsAriaLabel")}
      >
        <defs>
          <marker
            id="cqrs-arrow-blue"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-blue)" />
          </marker>
          <marker
            id="cqrs-arrow-purple"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-purple)" />
          </marker>
        </defs>

        <path
          className="anim-line"
          d="M 130 80 L 200 80"
          fill="none"
          stroke="var(--color-blue)"
          strokeWidth="2"
          strokeDasharray="100"
          pathLength="100"
          markerEnd="url(#cqrs-arrow-blue)"
        />
        <path
          className="anim-line"
          d="M 130 240 L 200 240"
          fill="none"
          stroke="var(--color-purple)"
          strokeWidth="2"
          strokeDasharray="100"
          pathLength="100"
          markerEnd="url(#cqrs-arrow-purple)"
        />
        <path
          className="anim-line"
          d="M 360 100 C 420 100, 420 220, 360 220"
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="1.5"
          strokeDasharray="5 4"
          pathLength="100"
          markerEnd="url(#cqrs-arrow-blue)"
        />

        <g transform="translate(20, 54)">
          <rect
            width="110"
            height="52"
            rx="8"
            fill="var(--color-card)"
            stroke="var(--color-blue)"
            strokeWidth="2"
          />
          <text
            x="55"
            y="24"
            textAnchor="middle"
            fill="var(--color-foreground)"
            fontWeight="bold"
            fontSize="12"
          >
            {t("cqrsCommandTitle")}
          </text>
          <text
            x="55"
            y="40"
            textAnchor="middle"
            fill="var(--color-muted-foreground)"
            fontSize="9"
          >
            {t("cqrsCommandSubtitle")}
          </text>
        </g>

        <g transform="translate(20, 214)">
          <rect
            width="110"
            height="52"
            rx="8"
            fill="var(--color-card)"
            stroke="var(--color-purple)"
            strokeWidth="2"
          />
          <text
            x="55"
            y="24"
            textAnchor="middle"
            fill="var(--color-foreground)"
            fontWeight="bold"
            fontSize="12"
          >
            {t("cqrsQueryTitle")}
          </text>
          <text
            x="55"
            y="40"
            textAnchor="middle"
            fill="var(--color-muted-foreground)"
            fontSize="9"
          >
            {t("cqrsQuerySubtitle")}
          </text>
        </g>

        <g transform="translate(200, 54)">
          <rect
            width="160"
            height="52"
            rx="8"
            fill="var(--color-card)"
            stroke="var(--color-blue)"
            strokeWidth="2"
          />
          <text
            x="80"
            y="22"
            textAnchor="middle"
            fill="var(--color-foreground)"
            fontWeight="bold"
            fontSize="12"
          >
            {t("cqrsWriteModelTitle")}
          </text>
          <text
            x="80"
            y="37"
            textAnchor="middle"
            fill="var(--color-muted-foreground)"
            fontSize="9"
          >
            {t("cqrsWriteModelSubtitleOne")}
          </text>
          <text
            x="80"
            y="49"
            textAnchor="middle"
            fill="var(--color-muted-foreground)"
            fontSize="9"
          >
            {t("cqrsWriteModelSubtitleTwo")}
          </text>
        </g>

        <g transform="translate(200, 214)">
          <rect
            width="160"
            height="52"
            rx="8"
            fill="var(--color-card)"
            stroke="var(--color-purple)"
            strokeWidth="2"
          />
          <text
            x="80"
            y="22"
            textAnchor="middle"
            fill="var(--color-foreground)"
            fontWeight="bold"
            fontSize="12"
          >
            {t("cqrsReadModelTitle")}
          </text>
          <text
            x="80"
            y="37"
            textAnchor="middle"
            fill="var(--color-muted-foreground)"
            fontSize="9"
          >
            {t("cqrsReadModelSubtitleOne")}
          </text>
          <text
            x="80"
            y="49"
            textAnchor="middle"
            fill="var(--color-muted-foreground)"
            fontSize="9"
          >
            {t("cqrsReadModelSubtitleTwo")}
          </text>
        </g>

        <text
          x="428"
          y="158"
          textAnchor="middle"
          fill="var(--color-muted-foreground)"
          fontSize="9"
          fontStyle="italic"
        >
          {t("cqrsDomainEvent")}
        </text>
        <text
          x="428"
          y="169"
          textAnchor="middle"
          fill="var(--color-muted-foreground)"
          fontSize="9"
          fontStyle="italic"
        >
          {t("cqrsProjection")}
        </text>

        <line
          x1="180"
          y1="20"
          x2="180"
          y2="300"
          stroke="var(--color-border)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <text
          x="164"
          y="16"
          textAnchor="middle"
          fill="var(--color-muted-foreground)"
          fontSize="8"
        >
          {t("cqrsWrite")}
        </text>
        <text
          x="280"
          y="16"
          textAnchor="middle"
          fill="var(--color-muted-foreground)"
          fontSize="8"
        >
          {t("cqrsReadWriteSplit")}
        </text>
      </svg>
    </div>
  )
}
