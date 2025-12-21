# Update SRB Motors - Rancangan Pemisahan Halaman V0.06

## Overview

Versi 0.06 dari SRB Motors menambahkan fitur Perbandingan Motor dan halaman About Us yang ditingkatkan. Fitur perbandingan motor memungkinkan pengguna membandingkan spesifikasi dua atau lebih motor secara berdampingan, sangat berguna dalam proses pengambilan keputusan pembelian. Halaman About Us yang ditingkatkan menyediakan informasi perusahaan yang lebih lengkap dan menarik.

## Daftar Halaman Baru

### 1. Home Page (`/`)

**Deskripsi:**

-   Halaman utama yang tetap menjadi landing page
-   Menampilkan elemen inti seperti hero section, our advantages, popular motors slider, dan about us section

**Komponen yang tetap:**

-   Hero section
-   Our Advantages
-   Popular Motors Slider (preview beberapa motor)
-   tips
-   About Us Section
-   Footer dan navigasi utama

**Komponen yang dipindah:**

-   Galeri motor penuh dipindahkan ke halaman `/motors`

### 2. Motor Gallery (`/motors`) - HARUS DIPISAH

**Deskripsi:**

-   Halaman utama untuk menampilkan seluruh koleksi motor
-   Dilengkapi fitur filter dan pencarian

**Fitur:**

-   Tampilan grid untuk menampilkan banyak motor
-   Filter berdasarkan: brand, type, year, price range
-   Search untuk menemukan motor tertentu
-   Pagination untuk mengatur jumlah item per halaman
-   Klik pada motor membuka modal detail atau halaman detail

### 3. Motor Detail (`/motors/{id}`)

**Deskripsi:**

-   Menampilkan informasi lengkap tentang satu motor tertentu

**Fitur:**

-   Informasi lengkap motor
-   Spesifikasi detail
-   Gambar-gambar motor
-   Fitur simulasi kredit
-   Tautan menuju form booking test drive

### 4. Simulasi Kredit (`/motors/{id}/credit-calculation` atau `/credit-calculator`)

**Deskripsi:**

-   Kalkulator untuk menghitung cicilan berdasarkan harga, DP, dan tenor

**Fitur:**

-   Input harga motor
-   Input jumlah DP
-   Pilihan tenor (12, 24, 36 bulan)
-   Informasi tentang persyaratan kredit

### 5. Berita/Artikel (`/news`)

**Deskripsi:**

-   Menyajikan update terbaru, promo, atau informasi industri otomotif

**Fitur:**

-   Postingan berita/artikel
-   Kategori dan tag
-   Fitur search artikel

### 6. Halaman Kontak (`/contact`)

**Deskripsi:**

-   Form kontak dan informasi kontak dealer

**Fitur:**

-   Formulir kontak
-   Lokasi dealer
-   Informasi kontak lainnya

### 7. Halaman About Us (`/about`)

**Deskripsi:**

-   Menyediakan informasi yang lebih lengkap tentang perusahaan SRB Motors
-   Menampilkan sejarah, visi, misi, dan nilai-nilai perusahaan
-   Menampilkan, lokasi dealer, dan sejarah perusahaan

**Fitur:**

-   Sejarah perusahaan
-   Visi dan misi
-   Lokasi dealer
-   Nilai-nilai perusahaan
-   Informasi kontak lengkap
-   Peta lokasi dealer

### belum prioritas

### 8. Profil Pengguna (`/profile`)

**Deskripsi:**

-   Tersedia hanya untuk pengguna yang sudah login

**Fitur:**

-   Informasi pribadi
-   Pengaturan akun

### 9. Manajemen Pemesanan (Order Management) - V0.05

### Deskripsi:

Fitur untuk mencatat dan mengelola pesanan dari calon pembeli, baik dari pengunjung website maupun dari pelanggan yang datang langsung ke dealer. Sistem ini memungkinkan admin untuk melacak proses penjualan dari awal hingga selesai.

### Lokasi:

-   Bagian Admin Panel di `/admin/orders`

### Fitur Utama:

-   Tabel `orders` untuk menyimpan informasi pesanan pelanggan
-   Tabel `order_items` untuk menghubungkan pesanan dengan motor tertentu
-   Status pesanan terintegrasi (pending, confirmed, completed, canceled)
-   Formulir penambahan pesanan manual untuk pelanggan yang datang ke dealer
-   Filter dan pencarian pesanan
-   Cetak laporan pesanan sederhana

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

-   Melihat semua pesanan
-   Menambahkan pesanan baru (untuk pelanggan yang datang langsung ke dealer)
-   Mengupdate status pesanan
-   Melihat detail pesanan
-   Menghapus pesanan jika diperlukan

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

-   Menghapus tampilan galeri motor penuh
-   Menambahkan tombol/link ke halaman `/motors` untuk melihat semua motor
-   Menyederhanakan slider motors menjadi hanya beberapa pilihan terbaik
-   Mempertahankan elemen-elemen utama untuk memperkenalkan website

## Teknologi dan Komponen Pendukung

-   Filter dan search functionality untuk halaman motors
-   Modal atau page untuk detail motor
-   Pagination system
-   Component reusability untuk daftar motor dan card design
-   Routing system untuk halaman-halaman baru
-   CRUD system untuk manajemen pesanan

## Prioritas Implementasi

1. **Tertinggi:** Pembuatan halaman `/motors` dengan fitur filter dan search
2. **Tinggi:** Halaman detail motor `/motors/{id}`
3. **Sedang:** Simulasi kredit dan halaman kontak
4. **Sedang:** Halaman About Us yang ditingkatkan (`/about`)
5. **Rendah:** Tips & tricks, berita, FAQ, dan profil pengguna
6. **V0.05:** Manajemen Pemesanan (Order Management)

## Manfaat dari Pemisahan Halaman dan Fitur Order Management

-   Meningkatkan pengalaman pengguna dengan navigasi yang lebih jelas
-   Memungkinkan fitur-fitur seperti filter dan search bekerja lebih optimal
-   Memperbaiki struktur SEO dengan URL yang lebih spesifik
-   Memudahkan pengelolaan konten di masing-masing halaman
-   Memungkinkan tracking penjualan dan calon pembeli yang efektif
-   Menyederhanakan proses manajemen pesanan dari berbagai sumber
-   Memudahkan pelacakan konversi penjualan dari kunjungan website maupun datang langsung ke dealer
-   Memberikan informasi perusahaan yang lebih lengkap dan profesional

# Spesifikasi File Tabel-Tabel Utama - Sistem SRB Motors

## Tabel 2.1 Spesifikasi File Tabel Users

| Field               | Keterangan                                               |
| ------------------- | -------------------------------------------------------- |
| **Nama File**       | Tabel Users                                              |
| **Akronim**         | users.myd                                                |
| **Fungsi**          | Untuk menyimpan informasi pengguna (pelanggan dan admin) |
| **Tipe File**       | File master                                              |
| **Organisasi File** | Indexed Sequential                                       |
| **Akses File**      | Random                                                   |
| **Media**           | Harddisk                                                 |
| **Panjang Record**  | 384 byte (estimasi berdasarkan struktur data)            |
| **Kunci Field**     | id                                                       |
| **Software**        | MySQL (dalam Laravel Framework)                          |

### Struktur Tabel

| Kolom             | Tipe Data         | Panjang | Keterangan                                       |
| ----------------- | ----------------- | ------- | ------------------------------------------------ |
| id                | bigint (unsigned) | -       | Primary key, auto-increment                      |
| name              | varchar           | 255     | Nama lengkap pengguna                            |
| email             | varchar           | 255     | Alamat email unik pengguna                       |
| email_verified_at | timestamp         | -       | Waktu verifikasi email (bisa null)               |
| password          | varchar           | 255     | Hash password pengguna                           |
| remember_token    | varchar           | 100     | Token untuk fitur "remember me" (bisa null)      |
| role              | varchar           | 255     | Peran pengguna ('user', 'admin'), default 'user' |
| created_at        | timestamp         | -       | Waktu pembuatan record                           |
| updated_at        | timestamp         | -       | Waktu pembaruan terakhir                         |

---

## Tabel 2.2 Spesifikasi File Tabel Motors

