import React, { useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import FloatingWhatsApp from "@/Components/FloatingWhatsApp";
import ComparisonFloatingBar from "@/Components/ComparisonFloatingBar";

export default function MainLayout({ children, title }) {
    const { flash } = usePage().props;

    useEffect(() => {
        const handleAnchorClick = (e) => {
            const targetId = e.target.getAttribute("href");
            if (targetId && targetId.startsWith("#") && targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition =
                        targetElement.getBoundingClientRect().top;
                    const offsetPosition =
                        elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                    });
                }
            }
        };

        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", handleAnchorClick);
        });

        return () => {
            document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
                anchor.removeEventListener("click", handleAnchorClick);
            });
        };
    }, []);

    return (
        <>
            <Head title={title} />

            <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
                <Navbar />

                <main className="flex-grow">{children}</main>

                <Footer />

                <Toaster position="top-right" />

                <FloatingWhatsApp />

                <ComparisonFloatingBar />
            </div>
        </>
    );
}
