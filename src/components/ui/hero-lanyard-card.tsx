"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";
import { Move, RotateCw, Mail, ArrowUpRight } from "lucide-react";

export interface HeroLanyardLink {
  label: string;
  href: string;
}

export interface HeroLanyardCardProps {
  name: string;
  role: string;
  team?: string;
  image: string;
  bio?: string;
  tags?: string[];
  links?: HeroLanyardLink[];
  idNumber?: string;
  dragLabel?: string;
  flipLabel?: string;
}

const REST_LENGTH = 92; // px from top anchor bracket to card clip pivot

export function HeroLanyardCard({
  name = "Denny Irawan, S.Kom",
  role = "Full Stack Developer & IT Specialist",
  team = "UBSI · Bangkit '24",
  image,
  bio = "I build web apps with React, Laravel, and Node.js, and manage Linux servers, networks, and IT support.",
  tags = ["React", "Node.js", "Laravel", "SysAdmin"],
  links = [{ label: "Contact", href: "#contact" }],
  idNumber = "DEV-2024-081",
  dragLabel = "Drag & pull",
  flipLabel = "Click to flip",
}: HeroLanyardCardProps) {
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const dragStartPos = React.useRef({ x: 0, y: 0 });
  const cardRef = React.useRef<HTMLDivElement>(null);

  // Primary 2D drag position of the card's top clip relative to rest (0, 0)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Hover 3D tilt offsets (-0.5 to 0.5)
  const hoverX = useMotionValue(0);
  const hoverY = useMotionValue(0);

  // Smooth spring-damped hover tilt
  const smoothHoverX = useSpring(hoverX, { stiffness: 220, damping: 24 });
  const smoothHoverY = useSpring(hoverY, { stiffness: 220, damping: 24 });

  // Smoothed x for natural pendulum swing inertia
  const smoothX = useSpring(x, { stiffness: 160, damping: 14, mass: 0.9 });

  // Pendulum swing rotation around the top clip
  const swingRotate = useTransform(smoothX, [-160, 0, 160], [18, 0, -18]);

  // Combined 3D tilt (hover + drag momentum)
  const tiltRotateY = useTransform(
    [smoothHoverX, x],
    ([hx, dx]: number[]) => hx * 18 + (dx / 160) * 10
  );
  const tiltRotateX = useTransform(
    [smoothHoverY, y],
    ([hy, dy]: number[]) => -hy * 16 - (dy / 120) * 8
  );

  // Specular highlight position across card face
  const sheenX = useTransform(
    [smoothHoverX, smoothX],
    ([hx, dx]: number[]) => `${50 + hx * 40 + (dx / 160) * 25}%`
  );

  // Dynamic shadow offset opposite to card tilt/drag
  const shadowX = useTransform(x, [-140, 0, 140], [28, 0, -28]);
  const shadowY = useTransform(y, [-40, 0, 100], [14, 24, 42]);

  // Exact vector from top bracket (0, 0) to card clip (x, REST_LENGTH + y)
  // Using x and y directly ensures the cord NEVER detaches from the clip
  const strapAngle = useTransform([x, y], ([latestX, latestY]: number[]) => {
    const dy = Math.max(24, REST_LENGTH + latestY);
    return (Math.atan2(-latestX, dy) * 180) / Math.PI;
  });

  const strapLength = useTransform([x, y], ([latestX, latestY]: number[]) => {
    const dy = Math.max(24, REST_LENGTH + latestY);
    return Math.hypot(latestX, dy);
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: { velocity: { x: number; y: number } }
  ) => {
    setIsDragging(false);
    // Snap back to rest (0, 0) with realistic spring & flick velocity
    animate(x, 0, {
      type: "spring",
      stiffness: 170,
      damping: 12,
      mass: 0.9,
      velocity: info.velocity.x,
    });
    animate(y, 0, {
      type: "spring",
      stiffness: 210,
      damping: 15,
      mass: 0.9,
      velocity: info.velocity.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    hoverX.set((e.clientX - rect.left) / rect.width - 0.5);
    hoverY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    hoverX.set(0);
    hoverY.set(0);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    const dist = Math.hypot(
      e.clientX - dragStartPos.current.x,
      e.clientY - dragStartPos.current.y
    );
    if (dist < 8) {
      setIsFlipped((prev) => !prev);
      // Small physical impulse when flipping the card
      animate(x, isFlipped ? -10 : 10, {
        type: "spring",
        stiffness: 300,
        damping: 10,
      }).then(() => {
        animate(x, 0, { type: "spring", stiffness: 180, damping: 14 });
      });
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-start pt-4 pb-4 select-none w-full max-w-[360px] sm:max-w-[390px]">
      {/* Ambient Electric Blue Glow behind Lanyard */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.45, 0.75, 0.45],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-28 inset-x-4 h-96 rounded-full bg-gradient-to-tr from-blue-600/30 via-sky-400/20 to-indigo-600/20 blur-3xl -z-10 pointer-events-none"
      />

      {/* Hanging Stage: Anchor at top center (0, 0) */}
      <div
        className="relative flex flex-col items-center w-full"
        style={{ perspective: 1200 }}
      >
        {/* Fixed Top Rail Bracket (0, 0) */}
        <div className="relative z-30 flex flex-col items-center pointer-events-none">
          <div className="w-14 h-3.5 rounded-full bg-gradient-to-b from-slate-200 via-slate-400 to-slate-600 shadow-[0_4px_12px_rgba(0,0,0,0.7)] border border-white/40 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-500" />
          </div>
          {/* Metal D-Ring */}
          <div className="w-5 h-3 -mt-0.5 rounded-b-full border-2 border-slate-300/80 shadow-sm" />
        </div>

        {/* Dynamic Stretching Lanyard Strap + Retractable Cord */}
        <motion.div
          style={{
            rotate: strapAngle,
            height: strapLength,
            transformOrigin: "50% 0%",
          }}
          className="absolute top-3 z-20 w-8 flex flex-col items-center pointer-events-none"
        >
          {/* Woven Electric Blue Ribbon (Fixed 52px length) with Glow & Shimmer */}
          <div
            className="w-6 h-[52px] shrink-0 rounded-b-[2px] shadow-[0_0_18px_rgba(56,189,248,0.45)] relative overflow-hidden border-x border-sky-300/40"
            style={{
              background:
                "repeating-linear-gradient(135deg, rgba(255,255,255,0.16) 0 2px, transparent 2px 5px), linear-gradient(90deg, #1d4ed8 0%, #2563eb 25%, #38bdf8 50%, #2563eb 75%, #1e40af 100%)",
            }}
          >
            <div className="absolute inset-y-0 left-1 right-1 border-x border-dashed border-white/40" />
            <motion.div
              animate={{ y: ["-120%", "220%"] }}
              transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut" }}
              className="absolute inset-x-0 h-5 bg-gradient-to-b from-transparent via-white/55 to-transparent pointer-events-none"
            />
          </div>

          {/* Metal Crimp */}
          <div className="w-7 h-2 shrink-0 rounded-[2px] bg-gradient-to-r from-slate-500 via-slate-100 to-slate-500 shadow-[0_0_8px_rgba(255,255,255,0.35)] -mt-0.5" />

          {/* Retractable Reel with Pulsing Core Glow */}
          <div className="w-7 h-7 shrink-0 rounded-full bg-gradient-to-b from-slate-600 via-slate-900 to-black border border-sky-300/45 shadow-[0_0_16px_rgba(56,189,248,0.45)] flex items-center justify-center -mt-0.5 z-10">
            <motion.div
              animate={{ scale: [1, 1.25, 1], opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-blue-400 to-sky-200 shadow-[0_0_12px_#38bdf8]"
            />
          </div>

          {/* Luminous Retractable Cord */}
          <div className="w-[2px] flex-1 bg-gradient-to-b from-sky-200 via-sky-300 to-slate-200 shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
        </motion.div>

        {/* Draggable Card Assembly (origin at top clip: 50% 0%) */}
        <motion.div
          ref={cardRef}
          drag
          dragConstraints={{ top: -32, bottom: 95, left: -120, right: 120 }}
          dragElastic={0.35}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onPointerDown={handlePointerDown}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleCardClick}
          style={{
            x,
            y,
            rotate: swingRotate,
            marginTop: REST_LENGTH - 12,
            transformOrigin: "50% 0%",
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0, y: -28, rotate: -5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`relative z-30 w-[288px] sm:w-[316px] ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {/* Plastic Clip at Top Pivot (locked to cord end) */}
          <div className="relative z-40 mx-auto -mb-3 w-12 h-7 flex flex-col items-center pointer-events-none">
            <div className="w-8 h-4 rounded-t-md bg-gradient-to-b from-slate-200 to-slate-500 border border-white/40 shadow-md flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-400/50" />
            </div>
            <div className="w-5 h-3.5 bg-gradient-to-b from-slate-400 to-slate-700 rounded-b-sm shadow-md" />
          </div>

          {/* 3D Tilt + Flip Container */}
          <motion.div
            style={{
              rotateX: tiltRotateX,
              rotateY: tiltRotateY,
              transformStyle: "preserve-3d",
            }}
            whileHover={{ scale: 1.02 }}
            className="relative w-full aspect-[64/96]"
          >
            {/* Dynamic 3D Drop Shadow */}
            <motion.div
              style={{ x: shadowX, y: shadowY }}
              className="absolute inset-2 rounded-2xl bg-black/75 blur-2xl -z-10 pointer-events-none"
            />

            {/* 180-deg Flipping Body with Real 3D Thickness */}
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 18,
                mass: 0.9,
              }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative w-full h-full"
            >
              {/* 3D Extruded Side Edges (Real Card Thickness, responsive at any width) */}
              <div
                aria-hidden="true"
                style={{
                  transform: "translateZ(3px) rotateY(90deg)",
                  transformOrigin: "right center",
                  width: "6px",
                }}
                className="absolute inset-y-3 right-0 bg-gradient-to-b from-blue-400/70 via-slate-500 to-slate-800 pointer-events-none"
              />
              <div
                aria-hidden="true"
                style={{
                  transform: "translateZ(3px) rotateY(-90deg)",
                  transformOrigin: "left center",
                  width: "6px",
                }}
                className="absolute inset-y-3 left-0 bg-gradient-to-b from-blue-400/70 via-slate-500 to-slate-800 pointer-events-none"
              />

              {/* FRONT FACE */}
              <div
                style={{
                  backfaceVisibility: "hidden",
                  transform: "translateZ(3px)",
                }}
                className="absolute inset-0 rounded-2xl border border-sky-400/35 bg-[#0b132b]/95 backdrop-blur-xl shadow-[0_0_38px_-6px_rgba(37,99,235,0.55),0_0_18px_-4px_rgba(56,189,248,0.35),inset_0_1px_1px_rgba(255,255,255,0.3)] overflow-hidden flex flex-col items-center text-white"
              >
                {/* Electric Blue Header Band */}
                <div
                  className="w-full h-16 relative shrink-0 border-b border-sky-300/25 overflow-hidden"
                  style={{
                    background:
                      "repeating-linear-gradient(135deg, rgba(255,255,255,0.1) 0 8px, transparent 8px 12px), linear-gradient(135deg, #1d4ed8 0%, #2563eb 55%, #0ea5e9 100%)",
                  }}
                >
                  <div className="mx-auto mt-3 w-12 h-2 rounded-full bg-[#050816] shadow-inner border border-white/25" />
                  <span className="absolute bottom-1.5 right-3 text-[9px] font-mono tracking-widest text-white/80 uppercase">
                    PASS · 01
                  </span>
                </div>

                {/* Large, Prominent Portrait Photo Container with Luminous Rim */}
                <div className="-mt-6 relative z-10 w-[86%] h-[238px] sm:h-[260px] rounded-xl p-1 bg-gradient-to-b from-sky-300/75 via-blue-500/45 to-sky-400/20 shadow-[0_12px_30px_rgba(0,0,0,0.55),0_0_24px_-4px_rgba(56,189,248,0.45)]">
                  <div className="w-full h-full rounded-[10px] overflow-hidden bg-gradient-to-b from-slate-100 via-slate-200 to-slate-300 relative">
                    <img
                      src={image}
                      alt={name}
                      draggable={false}
                      className="w-full h-full object-cover object-top scale-[1.05] select-none pointer-events-none"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-slate-950/50 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Identity Text */}
                <div className="mt-2.5 px-3 text-center w-full">
                  <h3 className="text-base sm:text-lg font-bold tracking-tight text-white truncate">
                    {name}
                  </h3>
                  <p className="text-[11px] sm:text-xs font-medium text-sky-400 truncate mt-0.5">
                    {role}
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 mt-1 truncate">
                    {team}
                  </p>
                </div>

                {/* Bottom Barcode Strip */}
                <div className="mt-auto w-full px-5 pb-3 pt-2 border-t border-dashed border-white/10 flex flex-col items-center">
                  <div className="w-full h-4 flex items-stretch justify-between gap-[2px] opacity-75">
                    {[3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2, 1, 3, 1, 2, 4, 1, 2].map(
                      (w, idx) => (
                        <span
                          key={idx}
                          className="bg-slate-200 rounded-[0.5px]"
                          style={{ flexGrow: w }}
                        />
                      )
                    )}
                  </div>
                  <span className="mt-1 font-mono text-[9px] tracking-[0.28em] text-slate-400">
                    {idNumber}
                  </span>
                </div>

                {/* Interactive Dynamic Specular Sheen */}
                <motion.div
                  style={{ left: sheenX }}
                  className="pointer-events-none absolute inset-y-0 -translate-x-1/2 w-40 bg-gradient-to-r from-transparent via-white/[0.14] to-transparent skew-x-12"
                />

                {/* Periodic Holographic Shimmer Sweep */}
                <motion.div
                  animate={{ x: ["-160%", "260%"] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    repeatDelay: 3.2,
                    ease: "easeInOut",
                  }}
                  className="pointer-events-none absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-sky-200/20 to-transparent skew-x-12"
                />
              </div>

              {/* BACK FACE */}
              <div
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg) translateZ(3px)",
                }}
                className="absolute inset-0 rounded-2xl border border-sky-400/35 bg-[#0b132b]/95 backdrop-blur-xl shadow-[0_0_38px_-6px_rgba(37,99,235,0.55),0_0_18px_-4px_rgba(56,189,248,0.35),inset_0_1px_1px_rgba(255,255,255,0.3)] overflow-hidden flex flex-col text-white p-5 sm:p-6"
              >
                <div className="mx-auto mb-4 w-12 h-2 rounded-full bg-[#050816] shadow-inner border border-white/20 shrink-0" />

                <div className="border-b border-white/10 pb-3">
                  <h3 className="text-lg font-bold text-white">{name}</h3>
                  <p className="text-xs sm:text-sm text-sky-400 font-medium">{role}</p>
                </div>

                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-300">
                  {bio}
                </p>

                {/* Skill Chips */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-blue-500/15 border border-blue-400/25 text-sky-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom Links + QR */}
                <div className="mt-auto pt-4 border-t border-white/10 flex items-end justify-between gap-2">
                  <div className="flex flex-col gap-2">
                    {links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-200 hover:text-sky-400 transition-colors"
                      >
                        {/mail|contact/i.test(link.label) ? (
                          <Mail className="w-3.5 h-3.5 text-sky-400" />
                        ) : (
                          <ArrowUpRight className="w-3.5 h-3.5 text-sky-400" />
                        )}
                        {link.label}
                      </a>
                    ))}
                  </div>

                  {/* Crisp QR Code */}
                  <div className="w-16 h-16 p-1.5 rounded-lg bg-white text-slate-950 shrink-0 shadow">
                    <svg viewBox="0 0 21 21" className="w-full h-full fill-current">
                      <path d="M0 0h7v7H0zM2 2v3h3V2zM14 0h7v7h-7zM16 2v3h3V2zM0 14h7v7H0zM2 16v3h3v-3zM9 1h2v2H9zM9 5h2v4H9zM1 9h4v2H1zM7 9h4v2H7zM13 9h2v4h-2zM17 9h4v2h-4zM9 13h2v2H9zM13 15h2v2h-2zM17 13h4v4h-4zM15 19h2v2h-2zM19 19h2v2h-2zM9 17h4v4H9z" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Interactive Hint */}
      <div className="mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/75 border border-white/10 text-xs text-slate-400 backdrop-blur-sm shadow-sm">
        <Move className="w-3.5 h-3.5 text-sky-400" />
        <span>{dragLabel}</span>
        <span className="text-slate-600">·</span>
        <RotateCw className="w-3.5 h-3.5 text-sky-400" />
        <span>{flipLabel}</span>
      </div>
    </div>
  );
}

export default HeroLanyardCard;
