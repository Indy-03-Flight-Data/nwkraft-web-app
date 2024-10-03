//database/db.ts
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL || 'postgres://u9ml7n5ihqt22j:pbdfcb4448bdae50abc0aa73ce1046df8332693e616af6427e5b96ed5a0bf9c47@cd27da2sn4hj7h.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/d7ghsic74gmlvj';

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: process.env.NODE_ENV === 'production', // Only require SSL in production
    },
});

export default pool;
