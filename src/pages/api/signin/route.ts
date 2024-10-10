import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs'; // Make sure to install bcrypt

const pool = new Pool({
  connectionString: process.env.Database_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      const user = await pool.query('SELECT * FROM accounts WHERE username = $1', [username]);

      if (user.rows.length === 0 || !(await bcrypt.compare(password, user.rows[0].password))) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Here you can implement session management (e.g., using cookies or JWT)
      return res.status(200).json({ message: 'Signed in successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
