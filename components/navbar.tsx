"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { NAV_LINKS, SOCIALS } from "@/lib/data"
import { cn } from "@/lib/utils"

const NAV_LABEL_KEYS: Record<string, string> = {
  "#about": "linkAbout",
  "#experience": "linkExperience",
  "#projects": "linkProjects",
  "/blog": "linkBlog",
  "#skills": "linkSkills",
  "#contact": "linkContact",
}

export function Navbar() {
  const locale = useLocale()
  const t = useTranslations("nav")
  const tCommon = useTranslations("common")
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  const localizeHref = React.useCallback(
    (href: string) => {
      if (href === "/") return `/${locale}`
      if (href.startsWith("/")) return `/${locale}${href}`
      return href
    },
    [locale],
  )

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href={`/${locale}`}
          className="flex items-center gap-0.5 text-lg font-bold tracking-tight"
          aria-label={tCommon("homeLinkAriaLabel")}
        >
          <span className="text-gradient">EF</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              {link.href.startsWith("/") ? (
                <Link
                  href={localizeHref(link.href)}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
                >
                  {t(NAV_LABEL_KEYS[link.href])}
                </Link>
              ) : (
                <a
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
                >
                  {t(NAV_LABEL_KEYS[link.href])}
                </a>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher />
          <Button asChild size="sm">
            <a href={SOCIALS.resume}>{t("ctaResume")}</a>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground md:hidden"
          aria-label={open ? t("ariaCloseMenu") : t("ariaOpenMenu")}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-md md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                {link.href.startsWith("/") ? (
                  <Link
                    href={localizeHref(link.href)}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
                  >
                    {t(NAV_LABEL_KEYS[link.href])}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
                  >
                    {t(NAV_LABEL_KEYS[link.href])}
                  </a>
                )}
              </li>
            ))}
            <li className="pt-2">
              <Button asChild className="w-full">
                <a href={SOCIALS.resume} onClick={() => setOpen(false)}>
                  {t("ctaResume")}
                </a>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
