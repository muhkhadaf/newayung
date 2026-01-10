"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PortfolioDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const { data, error } = await supabase
                    .from("projects")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (error) throw error;
                if (data) setProject(data);
            } catch (error) {
                console.error("Error fetching project:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">Loading project details...</p>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <p className="text-gray-500 mb-4">Project not found.</p>
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
                    <Link href="/#portfolio" className="inline-flex items-center text-gray-600 hover:text-primary transition-colors">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Portfolio
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
                <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Image Section */}
                    <div className="relative w-full h-auto min-h-[300px] md:min-h-[500px] bg-gray-100 flex items-center justify-center p-4 md:p-8">
                        {project.image_url ? (
                            <div className="relative w-full h-[300px] md:h-[500px]">
                                <Image
                                    src={project.image_url}
                                    alt={project.title}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        ) : (
                            <div className="w-full h-[300px] flex items-center justify-center text-gray-400">
                                No Image Available
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="p-6 md:p-12">
                        <div className="max-w-4xl mx-auto">
                            <div className="mb-8">
                                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">{project.title}</h1>

                                <div className="flex flex-wrap gap-4 md:gap-8 text-sm md:text-base text-gray-600 border-b border-gray-100 pb-8">
                                    <div className="flex items-center">
                                        <Tag className="w-4 h-4 mr-2 text-primary" />
                                        <span className="font-medium text-gray-900 mr-2">Category:</span>
                                        {project.category}
                                    </div>
                                    {project.client && (
                                        <div className="flex items-center">
                                            <User className="w-4 h-4 mr-2 text-primary" />
                                            <span className="font-medium text-gray-900 mr-2">Client:</span>
                                            {project.client}
                                        </div>
                                    )}
                                    {project.completion_date && (
                                        <div className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-2 text-primary" />
                                            <span className="font-medium text-gray-900 mr-2">Date:</span>
                                            {new Date(project.completion_date).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {project.description && (
                                <div className="prose prose-lg prose-gray max-w-none">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">About the Project</h3>
                                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                                        {project.description}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
