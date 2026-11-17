import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  Check,
  Copy,
  Loader2,
  MessageCircle,
  RotateCcw,
  Send,
  User,
} from "lucide-react";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { useLanguage } from "../context/LanguageContext";
import { answerPortfolioQuestion } from "../utils/portfolioAssistant";

const TypingDots = () => (
  <div className="flex items-center gap-1.5 py-1 px-1" aria-label="Typing">
    {[0, 1, 2].map((dot) => (
      <motion.span
        key={dot}
        animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
        transition={{
          duration: 0.9,
          repeat: Infinity,
          delay: dot * 0.16,
          ease: "easeInOut",
        }}
        className="w-1.5 h-1.5 rounded-full bg-sky-400"
      />
    ))}
  </div>
);

const MessageBubble = ({ message, isBot, t }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Ignore clipboard failures silently
    }
  };

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`group flex items-end gap-2.5 ${
        isBot ? "justify-start" : "justify-end"
      }`}
    >
      {isBot && (
        <div className="w-7 h-7 rounded-full bg-blue-500/15 border border-sky-400/35 flex items-center justify-center shrink-0 mb-0.5">
          <Bot className="w-3.5 h-3.5 text-sky-400" />
        </div>
      )}

      <div
        className={`relative max-w-[84%] sm:max-w-[78%] px-4 py-3 text-xs sm:text-[13.5px] leading-relaxed whitespace-pre-line ${
          isBot
            ? "rounded-2xl rounded-bl-sm bg-[#050816]/90 border border-white/10 text-slate-200 shadow-sm"
            : "rounded-2xl rounded-br-sm bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-[0_8px_22px_-8px_rgba(37,99,235,0.6)]"
        }`}
      >
        <p>{message.text}</p>

        {isBot && !message.isWelcome && (
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? t.chatbot.copied : t.chatbot.copy}
            className="mt-2 inline-flex items-center gap-1 text-[10px] font-medium text-slate-400 hover:text-sky-300 transition-colors cursor-pointer"
          >
            {copied ? (
              <Check className="w-3 h-3 text-emerald-400" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
            <span>{copied ? t.chatbot.copied : t.chatbot.copy}</span>
          </button>
        )}
      </div>

      {!isBot && (
        <div className="w-7 h-7 rounded-full bg-white/[0.08] border border-white/15 flex items-center justify-center shrink-0 mb-0.5">
          <User className="w-3.5 h-3.5 text-slate-200" />
        </div>
      )}
    </motion.div>
  );
};

