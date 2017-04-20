import { fetchHtml } from '../utilities';

const mockFetch = () => ({
  text: () => 'text html'
});

test('fetchHtml Should response text', async () => {
  const mockBody = await fetchHtml('testurl', mockFetch);
  expect(mockBody).toEqual('text html');
});
