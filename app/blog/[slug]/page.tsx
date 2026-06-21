import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, Tag } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import fs from "fs";
import path from "path";

import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { blogDiagrams } from "@/components/diagrams/blog";
import { Badge } from "@/components/ui/badge";

// ---------------------------------------------------------------------------
// Static generation
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Enrique Ferreiro`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.dateISO,
      tags: post.tags,
    },
  };
}

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
};

const mdxComponents = {
  a: (props: any) => <a {...props} target="_blank" rel="noopener noreferrer" />,
  h2: (props: any) => {
    const isReferences = props.children === "References";
    return (
      <h2
        {...props}
        id={isReferences ? "references" : props.id}
        className={isReferences ? "references-heading" : ""}
      >
        {props.children}
      </h2>
    );
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || !post.content) notFound();

  const posts = getAllPosts();
  const postIndex = posts.findIndex((entry) => entry.slug === slug);
  const previousPost = postIndex > 0 ? posts[postIndex - 1] : null;
  const nextPost =
    postIndex >= 0 && postIndex < posts.length - 1 ? posts[postIndex + 1] : null;

  const coverImageExists = post.coverImage
    ? fs.existsSync(path.join(process.cwd(), "public", post.coverImage))
    : false;
  const BlogDiagram = blogDiagrams[slug];

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-4xl items-center px-4 sm:px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to Blog
          </Link>
        </div>
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

        <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>

        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>

        <div className="mt-8 h-px bg-border" />
      </header>

      {/* Cover Image / Fallback */}
      <div className="mx-auto max-w-4xl px-4 pb-12 sm:px-6">
        <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
          {BlogDiagram ? (
            <BlogDiagram />
          ) : coverImageExists && post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-card/60 p-8">
              <p className="font-mono text-xs text-muted-foreground">
                [ Cover Image pending — {post.coverImage || "no path provided"}{" "}
                ]
              </p>
            </div>
          )}
        </div>
      </div>

      {/* MDX body */}
      <article className="mdx-prose mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: mdxOptions.remarkPlugins,
              rehypePlugins: mdxOptions.rehypePlugins,
            },
          }}
        />
      </article>

      <nav
        aria-label="Blog post navigation"
        className="border-t border-border bg-card/30"
      >
        <div className="mx-auto flex max-w-4xl flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-6">
          {previousPost ? (
            <Link
              href={`/blog/${previousPost.slug}`}
              className="group flex w-full min-w-0 items-start gap-3 rounded-xl border border-border/60 bg-background/40 p-4 text-sm text-muted-foreground transition-colors hover:border-blue/40 hover:text-foreground md:max-w-[48%] md:border-transparent md:bg-transparent md:p-0"
            >
              <ArrowLeft className="mt-0.5 size-4 shrink-0 transition-transform group-hover:-translate-x-1" />
              <div className="min-w-0">
                <p className="font-mono text-xs text-muted-foreground">
                  Newer Post
                </p>
                <p className="text-pretty font-semibold text-foreground">
                  {previousPost.title}
                </p>
              </div>
            </Link>
          ) : (
            <div className="hidden md:block" />
          )}

          {nextPost ? (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="group flex w-full min-w-0 items-start justify-end gap-3 self-end rounded-xl border border-border/60 bg-background/40 p-4 text-right text-sm text-muted-foreground transition-colors hover:border-blue/40 hover:text-foreground md:max-w-[48%] md:border-transparent md:bg-transparent md:p-0"
            >
              <div className="min-w-0">
                <p className="font-mono text-xs text-muted-foreground">
                  Older Post
                </p>
                <p className="text-pretty font-semibold text-foreground">
                  {nextPost.title}
                </p>
              </div>
              <ArrowRight className="mt-0.5 size-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : (
            <div className="hidden md:block" />
          )}
        </div>
      </nav>
    </div>
  );
}
