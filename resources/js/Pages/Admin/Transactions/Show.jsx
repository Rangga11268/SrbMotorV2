import React, { useState } from "react";
import { Link, useForm, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Modal from "@/Components/Modal";
import {
    ArrowLeft,
    User,
    Bike,
    FileText,
    Upload,
    Trash2,
    CheckCircle,
    XCircle,
    Clock,
    Mail,
    MessageCircle,
    Printer,
    Download,
    AlertTriangle,
    Edit,
    Eye,
    CreditCard,
    DollarSign,
    Box,
    Activity,
    Shield,
    Calendar,
    ChevronRight,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function Show({ transaction }) {
    const { credit_detail, motor, user } = transaction;
    const documents = credit_detail?.documents || [];

    const paidInstallments =
        transaction.installments?.filter((i) => i.status === "paid").length ||
        0;
    const totalInstallments = credit_detail?.tenor || 0;
    const progressPercentage =
        totalInstallments > 0
            ? Math.round((paidInstallments / totalInstallments) * 100)
            : 0;

    // Calculate remaining amount
    const remainingAmount =
        transaction.installments
            ?.filter((i) => i.status !== "paid")
            .reduce((sum, i) => sum + Number(i.amount), 0) || 0;

    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        type: "info",
        title: "",
        message: "",
        onConfirm: () => {},
        confirmText: "KONFIRMASI",
    });
    const [processingAction, setProcessingAction] = useState(false);

    // Command Center Status Styles
    const getStatusStyle = (status) => {
        if (
            [
                "completed",
                "disetujui",
                "ready_for_delivery",
                "payment_confirmed",
                "paid",
            ].includes(status)
        )
            return "bg-green-500/10 text-green-400 border-green-500/50 shadow-[0_0_15px_rgba(74,222,128,0.2)]";
        if (
            [
                "menunggu_persetujuan",
                "new_order",
                "waiting_payment",
                "unit_preparation",
                "dikirim_ke_surveyor",
                "jadwal_survey",
                "waiting_approval",
            ].includes(status)
        )
            return "bg-amber-500/10 text-amber-400 border-amber-500/50 shadow-[0_0_15px_rgba(251,191,36,0.2)]";
        if (
            [
                "ditolak",
                "data_tidak_valid",
                "cancelled",
                "rejected",
                "overdue",
            ].includes(status)
        )
            return "bg-red-500/10 text-red-400 border-red-500/50 shadow-[0_0_15px_rgba(248,113,113,0.2)]";
        return "bg-blue-500/10 text-blue-400 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]";
    };

    const formatStatus = (status) => status.replace(/_/g, " ").toUpperCase();

    const formatPaymentMethod = (method) => {
        if (!method) return "MENUNGGU";
        return method.replace("midtrans_", "").replace(/_/g, " ").toUpperCase();
    };

    const handleStatusUpdate = (e) => {
        const newStatus = e.target.value;
        setModalConfig({
            isOpen: true,
            title: "UBAH STATUS PROTOKOL",
            message: `Konfirmasi perubahan status transaksi menjadi "${formatStatus(
                newStatus
            )}"?`,
            type: "info",
            confirmText: "EKSEKUSI",
            onConfirm: () => processStatusUpdate(newStatus),
        });
    };

    const processStatusUpdate = (newStatus) => {
        setProcessingAction(true);
        router.post(
            route("admin.transactions.updateStatus", transaction.id),
            { status: newStatus },
            {
                onSuccess: () => {
                    setProcessingAction(false);
                    setModalConfig((prev) => ({ ...prev, isOpen: false }));
                    toast.success("STATUS PROTOKOL DIPERBARUI");
                },
                onError: () => {
                    setProcessingAction(false);
                    toast.error("GAGAL MEMPERBARUI STATUS");
                },
            }
        );
    };

    const confirmDelete = () => {
        setModalConfig({
            isOpen: true,
            title: "HAPUS DATA TRANSAKSI",
            message:
                "PERINGATAN: Tindakan ini akan menghapus data secara permanen dari database. Lanjutkan?",
            type: "danger",
            confirmText: "HAPUS DATA",
            onConfirm: () => processDelete(),
        });
    };

    const processDelete = () => {
        setProcessingAction(true);
        router.delete(route("admin.transactions.destroy", transaction.id), {
            onSuccess: () => {
                setProcessingAction(false);
                setModalConfig((prev) => ({ ...prev, isOpen: false }));
                toast.success("DATA TRANSAKSI DIHAPUS");
            },
            onError: () => {
                setProcessingAction(false);
                toast.error("GAGAL MENGHAPUS DATA");
            },
        });
    };

    const approvePayment = (installmentId) => {
        if (confirm("VERIFIKASI PEMBAYARAN INI?")) {
            router.post(
                route("admin.installments.approve", installmentId),
                {},
                {
                    onSuccess: () => toast.success("PEMBAYARAN TERVERIFIKASI"),
                    onError: () => toast.error("GAGAL MEMPROSES"),
                }
            );
        }
    };

    const rejectPayment = (installmentId) => {
        if (confirm("TOLAK PEMBAYARAN INI?")) {
            router.post(
                route("admin.installments.reject", installmentId),
                {},
                {
                    onSuccess: () => toast.success("PEMBAYARAN DITOLAK"),
                    onError: () => toast.error("GAGAL MEMPROSES"),
                }
            );
        }
    };

    // Document Upload Logic
    const {
        data: docData,
        setData: setDocData,
        post: postDoc,
        processing: docProcessing,
        errors: docErrors,
        reset: resetDoc,
    } = useForm({
        document_type: "",
        document_file: null,
    });

    const handleUpload = (e) => {
        e.preventDefault();
        postDoc(route("admin.transactions.upload-document", transaction.id), {
            onSuccess: () => {
                resetDoc();
                toast.success("DOKUMEN TERUPLOAD KE DATABASE");
            },
            onError: () => toast.error("UPLOAD GAGAL"),
        });
    };

    const confirmDeleteDocument = (docId) => {
        if (confirm("HAPUS DOKUMEN INI DARI DATABASE?")) {
            router.delete(route("admin.transactions.delete_document", docId), {
                onSuccess: () => toast.success("DOKUMEN DIHAPUS"),
                onError: () => toast.error("GAGAL MENGHAPUS DOKUMEN"),
            });
        }
    };

    const transactionStatusOptions =
        transaction.transaction_type === "CASH"
            ? [
                  { value: "new_order", label: "PESANAN BARU" },
                  { value: "waiting_payment", label: "MENUNGGU PEMBAYARAN" },
                  {
                      value: "payment_confirmed",
                      label: "PEMBAYARAN DIKONFIRMASI",
                  },
                  { value: "unit_preparation", label: "PERSIAPAN UNIT" },
                  { value: "ready_for_delivery", label: "SIAP DIKIRIM" },
                  { value: "completed", label: "SELESAI" },
                  { value: "cancelled", label: "DIBATALKAN" },
              ]
            : [
                  {
                      value: "menunggu_persetujuan",
                      label: "MENUNGGU PERSETUJUAN",
                  },
                  {
                      value: "dikirim_ke_surveyor",
                      label: "DIKIRIM KE SURVEYOR",
                  },
                  { value: "jadwal_survey", label: "JADWAL SURVEY" },
                  { value: "disetujui", label: "DISETUJUI" },
                  { value: "ditolak", label: "DITOLAK" },
                  { value: "completed", label: "SELESAI" },
                  { value: "data_tidak_valid", label: "DATA TIDAK VALID" },
              ];

    return (
        <AdminLayout title={`DATA JEJAK #${transaction.id}`}>
            <Modal
                isOpen={modalConfig.isOpen}
                onClose={() =>
                    setModalConfig((prev) => ({ ...prev, isOpen: false }))
                }
                title={modalConfig.title}
                message={modalConfig.message}
                confirmText={modalConfig.confirmText}
                onConfirm={modalConfig.onConfirm}
                type={modalConfig.type}
                processing={processingAction}
            />

            <div className="space-y-8">
                {/* Top Control Bar */}
                <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
                    <Link
                        href={route("admin.transactions.index")}
                        className="group flex items-center gap-3 text-white/50 hover:text-white transition-colors"
                    >
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-accent group-hover:bg-accent/10 transition-all">
                            <ArrowLeft size={18} />
                        </div>
                        <span className="font-mono text-xs tracking-wider uppercase">
                            KEMBALI KE INDEKS
                        </span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 flex items-center gap-3">
                            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                                STATUS SAAT INI:
                            </span>
                            <span
                                className={`text-xs font-bold uppercase tracking-wider ${
                                    transaction.status === "completed"
                                        ? "text-green-400"
                                        : "text-white"
                                }`}
                            >
                                {formatStatus(transaction.status)}
                            </span>
                        </div>
                        <div className="h-8 w-px bg-white/10"></div>
                        <button
                            onClick={confirmDelete}
                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="HAPUS DATA"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Main Content Column */}
                    <div className="xl:col-span-2 space-y-6">
                        {/* Unit Info Card */}
                        <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden group">
                            <div className="p-6 border-b border-white/5 flex items-center justify-between">
                                <h3 className="text-sm font-bold text-white flex items-center gap-2 font-display uppercase tracking-wider">
                                    <Bike className="text-accent" size={18} />
                                    DATA UNIT TARGET
                                </h3>
                                <div className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold font-mono">
                                    {motor?.brand}
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="w-full md:w-64 aspect-video rounded-xl bg-black/50 border border-white/10 overflow-hidden relative group/img">
                                        {motor?.image_path ? (
                                            <img
                                                src={`/storage/${motor.image_path}`}
                                                alt={motor.name}
                                                className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-white/20">
                                                <Bike
                                                    size={48}
                                                    strokeWidth={1}
                                                />
                                            </div>
                                        )}
                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4 translate-y-full group-hover/img:translate-y-0 transition-transform">
                                            <Link
                                                href={route(
                                                    "admin.motors.show",
                                                    motor.id
                                                )}
                                                className="block w-full py-2 text-center bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded hover:bg-accent hover:text-white transition-colors"
                                            >
                                                DATABASE UNIT
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <h4 className="text-2xl font-display font-black text-white uppercase italic tracking-wide">
                                                {motor?.name}
                                            </h4>
                                            <p className="text-xs font-mono text-white/40 mt-1">
                                                {motor?.type} • {motor?.year}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 rounded-xl bg-black/30 border border-white/5">
                                                <label className="text-[10px] text-white/30 font-bold uppercase tracking-wider block mb-1">
                                                    NILAI OTR (CASH)
                                                </label>
                                                <span className="text-lg font-mono font-bold text-white">
                                                    Rp{" "}
                                                    {new Intl.NumberFormat(
                                                        "id-ID"
                                                    ).format(motor?.price || 0)}
                                                </span>
                                            </div>
                                            <div className="p-4 rounded-xl bg-black/30 border border-white/5">
                                                <label className="text-[10px] text-white/30 font-bold uppercase tracking-wider block mb-1">
                                                    TIPE TRANSAKSI
                                                </label>
                                                <span
                                                    className={`text-lg font-display font-bold uppercase ${
                                                        transaction.transaction_type ===
                                                        "CASH"
                                                            ? "text-green-400"
                                                            : "text-blue-400"
                                                    }`}
                                                >
                                                    {
                                                        transaction.transaction_type
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Credit Details / Installment History */}
                        {transaction.transaction_type === "CREDIT" && (
                            <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden">
                                <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <h3 className="text-sm font-bold text-white flex items-center gap-2 font-display uppercase tracking-wider">
                                        <Activity
                                            className="text-blue-400"
                                            size={18}
                                        />
                                        RIWAYAT ANGSURAN
                                    </h3>
                                    <div className="flex gap-2">
                                        <div className="px-3 py-1 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold font-mono">
                                            LUNAS: {paidInstallments}
                                        </div>
                                        <div className="px-3 py-1 rounded bg-white/5 border border-white/10 text-white/60 text-[10px] font-bold font-mono">
                                            SISA:{" "}
                                            {totalInstallments -
                                                paidInstallments}
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full h-1 bg-white/5">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-500 to-green-400 transition-all duration-1000"
                                        style={{
                                            width: `${progressPercentage}%`,
                                        }}
                                    ></div>
                                </div>

                                <div className="max-h-[500px] overflow-y-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="sticky top-0 bg-black/90 backdrop-blur-sm z-10 border-b border-white/10">
                                            <tr className="text-[10px] text-white/30 font-mono font-bold uppercase tracking-[0.2em]">
                                                <th className="p-4">BLN</th>
                                                <th className="p-4">TEMPO</th>
                                                <th className="p-4">NOMINAL</th>
                                                <th className="p-4">METODE</th>
                                                <th className="p-4">BUKTI</th>
                                                <th className="p-4">STATUS</th>
                                                <th className="p-4 text-right">
                                                    AKSI
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {transaction.installments.map(
                                                (inst) => (
                                                    <tr
                                                        key={inst.id}
                                                        className="hover:bg-white/5 transition-colors"
                                                    >
                                                        <td className="p-4 font-mono text-xs text-white">
                                                            {inst.installment_number ===
                                                            0
                                                                ? "DP"
                                                                : `#${inst.installment_number}`}
                                                        </td>
                                                        <td className="p-4 font-mono text-xs text-white/60">
                                                            {new Date(
                                                                inst.due_date
                                                            )
                                                                .toLocaleDateString(
                                                                    "id-ID"
                                                                )
                                                                .toUpperCase()}
                                                        </td>
                                                        <td className="p-4 font-mono text-xs font-bold text-white">
                                                            Rp{" "}
                                                            {new Intl.NumberFormat(
                                                                "id-ID"
                                                            ).format(
                                                                inst.amount
                                                            )}
                                                        </td>
                                                        <td className="p-4 font-mono text-xs text-white/60">
                                                            {inst.payment_method
                                                                ? formatPaymentMethod(
                                                                      inst.payment_method
                                                                  )
                                                                : "-"}
                                                        </td>
                                                        <td className="p-4">
                                                            {inst.payment_proof ? (
                                                                <a
                                                                    href={`/storage/${inst.payment_proof}`}
                                                                    target="_blank"
                                                                    className="text-blue-400 hover:text-white transition-colors"
                                                                >
                                                                    <Eye
                                                                        size={
                                                                            14
                                                                        }
                                                                    />
                                                                </a>
                                                            ) : (
                                                                <span className="text-white/20">
                                                                    -
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="p-4">
                                                            <span
                                                                className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusStyle(
                                                                    inst.status
                                                                )}`}
                                                            >
                                                                {formatStatus(
                                                                    inst.status
                                                                )}
                                                            </span>
                                                        </td>
                                                        <td className="p-4 text-right">
                                                            {inst.status ===
                                                                "waiting_approval" && (
                                                                <div className="flex justify-end gap-2">
                                                                    <button
                                                                        onClick={() =>
                                                                            approvePayment(
                                                                                inst.id
                                                                            )
                                                                        }
                                                                        className="p-1.5 bg-green-500/20 text-green-400 rounded hover:bg-green-500 hover:text-white"
                                                                    >
                                                                        <CheckCircle
                                                                            size={
                                                                                14
                                                                            }
                                                                        />
                                                                    </button>
                                                                    <button
                                                                        onClick={() =>
                                                                            rejectPayment(
                                                                                inst.id
                                                                            )
                                                                        }
                                                                        className="p-1.5 bg-red-500/20 text-red-400 rounded hover:bg-red-500 hover:text-white"
                                                                    >
                                                                        <XCircle
                                                                            size={
                                                                                14
                                                                            }
                                                                        />
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Document Vault */}
                        <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden">
                            <div className="p-6 border-b border-white/5 flex items-center justify-between">
                                <h3 className="text-sm font-bold text-white flex items-center gap-2 font-display uppercase tracking-wider">
                                    <Shield
                                        className="text-yellow-400"
                                        size={18}
                                    />
                                    VAULT DOKUMEN DIGITAL
                                </h3>
                                <span className="text-[10px] font-mono text-white/40">
                                    {documents.length} ARSIP TERSIMPAN
                                </span>
                            </div>

                            <div className="p-6">
                                <form
                                    onSubmit={handleUpload}
                                    className="mb-8 bg-black/30 border border-white/5 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-end"
                                >
                                    <div className="w-full md:w-1/3">
                                        <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-mono">
                                            KATEGORI DOKUMEN
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={docData.document_type}
                                                onChange={(e) =>
                                                    setDocData(
                                                        "document_type",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-xs font-mono text-white focus:border-accent appearance-none"
                                                required
                                            >
                                                <option value="">
                                                    PILIH...
                                                </option>
                                                <option value="KTP">KTP</option>
                                                <option value="KK">
                                                    KARTU KELUARGA
                                                </option>
                                                <option value="SLIP_GAJI">
                                                    SLIP GAJI
                                                </option>
                                                <option value="BPKB">
                                                    BPKB
                                                </option>
                                                <option value="STNK">
                                                    STNK
                                                </option>
                                            </select>
                                            <ChevronRight
                                                className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-white/30 pointer-events-none"
                                                size={12}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/3">
                                        <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-mono">
                                            TARGET FILE
                                        </label>
                                        <input
                                            type="file"
                                            onChange={(e) =>
                                                setDocData(
                                                    "document_file",
                                                    e.target.files[0]
                                                )
                                            }
                                            className="block w-full text-xs text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-white/10 file:text-white hover:file:bg-accent/20 cursor-pointer"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={docProcessing}
                                        className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold font-display uppercase tracking-wider rounded-lg border border-white/10 transition-all ml-auto"
                                    >
                                        {docProcessing
                                            ? "MEMPROSES..."
                                            : "UPLOAD KE VAULT"}
                                    </button>
                                </form>

                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                    {documents.length > 0 ? (
                                        documents.map((doc) => (
                                            <div
                                                key={doc.id}
                                                className="p-4 rounded-xl bg-black/40 border border-white/5 hover:border-accent/50 transition-all group relative"
                                            >
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="p-2 rounded bg-white/5 text-blue-400 group-hover:text-accent transition-colors">
                                                        <FileText size={20} />
                                                    </div>
                                                    <div className="overflow-hidden">
                                                        <div className="font-bold text-white text-xs font-display uppercase tracking-wide truncate">
                                                            {doc.document_type}
                                                        </div>
                                                        <div className="text-[10px] text-white/40 font-mono">
                                                            {new Date(
                                                                doc.created_at
                                                            ).toLocaleDateString(
                                                                "id-ID"
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <a
                                                        href={`/storage/${doc.file_path}`}
                                                        target="_blank"
                                                        className="flex-1 py-1.5 text-center bg-white/5 hover:bg-blue-500/20 text-[10px] font-bold text-white/60 hover:text-blue-400 rounded transition-all uppercase tracking-wider"
                                                    >
                                                        LIHAT
                                                    </a>
                                                    <button
                                                        onClick={() =>
                                                            confirmDeleteDocument(
                                                                doc.id
                                                            )
                                                        }
                                                        className="px-3 py-1.5 bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 rounded transition-all"
                                                    >
                                                        <Trash2 size={12} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full py-8 text-center border border-dashed border-white/10 rounded-xl">
                                            <span className="text-white/20 font-mono text-xs">
                                                VAULT KOSONG
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Side */}
                    <div className="space-y-6">
                        {/* Customer Info */}
                        <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-white/5 p-6">
                            <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2 font-display uppercase tracking-wider">
                                <User className="text-accent" size={18} />
                                BIODATA PELANGGAN
                            </h3>
                            <div className="text-center mb-6">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-purple-600 p-[1px] mx-auto mb-3">
                                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                                        <span className="text-2xl font-black text-white">
                                            {(user?.name || "U")[0]}
                                        </span>
                                    </div>
                                </div>
                                <h4 className="text-lg font-bold text-white">
                                    {user?.name || "Unknown"}
                                </h4>
                                <p className="text-xs text-white/40 font-mono">
                                    {user?.email}
                                </p>
                            </div>
                            <div className="space-y-4 border-t border-white/5 pt-6">
                                <div>
                                    <label className="text-[10px] text-white/30 font-bold uppercase tracking-wider block mb-1">
                                        KONTAK
                                    </label>
                                    <div className="font-mono text-sm text-white">
                                        {transaction.customer_phone ||
                                            user?.phone_number ||
                                            "-"}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] text-white/30 font-bold uppercase tracking-wider block mb-1">
                                        ALAMAT TERDAFTAR
                                    </label>
                                    <div className="font-mono text-sm text-white leading-relaxed">
                                        {transaction.customer_address ||
                                            user?.address ||
                                            "-"}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Status Control */}
                        <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-white/5 p-6">
                            <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2 font-display uppercase tracking-wider">
                                <Box className="text-indigo-400" size={18} />
                                KONTROL PROTOKOL
                            </h3>

                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-black/30 border border-white/5">
                                    <label className="text-[10px] text-white/30 font-bold uppercase tracking-wider block mb-2">
                                        UBAH STATUS SISTEM
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={transaction.status}
                                            onChange={handleStatusUpdate}
                                            className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-xs font-mono font-bold text-white focus:border-accent appearance-none uppercase tracking-wide cursor-pointer"
                                        >
                                            {transactionStatusOptions.map(
                                                (opt) => (
                                                    <option
                                                        key={opt.value}
                                                        value={opt.value}
                                                    >
                                                        {opt.label}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                        <ChevronRight
                                            className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-white/30 pointer-events-none"
                                            size={14}
                                        />
                                    </div>
                                </div>

                                {transaction.transaction_type === "CREDIT" && (
                                    <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CreditCard
                                                size={14}
                                                className="text-blue-400"
                                            />
                                            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                                                TENOR FINANSIAL
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <span className="text-2xl font-black text-white">
                                                {credit_detail?.tenor || 0}
                                            </span>
                                            <span className="text-[10px] font-mono text-white/40 mb-1">
                                                BULAN
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-6 bg-gradient-to-br from-indigo-900/40 to-black rounded-3xl border border-indigo-500/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <h4 className="text-indigo-400 font-bold font-display uppercase tracking-wider text-sm mb-2 relative z-10">
                                SISTEM HELP CENTER
                            </h4>
                            <p className="text-white/60 text-xs font-mono leading-relaxed relative z-10 mb-4">
                                Jika terjadi anomali data, segera hubungi
                                departemen IT atau verifikasi input pengguna
                                secara manual.
                            </p>
                            <div className="flex gap-2 relative z-10">
                                <button className="flex-1 py-2 bg-indigo-500/20 hover:bg-indigo-500 hover:text-white text-indigo-300 rounded text-[10px] font-bold uppercase tracking-wider transition-colors border border-indigo-500/30">
                                    LOG ERROR
                                </button>
                                <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-white/60 rounded text-[10px] font-bold uppercase tracking-wider transition-colors border border-white/5">
                                    MANUAL
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
