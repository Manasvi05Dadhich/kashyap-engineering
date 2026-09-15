"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Category = { id: string; name: string };
type ImageItem = { url: string; alt?: string };

type ProductFormValues = {
  id?: string;
  name: string;
  slug: string;
  summary: string;
  description: string;
  categoryId: string;
  featured: boolean;
  images: ImageItem[];
};

export default function ProductForm({
  categories,
  initialValues,
}: {
  categories: Category[];
  initialValues?: ProductFormValues;
}) {
  const router = useRouter();
  const isEditing = Boolean(initialValues?.id);

  const [values, setValues] = useState<ProductFormValues>(
    initialValues ?? {
      name: "",
      slug: "",
      summary: "",
      description: "",
      categoryId: categories[0]?.id ?? "",
      featured: false,
      images: [],
    }
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function updateField<K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleNameChange(name: string) {
    setValues((prev) => ({
      ...prev,
      name,
      // Auto-generate the slug from the name, but only while the user
      // hasn't hand-edited the slug field already (basic heuristic: only
      // when creating, not editing an existing product).
      slug: isEditing
        ? prev.slug
        : name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, ""),
    }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError("");

    try {
      const uploaded: ImageItem[] = [];
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
        uploaded.push({ url: data.url, alt: values.name });
      }
      setValues((prev) => ({ ...prev, images: [...prev.images, ...uploaded] }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function removeImage(index: number) {
    setValues((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const url = isEditing ? `/api/products/${initialValues!.id}` : "/api/products";
    const method = isEditing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to save product");
      return;
    }

    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl border border-[#D8D3C8] bg-white p-6">
      <div className="mb-4">
        <label className="mb-1.5 block text-sm font-medium text-[#1C2024]">Product name</label>
        <input
          required
          value={values.name}
          onChange={(e) => handleNameChange(e.target.value)}
          className="w-full border border-[#D8D3C8] px-3 py-2 text-sm outline-none focus:border-[#1F3A5F]"
        />
      </div>

      <div className="mb-4">
        <label className="mb-1.5 block text-sm font-medium text-[#1C2024]">
          URL slug <span className="text-[#8A94A6]">(used in the product page link)</span>
        </label>
        <input
          required
          value={values.slug}
          onChange={(e) => updateField("slug", e.target.value)}
          className="w-full border border-[#D8D3C8] px-3 py-2 text-sm outline-none focus:border-[#1F3A5F]"
        />
      </div>

      <div className="mb-4">
        <label className="mb-1.5 block text-sm font-medium text-[#1C2024]">Category</label>
        <select
          required
          value={values.categoryId}
          onChange={(e) => updateField("categoryId", e.target.value)}
          className="w-full border border-[#D8D3C8] bg-white px-3 py-2 text-sm outline-none focus:border-[#1F3A5F]"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="mb-1.5 block text-sm font-medium text-[#1C2024]">
          Short summary <span className="text-[#8A94A6]">(one line, shown on product cards)</span>
        </label>
        <input
          value={values.summary}
          onChange={(e) => updateField("summary", e.target.value)}
          className="w-full border border-[#D8D3C8] px-3 py-2 text-sm outline-none focus:border-[#1F3A5F]"
        />
      </div>

      <div className="mb-4">
        <label className="mb-1.5 block text-sm font-medium text-[#1C2024]">
          Full description
        </label>
        <textarea
          rows={5}
          value={values.description}
          onChange={(e) => updateField("description", e.target.value)}
          className="w-full border border-[#D8D3C8] px-3 py-2 text-sm outline-none focus:border-[#1F3A5F]"
        />
      </div>

      <div className="mb-4">
        <label className="flex items-center gap-2 text-sm text-[#1C2024]">
          <input
            type="checkbox"
            checked={values.featured}
            onChange={(e) => updateField("featured", e.target.checked)}
          />
          Feature on homepage
        </label>
      </div>

      <div className="mb-6">
        <label className="mb-1.5 block text-sm font-medium text-[#1C2024]">Photos</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          disabled={uploading}
          className="mb-3 block text-sm"
        />
        {values.images.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {values.images.map((img, i) => (
              <div key={img.url} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt="" className="h-20 w-20 object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center bg-red-600 text-xs text-white"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        {uploading && <p className="mt-2 text-sm text-[#8A94A6]">Uploading…</p>}
      </div>

      {error && (
        <p className="mb-4 border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving || uploading}
          className="bg-[#1F3A5F] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#16293F] disabled:opacity-60"
        >
          {saving ? "Saving…" : isEditing ? "Save changes" : "Create product"}
        </button>
      </div>
    </form>
  );
}
