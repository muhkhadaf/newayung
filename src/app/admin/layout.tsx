"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    Briefcase,
    HelpCircle,
    LogOut,
    Menu,
    X,
    Image as ImageIcon
} from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/login");
    };

    const navItems = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Products", href: "/admin/products", icon: Package },
        { name: "Portfolio", href: "/admin/portfolio", icon: Briefcase },
        { name: "Banners", href: "/admin/banners", icon: ImageIcon },
        { name: "FAQ", href: "/admin/faq", icon: HelpCircle },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="h-full flex flex-col">
                    <div className="h-16 flex items-center px-6 border-b border-gray-200">
                        <span className="text-xl font-bold text-primary">Ayung Admin</span>
                    </div>

                    <nav className="flex-1 px-4 py-6 space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                >
                                    <item.icon className={`mr-3 h-5 w-5 ${isActive ? "text-primary" : "text-gray-400"}`} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-gray-200">
                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        >
                            <LogOut className="mr-3 h-5 w-5" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <header className="md:hidden bg-white border-b border-gray-200 h-16 flex items-center px-4 justify-between">
                    <span className="text-lg font-bold text-primary">Ayung Admin</span>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                    >
                        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
