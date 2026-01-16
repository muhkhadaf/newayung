"use client";

import { useState } from "react";
import { ArrowLeft, Check, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ServiceDetailClientProps {
    service: any;
    packages: any[];
}

export default function ServiceDetailClient({ service, packages }: ServiceDetailClientProps) {
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

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
                <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-12">
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
                                    {isDescriptionExpanded
                                        ? (service.long_description || service.description)
                                        : (service.long_description || service.description)?.slice(0, 100) + ((service.long_description || service.description)?.length > 100 ? "..." : "")
                                    }
                                </p>
                                {(service.long_description || service.description)?.length > 100 && (
                                    <button
                                        onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                                        className="text-primary font-semibold mt-2 hover:underline focus:outline-none"
                                    >
                                        {isDescriptionExpanded ? "Show Less" : "Show More"}
                                    </button>
                                )}
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

                {/* Service Packages Section */}
                {packages.length > 0 && (
                    <div className="mb-12">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pilihan Paket</h2>
                            <p className="text-gray-600">Pilih paket yang sesuai dengan kebutuhan bisnis Anda</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                            {packages.map((pkg) => (
                                <div
                                    key={pkg.id}
                                    className={`relative bg-primary rounded-xl md:rounded-3xl shadow-lg p-3 md:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col`}
                                >
                                    {pkg.is_popular && (
                                        <div className="absolute -top-2.5 md:-top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-primary px-3 md:px-6 py-0.5 md:py-1 rounded-full text-[10px] md:text-sm font-bold shadow-lg uppercase tracking-wider z-10 whitespace-nowrap">
                                            Most Popular
                                        </div>
                                    )}

                                    {/* Header - White Box */}
                                    <div className="bg-white rounded-lg md:rounded-2xl py-2 md:py-3 px-1.5 md:px-2 text-center mb-3 md:mb-6 shadow-sm mx-0 md:mx-2 mt-2">
                                        <h3 className="text-xs md:text-xl font-black text-primary uppercase tracking-wide italic truncate px-0.5" title={pkg.name}>{pkg.name}</h3>
                                    </div>

                                    <div className="text-center mb-3 md:mb-8">
                                        <div className="flex items-baseline justify-center gap-0.5 md:gap-1 mb-1 md:mb-2">
                                            <span className="text-xs md:text-lg text-yellow-400 font-bold italic">Rp.</span>
                                            <span className="text-xl md:text-5xl font-black text-yellow-400 italic tracking-tighter">{pkg.price}</span>
                                        </div>
                                        {pkg.original_price && (
                                            <div className="relative inline-block">
                                                <span className="text-[10px] md:text-lg text-gray-300 font-bold italic">Rp. {pkg.original_price}</span>
                                                <div className="absolute top-1/2 left-0 w-full h-0.5 md:h-1 bg-red-500 -rotate-6 transform origin-center rounded-full opacity-80"></div>
                                            </div>
                                        )}
                                    </div>

                                    <ul className="space-y-0 mb-3 md:mb-8 flex-1">
                                        {(pkg.features || []).map((feature: string, idx: number) => (
                                            <li key={idx} className="flex items-center py-1.5 md:py-3 border-b border-white/20 last:border-0">
                                                <div className="flex-shrink-0 w-4 h-4 md:w-6 md:h-6 rounded-full bg-white flex items-center justify-center mr-1.5 md:mr-3">
                                                    <Check className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-primary stroke-[3]" />
                                                </div>
                                                <span className="text-white font-medium text-[10px] md:text-sm uppercase tracking-wide leading-tight">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <a
                                        href={`https://wa.me/6281234567890?text=Halo, saya tertarik dengan paket ${pkg.name} untuk layanan ${service.title}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full inline-flex items-center justify-center px-2 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-bold transition-colors bg-white text-primary hover:bg-gray-100 shadow-lg uppercase tracking-wider text-[10px] md:text-base"
                                    >
                                        Pilih
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
