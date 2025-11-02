<section class="footer" id="footer">
    <div class="box-container">
        <div class="box logo-box">
            <div class="logo-footer">
                <img src="{{ asset('assets/icon/logo trans.png') }}" alt="SRB Motors Logo" class="footer-logo-img">
                <h3>SRB MOTORS</h3>
            </div>
        </div>

        <div class="box">
            <h3>Our Branches</h3>
            <a href="#"> <i class="fas fa-map-marker-alt"></i> Bekasi </a>
        </div>

        <div class="box">
            <h3>quick links</h3>
            <a href="{{ url('/') }}#home"> <i class="fas fa-arrow-right"></i> home </a>
            <a href="{{ url('/') }}#advantages">
                <i class="fas fa-arrow-right"></i> keunggulan
            </a>
            <a href="{{ url('/') }}#popular-motors">
                <i class="fas fa-arrow-right"></i> motor populer
            </a>
            <a href="{{ url('/') }}#about-us">
                <i class="fas fa-arrow-right"></i> tentang kami
            </a>
            <a href="{{ url('/') }}#motors-gallery">
                <i class="fas fa-arrow-right"></i> galeri
            </a>
            <a href="{{ url('/') }}#tips-tricks">
                <i class="fas fa-arrow-right"></i> tips & trik
            </a>
            <a href="{{ url('/') }}#contact"> <i class="fas fa-arrow-right"></i> kontak </a>
        </div>

        <div class="box">
            <h3>contact info</h3>
            <a href="tel:08978638849">
                <i class="fas fa-phone"></i> 08978638849
            </a>
            <a href="tel:08978638973">
                <i class="fas fa-phone"></i> 08978638973
            </a>
            <a href="mailto:darrelrangga@gmail.com">
                <i class="fas fa-envelope"></i> darrelrangga@gmail.com
            </a>
            <a
                href="https://maps.google.com/?q=Jl%20lori%20sakti%20Rt%2001%20Rw%2001%20No%2022%20Kaliabang%20tengah%20Bekasi%20utara"
                target="_blank"
            >
                <i class="fas fa-map-marker-alt"></i> Jl lori sakti Rt 01 Rw 01 No
                22 Kaliabang tengah Bekasi utara
            </a>
        </div>

        <div class="box">
            <h3>follow us</h3>
            <a href="https://wa.me/628978638849" target="_blank">
                <i class="fab fa-whatsapp"></i> whatsapp
            </a>
            <a
                href="https://www.instagram.com/srb_motor?igsh=MWZmZjNlazR6OW1iNg=="
                target="_blank"
            >
                <i class="fab fa-instagram"></i> instagram
            </a>
        </div>
    </div>

    <div class="credit">&#169; Created by SRB Team | All Rights Reserved</div>
</section>

<!-- Motor Detail Modal -->
<div
    class="modal fade"
    id="motorDetailModal"
    tabindex="-1"
    aria-labelledby="motorDetailModalLabel"
    aria-hidden="true"
>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="motorDetailModalLabel">Detail Motor</h5>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-5 text-center">
                        <img
                            src="{{ asset('OldWeb/assets/icon/logo trans.png') }}"
                            id="modalMotorImage"
                            class="img-fluid mb-3"
                            alt="Gambar Motor"
                            style="max-height: 300px; object-fit: contain"
                        />
                    </div>
                    <div class="col-md-7">
                        <h3
                            id="modalMotorName"
                            style="
                                color: var(--dark-blue);
                                font-size: 2.4rem;
                                margin-bottom: 1rem;
                            "
                        >
                            Nama Motor
                        </h3>
                        <p
                            id="modalMotorPrice"
                            class="price"
                            style="
                                font-size: 2rem;
                                color: var(--primary);
                                font-weight: bold;
                            "
                        >
                            Harga: <span style="color: var(--dark-blue)"></span>
                        </p>
                        <div id="modalMotorDetailsFull">
                            <h4
                                style="
                                    font-size: 1.8rem;
                                    color: var(--dark-blue);
                                    margin-top: 1.5rem;
                                    margin-bottom: 0.5rem;
                                "
                            >
                                Spesifikasi:
                            </h4>
                            <div
                                id="modalMotorDetails"
                                style="
                                    font-size: 1.5rem;
                                    color: var(--light-color);
                                    line-height: 1.7;
                                "
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                >
                    Tutup
                </button>
                <a
                    href="javascript:void(0);"
                    id="modalCreditCalculationButton"
                    class="btn btn-outline-primary me-2"
                    style="color: var(--primary); border-color: var(--primary);"
                    onclick="navigateToCreditCalculation()"
                >
                    <i class="fas fa-calculator"></i> Simulasi Kredit
                </a>
                <a
                    href="https://wa.me/628978638849?text=Halo%20SRB%20Motors%2C%20saya%20tertarik%20untuk%20bertanya%20lebih%20lanjut%20mengenai%20motor%20yang%20ada%20di%20website."
                    id="modalOrderButton"
                    class="btn"
                    style="background: var(--primary); color: #fff"
                    target="_blank"
                >
                    <i class="fab fa-whatsapp"></i> Pesan Sekarang
                </a>
            </div>
        </div>
    </div>
</div>