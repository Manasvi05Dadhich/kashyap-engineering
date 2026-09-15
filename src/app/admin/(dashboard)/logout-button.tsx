"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full rounded px-3 py-2 text-left text-sm text-[#8A94A6] hover:bg-[#F7F5F1] hover:text-[#1C2024]"
    >
      Sign out
    </button>
  );
}
