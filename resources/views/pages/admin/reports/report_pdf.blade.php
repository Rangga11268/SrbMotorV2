<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laporan - {{ $report['title'] }}</title>
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'DejaVu Sans', 'Arial', sans-serif;
            font-size: 10pt;
            line-height: 1.5;
            color: #333;
            padding: 20px;
        }
        
        /* Header Company */
        .company-header {
            width: 100%;
            margin-bottom: 20px;
            border-bottom: 3px solid #043680;
            padding-bottom: 15px;
        }
        
        .company-header h1 {
            color: #043680;
            font-size: 24pt;
            margin-bottom: 5px;
            text-align: center;
        }
        
        .company-header h2 {
            color: #043680;
            font-size: 16pt;
            margin-bottom: 10px;
            text-align: center;
        }
        
        .company-info {
            text-align: center;
            font-size: 9pt;
            color: #666;
        }
        
        .company-info p {
            margin: 2px 0;
        }
        
        /* Report Meta */
        .report-meta {
            background-color: #f8f9fa;
            border: 2px solid #043680;
            padding: 15px;
            margin-bottom: 20px;
        }
        
        .report-meta h3 {
            color: #043680;
            font-size: 14pt;
            margin-bottom: 10px;
            border-bottom: 2px solid #ffc107;
            padding-bottom: 5px;
        }
        
        .info-table {
            width: 100%;
            border-collapse: collapse;
        }
        
        .info-table th {
            width: 30%;
            padding: 8px 10px;
            text-align: left;
            font-weight: bold;
            background-color: #e3f2fd;
            color: #043680;
            border: 1px solid #90caf9;
        }
        
        .info-table td {
            padding: 8px 10px;
            border: 1px solid #ddd;
        }
        
        /* Section Title */
        .section-title {
            background-color: #043680;
            color: white;
            padding: 10px 15px;
            margin: 20px 0 10px 0;
            font-size: 12pt;
            font-weight: bold;
        }
        
        /* Summary Cards Table */
        .summary-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        
        .summary-table td {
            width: 25%;
            padding: 12px;
            text-align: center;
            border: 2px solid #043680;
            background-color: #e3f2fd;
        }
        
        .summary-table .card-title {
            font-size: 9pt;
            color: #666;
            margin-bottom: 8px;
            font-weight: normal;
        }
        
        .summary-table .card-value {
            font-size: 14pt;
            color: #043680;
            font-weight: bold;
        }
        
        /* Data Table */
        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        
        .data-table thead {
            background-color: #043680;
            color: white;
        }
        
        .data-table th {
            padding: 10px;
            text-align: left;
            font-weight: bold;
            border: 1px solid #043680;
        }
        
        .data-table td {
            padding: 8px 10px;
            border: 1px solid #ddd;
        }
        
        .data-table tbody tr:nth-child(even) {
            background-color: #f8f9fa;
        }
        
        .data-table tbody tr td:first-child {
            font-weight: bold;
            color: #043680;
        }
        
        .text-center {
            text-align: center;
        }
        
        .text-right {
            text-align: right;
        }
        
        /* Footer */
        .report-footer {
            margin-top: 30px;
            padding-top: 15px;
            border-top: 2px solid #043680;
            text-align: center;
            font-size: 9pt;
            color: #666;
        }
        
        /* Page breaks */
        .page-break {
            page-break-after: always;
        }
        
        h3, .section-title {
            page-break-after: avoid;
        }
        
        .data-table {
            page-break-inside: auto;
        }
        
        .data-table tr {
            page-break-inside: avoid;
            page-break-after: auto;
        }
    </style>
