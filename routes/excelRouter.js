import { Router } from 'express';
import { models } from '../models';
import multer from 'multer';
import path from 'path';
import { parseExcel } from '../utils';

const { ProductSku, ProductFamily, License } = models;

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/home/basile/react/labs/backend/tmp');
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.xls' && ext !== '.xlsx') {
      cb(new Error('File type is not supported'), false);
      return;
    }
    cb(null, true);
  },
});

export const excelRouter = Router();

excelRouter.post('/', upload.single('file'), async (req, res) => {
  try {
    await parseExcel(`../tmp/${req.file.filename}`);
    const data = await ProductFamily.findAll({
      include: [ProductSku, License],
    });
    res.status(201).json(data);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});
