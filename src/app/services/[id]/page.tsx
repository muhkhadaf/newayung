"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Check, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [service, setService] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchService = async () => {
            try {
                const { data, error } = await supabase
                    .from("services")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (error) throw error;
                if (data) setService(data);
            } catch (error) {
                console.error("Error fetching service:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">Loading service details...</p>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <p className="text-gray-500 mb-4">Service not found.</p>
                <Link href="/" className="text-primary hover:underline">
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Header / Navigation */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="container mx-auto px-4 md:px-8 py-4">
                    <Link href="/#services" className="inline-flex items-center text-gray-600 hover:text-primary transition-colors">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Services
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
                <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-0">
                        {/* Image Section */}
                        <div className="relative h-64 md:h-auto bg-gray-100 p-8 flex items-center justify-center overflow-hidden">
                            {/* Decorative Background */}
                            <div className={`absolute inset-0 opacity-10 ${(service.accent || "bg-blue-100").split(" ")[0]}`} />
                            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white opacity-20 blur-3xl" />

                            {service.image ? (
                                <div className="relative w-full h-full min-h-[300px]">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-contain p-4 drop-shadow-lg"
                                    />
                                </div>
                            ) : (
                                <div className="text-gray-400">No Image Available</div>
                            )}
                        </div>

                        {/* Content Section */}
                        <div className="p-6 md:p-12 flex flex-col">
                            <div className="mb-6">
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{service.title}</h1>
                                <div className="text-2xl font-bold text-primary">
                                    <span className="text-sm text-gray-500 font-normal uppercase mr-2">Mulai dari</span>
                                    Rp {service.price}
                                </div>
                            </div>

                            <div className="prose prose-gray max-w-none mb-8">
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    {service.long_description || service.description}
                                </p>
                            </div>

                            {service.features && service.features.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Included:</h3>
                                    <ul className="space-y-3">
                                        {service.features.map((feature: string, index: number) => (
                                            <li key={index} className="flex items-start">
                                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5 mr-3">
                                                    <Check className="w-3.5 h-3.5 text-green-600" />
                                                </div>
                                                <span className="text-gray-600">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="mt-auto pt-8 border-t border-gray-100">
                                <a
                                    href={`https://wa.me/6281234567890?text=Halo, saya tertarik dengan layanan ${service.title}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                                >
                                    <MessageCircle className="w-5 h-5 mr-2" />
                                    Pesan Sekarang via WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
