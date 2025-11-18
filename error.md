# Blackbox Testing Report - Halaman Login dan Galeri Motor

## 1. Halaman Login (`/login`)

### Test Case 1
- **Skenario Pengujian**: Field login kosong
- **Test Case**: Email: (kosong), Password: (kosong), Klik "Login"
- **Hasil yang Diharapkan**: Sistem harus menampilkan pesan validasi bahwa email dan password wajib diisi.
- **Hasil Pengujian**: (Diisi saat pengujian manual)
- **Kesimpulan**: (Diisi saat pengujian manual)

### Test Case 2
- **Skenario Pengujian**: Email valid, password salah
- **Test Case**: Email: user@example.com, Password: salah123, Klik "Login"
- **Hasil yang Diharapkan**: Sistem harus menampilkan pesan bahwa email atau password salah.
- **Hasil Pengujian**: (Diisi saat pengujian manual)
- **Kesimpulan**: (Diisi saat pengujian manual)

### Test Case 3
- **Skenario Pengujian**: Email salah, password benar
- **Test Case**: Email: salah@example.com, Password: password, Klik "Login"
- **Hasil yang Diharapkan**: Sistem harus menampilkan pesan bahwa email atau password salah.
- **Hasil Pengujian**: (Diisi saat pengujian manual)
- **Kesimpulan**: (Diisi saat pengujian manual)

### Test Case 4
- **Skenario Pengujian**: Email dan password benar (user biasa)
- **Test Case**: Email: user@example.com, Password: password, Klik "Login"
- **Hasil yang Diharapkan**: Sistem harus login dan redirect ke halaman dashboard user (atau halaman utama).
- **Hasil Pengujian**: (Diisi saat pengujian manual)
- **Kesimpulan**: (Diisi saat pengujian manual)

### Test Case 5
- **Skenario Pengujian**: Email dan password benar (akun admin)
- **Test Case**: Email: admin@srbmotors.com, Password: password, Klik "Login"
- **Hasil yang Diharapkan**: Sistem harus login dan redirect ke halaman dashboard admin.
- **Hasil Pengujian**: (Diisi saat pengujian manual)
- **Kesimpulan**: (Diisi saat pengujian manual)

### Test Case 6
- **Skenario Pengujian**: Format email tidak valid
- **Test Case**: Email: userinvalid, Password: password, Klik "Login"
- **Hasil yang Diharapkan**: Sistem harus menampilkan pesan bahwa format email tidak valid.
- **Hasil Pengujian**: (Diisi saat pengujian manual)
- **Kesimpulan**: (Diisi saat pengujian manual)

---

## 2. Halaman Daftar Galeri Motor (`/motors`)

### Test Case 1
- **Skenario Pengujian**: Membuka halaman `/motors`
- **Test Case**: Akses URL: http://localhost:8000/motors
- **Hasil yang Diharapkan**: Halaman harus dimuat tanpa error dan menampilkan daftar motor.
- **Hasil Pengujian**: (Diisi saat pengujian manual)
- **Kesimpulan**: (Diisi saat pengujian manual)

### Test Case 2
- **Skenario Pengujian**: Tampilan kartu motor
- **Test Case**: Lihat kartu motor.
- **Hasil yang Diharapkan**: Setiap kartu harus menampilkan: gambar, nama, harga, dan tombol aksi.
- **Hasil Pengujian**: (Diisi saat pengujian manual)
- **Kesimpulan**: (Diisi saat pengujian manual)

### Test Case 3
- **Skenario Pengujian**: Klik tombol "Lihat Detail"
- **Test Case**: Klik tombol "Detail" pada kartu motor.
- **Hasil yang Diharapkan**: Harus membawa ke halaman detail motor (/motors/{id}) dengan informasi yang benar.
- **Hasil Pengujian**: (Diisi saat pengujian manual)
- **Kesimpulan**: (Diisi saat pengujian manual)

### Test Case 4
- **Skenario Pengujian**: Responsivitas (mobile)
- **Test Case**: Buka halaman di mode mobile.
- **Hasil yang Diharapkan**: Tampilan harus tetap rapi dan fungsional.
- **Hasil Pengujian**: (Diisi saat pengujian manual)
- **Kesimpulan**: (Diisi saat pengujian manual)

### Test Case 5
- **Skenario Pengujian**: Halaman tanpa data motor
- **Test Case**: Akses halaman saat tidak ada motor.
- **Hasil yang Diharapkan**: Harus menampilkan pesan bahwa data tidak ditemukan (misalnya: "Tidak ada motor").
- **Hasil Pengujian**: (Diisi saat pengujian manual)
- **Kesimpulan**: (Diisi saat pengujian manual)
