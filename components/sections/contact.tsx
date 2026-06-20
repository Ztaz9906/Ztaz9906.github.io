"use client"

import * as React from "react"
import { CheckCircle2, Download, Github, Linkedin, Mail, Send } from "lucide-react"
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

type Fields = "name" | "email" | "message"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: Record<Fields, string>) {
  const errors: Partial<Record<Fields, string>> = {}
  if (!values.name.trim()) errors.name = "Please enter your name."
  if (!values.email.trim()) errors.email = "Please enter your email."
  else if (!EMAIL_RE.test(values.email.trim()))
    errors.email = "Please enter a valid email address."
  if (!values.message.trim()) errors.message = "Please enter a message."
  else if (values.message.trim().length < 10)
    errors.message = "Message should be at least 10 characters."
  return errors
}

export function Contact() {
  const [values, setValues] = React.useState<Record<Fields, string>>({
    name: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = React.useState<Partial<Record<Fields, string>>>(
    {},
  )
  const [touched, setTouched] = React.useState<Partial<Record<Fields, boolean>>>(
    {},
  )
  const [sent, setSent] = React.useState(false)

  const update = (field: Fields, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    if (touched[field]) {
      setErrors(validate({ ...values, [field]: value }))
    }
  }

  const onBlur = (field: Fields) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors(validate(values))
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    setTouched({ name: true, email: true, message: true })
    if (Object.keys(nextErrors).length > 0) return
    setSent(true)
    setValues({ name: "", email: "", message: "" })
    setTouched({})
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeading
        eyebrow="// 05"
        title="Let's build something together"
        description="Open to new opportunities, freelance projects, and interesting problems."
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
            <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Jane Doe"
                    value={values.name}
                    onChange={(e) => update("name", e.target.value)}
                    onBlur={() => onBlur("name")}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={
                      errors.name
                        ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/40"
                        : undefined
                    }
                  />
                  {errors.name && (
                    <p id="name-error" className="text-xs text-destructive">
                      {errors.name}
                    </p>
                  )}
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
                    value={values.email}
                    onChange={(e) => update("email", e.target.value)}
                    onBlur={() => onBlur("email")}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={
                      errors.email
                        ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/40"
                        : undefined
                    }
                  />
                  {errors.email && (
                    <p id="email-error" className="text-xs text-destructive">
                      {errors.email}
                    </p>
                  )}
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
                  value={values.message}
                  onChange={(e) => update("message", e.target.value)}
                  onBlur={() => onBlur("message")}
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                  className={
                    errors.message
                      ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/40"
                      : undefined
                  }
                />
                {errors.message && (
                  <p id="message-error" className="text-xs text-destructive">
                    {errors.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="mt-1"
              >
                <Send className="size-4" />
                Send Message
              </Button>
              {sent && (
                <div
                  role="status"
                  className="flex items-center gap-2 rounded-lg border border-cyan/30 bg-cyan/10 px-4 py-3 text-sm text-cyan"
                >
                  <CheckCircle2 className="size-4 shrink-0" />
                  Thanks! Your message looks good — backend wiring is coming
                  soon.
                </div>
              )}
            </form>
          </Card>
        </Reveal>
      </div>
    </section>
  )
}
