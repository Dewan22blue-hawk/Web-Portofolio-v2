import { useState } from "react";
import CertificateItems from "../constants/certificate";
import ModalBox from "../particles/ModalBox";
import { SectionWrapper } from "../hoc";

function MyCertificateContent() {
  const [modalData, setModalData] = useState(null);

  return (
    <div id="mycertificate" className="bg-tertiary rounded-2xl min-h-[300px] flex flex-col items-center justify-center h-screen gap-3 align-middle ">
      <div id="certificatetitle" className="flex flex-col items-center justify-center gap-6 pt-10 md:w-6/12 max-sm:w-8/12">
        <h2 className="font-bold text-white md:text-4xl max-sm:text-2xl" data-aos="zoom-in-up">
          My <span className="text-[#915eff] ">Certificate</span>
        </h2>
        <span className="text-center text-secondary max-sm:text-sm" data-aos="zoom-in-up">
          It would not be complete if we discussed skills without recognition, here are the competency certificates that I received.
        </span>
      </div>
      <div id="certificateitems" className="flex justify-center w-full md:mt-10 max-sm:mt-2 ">
        <ul className="flex flex-wrap justify-center md:flex-row max-sm:flex-col md:w-8/12 max-sm:w-8/12 md:gap-20 max-sm:gap-2">
          {CertificateItems.map((item) => {
            return (
              // onClick={() => window.my_modal.showModal()}
              <div
                className="flex flex-row gap-2 text-white transition-all duration-150 cursor-pointer md:text-6xl max-sm:text-3xl md:p-5 max-sm:p-3 hover:secondary-background focus:scale-95 max-sm:secondary-background max-sm:rounded-md max-sm:focus:scale-95"
                data-aos="zoom-in-up"
                onClick={() => {
                  setModalData(item);
                  window.my_modal.showModal();
                }}
                key={item.name}
              >
                <i className={`${item.icon}`}></i>
                <span className="text-[#915eff] max-sm:hidden ">{item.items.length}</span>
                <span className="flex flex-col justify-center px-2 text-sm text-[#915eff] md:hidden">{item.name}</span>
              </div>
            );
          })}
        </ul>
      </div>
      <div>
        <ModalBox modalData={modalData} />
      </div>
    </div>
  );
}

export default SectionWrapper(MyCertificateContent, "certificate");
