import { ArrowUpRight, Github } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { PROJECTS } from "@/lib/data"
import { cn } from "@/lib/utils"

export function Projects() {
  return (
    <section
      id="projects"
      className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32"
    >
      <SectionHeading
        eyebrow="// 03"
        title="Selected Projects"
        description="Products and platforms I've designed and engineered end to end."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {PROJECTS.map((project, i) => (
          <Reveal
            key={project.name}
            delay={(i % 2) * 80}
            className={cn(project.featured ? "sm:col-span-1" : "sm:col-span-1")}
          >
            <Card
              className={cn(
                "group flex h-full flex-col p-6 transition-all duration-300 hover:border-blue/50 hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.5)]",
                project.featured && "sm:p-7",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3
                    className={cn(
                      "font-semibold tracking-tight",
                      project.featured ? "text-2xl" : "text-xl",
                    )}
                  >
                    {project.name}
                  </h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                </div>
                <Badge variant="blue" className="shrink-0 whitespace-nowrap">
                  {project.metric}
                </Badge>
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 pt-1">
                <Button variant="outline" size="sm" className="flex-1">
                  Case Study
                  <ArrowUpRight className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label={`${project.name} GitHub repository`}
                >
                  <Github className="size-4" />
                  GitHub
                </Button>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
