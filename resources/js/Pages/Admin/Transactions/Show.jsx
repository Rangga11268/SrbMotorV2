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
        router.put(
            route("admin.transactions.update_status", transaction.id),
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
        postDoc(route("admin.transactions.upload_document", transaction.id), {
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
                    {/* LEFT COLUMN: Main Info */}
                    <div className="xl:col-span-2 space-y-6">
                        {/* Status & General Info */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                                <div>
                                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
                                        ID Transaksi
                                    </p>
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        #{transaction.id}
                                    </h1>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span
                                        className={`px-4 py-1.5 rounded-full text-sm font-bold capitalize ${getStatusColor(
                                            transaction.status
                                        )}`}
                                    >
                                        {formatStatus(transaction.status)}
                                    </span>
                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                        <Clock size={14} />
                                        {new Date(
                                            transaction.created_at
                                        ).toLocaleString("id-ID")}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Update Status Transaksi
                                    </label>
                                    <select
                                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-gray-50 font-medium disabled:opacity-50"
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

                                    {transaction.transaction_type ===
                                        "CREDIT" &&
                                        !checkDocumentsComplete() && (
                                            <div className="mt-2 text-xs text-orange-600 bg-orange-50 p-2 rounded-lg border border-orange-100 flex items-start gap-2">
                                                <AlertTriangle
                                                    size={14}
                                                    className="shrink-0 mt-0.5"
                                                />
                                                <span>
                                                    Dokumen belum lengkap.
                                                    Beberapa status mungkin
                                                    tidak tersedia.
                                                </span>
                                            </div>
                                        )}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Tipe Transaksi
                                    </label>
                                    <div
                                        className={`px-4 py-2 rounded-xl font-bold border ${
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
                            </div>
                        </div>

                        {/* Motor Info */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Bike className="text-primary" size={20} />{" "}
                                Detail Motor
                            </h3>
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-xl overflow-hidden shrink-0 border border-gray-200">
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
                                </div>
                                <div className="flex-1 text-center sm:text-left">
                                    <h4 className="text-2xl font-bold text-gray-900">
                                        {motor?.name}
                                    </h4>
                                    <p className="text-gray-600 mb-2">
                                        {motor?.brand} - {motor?.year}
                                    </p>
                                    <p className="text-primary font-bold text-xl">
                                        Rp{" "}
                                        {new Intl.NumberFormat("id-ID").format(
                                            motor?.price || 0
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Credit Details (If Credit) */}
                        {transaction.transaction_type === "CREDIT" &&
                            credit_detail && (
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-5">
                                        <FileText
                                            size={150}
                                            className="text-primary"
                                        />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 relative z-10">
                                        <FileText
                                            className="text-primary"
                                            size={20}
                                        />{" "}
                                        Detail Kredit
                                    </h3>
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                                                Uang Muka
                                            </p>
                                            <p className="font-bold text-gray-900 text-lg">
                                                Rp{" "}
                                                {new Intl.NumberFormat(
                                                    "id-ID"
                                                ).format(
                                                    credit_detail.down_payment
                                                )}
                                            </p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                                                Tenor
                                            </p>
                                            <p className="font-bold text-gray-900 text-lg">
                                                {credit_detail.tenor} Bulan
                                            </p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                                                Angsuran/Bulan
                                            </p>
                                            <p className="font-bold text-green-600 text-lg">
                                                Rp{" "}
                                                {new Intl.NumberFormat(
                                                    "id-ID"
                                                ).format(
                                                    credit_detail.monthly_installment
                                                )}
                                            </p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                                                Status Kredit
                                            </p>
                                            <span
                                                className={`inline-block mt-1 px-2 py-1 rounded text-xs font-bold capitalize ${getStatusColor(
                                                    credit_detail.credit_status
                                                )}`}
                                            >
                                                {formatStatus(
                                                    credit_detail.credit_status
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                        {/* Installment History (For Credit) */}
                        {transaction.transaction_type === "CREDIT" &&
                            transaction.installments &&
                            transaction.installments.length > 0 && (
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <Clock
                                            className="text-primary"
                                            size={20}
                                        />{" "}
                                        Riwayat Angsuran
                                    </h3>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
                                                <tr>
                                                    <th className="px-4 py-3">
                                                        Ke
                                                    </th>
                                                    <th className="px-4 py-3">
                                                        Jatuh Tempo
                                                    </th>
                                                    <th className="px-4 py-3">
                                                        Nominal
                                                    </th>
                                                    <th className="px-4 py-3">
                                                        Metode
                                                    </th>
                                                    <th className="px-4 py-3">
                                                        Bukti
                                                    </th>
                                                    <th className="px-4 py-3">
                                                        Status
                                                    </th>
                                                    <th className="px-4 py-3 text-right">
                                                        Aksi
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {transaction.installments.map(
                                                    (inst) => (
                                                        <tr
                                                            key={inst.id}
                                                            className="hover:bg-gray-50"
                                                        >
                                                            <td className="px-4 py-3 font-medium text-gray-900">
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
                                                            </td>
                                                            <td className="px-4 py-3">
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
                                                            <td className="px-4 py-3 font-medium">
                                                                Rp{" "}
                                                                {new Intl.NumberFormat(
                                                                    "id-ID"
                                                                ).format(
                                                                    inst.amount
                                                                )}
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                {inst.payment_method ? (
                                                                    <span className="uppercase text-xs font-bold text-gray-600">
                                                                        {formatPaymentMethod(
                                                                            inst.payment_method
                                                                        )}
                                                                    </span>
                                                                ) : (
                                                                    "-"
                                                                )}
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                {inst.payment_proof ? (
                                                                    <a
                                                                        href={`/storage/${inst.payment_proof}`}
                                                                        target="_blank"
                                                                        className="text-blue-600 hover:underline flex items-center gap-1 text-xs font-bold"
                                                                    >
                                                                        <Eye
                                                                            size={
                                                                                12
                                                                            }
                                                                        />{" "}
                                                                        Lihat
                                                                    </a>
                                                                ) : (
                                                                    "-"
                                                                )}
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                <span
                                                                    className={`px-2 py-1 rounded text-xs font-bold capitalize ${
                                                                        inst.status ===
                                                                        "paid"
                                                                            ? "bg-green-100 text-green-700"
                                                                            : inst.status ===
                                                                              "waiting_approval"
                                                                            ? "bg-orange-100 text-orange-700"
                                                                            : inst.status ===
                                                                              "overdue"
                                                                            ? "bg-red-100 text-red-700"
                                                                            : "bg-gray-100 text-gray-600"
                                                                    }`}
                                                                >
                                                                    {formatStatus(
                                                                        inst.status
                                                                    )}
                                                                </span>
                                                            </td>
                                                            <td className="px-4 py-3 text-right">
                                                                {inst.status ===
                                                                    "waiting_approval" && (
                                                                    <div className="flex justify-end gap-1">
                                                                        <button
                                                                            onClick={() =>
                                                                                approvePayment(
                                                                                    inst.id
                                                                                )
                                                                            }
                                                                            className="bg-green-100 text-green-700 p-1.5 rounded hover:bg-green-200 transition-colors"
                                                                            title="Setujui"
                                                                        >
                                                                            <CheckCircle
                                                                                size={
                                                                                    16
                                                                                }
                                                                            />
                                                                        </button>
                                                                        <button
                                                                            onClick={() =>
                                                                                rejectPayment(
                                                                                    inst.id
                                                                                )
                                                                            }
                                                                            className="bg-red-100 text-red-700 p-1.5 rounded hover:bg-red-200 transition-colors"
                                                                            title="Tolak"
                                                                        >
                                                                            <XCircle
                                                                                size={
                                                                                    16
                                                                                }
                                                                            />
                                                                        </button>
                                                                    </div>
                                                                )}
                                                                {inst.status ===
                                                                    "paid" && (
                                                                    <span className="text-green-600 text-xs font-bold flex items-center justify-end gap-1">
                                                                        <CheckCircle
                                                                            size={
                                                                                14
                                                                            }
                                                                        />{" "}
                                                                        Terverifikasi
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
                            )}

                        {/* Documents Section */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Upload className="text-primary" size={20} />{" "}
                                Dokumen Pendukung
                            </h3>

                            {/* Upload Form */}
                            <form
                                onSubmit={handleUpload}
                                className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-100"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                                    <div className="md:col-span-4">
                                        <label className="block text-xs font-bold text-gray-700 mb-1">
                                            Jenis Dokumen
                                        </label>
                                        <select
                                            value={docData.document_type}
                                            onChange={(e) =>
                                                setDocData(
                                                    "document_type",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full text-sm rounded-lg border-gray-300 focus:ring-primary focus:border-primary"
                                            required
                                        >
                                            <option value="">
                                                Pilih Jenis...
                                            </option>
                                            <option value="KTP">KTP</option>
                                            <option value="KK">
                                                Kartu Keluarga
                                            </option>
                                            <option value="SLIP_GAJI">
                                                Slip Gaji
                                            </option>
                                            <option value="BPKB">BPKB</option>
                                            <option value="STNK">STNK</option>
                                            <option value="FAKTUR">
                                                Faktur
                                            </option>
                                            <option value="LAINNYA">
                                                Lainnya
                                            </option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-6">
                                        <label className="block text-xs font-bold text-gray-700 mb-1">
                                            File
                                        </label>
                                        <input
                                            type="file"
                                            onChange={(e) =>
                                                setDocData(
                                                    "document_file",
                                                    e.target.files[0]
                                                )
                                            }
                                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                            required
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <button
                                            type="submit"
                                            disabled={docProcessing}
                                            className="w-full bg-primary text-white py-2 rounded-lg text-sm font-bold shadow hover:bg-dark-blue transition-colors disabled:opacity-70"
                                        >
                                            {docProcessing ? "..." : "Upload"}
                                        </button>
                                    </div>
                                </div>
                            </form>

                            {/* Document List */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {documents && documents.length > 0 ? (
                                    documents.map((doc) => (
                                        <div
                                            key={doc.id}
                                            className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all group relative"
                                        >
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="bg-blue-50 text-primary p-2 rounded-lg shrink-0">
                                                    <FileText size={20} />
                                                </div>
                                                <div className="min-w-0">
                                                    <p
                                                        className="font-bold text-gray-800 text-sm truncate"
                                                        title={
                                                            doc.document_type
                                                        }
                                                    >
                                                        {doc.document_type}
                                                    </p>
                                                    <p className="text-xs text-gray-400 truncate">
                                                        {new Date(
                                                            doc.created_at
                                                        ).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                                                <div className="flex gap-2">
                                                    <a
                                                        href={`/storage/${doc.file_path}`}
                                                        target="_blank"
                                                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Lihat"
                                                    >
                                                        <Eye size={16} />
                                                    </a>
                                                    <a
                                                        href={`/storage/${doc.file_path}`}
                                                        download
                                                        className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                        title="Download"
                                                    >
                                                        <Download size={16} />
                                                    </a>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        confirmDeleteDocument(
                                                            doc.id
                                                        )
                                                    }
                                                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Hapus"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full text-center py-8 text-gray-400 text-sm bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                        Belum ada dokumen yang diunggah.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Customer Info & Actions */}
                    <div className="xl:col-span-1 space-y-6">
                        {/* Customer Info */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <User className="text-primary" size={20} />{" "}
                                Informasi Pelanggan
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">
                                        Nama Pelanggan
                                    </p>
                                    <p className="font-bold text-gray-900 text-lg">
                                        {transaction.customer_name ||
                                            user?.name ||
                                            "-"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">
                                        Nomor Telepon
                                    </p>
                                    <p className="font-bold text-gray-900">
                                        {transaction.customer_phone || "-"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">
                                        Email
                                    </p>
                                    <p className="font-bold text-gray-900 break-all">
                                        {user?.email || "-"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">
                                        Pekerjaan
                                    </p>
                                    <p className="font-bold text-gray-900">
                                        {transaction.customer_occupation || "-"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Actions Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                Aksi
                            </h3>
                            <div className="space-y-3">
                                <a
                                    href={`mailto:${user?.email}`}
                                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-50 text-blue-600 rounded-xl font-bold hover:bg-blue-100 transition-colors"
                                >
                                    <Mail size={18} /> Email Pelanggan
                                </a>

                                <a
                                    href={getVALink()}
                                    target="_blank"
                                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-50 text-green-600 rounded-xl font-bold hover:bg-green-100 transition-colors"
                                >
                                    <MessageCircle size={18} /> WhatsApp
                                </a>

                                <a
                                    href={route(
                                        "admin.transactions.invoice.download",
                                        transaction.id
                                    )}
                                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                                >
                                    <Printer size={18} /> Cetak Invoice
                                </a>

                                {transaction.transaction_type === "CREDIT" && (
                                    <Link
                                        href={route(
                                            "admin.transactions.edit",
                                            transaction.id
                                        )}
                                        className="flex items-center justify-center gap-2 w-full py-2.5 bg-yellow-50 text-yellow-600 rounded-xl font-bold hover:bg-yellow-100 transition-colors"
                                    >
                                        <Edit size={18} /> Edit Detail Kredit
                                    </Link>
                                )}

                                <div className="pt-3 border-t border-gray-100 mt-2">
                                    <button
                                        onClick={confirmDelete}
                                        className="flex items-center justify-center gap-2 w-full py-2.5 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-colors"
                                    >
                                        <Trash2 size={18} /> Hapus Transaksi
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
