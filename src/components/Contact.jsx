import React from "react";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
// import { emailjs } from "@emailjs/browser";
import { send } from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

// G6KUjGBBh3D_hv76H
// template_nip7cre
// service_maeevei

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Send email using emailjs
    send(
      "service_maeevei",
      "template_nip7cre",
      {
        from_name: form.name,
        to_name: "Adrian",
        form_email: form.email,
        to_email: "contact@dwn.dev.com",
        message: form.message,
      },
      "G6KUjGBBh3D_hv76H"
    )
      .then((response) => {
        setLoading(false);
        alert("Message sent successfully! Thank You. I will get back to you as soon as possible.");
        setForm({
          name: "",
          email: "",
          message: "",
        });
      })
      .catch((error) => {
        setLoading(false);

        console.error("FAILED...", error);
        alert("Failed to send message. Please try again later.");
      });

    setForm({
      name: "",
      email: "",
      message: "",
    });
    setLoading(false);
  };

  return (
    <div className="flex flex-col-reverse gap-10 overflow-hidden xl:mt-12 xl:flex-row">
      <motion.div variants={slideIn("left", "tween", 0.2, 1)} className="flex-[0.75] bg-black-100 p-8 rounded-2xl">
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8 mt-12">
          <label htmlFor="" className="flex flex-col">
            <span className="mb-4 font-medium text-white">Your Name</span>
            <input type="text" value={form.name} placeholder="What's your name?" onChange={handleChange} name="name" className="px-6 py-4 font-medium text-white border-none rounded-lg outline-none bg-tertiary placeholder:text-secondary" />
          </label>
          <label htmlFor="" className="flex flex-col">
            <span className="mb-4 font-medium text-white">Your Email</span>
            <input
              type="email"
              value={form.email}
              placeholder="What's your email?"
              onChange={handleChange}
              name="email"
              className="px-6 py-4 font-medium text-white border-none rounded-lg outline-none bg-tertiary placeholder:text-secondary"
            />
          </label>
          <label htmlFor="" className="flex flex-col">
            <span className="mb-4 font-medium text-white">Your Message</span>
            <textarea
              rows="7"
              type="text"
              value={form.message}
              placeholder="What do you want to say?"
              onChange={handleChange}
              name="message"
              className="px-6 py-4 font-medium text-white border-none rounded-lg outline-none bg-tertiary placeholder:text-secondary"
            />
          </label>
          <button type="submit" className="px-8 py-3 font-bold text-white shadow-md outline-none bg-tertiary rounded-xl w-fit shadow-primary">
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>
      <motion.div variants={slideIn("right", "tween", 0.2, 1)} className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]">
        <EarthCanvas></EarthCanvas>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
