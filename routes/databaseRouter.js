import { Router } from 'express';
import { sequelize, infoDb, databases } from '../db';

export const databaseRouter = Router();

databaseRouter.get('/', async (req, res) => {
  try {
    const tableName1 = await sequelize.getDatabaseName();
    const tableName2 = await infoDb.getDatabaseName();
    const tables1 = await sequelize.showAllSchemas();
    const tables2 = await infoDb.showAllSchemas();
    res.json([
      { name: tableName1, count: tables1.length },
      { name: tableName2, count: tables2.length },
    ]);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

databaseRouter.get('/:databaseName', async (req, res) => {
  const { databaseName } = req.params;
  try {
    const database = databases[databaseName];
    const tables = await database.showAllSchemas();
    const namesTables = tables.map((item) => item[`Tables_in_${databaseName}`]);
    const counts = [];
    for (const name of namesTables) {
      const [count, _] = await database.query(`select count(*) from ${name}`);
      counts.push({ name, count: count[0]['count(*)'] });
    }
    res.json(counts);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

databaseRouter.get('/:databaseName/:tableName', async (req, res) => {
  const { databaseName, tableName } = req.params;
  const { offset, limit } = req.query;
  try {
    const database = databases[databaseName];
    const [data, _] = await database.query(
      `select * from ${tableName} limit ${limit} offset ${offset}`
    );
    res.json({ data });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});
