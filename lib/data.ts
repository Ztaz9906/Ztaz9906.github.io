export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
]

export const SOCIALS = {
  github: "https://github.com/Ztaz9906",
  linkedin: "https://www.linkedin.com/",
  email: "enrique@example.com",
  resume: "/resume.pdf",
}

export const CAPABILITIES = [
  {
    title: "Frontend",
    icon: "layout",
    tags: ["React", "Next.js", "Tailwind"],
  },
  {
    title: "Backend",
    icon: "server",
    tags: ["Node.js", "Django", "Supabase"],
  },
  {
    title: "Architecture",
    icon: "boxes",
    tags: ["DDD", "CQRS", "SOLID", "Clean Architecture"],
  },
  {
    title: "Realtime",
    icon: "radio",
    tags: ["Ably", "SSE", "Mapbox"],
  },
] as const

export const EXPERIENCE = [
  {
    company: "JUUZ",
    role: "Software Engineer",
    period: "2024 — Present",
    summary:
      "Building event-driven services and realtime experiences for a high-traffic platform.",
    tags: ["Next.js", "TypeScript", "Event-Driven", "Ably"],
  },
  {
    company: "Freelance / Contract",
    role: "Full-Stack Engineer",
    period: "2023 — 2024",
    summary:
      "Delivered scalable web applications applying DDD and CQRS for several clients.",
    tags: ["Django", "Supabase", "DDD", "CQRS"],
  },
  {
    company: "Early Career",
    role: "Software Developer",
    period: "2021 — 2023",
    summary:
      "Shipped production features across the stack and established clean architecture foundations.",
    tags: ["Python", "React", "PostgreSQL", "SOLID"],
  },
]

export const PROJECTS = [
  {
    name: "JUUZ",
    description: "Realtime delivery & logistics platform with live tracking.",
    tags: ["Next.js", "Ably", "Mapbox", "Supabase"],
    metric: "1000+ concurrent users",
    featured: true,
  },
  {
    name: "ABALink",
    description: "Connectivity platform bridging providers and clients.",
    tags: ["TypeScript", "Node.js", "PostgreSQL"],
    metric: "Event-Driven core",
    featured: true,
  },
  {
    name: "Charge2Go",
    description: "On-demand charging service with payments integration.",
    tags: ["Next.js", "Stripe", "Supabase"],
    metric: "Stripe payments",
    featured: true,
  },
  {
    name: "El Chuletazo",
    description: "Ordering & fulfillment system for a food business.",
    tags: ["React", "Django", "PostgreSQL"],
    metric: "Full ordering flow",
    featured: true,
  },
  {
    name: "Orfi Gallery",
    description: "Curated media gallery with optimized delivery.",
    tags: ["Next.js", "Vercel Blob"],
    metric: "Optimized media",
    featured: false,
  },
  {
    name: "Video Forms",
    description: "Form builder with video responses and SSE updates.",
    tags: ["Next.js", "SSE", "TypeScript"],
    metric: "Realtime SSE",
    featured: false,
  },
]

export const SKILLS = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "shadcn/ui"],
  },
  {
    category: "Architecture",
    items: ["DDD", "CQRS", "Event-Driven", "SOLID", "Clean Architecture"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Django", "REST", "GraphQL"],
  },
  {
    category: "Services & Payments",
    items: ["Stripe", "Ably", "SSE", "Mapbox"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "Supabase", "Redis"],
  },
  {
    category: "Tools",
    items: ["Git", "Docker", "Vercel", "Vitest"],
  },
]

export const STATS = [
  { value: 4, suffix: "+", label: "years experience" },
  { value: 7, suffix: "+", label: "projects shipped" },
  { value: 15, suffix: "+", label: "technologies" },
  { value: 1000, suffix: "+", label: "concurrent users supported" },
]
