@extends('layouts.app')

@section('title', 'Semua Motor')

@section('content')
    <!-- Spacer to prevent navbar overlap -->
    {{-- <div style="height: 8rem; visibility: hidden;"></div> --}}

    <!-- Motors Gallery Section -->
    <section class="motors-gallery" id="motors-gallery">
        <div class="container">
            <h1 class="heading text-center mb-4"><span>Semua</span> Motor</h1>

            <!-- Search and Filter Section -->
            <form method="GET" action="{{ route('motors.index') }}" class="search-filter-container mb-4">
                <div class="row">
                    <div class="col-md-6 mb-3 mb-md-0">
                        <div class="search-container">
                            <input type="text" name="search" class="form-control form-control-lg" placeholder="Cari motor..."
                                value="{{ request('search') }}">
                            <button type="submit" class="btn-search">
                                <i class="fas fa-search fs-5"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="float-md-end">
                            <a href="{{ route('motors.index') }}" class="btn btn-outline-secondary btn-lg me-2">
                                <i class="fas fa-sync-alt fs-5"></i> Reset
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Additional filters -->
                <div class="row mt-3 g-2">
                    <div class="col-md-3 mb-2">
                        <label class="form-label fw-bold fs-5">Brand</label>
                        <select name="brand" class="form-select form-select-lg" onchange="this.form.submit()">
                            <option value="">Pilih Semua</option>
                            @foreach ($brands as $brand)
                                <option value="{{ $brand }}" {{ request('brand') == $brand ? 'selected' : '' }}>
                                    {{ $brand }}
                                </option>
                            @endforeach
                        </select>
                    </div>

                    <div class="col-md-3 mb-2">
                        <label class="form-label fw-bold fs-5">Tipe</label>
                        <select name="type" class="form-select form-select-lg" onchange="this.form.submit()">
                            <option value="">Pilih Semua</option>
                            @foreach ($types as $type)
                                <option value="{{ $type }}" {{ request('type') == $type ? 'selected' : '' }}>
                                    {{ $type }}
                                </option>
                            @endforeach
                        </select>
                    </div>

                    <div class="col-md-3 mb-2">
                        <label class="form-label fw-bold fs-5">Tahun</label>
                        <select name="year" class="form-select form-select-lg" onchange="this.form.submit()">
                            <option value="">Pilih Semua</option>
                            @foreach ($years as $year)
                                <option value="{{ $year }}" {{ request('year') == $year ? 'selected' : '' }}>
                                    {{ $year }}
                                </option>
                            @endforeach
                        </select>
                    </div>

                    <div class="col-md-3 mb-2">
                        <label class="form-label fw-bold fs-5">Harga</label>
                        <div class="input-group">
                            <input type="number" name="min_price" class="form-control form-control-lg" placeholder="Min"
                                value="{{ request('min_price') }}" onchange="this.form.submit()">
                            <span class="input-group-text fs-5">-</span>
                            <input type="number" name="max_price" class="form-control form-control-lg" placeholder="Max"
                                value="{{ request('max_price') }}" onchange="this.form.submit()">
                        </div>
                    </div>
                </div>
            </form>

            <!-- Motors Grid -->
            <div class="motors-grid row g-4">
                @forelse($motors as $motor)
                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                        <div class="card motor-card h-100 shadow-sm border-0">
                            <div class="image-container position-relative">
                                <img src="{{ asset('storage/' . $motor->image_path) }}" class="card-img-top img-fluid"
                                    alt="{{ $motor->name }}" style="height: 200px; object-fit: cover;">
                                <div class="badge brand-badge position-absolute top-0 start-0 m-2 bg-primary">
                                    {{ $motor->brand }}
                                </div>
                            </div>
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title fw-bold text-dark fs-4">{{ $motor->name }}</h5>
                                <div class="price mb-2">
                                    <span class="fw-bold text-primary fs-4">Rp.
                                        {{ number_format($motor->price, 0, ',', '.') }},-</span>
                                </div>
                                <div class="specs mb-2">
                                    <small class="text-muted fs-5">
                                        <i class="fas fa-calendar-alt me-1"></i> {{ $motor->year }}
                                        <i class="fas fa-motorcycle ms-2 me-1"></i> {{ $motor->type }}
                                    </small>
                                </div>
                                <p class="card-text grow text-truncate fs-5">
                                    {{ Str::limit($motor->details, 80) }}
                                </p>
                                <div class="mt-auto pt-2">
                                    <a href="{{ route('motors.show', $motor->id) }}" class="btn btn-primary w-100 fs-4 py-2">
                                        <i class="fas fa-info-circle me-1"></i> Lihat Detail
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                @empty
                    <div class="col-12">
                        <div class="text-center py-5">
                            <i class="fas fa-motorcycle fa-3x text-muted mb-3"></i>
                            <h4 class="text-muted fs-2">Motor tidak ditemukan</h4>
                            <p class="text-muted fs-4">Silakan coba kriteria pencarian yang berbeda</p>
                            <a href="{{ route('motors.index') }}" class="btn btn-primary fs-4 py-2">
                                <i class="fas fa-sync-alt me-1"></i> Reset Pencarian
                            </a>
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
