"use client";

import { Eye } from "lucide-react";
import { useTranslations } from "next-intl";

import { usePageViews } from "@/hooks/usePageViews";
import { cn } from "@/lib/utils";

interface ViewCounterProps {
  page: string;
  className?: string;
}

export default function ViewCounter({ page, className }: ViewCounterProps) {
  const { views, isLoading } = usePageViews(page);
  const t = useTranslations("footer");

  if (isLoading || views === null) {
    return null;
  }

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <Eye size={12} className="text-muted-foreground" />
      <span className="font-mono text-xs text-muted-foreground">
        {t("viewsCounter", { views })}
      </span>
    </div>
  );
}
