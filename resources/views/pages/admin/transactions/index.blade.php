@extends('layouts.admin')

@section('title', 'Manajemen Transaksi')

@section('content')
<div class="container-fluid">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="h3 text-gray-800">Manajemen Transaksi</h1>
    </div>

    <!-- Filter Form -->
    <div class="card shadow mb-4">
        <div class="card-body">
            <form method="GET" action="{{ route('admin.transactions.index') }}">
                <div class="row">
                    <div class="col-md-3">
                        <label for="type" class="form-label">Tipe Transaksi</label>
                        <select name="type" id="type" class="form-control">
                            <option value="">Semua Tipe</option>
                            @foreach($transactionTypes as $type)
                                <option value="{{ $type }}" {{ request('type') == $type ? 'selected' : '' }}>
                                    {{ $type === 'CASH' ? 'Tunai' : 'Kredit' }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label for="status" class="form-label">Status</label>
                        <select name="status" id="status" class="form-control">
                            <option value="">Semua Status</option>
                            @foreach($statuses as $status)
                                <option value="{{ $status }}" {{ request('status') == $status ? 'selected' : '' }}>
                                    {{ $status }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label class="form-label">&nbsp;</label>
                        <div>
                            <button type="submit" class="btn btn-primary">Filter</button>
                            <a href="{{ route('admin.transactions.index') }}" class="btn btn-secondary">Reset</a>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <!-- Transactions Table -->
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Daftar Transaksi</h6>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Pelanggan</th>
                            <th>Motor</th>
                            <th>Tipe</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Dibuat</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($transactions as $transaction)
                        <tr>
                            <td>{{ $transaction->id }}</td>
                            <td>{{ $transaction->user->name }}</td>
                            <td>{{ $transaction->motor->name }}</td>
                            <td>
                                <span class="badge bg-{{ $transaction->transaction_type === 'CASH' ? 'success' : 'info' }}">
                                    {{ $transaction->transaction_type === 'CASH' ? 'Tunai' : 'Kredit' }}
                                </span>
                            </td>
                            <td>
                                <span class="badge bg-{{ 
                                    (in_array($transaction->status, ['COMPLETED', 'APPROVED', 'READY_FOR_DELIVERY']) ? 'success' : 
                                    (in_array($transaction->status, ['PENDING_REVIEW', 'NEW_ORDER', 'WAITING_PAYMENT']) ? 'warning' : 
                                    (in_array($transaction->status, ['REJECTED', 'DATA_INVALID']) ? 'danger' : 'info'))) 
                                }}">
                                    {{ $transaction->status }}
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
                            <td colspan="8" class="text-center">Tidak ada data transaksi</td>
                        </tr>
                        @endforelse
                    </tbody>
                </table>
                
                <!-- Pagination -->
                <div class="d-flex justify-content-center">
                    {{ $transactions->appends(request()->query())->links() }}
                </div>
            </div>
        </div>
    </div>
</div>
@endsection