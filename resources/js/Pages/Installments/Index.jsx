import React, { useState, useEffect } from "react";
import { Head, useForm, router, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import {
    CreditCard,
    Calendar,
    CheckCircle,
    Clock,
    AlertTriangle,
    Upload,
    ChevronRight,
    Search,
    Download,
    X,
    Shield,
    Zap,
} from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";

export default function InstallmentIndex({ transactions }) {
    const [selectedInstallment, setSelectedInstallment] = useState(null);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const [isLoadingPay, setIsLoadingPay] = useState(false);
    const [isLoadingCheck, setIsLoadingCheck] = useState(false);

    const { config } = usePage().props;

    // Load Snap.js
    useEffect(() => {
        const snapUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        // Using the Client Key provided from backend
        const clientKey = config.midtrans_client_key;

        const script = document.createElement("script");
        script.src = snapUrl;
        script.setAttribute("data-client-key", clientKey);
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const { data, setData, post, processing, errors, reset } = useForm({
        payment_method: "transfer",
        payment_proof: null,
    });

    const openUploadModal = (installment) => {
        setSelectedInstallment(installment);
        setIsUploadModalOpen(true);
    };

    const closeUploadModal = () => {
        setIsUploadModalOpen(false);
        setSelectedInstallment(null);
        reset();
    };

    const handleOnlinePayment = async (installment) => {
        setIsLoadingPay(true);
        try {
            const response = await axios.post(
                route("installments.create-payment", installment.id)
            );
            const token = response.data.snap_token;

            window.snap.pay(token, {
                onSuccess: function (result) {
                    // console.log(result);
                    Swal.fire(
                        "Berhasil!",
                        "Pembayaran berhasil diproses.",
                        "success"
                    );
                    router.reload();
                },
                onPending: function (result) {
                    Swal.fire("Pending", "Menunggu pembayaran Anda.", "info");
                    router.reload();
                },
                onError: function (result) {
                    Swal.fire("Gagal", "Pembayaran gagal.", "error");
                },
                onClose: function () {
                    // Customer closed the popup without finishing the payment
                },
            });
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Gagal memproses pembayaran online.", "error");
        } finally {
            setIsLoadingPay(false);
        }
    };

    const handleCheckStatus = async (installment) => {
        setIsLoadingCheck(true);
        try {
            const response = await axios.post(
                route("installments.check-status", installment.id)
            );
            Swal.fire({
                title: "Status Update",
                text: response.data.message,
                icon: "info",
            });
            router.reload();
        } catch (error) {
            console.error(error);
            Swal.fire(
                "Info",
                error.response?.data?.message || "Gagal mengecek status.",
                "warning"
            );
        } finally {
            setIsLoadingCheck(false);
        }
    };

    const submitPayment = (e) => {
        e.preventDefault();
        post(route("installments.pay", selectedInstallment.id), {
            onSuccess: () => {
                closeUploadModal();
                Swal.fire({
                    icon: "success",
                    title: "Berhasil!",
                    text: "Bukti pembayaran berhasil diunggah dan sedang diverifikasi.",
                    confirmButtonColor: "#4F46E5",
                });
            },
        });
    };

    const getStatusBadge = (status) => {
        const badges = {
            pending: "bg-gray-100 text-gray-600 border-gray-200",
            waiting_approval: "bg-yellow-50 text-yellow-700 border-yellow-200",
            paid: "bg-green-50 text-green-700 border-green-200",
            overdue: "bg-red-50 text-red-700 border-red-200",
        };
        const labels = {
            pending: "Belum Dibayar",
            waiting_approval: "Menunggu Verifikasi",
            paid: "Lunas",
            overdue: "Jatuh Tempo",
        };

        return (
            <span
                className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    badges[status] || badges.pending
                }`}
            >
                {labels[status] || status}
            </span>
        );
    };

    const formatCurrency = (amount) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);

    const formatDate = (dateString) =>
        new Date(dateString).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

    return (
        <MainLayout title="Cicilan Saya">
            <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen pt-28 pb-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900">
                                Cicilan{" "}
                                <span className="text-primary">Saya</span>
                            </h1>
                            <p className="text-gray-500 mt-1">
                                Kelola pembayaran angsuran motor Anda
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2">
                            <Shield className="text-green-500" size={20} />
                            <span className="text-sm font-medium text-gray-600">
                                Pembayaran Aman & Terverifikasi
                            </span>
                        </div>
                    </div>

                    {transactions.length > 0 ? (
                        <div className="space-y-8">
                            {transactions.map((transaction) => (
                                <div
                                    key={transaction.id}
                                    className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
                                >
                                    {/* Transaction Header */}
                                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-white flex flex-col md:flex-row justify-between items-center gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                                <CreditCard size={32} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold">
                                                    {transaction.motor?.name ||
                                                        "Motor"}
                                                </h3>
                                                <div className="text-white/70 text-sm flex items-center gap-2">
                                                    <span>
                                                        {transaction.invoice_number ||
                                                            `TRX-${transaction.id}`}
                                                    </span>
                                                    <span>•</span>
                                                    <span>
                                                        {formatDate(
                                                            transaction.created_at
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs text-white/60 uppercase font-bold tracking-wider">
                                                Total Kredit
                                            </div>
                                            <div className="text-2xl font-bold text-white">
                                                {formatCurrency(
                                                    transaction.total_amount
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Installments List */}
                                    <div className="p-6 overflow-x-auto">
                                        <table className="w-full min-w-[600px]">
                                            <thead>
                                                <tr className="border-b border-gray-100 text-left text-xs uppercase text-gray-400 font-bold tracking-wider">
                                                    <th className="pb-4 pl-4">
                                                        Bulan Ke
                                                    </th>
                                                    <th className="pb-4">
                                                        Jatuh Tempo
                                                    </th>
                                                    <th className="pb-4">
                                                        Nominal
                                                    </th>
                                                    <th className="pb-4">
                                                        Status
                                                    </th>
                                                    <th className="pb-4 text-center">
                                                        Aksi
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {transaction.installments &&
                                                transaction.installments
                                                    .length > 0 ? (
                                                    transaction.installments.map(
                                                        (inst) => (
                                                            <tr
                                                                key={inst.id}
                                                                className="hover:bg-gray-50/50 transition-colors"
                                                            >
                                                                {inst.installment_number ===
                                                                0 ? (
                                                                    <span className="text-primary font-bold">
                                                                        Uang
                                                                        Muka
                                                                        (DP)
                                                                    </span>
                                                                ) : (
                                                                    `#${inst.installment_number}`
                                                                )}
                                                                <td className="py-4 text-gray-600 font-medium">
                                                                    {formatDate(
                                                                        inst.due_date
                                                                    )}
                                                                </td>
                                                                <td className="py-4 font-bold text-gray-900">
                                                                    {formatCurrency(
                                                                        Number(
                                                                            inst.amount
                                                                        ) +
                                                                            Number(
                                                                                inst.penalty_amount ||
                                                                                    0
                                                                            )
                                                                    )}
                                                                    {Number(
                                                                        inst.penalty_amount
                                                                    ) > 0 && (
                                                                        <div className="text-xs text-red-500 font-bold mt-1">
                                                                            +
                                                                            Denda:{" "}
                                                                            {formatCurrency(
                                                                                inst.penalty_amount
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </td>
                                                                <td className="py-4">
                                                                    {getStatusBadge(
                                                                        inst.status
                                                                    )}
                                                                </td>
                                                                <td className="py-4 text-center">
                                                                    {/* Logic for Pay Button */}
                                                                    {inst.status ===
                                                                        "pending" ||
                                                                    inst.status ===
                                                                        "overdue" ? (
                                                                        <div className="flex gap-2 justify-center">
                                                                            <button
                                                                                onClick={() =>
                                                                                    handleOnlinePayment(
                                                                                        inst
                                                                                    )
                                                                                }
                                                                                disabled={
                                                                                    isLoadingPay
                                                                                }
                                                                                className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md shadow-blue-200 hover:bg-blue-700 transition-all hover:translate-y-[-1px] inline-flex items-center gap-1.5"
                                                                            >
                                                                                <Zap
                                                                                    size={
                                                                                        14
                                                                                    }
                                                                                />
                                                                                {isLoadingPay
                                                                                    ? "Loading..."
                                                                                    : "Bayar Online"}
                                                                            </button>
                                                                            <button
                                                                                onClick={() =>
                                                                                    handleCheckStatus(
                                                                                        inst
                                                                                    )
                                                                                }
                                                                                disabled={
                                                                                    isLoadingCheck
                                                                                }
                                                                                className="bg-yellow-100 text-yellow-700 px-3 py-2 rounded-lg text-sm font-bold hover:bg-yellow-200 transition-all hover:translate-y-[-1px] inline-flex items-center gap-1.5"
                                                                                title="Cek Status Pembayaran"
                                                                            >
                                                                                {isLoadingCheck ? (
                                                                                    <span className="animate-spin">
                                                                                        ⌛
                                                                                    </span>
                                                                                ) : (
                                                                                    <Clock
                                                                                        size={
                                                                                            14
                                                                                        }
                                                                                    />
                                                                                )}
                                                                            </button>
                                                                            <button
                                                                                onClick={() =>
                                                                                    openUploadModal(
                                                                                        inst
                                                                                    )
                                                                                }
                                                                                className="bg-white border border-gray-200 text-gray-600 px-3 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition-all hover:translate-y-[-1px] inline-flex items-center gap-1.5"
                                                                            >
                                                                                <Upload
                                                                                    size={
                                                                                        14
                                                                                    }
                                                                                />{" "}
                                                                                {/* Bayar Title Removed for Icon only */}
                                                                            </button>
                                                                        </div>
                                                                    ) : inst.status ===
                                                                      "waiting_approval" ? (
                                                                        <span className="text-xs font-medium text-yellow-600 flex items-center justify-center gap-1">
                                                                            <Clock
                                                                                size={
                                                                                    14
                                                                                }
                                                                            />{" "}
                                                                            Proses
                                                                        </span>
                                                                    ) : (
                                                                        <div className="flex gap-2 justify-center">
                                                                            <span className="text-xs font-medium text-green-600 flex items-center justify-center gap-1 border border-green-200 bg-green-50 px-2 py-1 rounded-lg">
                                                                                <CheckCircle
                                                                                    size={
                                                                                        14
                                                                                    }
                                                                                />{" "}
                                                                                Selesai
                                                                            </span>
                                                                            <a
                                                                                href={route(
                                                                                    "installments.receipt",
                                                                                    inst.id
                                                                                )}
                                                                                target="_blank"
                                                                                className="text-gray-500 hover:text-primary transition-colors"
                                                                                title="Download Kuitansi"
                                                                            >
                                                                                <Download
                                                                                    size={
                                                                                        18
                                                                                    }
                                                                                />
                                                                            </a>
                                                                        </div>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        )
                                                    )
                                                ) : (
                                                    <tr>
                                                        <td
                                                            colSpan="5"
                                                            className="py-12 text-center"
                                                        >
                                                            <div className="flex flex-col items-center justify-center">
                                                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                                                                    <CreditCard
                                                                        size={
                                                                            24
                                                                        }
                                                                        className="text-gray-300"
                                                                    />
                                                                </div>
                                                                <p className="text-gray-500 font-medium">
                                                                    Belum ada
                                                                    data cicilan
                                                                </p>
                                                                <p className="text-sm text-gray-400 mt-1">
                                                                    Data akan
                                                                    muncul
                                                                    setelah
                                                                    pengajuan
                                                                    disetujui
                                                                    Admin
                                                                </p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                <CreditCard
                                    size={40}
                                    className="text-gray-300"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">
                                Belum Ada Cicilan Aktif
                            </h3>
                            <p className="text-gray-500 max-w-md text-center mt-2">
                                Anda belum memiliki pengajuan kredit yang
                                disetujui. Silakan ajukan kredit motor impian
                                Anda terlebih dahulu.
                            </p>
                        </div>
                    )}

                    {/* Payment Modal */}
                    {isUploadModalOpen && selectedInstallment && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in-up">
                                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                    <h3 className="text-lg font-bold text-gray-900">
                                        Konfirmasi Pembayaran
                                    </h3>
                                    <button
                                        onClick={closeUploadModal}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                <form onSubmit={submitPayment} className="p-6">
                                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-600">
                                                Tagihan Bulan Ke
                                            </span>
                                            <span className="font-bold text-gray-900">
                                                #
                                                {
                                                    selectedInstallment.installment_number
                                                }
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-lg font-bold text-primary">
                                            <span>Total Bayar</span>
                                            <span>
                                                {formatCurrency(
                                                    Number(
                                                        selectedInstallment.amount
                                                    ) +
                                                        Number(
                                                            selectedInstallment.penalty_amount ||
                                                                0
                                                        )
                                                )}
                                            </span>
                                        </div>
                                        <div className="mt-3 text-xs text-blue-600 bg-blue-100/50 p-2 rounded-lg">
                                            Silakan transfer ke rekening BCA:{" "}
                                            <b>123-456-7890</b> a.n SRB Motor.
                                        </div>
                                        {Number(
                                            selectedInstallment.penalty_amount
                                        ) > 0 && (
                                            <div className="bg-red-50 border border-red-100 rounded-lg p-3 mt-3 flex items-start gap-2">
                                                <AlertTriangle
                                                    size={16}
                                                    className="text-red-600 mt-0.5"
                                                />
                                                <div>
                                                    <p className="text-xs font-bold text-red-700">
                                                        Keterlambatan Pembayaran
                                                    </p>
                                                    <p className="text-xs text-red-600 mt-0.5">
                                                        Anda dikenakan denda
                                                        sebesar{" "}
                                                        <b>
                                                            {formatCurrency(
                                                                selectedInstallment.penalty_amount
                                                            )}
                                                        </b>{" "}
                                                        karena melewati jatuh
                                                        tempo.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-4">
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
                                                className="w-full rounded-xl border-gray-300 focus:border-primary focus:ring-primary"
                                            >
                                                <option value="transfer">
                                                    Transfer Bank (Manual)
                                                </option>
                                                <option value="cash">
                                                    Tunai di Dealer
                                                </option>
                                                <option
                                                    value="midtrans_bca_va"
                                                    disabled
                                                    className="text-gray-400 bg-gray-100"
                                                >
                                                    BCA Virtual Account (Gunakan
                                                    Bayar Online)
                                                </option>
                                                <option
                                                    value="midtrans_gopay"
                                                    disabled
                                                    className="text-gray-400 bg-gray-100"
                                                >
                                                    GoPay (Gunakan Bayar Online)
                                                </option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                                Upload Bukti Pembayaran
                                            </label>
                                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) =>
                                                        setData(
                                                            "payment_proof",
                                                            e.target.files[0]
                                                        )
                                                    }
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                    required
                                                />
                                                <div className="flex flex-col items-center gap-2">
                                                    <Upload
                                                        className="text-gray-400"
                                                        size={32}
                                                    />
                                                    {data.payment_proof ? (
                                                        <span className="text-sm font-medium text-green-600">
                                                            {
                                                                data
                                                                    .payment_proof
                                                                    .name
                                                            }
                                                        </span>
                                                    ) : (
                                                        <span className="text-sm text-gray-500">
                                                            Klik untuk upload
                                                            foto bukti transfer
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            {errors.payment_proof && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.payment_proof}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-8">
                                        <button
                                            type="button"
                                            onClick={closeUploadModal}
                                            className="flex-1 py-3 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition-colors"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="flex-1 bg-primary text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                                        >
                                            {processing ? (
                                                "Mengirim..."
                                            ) : (
                                                <>
                                                    <CheckCircle size={18} />{" "}
                                                    Konfirmasi
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