</head>
<body>
    <!-- Company Header -->
    <div class="company-header">
        <h1>LAPORAN {{ strtoupper($report['title']) }}</h1>
        <h2>SRB Motors</h2>
        <div class="company-info">
            <p>Dealer Motor Terpercaya</p>
            <p>Jl. Contoh Alamat No. 123, Kota</p>
            <p>Telepon: (021) 123-4567 | Email: info@srbmotors.com</p>
        </div>
    </div>

    <!-- Report Meta -->
    <div class="report-meta">
        <h3>{{ $report['title'] }}</h3>
        <table class="info-table">
            <tr>
                <th>Jenis Laporan</th>
                <td>{{ ucfirst($report['type']) }}</td>
            </tr>
            <tr>
                <th>Periode</th>
                <td>{{ $report['start_date'] }} sampai {{ $report['end_date'] }}</td>
            </tr>
            <tr>
                <th>Dibuat Pada</th>
                <td>{{ $report['description'] }}</td>
            </tr>
        </table>
    </div>

    @if($report['type'] === 'sales')
        <div class="section-title">RINGKASAN PENJUALAN</div>
        
        <table class="summary-table">
            <tr>
                <td>
                    <div class="card-title">Total Transaksi</div>
                    <div class="card-value">{{ $report['data']['total_transactions'] ?? 0 }}</div>
                </td>
                <td>
                    <div class="card-title">Total Pendapatan</div>
                    <div class="card-value">Rp {{ number_format($report['data']['total_revenue'] ?? 0, 0, ',', '.') }}</div>
                </td>
                <td>
                    <div class="card-title">Transaksi Tunai</div>
                    <div class="card-value">{{ $report['data']['cash_transactions'] ?? 0 }}</div>
                </td>
                <td>
                    <div class="card-title">Transaksi Kredit</div>
                    <div class="card-value">{{ $report['data']['credit_transactions'] ?? 0 }}</div>
                </td>
            </tr>
        </table>

        <div class="section-title">PENJUALAN BERDASARKAN MEREK MOTOR</div>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Merek Motor</th>
                    <th>Jumlah Transaksi</th>
                    <th>Total Pendapatan</th>
                </tr>
            </thead>
            <tbody>
                @forelse($report['data']['by_brand'] ?? [] as $brand => $stats)
                <tr>
                    <td><strong>{{ $brand }}</strong></td>
                    <td>{{ $stats['count'] }}</td>
                    <td>Rp {{ number_format($stats['revenue'], 0, ',', '.') }}</td>
                </tr>
                @empty
                <tr>
                    <td colspan="3" class="text-center">Tidak ada data</td>
                </tr>
                @endforelse
            </tbody>
        </table>

    @elseif($report['type'] === 'income')
        <div class="section-title">RINGKASAN PENDAPATAN</div>
        
        <table class="summary-table">
            <tr>
                <td>
                    <div class="card-title">Total Pendapatan</div>
                    <div class="card-value">Rp {{ number_format($report['data']['total_income'] ?? 0, 0, ',', '.') }}</div>
                </td>
                <td>
                    <div class="card-title">Pendapatan Tunai</div>
                    <div class="card-value">Rp {{ number_format($report['data']['cash_income'] ?? 0, 0, ',', '.') }}</div>
                </td>
                <td>
                    <div class="card-title">Pendapatan Kredit</div>
                    <div class="card-value">Rp {{ number_format($report['data']['credit_income'] ?? 0, 0, ',', '.') }}</div>
                </td>
                <td></td>
            </tr>
        </table>

        <div class="section-title">PENDAPATAN BERDASARKAN BULAN</div>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Bulan</th>
                    <th>Total Pendapatan</th>
                    <th>Pendapatan Tunai</th>
                    <th>Pendapatan Kredit</th>
                </tr>
            </thead>
            <tbody>
                @forelse($report['data']['by_month'] ?? [] as $month => $stats)
                <tr>
                    <td><strong>{{ \Carbon\Carbon::parse($month)->format('M Y') }}</strong></td>
                    <td>Rp {{ number_format($stats['total'] ?? 0, 0, ',', '.') }}</td>
                    <td>Rp {{ number_format($stats['cash'] ?? 0, 0, ',', '.') }}</td>
                    <td>Rp {{ number_format($stats['credit'] ?? 0, 0, ',', '.') }}</td>
                </tr>
                @empty
                <tr>
                    <td colspan="4" class="text-center">Tidak ada data</td>
                </tr>
                @endforelse
            </tbody>
        </table>

    @elseif($report['type'] === 'customer')
        <div class="section-title">RINGKASAN PELANGGAN</div>
        
        <table class="summary-table">
            <tr>
                <td>
                    <div class="card-title">Total Pelanggan</div>
                    <div class="card-value">{{ $report['data']['total_customers'] ?? 0 }}</div>
                </td>
                <td>
                    <div class="card-title">Pelanggan Baru</div>
                    <div class="card-value">{{ $report['data']['new_customers'] ?? 0 }}</div>
                </td>
                <td></td>
                <td></td>
            </tr>
        </table>

        <div class="section-title">PELANGGAN TERATAS (TOP 10)</div>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Jumlah Transaksi</th>
                    <th>Total Dibelanjakan</th>
                </tr>
            </thead>
            <tbody>
                @forelse($report['data']['top_customers'] ?? [] as $customer)
                <tr>
                    <td><strong>{{ $customer['name'] }}</strong></td>
                    <td>{{ $customer['email'] }}</td>
                    <td>{{ $customer['transaction_count'] }}</td>
                    <td>Rp {{ number_format($customer['total_spent'], 0, ',', '.') }}</td>
                </tr>
                @empty
                <tr>
                    <td colspan="4" class="text-center">Tidak ada data</td>
                </tr>
                @endforelse
            </tbody>
        </table>

    @elseif($report['type'] === 'status')
        <div class="section-title">RINGKASAN STATUS TRANSAKSI</div>
        
        <table class="summary-table">
            <tr>
                <td>
                    <div class="card-title">Total Transaksi</div>
                    <div class="card-value">{{ $report['data']['total_transactions'] ?? 0 }}</div>
                </td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </table>

        <div class="section-title">TRANSAKSI BERDASARKAN STATUS</div>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Status</th>
                    <th>Jumlah</th>
                    <th>Persen</th>
                    <th>Total Pendapatan</th>
                </tr>
            </thead>
            <tbody>
                @forelse($report['data']['by_status'] ?? [] as $status => $stats)
                <tr>
                    <td><strong>{{ getTransactionStatusText($status) }}</strong></td>
                    <td>{{ $stats['count'] }}</td>
                    <td>{{ $stats['percentage'] }}%</td>
                    <td>Rp {{ number_format($stats['revenue'], 0, ',', '.') }}</td>
                </tr>
                @empty
                <tr>
                    <td colspan="4" class="text-center">Tidak ada data</td>
                </tr>
                @endforelse
            </tbody>
        </table>

        <div class="section-title">TRANSAKSI BERDASARKAN JENIS</div>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Jenis</th>
                    <th>Jumlah</th>
                    <th>Total Pendapatan</th>
                </tr>
            </thead>
            <tbody>
                @forelse($report['data']['by_type'] ?? [] as $type => $stats)
                <tr>
                    <td><strong>{{ $type === 'CASH' ? 'Tunai' : 'Kredit' }}</strong></td>
                    <td>{{ $stats['count'] }}</td>
                    <td>Rp {{ number_format($stats['revenue'], 0, ',', '.') }}</td>
                </tr>
                @empty
                <tr>
                    <td colspan="3" class="text-center">Tidak ada data</td>
                </tr>
                @endforelse
            </tbody>
        </table>

    @endif

    <div class="report-footer">
        <p><strong>Laporan ini dicetak pada:</strong> {{ now()->format('d F Y, H:i') }} WIB</p>
        <p>Dokumen ini dibuat secara otomatis oleh sistem SRB Motors</p>
    </div>
</body>
</html>