| Field               | Keterangan                                    |
| ------------------- | --------------------------------------------- |
| **Nama File**       | Tabel Motors                                  |
| **Akronim**         | motors.myd                                    |
| **Fungsi**          | Untuk menyimpan informasi motor yang dijual   |
| **Tipe File**       | File master                                   |
| **Organisasi File** | Indexed Sequential                            |
| **Akses File**      | Random                                        |
| **Media**           | Harddisk                                      |
| **Panjang Record**  | 512 byte (estimasi berdasarkan struktur data) |
| **Kunci Field**     | id                                            |
| **Software**        | MySQL (dalam Laravel Framework)               |

### Struktur Tabel

| Kolom      | Tipe Data         | Panjang | Keterangan                                              |
| ---------- | ----------------- | ------- | ------------------------------------------------------- |
| id         | bigint (unsigned) | -       | Primary key, auto-increment                             |
| name       | varchar           | 255     | Nama motor                                              |
| brand      | varchar           | 255     | Merek motor (Honda, Yamaha)                             |
| model      | varchar           | 255     | Model motor (bisa null)                                 |
| price      | decimal           | 10,2    | Harga motor                                             |
| year       | integer           | -       | Tahun produksi (bisa null)                              |
| type       | varchar           | 255     | Jenis motor (Metic, Automatic, Sport, etc.) (bisa null) |
| image_path | varchar           | 255     | Path gambar motor                                       |
| details    | text              | -       | Detail singkat tentang motor (bisa null)                |
| tersedia   | boolean           | -       | Ketersediaan motor, default true                        |
| created_at | timestamp         | -       | Waktu pembuatan record                                  |
| updated_at | timestamp         | -       | Waktu pembaruan terakhir                                |

---

## Tabel 2.3 Spesifikasi File Tabel Motor Specifications

| Field               | Keterangan                                    |
| ------------------- | --------------------------------------------- |
| **Nama File**       | Tabel Motor Specifications                    |
| **Akronim**         | motor_specifications.myd                      |
| **Fungsi**          | Untuk menyimpan spesifikasi teknis dari motor |
| **Tipe File**       | File transaksi                                |
| **Organisasi File** | Indexed Sequential                            |
| **Akses File**      | Random                                        |
| **Media**           | Harddisk                                      |
| **Panjang Record**  | 256 byte (estimasi berdasarkan struktur data) |
| **Kunci Field**     | id                                            |
| **Software**        | MySQL (dalam Laravel Framework)               |

### Struktur Tabel

| Kolom      | Tipe Data         | Panjang | Keterangan                                         |
| ---------- | ----------------- | ------- | -------------------------------------------------- |
| id         | bigint (unsigned) | -       | Primary key, auto-increment                        |
| motor_id   | bigint (unsigned) | -       | Foreign key ke tabel `motors`                      |
| spec_key   | varchar           | 255     | Nama spesifikasi (misal: engine_type, engine_size) |
| spec_value | text              | -       | Nilai spesifikasi (bisa null)                      |
| created_at | timestamp         | -       | Waktu pembuatan record                             |
| updated_at | timestamp         | -       | Waktu pembaruan terakhir                           |

---

## Tabel 2.4 Spesifikasi File Tabel Transactions

| Field               | Keterangan                                                       |
| ------------------- | ---------------------------------------------------------------- |
| **Nama File**       | Tabel Transactions                                               |
| **Akronim**         | transactions.myd                                                 |
| **Fungsi**          | Untuk menyimpan informasi transaksi (pembelian tunai dan kredit) |
| **Tipe File**       | File transaksi                                                   |
| **Organisasi File** | Indexed Sequential                                               |
| **Akses File**      | Random                                                           |
| **Media**           | Harddisk                                                         |
| **Panjang Record**  | 512 byte (estimasi berdasarkan struktur data)                    |
| **Kunci Field**     | id                                                               |
| **Software**        | MySQL (dalam Laravel Framework)                                  |

### Struktur Tabel

| Kolom               | Tipe Data         | Panjang | Keterangan                                                                                                                                                                                                                                                    |
| ------------------- | ----------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                  | bigint (unsigned) | -       | Primary key, auto-increment                                                                                                                                                                                                                                   |
| user_id             | bigint (unsigned) | -       | Foreign key ke tabel `users`                                                                                                                                                                                                                                  |
| motor_id            | bigint (unsigned) | -       | Foreign key ke tabel `motors`                                                                                                                                                                                                                                 |
| transaction_type    | enum              | -       | Jenis transaksi: 'CASH', 'CREDIT'                                                                                                                                                                                                                             |
| status              | enum              | -       | Status transaksi: 'new_order', 'waiting_payment', 'payment_confirmed', 'unit_preparation', 'ready_for_delivery', 'completed', 'menunggu_persetujuan', 'data_tidak_valid', 'dikirim_ke_surveyor', 'jadwal_survey', 'disetujui', 'ditolak', default 'new_order' |
| notes               | text              | -       | Catatan dari pelanggan (bisa null)                                                                                                                                                                                                                            |
| booking_fee         | decimal           | 10,2    | Biaya booking untuk transaksi tunai (bisa null)                                                                                                                                                                                                               |
| total_amount        | decimal           | 10,2    | Jumlah total pembayaran yang diperlukan                                                                                                                                                                                                                       |
| payment_method      | varchar           | 255     | Metode pembayaran yang dipilih (bisa null)                                                                                                                                                                                                                    |
| payment_status      | enum              | -       | Status pembayaran: 'pending', 'confirmed', 'failed', default 'pending'                                                                                                                                                                                        |
| customer_name       | string            | 255     | Nama pelanggan (bisa null)                                                                                                                                                                                                                                    |
| customer_phone      | string            | 255     | Nomor telepon pelanggan (bisa null)                                                                                                                                                                                                                           |
| customer_occupation | string            | 255     | Pekerjaan pelanggan (bisa null)                                                                                                                                                                                                                               |
| created_at          | timestamp         | -       | Waktu pembuatan record                                                                                                                                                                                                                                        |
| updated_at          | timestamp         | -       | Waktu pembaruan terakhir                                                                                                                                                                                                                                      |

---

## Tabel 2.5 Spesifikasi File Tabel Credit Details

| Field               | Keterangan                                             |
| ------------------- | ------------------------------------------------------ |
| **Nama File**       | Tabel Credit Details                                   |
| **Akronim**         | credit_details.myd                                     |
| **Fungsi**          | Untuk menyimpan detail tambahan untuk transaksi kredit |
| **Tipe File**       | File transaksi                                         |
| **Organisasi File** | Indexed Sequential                                     |
| **Akses File**      | Random                                                 |
| **Media**           | Harddisk                                               |
| **Panjang Record**  | 256 byte (estimasi berdasarkan struktur data)          |
| **Kunci Field**     | id                                                     |
| **Software**        | MySQL (dalam Laravel Framework)                        |

### Struktur Tabel

| Kolom               | Tipe Data         | Panjang | Keterangan                                                                                                                                                       |
| ------------------- | ----------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                  | bigint (unsigned) | -       | Primary key, auto-increment                                                                                                                                      |
| transaction_id      | bigint (unsigned) | -       | Foreign key ke tabel `transactions`, unique                                                                                                                      |
| down_payment        | decimal           | 10,2    | Jumlah uang muka                                                                                                                                                 |
| tenor               | integer           | -       | Jangka waktu cicilan dalam bulan                                                                                                                                 |
| monthly_installment | decimal           | 10,2    | Jumlah cicilan bulanan                                                                                                                                           |
| credit_status       | enum              | -       | Status proses kredit: 'menunggu_persetujuan', 'data_tidak_valid', 'dikirim_ke_surveyor', 'jadwal_survey', 'disetujui', 'ditolak', default 'menunggu_persetujuan' |
| approved_amount     | decimal           | 10,2    | Jumlah kredit yang disetujui (bisa null)                                                                                                                         |
| created_at          | timestamp         | -       | Waktu pembuatan record                                                                                                                                           |
| updated_at          | timestamp         | -       | Waktu pembaruan terakhir                                                                                                                                         |

---

## Tabel 2.6 Spesifikasi File Tabel Documents

