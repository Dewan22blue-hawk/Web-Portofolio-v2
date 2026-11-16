import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Home, User, Briefcase, GraduationCap, Award, FolderGit2, Mail, Globe } from "lucide-react";
import { LiquidNavbar } from "@/components/ui/liquid-glass-navbar";
import { useLanguage } from "../context/LanguageContext";
import { logo } from "../assets";

const sectionIds = ["about", "work", "education", "certificate", "projects", "contact"];

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { lang, toggleLang, t } = useLanguage();

  const navItems = useMemo(
    () => [
      {
        label: t.nav.home,
        href: "#hero",
        icon: <Home className="w-[18px] h-[18px] text-sky-400" strokeWidth={1.9} />,
        fx: "glow",
      },
      {
        label: t.nav.about,
        href: "#about",
        icon: <User className="w-[18px] h-[18px] text-blue-400" strokeWidth={1.9} />,
        fx: "pop",
      },
      {
        label: t.nav.work,
        href: "#work",
        icon: <Briefcase className="w-[18px] h-[18px] text-cyan-400" strokeWidth={1.9} />,
        fx: "plane",
      },
      {
        label: t.nav.education,
        href: "#education",
        icon: <GraduationCap className="w-[18px] h-[18px] text-emerald-400" strokeWidth={1.9} />,
        fx: "glow",
      },
      {
        label: t.nav.certs,
        href: "#certificate",
        icon: <Award className="w-[18px] h-[18px] text-sky-300" strokeWidth={1.9} />,
        fx: "spin",
      },
      {
        label: t.nav.projects,
        href: "#projects",
        icon: <FolderGit2 className="w-[18px] h-[18px] text-blue-300" strokeWidth={1.9} />,
        fx: "pop",
      },
      {
        label: t.nav.contact,
        href: "#contact",
        icon: <Mail className="w-[18px] h-[18px] text-indigo-300" strokeWidth={1.9} />,
        fx: "wave",
      },
    ],
    [t]
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 300) {
        setActiveIndex(0);
        return;
      }

      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;
      if (isBottom) {
        setActiveIndex(navItems.length - 1);
        return;
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 260) {
            setActiveIndex(i + 1);
            return;
          }
        }
      }

      setActiveIndex(0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems.length]);

  return (
    <header className="fixed bottom-4 top-auto sm:top-5 sm:bottom-auto inset-x-0 mx-auto z-40 flex items-center justify-center px-2 sm:px-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-1 sm:gap-2 p-1.5 rounded-full backdrop-blur-md bg-slate-900/75 sm:bg-slate-900/60 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.55)] transition-all max-w-[96vw]">
        <Link
          to="/"
          onClick={() => {
            setActiveIndex(0);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="hidden sm:flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-full hover:bg-white/5 transition-colors group"
          aria-label="Denny Irawan Home"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden border border-blue-500/30 group-hover:border-sky-400/80 transition-colors bg-slate-800/80 flex items-center justify-center shadow-inner">
            <img src={logo} alt="Logo" className="w-4 h-4 object-contain" />
          </div>
          <span className="text-white text-xs sm:text-sm font-semibold tracking-tight hidden md:inline-block">
            Denny<span className="text-sky-400">.dev</span>
          </span>
        </Link>

        <div className="h-5 w-[1px] bg-white/10 hidden sm:block" />

        <LiquidNavbar
          items={navItems}
          active={activeIndex}
          onChange={(i) => setActiveIndex(i)}
          tone="dark"
          sound={false}
          className="!p-0.5"
        />

        <div className="h-5 w-[1px] bg-white/10" />

        {/* Language Toggle Pill (ID / EN) */}
        <button
          type="button"
          onClick={toggleLang}
          aria-label={lang === "en" ? "Switch to Indonesian" : "Ganti ke Bahasa Inggris"}
          title={lang === "en" ? "Switch to Bahasa Indonesia" : "Switch to English"}
          className="flex items-center gap-1.5 px-2.5 py-1.5 mr-0.5 rounded-full bg-white/[0.06] hover:bg-blue-500/20 border border-white/10 hover:border-sky-400/40 text-xs font-semibold text-slate-200 hover:text-white transition-all cursor-pointer shrink-0"
        >
          <Globe className="w-3.5 h-3.5 text-sky-400" />
          <span className="uppercase tracking-wider">{lang}</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
