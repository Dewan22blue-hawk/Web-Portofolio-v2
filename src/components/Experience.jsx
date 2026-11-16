import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { styles } from "../styles";
import { experiences, experiencesId } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { useLanguage } from "../context/LanguageContext";

const ExperienceCard = ({ experience, index }) => {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex items-start md:items-center w-full pl-14 md:pl-0 ${
        isLeft ? "md:justify-start" : "md:justify-end"
      } group`}
    >
      {/* Center/Left Timeline Node with Company Icon */}
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-5 md:top-1/2 md:-translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0b132b] border-2 border-blue-500/70 group-hover:border-sky-400 p-2 flex items-center justify-center shadow-[0_0_18px_rgba(37,99,235,0.45)] group-hover:shadow-[0_0_24px_rgba(56,189,248,0.75)] transition-all duration-300 z-10">
        <img
          src={experience.icon}
          alt={experience.company_name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Opposite-Side Date & Location (Desktop only, like classic alternating timeline) */}
      <div
        className={`hidden md:flex flex-col gap-1.5 absolute top-1/2 -translate-y-1/2 w-[calc(50%-3.25rem)] ${
          isLeft ? "right-0 items-start text-left" : "left-0 items-end text-right"
        }`}
      >
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/25 text-xs font-semibold text-sky-300 shadow-sm">
          <Calendar className="w-3.5 h-3.5 text-sky-400" />
          {experience.date}
        </span>
        {experience.location && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            {experience.location}
          </span>
        )}
      </div>

      {/* Alternating Glassmorphism Card */}
      <div className="w-full md:w-[calc(50%-3.25rem)] rounded-2xl border border-white/10 bg-[#0b132b]/85 backdrop-blur-md p-5 sm:p-6 transition-all duration-300 group-hover:border-sky-400/45 group-hover:bg-[#0b132b]/95 group-hover:shadow-[0_16px_42px_-12px_rgba(37,99,235,0.4)]">
        {/* Card Header */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-sky-300 transition-colors">
            {experience.title}
          </h3>
          <p className="text-sm font-medium text-sky-400 mt-0.5">
            {experience.company_name}
          </p>

          {/* Mobile Date & Location Pills */}
          <div className="flex flex-wrap gap-2 mt-3 md:hidden">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/25 text-[11px] font-medium text-sky-300">
              <Calendar className="w-3 h-3 text-sky-400" />
              {experience.date}
            </span>
            {experience.location && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] text-slate-400">
                <MapPin className="w-3 h-3 text-slate-400" />
                {experience.location}
              </span>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="my-4 h-px w-full bg-gradient-to-r from-white/10 via-sky-400/20 to-transparent" />

        {/* Responsibilities List */}
        <ul className="space-y-2">
          {experience.points.map((point, idx) => (
            <li
              key={`experience-point-${idx}`}
              className="flex items-start gap-2.5 text-[13px] sm:text-sm text-slate-300/90 leading-relaxed"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0 shadow-[0_0_6px_#38bdf8]" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const { lang, t } = useLanguage();
  const activeExperiences = lang === "id" ? experiencesId : experiences;

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{t.experience.sub}</p>
        <h2 className={styles.sectionHeadText}>{t.experience.head}</h2>
      </motion.div>

      <div className="relative mt-14 max-w-6xl mx-auto">
        {/* Continuous Electric Blue Timeline Spine (Left on mobile, Center on desktop) */}
        <div
          aria-hidden="true"
          className="absolute left-[19px] md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-blue-500 via-sky-400/60 to-transparent rounded-full"
        />

        <div className="flex flex-col gap-10 sm:gap-12">
          {activeExperiences.map((experience, index) => (
            <ExperienceCard
              key={`${experience.title}-${experience.date}`}
              experience={experience}
              index={index}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
