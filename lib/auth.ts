import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "asala-torath-secret-2025"
);

export async function createSession(email: string) {
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  cookies().set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function getSession() {
  try {
    const token = cookies().get("admin_session")?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, secret);
    return payload.email as string | null;
  } catch {
    return null;
  }
}

export async function clearSession() {
  cookies().delete("admin_session");
}
