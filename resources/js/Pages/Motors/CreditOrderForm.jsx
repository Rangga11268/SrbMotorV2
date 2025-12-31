import React, { useState, useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import {
    CreditCard,
    User,
    Phone,
    Briefcase,
    FileText,
    Calendar,
    ArrowLeft,
    Send,
    Percent,
    Clock,
    AlertTriangle,
    Info,
    Wallet,
    MessageSquare,
    Zap,
} from "lucide-react";
import { motion } from "framer-motion";

export default function CreditOrderForm({ motor }) {
    const { data, setData, post, processing, errors } = useForm({
        customer_name: "",
        customer_phone: "",
        customer_occupation: "",
        down_payment: "",
        tenor: "",
        monthly_installment: "",
        payment_method: "",
        notes: "",
    });

    const [calculatedInstallment, setCalculatedInstallment] = useState(0);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    useEffect(() => {
        const dp = parseFloat(data.down_payment) || 0;
        const tenor = parseInt(data.tenor) || 0;

        if (tenor > 0) {
            const loanAmount = Math.max(0, motor.price - dp);
            const monthly = loanAmount / tenor; // Simple calc, usually leasing has interest
            const roundedMonthly = Math.round(monthly);
            setCalculatedInstallment(roundedMonthly);
        } else {
            setCalculatedInstallment(0);
        }
    }, [data.down_payment, data.tenor, motor.price]);

    const submit = (e) => {
        e.preventDefault();
        if (parseFloat(data.down_payment) >= motor.price) {
            alert("Uang Muka tidak boleh melebihi harga motor.");
            return;
        }
        post(route("motors.process-credit-order", motor.id));
    };

    return (
        <MainLayout title={`Pengajuan Kredit - ${motor.name}`}>
            <div className="bg-surface-dark min-h-screen text-white pt-20">
                {/* Fixed Back Button */}
                <div className="fixed top-24 left-4 z-50 lg:left-8">
                    <Link
                        href={route("motors.show", motor.id)}
                        className="w-12 h-12 bg-black/50 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-accent hover:text-black transition-all duration-300 group"
                    >
                        <ArrowLeft
                            size={20}
                            className="group-hover:-translate-x-1 transition-transform"
                        />
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">
                    {/* LEFT: VISUAL SUMMARY */}
                    <div className="relative hidden lg:flex flex-col justify-center items-center bg-zinc-900 overflow-hidden p-12">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 to-transparent z-0"></div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative z-10 w-full max-w-lg"
                        >
                            <h2 className="text-[10vw] font-display font-black text-white/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap select-none">
                                KREDIT
                            </h2>
                            <img
                                src={`/storage/${motor.image_path}`}
                                alt={motor.name}
                                className="w-full object-contain drop-shadow-2xl relative z-20"
                            />
                        </motion.div>

                        <div className="relative z-10 mt-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-full max-w-md">
                            <h3 className="text-2xl font-bold font-display uppercase tracking-wider mb-1">
                                {motor.name}
                            </h3>
                            <p className="text-blue-500 font-bold text-xl mb-6">
                                {formatCurrency(motor.price)}
                            </p>

                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                                <div className="flex items-center gap-2">
                                    <Calendar
                                        size={14}
                                        className="text-blue-500"
                                    />{" "}
                                    {motor.year}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Zap size={14} className="text-blue-500" />{" "}
                                    {motor.type}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: COMMAND CENTER FORM */}
                    <div className="relative p-6 lg:p-12 xl:p-20 flex flex-col justify-center">
                        <div className="max-w-xl mx-auto w-full">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-10"
                            >
                                <h1 className="text-4xl md:text-5xl font-display font-black mb-2">
                                    PENGAJUAN{" "}
                                    <span className="text-blue-500">
                                        KREDIT
                                    </span>
                                </h1>
                                <p className="text-gray-400">
                                    Dapatkan motor impianmu dengan cicilan
                                    fleksibel.
                                </p>
                            </motion.div>

                            <form onSubmit={submit} className="space-y-6">
                                {/* Personal Details */}
                                <div className="space-y-6">
                                    <div className="group">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block group-focus-within:text-blue-500 transition-colors">
                                            Nama Lengkap
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={data.customer_name}
                                                onChange={(e) =>
                                                    setData(
                                                        "customer_name",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full bg-zinc-900/50 border-b border-white/10 px-0 py-4 text-lg font-bold text-white focus:border-blue-500 focus:outline-none transition-colors pl-8"
                                                placeholder="Masukkan nama lengkap"
                                                required
                                            />
                                            <User
                                                size={18}
                                                className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors"
                                            />
                                        </div>
                                        {errors.customer_name && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.customer_name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="group">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block group-focus-within:text-blue-500 transition-colors">
                                                Nomor Telepon
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="tel"
                                                    value={data.customer_phone}
                                                    onChange={(e) =>
                                                        setData(
                                                            "customer_phone",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full bg-zinc-900/50 border-b border-white/10 px-0 py-4 text-lg font-bold text-white focus:border-blue-500 focus:outline-none transition-colors pl-8"
                                                    placeholder="08..."
                                                    required
                                                />
                                                <Phone
                                                    size={18}
                                                    className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors"
                                                />
                                            </div>
                                            {errors.customer_phone && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.customer_phone}
                                                </p>
                                            )}
                                        </div>

                                        <div className="group">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block group-focus-within:text-blue-500 transition-colors">
                                                Pekerjaan
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={
                                                        data.customer_occupation
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "customer_occupation",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full bg-zinc-900/50 border-b border-white/10 px-0 py-4 text-lg font-bold text-white focus:border-blue-500 focus:outline-none transition-colors pl-8"
                                                    placeholder="Pekerjaan saat ini"
                                                    required
                                                />
                                                <Briefcase
                                                    size={18}
                                                    className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors"
                                                />
                                            </div>
                                            {errors.customer_occupation && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.customer_occupation}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Simulation */}
                                <div className="pt-8 border-t border-white/5 space-y-6">
                                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                        <Zap
                                            size={16}
                                            className="text-blue-500"
                                        />{" "}
                                        Simulasi
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="group">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block group-focus-within:text-blue-500 transition-colors">
                                                Uang Muka (DP)
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={data.down_payment}
                                                    onChange={(e) =>
                                                        setData(
                                                            "down_payment",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full bg-zinc-900/50 border-b border-white/10 px-0 py-4 text-lg font-bold text-white focus:border-blue-500 focus:outline-none transition-colors pl-8"
                                                    placeholder="0"
                                                    min="0"
                                                    required
                                                />
                                                <Percent
                                                    size={18}
                                                    className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors"
                                                />
                                            </div>
                                            {errors.down_payment && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.down_payment}
                                                </p>
                                            )}
                                        </div>

                                        <div className="group">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block group-focus-within:text-blue-500 transition-colors">
                                                Tenor (Bulan)
                                            </label>
                                            <div className="relative">
                                                <select
                                                    value={data.tenor}
                                                    onChange={(e) =>
                                                        setData(
                                                            "tenor",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full bg-zinc-900/50 border-b border-white/10 px-0 py-4 text-lg font-bold text-white focus:border-blue-500 focus:outline-none transition-colors pl-8 appearance-none"
                                                    required
                                                >
                                                    <option
                                                        value=""
                                                        disabled
                                                        className="bg-zinc-900"
                                                    >
                                                        Pilih Tenor
                                                    </option>
                                                    <option
                                                        value="12"
                                                        className="bg-zinc-900"
                                                    >
                                                        12 Bulan
                                                    </option>
                                                    <option
                                                        value="24"
                                                        className="bg-zinc-900"
                                                    >
                                                        24 Bulan
                                                    </option>
                                                    <option
                                                        value="36"
                                                        className="bg-zinc-900"
                                                    >
                                                        36 Bulan
                                                    </option>
                                                    <option
                                                        value="48"
                                                        className="bg-zinc-900"
                                                    >
                                                        48 Bulan
                                                    </option>
                                                </select>
                                                <Clock
                                                    size={18}
                                                    className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors"
                                                />
                                            </div>
                                            {errors.tenor && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.tenor}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Estimation Display */}
                                    {calculatedInstallment > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6 text-center"
                                        >
                                            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">
                                                Estimasi Angsuran Bulanan
                                            </p>
                                            <p className="text-3xl font-display font-bold text-white">
                                                {formatCurrency(
                                                    calculatedInstallment
                                                )}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-2">
                                                *Angsuran final ditentukan oleh
                                                pihak leasing.
                                            </p>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Payment Method & Info */}
                                <div className="space-y-6">
                                    <div className="group">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block group-focus-within:text-blue-500 transition-colors">
                                            Metode Pembayaran
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={data.payment_method}
                                                onChange={(e) =>
                                                    setData(
                                                        "payment_method",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full bg-zinc-900/50 border-b border-white/10 px-0 py-4 text-lg font-bold text-white focus:border-blue-500 focus:outline-none transition-colors pl-8 appearance-none"
                                                required
                                            >
                                                <option
                                                    value=""
                                                    disabled
                                                    className="bg-zinc-900"
                                                >
                                                    Pilih Metode
                                                </option>
                                                <option
                                                    value="transfer"
                                                    className="bg-zinc-900"
                                                >
                                                    Transfer Bank (VA/Online)
                                                </option>
                                                <option
                                                    value="cash"
                                                    className="bg-zinc-900"
                                                >
                                                    Tunai di Dealer
                                                </option>
                                            </select>
                                            <Wallet
                                                size={18}
                                                className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors"
                                            />
                                        </div>
                                        {errors.payment_method && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.payment_method}
                                            </p>
                                        )}
                                    </div>

                                    <div className="bg-zinc-900 rounded-xl p-4 flex gap-3 text-sm text-gray-400">
                                        <Info
                                            className="shrink-0 text-blue-500"
                                            size={20}
                                        />
                                        <p>
                                            Anda akan diminta mengunggah dokumen
                                            (KTP, KK) setelah langkah ini.
                                            Persetujuan memakan waktu 1-3 hari
                                            kerja.
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-8">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full py-5 bg-blue-600 text-white font-display font-bold text-xl uppercase tracking-widest hover:bg-blue-700 transition-colors rounded-xl disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
                                    >
                                        <Send size={24} />
                                        {processing
                                            ? "Memproses..."
                                            : "Kirim Pengajuan"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
