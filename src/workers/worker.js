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

export const savePriceStamp = (priceID, farmProductID, dateID, poolFunc) => (
  poolFunc.query(`
    INSERT INTO PriceStamp (id, farmproductid, date_id)
    VALUES (${priceID}, ${farmProductID}, ${dateID});
  `)
);

export const saveProduct = (id, productName, typeID, poolFunc) => (
  (typeID) ?
  poolFunc.query(`
    INSERT INTO Product (id, name, type_id)
    VALUES (${id}, '${productName}', ${typeID});
  `)
  :
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

export const saveType = (typeID, type, poolFunc) => (
  poolFunc.query(`
    INSERT INTO PriceStamp (id, name)
    VALUES (${typeID}, '${type}');
  `)
);

export const saveDate = (dateID, date, poolFunc) => (
  poolFunc.query(`
    INSERT INTO PriceStamp (id, date)
    VALUES (${dateID}, '${date}');
  `)
);

export const saveProvince = (provinceID, province, poolFunc) => (
  poolFunc.query(`
    INSERT INTO PriceStamp (id, name)
    VALUES (${provinceID}, '${province}');
  `)
);

export const saveAddress = (addressID, provinceID, address, poolFunc) => (
  poolFunc.query(`
    INSERT INTO PriceStamp (id, province_id, name)
    VALUES (${addressID}, ${provinceID}, '${address}');
  `)
);

export const saveData = (id, addressID, productID, value1, value2, value3, year, poolFunc) => (
  poolFunc.query(`
    INSERT INTO PriceStamp (id, address_id, product_id, value1, value2, value3, year)
    VALUES (${id}, ${addressID}, ${productID}, ${value1}, ${value2}, ${value3}, ${year});
  `)
);

export const insertData = async (farm, type, kind, poolFunc = pool) => {
  try {
    const farmID = nameToID(farm.farmName);
    const productID = nameToID(kind);
    const typeID = nameToID(type);
    await saveFarmProduct(mergeID([farmID, productID]), farmID, productID, poolFunc);
    await saveFarm(farmID, farm, poolFunc);
    await saveProduct(productID, kind, typeID, poolFunc);
    await Promise.all(
      farm.data.map(async (price, index) => {
        const date = getDate(farm.year, farm.month, index + 1);
        const filteredPrice = (price === '-') ? 0 : price;
        if (date != null && filteredPrice !== 0) {
          const farmProductID = mergeID([farmID, productID]);
          const dateID = nameToID(date);
          const priceID = mergeID([farmProductID, dateID]);
          console.log(priceID, filteredPrice);
          await savePrice(priceID, filteredPrice, poolFunc);
          console.log(dateID, farmProductID, date);
          await savePriceStamp(priceID, farmProductID, date, poolFunc);
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
  const year = 58;
  await Promise.all(
    types.map(async (type) => {
      const subType = type.type;
      return Promise.all(
        type.kinds.map(async (kind) => {
          await Promise.all(months.map(async (month) => {
            const url = `${process.env.WEB_URL}/download/price/priceday/${month.eng}${year}/${kind}.html`;
            const html = await fetchHtml(url);
            await sleep(2000);
            const farms = changeDataTableToArray(html);
            return Promise.all(
              farms.map(async (farm) => {
                await insertData(farm, subType, kind);
                return farm;
              })
            );
          }));
        })
      );
    })
  );
  await console.log('worker completed');
};
