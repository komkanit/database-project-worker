import { getMonth, getDate } from './data';

test('Should test month by type', () => {
  const expectedMonth = [{
    number: 10,
    eng: 'Oct',
    thai: 'ตุลาคม'
  }];
  expect(getMonth('ตุลาคม', 'thai')).toEqual(expectedMonth);
});

test('Should get date from data', () => {
  expect(getDate('2560', 'มกราคม', 10)).toEqual('2017-1-10');
  expect(getDate('2558', 'ธันวาคม', 5)).toEqual('2015-12-5');
});
