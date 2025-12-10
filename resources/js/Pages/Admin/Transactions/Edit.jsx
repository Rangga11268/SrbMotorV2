import React, { useState, useEffect } from "react";
import { Link, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { ArrowLeft, Save } from "lucide-react";

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

    // Auto-fill total amount when motor changes
    useEffect(() => {
        if (data.motor_id && data.motor_id != transaction.motor_id) {
            const selectedMotor = motors.find((m) => m.id == data.motor_id);
            if (selectedMotor) {
                setData((prev) => ({
                    ...prev,
                    total_amount: parseFloat(selectedMotor.price),
                }));
            }
        }
    }, [data.motor_id]);

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

    return (
        <AdminLayout title={`Edit Transaksi #${transaction.id}`}>
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Edit Transaksi #{transaction.id}
                    </h1>
                    <Link
                        href={route("admin.transactions.show", transaction.id)}
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors"
                    >
                        <ArrowLeft size={20} /> Kembali
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <form onSubmit={handleSubmit}>
                        {/* Section 1: Main Selection */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Pelanggan
                                </label>
                                <select
                                    value={data.user_id}
                                    onChange={(e) =>
                                        setData("user_id", e.target.value)
                                    }
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                >
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name} ({user.email})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Motor
                                </label>
                                <select
                                    value={data.motor_id}
                                    onChange={(e) =>
                                        setData("motor_id", e.target.value)
                                    }
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                >
                                    {motors.map((motor) => (
                                        <option key={motor.id} value={motor.id}>
                                            {motor.name} (Rp{" "}
                                            {new Intl.NumberFormat(
                                                "id-ID"
                                            ).format(motor.price)}
                                            )
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Section 2: Customer Info */}
                        <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b">
                            Informasi Pelanggan
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Nama Pelanggan
                                </label>
                                <input
                                    type="text"
                                    value={data.customer_name}
                                    onChange={(e) =>
                                        setData("customer_name", e.target.value)
                                    }
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Nomor Telepon
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
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
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
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                />
                            </div>
                        </div>

                        {/* Section 3: Transaction Details */}
                        <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b">
                            Detail Transaksi
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Tipe Transaksi
                                </label>
                                <select
                                    value={data.transaction_type}
                                    onChange={(e) =>
                                        setData(
                                            "transaction_type",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                >
                                    <option value="CASH">Tunai</option>
                                    <option value="CREDIT">Kredit</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Status
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                >
                                    <option value="new_order">
                                        Pesanan Baru
                                    </option>
                                    <option value="menunggu_persetujuan">
                                        Menunggu Persetujuan
                                    </option>
                                    <option value="dikirim_ke_surveyor">
                                        Dikirim ke Surveyor
                                    </option>
                                    <option value="jadwal_survey">
                                        Jadwal Survey
                                    </option>
                                    <option value="disetujui">Disetujui</option>
                                    <option value="ditolak">Ditolak</option>
                                    <option value="completed">Selesai</option>
                                    {/* Add more as needed */}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Booking Fee (Rp)
                                </label>
                                <input
                                    type="number"
                                    value={data.booking_fee}
                                    onChange={(e) =>
                                        setData("booking_fee", e.target.value)
                                    }
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Total Harga (Rp)
                                </label>
                                <input
                                    type="number"
                                    value={data.total_amount}
                                    onChange={(e) =>
                                        setData("total_amount", e.target.value)
                                    }
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-gray-50"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                                    <option value="cash">Cash</option>
                                    <option value="transfer">Transfer</option>
                                    <option value="leasing">Leasing</option>
                                    <option value="bank">Bank</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Status Pembayaran
                                </label>
                                <select
                                    value={data.payment_status}
                                    onChange={(e) =>
                                        setData(
                                            "payment_status",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="failed">Failed</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Catatan
                            </label>
                            <textarea
                                value={data.notes}
                                onChange={(e) =>
                                    setData("notes", e.target.value)
                                }
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none h-24"
                            ></textarea>
                        </div>

                        {/* Credit Section */}
                        {data.transaction_type === "CREDIT" && (
                            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-6">
                                <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center gap-2">
                                    Detail Kredit
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Uang Muka (Rp)
                                        </label>
                                        <input
                                            type="number"
                                            value={
                                                data.credit_detail.down_payment
                                            }
                                            onChange={(e) =>
                                                handleCreditChange(
                                                    "down_payment",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Tenor (Bulan)
                                        </label>
                                        <input
                                            type="number"
                                            value={data.credit_detail.tenor}
                                            onChange={(e) =>
                                                handleCreditChange(
                                                    "tenor",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Cicilan/Bulan (Estimasi)
                                        </label>
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
                                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Status Kredit
                                        </label>
                                        <select
                                            value={
                                                data.credit_detail.credit_status
                                            }
                                            onChange={(e) =>
                                                handleCreditChange(
                                                    "credit_status",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
                                        >
                                            <option value="menunggu_persetujuan">
                                                Menunggu Persetujuan
                                            </option>
                                            <option value="data_tidak_valid">
                                                Data Tidak Valid
                                            </option>
                                            <option value="dikirim_ke_surveyor">
                                                Dikirim ke Surveyor
                                            </option>
                                            <option value="jadwal_survey">
                                                Jadwal Survey
                                            </option>
                                            <option value="disetujui">
                                                Disetujui
                                            </option>
                                            <option value="ditolak">
                                                Ditolak
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end gap-3 mt-8">
                            <Link
                                href={route(
                                    "admin.transactions.show",
                                    transaction.id
                                )}
                                className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-colors"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold hover:bg-dark-blue transition-colors disabled:opacity-50"
                            >
                                <Save size={18} />
                                {processing
                                    ? "Menyimpan..."
                                    : "Update Transaksi"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
