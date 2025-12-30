import React, { useState, useEffect } from "react";
import { Head, Link, router } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import {
    Search,
    RotateCcw,
    Filter,
    Calendar,
    Info,
    ArrowUpRight,
    CheckCircle2,
    SlidersHorizontal,
    X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ComparisonButton from "@/Components/ComparisonButton";

export default function Index({ motors, filters, brands, types, years }) {
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [values, setValues] = useState({
        search: filters.search || "",
        brand: filters.brand || "",
        type: filters.type || "",
        year: filters.year || "",
        min_price: filters.min_price || "",
        max_price: filters.max_price || "",
    });

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    };

    useEffect(() => {
        const query = Object.keys(values).reduce((acc, key) => {
            if (values[key]) acc[key] = values[key];
            return acc;
        }, {});

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
        <MainLayout title="The Collection">
            <div className="min-h-screen bg-surface-dark pt-32 pb-20">
                {/* HEADLINE */}
                <div className="container mx-auto px-4 mb-12">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-6 border-b border-white/10 pb-8">
                        <div>
                            <span className="text-accent font-bold tracking-[0.2em] uppercase text-sm mb-2 block animate-pulse">
                                Premium Inventory
                            </span>
                            <h1 className="text-5xl md:text-8xl font-display font-black text-white tracking-tighter leading-none">
                                THE{" "}
                                <span className="text-transparent stroke-text-white">
                                    FLEET
                                </span>
                            </h1>
                        </div>
                        <p className="text-gray-400 max-w-md text-right md:text-left">
                            Curated for performance, inspected for perfection.{" "}
                            <br />
                            Find your next machine below.
                        </p>
                    </div>
                </div>

                {/* STICKY FILTER BAR */}
                <div className="sticky top-20 z-30 bg-surface-dark/80 backdrop-blur-xl border-y border-white/10 py-4 mb-12">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            {/* Mobile Toggle */}
                            <button
                                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                                className="md:hidden w-full flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-bold"
                            >
                                <span className="flex items-center gap-2">
                                    <SlidersHorizontal size={18} /> Filters
                                </span>
                                <span className="text-xs bg-accent text-black px-2 py-1 rounded-md">
                                    {
                                        Object.values(values).filter(Boolean)
                                            .length
                                    }{" "}
                                    Active
                                </span>
                            </button>

                            {/* Desktop Filters / Mobile Drawer Content */}
                            <div
                                className={`w-full md:flex md:items-center md:gap-4 ${
                                    isFiltersOpen ? "block" : "hidden"
                                } space-y-4 md:space-y-0`}
                            >
                                <div className="relative flex-grow max-w-md">
                                    <Search
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                                        size={18}
                                    />
                                    <input
                                        type="text"
                                        name="search"
                                        value={values.search}
                                        onChange={handleChange}
                                        placeholder="Search model..."
                                        className="w-full bg-black/20 border border-white/10 rounded-full pl-12 pr-4 py-2.5 text-white placeholder-gray-600 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                                    />
                                </div>

                                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                                    <select
                                        name="brand"
                                        value={values.brand}
                                        onChange={handleChange}
                                        className="bg-black/20 border border-white/10 text-white text-sm rounded-full px-4 py-2.5 focus:border-accent outline-none cursor-pointer hover:bg-white/5 transition-colors appearance-none min-w-[120px]"
                                    >
                                        <option value="">All Brands</option>
                                        {brands.map((b) => (
                                            <option key={b} value={b}>
                                                {b}
                                            </option>
                                        ))}
                                    </select>

                                    <select
                                        name="type"
                                        value={values.type}
                                        onChange={handleChange}
                                        className="bg-black/20 border border-white/10 text-white text-sm rounded-full px-4 py-2.5 focus:border-accent outline-none cursor-pointer hover:bg-white/5 transition-colors appearance-none min-w-[120px]"
                                    >
                                        <option value="">All Types</option>
                                        {types.map((t) => (
                                            <option key={t} value={t}>
                                                {t}
                                            </option>
                                        ))}
                                    </select>

                                    <button
                                        onClick={resetFilters}
                                        className="p-2.5 rounded-full border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                                        title="Reset Filters"
                                    >
                                        <RotateCcw size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* GRID GALLERY */}
                <div className="container mx-auto px-4">
                    {motors.data.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            <AnimatePresence mode="popLayout">
                                {motors.data.map((motor, i) => (
                                    <motion.div
                                        layout
                                        key={motor.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: i * 0.05,
                                        }}
                                        className="group relative bg-zinc-900 rounded-3xl overflow-hidden border border-white/5 hover:border-accent/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(190,242,100,0.1)]"
                                    >
                                        {/* Image Area */}
                                        <div className="aspect-[4/3] bg-zinc-800 relative overflow-hidden">
                                            <img
                                                src={`/storage/${motor.image_path}`}
                                                alt={motor.name}
                                                className={`w-full h-full object-cover transition-all duration-700 ${
                                                    !motor.tersedia
                                                        ? "grayscale brightness-50"
                                                        : "group-hover:scale-110 grayscale group-hover:grayscale-0"
                                                }`}
                                            />

                                            {/* Overlays */}
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/10 uppercase tracking-wider">
                                                    {motor.brand}
                                                </span>
                                            </div>

                                            <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <ComparisonButton
                                                    motor={motor}
                                                    showText={false}
                                                    className="!bg-black/50 !backdrop-blur-md !border-white/20 hover:!bg-accent hover:!text-black"
                                                />
                                            </div>

                                            {!motor.tersedia && (
                                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                    <span className="text-3xl font-display font-black text-red-500 border-4 border-red-500 px-6 py-2 -rotate-12 uppercase tracking-tight">
                                                        SOLD OUT
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content Area */}
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <p className="text-xs text-gray-500 mb-1">
                                                        {motor.year} •{" "}
                                                        {motor.type}
                                                    </p>
                                                    <h3 className="text-lg font-bold text-white leading-tight group-hover:text-accent transition-colors">
                                                        {motor.name}
                                                    </h3>
                                                </div>
                                            </div>

                                            <div className="flex items-end justify-between border-t border-white/5 pt-4">
                                                <div className="text-xl font-display font-bold text-white">
                                                    Rp{" "}
                                                    {parseFloat(
                                                        motor.price
                                                    ).toLocaleString("id-ID")}
                                                </div>
                                                <Link
                                                    href={route(
                                                        "motors.show",
                                                        motor.id
                                                    )}
                                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-accent group-hover:text-black transition-all duration-300"
                                                >
                                                    <ArrowUpRight size={20} />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="min-h-[40vh] flex flex-col items-center justify-center text-center border-2 border-dashed border-white/10 rounded-[3rem] p-12">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-gray-500 mb-6">
                                <Search size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">
                                No Motors Found
                            </h3>
                            <p className="text-gray-500 mb-8">
                                Try adjusting your filters or search terms.
                            </p>
                            <button
                                onClick={resetFilters}
                                className="px-8 py-3 bg-accent text-black font-bold rounded-full hover:bg-white transition-colors"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}

                    {/* PAGINATION */}
                    {motors.links && motors.links.length > 3 && (
                        <div className="mt-20 flex justify-center flex-wrap gap-2">
                            {motors.links.map((link, k) => (
                                <Link
                                    key={k}
                                    href={link.url || "#"}
                                    className={`w-12 h-12 flex items-center justify-center rounded-full font-bold text-sm transition-all border ${
                                        link.active
                                            ? "bg-accent text-black border-accent"
                                            : link.url
                                            ? "bg-transparent text-gray-500 border-white/10 hover:border-white hover:text-white"
                                            : "opacity-30 cursor-not-allowed border-transparent text-gray-600"
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label
                                            .replace("Previous", "&laquo;")
                                            .replace("Next", "&raquo;"),
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
