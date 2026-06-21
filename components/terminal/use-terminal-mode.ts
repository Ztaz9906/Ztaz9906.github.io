"use client";

import {
  useIsLowPowerDevice,
  usePrefersReducedMotion,
  useWebGLAvailable,
} from "@/components/three/use-device";

export function useTerminalEmbedMode() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isLowPower = useIsLowPowerDevice();
  const webglAvailable = useWebGLAvailable();

  return webglAvailable && !prefersReducedMotion && !isLowPower;
}
