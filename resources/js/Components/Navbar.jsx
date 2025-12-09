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

    const navLinkClasses =
        "text-gray-700 hover:text-primary font-medium text-lg transition-all duration-300 relative group";

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? "bg-white/90 backdrop-blur-md shadow-lg py-3"
                    : "bg-transparent py-5"
            }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center text-3xl font-extrabold text-dark-blue tracking-tight"
                >
                    <img
                        src="/assets/icon/logo trans.png"
                        alt="SRB Motors"
                        className="h-10 mr-2 drop-shadow-md"
                    />
                    SRB<span className="text-primary italic">Motors</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-8 items-center">
                    <Link href="/#home" className={navLinkClasses}>
                        Home
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link href="/about" className={navLinkClasses}>
                        Tentang Kami
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link href="/motors" className={navLinkClasses}>
                        Motor
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                </nav>

                {/* Auth Buttons / User Menu */}
                <div className="hidden md:flex items-center relative gap-4">
                    {auth.user ? (
                        <div className="relative">
                            <button
                                onClick={toggleUserMenu}
                                className="flex items-center space-x-2 text-gray-700 hover:text-primary font-bold bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 px-5 py-2.5 rounded-full transition-all shadow-sm hover:shadow-md"
                            >
                                <User size={20} />
                                <span>{auth.user.name}</span>
                            </button>

                            {/* Dropdown */}
                            <AnimatePresence>
                                {isUserMenuOpen && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: 10,
                                            scale: 0.95,
                                        }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{
                                            opacity: 0,
                                            y: 10,
                                            scale: 0.95,
                                        }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl py-2 border border-gray-100 overflow-hidden"
                                    >
                                        <div className="px-4 py-2 border-b border-gray-50 mb-2">
                                            <p className="text-sm text-gray-500">
                                                Login sebagai
                                            </p>
                                            <p className="font-bold text-dark-blue truncate">
                                                {auth.user.email}
                                            </p>
                                        </div>

                                        <Link
                                            href={route("profile.show")}
                                            className="block px-4 py-2 text-gray-700 hover:bg-primary/5 hover:text-primary flex items-center transition-colors"
                                        >
                                            <UserCircle
                                                size={18}
                                                className="mr-3"
                                            />
                                            Profil Saya
                                        </Link>
                                        <Link
                                            href={route(
                                                "motors.user-transactions"
                                            )}
                                            className="block px-4 py-2 text-gray-700 hover:bg-primary/5 hover:text-primary flex items-center transition-colors"
                                        >
                                            <List size={18} className="mr-3" />
                                            Riwayat Pemesanan
                                        </Link>
                                        {auth.user.is_admin && (
                                            <Link
                                                href={route("admin.dashboard")}
                                                className="block px-4 py-2 text-gray-700 hover:bg-primary/5 hover:text-primary flex items-center transition-colors"
                                            >
                                                <LayoutDashboard
                                                    size={18}
                                                    className="mr-3"
                                                />
                                                Admin Panel
                                            </Link>
                                        )}
                                        <div className="border-t border-gray-100 my-1"></div>
                                        <Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className="w-full text-left block px-4 py-2 text-red-600 hover:bg-red-50 flex items-center transition-colors"
                                        >
                                            <LogOut
                                                size={18}
                                                className="mr-3"
                                            />
                                            Logout
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <Link
                            href={route("login")}
                            className="flex items-center space-x-2 bg-primary text-white px-7 py-2.5 rounded-full font-bold hover:bg-dark-blue transition-all shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5"
                        >
                            <span>Login</span>
                            <User size={18} />
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={toggleMobileMenu}
                        className="text-gray-800 hover:text-primary p-2 focus:outline-none"
                    >
                        {isMobileMenuOpen ? (
                            <X size={32} />
                        ) : (
                            <Menu size={32} />
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
                        className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 overflow-hidden shadow-xl"
                    >
                        <nav className="flex flex-col p-6 space-y-4">
                            <Link
                                href="/#home"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-gray-800 font-bold text-lg hover:text-primary block py-2 border-b border-gray-100"
                            >
                                Home
                            </Link>
                            <Link
                                href="/about"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-gray-800 font-bold text-lg hover:text-primary block py-2 border-b border-gray-100"
                            >
                                Tentang Kami
                            </Link>
                            <Link
                                href="/motors"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-gray-800 font-bold text-lg hover:text-primary block py-2 border-b border-gray-100"
                            >
                                Motor
                            </Link>

                            {auth.user ? (
                                <div className="pt-2">
                                    <div className="py-2 font-bold text-primary flex items-center gap-2 mb-2">
                                        <User size={20} /> Hi, {auth.user.name}
                                    </div>
                                    <div className="grid grid-cols-1 gap-2 pl-4">
                                        <Link
                                            href={route("profile.show")}
                                            className="text-gray-600 hover:text-primary py-2 flex items-center gap-2"
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
                                            className="text-gray-600 hover:text-primary py-2 flex items-center gap-2"
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                        >
                                            <List size={18} /> Riwayat Pemesanan
                                        </Link>
                                        {auth.user.is_admin && (
                                            <Link
                                                href={route("admin.dashboard")}
                                                className="text-gray-600 hover:text-primary py-2 flex items-center gap-2"
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
                                            className="text-red-500 hover:text-red-700 py-2 text-left w-full flex items-center gap-2"
                                        >
                                            <LogOut size={18} /> Logout
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    href={route("login")}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block text-center bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-dark-blue transition-colors mt-4"
                                >
                                    Login Sekarang
                                </Link>
                            )}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
