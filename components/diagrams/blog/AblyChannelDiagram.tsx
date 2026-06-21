"use client";

import { BlogDiagramShell, useDiagramContainer } from "./_shared";

function Box({
  x,
  y,
  width,
  title,
  subtitle,
  color,
}: {
  x: number;
  y: number;
  width: number;
  title: string;
  subtitle?: string;
  color: "blue" | "purple" | "cyan";
}) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        className="diagram-node"
        width={width}
        height="62"
        rx="12"
        fill="var(--color-card)"
        stroke={`var(--color-${color})`}
        strokeWidth="2"
      />
      <text
        className="diagram-label"
        x={width / 2}
        y="26"
        textAnchor="middle"
        fill="var(--color-foreground)"
        fontSize="12"
        fontWeight="700"
      >
        {title}
      </text>
      {subtitle ? (
        <text
          className="diagram-label"
          x={width / 2}
          y="42"
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

export function AblyChannelDiagram() {
  const container = useDiagramContainer();

  return (
    <BlogDiagramShell ref={container}>
      <svg
        viewBox="0 0 900 450"
        className="h-full w-full font-mono"
        aria-label="Ably channel with publisher, presence, and subscriber fan out"
      >
        <defs>
          <marker
            id="ably-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-cyan)" />
          </marker>
        </defs>

        <Box
          x={56}
          y={194}
          width={168}
          title="Driver App"
          subtitle="publisher"
          color="blue"
        />
        <Box
          x={354}
          y={194}
          width={192}
          title="Ably Channel"
          subtitle="pub/sub stream"
          color="cyan"
        />
        <Box
          x={654}
          y={104}
          width={190}
          title="Customer App"
          subtitle="subscriber"
          color="purple"
        />
        <Box
          x={632}
          y={286}
          width={212}
          title="Dispatch Dashboard"
          subtitle="subscriber"
          color="purple"
        />

        <rect
          className="diagram-node"
          x="428"
          y="150"
          width="82"
          height="28"
          rx="14"
          fill="rgba(6,182,212,0.12)"
          stroke="var(--color-cyan)"
          strokeDasharray="4 4"
        />
        <text
          className="diagram-label"
          x="469"
          y="168"
          textAnchor="middle"
          fill="var(--color-cyan)"
          fontSize="9"
        >
          Presence
        </text>

        {[
          "M 224 225 L 354 225",
          "M 546 225 C 600 225, 606 135, 654 135",
          "M 546 225 C 600 225, 600 317, 632 317",
        ].map((d) => (
          <path
            key={d}
            className="diagram-line"
            d={d}
            fill="none"
            stroke="var(--color-cyan)"
            strokeWidth="2"
            strokeDasharray="100"
            pathLength="100"
            markerEnd="url(#ably-arrow)"
          />
        ))}

        <text
          className="diagram-label"
          x="290"
          y="214"
          textAnchor="middle"
          fill="var(--color-blue)"
          fontSize="10"
        >
          publish
        </text>
        <text
          className="diagram-label"
          x="614"
          y="135"
          textAnchor="middle"
          fill="var(--color-purple)"
          fontSize="10"
        >
          subscribe
        </text>
        <text
          className="diagram-label"
          x="604"
          y="318"
          textAnchor="middle"
          fill="var(--color-purple)"
          fontSize="10"
        >
          subscribe
        </text>
      </svg>
    </BlogDiagramShell>
  );
}
