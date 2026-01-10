"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data, error } = await supabase
                .from("services")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setProducts(data || []);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            const { error } = await supabase.from("services").delete().eq("id", id);
            if (error) throw error;
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product");
        }
    };

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Products (Services)</h1>
                    <p className="text-gray-500 text-sm">Manage your service offerings</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Product
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                            <tr>
                                <th className="px-6 py-3 font-medium">Image</th>
                                <th className="px-6 py-3 font-medium">Title</th>
                                <th className="px-6 py-3 font-medium">Price</th>
                                <th className="px-6 py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                        Loading products...
                                    </td>
                                </tr>
                            ) : filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                        No products found.
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-gray-100">
                                                {product.image ? (
                                                    <Image
                                                        src={product.image}
                                                        alt={product.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                                        No Img
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{product.title}</div>
                                            <div className="text-sm text-gray-500 truncate max-w-xs">
                                                {product.description}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{product.price}</td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <Link
                                                href={`/admin/products/${product.id}`}
                                                className="inline-flex p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="inline-flex p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
