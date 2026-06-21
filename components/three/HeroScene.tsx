"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, RoundedBox, Html } from "@react-three/drei";
import * as THREE from "three";
import SceneCanvas from "./SceneCanvas";
import { usePrefersReducedMotion, useIsLowPowerDevice } from "./use-device";

function ResponsiveFraming() {
  const { camera, size } = useThree();

  useEffect(() => {
    const isPortrait = size.width < size.height;
    camera.position.z = isPortrait ? 7.5 : 5;
    camera.position.y = isPortrait ? 1.5 : 1.2;
    (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
  }, [size, camera]);

  return null;
}

interface SceneContentProps {
  children?: React.ReactNode;
  pauseMotion: boolean;
}

function SceneContent({ children, pauseMotion }: SceneContentProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Materials created inside React lifecycle so they dispose with the component
  const deskMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0f172a",
        roughness: 0.9,
        metalness: 0.1,
      }),
    []
  );
  const monitorMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1e293b",
        roughness: 0.8,
        metalness: 0.2,
      }),
    []
  );
  const screenGlowMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#020617",
        emissive: "#3B82F6",
        emissiveIntensity: 0.4,
        roughness: 0.2,
        metalness: 0.8,
      }),
    []
  );

  // Dispose materials on unmount to prevent WebGL memory leaks
  useEffect(() => {
    return () => {
      deskMaterial.dispose();
      monitorMaterial.dispose();
      screenGlowMaterial.dispose();
    };
  }, [deskMaterial, monitorMaterial, screenGlowMaterial]);

  useFrame((state) => {
    if (!pauseMotion && groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      <Float
        speed={pauseMotion ? 0 : 2}
        rotationIntensity={pauseMotion ? 0 : 0.05}
        floatIntensity={pauseMotion ? 0 : 0.4}
        floatingRange={[-0.1, 0.1]}
      >
        {/* Desk Surface */}
        <RoundedBox
          args={[3.6, 0.08, 1.8]}
          radius={0.03}
          smoothness={4}
          position={[0, 0, 0]}
          material={deskMaterial}
        />

        {/* Monitor Base */}
        <RoundedBox
          args={[0.6, 0.04, 0.4]}
          radius={0.02}
          smoothness={4}
          position={[0, 0.06, -0.2]}
          material={monitorMaterial}
        />

        {/* Monitor Stand */}
        <RoundedBox
          args={[0.1, 0.5, 0.06]}
          radius={0.01}
          smoothness={4}
          position={[0, 0.31, -0.2]}
          material={monitorMaterial}
        />

        {/* Monitor Screen Frame */}
        <RoundedBox
          args={[2.4, 1.4, 0.08]}
          radius={0.04}
          smoothness={4}
          position={[0, 1.01, -0.1]}
          material={monitorMaterial}
        >
          {/* Inner screen backplate & glow */}
          <mesh position={[0, 0, 0.041]} material={screenGlowMaterial}>
            <planeGeometry args={[2.3, 1.3]} />
          </mesh>

          {/* HTML Overlay Content */}
          {children && (
            <Html
              transform
              wrapperClass="monitor-screen"
              distanceFactor={1.15}
              position={[0, 0, 0.042]}
              style={{
                width: "800px",
                height: "450px",
                background: "rgba(3, 7, 18, 0.8)",
                backdropFilter: "blur(4px)",
                border: "1px solid rgba(59, 130, 246, 0.2)",
                borderRadius: "12px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
                overflow: "hidden",
                color: "white",
              }}
            >
              {children}
            </Html>
          )}
        </RoundedBox>
      </Float>
    </group>
  );
}

export interface HeroSceneProps {
  children?: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function HeroScene({ children, fallback }: HeroSceneProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isLowPower = useIsLowPowerDevice();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>{fallback}</>;

  if (isLowPower && fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className="relative w-full h-[400px] lg:h-[500px]">
      <SceneCanvas
        cameraPosition={[0, 1.2, 5]}
        fov={45}
        fallback={fallback}
        className="rounded-xl overflow-hidden"
      >
        <ResponsiveFraming />
        <SceneContent pauseMotion={prefersReducedMotion}>
          {children}
        </SceneContent>
      </SceneCanvas>
    </div>
  );
}
