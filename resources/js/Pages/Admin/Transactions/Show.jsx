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
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function Show({ transaction }) {
    const { credit_detail, motor, user } = transaction;
    const documents = credit_detail?.documents || [];

    // Calculate Credit Progress
    const paidInstallments =
        transaction.installments?.filter((i) => i.status === "paid").length ||
        0;
    const totalInstallments = credit_detail?.tenor || 0;
    const progressPercentage =
        totalInstallments > 0
            ? Math.round((paidInstallments / totalInstallments) * 100)
            : 0;
    const nextInstallment = transaction.installments?.find(
        (i) => i.status !== "paid" && i.installment_number > 0
    );

    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        type: "info",
        title: "",
        message: "",
        onConfirm: () => {},
        confirmText: "Confirm",
    });
    const [processingAction, setProcessingAction] = useState(false);

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
            return "bg-yellow-100 text-yellow-700";
        if (
            ["ditolak", "data_tidak_valid", "cancelled", "rejected"].includes(
                status
            )
        )
            return "bg-red-100 text-red-700";
        return "bg-blue-100 text-blue-700";
    };

    const formatStatus = (status) =>
        status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

    const formatPaymentMethod = (method) => {
        if (!method) return "-";
        const map = {
            midtrans_bca_va: "BCA Virtual Account",
            midtrans_bri_va: "BRI Virtual Account",
            midtrans_bni_va: "BNI Virtual Account",
            midtrans_mandiri_bill: "Mandiri Bill",
            midtrans_gopay: "GoPay",
            midtrans_shopeepay: "ShopeePay",
            midtrans_indomaret: "Indomaret",
            midtrans_alfamart: "Alfamart",
            transfer: "Transfer Manual",
            cash: "Tunai",
        };
        if (map[method]) return map[method];
        return method.replace("midtrans_", "").replace(/_/g, " ").toUpperCase();
    };

    // WhatsApp Link Logic
    const getVALink = () => {
        const phone = transaction.customer_phone || user?.phone_number;
        if (!phone) return "#";
        const cleanNumber = phone.replace(/[^0-9]/g, "");
        const waNumber = cleanNumber.startsWith("0")
            ? "62" + cleanNumber.slice(1)
            : cleanNumber;
        return `https://wa.me/${waNumber}`;
    };

    // Conditional Status Options
    const getStatusOptions = () => {
        if (transaction.transaction_type === "CASH") {
            return [
                { value: "new_order", label: "Pesanan Baru" },
                { value: "waiting_payment", label: "Menunggu Pembayaran" },
                {
                    value: "payment_confirmed",
                    label: "Pembayaran Dikonfirmasi",
                },
                { value: "unit_preparation", label: "Persiapan Unit" },
                { value: "ready_for_delivery", label: "Siap Dikirim" },
                { value: "completed", label: "Selesai" },
                { value: "cancelled", label: "Dibatalkan" },
            ];
        } else {
            return [
                {
                    value: "menunggu_persetujuan",
                    label: "Menunggu Persetujuan",
                },
                { value: "data_tidak_valid", label: "Data Tidak Valid" },
                {
                    value: "dikirim_ke_surveyor",
                    label: "Dikirim ke Surveyor",
                    disabled: !checkDocumentsComplete(),
                },
                { value: "jadwal_survey", label: "Jadwal Survey" },
                { value: "disetujui", label: "Disetujui" },
                { value: "ditolak", label: "Ditolak" },
                { value: "completed", label: "Selesai" },
            ];
        }
    };

    // Check if documents are complete
    const checkDocumentsComplete = () => {
        // Use property from backend populated in controller
        return transaction.documents_complete !== false;
    };

    // Update Status Handler
    const handleStatusUpdate = (e) => {
        const newStatus = e.target.value;
        setModalConfig({
            isOpen: true,
            title: "Update Status?",
            message: `Apakah anda yakin ingin mengubah status transaksi menjadi "${formatStatus(
                newStatus
            )}"?`,
            type: "info",
            confirmText: "Ya, Update",
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
                    toast.success("Status berhasil diperbarui");
                },
                onError: () => {
                    setProcessingAction(false);
                    toast.error("Gagal memperbarui status");
                },
            }
        );
    };

    const confirmDelete = () => {
        setModalConfig({
            isOpen: true,
            title: "Hapus Transaksi?",
            message:
                "Apakah anda yakin ingin menghapus transaksi ini? Tindakan ini tidak dapat dibatalkan.",
            type: "danger",
            confirmText: "Hapus",
            onConfirm: () => processDelete(),
        });
    };

    const processDelete = () => {
        setProcessingAction(true);
        router.delete(route("admin.transactions.destroy", transaction.id), {
            onSuccess: () => {
                setProcessingAction(false);
                setModalConfig((prev) => ({ ...prev, isOpen: false }));
                toast.success("Transaksi berhasil dihapus");
            },
            onError: () => {
                setProcessingAction(false);
                toast.error("Gagal menghapus transaksi");
            },
        });
    };

    // Installment Action Handlers
    const approvePayment = (installmentId) => {
        if (confirm("Apakah anda yakin ingin menyetujui pembayaran ini?")) {
            router.post(
                route("admin.installments.approve", installmentId),
                {},
                {
                    onSuccess: () => toast.success("Pembayaran disetujui"),
                    onError: () => toast.error("Gagal memproses"),
                }
            );
        }
    };

    const rejectPayment = (installmentId) => {
        if (confirm("Apakah anda yakin ingin menolak pembayaran ini?")) {
            router.post(
                route("admin.installments.reject", installmentId),
                {},
                {
                    onSuccess: () => toast.success("Pembayaran ditolak"),
                    onError: () => toast.error("Gagal memproses"),
                }
            );
        }
    };

    // Document Upload Form
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
                toast.success("Dokumen berhasil diunggah");
            },
            onError: () => toast.error("Gagal mengunggah dokumen"),
        });
    };

    const confirmDeleteDocument = (docId) => {
        setModalConfig({
            isOpen: true,
            title: "Hapus Dokumen?",
            message:
                "Apakah anda yakin ingin menghapus dokumen ini? Tindakan ini tidak dapat dibatalkan.",
            type: "danger",
            confirmText: "Hapus",
            onConfirm: () => processDeleteDocument(docId),
        });
    };

    const processDeleteDocument = (docId) => {
        setProcessingAction(true);
        router.delete(route("admin.transactions.delete_document", docId), {
            onSuccess: () => {
                setProcessingAction(false);
                setModalConfig((prev) => ({ ...prev, isOpen: false }));
                toast.success("Dokumen berhasil dihapus");
            },
            onError: () => {
                setProcessingAction(false);
                toast.error("Gagal menghapus dokumen");
            },
        });
    };

    return (
        <AdminLayout title={`Detail Transaksi #${transaction.id}`}>
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

            <div className="max-w-7xl mx-auto">
                <Link
                    href={route("admin.transactions.index")}
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-6 font-medium transition-colors"
                >
                    <ArrowLeft size={20} /> Kembali ke Daftar Transaksi
                </Link>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* LEFT COLUMN: Main Data (66%) */}
                    <div className="xl:col-span-2 space-y-6">
                        {/* 1. Motor Info */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Bike className="text-primary" size={20} />{" "}
                                Detail Unit
                            </h3>
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <div className="w-full sm:w-48 h-32 bg-gray-100 rounded-xl overflow-hidden shrink-0 border border-gray-200 relative group">
                                    {motor?.image_path ? (
                                        <img
                                            src={`/storage/${motor.image_path}`}
                                            alt={motor.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <Bike />
                                        </div>
                                    )}
                                    <Link
                                        href={route(
                                            "admin.motors.show",
                                            motor.id
                                        )}
                                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                                    >
                                        <span className="text-white text-xs font-bold border border-white/50 px-3 py-1 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors">
                                            Lihat Detail Motor
                                        </span>
                                    </Link>
                                </div>
                                <div className="flex-1 text-center sm:text-left space-y-2">
                                    <div>
                                        <h4 className="text-2xl font-black text-gray-900 leading-tight">
                                            {motor?.name}
                                        </h4>
                                        <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                                            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-gray-100 text-gray-600 border border-gray-200 uppercase">
                                                {motor?.brand}
                                            </span>
                                            <span className="text-gray-400 text-xs font-medium">
                                                •
                                            </span>
                                            <span className="text-gray-600 font-medium">
                                                {motor?.year}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">
                                            Harga Cash
                                        </p>
                                        <p className="text-primary font-bold text-xl">
                                            Rp{" "}
                                            {new Intl.NumberFormat(
                                                "id-ID"
                                            ).format(motor?.price || 0)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Installment History (For Credit) */}
                        {transaction.transaction_type === "CREDIT" &&
                            transaction.installments &&
                            transaction.installments.length > 0 && (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                            <Clock
                                                className="text-primary"
                                                size={20}
                                            />
                                            Riwayat Angsuran
                                        </h3>
                                        <div className="flex gap-2">
                                            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-bold border border-green-100">
                                                Lunas: {paidInstallments}
                                            </span>
                                            <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs font-bold border border-gray-200">
                                                Sisa:{" "}
                                                {totalInstallments -
                                                    paidInstallments}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="overflow-hidden">
                                        <div className="max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                                            <table className="w-full text-sm text-left relative">
                                                <thead className="text-xs text-gray-500 uppercase bg-gray-50/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-10 shadow-sm">
                                                    <tr>
                                                        <th className="px-6 py-4 font-bold tracking-wider">
                                                            Bulan Ke
                                                        </th>
                                                        <th className="px-6 py-4 font-bold tracking-wider">
                                                            Jatuh Tempo
                                                        </th>
                                                        <th className="px-6 py-4 font-bold tracking-wider">
                                                            Nominal
                                                        </th>
                                                        <th className="px-6 py-4 font-bold tracking-wider">
                                                            Metode
                                                        </th>
                                                        <th className="px-6 py-4 font-bold tracking-wider">
                                                            Bukti
                                                        </th>
                                                        <th className="px-6 py-4 font-bold tracking-wider">
                                                            Status
                                                        </th>
                                                        <th className="px-6 py-4 text-right font-bold tracking-wider">
                                                            Aksi
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100 bg-white">
                                                    {transaction.installments.map(
                                                        (inst) => (
                                                            <tr
                                                                key={inst.id}
                                                                className="hover:bg-gray-50/80 transition-colors"
                                                            >
                                                                <td className="px-6 py-4 font-bold text-gray-900">
                                                                    {inst.installment_number ===
                                                                    0 ? (
                                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs">
                                                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                                                            DP
                                                                        </span>
                                                                    ) : (
                                                                        `#${inst.installment_number}`
                                                                    )}
                                                                </td>
                                                                <td className="px-6 py-4 text-gray-600">
                                                                    {new Date(
                                                                        inst.due_date
                                                                    ).toLocaleDateString(
                                                                        "id-ID",
                                                                        {
                                                                            day: "numeric",
                                                                            month: "short",
                                                                            year: "numeric",
                                                                        }
                                                                    )}
                                                                </td>
                                                                <td className="px-6 py-4 font-bold font-mono text-gray-700">
                                                                    Rp{" "}
                                                                    {new Intl.NumberFormat(
                                                                        "id-ID"
                                                                    ).format(
                                                                        inst.amount
                                                                    )}
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    {inst.payment_method ? (
                                                                        <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                                                            {formatPaymentMethod(
                                                                                inst.payment_method
                                                                            )}
                                                                        </span>
                                                                    ) : (
                                                                        <span className="text-gray-400">
                                                                            -
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    {inst.payment_proof ? (
                                                                        <a
                                                                            href={`/storage/${inst.payment_proof}`}
                                                                            target="_blank"
                                                                            className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-medium text-xs hover:underline transition-all"
                                                                        >
                                                                            <Eye
                                                                                size={
                                                                                    14
                                                                                }
                                                                            />{" "}
                                                                            Lihat
                                                                        </a>
                                                                    ) : (
                                                                        <span className="text-gray-400">
                                                                            -
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <span
                                                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                                                                            inst.status ===
                                                                            "paid"
                                                                                ? "bg-green-50 text-green-700 border-green-100"
                                                                                : inst.status ===
                                                                                  "waiting_approval"
                                                                                ? "bg-orange-50 text-orange-700 border-orange-100"
                                                                                : inst.status ===
                                                                                  "overdue"
                                                                                ? "bg-red-50 text-red-700 border-red-100"
                                                                                : "bg-gray-50 text-gray-500 border-gray-100"
                                                                        }`}
                                                                    >
                                                                        {inst.status ===
                                                                            "paid" && (
                                                                            <CheckCircle
                                                                                size={
                                                                                    10
                                                                                }
                                                                            />
                                                                        )}
                                                                        {inst.status ===
                                                                            "waiting_approval" && (
                                                                            <Clock
                                                                                size={
                                                                                    10
                                                                                }
                                                                            />
                                                                        )}
                                                                        {inst.status ===
                                                                            "overdue" && (
                                                                            <AlertTriangle
                                                                                size={
                                                                                    10
                                                                                }
                                                                            />
                                                                        )}
                                                                        {formatStatus(
                                                                            inst.status
                                                                        )}
                                                                    </span>
                                                                </td>
                                                                <td className="px-6 py-4 text-right">
                                                                    {inst.status ===
                                                                        "waiting_approval" && (
                                                                        <div className="flex justify-end gap-2">
                                                                            <button
                                                                                onClick={() =>
                                                                                    approvePayment(
                                                                                        inst.id
                                                                                    )
                                                                                }
                                                                                className="p-1.5 bg-green-100 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all shadow-sm"
                                                                                title="Setujui Pembayaran"
                                                                            >
                                                                                <CheckCircle
                                                                                    size={
                                                                                        18
                                                                                    }
                                                                                />
                                                                            </button>
                                                                            <button
                                                                                onClick={() =>
                                                                                    rejectPayment(
                                                                                        inst.id
                                                                                    )
                                                                                }
                                                                                className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                                                                title="Tolak Pembayaran"
                                                                            >
                                                                                <XCircle
                                                                                    size={
                                                                                        18
                                                                                    }
                                                                                />
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                    {inst.status ===
                                                                        "paid" && (
                                                                        <span className="text-green-500 flex justify-end">
                                                                            <CheckCircle
                                                                                size={
                                                                                    20
                                                                                }
                                                                                className="opacity-50"
                                                                            />
                                                                        </span>
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

                        {/* 3. Documents Section */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <Upload
                                        className="text-primary"
                                        size={20}
                                    />
                                    Dokumen Pendukung
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    {documents.length > 0
                                        ? `${documents.length} dokumen telah diunggah`
                                        : "Belum ada dokumen yang diunggah"}
                                </p>
                            </div>

                            <div className="p-6">
                                {/* Upload Form */}
                                <form
                                    onSubmit={handleUpload}
                                    className="mb-8 p-6 bg-blue-50/50 rounded-2xl border border-dashed border-blue-200 hover:border-blue-300 transition-colors"
                                >
                                    <div className="flex flex-col md:flex-row gap-4 items-end">
                                        <div className="w-full md:w-1/3">
                                            <label className="block text-xs font-bold text-gray-700 mb-2">
                                                Jenis Dokumen
                                            </label>
                                            <div className="relative">
                                                <select
                                                    value={
                                                        docData.document_type
                                                    }
                                                    onChange={(e) =>
                                                        setDocData(
                                                            "document_type",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full pl-4 pr-10 py-2.5 bg-white rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer hover:border-blue-300"
                                                    required
                                                >
                                                    <option value="">
                                                        Pilih Jenis...
                                                    </option>
                                                    <option value="KTP">
                                                        KTP
                                                    </option>
                                                    <option value="KK">
                                                        Kartu Keluarga
                                                    </option>
                                                    <option value="SLIP_GAJI">
                                                        Slip Gaji
                                                    </option>
                                                    <option value="BPKB">
                                                        BPKB
                                                    </option>
                                                    <option value="STNK">
                                                        STNK
                                                    </option>
                                                    <option value="FAKTUR">
                                                        Faktur
                                                    </option>
                                                    <option value="LAINNYA">
                                                        Lainnya
                                                    </option>
                                                </select>
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                                    <svg
                                                        width="12"
                                                        height="12"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path d="m6 9 6 6 6-6" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2">
                                            <label className="block text-xs font-bold text-gray-700 mb-2">
                                                File Dokumen
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    id="file-upload"
                                                    onChange={(e) =>
                                                        setDocData(
                                                            "document_file",
                                                            e.target.files[0]
                                                        )
                                                    }
                                                    className="hidden"
                                                    required
                                                />
                                                <label
                                                    htmlFor="file-upload"
                                                    className="flex items-center justify-between w-full px-4 py-2.5 bg-white rounded-xl border border-gray-200 cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-all text-sm group"
                                                >
                                                    <span
                                                        className={`truncate ${
                                                            docData.document_file
                                                                ? "text-gray-800 font-medium"
                                                                : "text-gray-400"
                                                        }`}
                                                    >
                                                        {docData.document_file
                                                            ? docData
                                                                  .document_file
                                                                  .name
                                                            : "Pilih file..."}
                                                    </span>
                                                    <div className="bg-gray-100 p-1 rounded-lg group-hover:bg-blue-100 group-hover:text-blue-600 text-gray-500 transition-colors">
                                                        <Upload size={16} />
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-auto">
                                            <button
                                                type="submit"
                                                disabled={docProcessing}
                                                className="w-full md:w-auto px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0 disabled:shadow-none flex items-center justify-center gap-2"
                                            >
                                                {docProcessing ? (
                                                    <>
                                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        <span>Proses...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Upload size={16} />
                                                        <span>Upload</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </form>

                                {/* Document List */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {documents && documents.length > 0 ? (
                                        documents.map((doc) => (
                                            <div
                                                key={doc.id}
                                                className="group p-4 bg-white border border-gray-100 rounded-xl hover:shadow-lg hover:border-blue-100 transition-all duration-300 relative"
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className="bg-blue-50 text-blue-600 p-3 rounded-xl shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                                        <FileText size={20} />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p
                                                            className="font-bold text-gray-900 text-sm truncate"
                                                            title={
                                                                doc.document_type
                                                            }
                                                        >
                                                            {doc.document_type}
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {new Date(
                                                                doc.created_at
                                                            ).toLocaleDateString()}
                                                        </p>
                                                        <div className="flex flex-wrap gap-2 mt-3">
                                                            <a
                                                                href={`/storage/${doc.file_path}`}
                                                                target="_blank"
                                                                className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-xs font-bold hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-1"
                                                            >
                                                                <Eye
                                                                    size={12}
                                                                />{" "}
                                                                Lihat
                                                            </a>
                                                            <a
                                                                href={`/storage/${doc.file_path}`}
                                                                download
                                                                className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-xs font-bold hover:bg-green-50 hover:text-green-600 transition-colors flex items-center gap-1"
                                                            >
                                                                <Download
                                                                    size={12}
                                                                />{" "}
                                                                Unduh
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() =>
                                                            confirmDeleteDocument(
                                                                doc.id
                                                            )
                                                        }
                                                        className="absolute top-2 right-2 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                                        title="Hapus Dokumen"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full py-12 flex flex-col items-center justify-center text-center text-gray-400 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                                            <Upload
                                                size={48}
                                                className="mb-4 opacity-20"
                                            />
                                            <p className="font-medium">
                                                Belum ada dokumen yang diunggah.
                                            </p>
                                            <p className="text-xs mt-1 opacity-70">
                                                Gunakan form di atas untuk
                                                mengunggah dokumen baru.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Sidebar (33%) */}
                    <div className="xl:col-span-1 space-y-6">
                        {/* 1. Status & Management Panel */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">
                                            ID Transaksi
                                        </p>
                                        <h1 className="text-xl font-black text-gray-900">
                                            #{transaction.id}
                                        </h1>
                                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                            <Clock size={12} />
                                            {new Date(
                                                transaction.created_at
                                            ).toLocaleString("id-ID")}
                                        </p>
                                    </div>
                                    <div
                                        className={`px-3 py-1 rounded-lg text-xs font-bold border capitalize ${
                                            transaction.transaction_type ===
                                            "CASH"
                                                ? "bg-green-50 text-green-700 border-green-100"
                                                : "bg-purple-50 text-purple-700 border-purple-100"
                                        }`}
                                    >
                                        {transaction.transaction_type === "CASH"
                                            ? "TUNAI"
                                            : "KREDIT"}
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <span
                                        className={`block w-full text-center py-2 rounded-xl text-sm font-bold capitalize ${getStatusColor(
                                            transaction.status
                                        )}`}
                                    >
                                        {formatStatus(transaction.status)}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-2">
                                        Update Status
                                    </label>
                                    <div className="relative">
                                        <select
                                            className="w-full pl-4 pr-10 py-2.5 bg-white rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-medium text-sm appearance-none"
                                            value={transaction.status}
                                            onChange={handleStatusUpdate}
                                        >
                                            {getStatusOptions().map((opt) => (
                                                <option
                                                    key={opt.value}
                                                    value={opt.value}
                                                    disabled={opt.disabled}
                                                >
                                                    {opt.label}{" "}
                                                    {opt.disabled
                                                        ? "(Dokumen Belum Lengkap)"
                                                        : ""}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                            <svg
                                                width="12"
                                                height="12"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="m6 9 6 6 6-6" />
                                            </svg>
                                        </div>
                                    </div>

                                    {transaction.transaction_type ===
                                        "CREDIT" &&
                                        !checkDocumentsComplete() && (
                                            <div className="mt-3 text-xs text-orange-600 bg-orange-50 p-3 rounded-xl border border-orange-100 flex items-start gap-2">
                                                <AlertTriangle
                                                    size={14}
                                                    className="shrink-0 mt-0.5"
                                                />
                                                <span>
                                                    Dokumen belum lengkap.
                                                    Beberapa status dibatasi.
                                                </span>
                                            </div>
                                        )}
                                </div>

                                <div className="grid grid-cols-2 gap-2 pt-2">
                                    <a
                                        href={getVALink()}
                                        target="_blank"
                                        className="col-span-1 flex flex-col items-center justify-center gap-1 py-3 bg-green-50 text-green-700 rounded-xl font-bold text-xs hover:bg-green-100 transition-colors border border-green-100"
                                    >
                                        <MessageCircle size={18} /> WhatsApp
                                    </a>
                                    <a
                                        href={`mailto:${user?.email}`}
                                        className="col-span-1 flex flex-col items-center justify-center gap-1 py-3 bg-blue-50 text-blue-700 rounded-xl font-bold text-xs hover:bg-blue-100 transition-colors border border-blue-100"
                                    >
                                        <Mail size={18} /> Email
                                    </a>
                                </div>
                                <a
                                    href={route(
                                        "admin.transactions.invoice.download",
                                        transaction.id
                                    )}
                                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors"
                                >
                                    <Printer size={16} /> Cetak Invoice
                                </a>
                                <button
                                    onClick={confirmDelete}
                                    className="flex items-center justify-center gap-2 w-full py-2.5 text-red-600 rounded-xl font-bold text-sm hover:bg-red-50 transition-colors border border-transparent hover:border-red-100"
                                >
                                    <Trash2 size={16} /> Hapus Transaksi
                                </button>
                            </div>
                        </div>

                        {/* 2. Credit Summary (Vertical Stack) */}
                        {transaction.transaction_type === "CREDIT" &&
                            credit_detail && (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-blue-50/30">
                                        <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                                            <FileText
                                                className="text-blue-600"
                                                size={18}
                                            />
                                            Ringkasan Kredit
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={route(
                                                    "admin.transactions.edit",
                                                    transaction.id
                                                )}
                                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm"
                                                title="Edit Detail Kredit"
                                            >
                                                <Edit size={14} />
                                            </Link>
                                            <span
                                                className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusColor(
                                                    credit_detail.credit_status
                                                )}`}
                                            >
                                                {formatStatus(
                                                    credit_detail.credit_status
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 space-y-5">
                                        {/* Progress */}
                                        <div>
                                            <div className="flex justify-between items-end mb-2">
                                                <span className="text-xs font-bold text-gray-500 uppercase">
                                                    Progress Pembayaran
                                                </span>
                                                <span className="text-sm font-black text-primary">
                                                    {progressPercentage}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                                <div
                                                    className="bg-primary h-2 rounded-full"
                                                    style={{
                                                        width: `${progressPercentage}%`,
                                                    }}
                                                ></div>
                                            </div>
                                            <p className="text-xs text-center mt-2 text-gray-500">
                                                <span className="font-bold text-gray-900">
                                                    {paidInstallments}
                                                </span>{" "}
                                                dari {totalInstallments}{" "}
                                                angsuran lunas
                                            </p>
                                        </div>

                                        <div className="space-y-4 pt-4 border-t border-gray-100">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500">
                                                    Uang Muka
                                                </span>
                                                <span className="text-base font-bold text-gray-900">
                                                    Rp{" "}
                                                    {new Intl.NumberFormat(
                                                        "id-ID"
                                                    ).format(
                                                        credit_detail.down_payment
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500">
                                                    Angsuran/Bulan
                                                </span>
                                                <span className="text-base font-bold text-green-600">
                                                    Rp{" "}
                                                    {new Intl.NumberFormat(
                                                        "id-ID"
                                                    ).format(
                                                        credit_detail.monthly_installment
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500">
                                                    Tenor
                                                </span>
                                                <span className="text-base font-bold text-gray-900">
                                                    {credit_detail.tenor} Bulan
                                                </span>
                                            </div>
                                        </div>

                                        {nextInstallment && (
                                            <div className="mt-4 p-3 bg-orange-50 border border-orange-100 rounded-xl">
                                                <p className="text-xs text-orange-600 font-bold mb-1 flex items-center gap-1">
                                                    <AlertTriangle size={10} />{" "}
                                                    Tagihan Berikutnya
                                                </p>
                                                <p className="text-sm font-bold text-orange-800">
                                                    {new Date(
                                                        nextInstallment.due_date
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                        {
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </p>
                                                <p className="text-xs text-orange-700 mt-0.5">
                                                    Rp{" "}
                                                    {new Intl.NumberFormat(
                                                        "id-ID"
                                                    ).format(
                                                        nextInstallment.amount
                                                    )}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                        {/* 3. Customer Info (Compact) */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <User className="text-gray-400" size={18} />{" "}
                                Data Pelanggan
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0 font-bold text-lg">
                                        {(
                                            transaction.customer_name ||
                                            user?.name ||
                                            "?"
                                        ).charAt(0)}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-bold text-gray-900 truncate">
                                            {transaction.customer_name ||
                                                user?.name ||
                                                "-"}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {user?.email || "-"}
                                        </p>
                                    </div>
                                </div>
                                <div className="pt-3 border-t border-gray-50 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">
                                            Telepon
                                        </span>
                                        <span className="font-medium text-gray-900">
                                            {transaction.customer_phone || "-"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">
                                            Pekerjaan
                                        </span>
                                        <span className="font-medium text-gray-900">
                                            {transaction.customer_occupation ||
                                                "-"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
