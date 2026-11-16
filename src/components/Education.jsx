import React, { useLayoutEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Award, Calendar, GraduationCap, MapPin, ArrowRight } from "lucide-react";
import { styles } from "../styles";
import { educations, educationsId } from "../constants";
import { useLanguage } from "../context/LanguageContext";

const EducationMilestone = ({ item, index, total, progress, onSelect }) => {
  // Milestone 0 rests from 0.00 to 0.08
  // Milestone 1 centers around 0.48
  // Milestone (total - 1) centers by 0.88 and rests through 1.00
  const isFirst = index === 0;
  const isLast = index === total - 1;

  // Calculate normalized focus target for this card within the [0.08, 0.88] scroll range
  const center = total > 1 ? 0.08 + (index / (total - 1)) * 0.8 : 0.5;
  const leadStart = Math.max(0, center - 0.22);
  const focusStart = Math.max(0, center - 0.04);
  const trailEnd = Math.min(1, center + 0.22);

  // Vertical stem line connecting the rail node down to the card
  const stemScaleY = useTransform(
    progress,
    isFirst ? [0, 0.05] : [leadStart, focusStart],
    isFirst ? [1, 1] : [0, 1]
  );

  // Card opacity: focused card is 1.0, unfocused is 0.35, last card stays 1.0 to end
  const cardOpacity = useTransform(
    progress,
    isFirst
      ? [0, 0.2, trailEnd]
      : isLast
      ? [leadStart, focusStart, 1]
      : [leadStart, focusStart, trailEnd],
    isFirst
      ? [1, 1, 0.35]
      : isLast
      ? [0.35, 1, 1]
      : [0.35, 1, 0.35]
  );

  // Subtle lift as the card comes to center
  const cardY = useTransform(
    progress,
    isFirst ? [0, 0.05] : isLast ? [leadStart, focusStart, 1] : [leadStart, focusStart, trailEnd],
    isFirst ? [0, 0] : isLast ? [16, 0, 0] : [16, 0, 16]
  );

  // Subtle scale highlight at center
  const cardScale = useTransform(
    progress,
    isFirst
      ? [0, 0.25]
      : isLast
      ? [leadStart, focusStart, 1]
      : [leadStart, center, trailEnd],
    isFirst
      ? [1, 0.95]
      : isLast
      ? [0.95, 1, 1]
      : [0.95, 1, 0.95]
  );

  return (
    <div
      data-milestone={index}
      className="relative flex flex-col items-center shrink-0 w-[min(88vw,420px)] sm:w-[440px]"
    >
      {/* Milestone Node on the Horizontal Storyline Rail */}
      <button
        type="button"
        onClick={() => onSelect && onSelect(index)}
        aria-label={`Jump to milestone 0${index + 1}`}
        className="group relative z-20 flex items-center justify-center w-10 h-10 rounded-full bg-[#050816] border-2 border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.65)] hover:scale-110 hover:border-sky-300 transition-transform duration-200 cursor-pointer"
      >
        <span className="text-xs font-mono font-bold text-sky-300 group-hover:text-white transition-colors">
          0{index + 1}
        </span>
      </button>

      {/* Animated Stem Drawing Downward from Rail Node to Card */}
      <motion.div
        style={{ scaleY: stemScaleY, transformOrigin: "top" }}
        className="w-[2px] h-6 sm:h-8 bg-gradient-to-b from-sky-400 via-blue-500 to-blue-500/20 shadow-[0_0_10px_rgba(56,189,248,0.6)]"
      />

      {/* Milestone Card */}
      <motion.article
        style={{ opacity: cardOpacity, y: cardY, scale: cardScale }}
        className="w-full rounded-2xl p-[1px] bg-gradient-to-b from-sky-400/40 via-blue-500/20 to-white/5 shadow-[0_20px_50px_-15px_rgba(37,99,235,0.35)]"
      >
        <div className="rounded-[15px] bg-[#0b132b]/95 backdrop-blur-xl p-5 sm:p-6 flex flex-col gap-3.5">
          {/* Header Row: Icon + Honors Badge */}
          <div className="flex items-start justify-between gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-sky-400/25 p-2 flex items-center justify-center shrink-0">
              {item.icon ? (
                <img
                  src={item.icon}
                  alt={item.institution}
                  className="w-full h-full object-contain"
                />
              ) : (
                <GraduationCap className="w-6 h-6 text-sky-400" />
              )}
            </div>

            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border ${
                item.highlight
                  ? "bg-emerald-500/10 border-emerald-400/30 text-emerald-300"
                  : "bg-blue-500/10 border-blue-400/25 text-sky-300"
              }`}
            >
              <Award className="w-3.5 h-3.5 shrink-0" />
              <span>{item.status}</span>
            </span>
          </div>

          {/* Degree & Institution */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
              {item.degree}
            </h3>
            <p className="text-xs sm:text-sm font-medium text-sky-400 mt-0.5">
              {item.institution}
            </p>

            {/* Period & Location Pills */}
            <div className="flex flex-wrap gap-2 mt-2.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/25 text-[11px] font-medium text-sky-300">
                <Calendar className="w-3 h-3 text-sky-400" />
                {item.period}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] text-slate-400">
                <MapPin className="w-3 h-3 text-slate-400" />
                {item.location}
              </span>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-white/10 via-sky-400/25 to-transparent" />

          {/* Description Copy */}
          <div className="space-y-2.5 text-xs sm:text-[13px] text-slate-300/90 leading-relaxed max-h-[170px] sm:max-h-none overflow-y-auto pr-1">
            {item.descriptions.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>
      </motion.article>
    </div>
  );
};

const Education = () => {
  const { lang, t } = useLanguage();
  const activeEducations = lang === "id" ? educationsId : educations;
  const total = activeEducations.length;

  const containerRef = useRef(null);
  const trackRef = useRef(null);

  // Exact metrics measured from actual DOM rendering
  const [metrics, setMetrics] = useState({
    cardWidth: 440,
    travelDistance: 980,
    paddingX: typeof window !== "undefined" ? Math.max(20, (window.innerWidth - 440) / 2) : 200,
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Snappy spring that eliminates excessive inertia and lag
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  // Precise DOM measurement of card dimensions and travel distance
  const updateMetrics = useCallback(() => {
    if (!trackRef.current) return;
    const items = trackRef.current.querySelectorAll("[data-milestone]");
    if (items.length < 2) return;

    const first = items[0];
    const last = items[items.length - 1];
    const cardWidth = first.offsetWidth;
    const vw = window.innerWidth;
    const paddingX = Math.max(20, (vw - cardWidth) / 2);
    const travel = Math.max(0, last.offsetLeft - first.offsetLeft);

    setMetrics({
      cardWidth,
      travelDistance: travel,
      paddingX,
    });
  }, []);

  useLayoutEffect(() => {
    updateMetrics();
    window.addEventListener("resize", updateMetrics);
    return () => window.removeEventListener("resize", updateMetrics);
  }, [updateMetrics, activeEducations.length, lang]);

  // Transform mapping:
  // [0.00, 0.08]: Card 01 rests dead center
  // [0.08, 0.88]: Smooth glide across cards
  // [0.88, 1.00]: Card 03 rests dead center with zero horizontal cut-off!
  const trackX = useTransform(
    smoothProgress,
    [0, 0.08, 0.88, 1],
    [0, 0, -metrics.travelDistance, -metrics.travelDistance]
  );

  // Storyline rail connecting fill from node 01 to node 03
  const railFillScaleX = useTransform(smoothProgress, [0.08, 0.88], [0, 1], {
    clamp: true,
  });

  // Interactive jump to milestone when clicking node
  const handleSelectMilestone = (index) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const scrollableDistance = containerRef.current.offsetHeight - window.innerHeight;
    const targetProgress = index === 0 ? 0 : index === total - 1 ? 0.92 : 0.08 + (index / (total - 1)) * 0.8;
    window.scrollTo({
      top: containerTop + targetProgress * scrollableDistance,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={containerRef}
      id="education"
      className="relative w-full h-[200vh] sm:h-[220vh] bg-primary"
    >
      {/* Pinned Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-x-clip">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-16 mb-4 sm:mb-6">
          <div className="h-[1px] w-full max-w-xs mb-4 bg-gradient-to-r from-blue-600 via-sky-400 to-transparent opacity-60" />
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className={styles.sectionSubText}>{t.education.sub}</p>
              <h2 className={styles.sectionHeadText}>{t.education.head}</h2>
            </div>

            {/* Scroll Hint & Section Progress Bar */}
            <div className="flex flex-col items-start sm:items-end gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-400/90">
                <span>{t.education.hint}</span>
                <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
              </span>
              <div className="w-36 h-1 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  style={{ scaleX: smoothProgress, transformOrigin: "left" }}
                  className="w-full h-full bg-gradient-to-r from-blue-500 to-sky-400 shadow-[0_0_8px_#38bdf8]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Storyline Track with dynamic exact centering padding */}
        <div className="relative w-full overflow-x-clip">
          <motion.div
            ref={trackRef}
            style={{
              x: trackX,
              paddingLeft: `${metrics.paddingX}px`,
              paddingRight: `${metrics.paddingX}px`,
            }}
            className="relative flex items-start gap-6 sm:gap-10 w-max"
          >
            {/* Continuous Horizontal Storyline Rail Connecting Node 01 to Node 03 */}
            <div
              aria-hidden="true"
              style={{
                left: `${metrics.paddingX + metrics.cardWidth / 2}px`,
                width: `${metrics.travelDistance}px`,
              }}
              className="absolute top-[19px] h-[2px] bg-white/10 rounded-full overflow-hidden"
            >
              <motion.div
                style={{ scaleX: railFillScaleX, transformOrigin: "left" }}
                className="w-full h-full bg-gradient-to-r from-blue-600 via-sky-400 to-blue-400 shadow-[0_0_12px_#38bdf8]"
              />
            </div>

            {activeEducations.map((item, index) => (
              <EducationMilestone
                key={`${item.degree}-${item.period}`}
                item={item}
                index={index}
                total={total}
                progress={smoothProgress}
                onSelect={handleSelectMilestone}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
