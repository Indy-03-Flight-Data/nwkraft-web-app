//database/db.ts
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: true,
    },
});

export default pool;
