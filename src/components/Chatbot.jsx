// File: src/components/Chatbot.js

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion'; // Impor motion dari framer-motion
import { styles } from '../styles'; // Impor styles dari file styles Anda (asumsi di src/)
import { SectionWrapper } from '../hoc'; // Impor SectionWrapper HOC (asumsi di src/hoc/)
import { slideIn } from '../utils/motion'; // Impor slideIn variant (asumsi di src/utils/)

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Otomatis scroll ke bawah setiap kali ada pesan baru
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (input.trim() === '') return; // Jangan kirim pesan kosong

    const userMessage = { sender: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]); // Tambahkan pesan pengguna
    setInput(''); // Kosongkan input

    setLoading(true); // Aktifkan status loading

    try {
      // Panggil Vercel Serverless Function Anda
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userMessage.text }),
      });

      const data = await response.json();
      // Tambahkan jawaban dari chatbot
      const botMessage = { sender: 'bot', text: data.answer || 'Maaf, saya tidak dapat memproses permintaan Anda.' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Kesalahan saat mengirim pesan:', error);
      const errorMessage = { sender: 'bot', text: 'Terjadi kesalahan. Silakan coba lagi.' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false); // Nonaktifkan status loading
    }
  };

  return (
    // Menggunakan motion.div dan varian slideIn dari framer-motion
    // Ini akan memberikan animasi slide-in yang sama dengan komponen Contact.jsx
    <motion.div
      variants={slideIn('left', 'tween', 0.2, 1)} // Sesuaikan arah, jenis tween, delay, dan durasi animasi
      // Kelas Tailwind CSS disesuaikan agar seragam dengan Contact.jsx
      className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
    >
      {/* Sub-teks bagian, menggunakan gaya dari styles.js */}
      <p className={styles.sectionSubText}>Tanyakan pada saya</p>
      {/* Judul bagian, menggunakan gaya dari styles.js */}
      <h3 className={styles.sectionHeadText}>Chatbot.</h3>

      {/* Kontainer utama untuk area pesan dan input */}
      <div className="flex flex-col gap-8 mt-12">
        {/* Area pesan Chatbot */}
        <div className="chat-messages h-64 overflow-y-auto border border-zinc-700 p-3 mb-4 rounded-lg bg-black-200 text-white">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message p-2 my-1 rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-tertiary text-white ml-auto' // Pesan pengguna: latar belakang tersier, teks putih, rata kanan
                  : 'bg-zinc-700 text-white mr-auto' // Pesan bot: latar belakang zinc-700, teks putih, rata kiri
              }`}
              style={{ maxWidth: '80%' }} // Batasi lebar pesan
            >
              {msg.sender === 'user' ? 'Anda: ' : 'Asisten: '} {msg.text}
            </div>
          ))}
          {/* Indikator 'Mengetik...' saat chatbot sedang memproses */}
          {loading && (
            <div className="message bot p-2 my-1 rounded-lg bg-zinc-700 text-white mr-auto" style={{ maxWidth: '80%' }}>
              Asisten: Mengetik...
            </div>
          )}
          {/* Elemen kosong untuk membantu auto-scroll */}
          <div ref={messagesEndRef} />
        </div>

        {/* Bagian input dan tombol kirim */}
        <div className="flex flex-col gap-4">
          <label htmlFor="chat-input" className="flex flex-col">
            <span className="mb-4 font-medium text-white">Your Question</span>
            <input
              id="chat-input"
              type="text"
              // Gaya input disesuaikan dengan input form Contact.jsx
              className="px-6 py-4 font-medium text-white border-none rounded-lg outline-none bg-tertiary placeholder:text-secondary"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Tanyakan tentang Denny..."
              disabled={loading} // Nonaktifkan input saat loading
            />
          </label>
          <button
            onClick={sendMessage}
            // Gaya tombol disesuaikan dengan tombol form Contact.jsx
            className="px-8 py-3 font-bold text-white shadow-md outline-none bg-tertiary rounded-xl w-fit shadow-primary hover:bg-tertiary-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading} // Nonaktifkan tombol saat loading
          >
            {loading ? 'Mengirim...' : 'Kirim'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Wrap komponen Chatbot dengan SectionWrapper untuk konsistensi
// SectionWrapper bertanggung jawab untuk mengatur animasi 'staggerContainer'
export default SectionWrapper(Chatbot, 'chatbot');
