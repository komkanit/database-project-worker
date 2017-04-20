import { fetchHtml } from './src/utilities';
const config = require('config');
const { WEB_URL } = config;
var url = `${WEB_URL}/download/price/priceday/Nov59/swine.html`;
fetchHtml(url)
  .then((body) => {
    console.log(body);
  })