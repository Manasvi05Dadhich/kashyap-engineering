import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function CategoryChips() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    take: 10,
  });

  if (categories.length === 0) return null;
  return (
    <section className="border-b border-[#D8D3C8] bg-[#F7F5F1]">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <p className="mb-4 text-sm font-medium text-[#5B6472]">Browse by category</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/category/${c.slug}`}
              className="border border-[#D8D3C8] bg-white px-4 py-2 text-sm text-[#1C2024] hover:border-[#1F3A5F] hover:text-[#1F3A5F]"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
