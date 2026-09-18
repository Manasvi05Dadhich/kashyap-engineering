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
    <footer className="border-t border-[#302d2b] bg-[#242222] text-[#f5efe7]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.25fr_.75fr_.7fr_1.45fr] lg:gap-12 lg:py-20">
        <div className="lg:pr-8">
          <div className="mb-6 flex h-12 w-48 items-center bg-white px-3 py-2">
            <img src="https://kashyapengineering.com/images/logo%20(2).png" alt="Kashyap Engineering" className="max-h-full max-w-full object-contain" />
          </div>
          <p className="max-w-sm text-sm leading-6 text-[#f5efe7]/70">
            Kashyap Engineering is a prominent manufacturer of oil, liquid, tube and bottle filling machines in Vadodara, Gujarat, India.
          </p>
          <address className="mt-6 max-w-sm border-l-2 border-[#c49a52] pl-4 not-italic text-xs leading-5 text-[#e2bd72]/85">
            485-486/A-33, Ashtamangal Industrial Park,<br />
            G.I.D.C., Makarpura, Vadodara-390010,<br />
            Gujarat, India
          </address>
          <div className="mt-6 flex flex-col gap-2 text-xs text-[#f5efe7]/70">
            <a href="tel:+919727059812" className="w-fit transition hover:text-[#e2bd72]">+91 97270 59812 · +91 97270 56812</a>
            <a href="mailto:nitinp9800@gmail.com" className="w-fit transition hover:text-[#e2bd72]">nitinp9800@gmail.com</a>
            <a href="mailto:saleskashyapengineering@gmail.com" className="w-fit transition hover:text-[#e2bd72]">saleskashyapengineering@gmail.com</a>
          </div>
        </div>

        <FooterColumn title="Useful links" links={usefulLinks} />
        <FooterColumn title="Countries we serve" links={countries} />
        <FooterColumn title="Product range" links={productRange} />
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-[11px] uppercase tracking-[.12em] text-[#f5efe7]/45 sm:flex-row sm:items-center sm:justify-between">
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
      <h2 className="mb-5 text-xs font-bold uppercase tracking-[.16em] text-[#e2bd72]">{title}</h2>
      <nav className="flex flex-col items-start gap-3 text-sm">
        {links.map(([label, href]) => (
          <a key={label} href={href} className="text-[#f5efe7]/65 transition hover:translate-x-1 hover:text-[#e2bd72]">
            {label}
          </a>
        ))}
      </nav>
    </div>
  );
}
