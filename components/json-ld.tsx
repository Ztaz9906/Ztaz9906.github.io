const BASE_URL = "https://ztaz9906-github-io.vercel.app";

function JsonLd({ schema }: { schema: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Enrique Ferreiro",
    url: BASE_URL,
    jobTitle: "Software Engineer",
    sameAs: [
      "https://github.com/Ztaz9906",
      "https://linkedin.com/in/enriquefa",
    ],
  };

  return <JsonLd schema={schema} />;
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Enrique Ferreiro",
    url: BASE_URL,
  };

  return <JsonLd schema={schema} />;
}

export function BlogPostingSchema({
  title,
  description,
  datePublished,
  dateModified,
  slug,
  locale,
  coverImage,
}: {
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  slug: string;
  locale: string;
  coverImage?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url: `${BASE_URL}/${locale}/blog/${slug}`,
    author: { "@type": "Person", name: "Enrique Ferreiro" },
    datePublished,
    dateModified,
    image: coverImage ?? `${BASE_URL}/og/home.png`,
  };

  return <JsonLd schema={schema} />;
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLd schema={schema} />;
}
