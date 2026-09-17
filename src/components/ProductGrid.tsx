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
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-[#8b2d2d]">What we offer</p>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-.03em] text-[#4d1414]">Explore our machinery</h2>
        <p className="mt-3 text-sm text-[#5B6472]">
          No products added yet 
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <p className="text-xs font-bold uppercase tracking-[.2em] text-[#8b2d2d]">What we offer</p>
      <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-.03em] text-[#4d1414]">Explore our machinery</h2>
      <div className="stagger-grid mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group border border-[#e3d8ca] bg-white p-5 transition hover:-translate-y-1 hover:border-[#8b2d2d] hover:shadow-[0_16px_35px_rgba(77,20,20,.1)]"
          >
            <div className="relative mb-5 aspect-[4/3] w-full overflow-hidden bg-[#f5efe7]">
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
            <h3 className="font-display text-lg font-bold text-[#4d1414] group-hover:text-[#8b2d2d]">
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
