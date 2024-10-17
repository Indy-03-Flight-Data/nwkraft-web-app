import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  try {
    const result = await query(
      "SELECT id, username FROM accounts WHERE username = $1 AND password = $2",
      [username, password]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];
      return NextResponse.json({ id: user.id, username: user.username });
    }
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    console.error("Error verifying user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
