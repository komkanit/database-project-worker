export const months = [
  {
    number: 1,
    eng: 'Jan',
    thai: 'มกราคม'
  },
  {
    number: 2,
    eng: 'Feb',
    thai: 'กุมภาพันธ์'
  },
  {
    number: 3,
    eng: 'Mar',
    thai: 'มีนาคม'
  },
  {
    number: 4,
    eng: 'Apr',
    thai: 'เมษายน'
  },
  {
    number: 5,
    eng: 'May',
    thai: 'พฤษภาคม'
  },
  {
    number: 6,
    eng: 'Jun',
    thai: 'มิถุนายน'
  },
  {
    number: 7,
    eng: 'Jul',
    thai: 'กรกฎาคม'
  },
  {
    number: 8,
    eng: 'Aug',
    thai: 'สิงหาคม'
  },
  {
    number: 9,
    eng: 'Sep',
    thai: 'กันยายน'
  },
  {
    number: 10,
    eng: 'Oct',
    thai: 'ตุลาคม'
  },
  {
    number: 11,
    eng: 'Nov',
    thai: 'พฤศจิกายน'
  },
  {
    number: 12,
    eng: 'Dec',
    thai: 'ธันวาคม'
  }
];
export const types = ['swine', 'broiler', 'shallots', 'eggs'];

export const getMonth = (data, type) => (
  months.filter(month => month[type] === data)
);
export const getDate = (year, month, day) => (
  `${parseInt(year, 10) - 543}-${getMonth(month, 'thai')[0].number}-${day}`
);
