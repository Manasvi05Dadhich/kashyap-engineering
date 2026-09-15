import { prisma } from "@/lib/prisma";
import CategoryForm from "./category-form";
import DeleteCategoryButton from "./delete-button";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { products: true } } },
  });

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-[#1C2024]">Categories</h1>

      <div className="mb-8 border border-[#D8D3C8] bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#D8D3C8] text-left text-[#5B6472]">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Products</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-b border-[#EDEAE2] last:border-0">
                <td className="px-4 py-3 text-[#1C2024]">{c.name}</td>
                <td className="px-4 py-3 text-[#5B6472]">{c.slug}</td>
                <td className="px-4 py-3 text-[#5B6472]">{c._count.products}</td>
                <td className="px-4 py-3 text-right">
                  <DeleteCategoryButton id={c.id} name={c.name} productCount={c._count.products} />
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-[#8A94A6]">
                  No categories yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h2 className="mb-4 text-base font-semibold text-[#1C2024]">Add a category</h2>
      <CategoryForm />
    </div>
  );
}
