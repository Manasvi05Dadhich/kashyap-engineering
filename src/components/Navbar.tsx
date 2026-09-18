import Link from "next/link";
import { prisma } from "@/lib/prisma";

const links = [
  { href: "/about", label: "Our Company" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default async function Navbar() {
  let categories: { name: string; slug: string; _count: { products: number } }[] = [];

  try {
    categories = await prisma.category.findMany({
      orderBy: { order: "asc" },
      select: { name: true, slug: true, _count: { select: { products: true } } },
    });
  } catch {
    // Keep the public header available if the database is temporarily unavailable.
  }

  return (
    <header className="bg-white">
      <div className="bg-[#4d1414] text-[10px] font-semibold uppercase tracking-[.12em] text-white/80">
        <div className="mx-auto flex max-w-7xl justify-between px-6 py-2 lg:px-10"><span>Engineering packaging solutions since 2009</span><span className="hidden sm:inline">Vadodara, Gujarat · India</span></div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link href="/" className="flex items-center gap-3 font-display text-xl font-extrabold tracking-[-.04em] text-[#4d1414]">
          <img src="https://kashyapengineering.com/images/logo%20(2).png" alt="Kashyap Engineering" className="h-12 w-auto object-contain" />
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-semibold text-[#253b55] lg:flex">
          <div className="group relative py-4">
            <Link
              href="/products"
              aria-haspopup="true"
              className="inline-flex items-center gap-2 transition hover:text-[#8b2d2d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c49a52]"
            >
              Products
              <span aria-hidden="true" className="text-[10px] transition group-hover:rotate-180">⌄</span>
            </Link>
            <div className="invisible absolute left-1/2 top-full z-30 w-80 -translate-x-1/2 translate-y-2 border-t-2 border-[#c49a52] bg-white p-3 opacity-0 shadow-[0_18px_45px_rgba(28,32,36,.16)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <div className="border-b border-[#eee7de] px-3 pb-3">
                <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#8b2d2d]">Browse our range</p>
                <p className="mt-1 text-xs font-normal leading-5 text-[#6b625b]">Explore machines by category.</p>
              </div>
              <div className="mt-2 max-h-80 overflow-y-auto">
                <Link href="/products" className="flex items-center justify-between px-3 py-3 text-sm font-semibold text-[#4d1414] transition hover:bg-[#f5efe7]">
                  <span>All products</span><span aria-hidden="true">→</span>
                </Link>
                {categories.length > 0 ? categories.map((category) => (
                  <Link key={category.slug} href={`/category/${category.slug}`} className="flex items-center justify-between gap-4 px-3 py-3 text-sm font-medium text-[#3d3a38] transition hover:bg-[#f5efe7] hover:text-[#8b2d2d]">
                    <span>{category.name}</span>
                    <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[.08em] text-[#9a9087]">{category._count.products} {category._count.products === 1 ? "item" : "items"}</span>
                  </Link>
                )) : <p className="px-3 py-4 text-xs font-normal text-[#8a8179]">Categories will appear here once added.</p>}
              </div>
            </div>
          </div>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-[#8b2d2d]">
              {link.label}
            </Link>
          ))}
        </nav>
        <a
          href="tel:+919727059812"
          className="hidden shrink-0 bg-[#4d1414] px-5 py-3 text-xs font-bold uppercase tracking-[.1em] text-white transition hover:bg-[#8b2d2d] md:inline-block"
        >
          Talk to an engineer
        </a>
      </div>
    </header>
  );
}
