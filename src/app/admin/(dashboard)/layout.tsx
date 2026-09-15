import Link from "next/link";
import LogoutButton from "./logout-button";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7F5F1]">
      <div className="flex">
        <aside className="sticky top-0 h-screen w-56 shrink-0 border-r border-[#D8D3C8] bg-white">
          <div className="border-b border-[#D8D3C8] px-5 py-5">
            <p className="text-sm font-semibold text-[#1C2024]">Kashyap Engineering</p>
            <p className="text-xs text-[#8A94A6]">Admin panel</p>
          </div>
          <nav className="flex flex-col gap-1 p-3 text-sm">
            <Link
              href="/admin"
              className="rounded px-3 py-2 text-[#1C2024] hover:bg-[#F7F5F1]"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/products"
              className="rounded px-3 py-2 text-[#1C2024] hover:bg-[#F7F5F1]"
            >
              Products
            </Link>
            <Link
              href="/admin/categories"
              className="rounded px-3 py-2 text-[#1C2024] hover:bg-[#F7F5F1]"
            >
              Categories
            </Link>
            <Link
              href="/admin/blog"
              className="rounded px-3 py-2 text-[#1C2024] hover:bg-[#F7F5F1]"
            >
              Blog
            </Link>
          </nav>
          <div className="absolute bottom-0 w-56 border-t border-[#D8D3C8] p-3">
            <LogoutButton />
          </div>
        </aside>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
