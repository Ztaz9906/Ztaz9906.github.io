import { ImageResponse } from "next/og";

import { PROJECTS } from "@/lib/data/projects";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const tags = ["DDD", "CQRS", "Event-Driven", "Next.js", "TypeScript"];

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((entry) => entry.slug === slug);
  const title = project?.name ?? titleFromSlug(slug);
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
  const portrait = await fetch(`${baseUrl}/portrait.png`).then((r) =>
    r.arrayBuffer(),
  );

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#0f1117",
          color: "white",
          display: "flex",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            width: "680px",
          }}
        >
          <div
            style={{
              color: "#8b95a7",
              fontSize: 28,
              fontWeight: 500,
            }}
          >
            Projects · Enrique Ferreiro
          </div>

          <div
            style={{
              color: "#ffffff",
              fontSize: 64,
              fontWeight: 800,
              letterSpacing: 0,
              lineHeight: 1.05,
            }}
          >
            {title}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  background: "#1d4ed8",
                  border: "1px solid #60a5fa",
                  borderRadius: 999,
                  color: "#dbeafe",
                  fontSize: 24,
                  fontWeight: 700,
                  padding: "10px 18px",
                }}
              >
                {tag}
              </div>
            ))}
          </div>

          <div
            style={{
              color: "#8b95a7",
              fontSize: 22,
              marginTop: "80px",
            }}
          >
            ztaz9906-github-io.vercel.app
          </div>
        </div>

        <div
          style={{
            alignItems: "center",
            border: "5px solid rgba(96, 165, 250, 0.55)",
            borderRadius: "50%",
            display: "flex",
            height: 330,
            justifyContent: "center",
            overflow: "hidden",
            width: 330,
          }}
        >
          <img
            alt="Enrique Ferreiro"
            height="330"
            src={portrait as unknown as string}
            style={{ objectFit: "cover" }}
            width="330"
          />
        </div>
      </div>
    ),
    size,
  );
}