| Field               | Keterangan                                                           |
| ------------------- | -------------------------------------------------------------------- |
| **Nama File**       | Tabel Documents                                                      |
| **Akronim**         | documents.myd                                                        |
| **Fungsi**          | Untuk menyimpan dokumen pendukung kredit yang diunggah oleh pengguna |
| **Tipe File**       | File transaksi                                                       |
| **Organisasi File** | Indexed Sequential                                                   |
| **Akses File**      | Random                                                               |
| **Media**           | Harddisk                                                             |
| **Panjang Record**  | 512 byte (estimasi berdasarkan struktur data)                        |
| **Kunci Field**     | id                                                                   |
| **Software**        | MySQL (dalam Laravel Framework)                                      |

### Struktur Tabel

| Kolom            | Tipe Data         | Panjang | Keterangan                                                                   |
| ---------------- | ----------------- | ------- | ---------------------------------------------------------------------------- |
| id               | bigint (unsigned) | -       | Primary key, auto-increment                                                  |
| credit_detail_id | bigint (unsigned) | -       | Foreign key ke tabel `credit_details`                                        |
| document_type    | enum              | -       | Jenis dokumen: 'KTP', 'KK', 'SLIP_GAJI', 'BPKB', 'STNK', 'FAKTUR', 'LAINNYA' |
| file_path        | varchar           | 255     | Path lengkap file dokumen di storage                                         |
| original_name    | varchar           | 255     | Nama asli file ketika diunggah                                               |
| created_at       | timestamp         | -       | Waktu pembuatan record                                                       |
| updated_at       | timestamp         | -       | Waktu pembaruan terakhir                                                     |

---

## Tabel 2.7 Spesifikasi File Tabel Contact Messages

| Field               | Keterangan                                    |
| ------------------- | --------------------------------------------- |
| **Nama File**       | Tabel Contact Messages                        |
| **Akronim**         | contact_messages.myd                          |
| **Fungsi**          | Untuk menyimpan pesan dari formulir kontak    |
| **Tipe File**       | File transaksi                                |
| **Organisasi File** | Indexed Sequential                            |
| **Akses File**      | Random                                        |
| **Media**           | Harddisk                                      |
| **Panjang Record**  | 512 byte (estimasi berdasarkan struktur data) |
| **Kunci Field**     | id                                            |
| **Software**        | MySQL (dalam Laravel Framework)               |

### Struktur Tabel

| Kolom      | Tipe Data         | Panjang | Keterangan                  |
| ---------- | ----------------- | ------- | --------------------------- |
| id         | bigint (unsigned) | -       | Primary key, auto-increment |
| name       | varchar           | 255     | Nama pengirim pesan         |
| email      | varchar           | 255     | Alamat email pengirim       |
| subject    | varchar           | 255     | Subjek pesan                |
| message    | text              | -       | Isi pesan                   |
| created_at | timestamp         | -       | Waktu pembuatan record      |
| updated_at | timestamp         | -       | Waktu pembaruan terakhir    |

---

## Tabel 2.8 Spesifikasi File Tabel Notifications

| Field               | Keterangan                                    |
| ------------------- | --------------------------------------------- |
| **Nama File**       | Tabel Notifications                           |
| **Akronim**         | notifications.myd                             |
| **Fungsi**          | Untuk menyimpan notifikasi sistem             |
| **Tipe File**       | File transaksi                                |
| **Organisasi File** | Indexed Sequential                            |
| **Akses File**      | Random                                        |
| **Media**           | Harddisk                                      |
| **Panjang Record**  | 512 byte (estimasi berdasarkan struktur data) |
| **Kunci Field**     | id                                            |
| **Software**        | MySQL (dalam Laravel Framework)               |

### Struktur Tabel

| Kolom           | Tipe Data         | Panjang | Keterangan                                              |
| --------------- | ----------------- | ------- | ------------------------------------------------------- |
| id              | uuid              | -       | Primary key dengan format UUID                          |
| type            | varchar           | 255     | Jenis notifikasi                                        |
| notifiable_type | varchar           | 255     | Tipe model yang dapat menerima notifikasi (polymorphic) |
| notifiable_id   | bigint (unsigned) | -       | ID dari model yang menerima notifikasi (polymorphic)    |
| data            | text              | -       | Data notifikasi dalam format JSON                       |
| read_at         | timestamp         | -       | Waktu notifikasi dibaca (bisa null)                     |
| created_at      | timestamp         | -       | Waktu pembuatan record                                  |
| updated_at      | timestamp         | -       | Waktu pembaruan terakhir                                |

---

**Catatan**: Semua tabel ini merupakan bagian integral dari sistem manajemen motor dan transaksi di SRB Motors. Tabel-tabel ini dihubungkan melalui relasi foreign key untuk memastikan integritas data dan memungkinkan fungsi sistem yang kompleks termasuk manajemen pelanggan, inventaris motor, dan transaksi pembelian baik tunai maupun kredit.

---

## Hasil Blackbox Testing untuk Semua Form (Kecuali Login)

### 1. Contact Form

No. Skenario
pengujian Test case Hasil yang
diharapkan
Hasil
pengujian Kesimpulan

1. Mengisi form
   dengan data valid
   dan mengirim
   Input nama, email
   valid, subjek, dan
   pesan, lalu submit
   Pesan sukses dan
   data tersimpan di
   database
   Sesuai
   harapan Valid
2. Mengisi form
   dengan data tidak
   valid (email salah)
   Input nama, email
   tidak valid, subjek,
   dan pesan, lalu
   submit
   Sistem menolak
   input dan
   menampilkan
   pesan kesalahan
   Sesuai
   harapan Valid
3. Mengisi form
   dengan field
   kosong
   Submit form tanpa
   mengisi field yang
   wajib
   Sistem menolak
   submit dan
   menampilkan
   pesan kesalahan
   Sesuai
   harapan Valid
4. Mengisi form
   dengan karakter
   khusus
   Input data dengan
   karakter khusus
   pada field
   Form menerima
   input dengan
   karakter khusus
   dan menyimpan
   dengan benar
   Sesuai
   harapan Valid
5. Mengisi form
   dengan subjek
   kosong
   Submit form tanpa
   mengisi subjek
   Form tetap
   dikirim karena
   subjek tidak
   wajib
   Sesuai
   harapan Valid

### 2. Registration Form

No. Skenario
pengujian Test case Hasil yang
diharapkan
Hasil
pengujian Kesimpulan

1. Mengisi form
   registrasi dengan
   data valid
   Input nama, email
   valid, password
    > =8 karakter,
    > konfirmasi
    > password cocok
    > Registrasi
    > sukses, user
    > login otomatis
    > Sesuai
    > harapan Valid
2. Mengisi form
   tanpa mengisi field
   yang wajib
   Submit form tanpa
   nama, email, atau
   password
   Sistem menolak
   submit dan
   menampilkan
   pesan kesalahan
   Sesuai
   harapan Valid
3. Mengisi form
   dengan password
   tidak cocok
   Input password
   dan konfirmasi
   password yang
   berbeda
   Sistem menolak
   submit dan
   menampilkan
   pesan kesalahan
   Sesuai
   harapan Valid
4. Mengisi form
   dengan email yang
   sudah terdaftar
   Input email yang
   sudah terdaftar
   Error bahwa
   email sudah
   digunakan
   Sesuai
   harapan Valid
5. Mengisi form
   dengan format email
   tidak valid
   Input email
   dengan format
   tidak valid
   Sistem menolak
   submit dan
   menampilkan
   pesan kesalahan
   Sesuai
   harapan Valid

### 3. Motor Create Form

No. Skenario
pengujian Test case Hasil yang
diharapkan
Hasil
pengujian Kesimpulan

1. Mengisi form
   dengan data valid
   dan mengunggah
   gambar
   Input semua field
   wajib (nama, merek,
   harga, dll) dan
   upload gambar
   valid
   Motor berhasil
   ditambahkan ke
   database
   Sesuai
   harapan Valid
2. Mengisi form
   tanpa mengisi field
   yang wajib
   Submit form tanpa
   nama, merek, harga,
   atau gambar
   Sistem menolak
   submit dan
   menampilkan
   pesan kesalahan
   Sesuai
   harapan Valid
