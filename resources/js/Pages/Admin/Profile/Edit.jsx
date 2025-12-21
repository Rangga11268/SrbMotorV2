import React from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Save, User, Lock, Key } from "lucide-react";

export default function Edit({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
    });

    const {
        data: passwordData,
        setData: setPasswordData,
        put: putPassword,
        processing: passwordProcessing,
        errors: passwordErrors,
        reset: resetPassword,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const submitProfile = (e) => {
        e.preventDefault();
        put(route("admin.profile.update"));
    };

    const submitPassword = (e) => {
        e.preventDefault();
        putPassword(route("admin.profile.password.update"), {
            onSuccess: () => resetPassword(),
        });
    };

    return (
        <AdminLayout title="Profil Saya">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-gray-700">
                        <div className="w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center text-2xl font-bold">
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                Informasi Profil
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                Update informasi akun anda dan alamat email.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={submitProfile} className="max-w-xl">
                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                    Nama Lengkap
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    />
                                    <User
                                        className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500"
                                        size={18}
                                    />
                                </div>
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    />
                                    <div className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500">
                                        @
                                    </div>
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-xl font-bold hover:bg-dark-blue dark:hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                <Save size={18} /> Simpan Perubahan
                            </button>
                        </div>
                    </form>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-gray-700">
                        <div className="w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-900/30 text-orange-500 dark:text-orange-400 flex items-center justify-center font-bold">
                            <Lock size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                Update Password
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                Pastikan akun anda aman dengan password yang
                                kuat.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={submitPassword} className="max-w-xl">
                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                    Password Saat Ini
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={passwordData.current_password}
                                        onChange={(e) =>
                                            setPasswordData(
                                                "current_password",
                                                e.target.value
                                            )
                                        }
                                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    />
                                    <Key
                                        className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500"
                                        size={18}
                                    />
                                </div>
                                {passwordErrors.current_password && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {passwordErrors.current_password}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                    Password Baru
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={passwordData.password}
                                        onChange={(e) =>
                                            setPasswordData(
                                                "password",
                                                e.target.value
                                            )
                                        }
                                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    />
                                    <Lock
                                        className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500"
                                        size={18}
                                    />
                                </div>
                                {passwordErrors.password && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {passwordErrors.password}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                    Konfirmasi Password Baru
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={
                                            passwordData.password_confirmation
                                        }
                                        onChange={(e) =>
                                            setPasswordData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    />
                                    <Lock
                                        className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500"
                                        size={18}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={passwordProcessing}
                                className="flex items-center gap-2 px-6 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
                            >
                                <Save size={18} /> Update Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
