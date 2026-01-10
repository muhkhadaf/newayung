"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "#hero" },
        { name: "Tentang Kami", href: "#about" },
        { name: "Layanan", href: "#services" },
        { name: "Portfolio", href: "#portfolio" },
        { name: "Testimoni", href: "#testimonials" },
        { name: "FAQ", href: "#faq" },
    ];

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-md py-4" : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-primary">
                    Ayung<span className="text-gray-800">Project</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-gray-700 hover:text-primary font-medium transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="#contact"
                        className="bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-primary-dark transition-colors"
                    >
                        Hubungi Kami
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-800 focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg overflow-hidden"
                    >
                        <div className="flex flex-col p-4 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-gray-700 hover:text-primary font-medium block"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="#contact"
                                className="bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-primary-dark transition-colors text-center block"
                                onClick={() => setIsOpen(false)}
                            >
                                Hubungi Kami
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
