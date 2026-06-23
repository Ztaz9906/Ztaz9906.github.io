"use client";

import { usePathname, useRouter } from "next/navigation";
import { TerminalSquare } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import {
  TERMINAL_FOCUS_EVENT,
  TERMINAL_SECTION_ID,
} from "@/lib/terminal/constants";
import { Button } from "@/components/ui/button";

function shouldReduceMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function TerminalToggleButton() {
  const locale = useLocale();
  const t = useTranslations("common");
  const pathname = usePathname();
  const router = useRouter();

  function focusTerminalOnPage() {
    const terminal = document.getElementById(TERMINAL_SECTION_ID);
    if (!terminal) return false;

    terminal.scrollIntoView({
      behavior: shouldReduceMotion() ? "auto" : "smooth",
      block: "start",
    });

    window.setTimeout(() => {
      window.dispatchEvent(new Event(TERMINAL_FOCUS_EVENT));
    }, shouldReduceMotion() ? 0 : 300);

    return true;
  }

  function handleClick() {
    if (pathname === `/${locale}` && focusTerminalOnPage()) {
      return;
    }

    router.push(`/${locale}/#hero`);
    window.setTimeout(() => {
      window.dispatchEvent(new Event(TERMINAL_FOCUS_EVENT));
    }, 350);
  }

  return (
    <Button
      type="button"
      variant="secondary"
      size="icon"
      onClick={handleClick}
      aria-label={t("terminalToggleAria")}
      className="fixed bottom-5 right-5 z-50 h-12 w-12 rounded-full border border-border bg-card/90 shadow-[0_0_24px_-8px_rgba(59,130,246,0.55)] backdrop-blur-md hover:border-blue/60"
    >
      <TerminalSquare className="size-5" />
    </Button>
  );
}
