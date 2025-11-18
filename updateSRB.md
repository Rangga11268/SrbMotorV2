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

# Spesifikasi File Tabel-Tabel Utama - Sistem SRB Motors

## Tabel 2.1 Spesifikasi File Tabel Users

| Field | Keterangan |
|-------|------------|
| **Nama File** | Tabel Users |
| **Akronim** | users.myd |
| **Fungsi** | Untuk menyimpan informasi pengguna (pelanggan dan admin) |
| **Tipe File** | File master |
| **Organisasi File** | Indexed Sequential |
| **Akses File** | Random |
| **Media** | Harddisk |
| **Panjang Record** | 384 byte (estimasi berdasarkan struktur data) |
| **Kunci Field** | id |
| **Software** | MySQL (dalam Laravel Framework) |

### Struktur Tabel

| Kolom | Tipe Data | Panjang | Keterangan |
|-------|-----------|---------|------------|
| id | bigint (unsigned) | - | Primary key, auto-increment |
| name | varchar | 255 | Nama lengkap pengguna |
| email | varchar | 255 | Alamat email unik pengguna |
| email_verified_at | timestamp | - | Waktu verifikasi email (bisa null) |
| password | varchar | 255 | Hash password pengguna |
| remember_token | varchar | 100 | Token untuk fitur "remember me" (bisa null) |
| role | varchar | 255 | Peran pengguna ('user', 'admin'), default 'user' |
| created_at | timestamp | - | Waktu pembuatan record |
| updated_at | timestamp | - | Waktu pembaruan terakhir |

---

## Tabel 2.2 Spesifikasi File Tabel Motors

| Field | Keterangan |
|-------|------------|
| **Nama File** | Tabel Motors |
| **Akronim** | motors.myd |
| **Fungsi** | Untuk menyimpan informasi motor yang dijual |
| **Tipe File** | File master |
| **Organisasi File** | Indexed Sequential |
| **Akses File** | Random |
| **Media** | Harddisk |
| **Panjang Record** | 512 byte (estimasi berdasarkan struktur data) |
| **Kunci Field** | id |
| **Software** | MySQL (dalam Laravel Framework) |

### Struktur Tabel

| Kolom | Tipe Data | Panjang | Keterangan |
|-------|-----------|---------|------------|
| id | bigint (unsigned) | - | Primary key, auto-increment |
| name | varchar | 255 | Nama motor |
| brand | varchar | 255 | Merek motor (Honda, Yamaha) |
| model | varchar | 255 | Model motor (bisa null) |
| price | decimal | 10,2 | Harga motor |
| year | integer | - | Tahun produksi (bisa null) |
| type | varchar | 255 | Jenis motor (Metic, Automatic, Sport, etc.) (bisa null) |
| image_path | varchar | 255 | Path gambar motor |
| details | text | - | Detail singkat tentang motor (bisa null) |
| tersedia | boolean | - | Ketersediaan motor, default true |
| created_at | timestamp | - | Waktu pembuatan record |
| updated_at | timestamp | - | Waktu pembaruan terakhir |

---

## Tabel 2.3 Spesifikasi File Tabel Motor Specifications

| Field | Keterangan |
|-------|------------|
| **Nama File** | Tabel Motor Specifications |
| **Akronim** | motor_specifications.myd |
| **Fungsi** | Untuk menyimpan spesifikasi teknis dari motor |
| **Tipe File** | File transaksi |
| **Organisasi File** | Indexed Sequential |
| **Akses File** | Random |
| **Media** | Harddisk |
| **Panjang Record** | 256 byte (estimasi berdasarkan struktur data) |
| **Kunci Field** | id |
| **Software** | MySQL (dalam Laravel Framework) |

### Struktur Tabel

| Kolom | Tipe Data | Panjang | Keterangan |
|-------|-----------|---------|------------|
| id | bigint (unsigned) | - | Primary key, auto-increment |
| motor_id | bigint (unsigned) | - | Foreign key ke tabel `motors` |
| spec_key | varchar | 255 | Nama spesifikasi (misal: engine_type, engine_size) |
| spec_value | text | - | Nilai spesifikasi (bisa null) |
| created_at | timestamp | - | Waktu pembuatan record |
| updated_at | timestamp | - | Waktu pembaruan terakhir |

---

## Tabel 2.4 Spesifikasi File Tabel Transactions

