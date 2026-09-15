import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Blog | Kashyap Engineering",
  description: "Updates and insights from Kashyap Engineering.",
};

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#eef0ed]">
        <section className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-xs font-semibold tracking-[.16em] text-[#1F3A5F]">BLOG</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-[#1C2024] md:text-5xl">
            News, guides and industry insights.
          </h1>

          <div className="mt-10 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post, index) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group relative flex min-h-[445px] flex-col overflow-hidden rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_2px_5px_rgba(25,38,35,.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(25,38,35,.13)]"
              >
                <span className="w-fit rounded-full bg-[#1f7651] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.08em] text-white shadow-[0_3px_5px_rgba(4,57,34,.28)]">
                  Article {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-6 max-w-[290px] font-display text-2xl font-bold leading-[1.12] tracking-tight text-[#1C2024]">
                  {post.title}
                </h2>
                <p className="mt-5 text-xs font-medium uppercase tracking-[.075em] text-[#69716f]">
                  {post.publishedAt?.toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }) ?? "Coming soon"}
                  <span className="mx-2">·</span> Kashyap Engineering
                </p>
                <div className="absolute inset-x-0 bottom-0 h-[53%] bg-[radial-gradient(circle_at_50%_95%,#d9ff91_0%,#eff8dd_38%,rgba(255,255,255,0)_70%)]" />
                {post.coverImage ? (
                  <div className="absolute inset-x-8 bottom-0 h-[46%] transition duration-300 group-hover:scale-[1.03]">
                    <Image src={post.coverImage} alt={post.title} fill className="object-contain object-bottom drop-shadow-[0_18px_16px_rgba(20,55,39,.18)]" />
                  </div>
                ) : (
                  <div className="absolute inset-x-8 bottom-12 flex aspect-[4/3] items-center justify-center rounded-2xl border border-[#d6ebc5] bg-[#e8f5d8] text-center text-xs font-medium text-[#51805d]">
                    Featured image<br />coming soon
                  </div>
                )}
              </Link>
            ))}
          </div>
          {posts.length === 0 && (
            <p className="mt-8 text-sm text-[#5B6472]">Published articles will appear here.</p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
