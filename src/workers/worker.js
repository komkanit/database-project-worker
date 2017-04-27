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

export const saveFarm = (id, farm, poolFunc) => (
  poolFunc.query(`
    INSERT INTO Farm (id, name, address, province, tel)
    VALUES (${id}, '${farm.farmName}', '${farm.address}', '${farm.province}', '${farm.tel}');
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
    const farmID = nameToID(farm.farmName);
    const productID = nameToID(type);
    await saveFarm(farmID, farm, poolFunc);
    await Promise.all(
      farm.data.map(async (price, index) => {
        const date = getDate(farm.year, farm.month, index + 1);
        const filteredPrice = (price === '-') ? 0 : price;
        if (date != null && filteredPrice !== 0) {
          const priceID = mergeID([farmID, productID, nameToID(date)]);
          // await savePrice(priceID, filteredPrice, date, farmID, productID, poolFunc);
        }
      })
    );
    return 'completed';
  } catch (err) {
    console.error('[Error] running query:', err);
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
