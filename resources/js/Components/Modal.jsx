import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, CheckCircle, Info } from "lucide-react";

/**
 * A reusable Modal component with modern styling and animations.
 *
 * Props:
 * - isOpen: boolean - whether the modal is visible
 * - onClose: function - handler to close the modal
 * - title: string - modal title
 * - message: string - main content message
 * - confirmText: string - text for the confirm button (default: "Confirm")
 * - cancelText: string - text for the cancel button (default: "Cancel")
 * - onConfirm: function - handler when confirm is clicked
 * - type: "danger" | "success" | "info" | "warning" - determines styling (default: "info")
 * - processing: boolean - shows loading state on confirm button
 */
export default function Modal({
    isOpen,
    onClose,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    type = "info",
    processing = false,
}) {
    // Config based on type
    const typeConfig = {
        danger: {
            icon: AlertTriangle,
            iconColor: "text-red-600",
            iconBg: "bg-red-100",
            confirmBtn: "bg-red-600 hover:bg-red-700 text-white",
            focusRing: "focus:ring-red-500",
        },
        success: {
            icon: CheckCircle,
            iconColor: "text-green-600",
            iconBg: "bg-green-100",
            confirmBtn: "bg-green-600 hover:bg-green-700 text-white",
            focusRing: "focus:ring-green-500",
        },
        warning: {
            icon: AlertTriangle,
            iconColor: "text-orange-600",
            iconBg: "bg-orange-100",
            confirmBtn: "bg-orange-600 hover:bg-orange-700 text-white",
            focusRing: "focus:ring-orange-500",
        },
        info: {
            icon: Info,
            iconColor: "text-blue-600",
            iconBg: "bg-blue-100",
            confirmBtn: "bg-blue-600 hover:bg-blue-700 text-white",
            focusRing: "focus:ring-blue-500",
        },
    };

    const config = typeConfig[type] || typeConfig.info;
    const Icon = config.icon;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-4"
                    >
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                            >
                                <X size={20} />
                            </button>

                            <div className="p-6">
                                <div className="flex items-start gap-4">
                                    {/* Icon */}
                                    <div
                                        className={`p-3 rounded-full shrink-0 ${config.iconBg}`}
                                    >
                                        <Icon
                                            className={config.iconColor}
                                            size={24}
                                        />
                                    </div>

                                    {/* Text */}
                                    <div className="flex-1 pt-1">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                                            {title}
                                        </h3>
                                        <p className="text-gray-500 leading-relaxed">
                                            {message}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-8 flex justify-end gap-3">
                                    <button
                                        onClick={onClose}
                                        disabled={processing}
                                        className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50"
                                    >
                                        {cancelText}
                                    </button>
                                    <button
                                        onClick={onConfirm}
                                        disabled={processing}
                                        className={`px-6 py-2 rounded-lg font-bold shadow-lg shadow-black/5 disabled:opacity-70 disabled:cursor-not-allowed transition-all ${config.confirmBtn} ${config.focusRing}`}
                                    >
                                        {processing
                                            ? "Processing..."
                                            : confirmText}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
