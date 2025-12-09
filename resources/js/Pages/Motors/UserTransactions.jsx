import React from "react";
import { Head, Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import {
    ShoppingBag,
    Calendar,
    User,
    Phone,
    Info,
    FileText,
    CheckCircle,
    AlertCircle,
    XCircle,
    Clock,
} from "lucide-react";
import { motion } from "framer-motion";

export default function UserTransactions({ transactions }) {
    // Status Helper
    const getStatusInfo = (status) => {
        switch (status) {
            case "completed":
            case "disetujui":
            case "ready_for_delivery":
                return {
                    label: "Disetujui",
                    color: "bg-green-100 text-green-700 border-green-200",
                    icon: CheckCircle,
                };
            case "menunggu_persetujuan":
            case "new_order":
            case "waiting_payment":
                return {
                    label: "Menunggu",
                    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
                    icon: Clock,
                };
            case "ditolak":
            case "data_tidak_valid":
                return {
                    label: "Ditolak",
                    color: "bg-red-100 text-red-700 border-red-200",
                    icon: XCircle,
                };
            default:
                return {
                    label: status,
                    color: "bg-gray-100 text-gray-700 border-gray-200",
                    icon: Info,
                };
        }
    };

    // Helper to format text (snake_case to Title Case or custom map)
    const formatStatus = (status) => {
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

    return (
        <MainLayout title="Riwayat Pemesanan">
            <div className="bg-gray-50 min-h-screen py-10">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-10"
                    >
                        <h1 className="text-3xl font-bold text-gray-900">
                            Riwayat{" "}
                            <span className="text-primary">Pemesanan</span>
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Pantau status pesanan kendaraan Anda
                        </p>
                    </motion.div>

                    {transactions.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {transactions.data.map((transaction, index) => {
                                    const statusInfo = getStatusInfo(
                                        transaction.status
                                    );
                                    const StatusIcon = statusInfo.icon;

                                    return (
                                        <motion.div
                                            key={transaction.id}
                                            initial={{
                                                opacity: 0,
                                                scale: 0.95,
                                            }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: index * 0.1,
                                            }}
                                            className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
                                        >
                                            <div className="relative h-48 bg-gray-100 flex items-center justify-center p-4">
                                                <img
                                                    src={`/storage/${transaction.motor.image_path}`}
                                                    alt={transaction.motor.name}
                                                    className="max-h-full max-w-full object-contain"
                                                />
                                                <div className="absolute top-3 right-3">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border ${statusInfo.color}`}
                                                    >
                                                        <StatusIcon size={12} />{" "}
                                                        {formatStatus(
                                                            transaction.status
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="absolute bottom-3 left-3">
                                                    <span
                                                        className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                                                            transaction.transaction_type ===
                                                            "CASH"
                                                                ? "bg-blue-100 text-blue-700 border-blue-200"
                                                                : "bg-purple-100 text-purple-700 border-purple-200"
                                                        }`}
                                                    >
                                                        {transaction.transaction_type ===
                                                        "CASH"
                                                            ? "Tunai"
                                                            : "Kredit"}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="p-5 flex-grow flex flex-col">
                                                <h3 className="text-lg font-bold text-gray-800 mb-2">
                                                    {transaction.motor.name}
                                                </h3>

                                                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                                                    <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                                                        <Calendar size={12} />{" "}
                                                        {transaction.motor.year}
                                                    </span>
                                                </div>

                                                <div className="mb-4">
                                                    <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">
                                                        Total Harga
                                                    </div>
                                                    <div className="text-xl font-bold text-primary">
                                                        Rp{" "}
                                                        {new Intl.NumberFormat(
                                                            "id-ID"
                                                        ).format(
                                                            transaction.total_amount
                                                        )}
                                                        ,-
                                                    </div>
                                                </div>

                                                <div className="space-y-2 mb-4 text-sm text-gray-600">
                                                    <div className="flex items-center gap-2">
                                                        <User
                                                            size={14}
                                                            className="text-gray-400"
                                                        />
                                                        <span>
                                                            {transaction.customer_name ||
                                                                "N/A"}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Phone
                                                            size={14}
                                                            className="text-gray-400"
                                                        />
                                                        <span>
                                                            {transaction.customer_phone ||
                                                                "N/A"}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="mt-auto space-y-2">
                                                    {transaction.transaction_type ===
                                                        "CREDIT" && (
                                                        <Link
                                                            href={route(
                                                                "motors.manage-documents",
                                                                transaction.id
                                                            )}
                                                            className="block w-full text-center py-2 rounded-xl bg-blue-50 text-blue-600 font-bold text-sm hover:bg-blue-100 transition-colors border border-blue-100"
                                                        >
                                                            Lihat/Kelola Dokumen
                                                        </Link>
                                                    )}
                                                    <Link
                                                        href={route(
                                                            "motors.order.confirmation",
                                                            transaction.id
                                                        )}
                                                        className="block w-full text-center py-2 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors"
                                                    >
                                                        Lihat Detail
                                                    </Link>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Pagination */}
                            {transactions.links &&
                                transactions.links.length > 3 && (
                                    <div className="mt-12 flex justify-center gap-2">
                                        {transactions.links.map((link, k) => (
                                            <Link
                                                key={k}
                                                href={link.url || "#"}
                                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                                    link.active
                                                        ? "bg-dark-blue text-white"
                                                        : link.url
                                                        ? "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                                                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                }`}
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                        </>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                            <ShoppingBag
                                size={64}
                                className="text-gray-300 mx-auto mb-4"
                            />
                            <h3 className="text-2xl font-bold text-gray-400 mb-2">
                                Belum Ada Pemesanan
                            </h3>
                            <p className="text-gray-400 mb-6">
                                Anda belum memiliki riwayat pemesanan.
                            </p>
                            <Link
                                href={route("motors.index")}
                                className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-dark-blue transition-colors shadow-lg"
                            >
                                Cari Motor Sekarang
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
