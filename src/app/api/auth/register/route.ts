import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required" },
        { status: 400 },
      );
    }

    // Check if user already exists
    const existingUsers = (await executeQuery(
      "SELECT * FROM users WHERE email = ?",
      [email],
    )) as any[];

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 },
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    await executeQuery(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
    );

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 },
    );
  }
}
