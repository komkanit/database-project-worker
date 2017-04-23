import pool from '../db-config';
import { changeDataTableToArray, nameToID, fetchHtml } from '../utilities';

require('dotenv').config();

const url = `${process.env.WEB_URL}/download/price/priceday/Apr60/swine.html`;

export const insertData = async (farm, poolFunc = pool) => {
  try {
    const response = await poolFunc.query(`
      INSERT INTO Farm (id, name, address, province, tel)
      VALUES (${nameToID(farm.farmName)}, '${farm.farmName}', '${farm.address}', '${farm.province}', '${farm.tel}');
    `);
    await console.log(`Save ${farm.farmName} completed`);
    return response;
  } catch (err) {
    console.error('error running query', err);
    return err;
  }
};

export const runWorker = async () => {
  const html = await fetchHtml(url);
  const farms = changeDataTableToArray(html);
  farms.map((farm) => {
    insertData(farm);
    return farm;
  });
};
