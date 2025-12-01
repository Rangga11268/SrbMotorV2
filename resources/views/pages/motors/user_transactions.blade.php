@extends('layouts.app')

@section('title', 'Riwayat Pemesanan')



@section('content')
<section class="transactions-section">
    <div class="container">
        @if(session('success'))
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            {{ session('success') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        @endif

        @if(session('info'))
        <div class="alert alert-info alert-dismissible fade show" role="alert">
            {{ session('info') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        @endif

        <div class="section-header text-center">
            <h1>Riwayat <span>Pemesanan</span></h1>
        </div>

        @if($transactions->count() > 0)
        <div class="row g-4">
            @foreach($transactions as $transaction)
            <div class="col-xl-4 col-lg-6 col-md-12">
                <div class="card transaction-card h-100 shadow-sm">
                    <div class="image-container">
                        <img src="{{ asset('storage/' . $transaction->motor->image_path) }}"
                            class="card-img-top"
                            alt="{{ $transaction->motor->name }}"
                            style="height: 200px; object-fit: cover;">
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">{{ $transaction->motor->name }}</h5>
                        <div class="mb-2">
                            <small class="text-muted">
                                <i class="fas fa-calendar-alt me-1"></i> {{ $transaction->motor->year }}
                                <i class="fas fa-motorcycle ms-2 me-1"></i> {{ $transaction->motor->type }}
                            </small>
                        </div>

                        @php
                        $statusClass = '';
                        if (in_array($transaction->status, ['completed', 'disetujui', 'ready_for_delivery'])) {
                        $statusClass = 'success';
                        } elseif (in_array($transaction->status, ['menunggu_persetujuan', 'new_order', 'waiting_payment'])) {
                        $statusClass = 'warning';
                        } elseif (in_array($transaction->status, ['ditolak', 'data_tidak_valid'])) {
                        $statusClass = 'danger';
                        } else {
                        $statusClass = 'info';
                        }
                        @endphp

                        <div class="d-flex flex-wrap gap-2 mb-3">
                            <span class="badge bg-{{ $transaction->transaction_type === 'CASH' ? 'success' : 'info' }} fs-6">
                                {{ $transaction->transaction_type === 'CASH' ? 'Tunai' : 'Kredit' }}
                            </span>
                            <span class="badge bg-{{ $statusClass }} fs-6">
                                {{ getTransactionStatusText($transaction->status) }}
                            </span>
                        </div>

                        <div class="price mb-2">
                            <span class="fw-bold text-primary fs-4">Rp. {{ number_format($transaction->total_amount, 0, ',', '.') }},-</span>
                        </div>

                        <div class="customer-info mb-2">
                            <small class="text-muted d-block">
                                <i class="fas fa-user me-1"></i> {{ $transaction->customer_name ?: 'N/A' }}
                            </small>
                            <small class="text-muted d-block">
                                <i class="fas fa-phone me-1"></i> {{ $transaction->customer_phone ?: 'N/A' }}
                            </small>
                        </div>

                        @if($transaction->transaction_type === 'CREDIT')
                        <div class="mt-auto">
                            @if($transaction->creditDetail && !$transaction->creditDetail->hasRequiredDocuments())
                            <span class="badge bg-warning mb-2 d-block">Dokumen Belum Lengkap</span>
                            @endif
                            <a href="{{ route('motors.manage-documents', $transaction->id) }}"
                                class="btn btn-transaction btn-primary-transaction w-100 mb-2">
                                Lihat/Kelola Dokumen
                            </a>
                        </div>
                        @endif

                        <a href="{{ route('motors.order.confirmation', $transaction->id) }}"
                            class="btn btn-transaction btn-outline-transaction w-100">
                            <i class="fas fa-info-circle me-1"></i> Lihat Detail
                        </a>
                    </div>
                </div>
            </div>
            @endforeach
        </div>

        <div class="pagination-container">
            {{ $transactions->links() }}
        </div>
        @else
        <div class="empty-state">
            <i class="fas fa-motorcycle"></i>
            <h4>Belum Ada Pemesanan</h4>
            <p>Anda belum memiliki riwayat pemesanan. Silakan mulai dengan memesan motor.</p>
            <a href="{{ route('motors.index') }}" class="btn btn-primary-transaction btn-lg px-4 py-2">
                <i class="fas fa-motorcycle me-2"></i>Lihat Daftar Motor
            </a>
        </div>
        @endif
    </div>
</section>
@endsection