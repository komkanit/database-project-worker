import { getMonth, getDate, mergeID } from './data';

test('Should test month by type', () => {
  const expectedMonth = [{
    number: 10,
    eng: 'Oct',
    thai: 'ตุลาคม',
    max: 31
  }];
  expect(getMonth('ตุลาคม', 'thai')).toEqual(expectedMonth);
  expect(getMonth('no', 'eng')).toEqual([{ eng: 'error', number: 9999, max: -1 }]);
});

test('Should get date from data', () => {
  expect(getDate('2560', 'มกราคม', 10)).toEqual('2017-1-10');
  expect(getDate('2558', 'ธันวาคม', 5)).toEqual('2015-12-5');
  expect(getDate('2558', 'no', 5)).toEqual(null);
  expect(getDate('2558', 'มกราคม', 32)).toEqual(null);
});

test('Should merge id to new id', () => {
  expect(mergeID([100, 200, 300])).toEqual('100200300');
});
