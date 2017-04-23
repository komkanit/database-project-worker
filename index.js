import { fetchHtml } from './src/utilities';
import pool from './src/utilities/db-config';

require('dotenv').config();

const url = `${process.env.WEB_URL}/download/price/priceday/Apr60/swine.html`;

async function logBody() {
  const html = await fetchHtml(url);
  console.log(html);
}

logBody();

const queryExample = async () => {
  try {
    const res = await pool.query('SELECT * from farm_test');
    await res.rows.map((row) => {
      console.log('name: ', row.name);
      return row;
    });
  } catch (err) {
    console.error('error running query', err);
  }
};

queryExample();
