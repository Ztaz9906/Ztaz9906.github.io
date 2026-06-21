"use client";

import { EffectComposer, Bloom } from "@react-three/postprocessing";

export interface GlowPostProcessingProps {
  /** Bloom intensity. Default is tuned for a subtle accent glow. */
  intensity?: number;
  /** Luminance threshold. Only pixels brighter than this will bloom. */
  luminanceThreshold?: number;
  /** How wide the glow spreads. */
  radius?: number;
}

/**
 * Provides a soft, premium bloom effect for emissive materials.
 * Tuned to match the geometric/Linear style (restrained, not heavy neon).
 */
export default function GlowPostProcessing({
  intensity = 0.5,
  luminanceThreshold = 0.8,
  radius = 0.4,
}: GlowPostProcessingProps) {
  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={luminanceThreshold}
        luminanceSmoothing={0.2}
        intensity={intensity}
        mipmapBlur // Essential for a smooth, high-quality, non-grainy bloom
      />
    </EffectComposer>
  );
}
