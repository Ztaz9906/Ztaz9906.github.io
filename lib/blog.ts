import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

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
  /** Raw MDX source — only present when fetched by slug */
  content?: string
}

// ---------------------------------------------------------------------------
// Internals
// ---------------------------------------------------------------------------

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

function slugFromFilename(filename: string): string {
  return filename.replace(/\.mdx$/, "")
}

function parsePost(filename: string, includeContent: boolean): BlogPost {
  const slug = slugFromFilename(filename)
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8")
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

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Returns all posts sorted by date descending, without MDX body. */
export function getAllPosts(): BlogPost[] {
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))

  return files
    .map((f) => parsePost(f, false))
    .sort(
      (a, b) =>
        new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime(),
    )
}

/** Returns a single post including the raw MDX content for rendering. */
export function getPostBySlug(slug: string): BlogPost | null {
  const filename = `${slug}.mdx`
  const filepath = path.join(BLOG_DIR, filename)
  if (!fs.existsSync(filepath)) return null
  return parsePost(filename, true)
}
