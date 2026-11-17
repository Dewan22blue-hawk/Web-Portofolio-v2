import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

const DENNY_STRUCTURED_DATA = `
**Profil Denny Irawan:**
- Nama Lengkap: Denny Irawan
- Peran: Full Stack Developer & IT Specialist
- Email: dennyirawan170204@gmail.com
- WhatsApp / Telepon: +62 852 3754 5993
- Lokasi: Surakarta, Jawa Tengah, Indonesia
- LinkedIn: https://www.linkedin.com/in/denny-irawan22
- GitHub: https://github.com/Dewan22blue-hawk
- Ringkasan: Full Stack Developer dan IT Specialist yang membangun aplikasi web dengan React, Next.js, Laravel, dan Node.js sekaligus mengelola server Linux, administrasi jaringan, dukungan IT, serta layanan cloud (Google Cloud Platform & Alibaba Cloud).

**Pendidikan:**
1. Sarjana (S1) Sistem Informasi — Universitas Bina Sarana Informatika (Surakarta)
   - Periode: 09/2025 – 2026 | Status: Lulus · Cum Laude
   - Fokus: Analisis & perancangan sistem informasi, manajemen basis data, analisis proses bisnis, pengembangan aplikasi, dan transformasi digital.
2. Diploma III (D3) Sistem Informasi — Universitas Bina Sarana Informatika (Surakarta)
   - Periode: 09/2022 – 08/2025 | Status: Lulus · Wisudawan Terbaik · Summa Cum Laude
   - Fokus: Pemrograman, pengembangan aplikasi, pengelolaan basis data, dan analisis sistem.
3. SMK Negeri 1 Donorojo (Pacitan, Jawa Timur) — Teknik Komputer dan Jaringan (TKJ)
   - Periode: 2019 – 2022 | Status: Telah lulus
   - Fokus: Perakitan komputer, administrasi jaringan, RT/RW Net & Network Engineer, Cyber Security, dan Web Development.

**Pengalaman Kerja:**
1. Marketing Communication (MARCOM) Intern — DMER Universitas Bina Sarana Informatika (UBSI), Surakarta (05/2026 – 10/2026)
2. Mentor Facilitator — Google Facilitator Program 2025, Online (05/2025 – 12/2025)
3. Full-Stack Web Developer — PT Deraly Innovation Digital, Bantul, Yogyakarta (05/2024 – Present)
4. Full-Stack Web Developer Freelance — Deraly.id, Yogyakarta (Aug 2022 – Feb 2023)
5. Information Technology Support — Universitas Bina Sarana Informatika (UBSI), Surakarta (Jan 2023 – Present)
6. Network Engineer Technician — Sedjajar.net (Mar 2020 – May 2022)

**Proyek Utama:**
1. SEO Bizzagi Audit (NextJS, React JS, Tailwind, DaisyUI, GCP Services, OAuth2) — https://github.com/C242-SA01/fullstack-seo
2. API LLM SEO Audit (Flask, LLM, Random Forest, Postman, GCP Services) — https://github.com/C242-SA01/backend-model
3. Report Desk App (CodeIgniter 4, PHP, Tailwind) — https://github.com/hawk-xc/CI4-spark/tree/master/report_desk_wapl
4. Stasiun Roti (HTML 5, CSS 3, Bootstrap, jQuery) — https://github.com/Dewan22blue-hawk/website-kelompok
5. Laradev E-Antrean Web Apps (Laravel API, Laravel Livewire, Tailwind) — https://github.com/hawk-xc/Laradev_e_antrean
6. Mobile Apps E-Antrean (Flutter & Laravel Sanctum API) — https://github.com/hawk-xc/Flutter_e_antrean

**Keahlian & Teknologi:**
- Frontend: React.js, Next.js, Tailwind CSS, Bootstrap, jQuery, HTML 5, CSS 3, Figma
- Backend & DB: Laravel, CodeIgniter 4, Node.js, Express, Flask, PHP, Python, JavaScript, MySQL, MongoDB
- Mobile: Flutter, Dart
- Cloud & Infrastruktur: Google Cloud Platform (GCP), Alibaba Cloud, Docker, Linux, MikroTik, Cisco, Network Security, IT Support, Software Quality Assurance (SQA)

**Sertifikasi Kompetensi:**
- Developer (Dicoding, Codepolitan, Skilvul, IAII, Kemdikbudristek)
- Cyber Security (LKS Wilker 4, Gemastik, Cisco Ethical Hacker, Google Cybersecurity)
- Cloud Computing (Google Cloud Architect & Foundations, Alibaba Cloud ACA & ACP Cloud Computing)
- Network & IT Support (CCNA: Introduction to Networks, MTCNA, BNSP Junior Network Administrator, LSP Network Engineer, TKJ)
- Lainnya: Bangkit Academy Certificate, Software Quality Assurance (SQA)
`;

