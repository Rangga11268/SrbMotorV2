@extends('layouts.admin')

@section('title', 'Edit Transaksi #' . $transaction->id)

@section('content')
<div class="container-fluid">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="h3 text-gray-800">Edit Transaksi #{{ $transaction->id }}</h1>
        <a href="{{ route('admin.transactions.show', $transaction->id) }}" class="btn btn-secondary">Kembali</a>
    </div>

    <div class="row">
        <div class="col-xl-8 col-lg-7">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Edit Transaksi</h6>
                </div>
                <div class="card-body">
                    <form action="{{ route('admin.transactions.update', $transaction->id) }}" method="POST">
                        @csrf
                        @method('PUT')
                        
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="user_id" class="form-label">Pelanggan</label>
                                    <select name="user_id" id="user_id" class="form-control" required>
                                        @foreach($users as $user)
                                            <option value="{{ $user->id }}" {{ $transaction->user_id == $user->id ? 'selected' : '' }}>
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
                                        @foreach($motors as $motor)
                                            <option value="{{ $motor->id }}" {{ $transaction->motor_id == $motor->id ? 'selected' : '' }}>
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
                                        <option value="CASH" {{ $transaction->transaction_type === 'CASH' ? 'selected' : '' }}>Tunai</option>
                                        <option value="CREDIT" {{ $transaction->transaction_type === 'CREDIT' ? 'selected' : '' }}>Kredit</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="status" class="form-label">Status</label>
                                    <select name="status" id="status" class="form-control" required>
                                        @if($transaction->transaction_type === 'CASH')
                                            <option value="new_order" {{ $transaction->status === 'new_order' ? 'selected' : '' }}>Pesanan Baru</option>
                                            <option value="waiting_payment" {{ $transaction->status === 'waiting_payment' ? 'selected' : '' }}>Menunggu Pembayaran</option>
                                            <option value="payment_confirmed" {{ $transaction->status === 'payment_confirmed' ? 'selected' : '' }}>Pembayaran Dikonfirmasi</option>
                                            <option value="unit_preparation" {{ $transaction->status === 'unit_preparation' ? 'selected' : '' }}>Persiapan Unit</option>
                                            <option value="ready_for_delivery" {{ $transaction->status === 'ready_for_delivery' ? 'selected' : '' }}>Siap Dikirim</option>
                                            <option value="completed" {{ $transaction->status === 'completed' ? 'selected' : '' }}>Selesai</option>
                                        @else
                                            <option value="menunggu_persetujuan" {{ $transaction->status === 'menunggu_persetujuan' ? 'selected' : '' }}>Menunggu Persetujuan</option>
                                            <option value="data_tidak_valid" {{ $transaction->status === 'data_tidak_valid' ? 'selected' : '' }}>Data Tidak Valid</option>
                                            <option value="dikirim_ke_surveyor" {{ $transaction->status === 'dikirim_ke_surveyor' ? 'selected' : '' }}>Dikirim ke Surveyor</option>
                                            <option value="jadwal_survey" {{ $transaction->status === 'jadwal_survey' ? 'selected' : '' }}>Jadwal Survey</option>
                                            <option value="disetujui" {{ $transaction->status === 'disetujui' ? 'selected' : '' }}>Disetujui</option>
                                            <option value="ditolak" {{ $transaction->status === 'ditolak' ? 'selected' : '' }}>Ditolak</option>
                                        @endif
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <label for="notes" class="form-label">Catatan</label>
                            <textarea name="notes" id="notes" class="form-control">{{ old('notes', $transaction->notes) }}</textarea>
                        </div>
                        
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="booking_fee" class="form-label">Booking Fee (Rp)</label>
                                    <input type="number" name="booking_fee" id="booking_fee" class="form-control" 
                                           value="{{ old('booking_fee', $transaction->booking_fee) }}" min="0" step="any">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="total_amount" class="form-label">Total Jumlah (Rp)</label>
                                    <input type="number" name="total_amount" id="total_amount" class="form-control" 
                                           value="{{ old('total_amount', $transaction->total_amount) }}" min="0" step="any" required>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="payment_method" class="form-label">Metode Pembayaran</label>
                                    <select name="payment_method" id="payment_method" class="form-control">
                                        <option value="">Pilih Metode</option>
                                        <option value="cash" {{ $transaction->payment_method === 'cash' ? 'selected' : '' }}>Cash</option>
                                        <option value="transfer" {{ $transaction->payment_method === 'transfer' ? 'selected' : '' }}>Transfer</option>
                                        <option value="credit_card" {{ $transaction->payment_method === 'credit_card' ? 'selected' : '' }}>Kartu Kredit</option>
                                        <option value="installment" {{ $transaction->payment_method === 'installment' ? 'selected' : '' }}>Cicilan</option>
                                        <option value="leasing" {{ $transaction->payment_method === 'leasing' ? 'selected' : '' }}>Leasing</option>
                                        <option value="bank" {{ $transaction->payment_method === 'bank' ? 'selected' : '' }}>Bank</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="payment_status" class="form-label">Status Pembayaran</label>
                                    <select name="payment_status" id="payment_status" class="form-control">
                                        <option value="pending" {{ $transaction->payment_status === 'pending' ? 'selected' : '' }}>Pending</option>
                                        <option value="confirmed" {{ $transaction->payment_status === 'confirmed' ? 'selected' : '' }}>Confirmed</option>
                                        <option value="failed" {{ $transaction->payment_status === 'failed' ? 'selected' : '' }}>Failed</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Credit Detail Section (only visible if transaction type is CREDIT) -->
                        <div id="credit-detail-section" style="{{ $transaction->transaction_type === 'CREDIT' ? 'display:block;' : 'display:none;' }}">
                            <h5 class="mt-4 mb-3">Detail Kredit</h5>
                            
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="credit_detail[down_payment]" class="form-label">Uang Muka (DP) (Rp)</label>
                                        <input type="number" name="credit_detail[down_payment]" id="credit_detail_down_payment" class="form-control" 
                                               value="{{ old('credit_detail.down_payment', $transaction->creditDetail->down_payment ?? 0) }}" min="0" step="any">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="credit_detail[tenor]" class="form-label">Tenor (Bulan)</label>
                                        <input type="number" name="credit_detail[tenor]" id="credit_detail_tenor" class="form-control" 
                                               value="{{ old('credit_detail.tenor', $transaction->creditDetail->tenor ?? 12) }}" min="1" max="60">
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="credit_detail[monthly_installment]" class="form-label">Cicilan/Bulan (Rp)</label>
                                        <input type="number" name="credit_detail[monthly_installment]" id="credit_detail_monthly_installment" class="form-control" 
                                               value="{{ old('credit_detail.monthly_installment', $transaction->creditDetail->monthly_installment ?? 0) }}" min="0" step="any">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="credit_detail[credit_status]" class="form-label">Status Kredit</label>
                                        <select name="credit_detail[credit_status]" id="credit_detail_credit_status" class="form-control">
                                            <option value="menunggu_persetujuan" {{ ($transaction->creditDetail->credit_status ?? 'menunggu_persetujuan') === 'menunggu_persetujuan' ? 'selected' : '' }}>Menunggu Persetujuan</option>
                                            <option value="data_tidak_valid" {{ ($transaction->creditDetail->credit_status ?? 'menunggu_persetujuan') === 'data_tidak_valid' ? 'selected' : '' }}>Data Tidak Valid</option>
                                            <option value="dikirim_ke_surveyor" {{ ($transaction->creditDetail->credit_status ?? 'menunggu_persetujuan') === 'dikirim_ke_surveyor' ? 'selected' : '' }}>Dikirim ke Surveyor</option>
                                            <option value="jadwal_survey" {{ ($transaction->creditDetail->credit_status ?? 'menunggu_persetujuan') === 'jadwal_survey' ? 'selected' : '' }}>Jadwal Survey</option>
                                            <option value="disetujui" {{ ($transaction->creditDetail->credit_status ?? 'menunggu_persetujuan') === 'disetujui' ? 'selected' : '' }}>Disetujui</option>
                                            <option value="ditolak" {{ ($transaction->creditDetail->credit_status ?? 'menunggu_persetujuan') === 'ditolak' ? 'selected' : '' }}>Ditolak</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="mb-3">
                                <label for="credit_detail[approved_amount]" class="form-label">Jumlah Disetujui (Rp)</label>
                                <input type="number" name="credit_detail[approved_amount]" id="credit_detail_approved_amount" class="form-control" 
                                       value="{{ old('credit_detail.approved_amount', $transaction->creditDetail->approved_amount ?? 0) }}" min="0" step="any">
                            </div>
                        </div>
                        
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button type="submit" class="btn btn-primary">Update Transaksi</button>
                            <a href="{{ route('admin.transactions.show', $transaction->id) }}" class="btn btn-secondary">Batal</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="col-xl-4 col-lg-5">
            <!-- Transaction Summary -->
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Ringkasan Transaksi</h6>
                </div>
                <div class="card-body">
                    <h5 class="card-title">{{ $transaction->motor->name }}</h5>
                    <p class="card-text">
                        <strong>Pelanggan:</strong> {{ $transaction->user->name }}<br>
                        <strong>Motor:</strong> {{ $transaction->motor->brand }} {{ $transaction->motor->model }}<br>
                        <strong>Total:</strong> Rp {{ number_format($transaction->total_amount, 0, ',', '.') }}<br>
                        <strong>Status:</strong> 
                        <span class="badge bg-{{ 
                            (in_array($transaction->status, ['completed', 'disetujui', 'ready_for_delivery']) ? 'success' : 
                            (in_array($transaction->status, ['menunggu_persetujuan', 'new_order', 'waiting_payment']) ? 'warning' : 
                            (in_array($transaction->status, ['ditolak', 'data_tidak_valid']) ? 'danger' : 'info'))) 
                        }}">
                            {{ $transaction->status }}
                        </span>
                    </p>
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
});
</script>
@endsection