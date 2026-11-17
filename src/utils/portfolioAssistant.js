import {
  educations,
  educationsId,
  experiences,
  experiencesId,
  projects,
  projectsId,
} from "../constants";
import CertificateItems from "../constants/certificate";

const INDONESIAN_HINTS =
  /\b(siapa|apa|bagaimana|dimana|di mana|kapan|berapa|kenapa|mengapa|pengalaman|kerja|pendidikan|kuliah|lulus|proyek|projek|sertifikat|keahlian|skill|kontak|hubungi|email|nomor|wa|whatsapp|halo|hai|selamat|terima kasih|makasih|bisa|punya|tentang|kamu|anda|denny)\b/i;

function detectIndonesian(text, fallbackLang) {
  if (INDONESIAN_HINTS.test(text)) return true;
  if (/\b(who|what|where|when|how|experience|work|education|degree|project|certificate|skill|tech|contact|hello|hi|thanks|about|you)\b/i.test(text)) {
    return false;
  }
  return fallbackLang === "id";
}

function formatMessage(lines) {
  return lines.filter(Boolean).join("\n");
}

export function answerPortfolioQuestion(question, fallbackLang = "en") {
  const q = (question || "").trim().toLowerCase();
  const isId = detectIndonesian(q, fallbackLang);

  // 1. Greeting / Intro
  if (
    /^(hi|hello|hey|halo|hai|p|pagi|siang|sore|malam|assalamualaikum)\b/i.test(q) ||
    q.length < 4
  ) {
    return isId
      ? "Halo! Saya asisten portofolio Denny Irawan. Anda bisa menanyakan tentang riwayat pendidikan, pengalaman kerja, proyek yang pernah dibuat, keahlian teknologi, sertifikasi, atau cara menghubungi saya."
      : "Hi! I'm Denny Irawan's portfolio assistant. Feel free to ask about my education, work experience, projects, tech stack, certificates, or how to get in touch.";
  }

  // 2. Contact / Hire / Socials
  if (/(contact|hubungi|kontak|email|mail|phone|hp|wa|whatsapp|linkedin|github|hire|rekru|lokasi|location|alamat|domisili)/.test(q)) {
    return formatMessage(
      isId
        ? [
            "Anda dapat menghubungi saya melalui beberapa kanal berikut:",
            "• Email: dennyirawan170204@gmail.com",
            "• WhatsApp / Telepon: +62 852 3754 5993",
            "• LinkedIn: linkedin.com/in/denny-irawan22",
            "• GitHub: github.com/Dewan22blue-hawk",
            "• Domisili: Surakarta, Jawa Tengah, Indonesia",
          ]
        : [
            "You can reach me directly through any of these channels:",
            "• Email: dennyirawan170204@gmail.com",
            "• WhatsApp / Phone: +62 852 3754 5993",
            "• LinkedIn: linkedin.com/in/denny-irawan22",
            "• GitHub: github.com/Dewan22blue-hawk",
            "• Location: Surakarta, Central Java, Indonesia",
          ]
    );
  }

  // 3. Education / Degree / Cum Laude / Campus
  if (/(education|pendidikan|kuliah|lulus|sarjana|diploma|s1|d3|smk|sekolah|kampus|ubsi|bina sarana|cum laude|cumlaude|wisudawan|donorojo|tkj)/.test(q)) {
    const list = isId ? educationsId : educations;
    const header = isId
      ? "Berikut riwayat pendidikan yang telah saya tempuh:"
      : "Here is my academic background:";
    const items = list.map(
      (edu) => `• ${edu.degree} — ${edu.institution} (${edu.period}) · ${edu.status}`
    );
    return formatMessage([header, ...items]);
  }

  // 4. Work Experience / Career / Job
  if (/(experience|pengalaman|kerja|karier|karir|work|job|magang|intern|deraly|facilitator|google|sedjajar|marcom|dmer|it support)/.test(q)) {
    const list = isId ? experiencesId : experiences;
    const header = isId
      ? "Berikut pengalaman kerja dan peran profesional saya:"
      : "Here is my professional work experience:";
    const items = list.map(
      (exp) => `• ${exp.title} at ${exp.company_name} (${exp.date})`
    );
    return formatMessage([header, ...items]);
  }

  // 5. Projects / Portfolio / Apps
  if (/(project|proyek|projek|karya|aplikasi|app|web|portfolio|portofolio|seo|bizzagi|report desk|stasiun roti|antrean|e-antrean|flutter|flask)/.test(q)) {
    const list = isId ? projectsId : projects;
    const header = isId
      ? "Berikut beberapa proyek unggulan yang telah saya bangun:"
      : "Here are the featured projects I have built:";
    const items = list.map(
      (proj) =>
        `• ${proj.name} (${proj.tags.map((tag) => tag.name).slice(0, 3).join(", ")}) — ${proj.source_code_link}`
    );
    return formatMessage([header, ...items]);
  }

  // 6. Certificates / Certifications / Credentials
  if (/(cert|sertifikat|sertifikasi|kredensial|credential|bnsp|ccna|mtcna|bangkit|alibaba|dicoding|cisco|sqa)/.test(q)) {
    const totalCerts = CertificateItems.reduce((sum, cat) => sum + cat.items.length, 0);
    const header = isId
      ? `Saya memiliki ${totalCerts} sertifikat kompetensi yang terbagi ke dalam ${CertificateItems.length} kategori:`
      : `I hold ${totalCerts} competency certificates across ${CertificateItems.length} categories:`;
    const items = CertificateItems.map(
      (cat) => `• ${cat.name} (${cat.items.length})`
    );
    return formatMessage([
      header,
      ...items,
      isId
        ? "Di antaranya termasuk Bangkit Academy, Google Cloud, Alibaba Cloud ACA/ACP, CCNA, MTCNA, BNSP JNA, dan Ethical Hacker."
        : "Highlights include Bangkit Academy, Google Cloud, Alibaba Cloud ACA/ACP, CCNA, MTCNA, BNSP JNA, and Ethical Hacker.",
    ]);
  }

  // 7. Tech Stack / Skills / Programming / Tools
  if (/(skill|keahlian|tech|teknologi|bahasa|language|stack|framework|react|laravel|next|node|python|php|docker|linux|network|jaringan|cloud|gcp)/.test(q)) {
    return formatMessage(
      isId
        ? [
            "Keahlian utama saya mencakup pengembangan Full-Stack, Cloud, dan Infrastruktur IT:",
            "• Frontend & Web: React.js, Next.js, Laravel, CodeIgniter 4, Tailwind CSS, JavaScript, PHP",
            "• Backend & AI: Node.js, Express, Flask, Python, REST API, MySQL, MongoDB",
            "• Mobile: Flutter & Laravel Sanctum API",
            "• Cloud, Server & Jaringan: Google Cloud (GCP), Alibaba Cloud, Docker, Linux, MikroTik, Cisco, Keamanan Jaringan & IT Support",
          ]
        : [
            "My core skills span Full-Stack Development, Cloud, and IT Infrastructure:",
            "• Frontend & Web: React.js, Next.js, Laravel, CodeIgniter 4, Tailwind CSS, JavaScript, PHP",
            "• Backend & AI: Node.js, Express, Flask, Python, REST API, MySQL, MongoDB",
            "• Mobile: Flutter & Laravel Sanctum APIs",
            "• Cloud, Server & Networking: Google Cloud (GCP), Alibaba Cloud, Docker, Linux, MikroTik, Cisco, Network Security & IT Support",
          ]
    );
  }

  // 8. Who / About Denny / Summary
  if (/(who|siapa|about|tentang|profil|profile|summary|ringkasan|denny)/.test(q)) {
    return isId
      ? "Saya Denny Irawan, Full Stack Developer dan IT Specialist yang berbasis di Surakarta, Jawa Tengah. Saya membangun aplikasi web dengan React, Next.js, Laravel, dan Node.js sekaligus menangani server Linux, administrasi jaringan, dukungan IT, serta layanan cloud (GCP & Alibaba Cloud)."
      : "I'm Denny Irawan, a Full Stack Developer and IT Specialist based in Surakarta, Central Java. I build web applications with React, Next.js, Laravel, and Node.js while managing Linux servers, networking, IT support, and cloud services (GCP & Alibaba Cloud).";
  }

  // 9. Thanks
  if (/(thank|makasih|terima kasih|thx)/.test(q)) {
    return isId
      ? "Sama-sama! Jika ada pertanyaan lain seputar profil atau proyek saya, silakan tanyakan ya."
      : "You're welcome! Let me know if you'd like to know anything else about my background or projects.";
  }

  // Default fallback summary
  return isId
    ? "Saya asisten virtual Denny Irawan. Silakan tanyakan hal spesifik mengenai pendidikan (S1/D3 Sistem Informasi UBSI), pengalaman kerja, daftar proyek, tech stack, sertifikasi, atau kontak saya!"
    : "I'm Denny Irawan's virtual assistant. Feel free to ask specifically about my education, work experience, featured projects, tech stack, certificates, or contact details!";
}
