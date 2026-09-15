"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteBlogButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`Delete "${title}"? This can't be undone.`)) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      if (!response.ok) {
        const data = await response.json();
        alert(data.error || "Failed to delete blog post");
        return;
      }
      router.refresh();
    } catch {
      alert("Could not connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="text-red-700 hover:underline disabled:opacity-50"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}