@extends('layouts.admin')

@section('title', 'Detail Transaksi #' . $transaction->id)

@section('content')
<div class="container-fluid">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="h3 text-gray-800">Detail Transaksi #{{ $transaction->id }}</h1>
        <a href="{{ route('admin.transactions.index') }}" class="btn btn-secondary">Kembali</a>
    </div>

    <div class="row">
        <!-- Transaction Information -->
        <div class="col-xl-8 col-lg-7">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Informasi Transaksi</h6>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <table class="table table-borderless">
                                <tr>
                                    <td><strong>ID Transaksi</strong></td>
                                    <td>{{ $transaction->id }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Tipe Transaksi</strong></td>
                                    <td>
                                        <span class="badge bg-{{ $transaction->transaction_type === 'CASH' ? 'success' : 'info' }}">
                                            {{ $transaction->transaction_type === 'CASH' ? 'Tunai' : 'Kredit' }}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Status</strong></td>
                                    <td>
                                        <span class="badge bg-{{ 
                                            (in_array($transaction->status, ['completed', 'disetujui', 'ready_for_delivery']) ? 'success' : 
                                            (in_array($transaction->status, ['menunggu_persetujuan', 'new_order', 'waiting_payment']) ? 'warning' : 
                                            (in_array($transaction->status, ['ditolak', 'data_tidak_valid']) ? 'danger' : 'info'))) 
                                        }}">
                                            {{ $transaction->status_text }}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Total Jumlah</strong></td>
                                    <td>Rp {{ number_format($transaction->total_amount, 0, ',', '.') }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Metode Pembayaran</strong></td>
                                    <td>{{ $transaction->payment_method ?? 'N/A' }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Status Pembayaran</strong></td>
                                    <td>
                                        <span class="badge bg-{{ 
                                            ($transaction->payment_status === 'confirmed' ? 'success' : 
                                            ($transaction->payment_status === 'pending' ? 'warning' : 'danger')) 
                                        }}">
                                            {{ $transaction->payment_status }}
                                        </span>
                                    </td>
                                </tr>
                                @if($transaction->transaction_type === 'CASH')
                                <tr>
                                    <td><strong>Booking Fee</strong></td>
                                    <td>Rp {{ number_format($transaction->booking_fee ?? 0, 0, ',', '.') }}</td>
                                </tr>
                                @endif
                            </table>
                        </div>
                        <div class="col-md-6">
                            <table class="table table-borderless">
                                <tr>
                                    <td><strong>Tanggal Dibuat</strong></td>
                                    <td>{{ $transaction->created_at->format('d-m-Y H:i') }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Tanggal Update</strong></td>
                                    <td>{{ $transaction->updated_at->format('d-m-Y H:i') }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Catatan</strong></td>
                                    <td>{{ $transaction->notes ?? '-' }}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Credit Details (only for credit transactions) -->
            @if($transaction->transaction_type === 'CREDIT' && $transaction->creditDetail)
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Detail Kredit</h6>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <table class="table table-borderless">
                                <tr>
                                    <td><strong>Uang Muka (DP)</strong></td>
                                    <td>Rp {{ number_format($transaction->creditDetail->down_payment, 0, ',', '.') }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Angsuran/Bulan</strong></td>
                                    <td>Rp {{ number_format($transaction->creditDetail->monthly_installment, 0, ',', '.') }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Tenor</strong></td>
                                    <td>{{ $transaction->creditDetail->tenor }} Bulan</td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-md-6">
                            <table class="table table-borderless">
                                <tr>
                                    <td><strong>Status Kredit</strong></td>
                                    <td>
                                        <span class="badge bg-{{ 
                                            (in_array($transaction->creditDetail->credit_status, ['disetujui', 'ready_for_delivery']) ? 'success' : 
                                            (in_array($transaction->creditDetail->credit_status, ['menunggu_persetujuan', 'dikirim_ke_surveyor']) ? 'warning' : 
                                            ($transaction->creditDetail->credit_status === 'ditolak' ? 'danger' : 'info'))) 
                                        }}">
                                            {{ $transaction->credit_status_text }}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Jumlah Disetujui</strong></td>
                                    <td>Rp {{ number_format($transaction->creditDetail->approved_amount ?? 0, 0, ',', '.') }}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            @endif

            <!-- Documents (only for credit transactions) -->
            @if($transaction->transaction_type === 'CREDIT' && $transaction->creditDetail)
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Dokumen Pendukung</h6>
                </div>
                <div class="card-body">
                    @if($transaction->creditDetail->hasRequiredDocuments())
                        <div class="alert alert-success">
                            <i class="fas fa-check-circle"></i> Semua dokumen yang diperlukan telah diunggah
                        </div>
                    @else
                        <div class="alert alert-warning">
                            <i class="fas fa-exclamation-triangle"></i> Dokumen yang diperlukan belum lengkap
                        </div>
                    @endif
                    
                    @if($transaction->creditDetail->documents->count() > 0)
                        <div class="row">
                            @foreach($transaction->creditDetail->documents as $document)
                            <div class="col-md-4 mb-3">
                                <div class="card h-100">
                                    <div class="card-body text-center">
                                        @if(pathinfo($document->file_path, PATHINFO_EXTENSION) === 'pdf')
                                            <i class="fas fa-file-pdf fa-3x text-danger mb-3"></i>
                                        @else
                                            <i class="fas fa-file-image fa-3x text-primary mb-3"></i>
                                        @endif
                                        <h6 class="card-title">{{ $document->document_type }}</h6>
                                        <p class="card-text small text-muted">{{ $document->original_name }}</p>
                                        <a href="{{ asset('storage/' . $document->file_path) }}" target="_blank" class="btn btn-primary btn-sm">Lihat</a>
                                    </div>
                                </div>
                            </div>
                            @endforeach
                        </div>
                    @else
                        <p class="text-muted text-center">Belum ada dokumen yang diunggah</p>
                    @endif
                </div>
            </div>
            @endif
        </div>

        <!-- Sidebar with Actions and Customer Info -->
        <div class="col-xl-4 col-lg-5">
            <!-- Customer Information -->
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Informasi Pelanggan</h6>
                </div>
                <div class="card-body">
                    <h5 class="card-title">{{ $transaction->customer_name ?: $transaction->user->name }}</h5>
                    <p class="card-text">
                        <i class="fas fa-user"></i> {{ $transaction->customer_name ?: $transaction->user->name }}<br>
                        <i class="fas fa-phone"></i> {{ $transaction->customer_phone ?: $transaction->user->phone_number ?: 'N/A' }}<br>
                        <i class="fas fa-briefcase"></i> {{ $transaction->customer_occupation ?: 'N/A' }}<br>
                        <i class="fas fa-envelope"></i> {{ $transaction->user->email }}<br>
                        <i class="fas fa-user"></i> ID User: {{ $transaction->user->id }}
                    </p>
                </div>
            </div>

            <!-- Motor Information -->
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Informasi Motor</h6>
                </div>
                <div class="card-body text-center">
                    <img src="{{ asset('storage/' . $transaction->motor->image_path) }}" 
                         alt="{{ $transaction->motor->name }}" 
                         class="img-fluid rounded mb-3" 
                         style="max-height: 200px;">
                    <h5>{{ $transaction->motor->name }}</h5>
                    <p class="text-muted">{{ $transaction->motor->brand }} {{ $transaction->motor->model }}</p>
                    <p class="fw-bold text-primary">Rp {{ number_format($transaction->motor->price, 0, ',', '.') }}</p>
                </div>
            </div>

            <!-- Status Update Section -->
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Update Status</h6>
                </div>
                <div class="card-body">
                    @if($transaction->transaction_type === 'CREDIT')
                        @if(!$transaction->creditDetail->hasRequiredDocuments())
                            <div class="alert alert-warning">
                                <i class="fas fa-exclamation-triangle"></i> Dokumen pelanggan belum lengkap.
                                Tidak dapat melanjutkan ke proses surveyor sebelum dokumen lengkap.
                            </div>
                        @endif
                    @endif
                    
                    <form action="{{ route('admin.transactions.updateStatus', $transaction->id) }}" method="POST">
                        @csrf
                        @method('POST')
                        <div class="mb-3">
                            <label for="status" class="form-label">Status Transaksi</label>
                            <select name="status" id="status" class="form-control" required>
                                @if($transaction->transaction_type === 'CASH')
                                    <option value="new_order" {{ $transaction->status === 'new_order' ? 'selected' : '' }}>Pesanan Baru</option>
                                    <option value="waiting_payment" {{ $transaction->status === 'waiting_payment' ? 'selected' : '' }}>Menunggu Pembayaran</option>
                                    <option value="payment_confirmed" {{ $transaction->status === 'payment_confirmed' ? 'selected' : '' }}>Pembayaran Dikonfirmasi</option>
                                    <option value="unit_preparation" {{ $transaction->status === 'unit_preparation' ? 'selected' : '' }}>Persiapan Unit</option>
                                    <option value="ready_for_delivery" {{ $transaction->status === 'ready_for_delivery' ? 'selected' : '' }}>Siap Dikirim</option>
                                    <option value="completed" {{ $transaction->status === 'completed' ? 'selected' : '' }}>Selesai</option>
                                @else
                                    <option value="menunggu_persetujuan" {{ $transaction->status === 'menunggu_persetujuan' ? 'selected' : '' }}>Menunggu Persetujuan</option>
                                    <option value="data_tidak_valid" {{ $transaction->status === 'data_tidak_valid' ? 'selected' : '' }}>Data Tidak Valid</option>
                                    <option value="dikirim_ke_surveyor" {{ $transaction->status === 'dikirim_ke_surveyor' ? 'selected' : '' }} @if(!$transaction->creditDetail->hasRequiredDocuments()) disabled @endif>Dikirim ke Surveyor</option>
                                    <option value="jadwal_survey" {{ $transaction->status === 'jadwal_survey' ? 'selected' : '' }}>Jadwal Survey</option>
                                    <option value="disetujui" {{ $transaction->status === 'disetujui' ? 'selected' : '' }}>Disetujui</option>
                                    <option value="ditolak" {{ $transaction->status === 'ditolak' ? 'selected' : '' }}>Ditolak</option>
                                @endif
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Update Status</button>
                    </form>
                </div>
            </div>

            <!-- Actions -->
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Aksi</h6>
                </div>
                <div class="card-body">
                    <a href="mailto:{{ $transaction->user->email }}" class="btn btn-info w-100 mb-2">
                        <i class="fas fa-envelope"></i> Email Pelanggan
                    </a>
                    <a href="https://wa.me/{{ preg_replace('/^0/', '62', $transaction->user->phone_number) }}" target="_blank" class="btn btn-success w-100 mb-2">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </a>
                    @if($transaction->transaction_type === 'CASH')
                        <button class="btn btn-secondary w-100 mb-2">
                            <i class="fas fa-file-invoice"></i> Cetak Invoice
                        </button>
                    @else
                        <a href="{{ route('admin.transactions.edit', $transaction->id) }}" class="btn btn-warning w-100 mb-2">
                            <i class="fas fa-edit"></i> Edit Detail Kredit
                        </a>
                    @endif
                    <form action="{{ route('admin.transactions.destroy', $transaction->id) }}" method="POST" class="mt-2">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger w-100" 
                                onclick="return confirm('Apakah Anda yakin ingin menghapus transaksi ini?')">
                            <i class="fas fa-trash"></i> Hapus Transaksi
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection