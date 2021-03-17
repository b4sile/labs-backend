import { Router } from 'express';
import { models } from '../models';
import multer from 'multer';
import path from 'path';

const { Questionnaries } = models;

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
    if (ext !== '.txt' && ext !== '.pdf' && ext !== '.odt' && ext !== '.doc') {
      cb(new Error('File type is not supported'), false);
      return;
    }
    cb(null, true);
  },
});

export const questionnaireRouter = Router();

questionnaireRouter.post('/', upload.single('file'), async (req, res) => {
  const {
    post,
    name: fullname,
    birthday,
    education,
    gender,
    personal,
    salary,
  } = req.body;
  try {
    const languages = req.body.languages && req.body.languages.join(' ');
    const obj = {
      post,
      fullname,
      birthday,
      education,
      gender,
      personal,
      salary,
      languages,
    };
    console.log(req.file);
    if (req.file) {
      obj.file = req.file.filename;
    }
    const questionnaire = await Questionnaries.create(obj);
    res.status(201).json(questionnaire);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

questionnaireRouter.get('/', async (req, res) => {
  try {
    const data = await Questionnaries.findAll({ attributes: ['id'] });
    res.json(data);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

questionnaireRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Questionnaries.findByPk(id);
    res.json(data);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});
