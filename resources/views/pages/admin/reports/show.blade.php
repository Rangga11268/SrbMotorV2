@extends('layouts.admin')

@section('title', 'Detail Laporan - ' . $title)

@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h3 class="card-title">{{ $title }}</h3>
                    <div class="d-flex gap-2">
                        <a href="{{ route('admin.reports.export', [
                            'type' => $type,
                            'start_date' => request('start_date'),
                            'end_date' => request('end_date')
                        ]) }}" class="btn btn-success">Ekspor PDF</a>
                        <a href="{{ route('admin.reports.export-excel', [
                            'type' => $type,
                            'start_date' => request('start_date'),
                            'end_date' => request('end_date')
                        ]) }}" class="btn btn-primary">Ekspor Excel</a>
                        <a href="{{ route('admin.reports.create') }}?type={{ $type }}" class="btn btn-warning">Buat Laporan Baru</a>
                        <a href="{{ route('admin.reports.index') }}" class="btn btn-secondary">Kembali</a>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row mb-4">
                        <div class="col-md-6">
                            <table class="table table-borderless">
                                <tr>
                                    <td width="30%"><strong>Jenis Laporan</strong></td>
                                    <td>{{ ucfirst($type) }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Deskripsi</strong></td>
                                    <td>{{ $description }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Tanggal Mulai</strong></td>
                                    <td>{{ $startDate }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Tanggal Akhir</strong></td>
                                    <td>{{ $endDate }}</td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12">
                            @if($type === 'sales')
                                <h4>Ringkasan Penjualan</h4>
                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="card bg-primary text-white">
                                            <div class="card-body">
                                                <h5>Total Transaksi</h5>
                                                <h3>{{ $data['total_transactions'] ?? 0 }}</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="card bg-info text-white">
                                            <div class="card-body">
                                                <h5>Total Pendapatan</h5>
                                                <h3>Rp {{ number_format($data['total_revenue'] ?? 0, 0, ',', '.') }}</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="card bg-success text-white">
                                            <div class="card-body">
                                                <h5>Transaksi Tunai</h5>
                                                <h3>{{ $data['cash_transactions'] ?? 0 }}</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="card bg-warning text-white">
                                            <div class="card-body">
                                                <h5>Transaksi Kredit</h5>
                                                <h3>{{ $data['credit_transactions'] ?? 0 }}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h4 class="mt-4">Penjualan Berdasarkan Merek Motor</h4>
                                <div class="table-responsive">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Merek Motor</th>
                                                <th>Jumlah Transaksi</th>
                                                <th>Total Pendapatan</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @forelse($data['by_brand'] ?? [] as $brand => $stats)
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
                                </div>

                            @elseif($type === 'income')
                                <h4>Ringkasan Pendapatan</h4>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="card bg-info text-white">
                                            <div class="card-body">
                                                <h5>Total Pendapatan</h5>
                                                <h3>Rp {{ number_format($data['total_income'] ?? 0, 0, ',', '.') }}</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="card bg-success text-white">
                                            <div class="card-body">
                                                <h5>Pendapatan Tunai</h5>
                                                <h3>Rp {{ number_format($data['cash_income'] ?? 0, 0, ',', '.') }}</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="card bg-warning text-white">
                                            <div class="card-body">
                                                <h5>Pendapatan Kredit</h5>
                                                <h3>Rp {{ number_format($data['credit_income'] ?? 0, 0, ',', '.') }}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h4 class="mt-4">Pendapatan Berdasarkan Bulan</h4>
                                <div class="table-responsive">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Bulan</th>
                                                <th>Total Pendapatan</th>
                                                <th>Pendapatan Tunai</th>
                                                <th>Pendapatan Kredit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @forelse($data['by_month'] ?? [] as $month => $stats)
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
                                </div>

                            @elseif($type === 'customer')
                                <h4>Ringkasan Pelanggan</h4>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="card bg-success text-white">
                                            <div class="card-body">
                                                <h5>Total Pelanggan</h5>
                                                <h3>{{ $data['total_customers'] ?? 0 }}</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="card bg-primary text-white">
                                            <div class="card-body">
                                                <h5>Pelanggan Baru</h5>
                                                <h3>{{ $data['new_customers'] ?? 0 }}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h4 class="mt-4">Pelanggan Teratas</h4>
                                <div class="table-responsive">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Nama</th>
                                                <th>Email</th>
                                                <th>Jumlah Transaksi</th>
                                                <th>Total Dibelanjakan</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @forelse($data['top_customers'] ?? [] as $customer)
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
                                </div>

                            @elseif($type === 'status')
                                <h4>Ringkasan Status Transaksi</h4>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="card bg-info text-white">
                                            <div class="card-body">
                                                <h5>Total Transaksi</h5>
                                                <h3>{{ $data['total_transactions'] ?? 0 }}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h4 class="mt-4">Transaksi Berdasarkan Status</h4>
                                <div class="table-responsive">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Status</th>
                                                <th>Jumlah</th>
                                                <th>Persen</th>
                                                <th>Total Pendapatan</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @forelse($data['by_status'] ?? [] as $status => $stats)
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
                                </div>

                                <h4 class="mt-4">Transaksi Berdasarkan Jenis</h4>
                                <div class="table-responsive">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Jenis</th>
                                                <th>Jumlah</th>
                                                <th>Total Pendapatan</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @forelse($data['by_type'] ?? [] as $type => $stats)
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
                                </div>

                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection