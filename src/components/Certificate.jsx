import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Award } from "lucide-react";
import CertificateItems from "../constants/certificate";
import ModalBox from "../particles/ModalBox";
import { SectionWrapper } from "../hoc";
import { useLanguage } from "../context/LanguageContext";
import { styles } from "../styles";

function MyCertificateContent() {
  const [modalData, setModalData] = useState(null);
  const { t } = useLanguage();

  return (
    <div
      id="mycertificate"
      className="relative rounded-3xl border border-white/10 bg-[#0b132b]/70 backdrop-blur-xl p-6 sm:p-10 lg:p-12 shadow-[0_24px_70px_-15px_rgba(37,99,235,0.2)] overflow-hidden"
    >
      {/* Subtle Ambient Blue Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 w-72 h-72 rounded-full bg-blue-600/15 blur-3xl"
      />

      {/* Section Header */}
      <div className="relative z-10 flex flex-col items-start text-left max-w-2xl">
        <p className={styles.sectionSubText}>{t.certificate.sub}</p>
        <h2 className={styles.sectionHeadText}>
          {t.certificate.titlePre}{" "}
          <span className="bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent">
            {t.certificate.titleAccent}
          </span>
        </h2>
        <p className="mt-3 text-slate-300/90 text-sm sm:text-base leading-relaxed">
          {t.certificate.subtitle}
        </p>
      </div>

      {/* Interactive Certificate Category Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {CertificateItems.map((item, index) => (
          <motion.button
            key={item.name}
            type="button"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            whileHover={{ y: -5 }}
            onClick={() => {
              setModalData(item);
              window.my_modal?.showModal();
            }}
            className="group relative text-left rounded-2xl border border-white/10 bg-slate-900/70 hover:bg-slate-900/95 hover:border-sky-400/45 p-6 transition-all duration-300 hover:shadow-[0_14px_38px_-10px_rgba(37,99,235,0.45)] flex flex-col justify-between gap-6 cursor-pointer"
          >
            {/* Top Row: Icon + Count Pill */}
            <div className="flex items-start justify-between gap-4 w-full">
              <div className="w-13 h-13 p-3 rounded-2xl bg-blue-500/10 border border-sky-400/25 text-sky-400 text-3xl flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-500/20 group-hover:border-sky-400/50 transition-all duration-300">
                <i className={item.icon} />
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-xs font-semibold text-sky-300">
                <Award className="w-3.5 h-3.5 text-sky-400" />
                {item.items.length} {t.certificate.countSuffix}
              </span>
            </div>

            {/* Bottom Row: Category Name + Action Hint */}
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-sky-300 transition-colors">
                {item.name}
              </h3>
              <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 group-hover:text-sky-400 transition-colors">
                <span>{t.certificate.viewAction}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <ModalBox modalData={modalData} />
    </div>
  );
}

export default SectionWrapper(MyCertificateContent, "certificate");
