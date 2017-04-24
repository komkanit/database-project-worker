import { insertData, saveFarm } from './worker';

const farm = {
  farmName: 'farmName',
  address: 'address',
  province: 'province',
  tel: 'tel',
  month: 'month',
  year: 'year',
  data: ['-', '-', 100.00]
};
const mockPool = {
  query: queryMessage => queryMessage
};
const type = 'broiler';

test('Should data send to query format is correct', async () => {
  const response = await saveFarm(farm, type, mockPool);
  expect(response.split(' ').join('')).toEqual(`
    INSERT INTO Farm (id, name, address, province, tel, type)
    VALUES (807, 'farmName', 'address', 'province', 'tel', 'broiler');
  `.split(' ').join(''));
});

test('Should insertData return completed', async () => {
  expect(await insertData(farm, type, mockPool)).toEqual('completed');
});
