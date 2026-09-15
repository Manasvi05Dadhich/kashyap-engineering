import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Gallery | Kashyap Engineering", description: "View Kashyap Engineering machines and installations." };

export default async function GalleryPage() { const images = await prisma.productImage.findMany({ include: { product: true }, orderBy: { createdAt: "desc" } }); return <><Navbar /><main className="min-h-screen bg-[#F7F5F1]"><section className="mx-auto max-w-6xl px-6 py-16"><p className="text-xs font-semibold tracking-[.16em] text-[#1F3A5F]">GALLERY</p><h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-[#1C2024] md:text-5xl">Machines in focus.</h1><div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{images.map((image) => <figure key={image.id} className="overflow-hidden bg-white"><div className="relative aspect-[4/3]"><Image src={image.url} alt={image.alt ?? image.product.name} fill className="object-cover" /></div><figcaption className="p-3 text-sm font-medium text-[#1C2024]">{image.product.name}</figcaption></figure>)}</div>{images.length === 0 && <p className="mt-8 text-sm text-[#5B6472]">Upload product images in Admin → Products to build the gallery.</p>}</section></main><Footer /></>; }
