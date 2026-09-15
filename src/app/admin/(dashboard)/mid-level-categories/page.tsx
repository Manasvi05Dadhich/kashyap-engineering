import { prisma } from "@/lib/prisma";
import CategoryForm from "../categories/category-form";
import DeleteCategoryButton from "../categories/delete-button";

export default async function MidLevelCategoriesPage() {
  const [parentCategories, categories] = await Promise.all([
    prisma.category.findMany({ where: { parentId: null }, orderBy: { order: "asc" }, select: { id: true, name: true } }),
    prisma.category.findMany({ where: { parentId: { not: null } }, include: { parent: true, _count: { select: { products: true } } }, orderBy: { order: "asc" } }),
  ]);

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#1F3A5F]">Catalog structure</p>
      <h1 className="mt-2 mb-6 text-xl font-semibold text-[#1C2024]">Mid Level Categories</h1>
      <div className="mb-8 border border-[#D8D3C8] bg-white">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-[#D8D3C8] text-left text-[#5B6472]"><th className="px-4 py-3 font-medium">Name</th><th className="px-4 py-3 font-medium">Top level category</th><th className="px-4 py-3 font-medium">Products</th><th className="px-4 py-3 font-medium" /></tr></thead>
          <tbody>
            {categories.map((category) => <tr key={category.id} className="border-b border-[#EDEAE2] last:border-0"><td className="px-4 py-3 text-[#1C2024]">{category.name}</td><td className="px-4 py-3 text-[#5B6472]">{category.parent?.name}</td><td className="px-4 py-3 text-[#5B6472]">{category._count.products}</td><td className="px-4 py-3 text-right"><DeleteCategoryButton id={category.id} name={category.name} productCount={category._count.products} /></td></tr>)}
            {categories.length === 0 && <tr><td colSpan={4} className="px-4 py-8 text-center text-[#8A94A6]">No mid level categories yet.</td></tr>}
          </tbody>
        </table>
      </div>
      <h2 className="mb-4 text-base font-semibold text-[#1C2024]">Add a mid level category</h2>
      <CategoryForm parentCategories={parentCategories} requireParent />
    </div>
  );
}