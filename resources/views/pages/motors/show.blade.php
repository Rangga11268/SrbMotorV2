@extends('layouts.app')

@section('title', $motor->name)

@section('content')
    <!-- Spacer to prevent navbar overlap -->
    <div style="height: 8rem; visibility: hidden;"></div>
    
    <section class="motor-detail" id="motor-detail">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="main-image-container">
                        <img src="{{ asset('storage/' . $motor->image_path) }}" class="img-fluid main-motor-image"
                            alt="{{ $motor->name }}">
                    </div>

                    <!-- Additional images section (if available) -->
                    <div class="additional-images mt-3">
                        <!-- In the future, we could add multiple images for each motor -->
                    </div>
                </div>

                <div class="col-md-6">
                    <h1>{{ $motor->name }}</h1>

                    <div class="motor-info">
                        <table class="table table-borderless">
                            <tr>
                                <td><strong>Brand:</strong></td>
                                <td>{{ $motor->brand }}</td>
                            </tr>
                            <tr>
                                <td><strong>Model:</strong></td>
                                <td>{{ $motor->model ?: 'N/A' }}</td>
                            </tr>
                            <tr>
                                <td><strong>Tahun:</strong></td>
                                <td>{{ $motor->year ?: 'N/A' }}</td>
                            </tr>
                            <tr>
                                <td><strong>Tipe:</strong></td>
                                <td>{{ $motor->type ?: 'N/A' }}</td>
                            </tr>
                            <tr>
                                <td><strong>Harga:</strong></td>
                                <td><strong class="text-primary">Rp.
                                        {{ number_format($motor->price, 0, ',', '.') }},-</strong></td>
                            </tr>
                        </table>
                    </div>

                    <div class="motor-details mt-4">
                        <h4>Deskripsi</h4>
                        <p>{{ $motor->details ?: 'Deskripsi tidak tersedia.' }}</p>
                    </div>

                    <div class="actions mt-4">
                        {{-- <a href="{{ route('contact') }}#contact" class="btn btn-primary">Booking Test Drive</a> --}}
                        <a href="{{ route('motors.credit-calculation', $motor->id) }}"
                            class="btn btn-outline-primary">Simulasi Kredit</a>
                    </div>
                </div>
            </div>

            <!-- Specifications Section -->
            <div class="specifications-section mt-5">
                <h3>Spesifikasi Lengkap</h3>
                <div class="row">
                    @if ($motor->specifications->count() > 0)
                        <div class="col-12">
                            <div class="specs-container">
                                @foreach ($motor->specifications as $spec)
                                    <div class="spec-row row mb-2">
                                        <div class="col-md-4 spec-key">
                                            <strong>
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
                                                    ];
                                                    $indonesianKey = isset($translations[$formattedKey])
                                                        ? $translations[$formattedKey]
                                                        : $formattedKey;
                                                    echo $indonesianKey;
                                                @endphp
                                            </strong>
                                        </div>
                                        <div class="col-md-8 spec-value">{{ $spec->spec_value }}</div>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    @else
                        <div class="col-12">
                            <p class="text-muted">Spesifikasi lengkap tidak tersedia.</p>
                        </div>
                    @endif
                </div>
            </div>

            <!-- Related Motors Section -->
            <div class="related-motors-section mt-5">
                <h3>Motor Lainnya</h3>
                <div class="row">
                    @foreach ($relatedMotors as $relatedMotor)
                        <div class="col-md-3 col-sm-6 mb-4">
                            <div class="card motor-card h-100">
                                <img src="{{ asset('storage/' . $relatedMotor->image_path) }}" class="card-img-top"
                                    alt="{{ $relatedMotor->name }}" style="height: 150px; object-fit: cover;">
                                <div class="card-body d-flex flex-column">
                                    <h5 class="card-title">{{ $relatedMotor->name }}</h5>
                                    <p class="card-text">
                                        <strong>Harga:</strong> Rp.
                                        {{ number_format($relatedMotor->price, 0, ',', '.') }},-
                                    </p>
                                    <a href="{{ route('motors.show', $relatedMotor->id) }}"
                                        class="btn btn-primary mt-auto">Lihat Detail</a>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </section>
@endsection
