import Image from "next/image";
import { prisma } from "@/lib/prisma";
import GalleryUploadForm from "./upload-form";

export default async function AdminGalleryPage() {
  let images: Awaited<ReturnType<typeof prisma.galleryImage.findMany>> = [];
  try {
    images = await prisma.galleryImage.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    // Keep the management page available while the database tunnel is offline.
  }

  return (
    <div>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#1F3A5F]">Media library</p>
          <h1 className="mt-2 text-xl font-semibold text-[#1C2024]">Gallery</h1>
          <p className="mt-1 text-sm text-[#5B6472]">Upload gallery images independently from your product catalogue.</p>
        </div>
      </div>

      <GalleryUploadForm />

      {images.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {images.map((image) => (
            <div key={image.id} className="border border-[#D8D3C8] bg-white">
              <div className="relative aspect-[4/3] bg-[#F7F5F1]">
                <Image src={image.url} alt={image.alt ?? "Kashyap Engineering gallery image"} fill className="object-cover" sizes="(max-width: 640px) 100vw, 25vw" />
              </div>
              <div className="flex items-center justify-between gap-3 px-3 py-3">
                <p className="truncate text-sm font-medium text-[#1C2024]">{image.alt || "Gallery image"}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-[#D8D3C8] bg-white px-6 py-12 text-center">
          <p className="text-sm text-[#5B6472]">No gallery images yet.</p>
        </div>
      )}
    </div>
  );
}