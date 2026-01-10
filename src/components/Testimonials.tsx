"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Budi Santoso",
        role: "CEO, TechStart",
        content: "Ayung Project sangat profesional. Website yang mereka buat sangat cepat dan desainnya modern. Sangat puas dengan hasilnya!",
        rating: 5,
    },
    {
        name: "Siti Aminah",
        role: "Owner, Cafe Kopi",
        content: "Desain logo dan branding untuk cafe saya sangat bagus. Banyak pelanggan yang memuji desainnya. Terima kasih Ayung Project!",
        rating: 5,
    },
    {
        name: "Rizky Pratama",
        role: "Marketing Manager",
        content: "Layanan social media management-nya sangat membantu meningkatkan engagement di Instagram kami. Recommended!",
        rating: 5,
    },
];

const Testimonials = () => {
    return (
        <section id="testimonials" className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-semibold tracking-wide uppercase text-sm mb-2"
                    >
                        Testimoni
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    >
                        Apa Kata Klien Kami?
                    </motion.h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-50 p-4 md:p-8 rounded-xl md:rounded-2xl border border-gray-100 relative"
                        >
                            <div className="flex gap-0.5 md:gap-1 mb-2 md:mb-4">
                                {[...Array(item.rating)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-gray-600 mb-3 md:mb-6 italic text-xs md:text-base line-clamp-4 md:line-clamp-none">"{item.content}"</p>
                            <div className="flex items-center gap-2 md:gap-4">
                                <div className="w-8 h-8 md:w-12 md:h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold text-sm md:text-xl flex-shrink-0">
                                    {item.name.charAt(0)}
                                </div>
                                <div className="min-w-0">
                                    <h4 className="font-bold text-gray-900 text-xs md:text-base truncate">{item.name}</h4>
                                    <p className="text-[10px] md:text-sm text-gray-500 truncate">{item.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
