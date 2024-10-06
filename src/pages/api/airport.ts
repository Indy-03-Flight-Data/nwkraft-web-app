import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.Database_URL,

  ssl: {
    rejectUnauthorized: false,
  },
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.query;

  try {
    pool.connect();

    const result = await pool.query(
      'SELECT elevation_ft, ident, name, type, latitude_deg, longitude_deg, municipality, iso_region FROM airports WHERE Ident = $1',
      [code]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
