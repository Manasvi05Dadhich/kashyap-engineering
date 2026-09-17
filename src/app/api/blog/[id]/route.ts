import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type BlogPayload = {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage: string;
  metaTitle: string;
  metaKeywords: string;
  metaDescription: string;
  published?: boolean;
};

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
  let body: BlogPayload;
  try {
    body = (await request.json()) as BlogPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const { title, slug, excerpt, content, coverImage, metaTitle, metaKeywords, metaDescription, published } = body;

  if (!title || !slug || !content || !coverImage || !metaTitle || !metaKeywords || !metaDescription) {
    return NextResponse.json(
      { error: "Blog name, slug, featured photo, description, and all meta fields are required" },
      { status: 400 }
    );
  }

  try {
    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Post not found" }, { status: 404 });
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
        publishedAt: published && !existing.publishedAt ? new Date() : existing.publishedAt,
      },
    });
    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "Could not save the post. The database is unavailable." }, { status: 503 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.blogPost.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
