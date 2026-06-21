import Image from "next/image"
import { Boxes, Layout, Radio, Server } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { CAPABILITIES } from "@/lib/data"

const ICONS = {
  layout: Layout,
  server: Server,
  boxes: Boxes,
  radio: Radio,
} as const

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeading eyebrow="// 01" title="Who am I?" />

      <div className="mt-12 grid gap-10 lg:grid-cols-[280px_1fr] lg:items-center lg:gap-16">
        <Reveal className="mx-auto lg:mx-0">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-full bg-gradient-brand opacity-20 blur-2xl"
            />
            <div className="relative size-56 overflow-hidden rounded-full border border-border bg-card sm:size-64">
              <Image
                src="/portrait.png"
                alt="Portrait of Enrique Ferreiro"
                fill
                sizes="256px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <p className="text-balance text-2xl font-medium leading-snug sm:text-3xl">
            26 years old. Software Engineer.
          </p>
          <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Specialized in scalable applications and modern architectures
            turning complex domains into clean, event-driven systems that
            perform under real-world load.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {CAPABILITIES.map((cap, i) => {
          const Icon = ICONS[cap.icon]
          return (
            <Reveal key={cap.title} delay={i * 80}>
              <Card className="group h-full p-5 transition-all duration-300 hover:border-blue/50 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.5)]">
                <div className="mb-4 inline-flex size-10 items-center justify-center rounded-lg border border-border bg-background text-blue transition-colors group-hover:border-blue/50">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-base font-semibold">{cap.title}</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {cap.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </Card>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
