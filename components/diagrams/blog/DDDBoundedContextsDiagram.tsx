"use client";

import { useTranslations } from "next-intl";
import { BlogDiagramShell, useDiagramContainer } from "./_shared";

function ContextBox({
  x,
  title,
  color,
  labels,
}: {
  x: number;
  title: string;
  color: "blue" | "purple" | "cyan";
  labels: string[];
}) {
  return (
    <g transform={`translate(${x}, 78)`}>
      <rect
        className="diagram-node"
        width="180"
        height="156"
        rx="18"
        fill="rgba(3,7,18,0.88)"
        stroke={`var(--color-${color})`}
        strokeWidth="2"
        strokeDasharray="7 6"
      />
      <text
        className="diagram-label"
        x="90"
        y="32"
        textAnchor="middle"
        fill="var(--color-foreground)"
        fontSize="13"
        fontWeight="700"
      >
        {title}
      </text>
      {labels.map((label, index) => (
        <g key={label} transform={`translate(22, ${50 + index * 32})`}>
          <rect
            className="diagram-node"
            width="136"
            height="22"
            rx="11"
            fill="var(--color-card)"
            stroke="var(--color-border)"
          />
          <text
            className="diagram-label"
            x="68"
            y="15"
            textAnchor="middle"
            fill="var(--color-muted-foreground)"
            fontSize="9"
          >
            {label}
          </text>
        </g>
      ))}
    </g>
  );
}

export function DDDBoundedContextsDiagram() {
  const t = useTranslations("blog");
  const container = useDiagramContainer();

  return (
    <BlogDiagramShell ref={container}>
      <svg
        viewBox="0 0 900 450"
        className="h-full w-full font-mono"
        aria-label={t("diagramDddContextsAriaLabel")}
      >
        <defs>
          <marker
            id="ddd-blog-arrow"
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

        <ContextBox
          x={52}
          title={t("diagramDddOrdersContext")}
          color="blue"
          labels={[
            t("diagramDddOrderEntity"),
            t("diagramDddCheckoutAggregate"),
            t("diagramDddOrderRepository"),
          ]}
        />
        <ContextBox
          x={360}
          title={t("diagramDddInventoryContext")}
          color="purple"
          labels={[
            t("diagramDddStockEntity"),
            t("diagramDddReservationAggregate"),
            t("diagramDddInventoryRepo"),
          ]}
        />
        <ContextBox
          x={668}
          title={t("diagramDddBillingContext")}
          color="cyan"
          labels={[
            t("diagramDddInvoiceEntity"),
            t("diagramDddPaymentAggregate"),
            t("diagramDddBillingRepo"),
          ]}
        />

        <path
          className="diagram-line"
          d="M 232 156 C 280 156, 308 122, 360 122"
          fill="none"
          stroke="var(--color-cyan)"
          strokeWidth="2"
          strokeDasharray="100"
          pathLength="100"
          markerEnd="url(#ddd-blog-arrow)"
        />
        <path
          className="diagram-line"
          d="M 540 188 C 590 188, 616 154, 668 154"
          fill="none"
          stroke="var(--color-cyan)"
          strokeWidth="2"
          strokeDasharray="100"
          pathLength="100"
          markerEnd="url(#ddd-blog-arrow)"
        />

        <text
          className="diagram-label"
          x="298"
          y="115"
          textAnchor="middle"
          fill="var(--color-cyan)"
          fontSize="9"
        >
          {t("diagramDddDomainEvent")}
        </text>
        <text
          className="diagram-label"
          x="606"
          y="148"
          textAnchor="middle"
          fill="var(--color-cyan)"
          fontSize="9"
        >
          {t("diagramDddDomainEvent")}
        </text>

        <text
          className="diagram-label"
          x="450"
          y="372"
          textAnchor="middle"
          fill="var(--color-muted-foreground)"
          fontSize="11"
        >
          {t("diagramDddIsolatedContexts")}
        </text>
      </svg>
    </BlogDiagramShell>
  );
}
