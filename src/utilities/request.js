const fetch = require('node-fetch');

export const fetchHtml = async (url, fetchFunc = fetch) => {
  const response = await fetchFunc(url);
  return response.text();
};
