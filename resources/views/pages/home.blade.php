@extends('layouts.app')

@section('title', 'Home')

@section('content')
<!-- Home Section -->
<section class="home" id="home">
    <h3 data-speed="-2" class="home-parallax">Cari Motor Anda</h3>

    <img
        data-speed="5"
        class="home-parallax"
        src="{{ asset('assets/img/home.svg') }}"
        alt="Motor Image"
    />

    <a data-speed="7" href="#motors-gallery" class="btn home-parallax"
        >Cari Motor</a
    >
</section>

<!-- Our Advantages Section -->
<section class="our-advantages" id="advantages">
    <h1 class="heading"><span>Keunggulan</span> Kami</h1>
    <p class="section-intro">
        Jangan lewatkan berbagai keuntungan dan penawaran terbaik saat Anda
        memilih SRB Motors untuk motor impian Anda.
    </p>
    <div class="box-container">
        <div class="box">
            <i class="fas fa-check-circle"></i>
            <h3>Kualitas Terjamin</h3>
            <p>
                Setiap motor telah melewati inspeksi ketat untuk memastikan kualitas
                terbaik bagi Anda.
            </p>
        </div>
        <div class="box">
            <i class="fas fa-wallet"></i>
            <h3>Harga Kompetitif</h3>
            <p>
                Kami menawarkan harga terbaik dan transparan, serta opsi pembiayaan
                yang fleksibel.
            </p>
        </div>
        <div class="box">
            <i class="fas fa-headset"></i>
            <h3>Layanan Profesional</h3>
            <p>
                kami siap membantu Anda menemukan motor impian dengan pelayanan
                ramah dan profesional.
            </p>
        </div>
        <div class="box">
            <i class="fas fa-percent"></i>
            <h3>Angsuran ternjangkau</h3>
            <p>
                Dengan program potong tenor 1 sampai 3 bulan untuk type tertentu
            </p>
        </div>
    </div>
</section>

<!-- Motor Populer Section -->
<section class="popular-motors" id="popular-motors">
    <h1 class="heading">Motor <span>Populer</span></h1>

    <div class="swiper popular-motors-slider">
        <div class="swiper-wrapper">
            @foreach($popularMotors as $motor)
            <div class="swiper-slide box">
                <img src="{{ asset('storage/' . $motor->image_path) }}" alt="{{ $motor->name }}" />
                <div class="content">
                    <h3>{{ $motor->name }}</h3>
                    <div class="price"><span>Harga : </span> Rp. {{ number_format($motor->price, 0, ',', '.') }},-</div>
                    <p>
                        new
                        <span class="fas fa-circle"></span> {{ $motor->year }}
                        <span class="fas fa-circle"></span> {{ $motor->type }}
                        <span class="fas fa-circle"></span> {{ $motor->details }}
                    </p>
                    <a
                        href="javascript:void(0);"
                        class="btn detail-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#motorDetailModal"
                        data-motor-name="{{ $motor->name }}"
                        data-motor-price-value="Rp. {{ number_format($motor->price, 0, ',', '.') }},-"
                        data-motor-image="{{ asset('storage/' . $motor->image_path) }}"
                        data-motor-details-html="{{ $motor->details }}"
                        data-motor-specifications-html="{{ $motor->specifications->count() ? '<div class=\'specs-container\'>' . implode('', $motor->specifications->map(function($spec) { return '<div class=\'spec-row\'><span class=\'fw-bold spec-key\'>' . e($spec->spec_key) . ':</span> <span class=\'spec-value\'>' . e($spec->spec_value) . '</span></div>'; })->toArray()) . '</div>' : '<p>Spesifikasi lengkap tidak tersedia.</p>' }}"
                    >
                        Lihat Detail
                    </a>
                </div>
            </div>
            @endforeach
        </div>

        <div class="swiper-pagination"></div>
    </div>
</section>

<!-- About Us Section -->
<section class="about-us" id="about-us">
    <h1 class="heading"><span>Tentang</span> Kami</h1>

    <div class="box-container">
        <div class="box">
            <img
                src="{{ asset('OldWeb/assets/img/about us.jpeg') }}"
                alt="Interior Showroom SRB Motors"
                class="about-us-image"
            />
            <h3>SRB Motors: Your Ride, Our Passion</h3>
            <p>
                Selamat datang di SRB Motors! Kami bukan sekadar dealer, tetapi
                mitra Anda dalam menemukan motor impian. Misi kami adalah
                menyediakan pilihan motor berkualitas tinggi, harga yang transparan,
                serta pelayanan ramah dan profesional. Kepuasan dan kepercayaan
                pelanggan adalah prioritas utama kami.
            </p>
            <p>
                Berdiri dari kecintaan terhadap dunia otomotif roda dua, SRB Motors
                berkomitmen menjadi mitra terpercaya bagi para pecinta motor. Kami
                percaya bahwa kepercayaan dan hubungan jangka panjang dengan
                pelanggan adalah kunci utama. Temukan berbagai pilihan motor terbaik
                bersama kami dan wujudkan perjalanan impian Anda.
            </p>
        </div>
    </div>
