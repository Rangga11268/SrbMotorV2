import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Modal from "@/Components/Modal";
import {
    Search,
    FileText,
    Filter,
    CheckCircle,
    XCircle,
    Clock,
    Eye,
    RotateCcw,
    AlertTriangle,
    Plus,
} from "lucide-react";

export default function Index({
    transactions,
    filters,
    transactionTypes,
    statuses,
}) {
    const [search, setSearch] = useState(filters.search || "");
    const [type, setType] = useState(filters.type || "");
    const [status, setStatus] = useState(filters.status || "");

    // Modal State
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        type: "info",
        title: "",
        message: "",
        onConfirm: () => {},
    });

    const handleSearch = (e) => {
        e.preventDefault();
        applyFilters();
    };

    const handleFilterChange = (key, value) => {
        if (key === "type") setType(value);
        if (key === "status") setStatus(value);

        router.get(
            route("admin.transactions.index"),
            {
                search,
                type: key === "type" ? value : type,
                status: key === "status" ? value : status,
            },
            { preserveState: true, replace: true }
        );
    };

    const resetFilters = () => {
        setSearch("");
        setType("");
        setStatus("");
        router.get(route("admin.transactions.index"));
    };

    const getStatusColor = (status) => {
        if (
            [
                "completed",
                "disetujui",
                "ready_for_delivery",
                "payment_confirmed",
            ].includes(status)
        )
            return "bg-green-100 text-green-700";
        if (
            [
                "menunggu_persetujuan",
                "new_order",
                "waiting_payment",
                "unit_preparation",
                "dikirim_ke_surveyor",
                "jadwal_survey",
            ].includes(status)
        )
            return "bg-yellow-100 text-yellow-700 font-bold";
        if (
            ["ditolak", "data_tidak_valid", "cancelled", "rejected"].includes(
                status
            )
        )
            return "bg-red-100 text-red-700";
        return "bg-blue-100 text-blue-700";
    };

    const formatStatus = (status) => {
        return status
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());
    };

    return (
        <AdminLayout title="Manajemen Transaksi">
            {/* Modal Placeholder */}
            <Modal
                isOpen={modalConfig.isOpen}
                onClose={() =>
                    setModalConfig((prev) => ({ ...prev, isOpen: false }))
                }
                title={modalConfig.title}
                message={modalConfig.message}
                confirmText="Confirm"
                onConfirm={modalConfig.onConfirm}
                type={modalConfig.type}
            />

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <FileText className="text-primary" /> Daftar Transaksi
                    </h2>

                    <div className="flex flex-col xl:flex-row gap-3 w-full xl:w-auto items-end">
                        {/* Create Button */}
                        <Link
                            href={route("admin.transactions.create")}
                            className="bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-dark-blue transition-colors shadow-lg shadow-primary/30 w-full xl:w-auto justify-center"
                        >
                            <Plus size={18} /> Tambah Transaksi
                        </Link>

                        {/* Search */}
                        <form
                            onSubmit={handleSearch}
                            className="relative w-full xl:w-auto"
                        >
                            <input
                                type="text"
                                placeholder="Cari pelanggan/motor..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none w-full xl:w-64"
                            />
                            <Search
                                className="absolute left-3 top-2.5 text-gray-400"
                                size={18}
                            />
                        </form>

                        {/* Filter Type */}
                        <div className="relative w-full xl:w-auto">
                            <select
                                value={type}
                                onChange={(e) =>
                                    handleFilterChange("type", e.target.value)
                                }
                                className="w-full pl-10 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none bg-white cursor-pointer"
                            >
                                <option value="">Semua Tipe</option>
                                {transactionTypes.map((t) => (
                                    <option key={t} value={t}>
                                        {t === "CASH" ? "Tunai" : "Kredit"}
                                    </option>
                                ))}
                            </select>
                            <Filter
                                className="absolute left-3 top-2.5 text-gray-400"
                                size={16}
                            />
                        </div>

                        {/* Filter Status */}
                        <div className="relative w-full xl:w-auto">
                            <select
                                value={status}
                                onChange={(e) =>
                                    handleFilterChange("status", e.target.value)
                                }
                                className="w-full pl-10 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none bg-white cursor-pointer"
                            >
                                <option value="">Semua Status</option>
                                {statuses.map((s) => (
                                    <option key={s} value={s}>
                                        {formatStatus(s)}
                                    </option>
                                ))}
                            </select>
                            <CheckCircle
                                className="absolute left-3 top-2.5 text-gray-400"
                                size={16}
                            />
                        </div>

                        {/* Reset Button */}
                        <button
                            onClick={resetFilters}
                            className="px-4 py-2 text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-colors flex items-center gap-2 whitespace-nowrap"
                            title="Reset Filter"
                        >
                            <RotateCcw size={16} /> Reset
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                                <th className="p-4 rounded-tl-xl text-xs font-bold">
                                    ID
                                </th>
                                <th className="p-4 text-xs font-bold">
                                    Pelanggan
                                </th>
                                <th className="p-4 text-xs font-bold">Motor</th>
                                <th className="p-4 text-xs font-bold">Tipe</th>
                                <th className="p-4 text-xs font-bold">Total</th>
                                <th className="p-4 text-xs font-bold">
                                    Status
                                </th>
                                <th className="p-4 text-xs font-bold">
                                    Tanggal
                                </th>
                                <th className="p-4 rounded-tr-xl text-center text-xs font-bold">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {transactions.data.length > 0 ? (
                                transactions.data.map((transaction) => (
                                    <tr
                                        key={transaction.id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="p-4 font-bold text-gray-500 text-sm">
                                            #{transaction.id}
                                        </td>
                                        <td className="p-4">
                                            <div className="font-bold text-gray-800 text-sm">
                                                {transaction.customer_name ||
                                                    transaction.user?.name}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {transaction.customer_phone}
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-600 text-sm">
                                            {transaction.motor?.name}
                                        </td>
                                        <td className="p-4">
                                            <span
                                                className={`px-2 py-1 rounded text-xs font-bold border ${
                                                    transaction.transaction_type ===
                                                    "CASH"
                                                        ? "bg-green-50 text-green-700 border-green-100"
                                                        : "bg-purple-50 text-purple-700 border-purple-100"
                                                }`}
                                            >
                                                {transaction.transaction_type ===
                                                "CASH"
                                                    ? "TUNAI"
                                                    : "KREDIT"}
                                            </span>
                                        </td>
                                        <td className="p-4 font-bold text-dark-blue text-sm">
                                            Rp{" "}
                                            {new Intl.NumberFormat(
                                                "id-ID"
                                            ).format(transaction.total_amount)}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col items-start gap-1">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor(
                                                        transaction.status
                                                    )}`}
                                                >
                                                    {formatStatus(
                                                        transaction.status
                                                    )}
                                                </span>
                                                {/* Document Warning for Credit */}
                                                {transaction.transaction_type ===
                                                    "CREDIT" &&
                                                    !transaction.documents_complete && (
                                                        <span className="inline-flex items-center gap-1 text-[10px] text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
                                                            <AlertTriangle
                                                                size={10}
                                                            />{" "}
                                                            Dokumen Kurang
                                                        </span>
                                                    )}
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-500 text-sm">
                                            {new Date(
                                                transaction.created_at
                                            ).toLocaleDateString("id-ID", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </td>
                                        <td className="p-4 text-center">
                                            <Link
                                                href={route(
                                                    "admin.transactions.show",
                                                    transaction.id
                                                )}
                                                className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm"
                                            >
                                                <Eye size={16} /> Detail
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="p-8 text-center text-gray-500"
                                    >
                                        Data transaksi tidak ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-center">
                    <div className="flex gap-2">
                        {transactions.links.map((link, index) =>
                            link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                                        link.active
                                            ? "bg-primary text-white"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                                />
                            ) : (
                                <span
                                    key={index}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                    className="px-4 py-2 rounded-lg text-sm font-bold bg-gray-50 text-gray-300 cursor-not-allowed"
                                />
                            )
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
