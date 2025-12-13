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

export default function Edit({ transaction, users, motors }) {
    const { credit_detail } = transaction;

    const { data, setData, put, processing, errors } = useForm({
        user_id: transaction.user_id,
        motor_id: transaction.motor_id,
        customer_name: transaction.customer_name || "",
        customer_phone: transaction.customer_phone || "",
        customer_occupation: transaction.customer_occupation || "",
        transaction_type: transaction.transaction_type,
        status: transaction.status,
        notes: transaction.notes || "",
        booking_fee: transaction.booking_fee || 0,
        total_amount: transaction.total_amount,
        payment_method: transaction.payment_method || "",
        payment_status: transaction.payment_status || "pending",
        // Credit Details
        credit_detail: {
            down_payment: credit_detail?.down_payment || 0,
            tenor: credit_detail?.tenor || 12,
            monthly_installment: credit_detail?.monthly_installment || 0,
            credit_status:
                credit_detail?.credit_status || "menunggu_persetujuan",
            approved_amount: credit_detail?.approved_amount || 0,
        },
    });

    const [selectedMotorPrice, setSelectedMotorPrice] = useState(
        transaction.total_amount || 0
    );

    // Initial load price logic
    useEffect(() => {
        if (transaction.motor_id) {
            const motor = motors.find((m) => m.id == transaction.motor_id);
            if (motor) setSelectedMotorPrice(motor.price);
        }
    }, []);

    // Auto-fill total amount when motor changes
    useEffect(() => {
        if (data.motor_id) {
            // Always update if motor_id is selected
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
    }, [data.motor_id, motors]);

    // Calculate Installment
    useEffect(() => {
        if (data.transaction_type === "CREDIT" && data.total_amount > 0) {
            // Only auto-calc if not initial load or values changed meaningfully
            calculateInstallment();
        }
    }, [
        data.total_amount,
        data.credit_detail.down_payment,
        data.credit_detail.tenor,
        data.transaction_type,
    ]);

    const calculateInstallment = () => {
        // Prevent overwrite on initial load if no change
        // In edit mode, we might want to respect existing values unless user changes parameters.
        // For simplicity, we recalculate if parameters change.

        const total = parseFloat(data.total_amount) || 0;
        const dp = parseFloat(data.credit_detail.down_payment) || 0;
        const tenor = parseInt(data.credit_detail.tenor) || 12;

        if (dp >= total) return;

        const loanAmount = total - dp;
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
        put(route("admin.transactions.update", transaction.id));
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
        <AdminLayout title={`Edit Transaksi #${transaction.id}`}>
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Edit Transaksi #{transaction.id}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                            Perbarui data transaksi dan status pembayaran.
                        </p>
                    </div>
                    <Link
                        href={route("admin.transactions.show", transaction.id)}
                        className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors font-medium"
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
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm transition-colors">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm border border-blue-100 dark:border-blue-800">
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
                                            ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                                            : "border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-500 text-gray-500 dark:text-gray-400 dark:bg-gray-700/50"
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
                                            ? "border-purple-500 bg-purple-50/50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
                                            : "border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-500 text-gray-500 dark:text-gray-400 dark:bg-gray-700/50"
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
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm transition-colors">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm border border-blue-100 dark:border-blue-800">
                                    2
                                </span>
                                Data Produk & Pelanggan
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                        <User size={16} /> Pelanggan Terdaftar
                                    </label>
                                    <select
                                        value={data.user_id}
                                        onChange={(e) =>
                                            setData("user_id", e.target.value)
                                        }
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500"
                                    >
                                        <option
                                            value=""
                                            className="dark:bg-gray-800"
                                        >
                                            -- Pilih Pelanggan --
                                        </option>
                                        {users.map((user) => (
                                            <option
                                                key={user.id}
                                                value={user.id}
                                                className="dark:bg-gray-800"
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
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                        <Bike size={16} /> Unit Motor
                                    </label>
                                    <select
                                        value={data.motor_id}
                                        onChange={(e) =>
                                            setData("motor_id", e.target.value)
                                        }
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500"
                                    >
                                        <option
                                            value=""
                                            className="dark:bg-gray-800"
                                        >
                                            -- Pilih Motor --
                                        </option>
                                        {motors.map((motor) => (
                                            <option
                                                key={motor.id}
                                                value={motor.id}
                                                className="dark:bg-gray-800"
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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                        Status Pesanan
                                    </label>
                                    <select
                                        value={data.status}
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                        className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                    >
                                        <option
                                            value="new_order"
                                            className="dark:bg-gray-800"
                                        >
                                            Pesanan Baru
                                        </option>
                                        <option
                                            value="menunggu_persetujuan"
                                            className="dark:bg-gray-800"
                                        >
                                            Menunggu Persetujuan
                                        </option>
                                        <option
                                            value="dikirim_ke_surveyor"
                                            className="dark:bg-gray-800"
                                        >
                                            Dikirim ke Surveyor
                                        </option>
                                        <option
                                            value="jadwal_survey"
                                            className="dark:bg-gray-800"
                                        >
                                            Jadwal Survey
                                        </option>
                                        <option
                                            value="disetujui"
                                            className="dark:bg-gray-800"
                                        >
                                            Disetujui
                                        </option>
                                        <option
                                            value="ditolak"
                                            className="dark:bg-gray-800"
                                        >
                                            Ditolak
                                        </option>
                                        <option
                                            value="completed"
                                            className="dark:bg-gray-800"
                                        >
                                            Selesai
                                        </option>
                                    </select>
                                </div>
                            </div>

                            {/* Optional Customer Info */}
                            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4">
                                    Informasi Tambahan (Edit)
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1 block">
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
                                            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 outline-none placeholder-gray-400 dark:placeholder-gray-500"
                                            placeholder="Nama Lengkap"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1 block">
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
                                            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 outline-none placeholder-gray-400 dark:placeholder-gray-500"
                                            placeholder="08..."
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1 block">
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
                                            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 outline-none placeholder-gray-400 dark:placeholder-gray-500"
                                            placeholder="Pekerjaan"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Payment Details */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm transition-colors">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm border border-blue-100 dark:border-blue-800">
                                    3
                                </span>
                                Rincian Pembayaran
                            </h3>

                            {data.transaction_type === "CREDIT" ? (
                                <div className="bg-purple-50 dark:bg-purple-900/10 p-6 rounded-xl border border-purple-100 dark:border-purple-800 mb-6 transition-colors">
                                    <h4 className="flex items-center gap-2 font-bold text-purple-900 dark:text-purple-300 mb-4">
                                        <Calculator size={18} /> Simulasi &
                                        Status Kredit
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                                Uang Muka (DP)
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-bold">
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
                                                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none placeholder-gray-400 dark:placeholder-gray-500"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
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
                                                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none"
                                            >
                                                {[12, 24, 36, 48].map((t) => (
                                                    <option
                                                        key={t}
                                                        value={t}
                                                        className="dark:bg-gray-800"
                                                    >
                                                        {t} Bulan
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                                Status Pengajuan
                                            </label>
                                            <select
                                                value={
                                                    data.credit_detail
                                                        .credit_status
                                                }
                                                onChange={(e) =>
                                                    handleCreditChange(
                                                        "credit_status",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none"
                                            >
                                                <option
                                                    value="menunggu_persetujuan"
                                                    className="dark:bg-gray-800"
                                                >
                                                    Menunggu Persetujuan
                                                </option>
                                                <option
                                                    value="data_tidak_valid"
                                                    className="dark:bg-gray-800"
                                                >
                                                    Data Tidak Valid
                                                </option>
                                                <option
                                                    value="dikirim_ke_surveyor"
                                                    className="dark:bg-gray-800"
                                                >
                                                    Dikirim ke Surveyor
                                                </option>
                                                <option
                                                    value="jadwal_survey"
                                                    className="dark:bg-gray-800"
                                                >
                                                    Jadwal Survey
                                                </option>
                                                <option
                                                    value="disetujui"
                                                    className="dark:bg-gray-800"
                                                >
                                                    Disetujui
                                                </option>
                                                <option
                                                    value="ditolak"
                                                    className="dark:bg-gray-800"
                                                >
                                                    Ditolak
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                                Cicilan/Bulan (Fix)
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-bold">
                                                    Rp
                                                </span>
                                                <input
                                                    type="number"
                                                    value={
                                                        data.credit_detail
                                                            .monthly_installment
                                                    }
                                                    onChange={(e) =>
                                                        handleCreditChange(
                                                            "monthly_installment",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none placeholder-gray-400 dark:placeholder-gray-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-800 mb-6 text-blue-800 dark:text-blue-300 text-sm flex items-center gap-3">
                                    <CheckCircle2 size={20} />
                                    <span>Mode Tunai: Pembayaran penuh.</span>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
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
                                        className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                    >
                                        <option
                                            value=""
                                            className="dark:bg-gray-800"
                                        >
                                            Pilih Metode
                                        </option>
                                        <option
                                            value="cash"
                                            className="dark:bg-gray-800"
                                        >
                                            Cash
                                        </option>
                                        <option
                                            value="transfer"
                                            className="dark:bg-gray-800"
                                        >
                                            Transfer
                                        </option>
                                        <option
                                            value="leasing"
                                            className="dark:bg-gray-800"
                                        >
                                            Leasing
                                        </option>
                                        <option
                                            value="bank"
                                            className="dark:bg-gray-800"
                                        >
                                            Bank
                                        </option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                            Status Bayar
                                        </label>
                                        <select
                                            value={data.payment_status}
                                            onChange={(e) =>
                                                setData(
                                                    "payment_status",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        >
                                            <option
                                                value="pending"
                                                className="dark:bg-gray-800"
                                            >
                                                Pending
                                            </option>
                                            <option
                                                value="confirmed"
                                                className="dark:bg-gray-800"
                                            >
                                                Confirmed
                                            </option>
                                            <option
                                                value="failed"
                                                className="dark:bg-gray-800"
                                            >
                                                Failed
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                            Booking Fee
                                        </label>
                                        <input
                                            type="number"
                                            value={data.booking_fee}
                                            onChange={(e) =>
                                                setData(
                                                    "booking_fee",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none placeholder-gray-400 dark:placeholder-gray-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                    Catatan
                                </label>
                                <textarea
                                    value={data.notes}
                                    onChange={(e) =>
                                        setData("notes", e.target.value)
                                    }
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none h-24 placeholder-gray-400 dark:placeholder-gray-500"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: SUMMARY */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 space-y-6">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-lg transition-colors">
                                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                        Ringkasan
                                    </h3>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            data.status === "completed"
                                                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                                : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                                        }`}
                                    >
                                        {data.status
                                            .replace("_", " ")
                                            .toUpperCase()}
                                    </span>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-start">
                                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                                            Unit Motor
                                        </span>
                                        <span className="font-bold text-right text-gray-900 dark:text-white max-w-[150px]">
                                            {data.motor_id
                                                ? motors.find(
                                                      (m) =>
                                                          m.id == data.motor_id
                                                  )?.name
                                                : "-"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                                            Harga Unit
                                        </span>
                                        <span className="font-bold text-gray-900 dark:text-white">
                                            {formatCurrency(selectedMotorPrice)}
                                        </span>
                                    </div>

                                    {data.transaction_type === "CREDIT" && (
                                        <>
                                            <div className="pt-4 border-t border-dashed border-gray-200 dark:border-gray-700"></div>
                                            <div className="flex justify-between items-center text-purple-600 dark:text-purple-400">
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
                                            <div className="flex justify-between items-center text-gray-500 dark:text-gray-400">
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
                                            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl mt-2 border border-purple-100 dark:border-purple-800">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-xs font-bold text-purple-400 dark:text-purple-300">
                                                        ANGSURAN / BULAN
                                                    </span>
                                                    <span className="text-xs font-bold text-purple-700 dark:text-purple-300">
                                                        {
                                                            data.credit_detail
                                                                .tenor
                                                        }
                                                        x
                                                    </span>
                                                </div>
                                                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                                    {formatCurrency(
                                                        data.credit_detail
                                                            .monthly_installment
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {data.booking_fee > 0 && (
                                        <div className="flex justify-between items-center text-green-600 dark:text-green-400">
                                            <span className="text-sm font-medium">
                                                Booking Fee
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
                                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-xl font-bold hover:bg-dark-blue transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 dark:shadow-blue-500/20"
                                >
                                    <Save size={20} />
                                    {processing
                                        ? "Menyimpan..."
                                        : "Update Transaksi"}
                                </button>

                                <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-4">
                                    Perubahan status mungkin mengirim notifikasi
                                    ke WhatsApp pengguna.
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
