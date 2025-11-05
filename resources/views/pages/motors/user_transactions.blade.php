@extends('layouts.app')

@section('title', 'Riwayat Pemesanan')

@section('styles')
<style>
    /* Add space for fixed navbar */
    body {
        padding-top: 70px; /* Adjusted to better match the homepage navbar height */
    }
    
    .transactions-section {
        padding: 2rem 0;
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
    
    .transaction-card {
        border: none;
        border-radius: 1rem;
        box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.08);
        overflow: hidden;
        height: 100%;
        transition: all 0.3s ease;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        position: relative;
        z-index: 1;
    }
    
    .transaction-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.15);
    }
    
    .image-container {
        position: relative;
        overflow: hidden;
    }
    
    .transaction-card img {
        height: 200px;
        object-fit: cover;
        transition: transform 0.5s ease;
    }
    
    .transaction-card:hover img {
        transform: scale(1.05);
    }
    
    .card-body {
        padding: 1.5rem;
    }
    
    .card-title {
        font-weight: 700;
        color: var(--dark-blue, #032a60);
        margin-bottom: 1rem;
        font-size: 1.4rem;
    }
    
    .card-text {
        font-size: 1.4rem; /* Increased further */
    }
    
    .card-text strong {
        color: var(--dark-blue, #032a60);
    }
    
    .badge {
        font-size: 1.2rem; /* Increased further */
        padding: 0.7rem 1rem;
        font-weight: 500;
    }
    
    .btn-transaction {
        border-radius: 0.75rem;
        padding: 0.8rem 1.3rem;
        font-weight: 500;
        font-size: 1.3rem; /* Increased further */
        transition: all 0.3s ease;
    }
    
    .btn-primary-transaction {
        background: linear-gradient(135deg, var(--dark-blue, #032a60) 0%, var(--primary, #4a90e2) 100%);
        border: none;
        color: white;
    }
    
    .btn-primary-transaction:hover {
        background: linear-gradient(135deg, #032a60 0%, #3a7bc8 100%);
        transform: translateY(-2px);
        box-shadow: 0 0.5rem 1rem rgba(4, 54, 128, 0.3);
        color: white;
    }
    
    .btn-outline-transaction {
        border-color: var(--primary, #4a90e2);
        color: var(--primary, #4a90e2);
    }
    
    .btn-outline-transaction:hover {
        background: var(--primary, #4a90e2);
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 0.5rem 1rem rgba(4, 54, 128, 0.3);
    }
    
    .empty-state {
        padding: 4rem 2rem;
        text-align: center;
    }
    
    .empty-state i {
        font-size: 5.5rem; /* Increased further */
        color: #cbd5e0;
        margin-bottom: 1.5rem;
    }
    
    .empty-state h4 {
        font-size: 2.4rem; /* Increased further */
        color: var(--dark-blue, #032a60);
        margin-bottom: 1rem;
    }
    
    .empty-state p {
        font-size: 1.5rem; /* Increased further */
        color: #64748b;
        margin-bottom: 1.5rem;
    }
    
    .pagination-container {
        margin-top: 2.5rem;
    }
    
    .pagination-container .pagination {
        justify-content: center;
    }
    
    .pagination .page-link {
        border-radius: 0.5rem;
        margin: 0 0.25rem;
        border-color: #e2e8f0;
        color: var(--primary, #4a90e2);
    }
    
    .pagination .page-link:hover {
        background-color: #f1f5f9;
        color: var(--dark-blue, #032a60);
    }
    
    .pagination .page-item.active .page-link {
        background: linear-gradient(135deg, var(--dark-blue, #032a60) 0%, var(--primary, #4a90e2) 100%);
        border-color: var(--primary, #4a90e2);
        color: white;
    }
    
    @media (max-width: 768px) {
        body {
            padding-top: 100px;
        }
        
        .section-header h1 {
            font-size: 2rem;
        }
        
        .card-text {
            font-size: 1rem;
        }
        
        .btn-transaction {
            padding: 0.5rem 0.8rem;
            font-size: 0.9rem;
        }
        
        .empty-state {
            padding: 2rem 1rem;
        }
    }
</style>
@endsection

@section('content')
    <section class="transactions-section">
        <div class="container">
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
                                        if (in_array($transaction->status, ['COMPLETED', 'APPROVED', 'READY_FOR_DELIVERY'])) {
                                            $statusClass = 'success';
                                        } elseif (in_array($transaction->status, ['PENDING_REVIEW', 'NEW_ORDER', 'WAITING_PAYMENT'])) {
                                            $statusClass = 'warning';
                                        } elseif (in_array($transaction->status, ['REJECTED', 'DATA_INVALID'])) {
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
                                            {{ $transaction->status }}
                                        </span>
                                    </div>
                                    
                                    <div class="price mb-2">
                                        <span class="fw-bold text-primary fs-4">Rp. {{ number_format($transaction->total_amount, 0, ',', '.') }},-</span>
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