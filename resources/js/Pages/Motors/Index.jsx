import React, { useState, useEffect } from "react";
import { Head, Link, router } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import {
    Search,
    RotateCcw,
    Filter,
    Calendar,
    Info,
    AlertCircle,
    ShoppingCart,
    CheckCircle,
    ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Index({ motors, filters, brands, types, years }) {
    // State for filters
    const [values, setValues] = useState({
        search: filters.search || "",
        brand: filters.brand || "",
        type: filters.type || "",
        year: filters.year || "",
        min_price: filters.min_price || "",
        max_price: filters.max_price || "",
    });

    // Handle filter changes
    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    };

    // Debounce search and trigger filter update
    useEffect(() => {
        const query = Object.keys(values).reduce((acc, key) => {
            if (values[key]) acc[key] = values[key];
            return acc;
        }, {});

        // Use a timeout to debounce the request to avoid spamming server
        const timer = setTimeout(() => {
            router.get(route("motors.index"), query, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }, 300);

        return () => clearTimeout(timer);
    }, [values]);

    const resetFilters = () => {
        setValues({
            search: "",
            brand: "",
            type: "",
            year: "",
            min_price: "",
            max_price: "",
        });
    };

    return (
        <MainLayout title="Semua Motor">
            <div className="bg-gradient-to-br from-gray-50 to-blue-50/20 min-h-screen py-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <span className="text-primary font-bold tracking-wider uppercase text-sm">
                            Katalog Lengkap
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2 mb-6">
                            Temukan{" "}
                            <span className="text-primary">Motor Impian</span>{" "}
                            Anda
                        </h1>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                            Jelajahi berbagai pilihan motor berkualitas dengan
                            harga terbaik dan proses yang mudah.
                        </p>
                    </motion.div>

                    {/* Filter Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-[2rem] shadow-xl p-8 mb-12 border border-gray-100"
                    >
                        <div className="flex items-center gap-2 mb-6 text-gray-800 font-bold text-lg border-b border-gray-100 pb-4">
                            <Filter size={20} className="text-primary" /> Filter
                            Pencarian
                        </div>

                        <div className="flex flex-col lg:flex-row gap-6 mb-8">
                            {/* Search */}
                            <div className="flex-grow relative">
                                <Search
                                    className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    size={22}
                                />
                                <input
                                    type="text"
                                    name="search"
                                    value={values.search}
                                    onChange={handleChange}
                                    placeholder="Cari berdasarkan nama motor..."
                                    className="w-full pl-14 pr-6 py-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all bg-gray-50 focus:bg-white text-lg"
                                />
                            </div>
                            <button
                                onClick={resetFilters}
                                className="px-8 py-4 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-red-500 hover:border-red-200 transition-all flex items-center justify-center gap-2 font-bold shadow-sm"
                            >
                                <RotateCcw size={20} /> Reset
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Brand Filter */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">
                                    Brand
                                </label>
                                <div className="relative">
                                    <select
                                        name="brand"
                                        value={values.brand}
                                        onChange={handleChange}
                                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none bg-gray-50 appearance-none font-medium text-gray-700"
                                    >
                                        <option value="">Semua Brand</option>
                                        {brands.map((brand) => (
                                            <option key={brand} value={brand}>
                                                {brand}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                                        <ArrowRight
                                            size={16}
                                            className="rotate-90"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Type Filter */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">
                                    Tipe
                                </label>
                                <div className="relative">
                                    <select
                                        name="type"
                                        value={values.type}
                                        onChange={handleChange}
                                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none bg-gray-50 appearance-none font-medium text-gray-700"
                                    >
                                        <option value="">Semua Tipe</option>
                                        {types.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                                        <ArrowRight
                                            size={16}
                                            className="rotate-90"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Year Filter */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">
                                    Tahun
                                </label>
                                <div className="relative">
                                    <select
                                        name="year"
                                        value={values.year}
                                        onChange={handleChange}
                                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none bg-gray-50 appearance-none font-medium text-gray-700"
                                    >
                                        <option value="">Semua Tahun</option>
                                        {years.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                                        <ArrowRight
                                            size={16}
                                            className="rotate-90"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">
                                    Range Harga (Juta)
                                </label>
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="number"
                                        name="min_price"
                                        value={values.min_price}
                                        onChange={handleChange}
                                        placeholder="Min"
                                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none bg-gray-50 text-sm font-medium"
                                    />
                                    <span className="text-gray-400">-</span>
                                    <input
                                        type="number"
                                        name="max_price"
                                        value={values.max_price}
                                        onChange={handleChange}
                                        placeholder="Max"
                                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none bg-gray-50 text-sm font-medium"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Grid Section */}
                    {motors.data.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            <AnimatePresence>
                                {motors.data.map((motor, index) => (
                                    <motion.div
                                        key={motor.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: index * 0.05,
                                        }}
                                        className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col h-full transform hover:-translate-y-2 ${
                                            !motor.tersedia
                                                ? "opacity-80 grayscale"
                                                : ""
                                        }`}
                                    >
                                        <div className="relative h-64 bg-gradient-to-br from-gray-50 to-white p-6 flex items-center justify-center overflow-hidden">
                                            <div className="absolute top-4 left-4 z-10">
                                                <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm border border-gray-100">
                                                    {motor.brand}
                                                </span>
                                            </div>

                                            <img
                                                src={`/storage/${motor.image_path}`}
                                                alt={motor.name}
                                                className="max-h-full max-w-full object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-500"
                                            />

                                            {!motor.tersedia && (
                                                <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-20">
                                                    <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold shadow-lg transform rotate-[-12deg] border-2 border-white">
                                                        Terjual / Tidak Tersedia
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-6 flex-grow flex flex-col">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-xl font-extrabold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">
                                                    {motor.name}
                                                </h3>
                                            </div>

                                            <div className="text-2xl font-bold text-primary mb-4">
                                                Rp{" "}
                                                {new Intl.NumberFormat(
                                                    "id-ID"
                                                ).format(motor.price)}
                                            </div>

                                            <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-6">
                                                <span className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg font-medium text-gray-600">
                                                    <Calendar
                                                        size={14}
                                                        className="text-primary"
                                                    />{" "}
                                                    {motor.year}
                                                </span>
                                                <span className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg font-medium text-gray-600">
                                                    <Info
                                                        size={14}
                                                        className="text-primary"
                                                    />
                                                    {motor.type}
                                                </span>
                                                {motor.tersedia && (
                                                    <span className="flex items-center gap-1.5 bg-green-50 border border-green-100 px-3 py-1.5 rounded-lg font-medium text-green-700">
                                                        <CheckCircle
                                                            size={14}
                                                        />{" "}
                                                        Tersedia
                                                    </span>
                                                )}
                                            </div>

                                            <div className="mt-auto pt-4 border-t border-gray-50">
                                                <Link
                                                    href={route(
                                                        "motors.show",
                                                        motor.id
                                                    )}
                                                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all shadow-lg ${
                                                        motor.tersedia
                                                            ? "bg-dark-blue text-white hover:bg-primary shadow-blue-900/10 hover:shadow-primary/30"
                                                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                    }`}
                                                >
                                                    Lihat Detail
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-white rounded-[2.5rem] shadow-lg border border-gray-100">
                            <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search size={40} className="text-gray-300" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-3">
                                Tidak ada motor ditemukan
                            </h3>
                            <p className="text-gray-500 max-w-md mx-auto mb-8">
                                Coba ubah kata kunci pencarian atau reset filter
                                untuk melihat lebih banyak pilihan.
                            </p>
                            <button
                                onClick={resetFilters}
                                className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-dark-blue transition-colors shadow-lg shadow-primary/30"
                            >
                                <RotateCcw size={18} /> Reset Filter
                            </button>
                        </div>
                    )}

                    {/* Pagination */}
                    {motors.links && motors.links.length > 3 && (
                        <div className="mt-16 flex justify-center flex-wrap gap-2">
                            {motors.links.map((link, k) => (
                                <Link
                                    key={k}
                                    href={link.url || "#"}
                                    className={`px-5 py-3 rounded-xl font-bold text-sm transition-all ${
                                        link.active
                                            ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105"
                                            : link.url
                                            ? "bg-white text-gray-600 hover:bg-gray-50 hover:text-primary border border-gray-200 shadow-sm"
                                            : "bg-gray-100 text-gray-300 cursor-not-allowed"
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
