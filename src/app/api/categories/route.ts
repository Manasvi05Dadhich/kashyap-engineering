import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: { parent: true, _count: { select: { products: true, children: true } } },
  });
  return NextResponse.json(categories);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, slug, description, image, order, parentId } = body;

  if (!name || !slug) {
    return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
  }

  const category = await prisma.category.create({
    data: { name, slug, description, image, order: order ?? 0, parentId: parentId || null },
  });

  return NextResponse.json(category, { status: 201 });
}
