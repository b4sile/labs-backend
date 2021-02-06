import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { Image } from '../models';

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/home/basile/react/labs/backend/tmp');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    },
  }),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (
      ext !== '.jpg' &&
      ext !== '.jpeg' &&
      ext !== '.png' &&
      ext !== '.webp'
    ) {
      cb(new Error('File type is not supported'), false);
      return;
    }
    cb(null, true);
  },
});

export const galleryRouter = Router();

galleryRouter.post('/', upload.array('images', 7), async (req, res) => {
  console.log(req.files);
  res.json({ text: 'hello' });
  try {
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});
