import { insertData } from './worker';

test('Should data send to query format is correct', async () => {
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
  const response = await insertData(farm, mockPool);
  expect(response.split(' ').join('')).toEqual(`
    INSERT INTO Farm (id, name, address, province, tel)
    VALUES (807, 'farmName', 'address', 'province', 'tel');
  `.split(' ').join(''));
});
