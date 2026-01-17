"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { supabase } from "@/lib/supabase";

const categories = ["Logo Design", "Web Development", "Company Profile", "Social Media", "Desain Lainnya"];

const FAQ = () => {
    const [activeCategory, setActiveCategory] = useState("Logo Design");
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [faqs, setFaqs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const { data, error } = await supabase
                    .from("faqs")
                    .select("*")
                    .order("created_at", { ascending: true });

                if (error) throw error;
                if (data) setFaqs(data);
            } catch (error) {
                console.error("Error fetching FAQs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFaqs();
    }, []);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const filteredFaqs = faqs.filter(faq => faq.category === activeCategory);

    if (loading) {
        return (
            <section id="faq" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 md:px-8 text-center">
                    <p>Loading FAQs...</p>
                </div>
            </section>
        );
    }

    return (
        <section id="faq" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-semibold tracking-wide uppercase text-sm mb-2"
                    >
                        FAQ
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    >
                        Pertanyaan Umum
                    </motion.h3>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
                    {categories.map((category, index) => (
                        <motion.button
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 + index * 0.05 }}
                            onClick={() => {
                                setActiveCategory(category);
                                setActiveIndex(null); // Reset open accordion when switching category
                            }}
                            className={`px-4 py-2 md:px-6 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${activeCategory === category
                                ? "bg-primary text-white shadow-lg scale-105"
                                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                                }`}
                        >
                            {category}
                        </motion.button>
                    ))}
                </div>

                <div className="max-w-3xl mx-auto min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {filteredFaqs.length > 0 ? (
                                filteredFaqs.map((faq, index) => (
                                    <motion.div
                                        key={faq.id || index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="mb-4"
                                    >
                                        <button
                                            onClick={() => toggleAccordion(index)}
                                            className={`w-full flex items-center justify-between p-4 md:p-6 bg-white rounded-xl border transition-all duration-300 ${activeIndex === index
                                                ? "border-primary shadow-md"
                                                : "border-gray-200 hover:border-primary/50"
                                                }`}
                                        >
                                            <span className="text-sm md:text-lg font-semibold text-gray-800 text-left pr-4">
                                                {faq.question}
                                            </span>
                                            <span className={`flex-shrink-0 text-primary transition-transform duration-300 ${activeIndex === index ? "rotate-180" : ""}`}>
                                                {activeIndex === index ? <Minus className="w-4 h-4 md:w-6 md:h-6" /> : <Plus className="w-4 h-4 md:w-6 md:h-6" />}
                                            </span>
                                        </button>
                                        <AnimatePresence>
                                            {activeIndex === index && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="p-4 md:p-6 pt-0 bg-white border-x border-b border-primary rounded-b-xl text-xs md:text-base text-gray-600 leading-relaxed">
                                                        {faq.answer}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center text-gray-500 py-8">
                                    Belum ada pertanyaan untuk kategori ini.
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
