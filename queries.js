/* import { Pool } from 'pg';

const pool = new Pool({
  user: 't',
  host: 'localhost',
  database: 'postgres',
  password: 'elefant',
  port: 5432,
})

export const getCities = (req, res)  => {
  pool.query('SELECT * FROM "cities"', (error, results) => {
    if (error) { throw error }
    res.status(200).json(results.rows);
  })
} */

import { Client } from 'pg';

export const getCities = (req, res, next)  => {
  const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/postgres';
  const client = new Client(connectionString);
  client.connect();
  console.log(client);
  next();
}

