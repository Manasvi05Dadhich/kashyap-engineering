import Link from "next/link";

const links = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "Our Company" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="bg-white">
      <div className="bg-[#4d1414] text-[10px] font-semibold uppercase tracking-[.12em] text-white/80">
        <div className="mx-auto flex max-w-7xl justify-between px-6 py-2 lg:px-10"><span>Engineering packaging solutions since 2009</span><span className="hidden sm:inline">Vadodara, Gujarat · India</span></div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link href="/" className="flex items-center gap-3 font-display text-xl font-extrabold tracking-[-.04em] text-[#4d1414]">
          <img src="https://kashyapengineering.com/images/logo%20(2).png" alt="Kashyap Engineering" className="h-12 w-auto object-contain" />
        </Link>
        <nav className="hidden gap-7 text-sm font-semibold text-[#253b55] lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-[#8b2d2d]">
              {link.label}
            </Link>
          ))}
        </nav>
        <a
          href="tel:+919727059812"
          className="hidden shrink-0 bg-[#4d1414] px-5 py-3 text-xs font-bold uppercase tracking-[.1em] text-white transition hover:bg-[#8b2d2d] md:inline-block"
        >
          Talk to an engineer
        </a>
      </div>
    </header>
  );
}
