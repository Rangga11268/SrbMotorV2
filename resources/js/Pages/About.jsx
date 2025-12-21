import React from "react";
import { Head, Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { motion } from "framer-motion";
import {
    Star,
    User,
    Medal,
    CheckCircle,
    Wallet,
    Headset,
    Percent,
    ArrowRight,
    Target,
    Heart,
} from "lucide-react";

export default function About() {
    return (
        <MainLayout title="Tentang Kami">
            {/* ABOUT HERO */}
            <section className="relative pt-8 pb-20 bg-gradient-to-br from-white via-indigo-50 to-blue-50 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-100/30 to-transparent skew-x-12 transform translate-x-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <span className="text-primary font-bold tracking-wider uppercase text-sm">
                            Profil Perusahaan
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2 mb-4">
                            Tentang{" "}
                            <span className="text-primary">SRB Motors</span>
                        </h1>
                        <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                    </motion.div>

                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="lg:w-1/2 relative"
                        >
                            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
                            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"></div>
                            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white transform hover:scale-[1.01] transition-transform duration-500">
                                <img
                                    src="/assets/img/about us.jpeg"
                                    alt="Interior Showroom SRB Motors"
                                    className="w-full h-auto object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                    <div className="text-white">
                                        <p className="font-bold text-lg">
                                            Showroom Utama
                                        </p>
                                        <p className="text-sm text-gray-200">
                                            Bekasi Utara, Jawa Barat
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="lg:w-1/2"
                        >
                            <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                Your Ride, Our{" "}
                                <span className="text-primary italic">
                                    Passion
                                </span>
                            </h3>
                            <div className="space-y-6 text-gray-600 text-lg leading-relaxed text-justify">
                                <p>
                                    Selamat datang di SRB Motors! Kami bukan
                                    sekadar dealer, tetapi mitra Anda dalam
                                    menemukan motor impian. Misi kami adalah
                                    menyediakan pilihan motor berkualitas
                                    tinggi, harga yang transparan, serta
                                    pelayanan ramah dan profesional.
                                </p>
                                <p>
                                    Berdiri dari kecintaan terhadap dunia
                                    otomotif roda dua, SRB Motors berkomitmen
                                    menjadi mitra terpercaya bagi para pecinta
                                    motor. Kami percaya bahwa kepercayaan dan
                                    hubungan jangka panjang dengan pelanggan
                                    adalah kunci utama.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
                                {[
                                    {
                                        icon: Star,
                                        count: "500+",
                                        label: "Motor Terjual",
                                        color: "text-amber-500",
                                        bg: "bg-amber-50",
                                    },
                                    {
                                        icon: User,
                                        count: "1000+",
                                        label: "Pelanggan Puas",
                                        color: "text-blue-500",
                                        bg: "bg-blue-50",
                                    },
                                    {
                                        icon: Medal,
                                        count: "5+",
                                        label: "Tahun Pengalaman",
                                        color: "text-purple-500",
                                        bg: "bg-purple-50",
                                    },
                                ].map((stat, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white p-4 rounded-2xl text-center hover:shadow-lg transition-all border border-gray-100 group"
                                    >
                                        <div
                                            className={`${stat.bg} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
                                        >
                                            <stat.icon
                                                size={24}
                                                className={stat.color}
                                            />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-0">
                                            {stat.count}
                                        </h3>
                                        <span className="text-sm text-gray-500 font-medium">
                                            {stat.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* VISION & MISSION */}
            <section className="py-24 bg-white relative">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100 hover:border-primary/30 transition-colors">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="bg-primary p-3 rounded-xl text-white shadow-lg shadow-primary/30">
                                    <Target size={28} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">
                                    Visi Kami
                                </h3>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Menjadi dealer motor terdepan yang dikenal
                                karena integritas, kualitas layanan, dan
                                komitmen terhadap kepuasan pelanggan di seluruh
                                Indonesia.
                            </p>
                        </div>
                        <div className="bg-purple-50/50 p-8 rounded-3xl border border-purple-100 hover:border-purple-300 transition-colors">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="bg-purple-600 p-3 rounded-xl text-white shadow-lg shadow-purple-600/30">
                                    <Heart size={28} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">
                                    Misi Kami
                                </h3>
                            </div>
                            <ul className="space-y-3 text-gray-600 text-lg">
                                <li className="flex items-start gap-3">
                                    <CheckCircle
                                        size={20}
                                        className="text-purple-600 mt-1 shrink-0"
                                    />
                                    <span>
                                        Menyediakan kendaraan berkualitas tinggi
                                        dengan harga kompetitif.
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle
                                        size={20}
                                        className="text-purple-600 mt-1 shrink-0"
                                    />
                                    <span>
                                        Memberikan pelayanan yang jujur,
                                        transparan, dan bersahabat.
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle
                                        size={20}
                                        className="text-purple-600 mt-1 shrink-0"
                                    />
                                    <span>
                                        Membangun hubungan jangka panjang dengan
                                        setiap pelanggan.
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ADVANTAGES SECTION (Reused logic with updated style) */}
            <section className="py-24 bg-gray-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-50"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Nilai-Nilai Utama
                        </h2>
                        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                            Prinsip yang kami pegang teguh dalam melayani Anda.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: CheckCircle,
                                title: "Kualitas",
                                desc: "Standar tinggi dalam setiap unit.",
                                color: "text-green-500",
                                bg: "bg-green-50",
                            },
                            {
                                icon: Wallet,
                                title: "Transparansi",
                                desc: "Tidak ada biaya tersembunyi.",
                                color: "text-blue-500",
                                bg: "bg-blue-50",
                            },
                            {
                                icon: Headset,
                                title: "Pelayanan",
                                desc: "Respon cepat dan ramah.",
                                color: "text-purple-500",
                                bg: "bg-purple-50",
                            },
                            {
                                icon: Percent,
                                title: "Kemudahan",
                                desc: "Proses cepat dan anti ribet.",
                                color: "text-orange-500",
                                bg: "bg-orange-50",
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center group"
                            >
                                <div
                                    className={`${item.bg} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform`}
                                >
                                    <item.icon
                                        size={28}
                                        className={item.color}
                                    />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Link
                            href={route("motors.index")}
                            className="inline-flex items-center gap-2 bg-primary text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-dark-blue transition-all shadow-lg hover:shadow-primary/40"
                        >
                            Temukan Motor Impian Anda <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
