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
    // Verify and decode the JWT token
    const jwt = require("jsonwebtoken");
    const user = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
    return user as User;
  } catch (error) {
    return null;
  }
}
