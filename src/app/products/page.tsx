import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Products | Kashyap Engineering", description: "Explore Kashyap Engineering filling and packaging machinery." };

export default async function ProductsPage() {
  const products = await prisma.product.findMany({ include: { category: true, images: { take: 1, orderBy: { order: "asc" } } }, orderBy: [{ order: "asc" }, { name: "asc" }] });
  return <><Navbar /><main className="min-h-screen bg-[#F7F5F1]"><div className="mx-auto max-w-6xl px-6 py-16"><p className="text-xs font-semibold tracking-[.16em] text-[#1F3A5F]">OUR MACHINES</p><h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-[#1C2024] md:text-5xl">Built for dependable production.</h1><p className="mt-4 max-w-2xl text-sm leading-6 text-[#5B6472]">Explore our range of liquid, oil, bottle, tube and packaging machinery.</p><div className="mt-10 grid grid-cols-1 gap-px bg-[#D8D3C8] sm:grid-cols-2 lg:grid-cols-3">{products.map((product) => <Link key={product.id} href={`/products/${product.slug}`} className="group bg-[#F7F5F1] p-5 transition hover:bg-white"><div className="relative aspect-[4/3] overflow-hidden bg-white">{product.images[0] ? <Image src={product.images[0].url} alt={product.images[0].alt ?? product.name} fill className="object-cover transition duration-300 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center text-xs text-[#8A94A6]">Photo coming soon</div>}</div><p className="mt-4 text-xs font-medium uppercase tracking-wide text-[#1F3A5F]">{product.category.name}</p><h2 className="mt-1 text-base font-semibold text-[#1C2024]">{product.name}</h2>{product.summary && <p className="mt-2 text-sm text-[#5B6472]">{product.summary}</p>}</Link>)}</div>{products.length === 0 && <p className="mt-8 text-sm text-[#5B6472]">Products will appear here once added from the admin panel.</p>}</div></main><Footer /></>;
}
