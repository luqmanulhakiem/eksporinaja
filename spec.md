# Product Specification Document (PSD) - EksporinAja

## 1. Project Overview
*   **Project Name:** EksporinAja
*   **Tagline:** Jembatan Gen AI untuk UMKM Lokal Menembus Pasar Global.
*   **Platform:** Web Application (Responsive Mobile-First)
*   **Target User:** Pelaku UMKM Indonesia yang ingin memperluas pasar ke kancah internasional namun terkendala bahasa, literasi platform global, dan regulasi ekspor.
*   **Core Tech:** React.js / Next.js, TailwindCSS, Google Gemini 1.5 Flash API.

---

## 2. Problem Statement & Value Proposition
*   **Problem:** 
    *   44% UMKM belum memahami pemasaran digital, dan mayoritas produk lokal berkualitas gagal menembus pasar internasional karena kendala bahasa dan pembuatan konten promosi yang efektif.
    *   Solusi ekspor yang ada saat ini terlalu rumit, mahal, dan penuh dengan istilah hukum/birokrasi yang tidak dipahami oleh pengguna non-teknis.
*   **Value Proposition:** 
    *   EksporinAja mendemokratisasi akses pasar global melalui Generative AI dengan antarmuka berbasis bahasa alami (Natural Language), gratis, dan dioptimalkan untuk perangkat *mobile* dengan koneksi terbatas.

---

## 3. Core Architecture & Tech Stack
Aplikasi dibangun menggunakan arsitektur **Serverless** untuk memastikan kecepatan pengembangan, efisiensi biaya, dan performa *real-time*.

*   **Frontend:** React.js (Vite) atau Next.js
*   **Styling:** TailwindCSS + Shadcn/ui (untuk komponen UI yang bersih dan intuitif)
*   **AI Engine:** Google Gemini 1.5 Flash API (Multimodal: Teks & Gambar)
*   **Database & Auth (Optional):** Supabase (untuk menyimpan histori pencarian & data produk)
*   **Deployment:** Vercel / Netlify (Menghasilkan tautan publik yang *live* untuk juri)

---

## 4. MVP Feature Specifications

### Feature 1: Ekspor Konten & Lokalisasi Budaya (Multimodal AI)
*   **Input:** 
    *   Unggah Foto Produk (`JPEG`/`PNG`, max 5MB).
    *   Deskripsi produk singkat dalam Bahasa Indonesia kasual.
    *   Dropdown Pilihan Negara Tujuan (Contoh: Jepang, Amerika Serikat, Malaysia, Arab Saudi).
*   **AI Processing (`gemini-1.5-flash`):**
    *   Sistem mengirimkan gambar dan teks ke API dengan *system prompt* khusus untuk melokalisasi gaya bahasa berdasarkan budaya negara tujuan.
*   **Output:**
    *   *Localized Copywriting:* Deskripsi produk standar e-commerce global (Amazon, Etsy, Shopee) dalam bahasa negara tujuan.
    *   *SEO Keywords:* Daftar kata kunci relevan untuk meningkatkan visibilitas produk di platform global.

### Feature 2: Konsultan Regulasi Ekspor Bahasa Alami (Chat AI)
*   **Input:** Teks pertanyaan bebas dari pengguna (contoh: *"Mau kirim keripik ke Singapura syarat BPOM-nya gimana?"*).
*   **AI Processing (`gemini-1.5-flash`):**
    *   AI bertindak sebagai ahli logistik ekspor. Mengubah informasi regulasi yang kaku (HS Code, bea cukai, dokumen karantina) menjadi poin-poin sederhana menggunakan bahasa Indonesia yang ramah awam.
*   **Output:** Jawaban chat interaktif, terstruktur (menggunakan bullet points), dan dilengkapi dengan daftar dokumen yang wajib disiapkan.

### Feature 3: Generator Dokumen Ekspor Sederhana
*   **Input:** Form data nama pengirim (UMKM), nama pembeli internasional, jenis barang, berat, dan harga.
*   **Processing:** JavaScript Client-Side Engine.
*   **Output:** Dokumen *Commercial Invoice* dan *Packing List* standar internasional dalam bentuk draf bilingual (Inggris-Indonesia) yang siap diunduh menjadi file PDF.

---

## 5. UI/UX & Scannability Guidelines (Kriteria Penulisan & Desain)
Memenuhi bobot penilaian **Desain dan Kemudahan Penggunaan (25%)**:
*   **Mobile-First Design:** Desain mengutamakan tampilan layar HP karena mayoritas pelaku UMKM mengoperasikan bisnisnya melalui *smartphone*.
*   **Clean Layout:** Hindari grafik atau tabel data yang padat. Gunakan spasi yang luas dan tombol aksi yang besar.
*   **No Technical Jargon:** Menggunakan istilah bahasa Indonesia yang familiar (contoh: mengganti kata *"Multimodal Input"* dengan *"Unggah Foto & Ceritakan Produk Anda"*).

---

## 6. AI Prompt Engineering Blueprints (Contoh Prompt)

### Prompt untuk Fitur 1 (Lokalisasi Konten):
```text
Anda adalah seorang ahli pemasaran digital internasional dan copywriter profesional. 
Tugas Anda adalah menganalisis foto produk dan deskripsi singkat berikut: [INPUT_TEXT].
Buatkan deskripsi produk yang menarik, persuasif, dan sesuai dengan preferensi budaya konsumen di negara [TARGET_COUNTRY]. 
Jangan hanya menerjemahkan kata demi kata, melainkan sesuaikan gaya bahasanya (lokalisasi).
Berikan output dalam format JSON dengan key: 'product_name_en', 'description', 'selling_points' (array), dan 'seo_keywords' (array).
```

### Prompt untuk Fitur 2 (Konsultan Regulasi):
```text
    Anda adalah konsultan ekspor pintar khusus untuk UMKM Indonesia. 
    Jawablah pertanyaan dari pelaku usaha mikro berikut: [USER_CHAT]. 
    Gunakan bahasa Indonesia yang sangat sederhana, hindari istilah hukum yang rumit jika tidak dijelaskan artinya. 
    Jika regulasi membutuhkan dokumen spesifik (seperti Phytosanitary atau Halal), sebutkan nama lembaga di Indonesia tempat mengurusnya.
```