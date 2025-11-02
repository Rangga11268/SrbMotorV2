@extends('layouts.app')

@section('title', $motor->name)

@section('content')
    <!-- Spacer to prevent navbar overlap -->
    {{-- <div style="height: 8rem; visibility: hidden;"></div> --}}
    
    <section class="motor-detail" id="motor-detail">
        <div class="container">
            <!-- Motor Info Section -->
            <div class="card shadow-sm border-0 mb-5">
                <div class="row g-0">
                    <div class="col-lg-6 col-md-12">
                        <div class="main-image-container p-4">
                            <img 
                                src="{{ asset('storage/' . $motor->image_path) }}" 
                                class="img-fluid main-motor-image w-100 rounded" 
                                alt="{{ $motor->name }}"
                                style="object-fit: cover; max-height: 400px;"
                            >
                        </div>
                    </div>
                    
                    <div class="col-lg-6 col-md-12">
                        <div class="card-body p-4">
                            <div class="motor-header">
                                <h1 class="fw-bold text-dark">{{ $motor->name }}</h1>
                                <div class="d-flex align-items-center gap-2 mb-3">
                                    <div class="badge bg-primary">{{ $motor->brand }}</div>
                                    @if($motor->tersedia)
                                        <div class="badge bg-success">Tersedia</div>
                                    @else
                                        <div class="badge bg-danger">Tidak Tersedia</div>
                                    @endif
                                </div>
                            </div>
                            
                            <div class="motor-info mb-4">
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <div class="info-item">
                                            <div class="text-muted text-uppercase small fs-5">Model</div>
                                            <div class="fw-bold fs-4">{{ $motor->model ?: 'N/A' }}</div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="info-item">
                                            <div class="text-muted text-uppercase small fs-5">Tahun</div>
                                            <div class="fw-bold fs-4">{{ $motor->year ?: 'N/A' }}</div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="info-item">
                                            <div class="text-muted text-uppercase small fs-5">Tipe</div>
                                            <div class="fw-bold fs-4">{{ $motor->type ?: 'N/A' }}</div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="info-item">
                                            <div class="text-muted text-uppercase small fs-5">Harga</div>
                                            <div class="fw-bold text-primary fs-4">Rp. {{ number_format($motor->price, 0, ',', '.') }},-</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="motor-details mb-4">
                                <h5 class="fw-bold fs-4">Deskripsi</h5>
                                <p class="text-muted fs-5">{{ $motor->details ?: 'Deskripsi tidak tersedia.' }}</p>
                            </div>
                            
                            <div class="actions d-grid gap-2 d-md-flex">
                                <a href="#" class="btn btn-success flex-fill" onclick="openWhatsApp()">
                                    <i class="fab fa-whatsapp me-2"></i>Kontak Kami
                                </a>
                                <a href="{{ route('motors.credit-calculation', $motor->id) }}" class="btn btn-outline-primary flex-fill">
                                    <i class="fas fa-calculator me-2"></i>Simulasi Kredit
                                </a>
                            </div>
                            
                            <div class="mt-3">
                                <a href="{{ route('motors.index') }}" class="btn btn-link text-decoration-none">
                                    <i class="fas fa-arrow-left me-1"></i>Kembali ke Daftar Motor
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Specifications Section -->
            <div class="specifications-section mb-5">
                <h3 class="fw-bold mb-4 fs-2">Spesifikasi Lengkap</h3>
                <div class="card shadow-sm border-0">
                    <div class="card-body p-4">
                        @if($motor->specifications->count() > 0)
                            <div class="row g-4">
                                @foreach($motor->specifications as $spec)
                                    <div class="col-lg-6 col-md-12">
                                        <div class="spec-item d-flex justify-content-between border-bottom pb-3">
                                            <div class="spec-key">
                                                <div class="text-muted text-uppercase small fs-5"> 
                                                @php
                                                    $formattedKey = ucwords(str_replace('_', ' ', $spec->spec_key));
                                                    $translations = [
                                                        'Engine Type' => 'Tipe Mesin',
                                                        'Engine Size' => 'Ukuran Mesin',
                                                        'Engine Power' => 'Daya Mesin',
                                                        'Max Power' => 'Daya Maksimal',
                                                        'Max Torque' => 'Torsi Maksimal',
                                                        'Fuel System' => 'Sistem Bahan Bakar',
                                                        'Fuel Tank' => 'Tangki Bahan Bakar',
                                                        'Fuel Capacity' => 'Kapasitas Bensin',
                                                        'Brake System' => 'Sistem Rem',
                                                        'Front Brake' => 'Rem Depan',
                                                        'Rear Brake' => 'Rem Belakang',
                                                        'Transmission' => 'Transmisi',
                                                        'Suspension Front' => 'Suspensi Depan',
                                                        'Suspension Rear' => 'Suspensi Belakang',
                                                        'Tire Front' => 'Ban Depan',
                                                        'Tire Rear' => 'Ban Belakang',
                                                        'Dimensions' => 'Dimensi',
                                                        'Length' => 'Panjang',
                                                        'Width' => 'Lebar',
                                                        'Height' => 'Tinggi',
                                                        'Weight' => 'Berat',
                                                        'Color Options' => 'Pilihan Warna',
                                                        'Frame Type' => 'Tipe Rangka',
                                                        'Cooling System' => 'Sistem Pendingin',
                                                        'Starting System' => 'Sistem Starter',
                                                        'Electrical System' => 'Sistem Kelistrikan',
                                                        'Battery' => 'Aki',
                                                        'Wheelbase' => 'Jarak Sumbu Roda',
                                                        'Ground Clearance' => 'Jarak ke Tanah',
                                                        'Seat Height' => 'Ketinggian Jok',
                                                        'Compression Ratio' => 'Rasio Kompresi',
                                                        'Bore X Stroke' => 'Diameter X Langkah',
                                                        'Max Speed' => 'Kecepatan Maksimal',
                                                        'Acceleration' => 'Akselerasi',
                                                        'Mileage' => 'Konsumsi Bahan Bakar',
                                                        'Fuel Efficiency' => 'Efisiensi Bahan Bakar',
                                                        'Emission Standard' => 'Standar Emisi',
                                                        'Warranty' => 'Garansi',
                                                        'Features' => 'Fitur',
                                                        'Safety Features' => 'Fitur Keamanan',
                                                        'Comfort Features' => 'Fitur Kenyamanan',
                                                        'Technology Features' => 'Fitur Teknologi',
                                                        'Special Edition' => 'Edisi Spesial',
                                                        'Body Type' => 'Tipe Body',
                                                        'Headlight' => 'Lampu Depan',
                                                        'Taillight' => 'Lampu Belakang',
                                                        'Instrument Panel' => 'Panel Instrumen',
                                                        'Seat Type' => 'Tipe Jok',
                                                        'Handlebar Type' => 'Tipe Setang',
                                                        'Ground Clearance' => 'Jarak Bebas ke Tanah',
                                                        'Additional Specs' => 'Spesifikasi Tambahan'
                                                    ]; 
                                                    $indonesianKey = isset($translations[$formattedKey]) ? $translations[$formattedKey] : $formattedKey;
                                                    echo $indonesianKey;
                                                @endphp
                                                </div>
                                            </div>
                                            <div class="spec-value fw-bold fs-4">{{ $spec->spec_value }}</div>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        @else
                            <div class="text-center py-4">
                                <i class="fas fa-info-circle fa-2x text-muted mb-3"></i>
                                <p class="text-muted fs-4">Spesifikasi lengkap tidak tersedia.</p>
                            </div>
                        @endif
                    </div>
                </div>
            </div>

            <!-- Related Motors Section -->
            <div class="related-motors-section">
                <h3 class="fw-bold mb-4 fs-2">Motor Lainnya</h3>
                @if($relatedMotors->count() > 0)
                    <div class="row g-4">
                        @foreach($relatedMotors as $relatedMotor)
                        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                            <div class="card motor-card h-100 shadow-sm border-0 {{ !$relatedMotor->tersedia ? 'unavailable-card' : '' }}">
                                <div class="image-container position-relative">
                                    <img 
                                        src="{{ asset('storage/' . $relatedMotor->image_path) }}" 
                                        class="card-img-top img-fluid" 
                                        alt="{{ $relatedMotor->name }}"
                                        style="height: 180px; object-fit: cover;"
                                    >
                                    <div class="badge brand-badge position-absolute top-0 start-0 m-2">
                                        <span class="badge bg-primary">{{ $relatedMotor->brand }}</span>
                                    </div>
                                    @unless($relatedMotor->tersedia)
                                        <div class="badge availability-badge position-absolute top-0 end-0 m-2 bg-danger">
                                            Tidak Tersedia
                                        </div>
                                    @endunless
                                </div>
                                <div class="card-body d-flex flex-column">
                                    <h5 class="card-title fw-bold text-dark fs-4">{{ $relatedMotor->name }}</h5>
                                    <div class="price mb-2">
                                        <span class="fw-bold text-primary fs-4">Rp. {{ number_format($relatedMotor->price, 0, ',', '.') }},-</span>
                                    </div>
                                    <div class="specs mb-2">
                                        <small class="text-muted fs-5">
                                            <i class="fas fa-calendar-alt me-1"></i> {{ $relatedMotor->year }}
                                            <i class="fas fa-motorcycle ms-2 me-1"></i> {{ $relatedMotor->type }}
                                        </small>
                                    </div>
                                    <p class="card-text flex-grow-1 text-truncate fs-5">
                                        {{ Str::limit($relatedMotor->details, 60) }}
                                    </p>
                                    <div class="mt-auto pt-2">
                                        <a href="{{ route('motors.show', $relatedMotor->id) }}" class="btn btn-primary w-100 fs-4 py-2 {{ !$relatedMotor->tersedia ? 'disabled' : '' }}">
                                            <i class="fas fa-info-circle me-1"></i> Lihat Detail
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        @endforeach
                    </div>
                @else
                    <div class="text-center py-4">
                        <i class="fas fa-motorcycle fa-2x text-muted mb-3"></i>
                        <p class="text-muted fs-3">Tidak ada motor lainnya saat ini.</p>
                    </div>
                @endif
            </div>
        </div>
    </section>
@endsection

@section('scripts')
    <script>
        function openWhatsApp() {
            // Default phone number, you can replace with the actual dealership number
            const phoneNumber = "6281234567890"; // Example Indonesian number format without leading zero
            const motorName = "{{ addslashes($motor->name) }}";
            const motorPrice = "{{ number_format($motor->price, 0, ',', '.') }}";
            const message = encodeURIComponent(`Halo, saya ingin bertanya tentang motor ${motorName} yang harganya Rp. ${motorPrice},-`);
            const url = `https://wa.me/${phoneNumber}?text=${message}`;
            
            // Open WhatsApp in new tab
            window.open(url, '_blank');
        }
    </script>
@endsection
