import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock, Tag } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { getAllPosts, type Locale } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { SubpageHeader } from "@/components/subpage-header";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  return {
    title: t("listingTitle"),
    description: t("listingDescription"),
    openGraph: {
      title: t("listingTitle"),
      description: t("listingDescription"),
      type: "website",
    },
  };
}

export default async function BlogListingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = getAllPosts(locale);

  return (
    <div className="min-h-screen bg-background">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 hero-mesh opacity-40"
      />

      <SubpageHeader
        locale={locale}
        backHref={`/${locale}`}
        backLabel={t("listingBackToHome")}
        maxWidthClassName="max-w-4xl"
      />

      <main className="relative mx-auto max-w-4xl px-4 pb-24 pt-20 sm:px-6 sm:pt-28">
        <SectionHeading
          eyebrow={t("listingEyebrow")}
          title={t("listingTitle")}
          description={t("listingDescription")}
        />

        {posts.length === 0 ? (
          <p className="mt-16 text-center text-muted-foreground">
            {t("listingEmpty")}
          </p>
        ) : (
          <ol className="mt-12 space-y-5" aria-label={t("listingAriaPosts")}>
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/${locale}/blog/${post.slug}`} className="group block">
                  <Card className="flex flex-col gap-3 p-6 transition-all duration-300 hover:border-blue/50 hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.5)] sm:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="text-pretty text-xl font-semibold tracking-tight transition-colors group-hover:text-blue sm:text-2xl">
                        {post.title}
                      </h2>
                      <ArrowUpRight className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue" />
                    </div>

                    <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <span className="font-mono text-xs text-muted-foreground">
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
                        <Clock className="size-3" />
                        {post.readingTime}
                      </span>
                      {post.tags.length > 0 && (
                        <div className="basis-full pt-1 sm:basis-auto sm:pt-0">
                          <div className="flex flex-wrap items-start gap-1.5">
                            <Tag className="mt-1 size-3 shrink-0 text-muted-foreground" />
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="cyan" className="max-w-full">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </main>
    </div>
  );
}
