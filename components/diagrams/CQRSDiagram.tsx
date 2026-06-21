"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function CQRSDiagram() {
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
        aria-label="CQRS diagram"
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

        {/*
          CQRS Dependency flow:
          - Commands → Write Model: commands carry intent to mutate state
          - Write Model persists and may raise Domain Events
          - Read Model is a separate projection updated independently
          - Queries → Read Model: queries read from an optimized read store
          The critical point: Commands and Queries NEVER share the same model.
          Arrow direction: A→B means "A sends to / depends on B".
        */}

        {/* Command → Write Model */}
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

        {/* Query → Read Model */}
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

        {/* Write Model ──event──▶ Read Model (async projection/sync) */}
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

        {/* ── Left column: Command and Query ── */}

        {/* Command */}
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
            Command
          </text>
          <text
            x="55"
            y="40"
            textAnchor="middle"
            fill="var(--color-muted-foreground)"
            fontSize="9"
          >
            intent to change
          </text>
        </g>

        {/* Query */}
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
            Query
          </text>
          <text
            x="55"
            y="40"
            textAnchor="middle"
            fill="var(--color-muted-foreground)"
            fontSize="9"
          >
            read only
          </text>
        </g>

        {/* ── Center: Write Model and Read Model (THE split) ── */}

        {/* Write Model */}
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
            Write Model
          </text>
          <text
            x="80"
            y="37"
            textAnchor="middle"
            fill="var(--color-muted-foreground)"
            fontSize="9"
          >
            aggregates, domain logic
          </text>
          <text
            x="80"
            y="49"
            textAnchor="middle"
            fill="var(--color-muted-foreground)"
            fontSize="9"
          >
            raises domain events
          </text>
        </g>

        {/* Read Model */}
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
            Read Model
          </text>
          <text
            x="80"
            y="37"
            textAnchor="middle"
            fill="var(--color-muted-foreground)"
            fontSize="9"
          >
            projection / view store
          </text>
          <text
            x="80"
            y="49"
            textAnchor="middle"
            fill="var(--color-muted-foreground)"
            fontSize="9"
          >
            optimized for reads
          </text>
        </g>

        {/* Event label on the sync arrow */}
        <text
          x="428"
          y="158"
          textAnchor="middle"
          fill="var(--color-muted-foreground)"
          fontSize="9"
          fontStyle="italic"
        >
          domain event
        </text>
        <text
          x="428"
          y="169"
          textAnchor="middle"
          fill="var(--color-muted-foreground)"
          fontSize="9"
          fontStyle="italic"
        >
          / projection
        </text>

        {/* Divider between the two sides — emphasises the read/write split */}
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
          write
        </text>
        <text
          x="280"
          y="16"
          textAnchor="middle"
          fill="var(--color-muted-foreground)"
          fontSize="8"
        >
          read/write split ↕
        </text>
      </svg>
    </div>
  )
}
