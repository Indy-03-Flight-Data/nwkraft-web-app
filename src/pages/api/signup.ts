import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.Database_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { username, password, specialKey } = req.body;
    //console.log(req.body);

    // Check if the special key matches the one in the .env file
    if (specialKey !== process.env.Special_Key) {
      return res.status(403).json({ message: 'Invalid special key' });
    }

    try {
      // Check for existing username
      const existingUser = await pool.query('SELECT * FROM accounts WHERE username = $1', [username]);
      if (existingUser.rows.length > 0) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      // Create new user (consider hashing the password before storing)
      await pool.query('INSERT INTO accounts (username, password) VALUES ($1, $2)', [username, password]);
      return res.status(201).json({ message: 'Account created successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' }); 
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
