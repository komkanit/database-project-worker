import { fetchHtml } from '../utilities';

export const bodyToArray = async (url, fetch = fetchHtml) => {
  const body = await fetch(url);
  return body.split('');
};
