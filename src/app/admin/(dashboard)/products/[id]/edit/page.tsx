import { prisma } from "@/lib/prisma";
import ProductForm from "../../product-form";
import { notFound } from "next/navigation";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: { images: { orderBy: { order: "asc" } } },
    }),
    prisma.category.findMany({ orderBy: { order: "asc" } }),
  ]);

  if (!product) notFound();

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-[#1C2024]">Edit product</h1>
      <ProductForm
        categories={categories}
        initialValues={{
          id: product.id,
          name: product.name,
          slug: product.slug,
          summary: product.summary ?? "",
          description: product.description ?? "",
          categoryId: product.categoryId,
          featured: product.featured,
          images: product.images.map((img) => ({ url: img.url, alt: img.alt ?? undefined })),
        }}
      />
    </div>
  );
}
