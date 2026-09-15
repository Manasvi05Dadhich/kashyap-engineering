import { prisma } from "@/lib/prisma";

const FALLBACK_STATS = [
  { label: "Years of experience", value: "26+" },
  { label: "Countries served", value: "3+" },
  { label: "Established", value: "2009" },
  { label: "Location", value: "Vadodara, India" },
];

export default async function StatsBar() {
  let stats = FALLBACK_STATS;
  try {
    const databaseStats = await prisma.companyStat.findMany({ orderBy: { order: "asc" } });
    stats = databaseStats.length > 0 ? databaseStats : FALLBACK_STATS;
  } catch {
    // Use the verified static values while a local database tunnel is offline.
  }
  const items = stats.length > 0 ? stats : FALLBACK_STATS;

  return (
    <section className="border-b border-[#D8D3C8] bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4">
        {items.map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-3xl font-bold text-[#1F3A5F]">{stat.value}</p>
            <p className="mt-1 text-sm text-[#5B6472]">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
