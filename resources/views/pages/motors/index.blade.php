@extends('layouts.app')

@section('title', 'Semua Motor')

@section('content')
    <!-- Spacer to prevent navbar overlap -->
    <div style="height: 8rem; visibility: hidden;"></div>
    
    <!-- Motors Gallery Section -->
    <section class="motors-gallery" id="motors-gallery">
        <div class="container">
            <h1 class="heading text-center mb-4"><span>Semua</span> Motor</h1>

            <!-- Search and Filter Section -->
            <div class="search-filter-container mb-4">
                <div class="row">
                    <div class="col-md-6 mb-3 mb-md-0">
                        <form method="GET" action="{{ route('motors.index') }}" class="d-flex">
                            <input type="text" name="search" class="form-control me-2" placeholder="Cari motor..."
                                value="{{ request('search') }}">
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-search"></i> Cari
                            </button>
                        </form>
                    </div>
                    <div class="col-md-6">
                        <div class="float-md-end">
                            <a href="{{ route('motors.index') }}" class="btn btn-outline-secondary me-2">
                                <i class="fas fa-sync-alt"></i> Reset
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Additional filters -->
                <div class="row mt-3">
                    <div class="col-md-3 mb-2">
                        <select name="brand" class="form-select" onchange="this.form.submit()">
                            <option value="">Pilih Brand</option>
                            @foreach ($brands as $brand)
                                <option value="{{ $brand }}" {{ request('brand') == $brand ? 'selected' : '' }}>
                                    {{ $brand }}
                                </option>
                            @endforeach
                        </select>
                    </div>

                    <div class="col-md-3 mb-2">
                        <select name="type" class="form-select" onchange="this.form.submit()">
                            <option value="">Pilih Tipe</option>
                            @foreach ($types as $type)
                                <option value="{{ $type }}" {{ request('type') == $type ? 'selected' : '' }}>
                                    {{ $type }}
                                </option>
                            @endforeach
                        </select>
                    </div>

                    <div class="col-md-3 mb-2">
                        <select name="year" class="form-select" onchange="this.form.submit()">
                            <option value="">Pilih Tahun</option>
                            @foreach ($years as $year)
                                <option value="{{ $year }}" {{ request('year') == $year ? 'selected' : '' }}>
                                    {{ $year }}
                                </option>
                            @endforeach
                        </select>
                    </div>

                    <div class="col-md-3">
                        <div class="input-group">
                            <input type="number" name="min_price" class="form-control" placeholder="Harga Min"
                                value="{{ request('min_price') }}" onchange="this.form.submit()">
                            <span class="input-group-text">-</span>
                            <input type="number" name="max_price" class="form-control" placeholder="Harga Max"
                                value="{{ request('max_price') }}" onchange="this.form.submit()">
                        </div>
                    </div>
                </div>
            </div>

            <!-- Motors Grid -->
            <div class="motors-grid row">
                @forelse($motors as $motor)
                    <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div class="card motor-card h-100">
                            <img src="{{ asset('storage/' . $motor->image_path) }}" class="card-img-top"
                                alt="{{ $motor->name }}" style="height: 200px; object-fit: cover;">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">{{ $motor->name }}</h5>
                                <p class="card-text">
                                    <strong>Harga:</strong> Rp. {{ number_format($motor->price, 0, ',', '.') }},-
                                </p>
                                <p class="card-text">
                                    <i class="fas fa-circle"></i> {{ $motor->year }}
                                    <i class="fas fa-circle"></i> {{ $motor->type }}
                                </p>
                                <p class="card-text flex-grow-1">
                                    {{ Str::limit($motor->details, 80) }}
                                </p>
                                <a href="{{ route('motors.show', $motor->id) }}" class="btn btn-primary mt-auto detail-btn">
                                    Lihat Detail
                                </a>
                            </div>
                        </div>
                    </div>
                @empty
                    <div class="col-12">
                        <div class="text-center">
                            <h4 class="text-muted">Motor tidak ditemukan</h4>
                            <p>Silakan coba kriteria pencarian yang berbeda</p>
                            <a href="{{ route('motors.index') }}" class="btn btn-primary">Reset Pencarian</a>
                        </div>
                    </div>
                @endforelse
            </div>

            <!-- Pagination -->
            <div class="d-flex justify-content-center">
                {{ $motors->links() }}
            </div>
        </div>
    </section>
@endsection
