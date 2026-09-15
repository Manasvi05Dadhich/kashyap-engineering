import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SESSION_COOKIE = "admin_session";
const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET && process.env.NODE_ENV === "production") {
  // Fail loudly at build/runtime rather than silently signing with "undefined".
  throw new Error("JWT_SECRET environment variable is not set");
}

export type AdminSession = {
  adminId: string;
  email: string;
  name: string;
};

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function createSessionToken(payload: AdminSession) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifySessionToken(token: string): AdminSession | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminSession;
  } catch {
    return null;
  }
}

export const SESSION_COOKIE_NAME = SESSION_COOKIE;
