"use client";

import { Suspense, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import type { Vector3 } from "three";
import GlowPostProcessing from "./GlowPostProcessing";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

interface SceneCanvasProps {
  children: ReactNode;
  /** Camera field-of-view in degrees (default 45) */
  fov?: number;
  /** Camera position [x, y, z] (default [0, 0, 6]) */
  cameraPosition?: [number, number, number] | Vector3;
  /** Background color (default dark navy #030712) */
  bgColor?: string;
  /** Custom fallback element while the canvas loads */
  fallback?: ReactNode;
  /** Extra className applied to the outer wrapper */
  className?: string;
  /** Enable post-processing bloom glow (default true) */
  enableGlow?: boolean;
}

/* -------------------------------------------------------------------------- */
/*  Default fallback – pulsing skeleton matching card bg #111827              */
/* -------------------------------------------------------------------------- */

function DefaultFallback() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#111827",
        borderRadius: "0.75rem",
        animation: "scene-pulse 2s ease-in-out infinite",
      }}
      aria-label="Loading 3D scene…"
    >
      {/* Keyframe injected inline so we don't need an external stylesheet */}
      <style>{`
        @keyframes scene-pulse {
          0%, 100% { opacity: 0.6; }
          50%      { opacity: 1;   }
        }
      `}</style>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Three-point lighting rig                                                  */
/*  Key: warm-ish white from top-right                                        */
/*  Fill: dimmer cool fill from bottom-left                                   */
/*  Rim: blue/purple accent behind for edge separation on dark bg             */
/* -------------------------------------------------------------------------- */

function LightingRig() {
  return (
    <>
      {/* Key light */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.2}
        color="#ffffff"
      />
      {/* Fill light */}
      <directionalLight
        position={[-4, -2, 3]}
        intensity={0.4}
        color="#94a3b8"
      />
      {/* Rim – cool blue accent */}
      <pointLight
        position={[-3, 2, -4]}
        intensity={0.8}
        color="#3B82F6"
        distance={15}
        decay={2}
      />
      {/* Rim – purple accent */}
      <pointLight
        position={[3, -1, -5]}
        intensity={0.6}
        color="#8B5CF6"
        distance={15}
        decay={2}
      />
      {/* Low-level ambient so nothing goes fully black */}
      <ambientLight intensity={0.15} color="#1e1b4b" />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  SceneCanvas                                                               */
/* -------------------------------------------------------------------------- */

export default function SceneCanvas({
  children,
  fov = 45,
  cameraPosition = [0, 0, 6],
  bgColor = "#030712",
  fallback,
  className,
  enableGlow = true,
}: SceneCanvasProps) {
  const isTransparent = bgColor === "transparent";

  return (
    <Suspense fallback={fallback ?? <DefaultFallback />}>
      <Canvas
        className={className}
        dpr={[1, 1.5]}
        camera={{ fov, position: cameraPosition, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: isTransparent }}
        style={{ background: isTransparent ? "transparent" : bgColor }}
      >
        <LightingRig />
        {children}
        {enableGlow && <GlowPostProcessing />}
      </Canvas>
    </Suspense>
  );
}
