@extends('layouts.app')

@section('title', 'Simulasi Kredit Motor')

@section('content')
    <!-- Spacer to prevent navbar overlap -->
    {{-- <div style="height: 8rem; visibility: hidden;"></div> --}}

    <section class="credit-calculator" id="credit-calculator">
        <div class="container">
            <h1 class="heading text-center mb-5"><span>Simulasi</span> Kredit Motor</h1>

            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="card shadow-sm border-0 mb-4">
                        <div class="card-body p-4">
                            <h4 class="card-title fw-bold mb-4 fs-3">Hitung Cicilan Motor Impian Anda</h4>

                            <div class="mb-4 border-bottom pb-3">
                                <h5 class="fw-bold fs-4">Informasi Motor</h5>
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <div class="info-item">
                                            <div class="text-muted text-uppercase small">Nama Motor</div>
                                            <div class="fw-bold fs-4">{{ $motor->name }}</div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="info-item">
                                            <div class="text-muted text-uppercase small">Harga</div>
                                            <div class="fw-bold text-primary fs-4">Rp. {{ number_format($motor->price, 0, ',', '.') }},-</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <form id="creditCalculationForm" class="mb-4">
                                @csrf
                                <input type="hidden" name="motor_id" value="{{ $motor->id }}">

                                <div class="mb-3">
                                    <label for="down_payment" class="form-label fw-bold fs-5">Uang Muka (DP) - Rupiah</label>
                                    <input type="number" class="form-control form-control-lg" id="down_payment" name="down_payment"
                                        placeholder="Masukkan jumlah DP"
                                        value="{{ old('down_payment', $motor->price * 0.2) }}" min="0"
                                        max="{{ $motor->price }}" required>
                                    <div class="form-text fs-5">Minimal disarankan 20% dari harga motor (Rp. {{ number_format($motor->price * 0.2, 0, ',', '.') }},-)</div>
                                </div>

                                <div class="mb-3">
                                    <label for="tenor" class="form-label fw-bold fs-5">Tenor (lama cicilan)</label>
                                    <select class="form-select form-select-lg" id="tenor" name="tenor" required>
                                        <option value="12" {{ old('tenor') == 12 ? 'selected' : '' }}>12 Bulan</option>
                                        <option value="24" {{ old('tenor') == 24 ? 'selected' : '' }}>24 Bulan</option>
                                        <option value="36" {{ old('tenor') == 36 ? 'selected' : '' }}>36 Bulan</option>
                                        <option value="48" {{ old('tenor') == 48 ? 'selected' : '' }}>48 Bulan</option>
                                    </select>
                                </div>

                                <div class="mb-4">
                                    <label for="interest_rate" class="form-label fw-bold fs-5">Suku Bunga per Tahun (%)</label>
                                    <input type="number" step="0.01" class="form-control form-control-lg" id="interest_rate"
                                        name="interest_rate" placeholder="Contoh: 7.5 untuk 7.5%"
                                        value="{{ old('interest_rate', 7.5) }}" min="0" max="100" required>
                                </div>

                                <button type="submit" class="btn btn-primary btn-lg w-100 fs-4 py-3">
                                    <i class="fas fa-calculator me-2"></i>Hitung Cicilan
                                </button>
                            </form>

                            <!-- Results section -->
                            <div id="calculationResults" class="mt-4" style="display: none;">
                                <h4 class="fw-bold mb-4 fs-3">Hasil Simulasi Kredit</h4>

                                <div class="row g-4">
                                    <div class="col-md-6">
                                        <div class="card border-light h-100">
                                            <div class="card-body">
                                                <h5 class="card-title text-primary fw-bold fs-4">Rincian Pembiayaan</h5>
                                                <table class="table table-borderless">
                                                    <tr>
                                                        <td class="text-muted fs-4">Harga Motor</td>
                                                        <td class="text-end fw-bold fs-4">Rp. <span id="motorPriceDisplay"></span></td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-muted fs-4">Uang Muka (DP)</td>
                                                        <td class="text-end fw-bold fs-4">Rp. <span id="dpDisplay"></span></td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-muted fs-4">Biaya Pokok</td>
                                                        <td class="text-end fw-bold fs-4">Rp. <span id="principalDisplay"></span></td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-muted fs-4">Bunga</td>
                                                        <td class="text-end fw-bold fs-4">Rp. <span id="interestDisplay"></span></td>
                                                    </tr>
                                                    <tr class="border-top">
                                                        <td class="text-muted fw-bold fs-4">Total Pembiayaan</td>
                                                        <td class="text-end fw-bold fs-4">Rp. <span id="totalFinancingDisplay"></span></td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="card border-light h-100">
                                            <div class="card-body">
                                                <h5 class="card-title text-primary fw-bold fs-4">Rincian Cicilan</h5>
                                                <table class="table table-borderless">
                                                    <tr>
                                                        <td class="text-muted fs-4">Tenor</td>
                                                        <td class="text-end fw-bold fs-4"><span id="tenorDisplay"></span> Bulan</td>
                                                    </tr>
                                                    <tr class="border-top">
                                                        <td class="text-muted fw-bold fs-3">Cicilan per Bulan</td>
                                                        <td class="text-end fw-bold fs-3 text-primary">Rp. <span id="monthlyPaymentDisplay"></span></td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="alert alert-info mt-4">
                                    <i class="fas fa-info-circle me-2 fs-4"></i> 
                                    <span class="fs-4">Simulasi ini hanya perkiraan. Untuk informasi lebih lanjut mengenai syarat dan ketentuan kredit, silakan hubungi dealer kami.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-3 text-center">
                        <a href="{{ route('motors.show', $motor->id) }}" class="btn btn-outline-secondary btn-lg fs-4 py-2">
                            <i class="fas fa-arrow-left me-2"></i>Kembali ke Detail Motor
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection

@section('scripts')
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('creditCalculationForm');
            const resultsDiv = document.getElementById('calculationResults');

            if (form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();

                    // Get form values
                    const formData = new FormData(form);
                    const motorPrice = {{ $motor->price }};
                    const downPayment = parseFloat(formData.get('down_payment')) || 0;
                    const tenor = parseInt(formData.get('tenor'));
                    const interestRate = parseFloat(formData.get('interest_rate')) || 0;

                    // Validate inputs
                    if (downPayment < 0 || downPayment > motorPrice) {
                        alert('Uang muka tidak boleh kurang dari 0 atau lebih dari harga motor');
                        return;
                    }

                    if (isNaN(downPayment) || isNaN(tenor) || isNaN(interestRate)) {
                        alert('Harap isi semua field dengan benar');
                        return;
                    }

                    // Calculate loan amount (principal)
                    const principal = motorPrice - downPayment;

                    // Convert annual interest rate to monthly
                    const monthlyInterestRate = interestRate / 100 / 12;

                    // Calculate monthly payment using loan payment formula
                    // M = P [ r(1+r)^n ] / [ (1+r)^n - 1 ]
                    // M = Monthly payment, P = Principal, r = monthly interest rate, n = number of months
                    let monthlyPayment;
                    if (monthlyInterestRate > 0) {
                        monthlyPayment = principal * (monthlyInterestRate * Math.pow(1 +
                            monthlyInterestRate, tenor)) / (Math.pow(1 + monthlyInterestRate, tenor) -
                            1);
                    } else {
                        // If interest rate is 0, simple division
                        monthlyPayment = principal / tenor;
                    }

                    // Calculate total interest paid
                    const totalPaid = monthlyPayment * tenor;
                    const totalInterest = totalPaid - principal;

                    // Update display
                    document.getElementById('motorPriceDisplay').textContent = motorPrice.toLocaleString(
                        'id-ID');
                    document.getElementById('dpDisplay').textContent = downPayment.toLocaleString('id-ID');
                    document.getElementById('principalDisplay').textContent = principal.toLocaleString(
                        'id-ID');
                    document.getElementById('interestDisplay').textContent = totalInterest.toLocaleString(
                        'id-ID');
                    document.getElementById('totalFinancingDisplay').textContent = totalPaid.toLocaleString(
                        'id-ID');
                    document.getElementById('tenorDisplay').textContent = tenor;
                    document.getElementById('monthlyPaymentDisplay').textContent = Math.round(
                        monthlyPayment).toLocaleString('id-ID');

                    // Show results section with fade-in effect
                    resultsDiv.style.display = 'block';
                    resultsDiv.classList.add('fade-in');

                    // Scroll to results
                    resultsDiv.scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            }

            // Add input validation for DP field
            const dpInput = document.getElementById('down_payment');
            const maxDpValue = {{ $motor->price }};

            if (dpInput) {
                dpInput.addEventListener('change', function() {
                    const value = parseFloat(this.value) || 0;
                    if (value > maxDpValue) {
                        alert(`Uang muka tidak boleh lebih dari harga motor (Rp. ${maxDpValue.toLocaleString('id-ID')},-)`);
                        this.value = maxDpValue;
                    }
                    if (value < 0) {
                        this.value = 0;
                    }
                });
            }
        });
    </script>
@endsection

<style>
    .fade-in {
        animation: fadeIn 0.5s;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
</style>