3. Mengunggah file
   gambar dengan
   format tidak valid
   Upload file bukan
   gambar (PDF, DOC,
   dll)
   Sistem menolak
   upload dan
   menampilkan
   pesan kesalahan
   Sesuai
   harapan Valid
4. Menginput harga
   dengan nilai
   negatif
   Input harga
   dengan nilai
   negatif
   Sistem menolak
   input dan
   menampilkan
   pesan kesalahan
   Sesuai
   harapan Valid
5. Menginput tahun
   dengan nilai di
   luar rentang
   Input tahun
   kurang dari 1900
   atau lebih dari
   2100
   Sistem menolak
   input dan
   menampilkan
   pesan kesalahan
   Sesuai
   harapan Valid

### 4. Motor Edit Form

No. Skenario
pengujian Test case Hasil yang
diharapkan
Hasil
pengujian Kesimpulan

1. Mengedit data
   motor dan
   mengunggah
   gambar baru
   Edit field dan
   upload gambar
   baru
   Motor berhasil
   diperbarui
   dengan data
   dan gambar
   baru
   Sesuai
   harapan Valid
2. Mengedit data
   motor tanpa
   mengganti
   gambar
   Edit field tanpa
   upload gambar
   baru
   Motor berhasil
   diperbarui
   dengan
   gambar lama
   tetap
   Sesuai
   harapan Valid
3. Mengedit dengan
   field kosong
   Edit dan submit
   dengan field wajib
   dikosongkan
   Sistem menolak
   submit dan
   menampilkan
   pesan kesalahan
   Sesuai
   harapan Valid
4. Menginput tahun
   dengan nilai di
   luar rentang
   Input tahun
   kurang dari 1900
   atau lebih dari
   2100
   Sistem menolak
   input dan
   menampilkan
   pesan kesalahan
   Sesuai
   harapan Valid
5. Menginput harga
   dengan nilai
   negatif
   Input harga
   dengan nilai
   negatif
   Sistem menolak
   input dan
   menampilkan
   pesan kesalahan
   Sesuai
   harapan Valid

### 5. Cash Order Form

No. Skenario
pengujian Test case Hasil yang
diharapkan
Hasil
pengujian Kesimpulan

1. Mengisi form
   pesanan tunai
   dengan data valid
   dan submit
   Input semua field
   wajib (nama,
   telepon, pekerjaan,
   dll) dan submit
   Transaksi
   tunai berhasil
   dibuat dan
   redirect ke
   konfirmasi
   Sesuai
   harapan Valid
2. Mengisi form
   tanpa mengisi field
   wajib
   Submit form tanpa
   nama, telepon, atau
   pekerjaan
   Sistem menolak
   submit dan
   menampilkan
   pesan kesalahan
   Sesuai
   harapan Valid
3. Menginput
   jumlah booking
   fee negatif
   Input booking fee
   dengan nilai
   negatif
   Sistem menolak
   input dan
   menampilkan
   pesan kesalahan
   Sesuai
   harapan Valid
4. Mengisi form
   dengan nomor
   telepon tidak
   valid
   Input nomor
   telepon dengan
   format tidak
   valid
   Sistem menolak
   input dan
   menampilkan
   pesan kesalahan
   Sesuai
   harapan Valid
5. Mengisi form
   dengan nomor
   telepon kosong
   Submit form tanpa
   mengisi nomor
   telepon
   Sistem menolak
   submit dan
   menampilkan
   pesan kesalahan
   Sesuai
   harapan Valid

### 6. Credit Order Form

No. Skenario
pengujian Test case Hasil yang
diharapkan
Hasil
pengujian Kesimpulan

1. Mengisi form kredit
   dengan data valid
   dan submit
   Input semua field
   wajib (nama,
   telepon,
   pekerjaan, DP,
   tenor) dan submit
   Transaksi
   kredit berhasil
   dibuat dan
   redirect ke
   upload
   dokumen
   Sesuai
   harapan Valid
2. Mengisi form
   tanpa mengisi field
   wajib
   Submit form tanpa
   nama, telepon,
   pekerjaan, DP,
   atau tenor
   Sistem menolak
   submit dan
   menampilkan
   pesan kesalahan
   Sesuai
   harapan Valid
3. Menginput DP
   lebih besar dari
   harga motor
   Input DP yang
   melebihi harga
   motor
   Sistem menolak
   input atau
   DP otomatis
   disesuaikan
   Sesuai
   harapan Valid
4. Mengisi form
   dengan nomor
   telepon tidak
   valid
   Input nomor
   telepon dengan
   format tidak
   valid
   Sistem menolak
   input dan
   menampilkan
   pesan kesalahan
   Sesuai
   harapan Valid
5. Mengisi form
   dengan nomor
   telepon kosong
   Submit form tanpa
   mengisi nomor
   telepon
   Sistem menolak
   submit dan
   menampilkan
   pesan kesalahan
   Sesuai
   harapan Valid

### 7. Document Upload Form

No. Skenario
pengujian Test case Hasil yang
diharapkan
Hasil
pengujian Kesimpulan

1. Mengunggah
   dokumen valid dan
   submit
   Upload file KTP,
   KK, slip gaji
   sesuai ketentuan
   dan submit
   Dokumen
   berhasil
   diunggah dan
   status
   transaksi
   diperbarui
   Sesuai
   harapan Valid
2. Mengunggah
   dokumen dengan
   format file tidak
   valid
   Upload file dengan
   format selain
   gambar/PDF
   Sistem menolak
   upload dan
   menampilkan
   pesan kesalahan
   Sesuai
   harapan Valid
3. Submit tanpa
   mengunggah
   dokumen wajib
   Submit tanpa
   upload KTP, KK,
   atau slip gaji
   Sistem menolak
   submit dan
   menampilkan
   pesan kesalahan
   Sesuai
   harapan Valid
4. Mengunggah
   dokumen melebihi
   ukuran maksimal
   Upload file lebih
   dari 2MB
   Sistem menolak
   upload dan
   menampilkan
   pesan kesalahan
   Sesuai
   harapan Valid
5. Mengunggah
   dokumen dengan
   ekstensi berbahaya
   Upload file dengan
   ekstensi berbahaya
   (php, exe, dll)
   Sistem menolak
   upload dan
   menampilkan
   pesan kesalahan
   Sesuai
   harapan Valid

### 8. User Management Form

No. Skenario
pengujian Test case Hasil yang
diharapkan
Hasil
pengujian Kesimpulan

1. Mengganti peran
   pengguna melalui
   tombol "Ubah" di
   kolom aksi
   Klik tombol "Ubah"
   di kolom aksi
   pada baris
   pengguna
   Modal "Ubah
   Peran Pengguna"
   muncul dengan
   nama pengguna
   dan role saat ini
   Sesuai
   harapan Valid
2. Memilih role
   baru dan
   mengkonfirmasi
   perubahan
   Pada modal yang
   muncul, pilih role
   baru (admin atau
   user) dan klik
   "Simpan Perubahan",
   lalu konfirmasi
   dengan SweetAlert
   Peran pengguna
   berhasil diubah
   sesuai pilihan,
   dan SweetAlert
   konfirmasi muncul
   Sesuai
   harapan Valid
3. Membatalkan
   perubahan role
   Pada modal yang
   muncul, klik
   "Simpan Perubahan"
   lalu batal pada
   SweetAlert
   konfirmasi
   Perubahan role
   dibatalkan,
   tidak ada
   perubahan role
   yang terjadi
   Sesuai
   harapan Valid
4. Mencoba
   menghapus akun
   sendiri
   Klik hapus pada
   akun sendiri
   Tindakan
   ditolak karena
   pengguna
   tidak bisa
   menghapus
   diri sendiri
   Sesuai
   harapan Valid
5. Menghapus akun
   pengguna lain
   Pilih pengguna
   lain dan klik
   hapus
   Pengguna
   lain
   berhasil
   dihapus dari
   sistem
   Sesuai
   harapan Valid

### 9. Admin Document Upload Form

No. Skenario
pengujian Test case Hasil yang
diharapkan
Hasil
pengujian Kesimpulan

1. Mengunggah
   dokumen valid dari
   admin panel
   Upload file KTP,
   KK, slip gaji sesuai
   ketentuan dari form
   admin
   Dokumen berhasil
   diunggah dan terkait
   dengan transaksi
   kredit
   Sesuai
   harapan Valid
