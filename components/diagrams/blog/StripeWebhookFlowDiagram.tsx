"use client";

import { useTranslations } from "next-intl";
import { BlogDiagramShell, useDiagramContainer } from "./_shared";

function ProcessBox({
  x,
  y,
  width,
  title,
  color = "blue",
}: {
  x: number;
  y: number;
  width: number;
  title: string;
  color?: "blue" | "purple" | "cyan";
}) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        className="diagram-node"
        width={width}
        height="46"
        rx="12"
        fill="var(--color-card)"
        stroke={`var(--color-${color})`}
        strokeWidth="2"
      />
      <text
        className="diagram-label"
        x={width / 2}
        y="28"
        textAnchor="middle"
        fill="var(--color-foreground)"
        fontSize="11"
        fontWeight="700"
      >
        {title}
      </text>
    </g>
  );
}

function Decision({
  cx,
  cy,
  label,
}: {
  cx: number;
  cy: number;
  label: string;
}) {
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
      <circle
        className="diagram-node"
        r="6"
        fill="var(--color-purple)"
        stroke="var(--color-background)"
        strokeWidth="2"
      />
      <text
        className="diagram-label"
        x="0"
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

export function StripeWebhookFlowDiagram() {
  const t = useTranslations("blog");
  const container = useDiagramContainer();

  return (
    <BlogDiagramShell ref={container}>
      <svg
        viewBox="0 0 900 450"
        className="h-full w-full font-mono"
        aria-label={t("diagramStripeAriaLabel")}
      >
        <defs>
          <marker
            id="stripe-arrow"
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
            id="stripe-arrow-muted"
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

        <ProcessBox x={42} y={194} width={108} title={t("diagramStripeEvent")} color="cyan" />
        <ProcessBox x={182} y={194} width={136} title={t("diagramStripeWebhookEndpoint")} />
        <Decision cx={392} cy={217} label={t("diagramStripeVerifySignature")} />
        <ProcessBox x={456} y={194} width={138} title={t("diagramStripeIdempotencyCheck")} color="purple" />
        <ProcessBox x={630} y={194} width={122} title={t("diagramStripeProcessEvent")} />
        <ProcessBox x={778} y={194} width={86} title={t("diagramStripe200Ok")} color="cyan" />

        <ProcessBox x={324} y={72} width={110} title={t("diagramStripeReject400")} color="purple" />
        <ProcessBox x={468} y={334} width={82} title={t("diagramStripeSkip")} color="purple" />

        {[
          "M 150 217 L 182 217",
          "M 318 217 L 356 217",
          "M 428 217 L 456 217",
          "M 594 217 L 630 217",
          "M 752 217 L 778 217",
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
            markerEnd="url(#stripe-arrow)"
          />
        ))}

        <path
          className="diagram-line"
          d="M 392 165 C 392 134, 374 112, 350 95"
          fill="none"
          stroke="var(--color-muted-foreground)"
          strokeWidth="2"
          strokeDasharray="100"
          pathLength="100"
          markerEnd="url(#stripe-arrow-muted)"
        />
        <path
          className="diagram-line"
          d="M 525 240 C 525 278, 508 304, 508 334"
          fill="none"
          stroke="var(--color-muted-foreground)"
          strokeWidth="2"
          strokeDasharray="100"
          pathLength="100"
          markerEnd="url(#stripe-arrow-muted)"
        />

        <text
          className="diagram-label"
          x="416"
          y="186"
          fill="var(--color-blue)"
          fontSize="9"
        >
          {t("diagramStripeValid")}
        </text>
        <text
          className="diagram-label"
          x="370"
          y="122"
          fill="var(--color-muted-foreground)"
          fontSize="9"
        >
          {t("diagramStripeInvalid")}
        </text>
        <text
          className="diagram-label"
          x="508"
          y="289"
          fill="var(--color-muted-foreground)"
          fontSize="9"
        >
          {t("diagramStripeAlreadyProcessed")}
        </text>
        <text
          className="diagram-label"
          x="561"
          y="186"
          fill="var(--color-blue)"
          fontSize="9"
        >
          {t("diagramStripeNew")}
        </text>
      </svg>
    </BlogDiagramShell>
  );
}
