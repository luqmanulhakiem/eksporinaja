# Git Commit Guidelines - EksporinAja

Dokumen ini berfungsi sebagai standarisasi penulisan pesan commit (*commit message*) selama proses pengembangan proyek **EksporinAja**. Standar yang digunakan mengacu pada **Conventional Commits**.

---

## 1. Format Pesan Commit

Setiap pesan commit harus mengikuti struktur baku berikut ini:

```text
<type>(<scope>): <description>

[body] (opsional, digunakan jika butuh penjelasan detail)
Type: Jenis perubahan yang dilakukan (wajib diisi, menggunakan huruf kecil).
    - Type: Jenis perubahan yang dilakukan (wajib diisi, menggunakan huruf kecil).
    - Scope: Bagian spesifik dari aplikasi yang terkena dampak perubahan (opsional, ditaruh di dalam kurung. Contoh: ui, api, pdf, auth).
    - Description: Deskripsi ringkas dan jelas mengenai perubahan yang dilakukan (wajib diisi).
```

## 2. Jenis-Jenis Type yang Digunakan
Pilihlah salah satu dari kode type di bawah ini yang paling sesuai dengan baris kode yang kamu ubah atau tambahkan:

- feat: Menambahkan fitur baru yang belum pernah ada sebelumnya. (Contoh: feat(api): implementasi endpoint Gemini)
- fix: Memperbaiki bug atau kesalahan kode yang ada. (Contoh: fix(ui): memperbaiki layout pada layar mobile)
- docs: Mengubah atau menambahkan dokumentasi proyek. (Contoh: docs: memperbarui file README.md)
- style: Mengubah gaya penulisan kode (indentasi, spasi, titik koma) yang tidak mempengaruhi logika program. (Contoh: style: memperbaiki format kode CSS)
- refactor: Mengubah struktur kode tanpa mengubah fungsionalitasnya (untuk kebersihan kode). (Contoh: refactor(ai): memperbaiki struktur prompt untuk Gemini)
- perf: Meningkatkan performa atau kecepatan aplikasi. (Contoh: perf: optimasi waktu loading halaman)
- test: Menambahkan atau memperbaiki unit test atau integration test. (Contoh: test: menambahkan test untuk fitur ekspor PDF)
- chore: Perubahan pada proses build, tools, atau library pendukung. (Contoh: chore: update dependensi npm)

## 3. Rencana Riwayat Commit (Milestone & Alur Pengerjaan)
Kamu bisa mengikuti urutan kronologis commit di bawah ini sebagai panduan langkah demi langkah pengerjaan proyek dari awal hingga siap dikumpul:

    - Tahap 1: Inisiasi Proyek & Dokumentasi
        - docs: inisiasi spec.md dan commit.md untuk dokumentasi awal
        - chore: setup proyek react vite dengan tailwindcss dan shadcn ui
    - Tahap 2: Pengembangan UI/UX (Frontend Sederhana)
        - feat(ui): buat komponen layout navigasi dan dashboard utama
        - feat(ui): implementasi halaman form unggah foto produk
        - feat(ui): buat antarmuka ruang obrolan (chat) untuk konsultan regulasi
    - Tahap 3: Integrasi Generative AI (Gemini API)
        - feat(api): setup konfigurasi dan koneksi awal ke google ai studio
        - feat(ai): implementasi prompt engineering untuk fitur lokalisasi konten
        - feat(ai): hubungkan chat konsultan regulasi dengan model gemini 1.5 flash
    - Tahap 4: Fitur Pendukung & Cetak Dokumen
        - feat(pdf): buat sistem generator dokumen commercial invoice otomatis
        - fix(ai): batasi response json dari gemini agar tidak terjadi error parsing
    - Tahap 5: Optimasi & Siap Submit (Juli 2026)
        - perf: optimasi kompresi gambar lokal untuk menghemat kuota internet umkm
        - style: rapihkan responsive design agar 100% pas di layar smartphone
        - docs: perbarui readme dengan link live demo vercel dan petunjuk instalasi


## 4. Contoh Riwayat Commit yang Baik vs Buruk

Untuk menjaga repositori Git tetap terlihat profesional di mata juri, hindari penulisan commit yang asal-asalan.

*   ❌ **Buruk (Hindari):**
    *   `git commit -m "fix bug"` (Tidak jelas bug apa yang diperbaiki)
    *   `git commit -m "update"` (Terlalu umum dan tidak informatif)
    *   `git commit -m "bismillah menang"` (Tidak profesional untuk dokumentasi teknis)

*   ✅ **Baik (Ikuti):**
    *   `git commit -m "feat(ui): tambah dropdown pilihan negara tujuan ekspor"`
    *   `git commit -m "fix(ai): perbaiki error parsing JSON saat koneksi internet lambat"`
    *   `git commit -m "docs: tambahkan petunjuk pengujian aplikasi dengan mitra UMKM"`

---

## 5. Alur Kerja Git (Git Workflow) Ringkas

Jika kamu bekerja dalam **tim (maksimal 3 orang)**, sangat disarankan menggunakan sistem percabangan (*branching*) agar kode tidak bentrok:

1.  **Main Branch (`main`)**: Hanya berisi kode yang sudah stabil, bebas *bug*, dan siap dinilai juri.
2.  **Feature Branch (`feat/...` atau `fix/...`)**: Tempat mengerjakan fitur spesifik secara terpisah.
    *   Contoh membuat branch baru: `git checkout -b feat/integrasi-gemini`
    *   Setelah fitur selesai dan ditest, gabungkan (*merge*) kembali ke branch `main`.

---

## 📅 Target Penyelesaian Log Commit (Menuju 22 Juli 2026)

*   **Juni Pekan 3-4:** Dipenuhi oleh commit bertipe `feat(ui)` dan `chore` (Fokus ke kerangka web).
*   **Juli Pekan 1-2:** Dipenuhi oleh commit bertipe `feat(ai)` dan `feat(api)` (Fokus ke kecerdasan buatan Gemini).
*   **Juli Pekan 3 (Final):** Dipenuhi oleh commit bertipe `fix`, `perf`, dan `docs` (Fokus ke kerapian, kecepatan web, dan dokumentasi final).