import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import Photo from "./canvas/Photo";

const Hero = () => {
  const texts = ["Student at UBSI", "Bangkit Cohort 2024", "Graphic Designer", "Junior Full Stack Developer", "Freelancers", "IT Support Specialist", "SysAdmin "];
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 100 : 300;
    const handleTyping = setTimeout(() => {
      if (!isDeleting && charIndex < texts[textIndex].length) {
        setCurrentText((prev) => prev + texts[textIndex][charIndex]);
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setCurrentText((prev) => prev.slice(0, -1));
        setCharIndex(charIndex - 1);
      } else {
        setIsDeleting(!isDeleting);
        if (!isDeleting) {
          setTimeout(() => setIsDeleting(true), 1000);
        } else {
          setTextIndex((prev) => (prev + 1) % texts.length);
          setCharIndex(0);
          setIsDeleting(false);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(handleTyping);
  }, [charIndex, isDeleting, textIndex, texts]);

  return (
    <section className="relative w-full h-screen mx-auto mb-32 text-white">
      <div className={`${styles.paddingX} absolute inset-0 top-[120px]  max-w-7xl mx-auto flex flex-row items-start gap-5`}>
        <div className="flex flex-col items-center justify-center mt-5 ">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className="w-1 h-40 sm:h-80 violet-gradient" />
        </div>
        <div className="">
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#915eff]">Denny</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I'm<span className="text-[#915eff]"> {currentText} </span>
            <br className="hidden sm:block" />
            <span className="block cursor">| Keep "Hello World"</span>
          </p>
        </div>
      </div>
      {/* <ComputersCanvas /> */}
      <div className="order1 xl:order-none xl:mb-0 absolute inset-0 min-[320px]:mb-0 top-[500px] flex items-center justify-center mb-12">
        <Photo />
      </div>
      {/* scroll mouse */}
      <div className="absolute flex items-center justify-end w-full max-[320px]:mr-0  mr-28 xs:bottom-10 bottom-32">
        <a href="#about">
          <div className="w-[35px] h-[64px] max-[320px]:mr-2 min-[640px]:mr-16 rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div animate={{ y: [0, 24, 0] }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }} className="w-3 h-3 mb-1 rounded-full bg-secondary" />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
