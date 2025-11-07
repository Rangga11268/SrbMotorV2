@extends('layouts.app')

@section('title', 'Manajemen Dokumen')

@section('styles')
    <style>
        /* Add space for fixed navbar */
        body {
            padding-top: 70px;
            /* Adjusted to better match the homepage navbar height */
        }

        .document-section {
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

        .document-card {
            border: none;
            border-radius: 1.5rem;
            box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.18);
            overflow: hidden;
            width: 100%;
            position: relative;
            z-index: 1;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            transform: translateY(0);
            transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .document-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.2);
        }

        .document-header {
            background: linear-gradient(135deg, var(--primary, #4a90e2) 0%, var(--dark-blue, #032a60) 100%);
            color: white;
            padding: 2.5rem 1.5rem;
            text-align: center;
            position: relative;
            overflow: visible;
        }

        .document-header h3 {
            font-weight: 600;
            margin: 0.5rem 0 0.25rem 0;
            font-size: 2rem;
            position: relative;
            z-index: 1;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .document-header h3 small {
            display: block;
            font-size: 1.3rem;
            opacity: 0.9;
            margin-top: 0.5rem;
        }

        .document-body {
            padding: 2.5rem;
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
            font-size: 1.3rem;
        }

        .price {
            font-size: 1.8rem;
        }

        .credit-details {
            margin-top: 1.5rem;
            padding: 1.5rem;
            background: linear-gradient(135deg, #e6f0ff 0%, #f0f7ff 100%);
            border-radius: 1rem;
        }

        .credit-details h5 {
            font-size: 1.4rem;
            color: var(--dark-blue, #032a60);
            margin-bottom: 1rem;
        }

        .credit-details ul {
            padding-left: 1.5rem;
        }

        .credit-details li {
            font-size: 1.3rem;
            margin-bottom: 0.5rem;
        }

        .badge-document {
            font-size: 1.2rem;
            padding: 0.6rem 1rem;
            font-weight: 500;
            border-radius: 0.5rem;
        }

        .guide-alert {
            border-radius: 1rem;
            padding: 1.5rem;
            margin-bottom: 2rem;
            background: linear-gradient(135deg, #fff3cd 0%, #fef9e7 100%);
            border: 1px solid #ffeaa7;
            color: #856404;
        }

        .guide-alert h5 {
            font-size: 1.4rem;
            color: var(--dark-blue, #032a60);
            margin-bottom: 0.75rem;
        }

        .guide-alert p {
            font-size: 1.3rem;
            margin-bottom: 0.5rem;
        }

        .guide-alert ul {
            padding-left: 1.5rem;
            margin-bottom: 0;
        }

        .guide-alert li {
            font-size: 1.2rem;
            margin-bottom: 0.3rem;
        }

        .section-card {
            border: none;
            border-radius: 1rem;
            box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.08);
            overflow: hidden;
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            position: relative;
            z-index: 1;
            margin-bottom: 2rem;
        }

        .section-card .card-header {
            background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%);
            border: none;
            padding: 1.2rem 1.5rem;
        }

        .section-card .card-header h5 {
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--dark-blue, #032a60);
            margin: 0;
        }

        .section-card .card-body {
            padding: 1.5rem;
        }

        .document-item {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 0.75rem;
            padding: 0.8rem;
            margin-bottom: 0.8rem;
            transition: all 0.3s ease;
        }

        .document-item:hover {
            background: #edf2f7;
            border-color: #cbd5e0;
            transform: translateY(-2px);
            box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
        }

        .document-item .doc-icon {
            font-size: 2.5rem;
            color: #e53e3e;
            margin-bottom: 0.5rem;
        }

        .document-item .doc-name {
            font-size: 1.1rem;
            color: #4a5568;
            margin-bottom: 0.8rem;
            word-break: break-all;
        }

        .document-status {
            font-size: 1.3rem;
            padding: 1rem 1.5rem;
            border-radius: 1rem;
            text-align: center;
            margin-top: 1rem;
        }

        .status-complete {
            background: linear-gradient(135deg, #d4edda 0%, #e8f5e9 100%);
            color: #155724;
            border: 1px solid #c3e6cb;
        }

        .status-incomplete {
            background: linear-gradient(135deg, #fff3cd 0%, #fef9e7 100%);
            color: #856404;
            border: 1px solid #ffeeba;
        }

        .form-label {
            font-weight: 500;
            color: var(--dark-blue, #032a60);
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
            position: relative;
            display: flex;
            align-items: center;
        }

        .form-label::before {
            content: "";
            position: absolute;
            left: -10px;
            top: 50%;
            transform: translateY(-50%);
            width: 4px;
            height: 20px;
            background: linear-gradient(to bottom, var(--primary), var(--dark-blue));
            border-radius: 2px;
        }

        .form-control {
            border: 1px solid #e1e5eb;
            border-radius: 0.75rem;
            padding: 0.85rem 1.1rem;
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.8);
            font-size: 1.2rem;
            position: relative;
            z-index: 1;
        }

        .form-control:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 0.2rem rgba(74, 144, 226, 0.25);
            background: rgba(255, 255, 255, 1);
            transform: translateY(-2px);
        }

        .form-text {
            font-size: 1.1rem;
            color: #6c757d;
        }

        .btn-document {
            border-radius: 0.75rem;
            padding: 0.8rem 1.2rem;
            font-weight: 500;
            font-size: 1.2rem;
            transition: all 0.3s ease;
        }

        .btn-primary-document {
            background: linear-gradient(135deg, var(--dark-blue, #032a60) 0%, var(--primary, #4a90e2) 100%);
            border: none;
            color: white;
        }

        .btn-primary-document:hover {
            background: linear-gradient(135deg, #032a60 0%, #3a7bc8 100%);
            transform: translateY(-2px);
            box-shadow: 0 0.5rem 1rem rgba(4, 54, 128, 0.3);
            color: white;
        }

        .btn-outline-document {
            border: 2px solid var(--primary, #4a90e2);
            color: var(--primary, #4a90e2);
            background: transparent;
        }

        .btn-outline-document:hover {
            background: var(--primary, #4a90e2);
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 0.5rem 1rem rgba(4, 54, 128, 0.3);
        }

        .btn-success-document {
            background: linear-gradient(135deg, #28a745 0%, #218838 100%);
            border: none;
            color: white;
        }

        .btn-success-document:hover {
            background: linear-gradient(135deg, #218838 0%, #1e7e34 100%);
            transform: translateY(-2px);
            box-shadow: 0 0.5rem 1rem rgba(40, 167, 69, 0.3);
            color: white;
        }

        @media (max-width: 768px) {
            body {
                padding-top: 100px;
            }

            .document-card {
                margin: 0 1rem;
            }

            .document-header h3 {
                font-size: 1.6rem;
            }

            .document-header h3 small {
                font-size: 1.1rem;
            }

            .motor-card .card-title {
                font-size: 1.4rem;
            }

            .motor-card .card-text {
                font-size: 1.1rem;
            }

            .form-label {
                font-size: 1.1rem;
            }

            .form-control {
                font-size: 1.1rem;
            }

            .btn-document {
                padding: 0.7rem 1rem;
                font-size: 1.1rem;
            }
        }
    </style>
@endsection

@section('content')
    <section class="document-section">
        <div class="container">
            <div class="section-header text-center">
                <h1>Manajemen <span>Dokumen</span></h1>
            </div>

            <div class="row justify-content-center">
                <div class="col-lg-10">
                    <div class="card document-card shadow-sm">
                        <div class="document-header">
                            <h3>Manajemen Dokumen
                                <small>{{ $transaction->motor->name }}</small>
                            </h3>
                        </div>
                        <div class="document-body">
                            <div class="row mb-4">
                                <div class="col-md-12">
                                    <div class="card motor-card h-100 shadow-sm">
                                        <div class="image-container">
                                            <img src="{{ asset('storage/' . $transaction->motor->image_path) }}"
                                                class="card-img-top" alt="{{ $transaction->motor->name }}"
                                                style="height: 250px; object-fit: cover;">
                                        </div>
                                        <div class="card-body text-start">
                                            <h5 class="card-title">{{ $transaction->motor->name }}</h5>
                                            <p class="card-text text-muted">
                                                <i class="fas fa-calendar-alt me-1"></i> {{ $transaction->motor->year }}
                                                <i class="fas fa-motorcycle ms-2 me-1"></i> {{ $transaction->motor->type }}
                                            </p>
                                            <div class="price mb-2">
                                                <span class="fw-bold text-primary">Rp
                                                    {{ number_format($transaction->motor->price, 0, ',', '.') }},-</span>
                                            </div>

                                            <div class="credit-details">
                                                <h5>Detail Kredit</h5>
                                                <ul class="mb-0">
                                                    <li><strong>Uang Muka:</strong> Rp
                                                        {{ number_format($transaction->creditDetail->down_payment, 0, ',', '.') }}
                                                    </li>
                                                    <li><strong>Angsuran/Bulan:</strong> Rp
                                                        {{ number_format($transaction->creditDetail->monthly_installment, 0, ',', '.') }}
                                                    </li>
                                                    <li><strong>Tenor:</strong> {{ $transaction->creditDetail->tenor }}
                                                        Bulan</li>
                                                    <li>
                                                        <strong>Status:</strong>
                                                        <span
                                                            class="badge bg-{{ 
                                                                ($transaction->creditDetail->credit_status == 'disetujui' || $transaction->creditDetail->credit_status == 'ready_for_delivery') ? 'success' : 
                                                                (($transaction->creditDetail->credit_status == 'menunggu_persetujuan' || $transaction->creditDetail->credit_status == 'dikirim_ke_surveyor' || $transaction->creditDetail->credit_status == 'PENDING_REVIEW' || $transaction->creditDetail->credit_status == 'SUBMITTED_TO_SURVEYOR' || $transaction->creditDetail->credit_status == 'SURVEY_SCHEDULED') ? 'warning' : 
                                                                ($transaction->creditDetail->credit_status == 'ditolak' || $transaction->creditDetail->credit_status == 'REJECTED' ? 'danger' : 'info')) 
                                                            }} badge-document">
                                                            {{ getCreditStatusText($transaction->creditDetail->credit_status) }}
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="guide-alert">
                                <h5>Panduan Dokumen</h5>
                                <p>Unggah dokumen-dokumen berikut untuk melengkapi pengajuan kredit Anda:</p>
                                <ul class="mb-0">
                                    <li><strong>KTP:</strong> Kartu Tanda Penduduk (depan & belakang)</li>
                                    <li><strong>KK:</strong> Kartu Keluarga</li>
                                    <li><strong>Slip Gaji:</strong> Slip gaji 3 bulan terakhir atau rekening koran</li>
                                </ul>
                            </div>

                            <!-- Uploaded Documents Section -->
                            <div class="section-card">
                                <div class="card-header">
                                    <h5 class="mb-0">Dokumen yang Telah Diunggah</h5>
                                </div>
                                <div class="card-body">
                                    @if ($transaction->creditDetail->documents->count() > 0)
                                        <div class="row">
                                            @foreach ($transaction->creditDetail->documents->groupBy('document_type') as $docType => $documents)
                                                <div class="col-md-4 mb-3">
                                                    <div class="card h-100 shadow-sm">
                                                        <div class="card-body text-center">
                                                            <h6 class="card-title mb-3">
                                                                {{ $docType == 'KTP' ? 'KTP' : ($docType == 'KK' ? 'Kartu Keluarga' : ($docType == 'SLIP_GAJI' ? 'Slip Gaji' : 'Dokumen Tambahan')) }}
                                                            </h6>
                                                            @foreach ($documents as $doc)
                                                                <div class="document-item">
                                                                    <div class="doc-icon">
                                                                        <i class="fas fa-file-pdf"></i>
                                                                    </div>
                                                                    <div class="doc-name">{{ $doc->original_name }}</div>
                                                                    <a href="{{ asset('storage/' . $doc->file_path) }}"
                                                                        target="_blank"
                                                                        class="btn btn-outline-document btn-sm w-100">
                                                                        <i class="fas fa-eye me-1"></i>Lihat
                                                                    </a>
                                                                </div>
                                                            @endforeach
                                                        </div>
                                                    </div>
                                                </div>
                                            @endforeach
                                        </div>

                                        @if ($transaction->creditDetail->hasRequiredDocuments())
                                            <div class="document-status status-complete">
                                                <i class="fas fa-check-circle me-2"></i> <strong>Semua dokumen yang
                                                    diperlukan telah diunggah!</strong>
                                            </div>
                                        @else
                                            <div class="document-status status-incomplete">
                                                <i class="fas fa-exclamation-triangle me-2"></i> <strong>Beberapa dokumen
                                                    masih belum lengkap.</strong>
                                            </div>
                                        @endif
                                    @else
                                        <p class="text-muted text-center mb-0">Belum ada dokumen yang diunggah</p>
                                    @endif
                                </div>
                            </div>

                            <!-- Upload New Documents Section -->
                            <div class="section-card">
                                <div class="card-header">
                                    <h5 class="mb-0">Unggah Dokumen Baru</h5>
                                </div>
                                <div class="card-body">
                                    <form action="{{ route('motors.update-documents', $transaction->id) }}" method="POST"
                                        enctype="multipart/form-data">
                                        @csrf

                                        <div class="row">
                                            <div class="col-md-6 mb-4">
                                                <label for="document_ktp" class="form-label">KTP (Kartu Tanda
                                                    Penduduk)</label>
                                                <input type="file" name="documents[KTP][]" id="document_ktp"
                                                    class="form-control" accept="image/*,application/pdf" multiple>
                                                <div class="form-text">Unggah foto KTP (depan & belakang) atau file PDF
                                                </div>
                                            </div>

                                            <div class="col-md-6 mb-4">
                                                <label for="document_kk" class="form-label">Kartu Keluarga (KK)</label>
                                                <input type="file" name="documents[KK][]" id="document_kk"
                                                    class="form-control" accept="image/*,application/pdf" multiple>
                                                <div class="form-text">Unggah foto Kartu Keluarga</div>
                                            </div>

                                            <div class="col-md-6 mb-4">
                                                <label for="document_slip_gaji" class="form-label">Slip Gaji / Rekening
                                                    Koran</label>
                                                <input type="file" name="documents[SLIP_GAJI][]" id="document_slip_gaji"
                                                    class="form-control" accept="image/*,application/pdf" multiple>
                                                <div class="form-text">Unggah slip gaji 3 bulan terakhir atau rekening koran
                                                </div>
                                            </div>

                                            <div class="col-md-6 mb-4">
                                                <label for="document_lainnya" class="form-label">Dokumen Tambahan</label>
                                                <input type="file" name="documents[LAINNYA][]" id="document_lainnya"
                                                    class="form-control" accept="image/*,application/pdf" multiple>
                                                <div class="form-text">Dokumen tambahan jika diperlukan</div>
                                            </div>
                                        </div>

                                        <div class="d-grid gap-3">
                                            <button type="submit" class="btn btn-success-document btn-lg">
                                                <i class="fas fa-upload me-2"></i>Unggah Dokumen
                                            </button>
                                            <a href="{{ route('motors.order.confirmation', $transaction->id) }}"
                                                class="btn btn-outline-document btn-lg">
                                                <i class="fas fa-arrow-left me-2"></i>Kembali ke Konfirmasi
                                            </a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
