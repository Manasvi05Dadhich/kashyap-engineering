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

export async function GET() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
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
  } catch {
    return NextResponse.json({ error: "Could not save the post. The database is unavailable." }, { status: 503 });
  }
}
