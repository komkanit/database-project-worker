import pool from '../db-config';
import {
  changeDataTableToArray,
  nameToID,
  fetchHtml,
  types,
  months,
  getDate,
  mergeID
} from '../utilities';

require('dotenv').config();

export const saveFarm = (farm, type, poolFunc) => (
  poolFunc.query(`
    INSERT INTO Farm (id, name, address, province, tel, type)
    VALUES (${nameToID(farm.farmName)}, '${farm.farmName}', '${farm.address}', '${farm.province}', '${farm.tel}', '${type}');
  `)
);

export const savePrice = (priceID, price, date, farmID, productID, poolFunc) => (
  poolFunc.query(`
    INSERT INTO Price (price_id, farm_id, product_id, date, price)
    VALUES (${priceID}, ${farmID}, ${productID}, '${date}', ${price});
  `)
);

export const insertData = async (farm, type, poolFunc = pool) => {
  try {
    // await saveFarm(farm, type, poolFunc);
    await Promise.all(
      farm.data.map(async (price, index) => {
        const farmID = nameToID(farm.farmName);
        const productID = nameToID(type);
        const date = getDate(farm.year, farm.month, index + 1);
        if (date != null) {
          const priceID = mergeID([farmID, productID, nameToID(date)]);
          const priceFilter = (price === '-') ? 0 : price;
          await savePrice(priceID, priceFilter, date, farmID, productID, poolFunc);
        }
      })
    );
    // await console.log(`Save ${farm.farmName} ${type} completed`);
    return 'completed';
  } catch (err) {
    console.error('error running query', err);
    return err;
  }
};

export const runWorker = () => {
  const year = 59;
  types.map(type => (
    months.map(async (month) => {
      const url = `${process.env.WEB_URL}/download/price/priceday/${month.eng}${year}/${type}.html`;
      const html = await fetchHtml(url);
      const farms = changeDataTableToArray(html);
      return farms.map((farm) => {
        insertData(farm, type);
        return farm;
      });
    })
  ));
  console.log('worker completed');
};
