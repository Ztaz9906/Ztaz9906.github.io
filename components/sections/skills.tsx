import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { SKILLS } from "@/lib/data"

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeading
        eyebrow="// 04"
        title="Skills & Tooling"
        description="The technologies I reach for to build reliable, scalable systems."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map((group, i) => (
          <Reveal key={group.category} delay={(i % 3) * 80}>
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    tabIndex={0}
                    className="cursor-default rounded-lg border border-border bg-background px-3 py-1.5 font-mono text-xs text-foreground/80 transition-all duration-200 hover:border-transparent hover:bg-blue/10 hover:text-foreground hover:shadow-[0_0_18px_-6px_rgba(59,130,246,0.7)] focus-visible:border-blue focus-visible:outline-none"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
