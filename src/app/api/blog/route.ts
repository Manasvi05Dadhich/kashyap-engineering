import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, slug, excerpt, content, coverImage, metaTitle, metaKeywords, metaDescription, published } = body;

  if (!title || !slug || !content || !coverImage || !metaTitle || !metaKeywords || !metaDescription) {
    return NextResponse.json(
      { error: "Blog name, slug, featured photo, description, and all meta fields are required" },
      { status: 400 }
    );
  }

  const post = await prisma.blogPost.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      metaTitle,
      metaKeywords,
      metaDescription,
      published: published ?? false,
      publishedAt: published ? new Date() : null,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
