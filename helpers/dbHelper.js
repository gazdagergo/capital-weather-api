import dotenv from 'dotenv';
import { Client }  from 'pg';

dotenv.config();

const connectionConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: true,
}

export const dbQuery = query => (
  new Promise((resolve, reject) => {
    const client = new Client(connectionConfig);  
    client.connect();
    client.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
      client.end();
    })    
  })
)
