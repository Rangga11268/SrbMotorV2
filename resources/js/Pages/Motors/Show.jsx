import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { motion } from "framer-motion";
import {
    Calendar,
    Info,
    CheckCircle2,
    XCircle,
    ShoppingCart,
    FileText,
    MessageCircle,
    ArrowLeft,
    Share2,
    ShieldCheck,
    Gauge,
    Cpu,
    Zap,
    MapPin,
    PenTool,
    Activity,
} from "lucide-react";
import ComparisonButton from "@/Components/ComparisonButton";

export default function Show({ motor, relatedMotors }) {
    const { auth } = usePage().props;

    const openWhatsApp = (e) => {
        e.preventDefault();
        const phoneNumber = "628978638849";
        const message = encodeURIComponent(
            `Halo SRB Motors, saya tertarik dengan unit ${
                motor.name
            } (Rp ${new Intl.NumberFormat("id-ID").format(
                motor.price
            )}). Bisa minta info lebih lanjut?`
        );
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    };

    // Helper to format spec keys
    const formatSpecKey = (key) => {
        const keyMap = {
            plate_number: "Plat Nomor",
            engine_number: "No. Mesin",
            frame_number: "No. Rangka",
            bpkb_name: "Nama BPKB",
            stnk_name: "Nama STNK",
            tax_expiry: "Pajak",
            registration_expiry: "Kaleng",
            kilometer: "Odometer",
            color: "Warna",
            transmission: "Transmisi",
            condition: "Kondisi",
        };
        return (
            keyMap[key] ||
            key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
        );
    };

    const getSpecIcon = (key) => {
        const iconMap = {
            kilometer: <Gauge size={18} />,
            transmission: <Cpu size={18} />,
            color: <PenTool size={18} />,
            condition: <ShieldCheck size={18} />,
            plate_number: <MapPin size={18} />,
        };
        return iconMap[key] || <Zap size={18} />;
    };

    return (
        <MainLayout title={motor.name}>
            <div className="bg-surface-dark min-h-screen text-white pt-20">
                {/* BACK & SHARE */}
                <div className="fixed top-24 left-4 z-40 lg:left-8">
                    <Link
                        href={route("motors.index")}
                        className="w-12 h-12 bg-black/50 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-accent hover:text-black transition-all duration-300"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* LEFT COLUMN - IMMERSIVE IMAGE */}
                    <div className="relative h-[50vh] lg:h-screen lg:sticky lg:top-0 bg-surface-dark overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/50 to-surface-dark z-0"></div>

                        {/* Huge Background Text */}
                        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-display font-black text-white/5 whitespace-nowrap z-0 select-none">
                            {motor.brand}
                        </h1>

                        <motion.img
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.8, type: "spring" }}
                            src={`/storage/${motor.image_path}`}
                            alt={motor.name}
                            className="relative z-10 w-full max-w-[90%] lg:max-w-2xl object-contain drop-shadow-2xl"
                        />

                        {/* Status Badge */}
                        <div className="absolute bottom-8 left-8 z-20">
                            {motor.tersedia ? (
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 text-accent rounded-full font-bold uppercase tracking-wider text-sm">
                                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>{" "}
                                    Available
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full font-bold uppercase tracking-wider text-sm">
                                    <XCircle size={16} /> Sold Out
                                </span>
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN - SCROLLABLE CONTENT */}
                    <div className="relative z-10 p-6 lg:p-20 lg:pt-32 pb-32">
                        {/* Header Info */}
                        <div className="mb-12">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-4 mb-6"
                            >
                                <span className="text-gray-400 font-bold tracking-widest uppercase">
                                    {motor.year} Model
                                </span>
                                <div className="h-px flex-grow bg-white/10"></div>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-5xl md:text-7xl font-display font-black leading-[0.9] text-white tracking-tighter mb-6"
                            >
                                {motor.name}
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-4xl md:text-5xl font-bold text-accent mb-8 font-display"
                            >
                                Rp{" "}
                                {new Intl.NumberFormat("id-ID").format(
                                    motor.price
                                )}
                            </motion.div>

                            <div className="flex gap-4">
                                <ComparisonButton
                                    motor={motor}
                                    className="!bg-white/5 !border-white/10 hover:!bg-white/10 !text-white"
                                />
                                <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white">
                                    <Share2 size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Specs Grid */}
                        <div className="mb-16">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Activity className="text-accent" />{" "}
                                Specifications
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6">
                                    <p className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-2">
                                        Type
                                    </p>
                                    <p
                                        className="text-lg font-bold text-white max-w-full truncate"
                                        title={motor.type}
                                    >
                                        {motor.type}
                                    </p>
                                </div>
                                <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6">
                                    <p className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-2">
                                        Model
                                    </p>
                                    <p
                                        className="text-lg font-bold text-white max-w-full truncate"
                                        title={motor.model}
                                    >
                                        {motor.model}
                                    </p>
                                </div>

                                {motor.specifications &&
                                    motor.specifications.map((spec, i) => (
                                        <div
                                            key={i}
                                            className="bg-zinc-900/50 border border-white/5 rounded-2xl p-5 hover:border-accent/30 transition-colors group"
                                        >
                                            <div className="flex items-center gap-2 mb-2 text-gray-500 group-hover:text-accent transition-colors">
                                                {getSpecIcon(spec.spec_key)}
                                                <span className="text-xs uppercase font-bold tracking-wider">
                                                    {formatSpecKey(
                                                        spec.spec_key
                                                    )}
                                                </span>
                                            </div>
                                            <p className="text-white font-bold">
                                                {spec.spec_value}
                                            </p>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-20">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <FileText className="text-accent" /> Details
                            </h3>
                            <div className="prose prose-invert prose-lg text-gray-400">
                                <p>
                                    {motor.details ||
                                        "No detailed description available for this unit."}
                                </p>
                            </div>
                        </div>

                        {/* Related Section */}
                        {relatedMotors.length > 0 && (
                            <div className="border-t border-white/10 pt-12">
                                <h3 className="text-2xl font-display font-bold text-white mb-8">
                                    Related Units
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {relatedMotors.map((related) => (
                                        <Link
                                            key={related.id}
                                            href={route(
                                                "motors.show",
                                                related.id
                                            )}
                                            className="block group"
                                        >
                                            <div className="bg-zinc-900 border border-white/5 rounded-2xl p-4 flex gap-4 hover:border-accent/50 transition-colors">
                                                <div className="w-24 h-24 bg-zinc-800 rounded-lg overflow-hidden shrink-0">
                                                    <img
                                                        src={`/storage/${related.image_path}`}
                                                        alt={related.name}
                                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                                                    />
                                                </div>
                                                <div className="flex flex-col justify-center">
                                                    <h4 className="font-bold text-white group-hover:text-accent transition-colors line-clamp-1">
                                                        {related.name}
                                                    </h4>
                                                    <p className="text-gray-500 text-sm mb-2">
                                                        {related.year} •{" "}
                                                        {related.brand}
                                                    </p>
                                                    <p className="font-bold text-white">
                                                        Rp{" "}
                                                        {new Intl.NumberFormat(
                                                            "id-ID"
                                                        ).format(related.price)}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* STICKY ACQUISITION BAR */}
                <div className="fixed bottom-0 left-0 w-full z-50 p-4 pb-6 lg:p-6 bg-surface-dark/80 backdrop-blur-xl border-t border-white/10">
                    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="hidden md:block">
                            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">
                                Total Price
                            </p>
                            <p className="text-3xl font-display font-bold text-white">
                                Rp{" "}
                                {new Intl.NumberFormat("id-ID").format(
                                    motor.price
                                )}
                            </p>
                        </div>

                        <div className="flex w-full md:w-auto gap-3">
                            <button
                                onClick={openWhatsApp}
                                className="flex-1 md:flex-none px-6 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                            >
                                <MessageCircle size={20} />{" "}
                                <span className="hidden sm:inline">
                                    WhatsApp
                                </span>
                            </button>

                            {auth.user ? (
                                <>
                                    <Link
                                        href={route(
                                            "motors.credit-order",
                                            motor.id
                                        )}
                                        className="flex-1 md:flex-none px-8 py-4 bg-zinc-800 text-white border border-white/10 font-bold rounded-xl hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        Credit
                                    </Link>
                                    <Link
                                        href={route(
                                            "motors.cash-order",
                                            motor.id
                                        )}
                                        className="flex-[2] md:flex-none px-10 py-4 bg-accent text-black font-bold rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(190,242,100,0.3)] hover:shadow-[0_0_30px_rgba(190,242,100,0.5)]"
                                    >
                                        <ShoppingCart size={20} /> Buy Cash
                                    </Link>
                                </>
                            ) : (
                                <Link
                                    href={route("login")}
                                    className="flex-[2] md:flex-none px-12 py-4 bg-accent text-black font-bold rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(190,242,100,0.3)]"
                                >
                                    Login to Buy
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
