import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.Database_URL,
  ssl: { rejectUnauthorized: false }, // Required for Heroku connections
});

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};
