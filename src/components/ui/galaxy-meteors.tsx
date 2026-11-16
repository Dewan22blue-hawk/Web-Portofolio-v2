"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

interface Meteor {
  id: number;
  top: string;
  left: string;
  delay: number;
  duration: number;
  length: number;
}

const STAR_COLORS = ["#ffffff", "#e0f2fe", "#bae6fd", "#7dd3fc", "#93c5fd"];

function seeded(index: number, salt: number) {
  const x = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export function GalaxyMeteors({
  starCount = 70,
  meteorCount = 9,
}: {
  starCount?: number;
  meteorCount?: number;
}) {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: seeded(i, 1) * 100,
      y: seeded(i, 2) * 100,
      size: 1 + seeded(i, 3) * 2.2,
      delay: seeded(i, 4) * 4,
      duration: 2.5 + seeded(i, 5) * 3.5,
      color: STAR_COLORS[i % STAR_COLORS.length],
    }));
  }, [starCount]);

  const meteors = useMemo<Meteor[]>(() => {
    return Array.from({ length: meteorCount }, (_, i) => ({
      id: i,
      top: `${-10 + seeded(i, 10) * 55}%`,
      left: `${10 + seeded(i, 11) * 85}%`,
      delay: seeded(i, 12) * 7,
      duration: 1.6 + seeded(i, 13) * 1.4,
      length: 90 + Math.round(seeded(i, 14) * 90),
    }));
  }, [meteorCount]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden z-0"
    >
      {/* Subtle Galaxy Nebula Glow */}
      <div className="absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full bg-blue-600/10 blur-[130px]" />
      <div className="absolute -bottom-32 -left-24 w-[480px] h-[480px] rounded-full bg-sky-500/10 blur-[130px]" />

      {/* Twinkling Galaxy Stars */}
      {stars.map((star) => (
        <motion.span
          key={star.id}
          animate={{
            opacity: [0.2, 0.95, 0.2],
            scale: [0.85, 1.2, 0.85],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            backgroundColor: star.color,
            boxShadow:
              star.size > 2.3 ? `0 0 6px ${star.color}` : undefined,
          }}
          className="absolute rounded-full"
        />
      ))}

      {/* Shooting Meteors */}
      {meteors.map((m) => (
        <motion.span
          key={m.id}
          initial={{ opacity: 0, x: 0, y: 0, rotate: -45 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: [-40, -520],
            y: [40, 520],
            rotate: -45,
          }}
          transition={{
            duration: m.duration,
            delay: m.delay,
            repeat: Infinity,
            repeatDelay: 3.5 + (m.id % 4) * 1.3,
            ease: "easeIn",
          }}
          style={{
            top: m.top,
            left: m.left,
            width: m.length,
          }}
          className="absolute h-[1.5px] rounded-full bg-gradient-to-r from-white via-sky-300/80 to-transparent shadow-[0_0_8px_rgba(56,189,248,0.85)]"
        >
          {/* Glowing Meteor Head */}
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_#38bdf8,0_0_18px_#2563eb]" />
        </motion.span>
      ))}
    </div>
  );
}

export default GalaxyMeteors;
