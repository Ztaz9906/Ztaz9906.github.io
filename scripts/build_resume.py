#!/usr/bin/env python3
"""
ATS-safe resume generator.

Design constraints (these are the reason this script exists instead of
print-to-PDF from a browser):

  * Base-14 PDF fonts (Helvetica family) -- guaranteed present in every
    PDF viewer and parseable by every ATS. The previous resume was produced
    by headless Chrome, which embedded Type3 fonts with synthetic glyph
    names (g0, g1, ...). Type3 is the single most fragile font type for
    resume parsers.
  * Single column, no tables, no text frames, no images, no headers/footers.
    Parsers read a linear text stream; anything else risks scrambled order.
  * Real link annotations for the portfolio and GitHub URLs.
  * Complete document metadata (title/author/subject/keywords).
  * Plain hyphens in date ranges -- date extractors are tuned for "-",
    not for en/em dashes.

Usage:
    python scripts/build_resume.py
    python scripts/build_resume.py --out public/resume.pdf
"""

import argparse

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    HRFlowable,
    PageTemplate,
    Paragraph,
    Spacer,
)

# ---------------------------------------------------------------------------
# Personal configuration -- edit these, then re-run the script.
# ---------------------------------------------------------------------------

NAME = "Enrique Ferreiro Avila"
HEADLINE = "Full Stack & AI Engineer"
CITIZENSHIP = "Spanish Citizen (EU) - Full EU work authorization, no sponsorship required"
AVAILABILITY = "Relocating to Spain - available to start within 2-4 weeks"
LOCATION = "Currently in Havana, Cuba"
EMAIL = "ztazhorde@gmail.com"
PHONE = "+53 5656 2172"
PORTFOLIO = "ztaz9906.github.io"
GITHUB = "github.com/Ztaz9906"

# Leave as "" to omit the line entirely. Never ship a placeholder.
LINKEDIN = "linkedin.com/in/enriquefa"
ENGLISH_LEVEL = "B1 Intermediate - technical reading and written communication"

# ---------------------------------------------------------------------------
# Layout
# ---------------------------------------------------------------------------

PAGE_W, PAGE_H = LETTER
MARGIN_X = 0.6 * inch
MARGIN_Y = 0.45 * inch

INK = HexColor("#000000")
MUTED = HexColor("#333333")
LINK = HexColor("#1a4d8f")

BODY_SIZE = 8.8
LEADING = 10.9

styles = {
    "name": ParagraphStyle(
        "name",
        fontName="Helvetica-Bold",
        fontSize=17,
        leading=20,
        textColor=INK,
        alignment=TA_LEFT,
        spaceAfter=2,
    ),
    "headline": ParagraphStyle(
        "headline",
        fontName="Helvetica",
        fontSize=10.5,
        leading=13,
        textColor=MUTED,
        spaceAfter=3,
    ),
    "contact": ParagraphStyle(
        "contact",
        fontName="Helvetica",
        fontSize=9,
        leading=12,
        textColor=MUTED,
    ),
    "section": ParagraphStyle(
        "section",
        fontName="Helvetica-Bold",
        fontSize=10.5,
        leading=13,
        textColor=INK,
        spaceBefore=7.5,
        spaceAfter=1,
    ),
    "summary": ParagraphStyle(
        "summary",
        fontName="Helvetica",
        fontSize=BODY_SIZE,
        leading=LEADING,
        textColor=INK,
        spaceAfter=1,
    ),
    "jobtitle": ParagraphStyle(
        "jobtitle",
        fontName="Helvetica-Bold",
        fontSize=9.8,
        leading=12.2,
        textColor=INK,
        spaceBefore=4,
    ),
    "jobmeta": ParagraphStyle(
        "jobmeta",
        fontName="Helvetica-Oblique",
        fontSize=8.6,
        leading=11,
        textColor=MUTED,
        spaceAfter=2.5,
    ),
    "bullet": ParagraphStyle(
        "bullet",
        fontName="Helvetica",
        fontSize=BODY_SIZE,
        leading=LEADING,
        textColor=INK,
        leftIndent=10,
        bulletIndent=0,
        spaceAfter=1.2,
    ),
    "skill": ParagraphStyle(
        "skill",
        fontName="Helvetica",
        fontSize=BODY_SIZE,
        leading=LEADING,
        textColor=INK,
        leftIndent=52,
        firstLineIndent=-52,
        spaceAfter=4.2,
    ),
}

# ---------------------------------------------------------------------------
# Content
# ---------------------------------------------------------------------------

