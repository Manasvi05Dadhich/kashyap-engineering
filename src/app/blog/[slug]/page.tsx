import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const post = await prisma.blogPost.findFirst({ where: { slug, published: true } }); if (!post) notFound(); return <><Navbar /><main className="min-h-screen bg-[#F7F5F1]"><article className="mx-auto max-w-3xl px-6 py-16"><Link href="/blog" className="text-sm font-medium text-[#1F3A5F]">← All articles</Link><p className="mt-8 text-xs font-semibold tracking-[.14em] text-[#1F3A5F]">{post.publishedAt?.toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p><h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-[#1C2024] md:text-5xl">{post.title}</h1>{post.coverImage && <img src={post.coverImage} alt={post.title} className="mt-8 aspect-[16/9] w-full object-cover" />}<div className="prose mt-8 max-w-none text-base leading-8 text-[#3A4149]" dangerouslySetInnerHTML={{ __html: post.content }} /></article></main><Footer /></>; }
