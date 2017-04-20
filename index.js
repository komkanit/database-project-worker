import { logBody } from './src/utilities';
const config = require('config');
const { WEB_URL } = config;

var url = `${WEB_URL}/download/price/priceday/Nov59/swine.html`;
logBody(url);