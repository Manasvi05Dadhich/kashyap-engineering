import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import ProductForm from "../../product-form";
import { notFound } from "next/navigation";

type AdminProduct = Prisma.ProductGetPayload<{
  include: { images: { orderBy: { order: "asc" } } };
}>;

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product: AdminProduct | null = null;
  let categories: Awaited<ReturnType<typeof prisma.category.findMany>> = [];
  try {
    [product, categories] = await Promise.all([
      prisma.product.findUnique({
        where: { id },
        include: { images: { orderBy: { order: "asc" } } },
      }),
      prisma.category.findMany({ orderBy: { order: "asc" } }),
    ]);
  } catch {
    // Treat an unavailable database like a missing product instead of throwing.
  }

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
