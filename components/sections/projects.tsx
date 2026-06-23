import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { getAllProjects, type Locale } from "@/lib/data/projects"
import { cn } from "@/lib/utils"

export async function Projects({ locale }: { locale: Locale }) {
  const t = await getTranslations("projects")
  const projects = getAllProjects(locale)
  return (
    <section
      id="projects"
      className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32"
    >
      <SectionHeading
        eyebrow="// 03"
        title={t("title")}
        description={t("description")}
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal
            key={project.slug}
            delay={(i % 2) * 80}
            className={cn(!project.featured && "sm:col-span-1")}
          >
            <Card
              className={cn(
                "group flex h-full flex-col p-6 transition-all duration-300 hover:border-blue/50 hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.5)]",
                project.featured && "sm:p-7",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3
                    className={cn(
                      "font-semibold tracking-tight",
                      project.featured ? "text-2xl" : "text-xl",
                    )}
                  >
                    {project.name}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-blue">
                    {project.oneLiner}
                  </p>
                </div>
                {project.metrics[0] && (
                  <Badge variant="blue" className="shrink-0 whitespace-nowrap">
                    {project.metrics[0].value}
                  </Badge>
                )}
              </div>

              <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
                {project.solution}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.stack.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>

              {project.hasCaseStudy && (
                <div className="mt-6 flex items-center gap-2 pt-1">
                  <Button asChild variant="outline" size="sm" className="flex-1">
                    <Link href={`/${locale}/projects/${project.slug}`}>
                      {t("ctaCaseStudy")}
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
