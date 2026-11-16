import { useEffect } from 'react';
import 'remixicon/fonts/remixicon.css';
import { BrowserRouter } from 'react-router-dom';
import { About, Contact, Hero, Navbar, Experience, Feedbacks, Tech, Works, StarsCanvas } from './components';
import MyCertificateContent from './components/Certificate';
import 'aos/dist/aos.css';
import Aos from 'aos';
import ContactFoot from './components/ContactFoot';
import Footer from './components/Footer';
import { useScroll, useSpring, motion } from 'framer-motion';
import Chatbot from './components/Chatbot';
import ScrollStoryRail from './components/ScrollStoryRail';

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    Aos.init({
      duration: 1000, // Durasi animasi dalam milidetik
      once: false, // Animasi akan diputar setiap kali elemen muncul di viewport
    });
  }, []);
  // Menggunakan useScroll untuk melacak pergerakan halaman
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <motion.div className="fixed z-50 top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-sky-400 to-blue-500 origin-left shadow-[0_0_12px_rgba(56,189,248,0.6)]" style={{ scaleX }} />
        <ScrollStoryRail />
        <div className="bg-center bg-no-repeat bg-cover bg-hero-pattern">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <MyCertificateContent />
        <Tech />
        <Works />
        <Feedbacks />
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
          {/* <Footer /> */}
          <Chatbot />
          <ContactFoot />
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
