import { Router } from 'express';
import { parsePage } from '../utils';
import { models } from '../models';
import Sequelize from 'sequelize';

const { Parser } = models;

export const parserRouter = Router();

parserRouter.post('/', async (req, res) => {
  const { url } = req.body;
  try {
    const rawUrl = url.split('?')[0];
    const data = await parsePage(url);
    data.url = rawUrl;
    const { title, id } = await Parser.create(data);
    res.status(201).json({ title, id });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

parserRouter.get('/', async (req, res) => {
  try {
    const data = await Parser.findAll({
      attributes: ['title', 'id'],
    });
    res.json(data);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

parserRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Parser.findByPk(id);
    res.json(data);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});
