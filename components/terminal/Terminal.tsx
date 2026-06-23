"use client";

import type { KeyboardEvent } from "react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { TerminalSquare } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { PROFILE } from "@/lib/data";
import {
  autocompleteCommand,
  findCommand,
  type TerminalCommandResult,
} from "@/lib/terminal/commands";
import type { Locale } from "@/lib/data/projects";
import {
  TERMINAL_FOCUS_EVENT,
  TERMINAL_FOCUS_STATE_EVENT,
  TERMINAL_SECTION_ID,
} from "@/lib/terminal/constants";
import { SectionHeading } from "@/components/section-heading";

type OutputEntry = {
  id: string;
  command?: string;
  lines: string[];
};

function shouldReduceMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function stopEmbeddedEventPropagation(event: {
  stopPropagation: () => void;
}) {
  event.stopPropagation();
}

function stopEmbeddedPointerEventPropagation(event: {
  stopPropagation: () => void;
}) {
  event.stopPropagation();
}

interface TerminalProps {
  variant?: "flat" | "embedded";
  initialOutput?: string[];
  onFocusChange?: (focused: boolean) => void;
}

export function Terminal({
  variant = "flat",
  initialOutput,
  onFocusChange,
}: TerminalProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations("common");
  const inputId = useId();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const defaultInitialOutput = [
    t("terminalInitialReady", { name: PROFILE.name }),
    t("terminalInitialHelp"),
  ];

  const [entries, setEntries] = useState<OutputEntry[]>([
    {
      id: "welcome",
      lines: initialOutput ?? defaultInitialOutput,
    },
  ]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const prompt = useMemo(() => "guest@portfolio:~$", []);
  const isEmbedded = variant === "embedded";
  const shellClassName = isEmbedded
    ? "h-full rounded-[12px] border-0 shadow-none pointer-events-auto"
    : "";
  const headerClassName = isEmbedded
    ? "px-4 py-2.5"
    : "px-4 py-3";
  const headerTextClassName = isEmbedded ? "text-[12px]" : "text-xs";
  const logClassName = isEmbedded
    ? "h-[calc(100%-102px)] min-h-0 px-4 py-3 text-[14px] leading-6"
    : "max-h-[420px] min-h-[420px] px-4 py-5 text-sm";
  const inputWrapClassName = isEmbedded ? "px-4 py-2.5" : "px-4 py-4";
  const inputRowClassName = isEmbedded
    ? "gap-2 px-2.5 py-2"
    : "gap-3 px-3 py-3";
  const promptClassName = isEmbedded ? "text-[13px]" : "text-sm";
  const inputClassName = isEmbedded ? "text-[13px]" : "text-sm";
  const helperClassName = isEmbedded ? "hidden" : "mt-2 text-xs";

  useEffect(() => {
    const log = logRef.current;
    if (!log) return;
    log.scrollTop = log.scrollHeight;
  }, [entries]);

  useEffect(() => {
    const focusInput = () => {
      const section = sectionRef.current;
      if (!section) return;

      section.scrollIntoView({
        behavior: shouldReduceMotion() ? "auto" : "smooth",
        block: "start",
      });

      window.setTimeout(() => {
        inputRef.current?.focus();
      }, shouldReduceMotion() ? 0 : 350);
    };

    const handleFocusRequest = () => focusInput();

    window.addEventListener(TERMINAL_FOCUS_EVENT, handleFocusRequest);

    if (window.location.hash === `#${TERMINAL_SECTION_ID}`) {
      focusInput();
    }

    return () => {
      window.removeEventListener(TERMINAL_FOCUS_EVENT, handleFocusRequest);
    };
  }, [isEmbedded]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(TERMINAL_FOCUS_STATE_EVENT, {
        detail: { focused: isInputFocused },
      }),
    );
    onFocusChange?.(isInputFocused);
  }, [isInputFocused, onFocusChange]);

  function pushOutput(command: string, result: TerminalCommandResult) {
    if (result.type === "clear") {
      setEntries([]);
      return;
    }

    setEntries((current) => [
      ...current,
      {
        id: `${Date.now()}-${current.length}`,
        command,
        lines: result.lines,
      },
    ]);
  }

  function submitCommand(rawValue: string) {
    const trimmed = rawValue.trim();
    if (!trimmed) return;

    setHistory((current) => {
      const next = current[current.length - 1] === trimmed ? current : [...current, trimmed];
      return next;
    });
    setHistoryIndex(null);

    const command = findCommand(trimmed, locale);
    if (command) {
      pushOutput(trimmed, command.run());
    } else {
      pushOutput(trimmed, {
        type: "output",
        lines: [
          t("terminalCommandNotFound", { command: trimmed }),
        ],
      });
    }

    setValue("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      submitCommand(value);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length === 0) return;

      setHistoryIndex((current) => {
        const nextIndex =
          current === null ? history.length - 1 : Math.max(0, current - 1);
        setValue(history[nextIndex] ?? "");
        return nextIndex;
      });
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (history.length === 0) return;

      setHistoryIndex((current) => {
        if (current === null) {
          setValue("");
          return null;
        }

        const nextIndex = current + 1;
        if (nextIndex >= history.length) {
          setValue("");
          return null;
        }

        setValue(history[nextIndex] ?? "");
        return nextIndex;
      });
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      const match = autocompleteCommand(value, locale);
      if (match) {
        setValue(match);
      }
    }
  }

  function focusInputOnShellClick() {
    inputRef.current?.focus();
  }

  const shell = (
    <div
      id={TERMINAL_SECTION_ID}
      ref={sectionRef}
      className={`overflow-hidden rounded-2xl border border-border bg-[#030712]/95 shadow-[0_0_40px_-18px_rgba(59,130,246,0.45)] ${shellClassName}`}
      onClick={focusInputOnShellClick}
      onPointerDownCapture={isEmbedded ? stopEmbeddedEventPropagation : undefined}
      onPointerUpCapture={isEmbedded ? stopEmbeddedEventPropagation : undefined}
      onClickCapture={isEmbedded ? stopEmbeddedEventPropagation : undefined}
      onMouseDownCapture={isEmbedded ? stopEmbeddedEventPropagation : undefined}
      onKeyDownCapture={isEmbedded ? stopEmbeddedEventPropagation : undefined}
    >
      <div className={`flex items-center gap-2 border-b border-border bg-card/70 ${headerClassName}`}>
        <span className="size-3 rounded-full bg-[#FF5F57]" />
        <span className="size-3 rounded-full bg-[#FEBC2E]" />
        <span className="size-3 rounded-full bg-[#28C840]" />
        <div className={`ml-2 flex items-center gap-2 font-mono text-muted-foreground ${headerTextClassName}`}>
          <TerminalSquare className={isEmbedded ? "size-4" : "size-3.5"} />
          <span>{t("terminalWindowTitle")}</span>
        </div>
      </div>

      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-relevant="additions text"
        className={`overflow-y-auto font-mono ${logClassName}`}
      >
        <div className={isEmbedded ? "space-y-2.5" : "space-y-4"}>
          {entries.map((entry) => (
            <div key={entry.id} className={isEmbedded ? "space-y-0.5" : "space-y-1.5"}>
              {entry.command ? (
                <p className="break-all text-cyan">
                  {prompt} {entry.command}
                </p>
              ) : null}
              {entry.lines.map((line, index) => (
                <p
                  key={`${entry.id}-${index}`}
                  className={`whitespace-pre-wrap break-words text-foreground/90 ${
                    isEmbedded ? "pl-2" : "pl-3"
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={`border-t border-border bg-card/50 ${inputWrapClassName}`}>
        <label htmlFor={inputId} className="sr-only">
          {t("terminalInputLabel")}
        </label>
        <div className={`flex items-center rounded-lg border border-border bg-background/70 shadow-inner focus-within:border-blue/60 focus-within:ring-2 focus-within:ring-blue/30 ${inputRowClassName}`}>
          <span className={`shrink-0 font-mono text-cyan ${promptClassName}`}>{prompt}</span>
          <div className="flex min-w-0 flex-1 items-center">
            <input
              id={inputId}
              ref={inputRef}
              type="text"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-describedby={`${inputId}-help`}
              onPointerDown={isEmbedded ? stopEmbeddedPointerEventPropagation : undefined}
              onClick={isEmbedded ? stopEmbeddedPointerEventPropagation : undefined}
              className={`min-w-0 flex-1 bg-transparent font-mono text-foreground outline-none placeholder:text-muted-foreground focus-visible:outline-none ${inputClassName}`}
              placeholder={t("terminalPlaceholder")}
            />
            <span
              aria-hidden
              className={`ml-1 inline-block rounded-sm bg-cyan ${
                isEmbedded ? "h-4 w-1.5" : "h-5 w-2"
              } ${
                isInputFocused ? "animate-pulse" : "opacity-50"
              }`}
            />
          </div>
        </div>
        <p id={`${inputId}-help`} className={`font-mono text-muted-foreground ${helperClassName}`}>
          {t("terminalHelp")}
        </p>
      </div>
    </div>
  );

  if (isEmbedded) {
    return <div className="h-full" aria-label={t("terminalAriaLabel")}>{shell}</div>;
  }

  return (
    <section
      className="relative overflow-hidden border-y border-border bg-background py-24 sm:py-28"
      aria-labelledby="terminal-heading"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 hero-mesh opacity-50" />
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          titleId="terminal-heading"
          eyebrow={t("terminalSectionEyebrow")}
          title={t("terminalSectionTitle")}
          description={t("terminalSectionDescription")}
        />

        <div className="mt-12">{shell}</div>
      </div>
    </section>
  );
}
