import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { productId, url, alt } = body;

  if (!productId || !url) {
    return NextResponse.json({ error: "Product and image URL are required" }, { status: 400 });
  }
 const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
  const lastImage = await prisma.productImage.findFirst({
    where: { productId },
    orderBy: { order: "desc" },
  });
  const image = await prisma.productImage.create({
    data: {
      productId,
      url,
      alt: alt || product.name,
      order: (lastImage?.order ?? -1) + 1,
    },
    include: { product: true },
  });
  return NextResponse.json(image, { status: 201 });
}