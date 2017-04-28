const fetch = require('node-fetch');

export const fetchHtml = async (url, fetchFunc = fetch) => {
  try {
    await console.log(`fetching... [${url}]`);
    const response = await fetchFunc(url);
    await Promise.resolve(console.log(`fetch completed [${url}]`));
    return response.text();
  } catch (err) {
    console.log(err);
    return err;
  }
};
