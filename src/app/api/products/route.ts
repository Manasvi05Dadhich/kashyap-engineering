import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const categorySlug = searchParams.get("category");
  const featured = searchParams.get("featured");

  const products = await prisma.product.findMany({
    where: {
      ...(categorySlug ? { category: { slug: categorySlug } } : {}),
      ...(featured === "true" ? { featured: true } : {}),
    },
    include: { images: { orderBy: { order: "asc" } }, category: true },
    orderBy: { order: "asc" },
  });

  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, slug, summary, description, specs, featured, order, categoryId, images } = body;

  if (!name || !slug || !categoryId) {
    return NextResponse.json(
      { error: "Name, slug, and categoryId are required" },
      { status: 400 }
    );
  }

  const product = await prisma.product.create({
    data: {
      name,
      slug,
      summary,
      description,
      specs,
      featured: featured ?? false,
      order: order ?? 0,
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

  return NextResponse.json(product, { status: 201 });
}
