import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Gallery | Kashyap Engineering", description: "View Kashyap Engineering machines and installations." };

export const dynamic = "force-dynamic";

export default async function GalleryPage() { let images: Awaited<ReturnType<typeof prisma.galleryImage.findMany>> = []; try { images = await prisma.galleryImage.findMany({ orderBy: { createdAt: "desc" } }); } catch { /* Keep the route available while the database is offline. */ } return <><Navbar /><main className="min-h-screen bg-[#f5efe7]"><section className="mx-auto max-w-7xl px-6 py-20 lg:px-10"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#8b2d2d]">Gallery</p><h1 className="mt-3 font-display text-4xl font-extrabold tracking-[-.04em] text-[#4d1414] md:text-6xl">Machines in focus.</h1><div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{images.map((image) => <figure key={image.id} className="overflow-hidden border border-[#e3d8ca] bg-white"><div className="relative aspect-[4/3]"><Image src={image.url} alt={image.alt ?? "Kashyap Engineering gallery image"} fill className="object-cover" /></div><figcaption className="p-4 text-sm font-semibold text-[#4d1414]">{image.alt || "Kashyap Engineering"}</figcaption></figure>)}</div>{images.length === 0 && <p className="mt-8 text-sm text-[#5B6472]">Gallery images will appear here once added from the admin panel.</p>}</section></main><Footer /></>; }
