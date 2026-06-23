import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { SOCIALS } from "@/lib/data";
import type { Locale } from "@/lib/data/projects";

interface SubpageHeaderProps {
  backHref: string;
  backLabel: string;
  locale: Locale;
  maxWidthClassName?: string;
}

export async function SubpageHeader({
  backHref,
  backLabel,
  locale,
  maxWidthClassName = "max-w-6xl",
}: SubpageHeaderProps) {
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  return (
    <div className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div
        className={`mx-auto flex min-h-16 ${maxWidthClassName} flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6`}
      >
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <Link
            href={`/${locale}`}
            aria-label={tCommon("homeLinkAriaLabel")}
            className="shrink-0 text-lg font-bold tracking-tight"
          >
            <span className="text-gradient">EF</span>
          </Link>

          <Link
            href={backHref}
            className="inline-flex min-w-0 items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 shrink-0" />
            <span className="truncate">{backLabel}</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button asChild size="sm">
            <a
              href={SOCIALS.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              {tNav("ctaResume")}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
