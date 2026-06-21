"use client";

import { useState, useEffect } from "react";

/**
 * Reactive media query hook. Returns `false` during SSR/hydration
 * to avoid mismatches, then syncs with the actual value on mount.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

/**
 * Detects prefers-reduced-motion at the OS level.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/**
 * Detects low-power / mobile devices where heavy WebGL scenes
 * should be swapped for a lighter fallback.
 *
 * Criteria:
 * - Mobile user-agent string match
 * - ≤ 4 logical CPU cores
 * - Viewport narrower than 768px (covers most phones/small tablets)
 */
export function useIsLowPowerDevice(): boolean {
  const isSmallViewport = useMediaQuery("(max-width: 768px)");
  const [isLowHardware, setIsLowHardware] = useState(false);

  useEffect(() => {
    const isMobileUA =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    const hasLowCores =
      navigator.hardwareConcurrency != null &&
      navigator.hardwareConcurrency <= 4;
    setIsLowHardware(isMobileUA || hasLowCores);
  }, []);

  return isSmallViewport || isLowHardware;
}
