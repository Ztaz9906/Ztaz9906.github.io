import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Locale = "en" | "es";

const tags = ["DDD", "CQRS", "Event-Driven", "Next.js", "TypeScript"];

const blogTitles: Record<Locale, Record<string, string>> = {
  en: {
    "ably-realtime": "Real Time Features with Ably in Next.js",
    "building-scalable-systems-with-ddd":
      "Building Scalable Systems with Domain-Driven Design",
    "cqrs-in-nextjs": "CQRS in Next.js with mediatr-ts",
    "seo-con-nextjs": "SEO with Next.js App Router",
    "stripe-webhooks": "Handling Stripe Webhooks Reliably",
    "supabase-rls": "Supabase Row Level Security in Practice",
  },
  es: {
    "ably-realtime": "Funciones en tiempo real con Ably en Next.js",
    "building-scalable-systems-with-ddd":
      "Construyendo sistemas escalables con Domain-Driven Design",
    "cqrs-in-nextjs": "CQRS en Next.js con mediatr-ts",
    "seo-con-nextjs": "SEO con Next.js App Router",
    "stripe-webhooks": "Manejando Stripe Webhooks de forma confiable",
    "supabase-rls": "Supabase Row Level Security en la práctica",
  },
};

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const title = blogTitles[locale]?.[slug] ?? titleFromSlug(slug);
  const subtitle = "Blog · Enrique Ferreiro";
  const titleSize = title.length > 58 ? 46 : 54;
  const portrait = await fetch( // SEO FIX
    new URL("../../../../public/portrait.png", import.meta.url), // SEO FIX
  ).then((r) => r.arrayBuffer()); // SEO FIX

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
            width: "700px",
          }}
        >
          <div
            style={{
              color: "#8b95a7",
              fontSize: 28,
              fontWeight: 500,
            }}
          >
            {subtitle}
          </div>

          <div
            style={{
              color: "#ffffff",
              fontSize: titleSize,
              fontWeight: 800,
              letterSpacing: 0,
              lineHeight: 1.08,
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
              marginTop: "54px",
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
