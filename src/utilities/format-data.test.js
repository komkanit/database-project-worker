import { bodyToArray } from '../utilities';

const mockFetchHtml = () => '<p>testword<p>';

test('bodyToArray should change text to array', async () => {
  const mockArray = await bodyToArray('testurl', mockFetchHtml);
  const ans = mockFetchHtml().split('');
  expect(mockArray).toEqual(ans);
});
