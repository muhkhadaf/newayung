import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import HowToOrder from "@/components/HowToOrder";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BannerCarousel from "@/components/BannerCarousel";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Ayung Project",
    "image": "https://ayungproject.com/logo.png", // Placeholder
    "description": "Jasa pembuatan website profesional dan desain grafis terpercaya.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Contoh No. 123",
      "addressLocality": "Jakarta Selatan",
      "addressRegion": "DKI Jakarta",
      "postalCode": "12345",
      "addressCountry": "ID"
    },
    "priceRange": "$$",
    "telephone": "+6289602981841",
    "url": "https://ayungproject.com"
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <BannerCarousel />
      <Portfolio />
      <Testimonials />
      <HowToOrder />
      <FAQ />
      <CTA />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
