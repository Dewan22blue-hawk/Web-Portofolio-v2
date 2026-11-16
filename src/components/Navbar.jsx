import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, User, Briefcase, Award, FolderGit2, Mail } from "lucide-react";
import { LiquidNavbar } from "@/components/ui/liquid-glass-navbar";
import { logo } from "../assets";

const navItems = [
  {
    label: "Home",
    href: "#hero",
    icon: <Home className="w-[18px] h-[18px] text-sky-400" strokeWidth={1.9} />,
    fx: "glow",
  },
  {
    label: "About",
    href: "#about",
    icon: <User className="w-[18px] h-[18px] text-blue-400" strokeWidth={1.9} />,
    fx: "pop",
  },
  {
    label: "Work",
    href: "#work",
    icon: <Briefcase className="w-[18px] h-[18px] text-cyan-400" strokeWidth={1.9} />,
    fx: "plane",
  },
  {
    label: "Certs",
    href: "#certificate",
    icon: <Award className="w-[18px] h-[18px] text-sky-300" strokeWidth={1.9} />,
    fx: "spin",
  },
  {
    label: "Projects",
    href: "#projects",
    icon: <FolderGit2 className="w-[18px] h-[18px] text-blue-300" strokeWidth={1.9} />,
    fx: "pop",
  },
  {
    label: "Contact",
    href: "#contact",
    icon: <Mail className="w-[18px] h-[18px] text-indigo-300" strokeWidth={1.9} />,
    fx: "wave",
  },
];

const sectionIds = ["about", "work", "certificate", "projects", "contact"];

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Jika masih berada di area atas (Hero Section)
      if (window.scrollY < 300) {
        setActiveIndex(0);
        return;
      }

      // 2. Jika scroll mendekati bagian paling bawah halaman
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;
      if (isBottom) {
        setActiveIndex(navItems.length - 1);
        return;
      }

      // 3. Deteksi section aktif menggunakan getBoundingClientRect() terhadap viewport
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 260) {
            setActiveIndex(i + 1); // +1 karena index 0 adalah Home
            return;
          }
        }
      }

      setActiveIndex(0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-3 sm:top-5 inset-x-0 mx-auto z-40 flex items-center justify-center px-3 sm:px-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2.5 p-1 sm:p-1.5 rounded-full backdrop-blur-md bg-slate-900/60 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.45)] transition-all">
        <Link
          to="/"
          onClick={() => {
            setActiveIndex(0);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-full hover:bg-white/5 transition-colors group"
          aria-label="Denny Irawan Home"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden border border-blue-500/30 group-hover:border-sky-400/80 transition-colors bg-slate-800/80 flex items-center justify-center shadow-inner">
            <img src={logo} alt="Logo" className="w-4 h-4 object-contain" />
          </div>
          <span className="text-white text-xs sm:text-sm font-semibold tracking-tight hidden sm:inline-block">
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
      </div>
    </header>
  );
};

export default Navbar;
