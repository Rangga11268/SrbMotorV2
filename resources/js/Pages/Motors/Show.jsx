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
} from "lucide-react";

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
        return key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    };

    return (
        <MainLayout title={motor.name}>
            <div className="bg-gray-50 min-h-screen py-10">
                <div className="container mx-auto px-4">
                    {/* Header / Breadcrumb-ish */}
                    <div className="mb-6">
                        <Link
                            href={route("motors.index")}
                            className="text-gray-500 hover:text-orange-500 font-medium flex items-center gap-2 transition-colors"
                        >
                            <ArrowLeft size={18} /> Kembali ke Daftar Motor
                        </Link>
                    </div>

                    {/* Motor Info Section */}
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12 border border-gray-100">
                        <div className="flex flex-col lg:flex-row">
                            {/* Image Column */}
                            <div className="lg:w-1/2 bg-gray-100 p-8 flex items-center justify-center relative">
                                <motion.img
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    src={`/storage/${motor.image_path}`}
                                    alt={motor.name}
                                    className="max-w-full max-h-[500px] object-contain drop-shadow-lg z-10"
                                />
                                <div className="absolute top-0 right-0 p-32 bg-orange-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                            </div>

                            {/* Info Column */}
                            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <div className="flex flex-wrap items-center gap-3 mb-4">
                                        <span className="bg-gray-900 text-white px-3 py-1 rounded-lg text-sm font-bold tracking-wide uppercase">
                                            {motor.brand}
                                        </span>
                                        {motor.tersedia ? (
                                            <span className="bg-green-100 text-green-700 border border-green-200 px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-1">
                                                <CheckCircle size={14} />{" "}
                                                Tersedia
                                            </span>
                                        ) : (
                                            <span className="bg-red-100 text-red-700 border border-red-200 px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-1">
                                                <XCircle size={14} /> Tidak
                                                Tersedia
                                            </span>
                                        )}
                                    </div>

                                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                                        {motor.name}
                                    </h1>

                                    <div className="grid grid-cols-2 gap-6 mb-8">
                                        <div>
                                            <div className="text-gray-400 text-sm uppercase font-bold tracking-wider mb-1">
                                                Model
                                            </div>
                                            <div className="text-xl font-bold text-gray-800">
                                                {motor.model || "N/A"}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-gray-400 text-sm uppercase font-bold tracking-wider mb-1">
                                                Tahun
                                            </div>
                                            <div className="text-xl font-bold text-gray-800">
                                                {motor.year || "N/A"}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-gray-400 text-sm uppercase font-bold tracking-wider mb-1">
                                                Tipe
                                            </div>
                                            <div className="text-xl font-bold text-gray-800">
                                                {motor.type || "N/A"}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-gray-400 text-sm uppercase font-bold tracking-wider mb-1">
                                                Harga OTR
                                            </div>
                                            <div className="text-2xl font-bold text-orange-500">
                                                Rp{" "}
                                                {new Intl.NumberFormat(
                                                    "id-ID"
                                                ).format(motor.price)}
                                                ,-
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100">
                                        <h5 className="font-bold text-gray-800 mb-2">
                                            Deskripsi
                                        </h5>
                                        <p className="text-gray-600 leading-relaxed text-sm">
                                            {motor.details ||
                                                "Deskripsi tidak tersedia."}
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
                                                    className="flex-1 bg-green-600 text-white flex items-center justify-center gap-2 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-200"
                                                >
                                                    <ShoppingCart size={20} />{" "}
                                                    Beli Tunai
                                                </Link>
                                                <Link
                                                    href={route(
                                                        "motors.credit-order",
                                                        motor.id
                                                    )}
                                                    className="flex-1 bg-blue-600 text-white flex items-center justify-center gap-2 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                                                >
                                                    <FileText size={20} />{" "}
                                                    Ajukan Kredit
                                                </Link>
                                            </>
                                        ) : (
                                            <>
                                                <Link
                                                    href={route("login")}
                                                    className="flex-1 bg-green-600 text-white flex items-center justify-center gap-2 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-200 opacity-90"
                                                >
                                                    <ShoppingCart size={20} />{" "}
                                                    Beli Tunai (Login)
                                                </Link>
                                                <Link
                                                    href={route("login")}
                                                    className="flex-1 bg-blue-600 text-white flex items-center justify-center gap-2 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 opacity-90"
                                                >
                                                    <FileText size={20} />{" "}
                                                    Ajukan Kredit (Login)
                                                </Link>
                                            </>
                                        )}
                                        <button
                                            onClick={openWhatsApp}
                                            className="flex-1 border-2 border-green-500 text-green-600 flex items-center justify-center gap-2 py-3 rounded-xl font-bold hover:bg-green-50 transition-colors"
                                        >
                                            <Phone size={20} /> WhatsApp
                                        </button>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Specifications Section */}
                    {motor.specifications &&
                        motor.specifications.length > 0 && (
                            <div className="mb-12">
                                <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                    <Settings className="text-orange-500" />{" "}
                                    Spesifikasi Lengkap
                                </h3>
                                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                                    {motor.specifications.map((spec, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center border-b border-gray-100 py-3 hover:bg-gray-50 px-2 rounded-lg transition-colors"
                                        >
                                            <span className="text-gray-500 font-medium">
                                                {spec.spec_key}
                                            </span>
                                            <span className="text-gray-900 font-bold text-right">
                                                {spec.spec_value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    {/* Related Motors */}
                    <div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-8">
                            Motor Lainnya
                        </h3>
                        {relatedMotors.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {relatedMotors.map((relatedMotor) => (
                                    <Link
                                        key={relatedMotor.id}
                                        href={route(
                                            "motors.show",
                                            relatedMotor.id
                                        )}
                                        className="group"
                                    >
                                        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                                            <div className="relative h-48 bg-gray-100 p-4 flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={`/storage/${relatedMotor.image_path}`}
                                                    alt={relatedMotor.name}
                                                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold shadow-sm text-gray-800">
                                                    {relatedMotor.brand}
                                                </div>
                                            </div>
                                            <div className="p-4 flex-grow flex flex-col">
                                                <h4 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1 group-hover:text-orange-500 transition-colors">
                                                    {relatedMotor.name}
                                                </h4>
                                                <div className="text-orange-500 font-bold mb-3">
                                                    Rp{" "}
                                                    {new Intl.NumberFormat(
                                                        "id-ID"
                                                    ).format(
                                                        relatedMotor.price
                                                    )}
                                                    ,-
                                                </div>
                                                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3 mt-auto">
                                                    <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
                                                        <Calendar size={12} />{" "}
                                                        {relatedMotor.year}
                                                    </span>
                                                    <span className="bg-gray-50 px-2 py-1 rounded-md">
                                                        {relatedMotor.type}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10 bg-gray-100 rounded-2xl text-gray-500">
                                Tidak ada motor lainnya saat ini.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
