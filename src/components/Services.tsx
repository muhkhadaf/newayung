"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const Services = () => {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const { data, error } = await supabase
                    .from("services")
                    .select("*")
                    .order("created_at", { ascending: true });

                if (error) throw error;
                if (data) setServices(data);
            } catch (error) {
                console.error("Error fetching services:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (loading) {
        return (
            <section id="services" className="py-20 bg-gray-50/50">
                <div className="container mx-auto px-4 md:px-8 text-center">
                    <p>Loading services...</p>
                </div>
            </section>
        );
    }

    return (
        <section id="services" className="py-20 bg-gray-50/50">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-semibold tracking-wide uppercase text-sm mb-2"
                    >
                        Layanan Kami
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    >
                        Solusi Kreatif untuk Kebutuhan Anda
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-600"
                    >
                        Kami menyediakan berbagai layanan desain dan pengembangan website dengan kualitas terbaik dan harga terjangkau.
                    </motion.p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id || index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden relative ${service.border_color || "group-hover:border-blue-200"}`}
                        >
                            <Link href={`/services/${service.id}`} className="block h-full">
                                {/* Decorative background blob */}
                                <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 blur-3xl transition-all duration-500 group-hover:opacity-40 ${(service.accent || "bg-blue-100").split(" ")[0]}`} />

                                <div className="relative w-full h-32 md:h-64 overflow-hidden bg-gray-50/50 p-3 md:p-6">
                                    {/* Inner decorative ring */}
                                    <div className={`absolute inset-0 border-[10px] border-white/50 rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                    {service.image ? (
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            className="object-contain p-2 md:p-4 relative z-10 drop-shadow-sm group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                                    )}
                                </div>

                                <div className="p-4 md:p-8 relative">
                                    <div className="flex items-center justify-end mb-2 md:mb-4">
                                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gray-300 group-hover:bg-primary transition-colors" />
                                    </div>

                                    <h4 className="text-sm md:text-xl font-bold text-gray-900 mb-1 md:mb-3 group-hover:text-primary transition-colors line-clamp-1 md:line-clamp-none">{service.title}</h4>
                                    <p className="text-gray-600 mb-3 md:mb-6 text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-none">{service.description}</p>

                                    <div className="flex items-center justify-between pt-3 md:pt-6 border-t border-gray-100 group-hover:border-gray-200 transition-colors">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] md:text-xs text-gray-400 font-medium uppercase">Mulai dari</span>
                                            <span className="text-sm md:text-xl font-bold text-gray-900">Rp {service.price}</span>
                                        </div>
                                        <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-5 md:h-5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
