import Link from "next/link";

export default async function ComingSoonPage({ searchParams }: { searchParams: Promise<{ section?: string }> }) {
  const { section = "This section" } = await searchParams;

  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#1F3A5F]">Admin section</p>
      <h1 className="mt-3 text-2xl font-semibold text-[#1C2024]">{section}</h1>
      <p className="mt-3 text-sm leading-6 text-[#5B6472]">This tab is ready in the admin navigation. Its management screen can be connected when the corresponding content model and workflow are added.</p>
      <Link href="/admin" className="mt-6 inline-flex bg-[#1F3A5F] px-4 py-2 text-sm font-medium text-white hover:bg-[#16293F]">Back to dashboard</Link>
    </div>
  );
}