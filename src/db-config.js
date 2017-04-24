const pg = require('pg');
require('dotenv').config();

const config = {
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  max: parseInt(process.env.DB_MAX, 10),
  idleTimeoutMillis: parseInt(process.env.DB_TIME, 10),
  ssl: process.env.DB_SSL
};

const pool = new pg.Pool(config);

export default pool;
