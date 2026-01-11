"use client";

import { useEffect, useState } from "react";
import {
    Package,
    Briefcase,
    MessageSquareQuote,
    HelpCircle,
    Image as ImageIcon,
    User,
    ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        services: 0,
        projects: 0,
        testimonials: 0,
        faqs: 0,
        banners: 0,
        users: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await fetch("/api/admin/stats");
            const data = await res.json();
            if (res.ok) {
                setStats(data);
            }
        } catch (error) {
            console.error("Error fetching stats:", error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            title: "Products",
            count: stats.services,
            icon: Package,
            href: "/admin/products",
            color: "text-blue-600",
            bg: "bg-blue-50",
            desc: "Manage services"
        },
        {
            title: "Portfolio",
            count: stats.projects,
            icon: Briefcase,
            href: "/admin/portfolio",
            color: "text-purple-600",
            bg: "bg-purple-50",
            desc: "Showcase work"
        },
        {
            title: "Testimonials",
            count: stats.testimonials,
            icon: MessageSquareQuote,
            href: "/admin/testimonials",
            color: "text-yellow-600",
            bg: "bg-yellow-50",
            desc: "Customer reviews"
        },
        {
            title: "Banners",
            count: stats.banners,
            icon: ImageIcon,
            href: "/admin/banners",
            color: "text-pink-600",
            bg: "bg-pink-50",
            desc: "Promo banners"
        },
        {
            title: "FAQ",
            count: stats.faqs,
            icon: HelpCircle,
            href: "/admin/faq",
            color: "text-green-600",
            bg: "bg-green-50",
            desc: "Q&A content"
        },
        {
            title: "Users",
            count: stats.users,
            icon: User,
            href: "/admin/users",
            color: "text-gray-600",
            bg: "bg-gray-50",
            desc: "Admin access"
        },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-40 animate-pulse">
                            <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
                            <div className="h-8 w-16 bg-gray-200 rounded mb-2"></div>
                            <div className="h-4 w-32 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {statCards.map((card) => (
                        <Link
                            key={card.title}
                            href={card.href}
                            className="group bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-lg ${card.bg} ${card.color}`}>
                                    <card.icon className="w-6 h-6" />
                                </div>
                                <div className="p-2 text-gray-400 group-hover:text-primary transition-colors">
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">
                                    {card.title}
                                </h3>
                                <p className="text-3xl font-bold text-gray-900 mb-1">
                                    {card.count}
                                </p>
                                <p className="text-sm text-gray-400">
                                    {card.desc}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            <div className="mt-8 bg-gradient-to-r from-primary/5 to-transparent p-8 rounded-xl border border-primary/10">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Welcome to Ayung CMS</h2>
                <p className="text-gray-600 max-w-2xl">
                    Select a card above or use the sidebar menu to start managing your website content.
                    Changes made here will be instantly reflected on the live site.
                </p>
            </div>
        </div>
    );
}
