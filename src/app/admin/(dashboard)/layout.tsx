import Link from "next/link";
import LogoutButton from "./logout-button";

const navigation = [
  { label: "Dashboard", href: "/admin", icon: "▦" },
  { label: "Website Settings", href: "/admin/coming-soon?section=Website%20Settings", icon: "☷" },
  { label: "Top Level Category", href: "/admin/categories", icon: "⚙" },
  { label: "Mid Level Category", href: "/admin/mid-level-categories", icon: "○" },
  { label: "Product Management", href: "/admin/products", icon: "▣" },
  { label: "Tags", href: "/admin/coming-soon?section=Tags", icon: "○" },
  { label: "Sitemap", href: "/admin/coming-soon?section=Sitemap", icon: "▣" },
  { label: "Manage Sliders", href: "/admin/coming-soon?section=Manage%20Sliders", icon: "▧" },
  { label: "Gallery", href: "/admin/gallery", icon: "▧" },
  { label: "Video", href: "/admin/coming-soon?section=Video", icon: "▧" },
  { label: "Application", href: "/admin/coming-soon?section=Application", icon: "▧" },
  { label: "Certificate", href: "/admin/coming-soon?section=Certificate", icon: "▧" },
  { label: "Clients", href: "/admin/coming-soon?section=Clients", icon: "▧" },
  { label: "Testimonials", href: "/admin/coming-soon?section=Testimonials", icon: "☷" },
  { label: "Team", href: "/admin/coming-soon?section=Team", icon: "☷" },
  { label: "Brochure", href: "/admin/coming-soon?section=Brochure", icon: "▧" },
  { label: "Services", href: "/admin/coming-soon?section=Services", icon: "☷" },
  { label: "FAQ", href: "/admin/coming-soon?section=FAQ", icon: "?" },
  { label: "Page Settings", href: "/admin/coming-soon?section=Page%20Settings", icon: "▤" },
  { label: "Social Media", href: "/admin/coming-soon?section=Social%20Media", icon: "◉" },
  { label: "Blogs", href: "/admin/blog", icon: "?" },
  { label: "Inquiries", href: "/admin/coming-soon?section=Inquiries", icon: "?" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7F5F1]">
      <div className="flex">
        <aside className="sticky top-0 h-screen w-64 shrink-0 overflow-y-auto border-r border-[#182637] bg-[#223246] text-white">
          <div className="border-b border-white/10 px-5 py-5">
            <p className="text-sm font-semibold">Kashyap Engineering</p>
            <p className="text-xs text-[#AAB8C6]">Admin panel</p>
          </div>
          <nav className="flex flex-col gap-0.5 p-3 text-xs">
            {navigation.map((item) => (
              <Link key={item.label} href={item.href} className="flex items-center gap-3 rounded px-3 py-2.5 text-[#D7E0E8] transition hover:bg-white/10 hover:text-white">
                <span className="w-4 text-center text-[#AFC4D5]" aria-hidden="true">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="sticky bottom-0 border-t border-white/10 bg-[#223246] p-3">
            <LogoutButton />
          </div>
        </aside>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
