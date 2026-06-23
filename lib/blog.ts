import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"

export type Locale = "en" | "es"

export interface BlogPost {
  slug: string
  title: string
  date: string
  /** ISO date string for sorting */
  dateISO: string
  excerpt: string
  tags: string[]
  coverImage: string
  readingTime: string
  /** Raw MDX source â€” only present when fetched by slug */
  content?: string
}

function getBlogDir(locale: Locale) {
  return path.join(process.cwd(), "content", "blog", locale)
}

function slugFromFilename(filename: string): string {
  return filename.replace(/\.mdx$/, "")
}

function parsePost(locale: Locale, filename: string, includeContent: boolean): BlogPost {
  const slug = slugFromFilename(filename)
  const raw = fs.readFileSync(path.join(getBlogDir(locale), filename), "utf8")
  const { data, content } = matter(raw)

  const title = (data.title as string) ?? slug
  const date = (data.date as string) ?? ""
  const excerpt = (data.excerpt as string) ?? ""
  const tags: string[] = Array.isArray(data.tags) ? (data.tags as string[]) : []
  const coverImage = (data.coverImage as string) ?? ""
  const { text: rt } = readingTime(content)

  return {
    slug,
    title,
    date: new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    dateISO: date,
    excerpt,
    tags,
    coverImage,
    readingTime: rt,
    ...(includeContent ? { content } : {}),
  }
}

/** Returns all posts sorted by date descending, without MDX body. */
export function getAllPosts(locale: Locale): BlogPost[] {
  const files = fs
    .readdirSync(getBlogDir(locale))
    .filter((f) => f.endsWith(".mdx"))

  return files
    .map((f) => parsePost(locale, f, false))
    .sort(
      (a, b) =>
        new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime(),
    )
}

export function getAllPostSlugs(locale: Locale): string[] {
  return fs
    .readdirSync(getBlogDir(locale))
    .filter((f) => f.endsWith(".mdx"))
    .map(slugFromFilename)
}

/** Returns a single post including the raw MDX content for rendering. */
export function getPostBySlug(slug: string, locale: Locale): BlogPost | null {
  const filename = `${slug}.mdx`
  const localizedFilepath = path.join(getBlogDir(locale), filename)

  if (fs.existsSync(localizedFilepath)) {
    return parsePost(locale, filename, true)
  }

  const fallbackFilepath = path.join(getBlogDir("en"), filename)
  if (!fs.existsSync(fallbackFilepath)) return null

  return parsePost("en", filename, true)
}
