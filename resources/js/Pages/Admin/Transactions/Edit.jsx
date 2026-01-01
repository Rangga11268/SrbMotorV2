import React, { useState, useEffect } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    ArrowLeft,
    Save,
    Trash2,
    AlertTriangle,
    CreditCard,
    DollarSign,
    Box,
    ChevronDown,
} from "lucide-react";

export default function Edit({ transaction, motors, users }) {
    const {
        data,
        setData,
        put,
        delete: destroy,
        processing,
        errors,
    } = useForm({
        user_id: transaction.user_id || "",
        motor_id: transaction.motor_id || "",
        transaction_type: transaction.transaction_type || "CASH",
        notes: transaction.notes || "",
        // Credit fields
        tenor: transaction.credit_detail?.tenor || 12,
        down_payment: transaction.credit_detail?.down_payment || "",
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
        put(route("admin.transactions.update", transaction.id));
    };

    const handleDelete = () => {
        if (
            confirm(
                "PERINGATAN: Menghapus data transaksi ini akan menghapus semua riwayat pembayaran dan dokumen terkait secara permanen. Lanjutkan?"
            )
        ) {
            destroy(route("admin.transactions.destroy", transaction.id));
        }
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(number);
    };

    return (
        <AdminLayout title={`EDIT TRANSAKSI #${transaction.id}`}>
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Control */}
                <div className="flex items-center justify-between">
                    <Link
                        href={route("admin.transactions.show", transaction.id)}
                        className="group flex items-center gap-3 text-white/50 hover:text-white transition-colors"
                    >
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-accent group-hover:bg-accent/10 transition-all">
                            <ArrowLeft size={18} />
                        </div>
                        <span className="font-mono text-sm tracking-wider uppercase">
                            BATAL EDIT
                        </span>
                    </Link>

                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest animate-pulse">
                        <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                        MODE EDIT ADMIN
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <div className="xl:col-span-2 space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Primary Data Module */}
                            <div className="bg-zinc-900/50 backdrop-blur-md p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -translate-y-16 translate-x-16 group-hover:bg-accent/10 transition-all duration-700"></div>

                                <h3 className="text-xl font-bold text-white mb-8 font-display uppercase tracking-wider flex items-center gap-3">
                                    <span className="w-1 h-8 bg-amber-500 rounded-full"></span>
                                    MODIFIKASI DATA
                                </h3>

                                <div className="grid grid-cols-1 gap-8">
                                    {/* Customer Selection */}
                                    <div>
                                        <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-mono">
                                            PELANGGAN
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
                                                className="w-full px-6 py-4 rounded-xl bg-black/50 border border-white/10 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 text-white font-mono appearance-none cursor-pointer"
                                            >
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
                                    </div>

                                    {/* Motor Selection */}
                                    <div>
                                        <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-mono">
                                            UNIT
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
                                                className="w-full px-6 py-4 rounded-xl bg-black/50 border border-white/10 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 text-white font-mono appearance-none cursor-pointer"
                                            >
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

                                    {/* Notes */}
                                    <div>
                                        <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-mono">
                                            CATATAN TAMBAHAN
                                        </label>
                                        <textarea
                                            value={data.notes || ""}
                                            onChange={(e) =>
                                                setData("notes", e.target.value)
                                            }
                                            rows="4"
                                            className="w-full px-6 py-4 rounded-xl bg-black/50 border border-white/10 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 text-white placeholder-white/20 font-mono transition-all"
                                            placeholder="Catatan internal..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Credit Configuration Module */}
                            {data.transaction_type === "CREDIT" && (
                                <div className="bg-blue-900/10 backdrop-blur-md p-8 rounded-3xl border border-blue-500/20 relative overflow-hidden">
                                    <h3 className="text-xl font-bold text-blue-400 mb-8 font-display uppercase tracking-wider flex items-center gap-3">
                                        <span className="w-1 h-8 bg-blue-500 rounded-full"></span>
                                        KONFIGURASI DATA KREDIT
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

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-white text-black py-4 rounded-xl font-bold font-display uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                                >
                                    {processing ? (
                                        <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    ) : (
                                        <Save size={20} />
                                    )}
                                    SIMPAN PERUBAHAN
                                </button>
                            </div>
                        </form>

                        {/* Danger Zone */}
                        <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-6 relative overflow-hidden mt-8">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <AlertTriangle
                                    size={64}
                                    className="text-red-500"
                                />
                            </div>
                            <h3 className="text-red-500 font-bold font-display uppercase tracking-wider mb-2 flex items-center gap-2">
                                <Trash2 size={18} />
                                ZONA BAHAYA
                            </h3>
                            <p className="text-red-400/60 text-xs font-mono mb-6 leading-relaxed">
                                TINDAKAN INI BERSIFAT DESTRUKTIF. MENGHAPUS
                                TRANSAKSI AKAN MENGHILANGKAN SEMUA DATA
                                PEMBAYARAN DAN DOKUMEN YANG TERKAIT.
                            </p>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="w-full py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all flex items-center justify-center gap-2"
                            >
                                <Trash2 size={14} />
                                EKSEKUSI PENGHAPUSAN
                            </button>
                        </div>
                    </div>

                    {/* Sidebar Summary */}
                    <div className="xl:col-span-1 space-y-8">
                        <div className="sticky top-6">
                            <div className="bg-zinc-900/50 backdrop-blur-md p-6 rounded-3xl border border-white/5">
                                <h3 className="text-xs font-bold text-white/50 mb-4 uppercase tracking-widest font-mono flex items-center gap-2">
                                    <Box size={14} className="text-accent" />
                                    INFO SAAT INI
                                </h3>

                                <div className="space-y-4">
                                    <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                                        <label className="text-[10px] text-white/30 font-bold uppercase tracking-wider block mb-1">
                                            UNIT TERDAFTAR
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
                                                TIPE
                                            </label>
                                            <div className="font-mono font-bold text-white uppercase text-sm">
                                                {transaction.transaction_type}
                                            </div>
                                        </div>
                                        <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                                            <label className="text-[10px] text-white/30 font-bold uppercase tracking-wider block mb-1">
                                                STATUS
                                            </label>
                                            <div className="font-mono font-bold text-white uppercase text-sm truncate">
                                                {transaction.status.replace(
                                                    /_/g,
                                                    " "
                                                )}
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
