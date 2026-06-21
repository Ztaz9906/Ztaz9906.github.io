"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useFrame } from "@react-three/fiber";
import {
  Billboard,
  Html,
  Image,
  OrbitControls,
  RoundedBox,
  Text,
} from "@react-three/drei";
import * as THREE from "three";
import SceneCanvas from "./SceneCanvas";
import {
  useIsLowPowerDevice,
  useMediaQuery,
  usePrefersReducedMotion,
} from "./use-device";
import type { PlanetData, SkillData } from "./types";

export type { PlanetData, SkillData } from "./types";

const PlanetFocusCtx = createContext<React.MutableRefObject<boolean> | null>(null);

interface SkillsGalaxyProps {
  planets: PlanetData[];
  fallback?: React.ReactNode;
}

const SKILL_ICONS: Record<string, string> = {
  JavaScript: "/iconos/javascript.svg",
  React: "/iconos/react.svg",
  "Next.js": "/iconos/nextdotjs.svg",
  TypeScript: "/iconos/typescript.svg",
  Python: "/iconos/python.svg",
  "Node.js": "/iconos/node.svg",
  Astro: "/iconos/astro.svg",
  "Redux Toolkit": "/iconos/redux.svg",
  "Tailwind CSS": "/iconos/tailwindcss.svg",
  "shadcn/ui": "/iconos/shadcnui.svg",
  "Radix UI": "/iconos/radixui.svg",
  Django: "/iconos/django.svg",
  Firebase: "/iconos/firebase.svg",
  Docker: "/iconos/docker.svg",
  Stripe: "/iconos/stripe.svg",
  GraphQL: "/iconos/graphql.svg",
  Supabase: "/iconos/supabase.svg",
  PostgreSQL: "/iconos/postgresql.svg",
  Prisma: "/iconos/prisma.svg",
  TypeORM: "/iconos/typeorm.svg",
  "Drizzle ORM": "/iconos/drizzle.svg",
  "Google OAuth": "/iconos/google.svg",
  "Ably Realtime": "/iconos/ably.svg",
  Mapbox: "/iconos/mapbox.svg",
  Git: "/iconos/git.svg",
  GitHub: "/iconos/github.svg",
  Jest: "/iconos/jest.svg",
};

