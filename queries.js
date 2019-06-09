/* import { Pool } from 'pg';

const pool = new Pool({
  dbname: 'dajncrljr7g67q',
  host: 'ec2-54-75-245-196.eu-west-1.compute.amazonaws.com',
  port: 5432,
  user: 'zaexbglyihymig',
  password: 'b66449413aef3b9c3cdaf9cf9906ee860b7c81b014d30b4bc6fbf72f3b76add3',
  sslmode: 'require'
})

export const getCapitals = (req, res)  => {
  pool.query('SELECT * FROM "capitals"', (error, results) => {
    if (error) { throw error }
    res.status(200).json(results.rows);
  })
} */


import { Client }  from 'pg';

const client = new Client({
  connectionString: 'postgres://zaexbglyihymig:b66449413aef3b9c3cdaf9cf9906ee860b7c81b014d30b4bc6fbf72f3b76add3@ec2-54-75-245-196.eu-west-1.compute.amazonaws.com:5432/dajncrljr7g67q',
  ssl: true,
});

export const getCapitals = (req, res)  => {
  client.connect();

  client.query('SELECT * FROM capitals', (err, result) => {
    if (err) throw err;
    res.status(200).json(result.rows);
  });
}


export const getSavedCities = (req, res)  => {
  const  query = `SELECT
	saved_cities.city_id city_id,
    capitals.capital_name capital_name,
    capitals.country_code country_code
  FROM
      saved_cities
  INNER JOIN capitals ON saved_cities.city_id = capitals.id;`

  client.connect();
  client.query(query, (err, result) => {
    if (err) throw err;
    res.status(200).json(result.rows);
  });

}