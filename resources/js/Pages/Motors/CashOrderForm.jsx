import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import {
    CreditCard,
    User,
    Phone,
    Briefcase,
    FileText,
    DollarSign,
    Calendar,
    ArrowLeft,
    CheckCircle,
    Zap,
    MessageSquare,
    Wallet,
} from "lucide-react";
import { motion } from "framer-motion";

export default function CashOrderForm({ motor }) {
    const { data, setData, post, processing, errors } = useForm({
        customer_name: "",
        customer_phone: "",
        customer_occupation: "",
        notes: "",
        booking_fee: 0,
        payment_method: "",
    });

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const submit = (e) => {
        e.preventDefault();
        if (data.booking_fee >= motor.price) {
            alert("Booking fee cannot differ from motor price.");
            return;
        }
        post(route("motors.process-cash-order", motor.id));
    };

    return (
        <MainLayout title={`Cash Order - ${motor.name}`}>
            <div className="bg-surface-dark min-h-screen text-white pt-20">
                {/* Fixed Back Button */}
                <div className="fixed top-24 left-4 z-50 lg:left-8">
                    <Link
                        href={route("motors.show", motor.id)}
                        className="w-12 h-12 bg-black/50 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-accent hover:text-black transition-all duration-300 group"
                    >
                        <ArrowLeft
                            size={20}
                            className="group-hover:-translate-x-1 transition-transform"
                        />
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">
                    {/* LEFT: VISUAL SUMMARY */}
                    <div className="relative hidden lg:flex flex-col justify-center items-center bg-zinc-900 overflow-hidden p-12">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent/5 to-transparent z-0"></div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative z-10 w-full max-w-lg"
                        >
                            <h2 className="text-[10vw] font-display font-black text-white/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap select-none">
                                CASH
                            </h2>
                            <img
                                src={`/storage/${motor.image_path}`}
                                alt={motor.name}
                                className="w-full object-contain drop-shadow-2xl relative z-20"
                            />
                        </motion.div>

                        <div className="relative z-10 mt-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-full max-w-md">
                            <h3 className="text-2xl font-bold font-display uppercase tracking-wider mb-1">
                                {motor.name}
                            </h3>
                            <p className="text-accent font-bold text-xl mb-6">
                                {formatCurrency(motor.price)}
                            </p>

                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                                <div className="flex items-center gap-2">
                                    <Calendar
                                        size={14}
                                        className="text-accent"
                                    />{" "}
                                    {motor.year}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Zap size={14} className="text-accent" />{" "}
                                    {motor.type}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: COMMAND CENTER FORM */}
                    <div className="relative p-6 lg:p-12 xl:p-20 flex flex-col justify-center">
                        <div className="max-w-xl mx-auto w-full">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-10"
                            >
                                <h1 className="text-4xl md:text-5xl font-display font-black mb-2">
                                    SECURE{" "}
                                    <span className="text-accent">ORDER</span>
                                </h1>
                                <p className="text-gray-400">
                                    Complete your cash purchase details.
                                </p>
                            </motion.div>

                            <form onSubmit={submit} className="space-y-6">
                                {/* Personal Details */}
                                <div className="space-y-6">
                                    <div className="group">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block group-focus-within:text-accent transition-colors">
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={data.customer_name}
                                                onChange={(e) =>
                                                    setData(
                                                        "customer_name",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full bg-zinc-900/50 border-b border-white/10 px-0 py-4 text-lg font-bold text-white focus:border-accent focus:outline-none transition-colors pl-8"
                                                placeholder="Enter full name"
                                                required
                                            />
                                            <User
                                                size={18}
                                                className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors"
                                            />
                                        </div>
                                        {errors.customer_name && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.customer_name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="group">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block group-focus-within:text-accent transition-colors">
                                                Phone Number
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="tel"
                                                    value={data.customer_phone}
                                                    onChange={(e) =>
                                                        setData(
                                                            "customer_phone",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full bg-zinc-900/50 border-b border-white/10 px-0 py-4 text-lg font-bold text-white focus:border-accent focus:outline-none transition-colors pl-8"
                                                    placeholder="08..."
                                                    required
                                                />
                                                <Phone
                                                    size={18}
                                                    className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors"
                                                />
                                            </div>
                                            {errors.customer_phone && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.customer_phone}
                                                </p>
                                            )}
                                        </div>

                                        <div className="group">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block group-focus-within:text-accent transition-colors">
                                                Occupation
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={
                                                        data.customer_occupation
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "customer_occupation",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full bg-zinc-900/50 border-b border-white/10 px-0 py-4 text-lg font-bold text-white focus:border-accent focus:outline-none transition-colors pl-8"
                                                    placeholder="Current job"
                                                    required
                                                />
                                                <Briefcase
                                                    size={18}
                                                    className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors"
                                                />
                                            </div>
                                            {errors.customer_occupation && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.customer_occupation}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Financials */}
                                <div className="pt-8 border-t border-white/5 space-y-6">
                                    <div className="group">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block group-focus-within:text-accent transition-colors">
                                            Booking Fee (Optional)
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={data.booking_fee}
                                                onChange={(e) =>
                                                    setData(
                                                        "booking_fee",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full bg-zinc-900/50 border-b border-white/10 px-0 py-4 text-lg font-bold text-white focus:border-accent focus:outline-none transition-colors pl-8"
                                                placeholder="0"
                                                min="0"
                                            />
                                            <DollarSign
                                                size={18}
                                                className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors"
                                            />
                                        </div>
                                        {errors.booking_fee && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.booking_fee}
                                            </p>
                                        )}
                                    </div>

                                    <div className="group">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block group-focus-within:text-accent transition-colors">
                                            Payment Method
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={data.payment_method}
                                                onChange={(e) =>
                                                    setData(
                                                        "payment_method",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full bg-zinc-900/50 border-b border-white/10 px-0 py-4 text-lg font-bold text-white focus:border-accent focus:outline-none transition-colors pl-8 appearance-none"
                                                required
                                            >
                                                <option
                                                    value=""
                                                    disabled
                                                    className="bg-zinc-900"
                                                >
                                                    Select Method
                                                </option>
                                                <option
                                                    value="online"
                                                    className="bg-zinc-900"
                                                >
                                                    Online Payment (VA, QRIS,
                                                    E-Wallet)
                                                </option>
                                                <option
                                                    value="cod_dealer"
                                                    className="bg-zinc-900"
                                                >
                                                    Cash at Dealer / COD
                                                </option>
                                            </select>
                                            <Wallet
                                                size={18}
                                                className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors"
                                            />
                                        </div>
                                        {errors.payment_method && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.payment_method}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Notes */}
                                <div className="group">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block group-focus-within:text-accent transition-colors">
                                        Additional Notes
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            value={data.notes}
                                            onChange={(e) =>
                                                setData("notes", e.target.value)
                                            }
                                            className="w-full bg-zinc-900/50 border-b border-white/10 px-0 py-4 text-lg font-bold text-white focus:border-accent focus:outline-none transition-colors pl-8 min-h-[100px] resize-none"
                                            placeholder="Any special requests?"
                                        />
                                        <MessageSquare
                                            size={18}
                                            className="absolute left-0 top-6 text-gray-600 group-focus-within:text-white transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="pt-8">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full py-5 bg-accent text-black font-display font-bold text-xl uppercase tracking-widest hover:bg-white transition-colors rounded-xl disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle size={24} />
                                        {processing
                                            ? "Processing..."
                                            : "Confirm Purchase"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
