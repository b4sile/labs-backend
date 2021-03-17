import { Router } from 'express';
import { galleryRouter } from './galleryRouter';
import { databaseRouter } from './databaseRouter';
import { parserRouter } from './parserRouter';
import { questionnaireRouter } from './questionnaireRouter';

export const router = Router();

router.use('/gallery', galleryRouter);
router.use('/database', databaseRouter);
router.use('/parser', parserRouter);
router.use('/questionnaire', questionnaireRouter);
