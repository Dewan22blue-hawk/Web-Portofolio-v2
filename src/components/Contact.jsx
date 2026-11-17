import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { send } from "@emailjs/browser";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  Globe,
  Loader2,
  Mail,
  MessageSquare,
  Send,
  User,
  X,
} from "lucide-react";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { EarthCanvas } from "./canvas";
import { useLanguage } from "../context/LanguageContext";

const EMAILJS_SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_hotm9y3";
const EMAILJS_TEMPLATE_ID_AUTOREPLY =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID_AUTOREPLY || "template_d59ay6m";
const EMAILJS_PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "1xm0TVbKRBtfairDe";

const DIRECT_EMAIL = "dennyirawan170204@gmail.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Contact = () => {
  const formRef = useRef(null);
  const { t } = useLanguage();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (feedbackMessage) setFeedbackMessage("");
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(DIRECT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${DIRECT_EMAIL}`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedbackMessage("");

    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const trimmedMessage = form.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setIsSuccess(false);
      setFeedbackMessage(t.contact.validationRequired);
      return;
    }

    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setIsSuccess(false);
      setFeedbackMessage(t.contact.validationEmail);
      return;
    }

    setLoading(true);

    try {
      await send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID_AUTOREPLY,
        {
          from_name: trimmedName,
          to_name: "Denny",
          from_email: trimmedEmail,
          to_email: DIRECT_EMAIL,
          message: trimmedMessage,
        },
        EMAILJS_PUBLIC_KEY
      );

      setIsSuccess(true);
      setFeedbackMessage(t.contact.successMsg);
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("FAILED to send message:", error);
      setIsSuccess(false);

      if (
        error?.status === 422 &&
        error?.text &&
        (error.text.includes("recipients address is empty") ||
          error.text.includes("recipients address is corrupted"))
      ) {
        setFeedbackMessage(t.contact.errorConfig);
      } else {
        setFeedbackMessage(t.contact.errorGeneric);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col-reverse xl:flex-row gap-8 lg:gap-10 items-stretch">
      {/* Left: Obsidian Glass Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="flex-[0.8] rounded-3xl p-[1px] bg-gradient-to-b from-sky-400/35 via-blue-500/15 to-white/5 shadow-[0_24px_70px_-15px_rgba(37,99,235,0.25)]"
      >
        <div className="relative h-full rounded-[23px] bg-[#0b132b]/85 backdrop-blur-xl p-6 sm:p-8 lg:p-10 overflow-hidden">
          {/* Subtle Top-Right Ambient Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-600/15 blur-3xl"
          />

          <div className="relative z-10">
            <p className={styles.sectionSubText}>{t.contact.sub}</p>
            <h3 className={styles.sectionHeadText}>{t.contact.head}</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300/85 leading-relaxed max-w-lg">
              {t.contact.intro}
            </p>

            {/* Quick Direct Contact Chips */}
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-blue-500/15 border border-white/10 hover:border-sky-400/45 text-xs font-medium text-slate-200 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-sky-400" />
                )}
                <span>{copied ? t.contact.copied : DIRECT_EMAIL}</span>
              </button>

              <a
                href="https://wa.me/6285237545993"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-400/25 hover:border-emerald-400/50 text-xs font-medium text-emerald-300 transition-all duration-200"
              >
                <i className="ri-whatsapp-line text-sm leading-none" />
                <span>WhatsApp</span>
              </a>

              <a
                href="https://www.linkedin.com/in/denny-irawan22"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-400/25 hover:border-sky-400/50 text-xs font-medium text-sky-300 transition-all duration-200"
              >
                <i className="ri-linkedin-fill text-sm leading-none" />
                <span>LinkedIn</span>
              </a>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-5 mt-7"
            >
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <label htmlFor="contact-name" className="flex flex-col gap-2">
                  <span className="text-xs sm:text-sm font-medium text-slate-200">
                    {t.contact.nameLabel}
                  </span>
                  <div className="relative">
                    <User
                      aria-hidden="true"
                      className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t.contact.namePlaceholder}
                      required
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#050816]/85 border border-white/10 focus:border-sky-400/70 focus:ring-2 focus:ring-sky-400/20 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-200"
                    />
                  </div>
                </label>

                <label htmlFor="contact-email" className="flex flex-col gap-2">
                  <span className="text-xs sm:text-sm font-medium text-slate-200">
                    {t.contact.emailLabel}
                  </span>
                  <div className="relative">
                    <Mail
                      aria-hidden="true"
                      className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t.contact.emailPlaceholder}
                      required
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#050816]/85 border border-white/10 focus:border-sky-400/70 focus:ring-2 focus:ring-sky-400/20 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-200"
                    />
                  </div>
                </label>
              </div>

              {/* Message Textarea */}
              <label htmlFor="contact-message" className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-medium text-slate-200">
                    {t.contact.messageLabel}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    {form.message.length} chars
                  </span>
                </div>
                <div className="relative">
                  <MessageSquare
                    aria-hidden="true"
                    className="w-4 h-4 text-slate-400 absolute left-3.5 top-4 pointer-events-none"
                  />
                  <textarea
                    rows={5}
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t.contact.messagePlaceholder}
                    required
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#050816]/85 border border-white/10 focus:border-sky-400/70 focus:ring-2 focus:ring-sky-400/20 text-sm text-white placeholder:text-slate-500 outline-none resize-y min-h-[130px] transition-all duration-200"
                  />
                </div>
              </label>

              {/* Animated Status Banner */}
              <AnimatePresence>
                {feedbackMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.22 }}
                    role="status"
                    aria-live="polite"
                    className={`flex items-start justify-between gap-3 px-4 py-3 rounded-xl border text-xs sm:text-sm ${
                      isSuccess
                        ? "bg-emerald-500/10 border-emerald-400/35 text-emerald-200"
                        : "bg-rose-500/10 border-rose-400/35 text-rose-200"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {isSuccess ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      )}
                      <span className="leading-relaxed">{feedbackMessage}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setFeedbackMessage("")}
                      aria-label="Dismiss notification"
                      className="text-current/70 hover:text-white transition-colors shrink-0 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <div className="pt-1 flex items-center justify-between gap-4">
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-sm font-semibold text-white shadow-[0_10px_28px_-6px_rgba(37,99,235,0.6)] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{t.contact.sending}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{t.contact.send}</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>

      {/* Right: Open 3D Earth Canvas (No Card Wrapper) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative xl:flex-1 h-[360px] sm:h-[460px] xl:h-auto min-h-[360px] flex items-center justify-center"
      >
        {/* Soft Ambient Orbital Halo */}
        <motion.div
          aria-hidden="true"
          animate={{ opacity: [0.55, 0.9, 0.55], scale: [0.96, 1.04, 0.96] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-6 rounded-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.22)_0%,rgba(56,189,248,0.08)_42%,transparent_70%)] blur-2xl"
        />

        {/* Smooth Floating 3D Globe */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing"
        >
          <EarthCanvas />
        </motion.div>

        {/* Interactive Hint Pill */}
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#050816]/70 backdrop-blur-md border border-white/10 text-[11px] font-medium text-slate-300 shadow-lg whitespace-nowrap">
          <Globe className="w-3.5 h-3.5 text-sky-400" />
          <span>{t.contact.dragEarth}</span>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
