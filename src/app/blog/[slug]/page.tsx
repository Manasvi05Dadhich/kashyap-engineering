import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; let post: Awaited<ReturnType<typeof prisma.blogPost.findFirst>> = null; try { post = await prisma.blogPost.findFirst({ where: { slug, published: true } }); } catch { /* Treat an unavailable database like a missing article. */ } if (!post) notFound(); return <><Navbar /><main className="min-h-screen bg-[#f5efe7]"><article className="mx-auto max-w-3xl px-6 py-20"><Link href="/blog" className="text-sm font-semibold text-[#8b2d2d]">← All articles</Link><p className="mt-8 text-xs font-bold uppercase tracking-[.14em] text-[#8b2d2d]">{post.publishedAt?.toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p><h1 className="mt-3 font-display text-4xl font-extrabold tracking-[-.04em] text-[#4d1414] md:text-6xl">{post.title}</h1>{post.coverImage && <img src={post.coverImage} alt={post.title} className="mt-8 aspect-[16/9] w-full object-cover" />}<div className="prose mt-8 max-w-none text-base leading-8 text-[#3A2020]" dangerouslySetInnerHTML={{ __html: post.content }} /></article></main><Footer /></>; }
