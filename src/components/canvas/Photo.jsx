import { motion } from "framer-motion";
import { profile } from "../assets";

const Photo = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 0.4, ease: "easeIn" }} className="relative">
        {/* circle */}
        <motion.svg
          className="absolute top-0 left-1 w-[280px] sm:w-[380px] md:w-[450px] xl:w-[520px] h-[280px] sm:h-[380px] md:h-[450px] xl:h-[520px] animate-blink"
          fill="transparent"
          viewBox="0 0 506 506"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: "drop-shadow(0px 0px 20px rgba(145, 94, 255, 0.9))",
          }}
        >
          <motion.circle
            cx="253"
            cy="253"
            r="250"
            stroke="#915EFF"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ strokeDasharray: "24 10 0 0" }}
            animate={{ strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"], rotate: [120, 360] }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          />
        </motion.svg>
        {/* image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.4, ease: "easeInOut" }}
          className="w-[260px] h-[260px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] xl:w-[500px] xl:h-[500px] rounded-full overflow-hidden mix-blend-lighten"
        >
          {/* <img src="./src/assets/Denny.png" alt="Denny" className="object-cover w-full h-full" /> */}
          <img src={profile} alt="Denny" className="object-cover w-full h-full" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Photo;
