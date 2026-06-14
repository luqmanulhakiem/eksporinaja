# EksporinAja 🚀

**Jembatan Gen AI untuk UMKM Lokal Menembus Pasar Global**

EksporinAja adalah aplikasi web berbasis *Generative AI* yang dirancang khusus untuk membantu pelaku Usaha Mikro, Kecil, dan Menengah (UMKM) Indonesia agar dapat mengekspor produk mereka ke kancah internasional. 

Aplikasi ini mendemokratisasi akses pasar global dengan menyediakan antarmuka bahasa alami yang mudah digunakan, membantu UMKM mengatasi kendala bahasa, literasi platform global, dan pemahaman regulasi ekspor.

---

## 🌟 Fitur Utama

### 1. Lokalisasi Budaya & Ekspor Konten (Multimodal AI)
Fitur ini membantu UMKM membuat deskripsi produk yang menarik untuk pasar internasional.
- **Input:** Unggah foto produk dan deskripsi singkat dalam bahasa Indonesia.
- **Proses AI:** Menggunakan **Google Gemini 2.5 Flash**, sistem menganalisis gambar dan teks untuk menghasilkan *copywriting* yang disesuaikan dengan budaya negara tujuan, bukan sekadar terjemahan kasar.
- **Output:** Deskripsi produk siap pakai dalam bahasa target dan rekomendasi kata kunci SEO untuk *marketplace* global.

### 2. Konsultan Regulasi Ekspor (Chat AI)
Tidak perlu pusing dengan istilah hukum ekspor yang rumit!
- **Input:** Pertanyaan bebas dari pengguna terkait aturan pengiriman barang, dokumen, dll.
- **Proses AI:** AI bertindak sebagai konsultan logistik ekspor yang interaktif.
- **Output:** Penjelasan langkah demi langkah, syarat dokumen (seperti BPOM, Karantina), dan tips ekspor dalam bahasa Indonesia awam yang sangat mudah dipahami.

### 3. Generator Dokumen Ekspor Sederhana
Memudahkan administrasi dengan pembuatan draf dokumen otomatis.
- **Output:** Pembuatan draf *Commercial Invoice* dan *Packing List* bilingual (Inggris-Indonesia) standar internasional.

---

## 🛠️ Teknologi yang Digunakan

Aplikasi ini dibangun menggunakan arsitektur modern dan *serverless* untuk menjamin kecepatan, efisiensi, dan skalabilitas.

- **Frontend:** Next.js / React.js
- **Styling:** Tailwind CSS & Shadcn UI (Desain *Mobile-First*, bersih, dan tanpa *jargon* teknis)
- **AI Engine:** Google Gemini 2.5 Flash API (Kemampuan Multimodal)
- **Deployment:** Vercel

---

## 🎯 Nilai Tambah (Value Proposition)

- **Gratis & Mudah Diakses:** Mengurangi biaya konsultasi ekspor dan penerjemah profesional.
- **Mobile-First Design:** Dioptimalkan untuk pengguna *smartphone* dengan antarmuka yang sangat sederhana.
- **Empati pada Pengguna:** Menghindari bahasa birokrasi, menggunakan *prompt engineering* untuk mengubah istilah rumit menjadi panduan praktis yang bisa langsung diterapkan oleh pelaku UMKM.

---

## 🚀 Cara Menjalankan Proyek Secara Lokal

1. **Clone repositori ini:**
   ```bash
   git clone <repository_url>
   cd EksporinAja
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment:**
   Buat file `.env` di root direktori dan tambahkan API Key Gemini Anda:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

4. **Jalankan server pengembangan:**
   ```bash
   npm run dev
   ```

5. Buka `http://localhost:3000` di browser Anda.

---

*Dibuat dengan ❤️ untuk UMKM Indonesia.*
