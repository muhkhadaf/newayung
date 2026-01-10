import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-20 pb-10">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Info */}
                    <div>
                        <Link href="/" className="text-2xl font-bold text-white mb-6 block">
                            Ayung<span className="text-primary">Project</span>
                        </Link>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Partner digital terpercaya untuk membantu bisnis Anda tumbuh melalui desain website profesional dan branding yang kuat.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href="#about" className="text-gray-400 hover:text-primary transition-colors">
                                    Tentang Kami
                                </Link>
                            </li>
                            <li>
                                <Link href="#services" className="text-gray-400 hover:text-primary transition-colors">
                                    Layanan
                                </Link>
                            </li>
                            <li>
                                <Link href="#portfolio" className="text-gray-400 hover:text-primary transition-colors">
                                    Portfolio
                                </Link>
                            </li>
                            <li>
                                <Link href="#testimonials" className="text-gray-400 hover:text-primary transition-colors">
                                    Testimoni
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Layanan</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                                    Jasa Pembuatan Website
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                                    Desain Logo
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                                    Social Media Management
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                                    Company Profile
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div id="contact">
                        <h4 className="text-lg font-bold mb-6">Hubungi Kami</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                                <span className="text-gray-400">Jl. Contoh No. 123, Jakarta Selatan, Indonesia</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                                <span className="text-gray-400">+62 812-3456-7890</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                                <span className="text-gray-400">info@ayungproject.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center">
                    <p className="text-gray-500">
                        &copy; {new Date().getFullYear()} Ayung Project. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
