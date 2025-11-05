@extends('layouts.admin')

@section('title', 'Buat Transaksi Baru')

@section('content')
<div class="container-fluid">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="h3 text-gray-800">Buat Transaksi Baru</h1>
        <a href="{{ route('admin.transactions.index') }}" class="btn btn-secondary">Kembali</a>
    </div>

    <div class="row">
        <div class="col-xl-8 col-lg-7">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Form Transaksi Baru</h6>
                </div>
                <div class="card-body">
                    <form action="{{ route('admin.transactions.store') }}" method="POST">
                        @csrf
                        
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="user_id" class="form-label">Pelanggan</label>
                                    <select name="user_id" id="user_id" class="form-control" required>
                                        <option value="">Pilih Pelanggan</option>
                                        @foreach($users as $user)
                                            <option value="{{ $user->id }}" {{ old('user_id') == $user->id ? 'selected' : '' }}>
                                                {{ $user->name }} ({{ $user->email }})
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="motor_id" class="form-label">Motor</label>
                                    <select name="motor_id" id="motor_id" class="form-control" required>
                                        <option value="">Pilih Motor</option>
                                        @foreach($motors as $motor)
                                            <option value="{{ $motor->id }}" {{ old('motor_id') == $motor->id ? 'selected' : '' }}>
                                                {{ $motor->name }} (Rp {{ number_format($motor->price, 0, ',', '.') }})
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="transaction_type" class="form-label">Tipe Transaksi</label>
                                    <select name="transaction_type" id="transaction_type" class="form-control" required>
                                        <option value="">Pilih Tipe</option>
                                        <option value="CASH" {{ old('transaction_type') === 'CASH' ? 'selected' : '' }}>Tunai</option>
                                        <option value="CREDIT" {{ old('transaction_type') === 'CREDIT' ? 'selected' : '' }}>Kredit</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="status" class="form-label">Status</label>
                                    <select name="status" id="status" class="form-control" required>
                                        <option value="">Pilih Status</option>
                                        <option value="NEW_ORDER" {{ old('status') === 'NEW_ORDER' ? 'selected' : '' }}>NEW_ORDER</option>
                                        <option value="WAITING_PAYMENT" {{ old('status') === 'WAITING_PAYMENT' ? 'selected' : '' }}>WAITING_PAYMENT</option>
                                        <option value="PENDING_REVIEW" {{ old('status') === 'PENDING_REVIEW' ? 'selected' : '' }}>PENDING_REVIEW</option>
                                        <option value="DATA_INVALID" {{ old('status') === 'DATA_INVALID' ? 'selected' : '' }}>DATA_INVALID</option>
                                        <option value="SUBMITTED_TO_SURVEYOR" {{ old('status') === 'SUBMITTED_TO_SURVEYOR' ? 'selected' : '' }}>SUBMITTED_TO_SURVEYOR</option>
                                        <option value="SURVEY_SCHEDULED" {{ old('status') === 'SURVEY_SCHEDULED' ? 'selected' : '' }}>SURVEY_SCHEDULED</option>
                                        <option value="APPROVED" {{ old('status') === 'APPROVED' ? 'selected' : '' }}>APPROVED</option>
                                        <option value="REJECTED" {{ old('status') === 'REJECTED' ? 'selected' : '' }}>REJECTED</option>
                                        <option value="READY_FOR_DELIVERY" {{ old('status') === 'READY_FOR_DELIVERY' ? 'selected' : '' }}>READY_FOR_DELIVERY</option>
                                        <option value="COMPLETED" {{ old('status') === 'COMPLETED' ? 'selected' : '' }}>COMPLETED</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <label for="notes" class="form-label">Catatan</label>
                            <textarea name="notes" id="notes" class="form-control">{{ old('notes') }}</textarea>
                        </div>
                        
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="booking_fee" class="form-label">Booking Fee (Rp)</label>
                                    <input type="number" name="booking_fee" id="booking_fee" class="form-control" 
                                           value="{{ old('booking_fee', 0) }}" min="0" step="1000">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="total_amount" class="form-label">Total Jumlah (Rp)</label>
                                    <input type="number" name="total_amount" id="total_amount" class="form-control" 
                                           value="{{ old('total_amount') }}" min="0" step="1000" required>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="payment_method" class="form-label">Metode Pembayaran</label>
                                    <select name="payment_method" id="payment_method" class="form-control">
                                        <option value="">Pilih Metode</option>
                                        <option value="cash" {{ old('payment_method') === 'cash' ? 'selected' : '' }}>Cash</option>
                                        <option value="transfer" {{ old('payment_method') === 'transfer' ? 'selected' : '' }}>Transfer</option>
                                        <option value="credit_card" {{ old('payment_method') === 'credit_card' ? 'selected' : '' }}>Kartu Kredit</option>
                                        <option value="installment" {{ old('payment_method') === 'installment' ? 'selected' : '' }}>Cicilan</option>
                                        <option value="leasing" {{ old('payment_method') === 'leasing' ? 'selected' : '' }}>Leasing</option>
                                        <option value="bank" {{ old('payment_method') === 'bank' ? 'selected' : '' }}>Bank</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="payment_status" class="form-label">Status Pembayaran</label>
                                    <select name="payment_status" id="payment_status" class="form-control">
                                        <option value="pending" {{ old('payment_status') === 'pending' ? 'selected' : '' }}>Pending</option>
                                        <option value="confirmed" {{ old('payment_status', 'pending') === 'confirmed' ? 'selected' : '' }}>Confirmed</option>
                                        <option value="failed" {{ old('payment_status') === 'failed' ? 'selected' : '' }}>Failed</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Credit Detail Section (only visible if transaction type is CREDIT) -->
                        <div id="credit-detail-section" style="display: none;">
                            <h5 class="mt-4 mb-3">Detail Kredit</h5>
                            
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="credit_detail_down_payment" class="form-label">Uang Muka (DP) (Rp)</label>
                                        <input type="number" name="credit_detail[down_payment]" id="credit_detail_down_payment" class="form-control" 
                                               value="{{ old('credit_detail.down_payment', 0) }}" min="0" step="1000">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="credit_detail_tenor" class="form-label">Tenor (Bulan)</label>
                                        <input type="number" name="credit_detail[tenor]" id="credit_detail_tenor" class="form-control" 
                                               value="{{ old('credit_detail.tenor', 12) }}" min="1" max="60">
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="credit_detail_monthly_installment" class="form-label">Cicilan/Bulan (Rp)</label>
                                        <input type="number" name="credit_detail[monthly_installment]" id="credit_detail_monthly_installment" class="form-control" 
                                               value="{{ old('credit_detail.monthly_installment', 0) }}" min="0" step="1000">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="credit_detail_credit_status" class="form-label">Status Kredit</label>
                                        <select name="credit_detail[credit_status]" id="credit_detail_credit_status" class="form-control">
                                            <option value="PENDING_REVIEW" {{ old('credit_detail.credit_status', 'PENDING_REVIEW') === 'PENDING_REVIEW' ? 'selected' : '' }}>PENDING_REVIEW</option>
                                            <option value="DATA_INVALID" {{ old('credit_detail.credit_status') === 'DATA_INVALID' ? 'selected' : '' }}>DATA_INVALID</option>
                                            <option value="SUBMITTED_TO_SURVEYOR" {{ old('credit_detail.credit_status') === 'SUBMITTED_TO_SURVEYOR' ? 'selected' : '' }}>SUBMITTED_TO_SURVEYOR</option>
                                            <option value="SURVEY_SCHEDULED" {{ old('credit_detail.credit_status') === 'SURVEY_SCHEDULED' ? 'selected' : '' }}>SURVEY_SCHEDULED</option>
                                            <option value="APPROVED" {{ old('credit_detail.credit_status') === 'APPROVED' ? 'selected' : '' }}>APPROVED</option>
                                            <option value="REJECTED" {{ old('credit_detail.credit_status') === 'REJECTED' ? 'selected' : '' }}>REJECTED</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="mb-3">
                                <label for="credit_detail_approved_amount" class="form-label">Jumlah Disetujui (Rp)</label>
                                <input type="number" name="credit_detail[approved_amount]" id="credit_detail_approved_amount" class="form-control" 
                                       value="{{ old('credit_detail.approved_amount', 0) }}" min="0" step="1000">
                            </div>
                        </div>
                        
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button type="submit" class="btn btn-primary">Buat Transaksi</button>
                            <a href="{{ route('admin.transactions.index') }}" class="btn btn-secondary">Batal</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="col-xl-4 col-lg-5">
            <!-- Instructions -->
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Petunjuk</h6>
                </div>
                <div class="card-body">
                    <p>Gunakan form ini untuk membuat transaksi baru secara manual.</p>
                    <p>Form ini memungkinkan pembuatan transaksi tunai atau kredit sesuai kebutuhan.</p>
                    <p>Jika transaksi adalah kredit, detail kredit akan muncul setelah memilih tipe transaksi kredit.</p>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const transactionTypeSelect = document.getElementById('transaction_type');
    const creditDetailSection = document.getElementById('credit-detail-section');
    
    transactionTypeSelect.addEventListener('change', function() {
        if (this.value === 'CREDIT') {
            creditDetailSection.style.display = 'block';
        } else {
            creditDetailSection.style.display = 'none';
        }
    });
    
    // Update total amount when motor is selected
    const motorSelect = document.getElementById('motor_id');
    const totalAmountInput = document.getElementById('total_amount');
    
    motorSelect.addEventListener('change', function() {
        const selectedOption = motorSelect.options[motorSelect.selectedIndex];
        const price = selectedOption.text.match(/Rp ([\d,]+)/);
        if (price) {
            const number = parseInt(price[1].replace(/,/g, ''));
            totalAmountInput.value = number;
        }
    });
});
</script>
@endsection