function Chatbot() {
  const { lang, t } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if ((messages.length > 0 || loading) && chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, loading]);

  const sendMessage = useCallback(
    async (overrideText) => {
      const textToSend = (
        typeof overrideText === "string" ? overrideText : input
      ).trim();
      if (!textToSend || loading) return;

      const userMessage = {
        id: `user-${Date.now()}`,
        sender: "user",
        text: textToSend,
      };

      const historySnapshot = [...messages, userMessage];
      setMessages(historySnapshot);
      if (typeof overrideText !== "string") {
        setInput("");
      }
      setLoading(true);

      let answerText = "";
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      try {
        const response = await fetch("/api/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: textToSend,
            history: messages.slice(-6),
            lang,
          }),
          signal: controller.signal,
        });

        if (response.ok) {
          const contentType = response.headers.get("content-type") || "";
          if (contentType.includes("application/json")) {
            const data = await response.json();
            if (data?.answer && typeof data.answer === "string") {
              answerText = data.answer.trim();
            }
          }
        }
      } catch {
        // Silent fallback to built-in knowledge engine when /api/ask is unreachable
      } finally {
        clearTimeout(timeoutId);
      }

      if (!answerText) {
        await new Promise((r) => setTimeout(r, 320));
        answerText = answerPortfolioQuestion(textToSend, lang);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: answerText,
        },
      ]);
      setLoading(false);
    },
    [input, loading, messages, lang]
  );

  const handleReset = () => {
    if (loading) return;
    setMessages([]);
    setInput("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
      {/* Left Column: Header + Quick Prompts */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="lg:col-span-5 flex flex-col"
      >
        <p className={styles.sectionSubText}>{t.chatbot.sub}</p>
        <h3 className={styles.sectionHeadText}>{t.chatbot.head}</h3>
        <p className="mt-3 text-sm sm:text-[15px] text-slate-300/90 leading-relaxed max-w-md">
          {t.chatbot.desc}
        </p>

        {/* Suggested Quick Questions */}
        <div className="mt-7">
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-400/90 mb-3 flex items-center gap-1.5">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{t.chatbot.suggestedTitle}</span>
          </p>

          <div className="flex flex-col gap-2.5">
            {t.chatbot.suggested.map((prompt) => (
              <button
                key={prompt}
                type="button"
                disabled={loading}
                onClick={() => sendMessage(prompt)}
                className="group flex items-center justify-between gap-3 text-left px-4 py-3 rounded-xl bg-[#0b132b]/80 hover:bg-[#0b132b] border border-white/10 hover:border-sky-400/45 text-xs sm:text-[13px] text-slate-200 hover:text-white transition-all duration-200 disabled:opacity-50 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <span>{prompt}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right Column: Interactive Obsidian Chat Panel */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="lg:col-span-7 rounded-3xl p-[1px] bg-gradient-to-b from-sky-400/35 via-blue-500/15 to-white/5 shadow-[0_24px_70px_-15px_rgba(37,99,235,0.25)]"
      >
        <div className="rounded-[23px] bg-[#0b132b]/85 backdrop-blur-xl overflow-hidden flex flex-col">
          {/* Chat Header */}
          <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between gap-4 bg-[#050816]/45">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-sky-400/30 flex items-center justify-center shadow-inner">
                <Bot className="w-4 h-4 text-sky-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white tracking-tight">
                  {t.chatbot.assistantName}
                </p>
                <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{t.chatbot.statusOnline}</span>
                </p>
              </div>
            </div>

            {messages.length > 0 && (
              <button
                type="button"
                onClick={handleReset}
                disabled={loading}
                aria-label={t.chatbot.clearChat}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/10 border border-white/10 text-[11px] font-medium text-slate-300 hover:text-white transition-colors disabled:opacity-50 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{t.chatbot.clearChat}</span>
              </button>
            )}
          </div>

          {/* Chat Message Stream */}
          <div
            ref={chatContainerRef}
            role="log"
            aria-live="polite"
            className="h-[340px] sm:h-[380px] overflow-y-auto px-4 sm:px-5 py-5 flex flex-col gap-4"
          >
            {/* Initial Assistant Greeting */}
            <MessageBubble
              isBot
              t={t}
              message={{
                id: "welcome",
                sender: "bot",
                text: t.chatbot.welcome,
                isWelcome: true,
              }}
            />

            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isBot={msg.sender === "bot"}
                  t={t}
                />
              ))}
            </AnimatePresence>

            {/* Animated Typing Bubble */}
            <AnimatePresence>
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="flex items-end gap-2.5 justify-start"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-500/15 border border-sky-400/35 flex items-center justify-center shrink-0 mb-0.5">
                    <Bot className="w-3.5 h-3.5 text-sky-400" />
                  </div>
                  <div className="px-4 py-2.5 rounded-2xl rounded-bl-sm bg-[#050816]/90 border border-white/10 flex items-center gap-2">
                    <TypingDots />
                    <span className="text-[11px] text-slate-400">
                      {t.chatbot.sending}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="p-3 sm:p-4 border-t border-white/10 bg-[#050816]/55"
          >
            <div className="flex items-center gap-2 rounded-2xl bg-[#050816]/90 border border-white/10 focus-within:border-sky-400/65 focus-within:ring-2 focus-within:ring-sky-400/20 p-1.5 pl-4 transition-all duration-200">
              <label htmlFor="chat-input" className="sr-only">
                {t.chatbot.questionLabel}
              </label>
              <input
                ref={inputRef}
                id="chat-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.chatbot.placeholder}
                disabled={loading}
                className="w-full bg-transparent text-xs sm:text-sm text-white placeholder:text-slate-500 outline-none disabled:opacity-60"
              />
              <motion.button
                type="submit"
                disabled={loading || !input.trim()}
                whileHover={{ scale: loading || !input.trim() ? 1 : 1.03 }}
                whileTap={{ scale: loading || !input.trim() ? 1 : 0.96 }}
                aria-label={t.chatbot.send}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-xs sm:text-sm font-semibold text-white shadow-[0_6px_18px_-4px_rgba(37,99,235,0.6)] transition-all duration-200 disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer shrink-0"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span className="hidden sm:inline">{t.chatbot.send}</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default SectionWrapper(Chatbot, "chatbot");
