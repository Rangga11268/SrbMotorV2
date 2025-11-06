@extends('layouts.app')

@section('title', 'Tentang Kami')

@section('content')
<!-- About Us Section -->
<section class="about-us" id="about-us">
    <h1 class="heading"><span>Tentang</span> Kami</h1>

    <div class="box-container">
        <div class="box">
            <div class="image">
                <img src="{{ asset('OldWeb/assets/img/about us.jpeg') }}" alt="Interior Showroom SRB Motors" />
            </div>
            <div class="content">
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
                <div class="icons-container">
                    <div class="icons">
                        <i class="fas fa-star"></i>
                        <h3>300+</h3>
                        <span>motor terjual</span>
                    </div>
                    <div class="icons">
                        <i class="fas fa-user"></i>
                        <h3>250+</h3>
                        <span>pelanggan puas</span>
                    </div>
                    <div class="icons">
                        <i class="fas fa-medal"></i>
                        <h3>10+</h3>
                        <span>tahun pengalaman</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Our Advantages Section on About Page -->
    <div class="our-advantages-about">
        <h1 class="heading"><span>Keunggulan</span> Kami</h1>
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
    </div>

    <!-- Our Story Section -->
    <div class="our-story">
        <h1 class="heading"><span>Sejarah</span> Kami</h1>
        <div class="row">
            <div class="content">
                <h3>Perjalanan Kami Sejak Awal Berdiri</h3>
                <p>
                    SRB Motors berdiri dengan semangat yang tinggi untuk melayani para pecinta otomotif roda dua. 
                    Awalnya dimulai dari kecintaan terhadap dunia otomotif dan keinginan untuk menyediakan solusi 
                    transportasi yang handal dan berkualitas. Dengan pengalaman bertahun-tahun di industri ini, 
                    kami telah membantu ribuan pelanggan menemukan motor yang sesuai dengan kebutuhan dan gaya hidup mereka.
                </p>
                <p>
                    Kami terus berkomitmen untuk memberikan layanan terbaik, baik dalam pilihan produk maupun dalam 
                    pelayanan purna jual. Tim kami yang profesional dan berpengalaman siap membantu Anda dalam 
                    menemukan motor impian Anda dengan layanan yang ramah dan transparan.
                </p>
                <a href="{{ route('motors.index') }}" class="btn">Jelajahi Motor</a>
            </div>
        </div>
    </div>
    
</section>
@endsection

@section('styles')
<style>
    .about-us .box-container {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        padding: 2rem 0;
    }

    .about-us .box {
        flex: 1 1 40rem;
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        align-items: center;
        background: var(--light-bg);
        border-radius: var(--border-radius);
        padding: 2rem;
    }

    .about-us .box .image {
        flex: 1 1 30rem;
        height: 40rem;
        overflow: hidden;
        border-radius: var(--border-radius);
    }

    .about-us .box .image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .about-us .box .content {
        flex: 1 1 30rem;
    }

    .about-us .box .content h3 {
        font-size: var(--heading-font-size);
        color: var(--black);
        margin-bottom: 1rem;
    }

    .about-us .box .content p {
        font-size: 1.5rem;
        color: var(--light-color);
        padding: 1rem 0;
        line-height: 2;
    }

    .about-us .box .content .icons-container {
        display: flex;
        gap: 2rem;
        margin-top: 2rem;
        flex-wrap: wrap;
        justify-content: center;
    }

    .about-us .box .content .icons-container .icons {
        text-align: center;
        padding: 2rem 1rem;
        background: var(--white);
        border-radius: var(--border-radius);
        flex: 1 1 10rem;
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
    }
    
    .about-us .box .content .icons-container .icons:hover {
        transform: translateY(-0.5rem);
    }

    .about-us .box .content .icons-container .icons i {
        font-size: 3rem;
        color: var(--primary-color);
        margin-bottom: 1rem;
    }

    .about-us .box .content .icons-container .icons h3 {
        font-size: var(--heading-font-size);
        padding: 0.5rem 0;
        color: var(--black);
    }

    .about-us .box .content .icons-container .icons span {
        font-size: 1.7rem;
        color: var(--light-color);
    }

    .our-advantages-about {
        margin-top: 4rem;
        padding: 4rem 0;
        background: var(--light-bg);
    }

    .our-advantages-about .box-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
        gap: 2rem;
        padding: 2rem 0;
    }

    .our-advantages-about .box {
        text-align: center;
        padding: 2.5rem;
        background: var(--white);
        border-radius: var(--border-radius);
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
    }
    
    .our-advantages-about .box:hover {
        transform: translateY(-0.5rem);
    }

    .our-advantages-about .box i {
        font-size: 4rem;
        color: var(--primary-color);
        margin-bottom: 1rem;
    }

    .our-advantages-about .box h3 {
        font-size: var(--heading-font-size);
        color: var(--black);
        padding: 1rem 0;
    }

    .our-advantages-about .box p {
        font-size: 1.5rem;
        color: var(--light-color);
        line-height: 1.8;
    }

    .our-story {
        padding: 4rem 0;
    }

    .our-story .row .content {
        padding: 2rem;
        background: var(--light-bg);
        border-radius: var(--border-radius);
    }

    .our-story .row .content h3 {
        font-size: var(--heading-font-size);
        color: var(--black);
        margin-bottom: 1rem;
    }

    .our-story .row .content p {
        font-size: 1.5rem;
        color: var(--light-color);
        padding: 1rem 0;
        line-height: 2;
    }

    .our-story .row .content .btn {
        margin-top: 1rem;
        display: inline-block;
    }

    @media (max-width: 768px) {
        .about-us .box {
            flex-direction: column;
        }

        .about-us .box .image {
            width: 100%;
            height: 25rem;
        }

        .about-us .box .content .icons-container {
            flex-direction: column;
        }

        .our-advantages-about .box-container {
            grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
        }
    }
</style>
@endsection