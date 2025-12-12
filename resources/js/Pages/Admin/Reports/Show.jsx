import React, { useRef } from "react";
import { Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    ArrowLeft,
    Printer,
    Download,
    FileText,
    Calendar,
    Box,
    TrendingUp,
    DollarSign,
    Users,
    Briefcase,
    ShoppingCart,
} from "lucide-react";
import { useReactToPrint } from "react-to-print";
import {
    RevenueChart,
    StatusPieChart,
} from "@/Components/Admin/DashboardCharts";

export default function Show({
    type,
    title,
    description,
    startDate,
    endDate,
    data,
}) {
    const componentRef = useRef();

    // Helper to calculate or get total
    const getSummaryStats = () => {
        if (!data) return [];

        switch (type) {
            case "sales":
                return [
                    {
                        label: "Total Transaksi",
                        value: data.total_transactions,
                        icon: ShoppingCart,
                    },
                    {
                        label: "Total Pendapatan",
                        value: `Rp ${new Intl.NumberFormat("id-ID").format(
                            data.total_revenue
                        )}`,
                        icon: DollarSign,
                    },
                ];
            case "income":
                return [
                    {
                        label: "Total Pendapatan",
                        value: `Rp ${new Intl.NumberFormat("id-ID").format(
                            data.total_income
                        )}`,
                        icon: DollarSign,
                    },
                    {
                        label: "Tunai",
                        value: `Rp ${new Intl.NumberFormat("id-ID").format(
                            data.cash_income
                        )}`,
                        icon: DollarSign,
                    },
                    {
                        label: "Kredit",
                        value: `Rp ${new Intl.NumberFormat("id-ID").format(
                            data.credit_income
                        )}`,
                        icon: DollarSign,
                    },
                ];
            case "customer":
                return [
                    {
                        label: "Total Pelanggan",
                        value: data.total_customers,
                        icon: Users,
                    },
                    {
                        label: "Pelanggan Baru",
                        value: data.new_customers,
                        icon: Users,
                    },
                ];
            case "status":
                return [
                    {
                        label: "Total Transaksi",
                        value: data.total_transactions,
                        icon: Box,
                    },
                ];
            default:
                return [];
        }
    };

    // Prepare Data for Charts
    const getChartData = () => {
        if (!data) return [];
        
        switch (type) {
            case "sales":
            case "income":
                // Aggregate items by Date
                if (!data.items) return [];
                const grouped = data.items.reduce((acc, item) => {
                    // Item created_at is "dd MMM yyyy HH:mm", let's take just the date part
                    const dateKey = item.created_at.substring(0, 6); // "01 Jan"
                    if (!acc[dateKey]) acc[dateKey] = 0;
                    acc[dateKey] += parseFloat(item.total_amount || 0);
                    return acc;
                }, {});
                
                return Object.keys(grouped).map(date => ({
                    name: date,
                    revenue: grouped[date]
                }));

            case "status":
                if (!data.by_status) return [];
                // by_status is an object from controller: { "Status": {count, revenue...} }
                return Object.entries(data.by_status).map(([status, stats]) => ({
                    name: status.replace(/_/g, " "),
                    value: stats.count
                }));

            default:
                return [];
        }
    };

    const renderChart = () => {
        const chartData = getChartData();
        if (chartData.length === 0) return null;

        if (type === 'sales' || type === 'income') {
             return (
                 <div className="mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-100 print:hidden">
                     <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <TrendingUp size={20} className="text-primary"/> 
                        Tren Pendapatan
                     </h3>
                     <RevenueChart data={chartData} />
                 </div>
             );
        } else if (type === 'status') {
             return (
                 <div className="mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-100 print:hidden">
                     <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <Box size={20} className="text-primary"/>
                        Distribusi Status
                     </h3>
                     <StatusPieChart data={chartData} />
                 </div>
             );
        }
        return null;
    };

    // Header Stats to show summary at a glance
    const calculateTotal = (key) => {
        if (!data || !data.items || data.items.length === 0) return 0;
        return data.items.reduce(
            (sum, item) => sum + (Number(item[key]) || 0),
            0
        );
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const getReportIcon = () => {
        switch (type) {
            case "sales":
                return <TrendingUp size={24} className="text-emerald-600" />;
            case "income":
                return <DollarSign size={24} className="text-blue-600" />;
            case "customer":
                return <Users size={24} className="text-purple-600" />;
            default:
                return <FileText size={24} className="text-gray-600" />;
        }
    };

    const renderTable = () => {
        // Determine the list data array based on report type
        let listData = [];
        if (type === "sales" || type === "income") {
            listData = data.items || [];
        } else if (type === "customer") {
            listData = data.top_customers || [];
        } else if (type === "status") {
            listData = data.by_status ? Object.values(data.by_status) : [];
        }

        if (!listData || listData.length === 0) {
            return (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Box className="text-gray-400" size={32} />
                    </div>
                    <p className="font-bold text-gray-500 text-lg">
                        Tidak ada data untuk periode ini.
                    </p>
                    <p className="text-gray-400 text-sm">
                        Coba pilih rentang tanggal yang lain.
                    </p>
                </div>
            );
        }

        // Dynamic table headers based on type
        let headers = [];
        let rows = [];

        if (type === "sales" || type === "income") {
            headers = ["ID", "Tanggal", "Pelanggan", "Motor", "Tipe", "Total"];
            rows = listData.map((item, index) => (
                <tr key={item.id || index} className="hover:bg-gray-50/50">
                    <td className="p-4 font-mono text-xs font-bold text-gray-500">
                        #{item.id}
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                        {item.created_at}
                    </td>
                    <td className="p-4 font-bold text-gray-800">
                        {item.customer_name}
                    </td>
                    <td className="p-4 text-gray-600">{item.motor_name}</td>
                    <td className="p-4">
                        <span
                            className={`px-2 py-1 rounded-lg text-xs font-bold uppercase ${
                                item.type === "CASH"
                                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                    : "bg-purple-50 text-purple-600 border border-purple-100"
                            }`}
                        >
                            {item.type}
                        </span>
                    </td>
                    <td className="p-4 font-bold text-gray-900 text-right">
                        Rp{" "}
                        {new Intl.NumberFormat("id-ID").format(
                            item.total_amount || 0
                        )}
                    </td>
                </tr>
            ));
        } else if (type === "customer") {
            headers = ["Nama", "Email", "Total Transaksi", "Total Belanja"];
            rows = listData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50/50">
                    <td className="p-4 font-bold text-gray-800">{item.name}</td>
                    <td className="p-4 text-gray-600">{item.email}</td>
                    <td className="p-4 text-center font-bold">
                        {item.transaction_count}
                    </td>
                    <td className="p-4 font-bold text-gray-900 text-right">
                        Rp{" "}
                        {new Intl.NumberFormat("id-ID").format(
                            item.total_spent || 0
                        )}
                    </td>
                </tr>
            ));
        } else if (type === "status") {
            headers = ["Status", "Jumlah", "Total Nilai"];
            // Handle by_status object transformation if needed, here we assume listData is already array of {count, revenue}
            // BUT wait, by_status was mapped with keys in controller. We need to handle that.
            // Actually in controller: $data['by_status'] = map(...) -> returns object keyed by status if groupBy used.
            // So listData = Object.values(data.by_status) above is correct, but we lost the key (status name).
            // Let's rely on Object.entries in the loop below.

            // Quick fix: Re-map listData for status to include keys if it was an object
            const statusEntries = data.by_status
                ? Object.entries(data.by_status)
                : [];

            rows = statusEntries.map(([status, stats], index) => (
                <tr key={index} className="hover:bg-gray-50/50">
                    <td className="p-4">
                        <span className="font-bold text-gray-700 uppercase px-3 py-1 bg-gray-100 rounded-lg border border-gray-200 text-xs">
                            {status.replace(/_/g, " ")}
                        </span>
                    </td>
                    <td className="p-4 font-bold text-lg">{stats.count}</td>
                    <td className="p-4 font-bold text-gray-900 text-right">
                        Rp{" "}
                        {new Intl.NumberFormat("id-ID").format(
                            stats.revenue || 0
                        )}
                    </td>
                </tr>
            ));
        }
        // The original code had a syntax error here, closing the map and then immediately closing the if block.
        // The `));` should be followed by the closing `}` for the `if` block.
        // The provided snippet ends with `)); }`, which is still incorrect.
        // I will correct it to `)); }` for the `if (type === 'status')` block.
        // Then the `return` statement for the table.

        return (
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase text-xs tracking-wider">
                            {headers.map((h, i) => (
                                <th
                                    key={i}
                                    className={`p-4 font-bold ${
                                        h === "Total" ||
                                        h === "Total Belanja" ||
                                        h === "Total Nilai"
                                            ? "text-right"
                                            : ""
                                    }`}
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">{rows}</tbody>
                    {/* Footer for totals if applicable */}
                    {(type === "sales" || type === "income") && (
                        <tfoot className="bg-gray-50 font-black text-gray-900">
                            <tr>
                                <td
                                    colSpan="5"
                                    className="p-4 text-right uppercase tracking-wide"
                                >
                                    Grand Total
                                </td>
                                <td className="p-4 text-right">
                                    Rp{" "}
                                    {new Intl.NumberFormat("id-ID").format(
                                        calculateTotal("total_amount")
                                    )}
                                </td>
                            </tr>
                        </tfoot>
                    )}
                </table>
            </div>
        );
    };

    return (
        <AdminLayout title={title}>
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                    <Link
                        href={route("admin.reports.index")}
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-primary font-bold transition-colors group"
                    >
                        <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                            <ArrowLeft size={16} />
                        </div>
                        <span className="text-sm">Kembali ke Menu</span>
                    </Link>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePrint}
                            className="px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
                        >
                            <Printer size={16} /> Cetak
                        </button>
                        <button className="px-4 py-2 bg-primary text-white rounded-xl font-bold hover:bg-dark-blue transition-colors flex items-center gap-2 shadow-lg shadow-primary/20">
                            <Download size={16} /> Export PDF
                        </button>
                    </div>
                </div>

                {/* Printable Area */}
                <div
                    ref={componentRef}
                    className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 print:shadow-none print:border-none print:p-0"
                >
                    <div className="flex items-start justify-between mb-8 border-b border-gray-100 pb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-gray-50 rounded-lg border border-gray-100">
                                    {getReportIcon()}
                                </div>
                                <h1 className="text-2xl font-black text-gray-900">
                                    {title}
                                </h1>
                            </div>
                            <p className="text-gray-500 text-sm">
                                {description}
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 text-sm font-bold text-gray-700">
                                <Calendar size={14} className="text-gray-400" />
                                {startDate} - {endDate}
                            </div>
                        </div>
                    </div>

                    {/* Summary Stats - ADDED */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        {getSummaryStats().map((stat, idx) => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={idx}
                                    className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4"
                                >
                                    <div className="p-3 bg-primary/10 text-primary rounded-xl">
                                        <Icon size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                                            {stat.label}
                                        </p>
                                        <p className="text-xl font-black text-gray-900">
                                            {stat.value}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {renderChart()}
                    {renderTable()}

                    <div className="mt-8 text-center print:block hidden">
                        <p className="text-xs text-gray-400">
                            Dicetak otomatis oleh Sistem Admin SRB Motor pada{" "}
                            {new Date().toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
