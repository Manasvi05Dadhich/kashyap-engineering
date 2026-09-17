const sectors = [
  "PHARMA",
  "COSMETICS",
  "PERSONAL CARE",
  "FOOD & BEVERAGE",
  "CHEMICALS",
  "HERBAL",
];

export default function TrustMarquee() {
  const repeatedSectors = [...sectors, ...sectors];

  return (
    <section className="overflow-hidden border-y border-[#e3d8ca] bg-[#f5efe7] py-10" aria-label="Industries served">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-center justify-between gap-6">
          <div className="shrink-0">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#8b2d2d]">Industries we serve</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold tracking-[-.04em] text-[#4d1414]">Built for serious production.</h2>
          </div>
          <span className="hidden h-px flex-1 bg-[#c49a52]/50 lg:block" />
        </div>
      </div>
      <div className="trust-marquee mt-8 flex w-max items-center gap-4" aria-hidden="true">
        {repeatedSectors.map((sector, index) => (
          <div key={`${sector}-${index}`} className="flex h-16 items-center gap-3 border border-[#dfcdb4] bg-white px-7 text-[#4d1414] shadow-[0_5px_15px_rgba(77,20,20,.04)]">
            <span className="flex h-7 w-7 items-center justify-center border-2 border-[#c49a52] font-display text-[10px] font-extrabold">KE</span>
            <span className="font-display text-sm font-extrabold tracking-[.12em]">{sector}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