</section>

<!-- Motors Gallery Section -->
<section class="motors-gallery" id="motors-gallery">
    <h1 class="heading"><span>Galeri</span> Motors</h1>

    <h2 class="heading">
        <img
            src="{{ asset('OldWeb/assets/icon/yamaha-3d-vector.jpg') }}"
            alt="Yamaha Logo"
            class="brand-logo"
        />
        Yamaha
    </h2>
    <div class="swiper motors-gallery-slider">
        <div class="swiper-wrapper">
            @foreach($yamahaMotors->unique('id') as $motor)
            <div class="swiper-slide box">
                <img src="{{ asset('storage/' . $motor->image_path) }}" alt="{{ $motor->name }}" />
                <div class="content">
                    <h3>{{ $motor->name }}</h3>
                    <div class="price">Rp. {{ number_format($motor->price, 0, ',', '.') }},-</div>
                    <a
                        href="javascript:void(0);"
                        class="btn detail-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#motorDetailModal"
                        data-motor-name="{{ $motor->name }}"
                        data-motor-price-value="Rp. {{ number_format($motor->price, 0, ',', '.') }},-"
                        data-motor-image="{{ asset('storage/' . $motor->image_path) }}"
                        data-motor-details-html="{{ $motor->details }}"
                        data-motor-specifications-html="{{ $motor->specifications->count() ? '<div class=\'specs-container\'>' . implode('', $motor->specifications->map(function($spec) { return '<div class=\'spec-row\'><span class=\'fw-bold spec-key\'>' . e($spec->spec_key) . ':</span> <span class=\'spec-value\'>' . e($spec->spec_value) . '</span></div>'; })->toArray()) . '</div>' : '<p>Spesifikasi lengkap tidak tersedia.</p>' }}"
                        >Lihat Detail</a
                    >
                </div>
            </div>
            @endforeach
        </div>

        <div class="swiper-pagination"></div>
    </div>
    
    <h2 class="heading">
        <img src="{{ asset('OldWeb/assets/icon/honda.svg') }}" alt="Honda Logo" class="brand-logo" />
        Honda
    </h2>
    <div class="swiper motors-gallery-slider">
        <div class="swiper-wrapper">
            @foreach($hondaMotors->unique('id') as $motor)
            <div class="swiper-slide box">
                <img src="{{ asset('storage/' . $motor->image_path) }}" alt="{{ $motor->name }}" />
                <div class="content">
                    <h3>{{ $motor->name }}</h3>
                    <div class="price">Rp. {{ number_format($motor->price, 0, ',', '.') }},-</div>
                    <a
                        href="javascript:void(0);"
                        class="btn detail-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#motorDetailModal"
                        data-motor-name="{{ $motor->name }}"
                        data-motor-price-value="Rp. {{ number_format($motor->price, 0, ',', '.') }},-"
                        data-motor-image="{{ asset('storage/' . $motor->image_path) }}"
                        data-motor-details-html="{{ $motor->details }}"
                        data-motor-specifications-html="{{ $motor->specifications->count() ? '<div class=\'specs-container\'>' . implode('', $motor->specifications->map(function($spec) { return '<div class=\'spec-row\'><span class=\'fw-bold spec-key\'>' . e($spec->spec_key) . ':</span> <span class=\'spec-value\'>' . e($spec->spec_value) . '</span></div>'; })->toArray()) . '</div>' : '<p>Spesifikasi lengkap tidak tersedia.</p>' }}"
                        >Lihat Detail</a
                    >
                </div>
            </div>
            @endforeach
        </div>

        <div class="swiper-pagination"></div>
    </div>
</section>

