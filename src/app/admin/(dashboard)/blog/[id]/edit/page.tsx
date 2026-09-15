import { prisma } from "@/lib/prisma";
import BlogPostForm from "../../post-form";
import { notFound } from "next/navigation";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-[#1C2024]">Edit blog post</h1>
      <BlogPostForm
        initialValues={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? "",
          content: post.content,
          coverImage: post.coverImage ?? "",
          metaTitle: post.metaTitle ?? "",
          metaKeywords: post.metaKeywords ?? "",
          metaDescription: post.metaDescription ?? "",
          published: post.published,
        }}
      />
    </div>
  );
}
