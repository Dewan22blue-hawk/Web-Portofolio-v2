import { SectionWrapper } from "../hoc";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center font-medium text-white align-middle max-sm:text-xs md:text-sm bottom-4">
      <p>
        Build by Denny with{" "}
        <motion.span
          className="inline-block"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          ❤️
        </motion.span>
      </p>
      <p> {new Date().getFullYear()} DwnDev &copy; All rights reserved.</p>
    </footer>
  );
};

export default SectionWrapper(Footer, "");
