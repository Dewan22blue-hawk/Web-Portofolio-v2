import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { useLanguage } from "../context/LanguageContext";

const ServiceCard = ({ title, desc, index, icon }) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.15, 0.65)}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-sky-400/30 via-blue-500/15 to-white/5 hover:from-sky-400/70 hover:via-blue-500/40 transition-all duration-300"
    >
      <div className="h-full rounded-[15px] bg-[#0b132b]/90 backdrop-blur-md px-6 py-7 flex flex-col items-center text-center justify-between gap-4 group-hover:shadow-[0_14px_38px_-10px_rgba(37,99,235,0.45)] transition-all duration-300">
        {/* Top subtle accent line */}
        <div className="w-10 h-1 rounded-full bg-gradient-to-r from-blue-600 to-sky-400 opacity-60 group-hover:w-16 group-hover:opacity-100 transition-all duration-300" />

        {/* Icon inside glowing obsidian badge */}
        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-sky-400/20 flex items-center justify-center group-hover:border-sky-400/50 group-hover:bg-blue-500/20 group-hover:scale-105 transition-all duration-300 shadow-inner">
          <img
            src={icon}
            alt={title}
            className="object-contain w-10 h-10 drop-shadow-[0_4px_10px_rgba(56,189,248,0.25)]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <h3 className="text-white text-lg font-bold tracking-tight group-hover:text-sky-300 transition-colors">
            {title}
          </h3>
          {desc && (
            <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed">
              {desc}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const About = () => {
  const { t } = useLanguage();

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{t.about.sub}</p>
        <h2 className={styles.sectionHeadText}>{t.about.head}</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 0.8)}
        className="mt-4 text-slate-300/90 text-base sm:text-[17px] max-w-3xl leading-[30px]"
      >
        {t.about.body}
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {services.map((service, index) => {
          const localized = t.about.services?.[index];
          return (
            <ServiceCard
              key={service.title}
              index={index}
              icon={service.icon}
              title={localized?.title ?? service.title}
              desc={localized?.desc}
            />
          );
        })}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
