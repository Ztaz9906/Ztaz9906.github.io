"use client";

import { useTranslations } from "next-intl";
import { BlogDiagramShell, useDiagramContainer } from "./_shared";

function Box({
  x,
  y,
  width,
  title,
  titleLines,
  subtitle,
  color = "blue",
}: {
  x: number;
  y: number;
  width: number;
  title: string;
  titleLines?: string[];
  subtitle?: string;
  color?: "blue" | "purple" | "cyan";
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
        y={titleLines ? 20 : 24}
        textAnchor="middle"
        fill="var(--color-foreground)"
        fontSize="11"
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
          y={titleLines ? 46 : 40}
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

export function NextSEOFlowDiagram() {
  const t = useTranslations("blog");
  const container = useDiagramContainer();

  return (
    <BlogDiagramShell ref={container}>
      <svg
        viewBox="0 0 900 450"
        className="h-full w-full font-mono"
        aria-label={t("diagramSeoAriaLabel")}
      >
        <defs>
          <marker
            id="seo-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-blue)" />
          </marker>
        </defs>

        <Box
          x={52}
          y={196}
          width={230}
          title={t("diagramSeoGenerateMetadataServerComponent")}
          titleLines={["generateMetadata()", t("diagramSeoServerComponentLine")]}
          subtitle={t("diagramSeoServerSideInputs")}
          color="cyan"
        />
        <Box
          x={338}
          y={196}
          width={198}
          title={t("diagramSeoRenderedHtmlMetadata")}
          subtitle={t("diagramSeoTitleMetaOg")}
          color="blue"
        />
        <Box
          x={640}
          y={96}
          width={178}
          title={t("diagramSeoSearchEngineCrawler")}
          subtitle={t("diagramSeoIndexingBot")}
          color="purple"
        />
        <Box
          x={640}
          y={274}
          width={178}
          title={t("diagramSeoSocialCrawler")}
          subtitle={t("diagramSeoOgTags")}
          color="purple"
        />
        <Box
          x={570}
          y={374}
          width={280}
          title={t("diagramSeoIndexedResult")}
          color="cyan"
        />

        {[
          "M 282 225 L 338 225",
          "M 536 225 C 590 225, 598 125, 640 125",
          "M 536 225 C 594 236, 606 303, 640 303",
          "M 730 154 C 730 250, 698 316, 698 374",
          "M 730 332 C 730 348, 720 362, 712 374",
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
            markerEnd="url(#seo-arrow)"
          />
        ))}

        <text
          className="diagram-label"
          x="596"
          y="124"
          fill="var(--color-purple)"
          fontSize="9"
        >
          {t("diagramSeoCrawl")}
        </text>
        <text
          className="diagram-label"
          x="592"
          y="292"
          fill="var(--color-purple)"
          fontSize="9"
        >
          {t("diagramSeoReadOgTags")}
        </text>
      </svg>
    </BlogDiagramShell>
  );
}
