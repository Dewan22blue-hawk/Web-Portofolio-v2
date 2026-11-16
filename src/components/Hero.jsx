import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import { HeroLanyardCard } from "@/components/ui/hero-lanyard-card";
import { GalaxyMeteors } from "@/components/ui/galaxy-meteors";
import profile from "../assets/dennyirawan.png";

const texts = [
  "Junior Full Stack Developer",
  "Student at UBSI",
  "Bangkit Cohort 2024",
  "IT Support Specialist",
  "Graphic Designer",
  "Freelancer",
  "SysAdmin",
];

const Hero = () => {
  const heroRef = useRef(null);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const leftY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const rightY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const rightScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const rightOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  useEffect(() => {
    const currentTarget = texts[textIndex];
    const typingSpeed = isDeleting ? 45 : 95;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentTarget.length) {
        setCurrentText(currentTarget.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      } else if (!isDeleting && charIndex === currentTarget.length) {
        setTimeout(() => setIsDeleting(true), 1600);
      } else if (isDeleting && charIndex > 0) {
        setCurrentText(currentTarget.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center pt-14 pb-28 sm:pt-32 sm:pb-32 overflow-hidden bg-[#050816] text-white"
    >
      {/* Galaxy Stars & Shooting Meteors Background */}
      <GalaxyMeteors starCount={75} meteorCount={10} />

      {/* Background soft ambient radial gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        {/* Kolom Kiri: Bio & CTAs */}
        <motion.div
          style={{ y: leftY, opacity: leftOpacity }}
          className="lg:col-span-7 flex flex-col items-start justify-center text-left"
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 shadow-inner backdrop-blur-sm mb-6"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-xs sm:text-sm font-medium text-slate-300 tracking-wide">
              Available for Projects
            </span>
          </motion.div>

          {/* Heading with White to Slate-400 gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white"
          >
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
              Denny Irawan
            </span>
          </motion.h1>

          {/* Typewriter Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-xl sm:text-2xl lg:text-3xl font-medium text-slate-300 min-h-[40px] flex items-center flex-wrap"
          >
            <span className="text-slate-400 mr-2">I am a</span>
            <span className="text-sky-400 font-semibold">{currentText}</span>
            <span className="inline-block w-0.5 h-6 ml-1.5 bg-sky-400 animate-pulse" />
          </motion.div>

          {/* Subtext description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-4 text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed"
          >
            I build web applications with React, Laravel, and Node.js, and keep Linux servers, networks, and IT operations running smoothly.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            {/* Primary Button */}
            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 shadow-[0_0_25px_-5px_rgba(37,99,235,0.6)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-all duration-300 group"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Download CV Glass Button */}
            <a
              href="/cv-denny-irawan.pdf"
              download
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-medium text-slate-200 hover:text-white border border-white/15 bg-white/[0.04] hover:bg-white/10 active:bg-white/[0.15] backdrop-blur-md shadow-sm transition-all duration-300 group"
            >
              <Download className="w-4 h-4 text-sky-400 group-hover:translate-y-0.5 transition-transform" />
              <span>Download CV</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Kolom Kanan: Interactive Draggable Lanyard Card */}
        <motion.div
          style={{ y: rightY, scale: rightScale, opacity: rightOpacity }}
          className="lg:col-span-5 flex items-center justify-center relative w-full mt-2 lg:mt-0"
        >
          <HeroLanyardCard
            name="Denny Irawan, S.Kom"
            role="Full Stack Developer & IT Specialist"
            team="UBSI · Bangkit '24"
            image={profile}
            bio="Full Stack Developer and IT Specialist working with React, Laravel, and Node.js alongside Linux servers, networking, and IT support."
            tags={["React", "Node.js", "Laravel", "IT Support", "SysAdmin"]}
            links={[
              { label: "Contact Me", href: "#contact" },
              { label: "View Projects", href: "#projects" },
            ]}
            idNumber="DEV-2024-081"
          />
        </motion.div>
      </div>

      {/* Scroll Mouse Indicator di Bagian Tengah Bawah (desktop/tablet) */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="hidden sm:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center justify-center gap-2 z-20"
      >
        <a href="#about" aria-label="Scroll to About section">
          <div className="w-[28px] h-[48px] rounded-full border-2 border-slate-500/40 hover:border-sky-400 flex justify-center items-start p-1.5 backdrop-blur-sm bg-slate-900/30 transition-colors">
            <motion.div
              animate={{
                y: [0, 16, 0],
                opacity: [1, 0.3, 1],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
              className="w-1.5 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]"
            />
          </div>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
