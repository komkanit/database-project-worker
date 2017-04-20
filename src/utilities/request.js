var fetch = require('node-fetch');

export const fetchHtml = (url) =>
  fetch(url).then((response) => response.text())