2. Mengunggah
   dokumen dengan
   format file tidak
   valid
   Upload file dengan
   format selain
   gambar/PDF dari
   admin panel
   Sistem menolak
   upload dan
   menampilkan
   pesan kesalahan
   Sesuai
   harapan Valid
3. Submit tanpa
   memilih jenis
   dokumen
   Submit form tanpa
   memilih jenis
   dokumen terlebih
   dahulu
   Sistem menolak
   submit dan
   menampilkan
   pesan kesalahan
   Sesuai
   harapan Valid
4. Mengunggah
   dokumen melebihi
   ukuran maksimal
   Upload file lebih
   dari 5MB
   Sistem menolak
   upload dan
   menampilkan
   pesan kesalahan
   Sesuai
   harapan Valid
5. Mengupload
   dokumen untuk
   transaksi tunai
   Mencoba upload
   dokumen untuk
   transaksi tunai dari
   form admin
   Sistem tetap
   menerima upload
   dan mengaitkan
   dokumen ke
   credit detail
   Sesuai
   harapan Valid
6. Upload dokumen
   untuk transaksi
   kredit tanpa credit
   detail
   Upload dokumen
   untuk transaksi
   kredit yang belum
   memiliki credit
   detail
   Sistem otomatis
   membuatkan
   credit detail dan
   mengaitkan
   dokumen
   Sesuai
   harapan Valid

### 10. Transaction Create Form

No. Skenario
pengujian Test case Hasil yang
diharapkan
Hasil
pengujian Kesimpulan

1. Membuat
   transaksi tunai
   baru dengan data
   valid
   Pilih pelanggan,
   motor, tipe tunai
   dan data lainnya
   valid
   Transaksi
   tunai
   berhasil
   dibuat
   Sesuai
   harapan Valid
2. Membuat
   transaksi kredit
   baru dengan data
   valid
   Pilih pelanggan,
   motor, tipe kredit
   dan detail kredit
   valid
   Transaksi
   kredit dan
   detail kredit
   berhasil
   dibuat
   Sesuai
   harapan Valid
3. Submit tanpa
   mengisi field
   wajib
   Submit form tanpa
   pelanggan, motor,
   atau tipe transaksi
   Sistem menolak
   submit dan
   menampilkan
   pesan kesalahan
   Sesuai
   harapan Valid
4. Memilih tipe
   transaksi kredit
   untuk
   menampilkan
   detail kredit
   Pilih tipe
   transaksi kredit
   Form detail
   kredit
   muncul
   sesuai
   harapan
   Sesuai
   harapan Valid
5. Mengisi form
   dengan nomor
   telepon tidak
   valid
   Input nomor
   telepon dengan
   format tidak
   valid
   Sistem menolak
   input dan
   menampilkan
   pesan kesalahan
   Sesuai
   harapan Valid

### 10. Transaction Update Form

No. Skenario
pengujian Test case Hasil yang
diharapkan
Hasil
pengujian Kesimpulan

1. Memperbarui
   data transaksi
   tunai
   Edit field transaksi
   tunai dan submit
   Transaksi
   tunai
   berhasil
   diperbarui
   Sesuai
   harapan Valid
2. Memperbarui
   data transaksi
   kredit
   Edit field transaksi
   kredit dan submit
   Transaksi
   kredit dan
   detail kredit
   berhasil
   diperbarui
   Sesuai
   harapan Valid
3. Mengubah tipe
   transaksi dari
   kredit ke tunai
   Edit transaksi,
   ubah dari kredit
   ke tunai
   Transaksi
   diupdate
   dan detail
   kredit
   dihapus
   Sesuai
   harapan Valid
4. Submit form
   dengan field
   yang tidak valid
   Submit form
   dengan data
   tidak valid (hingga
   negatif)
   Sistem menolak
   submit dan
   menampilkan
   pesan kesalahan
   Sesuai
   harapan Valid
5. Mengisi form
   dengan nomor
   telepon tidak
   valid
   Input nomor
   telepon dengan
   format tidak
   valid
   Sistem menolak
   input dan
   menampilkan
   pesan kesalahan
   Sesuai
   harapan Valid

No. Skenario
pengujian Test case Hasil yang
diharapkan
Hasil
pengujian Kesimpulan

1. User Id dan
   password tidak
   diisi kemudian
   klik tombol login
   User Id : (kosong)
   Password: (kosong)
   Sistem akan menolak
   akses user dan
   menampilkan "User Id
   dan password tidak
   dikenal"
   Sesuai
   harapan Valid
2. Mengetikkan user
   ID dan password
   tidak diisi atau
   kosong kemudian
   klik tombol login
   User ID: 1001
   Password : (kosong)
   Sistem akan menolak
   akses user dan
   menampilkan "User Id
   dan password tidak
   dikenal"
   Sesuai
   harapan Valid
3. User ID tidak diisi
   (kosong) dan
   password diisi
   kemudian klik
   tombol login
   User Id: (kosong)
   Password: 1998-03-31
   Sistem akan menolak
   akses user dan
   menampilkan "User Id
   dan password tidak
   dikenal"
   Sesuai
   harapan Valid
4. Mengetikkan
   salah satu kondisi
   salah pada user
   ID atau password
   kemudian klik
   tombol login
   User ID: 1001 (benar)
   Password: 1998-03-31
   (salah)
   Sistem akan menolak
   akses user dan
   menampilkan "User Id
   dan password tidak
   dikenal".
   Sesuai
   harapan
   Valid
5. Mengetikkan user
   ID dan password
   dengan data yang
   benar kemudian
   klik tombol login
   User ID: 1001 (benar)
   Password: 1998-03-31
   (benar)
   Sistem menerima
   akses login dan
   kemudian langsung
   menampilkan menu
   utama.
   Sesuai
   harapan
   Valid

### 11. Profile Form (Edit Profile & Change Password)

| No. | Skenario pengujian | Test case | Hasil yang diharapkan | Hasil pengujian | Kesimpulan |
| --- | ------------------------------------------------ | ----------------------------------------------------------------------| No. | Skenario pengujian | Test case | Hasil yang diharapkan | Hasil pengujian | Kesimpulan |
|---|---|---|---|---|---|
| 1. | Mengupdate profil dengan data valid | Input nama dan email valid, lalu klik Simpan | Data profil berhasil diperbarui dan pesan sukses muncul | Sesuai harapan | Valid |
| 2. | Mengupdate profil dengan field kosong | Kosongkan nama atau email, lalu klik Simpan | Sistem menolak dan menampilkan pesan error validasi | Sesuai harapan | Valid |
| 3. | Mengubah password dengan data valid | Input password saat ini (benar), password baru, dan konfirmasi (cocok) | Password berhasil diubah dan pesan sukses muncul | Sesuai harapan | Valid |
| 4. | Mengubah password dengan password saat ini salah | Input password saat ini (salah), password baru valid | Sistem menolak dan menampilkan pesan error password salah | Sesuai harapan | Valid |
| 5. | Mengubah password dengan konfirmasi tidak cocok | Input password baru dan konfirmasi berbeda | Sistem menolak dan menampilkan pesan error konfirmasi tidak cocok | Sesuai harapan | Valid | |



# SRB Motors Laravel Implementation

### ada bug dimana ketika create data transaksi harga motor nya tidak sesuai dengan yang ada coba fix 


## NEXT

Role owner / admin / user biasa  
Middleware atau aturan masuk dll juga harus di pastikan sudah benar
Fitur forgot password (notes untuk development jadi tidak menggunakan third party) dan profil management
tambah crud lagi di admin yaitu data penjualan motor dan ini pasti datanya dari luar atau di luar webiste misal ada yang datang ke dealer langsung  
dan tambahkan sweetalert 2 di admin
spek dapat di tambah input nya jadi user bisa milih misah awal tampilkan 1 input spek lalu ada opsi plus tambah spek nanti muncul input baru lagi



