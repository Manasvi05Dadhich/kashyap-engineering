import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustMarquee from "@/components/TrustMarquee";
import CategoryChips from "@/components/CategoryChips";
import ProductGrid from "@/components/ProductGrid";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustMarquee />
        <CategoryChips />
        <ProductGrid />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
