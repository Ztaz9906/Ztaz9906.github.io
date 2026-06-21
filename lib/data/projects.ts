export interface ProjectMetric {
  label: string
  value: string
}

export interface Project {
  slug: string
  name: string
  /** Short tagline shown on the homepage card */
  oneLiner: string
  /** First-person problem statement */
  problem: string
  /** Architecture overview */
  architecture: string
  /** Solution summary */
  solution: string
  stack: string[]
  metrics: ProjectMetric[]
  /** Personal reflections — fill these in yourself */
  lessonsLearned: string[]
  /** Array of absolute paths (e.g. /projects/juuz/1.png) for screenshots */
  screenshots: string[]
  featured: boolean
  dateRange: string
  /** Whether this project has a full case study page to render */
  hasCaseStudy: boolean
}

export const PROJECTS: Project[] = [
  {
    slug: "juuz",
    name: "JUUZ",
    oneLiner: "Real-time towing service platform",
    problem:
      "A towing service needed real-time visibility into driver location and a transparent way for customers to negotiate price, while supporting concurrent usage at scale.",
    architecture:
      "Event-driven architecture using SSE and Event Emitters to push live location/status updates without polling, built on Next.js with Ably for realtime pub/sub and Mapbox for live map rendering.",
    solution:
      "Live driver tracking, a bidding system for price negotiation, multi-language support, and push notifications.",
    stack: ["Next.js", "Ably", "Mapbox", "SSE", "Event Emitters"],
    metrics: [
      { label: "Concurrent users", value: "1,000+" },
      { label: "Faster notification delivery", value: "~50%" },
      { label: "Increase in engagement", value: "~30%" },
      { label: "Increase in retention", value: "~25%" },
    ],
    // TODO: Add personal lessons learned
    lessonsLearned: [],
    screenshots: [
      "/projects/juuz/1.png",
      "/projects/juuz/2.png",
      "/projects/juuz/3.png",
      "/projects/juuz/4.png",
      "/projects/juuz/5.png",
      "/projects/juuz/6.png",
    ],
    featured: true,
    dateRange: "Sep 2024 — Jan 2026",
    hasCaseStudy: true,
  },
  {
    slug: "abalink",
    name: "ABALink",
    oneLiner: "Enterprise system with DDD + CQRS",
    problem:
      "Enterprise-level admin operations needed to scale and stay maintainable as complexity grew, with strict consistency requirements across administrative modules.",
    architecture:
      "DDD and CQRS to separate command and query responsibilities and isolate domain logic from infrastructure, on Next.js 15 App Router with SSE for real-time sync.",
    solution:
      "Modular CRUD components, dynamic PDF generation (react-pdf), automated Jest tests and CI/CD via Vercel.",
    stack: ["Next.js 15", "DDD", "CQRS", "SSE", "react-pdf", "Jest", "CI/CD"],
    metrics: [
      { label: "Consistency across modules", value: "99.9%" },
      { label: "Internal productivity", value: "+30%" },
    ],
    // TODO: Add personal lessons learned
    lessonsLearned: [],
    screenshots: [
      "/projects/abalink/1.png",
      "/projects/abalink/2.png",
      "/projects/abalink/3.png",
      "/projects/abalink/4.png",
      "/projects/abalink/5.png",
      "/projects/abalink/6.png",
      "/projects/abalink/7.png",
      "/projects/abalink/8.png",
      "/projects/abalink/9.png",
    ],
    featured: true,
    dateRange: "Nov 2025 — Mar 2026",
    hasCaseStudy: true,
  },
  {
    slug: "charge2go",
    name: "Charge2Go",
    oneLiner: "EV charging station management",
    problem:
      "Managing EV charging station reservations for many concurrent users while avoiding double-bookings and keeping the UI responsive under load.",
    architecture:
      "DDD with dependency injection (Brandi) to reduce coupling, event-driven patterns for complex state flows, GraphQL with caching for efficient data fetching.",
    solution: "Real-time reservation system with a reservation calendar UI.",
    stack: ["GraphQL", "DDD", "Brandi (DI)"],
    metrics: [
      { label: "Active users", value: "500+" },
      { label: "Faster API responses", value: "~40%" },
      { label: "Less coupling", value: "~30%" },
      { label: "Faster booking flow", value: "~35%" },
    ],
    // TODO: Add personal lessons learned
    lessonsLearned: [],
    screenshots: [
      "/projects/charge2go/1.png",
      "/projects/charge2go/2.png",
      "/projects/charge2go/3.png",
      "/projects/charge2go/4.png",
    ],
    featured: true,
    dateRange: "Jan 2025 — Mar 2025",
    hasCaseStudy: true,
  },
  {
    slug: "el-chuletazo",
    name: "El Chuletazo",
    oneLiner: "Full e-commerce platform",
    problem:
      "Needed a reliable end-to-end checkout flow for 1,000+ products without a high transaction failure rate, plus simple onboarding.",
    architecture:
      "SOLID and Clean Architecture to decouple layers and isolate payment and auth concerns.",
    solution: "Stripe checkout integration and Google OAuth login.",
    stack: ["React", "Django", "Stripe", "Google OAuth"],
    metrics: [
      { label: "Products supported", value: "1,000+" },
      { label: "Failed transactions", value: "-20%" },
      { label: "Onboarding steps", value: "-40%" },
      { label: "Faster feature delivery", value: "+25%" },
    ],
    // TODO: Add personal lessons learned
    lessonsLearned: [],
    screenshots: [
      "/projects/elchuletazo/1.png",
      "/projects/elchuletazo/2.png",
      "/projects/elchuletazo/3.png",
    ],
    featured: true,
    dateRange: "Aug 2024 — Jan 2025",
    hasCaseStudy: true,
  },
  {
    slug: "orfi-gallery",
    name: "Orfi Gallery",
    oneLiner: "Inventory management system",
    problem: "Manual inventory tracking couldn't keep up with 1,000+ stock items.",
    architecture:
      "DDD practices enforced for data integrity, Prisma for type-safe database access.",
    solution: "Automated, real-time inventory analytics dashboards.",
    stack: ["Next.js", "PostgreSQL", "Prisma"],
    metrics: [
      { label: "Stock items tracked", value: "1,000+" },
      { label: "Less manual reporting time", value: "50%" },
      { label: "Data integrity", value: "99.9%" },
    ],
    // TODO: Add personal lessons learned
    lessonsLearned: [],
    screenshots: [],
    featured: false,
    dateRange: "Aug 2023 — Dec 2023",
    hasCaseStudy: false,
  },
  {
    slug: "video-forms",
    name: "Video Forms",
    oneLiner: "Video marketing platform",
    problem: "Lead capture from video content was slow and not real-time.",
    architecture:
      "Component-based, scalable state management on a multi-tenant architecture built with Next.js and Firebase.",
    solution: "Real-time lead capture with automated email notifications.",
    stack: ["Next.js", "Firebase"],
    metrics: [
      { label: "Increase in lead conversion", value: "35%" },
      { label: "Faster response time", value: "~70%" },
    ],
    // TODO: Add personal lessons learned
    lessonsLearned: [],
    screenshots: [],
    featured: false,
    dateRange: "Jan 2023 — May 2023",
    hasCaseStudy: false,
  },
]
