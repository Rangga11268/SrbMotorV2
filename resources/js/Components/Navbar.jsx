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
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

    const navLinkClasses =
        "text-gray-800 hover:text-orange-500 font-medium text-lg transition-colors duration-300";

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
            }`}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center text-2xl font-bold text-gray-800"
                >
                    <img
                        src="/assets/icon/logo trans.png"
                        alt="SRB Motors"
                        className="h-10 mr-2"
                    />
                    SRB<span className="text-orange-500">Motors</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-8 items-center">
                    <Link href="/#home" className={navLinkClasses}>
                        Home
                    </Link>
                    <Link href="/about" className={navLinkClasses}>
                        Tentang Kami
                    </Link>
                    <Link href="/motors" className={navLinkClasses}>
                        Motor
                    </Link>
                </nav>

                {/* Auth Buttons / User Menu */}
                <div className="hidden md:flex items-center relative">
                    {auth.user ? (
                        <div className="relative">
                            <button
                                onClick={toggleUserMenu}
                                className="flex items-center space-x-2 text-gray-800 hover:text-orange-500 font-medium bg-gray-100 px-4 py-2 rounded-full transition-colors"
                            >
                                <User size={20} />
                                <span>{auth.user.name}</span>
                            </button>

                            {/* Dropdown */}
                            <AnimatePresence>
                                {isUserMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 border border-gray-100 overflow-hidden"
                                    >
                                        <Link
                                            href={route("profile.show")}
                                            className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-500 flex items-center"
                                        >
                                            <UserCircle
                                                size={16}
                                                className="mr-2"
                                            />{" "}
                                            Profil Saya
                                        </Link>
                                        <Link
                                            href={route(
                                                "motors.user-transactions"
                                            )}
                                            className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-500 flex items-center"
                                        >
                                            <List size={16} className="mr-2" />{" "}
                                            Riwayat Pemesanan
                                        </Link>
                                        {auth.user.is_admin && ( // Assuming boolean or helper equivalent
                                            <Link
                                                href={route("admin.dashboard")}
                                                className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-500 flex items-center"
                                            >
                                                <LayoutDashboard
                                                    size={16}
                                                    className="mr-2"
                                                />{" "}
                                                Admin Panel
                                            </Link>
                                        )}
                                        <div className="border-t border-gray-100 my-1"></div>
                                        <Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className="w-full text-left block px-4 py-2 text-red-600 hover:bg-red-50 flex items-center"
                                        >
                                            <LogOut
                                                size={16}
                                                className="mr-2"
                                            />{" "}
                                            Logout
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <Link
                            href={route("login")}
                            className="flex items-center space-x-2 bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
                        className="text-gray-800 hover:text-orange-500 p-2"
                    >
                        {isMobileMenuOpen ? (
                            <X size={28} />
                        ) : (
                            <Menu size={28} />
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
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <nav className="flex flex-col p-4 space-y-4">
                            <Link
                                href="/#home"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-gray-800 font-medium hover:text-orange-500 block py-2 border-b border-gray-50"
                            >
                                Home
                            </Link>
                            <Link
                                href="/about"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-gray-800 font-medium hover:text-orange-500 block py-2 border-b border-gray-50"
                            >
                                Tentang Kami
                            </Link>
                            <Link
                                href="/motors"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-gray-800 font-medium hover:text-orange-500 block py-2 border-b border-gray-50"
                            >
                                Motor
                            </Link>

                            {auth.user ? (
                                <>
                                    <div className="py-2 font-bold text-orange-500">
                                        Hi, {auth.user.name}
                                    </div>
                                    <Link
                                        href={route("profile.show")}
                                        className="text-gray-600 hover:text-orange-500 pl-4 py-1 block"
                                    >
                                        Profil Saya
                                    </Link>
                                    <Link
                                        href={route("motors.user-transactions")}
                                        className="text-gray-600 hover:text-orange-500 pl-4 py-1 block"
                                    >
                                        Riwayat Pemesanan
                                    </Link>
                                    {auth.user.is_admin && (
                                        <Link
                                            href={route("admin.dashboard")}
                                            className="text-gray-600 hover:text-orange-500 pl-4 py-1 block"
                                        >
                                            Admin Panel
                                        </Link>
                                    )}
                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        className="text-red-500 hover:text-red-700 pl-4 py-1 block text-left w-full"
                                    >
                                        Logout
                                    </Link>
                                </>
                            ) : (
                                <Link
                                    href={route("login")}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-center bg-orange-500 text-white py-3 rounded-lg font-bold shadow-md hover:bg-orange-600"
                                >
                                    Login
                                </Link>
                            )}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
