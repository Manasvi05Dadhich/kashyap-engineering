import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import CategoryChips from "@/components/CategoryChips";
import ProductGrid from "@/components/ProductGrid";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <StatsBar />
        <CategoryChips />
        <ProductGrid />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
