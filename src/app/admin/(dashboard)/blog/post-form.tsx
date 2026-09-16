"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadImage as uploadImageFile } from "@/lib/client-upload";

type PostFormValues = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  metaTitle: string;
  metaKeywords: string;
  metaDescription: string;
  published: boolean;
};

const EMPTY_POST: PostFormValues = {
  title: "", slug: "", excerpt: "", content: "", coverImage: "",
  metaTitle: "", metaKeywords: "", metaDescription: "", published: false,
};

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function BlogPostForm({ initialValues }: { initialValues?: PostFormValues }) {
  const router = useRouter();
  const isEditing = Boolean(initialValues?.id);
  const [values, setValues] = useState<PostFormValues>(initialValues ?? EMPTY_POST);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const contentRef = useRef<HTMLTextAreaElement>(null);

  function update<K extends keyof PostFormValues>(key: K, value: PostFormValues[K]) {
    setValues((previous) => ({ ...previous, [key]: value }));
  }

  function handleBlogName(value: string) {
    setValues((previous) => ({
      ...previous,
      title: value,
      slug: isEditing ? previous.slug : slugify(value),
      metaTitle: isEditing || previous.metaTitle ? previous.metaTitle : value,
    }));
  }

  async function uploadImage(file: File, insertInContent: boolean) {
    if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
      throw new Error("Only JPG, JPEG, PNG, or GIF images are allowed.");
    }
    if (file.size > 2 * 1024 * 1024) throw new Error("Images must be 2MB or smaller.");

    setUploading(true);
    try {
      const imageUrl = await uploadImageFile(file, "blog");

      if (!insertInContent) {
        update("coverImage", imageUrl);
        return;
      }

      const caret = contentRef.current?.selectionStart ?? values.content.length;
      const markup = `\n![${values.title || "Blog image"}](${imageUrl})\n`;
      update("content", `${values.content.slice(0, caret)}${markup}${values.content.slice(caret)}`);
    } finally {
      setUploading(false);
    }
  }

  async function handleFile(file: File | undefined, insertInContent: boolean) {
    if (!file) return;
    setError("");
    try {
      await uploadImage(file, insertInContent);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Image upload failed");
    }
  }

  async function handlePaste(event: React.ClipboardEvent<HTMLTextAreaElement>) {
    const file = Array.from(event.clipboardData.files).find((item) => item.type.startsWith("image/"));
    if (!file) return;
    event.preventDefault();
    await handleFile(file, true);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const response = await fetch(isEditing ? `/api/blog/${initialValues!.id}` : "/api/blog", {
      method: isEditing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setSaving(false);
    if (!response.ok) {
      const data = await response.json();
      setError(data.error || "Failed to save post");
      return;
    }
    router.push("/admin/blog");
    router.refresh();
  }

  const fieldClass = "mt-1.5 w-full border border-[#D8D3C8] px-3 py-2 text-sm outline-none focus:border-[#1F3A5F]";

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6 border border-[#D8D3C8] bg-white p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium text-[#1C2024]">
          Blog Name <span className="text-red-600">*</span>
          <input required value={values.title} onChange={(event) => handleBlogName(event.target.value)} className={fieldClass} />
        </label>
        <label className="block text-sm font-medium text-[#1C2024]">
          Slug <span className="text-red-600">*</span>
          <input required value={values.slug} onChange={(event) => update("slug", slugify(event.target.value))} className={fieldClass} />
          <span className="mt-1 block text-xs font-normal text-[#8A94A6]">Generated from the blog name; you can edit it.</span>
        </label>
      </div>

      <div>
        <p className="text-sm font-medium text-[#1C2024]">Featured Photo <span className="text-red-600">*</span></p>
        <div className="mt-1.5 flex flex-wrap items-center gap-4 border border-dashed border-[#AABAB6] bg-[#F7F5F1] p-4">
          <input type="file" accept="image/jpeg,image/png,image/gif" disabled={uploading} onChange={async (event) => { await handleFile(event.target.files?.[0], false); event.target.value = ""; }} className="text-sm" />
          {values.coverImage && <><img src={values.coverImage} alt="Featured image preview" className="h-20 w-28 object-cover" /><button type="button" onClick={() => update("coverImage", "")} className="text-xs font-semibold text-red-700">Remove</button></>}
        </div>
        <p className="mt-1 text-xs text-[#8A94A6]">Supported formats: JPG, JPEG, PNG, GIF. Maximum image size: 2MB.</p>
      </div>

      <label className="block text-sm font-medium text-[#1C2024]">
        Description <span className="text-red-600">*</span>
        <textarea ref={contentRef} required rows={12} value={values.content} onPaste={handlePaste} onChange={(event) => update("content", event.target.value)} placeholder="Write your blog content here..." className={`${fieldClass} leading-6`} />
      </label>

      <div className="border-l-2 border-[#1F3A5F] bg-[#F7F5F1] px-4 py-3 text-xs leading-5 text-[#5B6472]">
        <strong className="text-[#1C2024]">Image Upload Tips:</strong><br />
        • Use the image upload button below instead of copy-paste<br />
        • Pasted images will be automatically converted to files<br />
        • Maximum image size: 2MB
        <label className="mt-2 inline-flex cursor-pointer bg-[#1F3A5F] px-3 py-2 text-xs font-medium text-white hover:bg-[#16293F]">
          {uploading ? "Uploading…" : "Upload image into description"}
          <input type="file" accept="image/jpeg,image/png,image/gif" className="hidden" disabled={uploading} onChange={async (event) => { await handleFile(event.target.files?.[0], true); event.target.value = ""; }} />
        </label>
      </div>

      <label className="block text-sm font-medium text-[#1C2024]">Meta Title <span className="text-red-600">*</span><input required value={values.metaTitle} onChange={(event) => update("metaTitle", event.target.value)} className={fieldClass} /></label>
      <label className="block text-sm font-medium text-[#1C2024]">Meta Keywords <span className="text-red-600">*</span><input required value={values.metaKeywords} onChange={(event) => update("metaKeywords", event.target.value)} className={fieldClass} /><span className="mt-1 block text-xs font-normal text-[#8A94A6]">Separate keywords with commas</span></label>
      <label className="block text-sm font-medium text-[#1C2024]">Meta Description <span className="text-red-600">*</span><textarea required rows={3} value={values.metaDescription} onChange={(event) => update("metaDescription", event.target.value)} className={fieldClass} /></label>
      <label className="block text-sm font-medium text-[#1C2024]">Short excerpt <span className="text-xs font-normal text-[#8A94A6]">(optional)</span><input value={values.excerpt} onChange={(event) => update("excerpt", event.target.value)} className={fieldClass} /></label>
      <label className="flex items-center gap-2 text-sm text-[#1C2024]"><input type="checkbox" checked={values.published} onChange={(event) => update("published", event.target.checked)} />Published</label>
      {error && <p className="border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <button type="submit" disabled={saving || uploading} className="bg-[#1F3A5F] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#16293F] disabled:opacity-60">{saving ? "Saving…" : isEditing ? "Save changes" : "Create post"}</button>
    </form>
  );
}
