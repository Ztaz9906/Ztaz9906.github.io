"use client";

import { useTranslations } from "next-intl";
import { BlogDiagramShell, useDiagramContainer } from "./_shared";

function ProcessBox({
  x,
  y,
  width,
  title,
  subtitle,
  color = "blue",
}: {
  x: number;
  y: number;
  width: number;
  title: string;
  subtitle?: string;
  color?: "blue" | "purple" | "cyan";
}) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        className="diagram-node"
        width={width}
        height="54"
        rx="12"
        fill="var(--color-card)"
        stroke={`var(--color-${color})`}
        strokeWidth="2"
      />
      <text
        className="diagram-label"
        x={width / 2}
        y="23"
        textAnchor="middle"
        fill="var(--color-foreground)"
        fontSize="11"
        fontWeight="700"
      >
        {title}
      </text>
      {subtitle ? (
        <text
          className="diagram-label"
          x={width / 2}
          y="39"
          textAnchor="middle"
          fill="var(--color-muted-foreground)"
          fontSize="9"
        >
          {subtitle}
        </text>
      ) : null}
    </g>
  );
}

function Decision({ cx, cy, label }: { cx: number; cy: number; label: string }) {
  return (
    <g transform={`translate(${cx}, ${cy})`}>
      <rect
        className="diagram-node"
        x="-26"
        y="-26"
        width="52"
        height="52"
        transform="rotate(45)"
        fill="rgba(139,92,246,0.12)"
        stroke="var(--color-purple)"
        strokeWidth="2"
      />
      <circle className="diagram-node" r="6" fill="var(--color-purple)" />
      <text
        className="diagram-label"
        y="46"
        textAnchor="middle"
        fill="var(--color-muted-foreground)"
        fontSize="9"
      >
        {label}
      </text>
    </g>
  );
}

export function SupabaseRLSDiagram() {
  const t = useTranslations("blog");
  const container = useDiagramContainer();

  return (
    <BlogDiagramShell ref={container}>
      <svg
        viewBox="0 0 900 450"
        className="h-full w-full font-mono"
        aria-label={t("diagramRlsAriaLabel")}
      >
        <defs>
          <marker
            id="rls-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-blue)" />
          </marker>
          <marker
            id="rls-arrow-muted"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-muted-foreground)" />
          </marker>
        </defs>

        <ProcessBox
          x={42}
          y={194}
          width={146}
          title={t("diagramRlsClientRequest")}
          subtitle={t("diagramRlsJwtAttached")}
          color="cyan"
        />
        <ProcessBox x={224} y={194} width={134} title={t("diagramRlsSupabaseAuth")} />
        <ProcessBox x={394} y={194} width={132} title={t("diagramRlsPostgresQuery")} />
        <Decision cx={606} cy={221} label={t("diagramRlsPolicyCheck")} />
        <ProcessBox
          x={698}
          y={104}
          width={148}
          title={t("diagramRlsAccessDenied")}
          subtitle={t("diagramRlsEmptyResult")}
          color="purple"
        />
        <ProcessBox
          x={670}
          y={286}
          width={176}
          title={t("diagramRlsFilteredRowsReturned")}
          color="blue"
        />

        {[
          "M 188 221 L 224 221",
          "M 358 221 L 394 221",
          "M 526 221 L 570 221",
        ].map((d) => (
          <path
            key={d}
            className="diagram-line"
            d={d}
            fill="none"
            stroke="var(--color-blue)"
            strokeWidth="2"
            strokeDasharray="100"
            pathLength="100"
            markerEnd="url(#rls-arrow)"
          />
        ))}

        <path
          className="diagram-line"
          d="M 630 195 C 670 166, 682 142, 698 131"
          fill="none"
          stroke="var(--color-muted-foreground)"
          strokeWidth="2"
          strokeDasharray="100"
          pathLength="100"
          markerEnd="url(#rls-arrow-muted)"
        />
        <path
          className="diagram-line"
          d="M 630 247 C 670 274, 688 303, 670 313"
          fill="none"
          stroke="var(--color-blue)"
          strokeWidth="2"
          strokeDasharray="100"
          pathLength="100"
          markerEnd="url(#rls-arrow)"
        />

        <text
          className="diagram-label"
          x="664"
          y="153"
          fill="var(--color-muted-foreground)"
          fontSize="9"
        >
          {t("diagramRlsDenied")}
        </text>
        <text
          className="diagram-label"
          x="658"
          y="280"
          fill="var(--color-blue)"
          fontSize="9"
        >
          {t("diagramRlsAllowed")}
        </text>
      </svg>
    </BlogDiagramShell>
  );
}
