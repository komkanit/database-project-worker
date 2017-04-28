import { insertData, saveFarm, savePrice, saveProduct, saveFarmProduct, savePriceStamp } from './worker';

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
  const response = await savePrice(100, 100.15, mockPool);
  expect(response.split(' ').join('')).toEqual(`
    INSERT INTO Price (price_id, price)
    VALUES (100, 100.15);
  `.split(' ').join(''));
});

test('Should data send to query priceStamp format is correct', async () => {
  const response = await savePriceStamp(12345, 1000, '2017-3-10', mockPool);
  expect(response.split(' ').join('')).toEqual(`
    INSERT INTO PriceStamp (id, farmproductid, date)
    VALUES (12345, 1000, '2017-3-10');
  `.split(' ').join(''));
});

test('Should insertData return completed', async () => {
  expect(await insertData(farm, type, mockPool)).toEqual('completed');
});

test('Should data send to query Product format is correct', async () => {
  const productName = 'productName';
  const response = await saveProduct(100, productName, mockPool);
  expect(response.split(' ').join('')).toEqual(`
    INSERT INTO Product (id, name)
    VALUES (100, 'productName');
  `.split(' ').join(''));
});

test('Should data send to query FarmProduct format is correct', async () => {
  const response = await saveFarmProduct(100100, 200, 100, mockPool);
  expect(response.split(' ').join('')).toEqual(`
    INSERT INTO FarmProduct (id, farm_id, product_id)
    VALUES (100100, 200, 100);
  `.split(' ').join(''));
});
