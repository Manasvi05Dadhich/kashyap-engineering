"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { uploadImage } from "@/lib/client-upload";

export default function GalleryUploadForm() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = event.currentTarget.elements.namedItem("image") as HTMLInputElement;
    const file = input.files?.[0];
    const altInput = event.currentTarget.elements.namedItem("alt") as HTMLInputElement;
    if (!file) {
      setError("Choose an image first.");
      return;
    }

    setUploading(true);
    setError("");
    try {
      const imageUrl = await uploadImage(file, "products");

      const galleryResponse = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: imageUrl, alt: altInput.value }),
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
          Image
          <input name="image" type="file" accept="image/jpeg,image/png,image/webp,image/gif" disabled={uploading} className="mt-1.5 block w-full text-sm" />
        </label>
        <label className="flex-1 text-sm font-medium text-[#1C2024]">
          Caption (optional)
          <input name="alt" type="text" disabled={uploading} placeholder="Describe this image" className="mt-1.5 w-full border border-[#D8D3C8] px-3 py-2 text-sm outline-none focus:border-[#1F3A5F]" />
        </label>
        <button type="submit" disabled={uploading} className="bg-[#1F3A5F] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#16293F] disabled:opacity-50">{uploading ? "Uploading..." : "Upload image"}</button>
      </div>
      {error && <p className="mt-3 border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
    </form>
  );
}