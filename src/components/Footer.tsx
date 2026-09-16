export default function Footer() {
  const usefulLinks = [
    ["Home", "/"],
    ["About us", "/about"],
    ["Video gallery", "/coming-soon?section=Video%20Gallery"],
    ["Photo gallery", "/gallery"],
    ["Inquiry", "/contact"],
    ["Contact us", "/contact"],
  ];
  const countries = [
    ["Dubai", "/coming-soon?section=Dubai"],
    ["South Africa", "/coming-soon?section=South%20Africa"],
  ];
  const productRange = [
    ["Liquid filling machines", "/category/liquid-filling-machines"],
    ["Tanks, turn tables & conveyors", "/category/manufacturing-tanks-turn-tables-conveyors"],
    ["Oil filling machines", "/category/oil-filling-machine-manufacturer-in-india"],
    ["Bottle filling machines", "/category/bottle-filling-machines"],
    ["Packaging machines", "/category/packaging-machines"],
    ["Tube filling machines", "/category/tube-filling-machines"],
  ];

  return (
    <footer className="border-t border-[#D8D3C8] bg-[#1C2024] text-[#B7BDC6]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.45fr_.8fr_.65fr_1.5fr] lg:gap-10">
        <div>
          <div className="mb-6 flex h-12 w-48 items-center bg-white px-3 py-2">
            <img src="https://kashyapengineering.com/images/logo%20(2).png" alt="Kashyap Engineering" className="max-h-full max-w-full object-contain" />
          </div>
          <p className="max-w-sm text-sm leading-6 text-[#D2D7DE]">
            Kashyap Engineering is a prominent manufacturer of oil, liquid, tube and bottle filling machines in Vadodara, Gujarat, India.
          </p>
          <address className="mt-6 max-w-sm not-italic text-xs leading-5 text-[#8F9AA7]">
            485-486/A-33, Ashtamangal Industrial Park,<br />
            G.I.D.C., Makarpura, Vadodara-390010,<br />
            Gujarat, India
          </address>
          <div className="mt-5 flex flex-col gap-2 text-xs text-[#D2D7DE]">
            <a href="tel:+919727059812" className="transition hover:text-white">+91 97270 59812 · +91 97270 56812</a>
            <a href="mailto:nitinp9800@gmail.com" className="transition hover:text-white">nitinp9800@gmail.com</a>
            <a href="mailto:saleskashyapengineering@gmail.com" className="transition hover:text-white">saleskashyapengineering@gmail.com</a>
          </div>
        </div>

        <FooterColumn title="Useful links" links={usefulLinks} />
        <FooterColumn title="Countries we serve" links={countries} />
        <FooterColumn title="Product range" links={productRange} />
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-[11px] uppercase tracking-[.12em] text-[#7F8995] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Kashyap Engineering. All rights reserved.</p>
          <p>Vadodara · Gujarat · India</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[][] }) {
  return (
    <div>
      <h2 className="mb-5 text-xs font-bold uppercase tracking-[.16em] text-white">{title}</h2>
      <nav className="flex flex-col items-start gap-3 text-sm">
        {links.map(([label, href]) => (
          <a key={label} href={href} className="text-[#AEB7C1] transition hover:text-white">
            {label}
          </a>
        ))}
      </nav>
    </div>
  );
}
