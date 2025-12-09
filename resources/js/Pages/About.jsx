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
} from "lucide-react";

export default function About() {
    return (
        <MainLayout title="Tentang Kami">
            {/* ABOUT HERO */}
            <section className="py-20 bg-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold text-center text-gray-900 mb-12"
                    >
                        <span className="text-orange-500">Tentang</span> Kami
                    </motion.h1>

                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="lg:w-1/2"
                        >
                            <div className="rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                                <img
                                    src="/assets/img/about us.jpeg"
                                    alt="Interior Showroom SRB Motors"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="lg:w-1/2"
                        >
                            <h3 className="text-3xl font-bold text-gray-800 mb-6">
                                SRB Motors: Your Ride, Our Passion
                            </h3>
                            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                                <p>
                                    Selamat datang di SRB Motors! Kami bukan
                                    sekadar dealer, tetapi mitra Anda dalam
                                    menemukan motor impian. Misi kami adalah
                                    menyediakan pilihan motor berkualitas
                                    tinggi, harga yang transparan, serta
                                    pelayanan ramah dan profesional. Kepuasan
                                    dan kepercayaan pelanggan adalah prioritas
                                    utama kami.
                                </p>
                                <p>
                                    Berdiri dari kecintaan terhadap dunia
                                    otomotif roda dua, SRB Motors berkomitmen
                                    menjadi mitra terpercaya bagi para pecinta
                                    motor. Kami percaya bahwa kepercayaan dan
                                    hubungan jangka panjang dengan pelanggan
                                    adalah kunci utama. Temukan berbagai pilihan
                                    motor terbaik bersama kami dan wujudkan
                                    perjalanan impian Anda.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                                {[
                                    {
                                        icon: Star,
                                        count: "300+",
                                        label: "Motor Terjual",
                                    },
                                    {
                                        icon: User,
                                        count: "250+",
                                        label: "Pelanggan Puas",
                                    },
                                    {
                                        icon: Medal,
                                        count: "10+",
                                        label: "Tahun Pengalaman",
                                    },
                                ].map((stat, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-orange-50 p-6 rounded-2xl text-center hover:bg-orange-100 transition-colors shadow-sm"
                                    >
                                        <stat.icon
                                            size={36}
                                            className="text-orange-500 mx-auto mb-3"
                                        />
                                        <h3 className="text-2xl font-bold text-gray-800 mb-1">
                                            {stat.count}
                                        </h3>
                                        <span className="text-gray-600 font-medium">
                                            {stat.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ADVANTAGES SECTION (Reused logic) */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
                        <span className="text-orange-500">Keunggulan</span> Kami
                    </h1>
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
                                whileHover={{ y: -5 }}
                                className="bg-white p-8 rounded-2xl shadow-lg text-center"
                            >
                                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <item.icon
                                        size={32}
                                        className="text-orange-500"
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

            {/* OUR STORY */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
                        <span className="text-orange-500">Sejarah</span> Kami
                    </h1>
                    <div className="max-w-4xl mx-auto bg-gray-50 p-10 rounded-3xl shadow-lg border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                            Perjalanan Kami Sejak Awal Berdiri
                        </h3>
                        <div className="space-y-6 text-gray-600 text-lg leading-relaxed text-justify">
                            <p>
                                SRB Motors berdiri dengan semangat yang tinggi
                                untuk melayani para pecinta otomotif roda dua.
                                Awalnya dimulai dari kecintaan terhadap dunia
                                otomotif dan keinginan untuk menyediakan solusi
                                transportasi yang handal dan berkualitas. Dengan
                                pengalaman bertahun-tahun di industri ini, kami
                                telah membantu ribuan pelanggan menemukan motor
                                yang sesuai dengan kebutuhan dan gaya hidup
                                mereka.
                            </p>
                            <p>
                                Kami terus berkomitmen untuk memberikan layanan
                                terbaik, baik dalam pilihan produk maupun dalam
                                pelayanan purna jual. Tim kami yang profesional
                                dan berpengalaman siap membantu Anda dalam
                                menemukan motor impian Anda dengan layanan yang
                                ramah dan transparan.
                            </p>
                        </div>
                        <div className="text-center mt-10">
                            <Link
                                href={route("motors.index")}
                                className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors shadow-lg inline-flex items-center gap-2"
                            >
                                Jelajahi Motor <CheckCircle size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
