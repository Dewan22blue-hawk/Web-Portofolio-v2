import { SectionWrapper } from "../hoc";
import { navLinks } from "../constants";

const ContactFoot = () => {
  return (
    <div className="flex items-start justify-start w-auto h-auto p-10 mt-0 font-medium align-middle bg-black-100 rounded-2xl align-items-center md:flex-row max-sm:flex-col md:gap-36 max-sm:gap-10">
      <div className="flex flex-col gap-5 max-sm:items-center max-sm:align-middle md:pl-10 max-sm:justify-center">
        <div className="text-secondary" data-aos="zoom-in-up">
          <ul className="flex flex-col gap-3">
            <li>
              <i className="ri-map-pin-2-line"></i> Surakarta City, Central Java, Indonesian
            </li>
            <li>
              <i className="ri-mail-line"></i> dennyirawan170204@gmail.com
            </li>
            <li>
              <i className="ri-phone-line"></i> +62 852 3754 5993
            </li>
          </ul>
        </div>
      </div>
      <div className="text-secondary md:text-6xl max-sm:text-4xl md:mt-5 max-sm:mt-10 max-sm:gap-3 max-sm:flex max-sm:flex-row" data-aos="zoom-in-up">
        <a href="https://www.linkedin.com/in/denny-irawan22">
          <i className="ri-linkedin-box-fill hover:text-[#915eff]"></i>
        </a>
        <a href="https://www.instagram.com/de.wan_22/">
          <i className="ri-instagram-fill hover:text-[#915eff]"></i>
        </a>
        <a href="https://github.com/Dewan22blue-hawk">
          <i className="ri-github-fill hover:text-[#915eff]"></i>
        </a>
        <a href="https://wa.me/6285237545993">
          <i className="ri-whatsapp-fill hover:text-[#915eff]"></i>
        </a>
      </div>
      <div className="flex flex-col gap-5 max-sm:items-center max-sm:align-middle md:pl-10 max-sm:justify-center">
        <div className="text-secondary" data-aos="zoom-in-up">
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a className="hover:text-white" href={`#${link.id}`}>
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default SectionWrapper(ContactFoot, "");
