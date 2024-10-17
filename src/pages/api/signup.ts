import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/db"; // Ensure this path is correct

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { username, password, key } = req.body;

  // Check if the provided special key matches the one in .env
  if (key !== process.env.SPECIAL_KEY) {
    return res.status(401).json({ error: "Invalid special key" });
  }

  try {
    // Create the user in the database
    await query(
      "INSERT INTO accounts (username, password) VALUES ($1, $2)",
      [username, password]
    );

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
