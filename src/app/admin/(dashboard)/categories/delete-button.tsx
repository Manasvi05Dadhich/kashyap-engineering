"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function DeleteCategoryButton({
  id,
  name,
  productCount,
}: {
  id: string;
  name: string;
  productCount: number;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function handleDelete() {
    if (productCount > 0) {
      alert(`Move or delete the ${productCount} product(s) in "${name}" first.`);
      return;
    }
    if (!confirm(`Delete category "${name}"?`)) return;
    setLoading(true);
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    setLoading(false);

    if (res.ok) {
      router.refresh();
    } else {
      const data = await res.json();
      alert(data.error || "Failed to delete category");
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