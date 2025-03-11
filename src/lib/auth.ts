import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

export function getUser() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return null;
  }

  try {
    const user = verify(token, process.env.JWT_SECRET || "your-secret-key");
    return user;
  } catch (error) {
    return null;
  }
}
