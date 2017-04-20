import { fetchHtml } from './src/utilities';

const config = require('config');

const { WEB_URL } = config;

const url = `${WEB_URL}/download/price/priceday/Nov59/swine.html`;

async function logBody() {
  const body = await fetchHtml(url);
  console.log(body);
}

logBody();
