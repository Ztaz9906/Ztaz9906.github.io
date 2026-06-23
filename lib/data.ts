import type { Locale } from "@/lib/data/projects";

export const PROFILE = {
  name: "Enrique Ferreiro",
  role: "Software Engineer",
} as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "/blog" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const SOCIALS = {
  github: "https://github.com/Ztaz9906",
  linkedin: "https://www.linkedin.com/in/enriquefa/",
  email: "ztazhorde@gmail.com",
  resume: "/resume.pdf",
};

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
] as const;

export const EXPERIENCE = [
  {
    company: "XABAL SIGA Power Management System",
    location: "UCI, Cuba",
    period: "Jun 2022 - Dec 2022",
    summary:
      "Designed a configuration module for a food management system used by 100+ users.",
    bullets: [
      "Reduced code duplication by ~30% with modular, reusable components.",
      "Improved data reliability (~25% fewer processing errors) with robust validation.",
      "Built real-time power consumption dashboards, cutting decision-making time by ~20%.",
    ],
    tags: ["Django", "PostgreSQL", "REST APIs"],
  },
  {
    company: "Video Forms",
    location: "Remote",
    period: "Jan 2023 - May 2023",
    summary:
      "Built a video marketing platform with real-time lead capture and automated email notifications.",
    bullets: [
      "Drove a 35% increase in lead conversion with real-time capture and notifications.",
      "Cut lead-generation latency from ~2.8s to under 800ms (~70% faster) on a multi-tenant architecture.",
      "Reduced feature development time ~40% with a component-based, scalable state architecture.",
    ],
    tags: ["Next.js", "Firebase"],
  },
  {
    company: "Orfi Gallery",
    location: "Remote",
    period: "Aug 2023 - Dec 2023",
    summary:
      "Engineered an automated inventory management system with real-time analytics for 1,000+ stock items.",
    bullets: [
      "Built data-driven dashboards with Prisma, cutting manual reporting time by 50%.",
      "Enforced DDD practices, ensuring 99.9% data integrity during peak load.",
    ],
    tags: ["Next.js", "PostgreSQL", "Prisma", "DDD"],
  },
  {
    company: "El Chuletazo",
    location: "Remote",
    period: "Aug 2024 - Jan 2025",
    summary:
      "Built a full e-commerce platform supporting 1,000+ products and concurrent users with end-to-end checkout.",
    bullets: [
      "Integrated Stripe payments, cutting failed transactions by ~20%.",
      "Added Google OAuth, reducing onboarding steps by 40%.",
      "Applied SOLID and Clean Architecture to decouple layers, accelerating feature delivery by ~25%.",
    ],
    tags: ["React", "Django", "Stripe", "Google OAuth", "Clean Architecture"],
  },
  {
    company: "JUUZ Company",
    location: "Remote",
    period: "Sep 2024 - Jan 2026",
    summary:
      "Designed and launched a real-time towing service platform supporting 1,000+ concurrent users with live driver tracking.",
    bullets: [
      "Improved notification speed by ~50% with an event-driven architecture (SSE + Event Emitters).",
      "Built a bidding system that increased user engagement by ~30%.",
      "Added multi-language support and push notifications, increasing retention by ~25%.",
    ],
    tags: ["Next.js", "Ably", "Mapbox", "SSE", "Event-Driven"],
  },
  {
    company: "Charge2Go",
    location: "Remote",
    period: "Jan 2025 - Mar 2025",
    summary:
      "Built a web app for managing EV charging stations supporting 500+ users with real-time reservations.",
    bullets: [
      "Cut API response time ~40% by optimizing GraphQL queries and caching.",
      "Architected with DDD and dependency injection (Brandi), reducing code coupling ~30%.",
      "Designed a reservation calendar that cut booking time by ~35%.",
    ],
    tags: ["GraphQL", "DDD", "Dependency Injection"],
  },
  {
    company: "ABALink",
    location: "Remote",
    period: "Nov 2025 - Mar 2026",
    summary:
      "Architected a high-performance enterprise system using DDD and CQRS for scalability and maintainability.",
    bullets: [
      "Built server-rendered interfaces with Next.js 15 App Router, improving SEO and load times.",
      "Integrated SSE for real-time data and robust auth, ensuring 99.9% consistency.",
      "Streamlined internal productivity by 30% with modular CRUD and dynamic PDF generation.",
      "Added automated Jest testing and CI/CD via Vercel.",
    ],
    tags: ["Next.js 15", "DDD", "CQRS", "SSE", "Jest", "CI/CD"],
  },
];

export function getProfile(locale: Locale) {
  return {
    name: PROFILE.name,
    role: locale === "es" ? "Ingeniero de software" : PROFILE.role,
  }
}

export function getCapabilityTitles(locale: Locale) {
  return locale === "es"
    ? ["frontend", "backend", "arquitectura", "tiempo real"]
    : CAPABILITIES.map((capability) => capability.title.toLowerCase())
}

