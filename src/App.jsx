import { useEffect, useState } from "react";
import "remixicon/fonts/remixicon.css";
import { BrowserRouter } from "react-router-dom";
import { About, Contact, Hero, Navbar, Experience, Feedbacks, Tech, Works, StarsCanvas } from "./components";
import MyCertificateContent from "./components/Certificate";
import "aos/dist/aos.css";
import Aos from "aos";
const App = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000, // Durasi animasi dalam milidetik
      once: true, // Apakah animasi hanya terjadi sekali
      // Anda bisa menambahkan opsi lainnya sesuai kebutuhan
    });
  }, []);
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-center bg-no-repeat bg-cover bg-hero-pattern">
          <Navbar></Navbar>
          <Hero></Hero>
        </div>
        <About></About>
        <Experience></Experience>
        <MyCertificateContent></MyCertificateContent>
        <Tech></Tech>
        <Works></Works>
        <Feedbacks></Feedbacks>
        <div className="relative z-0">
          <Contact></Contact>
          <StarsCanvas></StarsCanvas>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
