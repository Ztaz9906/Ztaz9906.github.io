import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock, Tag } from "lucide-react"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypePrettyCode from "rehype-pretty-code"

import { getAllPosts, getPostBySlug } from "@/lib/blog"
import { Badge } from "@/components/ui/badge"

// ---------------------------------------------------------------------------
// Static generation
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title: `${post.title} — Enrique Ferreiro`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.dateISO,
      tags: post.tags,
    },
  }
}

// ---------------------------------------------------------------------------
// MDX options
// ---------------------------------------------------------------------------

const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    [
      rehypePrettyCode,
      {
        // Dark theme that matches the site's #030712 background
        theme: "github-dark-dimmed",
        keepBackground: false, // let CSS control the bg via .mdx-prose
        defaultLang: "plaintext",
      },
    ] as [typeof rehypePrettyCode, Parameters<typeof rehypePrettyCode>[0]],
  ],
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post || !post.content) notFound()

  return (
    <div className="min-h-screen bg-background">
      {/* Back link */}
      <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Back to Blog
        </Link>
      </div>

      {/* Article header */}
      <header className="mx-auto max-w-3xl px-4 pb-10 pt-10 sm:px-6">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <time
            dateTime={post.dateISO}
            className="font-mono text-xs text-muted-foreground"
          >
            {post.date}
          </time>
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

        <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>

        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>

        <div className="mt-8 h-px bg-border" />
      </header>

      {/* MDX body */}
      <article className="mdx-prose mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: mdxOptions.remarkPlugins,
              rehypePlugins: mdxOptions.rehypePlugins,
            },
          }}
        />
      </article>
    </div>
  )
}
