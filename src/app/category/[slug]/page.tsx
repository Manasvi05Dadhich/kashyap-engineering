import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug }, include: { products: { include: { images: { take: 1, orderBy: { order: "asc" } } }, orderBy: { order: "asc" } } } });
  if (!category) notFound();
  return <><Navbar /><main className="min-h-screen bg-[#F7F5F1]"><section className="mx-auto max-w-6xl px-6 py-16"><Link href="/products" className="text-sm font-medium text-[#1F3A5F]">← All products</Link><h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-[#1C2024] md:text-5xl">{category.name}</h1>{category.description && <p className="mt-4 max-w-2xl text-sm leading-6 text-[#5B6472]">{category.description}</p>}<div className="mt-10 grid grid-cols-1 gap-px bg-[#D8D3C8] sm:grid-cols-2 lg:grid-cols-3">{category.products.map((product) => <Link key={product.id} href={`/products/${product.slug}`} className="group bg-[#F7F5F1] p-5 transition hover:bg-white"><div className="relative aspect-[4/3] overflow-hidden bg-white">{product.images[0] ? <Image src={product.images[0].url} alt={product.images[0].alt ?? product.name} fill className="object-cover" /> : <div className="flex h-full items-center justify-center text-xs text-[#8A94A6]">Photo coming soon</div>}</div><h2 className="mt-4 text-base font-semibold text-[#1C2024]">{product.name}</h2></Link>)}</div></section></main><Footer /></>;
}
