export type Locale = 'en' | 'es'

export interface ProjectMetric {
  label: string
  value: string
}

export interface ProjectTranslation {
  oneLiner: string
  problem: string
  architecture: string
  solution: string
  lessonsLearned: string[]
}

export interface Project {
  slug: string
  name: string
  translations: Record<Locale, ProjectTranslation>
  stack: string[]
  metrics: ProjectMetric[]
  screenshots: string[]
  featured: boolean
  dateRange: string
  hasCaseStudy: boolean
}

export const PROJECTS: Project[] = [
  {
    slug: "juuz",
    name: "JUUZ",
    translations: {
      en: {
        oneLiner: "Real-time towing service platform",
        problem:
          "A towing service needed real-time visibility into driver location and a transparent way for customers to negotiate price, while supporting concurrent usage at scale.",
        architecture:
          "Event-driven architecture using SSE and Event Emitters to push live location/status updates without polling, built on Next.js with Ably for realtime pub/sub and Mapbox for live map rendering.",
        solution:
          "Live driver tracking, a bidding system for price negotiation, multi-language support, and push notifications.",
        lessonsLearned: [],
      },
      es: {
        oneLiner: "Plataforma de grúas en tiempo real",
        problem:
          "Un servicio de grúas necesitaba visibilidad en tiempo real de la ubicación de los conductores y una forma transparente para que los clientes negociaran el precio, manteniendo soporte para uso concurrente a escala.",
        architecture:
          "Arquitectura event-driven con SSE y Event Emitters para enviar actualizaciones en vivo de ubicación y estado sin polling, construida sobre Next.js con Ably para pub/sub en tiempo real y Mapbox para el renderizado del mapa en vivo.",
        solution:
          "Seguimiento en vivo de conductores, un sistema de pujas para negociar precios, soporte multiidioma y notificaciones push.",
        lessonsLearned: [],
      },
    },
    stack: ["Next.js", "Ably", "Mapbox", "SSE", "Event Emitters"],
    metrics: [
      { label: "Concurrent users", value: "1,000+" },
      { label: "Faster notification delivery", value: "~50%" },
      { label: "Increase in engagement", value: "~30%" },
      { label: "Increase in retention", value: "~25%" },
    ],
    screenshots: [
      "/projects/juuz/1.png",
      "/projects/juuz/2.png",
      "/projects/juuz/3.png",
      "/projects/juuz/4.png",
      "/projects/juuz/5.png",
      "/projects/juuz/6.png",
    ],
    featured: true,
    dateRange: "Sep 2024 - Jan 2026",
    hasCaseStudy: true,
  },
  {
    slug: "abalink",
    name: "ABALink",
    translations: {
      en: {
        oneLiner: "Enterprise system with DDD + CQRS",
        problem:
          "Enterprise-level admin operations needed to scale and stay maintainable as complexity grew, with strict consistency requirements across administrative modules.",
        architecture:
          "DDD and CQRS to separate command and query responsibilities and isolate domain logic from infrastructure, on Next.js 15 App Router with SSE for real-time sync.",
        solution:
          "Modular CRUD components, dynamic PDF generation (react-pdf), automated Jest tests and CI/CD via Vercel.",
        lessonsLearned: [],
      },
      es: {
        oneLiner: "Sistema enterprise con DDD + CQRS",
        problem:
          "Las operaciones administrativas de nivel enterprise necesitaban escalar y seguir siendo mantenibles a medida que aumentaba la complejidad, con requisitos estrictos de consistencia entre módulos administrativos.",
        architecture:
          "DDD y CQRS para separar responsabilidades de comandos y consultas, y aislar la lógica de dominio de la infraestructura, sobre Next.js 15 App Router con SSE para sincronización en tiempo real.",
        solution:
          "Componentes CRUD modulares, generación dinámica de PDFs con react-pdf, pruebas automatizadas con Jest y CI/CD sobre Vercel.",
        lessonsLearned: [],
      },
    },
    stack: ["Next.js 15", "DDD", "CQRS", "SSE", "react-pdf", "Jest", "CI/CD"],
    metrics: [
      { label: "Consistency across modules", value: "99.9%" },
      { label: "Internal productivity", value: "+30%" },
    ],
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
    dateRange: "Nov 2025 - Mar 2026",
    hasCaseStudy: true,
  },
  {
    slug: "charge2go",
    name: "Charge2Go",
    translations: {
      en: {
        oneLiner: "EV charging station management",
        problem:
          "Managing EV charging station reservations for many concurrent users while avoiding double-bookings and keeping the UI responsive under load.",
        architecture:
          "DDD with dependency injection (Brandi) to reduce coupling, event-driven patterns for complex state flows, GraphQL with caching for efficient data fetching.",
        solution: "Real-time reservation system with a reservation calendar UI.",
        lessonsLearned: [],
      },
      es: {
        oneLiner: "Gestión de estaciones de carga para EV",
        problem:
          "Gestionar reservas de estaciones de carga para EV con muchos usuarios concurrentes, evitando dobles reservas y manteniendo la UI responsiva bajo carga.",
        architecture:
          "DDD con dependency injection mediante Brandi para reducir acoplamiento, patrones event-driven para flujos de estado complejos y GraphQL con caching para un acceso eficiente a los datos.",
        solution:
          "Sistema de reservas en tiempo real con una UI de calendario para gestionar disponibilidad.",
        lessonsLearned: [],
      },
    },
    stack: ["GraphQL", "DDD", "Brandi (DI)"],
    metrics: [
      { label: "Active users", value: "500+" },
      { label: "Faster API responses", value: "~40%" },
      { label: "Less coupling", value: "~30%" },
      { label: "Faster booking flow", value: "~35%" },
    ],
    screenshots: [
      "/projects/charge2go/1.png",
      "/projects/charge2go/2.png",
      "/projects/charge2go/3.png",
      "/projects/charge2go/4.png",
    ],
    featured: true,
    dateRange: "Jan 2025 - Mar 2025",
    hasCaseStudy: true,
  },
  {
    slug: "el-chuletazo",
    name: "El Chuletazo",
    translations: {
      en: {
        oneLiner: "Full e-commerce platform",
        problem:
          "Needed a reliable end-to-end checkout flow for 1,000+ products without a high transaction failure rate, plus simple onboarding.",
        architecture:
          "SOLID and Clean Architecture to decouple layers and isolate payment and auth concerns.",
        solution: "Stripe checkout integration and Google OAuth login.",
        lessonsLearned: [],
      },
      es: {
        oneLiner: "Plataforma Full e-commerce",
        problem:
          "Se necesitaba un flujo de checkout end-to-end confiable para 1,000+ productos, con una baja tasa de fallos en transacciones y un onboarding simple.",
        architecture:
          "SOLID y Clean Architecture para desacoplar capas y aislar las responsabilidades de pagos y autenticación.",
        solution: "Integración de checkout con Stripe y login con Google OAuth.",
        lessonsLearned: [],
      },
    },
    stack: ["React", "Django", "Stripe", "Google OAuth"],
    metrics: [
      { label: "Products supported", value: "1,000+" },
      { label: "Failed transactions", value: "-20%" },
      { label: "Onboarding steps", value: "-40%" },
      { label: "Faster feature delivery", value: "+25%" },
    ],
    screenshots: [
      "/projects/elchuletazo/1.png",
      "/projects/elchuletazo/2.png",
      "/projects/elchuletazo/3.png",
    ],
    featured: true,
    dateRange: "Aug 2024 - Jan 2025",
    hasCaseStudy: true,
  },
  {
    slug: "orfi-gallery",
    name: "Orfi Gallery",
    translations: {
      en: {
        oneLiner: "Inventory management system",
        problem: "Manual inventory tracking couldn't keep up with 1,000+ stock items.",
        architecture:
          "DDD practices enforced for data integrity, Prisma for type-safe database access.",
        solution: "Automated, real-time inventory analytics dashboards.",
        lessonsLearned: [],
      },
      es: {
        oneLiner: "Sistema de gestión de inventario",
        problem:
          "El seguimiento manual del inventario no podía sostener el ritmo de 1,000+ artículos en stock.",
        architecture:
          "Prácticas de DDD para reforzar la integridad de los datos y Prisma para acceso type-safe a base de datos.",
        solution: "Dashboards automatizados de analítica de inventario en tiempo real.",
        lessonsLearned: [],
      },
    },
    stack: ["Next.js", "PostgreSQL", "Prisma"],
    metrics: [
      { label: "Stock items tracked", value: "1,000+" },
      { label: "Less manual reporting time", value: "50%" },
      { label: "Data integrity", value: "99.9%" },
    ],
    screenshots: [],
    featured: false,
    dateRange: "Aug 2023 - Dec 2023",
    hasCaseStudy: false,
  },
  {
    slug: "video-forms",
    name: "Video Forms",
    translations: {
      en: {
        oneLiner: "Video marketing platform",
        problem: "Lead capture from video content was slow and not real-time.",
        architecture:
          "Component-based, scalable state management on a multi-tenant architecture built with Next.js and Firebase.",
        solution: "Real-time lead capture with automated email notifications.",
        lessonsLearned: [],
      },
      es: {
        oneLiner: "Plataforma de video marketing",
        problem:
          "La captura de leads desde contenido en video era lenta y no ocurría en tiempo real.",
        architecture:
          "Gestión de estado escalable basada en componentes, sobre una arquitectura multi-tenant construida con Next.js y Firebase.",
        solution:
          "Captura de leads en tiempo real con notificaciones automatizadas por email.",
        lessonsLearned: [],
      },
    },
    stack: ["Next.js", "Firebase"],
    metrics: [
      { label: "Increase in lead conversion", value: "35%" },
      { label: "Faster response time", value: "~70%" },
    ],
    screenshots: [],
    featured: false,
    dateRange: "Jan 2023 - May 2023",
    hasCaseStudy: false,
  },
]

export function getProject(slug: string, locale: Locale) {
  const project = PROJECTS.find((p) => p.slug === slug)
  if (!project) return null
  return { ...project, ...project.translations[locale] }
}

export function getAllProjects(locale: Locale) {
  return PROJECTS.map((p) => ({ ...p, ...p.translations[locale] }))
}
