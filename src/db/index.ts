import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

export const query = (text: string, params?: any[], callback?: () => void) => {
  return pool.query(text, params, callback);
};
