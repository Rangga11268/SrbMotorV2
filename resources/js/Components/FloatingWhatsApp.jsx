import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePage } from "@inertiajs/react";

export default function FloatingWhatsApp() {
    const { admin_phone } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);

    if (!admin_phone) return null; // Don't show if no phone configured

    // Format phone for WhatsApp URL (ensure it starts with 62)
    const formattedPhone = admin_phone.startsWith("0")
        ? "62" + admin_phone.slice(1)
        : admin_phone;

    const message =
        "Halo SRB Motor, saya butuh bantuan mengenai motor/transaksi.";
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(
        message
    )}`;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        className="bg-white p-4 rounded-2xl shadow-xl border border-gray-100 w-64 mb-2 origin-bottom-right"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-gray-900">
                                Butuh Bantuan?
                            </h4>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={16} />
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                            Tim CS kami siap membantu Anda. Klik tombol di bawah
                            untuk chat via WhatsApp.
                        </p>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center py-2 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#20bd5a] transition-colors shadow-lg shadow-green-100"
                        >
                            Chat WhatsApp
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[#25D366] text-white p-4 rounded-full shadow-lg shadow-green-200 hover:shadow-green-300 transition-all flex items-center justify-center group"
            >
                <div className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:animate-ping"></div>
                <MessageCircle size={28} className="relative z-10" />
            </motion.button>
        </div>
    );
}
