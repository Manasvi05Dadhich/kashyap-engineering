"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { uploadImage } from "@/lib/client-upload";

type Product = { id: string; name: string };

export default function GalleryUploadForm({ products }: { products: Product[] }) {
  const router = useRouter();
  const [productId, setProductId] = useState(products[0]?.id ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = event.currentTarget.elements.namedItem("image") as HTMLInputElement;
    const file = input.files?.[0];
    if (!file || !productId) {
      setError("Choose a product and an image first.");
      return;
    }

    setUploading(true);
    setError("");
    try {
      const imageUrl = await uploadImage(file, "products");

      const galleryResponse = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, url: imageUrl }),
      });
      const galleryData = await galleryResponse.json();
      if (!galleryResponse.ok) throw new Error(galleryData.error || "Could not add image to gallery");

      event.currentTarget.reset();
      router.refresh();
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Image upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form onSubmit={handleUpload} className="mb-8 border border-[#D8D3C8] bg-white p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
        <label className="flex-1 text-sm font-medium text-[#1C2024]">
          Product
          <select name="product" value={productId} onChange={(event) => setProductId(event.target.value)} disabled={uploading || products.length === 0} className="mt-1.5 w-full border border-[#D8D3C8] bg-white px-3 py-2 text-sm outline-none focus:border-[#1F3A5F]">
            {products.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}
          </select>
        </label>
        <label className="flex-1 text-sm font-medium text-[#1C2024]">
          Image
          <input name="image" type="file" accept="image/jpeg,image/png,image/webp,image/gif" disabled={uploading || products.length === 0} className="mt-1.5 block w-full text-sm" />
        </label>
        <button type="submit" disabled={uploading || products.length === 0} className="bg-[#1F3A5F] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#16293F] disabled:opacity-50">{uploading ? "Uploading..." : "Upload image"}</button>
      </div>
      {products.length === 0 && <p className="mt-3 text-sm text-[#8A94A6]">Add a product before uploading gallery images.</p>}
      {error && <p className="mt-3 border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
    </form>
  );
}