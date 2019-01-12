import { Pool, QueryResult, QueryConfig } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

export const query =
  (text: string | QueryConfig, params?: any[]): Promise<QueryResult> => {
    return pool.query(text, params);
  };