function buildServerFallback(question, lang = "id") {
  const q = (question || "").toLowerCase();
  const isId =
    lang === "id" ||
    /\b(siapa|apa|pengalaman|kerja|pendidikan|kuliah|lulus|proyek|sertifikat|kontak|hubungi|halo|hai)\b/i.test(q);

  if (/(contact|hubungi|kontak|email|wa|whatsapp|linkedin|github)/.test(q)) {
    return isId
      ? "Anda dapat menghubungi saya melalui:\n• Email: dennyirawan170204@gmail.com\n• WhatsApp: +62 852 3754 5993\n• LinkedIn: linkedin.com/in/denny-irawan22\n• GitHub: github.com/Dewan22blue-hawk"
      : "You can contact me via:\n• Email: dennyirawan170204@gmail.com\n• WhatsApp: +62 852 3754 5993\n• LinkedIn: linkedin.com/in/denny-irawan22\n• GitHub: github.com/Dewan22blue-hawk";
  }
  if (/(education|pendidikan|kuliah|lulus|sarjana|diploma|s1|d3|smk|ubsi)/.test(q)) {
    return isId
      ? "Riwayat pendidikan saya:\n• S1 Sistem Informasi — UBSI (09/2025 – 2026) · Lulus Cum Laude\n• D3 Sistem Informasi — UBSI (09/2022 – 08/2025) · Summa Cum Laude · Wisudawan Terbaik\n• SMK Negeri 1 Donorojo — TKJ (2019 – 2022)"
      : "My education history:\n• Bachelor (S1) in Information Systems — UBSI (09/2025 – 2026) · Cum Laude\n• Diploma III (D3) in Information Systems — UBSI (09/2022 – 08/2025) · Summa Cum Laude · Best Graduate\n• SMK Negeri 1 Donorojo — TKJ (2019 – 2022)";
  }
  if (/(experience|pengalaman|kerja|karier|work|deraly|facilitator|marcom|sedjajar)/.test(q)) {
    return isId
      ? "Pengalaman kerja saya:\n• MARCOM Intern — DMER UBSI (05/2026 – 10/2026)\n• Mentor Facilitator — Google Facilitator Program 2025 (05/2025 – 12/2025)\n• Full-Stack Web Developer — PT Deraly Innovation Digital (05/2024 – Present)\n• IT Support — UBSI (Jan 2023 – Present)\n• Network Engineer — Sedjajar.net (Mar 2020 – May 2022)"
      : "My work experience:\n• MARCOM Intern — DMER UBSI (05/2026 – 10/2026)\n• Mentor Facilitator — Google Facilitator Program 2025 (05/2025 – 12/2025)\n• Full-Stack Web Developer — PT Deraly Innovation Digital (05/2024 – Present)\n• IT Support — UBSI (Jan 2023 – Present)\n• Network Engineer Technician — Sedjajar.net (Mar 2020 – May 2022)";
  }
  if (/(project|proyek|projek|aplikasi|seo|antrean|report desk|stasiun roti)/.test(q)) {
    return isId
      ? "Proyek unggulan saya:\n• SEO Bizzagi Audit (NextJS, React, GCP, OAuth2)\n• API LLM SEO Audit (Flask, LLM, Random Forest)\n• Report Desk App (CodeIgniter 4, Tailwind)\n• Stasiun Roti (HTML5, CSS3, Bootstrap, jQuery)\n• Laradev E-Antrean Web & Mobile Apps (Laravel Livewire & Flutter)"
      : "My featured projects:\n• SEO Bizzagi Audit (NextJS, React, GCP, OAuth2)\n• API LLM SEO Audit (Flask, LLM, Random Forest)\n• Report Desk App (CodeIgniter 4, Tailwind)\n• Stasiun Roti (HTML5, CSS3, Bootstrap, jQuery)\n• Laradev E-Antrean Web & Mobile Apps (Laravel Livewire & Flutter)";
  }

  return isId
    ? "Saya Denny Irawan, Full Stack Developer & IT Specialist di Surakarta. Tanyakan kepada saya seputar pendidikan (S1/D3 Sistem Informasi UBSI), pengalaman kerja, proyek web/mobile, sertifikasi, atau kontak saya!"
    : "I'm Denny Irawan, a Full Stack Developer & IT Specialist based in Surakarta. Feel free to ask about my education, work experience, web/mobile projects, certifications, or contact details!";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { question, history = [], lang = "en" } = req.body || {};

  if (!question || typeof question !== "string" || !question.trim()) {
    return res.status(400).json({ error: "Question is required." });
  }

  const hasValidKey =
    GEMINI_API_KEY &&
    !GEMINI_API_KEY.includes("YOUR_GEMINI_API_KEY") &&
    GEMINI_API_KEY.trim().length > 10;

  if (!hasValidKey) {
    return res.status(200).json({
      answer: buildServerFallback(question, lang),
      source: "knowledge-base",
    });
  }

  const historyText = Array.isArray(history)
    ? history
        .slice(-6)
        .map((m) => `${m.sender === "user" ? "User" : "Denny"}: ${m.text}`)
        .join("\n")
    : "";

  const prompt = `
Anda adalah asisten virtual resmi untuk portofolio Denny Irawan (berbicara sebagai "saya" / "I" mewakili Denny Irawan).
Jawablah menggunakan bahasa yang sama dengan pertanyaan pengguna (Bahasa Indonesia atau English).
Gunakan HANYA fakta dari data terstruktur di bawah ini. Jika ada hal yang tidak tercantum, katakan dengan jujur bahwa informasi tersebut tidak tersedia di portofolio ini.
Buat jawaban ringkas, ramah, jelas, dan langsung ke intinya (boleh memakai poin singkat bila membantu).

Data Portofolio Denny Irawan:
---
${DENNY_STRUCTURED_DATA}
---
${historyText ? `\nRiwayat Percakapan Terakhir:\n${historyText}\n` : ""}
Pertanyaan Pengguna: ${question.trim()}

Jawaban:
  `.trim();

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const candidateModels = ["gemini-2.5-flash", "gemini-2.0-flash"];

  for (const modelName of candidateModels) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const text = result?.response?.text?.();
      if (text && text.trim()) {
        return res.status(200).json({
          answer: text.trim(),
          source: modelName,
        });
      }
    } catch (error) {
      console.warn(`Model ${modelName} failed:`, error?.message || error);
    }
  }

  // Graceful fallback so visitor always receives an accurate answer
  return res.status(200).json({
    answer: buildServerFallback(question, lang),
    source: "knowledge-base",
  });
}
