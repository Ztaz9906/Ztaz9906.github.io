"use client"

import { useLocale, useTranslations } from "next-intl"
import { usePathname, useRouter } from "next/navigation"

export function LanguageSwitcher() {
  const locale = useLocale()
  const t = useTranslations("common")
  const pathname = usePathname()
  const router = useRouter()

  const nextLocale = locale === "en" ? "es" : "en"

  function handleSwitch() {
    const nextPath = pathname.replace(/^\/(en|es)(?=\/|$)/, `/${nextLocale}`)
    router.replace(nextPath)
  }

  return (
    <button
      type="button"
      onClick={handleSwitch}
      aria-label={t("langSwitchLabel")}
      className="inline-flex h-9 items-center justify-center rounded-lg border border-border px-3 font-mono text-xs text-muted-foreground transition-colors hover:border-[var(--accent-blue,var(--color-blue))] hover:bg-card hover:text-[var(--accent-blue,var(--color-blue))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue,var(--color-blue))]/30"
    >
      {nextLocale.toUpperCase()}
    </button>
  )
}
