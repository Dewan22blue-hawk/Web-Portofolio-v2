import { useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  MapPin,
  UserPlus,
} from "lucide-react";
import { logo } from "../assets";
import profile from "../assets/dennyirawan.png";
import { useLanguage } from "../context/LanguageContext";

const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/denny-irawan22",
    iconClass: "ri-linkedin-box-fill",
  },
  {
    name: "GitHub",
    href: "https://github.com/Dewan22blue-hawk",
    iconClass: "ri-github-fill",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/de.wan_22/",
    iconClass: "ri-instagram-fill",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/6285237545993",
    iconClass: "ri-whatsapp-fill",
  },
];

const DIRECT_EMAIL = "dennyirawan170204@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/denny-irawan22";

function downloadVCard() {
  const vcardLines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Irawan;Denny;;;",
    "FN:Denny Irawan",
    "TITLE:Full Stack Developer & IT Specialist",
    `EMAIL;TYPE=INTERNET:${DIRECT_EMAIL}`,
    "ADR;TYPE=HOME:;;Surakarta;Central Java;;Indonesia",
    `URL:${LINKEDIN_URL}`,
    "END:VCARD",
  ].join("\r\n");

  const blob = new Blob([vcardLines], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Denny_Irawan.vcf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const ContactFoot = () => {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const [savedVCard, setSavedVCard] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);
  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${mouseX}px ${mouseY}px, rgba(56, 189, 248, 0.11), transparent 72%)`;

  const handleMouseMove = (e) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-300);
    mouseY.set(-300);
  };

  const quickNavItems = [
    { id: "hero", num: "01", label: t.nav.home },
    { id: "about", num: "02", label: t.nav.about },
    { id: "work", num: "03", label: t.nav.work },
    { id: "education", num: "04", label: t.nav.education },
    { id: "certificate", num: "05", label: t.nav.certs },
    { id: "projects", num: "06", label: t.nav.projects },
    { id: "contact", num: "07", label: t.nav.contact },
    { id: "chatbot", num: "08", label: t.chatbot.head.replace(".", "") },
  ];

  const handleSaveVCard = () => {
    downloadVCard();
    setSavedVCard(true);
    setTimeout(() => setSavedVCard(false), 2400);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(DIRECT_EMAIL);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      window.location.href = `mailto:${DIRECT_EMAIL}`;
    }
  };

  return (
    <section
      aria-label="Footer digital name card and navigation"
      className="max-w-7xl mx-auto px-6 sm:px-16 pt-10 pb-6 relative z-10"
    >
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group/dock relative rounded-3xl p-[1px] bg-gradient-to-b from-sky-400/35 via-blue-500/15 to-white/5 shadow-[0_24px_70px_-15px_rgba(37,99,235,0.22)]"
      >
        <div className="relative rounded-[23px] bg-[#0b132b]/90 backdrop-blur-xl p-6 sm:p-9 lg:p-11 overflow-hidden">
          {/* Cursor Spotlight */}
          {!shouldReduceMotion && (
            <motion.div
              aria-hidden="true"
              style={{ background: spotlight }}
              className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover/dock:opacity-100 transition-opacity duration-300"
            />
          )}

          {/* Subtle Top-Left Ambient Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-28 -left-28 w-72 h-72 rounded-full bg-blue-600/15 blur-3xl"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Zone (5 cols): Executive Digital Name Card */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6 lg:pr-8 lg:border-r lg:border-white/10">
              <div className="flex flex-col gap-5">
                {/* Identity Row */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-sky-400/45 bg-[#050816] shrink-0 shadow-[0_0_20px_rgba(56,189,248,0.22)]">
                      <img
                        src={profile}
                        alt="Denny Irawan"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight truncate">
                          Denny Irawan
                        </h3>
                        <a
                          href="#hero"
                          aria-label="Denny.dev Home"
                          className="w-6 h-6 rounded-full border border-white/10 bg-white/[0.04] hover:border-sky-400/50 flex items-center justify-center shrink-0 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                        >
                          <img
                            src={logo}
                            alt=""
                            className="w-3.5 h-3.5 object-contain"
                          />
                        </a>
                      </div>
                      <p className="text-xs sm:text-[13px] font-medium text-sky-400 truncate mt-0.5">
                        {t.footer.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Availability Status Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/25 text-[11px] font-medium text-emerald-300 w-fit max-w-full">
                  <span
                    className={`w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 ${
                      shouldReduceMotion ? "" : "animate-pulse"
                    }`}
                  />
                  <span className="truncate">{t.footer.availableBadge}</span>
                </div>

                {/* Bio / Tagline */}
                <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                  {t.footer.tagline}
                </p>

                {/* Direct Info Channels */}
                <ul className="flex flex-col gap-2 text-xs sm:text-[13px] text-slate-200 pt-1">
                  <li className="flex items-center gap-2.5 min-h-[28px] text-slate-300">
                    <MapPin
                      aria-hidden="true"
                      className="w-4 h-4 text-sky-400 shrink-0"
                    />
                    <span>{t.footer.location}</span>
                  </li>
                  <li>
                    <a
                      href={`mailto:${DIRECT_EMAIL}`}
                      className="inline-flex items-center gap-2.5 min-h-[32px] text-slate-200 hover:text-sky-300 transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                    >
                      <Mail
                        aria-hidden="true"
                        className="w-4 h-4 text-sky-400 shrink-0"
                      />
                      <span className="break-all">{DIRECT_EMAIL}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={LINKEDIN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/li inline-flex items-center gap-2.5 min-h-[32px] text-slate-200 hover:text-sky-300 transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                    >
                      <i
                        aria-hidden="true"
                        className="ri-linkedin-box-fill text-base leading-none text-sky-400 shrink-0"
                      />
                      <span className="truncate">linkedin.com/in/denny-irawan22</span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="w-3.5 h-3.5 text-slate-500 group-hover/li:text-sky-300 group-hover/li:translate-x-0.5 group-hover/li:-translate-y-0.5 transition-all shrink-0"
                      />
                    </a>
                  </li>
                </ul>
              </div>

              {/* Touch-Friendly Primary & Secondary Card Actions (min 44px height) */}
              <div
                aria-live="polite"
                className="flex flex-wrap items-center gap-2.5 pt-2"
              >
                <motion.button
                  type="button"
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  onClick={handleSaveVCard}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-xs sm:text-[13px] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(37,99,235,0.65)] transition-all duration-200 cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                >
                  {savedVCard ? (
                    <Check aria-hidden="true" className="w-4 h-4" />
                  ) : (
                    <UserPlus aria-hidden="true" className="w-4 h-4" />
                  )}
                  <span>
                    {savedVCard ? t.footer.savedContact : t.footer.saveContact}
                  </span>
                </motion.button>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/15 hover:border-sky-400/50 text-xs sm:text-[13px] font-medium text-slate-200 hover:text-white transition-all duration-200 cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  {copiedEmail ? (
                    <Check
                      aria-hidden="true"
                      className="w-4 h-4 text-emerald-400"
                    />
                  ) : (
                    <Copy aria-hidden="true" className="w-4 h-4 text-sky-400" />
                  )}
                  <span>
                    {copiedEmail ? t.footer.copiedEmail : t.footer.copyEmail}
                  </span>
                </button>
              </div>
            </div>

            {/* Right Zone (7 cols): Sitemap + Social Channels */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-8">
              {/* Quick Sitemap Grid */}
              <nav aria-label={t.footer.navTitle}>
                <p className="text-xs font-semibold uppercase tracking-wider text-sky-400/90 mb-3.5">
                  {t.footer.navTitle}
                </p>
                <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {quickNavItems.map((link) => (
                    <li key={link.id}>
                      <a
                        href={`#${link.id}`}
                        className="group/nav flex items-center justify-between gap-2 min-h-[44px] px-3.5 py-2 rounded-xl bg-[#050816]/65 hover:bg-blue-500/15 border border-white/[0.07] hover:border-sky-400/40 text-xs sm:text-[13px] font-medium text-slate-300 hover:text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                      >
                        <span className="flex items-center gap-2 min-w-0">
                          <span className="text-[10px] font-mono text-slate-500 group-hover/nav:text-sky-400 transition-colors shrink-0">
                            {link.num}
                          </span>
                          <span className="truncate">{link.label}</span>
                        </span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="w-3.5 h-3.5 text-slate-500 opacity-0 -translate-x-1 group-hover/nav:opacity-100 group-hover/nav:translate-x-0 group-hover/nav:text-sky-300 transition-all duration-200 shrink-0"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Social Channels Grid */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-sky-400/90 mb-3.5">
                  {t.footer.connectTitle}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${social.name} (opens in new tab)`}
                      className="group/soc flex items-center justify-between gap-2 min-h-[48px] px-3.5 py-2.5 rounded-xl bg-[#050816]/80 hover:bg-blue-500/15 border border-white/10 hover:border-sky-400/50 text-slate-200 hover:text-white shadow-sm hover:shadow-[0_10px_24px_-10px_rgba(37,99,235,0.5)] transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                    >
                      <span className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-medium min-w-0">
                        <i
                          aria-hidden="true"
                          className={`${social.iconClass} text-lg leading-none text-sky-400 group-hover/soc:text-sky-300 transition-colors shrink-0`}
                        />
                        <span className="truncate">{social.name}</span>
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="w-3.5 h-3.5 text-slate-500 group-hover/soc:text-sky-300 group-hover/soc:translate-x-0.5 group-hover/soc:-translate-y-0.5 transition-all shrink-0"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactFoot;
