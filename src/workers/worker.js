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

export const savePrice = (priceID, price, poolFunc) => (
  poolFunc.query(`
    INSERT INTO Price (price_id, price)
    VALUES (${priceID}, ${price});
  `)
);

export const saveProduct = (id, productName, poolFunc) => (
  poolFunc.query(`
    INSERT INTO Product (id, name)
    VALUES (${id}, '${productName}');
  `)
);

export const saveFarmProduct = (id, farmID, productID, poolFunc) => (
  poolFunc.query(`
    INSERT INTO FarmProduct (id, farm_id, product_id)
    VALUES (${id}, ${farmID}, ${productID});
  `)
);

export const insertData = async (farm, type, poolFunc = pool) => {
  try {
    const farmID = nameToID(farm.farmName);
    const productID = nameToID(type);
    await saveFarmProduct(mergeID([farmID, productID]), farmID, productID, poolFunc);
    await saveFarm(farmID, farm, poolFunc);
    await saveProduct(productID, type, poolFunc);
    await Promise.all(
      farm.data.map(async (price, index) => {
        const date = getDate(farm.year, farm.month, index + 1);
        const filteredPrice = (price === '-') ? 0 : price;
        if (date != null && filteredPrice !== 0) {
          const priceID = mergeID([farmID, productID, nameToID(date)]);
          await savePrice(priceID, filteredPrice, poolFunc);
        }
      })
    );
    return 'completed';
  } catch (err) {
    console.error('[Error] running query:', err);
    return err;
  }
};
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const runWorker = async () => {
  const year = 59;
  await Promise.all(
    types.map(async type => (
      Promise.all(months.map(async (month) => {
        const url = `${process.env.WEB_URL}/download/price/priceday/${month.eng}${year}/${type}.html`;
        const html = await fetchHtml(url);
        await sleep(3000);
        const farms = changeDataTableToArray(html);
        return Promise.all(
          farms.map(async (farm) => {
            await insertData(farm, type);
            return farm;
          })
        );
      }))
    ))
  );
  await console.log('worker completed');
};