function getFibonacciSpherePoints(samples: number, radius: number) {
  const points: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < samples; i++) {
    const y = 1 - ((i + 1) / (samples + 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;

    points.push(
      new THREE.Vector3(
        Math.cos(theta) * r * radius,
        y * radius,
        Math.sin(theta) * r * radius
      )
    );
  }

  return points;
}

function SkillLabel({
  skill,
  position,
  onHoverChange,
}: {
  skill: SkillData;
  position: THREE.Vector3;
  onHoverChange: (hovered: boolean) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const iconUrl = SKILL_ICONS[skill.name];
  const hasIcon = Boolean(iconUrl);
  const textWidth = skill.name.length * 0.085;
  const width = (hasIcon ? 0.36 : 0.2) + textWidth;

  useFrame(({ camera }) => {
    if (!groupRef.current) return;

    const worldPosition = new THREE.Vector3();
    groupRef.current.getWorldPosition(worldPosition);
    const behind = worldPosition.dot(camera.position) < 0;
    const targetScale = behind ? 0.6 : hovered ? 1.1 : 1.0;

    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );
  });

  return (
    <group position={position} ref={groupRef}>
      <Billboard>
        <group
          onPointerEnter={(event) => {
            event.stopPropagation();
            setHovered(true);
            onHoverChange(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerLeave={(event) => {
            event.stopPropagation();
            setHovered(false);
            onHoverChange(false);
            document.body.style.cursor = "auto";
          }}
        >
          <RoundedBox args={[width, 0.32, 0.04]} radius={0.12} smoothness={4}>
            <meshPhysicalMaterial
              color={hovered ? "#1e3a8a" : "#111827"}
              emissive={hovered ? "#3b82f6" : "#000000"}
              emissiveIntensity={0.25}
              transparent
              opacity={hovered ? 1 : 0.82}
              roughness={0.2}
              metalness={0.8}
            />
          </RoundedBox>

          {hasIcon && (
            <Image
              url={iconUrl}
              transparent
              position={[-width / 2 + 0.2, 0, 0.025]}
              scale={[0.15, 0.15]}
            />
          )}

          <Text
            position={[hasIcon ? 0.07 : 0, 0, 0.025]}
            fontSize={0.12}
            color={hovered ? "#ffffff" : "#9ca3af"}
            anchorX="center"
            anchorY="middle"
          >
            {skill.name}
          </Text>

          {hovered && (
            <Html
              transform
              zIndexRange={[9999, 9999]}
              distanceFactor={8}
              position={[0, -0.35, 0]}
              center
            >
              <div
                className="w-44 rounded-xl border border-blue-500/30 bg-[#0f172a]/95 p-3 text-left shadow-2xl pointer-events-none"
                style={{
                  backdropFilter: "blur(8px)",
                  animation: "fadeIn 0.2s ease-out",
                }}
              >
                <p className="text-base font-bold text-white">{skill.name}</p>
                <p className="mt-1 font-mono text-xs text-cyan-400">{skill.level}</p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {skill.years} {skill.years === 1 ? "year" : "years"} exp.
                </p>
              </div>
            </Html>
          )}
        </group>
      </Billboard>
    </group>
  );
}

function Planet({
  planet,
  orbitAngleOffset,
  pauseMotion,
  isPreviewed,
  isLocked,
  isLabelHovered,
  onPreviewStart,
  onPreviewEnd,
  onLock,
  onLabelHoverChange,
}: {
  planet: PlanetData;
  orbitAngleOffset: number;
  pauseMotion: boolean;
  isPreviewed: boolean;
  isLocked: boolean;
  isLabelHovered: boolean;
  onPreviewStart: (planetId: string, position: THREE.Vector3) => void;
  onPreviewEnd: (planetId: string) => void;
  onLock: (planetId: string, position: THREE.Vector3) => void;
  onLabelHoverChange: (planetId: string, hovered: boolean) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const labelsRef = useRef<THREE.Group>(null);
  const angleRef = useRef(orbitAngleOffset);
  const isPlanetHoveredRef = useRef(false);
  const isLabelHoveredRef = useRef(false);
  const blurTimeoutRef = useRef<number | null>(null);

  const moonPositions = useMemo(
    () => getFibonacciSpherePoints(planet.skills.length, planet.size * 2.6),
    [planet.skills.length, planet.size]
  );

  const clearPendingBlur = useCallback(() => {
    if (blurTimeoutRef.current !== null) {
      window.clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = null;
    }
  }, []);

  const getWorldPosition = useCallback(() => {
    if (!groupRef.current) return null;

    const worldPosition = new THREE.Vector3();
    groupRef.current.getWorldPosition(worldPosition);
    return worldPosition;
  }, []);

  const previewPlanet = useCallback(() => {
    clearPendingBlur();
    if (isLocked) return;

    const worldPosition = getWorldPosition();
    if (!worldPosition) return;

    onPreviewStart(planet.category, worldPosition);
  }, [clearPendingBlur, getWorldPosition, isLocked, onPreviewStart, planet.category]);

  const scheduleBlur = useCallback(() => {
    clearPendingBlur();
    if (isLocked) return;

    blurTimeoutRef.current = window.setTimeout(() => {
      if (!isPlanetHoveredRef.current && !isLabelHoveredRef.current) {
        onPreviewEnd(planet.category);
      }
    }, 60);
  }, [clearPendingBlur, isLocked, onPreviewEnd, planet.category]);

  useEffect(() => {
    return () => clearPendingBlur();
  }, [clearPendingBlur]);

  useFrame((_, delta) => {
    if (groupRef.current && !pauseMotion && !isPreviewed && !isLocked) {
      angleRef.current += planet.orbitSpeed * delta;
      groupRef.current.position.x = Math.cos(angleRef.current) * planet.orbitRadius;
      groupRef.current.position.z = Math.sin(angleRef.current) * planet.orbitRadius;
    }

    if (labelsRef.current && (isPreviewed || isLocked) && !isLabelHovered && !pauseMotion) {
      labelsRef.current.rotation.y += delta * 0.65;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[
        Math.cos(orbitAngleOffset) * planet.orbitRadius,
        0,
        Math.sin(orbitAngleOffset) * planet.orbitRadius,
      ]}
    >
      <mesh>
        <sphereGeometry args={[planet.size, 32, 32]} />
        <meshStandardMaterial
          color={planet.color}
          roughness={0.4}
          metalness={0.6}
          emissive={planet.color}
          emissiveIntensity={0.15}
        />
      </mesh>

      <mesh
        onPointerEnter={(event) => {
          event.stopPropagation();
          isPlanetHoveredRef.current = true;
          previewPlanet();
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={(event) => {
          event.stopPropagation();
          isPlanetHoveredRef.current = false;
          scheduleBlur();
          document.body.style.cursor = "auto";
        }}
        onClick={(event) => {
          event.stopPropagation();
          const worldPosition = getWorldPosition();
          if (!worldPosition) return;

          onLock(planet.category, worldPosition);
        }}
      >
        <sphereGeometry args={[planet.size * 1.85, 24, 24]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <mesh scale={[1.25, 1.25, 1.25]}>
        <sphereGeometry args={[planet.size, 32, 32]} />
        <meshBasicMaterial
          color={planet.color}
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <Billboard>
        <Text
          position={[0, planet.size + 0.35, 0]}
          fontSize={0.18}
          color="#e2e8f0"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#000000"
        >
          {planet.category}
        </Text>
      </Billboard>

      <group ref={labelsRef}>
        {planet.skills.map((skill, index) => (
          <SkillLabel
            key={skill.name}
            skill={skill}
            position={moonPositions[index]}
            onHoverChange={(hovered) => {
              isLabelHoveredRef.current = hovered;
              onLabelHoverChange(planet.category, hovered);

              if (hovered) {
                previewPlanet();
              } else {
                scheduleBlur();
              }
            }}
          />
        ))}
      </group>
    </group>
  );
}

function OrbitRing({ radius }: { radius: number }) {
  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];

    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2;
      points.push(
        new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius)
      );
    }

    return new THREE.BufferGeometry().setFromPoints(points);
  }, [radius]);
  const material = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: "#334155",
        transparent: true,
        opacity: 0.3,
      }),
    []
  );
  const line = useMemo(() => new THREE.Line(geometry, material), [geometry, material]);

  useEffect(() => {
    return () => {
      material.dispose();
      geometry.dispose();
    };
  }, [geometry, material]);

  return <primitive object={line} />;
}

function SolarSystemContent({
  planets,
  pauseMotion,
}: {
  planets: PlanetData[];
  pauseMotion: boolean;
}) {
  const auraRef = useRef<THREE.Mesh>(null);
  const controlsRef = useRef<any>(null);
  const overPlanetCtx = useContext(PlanetFocusCtx);
  const focusTarget = useRef(new THREE.Vector3(0, 0, 0));
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));
  const [previewPlanetId, setPreviewPlanetId] = useState<string | null>(null);
  const [lockedPlanetId, setLockedPlanetId] = useState<string | null>(null);
  const [hoveredLabelPlanetId, setHoveredLabelPlanetId] = useState<string | null>(
    null
  );
  const activePlanetId = lockedPlanetId ?? previewPlanetId;

  const auraUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#3B82F6") },
    }),
    []
  );

  useEffect(() => {
    if (overPlanetCtx) {
      overPlanetCtx.current = lockedPlanetId !== null;
    }
  }, [lockedPlanetId, overPlanetCtx]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setLockedPlanetId(null);
      setPreviewPlanetId(null);
      setHoveredLabelPlanetId(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useFrame((state) => {
    if (auraRef.current) {
      (auraRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value =
        state.clock.elapsedTime;
    }

    if (!controlsRef.current) return;

    const destination = lockedPlanetId ? focusTarget.current : new THREE.Vector3(0, 0, 0);
    const lerpFactor = lockedPlanetId ? 0.12 : 0.05;

    currentTarget.current.lerp(destination, lerpFactor);
    controlsRef.current.target.copy(currentTarget.current);
    controlsRef.current.enableZoom = lockedPlanetId !== null;
    controlsRef.current.autoRotate =
      !pauseMotion && activePlanetId === null && hoveredLabelPlanetId === null;
    controlsRef.current.update();
  });

  const handlePreviewStart = useCallback((planetId: string, position: THREE.Vector3) => {
    if (lockedPlanetId && lockedPlanetId !== planetId) return;
    setPreviewPlanetId(planetId);
  }, [lockedPlanetId]);

  const handlePreviewEnd = useCallback((planetId: string) => {
    if (lockedPlanetId === planetId) return;
    setPreviewPlanetId((current) => (current === planetId ? null : current));
    setHoveredLabelPlanetId((current) => (current === planetId ? null : current));
  }, [lockedPlanetId]);

  const handleLock = useCallback((planetId: string, position: THREE.Vector3) => {
    focusTarget.current.copy(position);
    setLockedPlanetId((current) => (current === planetId ? null : planetId));
    setPreviewPlanetId(planetId);
  }, []);

  const handleLabelHover = useCallback((planetId: string, hovered: boolean) => {
    setHoveredLabelPlanetId((current) => {
      if (hovered) return planetId;
      return current === planetId ? null : current;
    });

    if (hovered) {
      setPreviewPlanetId((current) => lockedPlanetId ?? current ?? planetId);
    }
  }, [lockedPlanetId]);

  const angleStep = (Math.PI * 2) / planets.length;

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        zoomSpeed={0.8}
        minDistance={2}
        maxDistance={55}
        enablePan={false}
        autoRotate={!pauseMotion}
        autoRotateSpeed={0.4}
        enableDamping
        dampingFactor={0.08}
      />

      <group>
        <mesh>
          <sphereGeometry args={[1.5, 64, 64]} />
          <meshStandardMaterial color="#020617" roughness={0.8} metalness={0.2} />
        </mesh>

        <mesh ref={auraRef}>
          <sphereGeometry args={[2.0, 64, 64]} />
          <shaderMaterial
            uniforms={auraUniforms}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            vertexShader={`
              varying vec3 vNormal;

              void main() {
                vNormal = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `}
            fragmentShader={`
              varying vec3 vNormal;
              uniform vec3 uColor;
              uniform float uTime;

              void main() {
                float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 3.0);
                intensity *= 0.7 + sin(uTime * 1.5) * 0.3;
                gl_FragColor = vec4(uColor, intensity);
              }
            `}
          />
        </mesh>

        <Billboard>
          <Text
            position={[0, 2.1, 0]}
            fontSize={0.22}
            color="#93c5fd"
            anchorX="center"
            anchorY="middle"
          >
            Skills
          </Text>
        </Billboard>
      </group>

      {planets.map((planet, index) => (
        <group key={planet.category}>
          <OrbitRing radius={planet.orbitRadius} />
          <Planet
            planet={planet}
            orbitAngleOffset={angleStep * index}
            pauseMotion={pauseMotion}
            isPreviewed={previewPlanetId === planet.category}
            isLocked={lockedPlanetId === planet.category}
            isLabelHovered={hoveredLabelPlanetId === planet.category}
            onPreviewStart={handlePreviewStart}
            onPreviewEnd={handlePreviewEnd}
            onLock={handleLock}
            onLabelHoverChange={handleLabelHover}
          />
        </group>
      ))}
    </>
  );
}

export default function SkillsGalaxy({ planets, fallback }: SkillsGalaxyProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  const isLowPower = useIsLowPowerDevice();
  const [mounted, setMounted] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const overPlanetRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const element = wrapperRef.current;
    if (!element) return;

    const handler = (event: WheelEvent) => {
      if (!overPlanetRef.current) {
        event.stopImmediatePropagation();
        window.scrollBy({ top: event.deltaY, behavior: "auto" });
      }
    };

    element.addEventListener("wheel", handler, { capture: true, passive: false });
    return () => {
      element.removeEventListener("wheel", handler, { capture: true });
    };
  }, [mounted]);

  useEffect(() => {
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  if (!mounted) return <>{fallback}</>;
  if (!isDesktop || isLowPower || prefersReducedMotion) return <>{fallback}</>;

  return (
    <PlanetFocusCtx.Provider value={overPlanetRef}>
      <div ref={wrapperRef} className="relative h-[600px] w-full lg:h-[700px]">
        <SceneCanvas
          cameraPosition={[0, 6, 30]}
          fov={50}
          fallback={fallback}
          bgColor="transparent"
          className="rounded-2xl"
        >
          <SolarSystemContent planets={planets} pauseMotion={prefersReducedMotion} />
        </SceneCanvas>
      </div>
    </PlanetFocusCtx.Provider>
  );
}
