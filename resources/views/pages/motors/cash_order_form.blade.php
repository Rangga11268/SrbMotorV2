@extends('layouts.app')

@section('title', 'Pesanan Tunai - ' . $motor->name)

@section('styles')
<style>
    /* Add space for fixed navbar */
    body {
        padding-top: 120px; /* Adjusted to better match the homepage navbar height */
    }
    
    .cash-form-section {
        padding: 2rem 0 4rem 0;
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
    
    .cash-card {
        border: none;
        border-radius: 1.5rem;
        box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.18);
        overflow: hidden;
        width: 100%;
        max-width: 800px;
        position: relative;
        z-index: 1;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        transform: translateY(0);
        transition: transform 0.4s ease, box-shadow 0.4s ease;
        margin: 0 auto; /* Center the card */
    }
    
    .cash-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.2);
    }
    
    .cash-header {
        background: linear-gradient(135deg, var(--primary, #4a90e2) 0%, var(--dark-blue, #032a60) 100%);
        color: white;
        padding: 2.5rem 1.5rem;
        text-align: center;
        position: relative;
        overflow: visible;
    }
    
    .cash-header h3 {
        font-weight: 600;
        margin: 0.5rem 0 0.25rem 0;
        font-size: 2rem;
        position: relative;
        z-index: 1;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    
    .cash-header h3 small {
        display: block;
        font-size: 1.3rem;
        opacity: 0.9;
        margin-top: 0.5rem;
    }
    
    .cash-body {
        padding: 2.5rem;
    }
    
    .motor-card {
        border: none;
        border-radius: 1rem;
        box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.08);
        overflow: hidden;
        transition: all 0.3s ease;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        position: relative;
        z-index: 1;
    }
    
    .motor-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.15);
    }
    
    .image-container {
        position: relative;
        overflow: hidden;
    }
    
    .motor-card img {
        height: 250px;
        object-fit: cover;
        transition: transform 0.5s ease;
    }
    
    .motor-card:hover img {
        transform: scale(1.05);
    }
    
    .motor-card .card-body {
        padding: 1.5rem;
    }
    
    .motor-card .card-title {
        font-weight: 700;
        color: var(--dark-blue, #032a60);
        margin-bottom: 0.5rem;
        font-size: 1.6rem;
    }
    
    .motor-card .card-text {
        font-size: 1.3rem;
    }
    
    .price {
        font-size: 1.8rem;
    }
    
    .form-label {
        font-weight: 500;
        color: var(--dark-blue, #032a60);
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
        position: relative;
        display: flex;
        align-items: center;
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
    
    .form-control, .form-select {
        border: 1px solid #e1e5eb;
        border-radius: 0.75rem;
        padding: 0.85rem 1.1rem;
        transition: all 0.3s ease;
        background: rgba(255, 255, 255, 0.8);
        font-size: 1.2rem;
        position: relative;
        z-index: 1;
    }
    
    .form-control:focus, .form-select:focus {
        border-color: var(--primary);
        box-shadow: 0 0 0 0.2rem rgba(74, 144, 226, 0.25);
        background: rgba(255, 255, 255, 1);
        transform: translateY(-2px);
    }
    
    .form-text {
        font-size: 1.1rem;
        color: #6c757d;
    }
    
    .btn-cash {
        border-radius: 0.75rem;
        padding: 0.8rem 1.2rem;
        font-weight: 500;
        font-size: 1.2rem;
        transition: all 0.3s ease;
    }
    
    .btn-success-cash {
        background: linear-gradient(135deg, #28a745 0%, #218838 100%);
        border: none;
        color: white;
    }
    
    .btn-success-cash:hover {
        background: linear-gradient(135deg, #218838 0%, #1e7e34 100%);
        transform: translateY(-2px);
        box-shadow: 0 0.5rem 1rem rgba(40, 167, 69, 0.3);
        color: white;
    }
    
    .btn-outline-cash {
        border: 2px solid var(--primary, #4a90e2);
        color: var(--primary, #4a90e2);
        background: transparent;
    }
    
    .btn-outline-cash:hover {
        background: var(--primary, #4a90e2);
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 0.5rem 1rem rgba(4, 54, 128, 0.3);
    }
    
    @media (max-width: 768px) {
        body {
            padding-top: 100px;
        }
        
        .cash-card {
            margin: 0 1rem;
        }
        
        .cash-header h3 {
            font-size: 1.6rem;
        }
        
        .cash-header h3 small {
            font-size: 1.1rem;
        }
        
        .motor-card .card-title {
            font-size: 1.4rem;
        }
        
        .motor-card .card-text {
            font-size: 1.1rem;
        }
        
        .form-label {
            font-size: 1.1rem;
        }
        
        .form-control, .form-select {
            font-size: 1.1rem;
        }
        
        .btn-cash {
            padding: 0.7rem 1rem;
            font-size: 1.1rem;
        }
    }
</style>
@endsection

@section('content')
<section class="cash-form-section">
    <div class="container">
        <div class="section-header text-center">
            <h1>Pesanan <span>Tunai</span></h1>
        </div>
        
        <div class="row justify-content-center">
            <div class="col-lg-10">
                <div class="card cash-card shadow-sm">
                    <div class="cash-header">
                        <h3>Pesanan Tunai 
                            <small>{{ $motor->name }}</small>
                        </h3>
                    </div>
                    <div class="cash-body">
                        <div class="row mb-4">
                            <div class="col-md-12">
                                <div class="card motor-card h-100 shadow-sm">
                                    <div class="image-container">
                                        <img src="{{ asset('storage/' . $motor->image_path) }}" 
                                             class="card-img-top" 
                                             alt="{{ $motor->name }}" 
                                             style="height: 250px; object-fit: cover;">
                                    </div>
                                    <div class="card-body text-start">
                                        <h5 class="card-title">{{ $motor->name }}</h5>
                                        <p class="card-text text-muted">
                                            <i class="fas fa-calendar-alt me-1"></i> {{ $motor->year }}
                                            <i class="fas fa-motorcycle ms-2 me-1"></i> {{ $motor->type }}
                                        </p>
                                        <div class="price mb-2">
                                            <span class="fw-bold text-primary">Rp {{ number_format($motor->price, 0, ',', '.') }},-</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <form action="{{ route('motors.process-cash-order', $motor->id) }}" method="POST">
                            @csrf
                            
                            <div class="mb-4">
                                <label for="notes" class="form-label">Catatan Tambahan</label>
                                <textarea name="notes" id="notes" class="form-control" rows="3" placeholder="Catatan tambahan untuk pesanan Anda">{{ old('notes') }}</textarea>
                            </div>
                            
                            <div class="mb-4">
                                <label for="booking_fee" class="form-label">Uang Muka (Booking Fee)</label>
                                <input type="number" name="booking_fee" id="booking_fee" class="form-control" value="{{ old('booking_fee', 0) }}" min="0" step="1000">
                                <div class="form-text">Jumlah booking fee yang ingin Anda bayarkan</div>
                            </div>
                            
                            <div class="mb-4">
                                <label for="payment_method" class="form-label">Metode Pembayaran</label>
                                <select name="payment_method" id="payment_method" class="form-select" required>
                                    <option value="" disabled selected>Pilih metode pembayaran</option>
                                    <option value="cash" {{ old('payment_method') === 'cash' ? 'selected' : '' }}>Cash Langsung ke Dealer</option>
                                    <option value="transfer" {{ old('payment_method') === 'transfer' ? 'selected' : '' }}>Transfer Bank</option>
                                    <option value="credit_card" {{ old('payment_method') === 'credit_card' ? 'selected' : '' }}>Kartu Kredit</option>
                                    <option value="installment" {{ old('payment_method') === 'installment' ? 'selected' : '' }}>Cicilan</option>
                                </select>
                            </div>
                            
                            <div class="d-grid gap-3">
                                <button type="submit" class="btn btn-success-cash btn-lg">
                                    <i class="fas fa-check-circle me-2"></i>Konfirmasi Pesanan Tunai
                                </button>
                                <a href="{{ route('motors.show', $motor->id) }}" class="btn btn-outline-cash btn-lg">
                                    <i class="fas fa-arrow-left me-2"></i>Kembali
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection