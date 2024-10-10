//database/db.ts
import { Pool } from 'pg';

const connectionString = process.env.Database_URL

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

export default pool;
