import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { Eye, EyeOff, AlertCircle, LogIn } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <MainLayout title="Login">
            <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-[#f5f7fa] to-[#e4edf5] flex items-center justify-center p-4 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-3xl z-0 pointer-events-none"></div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden relative z-10 border border-white"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-10 pt-16 text-center relative text-white">
                        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-20 w-24 h-24 flex items-center justify-center">
                            <img
                                src="/assets/icon/logo trans.png"
                                alt="Logo"
                                className="w-20 h-20 object-contain"
                            />
                        </div>

                        <h2 className="text-2xl font-bold mb-2 relative z-10 text-white">
                            Selamat Datang Kembali
                        </h2>
                        <p className="text-blue-100 text-sm relative z-10 opacity-90">
                            Masuk untuk melanjutkan ke akun Anda
                        </p>
                    </div>

                    {/* Form */}
                    <div className="p-8">
                        <form onSubmit={submit}>
                            <div className="mb-5">
                                <label className="block text-gray-700 font-medium mb-2 pl-3 border-l-4 border-orange-500">
                                    Alamat Email
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white/50 focus:bg-white"
                                    placeholder="Masukkan email Anda"
                                    required
                                />
                                {errors.email && (
                                    <div className="mt-2 text-red-500 text-sm flex items-center gap-1 bg-red-50 p-2 rounded-lg">
                                        <AlertCircle size={14} /> {errors.email}
                                    </div>
                                )}
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 font-medium mb-2 pl-3 border-l-4 border-orange-500">
                                    Kata Sandi
                                </label>
                                <div className="relative">
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white/50 focus:bg-white pr-12"
                                        placeholder="Masukkan kata sandi"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={20} />
                                        ) : (
                                            <Eye size={20} />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <div className="mt-2 text-red-500 text-sm flex items-center gap-1 bg-red-50 p-2 rounded-lg">
                                        <AlertCircle size={14} />{" "}
                                        {errors.password}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between mb-6">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                "remember",
                                                e.target.checked
                                            )
                                        }
                                        className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 transition duration-150 ease-in-out"
                                    />
                                    <span className="ml-2 text-sm text-gray-600">
                                        Ingat Saya
                                    </span>
                                </label>
                                <Link
                                    href="#"
                                    className="text-sm font-medium text-orange-500 hover:text-orange-600 hover:underline"
                                >
                                    Lupa Password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <LogIn size={20} /> Masuk
                            </button>

                            <div className="mt-8 text-center pt-6 border-t border-gray-100">
                                <p className="text-gray-500">
                                    Belum punya akun?{" "}
                                    <Link
                                        href={route("register")}
                                        className="text-orange-500 font-bold hover:text-orange-600 hover:underline"
                                    >
                                        Daftar di sini
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </MainLayout>
    );
}
