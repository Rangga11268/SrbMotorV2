import React from "react";
import { Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { ArrowLeft, Printer, Download } from "lucide-react";

export default function Show({
    type,
    title,
    description,
    startDate,
    endDate,
    data,
}) {
    // Helper to format currency
    const formatCurrency = (amount) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(amount);

    return (
        <AdminLayout title={title}>
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <Link
                        href={route("admin.reports.index")}
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-primary font-medium transition-colors"
                    >
                        <ArrowLeft size={20} /> Kembali ke Menu Laporan
                    </Link>

                    <button
                        onClick={() => window.print()}
                        className="hidden md:flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                    >
                        <Printer size={20} /> Cetak Halaman
                    </button>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 print:shadow-none print:border-0">
                    <div className="text-center mb-10 border-b border-gray-100 pb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            {title}
                        </h1>
                        <p className="text-gray-500 mb-1">{description}</p>
                        <p className="font-bold text-primary">
                            Periode: {startDate} - {endDate}
                        </p>
                    </div>

                    {/* DYNAMIC CONTENT BASED ON TYPE */}

                    {type === "sales" && (
                        <div className="space-y-8">
                            {/* Summary Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                                    <p className="text-sm text-gray-500 font-bold mb-1">
                                        Total Penjualan
                                    </p>
                                    <p className="text-2xl font-bold text-blue-700">
                                        {data.total_transactions} Unit
                                    </p>
                                </div>
                                <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                                    <p className="text-sm text-gray-500 font-bold mb-1">
                                        Total Pendapatan
                                    </p>
                                    <p className="text-2xl font-bold text-green-700">
                                        {formatCurrency(data.total_revenue)}
                                    </p>
                                </div>
                                <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                                    <p className="text-sm text-gray-500 font-bold mb-1">
                                        Metode Pembayaran
                                    </p>
                                    <div className="flex justify-between mt-1">
                                        <span className="text-sm font-medium">
                                            Cash: {data.cash_transactions}
                                        </span>
                                        <span className="text-sm font-medium">
                                            Kredit: {data.credit_transactions}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Sales By Brand */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-4">
                                    Penjualan per Brand
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-50 text-gray-600 text-sm uppercase">
                                                <th className="p-3 border-b border-gray-200">
                                                    Brand
                                                </th>
                                                <th className="p-3 border-b border-gray-200">
                                                    Jumlah Unit
                                                </th>
                                                <th className="p-3 border-b border-gray-200">
                                                    Total Pendapatan
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.entries(data.by_brand).map(
                                                ([brand, stats]) => (
                                                    <tr
                                                        key={brand}
                                                        className="border-b border-gray-50"
                                                    >
                                                        <td className="p-3 font-bold">
                                                            {brand}
                                                        </td>
                                                        <td className="p-3">
                                                            {stats.count}
                                                        </td>
                                                        <td className="p-3">
                                                            {formatCurrency(
                                                                stats.revenue
                                                            )}
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {type === "income" && (
                        <div className="space-y-8">
                            <div className="bg-green-50 p-6 rounded-xl border border-green-100 text-center">
                                <p className="text-sm text-gray-500 font-bold mb-1">
                                    Total Pendapatan Periode Ini
                                </p>
                                <p className="text-4xl font-extrabold text-green-700">
                                    {formatCurrency(data.total_income)}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white p-4 border border-gray-200 rounded-xl">
                                    <p className="text-gray-500 text-sm mb-1">
                                        Pendapatan Cash
                                    </p>
                                    <p className="text-xl font-bold">
                                        {formatCurrency(data.cash_income)}
                                    </p>
                                </div>
                                <div className="bg-white p-4 border border-gray-200 rounded-xl">
                                    <p className="text-gray-500 text-sm mb-1">
                                        Pendapatan Kredit
                                    </p>
                                    <p className="text-xl font-bold">
                                        {formatCurrency(data.credit_income)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Fallback for JSON dump if needed for other types during dev */}
                    {type !== "sales" && type !== "income" && (
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 font-mono text-sm overflow-auto">
                            <pre>{JSON.stringify(data, null, 2)}</pre>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
