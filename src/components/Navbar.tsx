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
    <header className="border-b border-[#D8D3C8] bg-[#F7F5F1]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg font-bold tracking-tight text-[#1C2024]">
          Kashyap Engineering
        </Link>
        <nav className="hidden gap-8 text-sm font-medium text-[#3A4149] md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[#1F3A5F]">
              {link.label}
            </Link>
          ))}
        </nav>
        <a
          href="tel:+919727059812"
          className="hidden shrink-0 border border-[#1F3A5F] px-4 py-2 text-sm font-medium text-[#1F3A5F] hover:bg-[#1F3A5F] hover:text-white md:inline-block"
        >
          (+91) 97270 59812
        </a>
      </div>
    </header>
  );
}