SUMMARY = (
    "Full Stack & AI Engineer with 3+ years building production web platforms in TypeScript on Node.js, "
    "NestJS, React and Next.js, now building LLM-powered systems. "
    "Designed a dual-engine AI architecture (LLM extraction + deterministic validation) with a prompt "
    "evaluation framework for data-driven iteration, provider-agnostic adapters (OpenAI, Claude, Nemotron), "
    "and AI agent versioning. "
    "Specialized in DDD, CQRS and hexagonal architecture at scale. Experienced in real-time systems "
    "(WebSockets, SSE, Ably), Stripe payments, RBAC, PostgreSQL with Prisma, and CI/CD with Docker on AWS."
)

SKILLS = [
    ("Languages", "TypeScript, JavaScript, Python, SQL, HTML5, CSS3"),
    (
        "Frontend",
        "React, Next.js (App Router), Vite, Astro, Redux Toolkit, Zustand, TanStack Query, "
        "TanStack Table, React Hook Form, Formik, Zod, Yup, Tailwind CSS, shadcn/ui, Radix UI, "
        "Chakra UI, MUI",
    ),
    (
        "Backend",
        "Node.js, NestJS, Django, Django REST Framework, Odoo 17/19, GraphQL, REST APIs, "
        "JSON-RPC, OWL/QWeb",
    ),
    (
        "Architecture",
        "Domain-Driven Design, Clean Architecture, Hexagonal Architecture, CQRS, Dependency "
        "Injection (Inversify, Brandi, tsyringe), Repository Pattern, SOLID, Event-Driven Architecture",
    ),
    (
        "Databases",
        "PostgreSQL, Prisma, Drizzle ORM, TypeORM, Django ORM, Elasticsearch, Redis",
    ),
    (
        "Real-Time and Messaging",
        "WebSockets, Server-Sent Events, Ably, Stream Chat, Firebase Cloud Messaging, BullMQ",
    ),
    (
        "Cloud and DevOps",
        "AWS (S3, SES, SNS, ECR), Docker, Jenkins, GitHub Actions, Vercel, SonarQube, Semgrep, "
        "Gitleaks, MinIO",
    ),
    (
        "Auth and Payments",
        "Stripe, Supabase Auth, NextAuth, Firebase Auth, Google OAuth, JWT, TOTP/OTP, LDAP, CASL",
    ),
    (
        "AI / LLM",
        "OpenAI API, Claude API, Prompt Engineering, LLM Evaluation Frameworks, AI Agent Design, "
        "Provider-Agnostic Adapters, Retrieval Pipelines",
    ),
    ("Testing", "Jest, Supertest, React Testing Library"),
    ("Practices", "Agile/Scrum, Code Review, Git, GitHub Flow, CI/CD"),
]

