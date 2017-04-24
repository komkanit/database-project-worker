import { getMonth } from './data';

test('Should test month by type', () => {
  const expectedMonth = [{
    number: 10,
    eng: 'Oct',
    thai: 'ตุลาคม'
  }];
  expect(getMonth('ตุลาคม', 'thai')).toEqual(expectedMonth);
});
