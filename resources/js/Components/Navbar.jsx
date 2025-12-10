import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    Menu,
    X,
    User,
    LogOut,
    LayoutDashboard,
    List,
    UserCircle,
    ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const { auth } = usePage().props;
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

    const navLinkClasses = (isActive) =>
        `relative px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
            isActive || isScrolled
                ? "text-gray-800 hover:bg-gray-100"
                : "text-gray-800 hover:bg-white/20"
        }`;

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
                isScrolled
                    ? "bg-white/80 backdrop-blur-xl shadow-lg py-3 border-b border-gray-100/50"
                    : "bg-transparent py-4"
            }`}
        >
            <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center text-3xl font-extrabold text-dark-blue tracking-tight hover:scale-[1.02] transition-transform"
                >
                    <img
                        src="/assets/icon/logo trans.png"
                        alt="SRB Motors"
                        className="h-10 mr-2 drop-shadow-md"
                    />
                    SRB<span className="text-primary italic">Motors</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1 bg-white/50 backdrop-blur-md p-1.5 rounded-full border border-white/20 shadow-sm">
                    <Link href="/#home" className={navLinkClasses(false)}>
                        Home
                    </Link>
                    <Link href="/about" className={navLinkClasses(false)}>
                        Tentang Kami
                    </Link>
                    <Link href="/motors" className={navLinkClasses(false)}>
                        Katalog Motor
                    </Link>
                </nav>

                {/* Auth Buttons / User Menu */}
                <div className="hidden md:flex items-center gap-4">
                    {auth.user ? (
                        <div className="relative">
                            <button
                                onClick={toggleUserMenu}
                                className={`flex items-center gap-2 px-1 pr-3 py-1 rounded-full transition-all border ${
                                    isScrolled
                                        ? "bg-gray-50 border-gray-200 hover:border-primary/50"
                                        : "bg-white/80 border-white/50 hover:bg-white shadow-sm"
                                }`}
                            >
                                <div className="w-9 h-9 bg-gradient-to-br from-primary to-dark-blue rounded-full text-white flex items-center justify-center shadow-md">
                                    <span className="font-bold text-sm">
                                        {auth.user.name.charAt(0)}
                                    </span>
                                </div>
                                <span className="font-bold text-sm text-gray-700 max-w-[100px] truncate">
                                    {auth.user.name.split(" ")[0]}
                                </span>
                                <ChevronDown
                                    size={14}
                                    className="text-gray-400"
                                />
                            </button>

                            {/* Desktop Dropdown */}
                            <AnimatePresence>
                                {isUserMenuOpen && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: 15,
                                            scale: 0.95,
                                        }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{
                                            opacity: 0,
                                            y: 10,
                                            scale: 0.95,
                                        }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl py-2 border border-white/50 overflow-hidden ring-1 ring-black/5"
                                    >
                                        <div className="px-5 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">
                                                Akun Saya
                                            </p>
                                            <p className="font-bold text-gray-900 truncate text-base">
                                                {auth.user.name}
                                            </p>
                                            <p className="text-xs text-primary truncate">
                                                {auth.user.email}
                                            </p>
                                        </div>

                                        <div className="p-2">
                                            <Link
                                                href={route("profile.show")}
                                                className="group flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 rounded-xl hover:bg-blue-50 hover:text-primary transition-all"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all text-gray-500 group-hover:text-primary">
                                                    <UserCircle size={18} />
                                                </div>
                                                Profil Saya
                                            </Link>
                                            <Link
                                                href={route(
                                                    "motors.user-transactions"
                                                )}
                                                className="group flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 rounded-xl hover:bg-blue-50 hover:text-primary transition-all"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all text-gray-500 group-hover:text-primary">
                                                    <List size={18} />
                                                </div>
                                                Riwayat Pesanan
                                            </Link>

                                            {auth.user.role === "admin" && (
                                                <Link
                                                    href={route(
                                                        "admin.dashboard"
                                                    )}
                                                    className="group flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-all"
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all text-orange-500">
                                                        <LayoutDashboard
                                                            size={18}
                                                        />
                                                    </div>
                                                    Admin Panel
                                                </Link>
                                            )}
                                        </div>

                                        <div className="border-t border-gray-100 mt-1 p-2">
                                            <Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 rounded-xl hover:bg-red-50 transition-all"
                                            >
                                                <LogOut size={18} />
                                                Keluar
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                href={route("login")}
                                className="px-6 py-2.5 rounded-full font-bold text-sm bg-white/80 backdrop-blur-sm border border-white/50 text-gray-800 hover:bg-white transition-all shadow-sm hover:shadow-md"
                            >
                                Masuk
                            </Link>
                            <Link
                                href={route("register")}
                                className="px-6 py-2.5 rounded-full font-bold text-sm bg-primary text-white hover:bg-dark-blue transition-all shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5"
                            >
                                Daftar
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMobileMenu}
                        className={`p-2 rounded-xl transition-all ${
                            isScrolled
                                ? "bg-gray-100 text-gray-800"
                                : "bg-white/20 text-gray-800 backdrop-blur-sm"
                        }`}
                    >
                        {isMobileMenuOpen ? (
                            <X size={24} />
                        ) : (
                            <Menu size={24} />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-xl overflow-hidden rounded-b-[2rem]"
                    >
                        <div className="p-6 space-y-2">
                            <Link
                                href="/#home"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-800 font-bold"
                            >
                                Home
                            </Link>
                            <Link
                                href="/about"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-800 font-bold"
                            >
                                Tentang Kami
                            </Link>
                            <Link
                                href="/motors"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-800 font-bold"
                            >
                                Katalog Motor
                            </Link>

                            <div className="border-t border-gray-100 my-2 pt-2">
                                {auth.user ? (
                                    <>
                                        <div className="px-4 py-2 flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                                                {auth.user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">
                                                    {auth.user.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {auth.user.email}
                                                </p>
                                            </div>
                                        </div>
                                        <Link
                                            href={route("profile.show")}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 text-gray-600 hover:text-primary font-medium"
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                        >
                                            <UserCircle size={18} /> Profil Saya
                                        </Link>
                                        <Link
                                            href={route(
                                                "motors.user-transactions"
                                            )}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 text-gray-600 hover:text-primary font-medium"
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                        >
                                            <List size={18} /> Riwayat Pesanan
                                        </Link>
                                        {auth.user.role === "admin" && (
                                            <Link
                                                href={route("admin.dashboard")}
                                                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-50 text-gray-600 hover:text-orange-500 font-medium"
                                                onClick={() =>
                                                    setIsMobileMenuOpen(false)
                                                }
                                            >
                                                <LayoutDashboard size={18} />{" "}
                                                Admin Panel
                                            </Link>
                                        )}
                                        <Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-500 font-bold mt-2"
                                        >
                                            <LogOut size={18} /> Keluar
                                        </Link>
                                    </>
                                ) : (
                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <Link
                                            href={route("login")}
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                            className="py-3 text-center rounded-xl font-bold bg-gray-100 text-gray-800 hover:bg-gray-200"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href={route("register")}
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                            className="py-3 text-center rounded-xl font-bold bg-primary text-white hover:bg-dark-blue shadow-lg"
                                        >
                                            Daftar
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
