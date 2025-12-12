import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import {
    CheckCircle,
    Calendar,
    User,
    Phone,
    Briefcase,
    CreditCard,
    Info,
    FileText,
    Upload,
    Home,
    ArrowRight,
    Wallet,
    Lock,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

export default function OrderConfirmation({ transaction }) {
    const [isLoadingPay, setIsLoadingPay] = useState(false);

    // Load Snap.js
    useEffect(() => {
        const snapUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        // Using the Client Key provided by user
        const clientKey = "MMid-client-aAUNIuf1fCSll2qz";

        const script = document.createElement("script");
        script.src = snapUrl;
        script.setAttribute("data-client-key", clientKey);
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleOnlinePayment = async (installment) => {
        setIsLoadingPay(true);
        try {
            const response = await axios.post(
                route("installments.create-payment", installment.id)
            );
            const token = response.data.snap_token;

            window.snap.pay(token, {
                onSuccess: async function (result) {
                    // Manual status check to ensure DB is updated (Midtrans Webhook might fail on localhost)
                    try {
                        await axios.post(
                            route("installments.check-status", installment.id)
                        );
                    } catch (e) {
                        console.error("Manual status check failed", e);
                    }

                    Swal.fire(
                        "Berhasil!",
                        "Pembayaran Booking Fee berhasil.",
                        "success"
                    );
                    router.reload();
                },
                onPending: async function (result) {
                    // Also check on pending just in case status changed during the window
                    try {
                        await axios.post(
                            route("installments.check-status", installment.id)
                        );
                    } catch (e) {}

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

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const getStatusInfo = (status) => {
        switch (status) {
            case "completed":
            case "disetujui":
            case "ready_for_delivery":
                return {
                    label: "Disetujui",
                    color: "bg-green-100 text-green-700",
                };
            case "menunggu_persetujuan":
            case "new_order":
            case "waiting_payment":
                return {
                    label: "Menunggu",
                    color: "bg-yellow-100 text-yellow-700",
                };
            case "ditolak":
            case "data_tidak_valid":
                return { label: "Ditolak", color: "bg-red-100 text-red-700" };
            default:
                return { label: status, color: "bg-gray-100 text-gray-700" };
        }
    };

    const formatStatusText = (status) => {
        const map = {
            new_order: "Pesanan Baru",
            menunggu_persetujuan: "Menunggu Persetujuan",
            waiting_payment: "Menunggu Pembayaran",
            completed: "Selesai",
            disetujui: "Disetujui",
            ready_for_delivery: "Siap Dikirim",
            ditolak: "Ditolak",
            data_tidak_valid: "Data Tidak Valid",
        };
        return (
            map[status] ||
            status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
        );
    };

    const isCredit = transaction.transaction_type === "CREDIT";
    const statusInfo = getStatusInfo(transaction.status);

    return (
        <MainLayout title="Konfirmasi Pesanan">
            <div className="bg-gray-50 min-h-screen pt-28 pb-12">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                            {/* Success Header */}
                            <div className="bg-green-600 p-10 text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                                <div className="absolute bottom-0 left-0 p-20 bg-white/10 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>

                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 200,
                                        delay: 0.2,
                                    }}
                                    className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                                >
                                    <CheckCircle
                                        size={48}
                                        className="text-green-600"
                                    />
                                </motion.div>
                                <h1 className="text-3xl font-bold text-white mb-2">
                                    {!isCredit &&
                                    transaction.installments?.find(
                                        (i) => i.installment_number === 0
                                    )?.status === "paid"
                                        ? "Booking Fee Lunas!"
                                        : "Pesanan Berhasil Dibuat!"}
                                </h1>
                                <p className="text-green-100 text-lg">
                                    {!isCredit &&
                                    transaction.installments?.find(
                                        (i) => i.installment_number === 0
                                    )?.status === "paid" ? (
                                        <span>
                                            Unit Anda telah diamankan. Nomor
                                            Transaksi:{" "}
                                            <span className="font-mono font-bold bg-white/20 px-2 py-1 rounded">
                                                {transaction.id}
                                            </span>
                                        </span>
                                    ) : (
                                        <span>
                                            Nomor Transaksi:{" "}
                                            <span className="font-mono font-bold bg-white/20 px-2 py-1 rounded">
                                                {transaction.id}
                                            </span>
                                        </span>
                                    )}
                                </p>
                            </div>

                            <div className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                                    {/* Left Column: Motor Details */}
                                    <div className="md:col-span-5">
                                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full">
                                            <div className="h-48 bg-gray-100 p-4 flex items-center justify-center relative">
                                                <img
                                                    src={`/storage/${transaction.motor.image_path}`}
                                                    alt={transaction.motor.name}
                                                    className="max-h-full max-w-full object-contain"
                                                />
                                            </div>
                                            <div className="p-5">
                                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                                    {transaction.motor.name}
                                                </h3>
                                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar size={14} />{" "}
                                                        {transaction.motor.year}
                                                    </span>
                                                    <span>•</span>
                                                    <span>
                                                        {transaction.motor.type}
                                                    </span>
                                                </div>
                                                <div className="text-2xl font-bold text-primary mb-1">
                                                    {formatCurrency(
                                                        transaction.motor.price
                                                    )}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    Harga OTR
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column: Transaction Details */}
                                    <div className="md:col-span-7">
                                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <Info
                                                size={20}
                                                className="text-blue-500"
                                            />{" "}
                                            Detail Pemesanan
                                        </h3>

                                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-4">
                                            <DetailRow
                                                label="Nama Pemesan"
                                                value={
                                                    transaction.customer_name
                                                }
                                                icon={User}
                                            />
                                            <DetailRow
                                                label="No. Telepon"
                                                value={
                                                    transaction.customer_phone
                                                }
                                                icon={Phone}
                                            />
                                            <DetailRow
                                                label="Pekerjaan"
                                                value={
                                                    transaction.customer_occupation
                                                }
                                                icon={Briefcase}
                                            />
                                            <DetailRow
                                                label="Jenis Transaksi"
                                                value={
                                                    <span
                                                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                                                            isCredit
                                                                ? "bg-purple-100 text-purple-700"
                                                                : "bg-blue-100 text-blue-700"
                                                        }`}
                                                    >
                                                        {isCredit
                                                            ? "Kredit"
                                                            : "Tunai"}
                                                    </span>
                                                }
                                                icon={CreditCard}
                                            />
                                            <DetailRow
                                                label="Status Order"
                                                value={
                                                    <span
                                                        className={`px-3 py-1 rounded-lg text-xs font-bold ${statusInfo.color}`}
                                                    >
                                                        {formatStatusText(
                                                            transaction.status
                                                        )}
                                                    </span>
                                                }
                                                icon={Info}
                                            />

                                            {isCredit &&
                                                transaction.credit_detail && (
                                                    <>
                                                        <div className="border-t border-gray-200 my-4 pt-4">
                                                            <h4 className="font-bold text-sm text-gray-700 mb-3">
                                                                Detail Kredit
                                                            </h4>
                                                            <DetailRow
                                                                label="Down Payment (DP)"
                                                                value={formatCurrency(
                                                                    transaction
                                                                        .credit_detail
                                                                        .down_payment
                                                                )}
                                                            />
                                                            <DetailRow
                                                                label="Cicilan/Bulan"
                                                                value={formatCurrency(
                                                                    transaction
                                                                        .credit_detail
                                                                        .monthly_installment
                                                                )}
                                                            />
                                                            <DetailRow
                                                                label="Tenor"
                                                                value={`${transaction.credit_detail.tenor} Bulan`}
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                        </div>

                                        {/* Document Upload CTA for Credit */}
                                        {isCredit && (
                                            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-5">
                                                <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                                                    <FileText size={18} />{" "}
                                                    Status Dokumen
                                                </h4>

                                                {/* Logic to check document completeness - simplified for frontend, assuming status passed or derived */}
                                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                                    <div>
                                                        <p className="text-sm text-blue-600 mb-1">
                                                            {/* You might want to pass a 'hasRequiredDocuments' prop from controller */}
                                                            Silakan lengkapi
                                                            dokumen persyaratan
                                                            kredit agar pesanan
                                                            dapat segera
                                                            diproses.
                                                        </p>
                                                    </div>
                                                    <Link
                                                        href={route(
                                                            "motors.manage-documents",
                                                            transaction.id
                                                        )}
                                                        className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center gap-2 whitespace-nowrap"
                                                    >
                                                        <Upload size={16} />{" "}
                                                        Kelola Dokumen
                                                    </Link>
                                                </div>
                                            </div>
                                        )}

                                        {/* Booking Fee Payment for Cash Order */}
                                        {!isCredit &&
                                            transaction.installments &&
                                            transaction.installments.find(
                                                (i) =>
                                                    i.installment_number === 0
                                            ) && (
                                                <div
                                                    className={`mt-6 border rounded-2xl p-5 ${
                                                        transaction.installments.find(
                                                            (i) =>
                                                                i.installment_number ===
                                                                0
                                                        ).status === "paid"
                                                            ? "bg-green-50 border-green-200"
                                                            : "bg-blue-50 border-blue-200"
                                                    }`}
                                                >
                                                    <h4
                                                        className={`font-bold mb-2 flex items-center gap-2 ${
                                                            transaction.installments.find(
                                                                (i) =>
                                                                    i.installment_number ===
                                                                    0
                                                            ).status === "paid"
                                                                ? "text-green-800"
                                                                : "text-blue-800"
                                                        }`}
                                                    >
                                                        {transaction.installments.find(
                                                            (i) =>
                                                                i.installment_number ===
                                                                0
                                                        ).status === "paid" ? (
                                                            <>
                                                                <CheckCircle
                                                                    size={18}
                                                                />{" "}
                                                                Booking Fee
                                                                Lunas
                                                            </>
                                                        ) : (
                                                            <>
                                                                <CreditCard
                                                                    size={18}
                                                                />{" "}
                                                                Booking Fee
                                                            </>
                                                        )}
                                                    </h4>
                                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                                        <div
                                                            className={`text-sm ${
                                                                transaction.installments.find(
                                                                    (i) =>
                                                                        i.installment_number ===
                                                                        0
                                                                ).status ===
                                                                "paid"
                                                                    ? "text-green-700"
                                                                    : "text-blue-600"
                                                            }`}
                                                        >
                                                            {transaction.installments.find(
                                                                (i) =>
                                                                    i.installment_number ===
                                                                    0
                                                            ).status ===
                                                            "paid" ? (
                                                                <span>
                                                                    Terima
                                                                    kasih!
                                                                    Pembayaran
                                                                    sebesar{" "}
                                                                    <b>
                                                                        {formatCurrency(
                                                                            transaction.installments.find(
                                                                                (
                                                                                    i
                                                                                ) =>
                                                                                    i.installment_number ===
                                                                                    0
                                                                            )
                                                                                .amount
                                                                        )}
                                                                    </b>{" "}
                                                                    telah
                                                                    diterima.
                                                                    Unit motor
                                                                    Anda sudah
                                                                    diamankan
                                                                    dan akan
                                                                    segera
                                                                    diproses.
                                                                </span>
                                                            ) : (
                                                                <span>
                                                                    Untuk
                                                                    mengamankan
                                                                    unit motor
                                                                    ini, silakan
                                                                    bayar
                                                                    Booking Fee
                                                                    sebesar:
                                                                    <div className="text-xl font-bold text-blue-800 mt-1">
                                                                        {formatCurrency(
                                                                            transaction.installments.find(
                                                                                (
                                                                                    i
                                                                                ) =>
                                                                                    i.installment_number ===
                                                                                    0
                                                                            )
                                                                                .amount
                                                                        )}
                                                                    </div>
                                                                </span>
                                                            )}
                                                        </div>

                                                        {/* Check Status */}
                                                        {transaction.installments.find(
                                                            (i) =>
                                                                i.installment_number ===
                                                                0
                                                        ).status === "paid" ? (
                                                            <div className="px-5 py-3 bg-white rounded-xl shadow-sm border border-green-100 flex flex-col items-center">
                                                                <span className="text-xs text-green-500 font-bold uppercase tracking-wider mb-1">
                                                                    Status
                                                                </span>
                                                                <span className="text-green-600 font-black text-lg flex items-center gap-1">
                                                                    PAID{" "}
                                                                    <CheckCircle
                                                                        size={
                                                                            16
                                                                        }
                                                                        fill="currentColor"
                                                                        className="text-green-200"
                                                                    />
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <button
                                                                onClick={() =>
                                                                    handleOnlinePayment(
                                                                        transaction.installments.find(
                                                                            (
                                                                                i
                                                                            ) =>
                                                                                i.installment_number ===
                                                                                0
                                                                        )
                                                                    )
                                                                }
                                                                disabled={
                                                                    isLoadingPay
                                                                }
                                                                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center gap-2"
                                                            >
                                                                {isLoadingPay
                                                                    ? "Loading..."
                                                                    : "Bayar Sekarang"}
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                        {/* Pelunasan Payment for Cash Order */}
                                        {!isCredit &&
                                            transaction.installments &&
                                            transaction.installments.find(
                                                (i) =>
                                                    i.installment_number === 1
                                            ) && (
                                                <div
                                                    className={`mt-4 border rounded-2xl p-5 ${
                                                        transaction.installments.find(
                                                            (i) =>
                                                                i.installment_number ===
                                                                1
                                                        ).status === "paid"
                                                            ? "bg-green-50 border-green-200"
                                                            : "bg-white border-gray-200"
                                                    }`}
                                                >
                                                    <h4
                                                        className={`font-bold mb-2 flex items-center gap-2 ${
                                                            transaction.installments.find(
                                                                (i) =>
                                                                    i.installment_number ===
                                                                    1
                                                            ).status === "paid"
                                                                ? "text-green-800"
                                                                : "text-gray-800"
                                                        }`}
                                                    >
                                                        {transaction.installments.find(
                                                            (i) =>
                                                                i.installment_number ===
                                                                1
                                                        ).status === "paid" ? (
                                                            <>
                                                                <CheckCircle
                                                                    size={18}
                                                                />{" "}
                                                                LUNAS
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Wallet
                                                                    size={18}
                                                                />{" "}
                                                                Pelunasan Unit
                                                            </>
                                                        )}
                                                    </h4>
                                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                                        <div className="text-sm text-gray-600">
                                                            {transaction.installments.find(
                                                                (i) =>
                                                                    i.installment_number ===
                                                                    1
                                                            ).status ===
                                                            "paid" ? (
                                                                <span>
                                                                    Seluruh
                                                                    pembayaran
                                                                    telah
                                                                    diselesaikan.
                                                                    Terima kasih
                                                                    atas
                                                                    kepercayaan
                                                                    Anda!
                                                                </span>
                                                            ) : (
                                                                <span>
                                                                    Sisa
                                                                    pembayaran
                                                                    yang harus
                                                                    diselesaikan:
                                                                    <div className="text-xl font-bold text-gray-900 mt-1">
                                                                        {formatCurrency(
                                                                            transaction.installments.find(
                                                                                (
                                                                                    i
                                                                                ) =>
                                                                                    i.installment_number ===
                                                                                    1
                                                                            )
                                                                                .amount
                                                                        )}
                                                                    </div>
                                                                </span>
                                                            )}
                                                        </div>

                                                        {/* Check Status */}
                                                        {transaction.installments.find(
                                                            (i) =>
                                                                i.installment_number ===
                                                                1
                                                        ).status === "paid" ? (
                                                            <div className="px-5 py-3 bg-white rounded-xl shadow-sm border border-green-100 flex flex-col items-center">
                                                                <span className="text-xs text-green-500 font-bold uppercase tracking-wider mb-1">
                                                                    Status
                                                                </span>
                                                                <span className="text-green-600 font-black text-lg flex items-center gap-1">
                                                                    PAID{" "}
                                                                    <CheckCircle
                                                                        size={
                                                                            16
                                                                        }
                                                                        fill="currentColor"
                                                                        className="text-green-200"
                                                                    />
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            /* Check if Booking Fee (Inst 0) is paid or skipped */
                                                            <>
                                                                {!transaction.installments.find(
                                                                    (i) =>
                                                                        i.installment_number ===
                                                                        0
                                                                ) ||
                                                                transaction.installments.find(
                                                                    (i) =>
                                                                        i.installment_number ===
                                                                        0
                                                                ).status ===
                                                                    "paid" ? (
                                                                    <button
                                                                        onClick={() =>
                                                                            handleOnlinePayment(
                                                                                transaction.installments.find(
                                                                                    (
                                                                                        i
                                                                                    ) =>
                                                                                        i.installment_number ===
                                                                                        1
                                                                                )
                                                                            )
                                                                        }
                                                                        disabled={
                                                                            isLoadingPay
                                                                        }
                                                                        className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors shadow-lg flex items-center gap-2"
                                                                    >
                                                                        {isLoadingPay
                                                                            ? "Loading..."
                                                                            : "Bayar Pelunasan"}
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        disabled
                                                                        className="px-6 py-3 bg-gray-100 text-gray-400 rounded-xl font-bold cursor-not-allowed flex items-center gap-2 border border-gray-200"
                                                                    >
                                                                        <Lock
                                                                            size={
                                                                                18
                                                                            }
                                                                        />{" "}
                                                                        Terkunci
                                                                    </button>
                                                                )}
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    href={route("home")}
                                    className="px-8 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center gap-2"
                                >
                                    <Home size={18} /> Kembali ke Beranda
                                </Link>
                                <Link
                                    href={route("motors.index")}
                                    className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-dark-blue transition-colors shadow-lg hover:translate-y-[-2px] flex items-center gap-2"
                                >
                                    <ArrowRight size={18} /> Lihat Motor Lain
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </MainLayout>
    );
}

function DetailRow({ label, value, icon: Icon }) {
    return (
        <div className="flex justify-between items-start">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
                {Icon && <Icon size={14} />}
                <span>{label}</span>
            </div>
            <div className="text-gray-900 font-bold text-sm text-right">
                {value}
            </div>
        </div>
    );
}
