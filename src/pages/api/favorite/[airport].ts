import { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.Database_URL,

  ssl: {
    rejectUnauthorized: false,
  },
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { airport } = req.query;
  const { account_id } = req.body;

  if (req.method === "GET") {
    try {
      const result = await pool.query(
        "SELECT account_id, airport_code FROM favorites WHERE LOWER(airport_code) = LOWER($1)",
        [airport]
      );
      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  if (req.method === "POST") {
    try {
      const result = await pool.query(
        "INSERT INTO favorites (account_id, airport_code) values ($1,$2)",
        [account_id, airport]
      );
      res.status(200).json({ message: "Success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  if (req.method === "DELETE") {
    try {
      const result = await pool.query(
        "DELETE FROM favorites WHERE account_id = $1 AND airport_code = $2",
        [account_id, airport]
      );
      res.status(200).json({ message: "Success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
