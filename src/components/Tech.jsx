import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { styles } from "../styles";
import { useLanguage } from "../context/LanguageContext";

const LiquidTechBubble = ({ technology, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [18, -18]), {
    stiffness: 220,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), {
    stiffness: 220,
    damping: 18,
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      className="group flex flex-col items-center gap-3"
      style={{ perspective: 800 }}
    >
      {/* Gentle staggered water-bobbing animation */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 3.4 + (index % 4) * 0.5,
          delay: index * 0.18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={{
            scale: 1.09,
            borderRadius: [
              "50%",
              "47% 53% 51% 49% / 52% 48% 52% 48%",
              "52% 48% 47% 53% / 48% 53% 47% 52%",
              "50%",
            ],
          }}
          whileTap={{ scale: 0.92 }}
          transition={{
            scale: { type: "spring", stiffness: 320, damping: 16 },
            borderRadius: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            background:
              "radial-gradient(120% 120% at 28% 22%, rgba(255,255,255,0.34) 0%, rgba(56,189,248,0.22) 38%, rgba(37,99,235,0.18) 72%, rgba(5,8,22,0.65) 100%)",
            boxShadow:
              "inset 0 2px 5px rgba(255,255,255,0.75), inset 0 -8px 16px rgba(37,99,235,0.45), inset 0 0 0 1px rgba(186,230,253,0.4), 0 12px 26px -8px rgba(37,99,235,0.45)",
          }}
          className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full backdrop-blur-md flex items-center justify-center cursor-pointer select-none"
        >
          {/* Top-left glossy water droplet specular highlight */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-2.5 left-4 w-7 h-3.5 rounded-full bg-gradient-to-b from-white/80 to-white/10 -rotate-25 blur-[0.5px]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-6 left-3 w-2 h-2 rounded-full bg-white/70"
          />

          {/* Bottom caustic light pool */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2 inset-x-6 h-3 rounded-full bg-sky-300/35 blur-sm group-hover:bg-sky-300/60 transition-colors"
          />

          {/* 3D Floating Tech Icon inside the water bubble */}
          <div
            style={{ transform: "translateZ(22px)" }}
            className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center"
          >
            <img
              src={technology.icon}
              alt={technology.name}
              loading="lazy"
              draggable={false}
              className="w-full h-full object-contain rounded-lg drop-shadow-[0_6px_12px_rgba(0,0,0,0.55)] transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </motion.div>
      </motion.div>

      <span className="text-xs font-medium text-slate-400 group-hover:text-sky-300 transition-colors capitalize tracking-wide">
        {technology.name}
      </span>
    </motion.div>
  );
};

const Tech = () => {
  const { t } = useLanguage();
  return (
    <>
      <div className="mb-12 text-center sm:text-left">
        <p className={styles.sectionSubText}>{t.tech.sub}</p>
        <h2 className={styles.sectionHeadText}>{t.tech.head}</h2>
      </div>

      <div className="flex flex-row flex-wrap justify-center gap-7 sm:gap-10">
        {technologies.map((technology, index) => (
          <LiquidTechBubble
            key={technology.name}
            technology={technology}
            index={index}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
