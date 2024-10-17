import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/db"; // Ensure this path is correct
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Get session to determine the user making the request
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const accountId = session.user.id;

    // Query to fetch the favorite airports for the logged-in user
    const result = await query(
      `SELECT airports.ident AS code, airports.name AS airport_name
       FROM favorites
       JOIN airports ON favorites.airport_code = airports.ident
       WHERE favorites.account_id = $1`,
      [accountId]
    );

    res.status(200).json(result.rows); // Send the favorite airports as response
  } catch (error) {
    console.error("Error fetching favorite airports:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
