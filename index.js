import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { router } from './routes';
import './db';
import './models';

dotenv.config();
const app = express();

app.disable('x-powered-by');

app.use(express.static(__dirname + '/tmp'));

app.use(
  logger('dev', {
    skip: () => app.get('env') === 'test',
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', router);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
