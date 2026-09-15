import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export const metadata = { title: "Contact | Kashyap Engineering", description: "Contact Kashyap Engineering for filling machinery and packaging line enquiries." };

export default function ContactPage() { return <><Navbar /><main className="min-h-screen bg-[#F7F5F1]"><div className="mx-auto max-w-6xl px-6 pt-16"><p className="text-xs font-semibold tracking-[.16em] text-[#1F3A5F]">CONTACT</p><h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-[#1C2024] md:text-5xl">Let’s talk about your production line.</h1></div><ContactSection /></main><Footer /></>; }
