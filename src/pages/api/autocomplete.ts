import { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.Database_URL,

  ssl: {
    rejectUnauthorized: false,
  },
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req.query;

  // Check if query exists
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const result = await pool.query(
      "SELECT Ident, name FROM airports WHERE Ident ILIKE $1 LIMIT 10",
      [`%${query}%`]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Database query error:", error);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    } else {
      console.error("Unexpected error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
