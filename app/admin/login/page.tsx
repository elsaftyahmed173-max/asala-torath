"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@asala.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "فشل في تسجيل الدخول");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#2E0C10" }}>
      <div style={{ width: "100%", maxWidth: 430, background: "#fff", borderRadius: 24, padding: 28, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}>
        <h1 style={{ textAlign: "center", color: "#2E0C10", marginTop: 0 }}>تسجيل دخول الإدارة</h1>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="البريد الإلكتروني" type="email" style={inputStyle} />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="كلمة المرور" type="password" style={inputStyle} />

          {error && <div style={{ color: "#9c2d2d", fontSize: 14 }}>{error}</div>}

          <button type="submit" disabled={loading} style={{ background: "#D7B26A", color: "#1A0709", border: "none", borderRadius: 999, padding: "12px 18px", fontWeight: 800, cursor: "pointer" }}>
            {loading ? "جاري تسجيل الدخول..." : "دخول"}
          </button>
        </form>
      </div>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  border: "1px solid #eee",
  borderRadius: 12,
  padding: "12px 14px",
  fontSize: 15,
  background: "#fff",
  outline: "none",
} as const;
