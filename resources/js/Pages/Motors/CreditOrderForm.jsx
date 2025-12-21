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

        if (dp >= motor.price) {
            // Logic handled in validation/submit, but visual feedback here
        }

        if (tenor > 0) {
            const loanAmount = Math.max(0, motor.price - dp);
            const monthly = loanAmount / tenor;
            const roundedMonthly = Math.round(monthly);
            setCalculatedInstallment(roundedMonthly);
            // We don't necessarily need to set data.monthly_installment if backend calculates it,
            // but the blade form submitted it (though backend re-calculates).
            // Let's keep it consistent visually.
        } else {
            setCalculatedInstallment(0);
        }
    }, [data.down_payment, data.tenor, motor.price]);

    const submit = (e) => {
        e.preventDefault();

        if (parseFloat(data.down_payment) >= motor.price) {
            alert(
                "Uang muka tidak boleh lebih besar atau sama dengan harga motor"
            );
            return;
        }

        post(route("motors.process-credit-order", motor.id));
    };

    return (
        <MainLayout title={`Pengajuan Kredit - ${motor.name}`}>
            <div className="bg-gray-50 min-h-screen pt-32 pb-10">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-10"
                    >
                        <h1 className="text-3xl font-bold text-gray-900">
                            Pengajuan{" "}
                            <span className="text-primary">Kredit</span>
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Dapatkan motor impian Anda dengan cicilan ringan
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-8 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                                <h2 className="text-2xl font-bold relative z-10 flex items-center gap-3">
                                    <FileText size={28} />
                                    Formulir Pengajuan Kredit
                                </h2>
                            </div>

                            <div className="p-8">
                                {/* Motor Summary */}
                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-8 flex flex-col md:flex-row gap-6 items-center">
                                    <img
                                        src={`/storage/${motor.image_path}`}
                                        alt={motor.name}
                                        className="w-full md:w-48 h-32 object-contain bg-white rounded-xl shadow-sm p-2"
                                    />
                                    <div className="flex-1 text-center md:text-left">
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                                            {motor.name}
                                        </h3>
                                        <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-500 mb-2">
                                            <span className="flex items-center gap-1">
                                                <Calendar size={14} />{" "}
                                                {motor.year}
                                            </span>
                                            <span className="capitalize">
                                                • {motor.type}
                                            </span>
                                        </div>
                                        <div className="text-2xl font-bold text-primary">
                                            {formatCurrency(motor.price)}
                                        </div>
                                    </div>
                                </div>

                                <form onSubmit={submit}>
                                    <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
                                        Data Diri
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                        {/* Name */}
                                        <div>
                                            <label className="block text-gray-700 font-bold mb-2 text-sm pl-3 border-l-4 border-primary">
                                                Nama Lengkap
                                            </label>
                                            <div className="relative">
                                                <User
                                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                    size={18}
                                                />
                                                <input
                                                    type="text"
                                                    value={data.customer_name}
                                                    onChange={(e) =>
                                                        setData(
                                                            "customer_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 focus:bg-white transition-colors"
                                                    placeholder="Nama Lengkap"
                                                    required
                                                />
                                            </div>
                                            {errors.customer_name && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.customer_name}
                                                </p>
                                            )}
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label className="block text-gray-700 font-bold mb-2 text-sm pl-3 border-l-4 border-primary">
                                                Nomor Telepon
                                            </label>
                                            <div className="relative">
                                                <Phone
                                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                    size={18}
                                                />
                                                <input
                                                    type="tel"
                                                    value={data.customer_phone}
                                                    onChange={(e) =>
                                                        setData(
                                                            "customer_phone",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 focus:bg-white transition-colors"
                                                    placeholder="08xxxxxxxxxx"
                                                    required
                                                />
                                            </div>
                                            {errors.customer_phone && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.customer_phone}
                                                </p>
                                            )}
                                        </div>

                                        {/* Occupation */}
                                        <div className="md:col-span-2">
                                            <label className="block text-gray-700 font-bold mb-2 text-sm pl-3 border-l-4 border-primary">
                                                Pekerjaan
                                            </label>
                                            <div className="relative">
                                                <Briefcase
                                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                    size={18}
                                                />
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
                                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 focus:bg-white transition-colors"
                                                    placeholder="Pekerjaan saat ini"
                                                    required
                                                />
                                            </div>
                                            {errors.customer_occupation && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.customer_occupation}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
                                        Simulasi Kredit
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        {/* Down Payment */}
                                        <div>
                                            <label className="block text-gray-700 font-bold mb-2 text-sm pl-3 border-l-4 border-primary">
                                                Uang Muka (DP)
                                            </label>
                                            <div className="relative">
                                                <Percent
                                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                    size={18}
                                                />
                                                <input
                                                    type="number"
                                                    value={data.down_payment}
                                                    onChange={(e) =>
                                                        setData(
                                                            "down_payment",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 focus:bg-white transition-colors"
                                                    placeholder="0"
                                                    min="0"
                                                    required
                                                />
                                            </div>
                                            {errors.down_payment && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.down_payment}
                                                </p>
                                            )}
                                        </div>

                                        {/* Tenor */}
                                        <div>
                                            <label className="block text-gray-700 font-bold mb-2 text-sm pl-3 border-l-4 border-primary">
                                                Tenor (Bulan)
                                            </label>
                                            <div className="relative">
                                                <Clock
                                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                    size={18}
                                                />
                                                <select
                                                    value={data.tenor}
                                                    onChange={(e) =>
                                                        setData(
                                                            "tenor",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 focus:bg-white transition-colors appearance-none"
                                                    required
                                                >
                                                    <option value="" disabled>
                                                        Pilih tenor
                                                    </option>
                                                    <option value="12">
                                                        12 Bulan
                                                    </option>
                                                    <option value="24">
                                                        24 Bulan
                                                    </option>
                                                    <option value="36">
                                                        36 Bulan
                                                    </option>
                                                    <option value="48">
                                                        48 Bulan
                                                    </option>
                                                    <option value="60">
                                                        60 Bulan
                                                    </option>
                                                </select>
                                            </div>
                                            {errors.tenor && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.tenor}
                                                </p>
                                            )}
                                        </div>

                                        {/* Estimated Installment */}
                                        <div className="md:col-span-2">
                                            <label className="block text-gray-700 font-bold mb-2 text-sm pl-3 border-l-4 border-gray-400">
                                                Estimasi Cicilan Per Bulan
                                            </label>
                                            <div className="relative">
                                                <div className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 text-gray-700 font-bold">
                                                    {formatCurrency(
                                                        calculatedInstallment
                                                    )}{" "}
                                                    / bulan
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">
                                                *Nilai ini adalah estimasi.
                                                Angsuran final akan ditentukan
                                                oleh pihak leasing.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Additional Info */}
                                    <div className="mb-6">
                                        <label className="block text-gray-700 font-bold mb-2 text-sm pl-3 border-l-4 border-blue-500">
                                            Metode Pembayaran
                                        </label>
                                        <select
                                            value={data.payment_method}
                                            onChange={(e) =>
                                                setData(
                                                    "payment_method",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 focus:bg-white transition-colors"
                                            required
                                        >
                                            <option value="" disabled>
                                                Pilih metode pembayaran (DP &
                                                Cicilan)
                                            </option>
                                            <option value="transfer">
                                                Transfer Bank / Virtual Account
                                                (Online)
                                            </option>
                                            <option value="cash">
                                                Tunai di Dealer (Cash)
                                            </option>
                                        </select>
                                        {errors.payment_method && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.payment_method}
                                            </p>
                                        )}
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 font-bold mb-2 text-sm pl-3 border-l-4 border-blue-500">
                                            Catatan Tambahan
                                        </label>
                                        <textarea
                                            value={data.notes}
                                            onChange={(e) =>
                                                setData("notes", e.target.value)
                                            }
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 focus:bg-white transition-colors min-h-[100px]"
                                            placeholder="Catatan tambahan (Opsional)"
                                        />
                                        {errors.notes && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.notes}
                                            </p>
                                        )}
                                    </div>

                                    <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-8">
                                        <h5 className="font-bold text-dark-blue flex items-center gap-2 mb-2">
                                            <Info size={18} /> Informasi Penting
                                        </h5>
                                        <ul className="list-disc list-inside text-primary/80 text-sm space-y-1 pl-1">
                                            <li>
                                                Setelah ini, Anda diminta
                                                mengunggah dokumen (KTP, KK,
                                                dll).
                                            </li>
                                            <li>
                                                Dokumen akan direview sebelum
                                                diproses ke leasing.
                                            </li>
                                            <li>
                                                Keputusan dalam 1-3 hari kerja.
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="flex flex-col-reverse md:flex-row gap-4 pt-4 border-t border-gray-100">
                                        <Link
                                            href={route(
                                                "motors.show",
                                                motor.id
                                            )}
                                            className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <ArrowLeft size={20} /> Batal
                                        </Link>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="flex-1 bg-gradient-to-r from-blue-700 to-blue-900 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            <Send size={20} /> Ajukan Kredit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
