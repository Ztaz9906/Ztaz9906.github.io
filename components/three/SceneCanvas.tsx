"use client";

import { Component, Suspense, type ReactNode } from "react";
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
/*  Default loading fallback – pulsing skeleton                               */
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
/*  WebGL unavailable fallback – shown when GPU/WebGL is disabled             */
/* -------------------------------------------------------------------------- */

function WebGLUnavailableFallback() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: "320px",
        background: "#111827",
        borderRadius: "0.75rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        border: "1px dashed #1f2937",
      }}
      aria-label="3D scene unavailable"
    >
      {/* Simple SVG GPU icon */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#374151"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M6 12h12M6 9v6M18 9v6M10 12h.01M14 12h.01" />
      </svg>
      <p
        style={{
          fontFamily: "var(--font-mono, monospace)",
          fontSize: "0.75rem",
          color: "#4b5563",
          textAlign: "center",
          maxWidth: "240px",
          lineHeight: 1.6,
        }}
      >
        WebGL unavailable.
        <br />
        Enable hardware acceleration in your browser to view this scene.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  ErrorBoundary — must be a class component (React requirement)             */
/*  Catches WebGL context creation failures and Three.js renderer errors.     */
/* -------------------------------------------------------------------------- */

interface ErrorBoundaryState {
  failed: boolean;
}

class WebGLErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: Error) {
    // Only log in development — don't pollute production console
    if (process.env.NODE_ENV === "development") {
      console.warn("[SceneCanvas] WebGL error caught by boundary:", error.message);
    }
  }

  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}

/* -------------------------------------------------------------------------- */
/*  Three-point lighting rig                                                  */
/* -------------------------------------------------------------------------- */

function LightingRig() {
  return (
    <>
      {/* Key light */}
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      {/* Fill light */}
      <directionalLight position={[-4, -2, 3]} intensity={0.4} color="#94a3b8" />
      {/* Rim – cool blue accent */}
      <pointLight position={[-3, 2, -4]} intensity={0.8} color="#3B82F6" distance={15} decay={2} />
      {/* Rim – purple accent */}
      <pointLight position={[3, -1, -5]} intensity={0.6} color="#8B5CF6" distance={15} decay={2} />
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
    <WebGLErrorBoundary fallback={<WebGLUnavailableFallback />}>
      <Suspense fallback={fallback ?? <DefaultFallback />}>
        <Canvas
          className={className}
          dpr={[1, 1.5]}
          camera={{ fov, position: cameraPosition, near: 0.1, far: 100 }}
          gl={{ antialias: true, alpha: isTransparent, powerPreference: "default" }}
          style={{ background: isTransparent ? "transparent" : bgColor }}
        >
          <LightingRig />
          {children}
          {enableGlow && <GlowPostProcessing />}
        </Canvas>
      </Suspense>
    </WebGLErrorBoundary>
  );
}
