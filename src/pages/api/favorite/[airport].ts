import { NextApiRequest, NextApiResponse } from "next";
import { AuthOptions, getServerSession } from "next-auth";
import { Pool } from "pg";
import { authOptions } from "../auth/[...nextauth]";

const pool = new Pool({
  connectionString: process.env.Database_URL,

  ssl: {
    rejectUnauthorized: false,
  },
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { airport } = req.query;

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const account_id = session.user.id;

  if (req.method === "GET") {
    try {
      const result = await pool.query(
        "SELECT account_id, airport_code FROM favorites WHERE LOWER(airport_code) = LOWER($1) and account_id = $2",
        [airport, account_id]
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
        "INSERT INTO favorites (airport_code, account_id) values ($1,$2)",
        [airport, account_id]
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
        "DELETE FROM favorites WHERE airport_code = $1 AND account_id= $2",
        [airport, account_id]
      );
      res.status(200).json({ message: "Success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
