"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useTranslations } from "next-intl";
import * as THREE from "three";

import { usePrefersReducedMotion } from "./use-device";

const COMMAND_FONT_SIZE = 0.12;
const HEADER_FONT_SIZE = 0.055;
const CHAR_WIDTH = 0.065;
const CURSOR_HEIGHT = 0.125;
const CURSOR_WIDTH = 0.022;

function renderVisibleSegment(text: string, visibleChars: number) {
  return visibleChars > 0 ? text.slice(0, visibleChars) : "";
}

export function MonitorHelloWorld3D() {
  const t = useTranslations("hero");
  const prefersReducedMotion = usePrefersReducedMotion();
  const commandText = t("monitorCommand");
  const outputText = t("monitorOutput");
  const segments = [
    { text: "console", color: "#9CA3AF" },
    { text: ".log", color: "#FFFFFF" },
    { text: "(", color: "#9CA3AF" },
    { text: `"${outputText}"`, color: "#06B6D4" },
    { text: ")", color: "#9CA3AF" },
  ] as const;
  const [typedCount, setTypedCount] = useState(
    prefersReducedMotion ? commandText.length : 0,
  );
  const [showOutput, setShowOutput] = useState(prefersReducedMotion);
  const cursorRef = useRef<THREE.Mesh>(null);
  const outputGlowRef = useRef<THREE.MeshStandardMaterial>(null);

  const visibleSegments = useMemo(() => {
    let remaining = typedCount;

    return segments.map((segment) => {
      const visibleText = renderVisibleSegment(segment.text, remaining);
      remaining = Math.max(0, remaining - segment.text.length);
      return {
        ...segment,
        visibleText,
      };
    });
  }, [segments, typedCount]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedCount(commandText.length);
      setShowOutput(true);
      return;
    }

    let timeoutId: number | null = null;

    const runLoop = () => {
      setTypedCount(0);
      setShowOutput(false);

      let current = 0;

      const typeNext = () => {
        if (current < commandText.length) {
          current += 1;
          setTypedCount(current);
          timeoutId = window.setTimeout(
            typeNext,
            40 + Math.floor(Math.random() * 21),
          );
          return;
        }

        timeoutId = window.setTimeout(() => {
          setShowOutput(true);
          timeoutId = window.setTimeout(runLoop, 6400);
        }, 400);
      };

      timeoutId = window.setTimeout(typeNext, 240);
    };

    runLoop();

    return () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [commandText, prefersReducedMotion]);

  useFrame((state) => {
    if (cursorRef.current) {
      if (prefersReducedMotion) {
        cursorRef.current.visible = true;
      } else {
        cursorRef.current.visible = Math.sin(state.clock.elapsedTime * 6) > 0;
      }
    }

    if (outputGlowRef.current) {
      outputGlowRef.current.emissiveIntensity = prefersReducedMotion
        ? 0.7
        : 0.6 + (Math.sin(state.clock.elapsedTime * 1.3) + 1) * 0.12;
    }
  });

  let typedBefore = 0;
  const commandLeft = -0.86;
  const commandY = 0.04;
  const outputY = -0.23;
  const cursorX = commandLeft + typedCount * CHAR_WIDTH + CURSOR_WIDTH * 0.5;

  return (
    <group position={[0, 0, 0.0425]}>
      <mesh position={[0, 0, -0.002]}>
        <planeGeometry args={[2.14, 1.18]} />
        <meshStandardMaterial
          color="#030712"
          emissive="#1D4ED8"
          emissiveIntensity={0.16}
          roughness={0.22}
          metalness={0.12}
        />
      </mesh>

      <mesh position={[0, 0, 0.001]}>
        <planeGeometry args={[2.16, 1.2]} />
        <meshBasicMaterial color="#94A3B8" transparent opacity={0.08} />
      </mesh>

      <mesh position={[0, 0.38, 0.002]}>
        <planeGeometry args={[2.14, 0.18]} />
        <meshStandardMaterial
          color="#0B1220"
          emissive="#0F172A"
          emissiveIntensity={0.08}
          roughness={0.35}
          metalness={0.1}
        />
      </mesh>

      <mesh position={[-0.9, 0.38, 0.01]}>
        <sphereGeometry args={[0.028, 18, 18]} />
        <meshStandardMaterial color="#FF5F57" emissive="#FF5F57" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[-0.82, 0.38, 0.01]}>
        <sphereGeometry args={[0.028, 18, 18]} />
        <meshStandardMaterial color="#FEBC2E" emissive="#FEBC2E" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[-0.74, 0.38, 0.01]}>
        <sphereGeometry args={[0.028, 18, 18]} />
        <meshStandardMaterial color="#28C840" emissive="#28C840" emissiveIntensity={0.2} />
      </mesh>

      <Text
        fontSize={HEADER_FONT_SIZE}
        color="#9CA3AF"
        anchorX="left"
        anchorY="middle"
        position={[-0.6, 0.38, 0.01]}
      >
        {t("monitorFileName")}
      </Text>

      {visibleSegments.map((segment) => {
        const currentX = commandLeft + typedBefore * CHAR_WIDTH;
        typedBefore += segment.text.length;

        return (
          <Text
            key={segment.text}
            fontSize={COMMAND_FONT_SIZE}
            color={segment.color}
            anchorX="left"
            anchorY="middle"
            position={[currentX, commandY, 0.01]}
          >
            {segment.visibleText}
          </Text>
        );
      })}

      <mesh ref={cursorRef} position={[cursorX, commandY - 0.004, 0.01]}>
        <planeGeometry args={[CURSOR_WIDTH, CURSOR_HEIGHT]} />
        <meshStandardMaterial
          color="#06B6D4"
          emissive="#06B6D4"
          emissiveIntensity={1}
          toneMapped={false}
        />
      </mesh>

      {showOutput ? (
        <group>
          <mesh position={[commandLeft + 0.34, outputY, 0.002]}>
            <planeGeometry args={[0.82, 0.18]} />
            <meshStandardMaterial
              ref={outputGlowRef}
              color="#0F172A"
              emissive="#3B82F6"
              emissiveIntensity={0.7}
              transparent
              opacity={0.34}
              toneMapped={false}
            />
          </mesh>
          <Text
            fontSize={COMMAND_FONT_SIZE}
            color="#FFFFFF"
            anchorX="left"
            anchorY="middle"
            position={[commandLeft, outputY, 0.01]}
          >
            {outputText}
          </Text>
        </group>
      ) : null}
    </group>
  );
}
