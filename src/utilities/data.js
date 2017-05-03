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
export const types = [
  {
    type: 'animal',
    kinds: [
      'swine',
      'broiler',
      'eggs',
      'eggs3',
      'eggs4'
    ]
  },
  {
    type: 'plant',
    kinds: [
      'casava',
      'casava25',
      'casava30'
    ]
  }
];

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
export const provinces = [
  'กรุงเทพมหานคร',
  'สมุทรปรากา',
  'นนทบุรี',
  'ปทุมธานี',
  'พระนครศรีอยุธยา',
  'ลพบุรี',
  'อ่างทอง',
  'สิงห์บุรี',
  'ชัยนาท ',
  'สระบุรี',
  'ชลบุรี  ',
  'ระยอง   ',
  'จันทบุรี  ',
  'ตราด   ',
  'ฉะเชิงเทรา',
  'ปราจีนบุรี',
  'นครนายก   ',
  'สระแก้ว   ',
  'นครราชสีมา  ',
  'บุรีรัมย์  ',
  'สุรินทร์   ',
  'ศรีสะเกษ   ',
  'อุบลราชธานี   ',
  'ยโสธร   ',
  'ชัยภูมิ  ',
  'อำนาจเจริญ  ',
  'หนองบัวลำภู ',
  'ขอนแก่น ',
  'อุดรธานี ',
  'เลย  ',
  'หนองคาย ',
  'มหาสารคาม  ',
  'ร้อยเอ็ด ',
  'กาฬสินธุ์ ',
  'สกลนคร  ',
  'นครพนม  ',
  'มุกดาหาร ',
  'เชียงใหม่ ',
  'ลำพูน   ',
  'ลำปาง  ',
  'อุตรดิตถ์  ',
  'แพร่  ',
  'น่าน   ',
  'พะเยา ',
  'เชียงราย  ',
  'แม่ฮ่องสอน  ',
  'นครสวรรค์  ',
  'อุทัยธานี   ',
  'กำแพงเพชร ',
  'ตาก   ',
  'สุโขทัย   ',
  'พิษณุโลก  ',
  'พิจิตร   ',
  'เพชรบูรณ์ ',
  'ราชบุรี   ',
  'กาญจนบุรี  ',
  'สุพรรณบุรี ',
  'นครปฐม   ',
  'สมุทรสาคร   ',
  'สมุทรสงคราม',
  'เพชรบุรี',
  'ประจวบคีรีขันธ์',
  'นครศรีธรรมราช',
  'กระบี่',
  'พังงา',
  'ภูเก็ต',
  'สุราษฎร์ธานี',
  'ระนอง',
  'ชุมพร',
  'สงขลา',
  'สตูล',
  'ตรัง',
  'พัทลุง',
  'ปัตตานี',
  'ยะลา',
  'นราธิวาส',
  'บึงกาฬ'
];
