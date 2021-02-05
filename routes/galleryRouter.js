import { Router } from 'express';
import { models } from '../models';

export const galleryRouter = Router();

galleryRouter.get('/', async (req, res) => {
  try {
    // const dep = await Dep.findAll({ limit: 10 });
    res.json({ dep });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});
