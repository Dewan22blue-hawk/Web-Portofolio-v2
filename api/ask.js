import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY_DI_SINI';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const denny_irawan_structured_data = `
**Informasi Profil Denny Irawan:**
-   **Nama Lengkap:** Denny Irawan
-   **Email:** dennyirawan1704@gmail.com
-   **Lokasi:** Surakarta, Central Java
-   **LinkedIn:** linkedin.com/in/denny-irawan22
-   **Nomor Telepon:** +62 852 3754 5993
-   **Website Portofolio:** https:
-   **GitHub:** github.com/Dewan22blue-hawk
-   **Ringkasan Profil:** Seorang profesional IT yang proaktif dan serbaguna dengan pengalaman praktis dalam dukungan teknis, administrasi jaringan, dan pemrograman. Memiliki fondasi yang kuat dalam manajemen infrastruktur cloud, dengan keahlian yang berkembang dalam layanan Google Cloud Platform (GCP), termasuk menerapkan solusi yang skalabel, mengotomatisasi alur kerja, dan mengoptimalkan konfigurasi jaringan untuk lingkungan cloud. Latar belakang dalam pemecahan masalah, optimasi sistem, dan administrasi jaringan memposisikan saya untuk secara efektif mengelola aplikasi berbasis cloud, memastikan kinerja dan keamanan tinggi.

**Informasi Pendidikan Denny Irawan:**
-   **Universitas:** Bina Sarana Informatika University, Surakarta, Central Java
    -   **Periode:** Juli 2022 - Sekarang (saat ini mahasiswa semester 6)
    -   **Jurusan:** Sistem Informasi (Fakultas Teknik dan Informatika)
    -   **Keahlian yang Dipelajari:** Manajemen dan pemrosesan informasi menggunakan pemrograman web dan seluler. Mengembangkan keterampilan dalam membuat aplikasi web dan terus mengasah kemampuan dalam berbagai aspek pengembangan aplikasi, termasuk analisis sistem, manajemen basis data, dan desain antarmuka pengguna.
-   **Sekolah Menengah Kejuruan (SMK):** SMK N 1 Donorojo, Pacitan, Jawa Timur
    -   **Periode:** Mei 2019 - Juli 2022
    -   **Fokus Studi:** Proaktif dan serbaguna dalam dukungan teknis, administrasi jaringan, dan pemrograman. Memiliki fondasi yang kuat dalam manajemen infrastruktur cloud, dengan keahlian yang berkembang dalam layanan Google Cloud Platform (GCP), termasuk menerapkan solusi yang skalabel, mengotomatisasi alur kerja, dan mengoptimalkan konfigurasi jaringan untuk lingkungan cloud. Latar belakang dalam pemecahan masalah, optimasi sistem, dan administrasi jaringan memposisikan saya untuk secara efektif mengelola aplikasi berbasis cloud, memastikan kinerja dan keamanan tinggi.

**Informasi Pengalaman Profesional Denny Irawan:**
-   **Web Developer - Freelance Deraly Id**
    -   **Periode:** Agustus 2022 - Februari 2023
    -   **Lokasi:** Yogyakarta, DIY
    -   **Tanggung Jawab:** Mengerjakan berbagai proyek aplikasi web, terutama menggunakan framework Laravel. Bertanggung jawab membangun aplikasi web dinamis yang disesuaikan dengan kebutuhan klien. Juga mengembangkan situs web statis untuk undangan pernikahan, berfokus pada desain yang bersih, menarik secara visual dengan tata letak responsif.
-   **Network Engineer - Freelance**
    -   **Periode:** Mei 2020 - Juli 2022
    -   **Lokasi:** Pacitan, East Java
    -   **Tanggung Jawab:** Mengkhususkan diri dalam Administrasi Jaringan dan Instalasi FTTH, menawarkan keahlian dalam merancang, mengimplementasikan, dan memelihara infrastruktur jaringan untuk berbagai klien. Tanggung jawab termasuk solusi jaringan siklus penuh, dari pengaturan hingga pemeliharaan berkelanjutan dan penyelesaian masalah.
-   **Technical Support - Bina Sarana Informatika University**
    -   **Periode:** Maret 2023 - Sekarang
    -   **Lokasi:** Surakarta, Central Java
    -   **Tanggung Jawab:** Bekerja sebagai asisten Technical Support magang, mendapatkan pengalaman praktis dalam pemecahan masalah teknis, konfigurasi jaringan, instalasi CCTV dan jaringan, serta pemeliharaan hardware/software. Secara aktif membantu pengguna dengan masalah perangkat lunak, perangkat keras, dan aplikasi web sehari-hari, pemrograman, dll.

**Informasi Keterampilan (Skills) Denny Irawan:**
-   Software Quality Assurance
-   Mobile Programming
-   Network Engineer
-   Network Security
-   Programming Language
    -   Python (Expert)
    -   Javascript (Proficient)
    -   PHP (Expert)
    -   Dart (Competent)
-   Web Programming
-   Cloud Computing
-   Database Administration
-   System Administration

**Informasi Sertifikat Denny Irawan:**
-   Certificate of Competency Junior Network Administrator (BNSP)
-   ACP Cloud Computing Certification
-   CCNA: Introduction to Networks
-   Google Cloud Computing Foundations Certificate
-   Ethical Hacker (Cisco Networking Academy)
-   ACA Cloud Computing Certification
-   Developer Certificate Alibaba
-   MTCNA
-   Certificate of Competency Software Quality Assurance (SQA) PT. Tanjung Mulia Informatika
`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Metode Tidak Diizinkan' });
  }

  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Pertanyaan tidak disediakan.' });
  }

  const prompt = `
    Anda adalah asisten virtual saya, yakni Denny Irawan. Anda hanya boleh menjawab pertanyaan berdasarkan informasi yang diberikan dalam data di bawah ini. Jika informasi tidak tersedia di sini, katakan bahwa Anda tidak memiliki informasi tersebut. Jangan membuat-buat jawaban atau menambahkan informasi dari luar data berikut kecuali menambahkan sedikit penjelasan mengenai skill-skill yang saya punya di data tersebut. Jawaban harus singkat, padat, dan langsung ke intinya dan ganti agar kata ganti 'dia' menjadi 'saya' untuk menggantikan saya denny irawan.

    Berikut adalah data saya, Denny Irawan:
    ---
    ${denny_irawan_structured_data}
    ---

    Pertanyaan Pengguna: ${question}

    Jawaban:
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ answer: text });
  } catch (error) {
    console.error('Kesalahan saat menghasilkan konten dari model AI:', error);
    res.status(500).json({ error: 'Gagal mendapatkan respons dari model AI.' });
  }
}
