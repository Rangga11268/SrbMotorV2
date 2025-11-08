<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laporan - {{ $report['title'] }}</title>
    
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
        
        .report-meta {
            margin-bottom: 20px;
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
        
        .summary-cards {
            display: flex;
            gap: 15px;
            margin: 20px 0;
        }
        
        .summary-card {
            flex: 1;
            padding: 15px;
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 5px;
            text-align: center;
        }
        
        .summary-card h5 {
            margin: 0 0 10px 0;
            color: #6c757d;
        }
        
        .summary-card h3 {
            margin: 0;
            color: #043680;
        }
        
        .section-title {
            background-color: #043680;
            color: white;
            padding: 8px 12px;
            margin: 15px 0 10px 0;
            font-size: 16px;
        }
        
        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        
        .data-table th, .data-table td {
            padding: 8px 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        
        .data-table th {
            background-color: #f5f5f5;
            font-weight: bold;
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
        <h1>LAPORAN</h1>
        <div class="company-info">
            <h2>SRB Motors</h2>
            <p>Jl. Contoh Alamat No. 123, Kota</p>
            <p>Telepon: (021) 123-4567 | Email: info@srbmotors.com</p>
        </div>
    </div>

    <div class="report-meta">
        <h3>{{ $report['title'] }}</h3>
        <table class="info-table">
            <tr>
                <th>Jenis Laporan:</th>
                <td>{{ ucfirst($report['type']) }}</td>
            </tr>
            <tr>
                <th>Deskripsi:</th>
                <td>{{ $report['description'] }}</td>
            </tr>
            <tr>
                <th>Tanggal Mulai:</th>
                <td>{{ $report['start_date'] }}</td>
            </tr>
            <tr>
                <th>Tanggal Akhir:</th>
                <td>{{ $report['end_date'] }}</td>
            </tr>
        </table>
    </div>

    @if($report['type'] === 'sales')
        <div class="section-title">Ringkasan Penjualan</div>
        <div class="summary-cards">
            <div class="summary-card">
                <h5>Total Transaksi</h5>
                <h3>{{ $report['data']['total_transactions'] ?? 0 }}</h3>
            </div>
            <div class="summary-card">
                <h5>Total Pendapatan</h5>
                <h3>Rp {{ number_format($report['data']['total_revenue'] ?? 0, 0, ',', '.') }}</h3>
            </div>
            <div class="summary-card">
                <h5>Transaksi Tunai</h5>
                <h3>{{ $report['data']['cash_transactions'] ?? 0 }}</h3>
            </div>
            <div class="summary-card">
                <h5>Transaksi Kredit</h5>
                <h3>{{ $report['data']['credit_transactions'] ?? 0 }}</h3>
            </div>
        </div>

        <div class="section-title">Penjualan Berdasarkan Merek Motor</div>
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
        <div class="section-title">Ringkasan Pendapatan</div>
        <div class="summary-cards">
            <div class="summary-card">
                <h5>Total Pendapatan</h5>
                <h3>Rp {{ number_format($report['data']['total_income'] ?? 0, 0, ',', '.') }}</h3>
            </div>
            <div class="summary-card">
                <h5>Pendapatan Tunai</h5>
                <h3>Rp {{ number_format($report['data']['cash_income'] ?? 0, 0, ',', '.') }}</h3>
            </div>
            <div class="summary-card">
                <h5>Pendapatan Kredit</h5>
                <h3>Rp {{ number_format($report['data']['credit_income'] ?? 0, 0, ',', '.') }}</h3>
            </div>
        </div>

        <div class="section-title">Pendapatan Berdasarkan Bulan</div>
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
        <div class="section-title">Ringkasan Pelanggan</div>
        <div class="summary-cards">
            <div class="summary-card">
                <h5>Total Pelanggan</h5>
                <h3>{{ $report['data']['total_customers'] ?? 0 }}</h3>
            </div>
            <div class="summary-card">
                <h5>Pelanggan Baru</h5>
                <h3>{{ $report['data']['new_customers'] ?? 0 }}</h3>
            </div>
        </div>

        <div class="section-title">Pelanggan Teratas</div>
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
        <div class="section-title">Ringkasan Status Transaksi</div>
        <div class="summary-cards">
            <div class="summary-card">
                <h5>Total Transaksi</h5>
                <h3>{{ $report['data']['total_transactions'] ?? 0 }}</h3>
            </div>
        </div>

        <div class="section-title">Transaksi Berdasarkan Status</div>
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

        <div class="section-title">Transaksi Berdasarkan Jenis</div>
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

    <div class="footer">
        <p>Laporan ini dicetak pada {{ now()->format('d M Y H:i') }}</p>
    </div>
</body>
</html>