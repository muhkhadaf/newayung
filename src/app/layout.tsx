import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ayungproject.com'),
  title: "Ayung Project | Jasa Pembuatan Website & Desain Grafis",
  description: "Jasa pembuatan website profesional, desain logo, dan branding untuk bisnis Anda. Harga terjangkau, desain menarik, dan SEO friendly.",
  keywords: ["jasa pembuatan website", "desain grafis", "logo design", "web development", "ayung project"],
  authors: [{ name: "Ayung Project" }],
  openGraph: {
    title: "Ayung Project | Jasa Pembuatan Website & Desain Grafis",
    description: "Solusi digital terbaik untuk bisnis Anda. Website, Logo, dan Branding.",
    type: "website",
    locale: "id_ID",
    url: 'https://ayungproject.com',
    siteName: 'Ayung Project',
  },
  icons: {
    icon: "/Ayungicon.png",
    shortcut: "/Ayungicon.png",
    apple: "/Ayungicon.png",
  },
  verification: {
    google: "gnMKPw7ABvYkBk8SR2JiGm6-Pz-rUwMY5rI32cWIcKM",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Ayung Project",
  "url": "https://ayungproject.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://ayungproject.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${poppins.variable} font-sans antialiased bg-gray-50 text-gray-900`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
