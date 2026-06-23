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
import { getTranslations } from "next-intl/server";

import { getAllPostSlugs, getAllPosts, getPostBySlug, type Locale } from "@/lib/blog";
import { blogDiagrams } from "@/components/diagrams/blog";
import { Badge } from "@/components/ui/badge";
import { SubpageHeader } from "@/components/subpage-header";
import { ViewCounterSlot } from "@/components/ViewCounterSlot";

export function generateStaticParams() {
  const locales = ["en", "es"] as const
  return locales.flatMap((locale) =>
    getAllPostSlugs(locale).map((slug) => ({ locale, slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      languages: {
        en: `/en/blog/${slug}`,
        es: `/es/blog/${slug}`,
      },
    },
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
        theme: "github-dark-dimmed",
        keepBackground: false,
        defaultLang: "plaintext",
      },
    ] as [typeof rehypePrettyCode, Parameters<typeof rehypePrettyCode>[0]],
  ],
};

const mdxComponents = {
  a: (props: any) => <a {...props} target="_blank" rel="noopener noreferrer" />,
  h2: (props: any) => {
    const isReferences =
      props.children === "References" || props.children === "Referencias";
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

async function BlogPostContent({
  post,
  previousPost,
  nextPost,
  coverImageExists,
  BlogDiagram,
  locale,
}: {
  post: NonNullable<ReturnType<typeof getPostBySlug>> & { content: string };
  previousPost: ReturnType<typeof getAllPosts>[number] | null;
  nextPost: ReturnType<typeof getAllPosts>[number] | null;
  coverImageExists: boolean;
  BlogDiagram: (typeof blogDiagrams)[string] | undefined;
  locale: Locale;
}) {
  const t = await getTranslations("blog");
  const coverImagePath = post.coverImage ?? "";

  return (
    <div className="min-h-screen bg-background">
      <SubpageHeader
        locale={locale}
        backHref={`/${locale}/blog`}
        backLabel={t("postBackToBlog")}
        maxWidthClassName="max-w-4xl"
      />

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
          <ViewCounterSlot page={post.slug} />
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

      <div className="mx-auto max-w-4xl px-4 pb-12 sm:px-6">
        <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
          {BlogDiagram ? (
            <BlogDiagram />
          ) : coverImageExists && post.coverImage ? (
            <Image
              src={coverImagePath}
              alt={t("postCoverImageAlt", { title: post.title })}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-card/60 p-8">
              <p className="font-mono text-xs text-muted-foreground">
                {t("postCoverImagePending", {
                  path: coverImagePath,
                })}
              </p>
            </div>
          )}
        </div>
      </div>

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
        aria-label={t("postNavAria")}
        className="border-t border-border bg-card/30"
      >
        <div className="mx-auto flex max-w-4xl flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-6">
          {previousPost ? (
            <Link
              href={`/${locale}/blog/${previousPost.slug}`}
              className="group flex w-full min-w-0 items-start gap-3 rounded-xl border border-border/60 bg-background/40 p-4 text-sm text-muted-foreground transition-colors hover:border-blue/40 hover:text-foreground md:max-w-[48%] md:border-transparent md:bg-transparent md:p-0"
            >
              <ArrowLeft className="mt-0.5 size-4 shrink-0 transition-transform group-hover:-translate-x-1" />
              <div className="min-w-0">
                <p className="font-mono text-xs text-muted-foreground">
                  {t("postNavNewer")}
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
              href={`/${locale}/blog/${nextPost.slug}`}
              className="group flex w-full min-w-0 items-start justify-end gap-3 self-end rounded-xl border border-border/60 bg-background/40 p-4 text-right text-sm text-muted-foreground transition-colors hover:border-blue/40 hover:text-foreground md:max-w-[48%] md:border-transparent md:bg-transparent md:p-0"
            >
              <div className="min-w-0">
                <p className="font-mono text-xs text-muted-foreground">
                  {t("postNavOlder")}
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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);
  if (!post || !post.content) notFound();

  const posts = getAllPosts(locale);
  const postIndex = posts.findIndex((entry) => entry.slug === slug);
  const previousPost = postIndex > 0 ? posts[postIndex - 1] : null;
  const nextPost =
    postIndex >= 0 && postIndex < posts.length - 1 ? posts[postIndex + 1] : null;

  const coverImageExists = post.coverImage
    ? fs.existsSync(path.join(process.cwd(), "public", post.coverImage))
    : false;
  const BlogDiagram = blogDiagrams[slug];

  return (
    <BlogPostContent
      post={{ ...post, content: post.content }}
      previousPost={previousPost}
      nextPost={nextPost}
      coverImageExists={coverImageExists}
      BlogDiagram={BlogDiagram}
      locale={locale}
    />
  );
}