| Field | Keterangan |
|-------|------------|
| **Nama File** | Tabel Transactions |
| **Akronim** | transactions.myd |
| **Fungsi** | Untuk menyimpan informasi transaksi (pembelian tunai dan kredit) |
| **Tipe File** | File transaksi |
| **Organisasi File** | Indexed Sequential |
| **Akses File** | Random |
| **Media** | Harddisk |
| **Panjang Record** | 512 byte (estimasi berdasarkan struktur data) |
| **Kunci Field** | id |
| **Software** | MySQL (dalam Laravel Framework) |

### Struktur Tabel

| Kolom | Tipe Data | Panjang | Keterangan |
|-------|-----------|---------|------------|
| id | bigint (unsigned) | - | Primary key, auto-increment |
| user_id | bigint (unsigned) | - | Foreign key ke tabel `users` |
| motor_id | bigint (unsigned) | - | Foreign key ke tabel `motors` |
| transaction_type | enum | - | Jenis transaksi: 'CASH', 'CREDIT' |
| status | enum | - | Status transaksi: 'new_order', 'waiting_payment', 'payment_confirmed', 'unit_preparation', 'ready_for_delivery', 'completed', 'menunggu_persetujuan', 'data_tidak_valid', 'dikirim_ke_surveyor', 'jadwal_survey', 'disetujui', 'ditolak', default 'new_order' |
| notes | text | - | Catatan dari pelanggan (bisa null) |
| booking_fee | decimal | 10,2 | Biaya booking untuk transaksi tunai (bisa null) |
| total_amount | decimal | 10,2 | Jumlah total pembayaran yang diperlukan |
| payment_method | varchar | 255 | Metode pembayaran yang dipilih (bisa null) |
| payment_status | enum | - | Status pembayaran: 'pending', 'confirmed', 'failed', default 'pending' |
| customer_name | string | 255 | Nama pelanggan (bisa null) |
| customer_phone | string | 255 | Nomor telepon pelanggan (bisa null) |
| customer_occupation | string | 255 | Pekerjaan pelanggan (bisa null) |
| created_at | timestamp | - | Waktu pembuatan record |
| updated_at | timestamp | - | Waktu pembaruan terakhir |

---

## Tabel 2.5 Spesifikasi File Tabel Credit Details

| Field | Keterangan |
|-------|------------|
| **Nama File** | Tabel Credit Details |
| **Akronim** | credit_details.myd |
| **Fungsi** | Untuk menyimpan detail tambahan untuk transaksi kredit |
| **Tipe File** | File transaksi |
| **Organisasi File** | Indexed Sequential |
| **Akses File** | Random |
| **Media** | Harddisk |
| **Panjang Record** | 256 byte (estimasi berdasarkan struktur data) |
| **Kunci Field** | id |
| **Software** | MySQL (dalam Laravel Framework) |

### Struktur Tabel

| Kolom | Tipe Data | Panjang | Keterangan |
|-------|-----------|---------|------------|
| id | bigint (unsigned) | - | Primary key, auto-increment |
| transaction_id | bigint (unsigned) | - | Foreign key ke tabel `transactions`, unique |
| down_payment | decimal | 10,2 | Jumlah uang muka |
| tenor | integer | - | Jangka waktu cicilan dalam bulan |
| monthly_installment | decimal | 10,2 | Jumlah cicilan bulanan |
| credit_status | enum | - | Status proses kredit: 'menunggu_persetujuan', 'data_tidak_valid', 'dikirim_ke_surveyor', 'jadwal_survey', 'disetujui', 'ditolak', default 'menunggu_persetujuan' |
| approved_amount | decimal | 10,2 | Jumlah kredit yang disetujui (bisa null) |
| created_at | timestamp | - | Waktu pembuatan record |
| updated_at | timestamp | - | Waktu pembaruan terakhir |

---

## Tabel 2.6 Spesifikasi File Tabel Documents

| Field | Keterangan |
|-------|------------|
| **Nama File** | Tabel Documents |
| **Akronim** | documents.myd |
| **Fungsi** | Untuk menyimpan dokumen pendukung kredit yang diunggah oleh pengguna |
| **Tipe File** | File transaksi |
| **Organisasi File** | Indexed Sequential |
| **Akses File** | Random |
| **Media** | Harddisk |
| **Panjang Record** | 512 byte (estimasi berdasarkan struktur data) |
| **Kunci Field** | id |
| **Software** | MySQL (dalam Laravel Framework) |

