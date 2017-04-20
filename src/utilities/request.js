const fetch = require('node-fetch');

export const fetchHtml = async (url) => {
  const response = await fetch(url);
  return response.text();
};
