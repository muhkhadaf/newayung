"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function BannerForm({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const isNew = id === "new";
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        link: "",
        image_url: "",
        is_active: true,
    });

    useEffect(() => {
        if (!isNew) {
            fetchBanner();
        }
    }, [id]);

    const fetchBanner = async () => {
        try {
            const { data, error } = await supabase
                .from("banners")
                .select("*")
                .eq("id", id)
                .single();

            if (error) throw error;
            if (data) {
                setFormData({
                    title: data.title || "",
                    link: data.link || "",
                    image_url: data.image_url || "",
                    is_active: data.is_active ?? true,
                });
            }
        } catch (error) {
            console.error("Error fetching banner:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
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
            uploadData.append("bucket", "banners");

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
            const url = isNew ? "/api/banners" : `/api/banners/${id}`;
            const method = isNew ? "POST" : "PUT";

            const res = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to save banner");
            }

            router.push("/admin/banners");
        } catch (error: any) {
            console.error("Error saving banner:", error);
            alert(error.message || "Failed to save banner");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/banners"
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">
                    {isNew ? "Add New Banner" : "Edit Banner"}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title ?? ""}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        placeholder="e.g. Summer Sale"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Link (Optional)</label>
                    <input
                        type="text"
                        name="link"
                        value={formData.link ?? ""}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        placeholder="e.g. /services/web-dev or https://example.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Banner Image</label>
                    <div className="space-y-4">
                        {formData.image_url && (
                            <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200">
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

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="is_active"
                        name="is_active"
                        checked={formData.is_active ?? false}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                        Active
                    </label>
                </div>

                <div className="pt-4 border-t border-gray-200 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading || uploading}
                        className="inline-flex items-center px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-colors"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        {loading ? "Saving..." : "Save Banner"}
                    </button>
                </div>
            </form>
        </div>
    );
}
