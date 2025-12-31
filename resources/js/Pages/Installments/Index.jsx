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
    TrendingUp,
    Activity,
    DollarSign,
    Landmark,
} from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function InstallmentIndex({ transactions }) {
    const [selectedInstallment, setSelectedInstallment] = useState(null);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const [isLoadingPay, setIsLoadingPay] = useState(false);
    const [isLoadingCheck, setIsLoadingCheck] = useState(false);

    const { config } = usePage().props;

    // Load Snap.js
    useEffect(() => {
        const snapUrl = "https://app.sandbox.midtrans.com/snap/snap.js"; // Use sandbox for dev
        const clientKey = config.midtrans_client_key;

        const script = document.createElement("script");
        script.src = snapUrl;
        script.setAttribute("data-client-key", clientKey);
        script.async = true;

        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
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
                    Swal.fire({
                        title: "PEMBAYARAN BERHASIL",
                        text: "Transaksi terverifikasi.",
                        icon: "success",
                        background: "#18181b",
                        color: "#fff",
                        confirmButtonColor: "#e11d48",
                    });
                    router.reload();
                },
                onPending: function (result) {
                    Swal.fire({
                        title: "PEMBAYARAN TERTUNDA",
                        text: "Menunggu penyelesaian.",
                        icon: "info",
                        background: "#18181b",
                        color: "#fff",
                        confirmButtonColor: "#e11d48",
                    });
                    router.reload();
                },
                onError: function (result) {
                    Swal.fire({
                        title: "PEMBAYARAN GAGAL",
                        text: "Transaksi ditolak.",
                        icon: "error",
                        background: "#18181b",
                        color: "#fff",
                        confirmButtonColor: "#e11d48",
                    });
                },
                onClose: function () {},
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "KESALAHAN SISTEM",
                text: "Gateway tidak dapat dijangkau.",
                icon: "error",
                background: "#18181b",
                color: "#fff",
                confirmButtonColor: "#bef264",
            });
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
                title: "PEMBARUAN STATUS",
                text: response.data.message,
                icon: "info",
                background: "#18181b",
                color: "#fff",
                confirmButtonColor: "#bef264",
            });
            router.reload();
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "INFO",
                text: error.response?.data?.message || "Check failed.",
                icon: "warning",
                background: "#18181b",
                color: "#fff",
                confirmButtonColor: "#bef264",
            });
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
                    title: "UPLINK BERHASIL",
                    text: "Bukti diserahkan untuk verifikasi.",
                    background: "#18181b",
                    color: "#fff",
                    confirmButtonColor: "#bef264",
                });
            },
        });
    };

    const getStatusBadge = (status) => {
        const badges = {
            pending: "bg-white/5 text-white/50 border-white/10",
            waiting_approval:
                "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
            paid: "bg-green-500/10 text-green-400 border-green-500/20",
            overdue: "bg-red-500/10 text-red-500 border-red-500/20",
        };
        const labels = {
            pending: "TERTUNDA",
            waiting_approval: "VERIFIKASI",
            paid: "LUNAS",
            overdue: "TERLAMBAT",
        };

        const Icon =
            {
                pending: Clock,
                waiting_approval: Activity,
                paid: CheckCircle,
                overdue: AlertTriangle,
            }[status] || Clock;

        return (
            <span
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider w-fit ${
                    badges[status] || badges.pending
                }`}
            >
                <Icon size={12} />
                {labels[status] || status}
            </span>
        );
    };

    const formatCurrency = (amount) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);

    const formatDate = (dateString) =>
        new Date(dateString).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });

    return (
        <MainLayout title="Kontrol Finansial">
            <div className="bg-surface-dark min-h-screen pt-32 pb-20 overflow-hidden relative">
                {/* Background FX */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-surface-dark to-surface-dark pointer-events-none"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
                    >
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-4 backdrop-blur-md">
                                <Landmark size={12} className="text-blue-400" />
                                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-400">
                                    Kontrol Finansial
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-display font-black text-white leading-none">
                                RENCANA{" "}
                                <span className="text-accent text-glow">
                                    CICILAN
                                </span>
                            </h1>
                        </div>
                        <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-3">
                            <Shield className="text-green-400" size={18} />
                            <span className="text-xs font-mono text-white/50">
                                GATEWAY AMAN AKTIF
                            </span>
                        </div>
                    </motion.div>

                    {transactions.length > 0 ? (
                        <div className="space-y-12">
                            {transactions.map((transaction) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    key={transaction.id}
                                    className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden"
                                >
                                    {/* Transaction Header */}
                                    <div className="p-6 md:p-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-black/20">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                                                <CreditCard
                                                    size={32}
                                                    className="text-white/30"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-display font-bold text-white mb-1">
                                                    {transaction.motor?.name ||
                                                        "Unknown Asset"}
                                                </h3>
                                                <div className="flex items-center gap-4 text-xs font-mono text-white/40">
                                                    <span>
                                                        INV:{" "}
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
                                            <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest mb-1">
                                                Total Kewajiban
                                            </div>
                                            <div className="text-3xl font-mono font-bold text-white text-glow">
                                                {formatCurrency(
                                                    transaction.total_amount
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Installments Table */}
                                    <div className="overflow-x-auto">
                                        <table className="w-full min-w-[800px]">
                                            <thead>
                                                <tr className="border-b border-white/5 text-left text-[10px] uppercase text-white/30 font-bold tracking-widest bg-white/[0.02]">
                                                    <th className="py-4 pl-8">
                                                        Termin
                                                    </th>
                                                    <th className="py-4">
                                                        Jatuh Tempo
                                                    </th>
                                                    <th className="py-4">
                                                        Jumlah
                                                    </th>
                                                    <th className="py-4">
                                                        Status
                                                    </th>
                                                    <th className="py-4 pr-8 text-center">
                                                        Aksi
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5 font-mono text-sm">
                                                {transaction.installments &&
                                                    transaction.installments.map(
                                                        (inst) => (
                                                            <tr
                                                                key={inst.id}
                                                                className="hover:bg-white/[0.02] transition-colors group"
                                                            >
                                                                <td className="py-5 pl-8 text-white/70 group-hover:text-white transition-colors">
                                                                    {inst.installment_number ===
                                                                    0 ? (
                                                                        <span className="text-accent font-bold">
                                                                            UANG
                                                                            MUKA
                                                                        </span>
                                                                    ) : (
                                                                        `TERMIN #${String(
                                                                            inst.installment_number
                                                                        ).padStart(
                                                                            2,
                                                                            "0"
                                                                        )}`
                                                                    )}
                                                                </td>
                                                                <td className="py-5 text-white/50">
                                                                    {formatDate(
                                                                        inst.due_date
                                                                    )}
                                                                </td>
                                                                <td className="py-5 font-bold text-white">
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
                                                                        <div className="text-[10px] text-red-500 mt-1">
                                                                            +
                                                                            DENDA:{" "}
                                                                            {formatCurrency(
                                                                                inst.penalty_amount
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </td>
                                                                <td className="py-5">
                                                                    {getStatusBadge(
                                                                        inst.status
                                                                    )}
                                                                </td>
                                                                <td className="py-5 pr-8 text-center">
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
                                                                                className="bg-accent text-black px-4 py-2 rounded-lg text-xs font-bold font-sans hover:bg-white transition-colors flex items-center gap-2 shadow-[0_0_10px_rgba(225,29,72,0.2)]"
                                                                            >
                                                                                <Zap
                                                                                    size={
                                                                                        14
                                                                                    }
                                                                                />
                                                                                {isLoadingPay
                                                                                    ? "MEMPROSES..."
                                                                                    : "BAYAR ONLINE"}
                                                                            </button>
                                                                            <button
                                                                                onClick={() =>
                                                                                    openUploadModal(
                                                                                        inst
                                                                                    )
                                                                                }
                                                                                className="bg-white/10 text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-white/20 transition-colors"
                                                                                title="Upload Bukti Transfer Manual"
                                                                            >
                                                                                <Upload
                                                                                    size={
                                                                                        14
                                                                                    }
                                                                                />
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
                                                                                className="bg-transparent border border-white/20 text-white/50 px-3 py-2 rounded-lg hover:text-white hover:border-white transition-colors"
                                                                                title="Cek Status"
                                                                            >
                                                                                <Activity
                                                                                    size={
                                                                                        14
                                                                                    }
                                                                                    className={
                                                                                        isLoadingCheck
                                                                                            ? "animate-spin"
                                                                                            : ""
                                                                                    }
                                                                                />
                                                                            </button>
                                                                        </div>
                                                                    ) : inst.status ===
                                                                      "waiting_approval" ? (
                                                                        <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-wider">
                                                                            Processing
                                                                        </span>
                                                                    ) : (
                                                                        <div className="flex justify-center gap-4">
                                                                            <a
                                                                                href={route(
                                                                                    "installments.receipt",
                                                                                    inst.id
                                                                                )}
                                                                                target="_blank"
                                                                                className="text-white/30 hover:text-accent transition-colors flex items-center gap-1 text-[10px] font-bold tracking-wider"
                                                                            >
                                                                                <Download
                                                                                    size={
                                                                                        14
                                                                                    }
                                                                                />{" "}
                                                                                UNDUH
                                                                                KWITANSI
                                                                            </a>
                                                                        </div>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                {(!transaction.installments ||
                                                    transaction.installments
                                                        .length === 0) && (
                                                    <tr>
                                                        <td
                                                            colSpan="5"
                                                            className="py-8 text-center text-white/30 italic"
                                                        >
                                                            Tidak ada data
                                                            cicilan dibuat.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 bg-zinc-900/30 rounded-3xl border border-white/5 backdrop-blur-sm">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/5">
                                <CreditCard
                                    size={32}
                                    className="text-white/20"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 font-display">
                                TIDAK ADA PEMBIAYAAN AKTIF
                            </h3>
                            <p className="text-white/30 max-w-md text-center text-sm font-mono">
                                Anda tidak memiliki perjanjian kredit aktif.
                                Ajukan pembiayaan untuk melihat data di sini.
                            </p>
                        </div>
                    )}

                    {/* Payment Modal */}
                    <AnimatePresence>
                        {isUploadModalOpen && selectedInstallment && (
                            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                                    onClick={closeUploadModal}
                                ></motion.div>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    className="bg-zinc-900 border border-white/10 rounded-3xl w-full max-w-md shadow-2xl relative z-10 overflow-hidden"
                                >
                                    <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                            <Upload
                                                size={18}
                                                className="text-accent"
                                            />{" "}
                                            UPLINK MANUAL
                                        </h3>
                                        <button
                                            onClick={closeUploadModal}
                                            className="text-white/30 hover:text-white transition-colors"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>

                                    <form
                                        onSubmit={submitPayment}
                                        className="p-6 space-y-6"
                                    >
                                        <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
                                            <div className="flex justify-between text-xs mb-2">
                                                <span className="text-white/50 font-bold uppercase tracking-wider">
                                                    Target Cicilan
                                                </span>
                                                <span className="font-mono text-white">
                                                    #
                                                    {
                                                        selectedInstallment.installment_number
                                                    }
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <span className="text-white/50 text-xs">
                                                    Jumlah Total
                                                </span>
                                                <span className="text-2xl font-bold text-white text-glow">
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
                                            <div className="mt-4 text-[10px] text-blue-300 bg-blue-500/10 p-3 rounded-lg border border-blue-500/20 font-mono">
                                                TUJUAN TRANSFER:{" "}
                                                <span className="text-white font-bold select-all">
                                                    123-456-7890
                                                </span>{" "}
                                                (BCA / SRB MOTOR)
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-2">
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
                                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent/50 outline-none text-sm font-mono appearance-none"
                                                >
                                                    <option value="transfer">
                                                        TRANSFER BANK MANUAL
                                                    </option>
                                                    <option value="cash">
                                                        TUNAI DI DEALER
                                                    </option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-2">
                                                    Bukti Transfer
                                                </label>
                                                <div className="border border-dashed border-white/10 rounded-xl p-8 hover:bg-white/5 transition-colors relative group text-center">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) =>
                                                            setData(
                                                                "payment_proof",
                                                                e.target
                                                                    .files[0]
                                                            )
                                                        }
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                        required
                                                    />
                                                    <div className="flex flex-col items-center gap-2 pointer-events-none">
                                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent group-hover:text-black transition-colors">
                                                            <Upload
                                                                size={18}
                                                                className="text-white/50 group-hover:text-black"
                                                            />
                                                        </div>
                                                        {data.payment_proof ? (
                                                            <span className="text-xs font-bold text-accent">
                                                                {
                                                                    data
                                                                        .payment_proof
                                                                        .name
                                                                }
                                                            </span>
                                                        ) : (
                                                            <span className="text-xs text-white/30">
                                                                Klik untuk
                                                                unggah gambar
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                {errors.payment_proof && (
                                                    <p className="text-red-500 text-[10px] mt-1 text-right">
                                                        {errors.payment_proof}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-accent transition-colors flex items-center justify-center gap-2 disabled:opacity-50 text-sm tracking-wide"
                                        >
                                            {processing ? (
                                                <Activity
                                                    className="animate-spin"
                                                    size={16}
                                                />
                                            ) : (
                                                <>
                                                    <CheckCircle size={16} />{" "}
                                                    KONFIRMASI TRANSAKSI
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </MainLayout>
    );
}
