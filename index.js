import { fetchHtml } from './src/utilities';

const config = require('config');

const { WEB_URL } = config;

const url = `${WEB_URL}/download/price/priceday/Apr60/swine.html`;

async function logBody() {
  const html = await fetchHtml(url);
  console.log(html);
}

logBody();
