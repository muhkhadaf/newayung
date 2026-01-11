import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Ayung Project | Jasa Pembuatan Website & Desain Grafis",
  description: "Jasa pembuatan website profesional, desain logo, dan branding untuk bisnis Anda. Harga terjangkau, desain menarik, dan SEO friendly.",
  keywords: ["jasa pembuatan website", "desain grafis", "logo design", "web development", "ayung project"],
  authors: [{ name: "Ayung Project" }],
  openGraph: {
    title: "Ayung Project | Jasa Pembuatan Website & Desain Grafis",
    description: "Solusi digital terbaik untuk bisnis Anda. Website, Logo, dan Branding.",
    type: "website",
    locale: "id_ID",
  },
  icons: {
    icon: "/Ayungicon.png",
    shortcut: "/Ayungicon.png",
    apple: "/Ayungicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${poppins.variable} font-sans antialiased bg-gray-50 text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
