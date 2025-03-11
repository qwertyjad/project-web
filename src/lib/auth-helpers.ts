import { cookies } from "next/headers";

type User = {
  id: string;
  name: string;
  email: string;
};

export function getUser(): User | null {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return null;
  }

  try {
    // Simple parsing instead of verification
    // This is a temporary solution until jsonwebtoken is properly installed
    const base64Payload = token.split(".")[1];
    const payload = Buffer.from(base64Payload, "base64").toString("utf8");
    return JSON.parse(payload);
  } catch (error) {
    return null;
  }
}
