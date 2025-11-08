<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice - {{ $transaction->id }}</title>
    
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        
        .header h1 {
            margin: 0;
            color: #043680;
        }
        
        .company-info {
            text-align: center;
            margin-bottom: 20px;
        }
        
        .invoice-details {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }
        
        .customer-info, .transaction-info {
            width: 45%;
        }
        
        .section-title {
            background-color: #043680;
            color: white;
            padding: 8px 12px;
            margin: 15px 0 10px 0;
            font-size: 16px;
        }
        
        .info-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        
        .info-table th, .info-table td {
            padding: 8px 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        
        .info-table th {
            background-color: #f5f5f5;
            font-weight: bold;
        }
        
        .motor-specs {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        
        .motor-specs th, .motor-specs td {
            padding: 8px 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        
        .motor-specs th {
            background-color: #f5f5f5;
            font-weight: bold;
        }
        
        .summary {
            margin-top: 20px;
        }
        
        .summary-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
        }
        
        .summary-label {
            font-weight: bold;
        }
        
        .total-row {
            border-top: 2px solid #333;
            margin-top: 5px;
            padding-top: 5px;
        }
        
        .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>INVOICE</h1>
        <div class="company-info">
            <h2>SRB Motors</h2>
            <p>Jl. Contoh Alamat No. 123, Kota</p>
            <p>Telepon: (021) 123-4567 | Email: info@srbmotors.com</p>
        </div>
    </div>

    <div class="invoice-details">
        <div class="customer-info">
            <h3>Informasi Pelanggan</h3>
            <table class="info-table">
                <tr>
                    <th>Nama:</th>
                    <td>{{ $transaction->customer_name ?? $transaction->user->name }}</td>
                </tr>
                <tr>
                    <th>Telepon:</th>
                    <td>{{ $transaction->customer_phone ?? $transaction->user->phone_number ?? '-' }}</td>
                </tr>
                <tr>
                    <th>Email:</th>
                    <td>{{ $transaction->user->email }}</td>
                </tr>
                <tr>
                    <th>Pekerjaan:</th>
                    <td>{{ $transaction->customer_occupation ?? '-' }}</td>
                </tr>
            </table>
        </div>
        
        <div class="transaction-info">
            <h3>Detail Transaksi</h3>
            <table class="info-table">
                <tr>
                    <th>Nomor Invoice:</th>
                    <td>{{ $transaction->id }}</td>
                </tr>
                <tr>
                    <th>Tanggal:</th>
                    <td>{{ $transaction->created_at->format('d M Y') }}</td>
                </tr>
                <tr>
                    <th>Jenis Transaksi:</th>
                    <td>{{ $transaction->transaction_type === 'CASH' ? 'Tunai' : 'Kredit' }}</td>
                </tr>
                <tr>
                    <th>Status:</th>
                    <td>{{ $transaction->status_text }}</td>
                </tr>
            </table>
        </div>
    </div>

    <div class="section-title">Detail Motor</div>
    <table class="info-table">
        <tr>
            <th>Nama Motor:</th>
            <td>{{ $transaction->motor->name }}</td>
        </tr>
        <tr>
            <th>Merek:</th>
            <td>{{ $transaction->motor->brand }}</td>
        </tr>
        <tr>
            <th>Model:</th>
            <td>{{ $transaction->motor->model ?? '-' }}</td>
        </tr>
        <tr>
            <th>Tahun:</th>
            <td>{{ $transaction->motor->year ?? '-' }}</td>
        </tr>
        <tr>
            <th>Tipe:</th>
            <td>{{ $transaction->motor->type ?? '-' }}</td>
        </tr>
    </table>

    <div class="section-title">Spesifikasi Motor</div>
    <table class="motor-specs">
        <thead>
            <tr>
                <th>Spesifikasi</th>
                <th>Nilai</th>
            </tr>
        </thead>
        <tbody>
            @foreach($transaction->motor->specifications as $spec)
            <tr>
                <td>{{ $spec->spec_key }}</td>
                <td>{{ $spec->spec_value }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    @if($transaction->transaction_type === 'CREDIT' && $transaction->creditDetail)
    <div class="section-title">Detail Kredit</div>
    <table class="info-table">
        <tr>
            <th>Uang Muka (DP):</th>
            <td>Rp {{ number_format($transaction->creditDetail->down_payment, 2, ',', '.') }}</td>
        </tr>
        <tr>
            <th>Tenor:</th>
            <td>{{ $transaction->creditDetail->tenor }} bulan</td>
        </tr>
        <tr>
            <th>Angsuran Bulanan:</th>
            <td>Rp {{ number_format($transaction->creditDetail->monthly_installment, 2, ',', '.') }}</td>
        </tr>
        <tr>
            <th>Jumlah Disetujui:</th>
            <td>Rp {{ number_format($transaction->creditDetail->approved_amount ?? 0, 2, ',', '.') }}</td>
        </tr>
        <tr>
            <th>Status Kredit:</th>
            <td>{{ $transaction->creditDetail->credit_status_text }}</td>
        </tr>
    </table>
    @endif

    <div class="section-title">Ringkasan Pembayaran</div>
    <div class="summary">
        <div class="summary-row">
            <span>Harga Motor:</span>
            <span>Rp {{ number_format($transaction->motor->price, 2, ',', '.') }}</span>
        </div>
        @if($transaction->booking_fee)
        <div class="summary-row">
            <span>Booking Fee:</span>
            <span>Rp {{ number_format($transaction->booking_fee, 2, ',', '.') }}</span>
        </div>
        @endif
        <div class="summary-row total-row">
            <span class="summary-label">Total:</span>
            <span class="summary-label">Rp {{ number_format($transaction->total_amount, 2, ',', '.') }}</span>
        </div>
    </div>

    <div class="footer">
        <p>Terima kasih telah mempercayai SRB Motors</p>
        <p>Invoice ini dicetak pada {{ now()->format('d M Y H:i') }}</p>
    </div>
</body>
</html>