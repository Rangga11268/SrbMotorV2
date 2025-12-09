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
            <div className="bg-gray-50 min-h-screen py-10">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-10"
                    >
                        <h1 className="text-4xl font-bold text-gray-900">
                            Semua <span className="text-orange-500">Motor</span>
                        </h1>
                    </motion.div>

                    {/* Filter Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
                    >
                        <div className="flex flex-col lg:flex-row gap-4 mb-6">
                            {/* Search */}
                            <div className="flex-grow relative">
                                <Search
                                    className="absolute left-4 top-3.5 text-gray-400"
                                    size={20}
                                />
                                <input
                                    type="text"
                                    name="search"
                                    value={values.search}
                                    onChange={handleChange}
                                    placeholder="Cari motor impian Anda..."
                                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                                />
                            </div>
                            <button
                                onClick={resetFilters}
                                className="px-6 py-3 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-orange-500 transition-colors flex items-center justify-center gap-2 font-medium"
                            >
                                <RotateCcw size={18} /> Reset
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Brand Filter */}
                            <div className="relative">
                                <label className="block text-xs font-bold text-gray-500 mb-1 ml-1 uppercase">
                                    Brand
                                </label>
                                <select
                                    name="brand"
                                    value={values.brand}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50"
                                >
                                    <option value="">Semua Brand</option>
                                    {brands.map((brand) => (
                                        <option key={brand} value={brand}>
                                            {brand}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Type Filter */}
                            <div className="relative">
                                <label className="block text-xs font-bold text-gray-500 mb-1 ml-1 uppercase">
                                    Tipe
                                </label>
                                <select
                                    name="type"
                                    value={values.type}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50"
                                >
                                    <option value="">Semua Tipe</option>
                                    {types.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Year Filter */}
                            <div className="relative">
                                <label className="block text-xs font-bold text-gray-500 mb-1 ml-1 uppercase">
                                    Tahun
                                </label>
                                <select
                                    name="year"
                                    value={values.year}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50"
                                >
                                    <option value="">Semua Tahun</option>
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Price Range */}
                            <div className="relative">
                                <label className="block text-xs font-bold text-gray-500 mb-1 ml-1 uppercase">
                                    Harga (Min - Max)
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        name="min_price"
                                        value={values.min_price}
                                        onChange={handleChange}
                                        placeholder="Min"
                                        className="w-1/2 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50 text-sm"
                                    />
                                    <input
                                        type="number"
                                        name="max_price"
                                        value={values.max_price}
                                        onChange={handleChange}
                                        placeholder="Max"
                                        className="w-1/2 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50 text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Grid Section */}
                    {motors.data.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            <AnimatePresence>
                                {motors.data.map((motor, index) => (
                                    <motion.div
                                        key={motor.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: index * 0.05,
                                        }}
                                        className={`bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col ${
                                            !motor.tersedia
                                                ? "opacity-75 grayscale"
                                                : ""
                                        }`}
                                    >
                                        <div className="relative h-48 bg-gray-100 p-4 flex items-center justify-center overflow-hidden">
                                            <img
                                                src={`/storage/${motor.image_path}`}
                                                alt={motor.name}
                                                className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold shadow-sm text-gray-800">
                                                {motor.brand}
                                            </div>
                                            {!motor.tersedia && (
                                                <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-sm">
                                                    Tidak Tersedia
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-5 flex-grow flex flex-col">
                                            <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                                                {motor.name}
                                            </h3>
                                            <div className="text-orange-500 font-bold text-lg mb-3">
                                                Rp{" "}
                                                {new Intl.NumberFormat(
                                                    "id-ID"
                                                ).format(motor.price)}
                                                ,-
                                            </div>

                                            <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                                                <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
                                                    <Calendar size={14} />{" "}
                                                    {motor.year}
                                                </span>
                                                <span className="bg-gray-50 px-2 py-1 rounded-md">
                                                    {motor.type}
                                                </span>
                                            </div>

                                            <p className="text-gray-500 text-sm mb-4 line-clamp-2 min-h-[40px]">
                                                {motor.details}
                                            </p>

                                            <div className="mt-auto">
                                                <Link
                                                    href={route(
                                                        "motors.show",
                                                        motor.id
                                                    )}
                                                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold transition-colors ${
                                                        motor.tersedia
                                                            ? "bg-gray-900 text-white hover:bg-orange-500"
                                                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                                    }`}
                                                >
                                                    <Info size={18} /> Lihat
                                                    Detail
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                            <AlertCircle
                                size={64}
                                className="text-gray-300 mx-auto mb-4"
                            />
                            <h3 className="text-2xl font-bold text-gray-400 mb-2">
                                Motor tidak ditemukan
                            </h3>
                            <p className="text-gray-400">
                                Silakan coba unakan kata kunci atau filter lain.
                            </p>
                            <button
                                onClick={resetFilters}
                                className="mt-6 text-orange-500 font-bold hover:underline"
                            >
                                Reset Pencarian
                            </button>
                        </div>
                    )}

                    {/* Pagination */}
                    {motors.links && motors.links.length > 3 && (
                        <div className="mt-12 flex justify-center gap-2">
                            {motors.links.map((link, k) => (
                                <Link
                                    key={k}
                                    href={link.url || "#"}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                        link.active
                                            ? "bg-orange-500 text-white"
                                            : link.url
                                            ? "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
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
