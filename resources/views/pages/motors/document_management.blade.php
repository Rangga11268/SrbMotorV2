@extends('layouts.app')

@section('title', 'Manajemen Dokumen')



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

                                    @if ($errors->any())
                                    <div class="alert alert-danger">
                                        <ul class="mb-0">
                                            @foreach ($errors->all() as $error)
                                            <li>{{ $error }}</li>
                                            @endforeach
                                        </ul>
                                    </div>
                                    @endif

                                    <div class="row">
                                        <div class="col-md-6 mb-4">
                                            <label for="document_ktp" class="form-label">KTP (Kartu Tanda
                                                Penduduk)</label>
                                            <input type="file" name="documents[KTP][]" id="document_ktp"
                                                class="form-control @error('documents.KTP') is-invalid @enderror" accept="image/*,application/pdf" multiple>
                                            <div class="form-text">Unggah foto KTP (depan & belakang) atau file PDF
                                            </div>
                                            @error('documents.KTP')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                            @enderror
                                        </div>

                                        <div class="col-md-6 mb-4">
                                            <label for="document_kk" class="form-label">Kartu Keluarga (KK)</label>
                                            <input type="file" name="documents[KK][]" id="document_kk"
                                                class="form-control @error('documents.KK') is-invalid @enderror" accept="image/*,application/pdf" multiple>
                                            <div class="form-text">Unggah foto Kartu Keluarga</div>
                                            @error('documents.KK')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                            @enderror
                                        </div>

                                        <div class="col-md-6 mb-4">
                                            <label for="document_slip_gaji" class="form-label">Slip Gaji / Rekening
                                                Koran</label>
                                            <input type="file" name="documents[SLIP_GAJI][]" id="document_slip_gaji"
                                                class="form-control @error('documents.SLIP_GAJI') is-invalid @enderror" accept="image/*,application/pdf" multiple>
                                            <div class="form-text">Unggah slip gaji 3 bulan terakhir atau rekening koran
                                            </div>
                                            @error('documents.SLIP_GAJI')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                            @enderror
                                        </div>

                                        <div class="col-md-6 mb-4">
                                            <label for="document_lainnya" class="form-label">Dokumen Tambahan</label>
                                            <input type="file" name="documents[LAINNYA][]" id="document_lainnya"
                                                class="form-control @error('documents.LAINNYA') is-invalid @enderror" accept="image/*,application/pdf" multiple>
                                            <div class="form-text">Dokumen tambahan jika diperlukan</div>
                                            @error('documents.LAINNYA')
                                            <div class="invalid-feedback">{{ $message }}</div>
                                            @enderror
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