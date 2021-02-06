import { Router } from 'express';
import { models } from '../models';
import { sequelize } from '../db';

export const databaseRouter = Router();

databaseRouter.get('/', async (req, res) => {
  try {
    const tables = await sequelize.getQueryInterface().showAllSchemas();
    const namesTables = tables.map((item) => item.Tables_in_labs);
    const promises = namesTables.map((name) => models[name].count());
    const tablesLengths = await Promise.all(promises);
    res.json({
      tables: namesTables.map((name, ind) => ({
        name,
        count: tablesLengths[ind],
      })),
    });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

databaseRouter.get('/:databaseName', async (req, res) => {
  const { databaseName } = req.params;
  const { offset, limit } = req.query;
  try {
    const data = await models[databaseName].findAll({
      offset: +offset,
      limit: +limit,
    });
    res.json({ data });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});
