import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Tag } from "lucide-react";

import { PROJECTS } from "@/lib/data/projects";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { ScreenshotsGallery } from "@/components/screenshots-gallery";

// Diagram stubs — will be replaced with GSAP ScrollTrigger implementations
import { DDDLayersDiagram } from "@/components/diagrams/DDDLayersDiagram";
import { CQRSDiagram } from "@/components/diagrams/CQRSDiagram";
import { EventDrivenDiagram } from "@/components/diagrams/EventDrivenDiagram";

export function generateStaticParams() {
  return PROJECTS.filter((p) => p.hasCaseStudy).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.name} Case Study | Enrique Ferreiro`,
    description: project.oneLiner,
    openGraph: {
      title: `${project.name} Case Study`,
      description: project.oneLiner,
      type: "article",
    },
  };
}

function ArchitectureDiagram({ stack }: { stack: string[] }) {
  const hasCQRS = stack.some((s) => s.toUpperCase().includes("CQRS"));
  const hasDDD = stack.some((s) => s.toUpperCase().includes("DDD"));
  const hasEventDriven = stack.some(
    (s) =>
      s.toUpperCase().includes("SSE") ||
      s.toUpperCase().includes("EVENT EMITTER"),
  );

  if (hasCQRS) return <CQRSDiagram />;
  if (hasEventDriven) return <EventDrivenDiagram />;
  if (hasDDD) return <DDDLayersDiagram />;
  return null;
}

function MetricsBand({
  metrics,
}: {
  metrics: { label: string; value: string }[];
}) {
  return (
    <section className="border-y border-border bg-card/30">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <dl
          className={`grid gap-8 ${
            metrics.length <= 2
              ? "grid-cols-2"
              : metrics.length === 3
                ? "grid-cols-3"
                : "grid-cols-2 sm:grid-cols-4"
          }`}
        >
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <dt className="mt-2 text-sm text-muted-foreground">{m.label}</dt>
              <dd className="font-mono text-4xl font-bold tabular-nums sm:text-5xl">
                <span className="text-gradient">{m.value}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function ContentSection({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <div className="mb-3 flex items-center gap-3">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
          {eyebrow}
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>
      <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {children}
    </Reveal>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);
  if (projectIndex === -1 || !PROJECTS[projectIndex]!.hasCaseStudy) notFound();

  const project = PROJECTS[projectIndex]!;

  // Find next/prev strictly among case studies
  const caseStudies = PROJECTS.filter((p) => p.hasCaseStudy);
  const caseIndex = caseStudies.findIndex((p) => p.slug === slug);
  const prevProject = caseStudies[caseIndex - 1] ?? null;
  const nextProject = caseStudies[caseIndex + 1] ?? null;

  const heroImage = project.screenshots[0];
  const galleryImages = project.screenshots.slice(1);

  return (
    <div className="min-h-screen bg-background">
      {/* ------------------------------------------------------------------ */}
      {/* Sticky Back Header                                                  */}
      {/* ------------------------------------------------------------------ */}
      <div className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to Projects
          </Link>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 1. Hero                                                             */}
      {/* ------------------------------------------------------------------ */}
      <header className="relative overflow-hidden">
        {/* Ambient glow — no-JS safe, pure CSS */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hero-mesh"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 grid-pattern opacity-40"
        />

        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
          <Reveal>
            {/* Date range */}
            <div className="mb-4 flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <Calendar className="size-3.5" />
              {project.dateRange}
            </div>

            {/* Title + oneLiner */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {project.name}
            </h1>
            <p className="mt-3 font-mono text-lg text-blue sm:text-xl">
              {project.oneLiner}
            </p>

            {/* Stack tags */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Tag className="size-3.5 text-muted-foreground" />
              {project.stack.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </Reveal>

          {/* Hero screenshot / placeholder */}
          <Reveal delay={120} className="mt-10">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/60">
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt={`${project.name} Hero`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-card/60 p-8">
                  <p className="font-mono text-xs text-muted-foreground">
                    [ Hero screenshot — not yet provided ]
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Main content                                                        */}
      {/* ------------------------------------------------------------------ */}
      <main className="mx-auto max-w-6xl space-y-20 px-4 py-20 sm:px-6">
        {/* 2. Problem */}
        <ContentSection eyebrow="// 01" title="The Problem">
          <p className="max-w-3xl text-pretty leading-relaxed text-muted-foreground">
            {project.problem}
          </p>
        </ContentSection>

        {/* 3. Architecture + diagram */}
        <ContentSection eyebrow="// 02" title="Architecture">
          <p className="max-w-3xl text-pretty leading-relaxed text-muted-foreground">
            {project.architecture}
          </p>
          <div className="mt-8">
            <ArchitectureDiagram stack={project.stack} />
          </div>
        </ContentSection>

        {/* 4. Solution */}
        <ContentSection eyebrow="// 03" title="Solution">
          <p className="max-w-3xl text-pretty leading-relaxed text-muted-foreground">
            {project.solution}
          </p>
        </ContentSection>

        {/* 5. Stack — expanded */}
        <Reveal>
          <div className="mb-3 flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
              // 04
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <h2 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.stack.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-border bg-card px-4 py-2 font-mono text-sm text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>
      </main>

      {/* ------------------------------------------------------------------ */}
      {/* 6. MetricsBand                                                      */}
      {/* ------------------------------------------------------------------ */}
      <MetricsBand metrics={project.metrics} />

      {/* ------------------------------------------------------------------ */}
      {/* 7. Lessons Learned (only if non-empty)                             */}
      {/* ------------------------------------------------------------------ */}
      {project.lessonsLearned.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <ContentSection eyebrow="// 05" title="Lessons Learned">
            <ul className="mt-2 space-y-4">
              {project.lessonsLearned.map((lesson, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-1 font-mono text-xs text-cyan">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-pretty leading-relaxed text-muted-foreground">
                    {lesson}
                  </p>
                </li>
              ))}
            </ul>
          </ContentSection>
        </section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 8. Screenshots gallery                                              */}
      {/* ------------------------------------------------------------------ */}
      {galleryImages.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 mt-4">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
                // {project.lessonsLearned.length > 0 ? "06" : "05"}
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <h2 className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">
              Screenshots
            </h2>
          </Reveal>
          <ScreenshotsGallery images={galleryImages} />
        </section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Next Case Study nav                                                 */}
      {/* ------------------------------------------------------------------ */}
      <nav
        aria-label="Case study navigation"
        className="border-t border-border bg-card/30"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-8 sm:px-6">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group flex items-center gap-3 text-sm transition-colors hover:text-foreground text-muted-foreground"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              <div>
                <p className="font-mono text-xs text-muted-foreground">
                  Previous
                </p>
                <p className="font-semibold text-foreground">
                  {prevProject.name}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex items-center gap-3 text-sm transition-colors hover:text-foreground text-muted-foreground text-right"
            >
              <div>
                <p className="font-mono text-xs text-muted-foreground">
                  Next Case Study
                </p>
                <p className="font-semibold text-foreground">
                  {nextProject.name}
                </p>
              </div>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </nav>
    </div>
  );
}
