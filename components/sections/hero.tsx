"use client";

import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroVisual } from "@/components/hero-visual";
import { Reveal } from "@/components/reveal";
import { SOCIALS } from "@/lib/data";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

const ParticleField = dynamic(() => import("@/components/three/ParticleField"), {
  ssr: false,
});

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden hero-mesh"
    >
      <ParticleField />
      <div aria-hidden className="absolute inset-0 grid-pattern" />
      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 pb-20 pt-28 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <Reveal>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-cyan">
              <span className="size-1.5 rounded-full bg-cyan" />
              Software Engineer
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Enrique Ferreiro
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-5 max-w-xl text-pretty font-mono text-sm text-muted-foreground sm:text-base">
              DDD • CQRS • Event-Driven • Next.js • TypeScript • Python
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <a href="#projects">View Projects</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={SOCIALS.resume}>
                  <Download className="size-4" />
                  Download CV
                </a>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <a href="#contact">Contact Me</a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-8 flex items-center gap-3">
              <a
                href={SOCIALS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-blue/60 hover:text-foreground"
              >
                <Github className="size-5" />
              </a>
              <a
                href={SOCIALS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-blue/60 hover:text-foreground"
              >
                <Linkedin className="size-5" />
              </a>
              <a
                href={`mailto:${SOCIALS.email}`}
                aria-label="Send email"
                className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-blue/60 hover:text-foreground"
              >
                <Mail className="size-5" />
              </a>
            </div>
          </Reveal>
        </div>

        {/* 3D Scene / Visual Surface */}
        <Reveal delay={200} className="w-full lg:max-w-xl lg:justify-self-end">
          <Suspense fallback={<HeroVisual />}>
            <HeroScene fallback={<HeroVisual />}>
              <div className="flex h-full w-full flex-col justify-center gap-6 p-8 text-left">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="size-4 rounded-full bg-[#FF5F57]" />
                  <span className="size-4 rounded-full bg-[#FEBC2E]" />
                  <span className="size-4 rounded-full bg-[#28C840]" />
                  <span className="ml-2 font-mono text-lg text-white/50">
                    portfolio.tsx
                  </span>
                </div>
                <div className="flex-1 pt-4">
                  <h2 className="mb-4 text-5xl font-bold tracking-tight text-white sm:text-6xl">
                    Enrique Ferreiro
                  </h2>
                  <p className="flex items-center gap-3 font-mono text-2xl text-cyan sm:text-3xl">
                    <span className="text-purple-400">const</span> role ={" "}
                    <span className="text-green-400">
                      "Software Engineer"
                    </span>
                    ;
                    <span className="ml-2 inline-block size-6 animate-pulse bg-cyan/80" />
                  </p>
                </div>
              </div>
            </HeroScene>
          </Suspense>
        </Reveal>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground sm:flex"
        aria-label="Scroll to explore"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.2em]">
          Scroll to explore
        </span>
        <ArrowDown className="size-4 animate-bounce" />
      </a>
    </section>
  );
}
