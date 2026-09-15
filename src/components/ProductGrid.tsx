import Link from "next/link";
import Image from "next/image";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type FeaturedProduct = Prisma.ProductGetPayload<{
  include: { images: { take: 1; orderBy: { order: "asc" } } };
}>;

export default async function ProductGrid() {
  let products: FeaturedProduct[] = [];
  try {
    products = await prisma.product.findMany({
      where: { featured: true },
      include: { images: { take: 1, orderBy: { order: "asc" } } },
      orderBy: { order: "asc" },
      take: 6,
    });
  } catch {
    // Show the empty state while a local database tunnel is offline.
  }

  if (products.length === 0) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-display text-2xl font-bold text-[#1C2024]">Our products</h2>
        <p className="mt-3 text-sm text-[#5B6472]">
          No products added yet 
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="font-display text-2xl font-bold text-[#1C2024]">
        Our most requested machines
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-px bg-[#D8D3C8] sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group bg-[#F7F5F1] p-5 transition hover:bg-white"
          >
            <div className="relative mb-4 aspect-square w-full overflow-hidden bg-white">
              {product.images[0] ? (
                <Image
                  src={product.images[0].url}
                  alt={product.images[0].alt ?? product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-[#8A94A6]">
                  No photo yet
                </div>
              )}
            </div>
            <h3 className="text-base font-semibold text-[#1C2024] group-hover:text-[#1F3A5F]">
              {product.name}
            </h3>
            {product.summary && (
              <p className="mt-1 text-sm text-[#5B6472]">{product.summary}</p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
