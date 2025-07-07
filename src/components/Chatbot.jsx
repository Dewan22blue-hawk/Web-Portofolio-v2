import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    setLoading(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userMessage.text }),
      });

      const data = await response.json();

      const botMessage = {
        sender: "bot",
        text: data.answer || "Sorry, I could not process your request.",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        sender: "bot",
        text: "An error occurred. Please try again.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      variants={slideIn("left", "tween", 0.2, 1)}
      className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
    >
      {/* Section sub-text, using styles from styles.js */}
      <p className={styles.sectionSubText}>Ask me anything</p>{" "}
      {/* Translated */}
      {/* Section title, using styles from styles.js */}
      <h3 className={styles.sectionHeadText}>Chatbot.</h3>
      {/* Main container for message area and input */}
      <div className="flex flex-col gap-8 mt-12">
        {/* Chatbot message area */}
        <div className="chat-messages h-64 overflow-y-auto border border-zinc-700 p-3 mb-4 rounded-lg bg-black-200 text-white">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message p-2 my-1 rounded-lg ${
                msg.sender === "user"
                  ? "bg-tertiary text-white ml-auto"
                  : "bg-zinc-700 text-white mr-auto"
              }`}
              style={{ maxWidth: "80%" }}
            >
              {msg.sender === "user" ? "You: " : "Assistant: "} {msg.text}{" "}
              {/* Translated */}
            </div>
          ))}
          {/* 'Typing...' indicator when the chatbot is processing */}
          {loading && (
            <div
              className="message bot p-2 my-1 rounded-lg bg-zinc-700 text-white mr-auto"
              style={{ maxWidth: "80%" }}
            >
              Assistant: Typing... {/* Translated */}
            </div>
          )}
          {/* Empty element to help with auto-scroll */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input and send button section */}
        <div className="flex flex-col gap-4">
          <label htmlFor="chat-input" className="flex flex-col">
            <span className="mb-4 font-medium text-white">Your Question</span>{" "}
            {/* Translated */}
            <input
              id="chat-input"
              type="text"
              className="px-6 py-4 font-medium text-white border-none rounded-lg outline-none bg-tertiary placeholder:text-secondary"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about Denny..."
              disabled={loading}
            />
          </label>
          <button
            onClick={sendMessage}
            className="px-8 py-3 font-bold text-white shadow-md outline-none bg-tertiary rounded-xl w-fit shadow-primary hover:bg-tertiary-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"} {/* Translated */}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default SectionWrapper(Chatbot, "chatbot");
