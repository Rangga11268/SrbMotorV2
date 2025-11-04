@extends('layouts.admin')

@section('title', 'Edit Pesanan #' . str_pad($order->id, 6, '0', STR_PAD_LEFT))

@section('content')
<div class="container-fluid py-4">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <h1 class="h3 mb-0">Edit Pesanan #{{ str_pad($order->id, 6, '0', STR_PAD_LEFT) }}</h1>
        <div class="d-flex gap-2 mt-2 mt-md-0">
            <a href="{{ route('admin.orders.index') }}" class="btn btn-outline-secondary">
                <i class="fas fa-arrow-left me-1"></i>Kembali ke Daftar
            </a>
        </div>
    </div>
    
    <div class="row">
        <div class="col-md-8">
            <div class="card shadow-sm border-0">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0">Detail Pesanan</h5>
                </div>
                <div class="card-body">
                    <form action="{{ route('admin.orders.update', $order) }}" method="POST">
                        @csrf
                        @method('PUT')
                        
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Status Pesanan</label>
                                    <select name="order_status" class="form-select" required>
                                        <option value="pending" {{ $order->order_status === 'pending' ? 'selected' : '' }}>Pending</option>
                                        <option value="confirmed" {{ $order->order_status === 'confirmed' ? 'selected' : '' }}>Dikonfirmasi</option>
                                        <option value="processing" {{ $order->order_status === 'processing' ? 'selected' : '' }}>Diproses</option>
                                        <option value="shipped" {{ $order->order_status === 'shipped' ? 'selected' : '' }}>Dikirim</option>
                                        <option value="delivered" {{ $order->order_status === 'delivered' ? 'selected' : '' }}>Diterima</option>
                                        <option value="cancelled" {{ $order->order_status === 'cancelled' ? 'selected' : '' }}>Dibatalkan</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Status Pembayaran</label>
                                    <select name="payment_status" class="form-select" required>
                                        <option value="unpaid" {{ $order->payment_status === 'unpaid' ? 'selected' : '' }}>Belum Dibayar</option>
                                        <option value="paid" {{ $order->payment_status === 'paid' ? 'selected' : '' }}>Dibayar</option>
                                        <option value="pending" {{ $order->payment_status === 'pending' ? 'selected' : '' }}>Menunggu Pembayaran</option>
                                        <option value="failed" {{ $order->payment_status === 'failed' ? 'selected' : '' }}>Pembayaran Gagal</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <label for="admin_notes" class="form-label">Catatan Admin</label>
                            <textarea name="admin_notes" id="admin_notes" class="form-control" rows="4" placeholder="Catatan tambahan untuk pesanan ini">{{ old('admin_notes', $order->admin_notes) }}</textarea>
                        </div>
                        
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button type="submit" class="btn btn-success me-md-2">
                                <i class="fas fa-save me-1"></i>Simpan Perubahan
                            </button>
                            <a href="{{ route('admin.orders.index') }}" class="btn btn-secondary">
                                <i class="fas fa-times me-1"></i>Batal
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
        <div class="col-md-4">
            <!-- Customer Information -->
            <div class="card shadow-sm border-0 mb-4">
                <div class="card-header bg-info text-white">
                    <h5 class="mb-0">Informasi Pelanggan</h5>
                </div>
                <div class="card-body">
                    <h6 class="fw-bold">{{ $order->customer_name }}</h6>
                    <p class="mb-1"><i class="fas fa-envelope me-2"></i>{{ $order->customer_email }}</p>
                    <p class="mb-1"><i class="fas fa-phone me-2"></i>{{ $order->customer_phone }}</p>
                    @if($order->customer_address)
                        <p class="mb-1"><i class="fas fa-home me-2"></i>{{ $order->customer_address }}</p>
                    @endif
                </div>
            </div>
            
            <!-- Motor Information -->
            <div class="card shadow-sm border-0 mb-4">
                <div class="card-header bg-success text-white">
                    <h5 class="mb-0">Motor yang Dipesan</h5>
                </div>
                <div class="card-body">
                    <div class="text-center mb-3">
                        <img src="{{ asset('storage/' . $order->motor->image_path) }}" 
                             alt="{{ $order->motor->name }}" 
                             class="img-fluid rounded" 
                             style="max-height: 150px; object-fit: cover;">
                    </div>
                    <h6 class="fw-bold">{{ $order->motor->name }}</h6>
                    <p class="mb-1">Brand: <span class="fw-bold">{{ $order->motor->brand }}</span></p>
                    <p class="mb-1">Model: <span class="fw-bold">{{ $order->motor->model ?: 'N/A' }}</span></p>
                    <p class="mb-1">Tahun: <span class="fw-bold">{{ $order->motor->year ?: 'N/A' }}</span></p>
                    <p class="mb-1">Tipe: <span class="fw-bold">{{ $order->motor->type ?: 'N/A' }}</span></p>
                    <p class="mb-0">Harga: <span class="fw-bold text-primary">Rp {{ number_format($order->motor->price, 0, ',', '.') }},-</span></p>
                </div>
            </div>
            
            <!-- Order Information -->
            <div class="card shadow-sm border-0">
                <div class="card-header bg-warning text-dark">
                    <h5 class="mb-0">Informasi Pesanan</h5>
                </div>
                <div class="card-body">
                    <p class="mb-1">Tanggal Pesanan: <span class="fw-bold">{{ $order->created_at->format('d M Y H:i') }}</span></p>
                    <p class="mb-1">Total Harga: <span class="fw-bold">Rp {{ number_format($order->total_amount, 0, ',', '.') }},-</span></p>
                    <p class="mb-1">Metode Pembayaran: <span class="fw-bold text-capitalize">{{ $order->payment_method ?: 'N/A' }}</span></p>
                    <p class="mb-1">Opsi Pengiriman: 
                        <span class="fw-bold">{{ $order->delivery_option === 'pickup' ? 'Ambil Sendiri' : 'Antar ke Rumah' }}</span>
                    </p>
                    @if($order->delivery_address)
                        <p class="mb-1">Alamat Pengiriman: <span class="fw-bold">{{ $order->delivery_address }}</span></p>
                    @endif
                    @if($order->order_notes)
                        <p class="mb-0 mt-2">Catatan: <span class="fw-bold">{{ $order->order_notes }}</span></p>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
@endsection