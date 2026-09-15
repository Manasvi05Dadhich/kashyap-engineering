import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import GalleryUploadForm from "./upload-form";

export default async function AdminGalleryPage() {
  const images = await prisma.productImage.findMany({
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });
  const products = await prisma.product.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } });

  return (
    <div>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#1F3A5F]">Media library</p>
          <h1 className="mt-2 text-xl font-semibold text-[#1C2024]">Gallery</h1>
          <p className="mt-1 text-sm text-[#5B6472]">Product photos uploaded in Product Management appear here and on the public Gallery page.</p>
        </div>
        <Link href="/admin/products" className="shrink-0 bg-[#1F3A5F] px-4 py-2 text-sm font-medium text-white hover:bg-[#16293F]">Manage products</Link>
      </div>

      <GalleryUploadForm products={products} />

      {images.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {images.map((image) => (
            <div key={image.id} className="border border-[#D8D3C8] bg-white">
              <div className="relative aspect-[4/3] bg-[#F7F5F1]">
                <Image src={image.url} alt={image.alt ?? image.product.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, 25vw" />
              </div>
              <div className="flex items-center justify-between gap-3 px-3 py-3">
                <p className="truncate text-sm font-medium text-[#1C2024]">{image.product.name}</p>
                <Link href={`/admin/products/${image.product.id}/edit`} className="shrink-0 text-xs font-semibold text-[#1F3A5F] hover:underline">Edit</Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-[#D8D3C8] bg-white px-6 py-12 text-center">
          <p className="text-sm text-[#5B6472]">No gallery images yet.</p>
          <Link href="/admin/products/new" className="mt-4 inline-block text-sm font-semibold text-[#1F3A5F] hover:underline">Add a product with photos →</Link>
        </div>
      )}
    </div>
  );
}