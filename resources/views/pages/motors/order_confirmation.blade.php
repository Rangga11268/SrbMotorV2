@extends('layouts.app')

@section('title', 'Konfirmasi Pesanan')

@section('styles')
<style>
    /* Add space for fixed navbar */
    body {
        padding-top: 70px;
        /* Adjusted to better match the homepage navbar height */
    }

    .confirmation-section {
        padding: 2rem 0 4rem 0;
    }

    .section-header {
        margin-bottom: 2.5rem;
    }

    .section-header h1 {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--dark-blue, #032a60);
        position: relative;
        display: inline-block;
        margin-bottom: 0.5rem;
    }

    .section-header h1 span {
        color: var(--primary, #4a90e2);
    }

    .section-header::after {
        content: "";
        position: absolute;
        bottom: -15px;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 4px;
        background: linear-gradient(to right, var(--primary, #4a90e2), var(--dark-blue, #032a60));
        border-radius: 2px;
    }

    .success-card {
        border: none;
        border-radius: 1.5rem;
        box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.18);
        overflow: hidden;
        width: 100%;
        max-width: 800px;
        position: relative;
        z-index: 1;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        transform: translateY(0);
        transition: transform 0.4s ease, box-shadow 0.4s ease;
        margin: 0 auto;
        /* Center the card */
    }

    .success-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.2);
    }

    .success-header {
        background: linear-gradient(135deg, #28a745 0%, #218838 100%);
        color: white;
        padding: 2.5rem 1.5rem;
        text-align: center;
        position: relative;
        overflow: visible;
    }

    .success-header h3 {
        font-weight: 600;
        margin: 0.5rem 0 0.25rem 0;
        font-size: 2.2rem;
        position: relative;
        z-index: 1;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .success-icon {
        font-size: 6rem;
        color: white;
        margin: 1.5rem auto 1rem auto;
        text-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        display: block;
        text-align: center;
    }

    .success-body {
        padding: 2.5rem;
    }

    .success-body h4 {
        font-size: 1.8rem;
        color: #28a745;
        margin-bottom: 1rem;
    }

    .transaction-id {
        font-size: 1.4rem;
        font-weight: 600;
        color: var(--dark-blue, #032a60);
        margin-bottom: 1.5rem;
    }

    .motor-card {
        border: none;
        border-radius: 1rem;
        box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.08);
        overflow: hidden;
        transition: all 0.3s ease;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        position: relative;
        z-index: 1;
    }

    .motor-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.15);
    }

    .image-container {
        position: relative;
        overflow: hidden;
    }

    .motor-card img {
        height: 250px;
        object-fit: cover;
        transition: transform 0.5s ease;
    }

    .motor-card:hover img {
        transform: scale(1.05);
    }

    .motor-card .card-body {
        padding: 1.5rem;
    }

    .motor-card .card-title {
        font-weight: 700;
        color: var(--dark-blue, #032a60);
        margin-bottom: 0.5rem;
        font-size: 1.6rem;
    }

    .motor-card .card-text {
        font-size: 1.2rem;
    }

    .price {
        font-size: 1.8rem;
    }

    .detail-table {
        width: 100%;
        margin-top: 1.5rem;
    }

    .detail-table td {
        padding: 0.75rem 1rem;
        font-size: 1.3rem;
        border: none;
        vertical-align: top;
    }

    .detail-table td:first-child {
        font-weight: 500;
        color: var(--dark-blue, #032a60);
        width: 40%;
    }

    .detail-table td:last-child {
        width: 60%;
    }

    .badge-transaction {
        font-size: 1.2rem;
        padding: 0.6rem 1rem;
        font-weight: 500;
        border-radius: 0.5rem;
    }

    .credit-alert {
        border-radius: 1rem;
        padding: 1.5rem;
        margin-top: 1.5rem;
        background: linear-gradient(135deg, #d1ecf1 0%, #e2f0f7 100%);
        border: 1px solid #bee5eb;
    }

    .credit-alert p {
        font-size: 1.3rem;
        margin-bottom: 0.5rem;
    }

    .credit-alert .status-text {
        font-size: 1.5rem;
        font-weight: 600;
    }

    .credit-alert .text-muted {
        font-size: 1.1rem;
    }

    .confirmation-text {
        font-size: 1.3rem;
        margin: 2rem 0;
        color: #495057;
    }

    .btn-confirmation {
        border-radius: 0.75rem;
        padding: 0.8rem 1.5rem;
        font-weight: 500;
        font-size: 1.2rem;
        transition: all 0.3s ease;
    }

    .btn-primary-confirmation {
        background: linear-gradient(135deg, var(--dark-blue, #032a60) 0%, var(--primary, #4a90e2) 100%);
        border: none;
        color: white;
    }

    .btn-primary-confirmation:hover {
        background: linear-gradient(135deg, #032a60 0%, #3a7bc8 100%);
        transform: translateY(-2px);
        box-shadow: 0 0.5rem 1rem rgba(4, 54, 128, 0.3);
        color: white;
    }

    .btn-outline-confirmation {
        border: 2px solid var(--primary, #4a90e2);
        color: var(--primary, #4a90e2);
        background: transparent;
    }

    .btn-outline-confirmation:hover {
        background: var(--primary, #4a90e2);
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 0.5rem 1rem rgba(4, 54, 128, 0.3);
    }

    @media (max-width: 768px) {
        body {
            padding-top: 100px;
        }

        .success-card {
            margin: 0 1rem;
        }

        .success-header h3 {
            font-size: 1.8rem;
        }

        .success-body h4 {
            font-size: 1.6rem;
        }

        .transaction-id {
            font-size: 1.2rem;
        }

        .motor-card .card-title {
            font-size: 1.4rem;
        }

        .motor-card .card-text {
            font-size: 1.1rem;
        }

        .detail-table td {
            font-size: 1.1rem;
            padding: 0.5rem 0.75rem;
        }

        .btn-confirmation {
            padding: 0.7rem 1rem;
            font-size: 1.1rem;
        }
    }
</style>
@endsection

@section('content')
<section class="confirmation-section">
    <div class="container">
        <div class="section-header text-center">
            <h1>Konfirmasi <span>Pesanan</span></h1>
        </div>

        <div class="row justify-content-center">
            <div class="col-lg-10">
                <div class="card success-card shadow-sm">
                    <div class="success-header">
                        <i class="fas fa-check-circle success-icon"></i>
                        <h3>Konfirmasi Pesanan</h3>
                    </div>
                    <div class="success-body text-center">
                        <h4 class="text-success">Pesanan Berhasil Dibuat!</h4>
                        <p class="transaction-id">Nomor Transaksi: <strong>{{ $transaction->id }}</strong></p>

                        <div class="row mt-4">
                            <div class="col-md-12">
                                <div class="card motor-card h-100 shadow-sm">
                                    <div class="image-container">
                                        <img src="{{ asset('storage/' . $transaction->motor->image_path) }}"
                                            class="card-img-top"
                                            alt="{{ $transaction->motor->name }}"
                                            style="height: 250px; object-fit: cover;">
                                    </div>
                                    <div class="card-body text-start">
                                        <h5 class="card-title">{{ $transaction->motor->name }}</h5>
                                        <p class="card-text text-muted">
                                            <i class="fas fa-calendar-alt me-1"></i> {{ $transaction->motor->year }}
                                            <i class="fas fa-motorcycle ms-2 me-1"></i> {{ $transaction->motor->type }}
                                        </p>
                                        <div class="price mb-2">
                                            <span class="fw-bold text-primary">Rp {{ number_format($transaction->motor->price, 0, ',', '.') }},-</span>
                                        </div>

                                        <table class="detail-table">
                                            <tr>
                                                <td>Nama:</td>
                                                <td>{{ $transaction->customer_name }}</td>
                                            </tr>
                                            <tr>
                                                <td>No. Telepon:</td>
                                                <td>{{ $transaction->customer_phone }}</td>
                                            </tr>
                                            <tr>
                                                <td>Pekerjaan:</td>
                                                <td>{{ $transaction->customer_occupation }}</td>
                                            </tr>
                                            <tr>
                                                <td>Jenis Transaksi:</td>
                                                <td>
                                                    <span class="badge bg-{{ $transaction->transaction_type === 'CASH' ? 'success' : 'info' }} badge-transaction">
                                                        {{ $transaction->transaction_type === 'CASH' ? 'Tunai' : 'Kredit' }}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Status:</td>
                                                <td>
                                                    <span class="badge bg-{{ 
                                                        (in_array($transaction->status, ['completed', 'disetujui', 'ready_for_delivery']) ? 'success' : 
                                                        (in_array($transaction->status, ['menunggu_persetujuan', 'new_order', 'waiting_payment']) ? 'warning' : 
                                                        (in_array($transaction->status, ['ditolak', 'data_tidak_valid']) ? 'danger' : 'info')))
                                                    }} badge-transaction">
                                                        {{ getTransactionStatusText($transaction->status) }}
                                                    </span>
                                                </td>
                                            </tr>
                                            @if($transaction->transaction_type === 'CREDIT' && $transaction->creditDetail)
                                            <tr>
                                                <td>DP:</td>
                                                <td>Rp {{ number_format($transaction->creditDetail->down_payment, 0, ',', '.') }}</td>
                                            </tr>
                                            <tr>
                                                <td>Angsuran/Bulan:</td>
                                                <td>Rp {{ number_format($transaction->creditDetail->monthly_installment, 0, ',', '.') }}</td>
                                            </tr>
                                            <tr>
                                                <td>Tenor:</td>
                                                <td>{{ $transaction->creditDetail->tenor }} Bulan</td>
                                            </tr>
                                            @endif
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        @if($transaction->transaction_type === 'CREDIT')
                        <div class="credit-alert">
                            @if($transaction->creditDetail && $transaction->creditDetail->hasRequiredDocuments())
                            <p><strong>Status Pengajuan Kredit:</strong></p>
                            <p class="status-text">
                                {{ getCreditStatusText($transaction->creditDetail->credit_status) }}
                            </p>
                            <p class="text-muted">Dokumen telah lengkap dan sedang dalam proses review</p>
                            <a href="{{ route('motors.manage-documents', $transaction->id) }}" class="btn btn-primary-confirmation mt-2">
                                <i class="fas fa-file-alt me-1"></i>Lihat/Kelola Dokumen
                            </a>
                            @else
                            <p><strong>Status Pengajuan Kredit:</strong></p>
                            <p class="status-text">DOKUMEN BELUM LENGKAP</p>
                            <p class="text-muted">Silakan lengkapi dokumen untuk melanjutkan proses pengajuan</p>
                            <a href="{{ route('motors.manage-documents', $transaction->id) }}" class="btn btn-primary-confirmation mt-2">
                                <i class="fas fa-upload me-1"></i>Lengkapi Dokumen
                            </a>
                            @endif
                        </div>
                        @endif

                        <p class="confirmation-text">Tim kami akan segera menghubungi Anda untuk konfirmasi lebih lanjut.</p>

                        <div class="d-grid gap-3 mt-4">
                            <a href="{{ route('home') }}" class="btn btn-primary-confirmation btn-lg">
                                <i class="fas fa-home me-2"></i>Kembali ke Beranda
                            </a>
                            <a href="{{ route('motors.index') }}" class="btn btn-outline-confirmation btn-lg">
                                <i class="fas fa-motorcycle me-2"></i>Lihat Motor Lainnya
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection