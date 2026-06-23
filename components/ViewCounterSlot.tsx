"use client";

import dynamic from "next/dynamic";

const ViewCounter = dynamic(() => import("@/components/ViewCounter"), {
  ssr: false,
});

interface ViewCounterSlotProps {
  page: string;
  className?: string;
}

export function ViewCounterSlot({
  page,
  className,
}: ViewCounterSlotProps) {
  return <ViewCounter page={page} className={className} />;
}
