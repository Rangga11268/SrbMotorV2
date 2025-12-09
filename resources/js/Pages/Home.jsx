import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import {
    CheckCircle,
    Wallet,
    Headset,
    Percent,
    Circle,
    AlertTriangle,
    User,
    Mail,
    MessageSquare,
} from "lucide-react";
import toast from "react-hot-toast";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export default function Home({ popularMotors }) {
    // Contact Form Handling
    const { data, setData, post, processing, reset } = useForm({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const submitContact = (e) => {
        e.preventDefault();
        post(route("contact.submit"), {
            onSuccess: () => {
                toast.success("Pesan Anda telah terkirim!");
                reset();
            },
            onError: () => {
                toast.error("Terjadi kesalahan. Silakan coba lagi.");
            },
        });
    };

    return (
        <MainLayout title="Home">
            {/* HERRO SECTION */}
            <section
                id="home"
                className="relative min-h-[90vh] flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-white to-gray-100 overflow-hidden px-4 pt-10"
            >
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/img/home-bg-pattern.png')] opacity-5 pointer-events-none"></div>

                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="z-10 text-center md:text-left md:w-1/2 flex flex-col items-center md:items-start"
                >
                    <h3 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-6 drop-shadow-sm">
                        Cari <span className="text-orange-500">Motor</span>{" "}
                        Impian Anda
                    </h3>
                    <p className="text-gray-600 text-lg mb-8 max-w-lg">
                        Temukan koleksi motor berkualitas dengan harga terbaik
                        hanya di SRB Motors.
                    </p>
                    <Link
                        href={route("motors.index")}
                        className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-1"
                    >
                        Cari Motor Sekarang
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 100 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="md:w-1/2 mt-10 md:mt-0 relative z-10"
                >
                    <img
                        src="/assets/img/home.svg"
                        alt="Motor Illustration"
                        className="w-full max-w-xl mx-auto drop-shadow-2xl animate-float"
                    />
                </motion.div>
            </section>

            {/* ADVANTAGES SECTION */}
            <section id="advantages" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
                        <span className="text-orange-500">Keunggulan</span> Kami
                    </h1>
                    <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
                        Jangan lewatkan berbagai keuntungan dan penawaran
                        terbaik saat Anda memilih SRB Motors.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: CheckCircle,
                                title: "Kualitas Terjamin",
                                desc: "Inspeksi ketat untuk kualitas terbaik.",
                            },
                            {
                                icon: Wallet,
                                title: "Harga Kompetitif",
                                desc: "Harga transparan dan pembiayaan fleksibel.",
                            },
                            {
                                icon: Headset,
                                title: "Layanan Profesional",
                                desc: "Pelayanan ramah dan profesional siap membantu.",
                            },
                            {
                                icon: Percent,
                                title: "Angsuran Terjangkau",
                                desc: "Potongan tenor 1-3 bulan untuk tipe tertentu.",
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -10 }}
                                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center hover:border-orange-500 transition-colors group"
                            >
                                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500 transition-colors">
                                    <item.icon
                                        size={32}
                                        className="text-orange-500 group-hover:text-white transition-colors"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 leading-relaxed">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* POPULAR MOTORS SECTION */}
            <section id="popular-motors" className="py-20 bg-gray-50 relative">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
                        Motor <span className="text-orange-500">Populer</span>
                    </h1>

                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        loop={popularMotors.length > 3}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="pb-12 px-4"
                    >
                        {popularMotors.map((motor) => (
                            <SwiperSlide key={motor.id} className="h-auto">
                                <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full flex flex-col hover:shadow-2xl transition-shadow duration-300">
                                    <div className="relative h-64 bg-gray-100 flex items-center justify-center p-4">
                                        <img
                                            src={`/storage/${motor.image_path}`}
                                            alt={motor.name}
                                            className="max-h-full max-w-full object-contain hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-6 flex-grow flex flex-col">
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                            {motor.name}
                                        </h3>
                                        <div className="text-lg font-bold text-orange-500 mb-4">
                                            Rp{" "}
                                            {new Intl.NumberFormat(
                                                "id-ID"
                                            ).format(motor.price)}
                                            ,-
                                        </div>

                                        <div className="space-y-2 mb-6 text-gray-600 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Circle
                                                    size={8}
                                                    className="text-orange-500 fill-current"
                                                />{" "}
                                                {motor.year}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Circle
                                                    size={8}
                                                    className="text-orange-500 fill-current"
                                                />{" "}
                                                {motor.type}
                                            </div>
                                        </div>

                                        {!motor.tersedia && (
                                            <div className="mb-4 text-red-500 font-bold flex items-center gap-2 animate-pulse">
                                                <AlertTriangle size={18} />{" "}
                                                Tidak Tersedia
                                            </div>
                                        )}

                                        <div className="mt-auto">
                                            <Link
                                                href={route(
                                                    "motors.show",
                                                    motor.id
                                                )}
                                                className="block w-full text-center bg-gray-800 text-white py-3 rounded-xl font-bold hover:bg-orange-500 transition-colors"
                                            >
                                                Lihat Detail
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            {/* ABOUT PREVIEW */}
            <section id="about-us" className="py-20 bg-white">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                            <img
                                src="/assets/img/about us.jpeg"
                                alt="Showroom"
                                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">
                            <span className="text-orange-500">Tentang</span>{" "}
                            Kami
                        </h1>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                            SRB Motors: Your Ride, Our Passion
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                            Selamat datang di SRB Motors! Kami bukan sekadar
                            dealer, tetapi mitra Anda dalam menemukan motor
                            impian dengan pengalaman pelanggan yang tak
                            tertandingi.
                        </p>
                        <Link
                            href={route("about")}
                            className="inline-block bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors shadow-lg"
                        >
                            Pelajari Lebih Lanjut
                        </Link>
                    </div>
                </div>
            </section>

            {/* GALLERY PREVIEW */}
            <section className="py-20 bg-gray-900 text-white text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">
                        Galeri <span className="text-orange-500">Motor</span>
                    </h1>
                    <p className="text-gray-400 mb-12 text-lg">
                        Temukan berbagai pilihan motor yang sesuai dengan
                        kebutuhan Anda
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {["Yamaha", "Honda"].map((brand) => (
                            <div
                                key={brand}
                                className="bg-gray-800 rounded-2xl p-8 hover:bg-gray-700 transition-colors border border-gray-700 hover:border-orange-500"
                            >
                                <h2 className="text-3xl font-bold mb-4">
                                    {brand}
                                </h2>
                                <p className="text-gray-400 mb-8">
                                    Temukan koleksi terbaik motor {brand}.
                                </p>
                                <Link
                                    href={route("motors.index", { brand })}
                                    className="inline-block border-2 border-orange-500 text-orange-500 px-6 py-2 rounded-full font-bold hover:bg-orange-500 hover:text-white transition-all"
                                >
                                    Lihat Motor {brand}
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12">
                        <Link
                            href={route("motors.index")}
                            className="text-white underline hover:text-orange-500 text-lg"
                        >
                            Lihat Semua Motor
                        </Link>
                    </div>
                </div>
            </section>

            {/* CONTACT SECTION */}
            <section id="contact" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center text-gray-900 mb-16">
                        <span className="text-orange-500">Kontak</span> Kami
                    </h1>

                    <div className="flex flex-col lg:flex-row shadow-2xl rounded-3xl overflow-hidden bg-white">
                        <div className="lg:w-1/2 h-96 lg:h-auto relative">
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d991.6155582081581!2d107.00215326955295!3d-6.202591866357196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698bfce9f106e7%3A0x7e0d6a60ab1445ab!2sJl.%20Perumahan%20Abadi%20No.21%2C%20Kaliabang%20Tengah%2C%20Kec.%20Bekasi%20Utara%2C%20Kota%20Bks%2C%20Jawa%20Barat%2017125!5e0!3m2!1sid!2sid!4v1748748018612!5m2!1sid!2sid"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                title="SRB Motors Location"
                            ></iframe>
                        </div>

                        <div className="lg:w-1/2 p-8 md:p-12">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">
                                Hubungi Kami
                            </h3>
                            <form
                                onSubmit={submitContact}
                                className="space-y-4"
                            >
                                <div>
                                    <div className="relative">
                                        <User
                                            className="absolute left-3 top-3 text-gray-400"
                                            size={20}
                                        />
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            placeholder="Nama Lengkap"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="relative">
                                        <Mail
                                            className="absolute left-3 top-3 text-gray-400"
                                            size={20}
                                        />
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            placeholder="Alamat Email"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="relative">
                                        <MessageSquare
                                            className="absolute left-3 top-3 text-gray-400"
                                            size={20}
                                        />
                                        <input
                                            type="text"
                                            value={data.subject}
                                            onChange={(e) =>
                                                setData(
                                                    "subject",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Subjek Pesan"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <textarea
                                        value={data.message}
                                        onChange={(e) =>
                                            setData("message", e.target.value)
                                        }
                                        placeholder="Tulis pesan Anda disini..."
                                        rows="4"
                                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {processing ? "Mengirim..." : "Kirim Pesan"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
