@extends('layouts.app')

@section('title', 'Buat Pesanan - ' . $motor->name)

@section('styles')
<style>
    .form-label {
        font-weight: 500;
        color: var(--dark-blue);
        margin-bottom: 0.5rem;
        position: relative;
        display: flex;
        align-items: center;
        font-size: 1.1rem;
    }
    
    .form-label::before {
        content: "";
        position: absolute;
        left: -10px;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 20px;
        background: linear-gradient(to bottom, var(--primary), var(--dark-blue));
        border-radius: 2px;
    }
    
    .form-control {
        border: 1px solid #e1e5eb;
        border-radius: 0.75rem;
        padding: 0.85rem 1.1rem;
        transition: all 0.3s ease;
        background: rgba(255, 255, 255, 0.8);
        position: relative;
        z-index: 1;
        font-size: 1.1rem;
    }
    
    .form-control:focus {
        border-color: var(--primary);
        box-shadow: 0 0 0 0.2rem rgba(74, 144, 226, 0.25);
        background: rgba(255, 255, 255, 1);
        transform: translateY(-2px);
    }
    
    .form-control::placeholder {
        color: #a0aec0;
        opacity: 0.8;
        font-size: 1rem;
    }
    
    .form-check-input:checked {
        background-color: var(--primary);
        border-color: var(--primary);
    }
    
    .form-check-input:focus {
        box-shadow: 0 0 0 0.2rem rgba(74, 144, 226, 0.25);
    }
    
    .form-check-label {
        font-size: 1.1rem;
    }
    
    .error-message {
        color: #e53e3e;
        font-size: 0.875em;
        margin-top: 0.4rem;
        display: flex;
        align-items: center;
        padding: 0.4rem 0.8rem;
        background: rgba(229, 62, 62, 0.1);
        border-radius: 0.375rem;
        border-left: 3px solid #e53e3e;
        animation: shake 0.5s ease;
    }
    
    @keyframes shake {
        0%, 100% {transform: translateX(0);}
        20%, 60% {transform: translateX(-3px);}
        40%, 80% {transform: translateX(3px);}
    }
    
    .error-message i {
        margin-right: 0.4rem;
        font-size: 0.9rem;
    }
    
    .btn-primary {
        background: linear-gradient(135deg, var(--dark-blue) 0%, var(--primary) 100%);
        border: none;
        color: white;
        padding: 0.9rem;
        font-weight: 500;
        border-radius: 0.75rem;
        transition: all 0.3s ease;
        font-size: 1.1rem;
        position: relative;
        overflow: hidden;
        z-index: 1;
    }
    
    .btn-primary:hover {
        background: linear-gradient(135deg, #032a60 0%, #3a7bc8 100%);
        transform: translateY(-3px);
        box-shadow: 0 0.6rem 1.5rem rgba(4, 54, 128, 0.3);
    }
    
    .order-form-card {
        border: none;
        border-radius: 1.5rem;
        box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.18);
        overflow: hidden;
        width: 100%;
        position: relative;
        z-index: 1;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        transform: translateY(0);
        transition: transform 0.4s ease, box-shadow 0.4s ease;
    }
    
    .order-form-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.2);
    }
</style>
@endsection

