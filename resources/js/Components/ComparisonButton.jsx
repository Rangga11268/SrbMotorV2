import React from "react";
import { useComparison } from "@/Contexts/ComparisonContext";
import { CopyPlus, Check } from "lucide-react";

export default function ComparisonButton({
    motor,
    className = "",
    showText = true,
}) {
    const { addToCompare, isInComparison } = useComparison();
    const active = isInComparison(motor.id);

    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!active) addToCompare(motor);
            }}
            disabled={active}
            className={`group flex items-center justify-center gap-2 p-3 rounded-xl font-bold transition-all shadow-sm ${
                active
                    ? "bg-green-100 text-green-700 cursor-default border border-green-200"
                    : "bg-white text-gray-600 hover:text-primary hover:bg-blue-50 border border-gray-200 hover:border-blue-200"
            } ${className}`}
            title={active ? "Sudah dalam perbandingan" : "Bandingkan Motor"}
        >
            {active ? (
                <>
                    <Check size={18} />
                    {showText && (
                        <span className="hidden sm:inline text-sm">
                            Terpilih
                        </span>
                    )}
                </>
            ) : (
                <>
                    <CopyPlus
                        size={18}
                        className="group-hover:scale-110 transition-transform"
                    />
                    {showText && (
                        <span className="hidden sm:inline text-sm">
                            Bandingkan
                        </span>
                    )}
                </>
            )}
        </button>
    );
}