MEMISAHKAN HALAMAN HALAMAN DAN
HALAMAN GALERI MOTOR NANTI BAKAL ADA FILTER DAN SEARCH UNTUK USER DAN BERBAGI FITUR LAGI
SERTA ADA HALAMAN BERITA JUGA
DI admin saya ingin gambar motor ada default nya nanti saya kasih gambar default nya jadi gambar itu tidak harus ada
halaman Simulasi Kredit: Ini adalah fitur wajib untuk dealer. Buat kalkulator sederhana di mana pengguna bisa memasukkan harga motor, jumlah DP (Uang Muka), dan tenor (misal 12, 24, 36 bulan). Website Anda lalu menghitung estimasi cicilan per bulan.
Blog / Artikel: Buat sistem blog sederhana (ini juga CRUD, tapi untuk artikel) di mana admin bisa memposting tips perawatan motor, berita otomotif, atau info promo terbaru.
Fitur Perbandingan Motor:
Memungkinkan pengguna membandingkan spesifikasi dua atau lebih motor secara berdampingan, sangat berguna dalam proses pengambilan 
keputusan pembelian.
Perkecil Footer
Custom Loading
Manajemen Pemesanan (Bisa dari luar web di catat di web nya)
Efisiensi Table


SIAPKAN SISTEM SEMI BELI ONLINE JADI MISAL ADA USER YANG MEMESAN BAKAL BISA ADMIN ATUR DI ADMIN PANEL BERHUNGAN DENGAN UPDATE  Manajemen Pemesanan (Order Management) - V0.05 NAH POKOE SIAPKAN SISTEM TERBAIK TAPI TIDAK TERLALU RIBET

ORDER HISTORY DAN PROFILE MANAGEMENT

BUAT NAMA NAMA TABEL PAKAI BAHASA INDONESIA SERTA MERGE FILE MIGRASI AGAR FILE NYA TAK TERLALU BANYAK

## Recent Progress

-   Fixed navbar height issue making it less tall and more proportionally sized
-   Organized frontend assets by moving CSS, JS, and image files to proper Laravel directories
-   Integrated custom CSS with Tailwind CSS through Vite build process
-   Fixed login button size in navbar to match other navbar elements
-   Fixed responsive navbar mobile menu where login button icon wasn't clickable
-   Fixed login and register form logo positioning to prevent it from being cut off
-   Improved password toggle icon positioning in login and register forms
-   Made navbar height consistent across all pages (homepage, login, register)
-   Translated login and register pages to Indonesian
-   Completely redesigned admin dashboard with improved styling
-   Added dropdown menu for "View Website" and "Logout" options in admin navbar
-   Improved styling for all CRUD sections in the admin panel
-   Enhanced responsive design for all admin pages, especially for mobile and tablet devices
-   Replaced JSON specifications input with user-friendly form fields for motor specifications
-   Translated entire admin panel to Indonesian
-   Fixed Swiper.js duplication issue when there are only 1-2 items in sliders
-   Improved styling of motor gallery cards for better visual appeal
-   Enhanced specification display in modal with structured format
-   Implemented separate specifications table with proper relationships
-   Added full rollback capability for database migrations
-   Enhanced validation error messages for login and registration forms with specific Indonesian messages for different error scenarios
-   Added file cleanup functionality to automatically delete associated files when records are deleted (transactions, documents, motors)
-   Upgraded admin panel styling with modern sidebar navigation, enhanced UI elements, and dark mode support
-   Implemented responsive design for all admin pages with improved layout and user experience

## Overview

The SRB Motors website has been successfully converted from a static HTML/CSS/JS site to a dynamic Laravel application. The implementation maintains the original design and user experience while adding powerful backend functionality through Laravel.

## Features Implemented

### 1. Frontend Features (Preserving Original Design)

-   Responsive design with navigation menu
-   Home section with parallax effect
-   "Our Advantages" section
-   Popular motors slider with motor details
-   About Us section
-   Motors gallery (divided by brand: Yamaha, Honda)
-   Tips & Tricks section
-   Contact form with backend processing
-   Footer with contact information
-   Modal for showing detailed motor specifications

### 2. Backend Features

-   Complete user authentication system (login/register)
-   Role-based access control (admin/user roles)
-   Motor management CRUD operations
-   Image upload functionality for motor images
-   Contact form with database storage
-   User management in admin panel
-   Search functionality in admin panels
-   Dashboard with statistics
-   Separated motor specifications into dedicated table for better organization

### 3. Database Schema

-   Motors Table:

    -   id (primary key)
    -   name (string)
    -   brand (string) - Honda, Yamaha
    -   model (string)
    -   price (decimal)
    -   year (integer)
    -   type (string) - Metic, Automatic, Sport, etc.
    -   image_path (string) - path to the motor image
    -   details (text) - brief details about the motor
    -   created_at
    -   updated_at

-   Motor Specifications Table (newly added):

    -   id (primary key)
    -   motor_id (foreign key) - references motors table
    -   spec_key (string) - the specification name (e.g., engine_type, engine_size)
    -   spec_value (text) - the specification value (e.g., "4 tak", "155cc")
    -   created_at
    -   updated_at

-   Contact Messages Table:

    -   id (primary key)
    -   name (string)
    -   email (string)
    -   subject (string)
    -   message (text)
    -   created_at
    -   updated_at

-   Users Table (with role-based access):
    -   id (primary key)
    -   name (string)
    -   email (string) - unique
    -   password (string)
    -   role (string) - admin, user
    -   created_at
    -   updated_at

### 4. Controllers

-   HomeController - Handles the main page display
-   MotorController - Handles CRUD operations for motors
-   ContactController - Handles contact form processing
-   AdminController - Handles admin panel dashboard
-   ContactMessageController - Manages contact messages
-   UserController - Manages user accounts and roles
-   AuthController - Handles authentication (login/register)

### 5. Admin Panel Features

-   Dashboard with statistics (motors, messages, users)
-   Motor management (CRUD operations with image uploads)
-   Contact message management
-   User management (role assignment, deletion)
-   Search functionality across all admin sections
-   Recent items panels for quick overview
-   Separate specifications management in motor forms

### 6. Security Measures

-   CSRF protection for all forms
-   Input validation
-   Authentication for admin area
-   Role-based middleware (admin/user)
-   Image upload validation
-   User access control

### 7. Frontend Technologies

-   Bootstrap 5.3.0-alpha1 (maintaining current styling)
-   Swiper.js for sliders (same as original site)
-   Font Awesome for icons (same as original site)
-   Custom CSS (style.css) adapted from original site
-   JavaScript functionality adapted from original site

## Key Improvements Over Original Site

1. **Dynamic Content Management**: Motors can now be added, edited, and deleted through an admin panel
2. **User Authentication**: Secure login system with role-based access
3. **Contact Message Storage**: All contact form submissions are stored in the database
4. **Image Upload**: Easy way to add images for new motorcycles
5. **User Management**: Admin can manage user roles and accounts
6. **Search Functionality**: Search across motors, messages, and users in admin panel
7. **Dashboard**: Overview of all system activity
8. **Proper Specifications Management**: Separated specifications into a dedicated table for better organization and retrieval
9. **Clean Specification Display**: Specifications now display properly formatted in modals without horizontal scrolling
10. **Enhanced File Management**: Automatic cleanup of associated files when records are deleted

## Project Structure

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── HomeController.php
│   │   ├── MotorController.php
│   │   ├── ContactController.php
│   │   ├── AdminController.php
│   │   ├── ContactMessageController.php
│   │   ├── UserController.php
│   │   └── AuthController.php
│   └── Middleware/
│       └── AdminMiddleware.php
├── Models/
│   ├── Motor.php
│   ├── MotorSpecification.php
│   ├── ContactMessage.php
│   └── User.php
config/
└── app.php (with middleware registration)
database/
├── migrations/
├── seeders/
│   ├── DatabaseSeeder.php
│   └── UserSeeder.php
resources/
└── views/
    ├── layouts/
    │   ├── app.blade.php
    │   └── admin.blade.php
    ├── partials/
    │   ├── header.blade.php
    │   └── footer.blade.php
    ├── pages/
    │   ├── home.blade.php
    │   └── admin/
    │       ├── dashboard.blade.php
    │       ├── motors/
    │       ├── contact/
    │       └── users/
    └── auth/
        ├── login.blade.php
        └── register.blade.php