<!-- Tips & Tricks Section -->
<section class="tips-tricks" id="tips-tricks">
    <h1 class="heading"><span>Tips & Trik</span> Perawatan Motor</h1>
    <div class="box-container">
        <div class="box">
            <i class="fas fa-oil-can"></i>
            <h3>Ganti Oli Rutin</h3>
            <p>
                Pastikan mengganti oli mesin sesuai jadwal pabrikan untuk menjaga
                performa dan keawetan mesin motor Anda.
            </p>
        </div>
        <div class="box">
            <i class="fas fa-shield-alt"></i>
            <h3>Cek Ban & Rem</h3>
            <p>
                Periksa tekanan ban dan kondisi rem secara berkala. Ini krusial
                untuk keamanan dan kenyamanan berkendara.
            </p>
        </div>
        <div class="box">
            <i class="fas fa-shower"></i>
            <h3>Jaga Kebersihan</h3>
            <p>
                Mencuci motor secara teratur tidak hanya membuatnya terlihat bagus,
                tapi juga mencegah karat dan kerusakan komponen.
            </p>
        </div>
    </div>
</section>

<!-- Contact Section -->
<section class="contact" id="contact">
    <h1 class="heading"><span>Kontak</span> Kami</h1>

    <div class="row">
        <iframe
            class="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d991.6155582081581!2d107.00215326955295!3d-6.202591866357196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698bfce9f106e7%3A0x7e0d6a60ab1445ab!2sJl.%20Perumahan%20Abadi%20No.21%2C%20Kaliabang%20Tengah%2C%20Kec.%20Bekasi%20Utara%2C%20Kota%20Bks%2C%20Jawa%20Barat%2017125!5e0!3m2!1sid!2sid!4v1748748018612!5m2!1sid!2sid"
            width="400"
            title="Lokasi SRB Motors di Google Maps"
            height="400"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
        ></iframe>

        <form id="contactForm">
            <h3>Hubungi Kami</h3>
            <input
                type="text"
                name="name"
                placeholder="Masukan nama"
                class="box"
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Masukan email"
                class="box"
                required
            />
            <input type="text" name="subject" placeholder="subject" class="box" />

            <textarea
                placeholder="Masukan pesan"
                name="message"
                class="box"
                cols="30"
                rows="10"
            ></textarea>
            <input type="submit" value="Kirim" class="btn" />
            <p
                id="contactFormStatus"
                style="margin-top: 1rem; font-size: 1.4rem"
            ></p>
        </form>
    </div>
</section>
@endsection

