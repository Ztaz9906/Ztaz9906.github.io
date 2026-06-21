"use client";

import { BlogDiagramShell, useDiagramContainer } from "./_shared";

function Node({
  x,
  y,
  width,
  title,
  titleLines,
  subtitle,
  color,
}: {
  x: number;
  y: number;
  width: number;
  title: string;
  titleLines?: string[];
  subtitle?: string;
  color: "blue" | "purple" | "cyan";
}) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        className="diagram-node"
        width={width}
        height="58"
        rx="12"
        fill="var(--color-card)"
        stroke={`var(--color-${color})`}
        strokeWidth="2"
      />
      <text
        className="diagram-label"
        x={width / 2}
        y={titleLines ? 22 : 24}
        textAnchor="middle"
        fill="var(--color-foreground)"
        fontSize="12"
        fontWeight="700"
      >
        {titleLines
          ? titleLines.map((line, index) => (
              <tspan key={line} x={width / 2} dy={index === 0 ? 0 : 12}>
                {line}
              </tspan>
            ))
          : title}
      </text>
      {subtitle ? (
        <text
          className="diagram-label"
          x={width / 2}
          y={titleLines ? 48 : 40}
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

export function NextjsCQRSDiagram() {
  const container = useDiagramContainer();

  return (
    <BlogDiagramShell ref={container}>
      <svg
        viewBox="0 0 900 450"
        className="h-full w-full font-mono"
        aria-label="CQRS in Next.js with separate command and query lanes"
      >
        <defs>
          <marker
            id="next-cqrs-blue"
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
            id="next-cqrs-purple"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-purple)" />
          </marker>
        </defs>

        <rect
          className="diagram-node"
          x="22"
          y="88"
          width="856"
          height="108"
          rx="22"
          fill="rgba(59,130,246,0.06)"
          stroke="rgba(59,130,246,0.35)"
          strokeDasharray="6 6"
        />
        <rect
          className="diagram-node"
          x="22"
          y="244"
          width="856"
          height="108"
          rx="22"
          fill="rgba(139,92,246,0.06)"
          stroke="rgba(139,92,246,0.35)"
          strokeDasharray="6 6"
        />

        <text
          className="diagram-label"
          x="60"
          y="114"
          fill="var(--color-blue)"
          fontSize="11"
        >
          Command lane
        </text>
        <text
          className="diagram-label"
          x="60"
          y="270"
          fill="var(--color-purple)"
          fontSize="11"
        >
          Query lane
        </text>

        <Node x={56} y={196} width={128} title="Client" subtitle="user intent" color="cyan" />
        <Node
          x={228}
          y={118}
          width={180}
          title="Server Action"
          subtitle="Command entrypoint"
          color="blue"
        />
        <Node
          x={444}
          y={118}
          width={194}
          title="Write Model / Domain"
          subtitle="aggregates + rules"
          color="blue"
        />
        <Node x={692} y={118} width={130} title="Database" subtitle="writes" color="blue" />

        <Node
          x={214}
          y={274}
          width={236}
          title="Server Component / Route Handler"
          titleLines={["Server Component", "/ Route Handler"]}
          subtitle="Query entrypoint"
          color="purple"
        />
        <Node
          x={490}
          y={274}
          width={144}
          title="Read Model"
          subtitle="projection"
          color="purple"
        />
        <Node x={692} y={274} width={130} title="Database" subtitle="reads" color="purple" />

        {[
          "M 184 214 C 206 182, 214 160, 228 147",
          "M 408 147 L 444 147",
          "M 634 147 L 692 147",
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
            markerEnd="url(#next-cqrs-blue)"
          />
        ))}

        {[
          "M 184 236 C 200 266, 206 286, 214 303",
          "M 450 303 L 490 303",
          "M 634 303 L 692 303",
        ].map((d) => (
          <path
            key={d}
            className="diagram-line"
            d={d}
            fill="none"
            stroke="var(--color-purple)"
            strokeWidth="2"
            strokeDasharray="100"
            pathLength="100"
            markerEnd="url(#next-cqrs-purple)"
          />
        ))}

        <text
          className="diagram-label"
          x="304"
          y="154"
          textAnchor="middle"
          fill="var(--color-blue)"
          fontSize="10"
        >
          Command
        </text>
        <text
          className="diagram-label"
          x="304"
          y="290"
          textAnchor="middle"
          fill="var(--color-purple)"
          fontSize="10"
        >
          Query
        </text>
      </svg>
    </BlogDiagramShell>
  );
}
