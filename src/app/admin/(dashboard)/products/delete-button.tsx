"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`Delete "${name}"? This can't be undone.`)) return;

    setLoading(true);
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    setLoading(false);

    if (res.ok) {
      router.refresh();
    } else {
      const data = await res.json();
      alert(data.error || "Failed to delete product");
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-700 hover:underline disabled:opacity-50"
    >
      {loading ? "Deleting…" : "Delete"}
    </button>
  );
}
