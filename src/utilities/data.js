export const months = [
  {
    number: 1,
    eng: 'Jan',
    thai: 'มกราคม',
    max: 31
  },
  {
    number: 2,
    eng: 'Feb',
    thai: 'กุมภาพันธ์',
    max: 29
  },
  {
    number: 3,
    eng: 'Mar',
    thai: 'มีนาคม',
    max: 31
  },
  {
    number: 4,
    eng: 'Apr',
    thai: 'เมษายน',
    max: 30
  },
  {
    number: 5,
    eng: 'May',
    thai: 'พฤษภาคม',
    max: 31
  },
  {
    number: 6,
    eng: 'Jun',
    thai: 'มิถุนายน',
    max: 30
  },
  {
    number: 7,
    eng: 'Jul',
    thai: 'กรกฎาคม',
    max: 31
  },
  {
    number: 8,
    eng: 'Aug',
    thai: 'สิงหาคม',
    max: 31
  },
  {
    number: 9,
    eng: 'Sep',
    thai: 'กันยายน',
    max: 30
  },
  {
    number: 10,
    eng: 'Oct',
    thai: 'ตุลาคม',
    max: 31
  },
  {
    number: 11,
    eng: 'Nov',
    thai: 'พฤศจิกายน',
    max: 30
  },
  {
    number: 12,
    eng: 'Dec',
    thai: 'ธันวาคม',
    max: 31
  }
];
export const types = ['swine', 'broiler', 'casava', 'casava25', 'casava30', 'eggs', 'eggs3', 'eggs4'];
export const getMonth = (data, type) => {
  const month = months.filter(month => month[type] === data);
  return (month.length > 0) ? month : [{ number: 9999, eng: 'error', max: -1 }];
};

export const getDate = (year, month, day) => {
  const yearNew = parseInt(year, 10) - 543;
  const monthNew = getMonth(month, 'thai')[0];
  return (monthNew.number === 9999 || day > monthNew.max) ? null : `${yearNew}-${monthNew.number}-${day}`;
};
export const mergeID = data => (
  data.reduce((prev, curr) => (prev + curr), '')
);
