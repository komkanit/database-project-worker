import { fetchHtml } from '../utilities';

const xray = require('x-ray');

const x = xray();

export const bodyToArray = async (url, fetch = fetchHtml) => {
  const body = await fetch(url);
  return body.split('');
};
export const changeInsideTagToArray = (body, targetTag, subTag) => (
  x(body, targetTag, [[subTag]])
);

export function changeDataTableToArray(html){
  let data = [];
  x(html, 'tr', [['td']])((err, d) => {
    data = d;
  });
  const year = data[0][0].replace('ปี ', '');
  data.forEach(e => e.reverse());
  data.shift();
  const dataArray = data.reduce((arr, x) => {
    x.forEach((value, i) => {
      arr[i] = arr[i] || [];
      arr[i].push(value)
    });
    return arr;
  }, []);
  dataArray.reverse();
  const month = dataArray[0][1];
  dataArray.splice(0, 2);
  const dataObj = dataArray.filter((d) => (d[0] !== '')).map((arr) => {
    return {
      farmName: arr[0].replace(/\s\s+/g, ' '),
      address: arr[1].replace(/  +/g, ' '),
      province: arr[2].replace('จ.', ''),
      tel: arr[3].replace('โทร', '').replace('.', ''),
      year: year,
      month: month,
      data: arr.slice(4, arr.length).map(data => (isNaN(parseFloat(data)) ? '-' : data))
    };
  });
  return dataObj;
}
