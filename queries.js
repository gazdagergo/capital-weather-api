import dotenv from 'dotenv';
import { Client }  from 'pg';

dotenv.config();

const connectionConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: true,
}

export const getCapitals = (req, res)  => {
  const client = new Client(connectionConfig);  
  client.connect();

  client.query('SELECT * FROM capitals', (err, result) => {
    if (err) throw err;
    res.status(200).json(result.rows);
    client.end();
  });
}


export const getSavedCities = (req, res)  => {
  const client = new Client(connectionConfig);  
  client.connect();

  const query = (
    `SELECT
      saved_cities.id id,
      saved_cities.city_id city_id,
      capitals.capital_name capital_name,
      capitals.country_code country_code
    FROM
        saved_cities
    INNER JOIN capitals ON saved_cities.city_id = capitals.id;`
  );

  client.query(query, (err, result) => {
    if (err) throw err;
    res.status(200).json(result.rows);
    client.end();
  });

}