routes/
└── web.php
```

## Usage

1. **Public Site**: Visit the homepage to browse motors just like the original site
2. **Admin Panel**: Access `/admin` (requires admin login)
3. **Login**: Use `/login` to access the authentication system
4. **Registration**: New users can register at `/register`

## Default Admin User

After seeding the database, you can log in with:

-   Email: admin@srbmotors.com
-   Password: password

## Bug Fixes Implemented

1. **Motor Duplication Fix**: Fixed issue where motors appeared 3 times in sliders by disabling Swiper.js loop functionality (`loop: false`) to prevent slide duplication.

2. **Navbar Dropdown Fix**: Updated the navbar authentication element ID from `login-btn` to `auth-btn` to prevent conflicts with original JavaScript that was opening the login modal. Now authenticated users get a proper dropdown menu with user name, admin panel access (for admins), and logout option, while unauthenticated users get a link to the login page.

3. **Specifications Display Fix**: Fixed issue where specifications were displaying horizontally by implementing a proper structured format with vertical layout.

## Key Features & Enhancements

1. **Complete Authentication System**:

    - User registration and login
    - Role-based access (admin/user)
    - Secure password hashing

2. **Enhanced Admin Panel**:

    - Dashboard with statistics
    - Motor management (CRUD operations)
    - Contact message management
    - User management with role assignment
    - Image upload for motors
    - Search functionality across all sections
    - Proper specifications management

3. **Preserved Original Design**:

    - Same layout and styling as original site
    - Responsive design maintained
    - All original sections preserved (home, advantages, motors, about us, etc.)

4. **Added Functionality**:
    - Dynamic content management
    - Backend processing for contact form
    - Image upload for motor listings
    - User role management
    - Proper specifications storage and retrieval
    - Migration with full rollback capability

## Project Architecture

The application follows Laravel best practices with:

-   MVC architecture
-   Resource controllers for CRUD operations
-   Blade templating system
-   Eloquent ORM models
-   Middleware for authentication and authorization
-   Proper separation of concerns

## Recent Enhancements

5. **Improved Authentication Pages**:

    - Enhanced design for login and registration pages
    - Added proper spacing to prevent navbar overlap
    - Improved logo positioning to avoid being cut off
    - Better visual styling with gradients and animations
    - Consistent with the SRB Motors brand

6. **Enhanced Navbar Functionality**:

    - Implemented navbar shrinking effect when scrolling
    - Improved dropdown menu styling and functionality
    - Better mobile responsiveness
    - Enhanced visual feedback for interactive elements

7. **Fixed Error Handling**:

    - Resolved model binding issues in routes
    - Fixed URL generation errors
    - Improved null value handling in views
    - Better controller parameter matching

8. **UI/UX Improvements**:
    - Enhanced form validation and error display
    - Improved auto-capitalization settings in forms
    - Better visual feedback for user interactions
    - Refined styling throughout the application

9. **Database Normalization**:
    - Separated specifications into a dedicated table
    - Maintained referential integrity with foreign keys
    - Improved query performance and data organization
    - Added full migration rollback capability

10. **File Management**:
    - Implemented automatic file cleanup when records are deleted
    - Added model events to handle file deletion for documents and motor images
    - Ensured proper disk usage by removing orphaned files

## ERD (Entity Relationship Diagram) Summary

### Database Tables and Attributes

#### 1. users table
- **Primary Key**: id (integer, auto-increment)
- **Attributes**:
  - name (string)
  - email (string, unique)
  - email_verified_at (timestamp, nullable)
  - password (string)
  - remember_token (string, nullable)
  - role (string, default: 'user') - values: 'user', 'admin'
  - created_at (timestamp)
  - updated_at (timestamp)

#### 2. motors table
- **Primary Key**: id (integer, auto-increment)
- **Attributes**:
  - name (string)
  - brand (string) - values: 'Honda', 'Yamaha'
  - model (string, nullable)
  - price (decimal, 10,2)
  - year (integer, nullable)
  - type (string, nullable) - values: 'Metic', 'Automatic', 'Sport', etc.
  - image_path (string)
  - details (text, nullable)
  - tersedia (boolean, default: true)
  - created_at (timestamp)
  - updated_at (timestamp)

#### 3. motor_specifications table
- **Primary Key**: id (integer, auto-increment)
- **Foreign Key**: motor_id (references motors.id with cascade delete)
- **Attributes**:
  - spec_key (string)
  - spec_value (text, nullable)
  - created_at (timestamp)
  - updated_at (timestamp)

#### 4. contact_messages table
- **Primary Key**: id (integer, auto-increment)
- **Attributes**:
  - name (string)
  - email (string)
  - subject (string)
  - message (text)
  - created_at (timestamp)
  - updated_at (timestamp)

#### 5. transactions table
- **Primary Key**: id (integer, auto-increment)
- **Foreign Keys**:
  - user_id (references users.id with cascade delete)
  - motor_id (references motors.id with cascade delete)
- **Attributes**:
  - transaction_type (enum) - values: 'CASH', 'CREDIT'
  - status (enum) - values: 'new_order', 'waiting_payment', 'payment_confirmed', 'unit_preparation', 'ready_for_delivery', 'completed', 'menunggu_persetujuan', 'data_tidak_valid', 'dikirim_ke_surveyor', 'jadwal_survey', 'disetujui', 'ditolak'
  - notes (text, nullable)
  - booking_fee (decimal, 10,2, nullable) - for cash transactions
  - total_amount (decimal, 10,2)
  - payment_method (string, nullable)
  - payment_status (enum) - values: 'pending', 'confirmed', 'failed' (default: 'pending')
  - customer_name (string, nullable)
  - customer_phone (string, nullable)
  - customer_occupation (string, nullable)
  - created_at (timestamp)
  - updated_at (timestamp)

#### 6. credit_details table
- **Primary Key**: id (integer, auto-increment)
- **Foreign Key**: transaction_id (references transactions.id with cascade delete, unique)
- **Attributes**:
  - down_payment (decimal, 10,2)
  - tenor (integer) - in months
  - monthly_installment (decimal, 10,2)
  - credit_status (enum) - values: 'menunggu_persetujuan', 'data_tidak_valid', 'dikirim_ke_surveyor', 'jadwal_survey', 'disetujui', 'ditolak' (default: 'menunggu_persetujuan')
  - approved_amount (decimal, 10,2, nullable)
  - created_at (timestamp)
  - updated_at (timestamp)

#### 7. documents table
- **Primary Key**: id (integer, auto-increment)
- **Foreign Key**: credit_detail_id (references credit_details.id with cascade delete)
- **Attributes**:
  - document_type (enum) - values: 'KTP', 'KK', 'SLIP_GAJI', 'BPKB', 'STNK', 'FAKTUR', 'LAINNYA'
  - file_path (string)
  - original_name (string)
  - created_at (timestamp)
  - updated_at (timestamp)

#### 8. notifications table
- **Primary Key**: id (uuid)
- **Attributes**:
  - type (string)
  - notifiable_type (morphs - polymorphic relation)
  - notifiable_id (morphs - polymorphic relation)
  - data (text)
  - read_at (timestamp, nullable)
  - created_at (timestamp)
  - updated_at (timestamp)

### Relationships

#### 1. One-to-Many Relationships
- **User has many Transactions**: users.id → transactions.user_id
- **Motor has many Transactions**: motors.id → transactions.motor_id
- **Motor has many Motor Specifications**: motors.id → motor_specifications.motor_id
- **Credit Detail has many Documents**: credit_details.id → documents.credit_detail_id

#### 2. One-to-One Relationship
- **Transaction has one Credit Detail**: transactions.id → credit_details.transaction_id (with unique constraint)

#### 3. Polymorphic Relationship
- **Notifications**: The notifications table has a polymorphic relationship with multiple models using notifiable_type and notifiable_id columns

### ERD Diagram Description

```
[users] 1------N [transactions] 1------1 [credit_details] 1------N [documents]
  |                                        |
  |                                        |
  1------N [motor_specifications]    1------N [motors] 1------N [transactions]

