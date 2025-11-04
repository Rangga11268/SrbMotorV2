# Update SRB Motors - Rancangan Pemisahan Halaman V0.06

## Overview
Versi 0.06 dari SRB Motors menambahkan fitur Perbandingan Motor dan halaman About Us yang ditingkatkan. Fitur perbandingan motor memungkinkan pengguna membandingkan spesifikasi dua atau lebih motor secara berdampingan, sangat berguna dalam proses pengambilan keputusan pembelian. Halaman About Us yang ditingkatkan menyediakan informasi perusahaan yang lebih lengkap dan menarik.

## Daftar Halaman Baru

### 1. Home Page (`/`)
**Deskripsi:**
- Halaman utama yang tetap menjadi landing page
- Menampilkan elemen inti seperti hero section, our advantages, popular motors slider, dan about us section

**Komponen yang tetap:**
- Hero section
- Our Advantages
- Popular Motors Slider (preview beberapa motor)
- tips 
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


### 5. Berita/Artikel (`/news`)
**Deskripsi:**
- Menyajikan update terbaru, promo, atau informasi industri otomotif

**Fitur:**
- Postingan berita/artikel
- Kategori dan tag
- Fitur search artikel

### 6. Halaman Kontak (`/contact`)
**Deskripsi:**
- Form kontak dan informasi kontak dealer

**Fitur:**
- Formulir kontak
- Lokasi dealer
- Informasi kontak lainnya

### 7. Halaman About Us (`/about`)
**Deskripsi:**
- Menyediakan informasi yang lebih lengkap tentang perusahaan SRB Motors
- Menampilkan sejarah, visi, misi, dan nilai-nilai perusahaan
- Menampilkan, lokasi dealer, dan sejarah perusahaan

**Fitur:**
- Sejarah perusahaan
- Visi dan misi
- Lokasi dealer
- Nilai-nilai perusahaan
- Informasi kontak lengkap
- Peta lokasi dealer

### belum prioritas
### 8. Profil Pengguna (`/profile`)
**Deskripsi:**
- Tersedia hanya untuk pengguna yang sudah login

**Fitur:**
- Informasi pribadi
- Pengaturan akun

### 9. Manajemen Pemesanan (Order Management) - V0.05

### Deskripsi:
Fitur untuk mencatat dan mengelola pesanan dari calon pembeli, baik dari pengunjung website maupun dari pelanggan yang datang langsung ke dealer. Sistem ini memungkinkan admin untuk melacak proses penjualan dari awal hingga selesai.

### Lokasi:
- Bagian Admin Panel di `/admin/orders`

### Fitur Utama:
- Tabel `orders` untuk menyimpan informasi pesanan pelanggan
- Tabel `order_items` untuk menghubungkan pesanan dengan motor tertentu
- Status pesanan terintegrasi (pending, confirmed, completed, canceled)
- Formulir penambahan pesanan manual untuk pelanggan yang datang ke dealer
- Filter dan pencarian pesanan
- Cetak laporan pesanan sederhana

### Struktur Database:
1. `orders`
   - id (primary key)
   - customer_name (string)
   - customer_phone (string)
   - customer_email (string)
   - order_source (enum: 'website', 'direct') - untuk membedakan sumber pesanan
   - status (string: pending, confirmed, completed, canceled)
   - notes (text)
   - created_at
   - updated_at

2. `order_items`
   - id (primary key)
   - order_id (foreign key)
   - motor_id (foreign key)
   - quantity (integer, default 1)
   - price (decimal)
   - created_at
   - updated_at

### Fungsi Admin:
- Melihat semua pesanan
- Menambahkan pesanan baru (untuk pelanggan yang datang langsung ke dealer)
- Mengupdate status pesanan
- Melihat detail pesanan
- Menghapus pesanan jika diperlukan

### Alur Proses:
1. Pelanggan (dari website atau datang langsung) menunjukkan minat pembelian
2. Jika dari website, pesanan bisa tercatat otomatis atau admin bisa membuatkan
3. Jika datang langsung ke dealer, admin membuat pesanan secara manual
4. Pesanan masuk ke antrean (status: pending)
5. Admin menindaklanjuti pesanan dan memperbarui statusnya (confirmed, completed, atau canceled)
6. Proses penjualan dilanjutkan di luar website (offline)

## Struktur Navigasi
```
Home (/)
├── Motors (/motors)
│   ├── Motor Detail (/motors/{id})
│   └── Credit Calculator (/motors/{id}/credit-calculation)
├── News (/news)
├── About (/about)
├── Contact (/contact)
├── Admin Panel (/admin)
│   ├── Dashboard
│   ├── Motors
│   ├── Contact Messages
│   ├── Users
│   └── Orders (/admin/orders)
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
- CRUD system untuk manajemen pesanan

## Prioritas Implementasi
1. **Tertinggi:** Pembuatan halaman `/motors` dengan fitur filter dan search
2. **Tinggi:** Halaman detail motor `/motors/{id}`
3. **Sedang:** Simulasi kredit dan halaman kontak
4. **Sedang:** Halaman About Us yang ditingkatkan (`/about`)
5. **Rendah:** Tips & tricks, berita, FAQ, dan profil pengguna
6. **V0.05:** Manajemen Pemesanan (Order Management)

## Manfaat dari Pemisahan Halaman dan Fitur Order Management
- Meningkatkan pengalaman pengguna dengan navigasi yang lebih jelas
- Memungkinkan fitur-fitur seperti filter dan search bekerja lebih optimal
- Memperbaiki struktur SEO dengan URL yang lebih spesifik
- Memudahkan pengelolaan konten di masing-masing halaman
- Memungkinkan tracking penjualan dan calon pembeli yang efektif
- Menyederhanakan proses manajemen pesanan dari berbagai sumber
- Memudahkan pelacakan konversi penjualan dari kunjungan website maupun datang langsung ke dealer
- Memberikan informasi perusahaan yang lebih lengkap dan profesional