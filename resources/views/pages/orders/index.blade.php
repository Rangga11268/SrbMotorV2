@extends('layouts.app')

@section('title', 'Daftar Pesanan Saya')

@section('content')
    <!-- Spacer to prevent navbar overlap -->
    <div style="height: 8rem; visibility: hidden;"></div>

    <section class="orders-preview" id="orders-preview">
        <div class="container">
            <h1 class="heading text-center mb-4"><span>Daftar</span> Pesanan Saya</h1>

            @if($orders->count() > 0)
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead class="table-light">
                            <tr>
                                <th>ID Pesanan</th>
                                <th>Motor</th>
                                <th>Tanggal</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($orders as $order)
                            <tr>
                                <td>#{{ str_pad($order->id, 6, '0', STR_PAD_LEFT) }}</td>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <img src="{{ asset('storage/' . $order->motor->image_path) }}" 
                                             alt="{{ $order->motor->name }}" 
                                             class="rounded me-2" 
                                             style="width: 50px; height: 50px; object-fit: cover;">
                                        <div>
                                            <div class="fw-bold">{{ $order->motor->name }}</div>
                                            <small class="text-muted">{{ $order->motor->brand }}</small>
                                        </div>
                                    </div>
                                </td>
                                <td>{{ $order->created_at->format('d M Y') }}</td>
                                <td>Rp {{ number_format($order->total_amount, 0, ',', '.') }},-</td>
                                <td>
                                    <span class="badge bg-{{ $order->order_status === 'pending' ? 'warning' : ($order->order_status === 'confirmed' ? 'primary' : ($order->order_status === 'processing' ? 'info' : ($order->order_status === 'shipped' ? 'secondary' : ($order->order_status === 'delivered' ? 'success' : 'danger')))) }}">
                                        {{ ucfirst($order->order_status) }}
                                    </span>
                                </td>
                                <td>
                                    <a href="{{ route('orders.show', $order) }}" class="btn btn-primary">
                                        <i class="fas fa-eye me-1"></i>Lihat
                                    </a>
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
                
                @if(method_exists($orders, 'hasPages') && $orders->hasPages())
                <div class="d-flex justify-content-center">
                    {{ $orders->links() }}
                </div>
                @endif
            @else
                <div class="text-center py-5">
                    <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                    <h4 class="text-muted">Belum Ada Pesanan</h4>
                    <p class="text-muted">Anda belum memiliki pesanan apapun. Silakan buat pesanan baru dari halaman motor.</p>
                    <a href="{{ route('motors.index') }}" class="btn">Cari Motor</a>
                </div>
            @endif
        </div>
    </section>
@endsection