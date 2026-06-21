"use client";

import type {
  ComponentPropsWithoutRef,
  ReactNode,
  RefObject,
} from "react";
import { forwardRef, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export function useDiagramMountAnimation(container: RefObject<HTMLDivElement | null>) {
  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        gsap.set(".diagram-line", { strokeDashoffset: 0 });
        gsap.set(".diagram-node", { opacity: 1, y: 0, scale: 1 });
        gsap.set(".diagram-label", { opacity: 1, y: 0 });
        gsap.set(".diagram-glow", { opacity: 1 });
        return;
      }

      const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });

      timeline
        .set(".diagram-line", { strokeDashoffset: 100 })
        .set(".diagram-node", { opacity: 0, y: 10, scale: 0.96 })
        .set(".diagram-label", { opacity: 0, y: 8 })
        .set(".diagram-glow", { opacity: 0.45 })
        .to(
          ".diagram-line",
          {
            strokeDashoffset: 0,
            duration: 1.1,
            stagger: 0.08,
          },
          0,
        )
        .to(
          ".diagram-node",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
          },
          0.12,
        )
        .to(
          ".diagram-label",
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.04,
          },
          0.2,
        )
        .to(
          ".diagram-glow",
          {
            opacity: 1,
            duration: 0.6,
          },
          0.1,
        );
    },
    { scope: container },
  );
}

type DiagramShellProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"div">;

export const BlogDiagramShell = forwardRef<HTMLDivElement, DiagramShellProps>(
  function BlogDiagramShell({ children, className, ...props }, ref) {
    const classes = [
      "relative flex h-full w-full items-center justify-center overflow-hidden bg-background",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classes} {...props}>
        <div
          aria-hidden
          className="diagram-glow pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.12),transparent_36%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(31,41,55,0.65)_1px,transparent_1px),linear-gradient(90deg,rgba(31,41,55,0.65)_1px,transparent_1px)] [background-size:32px_32px]"
        />
        {children}
      </div>
    );
  },
);

export function useDiagramContainer() {
  const container = useRef<HTMLDivElement>(null);
  useDiagramMountAnimation(container);
  return container;
}
