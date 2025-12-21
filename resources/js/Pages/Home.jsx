import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
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
    ArrowRight,
    Star,
    MapPin,
    Phone,
} from "lucide-react";
import toast from "react-hot-toast";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Home({ popularMotors }) {
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
                toast.success("Pesan Anda telah terkirim!", {
                    style: {
                        background: "#4a90e2",
                        color: "#fff",
                    },
                    iconTheme: {
                        primary: "#fff",
                        secondary: "#4a90e2",
                    },
                });
                reset();
            },
            onError: () => {
                toast.error("Terjadi kesalahan. Silakan coba lagi.");
            },
        });
    };

    return (
        <MainLayout title="Home">
            <section
                id="home"
                className="relative min-h-[90vh] flex flex-col md:flex-row items-center md:items-start justify-start bg-gradient-to-br from-white via-indigo-50 to-blue-50 overflow-hidden px-4 md:px-6 pt-4 pb-12"
            >
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-100/30 to-transparent skew-x-12 transform translate-x-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="container mx-auto flex flex-col-reverse md:flex-row items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full md:w-1/2 text-center md:text-left mt-12 md:mt-0"
                    >
                        <div className="inline-block px-4 py-1.5 bg-blue-100 text-primary font-bold rounded-full text-sm mb-6 shadow-sm border border-blue-200">
                            Dealer Motor Terpercaya #1
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
                            Wujudkan Impian <br />
                            Memiliki{" "}
                            <span className="text-primary italic relative">
                                Motor Baru
                                <svg
                                    className="absolute w-full h-3 -bottom-1 left-0 text-primary opacity-30"
                                    viewBox="0 0 100 10"
                                    preserveAspectRatio="none"
                                >
                                    <path
                                        d="M0 5 Q 50 10 100 5"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="none"
                                    />
                                </svg>
                            </span>
                        </h1>
                        <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed">
                            Dapatkan penawaran terbaik, proses kredit mudah, dan
                            layanan purna jual terjamin hanya di SRB Motors.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                            <Link
                                href={route("motors.index")}
                                className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-dark-blue transition-all shadow-lg hover:shadow-primary/40 transform hover:-translate-y-1 flex items-center justify-center gap-2"
                            >
                                Cari Motor Sekarang <ArrowRight size={20} />
                            </Link>
                            <a
                                href="#contact"
                                className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-full font-bold text-lg hover:bg-gray-50 hover:text-primary transition-all shadow-sm hover:shadow-md flex items-center justify-center"
                            >
                                Hubungi Kami
                            </a>
                        </div>

                        <div className="mt-12 flex items-center justify-center md:justify-start gap-8 text-gray-500">
                            <div className="flex flex-col items-center md:items-start">
                                <span className="text-2xl font-bold text-gray-800">
                                    500+
                                </span>
                                <span className="text-sm">Unit Terjual</span>
                            </div>
                            <div className="h-10 w-px bg-gray-300"></div>
                            <div className="flex flex-col items-center md:items-start">
                                <span className="text-2xl font-bold text-gray-800">
                                    1k+
                                </span>
                                <span className="text-sm">Pelanggan Puas</span>
                            </div>
                            <div className="h-10 w-px bg-gray-300"></div>
                            <div className="flex flex-col items-center md:items-start">
                                <span className="text-2xl font-bold text-gray-800">
                                    24/7
                                </span>
                                <span className="text-sm">Support</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.2,
                            ease: "easeOut",
                        }}
                        className="w-full md:w-1/2 relative z-10 flex justify-center md:justify-end"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-transparent rounded-full opacity-50 blur-3xl transform scale-90"></div>
                        <img
                            src="/assets/img/home.svg"
                            alt="Motor Illustration"
                            className="w-full md:w-[120%] max-w-4xl drop-shadow-2xl animate-float relative z-10"
                        />
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-400 animate-bounce"
                >
                    <span className="text-xs font-medium mb-1">
                        Scroll Down
                    </span>
                    <ArrowRight size={16} className="rotate-90" />
                </motion.div>
            </section>

            <section id="advantages" className="py-24 bg-white relative">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold tracking-wider uppercase text-sm">
                            Kenapa Memilih Kami?
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
                            Keunggulan{" "}
                            <span className="text-primary">SRB Motors</span>
                        </h2>
                        <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: CheckCircle,
                                title: "Kualitas Terjamin",
                                desc: "Setiap unit melewati proses inspeksi ketat untuk memastikan kondisi terbaik.",
                                color: "text-green-500",
                                bg: "bg-green-50",
                            },
                            {
                                icon: Wallet,
                                title: "Harga Kompetitif",
                                desc: "Penawaran harga terbaik dengan rincian biaya yang transparan.",
                                color: "text-blue-500",
                                bg: "bg-blue-50",
                            },
                            {
                                icon: Headset,
                                title: "Layanan Profesional",
                                desc: "Tim kami siap membantu Anda mulai dari konsultasi hingga purna jual.",
                                color: "text-purple-500",
                                bg: "bg-purple-50",
                            },
                            {
                                icon: Percent,
                                title: "Bonus Menarik",
                                desc: "Dapatkan helm, jaket gratis, dan potongan angsuran untuk promo tertentu.",
                                color: "text-orange-500",
                                bg: "bg-orange-50",
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -8 }}
                                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                            >
                                <div
                                    className={`${item.bg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                                >
                                    <item.icon
                                        size={32}
                                        className={item.color}
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 leading-relaxed text-sm">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section
                id="popular-motors"
                className="py-24 bg-gray-50/80 relative overflow-hidden"
            >
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <div>
                            <span className="text-primary font-bold tracking-wider uppercase text-sm">
                                Koleksi Terbaik
                            </span>
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2">
                                Motor{" "}
                                <span className="text-primary">Populer</span>
                            </h2>
                        </div>
                        <Link
                            href={route("motors.index")}
                            className="hidden md:flex items-center gap-2 text-primary font-bold hover:text-dark-blue transition-colors"
                        >
                            Lihat Semua <ArrowRight size={20} />
                        </Link>
                    </div>

                    <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        spaceBetween={30}
                        slidesPerView={1}
                        loop={popularMotors.length > 3}
                        autoplay={{ delay: 3500, disableOnInteraction: false }}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        navigation={true}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="pb-16 px-4 !overflow-visible"
                    >
                        {popularMotors.map((motor) => (
                            <SwiperSlide key={motor.id} className="h-auto">
                                <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-50/50">
                                    <div className="relative h-64 bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-6 group">
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-600 shadow-sm border border-gray-100 z-10">
                                            {motor.year}
                                        </div>
                                        <img
                                            src={`/storage/${motor.image_path}`}
                                            alt={motor.name}
                                            className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-lg"
                                        />
                                    </div>
                                    <div className="p-6 flex-grow flex flex-col">
                                        <div className="text-xs font-bold text-primary mb-1 uppercase tracking-wide">
                                            {motor.brand?.name || "Motor"}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                                            {motor.name}
                                        </h3>

                                        <div className="flex items-center gap-1 mb-4 text-emerald-500 text-sm font-medium">
                                            <CheckCircle
                                                size={14}
                                                className="fill-current"
                                            />{" "}
                                            Tersedia
                                        </div>

                                        <div className="mt-auto border-t border-gray-100 pt-4 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-xs text-gray-400">
                                                    Harga Mulai
                                                </span>
                                                <span className="text-lg font-bold text-dark-blue">
                                                    Rp{" "}
                                                    {new Intl.NumberFormat(
                                                        "id-ID"
                                                    ).format(motor.price)}
                                                </span>
                                            </div>
                                            <Link
                                                href={route(
                                                    "motors.show",
                                                    motor.id
                                                )}
                                                className="bg-gray-900 text-white p-3 rounded-xl hover:bg-primary transition-colors shadow-lg shadow-gray-200"
                                            >
                                                <ArrowRight size={20} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="mt-8 text-center md:hidden">
                        <Link
                            href={route("motors.index")}
                            className="inline-flex items-center gap-2 text-primary font-bold hover:text-dark-blue transition-colors"
                        >
                            Lihat Semua <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            <section id="about-us" className="py-24 bg-white relative">
                <div className="container mx-auto px-6">
                    <div className="bg-dark-blue rounded-[2.5rem] overflow-hidden shadow-2xl relative">
                        <div className="absolute top-0 right-0 w-2/3 h-full bg-primary/10 -skew-x-12 transform translate-x-32"></div>

                        <div className="flex flex-col md:flex-row items-stretch">
                            <div className="md:w-1/2 relative min-h-[400px]">
                                <img
                                    src="/assets/img/about us.jpeg"
                                    alt="Showroom"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-dark-blue/80 to-transparent md:bg-gradient-to-r md:from-transparent md:to-transparent"></div>
                            </div>

                            <div className="md:w-1/2 p-10 md:p-16 text-white relative z-10 flex flex-col justify-center">
                                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                                    Tentang{" "}
                                    <span className="text-primary">Kami</span>
                                </h2>
                                <h3 className="text-xl font-semibold text-blue-100 mb-6">
                                    Lebih dari sekadar dealer motor.
                                </h3>
                                <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                                    SRB Motors hadir untuk memberikan pengalaman
                                    terbaik dalam membeli kendaraan impian Anda.
                                    Dengan integritas, kualitas, dan pelayanan
                                    sepenuh hati, kami siap menjadi partner
                                    perjalanan Anda.
                                </p>
                                <div>
                                    <Link
                                        href={route("about")}
                                        className="inline-flex items-center gap-2 bg-white text-dark-blue px-8 py-3 rounded-full font-bold hover:bg-primary hover:text-white transition-all shadow-lg"
                                    >
                                        Pelajari Lebih Lanjut{" "}
                                        <ArrowRight size={18} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                        Siap Menemukan{" "}
                        <span className="text-primary">Motor Baru?</span>
                    </h2>
                    <p className="text-gray-500 mb-12 max-w-2xl mx-auto text-lg">
                        Jelajahi galeri lengkap kami yang mencakup berbagai
                        merek ternama. Temukan spesifikasi yang pas untuk gaya
                        hidup Anda.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
                        {["Yamaha", "Honda"].map((brand) => (
                            <Link
                                key={brand}
                                href={route("motors.index", { search: brand })}
                                className="group relative overflow-hidden rounded-2xl aspect-video flex items-center justify-center shadow-xl"
                            >
                                <div
                                    className={`absolute inset-0 ${
                                        brand === "Yamaha"
                                            ? "bg-blue-900"
                                            : "bg-red-900"
                                    } transition-transform duration-500 group-hover:scale-110`}
                                ></div>
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
                                <div className="relative z-10 text-center">
                                    <h3 className="text-3xl font-bold text-white mb-2">
                                        {brand}
                                    </h3>
                                    <span className="inline-block px-4 py-1 text-sm text-white border border-white/30 rounded-full group-hover:bg-white group-hover:text-gray-900 transition-all">
                                        Lihat Koleksi
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <Link
                        href={route("motors.index")}
                        className="text-gray-600 font-bold hover:text-primary transition-colors inline-flex items-center gap-2 border-b-2 border-transparent hover:border-primary pb-1"
                    >
                        Lihat Seluruh Katalog <ArrowRight size={18} />
                    </Link>
                </div>
            </section>

            <section
                id="contact"
                className="py-24 bg-dark-blue relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">
                        <div className="lg:w-1/2 text-white">
                            <span className="text-primary font-bold tracking-wider uppercase text-sm">
                                Hubungi Kami
                            </span>
                            <h2 className="text-4xl font-bold mt-2 mb-6">
                                Kami Siap{" "}
                                <span className="text-white">
                                    Membantu Anda
                                </span>
                            </h2>
                            <p className="text-gray-300 text-lg mb-10 leading-relaxed">
                                Punya pertanyaan tentang unit motor atau
                                simulasi kredit? Jangan ragu untuk menghubungi
                                tim kami atau datang langsung ke showroom.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="bg-primary p-3 rounded-lg text-white">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">
                                            Lokasi Showroom
                                        </h4>
                                        <p className="text-gray-300">
                                            Jl lori sakti Rt 01 Rw 01 No 22,
                                            Kaliabang tengah, Bekasi utara
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="bg-primary p-3 rounded-lg text-white">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">
                                            Telepon & WhatsApp
                                        </h4>
                                        <div className="flex flex-col text-gray-300">
                                            <a
                                                href="tel:08978638849"
                                                className="hover:text-primary transition-colors"
                                            >
                                                08978638849
                                            </a>
                                            <a
                                                href="tel:08978638973"
                                                className="hover:text-primary transition-colors"
                                            >
                                                08978638973
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="bg-primary p-3 rounded-lg text-white">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">
                                            Email
                                        </h4>
                                        <a
                                            href="mailto:darrelrangga@gmail.com"
                                            className="text-gray-300 hover:text-primary transition-colors"
                                        >
                                            darrelrangga@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2">
                            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                    Kirim Pesan
                                </h3>
                                <form
                                    onSubmit={submitContact}
                                    className="space-y-5"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                                Nama Lengkap
                                            </label>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="John Doe"
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="email@example.com"
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">
                                            Subjek
                                        </label>
                                        <input
                                            type="text"
                                            value={data.subject}
                                            onChange={(e) =>
                                                setData(
                                                    "subject",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Tanya info motor..."
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">
                                            Pesan
                                        </label>
                                        <textarea
                                            value={data.message}
                                            onChange={(e) =>
                                                setData(
                                                    "message",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Tulis pesan Anda disini..."
                                            rows="4"
                                            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none bg-gray-50 focus:bg-white"
                                            required
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-dark-blue transition-all shadow-lg hover:shadow-primary/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {processing ? (
                                            "Mengirim..."
                                        ) : (
                                            <>
                                                Kirim Pesan{" "}
                                                <ArrowRight size={20} />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
