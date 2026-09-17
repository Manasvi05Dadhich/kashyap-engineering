import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  let counts = { productCount: 0, categoryCount: 0, postCount: 0 };
  let databaseAvailable = true;
  try {
    const [productCount, categoryCount, postCount] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.blogPost.count(),
    ]);
    counts = { productCount, categoryCount, postCount };
  } catch {
    databaseAvailable = false;
  }

  const { productCount, categoryCount, postCount } = counts;

  const cards = [
    { label: "Products", value: productCount, href: "/admin/products" },
    { label: "Categories", value: categoryCount, href: "/admin/categories" },
    { label: "Blog posts", value: postCount, href: "/admin/blog" },
  ];

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#8b2d2d]">Kashyap Engineering</p>
          <h1 className="mt-2 text-2xl font-extrabold text-[#4d1414]">Dashboard</h1>
        </div>
        {!databaseAvailable && <p className="border border-[#e2bd72] bg-[#fff8e8] px-3 py-2 text-xs font-semibold text-[#7b5a1e]">Database unavailable. Showing zero counts.</p>}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="border border-[#e3d8ca] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#8b2d2d]"
          >
            <p className="text-3xl font-extrabold text-[#4d1414]">{card.value}</p>
            <p className="mt-1 text-sm text-[#6b4a4a]">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
