@extends('layouts.admin')

@section('title', 'Daftar Pesanan')

@section('content')
<div class="container-fluid py-4">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <h1 class="h3 mb-0">Daftar Pesanan</h1>
        <div class="d-flex gap-2 mt-2 mt-md-0">
            <a href="{{ route('admin.dashboard') }}" class="btn btn-outline-secondary">
                <i class="fas fa-arrow-left me-1"></i>Kembali ke Dasbor
            </a>
        </div>
    </div>
    
    <!-- Search and Filter Section -->
    <form method="GET" action="{{ route('admin.orders.index') }}" class="mb-4">
        <div class="row g-3">
            <div class="col-md-6">
                <input type="text" name="search" class="form-control" placeholder="Cari pesanan..." value="{{ request('search') }}">
            </div>
            <div class="col-md-3">
                <select name="status" class="form-select">
                    <option value="">Semua Status</option>
                    <option value="pending" {{ request('status') == 'pending' ? 'selected' : '' }}>Pending</option>
                    <option value="confirmed" {{ request('status') == 'confirmed' ? 'selected' : '' }}>Dikonfirmasi</option>
                    <option value="processing" {{ request('status') == 'processing' ? 'selected' : '' }}>Diproses</option>
                    <option value="shipped" {{ request('status') == 'shipped' ? 'selected' : '' }}>Dikirim</option>
                    <option value="delivered" {{ request('status') == 'delivered' ? 'selected' : '' }}>Diterima</option>
                    <option value="cancelled" {{ request('status') == 'cancelled' ? 'selected' : '' }}>Dibatalkan</option>
                </select>
            </div>
            <div class="col-md-3">
                <div class="d-grid gap-2">
                    <button type="submit" class="btn btn-primary">Cari</button>
                    <a href="{{ route('admin.orders.index') }}" class="btn btn-outline-secondary">Reset</a>
                </div>
            </div>
        </div>
    </form>
    
    <!-- Orders Table -->
    @if($orders->count() > 0)
        <div class="card shadow-sm border-0">
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>ID Pesanan</th>
                                <th>Motor</th>
                                <th>Pelanggan</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Tanggal</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($orders as $order)
                            <tr>
                                <td>#{{ str_pad($order->id, 6, '0', STR_PAD_LEFT) }}</td>
                                <td>
                                    <div class="d-flex align-items-center">
                                        @if($order->motor->image_path)
                                            <img src="{{ asset('storage/' . $order->motor->image_path) }}" 
                                                 alt="{{ $order->motor->name }}" 
                                                 class="rounded me-2" 
                                                 style="width: 50px; height: 50px; object-fit: cover;">
                                        @endif
                                        <div>
                                            <div class="fw-bold">{{ $order->motor->name }}</div>
                                            <small class="text-muted">{{ $order->motor->brand }}</small>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="fw-bold">{{ $order->customer_name }}</div>
                                    <small class="text-muted">{{ $order->customer_email }}</small>
                                </td>
                                <td>Rp {{ number_format($order->total_amount, 0, ',', '.') }},-</td>
                                <td>
                                    <div>
                                        <div>
                                            <span class="badge bg-{{ $order->order_status === 'pending' ? 'warning' : ($order->order_status === 'confirmed' ? 'primary' : ($order->order_status === 'processing' ? 'info' : ($order->order_status === 'shipped' ? 'secondary' : ($order->order_status === 'delivered' ? 'success' : 'danger')))) }}">
                                                {{ ucfirst($order->order_status) }}
                                            </span>
                                        </div>
                                        <small class="text-muted">Bayar: 
                                            <span class="badge bg-{{ $order->payment_status === 'paid' ? 'success' : ($order->payment_status === 'pending' ? 'warning' : ($order->payment_status === 'failed' ? 'danger' : 'secondary')) }}">
                                                {{ ucfirst($order->payment_status) }}
                                            </span>
                                        </small>
                                    </div>
                                </td>
                                <td>{{ $order->created_at->format('d M Y') }}</td>
                                <td>
                                    <a href="{{ route('admin.orders.edit', $order) }}" class="btn btn-sm btn-outline-primary">
                                        <i class="fas fa-edit"></i> Edit
                                    </a>
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        
        <div class="d-flex justify-content-center mt-4">
            {{ $orders->links() }}
        </div>
    @else
        <div class="card shadow-sm border-0">
            <div class="card-body text-center py-5">
                <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                <h5 class="text-muted">Tidak Ada Pesanan</h5>
                <p class="text-muted">Belum ada pesanan yang dibuat oleh pelanggan.</p>
            </div>
        </div>
    @endif
</div>
@endsection