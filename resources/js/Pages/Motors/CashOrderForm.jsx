import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import {
    CreditCard,
    User,
    Phone,
    Briefcase,
    FileText,
    DollarSign,
    Calendar,
    ArrowLeft,
    CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";

export default function CashOrderForm({ motor }) {
    const { data, setData, post, processing, errors } = useForm({
        customer_name: "",
        customer_phone: "",
        customer_occupation: "",
        notes: "",
        booking_fee: 0,
        payment_method: "",
    });

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const submit = (e) => {
        e.preventDefault();

        if (data.booking_fee >= motor.price) {
            alert(
                "Booking fee tidak boleh lebih besar atau sama dengan harga motor"
            );
            return;
        }

        post(route("motors.process-cash-order", motor.id));
    };

    return (
        <MainLayout title={`Pesanan Tunai - ${motor.name}`}>
            <div className="bg-gray-50 min-h-screen pt-32 pb-10">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-10"
                    >
                        <h1 className="text-3xl font-bold text-gray-900">
                            Pesanan <span className="text-primary">Tunai</span>
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Lengkapi data untuk memesan {motor.name}
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                                <h2 className="text-2xl font-bold relative z-10 flex items-center gap-3">
                                    <CreditCard size={28} />
                                    Formulir Pemesanan Tunai
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
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                                        <div>
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

                                        {/* Booking Fee */}
                                        <div>
                                            <label className="block text-gray-700 font-bold mb-2 text-sm pl-3 border-l-4 border-primary">
                                                Uang Muka (Booking Fee)
                                            </label>
                                            <div className="relative">
                                                <DollarSign
                                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                    size={18}
                                                />
                                                <input
                                                    type="number"
                                                    value={data.booking_fee}
                                                    onChange={(e) =>
                                                        setData(
                                                            "booking_fee",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 focus:bg-white transition-colors"
                                                    placeholder="0"
                                                    min="0"
                                                    step="1000"
                                                />
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1 ml-1">
                                                Opsional. Maksimal:{" "}
                                                {formatCurrency(
                                                    motor.price - 1
                                                )}
                                            </p>
                                            {errors.booking_fee && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.booking_fee}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Notes */}
                                    <div className="mb-6">
                                        <label className="block text-gray-700 font-bold mb-2 text-sm pl-3 border-l-4 border-blue-500">
                                            Catatan Tambahan
                                        </label>
                                        <div className="relative">
                                            <FileText
                                                className="absolute left-4 top-4 text-gray-400"
                                                size={18}
                                            />
                                            <textarea
                                                value={data.notes}
                                                onChange={(e) =>
                                                    setData(
                                                        "notes",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 focus:bg-white transition-colors min-h-[100px]"
                                                placeholder="Catatan tambahan untuk pesanan Anda (Opsional)"
                                            />
                                        </div>
                                        {errors.notes && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.notes}
                                            </p>
                                        )}
                                    </div>

                                    {/* Payment Method */}
                                    <div className="mb-8">
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
                                                Pilih metode pembayaran
                                            </option>
                                            <option value="online">
                                                Pembayaran Online (VA, E-Wallet,
                                                QRIS)
                                            </option>
                                            <option value="cod_dealer">
                                                Cash di Dealer / COD
                                            </option>
                                        </select>
                                        {errors.payment_method && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.payment_method}
                                            </p>
                                        )}
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
                                            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            <CheckCircle size={20} /> Konfirmasi
                                            Pesanan Tunai
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
