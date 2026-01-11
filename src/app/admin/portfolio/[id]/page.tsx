"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function ProjectForm({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const isNew = id === "new";
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        category: "Logo Design",
        image_url: "",
        description: "",
        client: "",
        completion_date: "",
    });

    const categories = [
        "Logo Design",
        "Web Development",
        "Company Profile",
        "Social Media",
        "Desain Lainnya",
    ];

    useEffect(() => {
        if (!isNew) {
            fetchProject();
        }
    }, [id]);

    const fetchProject = async () => {
        try {
            const { data, error } = await supabase
                .from("projects")
                .select("*")
                .eq("id", id)
                .single();

            if (error) throw error;
            if (data) {
                setFormData({
                    title: data.title || "",
                    category: data.category || "Logo Design",
                    image_url: data.image_url || "",
                    description: data.description || "",
                    client: data.client || "",
                    completion_date: data.completion_date || "",
                });
            }
        } catch (error) {
            console.error("Error fetching project:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            if (!e.target.files || e.target.files.length === 0) {
                throw new Error("You must select an image to upload.");
            }

            const file = e.target.files[0];
            const uploadData = new FormData();
            uploadData.append("file", file);
            uploadData.append("bucket", "portfolio");

            const res = await fetch("/api/upload", {
                method: "POST",
                body: uploadData,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Upload failed");
            }

            setFormData({ ...formData, image_url: data.url });
        } catch (error: any) {
            console.error("Error uploading image:", error);
            alert(error.message || "Error uploading image");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isNew) {
                const { error } = await supabase.from("projects").insert([formData]);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from("projects")
                    .update(formData)
                    .eq("id", id);
                if (error) throw error;
            }
            router.push("/admin/portfolio");
        } catch (error) {
            console.error("Error saving project:", error);
            alert("Failed to save project");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/portfolio"
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">
                    {isNew ? "Add New Project" : "Edit Project"}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        placeholder="e.g. EcoGreen Logo"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        placeholder="Project description..."
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
                        <input
                            type="text"
                            name="client"
                            value={formData.client}
                            onChange={handleChange}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                            placeholder="e.g. EcoGreen Inc."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Completion Date</label>
                        <input
                            type="date"
                            name="completion_date"
                            value={formData.completion_date}
                            onChange={handleChange}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Image</label>
                    <div className="flex items-center gap-4">
                        {formData.image_url && (
                            <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                                <img
                                    src={formData.image_url}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                        <div className="flex-1">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={uploading}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                            />
                            {uploading && <p className="text-xs text-gray-500 mt-1">Uploading...</p>}
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-200 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading || uploading}
                        className="inline-flex items-center px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-colors"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        {loading ? "Saving..." : "Save Project"}
                    </button>
                </div>
            </form>
        </div>
    );
}
