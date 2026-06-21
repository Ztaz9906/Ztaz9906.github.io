import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock, Tag } from "lucide-react";

import { getAllPosts } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Blog | Enrique Ferreiro",
  description:
    "Articles on software architecture, DDD, CQRS, real-time systems, and modern web development with Next.js and TypeScript.",
  openGraph: {
    title: "Blog | Enrique Ferreiro",
    description:
      "Articles on software architecture, DDD, CQRS, real-time systems, and modern web development.",
    type: "website",
  },
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function BlogListingPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-background">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 hero-mesh opacity-40"
      />

      <main className="relative mx-auto max-w-4xl px-4 pb-24 pt-20 sm:px-6 sm:pt-28">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            Back to Home
          </Link>
        </div>

        <SectionHeading
          eyebrow="// Writing"
          title="Blog"
          description="Deep dives into architecture patterns, real-time systems, and the engineering decisions behind the projects I ship."
        />

        {posts.length === 0 ? (
          <p className="mt-16 text-center text-muted-foreground">
            No posts yet — check back soon.
          </p>
        ) : (
          <ol className="mt-12 space-y-5" aria-label="Blog posts">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <Card className="flex flex-col gap-3 p-6 transition-all duration-300 hover:border-blue/50 hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.5)] sm:p-7">
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="text-pretty text-xl font-semibold tracking-tight transition-colors group-hover:text-blue sm:text-2xl">
                        {post.title}
                      </h2>
                      <ArrowUpRight className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue" />
                    </div>

                    {/* Excerpt */}
                    <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>

                    {/* Footer meta */}
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <span className="font-mono text-xs text-muted-foreground">
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
                        <Clock className="size-3" />
                        {post.readingTime}
                      </span>
                      {post.tags.length > 0 && (
                        <span className="flex items-center gap-1.5">
                          <Tag className="size-3 text-muted-foreground" />
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="cyan">
                              {tag}
                            </Badge>
                          ))}
                        </span>
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
