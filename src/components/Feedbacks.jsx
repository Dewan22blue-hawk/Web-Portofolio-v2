import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { testimonials, testimonialsId } from "../constants";
import { useLanguage } from "../context/LanguageContext";

const AUTO_ADVANCE_MS = 6500;

const Avatar = ({ src, name, sizeClass = "w-12 h-12", active = false }) => {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (failed || !src) {
    return (
      <div
        className={`${sizeClass} rounded-full flex items-center justify-center font-semibold text-xs text-sky-300 bg-blue-500/20 border shrink-0 ${
          active ? "border-sky-400" : "border-white/15"
        }`}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`${sizeClass} rounded-full object-cover border shrink-0 transition-colors duration-300 ${
        active ? "border-sky-400 ring-2 ring-sky-400/25" : "border-white/15"
      }`}
    />
  );
};

const quoteVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction >= 0 ? 28 : -28,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction >= 0 ? -28 : 28,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Feedbacks = () => {
  const { lang, t } = useLanguage();
  const activeTestimonials = lang === "id" ? testimonialsId : testimonials;
  const total = activeTestimonials.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const safeIndex = activeIndex < total ? activeIndex : 0;
  const current = activeTestimonials[safeIndex];

  const selectIndex = useCallback(
    (nextIndex) => {
      const normalized = (nextIndex + total) % total;
      if (normalized === safeIndex) return;
      setDirection(normalized > safeIndex ? 1 : -1);
      setActiveIndex(normalized);
    },
    [safeIndex, total]
  );

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (isPaused || total <= 1) return;
    const timer = setInterval(handleNext, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [isPaused, total, handleNext, safeIndex]);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      className="relative rounded-3xl border border-white/10 bg-[#0b132b]/70 backdrop-blur-xl p-6 sm:p-10 lg:p-12 shadow-[0_24px_70px_-15px_rgba(37,99,235,0.2)] overflow-hidden"
    >
      {/* Subtle Ambient Blue Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 w-72 h-72 rounded-full bg-blue-600/15 blur-3xl"
      />

      {/* Section Header & Controls */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>{t.feedbacks.sub}</p>
          <h2 className={styles.sectionHeadText}>{t.feedbacks.head}</h2>
        </motion.div>

        <div className="flex items-center gap-3 self-start sm:self-end">
          <span className="text-xs font-mono text-slate-400 tracking-wider mr-1">
            <span className="text-sky-300 font-semibold">
              0{safeIndex + 1}
            </span>{" "}
            / 0{total}
          </span>

          <button
            type="button"
            onClick={handlePrev}
            aria-label={t.feedbacks.prev}
            className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] hover:bg-blue-500/15 hover:border-sky-400/50 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label={t.feedbacks.next}
            className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] hover:bg-blue-500/15 hover:border-sky-400/50 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Spotlight Quote Stage */}
      <div className="relative z-10 mt-8 sm:mt-10 rounded-2xl p-[1px] bg-gradient-to-b from-sky-400/35 via-blue-500/15 to-white/5">
        <div className="relative rounded-[15px] bg-[#050816]/85 px-6 py-7 sm:px-10 sm:py-9 overflow-hidden">
          <Quote
            aria-hidden="true"
            className="w-8 h-8 sm:w-10 sm:h-10 text-sky-400/35 mb-4"
          />

          <div className="min-h-[140px] sm:min-h-[120px] flex flex-col justify-between">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`${lang}-${current.name}`}
                custom={direction}
                variants={quoteVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <blockquote className="text-base sm:text-xl lg:text-[22px] font-medium text-slate-100 leading-relaxed tracking-tight max-w-4xl">
                  “{current.testimonial}”
                </blockquote>

                <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-3.5">
                  <Avatar
                    src={current.image}
                    name={current.name}
                    sizeClass="w-11 h-11 sm:w-12 sm:h-12"
                    active
                  />
                  <div>
                    <p className="text-sm sm:text-base font-bold text-white tracking-tight">
                      {current.name}
                    </p>
                    <p className="text-xs sm:text-[13px] text-slate-400">
                      <span className="text-sky-400 font-medium">
                        {current.designation}
                      </span>{" "}
                      · {current.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Subtle Auto-Advance Progress Line */}
          {!isPaused && total > 1 && (
            <motion.div
              key={`progress-${safeIndex}-${lang}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: "linear" }}
              style={{ transformOrigin: "left" }}
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-sky-400 to-blue-400 opacity-75"
            />
          )}
        </div>
      </div>

      {/* Interactive Author Selector Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        {activeTestimonials.map((item, index) => {
          const isActive = index === safeIndex;
          return (
            <button
              key={item.name}
              type="button"
              onClick={() => selectIndex(index)}
              aria-pressed={isActive}
              className={`group relative text-left rounded-2xl border p-4 sm:p-5 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                isActive
                  ? "bg-slate-900/95 border-sky-400/50 shadow-[0_12px_32px_-12px_rgba(37,99,235,0.45)]"
                  : "bg-slate-900/45 border-white/10 hover:bg-slate-900/80 hover:border-white/25"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activeTestimonialAccent"
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  className="absolute top-0 left-5 right-5 h-[2px] rounded-full bg-gradient-to-r from-blue-500 via-sky-400 to-blue-500"
                />
              )}

              <div className="flex items-center gap-3">
                <Avatar
                  src={item.image}
                  name={item.name}
                  sizeClass="w-10 h-10"
                  active={isActive}
                />
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-sm font-semibold truncate transition-colors ${
                      isActive
                        ? "text-white"
                        : "text-slate-200 group-hover:text-white"
                    }`}
                  >
                    {item.name}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">
                    {item.designation} · {item.company}
                  </p>
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-400/90 line-clamp-2 leading-relaxed">
                “{item.testimonial}”
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "testimonials");
