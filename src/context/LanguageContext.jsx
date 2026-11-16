import React, { createContext, useContext, useEffect, useState } from "react";

const TRANSLATIONS = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      work: "Work",
      certs: "Certs",
      projects: "Projects",
      contact: "Contact",
    },
    chapters: {
      hero: "Intro",
      about: "About",
      work: "Experience",
      certificate: "Credentials",
      projects: "Projects",
      contact: "Connect",
    },
    hero: {
      badge: "Available for Projects",
      greeting: "Hi, I'm",
      iam: "I am a",
      description:
        "I build web applications with React, Laravel, and Node.js, and keep Linux servers, networks, and IT operations running smoothly.",
      ctaPrimary: "Get in Touch",
      ctaCv: "Download CV",
      lanyardRole: "Full Stack Developer & IT Specialist",
      lanyardBio:
        "Full Stack Developer and IT Specialist working with React, Laravel, and Node.js alongside Linux servers, networking, and IT support.",
      lanyardContact: "Contact Me",
      lanyardProjects: "View Projects",
      lanyardDrag: "Drag & pull",
      lanyardFlip: "Click to flip",
    },
    about: {
      sub: "Introduction",
      head: "Overview.",
      body: "I'm a Full Stack Developer and IT Specialist who builds web applications with React, Laravel, and Node.js while managing Linux servers, networks, and IT support. Let's work together to turn your ideas into working software.",
      services: [
        { title: "Web Developer", desc: "Responsive React, Next.js, and Laravel web apps." },
        { title: "Mobile Developer", desc: "Cross-platform mobile apps with Flutter & APIs." },
        { title: "Backend Developer", desc: "REST APIs, databases, and cloud integrations." },
        { title: "IT Support", desc: "Linux servers, networking, CCTV, and troubleshooting." },
      ],
    },
    experience: {
      sub: "What I have done so far",
      head: "Work Experience",
    },
    certificate: {
      sub: "Credentials & Recognition",
      titlePre: "My",
      titleAccent: "Certificates.",
      subtitle:
        "Competency certificates and credentials earned across web development, networking, and cloud.",
      countSuffix: "Certificates",
      viewAction: "View credentials",
      publisher: "Publisher",
      credential: "Credential ID",
      year: "Issued",
      verify: "Verify",
      close: "Close",
    },
    tech: {
      sub: "Tools & Stack",
      head: "Technologies.",
    },
    works: {
      sub: "My Work",
      head: "Projects.",
      body: "These projects showcase real-world applications I have built across web development and IT systems, complete with links to repositories and live demos.",
    },
    feedbacks: {
      sub: "What others say",
      head: "Testimonials.",
    },
    contact: {
      sub: "Get in touch",
      head: "Contact.",
      nameLabel: "Your Name",
      namePlaceholder: "What's your name?",
      emailLabel: "Your Email",
      emailPlaceholder: "What's your email?",
      messageLabel: "Your Message",
      messagePlaceholder: "What would you like to say?",
      send: "Send",
      sending: "Sending...",
    },
    chatbot: {
      sub: "Ask me anything",
      head: "Chatbot.",
      questionLabel: "Your Question",
      placeholder: "Ask about Denny...",
      send: "Send",
      sending: "Sending...",
    },
  },
  id: {
    nav: {
      home: "Beranda",
      about: "Tentang",
      work: "Karier",
      certs: "Sertifikat",
      projects: "Proyek",
      contact: "Kontak",
    },
    chapters: {
      hero: "Pembuka",
      about: "Tentang",
      work: "Pengalaman",
      certificate: "Sertifikasi",
      projects: "Proyek",
      contact: "Kontak",
    },
    hero: {
      badge: "Tersedia untuk Proyek",
      greeting: "Halo, Saya",
      iam: "Saya seorang",
      description:
        "Saya membangun aplikasi web dengan React, Laravel, dan Node.js, serta menjaga server Linux, jaringan, dan operasional IT berjalan lancar.",
      ctaPrimary: "Hubungi Saya",
      ctaCv: "Unduh CV",
      lanyardRole: "Full Stack Developer & IT Specialist",
      lanyardBio:
        "Full Stack Developer dan IT Specialist yang bekerja dengan React, Laravel, dan Node.js serta server Linux, jaringan, dan dukungan IT.",
      lanyardContact: "Hubungi Saya",
      lanyardProjects: "Lihat Proyek",
      lanyardDrag: "Seret & tarik",
      lanyardFlip: "Klik untuk balik",
    },
    about: {
      sub: "Perkenalan",
      head: "Ringkasan.",
      body: "Saya adalah Full Stack Developer dan IT Specialist yang membangun aplikasi web dengan React, Laravel, dan Node.js sekaligus mengelola server Linux, jaringan, dan dukungan IT. Mari berkolaborasi mewujudkan ide Anda menjadi produk nyata.",
      services: [
        { title: "Web Developer", desc: "Aplikasi web responsif dengan React, Next.js, dan Laravel." },
        { title: "Mobile Developer", desc: "Aplikasi mobile lintas platform dengan Flutter & API." },
        { title: "Backend Developer", desc: "REST API, basis data, dan integrasi layanan cloud." },
        { title: "IT Support", desc: "Server Linux, jaringan, CCTV, dan penanganan gangguan." },
      ],
    },
    experience: {
      sub: "Perjalanan karier sejauh ini",
      head: "Pengalaman Kerja",
    },
    certificate: {
      sub: "Kredensial & Pengakuan",
      titlePre: "Sertifikat",
      titleAccent: "Saya.",
      subtitle:
        "Sertifikat kompetensi dan kredensial yang saya raih di bidang pengembangan web, jaringan, dan cloud.",
      countSuffix: "Sertifikat",
      viewAction: "Lihat kredensial",
      publisher: "Penerbit",
      credential: "ID Kredensial",
      year: "Tahun",
      verify: "Verifikasi",
      close: "Tutup",
    },
    tech: {
      sub: "Alat & Teknologi",
      head: "Teknologi.",
    },
    works: {
      sub: "Karya Saya",
      head: "Proyek.",
      body: "Proyek-proyek berikut menampilkan aplikasi nyata yang telah saya bangun di bidang pengembangan web dan sistem IT, lengkap dengan tautan kode sumber dan demo langsung.",
    },
    feedbacks: {
      sub: "Kata mereka",
      head: "Testimoni.",
    },
    contact: {
      sub: "Mari terhubung",
      head: "Kontak.",
      nameLabel: "Nama Anda",
      namePlaceholder: "Siapa nama Anda?",
      emailLabel: "Email Anda",
      emailPlaceholder: "Apa alamat email Anda?",
      messageLabel: "Pesan Anda",
      messagePlaceholder: "Apa yang ingin Anda sampaikan?",
      send: "Kirim",
      sending: "Mengirim...",
    },
    chatbot: {
      sub: "Tanyakan apa saja",
      head: "Chatbot.",
      questionLabel: "Pertanyaan Anda",
      placeholder: "Tanyakan tentang Denny...",
      send: "Kirim",
      sending: "Mengirim...",
    },
  },
};

const LanguageContext = createContext({
  lang: "en",
  setLang: () => {},
  toggleLang: () => {},
  t: TRANSLATIONS.en,
});

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("portfolio_lang");
      if (saved === "id" || saved === "en") return saved;
    }
    return "en";
  });

  useEffect(() => {
    window.localStorage.setItem("portfolio_lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => setLang((prev) => (prev === "en" ? "id" : "en"));

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, toggleLang, t: TRANSLATIONS[lang] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

