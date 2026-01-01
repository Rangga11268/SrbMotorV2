import React, { useState, useEffect } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    ArrowLeft,
    Save,
    User,
    CreditCard,
    DollarSign,
    Box,
    Bike,
    ChevronDown,
    Search,
} from "lucide-react";

export default function Create({ motors, users }) {
    const { data, setData, post, processing, errors } = useForm({
        user_id: "",
        motor_id: "",
        transaction_type: "CASH",
        payment_method: "cash",
        notes: "",
        // For credit
        tenor: 12,
        down_payment: "",
    });

    const [selectedMotor, setSelectedMotor] = useState(null);

    useEffect(() => {
        if (data.motor_id) {
            const motor = motors.find((m) => m.id == data.motor_id);
            setSelectedMotor(motor);
        } else {
            setSelectedMotor(null);
        }
    }, [data.motor_id, motors]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.transactions.store"));
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(number);
    };

    return (
        <AdminLayout title="BUAT TRANSAKSI BARU">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Control */}
                <div className="flex items-center justify-between">
                    <Link
                        href={route("admin.transactions.index")}
                        className="group flex items-center gap-3 text-white/50 hover:text-white transition-colors"
                    >
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-accent group-hover:bg-accent/10 transition-all">
                            <ArrowLeft size={18} />
                        </div>
                        <span className="font-mono text-sm tracking-wider uppercase">
                            BATALKAN ENTRI
                        </span>
                    </Link>

                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest animate-pulse">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        MODE INPUT AKTIF
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <div className="xl:col-span-2 space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Transaction Details Module */}
                            <div className="bg-zinc-900/50 backdrop-blur-md p-8 rounded-3xl border border-white/5 relative overflow-hidden">
                                <h3 className="text-xl font-bold text-white mb-8 font-display uppercase tracking-wider flex items-center gap-3">
                                    <span className="w-1 h-8 bg-accent rounded-full"></span>
                                    DATA UTAMA TRANSAKSI
                                </h3>

                                <div className="grid grid-cols-1 gap-8">
                                    {/* Customer Selection */}
                                    <div>
                                        <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-mono">
                                            PELANGGAN TERDAFTAR
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={data.user_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "user_id",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-6 py-4 rounded-xl bg-black/50 border border-white/10 focus:border-accent/50 focus:ring-1 focus:ring-accent/50 text-white font-mono appearance-none cursor-pointer"
                                            >
                                                <option value="">
                                                    -- PILIH PELANGGAN --
                                                </option>
                                                {users.map((user) => (
                                                    <option
                                                        key={user.id}
                                                        value={user.id}
                                                    >
                                                        {user.name} (
                                                        {user.email})
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                                                <ChevronDown size={16} />
                                            </div>
                                        </div>
                                        {errors.user_id && (
                                            <div className="text-red-500 text-xs font-mono mt-2">
                                                {errors.user_id}
                                            </div>
                                        )}
                                    </div>

                                    {/* Motor Selection */}
                                    <div>
                                        <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-mono">
                                            UNIT TARGET
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={data.motor_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "motor_id",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-6 py-4 rounded-xl bg-black/50 border border-white/10 focus:border-accent/50 focus:ring-1 focus:ring-accent/50 text-white font-mono appearance-none cursor-pointer"
                                            >
                                                <option value="">
                                                    -- PILIH UNIT ARMADA --
                                                </option>
                                                {motors.map((motor) => (
                                                    <option
                                                        key={motor.id}
                                                        value={motor.id}
                                                    >
                                                        {motor.name} -{" "}
                                                        {formatRupiah(
                                                            motor.price
                                                        )}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                                                <ChevronDown size={16} />
                                            </div>
                                        </div>
                                        {errors.motor_id && (
                                            <div className="text-red-500 text-xs font-mono mt-2">
                                                {errors.motor_id}
                                            </div>
                                        )}
                                    </div>

                                    {/* Transaction Type */}
                                    <div>
                                        <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-mono">
                                            TIPE TRANSAKSI
                                        </label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setData(
                                                        "transaction_type",
                                                        "CASH"
                                                    )
                                                }
                                                className={`py-4 rounded-xl text-sm font-bold font-display uppercase tracking-wider transition-all border flex items-center justify-center gap-2 ${
                                                    data.transaction_type ===
                                                    "CASH"
                                                        ? "bg-green-500/10 text-green-400 border-green-500/50"
                                                        : "bg-black/30 text-white/30 border-white/5 hover:border-white/20"
                                                }`}
                                            >
                                                <DollarSign size={18} />
                                                TUNAI (CASH)
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setData(
                                                        "transaction_type",
                                                        "CREDIT"
                                                    )
                                                }
                                                className={`py-4 rounded-xl text-sm font-bold font-display uppercase tracking-wider transition-all border flex items-center justify-center gap-2 ${
                                                    data.transaction_type ===
                                                    "CREDIT"
                                                        ? "bg-blue-500/10 text-blue-400 border-blue-500/50"
                                                        : "bg-black/30 text-white/30 border-white/5 hover:border-white/20"
                                                }`}
                                            >
                                                <CreditCard size={18} />
                                                ANGSURAN (CREDIT)
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Credit Specifics */}
                            {data.transaction_type === "CREDIT" && (
                                <div className="bg-blue-900/10 backdrop-blur-md p-8 rounded-3xl border border-blue-500/20 relative overflow-hidden">
                                    <h3 className="text-xl font-bold text-blue-400 mb-8 font-display uppercase tracking-wider flex items-center gap-3">
                                        <span className="w-1 h-8 bg-blue-500 rounded-full"></span>
                                        KONFIGURASI ANGSURAN
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-mono">
                                                TENOR (BULAN)
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
                                                    className="w-full px-6 py-4 rounded-xl bg-black/50 border border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 text-white font-mono appearance-none cursor-pointer"
                                                >
                                                    {[12, 24, 36, 48].map(
                                                        (m) => (
                                                            <option
                                                                key={m}
                                                                value={m}
                                                            >
                                                                {m} BULAN
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                                                    <ChevronDown size={16} />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-mono">
                                                UANG MUKA (DP)
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-blue-500 font-mono font-bold">
                                                    Rp
                                                </span>
                                                <input
                                                    type="number"
                                                    value={data.down_payment}
                                                    onChange={(e) =>
                                                        setData(
                                                            "down_payment",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full pl-12 pr-6 py-4 rounded-xl bg-black/50 border border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 text-white placeholder-white/20 font-mono text-lg font-bold transition-all"
                                                    placeholder="0"
                                                />
                                            </div>
                                            {errors.down_payment && (
                                                <div className="text-red-500 text-xs font-mono mt-2">
                                                    {errors.down_payment}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-accent text-black py-4 rounded-xl font-bold font-display uppercase tracking-wider hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed text-lg group"
                                >
                                    {processing ? (
                                        <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    ) : (
                                        <Save
                                            size={20}
                                            className="group-hover:rotate-12 transition-transform"
                                        />
                                    )}
                                    PROSES TRANSAKSI
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Sidebar Summary */}
                    <div className="xl:col-span-1 space-y-8">
                        <div className="sticky top-6">
                            <div className="bg-zinc-900/50 backdrop-blur-md p-6 rounded-3xl border border-white/5 mb-8">
                                <h3 className="text-xs font-bold text-white/50 mb-4 uppercase tracking-widest font-mono flex items-center gap-2">
                                    <Box size={14} className="text-accent" />
                                    RINGKASAN ORDER
                                </h3>

                                <div className="space-y-4">
                                    <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                                        <label className="text-[10px] text-white/30 font-bold uppercase tracking-wider block mb-1">
                                            UNIT TERPILIH
                                        </label>
                                        <div className="font-display font-bold text-white text-lg uppercase">
                                            {selectedMotor
                                                ? selectedMotor.name
                                                : "BELUM DIPILIH"}
                                        </div>
                                        {selectedMotor && (
                                            <div className="text-accent font-mono font-bold mt-1">
                                                {formatRupiah(
                                                    selectedMotor.price
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                                            <label className="text-[10px] text-white/30 font-bold uppercase tracking-wider block mb-1">
                                                METODE
                                            </label>
                                            <div className="font-mono font-bold text-white uppercase text-sm">
                                                {data.transaction_type}
                                            </div>
                                        </div>
                                        <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                                            <label className="text-[10px] text-white/30 font-bold uppercase tracking-wider block mb-1">
                                                PELANGGAN
                                            </label>
                                            <div className="font-mono font-bold text-white uppercase text-sm truncate">
                                                {users.find(
                                                    (u) => u.id == data.user_id
                                                )?.name || "-"}
                                            </div>
                                        </div>
                                    </div>

                                    {data.transaction_type === "CREDIT" &&
                                        selectedMotor &&
                                        data.down_payment && (
                                            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                                <label className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block mb-1">
                                                    ESTIMASI KREDIT
                                                </label>
                                                <div className="flex justify-between items-center text-sm font-mono text-white mb-1">
                                                    <span>POKOK HUTANG</span>
                                                    <span className="font-bold">
                                                        {formatRupiah(
                                                            selectedMotor.price -
                                                                data.down_payment
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="text-[10px] text-white/40 text-right">
                                                    + BUNGA & BIAYA ADMIN
                                                </div>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
