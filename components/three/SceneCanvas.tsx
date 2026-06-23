"use client";

import { Component, Suspense, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { useTranslations } from "next-intl";
import type { Vector3 } from "three";
import GlowPostProcessing from "./GlowPostProcessing";

interface SceneCanvasProps {
  children: ReactNode;
  fov?: number;
  cameraPosition?: [number, number, number] | Vector3;
  fallback?: ReactNode;
  className?: string;
  enableGlow?: boolean;
}

function DefaultFallback() {
  const t = useTranslations("common");

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#111827",
        borderRadius: "0.75rem",
        animation: "scene-pulse 2s ease-in-out infinite",
      }}
      aria-label={t("sceneLoadingAria")}
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

function WebGLUnavailableFallback() {
  const t = useTranslations("common");

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
      aria-label={t("sceneUnavailableAria")}
    >
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
        {t("sceneUnavailableTitle")}
        <br />
        {t("sceneUnavailableDescription")}
      </p>
    </div>
  );
}

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
    if (process.env.NODE_ENV === "development") {
      console.warn("[SceneCanvas] WebGL error caught by boundary:", error.message);
    }
  }

  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}

function LightingRig() {
  return (
    <>
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-4, -2, 3]} intensity={0.4} color="#94a3b8" />
      <pointLight position={[-3, 2, -4]} intensity={0.8} color="#3B82F6" distance={15} decay={2} />
      <pointLight position={[3, -1, -5]} intensity={0.6} color="#8B5CF6" distance={15} decay={2} />
      <ambientLight intensity={0.15} color="#1e1b4b" />
    </>
  );
}

export default function SceneCanvas({
  children,
  fov = 45,
  cameraPosition = [0, 0, 6],
  fallback,
  className,
  enableGlow = true,
}: SceneCanvasProps) {
  return (
    <WebGLErrorBoundary fallback={<WebGLUnavailableFallback />}>
      <Suspense fallback={fallback ?? <DefaultFallback />}>
        <Canvas
          className={className}
          dpr={[1, 1.5]}
          camera={{ fov, position: cameraPosition, near: 0.1, far: 100 }}
          gl={{ alpha: true, antialias: true, powerPreference: "default" }}
          onCreated={({ scene, gl }) => {
            scene.background = null;
            gl.setClearColor(0x000000, 0);
          }}
          style={{ background: "transparent" }}
        >
          <LightingRig />
          {children}
          {enableGlow && <GlowPostProcessing />}
        </Canvas>
      </Suspense>
    </WebGLErrorBoundary>
  );
}
