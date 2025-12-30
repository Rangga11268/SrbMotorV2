import React, { useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import FloatingWhatsApp from "@/Components/FloatingWhatsApp";
import ComparisonFloatingBar from "@/Components/ComparisonFloatingBar";
import { Toaster } from "react-hot-toast";

export default function MainLayout({ children, title }) {
    const { flash } = usePage().props;

    useEffect(() => {
        const handleAnchorClick = (e) => {
            const targetId = e.target.getAttribute("href");
            if (targetId && targetId.startsWith("#") && targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 100;
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

        const anchors = document.querySelectorAll('a[href^="#"]');
        anchors.forEach((anchor) =>
            anchor.addEventListener("click", handleAnchorClick)
        );

        return () => {
            anchors.forEach((anchor) =>
                anchor.removeEventListener("click", handleAnchorClick)
            );
        };
    }, []);

    return (
        <>
            <Head title={title} />
            <div className="min-h-screen flex flex-col font-sans text-text-main bg-surface-light selection:bg-primary selection:text-white">
                <Navbar />
                <main className="flex-grow pt-24">{children}</main>
                <Footer />
                <Toaster
                    position="top-center"
                    toastOptions={{
                        className: "!rounded-2xl !font-medium !shadow-xl",
                        style: {
                            background: "#1e293b",
                            color: "#fff",
                        },
                    }}
                />
                <FloatingWhatsApp />
                <ComparisonFloatingBar />
            </div>
        </>
    );
}
