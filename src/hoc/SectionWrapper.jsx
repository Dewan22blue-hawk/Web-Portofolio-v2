import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";

const StarWrapper = (Component, idName) =>
  function HOC() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start end", "start 0.35"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
      stiffness: 120,
      damping: 24,
      restDelta: 0.001,
    });

    const y = useTransform(smoothProgress, [0, 1], [36, 0]);
    const opacity = useTransform(smoothProgress, [0, 0.7, 1], [0.25, 0.85, 1]);
    const scale = useTransform(smoothProgress, [0, 1], [0.97, 1]);

    return (
      <motion.section
        ref={sectionRef}
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>

        {/* Chapter Scroll Progress Divider */}
        <motion.div
          style={{ scaleX: smoothProgress, transformOrigin: "left" }}
          className="h-[1px] w-full max-w-xs mb-8 bg-gradient-to-r from-blue-600 via-sky-400 to-transparent opacity-60"
        />

        <motion.div style={{ y, opacity, scale }}>
          <Component />
        </motion.div>
      </motion.section>
    );
  };

export default StarWrapper;
