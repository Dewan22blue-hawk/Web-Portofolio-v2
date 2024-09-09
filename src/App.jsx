import { useEffect } from "react";
import "remixicon/fonts/remixicon.css";
import { BrowserRouter } from "react-router-dom";
import { About, Contact, Hero, Navbar, Experience, Feedbacks, Tech, Works, StarsCanvas } from "./components";
import MyCertificateContent from "./components/Certificate";
import "aos/dist/aos.css";
import Aos from "aos";
import ContactFoot from "./components/ContactFoot";
import Footer from "./components/Footer";

const App = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000, // Durasi animasi dalam milidetik
      once: false, // Animasi akan diputar setiap kali elemen muncul di viewport
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
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
          <ContactFoot />
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
