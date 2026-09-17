"use client";

import { usePathname } from "next/navigation";

export default function PublicMotion({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return <div className={isAdminRoute ? "" : "public-motion"}>{children}</div>;
}
