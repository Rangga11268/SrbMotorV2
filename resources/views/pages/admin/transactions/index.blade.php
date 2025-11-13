@extends('layouts.admin')

@section('title', 'Manajemen Transaksi')

@section('breadcrumb')
    <li class="breadcrumb-item active" aria-current="page">Transaksi</li>
@endsection

@section('content')
<div class="container-fluid py-4">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
            <h1 class="h3 admin-page-title">Manajemen Transaksi</h1>
            <p class="text-muted admin-page-subtitle d-md-none d-block">Kelola semua transaksi di sistem</p>
        </div>
        <a href="{{ route('admin.transactions.create') }}" class="btn btn-primary admin-btn admin-btn-primary w-100 w-md-auto">
            <i class="fas fa-plus me-2"></i>Buat Transaksi Baru
        </a>
    </div>

    <!-- Filter Form -->
    <div class="card admin-card mb-4">
        <div class="card-body">
            <form method="GET" class="row g-3">
                <div class="col-12 col-md-4">
                    <label for="type" class="form-label">Tipe Transaksi</label>
                    <select name="type" id="type" class="admin-select form-select">
                        <option value="">Semua Tipe</option>
                        @foreach($transactionTypes as $type)
                            <option value="{{ $type }}" {{ request('type') == $type ? 'selected' : '' }}>
                                {{ $type === 'CASH' ? 'Tunai' : 'Kredit' }}
                            </option>
                        @endforeach
                    </select>
                </div>
                <div class="col-12 col-md-4">
                    <label for="status" class="form-label">Status</label>
                    <select name="status" id="status" class="admin-select form-select">
                        <option value="">Semua Status</option>
                        @foreach($statuses as $status)
                            <option value="{{ $status }}" {{ request('status') == $status ? 'selected' : '' }}>
                                {{ $status }}
                            </option>
                        @endforeach
                    </select>
                </div>
                <div class="col-6 col-md-2 d-flex align-items-end">
                    <button type="submit" class="btn btn-outline-primary w-100 admin-btn">
                        <i class="fas fa-search me-1"></i> Filter
                    </button>
                </div>
                <div class="col-6 col-md-2 d-flex align-items-end">
                    <a href="{{ route('admin.transactions.index') }}" class="btn btn-outline-secondary w-100 admin-btn">
                        <i class="fas fa-sync-alt me-1"></i> Reset
                    </a>
                </div>
            </form>
        </div>
    </div>

    <!-- Transactions Table -->
    <div class="card admin-card">
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table admin-table table-hover mb-0">
                    <thead class="table-light">
                        <tr>
                            <th class="border-top-0" style="width: 5%">ID</th>
                            <th class="border-top-0" style="width: 15%">Nama Pelanggan</th>
                            <th class="border-top-0 d-none d-lg-table-cell" style="width: 10%">No. Telepon</th>
                            <th class="border-top-0" style="width: 20%">Motor</th>
                            <th class="border-top-0 d-none d-xl-table-cell" style="width: 8%">Tipe</th>
                            <th class="border-top-0 d-none d-xl-table-cell" style="width: 12%">Status</th>
                            <th class="border-top-0 d-none d-lg-table-cell" style="width: 10%">Total</th>
                            <th class="border-top-0 d-none d-xl-table-cell" style="width: 10%">Dibuat</th>
                            <th class="border-top-0" style="width: 15%">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($transactions as $transaction)
                        <tr>
                            <td>{{ $transaction->id }}</td>
                            <td>{{ $transaction->customer_name ?: $transaction->user->name }}</td>
                            <td>{{ $transaction->customer_phone }}</td>
                            <td>{{ $transaction->motor->name }}</td>
                            <td>
                                <span class="badge bg-{{ $transaction->transaction_type === 'CASH' ? 'success' : 'info' }}">
                                    {{ $transaction->transaction_type === 'CASH' ? 'Tunai' : 'Kredit' }}
                                </span>
                            </td>
                            <td>
                                <span class="badge bg-{{ 
                                    (in_array($transaction->status, ['completed', 'disetujui', 'ready_for_delivery']) ? 'success' : 
                                    (in_array($transaction->status, ['menunggu_persetujuan', 'new_order', 'waiting_payment']) ? 'warning' : 
                                    (in_array($transaction->status, ['ditolak', 'data_tidak_valid']) ? 'danger' : 'info'))) 
                                }}">
                                    {{ $transaction->status_text }}
                                </span>
                                @if($transaction->transaction_type === 'CREDIT' && $transaction->creditDetail && !$transaction->creditDetail->hasRequiredDocuments())
                                    <br>
                                    <span class="badge bg-warning">Dokumen Belum Lengkap</span>
                                @endif
                            </td>
                            <td>Rp {{ number_format($transaction->total_amount, 0, ',', '.') }}</td>
                            <td>{{ $transaction->created_at->format('d-m-Y H:i') }}</td>
                            <td>
                                <a href="{{ route('admin.transactions.show', $transaction->id) }}" class="btn btn-sm btn-info">Lihat</a>
                                <a href="{{ route('admin.transactions.edit', $transaction->id) }}" class="btn btn-sm btn-warning">Edit</a>
                            </td>
                        </tr>
                        @empty
                        <tr>
                            <td colspan="9" class="text-center py-4">
                                <div class="empty-state">
                                    <i class="fas fa-file-invoice fa-3x text-muted mb-3"></i>
                                    <h5 class="text-muted">Tidak ada transaksi ditemukan</h5>
                                    <p class="text-muted mb-0">Coba ubah pencarian atau buat transaksi baru</p>
                                </div>
                            </td>
                        </tr>
                        @endforelse
                    </tbody>
                </table>
                
                <!-- Pagination -->
                @if(method_exists($transactions, 'hasPages') && $transactions->hasPages())
                <div class="card-footer bg-white">
                    <div class="d-flex flex-column flex-md-row justify-content-between align-items-center">
                        <div class="mb-2 mb-md-0">
                            Menampilkan {{ $transactions->firstItem() ? $transactions->firstItem() : 0 }} hingga {{ $transactions->lastItem() }} dari {{ $transactions->total() }} hasil
                        </div>
                        <div class="admin-pagination">
                            {{ $transactions->appends(request()->query())->links() }}
                        </div>
                    </div>
                </div>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection