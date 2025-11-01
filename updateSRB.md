# Update SRB Motors - Rancangan Pemisahan Halaman V0.04

## Overview
Versi 0.04 dari SRB Motors akan fokus pada perancangan ulang arsitektur halaman dengan memisahkan fungsi-fungsi utama ke dalam halaman-halaman yang lebih spesifik dan terorganisir. Tujuan utama adalah meningkatkan pengalaman pengguna dan memudahkan navigasi antar halaman.

## Daftar Halaman Baru

### 1. Home Page (`/`)
**Deskripsi:**
- Halaman utama yang tetap menjadi landing page
- Menampilkan elemen inti seperti hero section, our advantages, popular motors slider, dan about us section

**Komponen yang tetap:**
- Hero section
- Our Advantages
- Popular Motors Slider (preview beberapa motor)
- About Us Section
- Footer dan navigasi utama

**Komponen yang dipindah:**
- Galeri motor penuh dipindahkan ke halaman `/motors`

### 2. Motor Gallery (`/motors`) - HARUS DIPISAH
**Deskripsi:**
- Halaman utama untuk menampilkan seluruh koleksi motor
- Dilengkapi fitur filter dan pencarian

**Fitur:**
- Tampilan grid untuk menampilkan banyak motor
- Filter berdasarkan: brand, type, year, price range
- Search untuk menemukan motor tertentu
- Pagination untuk mengatur jumlah item per halaman
- Klik pada motor membuka modal detail atau halaman detail

### 3. Motor Detail (`/motors/{id}`)
**Deskripsi:**
- Menampilkan informasi lengkap tentang satu motor tertentu

**Fitur:**
- Informasi lengkap motor
- Spesifikasi detail
- Gambar-gambar motor
- Fitur simulasi kredit
- Tautan menuju form booking test drive

### 4. Simulasi Kredit (`/motors/{id}/credit-calculation` atau `/credit-calculator`)
**Deskripsi:**
- Kalkulator untuk menghitung cicilan berdasarkan harga, DP, dan tenor

**Fitur:**
- Input harga motor
- Input jumlah DP
- Pilihan tenor (12, 24, 36 bulan)
- Informasi tentang persyaratan kredit

### 5. Tips & Tricks (`/tips`)
**Deskripsi:**
- Menyajikan artikel-artikel tentang perawatan motor, modifikasi, dll.

**Fitur:**
- Kategori artikel
- Pagination
- Fitur search artikel

### 6. Berita/Artikel (`/news`)
**Deskripsi:**
- Menyajikan update terbaru, promo, atau informasi industri otomotif

**Fitur:**
- Postingan berita/artikel
- Kategori dan tag
- Fitur search artikel

### 7. Halaman Kontak (`/contact`)
**Deskripsi:**
- Form kontak dan informasi kontak dealer

**Fitur:**
- Formulir kontak
- Lokasi dealer
- Informasi kontak lainnya

### 8. Profil Pengguna (`/profile`)
**Deskripsi:**
- Tersedia hanya untuk pengguna yang sudah login

**Fitur:**
- Informasi pribadi
- Riwayat wishlist
- Aktivitas lainnya
- Pengaturan akun

### 9. FAQ (`/faq`)
**Deskripsi:**
- Halaman khusus untuk pertanyaan-pertanyaan umum

**Fitur:**
- Pertanyaan dan jawaban umum
- Kategori pertanyaan
- Fitur search FAQ

## Struktur Navigasi
```
Home (/)
├── Motors (/motors)
│   ├── Motor Detail (/motors/{id})
│   └── Credit Calculator (/motors/{id}/credit-calculation)
├── Tips (/tips)
├── News (/news)
├── Contact (/contact)
├── FAQ (/faq)
└── Profile (/profile) [for logged-in users]
```

## Perubahan pada Home Page
- Menghapus tampilan galeri motor penuh
- Menambahkan tombol/link ke halaman `/motors` untuk melihat semua motor
- Menyederhanakan slider motors menjadi hanya beberapa pilihan terbaik
- Mempertahankan elemen-elemen utama untuk memperkenalkan website

## Teknologi dan Komponen Pendukung
- Filter dan search functionality untuk halaman motors
- Modal atau page untuk detail motor
- Pagination system
- Component reusability untuk daftar motor dan card design
- Routing system untuk halaman-halaman baru

## Prioritas Implementasi
1. **Tertinggi:** Pembuatan halaman `/motors` dengan fitur filter dan search
2. **Tinggi:** Halaman detail motor `/motors/{id}`
3. **Sedang:** Simulasi kredit dan halaman kontak
4. **Rendah:** Tips & tricks, berita, FAQ, dan profil pengguna

## Manfaat dari Pemisahan Halaman
- Meningkatkan pengalaman pengguna dengan navigasi yang lebih jelas
- Memungkinkan fitur-fitur seperti filter dan search bekerja lebih optimal
- Memperbaiki struktur SEO dengan URL yang lebih spesifik
- Memudahkan pengelolaan konten di masing-masing halaman
- Memungkinkan scaling fitur-fitur di masa depan