<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Kuitansi Pembayaran</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            color: #333;
        }
        .container {
            width: 100%;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #ddd;
            padding-bottom: 20px;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #4a90e2;
        }
        .receipt-title {
            font-size: 18px;
            font-weight: bold;
            margin-top: 10px;
            text-transform: uppercase;
        }
        .details-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .details-table td {
            padding: 8px;
            vertical-align: top;
        }
        .label {
            font-weight: bold;
            width: 150px;
        }
        .amount-row {
            background-color: #f9f9f9;
            font-weight: bold;
            font-size: 16px;
        }
        .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: #888;
        }
        .status-stamp {
            border: 2px solid #28a745;
            color: #28a745;
            padding: 10px;
            display: inline-block;
            transform: rotate(-5deg);
            font-weight: bold;
            font-size: 20px;
            position: absolute;
            right: 50px;
            top: 150px;
            opacity: 0.8;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">SRB Motor</div>
            <div>Jl. Raya Motor No. 123, Indonesia</div>
            <div class="receipt-title">Bukti Pembayaran Angsuran</div>
        </div>

        <div class="status-stamp">LUNAS</div>

        <table class="details-table">
            <tr>
                <td class="label">No. Transaksi</td>
                <td>: {{ $installment->transaction->id }} / INST-{{ $installment->id }}</td>
            </tr>
            <tr>
                <td class="label">Tanggal Bayar</td>
                <td>: {{ \Carbon\Carbon::parse($installment->paid_at)->format('d F Y H:i') }}</td>
            </tr>
            <tr>
                <td class="label">Nama Pelanggan</td>
                <td>: {{ $installment->transaction->user->name }}</td>
            </tr>
            <tr>
                <td class="label">Unit Motor</td>
                <td>: {{ $installment->transaction->motor->name }}</td>
            </tr>
            <tr>
                <td class="label">Angsuran Ke</td>
                <td>: {{ $installment->installment_number }}</td>
            </tr>
            <tr>
                <td class="label">Metode Pembayaran</td>
                <td>: {{ strtoupper(str_replace('_', ' ', $installment->payment_method)) }}</td>
            </tr>
        </table>

        <table class="details-table" style="border-top: 1px solid #ddd;">
            <tr class="amount-row">
                <td class="label" style="padding-top: 20px;">TOTAL BAYAR</td>
                <td style="padding-top: 20px;">: Rp {{ number_format($installment->amount, 0, ',', '.') }}</td>
            </tr>
        </table>

        <div class="footer">
            <p>Terima kasih atas pembayaran Anda.</p>
            <p>Bukti pembayaran ini sah dan diterbitkan secara otomatis oleh sistem.</p>
            <small>Dicetak pada: {{ now()->format('d F Y H:i') }}</small>
        </div>
    </div>
</body>
</html>
