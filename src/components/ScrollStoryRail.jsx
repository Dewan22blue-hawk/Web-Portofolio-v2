import React, { useEffect, useState, useMemo } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const ScrollStoryRail = () => {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState("hero");

  const CHAPTERS = useMemo(
    () => [
      { id: "hero", num: "01", label: t.chapters.hero },
      { id: "about", num: "02", label: t.chapters.about },
      { id: "work", num: "03", label: t.chapters.work },
      { id: "certificate", num: "04", label: t.chapters.certificate },
      { id: "projects", num: "05", label: t.chapters.projects },
      { id: "contact", num: "06", label: t.chapters.contact },
    ],
    [t]
  );
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  useEffect(() => {
    const updateActive = () => {
      if (window.scrollY < 260) {
        setActiveId("hero");
        return;
      }

      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 120;
      if (isBottom) {
        setActiveId("contact");
        return;
      }

      for (let i = CHAPTERS.length - 1; i >= 1; i--) {
        const el = document.getElementById(CHAPTERS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveId(CHAPTERS[i].id);
            return;
          }
        }
      }
      setActiveId("hero");
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, []);

  return (
    <aside
      aria-label="Story chapters"
      className="fixed left-5 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-start gap-4 select-none pointer-events-auto"
    >
      {/* Vertical Progress Track */}
      <div className="relative flex flex-col gap-5 pl-3">
        <div className="absolute left-[5px] top-1.5 bottom-1.5 w-[2px] bg-white/10 rounded-full overflow-hidden">
          <motion.div
            style={{ scaleY: smoothProgress, transformOrigin: "top" }}
            className="w-full h-full bg-gradient-to-b from-blue-500 via-sky-400 to-blue-400 shadow-[0_0_10px_#38bdf8]"
          />
        </div>

        {CHAPTERS.map((chapter) => {
          const isActive = activeId === chapter.id;
          return (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
              className="group relative flex items-center gap-3 py-0.5"
              aria-current={isActive ? "location" : undefined}
            >
              {/* Chapter Dot */}
              <span
                className={`relative -ml-[11px] flex h-2.5 w-2.5 items-center justify-center rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-sky-400 scale-125 shadow-[0_0_10px_#38bdf8]"
                    : "bg-slate-700 group-hover:bg-slate-400"
                }`}
              />

              {/* Chapter Number & Title */}
              <span
                className={`text-[11px] font-mono tracking-wider transition-all duration-300 ${
                  isActive
                    ? "text-sky-300 opacity-100 translate-x-0 font-semibold"
                    : "text-slate-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-slate-300"
                }`}
              >
                {chapter.num} · {chapter.label}
              </span>
            </a>
          );
        })}
      </div>
    </aside>
  );
};

export default ScrollStoryRail;

