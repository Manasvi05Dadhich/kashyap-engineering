import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function GET() {
  return NextResponse.json({ clientUploadEnabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN) });
}

export async function POST(request: NextRequest) {
  const kind = new URL(request.url).searchParams.get("kind") === "blog" ? "blog" : "products";
  const maxSize = kind === "blog" ? 2 * 1024 * 1024 : 8 * 1024 * 1024;

  if (request.headers.get("content-type")?.includes("application/json")) {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ error: "Client uploads are not configured" }, { status: 501 });
    }

    const body = (await request.json()) as HandleUploadBody;
    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ALLOWED_TYPES,
        maximumSizeInBytes: maxSize,
      }),
      onUploadCompleted: async () => undefined,
    });
    return NextResponse.json(response);
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads", kind);
  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Only JPEG, PNG, WEBP, or GIF images are allowed" },
      { status: 400 }
    );
  }

  if (file.size > maxSize) {
    return NextResponse.json({ error: `File must be under ${kind === "blog" ? "2MB" : "8MB"}` }, { status: 400 });
  }

  await mkdir(uploadDir, { recursive: true });

  const ext = path.extname(file.name) || `.${file.type.split("/")[1]}`;
  const filename = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`uploads/${kind}/${filename}`, buffer, {
      access: "public",
      contentType: file.type,
    });
    return NextResponse.json({ url: blob.url });
  }

  const filePath = path.join(uploadDir, filename);
  await writeFile(filePath, buffer);

  const url = `/uploads/${kind}/${filename}`;
  return NextResponse.json({ url });
}
