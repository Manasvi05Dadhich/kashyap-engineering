import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { url, alt } = body;

  if (!url) {
    return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
  }
  const lastImage = await prisma.galleryImage.findFirst({
    orderBy: { order: "desc" },
  });
  const image = await prisma.galleryImage.create({
    data: {
      url,
      alt: alt || null,
      order: (lastImage?.order ?? -1) + 1,
    },
  });
  return NextResponse.json(image, { status: 201 });
}