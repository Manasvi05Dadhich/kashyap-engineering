import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { title, slug, excerpt, content, coverImage, metaTitle, metaKeywords, metaDescription, published } = body;

  if (!title || !slug || !content || !coverImage || !metaTitle || !metaKeywords || !metaDescription) {
    return NextResponse.json(
      { error: "Blog name, slug, featured photo, description, and all meta fields are required" },
      { status: 400 }
    );
  }

  const existing = await prisma.blogPost.findUnique({ where: { id } });

  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      metaTitle,
      metaKeywords,
      metaDescription,
      published,
      publishedAt: published && !existing?.publishedAt ? new Date() : existing?.publishedAt,
    },
  });

  return NextResponse.json(post);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.blogPost.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
