import React from "react";
import { useComparison } from "@/Contexts/ComparisonContext";
import { Link } from "@inertiajs/react"; // Correct import for Inertia Link
import { X, ArrowRight, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ComparisonFloatingBar() {
    const { selectedMotors, removeFromCompare, clearComparison } =
        useComparison();

    if (selectedMotors.length === 0) return null;

    const compareUrl = `/motors/compare?ids=${selectedMotors
        .map((m) => m.id)
        .join(",")}`;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-0 left-0 right-0 z-50 p-4"
            >
                <div className="container mx-auto max-w-4xl">
                    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-200 p-4 flex items-center justify-between backdrop-blur-lg bg-white/90">
                        <div className="flex items-center gap-4 overflow-x-auto pb-1 scrollbar-hide">
                            <div className="flex items-center gap-2 pl-2 border-r border-gray-200 pr-4 mr-2">
                                <div className="bg-primary/10 p-2 rounded-full">
                                    <Activity className="text-primary w-5 h-5" />
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                                        Bandingkan
                                    </p>
                                    <p className="font-bold text-gray-900">
                                        {selectedMotors.length} / 3 Motor
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                {selectedMotors.map((motor) => (
                                    <div
                                        key={motor.id}
                                        className="relative group min-w-[60px]"
                                    >
                                        <div className="w-16 h-16 rounded-xl border border-gray-200 bg-gray-50 p-1 flex items-center justify-center overflow-hidden">
                                            <img
                                                src={`/storage/${motor.image}`}
                                                alt={motor.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <button
                                            onClick={() =>
                                                removeFromCompare(motor.id)
                                            }
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={12} />
                                        </button>
                                        <p className="text-[10px] font-bold text-gray-600 truncate max-w-[64px] mt-1 text-center">
                                            {motor.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pl-4 border-l border-gray-200 ml-auto">
                            <button
                                onClick={clearComparison}
                                className="text-gray-400 hover:text-red-500 font-bold text-sm px-3 hidden sm:block transition-colors"
                            >
                                Reset
                            </button>
                            <Link
                                href={compareUrl}
                                className={`flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-dark-blue transition-colors shadow-lg shadow-primary/20 whitespace-nowrap ${
                                    selectedMotors.length < 2
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                }`}
                                onClick={(e) => {
                                    if (selectedMotors.length < 2) {
                                        e.preventDefault();
                                        // Maybe show a toast hint here
                                    }
                                }}
                            >
                                Bandingkan <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
