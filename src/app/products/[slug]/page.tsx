import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug }, include: { category: true, images: { orderBy: { order: "asc" } } } });
  if (!product) notFound();
  return <><Navbar /><main className="min-h-screen bg-[#F7F5F1]"><article className="mx-auto max-w-6xl px-6 py-16"><Link href="/products" className="text-sm font-medium text-[#1F3A5F]">← All products</Link><div className="mt-8 grid gap-10 md:grid-cols-2"><div className="grid gap-3">{product.images.length ? product.images.map((image) => <div key={image.id} className="relative aspect-[4/3] overflow-hidden bg-white"><Image src={image.url} alt={image.alt ?? product.name} fill className="object-cover" /></div>) : <div className="flex aspect-[4/3] items-center justify-center bg-white text-sm text-[#8A94A6]">Photo coming soon</div>}</div><div><p className="text-xs font-semibold uppercase tracking-[.14em] text-[#1F3A5F]">{product.category.name}</p><h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-[#1C2024]">{product.name}</h1>{product.summary && <p className="mt-5 text-lg leading-8 text-[#3A4149]">{product.summary}</p>}<p className="mt-6 whitespace-pre-line text-sm leading-7 text-[#5B6472]">{product.description}</p><Link href="/contact" className="mt-8 inline-block bg-[#1F3A5F] px-5 py-3 text-sm font-medium text-white hover:bg-[#16293F]">Request a quote</Link></div></div></article></main><Footer /></>;
}
