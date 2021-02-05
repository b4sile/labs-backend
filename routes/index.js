import { Router } from 'express';
import { galleryRouter } from './galleryRouter';
import { databaseRouter } from './databaseRouter';

export const router = Router();

router.use('/gallery', galleryRouter);
router.use('/database', databaseRouter);
