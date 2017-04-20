import { fetchHtml } from '../utilities';

const xray = require('x-ray');

const x = xray();

export const bodyToArray = async (url, fetch = fetchHtml) => {
  const body = await fetch(url);
  return body.split('');
};
export const changeInsideTagToArray = (body, targetTag, subTag) => (
  x(body, targetTag, [[subTag]])
);