EXPERIENCE = [
    {
        "title": "AI / Full Stack Engineer",
        "company": "Nara (Personal Project)",
        "dates": "August 2026 - Present",
        "location": "Solo Developer",
        "bullets": [
            "Designed and built an LLM-powered WhatsApp business platform from scratch: 704 commits, "
            "NestJS backend, PostgreSQL with Drizzle, 974 source files and 501 test files, full Docker "
            "and GitHub Actions CI/CD.",
            "Architected a dual-engine system where an OpenAI-compatible LLM adapter extracts structured "
            "fields from free-text messages, while a deterministic rules engine validates and acts on them "
            "based on confidence scores.",
            "Built a prompt evaluation framework (eval-ai-agent) that runs candidate prompts against real "
            "production traffic and compares them to the published version for data-driven prompt iteration.",
            "Implemented provider-agnostic LLM integration supporting NVIDIA Nemotron, OpenAI and Claude "
            "with per-attempt timeouts, retry budgets, and reasoning content parsing for chain-of-thought models.",
            "Designed AI agent profiles with versioning and sealed credential management per integration.",
        ],
    },
    {
        "title": "Full Stack Engineer",
        "company": "JUUZ",
        "dates": "July 2024 - Present",
        "location": "Remote",
        "bullets": [
            "Frontend lead on a freight logistics platform, owning the Next.js 14 codebase end to end "
            "(748 of 899 commits) and structuring it in use-case, repository and service layers with "
            "Brandi dependency injection across 58 routes.",
            "Built real-time order tracking by combining Ably channels with a custom Server-Sent Events "
            "dispatcher layer for payment, notification and company events, backed by a NestJS WebSocket gateway.",
            "Implemented Bill of Lading and invoice PDF generation with react-pdf, delivered through "
            "tokenized public routes for external carrier access.",
            "Contributed to a NestJS backend organized as 15 hexagonal modules over 97 Prisma models, covering "
            "Stripe payments, JWT and TOTP/HOTP authentication, Firebase push notifications, and geospatial "
            "distance calculation.",
            "Delivered a carrier-shipper negotiation and bidding module; maintained Jest test suites across "
            "backend and frontend, deployed via Jenkins pipelines to Docker images on AWS ECR.",
        ],
    },
    {
        "title": "Full Stack Developer",
        "company": "Universidad de las Ciencias Informáticas (UCI)",
        "dates": "September 2025 - Present",
        "location": "Dirección de Informatización, Havana, Cuba",
        "bullets": [
            "Owned the frontend of SIGA, the institutional dining management system, as top contributor "
            "(346 of 568 commits), across 102 routes in Next.js 16 and React 19.",
            "Architected the frontend as hexagonal layers across 9 bounded contexts: domain entities and "
            "repository interfaces, application use cases, and infrastructure implementations wired through "
            "a Brandi dependency injection container.",
            "Built a reusable component system that standardized the UI across modules, including a generic "
            "DataTable with pagination, sorting, column toggling and a mobile variant, generic CRUD "
            "scaffolding, six chart wrappers, and RBAC route and UI guard components.",
            "Contributed 88 commits to a Django 5.2 / DRF backend of 131 models, 429 serializers and 155 "
            "viewsets exposing 163 routes, including JWT and LDAP authentication, request-level audit "
            "middleware, Elasticsearch synchronization, and PDF and Excel report generation.",
        ],
    },
    {
        "title": "Full Stack Developer",
        "company": "Pyxel Solutions",
        "dates": "March 2025 - Present",
        "location": "Remote",
        "bullets": [
            "Second-highest contributor of 12 developers on AA Impact, a garage-door manufacturing and "
            "quoting platform on Odoo 19 (344 of 1,096 commits), delivering 6 custom addons over "
            "43 models and 256 fields.",
            "Built a configurable product pricing engine supporting mathematical expressions, conditional "
            "rules, fixed values and evaluated Python formulas, driving automated quote generation.",
            "Implemented MRP component substitution that automatically swaps raw materials during "
            "manufacturing order assignment when stock is short, plus landed cost computed as a percentage "
            "of linked purchase orders.",
            "Developed US county-level tax localization with dealer exemption handling, and an OWL/QWeb "
            "customer portal exposing 13 JSON-RPC endpoints, 7 QWeb PDF reports, and dealer self-signup "
            "that auto-creates CRM leads.",
            "Delivered Charge2Go (July 2025 - February 2026), a React 18 / Vite / TypeScript admin platform "
            "for EV charging stations: 112 components, a GraphQL layer of 16 queries and 7 "
            "mutations with code generation, 25 use-case classes behind Brandi DI, a booking calendar with "
            "overlap detection, Google Maps marker clustering, and Chart.js revenue analytics.",
            "Shipped POS and accounting extensions across 6 addons on a 50-addon Odoo 17 retail platform "
            "maintained by ~20 developers: an OWL employee-discount component patching "
            "core POS order and payment models with sales-tax compensation math, a Shopify payment-gateway "
            "propagation module, and intercompany stock-return reversal logic covered by 319 lines of "
            "automated tests.",
        ],
    },
    {
        "title": "Full Stack Engineer (Contract)",
        "company": "ABALink",
        "dates": "November 2025 - June 2026",
        "location": "Remote",
        "bullets": [
            "Second-largest contributor (460 of 1,329 commits) on a Next.js 15 / React 19 platform of "
            "~157,000 lines, the largest codebase I have worked in.",
            "Implemented a full DDD and CQRS architecture using mediatr-ts: 127 command handlers and 99 query "
            "handlers over an Inversify container, with cross-cutting pipeline behaviors for caching, "
            "authorization and performance monitoring.",
            "Modeled 63 Prisma entities across 14 schema files and enforced fine-grained authorization with "
            "CASL ability definitions applied as a mediator pipeline behavior.",
            "Integrated Stripe subscriptions, Supabase authentication, Stream Chat messaging, Sanity CMS and "
            "a Serwist PWA layer; shipped through GitHub Actions running SonarQube analysis, Semgrep SAST "
            "and Gitleaks secret scanning.",
        ],
    },
    {
        "title": "Full Stack Developer (Contract)",
        "company": "El Chuletazo",
        "dates": "July 2024 - January 2025",
        "location": "Remote",
        "bullets": [
            "Built an e-commerce platform (React 18 / Django REST Framework) with Stripe checkout, "
            "Google OAuth, JWT auth, and a multi-step checkout flow with admin panel.",
        ],
    },
    {
        "title": "Full Stack Developer (Contract)",
        "company": "Orfi Gallery",
        "dates": "May 2024 - July 2024",
        "location": "Remote",
        "bullets": [
            "Built an inventory management system in Next.js 14 with DDD, tsyringe DI, 12 Prisma entities "
            "for stock movement tracking, RBAC, and MinIO image storage on Docker Compose.",
        ],
    },
    {
        "title": "Frontend Developer (Contract)",
        "company": "Video Forms",
        "dates": "August 2023 - December 2023",
        "location": "Remote",
        "bullets": [
            "Built a video marketing platform on Next.js and Firebase with real-time lead capture, "
            "automated email notifications, and multi-tenant state management.",
        ],
    },
]

