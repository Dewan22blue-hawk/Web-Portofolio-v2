import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { send } from "@emailjs/browser";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { EarthCanvas } from "./canvas";

const EMAILJS_SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_hotm9y3";
const EMAILJS_TEMPLATE_ID_AUTOREPLY =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID_AUTOREPLY || "template_d59ay6m";
const EMAILJS_PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "1xm0TVbKRBtfairDe";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setFeedbackMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedbackMessage("");

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setIsSuccess(false);
      setFeedbackMessage("Please fill in all form fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID_AUTOREPLY,
        {
          from_name: form.name,
          to_name: "Denny",
          from_email: form.email,
          to_email: "dennyirawan170204@gmail.com",
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      console.log("Email sent successfully:", response);
      setIsSuccess(true);
      setFeedbackMessage(
        "Message sent successfully! Thank you. I will get back to you as soon as possible."
      );

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("FAILED to send message:", error);
      setIsSuccess(false);

      if (
        error.status === 422 &&
        error.text &&
        error.text.includes("recipients address is empty")
      ) {
        setFeedbackMessage(
          "Failed to send message: Recipient address is invalid in EmailJS configuration. Please check your email template in EmailJS (especially the 'To Email' field for auto-reply templates should be empty or use the {{from_email}} variable)."
        );
      } else if (
        error.status === 422 &&
        error.text &&
        error.text.includes("recipients address is corrupted")
      ) {
        setFeedbackMessage(
          "Failed to send message: Recipient address in your EmailJS template is corrupted. Ensure the 'To Email' field in your auto-reply template uses `{{from_email}}` or is left empty."
        );
      } else {
        setFeedbackMessage("Failed to send message. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col-reverse gap-10 overflow-hidden xl:mt-12 xl:flex-row">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 mt-12"
        >
          {/* Name Input */}
          <label htmlFor="name" className="flex flex-col">
            <span className="mb-4 font-medium text-white">Your Name</span>{" "}
            {/* Translated */}
            <input
              type="text"
              id="name"
              value={form.name}
              placeholder="What's your name?"
              onChange={handleChange}
              name="name"
              className="px-6 py-4 font-medium text-white border-none rounded-lg outline-none bg-tertiary placeholder:text-secondary"
              required
            />
          </label>
          {/* Email Input */}
          <label htmlFor="email" className="flex flex-col">
            <span className="mb-4 font-medium text-white">Your Email</span>{" "}
            {/* Translated */}
            <input
              type="email"
              id="email"
              value={form.email}
              placeholder="What's your email?"
              onChange={handleChange}
              name="email"
              className="px-6 py-4 font-medium text-white border-none rounded-lg outline-none bg-tertiary placeholder:text-secondary"
              required
            />
          </label>
          {/* Message Input */}
          <label htmlFor="message" className="flex flex-col">
            <span className="mb-4 font-medium text-white">Your Message</span>{" "}
            {/* Translated */}
            <textarea
              rows="7"
              id="message"
              value={form.message}
              placeholder="What do you want to say?"
              onChange={handleChange}
              name="message"
              className="px-6 py-4 font-medium text-white border-none rounded-lg outline-none bg-tertiary placeholder:text-secondary"
              required
            />
          </label>
          {/* Send Button */}
          <button
            type="submit"
            className="px-8 py-3 font-bold text-white shadow-md outline-none bg-tertiary rounded-xl w-fit shadow-primary hover:bg-tertiary-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"} {/* Translated */}
          </button>

          {/* Feedback Message (Success/Error) */}
          {feedbackMessage && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 text-center text-sm ${
                isSuccess ? "text-green-400" : "text-red-400"
              }`}
            >
              {feedbackMessage}
            </motion.p>
          )}
        </form>
      </motion.div>
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
