import { fetchHtml } from '../utilities';

export const logBody = async (url) => {
  const body = await fetchHtml(url);
  console.log(body);
}