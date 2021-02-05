import { Router } from 'express';
import { models } from '../models';
import { sequelize } from '../db';

export const databaseRouter = Router();

databaseRouter.get('/', async (req, res) => {
  try {
    const tables = await sequelize.getQueryInterface().showAllSchemas();
    res.json({ tables: tables.map((item) => item.Tables_in_labs) });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

databaseRouter.get('/:databaseName', async (req, res) => {
  const { databaseName } = req.params;
  try {
    const data = await models[databaseName].findAll({ limit: 10 });
    res.json({ data });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});