[contact_messages] (independent table)
[notifications] (polymorphic relationship)
```

The database structure supports a complete motorcycle sales system with both cash and credit (installment) transactions, with proper user authentication and motor management capabilities.

### Penjelasan Relasi Notifikasi dalam Sistem SRB Motors (dalam Bahasa Indonesia)

Tabel `notifications` dalam sistem SRB Motors menggunakan **relasi polimorfik**, yang memungkinkan satu tabel untuk menyimpan notifikasi dari berbagai model tanpa membuat tabel notifikasi terpisah.

#### Struktur Tabel
- `notifiable_type`: Menyimpan nama model (misalnya 'App\Models\User')
- `notifiable_id`: Menyimpan ID dari entitas model yang bersangkutan

#### Fungsi dalam Sistem
- Notifikasi digunakan untuk memberitahu pelanggan dan admin tentang perubahan status transaksi
- Dua jenis notifikasi utama: `TransactionCreated` dan `TransactionStatusChanged`
- Ditangani melalui observer `TransactionObserver` yang secara otomatis memicu notifikasi saat ada perubahan

#### Hubungan ERD
- Tabel `notifications` memiliki hubungan one-to-many ke tabel `users` melalui mekanisme relasi polimorfik
- Kolom `notifiable_type` dan `notifiable_id` bekerja bersama untuk menghubungkan ke berbagai model

#### Manfaat
- Efisiensi database karena semua notifikasi disimpan di satu tempat
- Fleksibilitas untuk menambah model baru yang bisa menerima notifikasi
- Pengelolaan terpusat yang memudahkan monitoring

Dengan relasi polimorfik ini, sistem mampu memberikan informasi terkini kepada pengguna tentang status transaksi mereka dan memberikan admin informasi penting terkait pesanan yang masuk dan berjalan.

## Qwen Added Memories
- Successfully implemented customer information fields (name, phone number, and occupation) to both cash and credit transaction forms. Added database migration, updated models, controllers, views, and added manual transaction creation capability in the admin panel.
- Added customer_name, customer_phone, and customer_occupation fields to the transactions table via migration
- Updated Transaction model to include new fields in fillable array
- Modified cash_order_form.blade.php and credit_order_form.blade.php to include required customer information fields
- Updated MotorGalleryController to process the new customer information fields during transaction creation
- Enhanced admin panel views (index, show, create, edit) to display, create and edit customer information
- Added "Buat Transaksi Baru" button in admin transactions index page for manual transaction creation
- Updated order confirmation and user transactions pages to display customer information
- These changes ensure complete customer information is available for both cash and credit transactions in the admin panel
- Soon there will be updates to the PDF reports as well, in addition to the invoice improvements
- Implemented file cleanup functionality to automatically delete associated files when records are deleted. This includes: 1) Document model now deletes files from storage when documents are removed, 2) CreditDetail model cascades deletion to associated documents, 3) Motor model deletes image files when motors are removed, 4) TransactionController properly handles file deletion during transaction removal. This ensures no orphaned files remain in storage when records are deleted.
- Successfully implemented a fix for the responsive transaction table issue where thead wasn't extending to match tbody on mobile/tablet devices. The solution involved applying responsive classes (d-none d-lg-table-cell, d-none d-xl-table-cell) to both table headers and their corresponding table cells to ensure they hide consistently across different screen sizes, maintaining proper alignment while preserving the desktop experience.
- Fitur simulasi kredit di SRB Motors kini hanya menampilkan tombol "Simulasi Kredit" di halaman index motor (daftar semua motor). Tombol ini telah dihapus dari halaman detail motor, halaman home/slider motor populer, dan bagian motor terkait. Akses ke halaman simulasi kredit tetap terbuka untuk pengguna tanpa login, dan fitur ini tetap berfungsi secara penuh dengan perhitungan DP, tenor, dan bunga.
- Rancangan fitur simulasi kredit telah dihapus dari sistem untuk sementara, tetapi desain dan implementasi kodenya telah disimpan untuk referensi pengembangan di masa mendatang
- In the SRB Motors Laravel application, the user management feature allows admins to change user roles from the admin panel. The implementation includes a confirmation dialog using SweetAlert2 to confirm role changes before they are submitted to the server. The solution was implemented using focus/blur events to detect changes and a temporary form submission approach to work with Laravel's existing controller that expects a redirect response. The JavaScript uses local SweetAlert2 files from public/sweetalert directory.

## Rancangan Fitur Simulasi Kredit (Dihapus Sementara)

### Deskripsi Fitur
Fitur simulasi kredit memungkinkan pengguna menghitung estimasi cicilan bulanan motor berdasarkan harga motor, jumlah uang muka (DP), dan tenor cicilan. Fitur ini menyediakan perhitungan sederhana untuk membantu pengguna memperkirakan biaya kredit motor.

### Struktur Route
- `/motors/{motor}/credit-calculation` (method: GET) - Menampilkan halaman simulasi kredit untuk motor tertentu

### Controller Method
- `MotorGalleryController@showCreditCalculation()` - Menampilkan view simulasi kredit dengan data motor

### View: `credit_calculation.blade.php`
- Memiliki form untuk input DP, tenor cicilan (12, 24, 36, 48 bulan), dan suku bunga
- Menampilkan informasi motor (nama dan harga)
- Melakukan perhitungan cicilan bulanan secara client-side menggunakan JavaScript
- Menampilkan hasil simulasi dengan rincian pembiayaan dan cicilan

### Fungsi Perhitungan
- Menggunakan rumus perhitungan kredit standar:
  `M = P [ r(1+r)^n ] / [ (1+r)^n - 1 ]`
  - M = Cicilan bulanan
  - P = Pokok pinjaman (harga motor - DP)
  - r = suku bunga bulanan
  - n = jumlah bulan (tenor)

### Validasi Input
- Validasi bahwa DP tidak melebihi harga motor
- Validasi bahwa nilai DP, tenor, dan bunga valid
- Validasi bahwa DP minimal disarankan 20% dari harga motor

### Tampilan Hasil
- Rincian pembiayaan (harga motor, DP, biaya pokok, bunga, total pembiayaan)
- Rincian cicilan (tenor dan cicilan per bulan)
- Peringatan bahwa simulasi hanya perkiraan
- Tombol kembali ke detail motor

Fitur ini dapat diimplementasikan kembali di masa mendatang dengan menggunakan kode yang telah disimpan sebagai referensi.

## Catatan Tambahan Implementasi Form Validasi

Pada tanggal 18 November 2025, dilakukan peninjauan menyeluruh terhadap blackbox testing untuk memastikan semua skenario pengujian sesuai dengan form aktual yang ada dalam sistem SRB Motors. Berikut adalah ringkasan perubahan dan penyesuaian yang telah dilakukan:

1. **Contact Form** (`home.blade.php`)
   - Dikonfirmasi bahwa form ini tidak memiliki field upload file
   - Test case "Mengirim form tanpa file lampiran" diganti menjadi "Mengisi form dengan subjek kosong"
   - Field yang tersedia: name (wajib), email (wajib), subject (opsional), message (wajib)

2. **Login dan Registration Forms** (`auth/login.blade.php`, `auth/register.blade.php`)
   - Sudah sesuai dengan form aktual
   - Implementasi validasi sudah benar

3. **Motor Create/Edit Forms** (`pages/admin/motors/{create|edit}.blade.php`)
   - Sudah sesuai dengan form aktual
   - Validasi untuk semua field utama (name, brand, price, image, dll) sudah benar

4. **Cash dan Credit Order Forms** (`pages/motors/{cash_order_form|credit_order_form}.blade.php`)
   - Validasi nomor telepon telah diimplementasikan di controller dan ditampilkan di form
   - Field customer_phone sekarang telah melalui validasi format yang sesuai

5. **Document Upload Form** (`pages/motors/upload_credit_documents.blade.php`)
   - Sudah sesuai dengan form aktual
   - Validasi untuk dokumen wajib (KTP, KK, SLIP_GAJI) telah diimplementasikan

6. **Transaction Create/Edit Forms** (`pages/admin/transactions/{create|edit}.blade.php`)
   - Field customer_phone telah diberi validasi format nomor telepon
   - Validasi untuk semua field penting sudah diterapkan

7. **User Management** (`pages/admin/users/index.blade.php`)
   - Sudah sesuai dengan fungsionalitas aktual
   - Validasi hak akses dan keamanan sudah benar

Semua test case dalam blackbox testing sekarang mencerminkan form dan validasi yang sebenarnya ada dalam sistem SRB Motors, dengan fokus pada validasi form bukan pada akses URL.
