import { getTranslations } from "next-intl/server";
import { ViewCounterSlot } from "@/components/ViewCounterSlot";

export async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 sm:flex-row sm:px-6">
        <span className="text-lg font-bold tracking-tight text-gradient">EF</span>
        <p className="font-mono text-xs text-muted-foreground">
          (c) {year} Enrique Ferreiro
        </p>
        <ViewCounterSlot page="home" />
        <p className="font-mono text-xs text-muted-foreground">
          {t("builtWith")}
        </p>
      </div>
    </footer>
  );
}
