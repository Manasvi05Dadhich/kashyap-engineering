import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { unlink } from "fs/promises";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: { orderBy: { order: "asc" } }, category: true },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { name, slug, summary, description, specs, featured, order, categoryId, images } = body;

  // Replace the image set on every edit for simplicity — the admin form
  // always resubmits the full current list of images.
  if (images) {
    await prisma.productImage.deleteMany({ where: { productId: id } });
  }

  const product = await prisma.product.update({
    where: { id },
    data: {
      name,
      slug,
      summary,
      description,
      specs,
      featured,
      order,
      categoryId,
      images: images?.length
        ? {
            create: images.map((img: { url: string; alt?: string }, i: number) => ({
              url: img.url,
              alt: img.alt ?? name,
              order: i,
            })),
          }
        : undefined,
    },
    include: { images: true },
  });

  return NextResponse.json(product);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: true },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  // Best-effort cleanup of image files on disk. Failures here shouldn't
  // block the database deletion.
  for (const image of product.images) {
    if (image.url.startsWith("/uploads/")) {
      try {
        await unlink(path.join(process.cwd(), "public", image.url));
      } catch {
        // File may already be gone — ignore.
      }
    }
  }

  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
