@extends('layouts.app')

@section('title', 'Pengajuan Kredit - ' . $motor->name)

@section('styles')
<style>
    /* Add space for fixed navbar */
    body {
        padding-top: 120px; /* Adjusted to better match the homepage navbar height */
    }
    
    .credit-form-section {
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
    
    .credit-card {
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
        margin: 0 auto; /* Center the card */
    }
    
    .credit-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.2);
    }
    
    .credit-header {
        background: linear-gradient(135deg, var(--primary, #4a90e2) 0%, var(--dark-blue, #032a60) 100%);
        color: white;
        padding: 2.5rem 1.5rem;
        text-align: center;
        position: relative;
        overflow: visible;
    }
    
    .credit-header h3 {
        font-weight: 600;
        margin: 0.5rem 0 0.25rem 0;
        font-size: 2rem;
        position: relative;
        z-index: 1;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    
    .credit-header h3 small {
        display: block;
        font-size: 1.3rem;
        opacity: 0.9;
        margin-top: 0.5rem;
    }
    
    .credit-body {
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
    
    .info-alert {
        border-radius: 1rem;
        padding: 1.5rem;
        margin: 1.5rem 0;
        background: linear-gradient(135deg, #fff3cd 0%, #fef9e7 100%);
        border: 1px solid #ffeaa7;
        color: #856404;
    }
    
    .info-alert h5 {
        font-size: 1.4rem;
        color: var(--dark-blue, #032a60);
        margin-bottom: 0.75rem;
    }
    
    .info-alert ul {
        padding-left: 1.5rem;
    }
    
    .info-alert li {
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
    }
    
    .btn-credit {
        border-radius: 0.75rem;
        padding: 0.8rem 1.2rem;
        font-weight: 500;
        font-size: 1.2rem;
        transition: all 0.3s ease;
    }
    
    .btn-success-credit {
        background: linear-gradient(135deg, #28a745 0%, #218838 100%);
        border: none;
        color: white;
    }
    
    .btn-success-credit:hover {
        background: linear-gradient(135deg, #218838 0%, #1e7e34 100%);
        transform: translateY(-2px);
        box-shadow: 0 0.5rem 1rem rgba(40, 167, 69, 0.3);
        color: white;
    }
    
    .btn-outline-credit {
        border: 2px solid var(--primary, #4a90e2);
        color: var(--primary, #4a90e2);
        background: transparent;
    }
    
    .btn-outline-credit:hover {
        background: var(--primary, #4a90e2);
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 0.5rem 1rem rgba(4, 54, 128, 0.3);
    }
    
    @media (max-width: 768px) {
        body {
            padding-top: 100px;
        }
        
        .credit-card {
            margin: 0 1rem;
        }
        
        .credit-header h3 {
            font-size: 1.6rem;
        }
        
        .credit-header h3 small {
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
        
        .btn-credit {
            padding: 0.7rem 1rem;
            font-size: 1.1rem;
        }
    }
</style>
@endsection

@section('content')
<section class="credit-form-section">
    <div class="container">
        <div class="section-header text-center">
            <h1>Pengajuan <span>Kredit</span></h1>
        </div>
        
        <div class="row justify-content-center">
            <div class="col-lg-10">
                <div class="card credit-card shadow-sm">
                    <div class="credit-header">
                        <h3>Pengajuan Kredit 
                            <small>{{ $motor->name }}</small>
                        </h3>
                    </div>
                    <div class="credit-body">
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
                        
                        <form action="{{ route('motors.process-credit-order', $motor->id) }}" method="POST">
                            @csrf
                            
                            <div class="mb-4">
                                <label for="down_payment" class="form-label">Uang Muka (DP)</label>
                                <input type="number" name="down_payment" id="down_payment" class="form-control" value="{{ old('down_payment') }}" min="0" step="1000" required>
                                <div class="form-text">Jumlah uang muka yang ingin Anda bayarkan</div>
                            </div>
                            
                            <div class="mb-4">
                                <label for="tenor" class="form-label">Tenor (Bulan)</label>
                                <select name="tenor" id="tenor" class="form-select" required>
                                    <option value="" disabled selected>Pilih tenor</option>
                                    <option value="12" {{ old('tenor') == 12 ? 'selected' : '' }}>12 Bulan</option>
                                    <option value="24" {{ old('tenor') == 24 ? 'selected' : '' }}>24 Bulan</option>
                                    <option value="36" {{ old('tenor') == 36 ? 'selected' : '' }}>36 Bulan</option>
                                    <option value="48" {{ old('tenor') == 48 ? 'selected' : '' }}>48 Bulan</option>
                                    <option value="60" {{ old('tenor') == 60 ? 'selected' : '' }}>60 Bulan</option>
                                </select>
                            </div>
                            
                            <div class="mb-4">
                                <label for="monthly_installment" class="form-label">Cicilan Per Bulan (Estimasi)</label>
                                <input type="number" name="monthly_installment" id="monthly_installment" class="form-control" value="{{ old('monthly_installment') }}" min="0" step="1000" readonly>
                                <div class="form-text">Nilai ini akan dihitung berdasarkan DP dan tenor yang Anda pilih</div>
                            </div>
                            
                            <div class="mb-4">
                                <label for="payment_method" class="form-label">Metode Pembayaran</label>
                                <select name="payment_method" id="payment_method" class="form-select" required>
                                    <option value="" disabled selected>Pilih metode pembayaran</option>
                                    <option value="leasing" {{ old('payment_method') === 'leasing' ? 'selected' : '' }}>Melalui Leasing</option>
                                    <option value="bank" {{ old('payment_method') === 'bank' ? 'selected' : '' }}>Melalui Bank</option>
                                </select>
                            </div>
                            
                            <div class="mb-4">
                                <label for="notes" class="form-label">Catatan Tambahan</label>
                                <textarea name="notes" id="notes" class="form-control" rows="3" placeholder="Catatan tambahan untuk pengajuan kredit Anda">{{ old('notes') }}</textarea>
                            </div>
                            
                            <div class="info-alert">
                                <h5>Informasi Pengajuan Kredit</h5>
                                <ul class="mb-0">
                                    <li>Setelah pengajuan dikirim, Anda akan diminta untuk mengunggah dokumen yang diperlukan</li>
                                    <li>Dokumen akan direview oleh tim kami sebelum diteruskan ke pihak leasing/surveyor</li>
                                    <li>Keputusan kredit akan diberikan dalam waktu 1-3 hari kerja setelah dokumen lengkap</li>
                                </ul>
                            </div>
                            
                            <div class="d-grid gap-3">
                                <button type="submit" class="btn btn-success-credit btn-lg">
                                    <i class="fas fa-file-signature me-2"></i>Ajukan Kredit
                                </button>
                                <a href="{{ route('motors.show', $motor->id) }}" class="btn btn-outline-credit btn-lg">
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

<script>
document.addEventListener('DOMContentLoaded', function() {
    const dpInput = document.getElementById('down_payment');
    const tenorSelect = document.getElementById('tenor');
    const installmentInput = document.getElementById('monthly_installment');
    const motorPrice = {{ $motor->price }};
    
    function calculateInstallment() {
        const dp = parseFloat(dpInput.value) || 0;
        const tenor = parseInt(tenorSelect.value) || 12;
        
        if (dp >= motorPrice) {
            alert('Uang muka tidak boleh lebih besar dari harga motor');
            dpInput.value = motorPrice - 1000000; // Set to a reasonable amount below price
            return;
        }
        
        const loanAmount = motorPrice - dp;
        const monthly = loanAmount / tenor;
        installmentInput.value = Math.round(monthly);
    }
    
    dpInput.addEventListener('input', calculateInstallment);
    tenorSelect.addEventListener('change', calculateInstallment);
    
    // Initial calculation
    calculateInstallment();
});
</script>
@endsection