### Struktur Tabel

| Kolom | Tipe Data | Panjang | Keterangan |
|-------|-----------|---------|------------|
| id | bigint (unsigned) | - | Primary key, auto-increment |
| credit_detail_id | bigint (unsigned) | - | Foreign key ke tabel `credit_details` |
| document_type | enum | - | Jenis dokumen: 'KTP', 'KK', 'SLIP_GAJI', 'BPKB', 'STNK', 'FAKTUR', 'LAINNYA' |
| file_path | varchar | 255 | Path lengkap file dokumen di storage |
| original_name | varchar | 255 | Nama asli file ketika diunggah |
| created_at | timestamp | - | Waktu pembuatan record |
| updated_at | timestamp | - | Waktu pembaruan terakhir |

---

## Tabel 2.7 Spesifikasi File Tabel Contact Messages

| Field | Keterangan |
|-------|------------|
| **Nama File** | Tabel Contact Messages |
| **Akronim** | contact_messages.myd |
| **Fungsi** | Untuk menyimpan pesan dari formulir kontak |
| **Tipe File** | File transaksi |
| **Organisasi File** | Indexed Sequential |
| **Akses File** | Random |
| **Media** | Harddisk |
| **Panjang Record** | 512 byte (estimasi berdasarkan struktur data) |
| **Kunci Field** | id |
| **Software** | MySQL (dalam Laravel Framework) |

### Struktur Tabel

| Kolom | Tipe Data | Panjang | Keterangan |
|-------|-----------|---------|------------|
| id | bigint (unsigned) | - | Primary key, auto-increment |
| name | varchar | 255 | Nama pengirim pesan |
| email | varchar | 255 | Alamat email pengirim |
| subject | varchar | 255 | Subjek pesan |
| message | text | - | Isi pesan |
| created_at | timestamp | - | Waktu pembuatan record |
| updated_at | timestamp | - | Waktu pembaruan terakhir |

---

## Tabel 2.8 Spesifikasi File Tabel Notifications

| Field | Keterangan |
|-------|------------|
| **Nama File** | Tabel Notifications |
| **Akronim** | notifications.myd |
| **Fungsi** | Untuk menyimpan notifikasi sistem |
| **Tipe File** | File transaksi |
| **Organisasi File** | Indexed Sequential |
| **Akses File** | Random |
| **Media** | Harddisk |
| **Panjang Record** | 512 byte (estimasi berdasarkan struktur data) |
| **Kunci Field** | id |
| **Software** | MySQL (dalam Laravel Framework) |

### Struktur Tabel

| Kolom | Tipe Data | Panjang | Keterangan |
|-------|-----------|---------|------------|
| id | uuid | - | Primary key dengan format UUID |
| type | varchar | 255 | Jenis notifikasi |
| notifiable_type | varchar | 255 | Tipe model yang dapat menerima notifikasi (polymorphic) |
| notifiable_id | bigint (unsigned) | - | ID dari model yang menerima notifikasi (polymorphic) |
| data | text | - | Data notifikasi dalam format JSON |
| read_at | timestamp | - | Waktu notifikasi dibaca (bisa null) |
| created_at | timestamp | - | Waktu pembuatan record |
| updated_at | timestamp | - | Waktu pembaruan terakhir |

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
>=8 karakter,
konfirmasi
password cocok
Registrasi
sukses, user
login otomatis
Sesuai
harapan Valid
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
pengguna dari
user ke admin
Pilih pengguna
user, ubah peran
menjadi admin
Peran
pengguna
berhasil
diubah
menjadi
admin
Sesuai
harapan Valid
2. Mencoba
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
3. Menghapus akun
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
4. Membatalkan
perubahan peran
pengguna
Ubah peran
pengguna, lalu
klik batal
Peran tidak
berubah
kembali ke
nilai
sebelumnya
Sesuai
harapan Valid
5. Mengganti peran
tanpa memilih
peran baru
Submit form
tanpa memilih
peran
Sistem menolak
submit dan
menampilkan
pesan kesalahan
Sesuai
harapan Valid

### 9. Transaction Create Form

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
password  diisi
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
salah pada  user
ID atau  password
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
ID dan  password
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