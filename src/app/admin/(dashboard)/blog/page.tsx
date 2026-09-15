import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-[#1C2024]">Blog posts</h1>
        <Link
          href="/admin/blog/new"
          className="bg-[#1F3A5F] px-4 py-2 text-sm font-medium text-white hover:bg-[#16293F]"
        >
          + New post
        </Link>
      </div>

      <div className="border border-[#D8D3C8] bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#D8D3C8] text-left text-[#5B6472]">
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-[#EDEAE2] last:border-0">
                <td className="px-4 py-3 text-[#1C2024]">{post.title}</td>
                <td className="px-4 py-3 text-[#5B6472]">
                  {post.published ? "Published" : "Draft"}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    className="text-[#1F3A5F] hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-[#8A94A6]">
                  No blog posts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