@section('content')
    <!-- Spacer to prevent navbar overlap -->
    <div style="height: 8rem; visibility: hidden;"></div>

    <section class="motor-detail" id="motor-detail">
        <div class="container">
            <!-- Motor Info Section -->
            <div class="card shadow-sm border-0 mb-5">
                <div class="row g-0">
                    <div class="col-lg-6">
                        <div class="main-image-container p-4">
                            <img 
                                src="{{ asset('storage/' . $motor->image_path) }}" 
                                class="img-fluid main-motor-image w-100 rounded" 
                                alt="{{ $motor->name }}"
                                style="object-fit: cover; max-height: 400px;"
                            >
                        </div>
                    </div>
                    
                    <div class="col-lg-6">
                        <div class="card-body p-4">
                            <div class="motor-header">
                                <h1 class="fw-bold text-dark">{{ $motor->name }}</h1>
                                <div class="d-flex align-items-center gap-2 mb-3">
                                    <div class="badge bg-primary">{{ $motor->brand }}</div>
                                </div>
                            </div>
                            
                            <div class="motor-info mb-4">
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <div class="info-item">
                                            <div class="text-muted text-uppercase small fs-5">Model</div>
                                            <div class="fw-bold fs-4">{{ $motor->model ?: 'N/A' }}</div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="info-item">
                                            <div class="text-muted text-uppercase small fs-5">Tahun</div>
                                            <div class="fw-bold fs-4">{{ $motor->year ?: 'N/A' }}</div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="info-item">
                                            <div class="text-muted text-uppercase small fs-5">Tipe</div>
                                            <div class="fw-bold fs-4">{{ $motor->type ?: 'N/A' }}</div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="info-item">
                                            <div class="text-muted text-uppercase small fs-5">Harga</div>
                                            <div class="fw-bold text-primary fs-4">Rp. {{ number_format($motor->price, 0, ',', '.') }},-</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="actions d-grid gap-2 d-md-flex">
                                <a href="{{ route('motors.show', $motor) }}" class="btn btn-primary flex-fill">
                                    <i class="fas fa-arrow-left me-2"></i>Kembali ke Detail
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Order Form Section -->
            <div class="specifications-section mb-5">
                <h3 class="fw-bold mb-4 fs-2">Formulir Pemesanan</h3>
                <div class="order-form-card">
                    <div class="card-body p-4">
                        <form action="{{ route('orders.store', $motor) }}" method="POST">
                            @csrf
                            
                            <div class="row g-4">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="customer_name" class="form-label">Nama Lengkap *</label>
                                        <input type="text" class="form-control" id="customer_name" name="customer_name" value="{{ old('customer_name', Auth::user()->name ?? '') }}" required>
                                        @error('customer_name')
                                            <div class="error-message">
                                                <i class="fas fa-exclamation-circle"></i> {{ $message }}
                                            </div>
                                        @enderror
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="customer_email" class="form-label">Email *</label>
                                        <input type="email" class="form-control" id="customer_email" name="customer_email" value="{{ old('customer_email', Auth::user()->email ?? '') }}" required>
                                        @error('customer_email')
                                            <div class="error-message">
                                                <i class="fas fa-exclamation-circle"></i> {{ $message }}
                                            </div>
                                        @enderror
                                    </div>
                                </div>
                            </div>
                            
                            <div class="mb-3">
                                <label for="customer_phone" class="form-label">Nomor Telepon *</label>
                                <input type="tel" class="form-control" id="customer_phone" name="customer_phone" value="{{ old('customer_phone') }}" required>
                                @error('customer_phone')
                                    <div class="error-message">
                                        <i class="fas fa-exclamation-circle"></i> {{ $message }}
                                    </div>
                                @enderror
                            </div>
                            
                            <div class="mb-3">
                                <label for="customer_address" class="form-label">Alamat</label>
                                <textarea class="form-control" id="customer_address" name="customer_address" rows="2">{{ old('customer_address') }}</textarea>
                                @error('customer_address')
                                    <div class="error-message">
                                        <i class="fas fa-exclamation-circle"></i> {{ $message }}
                                    </div>
                                @enderror
                            </div>
                            
                            <div class="mb-3">
                                <label for="order_notes" class="form-label">Catatan Tambahan</label>
                                <textarea class="form-control" id="order_notes" name="order_notes" rows="2" placeholder="Catatan tambahan untuk pesanan Anda">{{ old('order_notes') }}</textarea>
                                @error('order_notes')
                                    <div class="error-message">
                                        <i class="fas fa-exclamation-circle"></i> {{ $message }}
                                    </div>
                                @enderror
                            </div>
                            
                            <div class="mb-3">
                                <label class="form-label fw-bold">Metode Pembayaran</label>
                                <div class="row g-3">
                                    <div class="col-md-4">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="payment_method" id="payment_cash" value="cash" {{ old('payment_method') == 'cash' ? 'checked' : '' }}>
                                            <label class="form-check-label" for="payment_cash">
                                                Tunai
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="payment_method" id="payment_credit" value="credit" {{ old('payment_method') == 'credit' ? 'checked' : '' }}>
                                            <label class="form-check-label" for="payment_credit">
                                                Kredit
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="payment_method" id="payment_dp" value="dp" {{ old('payment_method') == 'dp' ? 'checked' : '' }}>
                                            <label class="form-check-label" for="payment_dp">
                                                DP (Uang Muka)
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                @error('payment_method')
                                    <div class="error-message">
                                        <i class="fas fa-exclamation-circle"></i> {{ $message }}
                                    </div>
                                @enderror
                            </div>
                            
                            <div class="mb-3">
                                <label class="form-label fw-bold">Opsi Pengiriman</label>
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="delivery_option" id="delivery_pickup" value="pickup" {{ old('delivery_option') == 'pickup' ? 'checked' : '' }} required>
                                            <label class="form-check-label" for="delivery_pickup">
                                                Ambil Sendiri di Dealer
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="delivery_option" id="delivery_home" value="delivery" {{ old('delivery_option') == 'delivery' ? 'checked' : '' }} required>
                                            <label class="form-check-label" for="delivery_home">
                                                Antar ke Rumah
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="mb-3 delivery-address-section" style="display: none;">
                                <label for="delivery_address" class="form-label">Alamat Pengiriman *</label>
                                <textarea class="form-control" id="delivery_address" name="delivery_address" rows="2" placeholder="Masukkan alamat lengkap untuk pengiriman">{{ old('delivery_address') }}</textarea>
                                @error('delivery_address')
                                    <div class="error-message">
                                        <i class="fas fa-exclamation-circle"></i> {{ $message }}
                                    </div>
                                @enderror
                            </div>
                            
                            <div class="d-grid gap-2 d-md-flex">
                                <button type="submit" class="btn btn-primary flex-fill">
                                    <i class="fas fa-shopping-cart me-2"></i>Buat Pesanan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection

@section('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const deliveryOption = document.querySelectorAll('input[name="delivery_option"]');
        const deliveryAddressSection = document.querySelector('.delivery-address-section');
        
        // Show/hide delivery address based on selected option
        deliveryOption.forEach(option => {
            option.addEventListener('change', function() {
                if (this.value === 'delivery') {
                    deliveryAddressSection.style.display = 'block';
                } else {
                    deliveryAddressSection.style.display = 'none';
                }
            });
        });
        
        // Trigger change event on page load to set initial state
        const selectedOption = document.querySelector('input[name="delivery_option"]:checked');
        if (selectedOption) {
            selectedOption.dispatchEvent(new Event('change'));
        }
    });
</script>
@endsection