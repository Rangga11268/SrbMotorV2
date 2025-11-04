@extends('layouts.app')

@section('title', 'Detail Pesanan #' . str_pad($order->id, 6, '0', STR_PAD_LEFT))

@section('content')
    <!-- Spacer to prevent navbar overlap -->
    <div style="height: 8rem; visibility: hidden;"></div>

    <section class="motor-detail" id="motor-detail">
        <div class="container">
            <!-- Order Info Section -->
            <div class="card shadow-sm border-0 mb-5">
                <div class="row g-0">
                    <div class="col-lg-12">
                        <div class="card-body p-4">
                            <div class="motor-header">
                                <h1 class="fw-bold text-dark">Detail Pesanan #{{ str_pad($order->id, 6, '0', STR_PAD_LEFT) }}</h1>
                                <div class="d-flex align-items-center gap-2 mb-3">
                                    <div class="badge bg-{{ $order->order_status === 'pending' ? 'warning' : ($order->order_status === 'confirmed' ? 'primary' : ($order->order_status === 'processing' ? 'info' : ($order->order_status === 'shipped' ? 'secondary' : ($order->order_status === 'delivered' ? 'success' : 'danger')))) }}">
                                        {{ ucfirst($order->order_status) }}
                                    </div>
                                    <div class="badge bg-{{ $order->payment_status === 'paid' ? 'success' : ($order->payment_status === 'pending' ? 'warning' : ($order->payment_status === 'failed' ? 'danger' : 'secondary')) }}">
                                        Bayar: {{ ucfirst($order->payment_status) }}
                                    </div>
                                </div>
                            </div>
                            
                            <div class="motor-info mb-4">
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <div class="info-item">
                                            <div class="text-muted text-uppercase small fs-5"> Total Harga</div>
                                            <div class="fw-bold fs-4">Rp {{ number_format($order->total_amount, 0, ',', '.') }},-</div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="info-item">
                                            <div class="text-muted text-uppercase small fs-5">Tanggal</div>
                                            <div class="fw-bold fs-4">{{ $order->created_at->format('d M Y H:i') }}</div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="info-item">
                                            <div class="text-muted text-uppercase small fs-5">Metode Pembayaran</div>
                                            <div class="fw-bold fs-4 text-capitalize">{{ $order->payment_method ?: 'N/A' }}</div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="info-item">
                                            <div class="text-muted text-uppercase small fs-5">Opsi Pengiriman</div>
                                            <div class="fw-bold fs-4">{{ $order->delivery_option === 'pickup' ? 'Ambil Sendiri di Dealer' : 'Antar ke Rumah' }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            @if($order->order_notes)
                                <div class="motor-details mb-4">
                                    <h5 class="fw-bold fs-4">Catatan Tambahan</h5>
                                    <p class="text-muted fs-5">{{ $order->order_notes }}</p>
                                </div>
                            @endif
                            
                            <div class="actions d-grid gap-2 d-md-flex">
                                <a href="{{ route('orders.index') }}" class="btn btn-primary flex-fill">
                                    <i class="fas fa-arrow-left me-2"></i>Kembali ke Daftar Pesanan
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Motor Information -->
            <div class="specifications-section mb-5">
                <h3 class="fw-bold mb-4 fs-2">Motor yang Dipesan</h3>
                <div class="card shadow-sm border-0">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="{{ asset('storage/' . $order->motor->image_path) }}" class="img-fluid" alt="{{ $order->motor->name }}" style="height: 180px; object-fit: cover; width: 100%;">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body p-4">
                                <h4 class="card-title fw-bold text-dark fs-3">{{ $order->motor->name }}</h4>
                                <div class="row g-3">
                                    <div class="col-lg-6">
                                        <div class="info-item">
                                            <div class="text-muted text-uppercase small">Brand</div>
                                            <div class="fw-bold fs-5">{{ $order->motor->brand }}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="info-item">
                                            <div class="text-muted text-uppercase small">Model</div>
                                            <div class="fw-bold fs-5">{{ $order->motor->model ?: 'N/A' }}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="info-item">
                                            <div class="text-muted text-uppercase small">Tahun</div>
                                            <div class="fw-bold fs-5">{{ $order->motor->year ?: 'N/A' }}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="info-item">
                                            <div class="text-muted text-uppercase small">Tipe</div>
                                            <div class="fw-bold fs-5">{{ $order->motor->type ?: 'N/A' }}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="info-item">
                                            <div class="text-muted text-uppercase small">Ketersediaan</div>
                                            <div class="fw-bold fs-5">
                                                <span class="badge bg-{{ $order->motor->tersedia ? 'success' : 'danger' }}">
                                                    {{ $order->motor->tersedia ? 'Tersedia' : 'Tidak Tersedia' }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="info-item">
                                            <div class="text-muted text-uppercase small">Harga</div>
                                            <div class="fw-bold text-primary fs-5">Rp {{ number_format($order->motor->price, 0, ',', '.') }},-</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Customer Information -->
            <div class="specifications-section mb-5">
                <h3 class="fw-bold mb-4 fs-2">Informasi Pelanggan</h3>
                <div class="card shadow-sm border-0">
                    <div class="card-body p-4">
                        <div class="row g-4">
                            <div class="col-lg-6">
                                <div class="info-item">
                                    <div class="text-muted text-uppercase small">Nama</div>
                                    <div class="fw-bold fs-4">{{ $order->customer_name }}</div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="info-item">
                                    <div class="text-muted text-uppercase small">Email</div>
                                    <div class="fw-bold fs-4">{{ $order->customer_email }}</div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="info-item">
                                    <div class="text-muted text-uppercase small">Telepon</div>
                                    <div class="fw-bold fs-4">{{ $order->customer_phone }}</div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="info-item">
                                    <div class="text-muted text-uppercase small">Alamat</div>
                                    <div class="fw-bold fs-4">{{ $order->customer_address ?: 'N/A' }}</div>
                                </div>
                            </div>
                            @if($order->delivery_address)
                            <div class="col-lg-6">
                                <div class="info-item">
                                    <div class="text-muted text-uppercase small">Alamat Pengiriman</div>
                                    <div class="fw-bold fs-4">{{ $order->delivery_address }}</div>
                                </div>
                            </div>
                            @endif
                        </div>
                    </div>
                </div>
            </div>

            <!-- Admin Notes -->
            @if($order->admin_notes)
            <div class="specifications-section mb-5">
                <h3 class="fw-bold mb-4 fs-2">Catatan Admin</h3>
                <div class="card shadow-sm border-0">
                    <div class="card-body p-4">
                        <p class="fs-4">{{ $order->admin_notes }}</p>
                    </div>
                </div>
            </div>
            @endif
        </div>
    </section>
@endsection