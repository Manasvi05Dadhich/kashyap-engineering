"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CategoryForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleNameChange(value: string) {
    setName(value);
    setSlug(
      value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, slug, description }),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to create category");
      return;
    }

    setName("");
    setSlug("");
    setDescription("");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md border border-[#D8D3C8] bg-white p-6">
      <div className="mb-4">
        <label className="mb-1.5 block text-sm font-medium text-[#1C2024]">Name</label>
        <input
          required
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          className="w-full border border-[#D8D3C8] px-3 py-2 text-sm outline-none focus:border-[#1F3A5F]"
        />
      </div>
      <div className="mb-4">
        <label className="mb-1.5 block text-sm font-medium text-[#1C2024]">Slug</label>
        <input
          required
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full border border-[#D8D3C8] px-3 py-2 text-sm outline-none focus:border-[#1F3A5F]"
        />
      </div>
      <div className="mb-4">
        <label className="mb-1.5 block text-sm font-medium text-[#1C2024]">
          Description <span className="text-[#8A94A6]">(optional)</span>
        </label>
        <textarea
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-[#D8D3C8] px-3 py-2 text-sm outline-none focus:border-[#1F3A5F]"
        />
      </div>
      {error && (
        <p className="mb-4 border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={saving}
        className="bg-[#1F3A5F] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#16293F] disabled:opacity-60"
      >
        {saving ? "Adding…" : "Add category"}
      </button>
    </form>
  );
}
