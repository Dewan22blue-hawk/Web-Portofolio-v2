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

const App = () => {
  useEffect(() => {
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
        <motion.div className="fixed z-50 top-0 left-0 w-full h-2 bg-purple-500 origin-left" style={{ scaleX }} />
        <div className="bg-center bg-no-repeat bg-cover bg-hero-pattern" data-aos="fade-up">
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
