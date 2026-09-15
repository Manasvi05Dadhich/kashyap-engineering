import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(request: NextRequest) {
  const kind = new URL(request.url).searchParams.get("kind") === "blog" ? "blog" : "products";
  const uploadDir = path.join(process.cwd(), "public", "uploads", kind);
  const maxSize = kind === "blog" ? 2 * 1024 * 1024 : 8 * 1024 * 1024;
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
  const filePath = path.join(uploadDir, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, buffer);

  const url = `/uploads/${kind}/${filename}`;
  return NextResponse.json({ url });
}