EDUCATION = {
    "school": "Universidad de las Ciencias Informáticas (UCI)",
    "location": "Havana, Cuba",
    "degree": "Engineer's Degree in Computer Science (Ingeniero en Ciencias Informáticas)",
    "year": "2023",
    "thesis": (
        "Thesis: SIGA, an institutional dining management system built with Django REST Framework and "
        "Next.js, later continued and deployed in production at the university's IT Directorate."
    ),
}


# ---------------------------------------------------------------------------
# Rendering
# ---------------------------------------------------------------------------


def link(url_text, href=None):
    href = href or f"https://{url_text}"
    return f'<link href="{href}"><font color="#1a4d8f">{url_text}</font></link>'


def section(title):
    return [
        Paragraph(title, styles["section"]),
        HRFlowable(
            width="100%", thickness=0.7, color=INK, spaceBefore=0.5, spaceAfter=4
        ),
    ]


def build_story():
    story = []

    # --- Header -----------------------------------------------------------
    story.append(Paragraph(NAME.upper(), styles["name"]))
    story.append(Paragraph(HEADLINE, styles["headline"]))

    story.append(Paragraph(f"<b>{CITIZENSHIP}</b>", styles["contact"]))
    story.append(Paragraph(AVAILABILITY, styles["contact"]))
    story.append(
        Paragraph(
            f"{LOCATION} &nbsp;|&nbsp; {EMAIL} &nbsp;|&nbsp; {PHONE} (WhatsApp)",
            styles["contact"],
        )
    )

    parts = [link(PORTFOLIO), link(GITHUB)]
    if LINKEDIN:
        parts.append(link(LINKEDIN))
    story.append(Paragraph(" &nbsp;|&nbsp; ".join(parts), styles["contact"]))

    # --- Summary ----------------------------------------------------------
    story += section("SUMMARY")
    story.append(Paragraph(SUMMARY, styles["summary"]))

    # --- Skills -----------------------------------------------------------
    story += section("TECHNICAL SKILLS")
    for label, items in SKILLS:
        story.append(Paragraph(f"<b>{label}:</b> {items}", styles["skill"]))

    # --- Experience -------------------------------------------------------
    story += section("PROFESSIONAL EXPERIENCE")
    for job in EXPERIENCE:
        story.append(
            Paragraph(f"{job['title']}, {job['company']}", styles["jobtitle"])
        )
        story.append(
            Paragraph(f"{job['dates']} | {job['location']}", styles["jobmeta"])
        )
        for b in job["bullets"]:
            story.append(Paragraph(b, styles["bullet"], bulletText="•"))

    # --- Education --------------------------------------------------------
    story += section("EDUCATION")
    story.append(
        Paragraph(
            f"<b>{EDUCATION['school']}</b> - {EDUCATION['location']}", styles["summary"]
        )
    )
    story.append(
        Paragraph(f"{EDUCATION['degree']}, {EDUCATION['year']}", styles["summary"])
    )
    story.append(Paragraph(EDUCATION["thesis"], styles["summary"]))

    # --- Languages --------------------------------------------------------
    story += section("LANGUAGES")
    langs = "Spanish (Native)"
    if ENGLISH_LEVEL:
        langs += f" | English ({ENGLISH_LEVEL})"
    story.append(Paragraph(langs, styles["summary"]))

    return story


def set_metadata(canvas, doc):
    canvas.setTitle(f"{NAME} - Software Engineer")
    canvas.setAuthor(NAME)
    canvas.setSubject("Software Engineer / Full Stack Developer Resume")
    keywords = []
    for _, items in SKILLS:
        keywords.extend(i.strip() for i in items.split(","))
    canvas.setKeywords(", ".join(dict.fromkeys(keywords)))
    canvas.setCreator("build_resume.py (ReportLab)")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default="public/resume.pdf")
    args = ap.parse_args()

    doc = BaseDocTemplate(
        args.out,
        pagesize=LETTER,
        leftMargin=MARGIN_X,
        rightMargin=MARGIN_X,
        topMargin=MARGIN_Y,
        bottomMargin=MARGIN_Y,
        title=f"{NAME} - Software Engineer",
        author=NAME,
        subject="Software Engineer / Full Stack Developer Resume",
    )

    frame = Frame(
        doc.leftMargin,
        doc.bottomMargin,
        doc.width,
        doc.height,
        leftPadding=0,
        rightPadding=0,
        topPadding=0,
        bottomPadding=0,
        id="body",
    )
    doc.addPageTemplates(
        [PageTemplate(id="resume", frames=[frame], onPage=set_metadata)]
    )
    doc.build(build_story())
    print(f"wrote {args.out}")


if __name__ == "__main__":
    main()
