import { prisma } from "@/lib/prisma";
import ProductForm from "../product-form";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-[#1C2024]">Add product</h1>
      {categories.length === 0 ? (
        <p className="text-sm text-[#5B6472]">
          Create a category first before adding products.
        </p>
      ) : (
        <ProductForm categories={categories} />
      )}
    </div>
  );
}
