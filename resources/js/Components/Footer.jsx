import React from "react";
import { Link } from "@inertiajs/react";
import {
    Facebook,
    Instagram,
    Phone,
    Mail,
    MapPin,
    ArrowRight,
} from "lucide-react";

export default function Footer() {
    return (
        <section className="bg-gray-900 border-t border-gray-800 pt-16 pb-8 text-gray-300 font-sans">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Logo Box */}
                <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2 mb-4">
                        <img
                            src="/assets/icon/logo trans.png"
                            alt="SRB Motors Logo"
                            className="h-12"
                        />
                        <h3 className="text-2xl font-bold text-white">
                            SRB <span className="text-primary">MOTORS</span>
                        </h3>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Mitra terpercaya Anda dalam menemukan motor impian.
                        Kualitas terjamin, harga kompetitif.
                    </p>
                </div>

                {/* Branches */}
                <div className="flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">
                        Cabang Kami
                    </h3>
                    <a
                        href="#"
                        className="flex items-center gap-2 hover:text-primary transition-colors mb-3"
                    >
                        <MapPin size={18} className="text-primary" /> Bekasi
                    </a>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">
                        Quick Links
                    </h3>
                    {[
                        { href: "/#home", label: "Home" },
                        { href: "/#advantages", label: "Keunggulan" },
                        { href: "/#popular-motors", label: "Motor Populer" },
                        { href: "/about", label: "Tentang Kami" },
                        { href: "/motors", label: "Galeri" },
                        { href: "/#contact", label: "Kontak" },
                    ].map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="flex items-center gap-2 hover:text-primary transition-colors mb-3 group"
                        >
                            <ArrowRight
                                size={14}
                                className="text-primary transition-transform group-hover:translate-x-1"
                            />
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Contact Info */}
                <div className="flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">
                        Contact Info
                    </h3>
                    <a
                        href="tel:08978638849"
                        className="flex items-center gap-2 hover:text-primary transition-colors mb-3"
                    >
                        <Phone size={18} className="text-primary" /> 08978638849
                    </a>
                    <a
                        href="tel:08978638973"
                        className="flex items-center gap-2 hover:text-primary transition-colors mb-3"
                    >
                        <Phone size={18} className="text-primary" /> 08978638973
                    </a>
                    <a
                        href="mailto:darrelrangga@gmail.com"
                        className="flex items-center gap-2 hover:text-primary transition-colors mb-3"
                    >
                        <Mail size={18} className="text-primary" />{" "}
                        darrelrangga@gmail.com
                    </a>
                    <a
                        href="https://maps.google.com/?q=Jl%20lori%20sakti%20Rt%2001%20Rw%2001%20No%2022%20Kaliabang%20tengah%20Bekasi%20utara"
                        target="_blank"
                        className="flex items-start gap-2 hover:text-primary transition-colors mb-3"
                    >
                        <MapPin
                            size={18}
                            className="text-primary mt-1 flex-shrink-0"
                        />
                        <span>
                            Jl lori sakti Rt 01 Rw 01 No 22 Kaliabang tengah
                            Bekasi utara
                        </span>
                    </a>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
                &copy; 2024 Created by{" "}
                <span className="text-primary">SRB Team</span> | All Rights
                Reserved
            </div>
        </section>
    );
}