@section('scripts')
<script>
document.addEventListener('DOMContentLoaded', function () {
    // Initialize Swiper for popular motors slider - disable loop if there aren't enough slides
    var popularMotorsSlides = document.querySelectorAll('.popular-motors-slider .swiper-slide').length;
    var popularMotorsSlider = new Swiper(".popular-motors-slider", {
        grabCursor: true,
        centeredSlides: true,
        spaceBetween: 20,
        loop: popularMotorsSlides > 3, // Only loop if there are enough slides to support it
        autoplay: {
            delay: 9500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });

    // Initialize Swiper for Yamaha motors gallery slider - disable loop if there aren't enough slides
    var yamahaSliderElement = document.querySelector('.motors-gallery-slider:first-of-type');
    if (yamahaSliderElement) {
        var yamahaMotorsSlides = yamahaSliderElement.querySelectorAll('.swiper-slide').length;
        var yamahaMotorsSlider = new Swiper(yamahaSliderElement, {
            grabCursor: true,
            centeredSlides: true,
            spaceBetween: 20,
            loop: yamahaMotorsSlides > 3, // Only loop if there are enough slides to support it
            autoplay: {
                delay: 9500,
                disableOnInteraction: false,
            },
            pagination: {
                el: yamahaSliderElement.querySelector('.swiper-pagination'),
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            },
        });
    }

    // Initialize Swiper for Honda motors gallery slider - disable loop if there aren't enough slides
    var hondaSliderElement = document.querySelector('.motors-gallery-slider:last-of-type');
    if (hondaSliderElement) {
        var hondaMotorsSlides = hondaSliderElement.querySelectorAll('.swiper-slide').length;
        var hondaMotorsSlider = new Swiper(hondaSliderElement, {
            grabCursor: true,
            centeredSlides: true,
            spaceBetween: 20,
            loop: hondaMotorsSlides > 3, // Only loop if there are enough slides to support it
            autoplay: {
                delay: 9500,
                disableOnInteraction: false,
            },
            pagination: {
                el: hondaSliderElement.querySelector('.swiper-pagination'),
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            },
        });
    }

    // Update the modal event listener to work with dynamic content
    var motorDetailModal = document.getElementById("motorDetailModal");
    if (motorDetailModal) {
        motorDetailModal.addEventListener("show.bs.modal", function (event) {
            // Tombol yang klik modal
            var button = event.relatedTarget;

            // Ekstrak informasi dari atribut data-*
            var motorName = button.getAttribute("data-motor-name");
            var motorPriceValue = button.getAttribute("data-motor-price-value");
            var motorImage = button.getAttribute("data-motor-image");
            // motorDetailsHtml adalah untuk ringkasan di kartu, kita akan gunakan motorSpecificationsHtml untuk modal
            var motorSpecificationsHtml = button.getAttribute("data-motor-specifications-html");

            // Update konten modal
            var modalTitle = motorDetailModal.querySelector(".modal-title");
            var modalMotorImageEl = motorDetailModal.querySelector("#modalMotorImage");
            var modalMotorNameEl = motorDetailModal.querySelector("#modalMotorName");
            var modalMotorPriceSpan = motorDetailModal.querySelector("#modalMotorPrice span");
            var modalMotorDetailsContainer = motorDetailModal.querySelector("#modalMotorDetails");
            var modalMotorDetailsFullDiv = motorDetailModal.querySelector("#modalMotorDetailsFull");

            if (modalTitle) modalTitle.textContent = motorName || "Detail Motor";
            if (modalMotorImageEl) modalMotorImageEl.src = motorImage || "{{ asset('OldWeb/assets/icon/logo trans.png') }}";
            if (modalMotorNameEl) modalMotorNameEl.textContent = motorName || "Nama Tidak Tersedia";
            if (modalMotorPriceSpan) modalMotorPriceSpan.textContent = motorPriceValue || "N/A";

            if (modalMotorDetailsContainer && modalMotorDetailsFullDiv) {
                if (motorSpecificationsHtml && motorSpecificationsHtml.trim() !== "") {
                    // Check if the string looks like our custom format (using '||' as separator)
                    if (motorSpecificationsHtml.includes('||')) {
                        // Parse our custom format: "key:value||key:value||key:value"
                        var specsHtml = '<div class="specs-container">';
                        var specPairs = motorSpecificationsHtml.split('||');
                        specPairs.forEach(function(pair) {
                            var colonIndex = pair.indexOf(':');
                            if (colonIndex !== -1) {
                                var key = pair.substring(0, colonIndex).trim();
                                var value = pair.substring(colonIndex + 1).trim();
                                specsHtml += '<div class="spec-row"><span class="fw-bold spec-key">' + key + ':</span> <span class="spec-value">' + value + '</span></div>';
                            } else {
                                specsHtml += '<div class="spec-row">' + pair.trim() + '</div>';
                            }
                        });
                        specsHtml += '</div>';
                        modalMotorDetailsContainer.innerHTML = specsHtml;
                    } 
                    // Check if the string looks like JSON (starts with { or [ and ends with } or ])
                    else if (motorSpecificationsHtml.startsWith('{') || motorSpecificationsHtml.startsWith('[')) {
                        try {
                            var specs = JSON.parse(motorSpecificationsHtml);
                            if (typeof specs === 'object' && specs !== null) {
                                // Format the specifications as a structured list
                                var specsHtml = '<div class="specs-container">';
                                for (var key in specs) {
                                    if (specs.hasOwnProperty(key)) {
                                        specsHtml += '<div class="spec-row"><span class="fw-bold spec-key">' + key + ':</span> <span class="spec-value">' + specs[key] + '</span></div>';
                                    }
                                }
                                specsHtml += '</div>';
                                modalMotorDetailsContainer.innerHTML = specsHtml;
                            } else {
                                // If not an object, display as is
                                modalMotorDetailsContainer.innerHTML = motorSpecificationsHtml;
                            }
                        } catch (e) {
                            // If JSON parsing fails, treat as regular string
                            // Check if it's already HTML or plain text
                            modalMotorDetailsContainer.innerHTML = motorSpecificationsHtml;
                        }
                    } else {
                        // It's not our custom format or JSON, display as is
                        modalMotorDetailsContainer.innerHTML = motorSpecificationsHtml;
                    }
                    modalMotorDetailsFullDiv.style.display = "block";
                } else {
                    modalMotorDetailsContainer.innerHTML = "<p class='text-center'>Spesifikasi lengkap tidak tersedia.</p>";
                    modalMotorDetailsFullDiv.style.display = "block";
                }
            }
        });
    }

    // Contact form submission
    document.getElementById('contactForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        var status = document.getElementById('contactFormStatus');
        var formData = new FormData(this);

        try {
            const response = await fetch('{{ route('contact.submit') }}', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            });

            const result = await response.json();
            if(response.ok) {
                status.innerHTML = 'Terima kash! Pesan Anda telah terkirim.';
                document.getElementById('contactForm').reset();
            } else {
                status.innerHTML = result.message || 'Oops! Terjadi masalah saat mengirim formulir Anda.';
            }
        } catch (error) {
            status.innerHTML = 'Oops! Terjadi masalah saat mengirim formulir Anda.';
        }
    });
});
</script>
@endsection