"use client"

import * as React from "react"
import { Download, Github, Linkedin, Mail, Send } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { SOCIALS } from "@/lib/data"

const CONTACT_LINKS = [
  { icon: Mail, label: "Email", value: SOCIALS.email, href: `mailto:${SOCIALS.email}` },
  { icon: Linkedin, label: "LinkedIn", value: "Connect with me", href: SOCIALS.linkedin },
  { icon: Github, label: "GitHub", value: "@Ztaz9906", href: SOCIALS.github },
  { icon: Download, label: "Resume", value: "Download CV", href: SOCIALS.resume },
]

export function Contact() {
  const [sent, setSent] = React.useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeading
        eyebrow="// 05"
        title="Let's build something together."
        description="Have a project, role, or idea in mind? My inbox is always open."
      />

      <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <div className="grid h-full grid-cols-1 gap-3 sm:grid-cols-2">
            {CONTACT_LINKS.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-blue/50 hover:shadow-[0_0_30px_-12px_rgba(59,130,246,0.5)]"
                >
                  <Icon className="size-5 text-blue" />
                  <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground group-hover:text-blue">
                    {item.value}
                  </p>
                </a>
              )
            })}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <Card className="p-6 sm:p-8">
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input id="name" name="name" placeholder="Jane Doe" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jane@company.com"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>
              <Button type="submit" size="lg" className="mt-1">
                <Send className="size-4" />
                {sent ? "Message sent" : "Send message"}
              </Button>
              {sent && (
                <p className="text-sm text-cyan" role="status">
                  Thanks — this form is a UI demo for now. I'll wire it up soon.
                </p>
              )}
            </form>
          </Card>
        </Reveal>
      </div>
    </section>
  )
}
