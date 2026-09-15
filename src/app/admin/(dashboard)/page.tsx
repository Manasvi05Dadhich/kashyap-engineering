import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const [productCount, categoryCount, postCount] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.blogPost.count(),
  ]);

  const cards = [
    { label: "Products", value: productCount, href: "/admin/products" },
    { label: "Categories", value: categoryCount, href: "/admin/categories" },
    { label: "Blog posts", value: postCount, href: "/admin/blog" },
  ];

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-[#1C2024]">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="border border-[#D8D3C8] bg-white p-5 transition hover:border-[#1F3A5F]"
          >
            <p className="text-3xl font-semibold text-[#1F3A5F]">{card.value}</p>
            <p className="mt-1 text-sm text-[#5B6472]">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
