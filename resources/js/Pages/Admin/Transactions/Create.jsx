import React, { useState, useEffect } from "react";
import { Link, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    ArrowLeft,
    Save,
    User,
    Bike,
    CreditCard,
    Banknote,
    FileText,
    CheckCircle2,
    Calculator,
} from "lucide-react";

export default function Create({ users, motors }) {
    const { data, setData, post, processing, errors } = useForm({
        user_id: "",
        motor_id: "",
        customer_name: "",
        customer_phone: "",
        customer_occupation: "",
        transaction_type: "CASH",
        status: "new_order",
        notes: "",
        booking_fee: 0,
        total_amount: 0,
        payment_method: "",
        payment_status: "pending",
        // Credit Details
        credit_detail: {
            down_payment: 0,
            tenor: 12,
            monthly_installment: 0,
            credit_status: "menunggu_persetujuan",
            approved_amount: 0,
        },
    });

    const [selectedMotorPrice, setSelectedMotorPrice] = useState(0);

    // Auto-fill total amount when motor changes
    useEffect(() => {
        if (data.motor_id) {
            const selectedMotor = motors.find((m) => m.id == data.motor_id);
            if (selectedMotor) {
                const price = parseFloat(selectedMotor.price);
                setSelectedMotorPrice(price);
                setData((prev) => ({
                    ...prev,
                    total_amount: price,
                }));
            }
        }
    }, [data.motor_id]);

    // Calculate Installment
    useEffect(() => {
        if (data.transaction_type === "CREDIT" && data.total_amount > 0) {
            calculateInstallment();
        }
    }, [
        data.total_amount,
        data.credit_detail.down_payment,
        data.credit_detail.tenor,
        data.transaction_type,
    ]);

    const calculateInstallment = () => {
        const total = parseFloat(data.total_amount) || 0;
        const dp = parseFloat(data.credit_detail.down_payment) || 0;
        const tenor = parseInt(data.credit_detail.tenor) || 12;

        if (dp >= total) return;

        const loanAmount = total - dp;
        // Simple interest simulation (flat 1.5% per month for example) or just division
        // Using simple division as per original code logic
        const monthly = loanAmount / tenor;

        setData((prev) => ({
            ...prev,
            credit_detail: {
                ...prev.credit_detail,
                monthly_installment: Math.round(monthly),
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.transactions.store"));
    };

    const handleCreditChange = (key, value) => {
        setData((prev) => ({
            ...prev,
            credit_detail: {
                ...prev.credit_detail,
                [key]: value,
            },
        }));
    };

    const formatCurrency = (val) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(val);

    return (
        <AdminLayout title="Buat Transaksi Baru">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Buat Transaksi Baru
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Isi formulir lengkap untuk memproses pesanan
                            pelanggan.
                        </p>
                    </div>
                    <Link
                        href={route("admin.transactions.index")}
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium"
                    >
                        <ArrowLeft size={20} /> Kembali
                    </Link>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                    {/* LEFT COLUMN: FORM */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* 1. Transaction Type Selection */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm">
                                    1
                                </span>
                                Tipe Transaksi
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div
                                    onClick={() =>
                                        setData("transaction_type", "CASH")
                                    }
                                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${
                                        data.transaction_type === "CASH"
                                            ? "border-blue-500 bg-blue-50/50 text-blue-700"
                                            : "border-gray-100 hover:border-blue-200 text-gray-500"
                                    }`}
                                >
                                    <Banknote size={32} />
                                    <span className="font-bold">
                                        Tunai (CASH)
                                    </span>
                                </div>
                                <div
                                    onClick={() =>
                                        setData("transaction_type", "CREDIT")
                                    }
                                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${
                                        data.transaction_type === "CREDIT"
                                            ? "border-purple-500 bg-purple-50/50 text-purple-700"
                                            : "border-gray-100 hover:border-purple-200 text-gray-500"
                                    }`}
                                >
                                    <CreditCard size={32} />
                                    <span className="font-bold">
                                        Kredit (CREDIT)
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 2. Main Selection */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm">
                                    2
                                </span>
                                Data Produk & Pelanggan
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                        <User size={16} /> Pelanggan Terdaftar
                                    </label>
                                    <select
                                        value={data.user_id}
                                        onChange={(e) =>
                                            setData("user_id", e.target.value)
                                        }
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    >
                                        <option value="">
                                            -- Pilih Pelanggan --
                                        </option>
                                        {users.map((user) => (
                                            <option
                                                key={user.id}
                                                value={user.id}
                                            >
                                                {user.name} ({user.email})
                                            </option>
                                        ))}
                                    </select>
                                    {errors.user_id && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.user_id}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                        <Bike size={16} /> Unit Motor
                                    </label>
                                    <select
                                        value={data.motor_id}
                                        onChange={(e) =>
                                            setData("motor_id", e.target.value)
                                        }
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    >
                                        <option value="">
                                            -- Pilih Motor --
                                        </option>
                                        {motors.map((motor) => (
                                            <option
                                                key={motor.id}
                                                value={motor.id}
                                            >
                                                {motor.name} •{" "}
                                                {formatCurrency(motor.price)}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.motor_id && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.motor_id}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Optional Customer Info */}
                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <h4 className="text-sm font-bold text-gray-900 mb-4">
                                    Informasi Tambahan (Opsional)
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 mb-1 block">
                                            Nama Lengkap (Sesuai KTP)
                                        </label>
                                        <input
                                            type="text"
                                            value={data.customer_name}
                                            onChange={(e) =>
                                                setData(
                                                    "customer_name",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-blue-500 outline-none"
                                            placeholder="Nama Lengkap"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 mb-1 block">
                                            No. Telepon / WA
                                        </label>
                                        <input
                                            type="text"
                                            value={data.customer_phone}
                                            onChange={(e) =>
                                                setData(
                                                    "customer_phone",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-blue-500 outline-none"
                                            placeholder="08..."
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 mb-1 block">
                                            Pekerjaan
                                        </label>
                                        <input
                                            type="text"
                                            value={data.customer_occupation}
                                            onChange={(e) =>
                                                setData(
                                                    "customer_occupation",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-blue-500 outline-none"
                                            placeholder="Pekerjaan"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Payment Details */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm">
                                    3
                                </span>
                                Rincian Pembayaran
                            </h3>

                            {data.transaction_type === "CREDIT" ? (
                                <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 mb-6">
                                    <h4 className="flex items-center gap-2 font-bold text-purple-900 mb-4">
                                        <Calculator size={18} /> Simulasi Kredit
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                                Uang Muka (DP)
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">
                                                    Rp
                                                </span>
                                                <input
                                                    type="number"
                                                    value={
                                                        data.credit_detail
                                                            .down_payment
                                                    }
                                                    onChange={(e) =>
                                                        handleCreditChange(
                                                            "down_payment",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none"
                                                />
                                            </div>
                                            {errors[
                                                "credit_detail.down_payment"
                                            ] && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {
                                                        errors[
                                                            "credit_detail.down_payment"
                                                        ]
                                                    }
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                                Tenor (Bulan)
                                            </label>
                                            <select
                                                value={data.credit_detail.tenor}
                                                onChange={(e) =>
                                                    handleCreditChange(
                                                        "tenor",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none"
                                            >
                                                {[12, 24, 36, 48].map((t) => (
                                                    <option key={t} value={t}>
                                                        {t} Bulan
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6 text-blue-800 text-sm flex items-center gap-3">
                                    <CheckCircle2 size={20} />
                                    <span>
                                        Pembayaran Tunai tidak memerlukan
                                        simulasi kredit. Total tagihan sesuai
                                        harga motor.
                                    </span>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
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
                                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                    >
                                        <option value="">Pilih Metode</option>
                                        <option value="cash">
                                            Cash (Tunai)
                                        </option>
                                        <option value="transfer">
                                            Transfer Bank
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Booking Fee (Tanda Jadi)
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">
                                            Rp
                                        </span>
                                        <input
                                            type="number"
                                            value={data.booking_fee}
                                            onChange={(e) =>
                                                setData(
                                                    "booking_fee",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Catatan Pesanan
                                </label>
                                <textarea
                                    value={data.notes}
                                    onChange={(e) =>
                                        setData("notes", e.target.value)
                                    }
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none min-h-[100px]"
                                    placeholder="Catatan tambahan (warna, aksesoris, dll)..."
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: SUMMARY */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 space-y-6">
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg">
                                <h3 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b">
                                    Ringkasan Pesanan
                                </h3>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-start">
                                        <span className="text-gray-500 text-sm">
                                            Unit Motor
                                        </span>
                                        <span className="font-bold text-right text-gray-900 max-w-[150px]">
                                            {data.motor_id
                                                ? motors.find(
                                                      (m) =>
                                                          m.id == data.motor_id
                                                  )?.name
                                                : "-"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500 text-sm">
                                            Harga Unit
                                        </span>
                                        <span className="font-bold text-gray-900">
                                            {formatCurrency(selectedMotorPrice)}
                                        </span>
                                    </div>

                                    {data.transaction_type === "CREDIT" && (
                                        <>
                                            <div className="pt-4 border-t border-dashed border-gray-200"></div>
                                            <div className="flex justify-between items-center text-purple-600">
                                                <span className="text-sm font-medium">
                                                    Uang Muka (DP)
                                                </span>
                                                <span className="font-bold">
                                                    -{" "}
                                                    {formatCurrency(
                                                        data.credit_detail
                                                            .down_payment
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center text-gray-500">
                                                <span className="text-sm">
                                                    Pokok Hutang
                                                </span>
                                                <span className="font-medium">
                                                    {formatCurrency(
                                                        Math.max(
                                                            0,
                                                            selectedMotorPrice -
                                                                data
                                                                    .credit_detail
                                                                    .down_payment
                                                        )
                                                    )}
                                                </span>
                                            </div>
                                            <div className="bg-purple-50 p-4 rounded-xl mt-2">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-xs font-bold text-purple-400">
                                                        ESTIMASI ANGSURAN
                                                    </span>
                                                    <span className="text-xs font-bold text-purple-700">
                                                        {
                                                            data.credit_detail
                                                                .tenor
                                                        }
                                                        x Bulan
                                                    </span>
                                                </div>
                                                <div className="text-2xl font-bold text-purple-600">
                                                    {formatCurrency(
                                                        data.credit_detail
                                                            .monthly_installment
                                                    )}
                                                    <span className="text-xs text-gray-400 font-normal">
                                                        /bln
                                                    </span>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {data.booking_fee > 0 && (
                                        <div className="flex justify-between items-center text-green-600">
                                            <span className="text-sm font-medium">
                                                Booking Fee (Bayar Sekarang)
                                            </span>
                                            <span className="font-bold">
                                                {formatCurrency(
                                                    data.booking_fee
                                                )}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-xl font-bold hover:bg-dark-blue transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30"
                                >
                                    <Save size={20} />
                                    {processing
                                        ? "Memproses..."
                                        : "Buat Transaksi"}
                                </button>

                                <p className="text-xs text-center text-gray-400 mt-4">
                                    Pastikan data sudah benar sebelum menyimpan.
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
