"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import SceneCanvas from "./SceneCanvas";
import {
  useMediaQuery,
  usePrefersReducedMotion,
  useIsLowPowerDevice,
} from "./use-device";

function Nebula({ pauseMotion }: { pauseMotion: boolean }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (!pauseMotion && materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color("#3B82F6") },
      uTime: { value: 0 },
    }),
    []
  );

  return (
    <mesh position={[0, 0, -5]}>
      <planeGeometry args={[40, 40]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform vec3 uColor;
          uniform float uTime;
          void main() {
            vec2 center = vec2(0.5 + sin(uTime * 0.1) * 0.15, 0.5 + cos(uTime * 0.15) * 0.1);
            float d = distance(vUv, center);
            float alpha = smoothstep(0.6, 0.0, d) * 0.15;
            gl_FragColor = vec4(uColor, alpha);
          }
        `}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

function Particles({
  count,
  pauseMotion,
}: {
  count: number;
  pauseMotion: boolean;
}) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const radius = 12;
    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.cbrt(Math.random()) * radius;
      arr[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!pauseMotion && ref.current) {
      ref.current.rotation.x -= delta * 0.015;
      ref.current.rotation.y -= delta * 0.025;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#8B5CF6"
          size={0.06}
          sizeAttenuation
          depthWrite={false}
          opacity={0.5}
        />
      </Points>
    </group>
  );
}

export default function ParticleField() {
  const isLowPower = useIsLowPowerDevice();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const prefersReducedMotion = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // No 3D background on low-power or before mount
  if (!mounted || isLowPower) return null;

  const count = isMobile ? 800 : 2000;

  return (
    <div
      className="absolute inset-0 -z-10 h-full w-full pointer-events-none"
      aria-hidden
    >
      <SceneCanvas
        cameraPosition={[0, 0, 8]}
        fov={60}
        enableGlow={false}
      >
        <Nebula pauseMotion={prefersReducedMotion} />
        <Particles count={count} pauseMotion={prefersReducedMotion} />
      </SceneCanvas>
    </div>
  );
}
