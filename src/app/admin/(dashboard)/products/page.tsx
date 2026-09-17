import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import Link from "next/link";
import DeleteProductButton from "./delete-button";

type AdminProduct = Prisma.ProductGetPayload<{
  include: { category: true; images: { take: 1 } };
}>;

export default async function AdminProductsPage() {
  let products: AdminProduct[] = [];
  try {
    products = await prisma.product.findMany({
      include: { category: true, images: { take: 1 } },
      orderBy: { order: "asc" },
    });
  } catch {
    // Keep the management page available while the database tunnel is offline.
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-[#1C2024]">Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-[#1F3A5F] px-4 py-2 text-sm font-medium text-white hover:bg-[#16293F]"
        >
          + Add product
        </Link>
      </div>

      <div className="border border-[#D8D3C8] bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#D8D3C8] text-left text-[#5B6472]">
              <th className="px-4 py-3 font-medium">Photo</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Featured</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-[#EDEAE2] last:border-0">
                <td className="px-4 py-3">
                  {product.images[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="h-12 w-12 object-cover"
                    />
                  ) : (
                    <div className="h-12 w-12 bg-[#F0EEE8]" />
                  )}
                </td>
                <td className="px-4 py-3 text-[#1C2024]">{product.name}</td>
                <td className="px-4 py-3 text-[#5B6472]">{product.category.name}</td>
                <td className="px-4 py-3 text-[#5B6472]">
                  {product.featured ? "Yes" : "—"}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="mr-3 text-[#1F3A5F] hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteProductButton id={product.id} name={product.name} />
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-[#8A94A6]">
                  No products yet. Add your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
