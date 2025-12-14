import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { motion } from "framer-motion";
import {
    Calendar,
    Circle,
    Info,
    CheckCircle,
    XCircle,
    ShoppingCart,
    FileText,
    Phone,
    ArrowLeft,
    Ruler,
    Activity,
    Battery,
    Settings,
    Disc,
    Tag,
} from "lucide-react";
import ComparisonButton from "@/Components/ComparisonButton";

export default function Show({ motor, relatedMotors }) {
    const { auth } = usePage().props;

    const openWhatsApp = (e) => {
        e.preventDefault();
        const phoneNumber = "628978638849";
        const message = encodeURIComponent(
            `Halo SRB Motors, saya ingin bertanya tentang motor ${
                motor.name
            } yang harganya Rp. ${new Intl.NumberFormat("id-ID").format(
                motor.price
            )},-`
        );
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    };

    // Helper to format spec keys (camelCase/snake_case to Title Case)
    // and map to Indonesian if needed (simplified version of the Blade logic)
    const formatSpecKey = (key) => {
        const keyMap = {
            plate_number: "Nomor Polisi",
            engine_number: "Nomor Mesin",
            frame_number: "Nomor Rangka",
            bpkb_name: "Nama BPKB",
            stnk_name: "Nama STNK",
            tax_expiry: "Pajak Berlaku",
            registration_expiry: "STNK Berlaku",
            kilometer: "Kilometer",
            color: "Warna",
            transmission: "Transmisi",
            condition: "Kondisi",
        };
        return (
            keyMap[key] ||
            key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
        );
    };

    return (
        <MainLayout title={motor.name}>
            <div className="bg-gradient-to-br from-white via-blue-50/30 to-gray-50 min-h-screen pt-32 pb-10 relative overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-100/20 to-transparent -skew-x-12 pointer-events-none"></div>

                <div className="container mx-auto px-4 relative z-10">
                    {/* Header / Breadcrumb-ish */}
                    <div className="mb-8">
                        <Link
                            href={route("motors.index")}
                            className="inline-flex items-center gap-2 text-gray-500 hover:text-primary font-bold transition-colors bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md"
                        >
                            <ArrowLeft size={18} /> Kembali ke Daftar Motor
                        </Link>
                    </div>

                    {/* Motor Info Section */}
                    <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden mb-12 border border-gray-100">
                        <div className="flex flex-col lg:flex-row">
                            {/* Image Column */}
                            <div className="lg:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 p-8 lg:p-12 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-50"></div>
                                <motion.img
                                    initial={{ opacity: 0, scale: 0.9, x: -20 }}
                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                    transition={{ duration: 0.6 }}
                                    src={`/storage/${motor.image_path}`}
                                    alt={motor.name}
                                    className="max-w-full max-h-[500px] object-contain drop-shadow-2xl z-10 hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
                            </div>

                            {/* Info Column */}
                            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <div className="flex flex-wrap items-center gap-3 mb-6">
                                        <span className="bg-dark-blue text-white px-4 py-1.5 rounded-full text-sm font-extrabold tracking-wide uppercase shadow-lg shadow-blue-900/20">
                                            {motor.brand}
                                        </span>
                                        {motor.tersedia ? (
                                            <span className="bg-green-100 text-green-700 border border-green-200 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5 shadow-sm">
                                                <CheckCircle size={16} />{" "}
                                                Tersedia
                                            </span>
                                        ) : (
                                            <span className="bg-red-100 text-red-700 border border-red-200 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5 shadow-sm">
                                                <XCircle size={16} /> Tidak
                                                Tersedia
                                            </span>
                                        )}
                                    </div>

                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-8 leading-tight">
                                        {motor.name}
                                    </h1>

                                    <div className="grid grid-cols-2 gap-6 mb-8 bg-gray-50/80 p-6 rounded-2xl border border-gray-100 backdrop-blur-sm">
                                        <div className="space-y-1">
                                            <div className="text-gray-400 text-xs uppercase font-bold tracking-wider flex items-center gap-1">
                                                <Tag size={12} /> Model
                                            </div>
                                            <div className="text-xl font-bold text-gray-800">
                                                {motor.model || "-"}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-gray-400 text-xs uppercase font-bold tracking-wider flex items-center gap-1">
                                                <Calendar size={12} /> Tahun
                                            </div>
                                            <div className="text-xl font-bold text-gray-800">
                                                {motor.year || "-"}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-gray-400 text-xs uppercase font-bold tracking-wider flex items-center gap-1">
                                                <Info size={12} /> Tipe
                                            </div>
                                            <div className="text-xl font-bold text-gray-800">
                                                {motor.type || "-"}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-gray-400 text-xs uppercase font-bold tracking-wider flex items-center gap-1">
                                                <Tag size={12} /> Harga OTR
                                            </div>
                                            <div className="text-2xl font-bold text-primary">
                                                Rp{" "}
                                                {new Intl.NumberFormat(
                                                    "id-ID"
                                                ).format(motor.price)}
                                                ,-
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white border border-gray-100 p-6 rounded-2xl mb-8 shadow-sm">
                                        <h5 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                            <FileText
                                                size={18}
                                                className="text-primary"
                                            />{" "}
                                            Deskripsi
                                        </h5>
                                        <p className="text-gray-600 leading-relaxed text-sm">
                                            {motor.details ||
                                                "Deskripsi tidak tersedia untuk saat ini."}
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        {auth.user ? (
                                            <>
                                                <Link
                                                    href={route(
                                                        "motors.cash-order",
                                                        motor.id
                                                    )}
                                                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold shadow-lg transition-transform active:scale-95 ${
                                                        !motor.tersedia
                                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                                                            : "bg-green-600 text-white hover:bg-green-700 shadow-green-200"
                                                    }`}
                                                    onClick={(e) =>
                                                        !motor.tersedia &&
                                                        e.preventDefault()
                                                    }
                                                >
                                                    <ShoppingCart size={20} />{" "}
                                                    Beli Tunai
                                                </Link>
                                                <Link
                                                    href={route(
                                                        "motors.credit-order",
                                                        motor.id
                                                    )}
                                                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold shadow-lg transition-transform active:scale-95 ${
                                                        !motor.tersedia
                                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                                                            : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200"
                                                    }`}
                                                    onClick={(e) =>
                                                        !motor.tersedia &&
                                                        e.preventDefault()
                                                    }
                                                >
                                                    <FileText size={20} />{" "}
                                                    Ajukan Kredit
                                                </Link>
                                            </>
                                        ) : (
                                            <>
                                                <Link
                                                    href={route("login")}
                                                    className="flex-1 bg-green-600/90 text-white flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-200"
                                                >
                                                    <ShoppingCart size={20} />{" "}
                                                    Beli Tunai (Login)
                                                </Link>
                                                <Link
                                                    href={route("login")}
                                                    className="flex-1 bg-blue-600/90 text-white flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                                                >
                                                    <FileText size={20} />{" "}
                                                    Ajukan Kredit (Login)
                                                </Link>
                                            </>
                                        )}
                                        <button
                                            onClick={openWhatsApp}
                                            className="flex-1 border-2 border-green-500 text-green-600 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold hover:bg-green-50 transition-colors"
                                        >
                                            <Phone size={20} /> WhatsApp
                                        </button>
                                        <ComparisonButton
                                            motor={motor}
                                            className="h-[54px] px-6"
                                        />
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Specifications Section */}
                    {motor.specifications &&
                        motor.specifications.length > 0 && (
                            <div className="mb-16">
                                <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                    <div className="bg-primary/10 p-2 rounded-lg text-primary">
                                        <Settings size={28} />
                                    </div>
                                    Spesifikasi Lengkap
                                </h3>
                                <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 md:p-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
                                        {motor.specifications.map(
                                            (spec, index) => (
                                                <div
                                                    key={index}
                                                    className="flex flex-col border-b border-gray-100 pb-3 last:border-0 hover:bg-gray-50/50 p-2 rounded-lg transition-colors"
                                                >
                                                    <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">
                                                        {formatSpecKey(
                                                            spec.spec_key
                                                        )}
                                                    </span>
                                                    <span className="text-gray-900 font-bold text-lg">
                                                        {spec.spec_value}
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                    {/* Related Motors */}
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-3xl font-bold text-gray-900">
                                Motor Lainnya
                            </h3>
                            <Link
                                href={route("motors.index")}
                                className="text-primary font-bold hover:underline"
                            >
                                Lihat Semua
                            </Link>
                        </div>

                        {relatedMotors.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {relatedMotors.map((relatedMotor) => (
                                    <Link
                                        key={relatedMotor.id}
                                        href={route(
                                            "motors.show",
                                            relatedMotor.id
                                        )}
                                        className="group"
                                    >
                                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col transform hover:-translate-y-2">
                                            <div className="relative h-56 bg-gradient-to-br from-gray-50 to-white p-6 flex items-center justify-center overflow-hidden">
                                                <div className="absolute top-4 left-4 z-10">
                                                    <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm border border-gray-100">
                                                        {relatedMotor.brand}
                                                    </span>
                                                </div>
                                                <img
                                                    src={`/storage/${relatedMotor.image_path}`}
                                                    alt={relatedMotor.name}
                                                    className="max-h-full max-w-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="p-6 flex-grow flex flex-col">
                                                <h4 className="text-lg font-extrabold text-gray-900 mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                                                    {relatedMotor.name}
                                                </h4>
                                                <div className="text-primary font-bold text-xl mb-4">
                                                    Rp{" "}
                                                    {new Intl.NumberFormat(
                                                        "id-ID"
                                                    ).format(
                                                        relatedMotor.price
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3 mt-auto">
                                                    <span className="flex items-center gap-1 bg-gray-50 border border-gray-100 px-2 py-1 rounded-md font-medium">
                                                        <Calendar
                                                            size={12}
                                                            className="text-primary"
                                                        />{" "}
                                                        {relatedMotor.year}
                                                    </span>
                                                    <span className="bg-gray-50 border border-gray-100 px-2 py-1 rounded-md font-medium">
                                                        {relatedMotor.type}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
                                <Info
                                    size={48}
                                    className="text-gray-300 mx-auto mb-4"
                                />
                                <p className="text-gray-500 font-medium">
                                    Tidak ada rekomendasi motor lainnya saat
                                    ini.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
