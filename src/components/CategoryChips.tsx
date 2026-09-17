import Link from "next/link";
import { prisma } from "@/lib/prisma";

const FALLBACK_CATEGORIES = [
  { id: "liquid", name: "Liquid filling machines", slug: "liquid-filling-machines" },
  { id: "oil", name: "Oil filling machines", slug: "oil-filling-machine-manufacturer-in-india" },
  { id: "bottle", name: "Bottle filling machines", slug: "bottle-filling-machines" },
  { id: "tube", name: "Tube filling machines", slug: "tube-filling-machines" },
  { id: "packaging", name: "Packaging machines", slug: "packaging-machines" },
];

export default async function CategoryChips() {
  let categories = FALLBACK_CATEGORIES;
  try {
    const databaseCategories = await prisma.category.findMany({
      orderBy: { order: "asc" },
      take: 10,
    });
    categories = databaseCategories.length > 0 ? databaseCategories : FALLBACK_CATEGORIES;
  } catch {
    // Keep the homepage available while a local database tunnel is offline.
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-[#8b2d2d]">Our capabilities</p>
        <h2 className="font-display text-3xl font-extrabold tracking-[-.03em] text-[#4d1414]">Solutions built around your line</h2>
        <div className="stagger-grid mt-8 flex flex-wrap gap-3">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/category/${c.slug}`}
              className="border border-[#e3d8ca] bg-[#f5efe7] px-5 py-3 text-sm font-semibold text-[#4d1414] transition hover:border-[#8b2d2d] hover:bg-[#8b2d2d] hover:text-white"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
