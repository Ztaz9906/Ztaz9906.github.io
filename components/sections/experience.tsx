import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { EXPERIENCE } from "@/lib/data"

export function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32"
    >
      <SectionHeading
        eyebrow="// 02"
        title="Experience"
        description="A timeline of where I've built, scaled, and shipped."
      />

      <div className="relative mt-14 pl-8 sm:pl-10">
        <div
          aria-hidden
          className="absolute left-[7px] top-1.5 bottom-1.5 w-px bg-border sm:left-[11px]"
        />
        <ol className="space-y-8">
          {EXPERIENCE.map((item, i) => (
            <li key={item.company} className="relative">
              <span
                aria-hidden
                className="absolute -left-8 top-1.5 inline-flex size-4 items-center justify-center rounded-full border border-border bg-background sm:-left-10"
              >
                <span className="size-2 rounded-full bg-gradient-brand" />
              </span>
              <Reveal delay={i * 80}>
                <Card className="group p-6 transition-all duration-300 hover:border-blue/50 hover:shadow-[0_0_30px_-12px_rgba(59,130,246,0.5)]">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-balance text-lg font-semibold">
                      {item.company}
                    </h3>
                    <span className="font-mono text-xs text-muted-foreground">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-xs text-blue">
                    {item.location}
                  </p>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-foreground/90">
                    {item.summary}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {item.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-2.5 text-pretty text-sm leading-relaxed text-muted-foreground"
                      >
                        <span
                          aria-hidden
                          className="mt-2 size-1.5 shrink-0 rounded-full bg-gradient-brand"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                </Card>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
