import React, { useState } from "react";
import { Head, useForm, usePage, Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import {
    User,
    Mail,
    Lock,
    Save,
    ArrowLeft,
    AlertCircle,
    CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Edit({ user }) {
    const { flash } = usePage().props;
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <MainLayout title="Edit Profil">
            <div className="bg-gray-50 min-h-screen py-10">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="mb-6">
                            <Link
                                href={route("profile.show")}
                                className="text-gray-500 hover:text-orange-500 font-medium flex items-center gap-2 transition-colors"
                            >
                                <ArrowLeft size={18} /> Kembali ke Profil
                            </Link>
                        </div>

                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                            <div className="p-8 pb-0 border-b border-gray-100">
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                    Edit Profil
                                </h1>
                                <p className="text-gray-500 mb-6">
                                    Kelola informasi profil dan keamanan akun
                                    Anda
                                </p>

                                <div className="flex gap-8">
                                    <button
                                        onClick={() => setActiveTab("profile")}
                                        className={`pb-4 px-2 font-bold text-sm transition-colors relative ${
                                            activeTab === "profile"
                                                ? "text-orange-500"
                                                : "text-gray-500 hover:text-gray-700"
                                        }`}
                                    >
                                        Informasi Profil
                                        {activeTab === "profile" && (
                                            <motion.div
                                                layoutId="tab-underline"
                                                className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500 rounded-t-full"
                                            />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("password")}
                                        className={`pb-4 px-2 font-bold text-sm transition-colors relative ${
                                            activeTab === "password"
                                                ? "text-orange-500"
                                                : "text-gray-500 hover:text-gray-700"
                                        }`}
                                    >
                                        Ubah Password
                                        {activeTab === "password" && (
                                            <motion.div
                                                layoutId="tab-underline"
                                                className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500 rounded-t-full"
                                            />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="p-8">
                                {flash.success && (
                                    <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 flex items-center gap-3 border border-green-100">
                                        <CheckCircle size={20} />{" "}
                                        {flash.success}
                                    </div>
                                )}

                                {flash.error && (
                                    <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 flex items-center gap-3 border border-red-100">
                                        <AlertCircle size={20} /> {flash.error}
                                    </div>
                                )}

                                {activeTab === "profile" ? (
                                    <UpdateProfileForm user={user} />
                                ) : (
                                    <UpdatePasswordForm />
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </MainLayout>
    );
}

function UpdateProfileForm({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("profile.update"));
    };

    return (
        <form onSubmit={submit}>
            <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2 text-sm">
                    Nama Lengkap
                </label>
                <div className="relative">
                    <User
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                    />
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50 focus:bg-white transition-colors"
                        placeholder="Nama Lengkap"
                    />
                </div>
                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
            </div>

            <div className="mb-8">
                <label className="block text-gray-700 font-bold mb-2 text-sm">
                    Alamat Email
                </label>
                <div className="relative">
                    <Mail
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                    />
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50 focus:bg-white transition-colors"
                        placeholder="Email"
                    />
                </div>
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={processing}
                className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-colors flex items-center gap-2 shadow-lg disabled:opacity-70"
            >
                <Save size={18} /> Simpan Perubahan
            </button>
        </form>
    );
}

function UpdatePasswordForm() {
    const { data, setData, put, processing, errors, reset } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("profile.password.update"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <form onSubmit={submit}>
            <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2 text-sm">
                    Password Saat Ini
                </label>
                <div className="relative">
                    <Lock
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                    />
                    <input
                        type="password"
                        value={data.current_password}
                        onChange={(e) =>
                            setData("current_password", e.target.value)
                        }
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50 focus:bg-white transition-colors"
                        placeholder="Password Saat Ini"
                    />
                </div>
                {errors.current_password && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.current_password}
                    </p>
                )}
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2 text-sm">
                    Password Baru
                </label>
                <div className="relative">
                    <Lock
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                    />
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50 focus:bg-white transition-colors"
                        placeholder="Password Baru"
                    />
                </div>
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.password}
                    </p>
                )}
            </div>

            <div className="mb-8">
                <label className="block text-gray-700 font-bold mb-2 text-sm">
                    Konfirmasi Password Baru
                </label>
                <div className="relative">
                    <Lock
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                    />
                    <input
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50 focus:bg-white transition-colors"
                        placeholder="Ulangi Password Baru"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={processing}
                className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-colors flex items-center gap-2 shadow-lg disabled:opacity-70"
            >
                <Save size={18} /> Ubah Password
            </button>
        </form>
    );
}
