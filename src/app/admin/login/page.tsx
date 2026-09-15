"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Login failed");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F5F1] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="inline-block bg-[#1F3A5F] px-3 py-1.5 text-sm font-semibold tracking-wide text-white">
            KASHYAP ENGINEERING
          </div>
          <p className="mt-3 text-sm text-[#5B6472]">Admin panel</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border border-[#D8D3C8] bg-white p-8"
        >
          <div className="mb-4">
            <label className="mb-1.5 block text-sm font-medium text-[#1C2024]">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#D8D3C8] px-3 py-2 text-sm outline-none focus:border-[#1F3A5F]"
              placeholder="you@kashyapengineering.com"
            />
          </div>

          <div className="mb-6">
            <label className="mb-1.5 block text-sm font-medium text-[#1C2024]">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#D8D3C8] px-3 py-2 text-sm outline-none focus:border-[#1F3A5F]"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="mb-4 border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1F3A5F] py-2.5 text-sm font-medium text-white transition hover:bg-[#16293F] disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
