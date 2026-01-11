"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { supabase } from "@/lib/supabase";

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const { data, error } = await supabase
                    .from("testimonials")
                    .select("*")
                    .eq("is_active", true)
                    .order("created_at", { ascending: false });

                if (error) throw error;
                if (data) setTestimonials(data);
            } catch (error) {
                console.error("Error fetching testimonials:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    if (loading) return null;
    if (testimonials.length === 0) return null;

    // Duplicate testimonials to create seamless loop
    const carouselTestimonials = [...testimonials, ...testimonials, ...testimonials];

    return (
        <section id="testimonials" className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-semibold tracking-wide uppercase text-sm mb-2"
                    >
                        Testimonials
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    >
                        Apa Kata Klien Kami
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-600"
                    >
                        Kepercayaan klien adalah prioritas utama kami. Berikut adalah pengalaman mereka bekerja sama dengan Ayung Project.
                    </motion.p>
                </div>

                <div className="relative w-full">
                    <div className="flex overflow-hidden">
                        <motion.div
                            className="flex gap-8"
                            animate={{
                                x: ["0%", "-50%"],
                            }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 30,
                                    ease: "linear",
                                },
                            }}
                        >
                            {carouselTestimonials.map((testimonial, index) => (
                                <div
                                    key={`${testimonial.id}-${index}`}
                                    className="bg-gray-50 p-8 rounded-2xl relative hover:shadow-lg transition-shadow duration-300 w-[350px] flex-shrink-0"
                                >
                                    <Quote className="absolute top-8 right-8 w-8 h-8 text-primary/10" />

                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        ))}
                                    </div>

                                    <p className="text-gray-600 mb-6 relative z-10 line-clamp-4">
                                        "{testimonial.message}"
                                    </p>

                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden relative shrink-0">
                                            {testimonial.image_url ? (
                                                <img
                                                    src={testimonial.image_url}
                                                    alt={testimonial.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold text-lg">
                                                    {testimonial.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 line-clamp-1">{testimonial.name}</h4>
                                            {testimonial.role && (
                                                <p className="text-sm text-primary line-clamp-1">{testimonial.role}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