export function getExperience(locale: Locale) {
  if (locale === "es") {
    return [
      {
        company: "XABAL SIGA Power Management System",
        location: "UCI, Cuba",
        period: "Jun 2022 - Dec 2022",
        summary:
          "Diseñé un módulo de configuración para un sistema de gestión alimentaria usado por más de 100 usuarios.",
        bullets: [
          "Reduje la duplicación de código en ~30% con componentes modulares y reutilizables.",
          "Mejoré la confiabilidad de los datos (~25% menos errores de procesamiento) con validaciones robustas.",
          "Construí dashboards de consumo eléctrico en tiempo real, reduciendo el tiempo de toma de decisiones en ~20%.",
        ],
        tags: ["Django", "PostgreSQL", "REST APIs"],
      },
      {
        company: "Video Forms",
        location: "Remoto",
        period: "Jan 2023 - May 2023",
        summary:
          "Construí una plataforma de video marketing con captura de leads en tiempo real y notificaciones automáticas por email.",
        bullets: [
          "Impulsé un aumento del 35% en la conversión de leads con captura y notificaciones en tiempo real.",
          "Reduje la latencia de generación de leads de ~2.8s a menos de 800ms (~70% más rápido) sobre una arquitectura multi-tenant.",
          "Disminuí el tiempo de desarrollo de nuevas funcionalidades en ~40% con una arquitectura de estado escalable basada en componentes.",
        ],
        tags: ["Next.js", "Firebase"],
      },
      {
        company: "Orfi Gallery",
        location: "Remoto",
        period: "Aug 2023 - Dec 2023",
        summary:
          "Desarrollé un sistema automatizado de gestión de inventario con analítica en tiempo real para más de 1,000 artículos en stock.",
        bullets: [
          "Construí dashboards guiados por datos con Prisma, reduciendo el tiempo de reportes manuales en 50%.",
          "Apliqué prácticas de DDD, garantizando 99.9% de integridad de datos durante picos de carga.",
        ],
        tags: ["Next.js", "PostgreSQL", "Prisma", "DDD"],
      },
      {
        company: "El Chuletazo",
        location: "Remoto",
        period: "Aug 2024 - Jan 2025",
        summary:
          "Construí una plataforma completa de e-commerce con soporte para más de 1,000 productos y usuarios concurrentes, incluyendo checkout end-to-end.",
        bullets: [
          "Integré pagos con Stripe, reduciendo los fallos de transacción en ~20%.",
          "Añadí Google OAuth, reduciendo los pasos de onboarding en 40%.",
          "Apliqué SOLID y Clean Architecture para desacoplar capas, acelerando la entrega de funcionalidades en ~25%.",
        ],
        tags: ["React", "Django", "Stripe", "Google OAuth", "Clean Architecture"],
      },
      {
        company: "JUUZ Company",
        location: "Remoto",
        period: "Sep 2024 - Jan 2026",
        summary:
          "Diseñé y lancé una plataforma de grúas en tiempo real con soporte para más de 1,000 usuarios concurrentes y seguimiento en vivo de conductores.",
        bullets: [
          "Mejoré la velocidad de notificaciones en ~50% con una arquitectura event-driven (SSE + Event Emitters).",
          "Construí un sistema de pujas que aumentó el engagement de usuarios en ~30%.",
          "Añadí soporte multiidioma y notificaciones push, incrementando la retención en ~25%.",
        ],
        tags: ["Next.js", "Ably", "Mapbox", "SSE", "Event-Driven"],
      },
      {
        company: "Charge2Go",
        location: "Remoto",
        period: "Jan 2025 - Mar 2025",
        summary:
          "Construí una app web para gestionar estaciones de carga para EV con soporte para más de 500 usuarios y reservas en tiempo real.",
        bullets: [
          "Reduje el tiempo de respuesta de la API en ~40% optimizando queries GraphQL y caching.",
          "Arquitecté con DDD y dependency injection (Brandi), reduciendo el acoplamiento del código en ~30%.",
          "Diseñé un calendario de reservas que redujo el tiempo de booking en ~35%.",
        ],
        tags: ["GraphQL", "DDD", "Dependency Injection"],
      },
      {
        company: "ABALink",
        location: "Remoto",
        period: "Nov 2025 - Mar 2026",
        summary:
          "Arquitecté un sistema enterprise de alto rendimiento usando DDD y CQRS para escalar sin perder mantenibilidad.",
        bullets: [
          "Construí interfaces server-rendered con Next.js 15 App Router, mejorando SEO y tiempos de carga.",
          "Integré SSE para datos en tiempo real y auth robusta, asegurando 99.9% de consistencia.",
          "Aumenté la productividad interna en 30% con CRUD modular y generación dinámica de PDF.",
          "Añadí testing automatizado con Jest y CI/CD sobre Vercel.",
        ],
        tags: ["Next.js 15", "DDD", "CQRS", "SSE", "Jest", "CI/CD"],
      },
    ]
  }

  return EXPERIENCE
}

export type {
  Locale,
  Project,
  ProjectMetric,
  ProjectTranslation,
} from "@/lib/data/projects";
export { getAllProjects, getProject } from "@/lib/data/projects";

export const SKILLS = [
  {
    category: "Languages",
    items: ["JavaScript", "TypeScript", "Python"],
  },
  {
    category: "Frontend",
    items: [
      "React",
      "Next.js",
      "Astro",
      "Redux Toolkit",
      "Tailwind CSS",
      "shadcn/ui",
      "Radix UI",
    ],
  },
  {
    category: "Architecture",
    items: ["SOLID", "DDD", "Clean Architecture", "Event-Driven (SSE)", "CQRS"],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "Django",
      "Supabase",
      "Firebase",
      "GraphQL",
      "REST APIs",
    ],
  },
  {
    category: "Services & Payments",
    items: [
      "Stripe",
      "Supabase Auth",
      "Google OAuth",
      "Ably Realtime",
      "Mapbox",
    ],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "Prisma", "TypeORM", "Drizzle ORM"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "CI/CD", "Jest", "Docker"],
  },
];

export const STATS = [
  { value: 4, suffix: "+", label: "years experience" },
  { value: 7, suffix: "+", label: "projects shipped" },
  { value: 15, suffix: "+", label: "technologies" },
  { value: 1000, suffix: "+", label: "concurrent users supported" },
];
