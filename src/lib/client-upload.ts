import { upload } from "@vercel/blob/client";

type UploadKind = "blog" | "products";

export async function uploadImage(file: File, kind: UploadKind) {
  const configResponse = await fetch(`/api/upload?kind=${kind}`);
  const config = (await configResponse.json()) as { clientUploadEnabled?: boolean };

  if (config.clientUploadEnabled) {
    const blob = await upload(`uploads/${kind}/${file.name}`, file, {
      access: "public",
      handleUploadUrl: `/api/upload?kind=${kind}`,
    });
    return blob.url;
  }

  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(`/api/upload?kind=${kind}`, { method: "POST", body: formData });
  const data = (await response.json()) as { url?: string; error?: string };
  if (!response.ok || !data.url) throw new Error(data.error || "Upload failed");
  return data.url;
}
