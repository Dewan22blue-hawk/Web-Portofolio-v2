import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="max-w-7xl mx-auto px-6 sm:px-16 pt-2 pb-24 sm:pb-8 relative z-10 overflow-hidden">
      <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-[13px] text-slate-400">
        <p className="text-center sm:text-left">
          &copy; {new Date().getFullYear()} {t.footer.rights}
        </p>

        <p className="flex items-center gap-1.5 text-slate-300">
          <span>{t.footer.builtBy}</span>
          <motion.span
            className="inline-block"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{
              duration: 0.85,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          >
            ❤️
          </motion.span>
        </p>

        <button
          type="button"
          onClick={handleScrollTop}
          aria-label={t.footer.backToTop}
          className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0b132b]/85 border border-white/10 hover:border-sky-400/50 hover:bg-blue-500/15 text-xs font-medium text-slate-300 hover:text-white transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          <span>{t.footer.backToTop}</span>
          <ArrowUp className="w-3.5 h-3.5 text-sky-400 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Subtle Editorial Signature Wordmark */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
        className="mt-8 sm:mt-10 select-none pointer-events-none text-center"
      >
        <p className="font-black uppercase tracking-[0.06em] leading-[0.88] text-[clamp(2.2rem,9.2vw,7.25rem)] bg-gradient-to-b from-white/[0.12] via-sky-300/[0.06] to-transparent bg-clip-text text-transparent whitespace-nowrap">
          DENNY IRAWAN
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
