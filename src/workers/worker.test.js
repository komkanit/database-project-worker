import { insertData, saveFarm, savePrice } from './worker';

const farm = {
  farmName: 'farmName',
  address: 'address',
  province: 'province',
  tel: 'tel',
  month: 'มกราคม',
  year: '2559',
  data: ['-', '-', 100.00]
};
const mockPool = {
  query: queryMessage => queryMessage
};
const type = 'broiler';

test('Should data send to query farm format is correct', async () => {
  const response = await saveFarm(100, farm, mockPool);
  expect(response.split(' ').join('')).toEqual(`
    INSERT INTO Farm (id, name, address, province, tel)
    VALUES (100, 'farmName', 'address', 'province', 'tel');
  `.split(' ').join(''));
});

test('Should data send to query price format is correct', async () => {
  const response = await savePrice(100, 100.15, '2017-10-1', 100, 100, mockPool);
  expect(response.split(' ').join('')).toEqual(`
    INSERT INTO Price (price_id, farm_id, product_id, date, price)
    VALUES (100, 100, 100, '2017-10-1', 100.15);
  `.split(' ').join(''));
});

test('Should insertData return completed', async () => {
  expect(await insertData(farm, type, mockPool)).toEqual('completed');
});
