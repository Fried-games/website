"use client";

import { useEffect, useRef } from "react";
import styles from "../page.module.css";

// Background particles: a few dozen tiny squares moved by JS at a low, fixed
// frame rate. They drift slowly (~1px per frame at 20fps), so it looks smooth,
// while the browser only recomposites 20 times a second instead of at the
// display refresh rate (60-240Hz) as a CSS animation would.

const COUNT = 32;
const FPS = 20;

// Deterministic PRNG so server and client markup match.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(7);
const PARTICLES = Array.from({ length: COUNT }, () => ({
  left: rand() * 100, // % of viewport width
  size: rand() < 0.5 ? 3 : rand() < 0.7 ? 4 : 5,
  alpha: 0.2 + rand() * 0.35,
  duration: 60 + rand() * 80, // seconds to cross the screen
  offset: rand(), // starting point in the cycle, 0..1
  sway: (rand() - 0.5) * 40, // px of sideways drift over one crossing
}));

export default function ParticlesBg() {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const start = performance.now();
    const step = () => {
      if (document.hidden) return;
      const t = (performance.now() - start) / 1000;
      const travel = window.innerHeight + 20;
      PARTICLES.forEach((p, i) => {
        const el = refs.current[i];
        if (!el) return;
        const f = (t / p.duration + p.offset) % 1;
        el.style.transform = `translate3d(${Math.round(f * p.sway)}px, ${-Math.round(f * travel)}px, 0)`;
      });
    };
    step(); // place every particle on screen once

    // Respect the OS "reduce motion" setting: particles stay where they are.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(step, 1000 / FPS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className={styles.particles} aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className={styles.particle}
          style={{ left: `${p.left.toFixed(2)}%`, width: p.size, height: p.size, opacity: Number(p.alpha.toFixed(2)) }}
        />
      ))}
    </div>
  );
}
