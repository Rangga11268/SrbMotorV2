<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <title>Kuitansi Pembayaran - SRB Motor</title>
    <style>
        /* A4 Setting for DomPDF */
        @page {
            size: A4;
            margin: 0;
        }

        /* Color Variables (Hardcoded for PDF compatibility) */
        :root {
            --primary-color: #1a4f9c; /* Deep Blue */
            --secondary-color: #f3f4f6; /* Light Gray */
            --accent-color: #e74c3c; /* Red for emphasis/stamps */
            --text-color: #2d3748;
            --muted-color: #718096;
            --border-color: #e2e8f0;
        }

        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            font-size: 13px; /* Slightly smaller for density, but scalable */
            line-height: 1.5;
            color: #2d3748;
            margin: 0;
            padding: 0;
            background: #fff;
        }

        /* Main Container with A4 margins logic */
        .page-container {
            padding: 50px 60px; /* Standard invoice margins */
            position: relative;
            height: 100vh; /* Approximate full height consideration */
        }

        /* Top Decorative Bar */
        .top-bar {
            width: 100%;
            height: 10px;
            background-color: #1a4f9c;
            position: absolute;
            top: 0;
            left: 0;
        }

        /* Header Section */
        .header {
            margin-bottom: 50px;
            width: 100%;
        }
        .logo-section {
            width: 60%;
            float: left;
        }
        .logo-text {
            font-size: 28px;
            font-weight: 800;
            color: #1a4f9c;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 5px;
        }
        .company-address {
            font-size: 11px;
            color: #718096;
            line-height: 1.4;
        }

        .invoice-details {
            width: 35%;
            float: right;
            text-align: right;
        }
        .invoice-title {
            font-size: 32px;
            font-weight: 100; /* Thin look */
            color: #cbd5e0;
            text-transform: uppercase;
            margin: 0 0 10px 0;
            line-height: 1;
        }
        .invoice-meta-table {
            width: 100%;
            text-align: right;
        }
        .meta-label {
            font-size: 11px;
            color: #718096;
            font-weight: bold;
            text-transform: uppercase;
            padding-right: 10px;
        }
        .meta-value {
            font-size: 13px;
            font-weight: bold;
            color: #2d3748;
        }

        /* Clearfix */
        .clearfix::after {
            content: "";
            clear: both;
            display: table;
        }

        /* Info Boxes */
        .info-section {
            margin-bottom: 40px;
            border-top: 2px solid #e2e8f0;
            padding-top: 30px;
        }
        .info-col {
            width: 46%;
            float: left;
        }
        .info-col-right {
            float: right;
            text-align: right; /* Aligned right for balance */
        }
        .section-title {
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
            color: #a0aec0;
            letter-spacing: 1.5px;
            margin-bottom: 15px;
            border-bottom: 1px solid #edf2f7;
            padding-bottom: 5px;
            display: inline-block;
        }
        .client-name {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
            color: #1a4f9c;
        }
        .client-address {
            font-size: 12px;
            color: #4a5568;
        }

        /* Main Table */
        .table-container {
            margin-bottom: 40px;
        }
        .custom-table {
            width: 100%;
            border-collapse: collapse;
        }
        .custom-table th {
            background-color: #f7fafc;
            color: #1a4f9c;
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            padding: 12px 15px;
            text-align: left;
            border-bottom: 2px solid #1a4f9c;
        }
        .custom-table td {
            padding: 15px;
            border-bottom: 1px solid #edf2f7;
            vertical-align: top;
        }
        .custom-table tr:nth-child(even) {
            background-color: #fbfdff;
        }
        .description-title {
            font-weight: bold;
            font-size: 14px;
            color: #2d3748;
            margin-bottom: 5px;
        }
        .description-sub {
            font-size: 11px;
            color: #718096;
        }

        /* Total Section */
        .total-container {
            width: 100%;
            margin-bottom: 50px;
        }
        .total-box {
            width: 40%;
            float: right;
            background-color: #1a4f9c;
            color: white;
            padding: 20px;
            border-radius: 4px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .total-row {
            display: table;
            width: 100%;
            margin-bottom: 5px;
        }
        .total-label {
            display: table-cell;
            font-size: 12px;
            text-transform: uppercase;
            opacity: 0.8;
            padding-right: 20px;
        }
        .total-value {
            display: table-cell;
            text-align: right;
            font-size: 24px;
            font-weight: bold;
            letter-spacing: 0.5px;
        }

        /* Visual Elements */
        .status-paid {
            position: absolute;
            top: 250px;
            right: 80px;
            font-family: 'Courier New', Courier, monospace;
            font-size: 60px;
            font-weight: 900;
            color: #48bb78; /* Green */
            border: 4px solid #48bb78;
            padding: 10px 40px;
            transform: rotate(-15deg);
            opacity: 0.15;
            z-index: 0;
            text-transform: uppercase;
            letter-spacing: 5px;
            user-select: none;
        }

        /* Footer */
        .footer {
            margin-top: 100px;
            border-top: 1px solid #e2e8f0;
            padding-top: 30px;
        }
        .footer-note {
            font-size: 11px;
            color: #718096;
            margin-bottom: 20px;
            font-style: italic;
        }
        .footer-bottom {
            width: 100%;
            font-size: 10px;
            color: #a0aec0;
            text-align: center;
        }
        .signature-area {
            width: 200px;
            float: right;
            text-align: center;
            margin-top: -80px; /* Pull up into the margin */
        }
        .signature-line {
            border-bottom: 1px solid #cbd5e0;
            margin: 60px 0 10px 0;
        }
        .signature-text {
            font-size: 11px;
            font-weight: bold;
            color: #1a4f9c;
        }

    </style>
</head>
<body>
    <div class="top-bar"></div>
    
    <div class="page-container">
        
        <!-- Watermark -->
        <div class="status-paid">LUNAS</div>

        <!-- Header -->
        <div class="header clearfix">
            <div class="logo-section">
                <div class="logo-text">SRB MOTOR</div>
                <div class="company-address">
                    Jl. Raya Motor No. 123, Jakarta, Indonesia<br>
                    License No: 998-8877-665<br>
                    www.srbmotor.com | support@srbmotor.com
                </div>
            </div>
            <div class="invoice-details">
                <h1 class="invoice-title">RECEIPT</h1>
                <table class="invoice-meta-table">
                    <tr>
                        <td class="meta-label">ID Kwitansi</td>
                        <td class="meta-value">#{{ $installment->id }}</td>
                    </tr>
                    <tr>
                        <td class="meta-label">Tanggal</td>
                        <td class="meta-value">{{ now()->format('d/m/Y') }}</td>
                    </tr>
                    <tr>
                        <td class="meta-label">Referensi</td>
                        <td class="meta-value">TRX-{{ $installment->transaction->id }}</td>
                    </tr>
                </table>
            </div>
        </div>

        <!-- Info Grid -->
        <div class="info-section clearfix">
            <div class="info-col">
                <div class="section-title">DITERIMA DARI</div>
                <div class="client-name">{{ $installment->transaction->user->name }}</div>
                <div class="client-address">
                    @if($installment->transaction->customer_phone)
                        {{ $installment->transaction->customer_phone }}<br>
                    @elseif($installment->transaction->user->phone)
                         {{ $installment->transaction->user->phone }}<br>
                    @endif
                    
                    @if($installment->transaction->user->email)
                        {{ $installment->transaction->user->email }}<br>
                    @endif
                    ID Pelanggan: CUST-{{ $installment->transaction->user_id }}
                </div>
            </div>
            <div class="info-col info-col-right" style="width: 40%;"> <!-- Slightly narrower to balance -->
                <div class="section-title">METODE PEMBAYARAN</div>
                <div class="client-name" style="font-size: 16px;">
                    {{ ucwords(str_replace(['_', 'midtrans'], [' ', ''], $installment->payment_method)) }}
                </div>
                <div class="client-address">
                    @if($installment->midtrans_booking_code)
                        Kode Booking: {{ $installment->midtrans_booking_code }}<br>
                    @endif
                    Waktu Bayar: {{ \Carbon\Carbon::parse($installment->paid_at)->format('d F Y, H:i') }} WIB
                </div>
            </div>
        </div>

        <!-- Items Table -->
        <div class="table-container">
            <table class="custom-table">
                <thead>
                    <tr>
                        <th width="5%">No</th>
                        <th width="65%">Deskripsi Pembayaran</th>
                        <th width="30%" style="text-align: right;">Jumlah (IDR)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>01.</td>
                        <td>
                            @php
                                $descTitle = "";
                                if ($installment->installment_number == 0) {
                                    $descTitle = ($installment->transaction->transaction_type === 'CASH') 
                                                ? 'Pembayaran Booking Fee Kendaraan' 
                                                : 'Pembayaran Uang Muka (DP) Kredit';
                                } else {
                                    $descTitle = 'Pembayaran Angsuran Kredit Ke-' . $installment->installment_number;
                                }
                            @endphp
                            
                            <div class="description-title">{{ $descTitle }}</div>
                            <div class="description-sub">
                                Unit: {{ $installment->transaction->motor->name }}<br>
                                Jatuh Tempo: {{ \Carbon\Carbon::parse($installment->due_date)->format('d F Y') }}
                                @if($installment->notes)
                                    <br>Catatan: {{ $installment->notes }}
                                @endif
                            </div>
                        </td>
                        <td style="text-align: right; font-weight: bold;">
                            Rp {{ number_format($installment->amount, 0, ',', '.') }}
                        </td>
                    </tr>
                    <!-- Adds some empty rows to fill visualization if needed, or keep clean -->
                </tbody>
            </table>
        </div>

        <!-- Total -->
        <div class="total-container clearfix">
            <div class="total-box">
                <div class="total-row">
                    <span class="total-label">Subtotal</span>
                    <span class="total-value" style="font-size: 16px;">Rp {{ number_format($installment->amount, 0, ',', '.') }}</span>
                </div>
                <div class="total-row" style="margin-top: 10px; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 10px;">
                    <span class="total-label">Total Dibayar</span>
                    <span class="total-value">Rp {{ number_format($installment->amount, 0, ',', '.') }}</span>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer clearfix">
            
            <div class="signature-area">
                <div class="signature-line"></div>
                <div class="signature-text">Finance Department</div>
                <div style="font-size: 9px; color: #a0aec0;">Generated electronically</div>
            </div>

            <div style="float: left; width: 60%;">
                <p class="footer-note">
                    <strong>Catatan Penting:</strong><br>
                    Simpan bukti pembayaran ini sebagai bukti transaksi yang sah. Harap hubungi layanan pelanggan jika terdapat kesalahan data.<br>
                    Syarat dan ketentuan berlaku.
                </p>
            </div>
            
            <div style="clear: both;"></div>
            
            <div class="footer-bottom">
                 &copy; {{ date('Y') }} SRB Motor. All rights reserved. System Generated Receipt.
            </div>
        </div>

    </div>
</body>
</html>
