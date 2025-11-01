@extends('layouts.app')

@section('title', 'Simulasi Kredit Motor')

@section('content')
    <!-- Spacer to prevent navbar overlap -->
    <div style="height: 8rem; visibility: hidden;"></div>
    
    <section class="credit-calculator" id="credit-calculator">
        <div class="container">
        <h1 class="heading text-center mb-4"><span>Simulasi</span> Kredit Motor</h1>
        
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <div class="card p-4">
                    <div class="card-body">
                        <h4 class="card-title mb-4">Hitung Cicilan Motor Impian Anda</h4>
                        
                        <div class="mb-4">
                            <h5>Informasi Motor</h5>
                            <p><strong>Nama Motor:</strong> {{ $motor->name }}</p>
                            <p><strong>Harga:</strong> Rp. {{ number_format($motor->price, 0, ',', '.') }},-</p>
                        </div>
                        
                        <form id="creditCalculationForm">
                            @csrf
                            <input type="hidden" name="motor_id" value="{{ $motor->id }}">
                            
                            <div class="mb-3">
                                <label for="down_payment" class="form-label">Uang Muka (DP) - Rupiah</label>
                                <input 
                                    type="number" 
                                    class="form-control" 
                                    id="down_payment" 
                                    name="down_payment" 
                                    placeholder="Masukkan jumlah DP"
                                    value="{{ old('down_payment', $motor->price * 0.2) }}"
                                    min="0"
                                    max="{{ $motor->price }}"
                                    required
                                >
                                <div class="form-text">Minimal disarankan 20% dari harga motor</div>
                            </div>
                            
                            <div class="mb-3">
                                <label for="tenor" class="form-label">Tenor (lama cicilan)</label>
                                <select class="form-select" id="tenor" name="tenor" required>
                                    <option value="12" {{ old('tenor') == 12 ? 'selected' : '' }}>12 Bulan</option>
                                    <option value="24" {{ old('tenor') == 24 ? 'selected' : '' }}>24 Bulan</option>
                                    <option value="36" {{ old('tenor') == 36 ? 'selected' : '' }}>36 Bulan</option>
                                    <option value="48" {{ old('tenor') == 48 ? 'selected' : '' }}>48 Bulan</option>
                                </select>
                            </div>
                            
                            <div class="mb-3">
                                <label for="interest_rate" class="form-label">Suku Bunga per Tahun (%)</label>
                                <input 
                                    type="number" 
                                    step="0.01" 
                                    class="form-control" 
                                    id="interest_rate" 
                                    name="interest_rate" 
                                    placeholder="Contoh: 7.5 untuk 7.5%"
                                    value="{{ old('interest_rate', 7.5) }}"
                                    min="0"
                                    max="100"
                                    required
                                >
                            </div>
                            
                            <button type="submit" class="btn btn-primary">Hitung Cicilan</button>
                        </form>
                        
                        <!-- Results section -->
                        <div id="calculationResults" class="mt-4" style="display: none;">
                            <h4>Hasil Simulasi Kredit</h4>
                            
                            <div class="row">
                                <div class="col-md-6">
                                    <table class="table">
                                        <tr>
                                            <td>Harga Motor</td>
                                            <td class="text-end">Rp. <span id="motorPriceDisplay"></span></td>
                                        </tr>
                                        <tr>
                                            <td>Uang Muka (DP)</td>
                                            <td class="text-end">Rp. <span id="dpDisplay"></span></td>
                                        </tr>
                                        <tr>
                                            <td>Biaya Pokok</td>
                                            <td class="text-end">Rp. <span id="principalDisplay"></span></td>
                                        </tr>
                                        <tr>
                                            <td>Bunga ({{ number_format(request('interest_rate', 7.5), 2) }}%)</td>
                                            <td class="text-end">Rp. <span id="interestDisplay"></span></td>
                                        </tr>
                                        <tr>
                                            <td class="fw-bold">Total Pembiayaan</td>
                                            <td class="text-end fw-bold">Rp. <span id="totalFinancingDisplay"></span></td>
                                        </tr>
                                    </table>
                                </div>
                                
                                <div class="col-md-6">
                                    <table class="table">
                                        <tr>
                                            <td>Tenor</td>
                                            <td class="text-end"><span id="tenorDisplay"></span> Bulan</td>
                                        </tr>
                                        <tr>
                                            <td class="fw-bold">Cicilan per Bulan</td>
                                            <td class="text-end fw-bold">Rp. <span id="monthlyPaymentDisplay"></span></td>
                                        </tr>
                                    </table>
                                    
                                    <div class="alert alert-info">
                                        <i class="fas fa-info-circle"></i> Simulasi ini hanya perkiraan. Untuk informasi lebih lanjut mengenai syarat dan ketentuan kredit, silakan hubungi dealer kami.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="mt-4 text-center">
                    <a href="{{ route('motors.show', $motor->id) }}" class="btn btn-secondary">Kembali ke Detail Motor</a>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection

@section('scripts')
<script>
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('creditCalculationForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(form);
            const motorPrice = {{ $motor->price }};
            const downPayment = parseFloat(formData.get('down_payment')) || 0;
            const tenor = parseInt(formData.get('tenor'));
            const interestRate = parseFloat(formData.get('interest_rate')) || 0;
            
            // Calculate loan amount (principal)
            const principal = motorPrice - downPayment;
            
            // Convert annual interest rate to monthly
            const monthlyInterestRate = interestRate / 100 / 12;
            
            // Calculate monthly payment using loan payment formula
            // M = P [ r(1+r)^n ] / [ (1+r)^n - 1 ]
            // M = Monthly payment, P = Principal, r = monthly interest rate, n = number of months
            let monthlyPayment;
            if (monthlyInterestRate > 0) {
                monthlyPayment = principal * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenor)) / (Math.pow(1 + monthlyInterestRate, tenor) - 1);
            } else {
                // If interest rate is 0, simple division
                monthlyPayment = principal / tenor;
            }
            
            // Calculate total interest paid
            const totalPaid = monthlyPayment * tenor;
            const totalInterest = totalPaid - principal;
            
            // Update display
            document.getElementById('motorPriceDisplay').textContent = motorPrice.toLocaleString('id-ID');
            document.getElementById('dpDisplay').textContent = downPayment.toLocaleString('id-ID');
            document.getElementById('principalDisplay').textContent = principal.toLocaleString('id-ID');
            document.getElementById('interestDisplay').textContent = totalInterest.toLocaleString('id-ID');
            document.getElementById('totalFinancingDisplay').textContent = totalPaid.toLocaleString('id-ID');
            document.getElementById('tenorDisplay').textContent = tenor;
            document.getElementById('monthlyPaymentDisplay').textContent = Math.round(monthlyPayment).toLocaleString('id-ID');
            
            // Show results section
            document.getElementById('calculationResults').style.display = 'block';
            
            // Scroll to results
            document.getElementById('calculationResults').scrollIntoView({ behavior: 'smooth' });
        });
    }
});
</script>
@endsection