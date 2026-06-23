import { Terminal } from "lucide-react"
import { useTranslations } from "next-intl"

export function HeroVisual() {
  const t = useTranslations("hero")
  const readout = [
    { cmd: t("visualCmdWhoami"), out: t("visualOutRole") },
    { cmd: t("visualCmdStack"), out: t("visualOutStack") },
    { cmd: t("visualCmdArchitecture"), out: t("visualOutArchitecture") },
    { cmd: t("visualCmdStatus"), out: t("visualOutStatus") },
  ]

  return (
    <div className="relative w-full">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-3xl bg-blue/10 blur-3xl"
      />
      <div className="relative overflow-hidden rounded-xl border border-border bg-card/80 backdrop-blur">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="size-3 rounded-full bg-[#FF5F57]" />
          <span className="size-3 rounded-full bg-[#FEBC2E]" />
          <span className="size-3 rounded-full bg-[#28C840]" />
          <div className="ml-2 flex items-center gap-2 text-xs text-muted-foreground">
            <Terminal className="size-3.5" />
            <span className="font-mono">{t("visualFileName")}</span>
          </div>
        </div>
        <div className="space-y-3 p-5 font-mono text-sm">
          {readout.map((line) => (
            <div key={line.cmd} className="space-y-1">
              <p className="text-cyan">{line.cmd}</p>
              <p className="pl-3 text-foreground/90">
                <span className="text-purple">{"// "}</span>
                {line.out}
              </p>
            </div>
          ))}
          <p className="flex items-center gap-2 pt-1 text-muted-foreground">
            <span className="inline-block size-2 animate-pulse rounded-full bg-[#28C840]" />
            <span className="text-foreground/80">_</span>
          </p>
        </div>
      </div>
    </div>
  )
}
