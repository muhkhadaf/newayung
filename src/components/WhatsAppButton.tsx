"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
    return (
        <motion.a
            href="https://wa.me/6289602981841"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-colors flex items-center justify-center group"
        >
            <FaWhatsapp className="w-8 h-8" />
            <span className="absolute right-full mr-4 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Chat via WhatsApp
            </span>
        </motion.a>
    );
};

export default WhatsAppButton;
